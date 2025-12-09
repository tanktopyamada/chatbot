export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: message
    }),
  });

  const data = await response.json();

  // 新API形式：output_text がある
  const reply = data.output_text?.[0] || "エラー：応答が取得できませんでした";

  res.status(200).json({ reply });
}
