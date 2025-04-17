// js/main.js
import { fetchProjects } from './modules/data.js';
import { openModal, closeModal } from './modules/modal.js';

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('fonts-loading');
  document.body.classList.add('fonts-loaded');
  updateFooterYear();
  initProjects();
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
});

function updateFooterYear() {
  document.querySelectorAll('#current-year')
    .forEach(el => el.textContent = new Date().getFullYear());
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
