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


});