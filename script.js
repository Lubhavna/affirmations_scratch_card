const daily_quotes_text = document.querySelector(".daily-quote-text");
const new_quote_btn = document.querySelector(".new-quote-btn");
const affirm_text_1 = document.querySelector(".affirmation-text-1");
const affirm_text_2 = document.querySelector(".affirmation-text-2");
const affirm_text_3 = document.querySelector(".affirmation-text-3");
const generate_affirmation_btn = document.querySelector(".affirm-btn");
const zodiac_container = document.querySelector(".zodiac");
const zodiac_sign = document.querySelector(".zodiac-val");
const zodiac_img = document.querySelector(".zodiac-symbol");
const ready_text = document.querySelector(".ready");
const canvas_container = document.querySelectorAll(".scratch-card");
async function getRandomQuotes() {
  const response = await fetch("/api");
  const quote = await response.json();
  daily_quotes_text.textContent = quote.quote;
  console.log(quote.quote);
}
function clearCard() {
  zodiac_img.src = "";
  zodiac_img.style.display = "none";
  affirm_text_1.textContent = "";
  affirm_text_2.textContent = "";
  affirm_text_3.textContent = "";
  ready_text.textContent = "";
  canvas_container.forEach((container) => {
    const c = document.querySelector(".canvas");
    if (c) {
      c.remove();
    }
  });
}
async function getZodiacAffirmations() {
  clearCard();
  affirm_text_1.textContent = "Loading";
  affirm_text_2.textContent = "Loading";
  affirm_text_3.textContent = "Loading";
  const zodiac = zodiac_sign.value;
  const response = await fetch(`/api1?zodiac=${encodeURIComponent(zodiac)}`);
  const affirmation = await response.json();
  console.log(affirmation.affirmation);
  const a1 = affirmation.affirmation;
  let affirm = a1.split("~");
  if (affirmation) {
    zodiac_img.setAttribute("src", `./images/${zodiac.toLowerCase()}.png`);
    zodiac_img.style.display = "block";
    affirm_text_1.textContent = affirm[0];
    affirm_text_2.textContent = affirm[1];
    affirm_text_3.textContent = affirm[2];
    console.log(affirm_text_1);
    console.log(affirm_text_2);
    console.log(affirm_text_3);
    createScratchCard("#D9C4B1");
    ready_text.textContent =
      "Your affirmations are ready. Scratch the cards below!!!";
  }
}
function createScratchCard(color) {
  canvas_container.forEach((container) => {
    const canvas = document.createElement("canvas");
    canvas.classList.add("canvas");
    container.appendChild(canvas);
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
    canvas.addEventListener("touchend", mouseUp);
    init();
  });
}
generate_affirmation_btn.addEventListener("click", getZodiacAffirmations);
new_quote_btn.addEventListener("click", getRandomQuotes);
getRandomQuotes();
