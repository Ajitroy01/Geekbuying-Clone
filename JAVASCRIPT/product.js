async function fetchdata(){
    try{
        let data = await fetch("http://127.0.0.1:5500/db.json");
        data = await data.json()
        appendProductCards(data.Products);
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
 }
 fetchdata()

let count = document.getElementById("prod-count");

let carts = JSON.parse(localStorage.getItem("cart")) || [];

count.innerHTML = carts.length;


 // Function to create a product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.productName;

  const name = document.createElement("h3");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = product.price;

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to Cart";
  addToCartBtn.classList.add("add-to-cart-btn");

  addToCartBtn.addEventListener('click', ()=>{
    carts.push(product);
    localStorage.setItem("cart", JSON.stringify(carts));
    count.innerHTML = carts.length;
    alert("Product Added To Cart");
  })

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(addToCartBtn);

  return card;
}

// Function to append product cards to the product container
function appendProductCards(products) {
  const productContainer = document.querySelector(".product-container");

  products.forEach((product) => {
    const productCard = createProductCard(product);
    productContainer.appendChild(productCard);
  });
}

// Call the function to append product cards on page load







