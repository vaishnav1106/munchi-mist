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


// bill

const placeOrderBtn = document.getElementById("placeOrderBtn")
const billModal = document.getElementById("billModal")

placeOrderBtn.addEventListener("click", () =>{
  openBill(6); //example:6km distance
})

function openBill(distanceKm){
  const billItems = document.getElementById("billItems")
  billItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item =>{
    subtotal +=item.price * item.quantity
    billItems.innerHTML +=`<p>${item.name} x ${item.quantity}</p>`
  })

  const tax = Math.round(subtotal *0.09)

  let delivery = 0
  if(distanceKm > 5){
    delivery = (distanceKm-5) *15
  }

  const total = subtotal +tax+ delivery
  
  document.getElementById("billSubtotal").textContent =subtotal
  document.getElementById("billTax").textContent = tax
  document.getElementById("billDelivery").textContent = delivery
  document.getElementById("billTotal").textContent = total

  billModal.style.display = "flex"

}

document.getElementById("closeBill").onclick = () => {
  billModal.style.display = "none"
}

// whatsapp send order details

document.getElementById("confirmBtn").onclick = () => {
  const ownerNumber = "917592819736"; // OWNER NUMBER
  let message = "New Order for you Munchi Mist:%0A ";

  cart.forEach(item => {
    message += `${item.name} × ${item.quantity}%0A `;
  });

   message += "%0A Go back to complete the payment.";

  window.open(
    `https://wa.me/${ownerNumber}?text=${message}`,
    "_blank"
  );
};

//email send order details

// document.getElementById("confirmBtn").onclick = () => {
//   let body = "Order Details:%0A";

//   cart.forEach(item => {
//     body += `${item.name} × ${item.quantity}%0A`;
//   });

//   window.location.href =
//     `mailto:vaishnav8794@gmail.com?subject=New Order&body=${body}`;
// };


// Payment

document.getElementById("payment").addEventListener("click",() =>{
  const upiId = "vaishnavvnair123appu@okaxis"
  const merchantName = "Munchi Mist"

  //Get final payable amount from bill
  const amount = document.getElementById("billTotal").textContent
  if(!amount || amount <=0){
    alert("Invalid Payment Amount")
    return
  }

  // UPI deep link
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    merchantName
  )}&am=${amount}&cu=INR`;

  // Redirect to UPI app
  window.location.href = upiLink;
  
})
