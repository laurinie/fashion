document.addEventListener("DOMContentLoaded", function (event) {


/*-----This opens and scrolls to productcard------*/
    let addProductBtn = document.querySelector("#add-button");
    let productCard = document.querySelector("#add-product");
    addProductBtn.addEventListener('click', function () {

        if (productCard.classList.contains("display-none")) {
            productCard.classList.remove("display-none");
        }
        scrollSmooth("#add-product")
    });


/*-----Close button for productcard------*/
    let closeBtn = document.querySelector("#close-card");
    let c = document.querySelector("#add-product");
    closeBtn.addEventListener('click', function () {
        if (!c.classList.contains("display-none")) {
            c.classList.add("display-none");
        }
        scrollSmooth("#budget-tree");
    });

/*-----Function for scrolling. Takes div id as parameter------*/
    function scrollSmooth(hash){
        
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