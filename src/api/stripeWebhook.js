import Stripe from "stripe";
import nodemailer from "nodemailer";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req) {
  console.log("1️⃣ Webhook function started, method:", req.method);

  if (req.method !== "POST") {
    console.log("2️⃣ Method not allowed:", req.method);
    return { statusCode: 405, body: JSON.stringify({ error: "Use POST" }) };
  }

  let rawBody;
  try {
    rawBody = await buffer(req);
    console.log("3️⃣ Raw body read successfully. Length:", rawBody.length);
  } catch (err) {
    console.error("3️⃣ Error reading raw body:", err);
    return { statusCode: 400, body: JSON.stringify({ error: "Could not read raw body" }) };
  }

  const signature = req.headers["stripe-signature"];
  console.log("4️⃣ Stripe signature received:", signature);

  if (!signature) {
    console.log("4️⃣ No Stripe signature found, returning 400.");
    return { statusCode: 400, body: JSON.stringify({ error: "Missing stripe-signature" }) };
  }

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("5️⃣ Constructed stripeEvent successfully:", stripeEvent.type);
  } catch (err) {
    console.error("5️⃣ Error verifying Stripe signature:", err.message);
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid Stripe signature" }) };
  }

  // Only handle 'checkout.session.completed'
  if (stripeEvent.type !== "checkout.session.completed") {
    console.log("6️⃣ Unhandled event type:", stripeEvent.type, "Returning 200.");
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  }

  // 7️⃣ Send Emails
  console.log("7️⃣ Handling 'checkout.session.completed' event. Attempting to send emails.");
  const session = stripeEvent.data.object;

  const finalBuild = session.metadata?.finalBuild || "(No build)";
  const customerEmail = session.customer_details?.email || "desconocido@vlcextreme.com";

  console.log("7️⃣ finalBuild:", finalBuild);
  console.log("7️⃣ customerEmail:", customerEmail);

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  });

  try {
    console.log("8️⃣ Verifying SMTP...");
    await transporter.verify();
    console.log("8️⃣ SMTP verification successful!");
  } catch (verifyError) {
    console.error("8️⃣ SMTP verification error:", verifyError);
  }

  console.log("9️⃣ Sending internal email...");
  try {
    await transporter.sendMail({
      from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER,
      subject: "Nuevo pedido en VLCExtreme",
      text: `Se ha completado un pedido.\n\nBuild:\n${finalBuild}\n\nEmail del cliente: ${customerEmail}`,
    });
    console.log("9️⃣ Internal email sent!");
  } catch (errorInterno) {
    console.error("9️⃣ Error sending internal email:", errorInterno);
  }

  if (customerEmail !== "desconocido@vlcextreme.com") {
    console.log("9️⃣ Sending customer email...");
    try {
      await transporter.sendMail({
        from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
        to: customerEmail,
        subject: "Resumen de tu pedido en VLCExtreme",
        text: `¡Gracias por tu compra!\n\nTu configuración:\n${finalBuild}`,
      });
      console.log("9️⃣ Customer email sent!");
    } catch (errorCliente) {
      console.error("9️⃣ Error sending customer email:", errorCliente);
    }
  }

  console.log("🔟 Webhook processing finished. Returning 200.");
  return { statusCode: 200, body: JSON.stringify({ received: true }) };
}
