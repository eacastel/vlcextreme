// netlify/functions/stripeWebhook.js

// 1) Dependencies
const Stripe = require('stripe');
const nodemailer = require('nodemailer');

// 2) Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 3) Export a handler function in the Netlify "classic" style
exports.handler = async (event, context) => {

  // A) Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Método no permitido (usa POST)",
    };
  }

  // B) The raw request body from Netlify (since [functions.stripeWebhook] type="raw")
  const rawBody = event.body;

  // C) Stripe signature from headers
  const signature = event.headers["stripe-signature"];
  if (!signature) {
    return {
      statusCode: 400,
      body: "Falta firma de Stripe",
    };
  }

  let stripeEvent;
  try {
    // D) Verify signature using the raw body
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return {
      statusCode: 400,
      body: `Error de verificación de firma: ${error.message}`,
    };
  }

  // E) Handle only checkout.session.completed
  if (stripeEvent.type !== "checkout.session.completed") {
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  }

  // F) Extract session data
  const session = stripeEvent.data.object;
  const finalBuild = session.metadata?.finalBuild || "(No hay build)";
  const customerEmail =
    session.customer_details?.email || "desconocido@vlcextreme.com";
  const promoConsent = session.metadata?.promoConsent || "No especificado";

    // Additional customer information
    const customerName = session.customer_details?.name || "Desconocido";
    const customerPhone = session.customer_details?.phone || "No proporcionado";
    const address = session.customer_details?.address;
    const customerAddress = address
      ? `${address.line1 || ""}${address.line2 ? ", " + address.line2 : ""}, ${address.city || ""}, ${address.state || ""} ${address.postal_code || ""}, ${address.country || ""}`
      : "No proporcionada";
  

  // G) Configure Nodemailer (Zoho)
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  });

  // (Optional) Verify SMTP
  try {
    await transporter.verify();
  } catch (smtpError) {
    return {
      statusCode: 500,
      body: "Error SMTP",
    };
  }

  // H) Send Internal Email
  try {
    await transporter.sendMail({
      from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER, // your internal notification
      subject: "Nuevo pedido en VLCExtreme!",
      text: `Haz recibido un pedido de VLCExtreme:

      \n\nNombre: ${customerName}
      \nEmail: ${customerEmail}
      \nTeléfono: ${customerPhone}
      \nDirección: ${customerAddress}
      \n\nBuild: ${finalBuild}\nEmail: ${customerEmail}
      \n\nConsentimiento promociones: ${promoConsent}`,
    });
  } catch (errorInterno) {
    console.error("[6/8] Error enviando email interno:", errorInterno);
  }

  // I) Send Customer Email if we have a valid address
  if (customerEmail !== "desconocido@vlcextreme.com") {
    try {
      await transporter.sendMail({
        from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
        to: customerEmail,
        subject: "Resumen de tu pedido en VLCExtreme",
        text: `¡Gracias por tu compra!
        \n\nTu configuración final:
        \n${finalBuild}
        
        \n\nEn breve nos pondremos en contacto contigo para confirmar los componentes de tu configuración, tiempos de ensamblaje, configuraciones adicionales y transporte.

        \n\nSi tienes cualquier duda sobre este pedido u otra inquietud nos puedes enviar un correo a clientes@vlcextreme.com.

        \n\nUn saludo,
        \nEquipo VLCExtreme`,
      });
    } catch (errorCliente) {
    }
  }

  // J) Finish
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
