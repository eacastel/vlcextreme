import Stripe from "stripe";
import { buffer } from "micro"; // Install micro: npm install micro
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Disable automatic JSON parsing
  },
};

export default async function handler(req, res) {
  console.log("🔵 Webhook received in Netlify, method:", req.method);

  if (req.method !== "POST") {
    console.error("❌ Método no permitido:", req.method);
    return res.status(405).json({ error: "Método no permitido (usa POST)" });
  }

  const signature = req.headers["stripe-signature"];
  if (!signature) {
    console.error("❌ No stripe-signature header provided.");
    return res.status(400).json({ error: "Firma no válida" });
  }

  let rawBody;
  try {
    rawBody = await buffer(req); // Read raw body as a Buffer
  } catch (error) {
    console.error("❌ Error reading raw body:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody, 
      signature, 
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("✅ Stripe Webhook Verified:", stripeEvent.id);

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      console.log("📦 Checkout Session Data:", session);

      const customerEmail = session.customer_details?.email || "desconocido@vlcextreme.com";
      const finalBuild = session.metadata?.finalBuild || "(No hay build)";
      const promoConsent = session.metadata?.promoConsent || "No especificado";

      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true,
        auth: {
          user: process.env.ZOHO_USER,
          pass: process.env.ZOHO_PASS,
        },
      });

      // Verify SMTP
      await transporter.verify().catch(error => console.error("❌ SMTP Verify Error:", error));

      // Send email (Internal Notification)
      try {
        const infoInterno = await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: process.env.ZOHO_USER,
          subject: "Nuevo pedido en VLCExtreme",
          text: `Se ha completado un pedido con firma verificada.\n\nBuild:\n${finalBuild}\n\nEmail cliente: ${customerEmail}\nConsentimiento promociones: ${promoConsent}`,
        });
        console.log("✅ Correo interno enviado:", infoInterno.messageId);
      } catch (errorInterno) {
        console.error("❌ Error al enviar correo interno:", errorInterno);
      }

      // Send email to customer
      if (customerEmail !== "desconocido@vlcextreme.com") {
        try {
          const infoCliente = await transporter.sendMail({
            from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
            to: customerEmail,
            subject: "Resumen de tu pedido en VLCExtreme",
            text: `¡Gracias por tu compra!\n\nTu configuración:\n${finalBuild}\n\nEn breve nos pondremos en contacto.\n\nNota: Consentimiento promociones: ${promoConsent}`,
          });
          console.log("✅ Correo al cliente enviado:", infoCliente.messageId);
        } catch (errorCliente) {
          console.error("❌ Error al enviar correo al cliente:", errorCliente);
        }
      }

      return res.status(200).json({ received: true });
    }

    console.log(`ℹ️ Evento no manejado: ${stripeEvent.type}`);
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("❌ Error verificando firma Stripe:", error);
    return res.status(400).json({ error: "Firma no válida" });
  }
}
