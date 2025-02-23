// src/api/stripeWebhook.js
// En este archivo manejamos el evento "checkout.session.completed" de Stripe
// y obtenemos la metadata con la build final.
//
// ⚠ OJO: Este ejemplo NO verifica la firma de Stripe (se salta la seguridad).
// Funciona para empezar a probar, pero no es la implementación recomendada en producción.

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido (solo POST)" });
    }
  
    try {
      // 1) Parse the incoming request body as JSON
      const event = JSON.parse(req.body);
  
      // 2) Check the type of the Stripe event
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
  
        // 3) Leer la metadata (finalBuild)
        //    En tu checkout.js, asegúrate de poner algo así:
        //    metadata: { finalBuild: "..." }
        //    para que aquí aparezca session.metadata.finalBuild
        const finalBuild = session.metadata?.finalBuild || "(No metadata)";
  
        // 4) Aquí ya puedes guardar la orden en BBDD, enviar email, etc.
        console.log("✅ checkout.session.completed recibido:");
        console.log("   Final Build:", finalBuild);
  
        // Por ejemplo, si quisieras obtener el email del cliente:
        // const customerEmail = session.customer_details?.email || "Desconocido";
        // console.log("   Email del cliente:", customerEmail);
  
        // Si quieres enviar un correo, llama a tu servicio de email,
        // o hazlo manualmente según tus necesidades.
  
        // Responde con un 200 OK
        return res.status(200).json({ received: true });
      }
  
      // Si no es el tipo 'checkout.session.completed'
      console.log(`Evento no manejado: ${event.type}`);
      return res.status(200).json({ received: true });
    } catch (error) {
      console.error("Error manejando el webhook:", error);
      return res.status(400).json({ error: "Error parsing Stripe webhook" });
    }
  }
  