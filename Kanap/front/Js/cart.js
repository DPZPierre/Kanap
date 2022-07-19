const parsedUrl= new URL (window.location.href)
const productId = parsedUrl.searchParams.get("id")
const url = "http://localhost:3000/api/products/"
const productUrl = url + productId
const cartItems = document.getElementById("cart__items")
const items =  Object.keys(localStorage)

      fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then((product) => { console.log(product)
        for (i = 0; i < items.length; i++) {
          let itemName = Object.keys(localStorage)[i]
          let item = JSON.parse(localStorage.getItem(itemName))

          // LocalStorage - [{ id: 1, colors: 'red'}]
          // Products - [{ id: 1, colors: 'red', imageUrl: 'url'..}],
  
      cartItems.innerHTML += `<article class="cart__item" data-id="${item.itemId}" data-color="${item.colors}">
              <div class="cart__item__img">
                <img src="${product.imageUrl} alt="${product.altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${item.name}</h2>
                  <p>${item.colors}</p>
                  <p>${item.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
              </article>`;
    
  }});











































 
const cartOrder = document.getElementsByTagName("cart__order")
const totalQuantity = document.getElementById("totalQuantity")
const totalPrice = document.getElementById("totalPrice")

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const address = document.getElementById("address")
const city = document.getElementById("city")
const email = document.getElementById("email")

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
const addressErrorMsg = document.getElementById("addressErrorMsg")
const cityErrorMsg = document.getElementById("cityErrorMsg")
const emailErrorMsg = document.getElementById("emailErrorMsg")

const regexName = /^[a-z\-][A-Z]{1,40}$|^$/i;
const regexEmail = /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i;
const regexPassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;