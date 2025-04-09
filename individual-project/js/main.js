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
});