document.addEventListener("DOMContentLoaded", function (event) {
    let count = 0;
    let data = {
        id: null,
        name: null,
        description: null,
        itemType: null,
        category: null,
        color: null,
        totalQty: null,
        price: null,
        wholesalePrice: null,
        retailPrice: null
    }


    /*-----This opens and scrolls to productcard------*/
    let addProductBtn = document.querySelector("#add-button");
    let productCard = document.querySelector("#add-product");
    addProductBtn.addEventListener('click', openCard);


    function openCard() {
        if (productCard.classList.contains("display-none")) {
            productCard.classList.remove("display-none");
        }
        scrollSmooth("#add-product")
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


        data.id = count;
        data.name = name;
        data.type = type;
        console.log(data.id + data.name + data.type);
        data.description = description;
        data.category = category;
        data.color = color;
        data.quantity = quantity;
        data.price = price;
        data.wholesalePrice = wholesalePrice;
        data.retailPrice = retailPrice;
        showCard(data);
        closeCard();

    });

    /*-----Show card------*/
    function showCard(data) {

        const card = document.createElement("DIV");
        const buttonDiv = document.createElement("DIV");
        buttonDiv.className = "button-container";
        card.className = "small-card";

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
        addEditListeners();
        addDeleteListeners();

        /*--Add listeners to small pc edit and delete buttons--*/
    }
    function addEditListeners() {
        let editButtons = document.querySelectorAll(".edit-btn");

        for (let btn of editButtons) {
            btn.addEventListener('click', function (event) {
                openCard();
                editCard(data);
                console.log(btn.id);
            });
        }
    }
    function addDeleteListeners() {
        let deleteButtons = document.querySelectorAll(".delete-btn");

        for (let btn of deleteButtons) {
            btn.addEventListener('click', function (event) {
                console.log(btn.parentElement.parentElement);
                let parent = btn.parentElement.parentElement.parentElement;
                let child = btn.parentElement.parentElement;
                if (confirm(`Are you sure you want to delete this item?`)) {
                    // Save it!
                    parent.removeChild(child);
                } else {
                    // Do nothing!
                }
            });
        }
    }

    /*------Fill pc data to card for editting data-----*/
    function editCard(data){
        document.querySelector("#name").value = data.name;
        document.querySelector("#type").value= data.type;
        document.querySelector("#description").value=data.description;
        //const priceRange = document.querySelector("#price-range").value;
        document.querySelector("#category").value=data.category;
        document.querySelector("#color").value=data.color;
        document.querySelector("#quantity").value=data.quantity;
        document.querySelector("#price").value=data.price;
        document.querySelector("#wholesale-price").value=data.wholesalePrice;
        document.querySelector("#retail-price").value=data.retailPrice;
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