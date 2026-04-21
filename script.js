const DISHES = {
  "zerbian-simple": {
    name: "Zerbian Simple",
    price: "4,99 €",
    description: "Riz zerbian parfumé avec des morceaux de poulet tendres, dans un format simple, savoureux et généreux.",
    category: "single"
  },
  "zerbian-max": {
    name: "Zerbian Max",
    price: "6,99 €",
    description: "Une portion plus copieuse de zerbian avec davantage de poulet et une saveur encore plus intense.",
    category: "single"
  },
  "box-simple": {
    name: "Box Simple",
    price: "7,99 €",
    description: "Une formule complète avec zerbian, boisson et dessert, idéale pour un repas gourmand et équilibré.",
    category: "box"
  },
  "box-max": {
    name: "Box Max",
    price: "9,99 €",
    description: "La formule la plus généreuse avec zerbian, boisson et dessert, parfaite pour les grandes faims.",
    category: "box"
  },
  "daqoos": {
    name: "Daqoos",
    price: "1,00 €",
    description: "Sauce yéménite relevée à base de tomate et de piment, parfaite pour donner plus de caractère au plat.",
    category: "sauce-single"
  },
  "labneh": {
    name: "Labneh",
    price: "1,00 €",
    description: "Crème onctueuse au yaourt, douce et fraîche, idéale pour une touche légère et équilibrée.",
    category: "sauce-single"
  },
  "sahawiq": {
    name: "Sahawiq",
    price: "1,00 €",
    description: "Sauce verte épicée aux herbes fraîches, à l’ail et au piment, intense et pleine de fraîcheur.",
    category: "sauce-single"
  }
};

const OPTIONAL_DRINK_EXTRA = 1.00; // سعر المشروب للسامبل والماكسي
const EXTRA_SAUCE_PRICE = 0.50;    // كل صوص إضافي بعد أول واحد

function makeSvgDataUri(svg){
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
}

const DRINK_IMAGES = {
  cola: "assets/images/coca.webp",
  "cola-zero": "assets/images/colazero.png",
  "ice-tea": "assets/images/icetea.jpg",
  oasis: "assets/images/oasis.jpg"
};

const DRINKS = [
  { id: "cola", name: "Cola", image: DRINK_IMAGES["cola"] },
  { id: "cola-zero", name: "Cola Zero", image: DRINK_IMAGES["cola-zero"] },
  { id: "ice-tea", name: "Ice Tea", image: DRINK_IMAGES["ice-tea"] },
  { id: "oasis", name: "Oasis", image: DRINK_IMAGES["oasis"] }
];

const DESSERTS = [
  { id: "basbousa", name: "Basbousa" }
];

const SAUCES = [
  { id: "daqoos", name: "Daqoos" },
  { id: "labneh", name: "Labneh" },
  { id: "sahawiq", name: "Sahawiq" }
];

const intro = document.getElementById("intro");
const app = document.getElementById("app");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const modalOptions = document.getElementById("modalOptions");
const modalAlert = document.getElementById("modalAlert");
const addToCartBtn = document.getElementById("addToCartBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const whatsappBtn = document.getElementById("whatsappBtn");
const imageFrame = document.getElementById("imageFrame");
const hotspots = document.querySelectorAll(".hotspot");

let selectedDish = null;
let selectedConfig = null;
const cart = {};

function setAppHeight(){
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--app-h", `${vh}px`);
}

function syncHotspotArtwork(){
  if (!imageFrame) return;

  const frameRect = imageFrame.getBoundingClientRect();
  const frameW = Math.max(frameRect.width, 1);
  const frameH = Math.max(frameRect.height, 1);

  hotspots.forEach((btn, index) => {
    const left = btn.offsetLeft;
    const top = btn.offsetTop;

    btn.style.setProperty("--bg-w", `${frameW}px ${frameH}px`);
    btn.style.setProperty("--bg-wx", `${frameW}px`);
    btn.style.setProperty("--bg-hy", `${frameH}px`);
    btn.style.setProperty("--bg-x", `${-left}px`);
    btn.style.setProperty("--bg-y", `${-top}px`);

    const radius = getComputedStyle(btn).borderRadius || "18px";
    btn.style.setProperty("--piece-radius", radius);

    const delay = (index % 4) * 0.28;
    btn.style.animationDelay = `${delay}s`;
    btn.style.setProperty("--anim-delay", `${delay}s`);
    btn.style.setProperty("--piece-opacity", "1");
  });
}

function resetHotspotTilt(btn){
  btn.style.setProperty("--rx", "0deg");
  btn.style.setProperty("--ry", "0deg");
}

function handlePointerTilt(event, btn){
  const rect = btn.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const px = (x / rect.width) - 0.5;
  const py = (y / rect.height) - 0.5;

  const ry = (px * 4.2).toFixed(2);
  const rx = (py * -4.2).toFixed(2);

  btn.style.setProperty("--rx", `${rx}deg`);
  btn.style.setProperty("--ry", `${ry}deg`);
}

function parseEuro(value){
  return Number(
    String(value)
      .replace(/[^\d,.-]/g, "")
      .replace(",", ".")
  ) || 0;
}

function formatEuro(value){
  return `${value.toFixed(2).replace(".", ",")} €`;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, ch => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[ch]));
}

