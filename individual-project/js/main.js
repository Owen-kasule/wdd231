// This file serves as the entry point for the website's functionality.
// It handles DOM manipulation, event listeners, and integrates the modules for data handling and modal dialogs.

import { fetchData } from './modules/data.js';
import { openModal, closeModal } from './modules/modal.js';

document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the JSON file and display it on the website
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
    
    // Wireframe image expansion functionality
    const expandButton = document.getElementById('expandWireframe');
    const closeButton = document.getElementById('closeWireframe');
    const fullWireframe = document.getElementById('fullWireframe');
    
    if (expandButton && closeButton && fullWireframe) {
        expandButton.addEventListener('click', () => {
            fullWireframe.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
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
});