import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { products } = req.body;

    // Validar que products exista y sea un array no vacío
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Missing or invalid products array" });
    }

    // Construir los line_items para Stripe
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "eur",
        product_data: { name: product.name },
        // Stripe usa céntimos => multiplicamos el precio por 100
        unit_amount: product.price * 100,
      },
      quantity: 1
    }));

    // Combinar las descripciones (puede que tengas uno o varios productos)
    const combinedDescription = products
      .map((p) => p.description || "")
      .join("\n---\n");

    // Crear la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.GATSBY_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.GATSBY_SITE_URL}/cancel`,
      // Aquí guardamos la build final en metadata
      metadata: {
        // Ajusta el límite de 500 caracteres si tienes builds muy extensos
        finalBuild: combinedDescription.substring(0, 500), 
      },
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
