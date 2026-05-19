const DISHES = {
  "zerbian-simple": {
    name: "Zerbian Simple",
    price: "4,99 â‚¬",
    description: "Riz zerbian parfumÃ© avec des morceaux de poulet tendres, dans un format simple, savoureux et gÃ©nÃ©reux.",
    category: "single"
  },
  "zerbian-max": {
    name: "Zerbian Max",
    price: "6,99 â‚¬",
    description: "Une portion plus copieuse de zerbian avec davantage de poulet et une saveur encore plus intense.",
    category: "single"
  },
  "box-simple": {
    name: "Box Simple",
    price: "7,99 â‚¬",
    description: "Une formule complÃ¨te avec zerbian, boisson et dessert, idÃ©ale pour un repas gourmand et Ã©quilibrÃ©.",
    category: "box"
  },
  "box-max": {
    name: "Box Max",
    price: "9,99 â‚¬",
    description: "La formule la plus gÃ©nÃ©reuse avec zerbian, boisson et dessert, parfaite pour les grandes faims.",
    category: "box"
  },
  "daqoos": {
    name: "Basbas",
    price: "1,00 â‚¬",
    description: "Sauce au piment vert, citron, sÃ©same et fromage, fraÃ®che, relevÃ©e et pleine de caractÃ¨re.",
    category: "sauce-single"
  },
  "labneh": {
    name: "Tahina",
    price: "1,00 â‚¬",
    description: "Sauce onctueuse Ã  base de tahina, yaourt, huile dâ€™olive, menthe, ail, vinaigre, poivre noir et sel.",
    category: "sauce-single"
  },
  "sahawiq": {
    name: "Sahawiq",
    price: "1,00 â‚¬",
    description: "Sauce Ã©picÃ©e Ã  base de tomates, piment vert, ail, sel et fromage, au goÃ»t intense et savoureux.",
    category: "sauce-single"
  }
};

const OPTIONAL_DRINK_EXTRA = 1.50; // Ø³Ø¹Ø± Ø§Ù„Ù…Ø´Ø±ÙˆØ¨ Ù„Ù„Ø³Ø§Ù…Ø¨Ù„ ÙˆØ§Ù„Ù…Ø§ÙƒØ³ÙŠ
const EXTRA_SAUCE_PRICE = 0.50;    // ÙƒÙ„ ØµÙˆØµ Ø¥Ø¶Ø§ÙÙŠ Ø¨Ø¹Ø¯ Ø£ÙˆÙ„ ÙˆØ§Ø­Ø¯
const EXTRA_DESSERT_PRICE = 2.00;  // Ø£ÙˆÙ„ Ø­Ù„Ø§ Ù…Ø¬Ø§Ù†ÙŠ Ø«Ù… ÙƒÙ„ Ù‚Ø·Ø¹Ø© Ø¥Ø¶Ø§ÙÙŠØ© 1â‚¬
const DELIVERY_PRICE = 2.00;

function makeSvgDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
}

const DRINK_IMAGES = {
  cola: "assets/images/coca.png",
  "cola-zero": "assets/images/colazero.png",
  "ice-tea": "assets/images/icetea.png",
  oasis: "assets/images/oasis.png",
  colapp: "assets/images/cola-palestine.png"
};

const BOX_PREVIEW_IMAGES = {
  "box-simple": "assets/images/BOXSIMPLE.jpeg",
  "box-max": "assets/images/BOXMAX.jpeg"
};

const DRINKS = [
  { id: "cola", name: "Cola", image: DRINK_IMAGES["cola"] },
  { id: "cola-zero", name: "Cola Zero", image: DRINK_IMAGES["cola-zero"] },
  { id: "ice-tea", name: "Ice Tea", image: DRINK_IMAGES["ice-tea"] },
  { id: "oasis", name: "Oasis", image: DRINK_IMAGES["oasis"] },
  { id: "colapp", name: "Cola Palestine", image: DRINK_IMAGES["colapp"] }
];

const DESSERTS = [
  {
    id: "basbousa",
    name: "Basbousa",
    description: "GÃ¢teau oriental traditionnel prÃ©parÃ© avec crÃ¨me, Å“ufs, sucre, noix de coco, semoule, huile et lait concentrÃ©, Ã  la texture fondante et gÃ©nÃ©reuse."
  }
];

const SAUCES = [
  { id: "daqoos", name: "Basbas" },
  { id: "labneh", name: "Tahina" },
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
const previewModal = document.getElementById("previewModal");
const previewImage = document.getElementById("previewImage");
const previewCloseBtn = document.getElementById("previewCloseBtn");
const previewContinueBtn = document.getElementById("previewContinueBtn");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutAlert = document.getElementById("checkoutAlert");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");
const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
const deliveryFields = document.getElementById("deliveryFields");
const orderTypeInputs = document.querySelectorAll('input[name="orderType"]');
const dateCmd = document.getElementById("dateCmd");
const timeCmd = document.getElementById("timeCmd");
const addr = document.getElementById("addr");
const zip = document.getElementById("zip");
const city = document.getElementById("city");
const planningGroup = document.getElementById("planningGroup");
const todayTimeGroup = document.getElementById("todayTimeGroup");
const timeNowCmd = document.getElementById("timeNowCmd");
const orderStatusModal = document.getElementById("orderStatusModal");
const orderStatusTitle = document.getElementById("orderStatusTitle");
const orderStatusText = document.getElementById("orderStatusText");
const continueNowBtn = document.getElementById("continueNowBtn");
const planLaterBtn = document.getElementById("planLaterBtn");
const deliveryZoneModal = document.getElementById("deliveryZoneModal");
const closeDeliveryZoneBtn = document.getElementById("closeDeliveryZoneBtn");

let selectedDish = null;
let selectedConfig = null;
let hasShownOpeningStatusModal = false;
const cart = {};

function setAppHeight() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--app-h", `${vh}px`);
}

