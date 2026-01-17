let coins = 0;
let bunnies = [];
const maxBunnies = 150;

const quotes = [
  "Breathe in calm. Breathe out sparkle.",
  "Soft hearts grow gentle gardens.",
  "Let the pink blossoms guide your peace.",
  "Small moments can feel like magic.",
  "You are gentle, you are enough, you are calm."
];

const bunnyRarities = [
  { name: "Common", chance: 0.60 },
  { name: "Uncommon", chance: 0.25 },
  { name: "Rare", chance: 0.10 },
  { name: "Ultra Rare", chance: 0.04 },
  { name: "Legendary", chance: 0.01 }
];

function updateCoins() {
  document.getElementById("coins").innerText = coins;
}

function showQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").innerText = quote;
}

function plantFlower() {
  coins += 5;
  updateCoins();
  addGarden("🌷");
}

function feedRabbit() {
  coins += 10;
  updateCoins();
  addGarden("🥕");
}

function petRabbit() {
  coins += 2;
  updateCoins();
  addGarden("🐰");
}

function addGarden(item) {
  const garden = document.getElementById("gardenDisplay");
  const div = document.createElement("div");
  div.innerText = item;
  garden.appendChild(div);
}

function getRarity() {
  const rand = Math.random();
  let total = 0;
  for (let r of bunnyRarities) {
    total += r.chance;
    if (rand <= total) return r.name;
  }
  return "Common";
}

function buyBasket() {
  if (coins < 50) {
    alert("You need 50 pink coins!");
    return;
  }
  coins -= 50;
  updateCoins();

  const rarity = getRarity();
  const bunnyId = Math.floor(Math.random() * 1000);
  const bunnyName = prompt(`You got a ${rarity} bunny! Name it:`, "Pink Bunny");
  
  bunnies.push({ id: bunnyId, name: bunnyName, rarity });
  updateCollection();

  document.getElementById("bunnyResult").innerText = `You unlocked a ${rarity} bunny named ${bunnyName}!`;

  if (bunnies.length >= maxBunnies) {
    document.getElementById("certificate").style.display = "block";
  }
}

function updateCollection() {
  const list = document.getElementById("collectionList");
  list.innerHTML = "";
  bunnies.forEach(b => {
    const div = document.createElement("div");
    div.innerText = `${b.name} — ${b.rarity}`;
    list.appendChild(div);
  });
}

setInterval(showQuote, 5000);
updateCoins();
showQuote();
