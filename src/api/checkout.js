require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function handler(event, context) {
  try {
    const { buildId, price } = JSON.parse(event.body);
    
    // Multiply price by 100 if the incoming price is in euros (adjust as needed)
    const unitAmount = Number(price) * 100;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: `PC Build - ${buildId}` },
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.GATSBY_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.GATSBY_SITE_URL}/canceled`,
    });
    
    return {
      statusCode: 200,
      headers: { "Content-Type": ["application/json"] },
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (err) {
    console.error("Stripe Checkout error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": ["application/json"] },
      body: JSON.stringify({ error: err.message }),
    };
  }
}

exports.handler = handler;
