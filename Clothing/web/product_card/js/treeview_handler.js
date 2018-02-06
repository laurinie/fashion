/**
 * Created by Bulle on 05-Feb-18.
 */

document.addEventListener("DOMContentLoaded", function (event) {
    let budgetTree = document.querySelector("#budget-tree");

    let categoriesArray = ["Shirts", "Pants", "Jackets", "Dresses"];
/*    let priceRangesArray = ["Affordable", "Middle-priced", "Expensive"];
    let itemTypeArray =  ["Summer", "Winter", "Fall", "Spring"]*/

    function createBtn (className) {
        let btn = document.createElement("button");
        btn.className = className;
        return btn;
    }

    // loops through all predefined category names, creates categories with those names.
    for (let categoryName of categoriesArray) {
        let categoryContainer = createNewCategory(categoryName);
        budgetTree.appendChild(categoryContainer);
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
        category.className = "category";
        category.textContent = name;


        let createItemTypeBtn = createBtn("btn create-button new-item");
        createItemTypeBtn.addEventListener('click', function () {
            categoryContainer.appendChild(createNewItemType());
        });
        createItemTypeBtn.textContent = "Create new item type";

        categoryContainer.appendChild(category);
        categoryContainer.appendChild(createItemTypeBtn);

        return categoryContainer;
    }

    function createNewItemType() {
        let itemTypeContainer = document.createElement("div");
        itemTypeContainer.className = "item-type-container";

        let itemType = document.createElement("div");
        itemType.className = "item-type";
        itemType.textContent = "new item type";



        let createPriceRangeBtn = createBtn("btn create-button new-price-range");
        createPriceRangeBtn.addEventListener('click', function () {
            itemTypeContainer.appendChild(createNewPriceRange());
        });
        createPriceRangeBtn.textContent = "Create price ranges";

        itemTypeContainer.appendChild(itemType);
        itemTypeContainer.appendChild(createPriceRangeBtn);

        return itemTypeContainer;
    }

    function createNewPriceRange() {
        let priceRangeContainer = document.createElement("div");
        priceRangeContainer.className = "price-range-container";

        let priceRange = document.createElement("div");
        priceRange.className = "price-range";
        priceRange.textContent = "new price range";

        priceRangeContainer.appendChild(priceRange);

        let createItemBtn = createBtn("btn create-button new-item");
        createItemBtn.addEventListener('click', function () {
                priceRangeContainer.appendChild(createNewItem());
        });
        createItemBtn.textContent = "Create new item";

        priceRangeContainer.appendChild(priceRange);
        priceRangeContainer.appendChild(createItemBtn);

        return priceRangeContainer;
    }

    function createNewItem() {
        let itemContainer= document.createElement("div");
        itemContainer.className = "item-container";

        let item = document.createElement("div");
        item.className = "item";
        item.textContent = "new item"; // DELETE AFTER ADDING INPUT FIELDS!!

        itemContainer.appendChild(item);

        return itemContainer

    }
});