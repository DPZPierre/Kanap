const parsedUrl= new URL (window.location.href)
const productId = parsedUrl.searchParams.get("id")
const url = "http://localhost:3000/api/products/"
const productUrl = url + productId
let addToCart = document.getElementById("addToCart")


let showDetails = (() => {
    fetch(productUrl)
    .then(res => res.json())
    .then((product) => {
    let image = document.querySelector(".item__img")
    let title = document.getElementById("title")
    let price = document.getElementById("price")
    let description = document.getElementById("description")
    let color = document.getElementById("colors")

    image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    title.innerHTML = product.name
    price.innerHTML = product.price
    description.innerHTML = product.description
    
    for (i = 0; i < product.colors.length; i++){
        color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
    }
    })});


showDetails();

addToCart.addEventListener("click", (event) =>{
    const colors = document.getElementById("colors").value
    const quantity = parseInt(document.getElementById("quantity").value)
    const newItem = {
        id: productId,
        colors,
        quantity,
    };
    const item = localStorage.getItem('cart');
    let itemAlreadyExist = false;

    if (!item) return localStorage.setItem('cart', JSON.stringify([{ ...newItem }]));
    
    const newCart = JSON.parse(item).map((element) => {
        const elementSpread = { ...element };
        if (elementSpread.colors === newItem.colors && elementSpread.id === newItem.id) {
            elementSpread.quantity = elementSpread.quantity + newItem.quantity;
            itemAlreadyExist = true;
        }

        return elementSpread;
    });

    if (!itemAlreadyExist) newCart.push({ ...newItem });
    return localStorage.setItem('cart', JSON.stringify(newCart));
})




// addToCart.onclick = () =>{
    // let name = document.getElementById("title").textContent
    // let colors = document.getElementById("colors").value
    // let quantity = document.getElementById("quantity").value
    // let colorName = name +" "+ colors
    // let price = document.getElementById("price").textContent
    
    
//     if (localStorage.getItem(colorName)){
//         foundProduct = JSON.parse(localStorage.getItem(colorName))
//         let newItem = {
//             itemId: productId,
//             colors: colors, 
//             quantity: (parseInt(quantity) + parseInt(foundProduct.quantity)),
//             name: name,
//             price: price,     
//         }
//         localStorage.removeItem(colorName)
//         localStorage.setItem(colorName, JSON.stringify(newItem))
//     } else {
//         let newItem = {
//             itemId: productId,
//             colors: colors, 
//             quantity: parseInt(quantity),
//             name: name,
//             price: price,    
//         }  
//         localStorage.setItem(colorName, JSON.stringify(newItem))
//     }
//     document.location.reload();
//     window.location.href = "./cart.html"
// };





















// Incrémenterla quantité Décrémenter la quantité   
// Ajouter au panier
// Id du produit, le couleur et la quantité
// On veut "enregistrer" ces paramètres
// Envoyer ces paramètres à la page panier


