// stripeWebhook.js
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req) {
  console.log("[1/6] 🚀 Webhook recibido. Método:", req.method);

  // Validar método HTTP
  if (req.method !== "POST") {
    console.error("[1/6] ❌ Método no permitido");
    return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  try {
    // Obtener datos del cuerpo (Netlify lo provee como Buffer)
    const rawBody = req.body;
    const signature = req.headers["stripe-signature"];
    
    console.log("[2/6] 📝 Longitud del cuerpo:", rawBody?.length || 0);
    
    if (!signature) {
      console.error("[2/6] ❌ Firma Stripe no encontrada");
      return { statusCode: 400, body: JSON.stringify({ error: "Firma no válida" }) };
    }

    // Verificar evento de Stripe
    console.log("[3/6] 🔍 Verificando firma Stripe...");
    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    console.log(`[3/6] ✅ Evento verificado: ${stripeEvent.type}`);

    // Manejar solo checkout completado
    if (stripeEvent.type !== "checkout.session.completed") {
      console.log(`[4/6] ⏭️ Evento ignorado: ${stripeEvent.type}`);
      return { statusCode: 200, body: JSON.stringify({ received: true }) };
    }

    // Extraer datos de la sesión
    const session = stripeEvent.data.object;
    const metadata = {
      finalBuild: session.metadata?.finalBuild || "Sin configuración",
      customerEmail: session.customer_details?.email || "desconocido@vlcextreme.com",
      promoConsent: session.metadata?.promoConsent || "No especificado"
    };
    
    console.log("[4/6] 📦 Metadata:", JSON.stringify(metadata, null, 2));

    // Configurar transporte SMTP
    console.log("[5/6] 📧 Configurando cliente de email...");
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
      logger: true
    });

    // Verificar conexión SMTP
    try {
      console.log("[5/6] 🔌 Probando conexión SMTP...");
      await transporter.verify();
      console.log("[5/6] ✅ Conexión SMTP exitosa");
    } catch (smtpError) {
      console.error("[5/6] ❌ Error SMTP:", smtpError);
      return { statusCode: 500, body: JSON.stringify({ error: "Error de servidor de email" }) };
    }

    // Enviar email interno
    try {
      console.log("[6/6] 📤 Enviando notificación interna...");
      await transporter.sendMail({
        from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
        to: process.env.ZOHO_USER,
        subject: "✅ Nuevo pedido en VLCExtreme",
        text: `Nuevo pedido verificado:\n\n${metadata.finalBuild}\n\nEmail: ${metadata.customerEmail}\nPromociones: ${metadata.promoConsent}`
      });
    } catch (emailError) {
      console.error("[6/6] ❌ Error email interno:", emailError);
    }

    // Enviar email al cliente
    if (metadata.customerEmail !== "desconocido@vlcextreme.com") {
      try {
        console.log("[6/6] 📩 Enviando confirmación al cliente...");
        await transporter.sendMail({
          from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
          to: metadata.customerEmail,
          subject: "🚀 Confirmación de tu pedido en VLCExtreme",
          text: `¡Gracias por tu compra!\n\nTu configuración:\n${metadata.finalBuild}\n\nNos pondremos en contacto contigo pronto.\nConsentimiento promociones: ${metadata.promoConsent}`
        });
      } catch (emailError) {
        console.error("[6/6] ❌ Error email cliente:", emailError);
      }
    }

    console.log("[6/6] 🎉 Proceso completado con éxito");
    return { statusCode: 200, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error("🛑 Error crítico:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Error de procesamiento: ${error.message}` })
    };
  }
}