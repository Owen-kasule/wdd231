document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector('.grid-container');

    // Fetch attractions data
    fetch('data/attractions.json')
        .then(response => response.json())
        .then(data => {
            data.attractions.forEach(attraction => {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.innerHTML = `
                    <figure>
                        <img src="${attraction.image}" alt="${attraction.name}">
                        <figcaption>
                            <h2>${attraction.name}</h2>
                            <address>${attraction.address}</address>
                            <p>${attraction.description}</p>
                            <button>Learn More</button>
                        </figcaption>
                    </figure>
                `;
                gridContainer.appendChild(gridItem);
            });
        });

    // Handle last visit message
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = Date.now();

    if (!lastVisit) {
        localStorage.setItem('lastVisit', currentTime);
        alert('Welcome! Let us know if you have any questions.');
    } else {
        const diffTime = Math.floor((currentTime - lastVisit) / (1000 * 60 * 60 * 24));
        if (diffTime < 1) {
            alert('Back so soon! Awesome!');
        } else {
            alert(`You last visited ${diffTime} day${diffTime === 1 ? '' : 's'} ago.`);
        }
        localStorage.setItem('lastVisit', currentTime);
    }
});