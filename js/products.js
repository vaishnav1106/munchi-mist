const productsContainer = document.getElementById("productsContainer");
const categoryButtons = document.querySelectorAll(".categories button");

let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts("all");
  });

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

    if (qty === 0) {
      card.querySelector(".add-btn").onclick = () => {
        updateCart(product, 1);
        showToast("Added to cart");
        displayProducts(category);
      };
    } else {
      card.querySelector(".plus").onclick = () => {
        updateCart(product, 1);
        displayProducts(category);
      };

      card.querySelector(".minus").onclick = () => {
        updateCart(product, -1);
        displayProducts(category);
      };
    }

    productsContainer.appendChild(card);
  });
}

function updateCart(product, change) {
  const item = cart.find(i => i.id === product.id);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== product.id);
    }
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

categoryButtons.forEach(btn => {
  btn.onclick = () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    displayProducts(btn.dataset.category);
  };
});


function showToast(message, duration = 2500) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}
