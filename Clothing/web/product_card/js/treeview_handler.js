/**
 * Created by Emily on 05-Feb-18.
 */

document.addEventListener("DOMContentLoaded", function (event) {


    let categoriesArray = ["Shirts", "Pants", "Jackets", "Dresses"];
    let shirtsTypeArray = ["T-Shirts", "Tops", "Long-sleeved"];
    let priceRanges = ["Affordable", "Middle-price", "Expensive"];

    let budgetTree = document.querySelector("#budget");

    // loops through all predefined category names, creates categories with those names.
    for (let categoryName of categoriesArray) {
        let categoryContainer = createNewCategory(categoryName);
        budgetTree.appendChild(categoryContainer);

        if (categoryName === "Shirts") {
            for (let itemTypeName of shirtsTypeArray) {
                let itemTypeContainer = createNewItemType(itemTypeName);
                categoryContainer.insertBefore(itemTypeContainer, categoryContainer.querySelector(".bottom"));
            }
        }
    }



    /*let newCategoryBtn = document.createElement("button");
    newCategoryBtn.textContent = "Add new category";
    newCategoryBtn.addEventListener("click", createNewCategory);

    budgetTree.appendChild(newCategoryBtn);*/


    function createNewCategory(name) {
        // creating the container to hold everything withing a category
        let categoryContainer = document.createElement("div");
        categoryContainer.className = "category-container";

        let category = document.createElement("div");
        category.className = "category " + name + "-category";
        category.textContent = name;

        let newItemTypeDiv = document.createElement("div");
        newItemTypeDiv.className = "bottom";

        categoryContainer.appendChild(category);
        newItemTypeDiv.appendChild(createForm(categoryContainer, "text",
            "Type the item type here...", "btn create-btn new-item",
            "Create new item type", createNewItemType));
        categoryContainer.appendChild(newItemTypeDiv);


        return categoryContainer;
    }

    function createForm(container,type, placeholder, btnClass, btnText, createMethod) {
        let form = document.createElement("form");
        /*form.setAttribute("action", "");*/
        /*form.setAttribute("method", "post");*/
        function handleForm(event) {
            event.preventDefault();
        }

        form.addEventListener('submit', handleForm);

        let input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("placeholder", placeholder);
        input.setAttribute("id", "inputValue");

        let btn = document.createElement("button");
        btn.className = btnClass;

        btn.addEventListener('click', function () {
            /*shirtsTypeArray.push(btn.form.input.value);*/
            container.insertBefore(createMethod(input.value), container.querySelector(".bottom"));
        });
        btn.textContent = btnText;
        btn.setAttribute("type", "submit");

        form.appendChild(input);
        form.appendChild(btn);
        return form;
    }

    function createNewItemType(itemTypeInput) {
        let itemTypeContainer = document.createElement("div");
        itemTypeContainer.className = "item-type-container";

        let itemType = document.createElement("div");
        itemType.className = "item-type";
        itemType.textContent = itemTypeInput;


        itemTypeContainer.appendChild(itemType);

        createNewPriceRange(itemTypeContainer);
        return itemTypeContainer;
    }

    function createNewPriceRange(itemTypeContainer) {

        for (let priceRangeName of priceRanges) {
            let priceRangeContainer = document.createElement("div");
            priceRangeContainer.className = "price-range-container";

            let priceRange = document.createElement("div");
            priceRange.className = "price-range";
            priceRange.textContent = priceRangeName;

            priceRangeContainer.appendChild(priceRange);

            let newItemDiv = document.createElement("div");
            newItemDiv.appendChild(createForm(priceRangeContainer, "text",
                "Type the item name here...", "btn create-btn new-item",
                "Create new item", createNewItem));



            priceRangeContainer.appendChild(priceRange);
            priceRangeContainer.appendChild(newItemDiv);
            itemTypeContainer.appendChild(priceRangeContainer);

        }

    }

    function createNewItem(name) {
        let itemContainer= document.createElement("div");
        itemContainer.className = "item-container";

        let item = document.createElement("div");
        item.className = "item";
        item.textContent = name;

        itemContainer.appendChild(item);

        return itemContainer

    }
});