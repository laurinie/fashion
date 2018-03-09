document.addEventListener("DOMContentLoaded", function (event) {
    //--------------------------------//
    const URLbase = "http://localhost:8080/fashionApp/";
    const colorUrl = "web/color/";
    //-------------------------------//
let selectedId;
    const collection = document.querySelector("#select-collection__select");
    collection.addEventListener("change", function (event) {
        let select = event.target;
        let selectedOption = select[select.selectedIndex].id.split("-");
        selectedId = parseInt(selectedOption[1]);
        if (selectedOption != "no-collection") {
            getColorCards(selectedId);
        }

    });
    

    const addColorButton = document.querySelector("#add-color");
    const advice = document.querySelector("#color-advice");
    function showColorCard(data) {
        let colorGrid = document.querySelector("#colorgrid");
        
        let color = document.querySelector("#colorpicker");
        let colorcard = document.createElement("div");
        let colorDiv = document.createElement("div");
        colorDiv.classList.add("color-div");
        colorcard.id = "color-card-" + data.id;
        let deletecard = document.createElement("div");
        deletecard.classList.add("hidden");
        deletecard.classList.add("del-div");
        let colorName = document.createElement("p");
        let colorHex = document.createElement("p");
        colorName.textContent = data.name;
        deletecard.innerHTML = `<img id="delete-img-${data.id}" class="delete-img" src="./product_card/img/icon_delete.png">`;

        colorcard.classList.add("color-card");
        let selectedColor = color.value;
        colorHex.textContent = data.hexa;
        colorDiv.style.backgroundColor = data.hexa;

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
        colorcard.appendChild(colorDiv);
        colorGrid.appendChild(colorcard);
        addDeleteListeners(delImgBtn);
    };
    function addDeleteListeners(deleteButton) {
        deleteButton.addEventListener('click', function (event) {
            let btnId = deleteButton.id.toString().split("-");
            let parent = deleteButton.parentElement.parentElement.parentElement;
            let child = deleteButton.parentElement.parentElement;
            if (confirm(`Are you sure you want to delete this item?`)) {
                deleteColorCard(btnId[2]);
                //parent.removeChild(child);
            }
        });
    }
    

    addColorButton.addEventListener('click', function () {
        
        const name = document.querySelector("#color-name").value;
        const hexa = document.querySelector("#colorpicker").value;
        let data = {
            name: name,
            hexa: hexa,
            collectionID: selectedId
        };
        return fetch(URLbase+colorUrl, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
            method: 'post'
        })
            .then(function (result) { getColorCards(data.collectionID); return true; })
        // .then(newResult => closeCard());
    });
    function getColorCards(id) {
        update();

        const getAll = URLbase+colorUrl+"collectionid/" + id;
        const processJSON = (function (json) {
            for (let item of json) {
                showColorCard(item);
            }
            
        });
        fetch(getAll)
            .then(response => response.json())    //Returns a promise that resolves JSON object
            .then(processJSON)
            .catch(error => (console.log("Fetch crashed due to " + error)));

    }
    function deleteColorCard(cardId) {
        //const url = "http://localhost:8080/fashionApp/web/color/";
        let delUrl = URLbase+colorUrl + cardId;
        return fetch(delUrl, {
            method: 'delete'
        })
            .then(result => getColorCards(selectedId));
    }
    function update() {
        const cardsContainer = document.querySelector("#colorgrid");
        const cards = cardsContainer.parentNode;
        cardsContainer.remove();
        const newContainer = document.createElement("div");
        newContainer.id = "colorgrid";
        //newContainer.className = "card-column";
        cards.appendChild(newContainer);
    }
   // const URLbase = "http://localhost:8080/fashionApp/";
    const collectionsURL = URLbase + "web/collections/";
});