const parsedUrl= new URL (window.location.href)
const productId = parsedUrl.searchParams.get("id")
const url = "http://localhost:3000/api/products/"
const productUrl = url + productId
let colors = document.getElementById("colors")
let quantity = document.getElementById("quantity")
let addToCart = document.getElementById("addToCart");


let showDetails = ((details) => {
    fetch(productUrl)
    .then(res => res.json())
    .then((product) => {
    let image = document.querySelector(".item__img")
    image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    let title = document.getElementById("title")
    title.innerHTML = product.name
    let price = document.getElementById("price")
    price.innerHTML = product.price
    let description = document.getElementById("description")
    description.innerHTML = product.description
    let color = document.getElementById("colors")
    for (i = 0; i < product.colors.length; i++){
        color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
    }
    })});


showDetails();



addToCart.onclick = () =>{
    let name = document.getElementById("title").textContent
    let colors = document.getElementById("colors").value
    let quantity = document.getElementById("quantity").value
    let colorName = name +" "+ colors

    if (localStorage.length === 0){
        localStorage.setItem(colorName, JSON.stringify([]));
    }

    let basket = JSON.parse(localStorage.getItem(colorName));
    
    if (localStorage.getItem(colorName)){
        foundProduct = JSON.parse(localStorage.getItem(colorName))
        let newItem = {
            itemId: productId,
            colors: colors, 
            quantity: (parseInt(foundProduct.quantity) + parseInt(quantity)),
            name: name
        }
        localStorage.removeItem(colorName)
        localStorage.setItem(colorName, JSON.stringify(newItem))
    } else {
        let newItem = {
            itemId: productId,
            colors: colors, 
            quantity: quantity,
            name: name
        }  
        localStorage.setItem(colorName, JSON.stringify(newItem))
    }
  
    document.location.reload();
    window.location.href = "./cart.html"
};



















// Incrémenterla quantité Décrémenter la quantité   
// Ajouter au panier
// Id du produit, le couleur et la quantité
// On veut "enregistrer" ces paramètres
// Envoyer ces paramètres à la page panier


