// course.js

const courses = [
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 3, completed: true },
    { code: 'WDD 231', name: 'Web Frontend Development', credits: 3, completed: false },
    { code: 'CSE 110', name: 'Programming Basics', credits: 3, completed: true },
    { code: 'CSE 111', name: 'Advanced Programming', credits: 3, completed: false },
    { code: 'CSE 210', name: 'Data Structures', credits: 3, completed: false },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 3, completed: false }
];

// Function to display courses based on filter
function displayCourses(filter) {
    const list = document.getElementById('course-list');
    list.innerHTML = '';

    let totalCredits = 0;

    courses
        .filter(course => filter === 'all' || course.code.startsWith(filter))
        .forEach(course => {
            const li = document.createElement('li');
            li.textContent = `${course.code}: ${course.name} (${course.credits} credits)`;

            if (course.completed) {
                li.style.textDecoration = 'line-through';
                li.style.color = '#999'; // Completed courses shown in gray
            } else {
                li.style.color = '#333';
            }

            list.appendChild(li);
            totalCredits += course.credits;
        });

    // Update total credits dynamically
    document.getElementById('total-credits').textContent = totalCredits;
}

// Display all courses when the page loads
document.addEventListener('DOMContentLoaded', () => displayCourses('all'));
