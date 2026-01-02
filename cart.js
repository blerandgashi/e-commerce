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
  console.log(e.target.dataset.id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  
})