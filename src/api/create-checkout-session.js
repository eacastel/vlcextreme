require("dotenv").config(); // ✅ Load .env variables inside server-side functions
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  }

  try {
    const { buildId, price } = JSON.parse(event.body);

    if (!buildId || !price) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Faltan parámetros en la solicitud" }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Configuración ${buildId}`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.GATSBY_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.GATSBY_SITE_URL}/cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (error) {
    console.error("Stripe Checkout error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al crear la sesión de pago." }),
    };
  }
};
