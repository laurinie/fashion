document.addEventListener("DOMContentLoaded", function (event) {
    productsURL = "http://localhost:8080/fashionApp/web/productcard";
    categoriesURL = "http://localhost:8080/fashionApp/web/category";
    collectionsURL = "http://localhost:8080/fashionApp/web/collection";
    typesURL = "http://localhost:8080/fashionApp/web/type";
    
    let budgetPageElement = document.querySelector("#budget");
    let budgetContainer = document.createElement("div");
    budgetContainer.className = "budget-container";
    budgetPageElement.appendChild(budgetContainer);
    
    // workaround code for the typeInput. I know, it's ugly.
    let lastActiveElement = null;
    document.addEventListener("click", function() {
        lastActiveElement = document.activeElement;
    });

    
    fetchCollections();
    getCollectionData(); // temporary function, until JSON connection works.

    function fetchCollections() {
        let selectBudgetElem = document.querySelector(".select-budget__select");
        fetch(collectionsURL)
            .then(response => response.json())
            .then(collections => {

                for (let collection of collections) {
                    let option = document.createElement("option");
                    option.text = collection.name;
                    selectBudgetElem.appendChild(option);
                }
            });    
    }

    /* Temporary function to fill in some information, just to check things work fine. */
    function getCollectionData() {
        getCategories();
    }
    
   
    
    function getCategories() {
        
        fetch(categoriesURL)
            .then(response => response.json())
            .then(data => {
                let categories = [];
                for (let object of data) {
                    categories.push(object.name);
                }
                return categories;
            }).then(categories => {
                for (let category of categories) {
                    // console.log("creating a new category");
                    let newBudgetGroup = createBudgetGroup(category);
                    newBudgetGroup.id = category.toLowerCase();
                    budgetContainer.appendChild(newBudgetGroup);
                }
                getItems();
        });
        // catch errors    
    }
    



    function getItems () {
        fetch(productsURL)
            .then(response => response.json())
            .then(productcards => {
               
                for (let product of productcards) {
                        // console.log("fetching an item");
                        let category = budgetContainer.querySelector("#" + product.category.name.toLowerCase());
                        let itemsContainer = category.querySelector(".budget-items-container");
                        
                        let newProduct = createBudgetItemRow(product.type.name, product.id);

                        let productName = newProduct.querySelector("[name='name']");
                        productName.value = product.name;
                        let productBudget = newProduct.querySelector("[name='budget']");
                        productBudget.value = "0"; // later changed
                        let productType = newProduct.querySelector("[name='type']");
                        productType.value = product.type.name;

                        itemsContainer.appendChild(newProduct);
                        
                }
                let budgetGroups = budgetContainer.querySelectorAll(".budget-group");
                for (let budgetGroup of budgetGroups) {
                    updateTotalBudget(budgetGroup);
                }
                             
        }); 
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
        addButton.innerHTML = "<img src='./product_card/img/add.png' alt='Application logo'> Add new item";
        addButton.addEventListener('click', function(event) {
            let target = event.target;
            let budgetGroup = target.parentNode.parentNode;
            let itemsContainer = budgetGroup.querySelector(".budget-items-container");
            let newItem = createBudgetItemRow("");
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

    function createBudgetItemRow(type, id) {
        // console.log("creating a new budget item row");
        let budgetItemRow = document.createElement("div");
        budgetItemRow.setAttribute("id", id);
        budgetItemRow.className ="budget-item-row";


        let name = document.createElement("input");
        name.name = "name";
        name.setAttribute("type", "text");
        name.className = "budget-item__name";
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
        
        fetch(typesURL)
            .then(response => response.json())
            .then(types => {
                let typesArray = [];
                for (let type of types) {
                    typesArray.push(type.name);
                }
                return typesArray;
            }).then (types => {
                typeInput.setAttribute("value", type);
                for (let t of types) {
                    let option = document.createElement("option");
                    option.text = t;
                    typeDatalist.appendChild(option);
                }
            });

        let typeDiv = document.createElement("div");
        typeDiv.className = "budget-item-row__column";
        
        // typeDiv.appendChild(typeDatalist);
        typeInput.appendChild(typeDatalist);
        typeDiv.appendChild(typeInput);
        

        budgetItemRow.appendChild(nameDiv);
        budgetItemRow.appendChild(typeDiv);
        budgetItemRow.appendChild(budgetDiv);


        return budgetItemRow;

    }

    //add EventListener to all budget cells
    //take into account that the budget group needs to update the budget also when a row is deleted!
    function updateTotalBudget(budgetGroup) {
        let totalBudget = 0;
        let itemBudgets = budgetGroup.querySelectorAll(".budget-item__budget");

        // console.log("updating category budget");

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
        let itemID = cell.parentNode.id;
        let changedValueName = event.target.name;
        console.log("ID: " + itemID + ", new value of " + changedValueName +  ": " + event.target.value);
       
        /*
        fetch(productsURL, {
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data),
                method: 'post'
            }); */
        // get event changed
        //fetch PUT
    }
    

});