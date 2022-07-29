const parsedUrl = new URL(window.location.href);
const productId = parsedUrl.searchParams.get("id");
const url = "http://localhost:3000/api/products/";
const productUrl = url + productId;

const cartItems = document.getElementById("cart__items");
// const itemQuantity = document.getElementsByClassName("itemQuantity")
const cartOrder = document.getElementsByTagName("cart__order");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

const regexName = /^[a-z][a-z '-.,]{2,40}$|^$/i;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const regexAddress = /^([a-zA-z0-9/\\''(),-\s]{2,55})$/i;

async function getAllProductsApi() {
  try {
    const allProducts = await fetch(url);
    const products = await allProducts.json();
    return products;
  } catch (error) {
    console.error(error.message);
  }
}


async function getCartInLocalStorage() {
  const product = await getAllProductsApi();
  const arrayLocalStorage = JSON.parse(localStorage.getItem("cart"));
  return arrayLocalStorage.map((element) => {
    const newElement = { ...element };
    const productIndex = product.findIndex(
      (item) => item._id === newElement.id
    );

    newElement.price = product[productIndex].price;
    newElement.image = product[productIndex].imageUrl;
    newElement.altTxt = product[productIndex].altTxt;
    newElement.name = product[productIndex].name;
    return newElement;
  });
}

function renderItems(items) {
  const cartItems = document.getElementById("cart__items");
  cartItems.innerHTML = '';

  items.forEach((item) => {
    const article = document.createElement("article");
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", item.id);
    article.setAttribute("data-color", item.colors);
    article.innerHTML = `
      <div class="cart__item__img">
          <img src="${item.image}" alt="${item.altTxt}">
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
      </div>`;

    cartItems.appendChild(article);
  });

  priceAmount(items);
  renderTotalArticles(items);
}


function priceAmount(itemsInLocalStorage) {
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.innerHTML = itemsInLocalStorage
    .map((element) => element.quantity * element.price)
    .reduce((prev, next) => {
      return prev + next;
    }, 0);
}

function renderTotalArticles(itemsInLocalStorage) {
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = itemsInLocalStorage
    .map((element) => element.quantity)
    .reduce((prev, next) => {
      return prev + next;
    }, 0);
}

async function detectQuantityChange(classElement) {
  document.querySelectorAll(classElement).forEach((quantityBtn) => {
    quantityBtn.addEventListener("change", async (e) => {
      const id = e.target.closest(".cart__item").dataset.id;
      const color = e.target.closest(".cart__item").dataset.color;
      let newQuantity = quantityBtn.value;
      const newCart = (await getCartInLocalStorage()).map((element) => {
        const newItem = { ...element };
        if (newItem.id === id && newItem.colors === color) {
          newItem.quantity = parseInt(newQuantity);
        }
        return newItem;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      priceAmount(newCart);
      renderTotalArticles(newCart);
    });
  });
}

async function detectDeleteItem(classElement) {
  document.querySelectorAll(classElement).forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async (e) => {
      const itemId = e.target.closest(".cart__item").dataset.id;
      const itemColor = e.target.closest(".cart__item").dataset.color;
      const deleteCart = (await getCartInLocalStorage()).filter((element) => {
        if (element.id !== itemId && element.colors !== itemColor) {
          return true;
        }
      });
      localStorage.setItem("cart", JSON.stringify(deleteCart));
      priceAmount(deleteCart);
      renderTotalArticles(deleteCart);
      renderItems(deleteCart);
    });
  });
}

(async () => {
  // Variables

  try {
    const itemsParsed = await getCartInLocalStorage();
    renderItems([...itemsParsed]);
    await detectQuantityChange(".itemQuantity");
    await detectDeleteItem(".deleteItem");
    validateFirstName();
  } catch (error) {
    console.error(error.message);
  }
})();

// REGEX
function validateFirstName(){
  const firstName = document.getElementById
  firstName.addEventListener("change", (e) => {
    let firstNameValue = e.target.value;
    if (regexName.test(firstNameValue) == "") {
      firstNameErrorMsg.innerHTML = "Veuillez remplir ce champ";
    }
    if (regexName.test(firstNameValue) === false) {
      firstNameErrorMsg.innerHTML =
        "Saisie invalide, veuillez remplir ce champ avec uniquement des lettres (minimum 2 et maximum 40)";
      return false;
    } else {
      firstNameErrorMsg.innerHTML = null;
      return true;
    }
  });
}


lastName.addEventListener("change", (e) => {
  let lastNameValue = e.target.value;
  if (regexName.test(lastNameValue) == "") {
    lastNameErrorMsg.innerHTML = "Veuillez remplir ce champ";
  }
  if (regexName.test(lastNameValue) === false) {
    lastNameErrorMsg.innerHTML =
      "Saisie invalide, veuillez remplir ce champ avec uniquement des lettres (minimum 2 et maximum 40)";
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
});

address.addEventListener("change", (e) => {
  let addressValue = e.target.value;
  if (regexName.test(addressValue) == "") {
    addressErrorMsg.innerHTML = "Veuillez remplir ce champ";
  }
  if (regexAddress.test(addressValue) === false) {
    addressErrorMsg.innerHTML =
      "Saisie invalide, ce champ doit contenir un numéro et une rue/avenue/chemin etc";
    return false;
  } else {
    addressErrorMsg.innerHTML = null;
    return true;
  }
});

city.addEventListener("change", (e) => {
  let cityValue = e.target.value;
  if (regexName.test(cityValue) === "") {
    cityErrorMsg.innerHTML = "Veuillez remplir ce champ";
  }
  if (regexName.test(cityValue) == false) {
    cityErrorMsg.innerHTML =
      "Saisie invalide, veuillez remplir ce champ avec uniquement des lettres ";
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
});

email.addEventListener("change", (e) => {
  let emailValue = e.target.value;
  if (regexEmail.test(emailValue) === false) {
    emailErrorMsg.innerHTML =
      "Saisie invalide, l'adresse mail doit comporter un @";
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
});


// function renderItems(items) {
//   priceAmount(items, true, false, {});
// }
// function priceAmount(l, m, p, d) {

// }

// try {
//   const itemsParsed = await foo();
//   renderItems(itemsParsed);
// } catch(error) {

// }