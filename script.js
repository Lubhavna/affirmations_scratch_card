const API_KEY =
  "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const QuotesKey = "NVpT34kvJfXcJX8WHn40CA==cDKSFmdR7O1J2Y4a";
const daily_quotes_text = document.querySelector(".daily-quote-text");
const daily_quotes_author = document.querySelector(".daily-quote-author");
const new_quote_btn = document.querySelector(".new-quote-btn");
async function getRandomQuotes() {
  try {
    const Affirm_URL = `https://api.api-ninjas.com/v1/quotes`;
    const data = await fetch(Affirm_URL, {
      headers: {
        "X-Api-Key": QuotesKey,
      },
    });
    const res = await data.json();
    daily_quotes_text.textContent = `${res[0].quote} -`;
    daily_quotes_author.textContent = res[0].author;
  } catch (err) {
    console.log(err.message);
  }
}
async function getZodiacAffirmations(zodiac) {
  const res = await fetch(API_URL, {
    headers: {
      ***REMOVED***: `***REMOVED*** ${API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      model: "qwen/qwen3-1.7b:free",
      messages: [
        {
          role: "user",
          content: `Give me 3 short affirmations for a ${zodiac}`,
        },
      ],
    }),
  });
  const data = await res.json();
  console.log(data);
}
new_quote_btn.addEventListener("click", getRandomQuotes);
function createScratchCard(cardId, color) {
  const canvas = document.getElementById(cardId);
  const ctx = canvas.getContext("2d");
  const init = () => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 400, 320);
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

getZodiacAffirmations("Aries");
getRandomQuotes();
createScratchCard("scratch-1", "#D9C4B1");
createScratchCard("scratch-2", "#D9C4B1");
createScratchCard("scratch-3", "#D9C4B1");
