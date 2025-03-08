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
        description: 'CSE 111 students become more organized, efficient...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
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
            const button = document.createElement('button');
            button.textContent = `${course.subject} ${course.number}`;
            button.className = `course-btn ${course.completed ? 'completed' : ''}`;
            
            // Hover effect to show full course info
            button.setAttribute('title', `${course.title} — ${course.credits} credits`);

            list.appendChild(button);
            totalCredits += course.credits;
        });

    // Update total credits
    document.getElementById('total-credits').textContent = totalCredits;
}

// Load all courses by default
document.addEventListener('DOMContentLoaded', () => displayCourses('all'));
