
// navigation.js
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Ensure no horizontal scrollbars by adjusting body width
    document.body.style.overflowX = "hidden";
});
