const URLbase = "http://localhost:8080/fashionApp/";
document.addEventListener('DOMContentLoaded', function (event) {
    let smallScreen = false;

    const startElement = document.querySelector("#start");
    let navElements = document.querySelectorAll("nav li");
    let selectedCollection = document.querySelector(".selected-collection");
    toggleSubMenu();
    /* this loop adds listeners for clicks of the navigation elements to change the
     * visibility of the sections of the main element. */
    const menuButton = document.querySelector("#menu-button");
    const dropdown = document.querySelector(".dropdown-content");
    menuButton.addEventListener("click", function (event) {
        event.preventDefault();
        dropdown.classList.toggle("display");
    });
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
            if (smallScreen) {
                console.log("smallScreen");
                dropdown.classList.remove("display");
            }
        });
        startElement.classList.remove("hidden");
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
            smallScreen = true;

        } else {
            menuBtn.classList.add("hidden");
            menu.classList.remove("dropdown");
            menu.classList.remove("dropdown-content");
            nav.classList.remove("dropdown");
            smallScreen = false;
        }
    }
    const addNewCollection = document.querySelector("#add-new-collection");
    addNewCollection.addEventListener('click', function (event) {
        event.preventDefault();
        const addUrl = URLbase + "web/collections/";
        const name = document.querySelector("#new-collection").value;
        let data = {
            name: name
        };
        return fetch(addUrl, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
            method: 'post'
        })
            .then(function (result) { fetchCollections(); return true; })
        // .then(newResult => closeCard());
    });

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
        selectedCollection = document.querySelector(".selected-collection");
        console.log("jee" + selectedCollection.textContent);
        // collections fech should be added feature to member last selection ---//
        const selectBudgetElem = document.querySelector("#select-collection__select");
        let childs = selectBudgetElem.childNodes;
        while (selectBudgetElem.firstChild) {
            selectBudgetElem.removeChild(selectBudgetElem.firstChild);
        }
        noCollection = document.createElement("option");
        noCollection.text = "No collection";
        noCollection.id = "no-collection";
        selectBudgetElem.appendChild(noCollection);
        fetch(collectionsURL)
            .then(response => response.json())
            .then(collections => {

                for (let collection of collections) {
                    let option = document.createElement("option");
                    option.text = collection.name;
                    option.setAttribute("id", "collectionid-" + collection.id);
                    selectBudgetElem.appendChild(option);
                    if (selectedCollection.textContent == collection.name) {
                        option.selected = collection.name;
                    }

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
            if (selectedOption.id == "no-collection") {
                selectedCollection.firstChild.remove();
                selectedCollection.id = "no-collection";
                hideElements(".content");
                startElement.classList.remove("hidden");
            }
            toggleSubMenu();
            modal.style.display = "none";
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