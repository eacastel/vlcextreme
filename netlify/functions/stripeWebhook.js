// netlify/functions/stripeWebhook.js

// 1) Dependencies
const Stripe = require('stripe');
const nodemailer = require('nodemailer');

// 2) Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 3) Export a handler function in the Netlify "classic" style
exports.handler = async (event, context) => {
  console.log("[1/8] stripeWebhook function started, method:", event.httpMethod);

  // A) Only allow POST
  if (event.httpMethod !== "POST") {
    console.error("[1/8] Error: Método no permitido");
    return {
      statusCode: 405,
      body: "Método no permitido (usa POST)",
    };
  }

  // B) The raw request body from Netlify (since [functions.stripeWebhook] type="raw")
  const rawBody = event.body;
  console.log("[2/8] Length of raw body:", rawBody?.length);

  // C) Stripe signature from headers
  const signature = event.headers["stripe-signature"];
  if (!signature) {
    console.error("[2/8] Error: Falta header stripe-signature");
    return {
      statusCode: 400,
      body: "Falta firma de Stripe",
    };
  }

  let stripeEvent;
  try {
    // D) Verify signature using the raw body
    console.log("[3/8] Verificando firma Stripe...");
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(`[3/8] Evento verificado: ${stripeEvent.type}`);
  } catch (error) {
    console.error("[ERROR] Error verificando firma Stripe:", error);
    return {
      statusCode: 400,
      body: `Error de verificación de firma: ${error.message}`,
    };
  }

  // E) Handle only checkout.session.completed
  if (stripeEvent.type !== "checkout.session.completed") {
    console.log(`[4/8] Evento no manejado: ${stripeEvent.type}`);
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  }

  // F) Extract session data
  console.log("[4/8] Procesando checkout.session.completed...");
  const session = stripeEvent.data.object;
  const finalBuild = session.metadata?.finalBuild || "(No hay build)";
  const customerEmail =
    session.customer_details?.email || "desconocido@vlcextreme.com";
  const promoConsent = session.metadata?.promoConsent || "No especificado";

  console.log("[4/8] finalBuild:", finalBuild);
  console.log("[4/8] customerEmail:", customerEmail);
  console.log("[4/8] promoConsent:", promoConsent);

  // G) Configure Nodemailer (Zoho)
  console.log("[5/8] Configurando transporte SMTP...");
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
    console.log("[5/8] Verificando conexión SMTP...");
    await transporter.verify();
    console.log("[5/8] Conexión SMTP verificada");
  } catch (smtpError) {
    console.error("[5/8] Error de conexión SMTP:", smtpError);
    return {
      statusCode: 500,
      body: "Error SMTP",
    };
  }

  // H) Send Internal Email
  try {
    console.log("[6/8] Enviando email interno...");
    await transporter.sendMail({
      from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER, // your internal notification
      subject: "Nuevo pedido en VLCExtreme",
      text: `Nuevo pedido:\n\nBuild: ${finalBuild}\nEmail: ${customerEmail}\nConsentimiento promociones: ${promoConsent}`,
    });
    console.log("[6/8] Email interno enviado");
  } catch (errorInterno) {
    console.error("[6/8] Error enviando email interno:", errorInterno);
  }

  // I) Send Customer Email if we have a valid address
  if (customerEmail !== "desconocido@vlcextreme.com") {
    try {
      console.log("[7/8] Enviando email al cliente...");
      await transporter.sendMail({
        from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
        to: customerEmail,
        subject: "Resumen de tu pedido en VLCExtreme",
        text: `¡Gracias por tu compra!\n\nTu configuración:\n${finalBuild}\nConsentimiento promociones: ${promoConsent}`,
      });
      console.log("[7/8] Email al cliente enviado");
    } catch (errorCliente) {
      console.error("[7/8] Error enviando email al cliente:", errorCliente);
    }
  }

  // J) Finish
  console.log("[8/8] Webhook completado con éxito");
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
