import Stripe from "stripe";
import nodemailer from "nodemailer";
import { buffer } from "micro"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req) {
  console.log("[1/8] Webhook iniciado. Método:", req.method);

  // Validar método HTTP
  if (req.method !== "POST") {
    console.error("[1/8] Error: Método no permitido");
    return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  // Obtener cuerpo raw CORRECTAMENTE
  const rawBody = await buffer(req);
  console.log("[2/8] Longitud del cuerpo raw:", rawBody.length);

  // Verificar firma Stripe
  const signature = req.headers["stripe-signature"];
  if (!signature) {
    console.error("[2/8] Error: Falta header stripe-signature");
    return { statusCode: 400, body: JSON.stringify({ error: "Firma no presente" }) };
  }

  try {
    // Construir evento de Stripe
    console.log("[3/8] Verificando firma Stripe...");
    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(`[3/8] Evento verificado: ${stripeEvent.type}`);

    // Solo manejar checkout.session.completed
    if (stripeEvent.type !== "checkout.session.completed") {
      console.log(`[4/8] Evento no manejado: ${stripeEvent.type}`);
      return { statusCode: 200, body: JSON.stringify({ received: true }) };
    }

    // Procesar sesión de checkout
    console.log("[4/8] Procesando checkout.session.completed...");
    const session = stripeEvent.data.object;
    const metadata = {
      finalBuild: session.metadata?.finalBuild || "Sin configuración",
      customerEmail: session.customer_details?.email || "desconocido@vlcextreme.com",
      promoConsent: session.metadata?.promoConsent || "No especificado"
    };
    console.log("[4/8] Metadata:", JSON.stringify(metadata, null, 2));

    // Configurar transporte SMTP
    console.log("[5/8] Configurando transporte SMTP...");
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
      logger: true,
    });

    try {
      console.log("[5/8] Verificando conexión SMTP...");
      await transporter.verify();
      console.log("[5/8] Conexión SMTP verificada");
    } catch (smtpError) {
      console.error("[5/8] Error de conexión SMTP:", smtpError);
      return { statusCode: 500, body: JSON.stringify({ error: "Error SMTP" }) };
    }

    // Enviar email interno
    try {
      console.log("[6/8] Enviando email interno...");
      await transporter.sendMail({
        from: `"VLCExtreme" <${process.env.ZOHO_USER}>`, // Comillas corregidas
        to: process.env.ZOHO_USER,
        subject: "Nuevo pedido en VLCExtreme",
        text: `Nuevo pedido verificado:\n\n${metadata.finalBuild}\n\nEmail: ${metadata.customerEmail}\nPromociones: ${metadata.promoConsent}`,
      });
      console.log("[6/8] Email interno enviado");
    } catch (emailError) {
      console.error("[6/8] Error enviando email interno:", emailError);
    }

    // Enviar email al cliente
    if (metadata.customerEmail !== "desconocido@vlcextreme.com") {
      try {
        console.log("[7/8] Enviando email al cliente...");
        await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`, // Comillas corregidas
          to: metadata.customerEmail,
          subject: "Resumen de tu pedido en VLCExtreme",
          text: `¡Gracias por tu compra!\n\nConfiguración:\n${metadata.finalBuild}\n\nContactaremos pronto.\nConsentimiento promociones: ${metadata.promoConsent}`,
        });
        console.log("[7/8] Email al cliente enviado");
      } catch (emailError) {
        console.error("[7/8] Error enviando email al cliente:", emailError);
      }
    }

    console.log("[8/8] Proceso completado con éxito");
    return { statusCode: 200, body: JSON.stringify({ received: true }) };

  } catch (error) {
    console.error("[ERROR] Error crítico en webhook:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Error de procesamiento: ${error.message}` }),
    };
  }
}