import Stripe from "stripe";
import nodemailer from "nodemailer";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Custom function to read raw body from the request
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
}

export default async function handler(req) {
  console.log("[1/8] Webhook function started, method:", req.method);

  if (req.method !== "POST") {
    console.error("[1/8] Error: Método no permitido");
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido (usa POST)" }),
    };
  }

  let rawBody;
  try {
    rawBody = await getRawBody(req);
  } catch (err) {
    console.error("Error reading raw body:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error leyendo el cuerpo sin procesar" }),
    };
  }
  console.log("[2/8] Length of raw body:", rawBody.length);

  const signature = req.headers["stripe-signature"];
  if (!signature) {
    console.error("[2/8] Error: Falta header stripe-signature");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Firma no presente" }),
    };
  }

  let stripeEvent;
  try {
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
      body: JSON.stringify({
        error: `Error de verificación de firma: ${error.message}`,
      }),
    };
  }

  if (stripeEvent.type !== "checkout.session.completed") {
    console.log(`[4/8] Evento no manejado: ${stripeEvent.type}`);
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  }

  console.log("[4/8] Procesando checkout.session.completed...");
  const session = stripeEvent.data.object;
  const finalBuild = session.metadata?.finalBuild || "(No hay build)";
  const customerEmail =
    session.customer_details?.email || "desconocido@vlcextreme.com";
  const promoConsent = session.metadata?.promoConsent || "No especificado";

  console.log("[4/8] finalBuild:", finalBuild);
  console.log("[4/8] customerEmail:", customerEmail);
  console.log("[4/8] promoConsent:", promoConsent);

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

  try {
    console.log("[5/8] Verificando conexión SMTP...");
    await transporter.verify();
    console.log("[5/8] Conexión SMTP verificada");
  } catch (smtpError) {
    console.error("[5/8] Error de conexión SMTP:", smtpError);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error SMTP" }),
    };
  }

  try {
    console.log("[6/8] Enviando email interno...");
    await transporter.sendMail({
      from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER,
      subject: "Nuevo pedido en VLCExtreme",
      text: `Nuevo pedido verificado:\n\n${finalBuild}\n\nEmail: ${customerEmail}\nPromociones: ${promoConsent}`,
    });
    console.log("[6/8] Email interno enviado");
  } catch (errorInterno) {
    console.error("[6/8] Error enviando email interno:", errorInterno);
  }

  if (customerEmail !== "desconocido@vlcextreme.com") {
    try {
      console.log("[7/8] Enviando email al cliente...");
      await transporter.sendMail({
        from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
        to: customerEmail,
        subject: "Resumen de tu pedido en VLCExtreme",
        text: `¡Gracias por tu compra!\n\nConfiguración:\n${finalBuild}\n\nContactaremos pronto.\nConsentimiento promociones: ${promoConsent}`,
      });
      console.log("[7/8] Email al cliente enviado");
    } catch (errorCliente) {
      console.error("[7/8] Error enviando email al cliente:", errorCliente);
    }
  }

  console.log("[8/8] Webhook completado con éxito");
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
}
