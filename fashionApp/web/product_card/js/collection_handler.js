document.addEventListener("DOMContentLoaded", function (event) { 
    
let collectionPageElement = document.querySelector("#collection");
let collectionGridContainer = collectionPageElement.querySelector(".collection-grid-container");
let addRow = collectionPageElement.querySelector("#collection-add-row");
let addColumn = collectionPageElement.querySelector("#collection-add-column");

addRow.addEventListener('click', function(event) {
    let columnsArray = collectionGridContainer.querySelectorAll(".collection-grid__column");  
    rows++;
    for (let column of columnsArray) {
        newRow(column);
    }
    
});


addColumn.addEventListener('click', function(event) {
    columns++;
    createColumn();
});

let columns = 0;
let rows = 1; 

createColumn();

function createColumn() {
    let newColumn = document.createElement("div");
    newColumn.className = "collection-grid__column";
    createRows(newColumn);
    collectionGridContainer.appendChild(newColumn);
    
}

function createRows(column) {
    for (i = 0; i < rows; i++) {
        let newRow = document.createElement("div");
        newRow.className = "collection-grid__row";
        
        //to be deleted
        newRow.textContent = "card";
        
        column.appendChild(newRow);
    }
 
   
}


function newRow(column) {
    let newRow = document.createElement("div");
    newRow.className = "collection-grid__row";
    
    // to be deleted later
    newRow.textContent = "card " + rows;
    
    column.appendChild(newRow);
}

    

});