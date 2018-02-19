document.addEventListener("DOMContentLoaded", function (event) {
   /*
    showCards();

    //--------Show cards--------//
    function showCards() {
        const output = document.querySelector("p");
        output.innerHTML = "Fetching cards...";
        const getAll = "http://localhost:8080/";//muista täyttää
        const processJSON = (function (json) {
            let = itemStr = "";
            for (let item of json) {
                itemStr += `<p>id:${item.id} name: ${item.firstName}  ${item.lastName}</p>`;
            }
            ;
            output.innerHTML = "Users: " + itemStr;
        });
        fetch(getAll)
            .then(response => response.json())    //Returns a promise that resolves JSON object
            .then(processJSON)
            .catch(error => (output.textContent = "Fetch crashed due to " + error));
    }

*/
    //---------Add card-------//
    const addUrl = "http://localhost:8080/";//muista täyttää
    const saveBtn = document.querySelector("#save-card");
    saveBtn.addEventListener("click", function () {
        const name = document.querySelector("#name").value;
        const type = document.querySelector("#type").value;
        const priceRange = document.querySelector("#price-range").value;
        const category = document.querySelector("#category").value;
        let data = {
            name : name,
            type : type,
            priceRange : priceRange,
            category : category
        };
        /*alert(data.name);/*
        return fetch(addUrl, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
            method: 'post'
        })
            .then(showUsers);*/
    });
});