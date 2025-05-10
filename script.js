const canvas = document.querySelector(".scratch");
const ctx = canvas.getContext("2d");
const init = () => {
  let linearColor = ctx.createLinearGradient(0, 0, 135, 135);
  linearColor.addColorStop(0, "#f49ed4");
  linearColor.addColorStop(1, "#d50b8b");
  ctx.fillStyle = linearColor;
  ctx.fillRect(0, 0, 200, 200);
};
let isDragging = false;
function scratchCard(x, y) {
  console.log(4 * Math.PI);
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
