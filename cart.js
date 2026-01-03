let cartItems = document.querySelector("#cart-items");
const emptyCart = document.querySelector("#empty-cart");
const cartSummary = document.querySelector("#cart-summary");

function addCartItems(){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartSummary.style.display = "none";
    cartItems.innerHTML = "";
    return;
  }

  emptyCart.style.display = "none";
  cartSummary.style.display = "block"

  cart.forEach(product => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${product.image}" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="product-name">${product.name}</h3>
          <p class="cart-item-price">${product.price}</p>
          <div class="quantity-controls">
            <button class="quantity-btn decrease-btn" data-id="${product.id}">-</button>
            <span class="quantity">${product.quantity}</span>
            <button class="quantity-btn increase-btn" data-id="${product.id}">+</button>
          </div>
        </div>
      </div>
    `
  })
}
addCartItems()

cartItems.addEventListener("click", function(e){
  const productId = parseInt(e.target.dataset.id);

  if (e.target.classList.contains('increase-btn')) {
    updateQuantity(productId, 1)
  }else if (e.target.classList.contains('decrease-btn')) {
    updateQuantity(productId, -1);
  }else if (e.target.classList.contains("remove-btn")) {
    removeFromChart(productId);
  }
  
})

function updateQuantity(productId, change){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity += change;

    if(item.quantity < 0){
      cart = cart.filter(item => item.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  } 
}

function removeFromChart(productId){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item.id !== productId);

  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart(){
  
}