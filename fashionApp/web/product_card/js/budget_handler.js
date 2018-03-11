

document.addEventListener("DOMContentLoaded", function (event) {

    const URLbase = "http://localhost:8080/fashionApp/";
    const productsURL = URLbase + "web/productcard/";
    const categoriesURL = URLbase + "web/category/";
    const categorynamesURL = URLbase + "web/categoryname/";
    const collectionsURL = URLbase + "web/collections/";
    const typesURL = URLbase + "web/type/";
    const typenameURL = URLbase + "web/typename/";
    const itemsURL = URLbase + "web/item/";

    const budgetPageElement = document.querySelector("#budget");
    const budgetContainer = document.createElement("div");
    budgetContainer.className = "budget-container";
    budgetPageElement.appendChild(budgetContainer);
    
    let currentCollection = 0;
    
    // workaround code for the typeInput. I know, it's ugly.
    let lastActiveElement = null;
    document.addEventListener("click", function () {
        lastActiveElement = document.activeElement;
    });

    //----keeps track of collection change and ---//
    const collection = document.querySelector("#select-collection__select");
    collection.addEventListener("change", function (event) {
        let select = event.target;
        let selectedOption = select[select.selectedIndex].id.split("-");
        let selectedId = parseInt(selectedOption[1]);
        currentCollection = selectedId;
        if (selectedOption !== "no-collection") {
            getCategories(selectedId);
            var myNode = budgetContainer;
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            
            let datalist = budgetPageElement.querySelector("#category-names");
            var myNode = datalist;
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
            fetch(categorynamesURL)
            .then(results => results.json())
            .then(categories => {
                for (let category of categories) {
                    let option = document.createElement("option");
                    option.value = category.name;
                    datalist.appendChild(option);
                }
            }).catch(error => (console.log("Fetch crashed due to " + error)));
        }

    });
    
    
    const addCategory = budgetPageElement.querySelector("#new-category");
    addCategory.addEventListener("click", function(event) {
        let form = event.target.parentNode; 
        let value = form.querySelector("input").value;
        if(value !== "") {
        fetch(categorynamesURL)
            .then(results => results.json())
            .then(categories => {
                let categoryID;
                for (let category of categories) {
                    if (category.name === value) {
                        categoryID = category.id;
                        return parseInt(categoryID);
                    }
                }
                return value;
            }).then(category => {
                if (typeof category === "string") {
                    let data = {
                        name: category
                    };
                    return fetch(categorynamesURL, {
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(data),
                            method: 'post'
                        }).then(response => response.json())
                        .then(newCategory => {
                            return newCategory.id;
                        }).catch(error => (console.log("Fetch crashed due error: " + error)));
                    // return id;    
                } else {
                    return category;
                }
            }).then(categoryID => {
                    let category = {
                        name: parseInt(categoryID),
                        collectionID: parseInt(currentCollection),
                        budget: null
                    };

                    return category;
                }).then(category => {
                    return fetch(categoriesURL, {
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(category),
                        method: 'post'
                    }).catch(error => (console.log("Fetch crashed due error: " + error)));
                }).then(response => response.json())
                .then(newCategory => {
                    return newCategory.id;
                })
                .then(id => {
                    return fetch(categoriesURL + id).then(response => response.json()).catch(error => (console.log("Fetch crashed due to " + error)));
                }).then(newCategory => {
                            console.log(newCategory);
                            let newBudgetGroup = createBudgetGroup(newCategory.id, newCategory.name.name);
                            newBudgetGroup.setAttribute("id", "categoryid-" + newCategory.id);
                            budgetContainer.appendChild(newBudgetGroup);

                }).catch(error => (console.log("Fetch crashed due to " + error)));     
            } else {
                alert("Give a name for the category");
            }
    });

    //--- Fetches all categories from database and creates the budget groups in HTML by calling createBudgetGroup. ---//
    function getCategories(selectedCollection) {
        fetch(categoriesURL + "collectionid/" + selectedCollection)
            .then(response => response.json())
            .then(categories => {
                for (let category of categories) {
                    let newBudgetGroup = createBudgetGroup(category.id, category.name.name);
                    newBudgetGroup.setAttribute("id", "categoryid-" + category.id);
                    budgetContainer.appendChild(newBudgetGroup);
                    getTypes(category.id);
                }

            }).catch(error => (console.log("Fetch crashed due to " + error)));
        // catch errors    
    }
    
    //--- called from getCategories(). Fetches all the items of the type and calls getItems. ---//
    function getTypes(categoryID) {
        fetch(typesURL)
            .then(response => response.json())
            .then(types => {
                let typesArray = [];
                for (let type of types) {
                    let category = type.categoryID.id;
                    if (category === categoryID) {
                        typesArray.push(type);
                    }
                }
                return typesArray;
            }).then(typesArray => {
                for (let type of typesArray) {
                    getItems(categoryID, type.id);
                }
            }).catch(error => (console.log("Fetch crashed due to " + error)));
    }

    //--- Called from getTypes(). Fetches items of a type and creates row-elements in HTML by calling createBudgetItemRow(). --//
    function getItems(categoryID, typeID) {
        fetch(itemsURL)
            .then(response => response.json())
            .then(items => {
                let itemArray = [];
                // skips possible empty items
                for (let item of items) {
                    if (item.typeID !== null) {
                        if (item.typeID.id === typeID) {
                            itemArray.push(item);
                        }
                    }
                    
                }
                return itemArray;
            }).then(items => {
                for (let item of items) {
                    let categoryElem = budgetContainer.querySelector("#categoryid-" + categoryID);
                    let itemsContainer = categoryElem.querySelector(".budget-items-container");

                    let newItem = createBudgetItemRow(categoryID, item.id, item.name, item.typeID.name.name, item.budget);

                    itemsContainer.appendChild(newItem);

                }
                let budgetGroups = budgetContainer.querySelectorAll(".budget-group");
                for (let budgetGroup of budgetGroups) {
                    updateBudget(budgetGroup);
                }
            }).catch(error => (console.log("Fetch crashed due to " + error)));
    }


    function createBudgetGroup(categoryID, name) {
        let budgetGroup = document.createElement("div");
        budgetGroup.className = "budget-group";

        let itemsContainer = document.createElement("div");
        itemsContainer.className = "budget-items-container";

        budgetGroup.appendChild(createHeader(name));
        budgetGroup.appendChild(itemsContainer);
        budgetGroup.appendChild(createBudgetGroupFooter(categoryID));

        return budgetGroup;
    }
    
    function deleteCategoryById(i) {
            budgetContainer.removeChild(budgetContainer.querySelector("#categoryid-" + i));
        }

    function createBudgetGroupFooter(categoryID) {
        let footerRow = document.createElement("div");
        footerRow.className = "budget-group__footer budget-item-row";

        let addButton = document.createElement("button");
        addButton.className = "budget-group__add-button";
        addButton.innerHTML = "<img src='./product_card/img/icon_add.png' alt='Application logo'> Add new item";
        addButton.addEventListener('click', function (event) {
            let target = event.target;
            let budgetGroup = target.parentNode.parentNode;
            let itemsContainer = budgetGroup.querySelector(".budget-items-container");
            
            let data = {
                name: null,
                typeID: null,
                budget: null
            };
            fetch(itemsURL, {
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data), // add variable name here!!
                method: 'post'
            }).then(response => response.json())
            .then(item => {
                let newItem = createBudgetItemRow(categoryID, item.id);
                itemsContainer.appendChild(newItem);
            }).catch(error => (console.log("Fetch crashed due to " + error)));

            
        });

        let textDiv = document.createElement("div");
        textDiv.className = "budget-group__total-text";
        textDiv.textContent = "Total:";

        let budgetGroupTotal = document.createElement("div");
        budgetGroupTotal.className = "budget-group__total-budget";
        footerRow.appendChild(addButton);
        footerRow.appendChild(textDiv);
        footerRow.appendChild(budgetGroupTotal);

        return footerRow;
    }

    function createHeader(name) {
        let budgetGroupHeader = document.createElement("div");
        budgetGroupHeader.className = "budget-group-header";

        let budgetHeaderColumn = document.createElement("div");
        let productTypeHeaderColumn = document.createElement("div");
        let budgetGroupName = document.createElement("div");
        let budgetGroupNameContainer = document.createElement("div");
        budgetGroupNameContainer.className = "budget-group-header__column";
        
        let settingsDiv = document.createElement("div");
        let settingsImg = document.createElement("img");

        budgetHeaderColumn.textContent = "Budget";
        budgetHeaderColumn.className = "budget-group-header__column";

        productTypeHeaderColumn.textContent = "Type";
        productTypeHeaderColumn.className = "budget-group-header__column";

        budgetGroupName.textContent = name;
        budgetGroupName.className = "budget-group-header__tab";
        
        settingsImg.src = "./product_card/img/icon_vertical-ellipsis.png";
        settingsDiv.className = "budget-group__settings";
        
        let settingsList = document.createElement("div");
        settingsList.className = "budget-group-settings__list";
        settingsList.classList.add("hidden");
        let deleteCategory = document.createElement("a"); // this is for deleting just the category, but not the products in this category
        let deleteCategoryAll = document.createElement("a"); // this is for not only deleting the category, but also product cards linked to the items in the budget category
        deleteCategory.textContent = "Remove category";
        deleteCategoryAll.textContent = "Remove category and products";
        deleteCategory.addEventListener("click", function(event) {
            let category = findAncestor(event.target, "budget-group");
            let id = category.id.split("-");
            let URL = categoriesURL + id[1];

            fetch(URL, {
                method: 'delete'
            })
            .then(results => deleteCategoryById(id[1]))
            .catch(error => console.log("Fetch crashed due to " + error));
        });
        
        //--- NOT READY YET --//
        deleteCategoryAll.addEventListener("click", function(event) {
            let category = findAncestor(event.target, "budget-group");
            let id = category.id.split("-");
            let URL = categoriesURL + id[1];
            fetch(URL, {
                method: 'delete'
            })
            .then(results => function () {
                return fetch()
                deleteCategoryById(id[1]);
            })
            .catch(error => console.log("Fetch crashed due to " + error));
        });

        budgetGroupNameContainer.appendChild(budgetGroupName);
        settingsDiv.appendChild(settingsImg);
        settingsList.appendChild(deleteCategory);
        settingsDiv.appendChild(settingsList);
        
        settingsDiv.addEventListener("click", function(event) {
            let div = findAncestor(event.target, "budget-group__settings");
            let list = div.querySelector(".budget-group-settings__list");
            list.classList.toggle("hidden");
        }); 
        
        budgetGroupHeader.appendChild(budgetGroupNameContainer);
        budgetGroupHeader.appendChild(productTypeHeaderColumn);
        budgetGroupHeader.appendChild(budgetHeaderColumn);
        budgetGroupHeader.appendChild(settingsDiv);

        return budgetGroupHeader;
    }

    function createBudgetItemRow(categoryID, itemID, itemName, itemType, itemBudget) {
        let budgetItemRow = document.createElement("div");
        budgetItemRow.setAttribute("id", itemID);
        budgetItemRow.className = "budget-item-row";
        budgetItemRow.addEventListener("mouseover", function (event) {
            let row = findAncestor(event.target, "budget-item-row");
            let deleteDiv = row.querySelector(".delete-div");
            deleteDiv.classList.toggle("img-delete__show");
        });
        budgetItemRow.addEventListener("mouseout", function (event) {
            let row = findAncestor(event.target, "budget-item-row");
            let deleteDiv = row.querySelector(".delete-div");
            deleteDiv.classList.toggle("img-delete__show");
        });

        let name = document.createElement("input");
        name.name = "name";
        name.setAttribute("type", "text");
        name.className = "budget-item__name";
        handleNull(name, itemName, "s");
        name.addEventListener("change", function (event) {
            changeEventListener(event);
        });

        let nameDiv = document.createElement("div");
        nameDiv.className = "budget-item-row__column";
        nameDiv.appendChild(name);


        let budget = document.createElement("input");
        budget.name = "budget";
        budget.setAttribute("type", "number");
        budget.className = "budget-item__budget";
        handleNull(budget, itemBudget, "n");
        budget.addEventListener("change", function (event) {
            changeEventListener(event);
        });

        let budgetDiv = document.createElement("div");
        budgetDiv.className = "budget-item-row__column";
        budgetDiv.appendChild(budget);


        let typeInput = document.createElement("input");
        typeInput.className = "type-input";
        typeInput.setAttribute("type", "text");
        typeInput.setAttribute("name", "type");
        typeInput.setAttribute("list", "type-datalist");
        typeInput.addEventListener("change", function (event) {
            changeEventListener(event);
        });

        typeInput.addEventListener("click", function (event) {
            if (lastActiveElement !== event.target) {
                event.target.value = "";
            }
        });

        let typeDatalist = document.createElement("datalist");

        typeDatalist.id = "type-datalist";
        typeDatalist.setAttribute("type", "text");
        typeDatalist.className = "budget-item__type";

        fetch(typesURL + "categoryid/" + categoryID)
            .then(response => response.json())
            .then(types => {
                let typesArray = [];
                typesArray.push("choose a type");
                for (let type of types) {
                    let t = {
                      id: type.id,
                      name: type.name.name  
                    };
                    typesArray.push(t);
                }
                return typesArray;
            }).then(types => {
                if (itemType != null) {
                    typeInput.setAttribute("value", itemType);
                } else {
                   alert("Choose a type for the new item!");
                }
                
                for (let t of types) {
                    let option = document.createElement("option");
                    option.text = t.name;
                    option.id = "typeid-" + t.id;
                    typeDatalist.appendChild(option);
                }
            }).catch(error => (console.log("Fetch crashed due to " + error)));

        let typeDiv = document.createElement("div");
        typeDiv.className = "budget-item-row__column";

        // typeDiv.appendChild(typeDatalist);
        typeInput.appendChild(typeDatalist);
        typeDiv.appendChild(typeInput);

        let imgDiv = document.createElement("div");
        imgDiv.className = "delete-div";

        let deleteImg = document.createElement("img");
        deleteImg.className = "img-delete";
        deleteImg.src = "./product_card/img/icon_delete.png";
        imgDiv.addEventListener("click", function (event) {
            let row = findAncestor(event.target, "budget-item-row");
            let container = row.parentNode;
            let confirmed = confirm("Are you sure you want to remove this item from the budget?");
            if (confirmed) {
                row.querySelector(".budget-item__budget").value = 0;
                updateBudget(findAncestor(row, "budget-group"));
                container.removeChild(row);
            }
        });

        imgDiv.appendChild(deleteImg);

        budgetItemRow.appendChild(nameDiv);
        budgetItemRow.appendChild(typeDiv);
        budgetItemRow.appendChild(budgetDiv);
        budgetItemRow.appendChild(imgDiv);

        return budgetItemRow;

    }


    function updateBudget(budgetGroup) {
        let totalBudget = 0;
        let itemBudgets = budgetGroup.querySelectorAll(".budget-item__budget");

        // loop that goes through all the items in the item group
        // and adds the amounts to totalBudget
        for (let itemBudget of itemBudgets) {
            totalBudget += parseFloat(itemBudget.value);
        }

        let totalBudgetCell = budgetGroup.querySelector(".budget-group__total-budget");
        totalBudgetCell.textContent = totalBudget.toString();

    }

    function changeEventListener(event) {
        let cell = event.target.parentNode;
        let budgetGroup = findAncestor(cell, "budget-group");

        let itemID = cell.parentNode.id;
        let changedProperty = event.target.name;
        let newValue = event.target.value;
        console.log("ID: " + itemID + ", new value of " + changedProperty + ": " + newValue);


        let update;
        fetch(itemsURL + itemID)
            .then(response => response.json())
            .then(item => {
                update = item;
                console.log(update);
                switch (changedProperty) {
                    case "name":
                        update.name = newValue;
                        fetch(itemsURL + itemID, {
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(update),
                            method: 'put'
                        }).catch(error => (console.log("Fetch crashed due to " + error)));
                        break;
                    case "type":
                        let types = event.target.querySelectorAll("option");
                        for (let type of types) {
                            if (type.value === newValue) {
                                let id = type.id.split("-");
                                update.typeID = parseInt(id[1]);
                                console.log(update);
                            }
                        }                        
                        fetch(itemsURL + itemID, {
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(update),
                            method: 'put'
                        }).catch(error => (console.log("Fetch crashed due to " + error)));
                        break;
                    case "budget":
                        updateBudget(budgetGroup);
                        update.budget = parseFloat(newValue);
                        break;
                }
            }).catch(error => (console.log("Fetch crashed due to " + error)));



    }

    function handleNull(elem, value, type) {
        if (value == null && type === "s") {
            elem.value = "";
        } else if (value == null && type === "n") {
            elem.value = 0;
        } else if (value != null) {
            elem.value = value;
        }
    }

    function findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

});