function getDishCategory(id){
  return DISHES[id]?.category || "";
}

function getDefaultConfig(id){
  const category = getDishCategory(id);

  if (category === "single"){
    return {
      drink: "",
      dessert: "",
      sauces: []
    };
  }

  if (category === "box"){
    return {
      drink: DRINKS[0].id,
      dessert: DESSERTS[0].id,
      sauces: [SAUCES[0].id]
    };
  }

  return {
    drink: "",
    dessert: "",
    sauces: []
  };
}

function getDrinkById(id){
  return DRINKS.find(item => item.id === id) || null;
}

function getDessertById(id){
  return DESSERTS.find(item => item.id === id) || null;
}

function getSauceById(id){
  return SAUCES.find(item => item.id === id) || null;
}

function renderDrinkOptions(required = false, selected = ""){
  const noneOption = required ? "" : `
    <label class="choice-item">
      <input class="choice-input" type="radio" name="drinkChoice" value="" ${selected === "" ? "checked" : ""}>
      <div class="choice-card">
        <div class="choice-main">
          <div class="choice-mark"></div>
          <div class="choice-thumb" style="display:grid;place-items:center;font-size:18px;">🚫</div>
          <div class="choice-text">
            <div class="choice-name">Sans boisson</div>
            <div class="choice-sub">Vous pouvez continuer sans choisir</div>
          </div>
        </div>
        <div class="choice-price">+0,00 €</div>
      </div>
    </label>
  `;

  const items = DRINKS.map(drink => {
    const priceText = required ? "Inclus" : `+${formatEuro(OPTIONAL_DRINK_EXTRA)}`;
    const subText = required ? "Choix obligatoire pour la box" : "Option supplémentaire payante";

    return `
      <label class="choice-item">
        <input class="choice-input" type="radio" name="drinkChoice" value="${drink.id}" ${selected === drink.id ? "checked" : ""}>
        <div class="choice-card">
          <div class="choice-main">
            <div class="choice-mark"></div>
            <img class="choice-thumb" src="${drink.image}" alt="${escapeHtml(drink.name)}">
            <div class="choice-text">
              <div class="choice-name">${escapeHtml(drink.name)}</div>
              <div class="choice-sub">${subText}</div>
            </div>
          </div>
          <div class="choice-price">${priceText}</div>
        </div>
      </label>
    `;
  }).join("");

  return `
    <div class="option-group">
      <div class="option-head">
        <div class="option-title">Boisson</div>
        <div class="option-badge">${required ? "Obligatoire" : "Option"}</div>
      </div>
      <p class="option-note">
        ${required
          ? "Choisissez une seule boisson pour votre box."
          : "Vous pouvez ajouter une boisson. Cette option augmente le prix."}
      </p>
      <div class="choice-list">
        ${noneOption}
        ${items}
      </div>
    </div>
  `;
}

