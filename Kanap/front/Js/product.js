const parsedUrl= new URL (window.location.href)
productId = parsedUrl.searchParams.get("id")
console.log(productId)
const url = "http://localhost:3000/api/products/"
const productUrl = url + productId
console.log(productUrl)


let showDetails = ((details) => {
    fetch(productUrl)
    .then(res => res.json())
    .then((product) => {
    console.log(product)
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
        color.innerHTML += `<option value="${product.colors}">${product.colors}</option>`
    }
    console.log(color)
    })});


showDetails();




