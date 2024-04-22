const elements_container = document.querySelector(".card-slider-viewport");

const get_data = async () => {
    let response = await fetch("../catalog/catalog.json");

    if (response.ok) { 
      let json = await response.json();
      console.log(json);
      catalog_json(json.filter(item => localStorage.cart.includes(item["id"])));
    }
}

const catalog_json = json => {
    json.forEach(el => {
        elements_container.innerHTML += 
        `<a class="card-slider-item" href='../catalog/cart.html?id=${el["id"]}'>
            <div class="card-slider-item-name">${el["name"]}</div>
            <img src="${el["img"]}" alt="" class="card-slider-item-img">
            <div class="card-slider-item-payment">
                <div class="card-slider-item-price">${el["price"]}$</div>
                <div class="card-slider-item-discount">-${el["discount"]}%</div>
            </div>
        </a>`;
    });
}

get_data();

document.querySelector(".sub-now-btn").addEventListener("click", () => {
    alert("paid for!");
    elements_container.innerHTML = ""
});

document.querySelector(".delete").addEventListener("click", () => {
    elements_container.innerHTML = ""
});