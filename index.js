// !--------------------------------------------MENU BURGER---------------------------------------------------
// Select the '.menuBurger' element from the DOM.
let menuBurger = document.querySelector('.menu-burger'),
// Select the '.basculant' element from the DOM.
basculant =  document.querySelector('.basculant')

// Add a 'click' event listener to the '.basculant' element.
basculant.addEventListener('click', function () {
// Toggle the 'active' class on the '.menuBurger' element.
menuBurger.classList.toggle('active')
});