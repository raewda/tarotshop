const slider = document.querySelector(".card-slider-viewport");

slider.addEventListener("mousewheel", e => {
    var delta = e.deltaY || e.detail || e.wheelDelta;
    slider.scrollLeft += delta;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
});