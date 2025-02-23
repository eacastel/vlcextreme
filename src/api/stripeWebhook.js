// src/api/stripeWebhook.js
// Ejemplo para verificar que el servidor SMTP de Zoho esté funcionando en NodeMailer.

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido (POST)" });
  }

  try {
    const event = JSON.parse(req.body);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const finalBuild = session.metadata?.finalBuild || "(No hay build)";
      const customerEmail = session.customer_details?.email || "desconocido@vlcextreme.com";

      // ==========================
      // CONFIGURAR TRANSPORTER
      // ==========================
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true,
        auth: {
          user: process.env.ZOHO_USER, // e.g. "info@vlcextreme.com"
          pass: process.env.ZOHO_PASS, // app password
        },
      });

      // Verificar conexión SMTP
      transporter.verify(function(error, success) {
        if (error) {
          console.log("SMTP verify error:", error);
        } else {
          console.log("SMTP listo para enviar correos:", success);
        }
      });

      // ==========================
      // ENVIAR CORREO DE PRUEBA A TU EQUIPO
      // ==========================
      try {
        const infoInterno = await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: process.env.ZOHO_USER,
          subject: "Nuevo pedido en VLCExtreme",
          text: `Se ha completado un pedido.\n\nBuild:\n${finalBuild}\n\nEmail cliente: ${customerEmail}`,
        });
        console.log("Correo interno enviado:", infoInterno.messageId);
      } catch (errorInterno) {
        console.error("Error al enviar correo interno:", errorInterno);
      }

      // (Opcional) Enviar correo al cliente
      if (customerEmail !== "desconocido@vlcextreme.com") {
        try {
          const infoCliente = await transporter.sendMail({
            from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
            to: customerEmail,
            subject: "Resumen de tu pedido en VLCExtreme",
            text: `¡Gracias por tu compra!\n\nTu configuración:\n${finalBuild}\n\nEn breve nos pondremos en contacto.`,
          });
          console.log("Correo al cliente enviado:", infoCliente.messageId);
        } catch (errorCliente) {
          console.error("Error al enviar correo al cliente:", errorCliente);
        }
      }

      return res.status(200).json({ received: true });
    }

    // Evento no manejado
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error parseando webhook:", error);
    return res.status(400).json({ error: "Error parseando body" });
  }
}
