document.addEventListener("DOMContentLoaded", function (event) { 
    
let collectionPageElement = document.querySelector("#collection");
let collectionGridContainer = collectionPageElement.querySelector(".collection-grid-container");
let addRow = collectionPageElement.querySelector("#collection-add-row");
let addColumn = collectionPageElement.querySelector("#collection-add-column");

addRow.addEventListener('click', function(event) {
    let columnsArray = collectionGridContainer.querySelectorAll(".collection-grid__column");  
    rows++;
    for (let column of columnsArray) {
        newItem(column);
    }
    
});


addColumn.addEventListener('click', function(event) {
    columns++;
    createColumn();
});

let columns = 0;
let rows = 1; 
//let x = document.querySelector("collection-grid-container").childNodes.length;
//let y = document.querySelector("collection-grid__column").childNodes.length;

createColumn();

function createColumn() {
    let newColumn = document.createElement("div");
    newColumn.className = "collection-grid__column";
    createRows(newColumn);
    collectionGridContainer.appendChild(newColumn);
    
}

function createRows(column) {
    for (i = 0; i < rows; i++) {
        newItem(column);
    }
 
   
}


function newItem(column) {
    let newRow = document.createElement("div");
    let newDrag = document.createElement("div");
    newDrag.id="mydivheader";
    newRow.className = "collection-grid__item";
    
    // to be deleted later
    newDrag.textContent = columns +" Drag " + rows;
    newRow.appendChild(newDrag);
    column.appendChild(newRow);
    
}

});