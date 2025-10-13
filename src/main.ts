import "./style.css";
import flowerImage from "./flower.png";
import daisyImage from "./daisy.png";
import tulipImage from "./tulip.png";
import roseImage from "./rose.png";

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

const rateDiv = document.createElement("div");
rateDiv.textContent = `Growth rate: ${growthRate.toFixed(1)} petals/sec`;
rateDiv.style.position = "absolute";
rateDiv.style.top = "593px";
rateDiv.style.left = "385px";
rateDiv.style.fontSize = "20px";
rateDiv.style.color = "#000000ff";
rateDiv.style.fontWeight = "600";

type UpgradeID = "A" | "B" | "C";

const upgradesOwned: Record<UpgradeID, number> = {
  A: 0,
  B: 0,
  C: 0,
};

const upgrades: { id: UpgradeID; name: string; cost: number; rate: number }[] =
  [
    { id: "A", name: "Buy Daisies", cost: 10, rate: 0.1 },
    { id: "B", name: "Buy Tulips", cost: 100, rate: 2.0 },
    { id: "C", name: "Buy Roses", cost: 1000, rate: 50.0 },
  ];

const upgradeContainer = document.createElement("div");
upgradeContainer.style.position = "absolute";
upgradeContainer.style.top = "100px";
upgradeContainer.style.left = "100px";
upgradeContainer.style.display = "flex";
upgradeContainer.style.flexDirection = "column";
upgradeContainer.style.gap = "40px";

upgrades.forEach((u) => {
  const btn = document.createElement("button");
  btn.textContent = `${u.name} (${u.cost} petals) — Owned: 0`;
  Object.assign(btn.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "15px",
    width: "340px",
    height: "100px",
    padding: "10px 20px",
    fontSize: "18px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#ffb6c1",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(255, 182, 193, 0.4)",
    textAlign: "left",
  });

  const img = document.createElement("img");
  img.alt = u.name;
  img.style.width = "60px";
  img.style.height = "60px";
  img.style.objectFit = "contain";

  if (u.id === "A") img.src = daisyImage;
  if (u.id === "B") img.src = tulipImage;
  if (u.id === "C") img.src = roseImage;

  const textSpan = document.createElement("span");
  textSpan.textContent = `${u.name} (${u.cost} petals) — Owned: 0`;

  btn.textContent = "";
  btn.append(img, textSpan);

  btn.addEventListener("click", () => {
    if (clickCount >= u.cost) {
      clickCount -= u.cost;
      growthRate += u.rate;
      upgradesOwned[u.id]++;
      u.cost *= 1.15;
      textSpan.textContent = `${u.name} (${
        u.cost.toFixed(1)
      } petals) — Owned: ${upgradesOwned[u.id]}`;
      rateDiv.textContent = `Growth rate: ${growthRate.toFixed(1)} petals/sec`;
      counterDiv.textContent = `Flower petals: ${Math.floor(clickCount)}`;
    }
  });

  upgradeContainer.append(btn);
});

flowerImg.addEventListener("click", () => {
  clickCount += 1;
  counterDiv.textContent = `Flower petals: ${clickCount}`;

  flowerImg.classList.remove("bounce");
  void flowerImg.offsetWidth;
  flowerImg.classList.add("bounce");
});

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  clickCount += growthRate * deltaTime;
  counterDiv.textContent = `Flower petals: ${Math.floor(clickCount)}`;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

container.append(glow, flowerImg, clickText, counterDiv, rateDiv);
document.body.append(upgradeContainer);
