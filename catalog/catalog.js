const elements_container = document.querySelector(".card-slider-viewport");
let json;

const get_data = async () => {
    let response = await fetch("catalog.json");

    if (response.ok) { 
      json = await response.json();
      catalog_json(json);
    }
}

const catalog_json = j => {
    elements_container.innerHTML = "";
    j.forEach(el => {
        elements_container.innerHTML += 
        `<a class="card-slider-item" href='cart.html?id=${el["id"]}'>
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

const filter1 = document.getElementById("filter1")
filter1.addEventListener("click", filterK)

function filterK(){
  catalog_json(json.filter(el => el.price<1001))
}

const filter2 = document.getElementById("filter2")
filter2.addEventListener("click", filterP)

function filterP(){
  catalog_json(json.filter(el => el.price<5001))
}

const filter3 = document.getElementById("filter3")
filter3.addEventListener("click", filterT)

function filterT(){
  catalog_json(json.filter(el => el.price<10001))
}

const filter4 = document.getElementById("filter4")
filter4.addEventListener("click", filterPT)

function filterPT(){
  catalog_json(json.filter(el => el.price<15001))
}

const filter5 = document.getElementById("filter5")
filter5.addEventListener("click", filterDwa)

function filterDwa(){
  catalog_json(json.filter(el => el.price<20001))
}

const filter6 = document.getElementById("filter6")
filter6.addEventListener("click", filterAll)

function filterAll(){
  catalog_json(json.filter(el => el.price>0))
}


const sortirovka1 = document.getElementById("sortirovka1")
sortirovka1.addEventListener("click", sortName)

function sortName(){
    const catalog_json = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
          }
        }
      };
}


