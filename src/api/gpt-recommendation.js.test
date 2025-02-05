import OpenAI from "openai"

export default async function handler(req, res) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  
  const { type, budget, purpose, additionalFeatures } = req.body
  const prompt = `Sugiere un PC para ${type}, con un presupuesto de ${budget}€, usado para ${purpose}. Debe incluir ${additionalFeatures.join(", ")}.`

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    })
    
    res.status(200).json(response.choices[0].message.content)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error en la recomendación de GPT" })
  }
}
