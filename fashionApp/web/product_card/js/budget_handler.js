

document.addEventListener("DOMContentLoaded", function (event) {
    
    const URLbase = "http://localhost:8080/fashionApp/";
    const productsURL = URLbase + "web/productcard/";
    const categoriesURL = URLbase + "web/category/";
    const collectionsURL = URLbase + "web/collections/";
    const typesURL = URLbase + "web/type/";
    const typenameURL = URLbase + "web/typename/";
    const itemsURL = URLbase + "web/item/";
    
    const budgetPageElement = document.querySelector("#budget");
    const budgetContainer = document.createElement("div");
    budgetContainer.className = "budget-container";
    budgetPageElement.appendChild(budgetContainer);
    
    // workaround code for the typeInput. I know, it's ugly.
    let lastActiveElement = null;
    document.addEventListener("click", function() {
        lastActiveElement = document.activeElement;
    });

    fetchCollections();

    function fetchCollections() {
        const selectBudgetElem = document.querySelector(".select-budget__select");
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
            let collectionID = idString[1];
            var myNode = budgetContainer;
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            console.log("Selected collection " + collectionID + ": " + selectedOption.value)
            getCategories(collectionID);
        });
    }

    
    function getCategories(selectedCollection) {
        fetch(categoriesURL + "collectionid/" + selectedCollection)
            .then(response => response.json())
            /*.then(data => {
                let categories = [];
                for (let object of data) {
                    let collection = object.collectionID.id;   
                    if(collection === parseInt(selectedCollection)) {
                        categories.push(object);
                    }
                }
                

                return categories;
            })*/.then(categories => {
                for (let category of categories) {
                    let newBudgetGroup = createBudgetGroup(category.name.name);
                    newBudgetGroup.setAttribute("id", "categoryid-" + category.id);
                    budgetContainer.appendChild(newBudgetGroup);
                    getTypes(category.id);
                }
                
        }).catch(error => (console.log("Fetch crashed due to " + error)));
        // catch errors    
    }
    
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


    function getItems (categoryID, typeID) {
        fetch(itemsURL)
            .then(response => response.json())
            .then(items => {
                let itemArray = [];
                for (let item of items) {
                    if (item.typeID.id === typeID) {
                        itemArray.push(item);
                    }
                }
                return itemArray;
            }).then(items => {
                for (let item of items) {
                        let categoryElem = budgetContainer.querySelector("#categoryid-" + categoryID);
                        let itemsContainer = categoryElem.querySelector(".budget-items-container");
                        
                        let newItem = createBudgetItemRow(item.id, item.name, item.typeID.name.name, item.budget);

                        itemsContainer.appendChild(newItem);
                        
                }
                let budgetGroups = budgetContainer.querySelectorAll(".budget-group");
                for (let budgetGroup of budgetGroups) {
                    updateBudget(budgetGroup);
                }                   
        }).catch(error => (console.log("Fetch crashed due to " + error))); 
    }


    function createBudgetGroup(name) {
        // console.log("creating a budget group");
        let budgetGroup = document.createElement("div");
        budgetGroup.className = "budget-group";

        let itemsContainer = document.createElement("div");
        itemsContainer.className = "budget-items-container";

        budgetGroup.appendChild(createHeader(name));
        budgetGroup.appendChild(itemsContainer);
        budgetGroup.appendChild(createBudgetGroupFooter());

        return budgetGroup;
    }

    function createBudgetGroupFooter() {
        // console.log("creating a budget footer");
        let footerRow = document.createElement("div");
        footerRow.className = "budget-group__footer budget-item-row";

        let addButton = document.createElement("button");
        addButton.className = "budget-group__add-button";
        addButton.innerHTML = "<img src='./product_card/img/icon_add.png' alt='Application logo'> Add new item";
        addButton.addEventListener('click', function(event) {
            let target = event.target;
            let budgetGroup = target.parentNode.parentNode;
            let itemsContainer = budgetGroup.querySelector(".budget-items-container");
            let newItem = createBudgetItemRow("", null);
            
            /*fetch(addUrl, {
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(), // add variable name here!!
                method: 'post'
            });*/
            
            itemsContainer.appendChild(newItem);
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
        // console.log("creating a budget header");
        let budgetGroupHeader = document.createElement("div");
        budgetGroupHeader.className = "budget-group-header";


        let budgetHeaderColumn = document.createElement("div");
        let productTypeHeaderColumn = document.createElement("div");

        let budgetGroupName = document.createElement("div");
        let budgetGroupNameContainer = document.createElement("div");
        budgetGroupNameContainer.className = "budget-group-header__column";


        budgetHeaderColumn.textContent = "Budget";
        budgetHeaderColumn.className = "budget-group-header__column";

        productTypeHeaderColumn.textContent = "Type";
        productTypeHeaderColumn.className = "budget-group-header__column";

        budgetGroupName.textContent = name;
        budgetGroupName.className = "budget-group-header__tab";

        budgetGroupNameContainer.appendChild(budgetGroupName);
        budgetGroupHeader.appendChild(budgetGroupNameContainer);
        budgetGroupHeader.appendChild(productTypeHeaderColumn);
        budgetGroupHeader.appendChild(budgetHeaderColumn);

        return budgetGroupHeader;
    }

    function createBudgetItemRow(itemID, itemName, itemType, itemBudget) {
        // console.log("creating a new budget item row");
        let budgetItemRow = document.createElement("div");
        budgetItemRow.setAttribute("id", itemID);
        budgetItemRow.className ="budget-item-row";
        budgetItemRow.addEventListener("mouseover", function(event) {
            let row = findAncestor(event.target, "budget-item-row");
            let deleteDiv = row.querySelector(".delete-div");
            deleteDiv.classList.toggle("img-delete__show");
        });
        budgetItemRow.addEventListener("mouseout", function(event) {
            let row = findAncestor(event.target, "budget-item-row");
            let deleteDiv = row.querySelector(".delete-div");
            deleteDiv.classList.toggle("img-delete__show");
        });

        let name = document.createElement("input");
        name.name = "name";
        name.setAttribute("type", "text");
        name.className = "budget-item__name";
        handleNull(name, itemName, "s");
        name.addEventListener("change", function(event) {
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
        budget.addEventListener("change", function(event) {
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
        typeInput.addEventListener("change", function(event) {
            changeEventListener(event);
        });
           
        typeInput.addEventListener("click", function(event) {
            if(lastActiveElement !== event.target) {
                event.target.value = "";
            }
         });
        
        let typeDatalist = document.createElement("datalist");
        
        typeDatalist.id = "type-datalist";
        typeDatalist.setAttribute("type", "text");
        typeDatalist.className = "budget-item__type";
        
        fetch(typenameURL)
            .then(response => response.json())
            .then(types => {
                let typesArray = [];
                for (let type of types) {
                    typesArray.push(type.name);
                }
                return typesArray;
            }).then (types => {
                typeInput.setAttribute("value", itemType);
                for (let t of types) {
                    let option = document.createElement("option");
                    option.text = t;
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
        imgDiv.addEventListener("click", function(event) {
            console.log(event.target);
            let row = findAncestor(event.target, "budget-item-row");
            let container = row.parentNode;
            let confirmed = confirm("Are you sure you want to remove this item from the budget?");
            if(confirmed) {
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
        let newValue  = event.target.value;
        console.log("ID: " + itemID + ", new value of " + changedProperty +  ": " + newValue);

        // quick and dirty code to get around the current database problem
        let row = findAncestor(cell, "budget-item-row");
        let data = {
            id: itemID,
            name: row.querySelector(".budget-item__name").value,
            type: 1,
            budget: row.querySelector(".budget-item__budget").value
        };
        

        let update;
        fetch(itemsURL + itemID)
                .then(response => response.json())
                .then(item => {  
                    update = item;
                    switch (changedProperty) {
                        case "name":
                            update.name = newValue;
                            console.log(update);
                            fetch(itemsURL + itemID, {
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify(update),
                                method: 'put'
                            }).catch(error => (console.log("Fetch crashed due to " + error))); 
                            break;
                        case "type":
                            // figure out a way to change the type?
                            
                            fetch(itemURL + itemID, {
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify(update),
                                method: 'put'
                            }).catch(error => (console.log("Fetch crashed due to " + error))); 
                            break;
                        case "budget":
                            updateBudget(budgetGroup);
                            console.log(update);
                            update.budget = parseFloat(newValue);
                            break;
        }
        }).catch(error => (console.log("Fetch crashed due to " + error))); 
        
        
        
    }
    
    function handleNull(elem, value, type) {
        console.log(value, type);
        if (value === null && type === "s") {
            elem.value = "";
        } else if (value === null && type === "n") {
            elem.value = 2;
        } else if (value !== null) {
            elem.value = value;
        }
    }
    
    function findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

});