const cartItemsContainer = document.getElementById("cartItems");
const totalAmountEl = document.getElementById("totalAmount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
      </div>
      <div class="quantity">
        <button onclick="changeQty(${item.id}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(div);
  });

  totalAmountEl.textContent = total;
}

function changeQty(id, change) {
  const item = cart.find(p => p.id === id);
  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
