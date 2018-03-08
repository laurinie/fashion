document.addEventListener("DOMContentLoaded", function (event) {
    getColorCards();
    let collectionID;
    let count = 0;
    
    const addColorButton = document.querySelector("#add-color");

    function showColorCard(data) {
        let colorGrid = document.querySelector("#colorgrid");
        count++;
        let color = document.querySelector("#colorpicker");
        //let name = document.querySelector("#color-name").value;
        let colorcard = document.createElement("div");
        let colorDiv = document.createElement("div");
        colorDiv.classList.add("color-div");
        colorcard.id = "color-card-" + count;
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
    const addUrl = "http://localhost:8080/fashionApp/web/color/";

    addColorButton.addEventListener('click', function () {
        const name = document.querySelector("#color-name").value;
        const hexa = document.querySelector("#colorpicker").value;
        let data = {
            name: name,
            hexa: hexa,
            collectionID:  parseInt(collectionID)
        };
        return fetch(addUrl, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
            method: 'post'
        })
             .then(function (result) { getColorCards(); return true; })
            // .then(newResult => closeCard());
    });
    function getColorCards(){
        update();

        const getAll = "http://localhost:8080/fashionApp/web/color/";
        const processJSON = (function (json) {
            for (let item of json) {
                console.log(item);
                showColorCard(item);
            }
            ;
        });
        fetch(getAll)
            .then(response => response.json())    //Returns a promise that resolves JSON object
            .then(processJSON)
            .catch(error => (console.log("Fetch crashed due to " + error)));

    }
    function deleteColorCard(cardId) {
        const url = "http://localhost:8080/fashionApp/web/color/";
        let delUrl = url + cardId;
        return fetch(delUrl, {
            method: 'delete'
        })
            .then(result => getColorCards());
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
    const URLbase = "http://localhost:8080/fashionApp/";
    const collectionsURL = URLbase + "web/collections/";
    fetchCollections();

    function fetchCollections() {
        const selectBudgetElem = document.querySelector("#select-color__select");
        fetch(collectionsURL)
            .then(response => response.json())
            .then(collections => {

                for (let collection of collections) {
                    let option = document.createElement("option");
                    option.text = collection.name;
                    option.setAttribute("id", "collectionid-" + collection.id);
                    selectBudgetElem.appendChild(option);
                }
            }).catch(error => (console.log("Fetch crashed due to " + error)));
            
        selectBudgetElem.addEventListener("change", function(event) {
            let select = event.target;
            let selectedOption = select[select.selectedIndex];
            let idString = selectedOption.id.split("-");
            collectionID = idString[1];
            //var myNode = budgetContainer;
            // while (myNode.firstChild) {
            //     myNode.removeChild(myNode.firstChild);
            // }
            console.log(collectionID);
            //sgetCategories(collectionID);
        });
    }

});