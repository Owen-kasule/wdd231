// main.js
// -----------------------------------------------------------------------------
// Techrooot primary script
// Responsible for:
//   • loading external JSON data for projects
//   • building project cards dynamically
//   • controlling the modal dialog
//   • handling responsive hamburger navigation
//   • updating footer dates
// -----------------------------------------------------------------------------

// 1.  ES‑module imports -------------------------------------------------------
import { fetchProjects }          from './modules/data.js';     // async JSON fetch helper
import { openModal, closeModal }  from './modules/modal.js';    // modal show / hide helpers

// 2.  Run after the initial HTML is parsed -----------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // ----- font‑loading class swap (avoids CLS flash) -------------------------
  document.body.classList.remove('fonts-loading');
  document.body.classList.add('fonts-loaded');

  // ----- one‑off page initialisation tasks ----------------------------------
  updateFooterDates();   // sets © year + last‑modified stamp
  initProjects();        // builds project cards (if the page has the grid)

  // close‑button inside modal (optional on pages that have the element)
  document.getElementById('modalClose')?.addEventListener('click', closeModal);

  // ----- mobile hamburger navigation toggle ---------------------------------
  const navToggle = document.querySelector('.nav-toggle');  // three‑bar button
  const header    = document.querySelector('header');       // we toggle a class on <header>

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      // flip aria‑expanded for accessibility tools
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));

      // CSS tackles the slide‑down effect via .open on <header>
      header.classList.toggle('open');
    });
  }
});

// ---------------------------------------------------------------------------
// updateFooterDates()  → writes the current year and last‑modified timestamp
// ---------------------------------------------------------------------------
function updateFooterDates () {
  // © current year
  document.querySelectorAll('#current-year')
    .forEach(el => el.textContent = new Date().getFullYear());

  // last‑modified date (formatted for user locale)
  const lastModified = new Date(document.lastModified);
  document.querySelectorAll('#last-modified-date')
    .forEach(el => el.textContent = lastModified.toLocaleDateString(undefined, {
      year:  'numeric',
      month: 'long',
      day:   'numeric'
    }));
}

// ---------------------------------------------------------------------------
// initProjects()  → fetch data and build project cards dynamically
// ---------------------------------------------------------------------------
async function initProjects () {
  const listEl = document.getElementById('project-list');
  if (!listEl) return;                // some pages don’t contain the grid

  const projects = await fetchProjects();    // async helper in data.js (try/catch inside)

  // build up to 15 cards from the data
  projects.slice(0, 15).forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = /* html */ `
      <img src="${project.image}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.year}</p>
      <p>${project.domain}</p>
    `;

    // clicking a card opens the details modal
    card.addEventListener('click', () => showDetails(project));
    listEl.append(card);
  });
}

// ---------------------------------------------------------------------------
// showDetails(project)  → open modal & remember “viewed” projects
// ---------------------------------------------------------------------------
function showDetails (project) {
  // persist ID to localStorage so we can mark it as viewed later
  const viewed = JSON.parse(localStorage.getItem('viewed') || '[]');
  if (!viewed.includes(project.id)) {
    viewed.push(project.id);
    localStorage.setItem('viewed', JSON.stringify(viewed));
  }

  // build the modal’s inner HTML and display
  openModal(/* html */ `
    <h2 id="modal-title">${project.title}</h2>
    <img src="${project.image}" alt="${project.title}" style="width:100%;border-radius:4px;">
    <p><strong>Domain:</strong> ${project.domain}</p>
    <p>${project.description}</p>
    <p><em>Year: ${project.year}</em></p>
  `);
}
