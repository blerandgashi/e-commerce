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
showProductContainer(products)
