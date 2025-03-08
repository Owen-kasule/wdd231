// date.js
document.addEventListener('DOMContentLoaded', () => {
    // Current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Last modified date
    document.getElementById('lastModified').textContent = 
        `Last Update: ${document.lastModified}`;
});
