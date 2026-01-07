const productsContainer = document.getElementById("productsContainer");
const categoryButtons = document.querySelectorAll(".categories button");
const cartCountEl = document.getElementById("cartCount");

let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= LOAD PRODUCTS ================= */

fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    updateCartCount();
    displayProducts("all");
  });

/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(category) {
  productsContainer.innerHTML = "";

  const filtered =
    category === "all"
      ? allProducts
      : allProducts.filter(p => p.category === category);

  filtered.forEach(product => {
    const cartItem = cart.find(i => i.id === product.id);
    const qty = cartItem ? cartItem.quantity : 0;

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
      </div>

      <div class="product-action">
        <img src="${product.image}" loading="lazy">

        ${
          qty === 0
            ? `<button class="add-btn">ADD +</button>`
            : `
              <div class="qty-box">
                <button class="qty-btn minus">−</button>
                <span>${qty}</span>
                <button class="qty-btn plus">+</button>
              </div>
            `
        }
      </div>
    `;

    // ADD
    if (qty === 0) {
      card.querySelector(".add-btn").onclick = () => {
        cart = updateCart(product, 1);
        updateCartCount();
        displayProducts(category);
      };
    } 
    // PLUS / MINUS
    else {
      card.querySelector(".plus").onclick = () => {
        cart = updateCart(product, 1);
        updateCartCount();
        displayProducts(category);
      };

      card.querySelector(".minus").onclick = () => {
        cart = updateCart(product, -1);
        updateCartCount();
        displayProducts(category);
      };
    }

    productsContainer.appendChild(card);
  });
}

/* ================= UPDATE CART ================= */

function updateCart(product, change) {
  let updatedCart = [...cart];
  const item = updatedCart.find(i => i.id === product.id);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      updatedCart = updatedCart.filter(i => i.id !== product.id);
    }
  } else {
    updatedCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
}

/* ================= CART COUNT ================= */

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = count;
}

/* ================= CATEGORY FILTER ================= */

categoryButtons.forEach(btn => {
  btn.onclick = () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    displayProducts(btn.dataset.category);
  };
});