function renderDessertOptions(selected = ""){
  return `
    <div class="option-group">
      <div class="option-head">
        <div class="option-title">Dessert</div>
        <div class="option-badge">Inclus</div>
      </div>
      <p class="option-note">
        Le dessert est obligatoire pour la box, sans coût supplémentaire.
      </p>
      <div class="choice-list">
        ${DESSERTS.map(dessert => `
          <label class="choice-item">
            <input class="choice-input" type="radio" name="dessertChoice" value="${dessert.id}" ${selected === dessert.id ? "checked" : ""}>
            <div class="choice-card">
              <div class="choice-main">
                <div class="choice-mark"></div>
                <div class="choice-thumb" style="display:grid;place-items:center;font-size:18px;">🍰</div>
                <div class="choice-text">
                  <div class="choice-name">${escapeHtml(dessert.name)}</div>
                  <div class="choice-sub">Dessert inclus dans la box</div>
                </div>
              </div>
              <div class="choice-price">Inclus</div>
            </div>
          </label>
        `).join("")}
      </div>
    </div>
  `;
}

function renderSauceOptions(selectedSauces = [], requiredAtLeastOne = false){
  return `
    <div class="option-group">
      <div class="option-head">
        <div class="option-title">Sauces</div>
        <div class="option-badge">1 gratuite</div>
      </div>
      <p class="option-note">
        Une sauce est gratuite. Chaque sauce supplémentaire coûte +${formatEuro(EXTRA_SAUCE_PRICE)}.
        ${requiredAtLeastOne ? " Pour la box, choisissez au moins une sauce." : " Pour le simple et le max, vous pouvez aussi choisir vos sauces ici."}
      </p>
      <div class="choice-list">
        ${SAUCES.map(sauce => `
          <label class="choice-item">
            <input class="choice-input" type="checkbox" name="sauceChoice" value="${sauce.id}" ${selectedSauces.includes(sauce.id) ? "checked" : ""}>
            <div class="choice-card">
              <div class="choice-main">
                <div class="choice-mark checkbox"></div>
                <div class="choice-thumb" style="display:grid;place-items:center;font-size:17px;">🥣</div>
                <div class="choice-text">
                  <div class="choice-name">${escapeHtml(sauce.name)}</div>
                  <div class="choice-sub">1 gratuite, puis supplément</div>
                </div>
              </div>
              <div class="choice-price">+0 / +0,50 €</div>
            </div>
          </label>
        `).join("")}
      </div>
      <div class="inline-summary" id="sauceSummary"></div>
    </div>
  `;
}

function renderModalOptions(id){
  const category = getDishCategory(id);
  const config = selectedConfig || getDefaultConfig(id);

  if (category === "single"){
    modalOptions.innerHTML = `
      ${renderDrinkOptions(false, config.drink)}
      ${renderSauceOptions(config.sauces, false)}
    `;
    renderSauceSummary(config.sauces);
    return;
  }

  if (category === "box"){
    modalOptions.innerHTML = `
      ${renderDrinkOptions(true, config.drink)}
      ${renderDessertOptions(config.dessert)}
      ${renderSauceOptions(config.sauces, true)}
    `;
    renderSauceSummary(config.sauces);
    return;
  }

  modalOptions.innerHTML = "";
}

function readConfigFromModal(id){
  const category = getDishCategory(id);
  const config = getDefaultConfig(id);

  if (category === "single"){
    const drinkEl = modal.querySelector('input[name="drinkChoice"]:checked');
    const sauceEls = [...modal.querySelectorAll('input[name="sauceChoice"]:checked')];
    config.drink = drinkEl ? drinkEl.value : "";
    config.sauces = sauceEls.map(el => el.value);
    return config;
  }

  if (category === "box"){
    const drinkEl = modal.querySelector('input[name="drinkChoice"]:checked');
    const dessertEl = modal.querySelector('input[name="dessertChoice"]:checked');
    const sauceEls = [...modal.querySelectorAll('input[name="sauceChoice"]:checked')];

    config.drink = drinkEl ? drinkEl.value : "";
    config.dessert = dessertEl ? dessertEl.value : "";
    config.sauces = sauceEls.map(el => el.value);

    return config;
  }

  return config;
}

