export async function onRequest(context) {
  const quotesKey = context.env.quotesKey;
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${quotesKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content:
              "Generate a random and unique each time, short, not more than 15 words, but powerful quote with themes of either happiness or self love.dont start wuth same words always",
          },
        ],
      }),
    }
  );
  const quote = await response.json();
  return new Response(
    JSON.stringify({ quote: quote.choices[0].message.content }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
