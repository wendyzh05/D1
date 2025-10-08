import "./style.css";
import flowerImage from "./flower.png";

const glow = document.createElement("div");
glow.classList.add("glow");

const container = document.createElement("div");
container.className = "flower-container";
document.body.append(container);

const counterDiv = document.createElement("div");
counterDiv.className = "click-counter";
counterDiv.textContent = "Clicks: 0";
counterDiv.style.cssText = `
  position: absolute;
  top: 10px;
  left: 160px;
  font-size: 18px;
  color: #5b21b6;
  font-weight: bold;
  pointer-events: none;
  user-select: none;
`;

const flowerImg = document.createElement("img");
flowerImg.src = flowerImage;
flowerImg.alt = "Flower";
flowerImg.className = "flower-image";
flowerImg.style.transform = "scale(0.3)";

container.append(glow, flowerImg, counterDiv);


let clickCount = 0;
flowerImg.addEventListener("click", () => {

  console.log("Flower clicked! 🌸");
  clickCount++;
  counterDiv.textContent = `Clicks: ${clickCount}`;

  console.log("Flower clicked! 🌸");
  flowerImg.classList.remove("bounce");
  void flowerImg.offsetWidth;
  flowerImg.classList.add("bounce");

  
});

const btn = document.createElement("button");
btn.textContent = "🌸 Pet Me";
btn.style.marginTop = "10px";
btn.style.padding = "6px 12px";
btn.style.fontSize = "12px";
btn.style.backgroundColor = "#fabbdaff";
btn.style.color = "white";
btn.style.border = "none";
btn.style.borderRadius = "8px";
btn.style.cursor = "pointer";
btn.addEventListener("click", () => {
  flowerImg.classList.remove("bounce");
  void flowerImg.offsetWidth;
  flowerImg.classList.add("bounce");
});
container.appendChild(btn);

container.appendChild(glow);
container.appendChild(flowerImg);
container.appendChild(counterDiv);
