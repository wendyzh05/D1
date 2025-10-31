//Import images
import "./style.css";
import flowerImage from "./flower.png";
import daisyImage from "./daisy.png";
import tulipImage from "./tulip.png";
import roseImage from "./rose.png";
import sunfImage from "./sunflower.png";
import cherryImage from "./cherry.png";

//Data
interface Item {
  name: string;
  cost: number;
  rate: number;
  image: string;
}

const availableItems: Item[] = [
  { name: "Daisy", cost: 10, rate: 0.1, image: daisyImage },
  { name: "Tulip", cost: 100, rate: 2, image: tulipImage },
  { name: "Rose", cost: 1000, rate: 50, image: roseImage },
  { name: "Sunflower", cost: 5000, rate: 100, image: sunfImage },
  { name: "Cherry", cost: 10000, rate: 250, image: cherryImage },
];

//Function
function createUpgradeButton(item: Item): HTMLButtonElement {
  const button = document.createElement("button");

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  img.style.width = "60px";
  img.style.height = "60px";
  img.style.objectFit = "contain";

  const upgradeLabel = document.createElement("span");
  upgradeLabel.textContent = `${item.name} (${item.cost} petals) — Owned: 0`;

  button.classList.add("upgrade-button");

  button.append(img, upgradeLabel);
  return button;
}

//DOM setup
const glow = document.createElement("div");
glow.classList.add("glow");
glow.style.position = "absolute";
glow.style.zIndex = "2";

// Flower container
const container = document.createElement("div");
container.className = "flower-container";
container.style.position = "relative";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.height = "100vh";
document.body.append(container);

// Counter
const counterDiv: HTMLDivElement = document.createElement("div");
counterDiv.id = "counterDiv";
counterDiv.textContent = "Flower petals: 0";
Object.assign(counterDiv.style, {
  position: "absolute",
  top: "540px",
  left: "405px",
  fontSize: "25px",
  padding: "6px 12px",
  borderRadius: "8px",
  fontWeight: "600",
  fontFamily: "sans-serif",
  color: "#000000ff",
  zIndex: "1000",
  background: "rgba(255, 182, 193, 0.5)",
  backdropFilter: "blur(4px)",
  boxShadow: "0 0 10px rgba(233, 164, 197, 0.4)",
});

// Click text
const clickText = document.createElement("div");
clickText.textContent = "Click 🌸 !";
Object.assign(clickText.style, {
  position: "absolute",
  marginTop: "10px",
  top: "150px",
  left: "465px",
  fontSize: "22px",
  fontWeight: "600",
  color: "#ffffffff",
  textShadow: "0 0 6px rgba(61, 47, 50, 0.6)",
  zIndex: "3",
});

// Flower image
const flowerImg: HTMLImageElement = document.createElement("img");
flowerImg.src = flowerImage;
flowerImg.alt = "Flower";
flowerImg.className = "flower-image";
Object.assign(flowerImg.style, {
  transform: "scale(0.3)",
  zIndex: "2",
  cursor: "pointer",
});

// Upgrade display
const growthRateDisplay = document.createElement("div");
let clickCount = 0;
let growthRate = 0;
growthRateDisplay.textContent = `Growth rate: ${
  growthRate.toFixed(1)
} petals/sec`;
Object.assign(growthRateDisplay.style, {
  position: "absolute",
  top: "593px",
  left: "385px",
  fontSize: "20px",
  color: "#000000ff",
  fontWeight: "600",
});

// Upgrade container
const upgradeContainer = document.createElement("div");
Object.assign(upgradeContainer.style, {
  position: "absolute",
  top: "50px",
  left: "100px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
});

const itemsOwned: Record<string, number> = {};
availableItems.forEach((item) => (itemsOwned[item.name] = 0));

// Create and append upgrade buttons
availableItems.forEach((item) => {
  const button = createUpgradeButton(item);
  upgradeContainer.append(button);

  button.addEventListener("click", () => {
    if (clickCount >= item.cost) {
      clickCount -= item.cost;
      growthRate += item.rate;
      itemsOwned[item.name]++;
      item.cost *= 1.15;

      const label = button.querySelector("span")!;
      label.textContent = `${item.name} (${
        item.cost.toFixed(1)
      } petals) — Owned: ${itemsOwned[item.name]}`;
      growthRateDisplay.textContent = `Growth rate: ${
        growthRate.toFixed(1)
      } petals/sec`;
      counterDiv.textContent = `Flower petals: ${Math.floor(clickCount)}`;
    }
  });
});

//unclickable upgrades inspired by https://github.com/t4ylo/cmpm-121-25-d1-taylorpearce
function updateUpgradeButtons() {
  const buttons = upgradeContainer.querySelectorAll("button");
  buttons.forEach((button, index) => {
    const item = availableItems[index];
    const label = button.querySelector("span")!;
    if (clickCount < item.cost) {
      // Lock state
      button.disabled = true;
      button.classList.add("locked");
      button.title = `Locked — need ${
        Math.ceil(item.cost - clickCount)
      } more petals`;
    } else {
      // Unlock state
      button.disabled = false;
      button.classList.remove("locked");
      button.title = `Buy ${item.name}`;
    }
    // Update label with cost and ownership
    label.textContent = `${item.name} (${
      item.cost.toFixed(1)
    } petals) — Owned: ${itemsOwned[item.name]}`;
  });
}

//number floating when clicking (inspired by https://github.com/inyoo403/D1.a )
function showFloatingText(amount: number, x: number, y: number) {
  const el = document.createElement("div");
  el.className = "floating-text";
  el.textContent = `+${amount.toFixed(1)}`;

  const rect = container.getBoundingClientRect();
  el.style.left = `${x - rect.left}px`;
  el.style.top = `${y - rect.top}px`;
  container.appendChild(el);

  el.addEventListener("animationend", () => el.remove());
}

//Game Interaction
flowerImg.addEventListener("click", (ev) => {
  clickCount += 1;
  counterDiv.textContent = `Flower petals: ${clickCount}`;

  flowerImg.classList.remove("bounce");
  void flowerImg.offsetWidth;
  flowerImg.classList.add("bounce");
  const rect = flowerImg.getBoundingClientRect();
  const x = ev.clientX ?? rect.left + Math.random() * rect.width;
  const y = ev.clientY ?? rect.top + Math.random() * rect.height;
  showFloatingText(1, x, y);
});

let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  clickCount += growthRate * deltaTime;
  counterDiv.textContent = `Flower petals: ${Math.floor(clickCount)}`;
  updateUpgradeButtons();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

// Append everything to DOM
container.append(glow, flowerImg, clickText, counterDiv, growthRateDisplay);
document.body.append(upgradeContainer);
