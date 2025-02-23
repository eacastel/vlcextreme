import nodemailer from "nodemailer";

async function enviarCorreoConZoho({ para, asunto, texto }) {

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",    
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER, 
      pass: process.env.ZOHO_PASS, 
    },
  });

  // 2) Enviar el correo

  const info = await transporter.sendMail({
    from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
    to: para,
    subject: asunto,
    text: texto,
  });

  console.log("Correo enviado con Zoho:", info.messageId);
}

// Ejemplo de uso en el webhook:
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const event = JSON.parse(req.body);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const finalBuild = session.metadata?.finalBuild || "(No hay build)";
      const customerEmail = session.customer_details?.email || "desconocido@vlcextreme.com";

      // Enviar correo a tu equipo
      try {
        await enviarCorreoConZoho({
          para: "equipo@vlcextreme.com", // o tu ZOHO_USER
          asunto: "Nuevo Pedido VLCExtreme",
          texto: `Pedido final:\n\n${finalBuild}\n\nEmail del cliente: ${customerEmail}`,
        });
      } catch (error) {
        console.error("Error al enviar correo interno con Zoho:", error);
      }

      // Opcional, enviar correo al cliente
      if (customerEmail !== "desconocido@vlcextreme.com") {
        try {
          await enviarCorreoConZoho({
            para: customerEmail,
            asunto: "Resumen de tu pedido en VLCExtreme",
            texto: `¡Gracias por tu compra!\n\nHemos recibido tu build:\n\n${finalBuild}\n\nPronto estaremos en contacto.`,
          });
        } catch (error) {
          console.error("Error al enviar correo al cliente con Zoho:", error);
        }
      }

      // Respuesta OK para Stripe
      return res.status(200).json({ received: true });
    }

    console.log(`Evento no manejado: ${event.type}`);
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error parseando el webhook:", error);
    return res.status(400).json({ error: "Error parseando body" });
  }
}