function getExtrasTotal(id, config){
  const category = getDishCategory(id);
  let extras = 0;

  if ((category === "single" || category === "box") && config.drink){
    if (category === "single") {
      extras += OPTIONAL_DRINK_EXTRA;
    }
  }

  if (category === "single" || category === "box"){
    const extraSauceCount = Math.max((config.sauces || []).length - 1, 0);
    extras += extraSauceCount * EXTRA_SAUCE_PRICE;
  }

  return extras;
}

function getItemTotal(id, config){
  const base = parseEuro(DISHES[id].price);
  return base + getExtrasTotal(id, config);
}

function isModalSelectionValid(id, config){
  const category = getDishCategory(id);

  if (category === "single"){
    return true;
  }

  if (category === "box"){
    return Boolean(config.drink) && Boolean(config.dessert) && Array.isArray(config.sauces) && config.sauces.length > 0;
  }

  return true;
}

function renderSauceSummary(sauces = []){
  const summary = document.getElementById("sauceSummary");
  if (!summary) return;

  if (!sauces.length){
    summary.innerHTML = `<div class="summary-pill">Aucune sauce choisie</div><div class="summary-pill accent">Supplément sauces: Inclus</div>`;
    return;
  }

  const extraCount = Math.max(sauces.length - 1, 0);
  const extraPrice = extraCount * EXTRA_SAUCE_PRICE;
  const names = sauces.map(id => getSauceById(id)?.name).filter(Boolean);

  summary.innerHTML = `
    ${names.map(name => `<div class="summary-pill">${escapeHtml(name)}</div>`).join("")}
    <div class="summary-pill accent">
      Supplément sauces: ${extraPrice > 0 ? "+" + formatEuro(extraPrice) : "Inclus"}
    </div>
  `;
}

function updateModalState(){
  if (!selectedDish) return;

  selectedConfig = readConfigFromModal(selectedDish);
  const total = getItemTotal(selectedDish, selectedConfig);

  modalPrice.textContent = formatEuro(total);
  addToCartBtn.textContent = `Ajouter au panier • ${formatEuro(total)}`;

  const isValid = isModalSelectionValid(selectedDish, selectedConfig);
  addToCartBtn.disabled = !isValid;

  if (!isValid && getDishCategory(selectedDish) === "box"){
    modalAlert.textContent = "Veuillez choisir une boisson, un dessert et au moins une sauce pour continuer.";
    modalAlert.classList.add("show");
  } else {
    modalAlert.textContent = "";
    modalAlert.classList.remove("show");
  }

  renderSauceSummary(selectedConfig.sauces || []);
}

function buildSelectionLabel(id, config){
  const category = getDishCategory(id);
  const parts = [];

  if (config.drink){
    const drink = getDrinkById(config.drink);
    if (drink) {
      const extra = category === "single" ? ` (+${formatEuro(OPTIONAL_DRINK_EXTRA)})` : "";
      parts.push(`Boisson: ${drink.name}${extra}`);
    }
  }

  if (category === "box"){
    const dessert = getDessertById(config.dessert);
    if (dessert) parts.push(`Dessert: ${dessert.name}`);
  }

  if (config.sauces?.length){
    const sauceNames = config.sauces
      .map(sauceId => getSauceById(sauceId)?.name)
      .filter(Boolean)
      .join(", ");
    if (sauceNames) parts.push(`Sauces: ${sauceNames}`);
  }

  const extraSauceCount = Math.max((config.sauces || []).length - 1, 0);
  if (extraSauceCount > 0){
    parts.push(`Supplément sauces: +${formatEuro(extraSauceCount * EXTRA_SAUCE_PRICE)}`);
  }

  return parts.join(" • ");
}

function buildCartKey(id, config){
  const sauces = [...(config.sauces || [])].sort().join("+") || "none";
  return `${id}__drink:${config.drink || "none"}__dessert:${config.dessert || "none"}__sauces:${sauces}`;
}

function cloneConfig(config){
  return JSON.parse(JSON.stringify(config || {}));
}

setAppHeight();
window.addEventListener("resize", () => {
  setAppHeight();
  syncHotspotArtwork();
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    setAppHeight();
    syncHotspotArtwork();
  }, 120);
});

