import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, price } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100, // in cents
      currency: "eur",
      description: name,
      metadata: {
        name,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
