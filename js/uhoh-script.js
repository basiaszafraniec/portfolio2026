const win = document.querySelector(".window");
const topBar = document.querySelector(".top-bar");

let dragging = false;
let offsetX = 0;
let offsetY = 0;

topBar.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".x-div")) return;
    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.position = "fixed";
    topBar.style.cursor = "grabbing";
    e.preventDefault();
});

document.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    win.style.left = e.clientX - offsetX + "px";
    win.style.top  = e.clientY - offsetY + "px";
});

document.addEventListener("pointerup", () => {
    if (!dragging) return;
    dragging = false;
    topBar.style.cursor = "grab";

    // clamp so top bar stays on screen
    const rect = win.getBoundingClientRect();
    win.style.left = Math.min(Math.max(rect.left, -(rect.width * 0.8)), window.innerWidth  - rect.width * 0.2) + "px";
    win.style.top  = Math.min(Math.max(rect.top,  8), window.innerHeight - 38) + "px";
});