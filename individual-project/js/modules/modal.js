// js/modules/modal.js
export function openModal(contentHtml) {
    const modal = document.getElementById('project-modal');
    const body = document.getElementById('modal-body');
    body.innerHTML = contentHtml;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
  
  export function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  