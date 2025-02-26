import Stripe from "stripe";
import nodemailer from "nodemailer";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Disable Netlify's default body parser
export const config = {
  api: { bodyParser: false },
};

// Fallback function if micro fails (optional)
async function getRawBodyFallback(req) {
  console.log("2.1️⃣ Using fallback raw body reading");
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(Buffer.from(data)));
    req.on("error", (err) => reject(err));
  });
}

export default async function handler(req) {
  console.log("1️⃣ Webhook function started, method:", req.method);

  // Global try/catch to ensure we log any crash
  try {
    if (req.method !== "POST") {
      console.log("2️⃣ Method not allowed:", req.method);
      return { statusCode: 405, body: JSON.stringify({ error: "Use POST" }) };
    }

    let rawBody;
    try {
      // Attempt micro's buffer first
      console.log("2️⃣ Attempting to read raw body with micro");
      rawBody = await buffer(req);
      console.log("2️⃣ micro raw body length:", rawBody?.length);
    } catch (err) {
      console.error("2️⃣ Error using micro buffer:", err);
      // Use fallback approach
      rawBody = await getRawBodyFallback(req);
      console.log("2️⃣ Fallback raw body length:", rawBody?.length);
    }

    const signature = req.headers["stripe-signature"];
    console.log("3️⃣ Stripe signature:", signature);

    if (!signature) {
      console.log("3️⃣ No stripe-signature found. Returning 400.");
      return { statusCode: 400, body: JSON.stringify({ error: "Missing stripe-signature" }) };
    }

    let stripeEvent;
    try {
      console.log("4️⃣ Verifying Stripe signature...");
      stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
      console.log("4️⃣ Signature valid, event type:", stripeEvent.type);
    } catch (err) {
      console.error("4️⃣ Error verifying signature:", err.message);
      return { statusCode: 400, body: JSON.stringify({ error: `Invalid signature: ${err.message}` }) };
    }

    if (stripeEvent.type !== "checkout.session.completed") {
      console.log("5️⃣ Unhandled event type:", stripeEvent.type);
      return { statusCode: 200, body: JSON.stringify({ received: true }) };
    }

    console.log("5️⃣ Handling checkout.session.completed");
    const session = stripeEvent.data.object;
    const finalBuild = session.metadata?.finalBuild || "(No hay build)";
    const customerEmail = session.customer_details?.email || "desconocido@vlcextreme.com";

    // Log these for debugging
    console.log("5️⃣ finalBuild:", finalBuild);
    console.log("5️⃣ customerEmail:", customerEmail);

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    // Optional: verify SMTP
    try {
      console.log("6️⃣ Verifying SMTP connection...");
      await transporter.verify();
      console.log("6️⃣ SMTP ready!");
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
        text: `Nuevo pedido. \n\nBuild:\n${finalBuild}\n\nEmail: ${customerEmail}`,
      });
      console.log("7️⃣ Internal email sent");
    } catch (errInternal) {
      console.error("7️⃣ Error sending internal email:", errInternal);
    }

    // Send email to customer if we have an actual email
    if (customerEmail !== "desconocido@vlcextreme.com") {
      try {
        console.log("8️⃣ Sending customer email...");
        await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: customerEmail,
          subject: "Resumen de tu pedido en VLCExtreme",
          text: `¡Gracias por tu compra!\n\nTu configuración:\n${finalBuild}\n\nEstamos en contacto.`,
        });
        console.log("8️⃣ Customer email sent");
      } catch (errClientEmail) {
        console.error("8️⃣ Error sending customer email:", errClientEmail);
      }
    }

    console.log("9️⃣ Webhook completed successfully. Returning 200.");
    return { statusCode: 200, body: JSON.stringify({ received: true }) };

  } catch (err) {
    // Catch any unhandled error to log it
    console.error("🔴 Top-level error in webhook function:", err);
    return { statusCode: 500, body: JSON.stringify({ error: `Unhandled webhook error: ${err.message}` }) };
  }
}
