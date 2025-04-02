document.addEventListener("DOMContentLoaded", () => {
    // Set timestamp when the form loads
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
    
    // Modal functionality
    const modalButtons = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll(".close-modal");
    
    // Open modal when info button is clicked
    modalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) modal.showModal();
        });
    });
    
    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) modal.close();
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll("dialog").forEach(dialog => {
        dialog.addEventListener("click", (e) => {
            const rect = dialog.getBoundingClientRect();
            if (e.clientY < rect.top || e.clientY > rect.bottom || 
                e.clientX < rect.left || e.clientX > rect.right) {
                dialog.close();
            }
        });
    });
    
    // Store form data to retrieve on thank you page
    const joinForm = document.getElementById("join-form");
    if (joinForm) {
        joinForm.addEventListener("submit", (e) => {
            const formData = new FormData(joinForm);
            for (const [key, value] of formData.entries()) {
                localStorage.setItem(key, value);
            }
        });
    }
});