import "./style.css";
import flowerImage from "./flower.png";

const glow = document.createElement("div");
glow.classList.add("glow");

const container = document.createElement("div");
container.className = "flower-container";
document.body.append(container);

const flowerImg = document.createElement("img");
flowerImg.src = flowerImage;
flowerImg.alt = "Flower";
flowerImg.className = "flower-image";
container.append(flowerImg);
flowerImg.style.transform = 'scale(0.3)';


flowerImg.addEventListener("click", () => {
  console.log("Flower clicked! 🌸");
  flowerImg.classList.remove("bounce");
  void flowerImg.offsetWidth;
  flowerImg.classList.add("bounce");
});

container.appendChild(glow);
container.appendChild(flowerImg);
