const parsedUrl= new URL (window.location.href)
const productId = parsedUrl.searchParams.get("id")
const url = "http://localhost:3000/api/products/"
const productUrl = url + productId
const cartItems = document.getElementById("cart__items")
const arrayProduct = JSON.parse(localStorage.getItem('cart'))
const cartOrder = document.getElementsByTagName("cart__order")
const totalQuantity = document.getElementById("totalQuantity")
const totalPrice = document.getElementById("totalPrice")
const changeQuantity = document.querySelector(".itemQuantity")




function finalCart(){
let quantity = 0
let price = 0
if (arrayProduct !=null){
for (i = 0; i < arrayProduct.length; i++){
  const id = arrayProduct[i].id
  const colors = arrayProduct[i].colors
  const productQuantity = arrayProduct[i].quantity
  fetch(url) 
  .then(res => res.json())
  .then((product) => {
  const productApi = product.find((element) => element._id === id)
  const imageApi = productApi.imageUrl
  const altTxtApi = productApi.altTxt
  const nameApi = productApi.name
  const priceApi = productApi.price

  cartItems.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${colors}">
<div class="cart__item__img">
  <img src="${imageApi}" alt="${altTxtApi}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${nameApi}</h2>
    <p>${colors}</p>
    <p>${priceApi} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productQuantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem" onclick= "deleteProduct('${id}', '${colors}')">Supprimer</p>
    </div>
  </div>
</div>
</article>`;

price += priceApi * productQuantity
totalPrice.innerHTML = price
console.log(price)

quantity += productQuantity
totalQuantity.innerHTML = quantity

}) 
} 
}
}

finalCart()



const elementData = document.querySelectorAll("article")
console.log(elementData)
 



// function deleteProduct(id, colors){
//   for (i = 0; i < arrayProduct.length; i++){
//     if (id === arrayProduct[i].id && colors === arrayProduct[i].colors) {
//       arrayProduct.splice(i, 1)
//       localStorage.setItem('cart', JSON.stringify(arrayProduct))
//       window.location.reload()
//     }
//   }
// }

// deleteProduct()


// const name = document.getElementById("firstName")
// const lastName = document.getElementById("lastName")
// const address = document.getElementById("address")
// const city = document.getElementById("city")
// const email = document.getElementById("email")

// const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
// const lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
// const addressErrorMsg = document.getElementById("addressErrorMsg")
// const cityErrorMsg = document.getElementById("cityErrorMsg")
// const emailErrorMsg = document.getElementById("emailErrorMsg")

// const regexName = /^[a-z\-][A-Z]['-]{1,40}$|^$/i;
// const regexEmail = /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i;
// const regexPassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;


// function firstNameChecker(name) {
//   if (regexName.test(name) === false){
//     return false
//   } else {
//     firstNameErrorMsg.innerHTML = null
//     return true
//   }
// }
// firstNameChecker()

// function firstNameChecker(name) {
//   if (regexName.test(name) === false){
//     return false
//   } else {
//     firstNameErrorMsg.innerHTML = null
//     return true
//   }
// }

// firstNameChecker()