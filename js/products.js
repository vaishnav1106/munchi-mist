const productsContainer = document.getElementById("productsContainer");
const categoryButtons = document.querySelectorAll(".categories button");

let allProducts = [];

// Load products
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
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
      </div>

      <div class="product-action">
        <img src="${product.image}" alt="${product.name}">
        <button class="add-btn">ADD +</button>
      </div>
    `;

    card.querySelector(".add-btn").addEventListener("click", () => {
      addToCart(product.id);
    });

    productsContainer.appendChild(card);
  });
}

// Category filter
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    displayProducts(btn.dataset.category);
  });
});

// Add to cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = allProducts.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
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
  alert(`${product.name} added to cart`);
}
