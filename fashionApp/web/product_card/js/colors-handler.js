document.addEventListener("DOMContentLoaded", function (event) {
    const colorGrid = document.querySelector("#colorgrid");
    const addColorButton = document.querySelector("#add-color");

    addColorButton.addEventListener("click",function (event) {
        let color = document.querySelector("#colorpicker");
        let name = document.querySelector("#color-name").value;
        let colorcard = document.createElement("div");
        let colorName = document.createElement("p");
        let colorHex = document.createElement("p");
        colorName.textContent = name;
        
        colorcard.classList.add("color-card");
        let selectedColor = color.value;
        colorHex.textContent = selectedColor;
        colorcard.style.backgroundColor = selectedColor;
        colorcard.appendChild(colorName);
        colorcard.appendChild(colorHex);
        colorGrid.appendChild(colorcard);
    });
});