window.addEventListener("load", () => {
  setAppHeight();
  syncHotspotArtwork();

  setTimeout(() => {
    intro.classList.add("hide");
    app.classList.add("ready");
    syncHotspotArtwork();
  }, 2550);

  setTimeout(syncHotspotArtwork, 300);
  setTimeout(syncHotspotArtwork, 900);
});

function openModal(id, triggerEl){
  const item = DISHES[id];
  if (!item) return;

  selectedDish = id;
  selectedConfig = getDefaultConfig(id);

  hotspots.forEach(el => el.classList.remove("active"));
  if (triggerEl) triggerEl.classList.add("active");

  modalTitle.textContent = item.name;
  modalDesc.textContent = item.description;

  renderModalOptions(id);
  updateModalState();

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalOptions.innerHTML = "";
  modalAlert.textContent = "";
  modalAlert.classList.remove("show");
  selectedConfig = null;
  hotspots.forEach(el => el.classList.remove("active"));
}

hotspots.forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.id, btn));

  btn.addEventListener("touchstart", () => {
    btn.classList.add("active");
  }, { passive: true });

  btn.addEventListener("touchend", () => {
    setTimeout(() => btn.classList.remove("active"), 120);
  }, { passive: true });

  btn.addEventListener("pointermove", (e) => {
    if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
      handlePointerTilt(e, btn);
    }
  });

  btn.addEventListener("pointerleave", () => {
    resetHotspotTilt(btn);
  });

  btn.addEventListener("blur", () => {
    resetHotspotTilt(btn);
  });
});

modalOptions.addEventListener("change", () => {
  updateModalState();
});

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function renderCart(){
  const entries = Object.values(cart);
  const totalQty = entries.reduce((sum, entry) => sum + entry.qty, 0);
  cartCount.textContent = totalQty;

  if (!entries.length){
    cartItems.innerHTML = '<div class="cart-empty">Aucun article sélectionné.</div>';
    return;
  }

  cartItems.innerHTML = entries.map(entry => {
    const item = DISHES[entry.id];
    const summary = buildSelectionLabel(entry.id, entry.config);

    return `
      <div class="cart-item">
        ${item.name}
        ${summary ? ` — ${summary}` : ""}
        × ${entry.qty}
      </div>
    `;
  }).join("");
}

addToCartBtn.addEventListener("click", () => {
  if (!selectedDish) return;

  selectedConfig = readConfigFromModal(selectedDish);

  if (!isModalSelectionValid(selectedDish, selectedConfig)){
    updateModalState();
    return;
  }

  const key = buildCartKey(selectedDish, selectedConfig);
  const lineTotal = getItemTotal(selectedDish, selectedConfig);

  if (cart[key]){
    cart[key].qty += 1;
  } else {
    cart[key] = {
      id: selectedDish,
      config: cloneConfig(selectedConfig),
      qty: 1,
      lineTotal
    };
  }

  renderCart();
  pulseWhatsApp();
  closeModal();
});

function pulseWhatsApp(){
  whatsappBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.018)" },
      { transform: "scale(1)" }
    ],
    { duration: 340, easing: "ease-out" }
  );
}

whatsappBtn.addEventListener("click", () => {
  const entries = Object.values(cart);

  if (!entries.length){
    alert("Veuillez d’abord ajouter au moins un article au panier.");
    return;
  }

  const lines = entries.map((entry, index) => {
    const item = DISHES[entry.id];
    const summary = buildSelectionLabel(entry.id, entry.config);
    const unitTotal = formatEuro(entry.lineTotal);

    return [
      `${index + 1}. ${item.name} x${entry.qty}`,
      summary ? `   - ${summary}` : "",
      `   - Prix unitaire: ${unitTotal}`
    ].filter(Boolean).join("\n");
  });

  const grandTotal = entries.reduce((sum, entry) => sum + (entry.lineTotal * entry.qty), 0);

  const message =
`Bonjour Yamani Food,
Je souhaite commander :

${lines.join("\n\n")}

Total estimé : ${formatEuro(grandTotal)}

Merci !`;

  const phone = "33749773595";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

renderCart();