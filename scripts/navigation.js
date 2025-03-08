const menuBtn = document.getElementById('menu-btn');
const navBar = document.getElementById('nav-bar');

menuBtn.addEventListener('click', () => {
    navBar.classList.toggle('open');
});
