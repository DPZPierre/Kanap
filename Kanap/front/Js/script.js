
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then((text) => {
      let productPath = document.getElementById("items");

      for (i = 0; i < text.length; i++) {
        productPath.innerHTML += `
        <a href="./product.html?id=${text[i]._id}">
          <article>
            <img src="${text[i].imageUrl}" alt="${text[i].altTxt}"/>
            <h3 class="productName">${text[i].name}</h3>
            <p class="productDescription">${text[i].description}</p>
          </article>
        </a>
        `
    }});






