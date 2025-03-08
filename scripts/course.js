const courses = [
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 3, completed: true },
    { code: 'WDD 231', name: 'Web Frontend Development', credits: 3, completed: false },
    { code: 'CSE 110', name: 'Programming Basics', credits: 3, completed: true },
    { code: 'CSE 111', name: 'Advanced Programming', credits: 3, completed: false },
    { code: 'CSE 210', name: 'Data Structures', credits: 3, completed: false },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 3, completed: false }
];

function displayCourses(filter) {
    const list = document.getElementById('course-list');
    list.innerHTML = '';

    courses.filter(course => filter === 'all' || course.code.startsWith(filter))
        .forEach(course => {
            const button = document.createElement('button');
            button.textContent = course.code;
            button.className = course.completed ? 'completed' : '';
            list.appendChild(button);
        });
}

document.addEventListener('DOMContentLoaded', () => displayCourses('all'));
