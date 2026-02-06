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

  //  login and sign up

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

  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      header.classList.remove("header-fix");
    } else if (currentScrollY < lastScrollY) {
      header.classList.add("header-fix");
    } else {
      header.classList.remove("header-fix");
    }
    lastScrollY = currentScrollY;
  });

  // simple hover animation
  document.querySelectorAll(".footer-social a").forEach((icon) => {
    icon.addEventListener("mouseover", () => {
      icon.style.transform = "scale(1.15)";
    });

    icon.addEventListener("mouseout", () => {
      icon.style.transform = "scale(1)";
    });
  });

  const cartButtons = document.querySelectorAll(".product-cart-btn");
  const orderSection = document.getElementById("order-section");
  const productSelect = document.getElementById("productSelect");
  const quantityInput = document.getElementById("quantity");
  const totalPrice = document.getElementById("totalPrice");
  const alertBox = document.getElementById("orderAlert");
  const alertText = document.getElementById("alertText");

  let products = {};

  cartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const box = btn.closest(".product-box");
      const name = box.querySelector(".product-text-title").innerText;
      const priceText = box.querySelector("span").innerText;
      const price = parseFloat(priceText.replace("$", ""));

      products[name] = price;

      orderSection.style.display = "block";

      if (![...productSelect.options].some((o) => o.value === name)) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = `${name} - $${price}`;
        productSelect.appendChild(option);
      }

      productSelect.value = name;
      quantityInput.value = 1;
      totalPrice.innerText = `$${price.toFixed(2)}`;

      alertText.innerText = `${name} was added to your order. Scroll down to finish the form.`;
      alertBox.style.display = "flex";

      orderSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  quantityInput.addEventListener("input", () => {
    const price = products[productSelect.value] || 0;
    totalPrice.innerText = `$${(price * quantityInput.value).toFixed(2)}`;
  });
});
