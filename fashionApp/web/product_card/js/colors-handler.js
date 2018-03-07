document.addEventListener("DOMContentLoaded", function (event) {
    let count = 0;
    const colorGrid = document.querySelector("#colorgrid");
    const addColorButton = document.querySelector("#add-color");

    addColorButton.addEventListener("click", function (event) {
        count++;
        let color = document.querySelector("#colorpicker");
        let name = document.querySelector("#color-name").value;
        let colorcard = document.createElement("div");
        colorcard.id = "#color-card-" + count;
        let deletecard = document.createElement("div");
        deletecard.classList.add("hidden");
        deletecard.classList.add("del-div");
        let colorName = document.createElement("p");
        let colorHex = document.createElement("p");
        colorName.textContent = name;
        deletecard.innerHTML = `<img id="delete-img-${count}" class="delete-img" src="./product_card/img/icons8-delete-32.png">`;

        colorcard.classList.add("color-card");
        let selectedColor = color.value;
        colorHex.textContent = selectedColor;
        colorcard.style.backgroundColor = selectedColor;

        colorcard.addEventListener("mouseover", function (event) {
            deletecard.classList.remove("hidden");
        });
        colorcard.addEventListener("mouseout", function (event) {
            deletecard.classList.add("hidden");
        });
        let delImgBtn = deletecard.firstChild;
        colorcard.appendChild(deletecard);
        colorcard.appendChild(colorName);
        colorcard.appendChild(colorHex);
        colorGrid.appendChild(colorcard);
        addDeleteListeners(delImgBtn);
    });
    function addDeleteListeners(deleteButton) {
        deleteButton.addEventListener('click', function (event) {
            let btnId = deleteButton.id.toString().split("-");
            console.log(btnId[2]);
            let parent = deleteButton.parentElement.parentElement.parentElement;
            let child = deleteButton.parentElement.parentElement;
            if (confirm(`Are you sure you want to delete this item?`)) {
                //deleteCard(btnId[2]);
                parent.removeChild(child);
            }
        });
    }
    function deleteCard(id){

    }
    function findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }
});