const elements_container = document.querySelector(".header-content");

const get_data = async () => {
    let response = await fetch("catalog.json");

    if (response.ok) { 
      let json = await response.json();
      card_json(json[get_param_by_name("id") - 1]);
    }
}

const get_param_by_name = name => {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const card_json = json => {
    elements_container.innerHTML += 
        `<div class="card-info">
        <img src="${json["img"]}" alt="" class="card-img">
        <div class="card-text">
            <div class="card-info-text-g">
                <div class="card-info-name-g">
                    <img src="../img/uil_cart.png">
                    <div class="card-info-name">${json["name"]}</div>
                </div>
                <div class="card-info-desc">${json["textcard"]}</div>    
            </div>
            <div class="card-info-payment">
                <div class="card-info-price">PRICE: ${json["price"]}$</div>
                <div class="card-info-discount-g">
                    <div class="card-info-discount">DISCOUNT: -${json["discount"]}%</div>
                    <div class="card-info-discountprice">DISCOUNTPRICE: ${json["price"]-(json["price"] * json["discount"] / 100)}$</div>
                </div>
            </div>
        </div>
    </div>`;

    document.querySelector(".card-info-name-g>img").addEventListener("click", () => {
        if (localStorage.cart)
            localStorage.setItem("cart", localStorage.cart + get_param_by_name("id") + ", ");
        else 
            localStorage.cart = get_param_by_name("id") + ", ";
        alert("Added to your cart!");
    });
}

get_data();