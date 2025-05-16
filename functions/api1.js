export async function onRequest(context) {
  const { request, env } = context;
  const affirmationsKey = context.env.affirmationsKey;
  const url = new URL(request.url);
  const zodiac = url.searchParams.get("zodiac") || "default";
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${affirmationsKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Generate three short(not more than 15 words), powerful affirmations for the zodiac sign ${zodiac} and add '~' after each and don't number them.`,
          },
        ],
      }),
    }
  );
  const affirmation = await response.json();
  return new Response(
    JSON.stringify({ affirmation: affirmation.choices[0].message.content }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
