'use strict';

let mainNav = document.getElementById('js-navigation');

let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function(){
    mainNav.classList.toggle('active');
})

