const btnLoad = document.getElementById("btnLoad");
const container = document.getElementById("productContainer");
const URL = "https://api.escuelajs.co/api/v1/products/";

btnLoad.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Cargando productos");
  getData();
});

function getData() {
  fetch(URL)
    .then((response) => response.json())
    .then((products) => {
      console.log(products.length);
      createCards(products.slice(0, 9));
    })
    .catch((err) => {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="alert alert-danger" role="alert">
          ${err.message}
        </div>`
      );
    });
}

function createCards(products) {
  container.innerHTML = "";
  products.forEach((product) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card shadow-sm h-100 mb-3">
        <img src="${product.images}" class="card-img-top" height="225" style="object-fit: cover;" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description.slice(0, 100)}...</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small class="text-body-secondary">$${product.price}</small>
          </div>
        </div>
      </div>
      `
    );
  });
}
