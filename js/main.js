const btnLoad = document.getElementById("btnLoad");
const URL = "https://api.escuelajs.co/api/v1/products/";
const main = document.getElementById("productContainer");

btnLoad.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("botón btnLoad ");
    getData(); // Llama a la función para cargar los productos
});

function getData() {
    fetch(URL)
        .then((response) => {
            response.json().then((res) => {
                console.log(res.length);
                createCards(res.slice(0, 9)); // solo 9 productos
            });
        })
        .catch((err) => {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                    ${err.message}
                </div>`
            );
        });
}

function createCards(products) {
    main.innerHTML = ""; // Limpia antes de agregar
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.images[1] || product.images[0]}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p><strong>$${product.price}</strong></p>
        `;
        main.appendChild(card);
    });
}
