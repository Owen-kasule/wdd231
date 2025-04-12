// This file serves as the entry point for the website's functionality.
// It handles DOM manipulation, event listeners, and integrates the modules for data handling and modal dialogs.

import { fetchData } from './modules/data.js?v=1.0.0';
import { openModal, closeModal } from './modules/modal.js?v=1.0.0';

document.addEventListener('DOMContentLoaded', () => {
    // Handle font loading to prevent layout shifts
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

    // Fetch data from the JSON file
    fetchData().then(data => {
        // Process and display the data as needed
        console.log(data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });

    // Event listener for opening the modal
    const modalOpenButton = document.getElementById('modalOpenButton');
    if (modalOpenButton) {
        modalOpenButton.addEventListener('click', () => {
            openModal();
        });
    }

    // Event listener for closing the modal
    const modalCloseButton = document.getElementById('modalCloseButton');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            closeModal();
        });
    }
    
    // Wireframe viewing functionality
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
    
    // Add dynamic footer information
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
});