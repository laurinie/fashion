document.addEventListener("DOMContentLoaded", function (event) {


    /*-----This opens and scrolls to productcard------*/
    let addProductBtn = document.querySelector("#add-button");
    let productCard = document.querySelector("#add-product");
    addProductBtn.addEventListener('click', openCard);


    function openCard() {
        if (productCard.classList.contains("display-none")) {
            productCard.classList.remove("display-none");
        }
        scrollSmooth("#add-product")
    }


    /*-----Close button for productcard------*/
    const closeBtn = document.querySelector("#close-card");
    const c = document.querySelector("#add-product");
    closeBtn.addEventListener('click', closeCard);

    function closeCard() {
        if (!c.classList.contains("display-none")) {
            c.classList.add("display-none");
            const cardForm = document.querySelectorAll(".card-form");
            for(let form of cardForm){
                form.reset();
            }
        }
        scrollSmooth("#main-product");
    }

    /*-----Save productcard------*/
    const saveBtn = document.querySelector("#save-card");
    const div = document.querySelector("#cards-container");
    const p = document.querySelector("#p");

    saveBtn.addEventListener('click', function () {
        /*ehkä hyödyllistä kun pikkukortteja tehdessä*/
        const ul = document.createElement("UL");
        const li = document.createElement("LI");
        const edit = document.createElement("button");
        edit.appendChild(document.createTextNode("Edit"));
        edit.classList.add("edit");
        edit.classList.add("btn");
        let content = document.createTextNode("jihuu");
        li.appendChild(content);
        li.appendChild(edit);
        ul.appendChild(li);
        div.appendChild(ul);
        let editBtn = document.querySelector(".edit");
        editBtn.addEventListener('click', openCard);
        
        closeCard();
    });

    /*-----Save productcard------
    const editBtn = document.querySelector("#edit-card");
    editBtn.addEventListener('click', openCard);
*/

    /*-----Function for scrolling. Takes div id as parameter------*/
    function scrollSmooth(hash) {

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 500, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
        $(window).scroll(function () {
            $(".slideanim").each(function () {
                let pos = $(this).offset().top;

                let winTop = $(window).scrollTop();
                if (pos < winTop + 600) {
                    $(this).addClass("slide");
                }
            });

        });
    }


});