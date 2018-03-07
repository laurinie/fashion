document.addEventListener('DOMContentLoaded', function(event) {
    let navElements = document.querySelectorAll("nav li");

    /* this loop adds listeners for clicks of the navigation elements to change the
     * visibility of the sections of the main element. */

    for (let navElement of navElements) {
        hideElements(".content");
        navElement.addEventListener('click', function(event) {
            hideElements(".content");
            event.preventDefault();
            let e = event.target.parentNode;
            let target = e.getAttribute('data-target-section');
            let targetElement = document.querySelector(target);
            targetElement.classList.remove("hidden");
        });
    }
    function hideElements(selector) {
        let elements = document.querySelectorAll(selector);
        for (let element of elements) {
            element.classList.add("hidden");
        }
    }
    function dropMenu(x) {
        const menu = document.querySelector("#menu");
        const menuBtn = document.querySelector("#menu-button");
        const nav = document.querySelector("#nav");
        

        if (x.matches) { // If media query matches
            menuBtn.classList.remove("hidden");
            menu.classList.add("dropdown");
            nav.classList.add("dropdown");
            menu.classList.add("dropdown-content")
        } else {
            menuBtn.classList.add("hidden");
            menu.classList.remove("dropdown");
            menu.classList.remove("dropdown-content");
            nav.classList.remove("dropdown");
        }
    }
    
    var x = window.matchMedia("(max-width: 500px)")
    dropMenu(x) // Call listener function at run time
    x.addListener(dropMenu) // Attach listener function on state changes


});