function syncHotspotArtwork() {
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

function resetHotspotTilt(btn) {
  btn.style.setProperty("--rx", "0deg");
  btn.style.setProperty("--ry", "0deg");
}

function handlePointerTilt(event, btn) {
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

function parseEuro(value) {
  return Number(
    String(value)
      .replace(/[^\d,.-]/g, "")
      .replace(",", ".")
  ) || 0;
}

function formatEuro(value) {
  return `${value.toFixed(2).replace(".", ",")} â‚¬`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

function getDishCategory(id) {
  return DISHES[id]?.category || "";
}

function getDefaultConfig(id) {
  const category = getDishCategory(id);

  if (category === "single") {
    return {
      drink: {},
      dessert: {},
      sauces: {}
    };
  }

  if (category === "box") {
    return {
      drink: {},
      dessert: {},
      sauces: {}
    };
  }

  return {
    drink: {},
    dessert: {},
    sauces: {}
  };
}

function getDrinkById(id) {
  return DRINKS.find(item => item.id === id) || null;
}

function getDessertById(id) {
  return DESSERTS.find(item => item.id === id) || null;
}

function getSauceById(id) {
  return SAUCES.find(item => item.id === id) || null;
}

function renderDrinkOptions(required = false, selected = {}) {
  return `
    <div class="option-group sauce-group">
      <div class="option-head">
        <div class="option-title">Boissons</div>
        <div class="option-badge">${required ? "1 incluse" : "+1,50 â‚¬"}</div>
      </div>

      <p class="option-note">
        ${required
      ? "1 boisson est incluse. Chaque boisson supplÃ©mentaire coÃ»te +1,50 â‚¬."
      : "Ajoutez la quantitÃ© souhaitÃ©e. Chaque boisson coÃ»te +1,50 â‚¬."}
      </p>

      <div class="sauce-list">
        ${DRINKS.map((drink) => `
          <div class="sauce-row">
            <div class="sauce-info">
              <img class="choice-thumb" src="${drink.image}" alt="${escapeHtml(drink.name)}">

              <div class="sauce-text">
                <div class="sauce-name">${escapeHtml(drink.name)}</div>
                <div class="sauce-sub">Ajoutez la quantitÃ© souhaitÃ©e</div>
              </div>
            </div>

            <div class="qty-stepper">
              <button type="button" class="qty-btn" onclick="changeDrinkQty('${drink.id}', -1)">âˆ’</button>

              <span class="qty-value" id="drink-qty-${drink.id}">
                ${selected[drink.id] || 0}
              </span>

              <button type="button" class="qty-btn qty-btn-plus" onclick="changeDrinkQty('${drink.id}', 1)">+</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderDessertOptions(selectedDesserts = {}) {
  const isBox = getDishCategory(selectedDish) === "box";
  const dessertBadge = isBox ? "1 inclus" : "+2,00 â‚¬";
  const dessertNote = isBox
    ? "1 dessert inclus. Chaque dessert supplÃ©mentaire coÃ»te +2,00 â‚¬."
    : "Chaque dessert coÃ»te +2,00 â‚¬.";

  return `
    <div class="option-group sauce-group">
      <div class="option-head">
        <div class="option-title">Dessert</div>
        <div class="option-badge">${dessertBadge}</div>
      </div>

      <p class="option-note">
        ${dessertNote}
      </p>

      <div class="sauce-list">
        ${DESSERTS.map((dessert) => `
          <div class="sauce-row">
            <div class="sauce-info">
              <div class="sauce-icon">ðŸ°</div>

              <div class="sauce-text">
                <div class="sauce-name">${escapeHtml(dessert.name)}</div>
                <div class="sauce-sub">Ajoutez la quantitÃ© souhaitÃ©e</div>
              </div>
            </div>

            <div class="qty-stepper">
              <button
                type="button"
                class="qty-btn"
                onclick="changeDessertQty('${dessert.id}', -1)"
                aria-label="Diminuer ${escapeHtml(dessert.name)}"
              >
                âˆ’
              </button>

              <span
                class="qty-value"
                id="dessert-qty-${dessert.id}"
              >${selectedDesserts[dessert.id] || 0}</span>

              <button
                type="button"
                class="qty-btn qty-btn-plus"
                onclick="changeDessertQty('${dessert.id}', 1)"
                aria-label="Augmenter ${escapeHtml(dessert.name)}"
              >
                +
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="inline-summary sauce-summary-wrap" id="dessertSummary"></div>
    </div>
  `;
}

const sauceQty = {};
const dessertQty = {};
const drinkQty = {};

function changeDessertQty(id, delta) {
  if (!dessertQty[id]) dessertQty[id] = 0;

  dessertQty[id] += delta;

  if (dessertQty[id] < 0) dessertQty[id] = 0;

  const el = document.getElementById(`dessert-qty-${id}`);
  if (el) el.textContent = dessertQty[id];

  updateModalState();
}

function changeSauceQty(id, delta) {
  if (!sauceQty[id]) sauceQty[id] = 0;

  sauceQty[id] += delta;

  if (sauceQty[id] < 0) sauceQty[id] = 0;

  const el = document.getElementById(`qty-${id}`);
  if (el) el.textContent = sauceQty[id];

  updateModalState();
}

function changeDrinkQty(id, delta) {
  if (!drinkQty[id]) drinkQty[id] = 0;

  drinkQty[id] += delta;

  if (drinkQty[id] < 0) drinkQty[id] = 0;

  const el = document.getElementById(`drink-qty-${id}`);
  if (el) el.textContent = drinkQty[id];

  updateModalState();
}

function renderSauceOptions(selectedSauces = {}, requiredAtLeastOne = false) {
  return `
    <div class="option-group sauce-group">
      <div class="option-head">
        <div class="option-title">Sauces</div>
        <div class="option-badge">1 gratuite</div>
      </div>

      <p class="option-note">
        Une sauce est gratuite. Chaque sauce supplÃ©mentaire coÃ»te +${formatEuro(EXTRA_SAUCE_PRICE)}.
      </p>

      <div class="sauce-list">
        ${SAUCES.map((sauce) => `
          <div class="sauce-row">
            <div class="sauce-info">
              <div class="sauce-icon">ðŸ¥£</div>

              <div class="sauce-text">
                <div class="sauce-name">${escapeHtml(sauce.name)}</div>
                <div class="sauce-sub">Ajoutez la quantitÃ© souhaitÃ©e</div>
              </div>
            </div>

            <div class="qty-stepper">
              <button
                type="button"
                class="qty-btn"
                onclick="changeSauceQty('${sauce.id}', -1)"
                aria-label="Diminuer ${escapeHtml(sauce.name)}"
              >
                âˆ’
              </button>

              <span
                class="qty-value"
                id="qty-${sauce.id}"
              >${selectedSauces[sauce.id] || 0}</span>

              <button
                type="button"
                class="qty-btn qty-btn-plus"
                onclick="changeSauceQty('${sauce.id}', 1)"
                aria-label="Augmenter ${escapeHtml(sauce.name)}"
              >
                +
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="inline-summary sauce-summary-wrap" id="sauceSummary"></div>
    </div>
  `;
}

function renderModalOptions(id) {
  const category = getDishCategory(id);
  const config = selectedConfig || getDefaultConfig(id);

  if (category === "single") {
    modalOptions.innerHTML = `
      ${renderDrinkOptions(false, config.drink)}
      ${renderDessertOptions(config.dessert)}
      ${renderSauceOptions(config.sauces, false)}
    `;
    renderDessertSummary(config.dessert);
    renderSauceSummary(config.sauces);
    return;
  }

  if (category === "box") {
    modalOptions.innerHTML = `
      ${renderDrinkOptions(true, config.drink)}
      ${renderDessertOptions(config.dessert)}
      ${renderSauceOptions(config.sauces, true)}
    `;
    renderDessertSummary(config.dessert);
    renderSauceSummary(config.sauces);
    return;
  }

  modalOptions.innerHTML = "";
}

function readConfigFromModal(id) {
  const category = getDishCategory(id);
  const config = getDefaultConfig(id);

  if (category === "single") {
    config.drink = { ...drinkQty };
    config.dessert = { ...dessertQty };
    config.sauces = { ...sauceQty };

    return config;
  }

  if (category === "box") {
    config.drink = { ...drinkQty };
    config.dessert = { ...dessertQty };
    config.sauces = { ...sauceQty };

    return config;
  }

  return config;
}
function getExtrasTotal(id, config) {
  const category = getDishCategory(id);
  let extras = 0;

  if (config.drink) {
    const totalDrinks = Object.values(config.drink).reduce((a, b) => a + b, 0);

    if (category === "box") {
      const extraDrinkCount = Math.max(totalDrinks - 1, 0);
      extras += extraDrinkCount * OPTIONAL_DRINK_EXTRA;
    }

    if (category === "single") {
      extras += totalDrinks * OPTIONAL_DRINK_EXTRA;
    }
  }

  if (config.sauces) {
    const totalSauces = Object.values(config.sauces).reduce((a, b) => a + b, 0);
    const extraSauceCount = Math.max(totalSauces - 1, 0);
    extras += extraSauceCount * EXTRA_SAUCE_PRICE;
  }

  if (config.dessert) {
    const totalDesserts = Object.values(config.dessert).reduce((a, b) => a + b, 0);

    if (category === "box") {
      const extraDessertCount = Math.max(totalDesserts - 1, 0);
      extras += extraDessertCount * EXTRA_DESSERT_PRICE;
    }

    if (category === "single") {
      extras += totalDesserts * EXTRA_DESSERT_PRICE;
    }
  }

  return extras;
}

function getItemTotal(id, config) {
  const base = parseEuro(DISHES[id].price);
  return base + getExtrasTotal(id, config);
}

function isModalSelectionValid(id, config) {
  const category = getDishCategory(id);

  if (category === "single") {
    return true;
  }

  if (category === "box") {
    const totalSauces = config.sauces
      ? Object.values(config.sauces).reduce((a, b) => a + b, 0)
      : 0;

    const totalDesserts = config.dessert
      ? Object.values(config.dessert).reduce((a, b) => a + b, 0)
      : 0;

    const totalDrinks = config.drink
      ? Object.values(config.drink).reduce((a, b) => a + b, 0)
      : 0;

    return totalDrinks > 0 && totalDesserts > 0 && totalSauces > 0;
  }

  return true;
}

function renderSauceSummary(sauces = {}) {
  const summary = document.getElementById("sauceSummary");
  if (!summary) return;

  const entries = Object.entries(sauces).filter(([_, qty]) => qty > 0);

  if (!entries.length) {
    summary.innerHTML = `
      <div class="summary-pill">Aucune sauce choisie</div>
      <div class="summary-pill accent">SupplÃ©ment sauces: Inclus</div>
    `;
    return;
  }

  const total = entries.reduce((sum, [_, qty]) => sum + qty, 0);
  const extraCount = Math.max(total - 1, 0);
  const extraPrice = extraCount * EXTRA_SAUCE_PRICE;

  summary.innerHTML = `
    ${entries.map(([id, qty]) => {
    const sauce = getSauceById(id);
    return `
        <div class="summary-pill">
          ${escapeHtml(sauce?.name || id)} Ã—${qty}
        </div>
      `;
  }).join("")}

    <div class="summary-pill accent">
      SupplÃ©ment sauces: ${extraPrice > 0 ? "+" + formatEuro(extraPrice) : "Inclus"}
    </div>
  `;
}

function renderDessertSummary(desserts = {}) {
  const summary = document.getElementById("dessertSummary");
  if (!summary) return;

  const entries = Object.entries(desserts).filter(([_, qty]) => qty > 0);
  const category = getDishCategory(selectedDish);

  if (!entries.length) {
    summary.innerHTML = `
      <div class="summary-pill">Aucun dessert sÃ©lectionnÃ©</div>
      <div class="summary-pill accent">SupplÃ©ment dessert : +0,00 â‚¬</div>
    `;
    return;
  }

  const total = entries.reduce((sum, [_, qty]) => sum + qty, 0);

  let dessertPrice = 0;

  if (category === "box") {
    dessertPrice = Math.max(total - 1, 0) * EXTRA_DESSERT_PRICE;
  }

  if (category === "single") {
    dessertPrice = total * EXTRA_DESSERT_PRICE;
  }

  summary.innerHTML = `
    ${entries.map(([id, qty]) => {
    const dessert = getDessertById(id);
    return `
        <div class="summary-pill">
          ${escapeHtml(dessert?.name || id)} Ã—${qty}
        </div>
      `;
  }).join("")}

    <div class="summary-pill accent">
      SupplÃ©ment dessert : ${dessertPrice > 0 ? "+" + formatEuro(dessertPrice) : "0,00 â‚¬"}
    </div>
  `;
}


function updateModalState() {
  if (!selectedDish) return;

  selectedConfig = readConfigFromModal(selectedDish);
  const total = getItemTotal(selectedDish, selectedConfig);

  modalPrice.textContent = formatEuro(total);
  addToCartBtn.textContent = `Ajouter au panier â€¢ ${formatEuro(total)}`;

  const isValid = isModalSelectionValid(selectedDish, selectedConfig);
  addToCartBtn.disabled = !isValid;

  if (!isValid && getDishCategory(selectedDish) === "box") {
    modalAlert.textContent = "Veuillez choisir une boisson, au moins un dessert et au moins une sauce pour continuer.";
    modalAlert.classList.add("show");
  } else {
    modalAlert.textContent = "";
    modalAlert.classList.remove("show");
  }

  renderSauceSummary(selectedConfig.sauces || {});
  renderDessertSummary(selectedConfig.dessert || {});
}

function buildSelectionLabel(id, config) {
  const parts = [];
  const category = getDishCategory(id);

  // ðŸ¥¤ Drinks
  if (config.drink) {
    const drinks = Object.entries(config.drink)
      .filter(([_, qty]) => qty > 0)
      .map(([drinkId, qty]) => {
        const d = getDrinkById(drinkId);
        return `ðŸ¥¤ ${d?.name} Ã—${qty}`;
      });

    if (drinks.length) {
      parts.push(`ðŸ¥¤ Boissons: ${drinks.join(", ")}`);
    }
  }

  // ðŸ° Desserts
  if (config.dessert) {
    const desserts = Object.entries(config.dessert)
      .filter(([_, qty]) => qty > 0)
      .map(([dessertId, qty]) => {
        const d = getDessertById(dessertId);
        return `ðŸ° ${d?.name} Ã—${qty}`;
      });

    if (desserts.length) {
      parts.push(`ðŸ° Dessert: ${desserts.join(", ")}`);

      const totalDesserts = Object.values(config.dessert).reduce((a, b) => a + b, 0);

      if (category === "box") {
        const extraDessertCount = Math.max(totalDesserts - 1, 0);

        if (extraDessertCount > 0) {
          parts.push(`ðŸ’¶ SupplÃ©ment dessert: +${formatEuro(extraDessertCount * EXTRA_DESSERT_PRICE)}`);
        }
      }

      if (category === "single") {
        parts.push(`ðŸ’¶ Dessert inclus dans le total: +${formatEuro(totalDesserts * EXTRA_DESSERT_PRICE)}`);
      }
    }
  }

  // ðŸ¥£ Sauces
  if (config.sauces) {
    const sauces = Object.entries(config.sauces)
      .filter(([_, qty]) => qty > 0)
      .map(([sauceId, qty]) => {
        const s = getSauceById(sauceId);
        return `ðŸ¥£ ${s?.name} Ã—${qty}`;
      });

    if (sauces.length) {
      parts.push(`ðŸ¥£ Sauces: ${sauces.join(", ")}`);

      const totalSauces = Object.values(config.sauces).reduce((a, b) => a + b, 0);
      const extraSauceCount = Math.max(totalSauces - 1, 0);

      if (extraSauceCount > 0) {
        parts.push(`ðŸ’¶ SupplÃ©ment sauces: +${formatEuro(extraSauceCount * EXTRA_SAUCE_PRICE)}`);
      }
    }
  }

  return parts.join(" â€¢ ");
}


function buildCartKey(id, config) {
  const drinks = Object.entries(config.drink || {})
    .map(([drinkId, qty]) => `${drinkId}x${qty}`)
    .sort()
    .join("+") || "none";

  const sauces = Object.entries(config.sauces || {})
    .map(([sauceId, qty]) => `${sauceId}x${qty}`)
    .sort()
    .join("+") || "none";

  const desserts = Object.entries(config.dessert || {})
    .map(([dessertId, qty]) => `${dessertId}x${qty}`)
    .sort()
    .join("+") || "none";

  return `${id}__drink:${drinks}__dessert:${desserts}__sauces:${sauces}`;
}

function cloneConfig(config) {
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
  setTimeout(() => {
    checkOpeningOnLoad();
  }, 2700);
});

function openPreview(id, triggerEl) {
  const image = BOX_PREVIEW_IMAGES[id];
  if (!image) {
    openModal(id, triggerEl);
    return;
  }

  selectedDish = id;
  selectedConfig = getDefaultConfig(id);

  hotspots.forEach(el => el.classList.remove("active"));
  if (triggerEl) triggerEl.classList.add("active");

  previewImage.src = image;
  previewImage.alt = DISHES[id]?.name || "Box preview";

  previewModal.classList.add("open");
  previewModal.setAttribute("aria-hidden", "false");
}

function closePreview() {
  previewModal.classList.remove("open");
  previewModal.setAttribute("aria-hidden", "true");
  previewImage.src = "";
}

function openModal(id, triggerEl) {
  const item = DISHES[id];
  if (!item) return;

  selectedDish = id;
  selectedConfig = getDefaultConfig(id);
  Object.keys(sauceQty).forEach((key) => delete sauceQty[key]);
  Object.keys(drinkQty).forEach((key) => delete drinkQty[key]);
  Object.keys(dessertQty).forEach((key) => delete dessertQty[key]);

  hotspots.forEach(el => el.classList.remove("active"));
  if (triggerEl) triggerEl.classList.add("active");

  modalTitle.textContent = item.name;
  modalDesc.textContent = item.description;

  renderModalOptions(id);
  updateModalState();

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalOptions.innerHTML = "";
  modalAlert.textContent = "";
  modalAlert.classList.remove("show");
  selectedConfig = null;
  hotspots.forEach(el => el.classList.remove("active"));
}

hotspots.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;

    if (id === "box-simple" || id === "box-max") {
      openPreview(id, btn);
    } else {
      openModal(id, btn);
    }
  });

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

previewCloseBtn.addEventListener("click", closePreview);

previewContinueBtn.addEventListener("click", () => {
  const currentDish = selectedDish;
  closePreview();
  openModal(currentDish);
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

previewModal.addEventListener("click", (e) => {
  if (e.target === previewModal) closePreview();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePreview();
    closeModal();
    closeCheckoutModal();
    closeOrderStatusModal();
  }
});

function renderCart() {
  const entries = Object.values(cart);
  const totalQty = entries.reduce((sum, entry) => sum + entry.qty, 0);

  cartCount.textContent = totalQty;

  if (!entries.length) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        ðŸ½ï¸ DÃ©couvrez notre menu<br>
        ðŸ‘† Appuyez sur un plat pour commencer<br>
        ðŸ“… Vous pouvez aussi planifier votre commande
      </div>
    `;
    return;
  }

  cartItems.innerHTML = entries.map((entry) => {
    const item = DISHES[entry.id];
    const summary = buildSelectionLabel(entry.id, entry.config);
    const key = buildCartKey(entry.id, entry.config);

    return `
      <div class="cart-item" style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
        
        <span style="
          flex:1;
          display:block;
          font-size:15px;
          line-height:1.5;
          font-weight:700;
          color:#ffffff;
        ">
          ${item.name}
          ${summary ? ` â€” ${summary}` : ""}

          <span style="
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-width:32px;
            padding:4px 10px;
            margin-left:8px;
            border-radius:999px;
            background:rgba(255,214,95,.22);
            color:#FFD65F;
            font-size:16px;
            font-weight:900;
          ">
            Ã— ${entry.qty}
          </span>
        </span>

        <div style="display:flex;align-items:center;gap:6px;">
          
          <button
            onclick="decreaseCartItem('${key}')"
            aria-label="Diminuer"
            title="Diminuer"
            style="
              border:none;
              background:rgba(255,255,255,.10);
              color:#fff;
              font-size:18px;
              cursor:pointer;
              padding:6px 10px;
              border-radius:10px;
              font-weight:900;
            "
          >
            âˆ’
          </button>

          <button
            onclick="increaseCartItem('${key}')"
            aria-label="Augmenter"
            title="Augmenter"
            style="
              border:none;
              background:rgba(255,214,95,.22);
              color:#fff;
              font-size:18px;
              cursor:pointer;
              padding:6px 10px;
              border-radius:10px;
              font-weight:900;
            "
          >
            +
          </button>

          <button
            onclick="removeFromCart('${key}')"
            aria-label="Supprimer"
            title="Supprimer"
            style="
              border:none;
              background:rgba(255,255,255,.08);
              color:#fff;
              font-size:18px;
              cursor:pointer;
              padding:6px 8px;
              border-radius:10px;
              display:flex;
              align-items:center;
              justify-content:center;
            "
          >
            ðŸ—‘ï¸
          </button>

        </div>
      </div>
    `;
  }).join("");
}

function removeFromCart(key) {
  delete cart[key];
  renderCart();
}

function increaseCartItem(key) {
  if (!cart[key]) return;

  cart[key].qty += 1;
  renderCart();
  pulseWhatsApp();
}

function decreaseCartItem(key) {
  if (!cart[key]) return;

  cart[key].qty -= 1;

  if (cart[key].qty <= 0) {
    delete cart[key];
  }

  renderCart();
}

addToCartBtn.addEventListener("click", () => {
  if (!selectedDish) return;

  selectedConfig = readConfigFromModal(selectedDish);

  if (!isModalSelectionValid(selectedDish, selectedConfig)) {
    updateModalState();
    return;
  }

  const key = buildCartKey(selectedDish, selectedConfig);
  const lineTotal = getItemTotal(selectedDish, selectedConfig);

  if (cart[key]) {
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

function pulseWhatsApp() {
  whatsappBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.018)" },
      { transform: "scale(1)" }
    ],
    { duration: 340, easing: "ease-out" }
  );
}

function getTodayLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTomorrowLocalDateString() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isRestaurantClosed(selectedDate = null) {
  const targetDate = selectedDate || getTodayLocalDateString();

  if (RESTAURANT_SETTINGS.forceClosed) {
    return true;
  }

  return RESTAURANT_SETTINGS.closedDates.includes(targetDate);
}

function showRestaurantClosedPopup() {
  if (RESTAURANT_SETTINGS.forceClosed) {
    showInlineOrderStatusMessage(
      RESTAURANT_SETTINGS.forceClosedTitle,
      RESTAURANT_SETTINGS.forceClosedLines
    );
    return;
  }

  showInlineOrderStatusMessage(
    RESTAURANT_SETTINGS.closedDatesTitle,
    RESTAURANT_SETTINGS.closedDatesLines
  );
}

function shouldShowMay8Announcement() {
  const today = getTodayLocalDateString();
  const year = new Date().getFullYear();
  const limitDate = `${year}-05-13`;

  return today <= limitDate;
}

function showMay8AnnouncementPopup() {
  showInlineOrderStatusMessage("ðŸ”¥ 11, 12 et 13 mai complets", [
    "Nous sommes complets les 11, 12 et 13 mai.",
    "ðŸ™ Merci infiniment pour votre confiance et votre fidÃ©litÃ©.",
    "Yamani Food fonctionne Ã  pleine capacitÃ©.",
    "ðŸ“… Pensez Ã  planifier votre prochaine commande dÃ¨s maintenant."
  ]);

  planLaterBtn.style.display = "block";
  planLaterBtn.textContent = "Compris";
  planLaterBtn.dataset.action = "may8-close";
}

function showCurrentClosedPopupIfNeeded() {
  if (isCurrentTimeInOrderWindow()) return;

  const orderHoursBox = orderStatusModal.querySelector(".option-group");

  if (orderHoursBox) {
    orderHoursBox.style.display = "block";
  }

  orderStatusTitle.textContent = "â° Commandes fermÃ©es pour le moment";

  orderStatusText.innerHTML = `
<div>Nous ne prenons pas</div>
<div>de commandes maintenant.</div>
<br>
<div>ðŸ“… Vous pouvez planifier</div>
<div>votre commande pour plus tard.</div>
<br>
<div>ðŸ›ï¸ Retrait :</div>
<div>13h â†’ 14h</div>
<div>19h â†’ 22h</div>
  `;

  continueNowBtn.style.display = "none";
  planLaterBtn.style.display = "block";
  planLaterBtn.textContent = "ðŸ“… Planifier une commande";
  planLaterBtn.dataset.action = "plan";

  orderStatusModal.classList.add("open");
  orderStatusModal.setAttribute("aria-hidden", "false");

  hasShownOpeningStatusModal = true;
}

let isPlanningMode = false;

function updatePlanningVisibility() {
  const timeSlots = document.getElementById("timeSlots");

  if (isPlanningMode) {
    planningGroup.style.display = "block";
    todayTimeGroup.style.display = "none";

    if (timeSlots) {
      timeSlots.style.display = dateCmd.value ? "grid" : "none";
    }

    return;
  }

  planningGroup.style.display = "none";
  todayTimeGroup.style.display = "block";
}

function getCartGrandTotal() {
  return Object.values(cart).reduce((sum, entry) => {
    return sum + (entry.lineTotal * entry.qty);
  }, 0);
}

function isCurrentTimeInOrderWindow() {
  const now = new Date();
  const t = now.getHours() + (now.getMinutes() / 60);

  return (t >= 7 && t < 11) || (t >= 12 && t < 17);
}

function showInlineOrderStatusMessage(title, lines = []) {
  const orderHoursBox = orderStatusModal.querySelector(".option-group");

  orderStatusTitle.textContent = title;
  orderStatusText.innerHTML = lines.map(line => `<div>${line}</div>`).join("");

  if (orderHoursBox) {
    orderHoursBox.style.display = "none";
  }

  continueNowBtn.style.display = "none";
  planLaterBtn.textContent = "📅 Planifier une commande";
    planLaterBtn.dataset.action = "plan";

  orderStatusModal.classList.add("open");
  orderStatusModal.setAttribute("aria-hidden", "false");
}

function openOrderStatusModal() {
  const entries = Object.values(cart);

  if (!entries.length) {
    showInlineOrderStatusMessage("ðŸ›’ Votre panier est vide", [
      "ðŸ½ï¸ DÃ©couvrez notre menu avant de commander",
      "ðŸ‘† Appuyez sur un plat pour lâ€™ajouter au panier",
      "ðŸ’¬ Une fois votre sÃ©lection prÃªte, vous pourrez envoyer votre commande sur WhatsApp"
    ]);
    return;
  }

  if (isRestaurantClosed()) {
    showRestaurantClosedPopup();
    planLaterBtn.style.display = "block";
    planLaterBtn.textContent = "📅 Planifier une commande";
    planLaterBtn.dataset.action = "plan";
    return;
  }

  if (hasShownOpeningStatusModal) {
    openCheckoutModal(false);
    return;
  }

  const orderHoursBox = orderStatusModal.querySelector(".option-group");
  if (orderHoursBox) orderHoursBox.style.display = "block";

  if (isCurrentTimeInOrderWindow()) {
    orderStatusTitle.textContent = "âœ… Commandes ouvertes";
    orderStatusText.innerHTML = `
<div>Vous pouvez commander maintenant.</div>
<br>
<div>ðŸ’¡ Vous pouvez aussi</div>
<div>planifier votre commande</div>
<div>pour plus tard.</div>
    `;

    continueNowBtn.style.display = "block";
  } else {
    orderStatusTitle.textContent = "â° Commandes fermÃ©es pour le moment";
    orderStatusText.innerHTML = `
<div>Nous ne prenons pas</div>
<div>de commandes maintenant.</div>
<br>
<div>ðŸ“… Vous pouvez planifier</div>
<div>votre commande pour plus tard.</div>
<br>
<div>ðŸ›ï¸ Retrait :</div>
<div>13h â†’ 14h</div>
<div>19h â†’ 22h</div>
    `;

    continueNowBtn.style.display = "none";
  }

  planLaterBtn.style.display = "block";
  planLaterBtn.textContent = "ðŸ“… Planifier une commande";
  planLaterBtn.dataset.action = "plan";

  orderStatusModal.classList.add("open");
  orderStatusModal.setAttribute("aria-hidden", "false");
}

function closeOrderStatusModal() {
  orderStatusModal.classList.remove("open");
  orderStatusModal.setAttribute("aria-hidden", "true");
  planLaterBtn.dataset.action = "";
}

function checkOpeningOnLoad() {
  if (isRestaurantClosed()) {
    showRestaurantClosedPopup();
    hasShownOpeningStatusModal = true;
    return;
  }

  if (RESTAURANT_SETTINGS.showAnnouncement) {
    showInlineOrderStatusMessage(
      RESTAURANT_SETTINGS.announcementTitle,
      RESTAURANT_SETTINGS.announcementLines
    );
    hasShownOpeningStatusModal = true;
    return;
  }

  if (RESTAURANT_SETTINGS.forceClosed) {
    showRestaurantClosedPopup();
    hasShownOpeningStatusModal = true;
    return;
  }

  showCurrentClosedPopupIfNeeded();
}


function openCheckoutModal(prefillTomorrow = false) {
  const entries = Object.values(cart);

  if (!entries.length) {
    showInlineOrderStatusMessage("ðŸ“… Planifier une commande", [
      "Bonne idÃ©e ðŸ˜Š",
      "ðŸ½ï¸ DÃ©couvrez le menu et ajoutez ce qui vous fait envie",
      "â° Choisissez ensuite le moment parfaitâ€¦ on sâ€™occupe du reste ðŸ˜‰"
    ]);
    return;
  }

  checkoutTotal.textContent = formatEuro(getCartGrandTotal());

  const now = new Date();
  const currentHour = now.getHours() + (now.getMinutes() / 60);

  const today = getTodayLocalDateString();
  const tomorrow = getTomorrowLocalDateString();

  if (isRestaurantClosed(today)) {
    isPlanningMode = true;
    dateCmd.min = tomorrow;
    dateCmd.value = tomorrow;
  } else if (currentHour >= 0 && currentHour < 7) {
    isPlanningMode = true;
    dateCmd.min = today;
    dateCmd.value = today;
  } else if (currentHour >= 11 && currentHour < 17) {
    isPlanningMode = true;
    dateCmd.min = today;
    dateCmd.value = today;
  } else {
    isPlanningMode = prefillTomorrow || !isCurrentTimeInOrderWindow();

    if (isPlanningMode) {
      dateCmd.min = tomorrow;
      dateCmd.value = "";
    } else {
      dateCmd.min = today;
      dateCmd.value = today;
    }
  }

  document.querySelectorAll(".time-btn").forEach(btn => {
    btn.classList.remove("active");
    btn.style.display = "flex";
  });

  checkoutAlert.textContent = "";
  checkoutAlert.classList.remove("show");

  updatePlanningVisibility();
  updateTimeSlotsByOrderType();

  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden", "false");
}

function closeCheckoutModal() {
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden", "true");
  checkoutAlert.textContent = "";
  checkoutAlert.classList.remove("show");
}

function showDeliveryZonePopup() {
  deliveryZoneModal.dataset.type = "delivery";

  deliveryZoneModal.querySelector(".modal-title").textContent = "ðŸš« Livraison non disponible";
  deliveryZoneModal.querySelector(".modal-desc").textContent =
    "DÃ©solÃ©, nous ne livrons pas encore dans ce code postal.";

  deliveryZoneModal.querySelector(".option-title").textContent = "ðŸ“ Zones couvertes";
  deliveryZoneModal.querySelector(".option-note").innerHTML =
    "Lyon 2, Lyon 3, Lyon 6, Lyon 7, Lyon 8<br>Villeurbanne 69100<br>Bron 69500";

  closeDeliveryZoneBtn.textContent = "Compris, je choisis Ã  emporter";

  deliveryZoneModal.classList.add("open");
  deliveryZoneModal.setAttribute("aria-hidden", "false");
}

function showPlanDatePopup() {
  deliveryZoneModal.dataset.type = "date";

  deliveryZoneModal.querySelector(".modal-title").textContent = "ðŸ“… Date non disponible";
  deliveryZoneModal.querySelector(".modal-desc").textContent =
    "Quand les commandes sont fermÃ©es, vous pouvez planifier uniquement Ã  partir de demain.";

  deliveryZoneModal.querySelector(".option-title").textContent = "â° Planification";
  deliveryZoneModal.querySelector(".option-note").innerHTML =
    "Veuillez choisir une date Ã  partir de demain.";

  closeDeliveryZoneBtn.textContent = "Compris";

  deliveryZoneModal.classList.add("open");
  deliveryZoneModal.setAttribute("aria-hidden", "false");
}

function showTimeRequiredPopup() {
  deliveryZoneModal.dataset.type = "time";

  deliveryZoneModal.querySelector(".modal-title").textContent = "â° Heure non sÃ©lectionnÃ©e";
  deliveryZoneModal.querySelector(".modal-desc").textContent =
    "Veuillez choisir une heure pour continuer votre commande.";

  deliveryZoneModal.querySelector(".option-title").textContent = "ðŸ•’ CrÃ©neaux disponibles";
  deliveryZoneModal.querySelector(".option-note").innerHTML =
    "13h â†’ 14h<br>19h â†’ 22h";

  closeDeliveryZoneBtn.textContent = "Compris";

  deliveryZoneModal.classList.add("open");
  deliveryZoneModal.setAttribute("aria-hidden", "false");
}



function closeDeliveryZonePopup() {
  deliveryZoneModal.classList.remove("open");
  deliveryZoneModal.setAttribute("aria-hidden", "true");
}


function isPickupTimeValid(time) {
  if (!time) return false;
  const [h, m] = time.split(":").map(Number);
  const t = h + (m / 60);

  return (t >= 13 && t <= 14) || (t >= 19 && t <= 22);
}

function isDeliveryTimeValid(time) {
  if (!time) return false;
  const [h, m] = time.split(":").map(Number);
  const t = h + (m / 60);

  return (t >= 13 && t <= 14) || (t >= 19 && t <= 22);
}

function updateTimeSlotsByOrderType() {
  const orderType = document.querySelector('input[name="orderType"]:checked')?.value || "pickup";
  const today = getTodayLocalDateString();
  const now = new Date();
  const currentHour = now.getHours() + (now.getMinutes() / 60);

  const selectedDate = isPlanningMode ? dateCmd.value : today;
  const isToday = selectedDate === today;

  document.querySelectorAll(".time-btn").forEach(btn => {
    const text = btn.textContent.trim();

    btn.style.display = "flex";

    // âœ… Ø¥Ø°Ø§ Ø§Ù„Ø·Ù„Ø¨ Ù„Ù†ÙØ³ Ø§Ù„ÙŠÙˆÙ… Ø¨Ø¹Ø¯ 11:00ØŒ Ø§Ø®ÙÙ 13h â†’ 14h
    if (isToday && currentHour >= 11) {
      if (text.includes("13") && text.includes("14")) {
        btn.style.display = "none";
        btn.classList.remove("active");
      }
    }

    // âœ… Ø¥Ø°Ø§ ØªÙˆØµÙŠÙ„ØŒ Ø§Ø®ÙÙ 19h â†’ 20h ÙÙ‚Ø· Ø¥Ø°Ø§ Ù…ÙˆØ¬ÙˆØ¯ ÙƒØ²Ø± Ù…Ø³ØªÙ‚Ù„
    if (orderType === "delivery" && text.includes("19") && text.includes("20")) {
      btn.style.display = "none";
      btn.classList.remove("active");
    }
  });
}

orderTypeInputs.forEach(input => {
  input.addEventListener("change", () => {

    updateTimeSlotsByOrderType();

    if (input.value === "delivery" && input.checked) {
      deliveryFields.style.display = "block";
      showDeliveryInfoPopup();

    } else if (input.checked) {
      deliveryFields.style.display = "none";

      checkoutAlert.classList.remove("show");
      checkoutAlert.innerHTML = "";
    }

  });
});

dateCmd.addEventListener("change", () => {
  document.querySelectorAll("#timeSlots .time-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  updatePlanningVisibility();
  updateTimeSlotsByOrderType();
});
whatsappBtn.addEventListener("click", openOrderStatusModal);
closeCheckoutBtn.addEventListener("click", closeCheckoutModal);

closeDeliveryZoneBtn.addEventListener("click", () => {
  const popupType = deliveryZoneModal.dataset.type;

  closeDeliveryZonePopup();

  if (popupType === "delivery") {
    const pickupInput = document.querySelector('input[name="orderType"][value="pickup"]');

    if (pickupInput) {
      pickupInput.checked = true;
      deliveryFields.style.display = "none";
    }

    checkoutAlert.classList.remove("show");
    checkoutAlert.innerHTML = "";
  }
});

continueNowBtn.addEventListener("click", () => {
  closeOrderStatusModal();
  openCheckoutModal(false);
});

planLaterBtn.addEventListener("click", () => {
  const action = planLaterBtn.dataset.action;

  closeOrderStatusModal();

  if (action === "may8-close") {
    showCurrentClosedPopupIfNeeded();
    return;
  }

  if (action === "plan") {
    openCheckoutModal(true);
  }
});

orderStatusModal.addEventListener("click", (e) => {
  e.stopPropagation();
});

checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) closeCheckoutModal();
});

confirmOrderBtn.addEventListener("click", () => {
  const entries = Object.values(cart);
  if (!entries.length) {
    closeCheckoutModal();
    return;
  }

  const DELIVERY_PRICE = 2.00;
  const ALLOWED_DELIVERY_ZIPS = ["69002", "69003", "69006", "69007", "69008", "69100", "69500"];

  const orderType = document.querySelector('input[name="orderType"]:checked')?.value || "pickup";

  const today = getTodayLocalDateString();
  const tomorrow = getTomorrowLocalDateString();
  const selectedDate = isPlanningMode ? dateCmd.value : today;
  if (isRestaurantClosed(selectedDate)) {
    showRestaurantClosedPopup();
    return;
  }

  if (isPlanningMode && !selectedDate) {
    checkoutAlert.textContent = "Veuillez choisir une date.";
    checkoutAlert.classList.add("show");
    return;
  }

  const now = new Date();
  const currentHour = now.getHours() + (now.getMinutes() / 60);
  const specialMiddayPlanning = currentHour >= 11 && currentHour < 12;

  const allowSameDayEvening = currentHour >= 11 && currentHour < 17;

  if (
    isPlanningMode &&
    selectedDate < tomorrow &&
    !allowSameDayEvening &&
    !(currentHour >= 0 && currentHour < 7)
  ) {
    showPlanDatePopup();
    return;
  }

  let selectedTime = "";

  const activeBtn = document.querySelector(".time-btn.active");
  if (activeBtn) {
    selectedTime = activeBtn.textContent.trim();
  }

  if (!selectedTime) {
    showTimeRequiredPopup();
    return;
  }

  let addressBlock = "";

  if (orderType === "delivery") {
    const addrValue = addr.value.trim();
    const zipValue = zip.value.trim();
    const cityValue = city.value.trim();

    if (!addrValue || !zipValue || !cityValue) {
      checkoutAlert.textContent = "Veuillez remplir lâ€™adresse complÃ¨te de livraison.";
      checkoutAlert.classList.add("show");
      return;
    }

    if (!ALLOWED_DELIVERY_ZIPS.includes(zipValue)) {
      showDeliveryZonePopup();
      return;
    }

    addressBlock =
      `\nðŸ“ Adresse de livraison :
- Adresse : ${addrValue}
- Code postal : ${zipValue}
- Ville : ${cityValue}`;
  }

  const lines = entries.map((entry, index) => {
    const item = DISHES[entry.id];
    const config = entry.config;
    const category = getDishCategory(entry.id);
    const unitTotal = formatEuro(entry.lineTotal);

    const detailLines = [];

    if (config.drink) {
      let drinkCounter = 0;

      Object.entries(config.drink)
        .filter(([_, qty]) => qty > 0)
        .forEach(([drinkId, qty]) => {
          const drink = getDrinkById(drinkId);
          if (!drink) return;

          for (let i = 0; i < qty; i++) {
            drinkCounter++;

            if (category === "box" && drinkCounter === 1) {
              detailLines.push(`   - ðŸ¥¤ Boisson incluse : ${drink.name}`);
            } else {
              detailLines.push(
                `   - ðŸ¥¤ Boisson : ${drink.name} (+${formatEuro(OPTIONAL_DRINK_EXTRA)})`
              );
            }
          }
        });
    }

    if (config.dessert) {
      Object.entries(config.dessert)
        .filter(([_, qty]) => qty > 0)
        .forEach(([dessertId, qty]) => {
          const dessert = getDessertById(dessertId);
          if (!dessert) return;

          if (category === "box") {
            detailLines.push(`   - ðŸ° Dessert inclus : ${dessert.name} Ã—1`);

            if (qty > 1) {
              detailLines.push(
                `   - ðŸ’¶ Dessert supplÃ©mentaire : ${dessert.name} Ã—${qty - 1} (+${formatEuro((qty - 1) * EXTRA_DESSERT_PRICE)})`
              );
            }
          } else {
            detailLines.push(
              `   - ðŸ° Dessert : ${dessert.name} Ã—${qty} (+${formatEuro(qty * EXTRA_DESSERT_PRICE)})`
            );
          }
        });
    }

    if (config.sauces) {
      let sauceCounter = 0;

      Object.entries(config.sauces)
        .filter(([_, qty]) => qty > 0)
        .forEach(([sauceId, qty]) => {
          const sauce = getSauceById(sauceId);
          if (!sauce) return;

          for (let i = 0; i < qty; i++) {
            sauceCounter++;

            if (sauceCounter === 1) {
              detailLines.push(`   - ðŸ¥£ Sauce incluse : ${sauce.name}`);
            } else {
              detailLines.push(
                `   - ðŸ’¶ Sauce supplÃ©mentaire : ${sauce.name} (+${formatEuro(EXTRA_SAUCE_PRICE)})`
              );
            }
          }
        });
    }

    detailLines.push(`   - ðŸ’° Prix du plat complet : ${unitTotal}`);

    return [
      `${index + 1}. ${item.name} x${entry.qty}`,
      ...detailLines
    ].join("\n");
  });

  let grandTotal = getCartGrandTotal();

  if (orderType === "delivery") {
    grandTotal += DELIVERY_PRICE;
  }

  const receptionLabel =
    orderType === "delivery"
      ? "ðŸšš Livraison Ã  domicile"
      : "ðŸ›ï¸ Ã€ emporter";

  const message =
    `ðŸ½ï¸ Bonjour Yamani Food,

Je souhaite commander :

${lines.join("\n\n")}

â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”

ðŸ“¦ Mode : ${receptionLabel}
ðŸ“… Date : ${selectedDate}
â° Heure : ${selectedTime}${addressBlock}

${orderType === "delivery" ? `\nðŸšš Frais de livraison : ${formatEuro(DELIVERY_PRICE)}` : ""}

ðŸ’° Total estimÃ© : ${formatEuro(grandTotal)}

ðŸ™ Merci !`;

  const url = `https://wa.me/33782549043?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
  closeCheckoutModal();
});




renderCart();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    const parent = e.target.closest(".time-slots");

    if (parent) {
      parent.querySelectorAll(".time-btn").forEach(btn => btn.classList.remove("active"));
    }

    e.target.classList.add("active");
  }
});


function showDeliveryInfoPopup() {
  const deliveryChoice = document.querySelector('input[name="orderType"][value="delivery"]')
    ?.closest(".choice-item");

  checkoutAlert.innerHTML =
    "ðŸšš <b>Livraison Ã  domicile</b> â€¢ ðŸ’¶ 2,00 â‚¬<br>" +
    "ðŸ“ Lyon 2, 3, 6, 7, 8 + Villeurbanne + Bron<br>" +
    "â° 13hâ€“14h / 20hâ€“22h";

  checkoutAlert.classList.add("show");

  if (deliveryChoice) {
    deliveryChoice.insertAdjacentElement("afterend", checkoutAlert);
  }
}


