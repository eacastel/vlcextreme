import Stripe from "stripe";
import nodemailer from "nodemailer";
import { buffer } from "micro"; // npm install micro

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Disable automatic parsing so we get the raw body for signature verification
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req) {
  // 1) Validate HTTP method
  if (req.method !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido (usa POST)" }),
    };
  }

  // 2) Read the raw request body
  let rawBody;
  try {
    rawBody = await buffer(req);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No se pudo leer el cuerpo de la solicitud" }),
    };
  }

  // 3) Check for Stripe signature
  const signature = req.headers["stripe-signature"];
  if (!signature) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Falta la firma de Stripe (stripe-signature)" }),
    };
  }

  // 4) Construct and verify the Stripe event
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Firma no válida: ${err.message}` }),
    };
  }

  // 5) Handle checkout.session.completed
  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;

    // Extract metadata & email
    const finalBuild = session.metadata?.finalBuild || "(No hay build)";
    const customerEmail = session.customer_details?.email || "desconocido@vlcextreme.com";
    const promoConsent = session.metadata?.promoConsent || "No especificado";

    // Configure Nodemailer (Zoho SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    // (Optional) Verify the transporter before sending
    try {
      await transporter.verify();
    } catch (error) {
      console.error("Error en verificación SMTP:", error);
    }

    // 5a) Send internal email (to your Zoho address)
    try {
      await transporter.sendMail({
        from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
        to: process.env.ZOHO_USER, // Internal notifications
        subject: "Nuevo pedido en VLCExtreme",
        text: `Se ha completado un pedido con firma verificada.\n\nBuild:\n${finalBuild}\n\nEmail cliente: ${customerEmail}\n\nConsentimiento promociones: ${promoConsent}`,
      });
    } catch (errorInterno) {
      console.error("Error al enviar correo interno:", errorInterno);
    }

    // 5b) Send email to customer (if email isn’t unknown)
    if (customerEmail !== "desconocido@vlcextreme.com") {
      try {
        await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: customerEmail,
          subject: "Resumen de tu pedido en VLCExtreme",
          text: `¡Gracias por tu compra!\n\nTu configuración:\n${finalBuild}\n\nEn breve nos pondremos en contacto.\n\nNota: Consentimiento promociones: ${promoConsent}`,
        });
      } catch (errorCliente) {
        console.error("Error al enviar correo al cliente:", errorCliente);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  }

  // 6) For other event types, respond with 200 so Stripe stops retrying
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
}
