import Stripe from "stripe";
import nodemailer from "nodemailer";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req) {
  const rawBody = await buffer(req);
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return { statusCode: 400, body: "Falta firma de Stripe" };
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true,
        auth: {
          user: process.env.ZOHO_USER,
          pass: process.env.ZOHO_PASS,
        },
      });

      // Enviar emails
      await transporter.sendMail({ /* ...config interno... */ });
      await transporter.sendMail({ /* ...config cliente... */ });

      return { statusCode: 200, body: "OK" };
    }

    return { statusCode: 200, body: "Evento no manejado" };

  } catch (error) {
    console.error("Webhook Error:", error);
    return { statusCode: 400, body: `Error: ${error.message}` };
  }
}