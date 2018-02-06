document.addEventListener("DOMContentLoaded", function (event) {

    let addProductBtn = document.querySelector("#add-button");
    let productCard = document.querySelector("#add-product");
    addProductBtn.addEventListener('click', function () {

        if (productCard.classList.contains("display-none")) {
            productCard.classList.remove("display-none");
            }
        
    });

    let closeBtn = document.querySelector("#closecard");
    let c = document.querySelector("#add-product");
    closeBtn.addEventListener('click', function () {
        if (!c.classList.contains("display-none")) {
            c.classList.add("display-none");
            }
        
    });


});