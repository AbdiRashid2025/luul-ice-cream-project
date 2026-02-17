document.addEventListener("DOMContentLoaded", function (event) {
  document.addEventListener("click", function (event) {
    if (event.target.closest(".nav-search")) {
      document.querySelector(".search-bar").classList.add("search-bar-active");
    } else if (event.target.closest(".search-cancel")) {
      document
        .querySelector(".search-bar")
        .classList.remove("search-bar-active");
    }
  });
  document.addEventListener("click", function (event) {
    const formElement = document.querySelector(".form");
    if (event.target.closest(".nav-user,.already-account")) {
      formElement.classList.add("login-active");
      formElement.classList.remove("sign-up-active");
    }
    if (event.target.closest(".sign-up-btn")) {
      formElement.classList.remove("login-active");
      formElement.classList.add("sign-up-active");
    }
    if (event.target.closest(".form-cancel")) {
      formElement.classList.remove("login-active");
      formElement.classList.remove("sign-up-active");
    }
  });

  document.querySelectorAll(".footer-social a").forEach((icon) => {
    icon.addEventListener("mouseover", () => {
      icon.style.transform = "scale(1.15)";
    });

    icon.addEventListener("mouseout", () => {
      icon.style.transform = "scale(1)";
    });
  });
  /* ================= ELEMENTS ================= */
  const cartButtons = document.querySelectorAll(".product-cart-btn");
  const orderSection = document.getElementById("order-section");

  const orderList = document.getElementById("orderList");
  const grandTotalEl = document.getElementById("grandTotal");

  const alertBox = document.getElementById("orderAlert");
  const alertText = document.getElementById("alertText");
  const errorBox = document.getElementById("orderError");

  const orderForm = document.querySelector(".order-form");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");

  /* ================= CART (LOCALSTORAGE) ================= */
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  updateOrderSummary();

  /* ================= ADD TO CART ================= */
  cartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const box = btn.closest(".product-box");
      const name = box.querySelector(".product-text-title").innerText;
      const priceText = box.querySelector(".product-text-price").innerText;
      const price = parseFloat(priceText.replace("$", ""));

      if (cart[name]) {
        cart[name].qty += 1;
      } else {
        cart[name] = { price, qty: 1 };
      }

      saveCart();
      updateOrderSummary();

      orderSection.style.display = "block";
      alertText.innerText = `${name} added to cart`;
      alertBox.style.display = "flex";
      errorBox.style.display = "none";

      orderSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ================= UPDATE UI ================= */
  function updateOrderSummary() {
    orderList.innerHTML = "";
    let grandTotal = 0;

    Object.keys(cart).forEach((item) => {
      const { price, qty } = cart[item];
      const total = price * qty;
      grandTotal += total;

      const li = document.createElement("li");
      li.innerHTML = `
      <span>${item}</span>

      <div class="qty-controls">
        <button class="dec-btn" data-item="${item}">➖</button>
        <span>${qty}</span>
        <button class="inc-btn" data-item="${item}">➕</button>
        <button class="remove-btn" data-item="${item}">❌</button>
      </div>

      <strong>$${total.toFixed(2)}</strong>
    `;

      orderList.appendChild(li);
    });

    grandTotalEl.innerText = `$${grandTotal.toFixed(2)}`;
    bindCartButtons();
  }

  /* ================= BUTTON ACTIONS ================= */
  function bindCartButtons() {
    document.querySelectorAll(".inc-btn").forEach((btn) => {
      btn.onclick = () => {
        cart[btn.dataset.item].qty += 1;
        saveCart();
        updateOrderSummary();
      };
    });

    document.querySelectorAll(".dec-btn").forEach((btn) => {
      btn.onclick = () => {
        const item = btn.dataset.item;
        cart[item].qty -= 1;
        if (cart[item].qty <= 0) delete cart[item];
        saveCart();
        updateOrderSummary();
      };
    });

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.onclick = () => {
        delete cart[btn.dataset.item];
        saveCart();
        updateOrderSummary();
      };
    });
  }

  /* ================= SAVE CART ================= */
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /* ================= PLACE ORDER ================= */
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      Object.keys(cart).length === 0 ||
      !fullName.value.trim() ||
      !email.value.trim() ||
      !phone.value.trim() ||
      !address.value.trim()
    ) {
      errorBox.innerText = "❌ Fadlan ku dar product & buuxi dhammaan xogta.";
      errorBox.style.display = "block";
      return;
    }

    errorBox.style.display = "none";
    alertText.innerText = "✅ Order-kaaga waa la helay. Mahadsanid!";
    alertBox.style.display = "flex";

    cart = {};
    saveCart();
    updateOrderSummary();
    orderForm.reset();
  });
});
