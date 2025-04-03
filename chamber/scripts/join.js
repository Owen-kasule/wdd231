document.addEventListener("DOMContentLoaded", () => {
    // Set timestamp when form loads
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
    
    // Handle modal functionality
    const infoButtons = document.querySelectorAll(".info-btn");
    const closeButtons = document.querySelectorAll(".close-modal");
    
    // Open modal when clicking info buttons
    infoButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) modal.showModal();
        });
    });
    
    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".membership-modal");
            if (modal) modal.close();
        });
    });
    
    // Close modals when clicking outside them
    document.querySelectorAll(".membership-modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            const rect = modal.getBoundingClientRect();
            if (e.clientY < rect.top || e.clientY > rect.bottom || 
                e.clientX < rect.left || e.clientX > rect.right) {
                modal.close();
            }
        });
    });
    
    // Store form data in localStorage for the thank you page
    const joinForm = document.getElementById("join-form");
    if (joinForm) {
        joinForm.addEventListener("submit", () => {
            const formData = new FormData(joinForm);
            for (const [key, value] of formData.entries()) {
                localStorage.setItem(key, value);
            }
        });
    }
});