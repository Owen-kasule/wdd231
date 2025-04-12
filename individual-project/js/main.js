// This file serves as the entry point for the website's functionality.
// It handles DOM manipulation, event listeners, and integrates the modules for data handling and modal dialogs.

import { fetchData } from './modules/data.js?v=1.0.0';
import { openModal, closeModal } from './modules/modal.js?v=1.0.0';

// Main initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all major functionality
    handleFontLoading();
    initLazyLoading();
    setupWireframeViewer();
    updateFooterInfo();
    
    // Data fetching
    fetchData().then(data => {
        console.log('Data loaded successfully');
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
    
    // Modal handling
    setupModalHandlers();
    
    // Optional: Monitor unused CSS classes on development
    if (window.location.hostname === 'localhost') {
        setTimeout(logUnusedSelectors, 1000);
    }
});

/**
 * Handle font loading to prevent layout shifts
 */
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
            // Still remove loading class to show content
            document.body.classList.remove('fonts-loading');
        });
    } else {
        // For browsers that don't support Font Loading API
        setTimeout(() => {
            document.body.classList.remove('fonts-loading');
            document.body.classList.add('fonts-loaded');
        }, 100); // Short timeout as font is set to swap
    }
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('lazyloaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.01
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
        });
    }
}

/**
 * Setup wireframe viewer with modal-like behavior
 */
function setupWireframeViewer() {
    const viewButton = document.getElementById('viewWireframes');
    const closeButton = document.getElementById('closeWireframe');
    const fullWireframe = document.getElementById('fullWireframe');
    
    if (viewButton && closeButton && fullWireframe) {
        viewButton.addEventListener('click', () => {
            fullWireframe.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        closeButton.addEventListener('click', () => {
            fullWireframe.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && fullWireframe.classList.contains('active')) {
                fullWireframe.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Setup modal event handlers
 */
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

/**
 * Update footer information dynamically
 */
function updateFooterInfo() {
    const authorNameElement = document.getElementById('author-name');
    const lastModifiedElement = document.getElementById('last-modified');
    
    if (authorNameElement) {
        authorNameElement.textContent = 'Kasule';
    }
    
    if (lastModifiedElement) {
        // Format the last modified date
        const lastModDate = new Date(document.lastModified);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        lastModifiedElement.textContent = lastModDate.toLocaleDateString('en-US', options);
    }
}

/**
 * Log unused CSS selectors for development purposes
 */
function logUnusedSelectors() {
    const usedSelectors = new Set();
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(el => {
        const classes = [...el.classList];
        classes.forEach(c => usedSelectors.add('.' + c));
        usedSelectors.add(el.tagName.toLowerCase());
    });
    
    console.log('Active selectors on page:', usedSelectors);
}

/**
 * Enhance image loading for non-JavaScript users
 * This is executed after the DOM is loaded, but ensures
 * images load properly even if JavaScript is slow or disabled
 */
function enhanceImageFallbacks() {
    document.querySelectorAll('noscript').forEach(ns => {
        if (ns.dataset.imgFallback) {
            const img = document.createElement('img');
            img.src = ns.dataset.imgFallback;
            img.alt = ns.dataset.imgAlt || '';
            img.className = ns.dataset.imgClass || '';
            
            if (ns.dataset.imgWidth) img.width = ns.dataset.imgWidth;
            if (ns.dataset.imgHeight) img.height = ns.dataset.imgHeight;
            
            ns.parentNode.insertBefore(img, ns);
        }
    });
}