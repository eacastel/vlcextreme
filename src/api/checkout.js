import Stripe from "stripe";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "VLCExtreme Test Product",
              description: "A test product for debugging checkout.",
              images: ["https://vlcextreme.com/test-product.jpg"], // Placeholder image
            },
            unit_amount: 5000, // €50.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.GATSBY_SITE_URL}/success`,
      cancel_url: `${process.env.GATSBY_SITE_URL}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
