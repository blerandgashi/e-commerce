const cartCount = document.querySelector("#cart-count");
const searchInput = document.querySelector("#search-input");
const filterBtns = document.querySelector(".filter-btn");
const productContainer = document.querySelector("#products-container");

function showProductContainer(productsArr){
  let html = "";

  productsArr.forEach(product => {
    html += `
      <div class="product-card">
        <img src="${product.image}" class="product-image">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price}</p>
        <p class="product-description">${product.description}</p>
        <p>Category: ${product.category}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `
  });

  productContainer.innerHTML = html;
}
showProductContainer(products);

productContainer.addEventListener("click", function(e){
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.dataset.id);
    
    const product = products.find(product => product.id === productId);
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productExists = cart.find(item => item.id === productId)

    if (productExists) {
      productExists.quantity += 1;
    }else{
      cart.push({
        id:product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    getCartCount()
  }
})

function getCartCount(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  console.log(totalItems);
  
  cartCount.textContent = totalItems;
}
getCartCount()

const allBtns = document.querySelectorAll(".filter-btn");
let currentCategory = "all";

allBtns.forEach(btn => {
  
  btn.addEventListener("click", function(){
    btn.classList.remove("active");
    btn.classList.add("active");

    currentCategory = btn.dataset.category;  
    if (currentCategory !== "all") {
      filterProducts(currentCategory);
    }else{
      showProductContainer(products);
    }
  })
})

function filterProducts(btnCategory){
  const arr = products.filter(product => product.category === btnCategory);
  let html = "";
  arr.forEach(productCategory => {
    html += `
      <div class="product-card">
        <img src="${productCategory.image}" class="product-image">
        <h3 class="product-name">${productCategory.name}</h3>
        <p class="product-price">${productCategory.price}</p>
        <p class="product-description">${productCategory.description}</p>
        <p>Category: ${productCategory.category}</p>
        <button class="add-to-cart-btn" data-id="${productCategory.id}">Add to Cart</button>
      </div>
    `
  })
  productContainer.innerHTML = html;
}

searchInput.addEventListener("input", function(e){
  const value = e.target.value;

  const filteredProducts = products.filter(product => {
    const toLowerCase = product.name.toLowerCase();
    return toLowerCase.includes(value);
  });
  console.log(filteredProducts);

  showProductContainer(filteredProducts);
})
