import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { products } = req.body;

    // ✅ **Ensure products exist and is an array**
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Missing or invalid products array" });
    }

    // ✅ **Format products correctly for Stripe**
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "eur",
        product_data: { name: product.name },
        unit_amount: product.price * 100, // Stripe expects cents
      },
      quantity: 1
    }));

    // ✅ **Create Stripe checkout session**
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.GATSBY_SITE_URL}/success`,
      cancel_url: `${process.env.GATSBY_SITE_URL}/cancel`,
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
