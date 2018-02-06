/**
 * Created by Bulle on 05-Feb-18.
 */

document.addEventListener("DOMContentLoaded", function (event) {
    let budgetTree = document.querySelector("#budget-tree");

    let newCategoryBtn = document.createElement("button");
    newCategoryBtn.textContent = "Add new category";
    newCategoryBtn.addEventListener("click", createNewCategory);

    budgetTree.appendChild(newCategoryBtn);

    function createNewCategory() {
        // creating the container to hold everything withing a category
        let categoryContainer = document.createElement("div");
        categoryContainer.className = "category-container";

        let category = document.createElement("div");
        category.className = "category";
        category.textContent = "CATEGORY"; // DELETE AFTER ADDING INPUT FIELDS!!

        let itemTypeContainer = document.createElement("div");
        itemTypeContainer.className = "item-type-container";

        budgetTree.appendChild(categoryContainer);
        categoryContainer.appendChild(category);
        categoryContainer.appendChild(itemTypeContainer);
    }

    // these functions need to get the right containers!!
    function createNewItemType(itemTypeContainer) {
        let itemType= document.createElement("div");
        itemType.className = "item-type";
        itemType.textContent = "ITEM TYPE"; // DELETE AFTER ADDING INPUT FIELDS!!

        let priceRangeContainer= document.createElement("div");
        priceRangeContainer.className = "price-range-container";

        itemTypeContainer.appendChild(itemType);

        createNewPriceRange(priceRangeContainer, "Expensive");
        createNewPriceRange(priceRangeContainer, "Middle-priced");
        createNewPriceRange(priceRangeContainer, "Cheap");
    }

    function createNewPriceRange(priceRangeContainer, priceRangeString) {
        let priceRange = document.createElement("div");
        priceRange.className = "price-range";
        priceRange.textContent = priceRangeString;

        let itemContainer= document.createElement("div");
        itemContainer.className = "item-container";

        priceRangeContainer.appendChild(priceRange);
    }

    function createNewItem(priceRange) {
        let item = document.createElement("div");
        item.className = "item";
        item.textContent = "ITEM"; // DELETE AFTER ADDING INPUT FIELDS!!

    }
});