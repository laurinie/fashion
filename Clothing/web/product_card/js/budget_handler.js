document.addEventListener("DOMContentLoaded", function (event) {

    // just to test, later will be removed when JSON connection is working
    let categoriesArray = ["Shirts", "Pants", "Jackets", "Dresses"];

    let budgetPageElement = document.querySelector("#budget");
    let budgetContainer = document.createElement("div");
    budgetContainer.className = "budget-container";

    let array = [{
        name : 'Summer is here',
        type : 'shorts',
        budget: '0,00',
        category : 'Pants'
    }, {
        name : 'Crop tops ugh',
        type : 'top',
        budget: '0,00',
        category : 'Shirts'
    }, {
        name : 'Mr. back pockets',
        type : 'jeans',
        budget: '0,00',
        category : 'Pants'
    },
        {
            name : 'Miss wet t-shirt',
            type : 't-shirt',
            budget: '0,00',
            category : 'Shirts'
        }, {
            name : 'Fashionable fluffy jacket',
            type : 'winter',
            budget: '0,00',
            category : 'Jackets'
        },{
            name : 'Cool suit jacket',
            type : 'suit',
            budget: '0,00',
            category : 'Jackets'
        }];

    budgetPageElement.appendChild(budgetContainer);

    getData(); // temporary function, until JSON connection works.

    /* Temporary function to fill in some information, just to check things work fine. */
    function getData() {
        getCategories();
        getItems();
    }

    function getCategories() {
        for (let category of categoriesArray) {
            let newBudgetGroup = createBudgetGroup(category);
            newBudgetGroup.classList.add("category-" + category.toLowerCase());
            budgetContainer.appendChild(newBudgetGroup);
        }
    }

    function getItems () {
        for (let product of array) {
            let category = document.querySelector(".category-"
                + product.category.toLowerCase());
            let itemsContainer = category.querySelector(".budget-items-container");

            let newProduct = createBudgetItemRow();

            let productName = newProduct.querySelector("[name='name']");
            productName.value = product.name;
            let productBudget = newProduct.querySelector("[name='budget']");
            productBudget.value = product.budget;
            let productType = newProduct.querySelector("[name='type']");
            productType.value = product.type;

            itemsContainer.appendChild(newProduct);

        }
    }

    function createBudgetGroup(name) {
        let budgetGroup = document.createElement("div");
        budgetGroup.className = "budget-group";

        let itemsContainer = document.createElement("div");
        itemsContainer.className = "budget-items-container";

        budgetGroup.appendChild(createHeader(name));
        budgetGroup.appendChild(itemsContainer);

        return budgetGroup;
    }

    function createHeader(name) {
        let budgetGroupHeader = document.createElement("div");
        budgetGroupHeader.className = "budget-group-header";

        let budgetHeader = document.createElement("div");
        let productTypeHeader = document.createElement("div");
        let budgetGroupName = document.createElement("div");

        budgetHeader.textContent = "Budget";
        budgetHeader.className = "budget-group-header__column";

        productTypeHeader.textContent = "Type";
        productTypeHeader.className = "budget-group-header__column";

        budgetGroupName.textContent = name;
        budgetGroupName.className = "budget-group-header__tab budget-group-header__column";

        budgetGroupHeader.appendChild(budgetGroupName);
        budgetGroupHeader.appendChild(productTypeHeader);
        budgetGroupHeader.appendChild(budgetHeader);

        return budgetGroupHeader;
    }

    function createBudgetItemRow() {
        let budgetItemRow = document.createElement("div");
        budgetItemRow.className ="budget-item-row";


        let name = document.createElement("input");
        name.name = "name";
        name.className = "budget-item__name";

        let nameDiv = document.createElement("div");
        nameDiv.className = "budget-item-row__column";
        nameDiv.appendChild(name);


        let budget = document.createElement("input");
        budget.name = "budget";
        budget.className = "budget-item__budget";

        let budgetDiv = document.createElement("div");
        budgetDiv.className = "budget-item-row__column";
        budgetDiv.appendChild(budget);

        let type = document.createElement("input");
        type.name = "type";
        type.className = "budget-item__type";

        let typeDiv = document.createElement("div");
        typeDiv.className = "budget-item-row__column";
        typeDiv.appendChild(type);

        budgetItemRow.appendChild(nameDiv);
        budgetItemRow.appendChild(typeDiv);
        budgetItemRow.appendChild(budgetDiv);


        return budgetItemRow;

    }

});