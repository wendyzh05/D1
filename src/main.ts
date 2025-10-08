import "./style.css";
import flowerImage from "./flower.png";

const glow = document.createElement("div");
glow.classList.add("glow");
glow.style.position = "absolute";
glow.style.zIndex = "2";

const container = document.createElement("div");
container.className = "flower-container";
container.style.position = "relative";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.height = "100vh";
document.body.append(container);

const counterDiv: HTMLDivElement = document.createElement("div");
counterDiv.id = "counterDiv";
counterDiv.textContent = "Flowers Clicked: 0";

counterDiv.style.position = "absolute";
counterDiv.style.top = "16px";
counterDiv.style.left = "16px";
counterDiv.style.padding = "6px 12px";
counterDiv.style.borderRadius = "8px";
counterDiv.style.fontWeight = "600";
counterDiv.style.fontFamily = "sans-serif";
counterDiv.style.color = "#fff";
counterDiv.style.zIndex = "1000";
counterDiv.style.background = "rgba(255, 182, 193, 0.5)";
counterDiv.style.backdropFilter = "blur(4px)";
counterDiv.style.boxShadow = "0 0 10px rgba(255, 182, 193, 0.4)";

const flowerImg: HTMLImageElement = document.createElement("img");
flowerImg.src = flowerImage;
flowerImg.alt = "Flower";
flowerImg.className = "flower-image";
flowerImg.style.transform = "scale(0.3)";
flowerImg.style.zIndex = "2";
flowerImg.style.cursor = "pointer";

let clickCount = 0;
flowerImg.addEventListener("click", () => {
  clickCount += 1;
  counterDiv.textContent = `Flowers Clicked: ${clickCount}`;

  flowerImg.classList.remove("bounce");
  void flowerImg.offsetWidth;
  flowerImg.classList.add("bounce");
});

const btn: HTMLButtonElement = document.createElement("button");
btn.textContent = "🌸 Click Me";
btn.style.marginTop = "20px";
btn.style.padding = "6px 12px";
btn.style.fontSize = "20px";
btn.style.backgroundColor = "#fabbda";
btn.style.color = "white";
btn.style.border = "none";
btn.style.borderRadius = "8px";
btn.style.cursor = "pointer";
btn.style.zIndex = "3";
btn.addEventListener("click", () => {
  flowerImg.classList.remove("bounce");
  void flowerImg.offsetWidth;
  flowerImg.classList.add("bounce");
});

container.append(glow, flowerImg, counterDiv, btn);

console.log("hello");
