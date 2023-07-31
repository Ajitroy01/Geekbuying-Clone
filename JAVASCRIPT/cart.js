let cartprod = JSON.parse(localStorage.getItem("cart"));

console.log(cartprod);


// Function to create a cart item element dynamically
function createCartItemElement(cartprod) {

  const cartContainer = document.querySelector(".cart-container");

  cartprod.forEach((product) => {

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
 
  const imgdiv = document.createElement("div");
  imgdiv.classList.add("img-div");
  const image = document.createElement("img");
  image.src = product.image;
  imgdiv.append(image);
  cartItem.appendChild(imgdiv);

  const productName = document.createElement("h3");
  productName.textContent = product.name;
  cartItem.appendChild(productName);

  const productPrice = document.createElement("p");
  productPrice.textContent = `$${product.price.toFixed(2)}`;
  cartItem.appendChild(productPrice);

  const itemQuantity = document.createElement("div");
  itemQuantity.classList.add("item-quantity");

  const decreaseBtn = document.createElement("button");
  decreaseBtn.textContent = "-";
  decreaseBtn.classList.add("quantity-btn");
  decreaseBtn.addEventListener("click", () => {
    const quantityDisplay = cartItem.querySelector(".quantity-display");
    const quantity = parseInt(quantityDisplay.textContent, 10);
    if (quantity > 1) {
      quantityDisplay.textContent = (quantity - 1).toString();
      updateItemTotal(quantityDisplay, productPrice);
      updateTotalPrice();
    }
  });
  
  itemQuantity.appendChild(decreaseBtn);

  const quantityDisplay = document.createElement("p");
  quantityDisplay.textContent = "1";
  quantityDisplay.classList.add("quantity-display");
  itemQuantity.appendChild(quantityDisplay);

  const increaseBtn = document.createElement("button");
  increaseBtn.textContent = "+";
  increaseBtn.classList.add("quantity-btn");
  increaseBtn.addEventListener("click", () => {
    const quantityDisplay = cartItem.querySelector(".quantity-display");
    const quantity = parseInt(quantityDisplay.textContent, 10);
    quantityDisplay.textContent = (quantity + 1).toString();
    updateItemTotal(quantityDisplay, productPrice);
    updateTotalPrice();
  });
  itemQuantity.appendChild(increaseBtn);

  cartItem.appendChild(itemQuantity);

  const quantity = parseInt(quantityDisplay.textContent);
  const itemTotal = document.createElement("p");
  itemTotal.classList.add("item-total");
  itemTotal.textContent = `$${product.price.toFixed(2)}`;
  cartItem.appendChild(itemTotal);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () =>{
    cartItem.remove();
    updateTotalPrice();
    
  });
  cartItem.appendChild(removeButton);
  
  cartContainer.appendChild(cartItem);
  });
}


// Function to update the total price in the cart
function updateTotalPrice() {
  const cartItems = document.querySelectorAll(".cart-item");
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {
    const itemPrice = parseFloat(cartItem.querySelector(".item-total").textContent.replace("$", ""));
    totalPrice += itemPrice;
  });

  const totalElement = document.querySelector(".cart-total h2");
  totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}




function updateItemTotal(quantityDisplay, priceDisplay) {
  const quantity = parseInt(quantityDisplay.textContent, 10);
  const price = parseFloat(priceDisplay.textContent.replace("$", ""));
  const itemTotal = quantity * price;
  const itemTotalDisplay = quantityDisplay.parentNode.parentNode.querySelector(".item-total");
  itemTotalDisplay.textContent = `$${itemTotal.toFixed(2)}`;
}


// Function to initialize the cart page
function initializeCartPage() {
  createCartItemElement(cartprod);
  updateTotalPrice();
}

// Call the function to initialize the cart page
initializeCartPage();
