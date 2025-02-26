import Stripe from "stripe";
import nodemailer from "nodemailer";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Ensures raw body is available
  },
};

export default async function handler(req) {
  console.log("🔵 Webhook received in Netlify, method:", req.method);

  if (req.method !== "POST") {
    console.error("❌ Método no permitido:", req.method);
    return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido (usa POST)" }) };
  }

  const signature = req.headers["stripe-signature"];
  console.log("📝 Signature recibida:", signature);

  if (!signature) {
    console.error("❌ No stripe-signature header provided.");
    return { statusCode: 400, body: JSON.stringify({ error: "Firma no válida" }) };
  }

  let stripeEvent;
  try {
    const rawBody = await buffer(req);
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("✅ Evento de Stripe construido correctamente:", stripeEvent.id);
  } catch (error) {
    console.error("❌ Error verificando firma Stripe:", error.message);
    return { statusCode: 400, body: JSON.stringify({ error: "Firma no válida" }) };
  }

  if (stripeEvent.type === "checkout.session.completed") {
    console.log("✅ Evento verificado:", stripeEvent.type);
    const session = stripeEvent.data.object;

    const finalBuild = session.metadata?.finalBuild || "(No hay build)";
    const customerEmail = session.customer_details?.email || "desconocido@vlcextreme.com";
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

    console.log("🔄 Verificando conexión SMTP...");
    await transporter.verify()
      .then(() => console.log("✅ SMTP listo para enviar correos"))
      .catch((error) => console.error("❌ Error en verify SMTP:", error));

    try {
      console.log("📨 Enviando correo interno...");
      await transporter.sendMail({
        from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
        to: process.env.ZOHO_USER,
        subject: "Nuevo pedido en VLCExtreme",
        text: `Se ha completado un pedido con firma verificada.\n\nBuild:\n${finalBuild}\n\nEmail cliente: ${customerEmail}\n\nConsentimiento promociones: ${promoConsent}`,
      });
      console.log("✅ Correo interno enviado.");
    } catch (errorInterno) {
      console.error("❌ Error al enviar correo interno:", errorInterno);
    }

    if (customerEmail !== "desconocido@vlcextreme.com") {
      try {
        console.log("📨 Enviando correo al cliente...");
        await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: customerEmail,
          subject: "Resumen de tu pedido en VLCExtreme",
          text: `¡Gracias por tu compra!\n\nTu configuración:\n${finalBuild}\n\nEn breve nos pondremos en contacto.\n\nNota: Consentimiento promociones: ${promoConsent}`,
        });
        console.log("✅ Correo al cliente enviado.");
      } catch (errorCliente) {
        console.error("❌ Error al enviar correo al cliente:", errorCliente);
      }
    }

    console.log("🟢 Webhook procesado correctamente.");
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  }

  console.log(`⚠️ Evento no manejado: ${stripeEvent.type}`);
  return { statusCode: 200, body: JSON.stringify({ received: true }) };
}
