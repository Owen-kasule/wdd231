// js/modules/data.js
export async function fetchProjects() {
    try {
      const resp = await fetch('../data/projects.json');
      if (!resp.ok) throw new Error('Network response was not ok');
      return await resp.json();
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      return [];
    }
  }
  