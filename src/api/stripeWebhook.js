import Stripe from "stripe";
import nodemailer from "nodemailer";
import { buffer } from "micro";

/**
 * Netlify requires you to export this config
 * so it doesn't parse the request body automatically.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

// In case micro's buffer fails, we manually read the raw body
async function getRawBodyFallback(req) {
  console.log("2.1️⃣ Using fallback raw body reading");
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(Buffer.from(data)));
    req.on("error", (err) => reject(err));
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req) {
  console.log("1️⃣ Webhook function started, method:", req.method);

  // Global try/catch to ensure logs if we have unexpected errors
  try {
    // Only accept POST requests
    if (req.method !== "POST") {
      console.log("2️⃣ Method not allowed:", req.method);
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método no permitido. Usa POST." }),
      };
    }

    let rawBody;
    try {
      console.log("2️⃣ Attempting to read raw body with micro v10");
      rawBody = await buffer(req);
      console.log("2️⃣ micro raw body length:", rawBody?.length);
    } catch (err) {
      // If micro fails for any reason, use fallback approach
      console.error("2️⃣ Error using micro buffer:", err);
      rawBody = await getRawBodyFallback(req);
      console.log("2️⃣ Fallback raw body length:", rawBody?.length);
    }

    // Retrieve Stripe signature from headers
    const signature = req.headers["stripe-signature"];
    console.log("3️⃣ Stripe signature:", signature);

    // If no signature, can't verify
    if (!signature) {
      console.log("3️⃣ No stripe-signature found. Returning 400.");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Falta la firma de Stripe (stripe-signature)" }),
      };
    }

    let stripeEvent;
    try {
      console.log("4️⃣ Verifying Stripe signature...");
      stripeEvent = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("4️⃣ Signature valid, event type:", stripeEvent.type);
    } catch (err) {
      console.error("4️⃣ Error verifying signature:", err.message);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Firma de Stripe no válida: ${err.message}` }),
      };
    }

    // Handle only checkout.session.completed
    if (stripeEvent.type !== "checkout.session.completed") {
      console.log("5️⃣ Unhandled event type:", stripeEvent.type);
      return { statusCode: 200, body: JSON.stringify({ received: true }) };
    }

    console.log("5️⃣ Handling checkout.session.completed");
    const session = stripeEvent.data.object;

    // Extract metadata
    const finalBuild = session.metadata?.finalBuild || "(No hay build)";
    const customerEmail = session.customer_details?.email || "desconocido@vlcextreme.com";
    const promoConsent = session.metadata?.promoConsent || "No especificado";

    console.log("5️⃣ finalBuild:", finalBuild);
    console.log("5️⃣ customerEmail:", customerEmail);
    console.log("5️⃣ promoConsent:", promoConsent);

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

    // Optional verify
    try {
      console.log("6️⃣ Verifying SMTP...");
      await transporter.verify();
      console.log("6️⃣ SMTP is ready!");
    } catch (smtpErr) {
      console.error("6️⃣ SMTP verify error:", smtpErr);
    }

    // Send internal email
    try {
      console.log("7️⃣ Sending internal email...");
      await transporter.sendMail({
        from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
        to: process.env.ZOHO_USER,
        subject: "Nuevo pedido en VLCExtreme",
        text: `Se ha completado un pedido con firma verificada.\n\nBuild:\n${finalBuild}\n\nEmail del cliente: ${customerEmail}\n\nConsentimiento promociones: ${promoConsent}`,
      });
      console.log("7️⃣ Internal email sent!");
    } catch (errorInterno) {
      console.error("7️⃣ Error al enviar correo interno:", errorInterno);
    }

    // Send email to customer (if we have one)
    if (customerEmail !== "desconocido@vlcextreme.com") {
      try {
        console.log("8️⃣ Sending customer email...");
        await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: customerEmail,
          subject: "Resumen de tu pedido en VLCExtreme",
          text: `¡Gracias por tu compra!\n\nTu configuración:\n${finalBuild}\n\nEn breve nos pondremos en contacto.\n\nNota: Consentimiento promociones: ${promoConsent}`,
        });
        console.log("8️⃣ Customer email sent!");
      } catch (errorCliente) {
        console.error("8️⃣ Error al enviar correo al cliente:", errorCliente);
      }
    }

    console.log("9️⃣ All done. Returning 200 OK.");
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };

  } catch (topLevelErr) {
    // Catch any unexpected error outside the sub-try
    console.error("🔴 Top-level error in webhook function:", topLevelErr);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Unhandled error: ${topLevelErr.message}` }),
    };
  }
}
