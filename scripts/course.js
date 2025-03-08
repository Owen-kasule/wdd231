const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students become more organized and powerful programmers...',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduction to object-oriented programming with C#...',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Creating dynamic websites using JavaScript...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focus on user experience, compliance, and performance...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Function to display courses based on filter
function displayCourses(filter) {
    const list = document.getElementById('course-list');
    list.innerHTML = '';

    let totalCredits = 0;

    // Filter courses based on the selected filter
    courses
        .filter(course => filter === 'all' || course.subject === filter)
        .forEach(course => {
            // Create a button for each course
            const button = document.createElement('button');
            button.textContent = `${course.subject} ${course.number}`;
            button.className = `course-btn ${course.completed ? 'completed' : ''}`;
            button.setAttribute('title', `${course.title} — ${course.credits} credits`);

            list.appendChild(button);
            totalCredits += course.credits;
        });

    // Update total credits dynamically
    document.getElementById('total-credits').textContent = totalCredits;
}

// Event listener for page load
document.addEventListener('DOMContentLoaded', () => displayCourses('all'));
