// Wait for DOM to load before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navBar = document.getElementById('nav-bar');

    menuBtn.addEventListener('click', () => {
        navBar.classList.toggle('open');
    });
});
