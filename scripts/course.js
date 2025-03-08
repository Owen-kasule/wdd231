
// course.js

const courses = [
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 3, completed: true },
    { code: 'WDD 231', name: 'Web Frontend Development', credits: 3, completed: false },
    { code: 'CSE 121B', name: 'JavaScript Language', credits: 3, completed: false }
];

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
            }
            list.appendChild(li);
            totalCredits += course.credits;
        });

    document.getElementById('total-credits').textContent = totalCredits;
}

document.addEventListener('DOMContentLoaded', () => displayCourses('all'));
