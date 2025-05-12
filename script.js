const quotesKey = "***REMOVED***";
const affirmationsKey =
  "***REMOVED***";
const daily_quotes_text = document.querySelector(".daily-quote-text");
const new_quote_btn = document.querySelector(".new-quote-btn");
const affirm_text_1 = document.querySelector(".affirmation-text-1");
const affirm_text_2 = document.querySelector(".affirmation-text-2");
const affirm_text_3 = document.querySelector(".affirmation-text-3");
const generate_affirmation_btn = document.querySelector(".affirm-btn");
const zodiac_sign = document.querySelector(".zodiac-val");
async function getRandomQuotes() {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        ***REMOVED***: `***REMOVED*** ${quotesKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content:
              "Generate a short but powerful quote with theme of confidence",
          },
        ],
      }),
    }
  );
  const quote = await response.json();
  console.log(quote.choices[0].message.content);
  daily_quotes_text.textContent = quote.choices[0].message.content;
}
async function getZodiacAffirmations() {
  const zodiac = zodiac_sign.value;
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        ***REMOVED***: `***REMOVED*** ${affirmationsKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Generate three short but powerful affirmations for the zodiac sign ${zodiac} and add '~' after each and don't number them.`,
          },
        ],
      }),
    }
  );
  const affirmation = await response.json();
  const a1 = affirmation.choices[0].message.content;
  let affirm = a1.split("~");
  console.log(a1);
  affirm_text_1.textContent = affirm[0];
  affirm_text_2.textContent = affirm[1];
  affirm_text_3.textContent = affirm[2];
}
function createScratchCard(cardId, color) {
  const canvas = document.getElementById(cardId);
  const ctx = canvas.getContext("2d");
  const init = () => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 320, 320);
  };
  let isDragging = false;
  function scratchCard(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, 2 * Math.PI);
    ctx.fill();
  }
  function mouseDown(e) {
    isDragging = true;
    scratchCard(e.offsetX, e.offsetY);
  }
  function mouseMove(e) {
    if (isDragging) {
      let x, y;
      if (e.touches) {
        x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
        y = e.touches[0].clientY - canvas.getBoundingClientRect().top;
      } else {
        x = e.offsetX;
        y = e.offsetY;
      }
      scratchCard(x, y);
    }
  }
  function mouseUp() {
    isDragging = false;
  }
  canvas.addEventListener("mousedown", mouseDown);
  canvas.addEventListener("touchstart", mouseDown);
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("touchmove", mouseMove);
  canvas.addEventListener("mouseup", mouseUp);
  canvas.addEventListener("mouseup", mouseUp);
  canvas.addEventListener("touchend", mouseUp);
  init();
}
generate_affirmation_btn.addEventListener("click", getZodiacAffirmations);
new_quote_btn.addEventListener("click", getRandomQuotes);
createScratchCard("scratch-1", "#D9C4B1");
createScratchCard("scratch-2", "#D9C4B1");
createScratchCard("scratch-3", "#D9C4B1");
