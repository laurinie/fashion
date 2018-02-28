document.addEventListener("DOMContentLoaded", function (event) { 
    
let collectionPageElement = document.querySelector("#collection");
let collectionGridContainer = collectionPageElement.querySelector(".collection-grid-container");
let addRow = collectionPageElement.querySelector("#collection-add-row");
let addColumn = collectionPageElement.querySelector("#collection-add-column");

addRow.addEventListener('click', function(event) {
    
});


addColumn.addEventListener('click', function(event) {
    createColumn();
});

let columns = 0;
let rows = 1; 

createColumn();

function createColumn() {
    let newColumn = document.createElement("div");
    newColumn.className = "collection-grid__column";
    newColumn.appendChild(createRows());
    collectionGridContainer.appendChild(newColumn);
    columns++;
}

function createRows() {
    let rowsContainer = document.createElement("div");
    rowsContainer.className = "collection_column__rows-container"
    for (i = 0; i < rows; i++) {
        let newRow = document.createElement("div");
        newRow.className = "collection-grid__row";
        rowsContainer.appendChild(newRow);
    }
    return rowsContainer;
}


    

});