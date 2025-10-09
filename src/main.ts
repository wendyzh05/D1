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
counterDiv.textContent = "Flower petals: 0";
counterDiv.style.position = "absolute";
counterDiv.style.top = "540px";
counterDiv.style.left = "405px";
counterDiv.style.fontSize = "25px";
counterDiv.style.padding = "6px 12px";
counterDiv.style.borderRadius = "8px";
counterDiv.style.fontWeight = "600";
counterDiv.style.fontFamily = "sans-serif";
counterDiv.style.color = "#000000ff";
counterDiv.style.zIndex = "1000";
counterDiv.style.background = "rgba(255, 182, 193, 0.5)";
counterDiv.style.backdropFilter = "blur(4px)";
counterDiv.style.boxShadow = "0 0 10px rgba(233, 164, 197, 0.4)";

const upgradeBtn = document.createElement("button");
upgradeBtn.textContent = "Buy Daisies (10 petals)";
upgradeBtn.style.position = "absolute";
upgradeBtn.style.top = "100px";
upgradeBtn.style.left = "100px";
upgradeBtn.style.zIndex = "1001";
upgradeBtn.style.marginTop = "15px";
upgradeBtn.style.padding = "10px 18px";
upgradeBtn.style.fontSize = "18px";
upgradeBtn.style.border = "none";
upgradeBtn.style.borderRadius = "8px";
upgradeBtn.style.backgroundColor = "#ffb6c1";
upgradeBtn.style.color = "#fff";
upgradeBtn.style.cursor = "pointer";
upgradeBtn.style.boxShadow = "0 0 10px rgba(255, 182, 193, 0.4)";

const clickText = document.createElement("div");
clickText.textContent = "Click 🌸 !";
clickText.style.position = "absolute";
clickText.style.marginTop = "10px";
clickText.style.top = "150px";
clickText.style.left = "465px";
clickText.style.fontSize = "22px";
clickText.style.fontWeight = "600";
clickText.style.color = "#ffffffff";
clickText.style.textShadow = "0 0 6px rgba(61, 47, 50, 0.6)";
clickText.style.zIndex = "3";

const flowerImg: HTMLImageElement = document.createElement("img");
flowerImg.src = flowerImage;
flowerImg.alt = "Flower";
flowerImg.className = "flower-image";
flowerImg.style.transform = "scale(0.3)";
flowerImg.style.zIndex = "2";
flowerImg.style.cursor = "pointer";

let clickCount = 0;
let growthRate = 0;
let lastTime = performance.now();

flowerImg.addEventListener("click", () => {
  clickCount += 1;
  counterDiv.textContent = `Flower petals: ${clickCount}`;

  flowerImg.classList.remove("bounce");
  void flowerImg.offsetWidth;
  flowerImg.classList.add("bounce");
});

upgradeBtn.addEventListener("click", () => {
  if (clickCount >= 10) {
    clickCount -= 10;
    growthRate += 1;
    counterDiv.textContent = `Flower petals: ${Math.floor(clickCount)}`;
  }
});

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  clickCount += growthRate * deltaTime;
  counterDiv.textContent = `Flower petals: ${Math.floor(clickCount)}`;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

container.append(glow, flowerImg, clickText, counterDiv);
document.body.append(upgradeBtn);
