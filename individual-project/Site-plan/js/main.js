import { fetchData } from './modules/data.js?v=1.0.0';
import { openModal, closeModal } from './modules/modal.js?v=1.0.0';

document.addEventListener('DOMContentLoaded', () => {
    // Set scrollbar width as a CSS variable to prevent layout shifts
    document.documentElement.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.clientWidth}px`);

    // Initialize all functionality
    handleFontLoading();
    initLazyLoading();
    setupWireframeViewer();
    updateFooterInfo();

    fetchData().then(data => {
        console.log('Data loaded successfully');
    }).catch(error => {
        console.error('Error fetching data:', error);
    });

    setupModalHandlers();
});

function handleFontLoading() {
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('1em Montserrat'),
            document.fonts.load('bold 1em Montserrat'),
            document.fonts.load('1em Roboto'),
            document.fonts.load('bold 1em Roboto')
        ]).then(() => {
            console.log('All fonts loaded');
            document.body.classList.remove('fonts-loading');
            document.body.classList.add('fonts-loaded');
        }).catch(error => {
            console.error('Font loading failed:', error);
        });
    } else {
        setTimeout(() => {
            document.body.classList.remove('fonts-loading');
            document.body.classList.add('fonts-loaded');
        }, 100);
    }
}

// Updated lazy loading function
function initLazyLoading() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);

                    // Force layout to prevent CLS
                    lazyImage.offsetHeight;
                }
            });
        }, {
            rootMargin: "50px 0px",
            threshold: 0.01
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);

            // Set temporary background color for lazy images
            lazyImage.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-dark-gray');
        });
    }
}

function setupWireframeViewer() {
    const viewButton = document.getElementById('viewWireframes');
    const closeButton = document.getElementById('closeWireframe');
    const fullWireframe = document.getElementById('fullWireframe');

    if (viewButton && closeButton && fullWireframe) {
        viewButton.addEventListener('click', () => {
            fullWireframe.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeButton.addEventListener('click', () => {
            fullWireframe.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && fullWireframe.classList.contains('active')) {
                fullWireframe.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

function setupModalHandlers() {
    const modalOpenButton = document.getElementById('modalOpenButton');
    if (modalOpenButton) {
        modalOpenButton.addEventListener('click', () => {
            openModal();
        });
    }

    const modalCloseButton = document.getElementById('modalCloseButton');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            closeModal();
        });
    }
}
// Simple foolproof date display
function updateFooterDates() {
    // Current Year (always works)
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Last Modified Date (with multiple fallbacks)
    const dateElement = document.getElementById('last-modified-date');
    if (dateElement) {
        const lastModDate = new Date(document.lastModified || Date.now());
        dateElement.textContent = 
            `${(lastModDate.getMonth()+1).toString().padStart(2, '0')}/` +
            `${lastModDate.getDate().toString().padStart(2, '0')}/` +
            `${lastModDate.getFullYear()} ` +
            `${lastModDate.getHours().toString().padStart(2, '0')}:` +
            `${lastModDate.getMinutes().toString().padStart(2, '0')}`;
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', updateFooterDates);
window.addEventListener('load', updateFooterDates); // Fallback