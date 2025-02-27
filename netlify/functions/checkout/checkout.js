import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const { products, promoConsent } = req.body; // promoConsent from your front-end checkbox
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Missing or invalid products array" });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "eur",
        product_data: { name: product.name },
        // Stripe expects the amount in cents
        unit_amount: product.price * 100,
      },
      quantity: 1
    }));

    const combinedDescription = products
      .map((p) => p.description || "")
      .join("\n---\n");

    const sessionParams = {
      payment_method_types: ['card'],
      // Restrict shipping addresses to Spain
      shipping_address_collection: {
        allowed_countries: ['ES'],
      },
      // Collect phone number
      phone_number_collection: {
        enabled: true,
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.GATSBY_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.GATSBY_SITE_URL}/cancel`,
      metadata: {
        finalBuild: combinedDescription.substring(0, 500),
        // Include promotional consent (e.g., "yes", "no", or "not provided")
        promoConsent: promoConsent || 'not provided',
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
