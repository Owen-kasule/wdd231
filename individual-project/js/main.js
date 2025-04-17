// js/main.js
import { fetchProjects } from './modules/data.js';
import { openModal, closeModal } from './modules/modal.js';

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('fonts-loading');
  document.body.classList.add('fonts-loaded');
  updateFooterDates();
  initProjects();
  document.getElementById('modalClose')?.addEventListener('click', closeModal);

    /* === mobile hamburger === */
    const navToggle = document.querySelector('.nav-toggle');
    const header    = document.querySelector('header');
  
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        header.classList.toggle('open');        // CSS handles the show / hide
      });
    }
  

});

function updateFooterDates() {
  // Current Year
  document.querySelectorAll('#current-year')
    .forEach(el => el.textContent = new Date().getFullYear());

  // Last Modified Date
  const lastModEls = document.querySelectorAll('#last-modified-date');
  lastModEls.forEach(el => {
    // Use document.lastModified, formatted nicely:
    const d = new Date(document.lastModified);
    el.textContent = d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
}

async function initProjects() {
  const list = document.getElementById('project-list');
  const projects = await fetchProjects();                  // async + try in data.js
  projects.slice(0,15).forEach(p => {                       // array method: slice & forEach
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.year}</p>
      <p>${p.domain}</p>
    `;
    card.addEventListener('click', () => showDetails(p));
    list.append(card);
  });
}

function showDetails(project) {
  // store last viewed
  const viewed = JSON.parse(localStorage.getItem('viewed') || '[]');
  if (!viewed.includes(project.id)) {
    viewed.push(project.id);
    localStorage.setItem('viewed', JSON.stringify(viewed));
  }

  openModal(`
    <h2>${project.title}</h2>
    <img src="${project.image}" alt="${project.title}" style="width:100%;border-radius:4px;">
    <p><strong>Domain:</strong> ${project.domain}</p>
    <p>${project.description}</p>
    <p><em>Year: ${project.year}</em></p>
  `);
}
