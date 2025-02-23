// src/api/stripeWebhook.js
// Verifica la firma de Stripe y luego envía correo con Nodemailer (Zoho).
// Asegúrate de configurar en netlify.toml:
//   [functions.stripeWebhook]
//   type = "raw"
// para que req.body sea raw, no parseado automáticamente.

import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido (usa POST)" });
  }

  // 1) Leer la firma del header
  const signature = req.headers["stripe-signature"];

  try {
    // 2) Verificar la firma y construir el evento seguro
    const stripeEvent = stripe.webhooks.constructEvent(
      req.body, // raw body (string), gracias a type="raw"
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // 3) Revisar si el tipo de evento es 'checkout.session.completed'
    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      console.log("✅ Evento con firma verificada: checkout.session.completed");

      // 4) Extraer metadata y correo del cliente
      const finalBuild = session.metadata?.finalBuild || "(No hay build)";
      const customerEmail = session.customer_details?.email || "desconocido@vlcextreme.com";

      // ==========================
      // CONFIGURAR TRANSPORTER (Zoho)
      // ==========================
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true,
        auth: {
          user: process.env.ZOHO_USER,
          pass: process.env.ZOHO_PASS,
        },
      });

      // Verificar conexión SMTP
      transporter.verify((error, success) => {
        if (error) {
          console.log("SMTP verify error:", error);
        } else {
          console.log("SMTP listo para enviar correos:", success);
        }
      });

      // ==========================
      // Enviar correo interno
      // ==========================
      try {
        const infoInterno = await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: process.env.ZOHO_USER,
          subject: "Nuevo pedido en VLCExtreme",
          text: `Se ha completado un pedido con firma verificada.\n\nBuild:\n${finalBuild}\n\nEmail cliente: ${customerEmail}`,
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

      // 5) Responder con 200 OK para que Stripe no marque "pending"
      return res.status(200).json({ received: true });
    } else {
      console.log(`Evento no manejado: ${stripeEvent.type}`);
      return res.status(200).json({ received: true });
    }
  } catch (error) {
    console.error("❌ Error al verificar firma o procesar evento:", error);
    return res.status(400).json({ error: "Firma no válida o Error interno" });
  }
}
