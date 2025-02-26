import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log("Iniciando webhook, método:", req.method);
  if (req.method !== "POST") {
    console.error("Método no permitido:", req.method);
    return res.status(405).json({ error: "Método no permitido (usa POST)" });
  }

  const signature = req.headers["stripe-signature"];
  console.log("Signature recibida:", signature);
  
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      req.body, // cuerpo sin parsear (raw body)
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Evento de Stripe construido correctamente:", stripeEvent.id);
    
    if (stripeEvent.type === "checkout.session.completed") {
      console.log("Evento verificado:", stripeEvent.type);
      const session = stripeEvent.data.object;

      // Log de datos relevantes del checkout session
      console.log("Datos del checkout session:", {
        id: session.id,
        email: session.customer_details?.email,
        metadata: session.metadata,
      });

      const finalBuild = session.metadata?.finalBuild || "(No hay build)";
      const customerEmail =
        session.customer_details?.email || "desconocido@vlcextreme.com";
      const promoConsent = session.metadata?.promoConsent || "No especificado";

      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true,
        auth: {
          user: process.env.ZOHO_USER,
          pass: process.env.ZOHO_PASS,
        },
      });

      console.log("Verificando conexión SMTP...");
      await new Promise((resolve) => {
        transporter.verify((error, success) => {
          if (error) {
            console.error("SMTP verify error:", error);
          } else {
            console.log("SMTP listo para enviar correos:", success);
          }
          resolve();
        });
      });

      // Enviar correo interno
      try {
        console.log("Enviando correo interno...");
        const infoInterno = await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: process.env.ZOHO_USER,
          subject: "Nuevo pedido en VLCExtreme",
          text: `Se ha completado un pedido con firma verificada.

Build:
${finalBuild}

Email cliente: ${customerEmail}

Consentimiento promociones: ${promoConsent}`,
        });
        console.log("Correo interno enviado:", infoInterno.messageId);
      } catch (errorInterno) {
        console.error("Error al enviar correo interno:", errorInterno);
      }

      // Enviar correo al cliente (si se dispone de email)
      if (customerEmail !== "desconocido@vlcextreme.com") {
        try {
          console.log("Enviando correo al cliente...");
          const infoCliente = await transporter.sendMail({
            from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
            to: customerEmail,
            subject: "Resumen de tu pedido en VLCExtreme",
            text: `¡Gracias por tu compra!

Tu configuración:
${finalBuild}

En breve nos pondremos en contacto.

Nota: Consentimiento promociones: ${promoConsent}`,
          });
          console.log("Correo al cliente enviado:", infoCliente.messageId);
        } catch (errorCliente) {
          console.error("Error al enviar correo al cliente:", errorCliente);
        }
      }

      console.log("Webhook procesado correctamente, respondiendo 200.");
      return res.status(200).json({ received: true });
    } else {
      console.log(`Evento no manejado: ${stripeEvent.type}`);
      return res.status(200).json({ received: true });
    }
  } catch (error) {
    console.error("Error de firma Stripe:", error.message || error);
    return res.status(400).json({ error: "Firma no válida" });
  }
}