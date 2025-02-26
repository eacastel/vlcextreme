import Stripe from "stripe";
import nodemailer from "nodemailer";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Disable automatic body parsing in Netlify
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log("🔵 Webhook received in Netlify, method:", req.method);

  if (req.method !== "POST") {
    console.error("❌ Invalid method:", req.method);
    return res.status(405).json({ error: "Method Not Allowed (Use POST)" });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("🚨 Missing STRIPE_WEBHOOK_SECRET!");
    return res.status(500).json({ error: "Server Misconfiguration" });
  }

  // Read raw body manually
  let rawBody = "";
  req.on("data", (chunk) => {
    rawBody += chunk;
  });

  req.on("end", async () => {
    const signature = req.headers["stripe-signature"];
    console.log("📩 Stripe signature received:", signature);

    try {
      console.log("📩 Validating Stripe signature...");
      const stripeEvent = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log("✅ Signature verified, event:", stripeEvent.type);

      if (stripeEvent.type === "checkout.session.completed") {
        console.log("✅ Handling checkout session...");
        const session = stripeEvent.data.object;

        const finalBuild = session.metadata?.finalBuild || "(No build)";
        const customerEmail = session.customer_details?.email || "unknown@vlcextreme.com";
        const promoConsent = session.metadata?.promoConsent || "Not specified";

        console.log("📩 Preparing email to:", customerEmail);

        const transporter = nodemailer.createTransport({
          host: "smtp.zoho.eu",
          port: 465,
          secure: true,
          auth: {
            user: process.env.ZOHO_USER,
            pass: process.env.ZOHO_PASS,
          },
        });

        console.log("✅ Verifying SMTP connection...");
        await transporter.verify();

        console.log("📤 Sending internal email...");
        await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: process.env.ZOHO_USER,
          subject: "New Order in VLCExtreme",
          text: `A new verified order has been placed.

Build:
${finalBuild}

Customer Email: ${customerEmail}

Promotional Consent: ${promoConsent}`,
        });
        console.log("✅ Internal email sent!");

        if (customerEmail !== "unknown@vlcextreme.com") {
          console.log("📤 Sending email to customer...");
          await transporter.sendMail({
            from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
            to: customerEmail,
            subject: "Your VLCExtreme Order Summary",
            text: `Thank you for your purchase!

Your configuration:
${finalBuild}

We will contact you shortly.

Promo Consent: ${promoConsent}`,
          });
          console.log("✅ Customer email sent!");
        }
      } else {
        console.log(`⚠️ Unhandled event type: ${stripeEvent.type}`);
      }

      console.log("✅ Webhook processed successfully, responding with 200.");
      return res.status(200).json({ received: true });

    } catch (error) {
      console.error("🚨 Signature validation error:", error.message || error);
      return res.status(400).json({ error: "Invalid Signature" });
    }
  });
}
