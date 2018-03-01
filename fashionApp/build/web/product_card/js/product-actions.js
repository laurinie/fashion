document.addEventListener("DOMContentLoaded", function (event) {
    getCards();
    let count = 0;
    const searchCardsBtn = document.querySelector("#search-button");
    const searchContainer = document.querySelector("#search-container");
    searchCardsBtn.addEventListener('click', function () {
        if (searchContainer.classList.contains("hidden")) {
            searchContainer.classList.remove("hidden");
        } else {
            searchContainer.classList.add("hidden");
        }
    });

    /*-----This opens and scrolls to productcard------*/
    let addProductBtn = document.querySelector("#add-button");
    let productCard = document.querySelector("#add-product");
    addProductBtn.addEventListener('click', openCard);


    function openCard() {
        const parent = document.querySelector("#card-header").parentElement;
        document.querySelector("#card-header").remove();
        const header = document.createElement("h2");
        header.id = "card-header";
        parent.appendChild(header);

        if (productCard.classList.contains("display-none")) {
            productCard.classList.remove("display-none");
            scrollSmooth("#add-product");
        }

    }


    /*-----Close button for productcard------*/
    const closeBtn = document.querySelector("#close-card");
    const c = document.querySelector("#add-product");
    closeBtn.addEventListener('click', closeCard);

    function closeCard() {
        if (!c.classList.contains("display-none")) {
            c.classList.add("display-none");
            const cardForm = document.querySelectorAll(".card-form");
            for (let form of cardForm) {
                form.reset();
            }
        }
        scrollSmooth("#cards");
    }

    /*-----Save productcard------*/
    const addUrl = "http://localhost:8080/fashionApp/web/productcard/";
    const saveBtn = document.querySelector("#save-card");
    const div = document.querySelector("#cards-container");
    //const p = document.querySelector("#p");

    saveBtn.addEventListener('click', function () {
        count++;
        const name = document.querySelector("#name").value;
        const type = document.querySelector("#type").value;
        const description = document.querySelector("#description").value;
        //const priceRange = document.querySelector("#price-range").value;
        const category = document.querySelector("#category").value;
        const color = document.querySelector("#color").value;
        const quantity = document.querySelector("#quantity").value;
        const price = document.querySelector("#price").value;
        const wholesalePrice = document.querySelector("#wholesale-price").value;
        const retailPrice = document.querySelector("#retail-price").value;
        let data = {
            name: name,
            color: color,
            totalqty: quantity,
            price: price,
            wholesaleprice: wholesalePrice,
            retailprice: retailPrice
        };
        const idFromHeader = document.querySelector("#card-header").firstChild;
        let dataID = "id";
        if (idFromHeader!=null) {
            let splited = idFromHeader.nodeValue.split(" ");
            console.log("put");
            data[dataID] = splited[1];
            return fetch(addUrl + splited[1], {
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data),
                method: 'put'
            })
                .then(function (result) { getCards(); return true })
                .then(newResult => closeCard());
        } else {
            console.log("post");
            return fetch(addUrl, {
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data),
                method: 'post'
            })
                .then(function (result) { getCards(); return true })
                .then(newResult => closeCard());
        }

    });
    function update() {

        const cardsContainer = document.querySelector("#cards-container");
        const cards = cardsContainer.parentNode;
        cardsContainer.remove();
        const newContainer = document.createElement("div");
        newContainer.id = "cards-container";
        newContainer.className = "card-column";
        cards.appendChild(newContainer);
        console.log("update");

    }
    /*-----Get all cards from the database------*/
    function getCards() {
        console.log("getcards");
        update();
        console.log("update");
        const getAll = "http://localhost:8080/fashionApp/web/productcard/";
        const processJSON = (function (json) {
            for (let item of json) {
                //console.log(item);
                showCard(item);
            }
            ;
        });
        fetch(getAll)
            .then(response => response.json())    //Returns a promise that resolves JSON object
            .then(processJSON)
            .catch(error => (console.log("Fetch crashed due to " + error)));
    }
    const advice = document.querySelector("#card-advice");
    /*-----Show card------*/
    function showCard(data) {
        const div = document.querySelector("#cards-container");

        if (!advice.classList.contains("hidden")) {
            advice.className = "hidden";
        }

        const card = document.createElement("DIV");
        const buttonDiv = document.createElement("DIV");
        buttonDiv.className = "button-container";
        card.className = "small-card";
        card.id = `small-card-${data.id}`;

        //------card list------//
        const contentList = document.createElement("dl");
        const listItem = document.createElement("dt");
        const listItemType = document.createElement("dt");
        const dtCategory = document.createElement("dd");
        const dtType = document.createElement("dd");
        const itemCategory = document.createTextNode("Category:");
        const itemType = document.createTextNode("Type:");
        const dtContentCategory = document.createTextNode(`${data.category}`);
        const dtContentType = document.createTextNode(`${data.type}`);
        //console.log(dtContentType + " " + dtContentCategory);
        //----------Edit Button-----------//
        const itemEdit = document.createElement("BUTTON");
        const btnName = document.createTextNode("Edit");
        itemEdit.appendChild(btnName);
        itemEdit.id = `edit-${data.id}`;
        itemEdit.className = "btn edit-btn";

        //----------Delete Button-----------//
        const itemDelete = document.createElement("BUTTON");
        const btnNameDelete = document.createTextNode("Delete");
        itemDelete.appendChild(btnNameDelete);
        itemDelete.id = `delete-${data.id}`;
        itemDelete.className = "btn delete-btn";

        //---------Header------//
        const cardName = document.createElement("H2");
        const nodeName = document.createTextNode(data.name);
        cardName.appendChild(nodeName);



        //-------Append content to dt and dd-----//
        listItem.appendChild(itemCategory);
        listItemType.appendChild(itemType);
        dtCategory.appendChild(dtContentCategory);
        dtType.appendChild(dtContentType);

        //-------Append dt and dd items to dl---//
        contentList.appendChild(listItem);
        contentList.appendChild(dtCategory);
        contentList.appendChild(listItemType);
        contentList.appendChild(dtType);

        //-------Append content to card----//
        card.appendChild(cardName);
        card.appendChild(contentList);
        buttonDiv.appendChild(itemEdit);
        buttonDiv.appendChild(itemDelete);
        card.appendChild(buttonDiv);

        //---Append card------//
        div.appendChild(card);
        addEditListeners(itemEdit);
        addDeleteListeners(itemDelete);
    }

    /*--Add listeners to small pc edit and delete buttons--*/

    function addEditListeners(editButton) {
        editButton.addEventListener('click', function (event) {
            let btnId = editButton.id.toString().split("-");
            openCard();
            editCard(btnId[1]);
        });
    }

    function addDeleteListeners(deleteButton) {
        deleteButton.addEventListener('click', function (event) {
            let btnId = deleteButton.id.toString().split("-");
            console.log(btnId[1]);
            let parent = deleteButton.parentElement.parentElement.parentElement;
            let child = deleteButton.parentElement.parentElement;
            if (confirm(`Are you sure you want to delete this item?`)) {
                deleteCard(btnId[1]);
                //parent.removeChild(child);
            }
        });
    }

    function deleteCard(cardId) {
        const url = "http://localhost:8080/fashionApp/web/productcard/";
        let delUrl = url + cardId;
        return fetch(delUrl, {
            method: 'delete'
        })
            .then(result => getCards());
    }


    /*------Fill pc data to card for editting data-----*/
    function editCard(id) {
        const getByIdurl = "http://localhost:8080/fashionApp/web/productcard/" + id;
        const processJSON = (function (json) {
            fillCard(json);
        });
        fetch(getByIdurl)
            .then(response => response.json())    //Returns a promise that resolves JSON object
            .then(processJSON)
            .catch(error => (console.log("Fetch crashed due to " + error)));


    }
    function fillCard(data) {
        let idHeader = document.createTextNode(`ID: ${data.id}`);
        document.querySelector("#card-header").appendChild(idHeader);
        console.log(data.id);
        document.querySelector("#name").value = data.name;
        document.querySelector("#type").value = data.type;
        document.querySelector("#description").value = data.description;
        //const priceRange = document.querySelector("#price-range").value;
        document.querySelector("#category").value = data.category;
        document.querySelector("#color").value = data.color;
        document.querySelector("#quantity").value = data.totalqty;
        document.querySelector("#price").value = data.price;
        document.querySelector("#wholesale-price").value = data.wholesaleprice;
        document.querySelector("#retail-price").value = data.retailprice;
    }


    /*-----Function for scrolling. Takes div id as parameter------*/
    function scrollSmooth(hash) {

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 500, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
        $(window).scroll(function () {
            $(".slideanim").each(function () {
                let pos = $(this).offset().top;

                let winTop = $(window).scrollTop();
                if (pos < winTop + 600) {
                    $(this).addClass("slide");
                }
            });

        });
    }


});