export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    // OpenAIエラーがあれば直接返す
    if (data.error) {
      return res.status(400).json({ reply: "OpenAIエラー: " + data.error.message });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    return res.status(500).json({ reply: "サーバーエラー: " + err.message });
  }
}
