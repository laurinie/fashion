const URLbase = "http://localhost:8080/fashionApp/";
document.addEventListener('DOMContentLoaded', function (event) {
    let navElements = document.querySelectorAll("nav li");
    let selectedCollection = document.querySelector(".selected-collection");
    toggleSubMenu();
    /* this loop adds listeners for clicks of the navigation elements to change the
     * visibility of the sections of the main element. */

    for (let navElement of navElements) {
        hideElements(".content");
        navElement.addEventListener('click', function (event) {
            let e = event.target.parentNode;
            let target = e.getAttribute('data-target-section');
            console.log(target);
            if (target == "#popup") {
                event.preventDefault();
                modal.style.display = "block";
                fetchCollections();
            } else {
                hideElements(".content");
                event.preventDefault();
                let targetElement = document.querySelector(target);
                targetElement.classList.remove("hidden");
            }
        });
    }
    function hideElements(selector) {
        let elements = document.querySelectorAll(selector);
        for (let element of elements) {
            element.classList.add("hidden");
        }
    }
    function dropMenu(x) {
        const menu = document.querySelector("#menu");
        const menuBtn = document.querySelector("#menu-button");
        const nav = document.querySelector("#nav");


        if (x.matches) { // If media query matches
            menuBtn.classList.remove("hidden");
            menu.classList.add("dropdown");
            nav.classList.add("dropdown");
            menu.classList.add("dropdown-content")
        } else {
            menuBtn.classList.add("hidden");
            menu.classList.remove("dropdown");
            menu.classList.remove("dropdown-content");
            nav.classList.remove("dropdown");
        }
    }

    var x = window.matchMedia("(max-width: 500px)")
    dropMenu(x) // Call listener function at run time
    x.addListener(dropMenu) // Attach listener function on state changes

    // Get the modal
    var modal = document.querySelector('#myModal');

    // Get the <span> element that closes the modal
    var closeModal = document.querySelector("#close-modal");
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const collectionsURL = URLbase + "web/collections/";
    function fetchCollections() {
        const selectBudgetElem = document.querySelector("#select-collection__select");
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

        selectBudgetElem.addEventListener("change", function (event) {
            let select = event.target;
            let selectedOption = select[select.selectedIndex];
            let idString = selectedOption.id.split("-");
            collectionID = idString[1];
            selectedCollection = document.querySelector(".selected-collection");
            selectedCollection.id = collectionID;
            selectedCollection.textContent = selectedOption.text;
            console.log(selectedOption.text);
            if(selectedOption.id == "no-collection"){
                selectedCollection.firstChild.remove();
                selectedCollection.id="";
            }
            toggleSubMenu();
        });
    }
    function toggleSubMenu() {
        const subMenu = document.querySelector("#sub-menu");
        if (!selectedCollection.firstChild) {
            subMenu.classList.add("hidden");
        } else {
            subMenu.classList.remove("hidden");
        }
    }
});