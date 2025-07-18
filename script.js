// Theme functionality
let currentTheme = 'boy';

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const themeLabel = document.querySelector('.theme-label');
    
    if (currentTheme === 'boy') {
        // Switch to girl theme
        body.setAttribute('data-theme', 'girl');
        themeIcon.textContent = '👧';
        themeLabel.textContent = 'Girl';
        currentTheme = 'girl';
        
        // Add theme switch animation
        body.style.transform = 'scale(0.98)';
        setTimeout(() => {
            body.style.transform = 'scale(1)';
        }, 200);
        
    } else {
        // Switch to boy theme
        body.removeAttribute('data-theme');
        themeIcon.textContent = '👦';
        themeLabel.textContent = 'Boy';
        currentTheme = 'boy';
        
        // Add theme switch animation
        body.style.transform = 'scale(0.98)';
        setTimeout(() => {
            body.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
    
    // Add button click animation
    const button = document.querySelector('.theme-toggle-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme === 'girl') {
        toggleTheme();
    }
}

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
        });
    });

    // Initialize converters and dropdowns
    initializeConverters();
    initializeDropdowns();
    
    // Load saved theme
    loadTheme();
});

// Initialize dropdown event listeners
function initializeDropdowns() {
    document.getElementById('regulation').addEventListener('change', updateCourses);
    document.getElementById('course').addEventListener('change', updateSemesters);
    document.getElementById('semester').addEventListener('change', loadSubjects);
}

// Initialize converter functionality
function initializeConverters() {
    const cgpaInput = document.getElementById('cgpa-input');
    const percentageInput = document.getElementById('percentage-input');
    const cgpaResult = document.getElementById('cgpa-percentage-result');
    const percentageResult = document.getElementById('percentage-cgpa-result');

    if (cgpaInput && cgpaResult) {
        cgpaInput.addEventListener('input', function() {
            const cgpa = parseFloat(this.value);
            if (!isNaN(cgpa) && cgpa >= 0 && cgpa <= 10) {
                const percentage = (cgpa * 9.5).toFixed(2);
                cgpaResult.textContent = `${percentage}%`;
                cgpaResult.style.color = 'var(--accent-primary)';
            } else if (this.value === '') {
                cgpaResult.textContent = 'Enter CGPA above';
                cgpaResult.style.color = 'var(--text-secondary)';
            } else {
                cgpaResult.textContent = 'Enter valid CGPA (0-10)';
                cgpaResult.style.color = 'var(--accent-red)';
            }
        });
    }

    if (percentageInput && percentageResult) {
        percentageInput.addEventListener('input', function() {
            const percentage = parseFloat(this.value);
            if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
                const cgpa = (percentage / 9.5).toFixed(2);
                percentageResult.textContent = cgpa;
                percentageResult.style.color = 'var(--accent-primary)';
            } else if (this.value === '') {
                percentageResult.textContent = 'Enter Percentage above';
                percentageResult.style.color = 'var(--text-secondary)';
            } else {
                percentageResult.textContent = 'Enter valid percentage (0-100)';
                percentageResult.style.color = 'var(--accent-red)';
            }
        });
    }
}

// Grade point mapping
const grades = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "F": 0
};

// Performance grade mapping
function getPerformanceGrade(gpa) {
    if (gpa >= 9.5) return "Outstanding";
    if (gpa >= 8.5) return "Excellent";
    if (gpa >= 7.5) return "Very Good";
    if (gpa >= 6.5) return "Good";
    if (gpa >= 5.5) return "Average";
    if (gpa >= 4.5) return "Below Average";
    return "Poor";
}

// Update courses dropdown based on regulation
function updateCourses() {
    const regulation = document.getElementById("regulation").value;
    const courseDropdown = document.getElementById("course");
    
    // Clear previous options
    courseDropdown.innerHTML = '<option value="">Select Course</option>';
    
    if (!regulation) {
        resetSubjects();
        return;
    }
    
    // Add courses based on regulation
    for (let course in regulations[regulation]) {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseDropdown.appendChild(option);
    }
    
    // Reset semester dropdown
    const semesterDropdown = document.getElementById("semester");
    semesterDropdown.innerHTML = '<option value="">Select Semester</option>';
    
    resetSubjects();
}

// Update semesters dropdown based on course
function updateSemesters() {
    const regulation = document.getElementById("regulation").value;
    const course = document.getElementById("course").value;
    const semesterDropdown = document.getElementById("semester");
    
    // Clear previous options
    semesterDropdown.innerHTML = '<option value="">Select Semester</option>';
    
    if (!regulation || !course) {
        resetSubjects();
        return;
    }
    
    // Add semesters based on course
    for (let semester in regulations[regulation][course]) {
        const option = document.createElement("option");
        option.value = semester;
        option.textContent = semester;
        semesterDropdown.appendChild(option);
    }
    
    resetSubjects();
}

// Load subjects based on selected regulation, course, and semester
function loadSubjects() {
    const regulation = document.getElementById("regulation").value;
    const course = document.getElementById("course").value;
    const semester = document.getElementById("semester").value;
    
    if (!regulation || !course || !semester) {
        resetSubjects();
        return;
    }
    
    const subjects = regulations[regulation][course][semester];
    const container = document.getElementById("subjects-container");
    
    // Update selected info
    document.getElementById("selected-regulation").textContent = regulation;
    document.getElementById("selected-course").textContent = course;
    document.getElementById("selected-semester").textContent = semester;
    
    // Clear previous subjects
    container.innerHTML = "";
    
    // Create subject rows
    subjects.forEach((subjectObj, index) => {
        const subjectRow = document.createElement("div");
        subjectRow.className = "subject-row";
        subjectRow.dataset.index = index;
        
        subjectRow.innerHTML = `
            <div class="subject-name" title="${subjectObj.subject}">
                <span class="subject-code">${index + 1}.</span>
                <span class="subject-title">${subjectObj.subject}</span>
            </div>
            <div class="subject-credits">
                <span class="credit-value">${subjectObj.credit}</span>
                <span class="credit-label">Credits</span>
            </div>
            <div class="subject-grade">
                <select class="grade-select" onchange="updateGradeDisplay(this, ${index})">
                    <option value="">Select Grade</option>
                    <option value="O">O (10)</option>
                    <option value="A+">A+ (9)</option>
                    <option value="A">A (8)</option>
                    <option value="B+">B+ (7)</option>
                    <option value="B">B (6)</option>
                    <option value="C">C (5)</option>
                    <option value="F">F (0)</option>
                </select>
            </div>
        `;
        
        container.appendChild(subjectRow);
    });
    
    // Show subjects section
    document.getElementById("subjects-section").style.display = "block";
    document.getElementById("subjects-section").scrollIntoView({ behavior: 'smooth' });
    
    // Hide result section
    document.getElementById("result-section").classList.remove("show");
}

// Update grade display when grade is selected
function updateGradeDisplay(selectElement, index) {
    const row = selectElement.closest('.subject-row');
    const grade = selectElement.value;
    
    if (grade) {
        row.classList.add('grade-selected');
        selectElement.style.backgroundColor = getGradeColor(grade);
    } else {
        row.classList.remove('grade-selected');
        selectElement.style.backgroundColor = '';
    }
}

// Get color based on grade
function getGradeColor(grade) {
    const colors = {
        'O': '#22c55e',
        'A+': '#16a34a',
        'A': '#84cc16',
        'B+': '#eab308',
        'B': '#f59e0b',
        'C': '#f97316',
        'F': '#ef4444'
    };
    return colors[grade] || '';
}

// Calculate GPA
function calculateGPA() {
    const regulation = document.getElementById("regulation").value;
    const course = document.getElementById("course").value;
    const semester = document.getElementById("semester").value;
    
    if (!regulation || !course || !semester) {
        alert("Please select regulation, course, and semester first.");
        return;
    }
    
    const subjects = regulations[regulation][course][semester];
    const selects = document.querySelectorAll("#subjects-container .grade-select");
    
    let totalGradePoints = 0;
    let totalCredits = 0;
    let unselectedGrades = 0;
    
    selects.forEach((select, index) => {
        const credit = subjects[index].credit;
        const grade = select.value;
        
        if (grade) {
            const gradePoint = grades[grade];
            totalCredits += credit;
            totalGradePoints += gradePoint * credit;
        } else {
            unselectedGrades++;
        }
    });
    
    if (unselectedGrades > 0) {
        alert(`Please select grades for all ${unselectedGrades} remaining subjects.`);
        return;
    }
    
    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    const performance = getPerformanceGrade(parseFloat(gpa));
    const equivalentPercentage = (parseFloat(gpa) * 9.5).toFixed(2);
    
    // Update result display
    document.getElementById("gpa-result").textContent = gpa;
    document.getElementById("total-credits").textContent = totalCredits;
    document.getElementById("total-grade-points").textContent = totalGradePoints.toFixed(2);
    document.getElementById("performance-grade").textContent = performance;
    document.getElementById("equivalent-percentage").textContent = equivalentPercentage + "%";
    
    // Show result section
    const resultSection = document.getElementById("result-section");
    resultSection.classList.add("show");
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Reset subjects section
function resetSubjects() {
    document.getElementById("subjects-section").style.display = "none";
    document.getElementById("result-section").classList.remove("show");
    document.getElementById("subjects-container").innerHTML = "";
}

// Reset calculator
function resetCalculator() {
    // Reset dropdowns
    document.getElementById("regulation").selectedIndex = 0;
    document.getElementById("course").innerHTML = '<option value="">Select Course</option>';
    document.getElementById("semester").innerHTML = '<option value="">Select Semester</option>';
    
    // Reset subjects and results
    resetSubjects();
    
    // Reset result values
    document.getElementById("gpa-result").textContent = "0.00";
    document.getElementById("total-credits").textContent = "0";
    document.getElementById("total-grade-points").textContent = "0";
    document.getElementById("performance-grade").textContent = "-";
    document.getElementById("equivalent-percentage").textContent = "-";
    
    // Reset selected info
    document.getElementById("selected-regulation").textContent = "-";
    document.getElementById("selected-course").textContent = "-";
    document.getElementById("selected-semester").textContent = "-";
}

// Complete regulations data with all courses and semesters
let regulations = {
    "2018": {
        "CSE": {
            "Semester 1": [
                { "subject": "English", "credit": 3 },
                { "subject": "Calculus and Linear Algebra", "credit": 4 },
                { "subject": "Physics: Semiconductor Physics", "credit": 5 },
                { "subject": "Engineering Graphics and Design", "credit": 3 },
                { "subject": "Basic Electrical and Electronics Engineering", "credit": 5 }
            ],
            "Semester 2": [
                { "subject": "Chinese / French / German / Japanese/ Korean", "credit": 3 },
                { "subject": "Advanced Calculus and Complex Analysis", "credit": 4 },
                { "subject": "Chemistry", "credit": 5 },
                { "subject": "Programming for Problem Solving", "credit": 5 },
                { "subject": "Civil and Mechanical Engineering Workshop", "credit": 3 },
                { "subject": "General Aptitude", "credit": 1 }
            ],
            "Semester 3": [
                { "subject": "Transforms and Boundary Value Problems", "credit": 4 },
                { "subject": "Biology", "credit": 2 },
                { "subject": "Analog and Digital Electronics", "credit": 4 },
                { "subject": "Data Structures and Algorithms", "credit": 4 },
                { "subject": "Object Oriented Design and Programming", "credit": 4 },
                { "subject": "Computer Organization and Architecture", "credit": 4 },
                { "subject": "Management Principles for Engineers", "credit": 2 }
            ],
            "Semester 4": [
                { "subject": "Probability and Queueing Theory", "credit": 4 },
                { "subject": "Computer Communications", "credit": 3 },
                { "subject": "Design and Analysis of Algorithms", "credit": 4 },
                { "subject": "Operating Systems", "credit": 4 },
                { "subject": "Software Engineering and Project Management", "credit": 4 },
                { "subject": "Advanced Programming Practice", "credit": 4 },
                { "subject": "Competitive Professional Skills-I", "credit": 1 },
                { "subject": "Social Engineering", "credit": 2 }
            ],
            "Semester 5": [
                { "subject": "Discrete Mathematics for Engineers", "credit": 4 },
                { "subject": "Formal Language and Automata", "credit": 3 },
                { "subject": "Computer Networks", "credit": 4 },
                { "subject": "Competitive Professional Skills-II", "credit": 1 },
                { "subject": "Professional Elective - 1", "credit": 3 },
                { "subject": "Professional Elective - 2", "credit": 3 },
                { "subject": "Open Elective - 1", "credit": 3 },
                { "subject": "Massive Open Online Course - I / Industrial Training-I / Seminar - 1", "credit": 1 }
            ],
            "Semester 6": [
                { "subject": "Database Management Systems", "credit": 4 },
                { "subject": "Compiler Design", "credit": 4 },
                { "subject": "Artificial Intelligence", "credit": 4 },
                { "subject": "Comprehension", "credit": 1 },
                { "subject": "Competitive Professional Skills-III", "credit": 1 },
                { "subject": "Professional Elective - 3", "credit": 3 },
                { "subject": "Professional Elective - 4", "credit": 3 },
                { "subject": "Open Elective - 2", "credit": 3 },
                { "subject": "Massive Open Online Course - II / Industrial Training-II / Seminar - II", "credit": 1 },
                { "subject": "Employability Skills and Practices", "credit": 1 }
            ],
            "Semester 7": [
                { "subject": "Professional Elective - 5", "credit": 3 },
                { "subject": "Professional Elective - 6", "credit": 3 },
                { "subject": "Open Elective - 3", "credit": 3 },
                { "subject": "Minor Project / Internship (4-6 weeks)", "credit": 3 }
            ],
            "Semester 8": [
                { "subject": "Project / Semester Internship", "credit": 10 }
            ]
        },
        "ECE": {
            "Semester 1": [
                { "subject": "Foreign Language (Chinese/ French/ German/ Japanese / Korean)", "credit": 3 },
                { "subject": "Calculus and Linear Algebra", "credit": 4 },
                { "subject": "Chemistry", "credit": 5 },
                { "subject": "Programming for Problem Solving", "credit": 5 },
                { "subject": "Civil and Mechanical Engineering Workshop", "credit": 3 }
            ],
            "Semester 2": [
                { "subject": "English", "credit": 3 },
                { "subject": "Advanced Calculus and Complex Analysis", "credit": 4 },
                { "subject": "Physics: Electromagnetic Theory, Quantum Mechanics", "credit": 5 },
                { "subject": "Engineering Graphics and Design", "credit": 3 },
                { "subject": "Basic Electrical and Electronics Engineering", "credit": 5 },
                { "subject": "General Aptitude", "credit": 1 }
            ],
            "Semester 3": [
                { "subject": "Transforms and Boundary Value Problems", "credit": 4 },
                { "subject": "Control Systems", "credit": 3 },
                { "subject": "Electronic Devices", "credit": 4 },
                { "subject": "Digital Electronic Principles", "credit": 4 },
                { "subject": "Signals and Systems", "credit": 4 },
                { "subject": "Electromagnetics and Transmission Lines", "credit": 3 },
                { "subject": "Social Engineering", "credit": 2 }
            ],
            "Semester 4": [
                { "subject": "Probability and Stochastic Process", "credit": 4 },
                { "subject": "Biology", "credit": 2 },
                { "subject": "Analog Electronic Circuits", "credit": 4 },
                { "subject": "Linear Integrated Circuits", "credit": 4 },
                { "subject": "Professional Elective-1", "credit": 3 },
                { "subject": "Open Elective-1", "credit": 3 },
                { "subject": "Management Principles for Engineers", "credit": 2 }
            ],
            "Semester 5": [
                { "subject": "Discrete Mathematics for Engineers", "credit": 4 },
                { "subject": "Microprocessor, Microcontroller and Interfacing Techniques", "credit": 4 },
                { "subject": "Digital Signal Processing", "credit": 4 },
                { "subject": "Analog and Digital Communication", "credit": 4 },
                { "subject": "Professional Elective - 2", "credit": 3 },
                { "subject": "Open Elective - 2", "credit": 3 },
                { "subject": "Massive Open Online Course-I / Industrial Training-I / Seminar-I", "credit": 1 }
            ],
            "Semester 6": [
                { "subject": "VLSI Design", "credit": 4 },
                { "subject": "Microwave and Optical Communications", "credit": 4 },
                { "subject": "Computer Communication Networks", "credit": 4 },
                { "subject": "Comprehension", "credit": 1 },
                { "subject": "Professional Elective-3", "credit": 3 },
                { "subject": "Professional Elective-4", "credit": 3 },
                { "subject": "Open Elective-3", "credit": 3 },
                { "subject": "Massive Open Online Course-II / Industrial Training-II / Seminar-II", "credit": 1 },
                { "subject": "Competitive Professional Skill", "credit": 1 },
                { "subject": "Employability Skills and Practices", "credit": 1 }
            ],
            "Semester 7": [
                { "subject": "Wireless Communications", "credit": 4 },
                { "subject": "Professional Elective-5", "credit": 3 },
                { "subject": "Professional Elective-6", "credit": 3 },
                { "subject": "Open Elective-4", "credit": 3 },
                { "subject": "Minor Project / Internship (4-6 weeks)", "credit": 3 }
            ],
            "Semester 8": [
                { "subject": "Project / Semester Internship", "credit": 10 }
            ]
        },
        "AI-ML": {
            "Semester 1": [
                { "subject": "English", "credit": 3 },
                { "subject": "Calculus and Linear Algebra", "credit": 4 },
                { "subject": "Physics: Semiconductor Physics", "credit": 5 },
                { "subject": "Engineering Graphics and Design", "credit": 3 },
                { "subject": "Basic Electrical and Electronics Engineering", "credit": 5 }
            ],
            "Semester 2": [
                { "subject": "Chinese / French / German / Japanese/ Korean", "credit": 3 },
                { "subject": "Advanced Calculus and Complex Analysis", "credit": 4 },
                { "subject": "Chemistry", "credit": 5 },
                { "subject": "Programming for Problem Solving", "credit": 5 },
                { "subject": "Civil and Mechanical Engineering Workshop", "credit": 3 },
                { "subject": "General Aptitude", "credit": 1 }
            ],
            "Semester 3": [
                { "subject": "Transforms and Boundary Value Problems", "credit": 4 },
                { "subject": "Biology", "credit": 2 },
                { "subject": "Analog and Digital Electronics", "credit": 4 },
                { "subject": "Data Structures and Algorithms", "credit": 4 },
                { "subject": "Object Oriented Design and Programming", "credit": 4 },
                { "subject": "Computer Organization and Architecture", "credit": 4 },
                { "subject": "Management Principles for Engineers", "credit": 2 }
            ],
            "Semester 4": [
                { "subject": "Probability and Statistics", "credit": 4 },
                { "subject": "Computer Communications", "credit": 3 },
                { "subject": "Design and Analysis of Algorithms", "credit": 4 },
                { "subject": "Operating Systems", "credit": 4 },
                { "subject": "Machine Learning Fundamentals", "credit": 4 },
                { "subject": "Advanced Programming Practice", "credit": 4 },
                { "subject": "Competitive Professional Skills-I", "credit": 1 },
                { "subject": "Social Engineering", "credit": 2 }
            ],
            "Semester 5": [
                { "subject": "Discrete Mathematics for Engineers", "credit": 4 },
                { "subject": "Natural Language Processing", "credit": 3 },
                { "subject": "Computer Networks", "credit": 4 },
                { "subject": "Deep Learning", "credit": 4 },
                { "subject": "Professional Elective - 1", "credit": 3 },
                { "subject": "Professional Elective - 2", "credit": 3 },
                { "subject": "Open Elective - 1", "credit": 3 },
                { "subject": "Massive Open Online Course - I / Industrial Training-I / Seminar - 1", "credit": 1 }
            ],
            "Semester 6": [
                { "subject": "Database Management Systems", "credit": 4 },
                { "subject": "Computer Vision", "credit": 4 },
                { "subject": "Artificial Intelligence", "credit": 4 },
                { "subject": "Comprehension", "credit": 1 },
                { "subject": "Competitive Professional Skills-III", "credit": 1 },
                { "subject": "Professional Elective - 3", "credit": 3 },
                { "subject": "Professional Elective - 4", "credit": 3 },
                { "subject": "Open Elective - 2", "credit": 3 },
                { "subject": "Massive Open Online Course - II / Industrial Training-II / Seminar - II", "credit": 1 },
                { "subject": "Employability Skills and Practices", "credit": 1 }
            ],
            "Semester 7": [
                { "subject": "Professional Elective - 5", "credit": 3 },
                { "subject": "Professional Elective - 6", "credit": 3 },
                { "subject": "Open Elective - 3", "credit": 3 },
                { "subject": "Minor Project / Internship (4-6 weeks)", "credit": 3 }
            ],
            "Semester 8": [
                { "subject": "Project / Semester Internship", "credit": 10 }
            ]
        }
    },
    "2021": {
        "CSE": {
            "Semester 1": [
                { "subject": "Chinese / French / German / Japanese / Korean / Spanish", "credit": 3 },
                { "subject": "Philosophy of Engineering", "credit": 2 },
                { "subject": "Calculus and Linear Algebra", "credit": 4 },
                { "subject": "Chemistry", "credit": 5 },
                { "subject": "Introduction to Computational Biology", "credit": 2 },
                { "subject": "Programming for Problem Solving", "credit": 4 },
                { "subject": "Basic Civil and Mechanical Workshop", "credit": 2 }
            ],
            "Semester 2": [
                { "subject": "Communicative English", "credit": 3 },
                { "subject": "Advanced Calculus and Complex Analysis", "credit": 4 },
                { "subject": "Semiconductor Physics and Computational Methods", "credit": 5 },
                { "subject": "Engineering Graphics and Design", "credit": 2 },
                { "subject": "Electrical and Electronics Engineering", "credit": 4 },
                { "subject": "Object Oriented Design and Programming", "credit": 3 }
            ],
            "Semester 3": [
                { "subject": "Transforms and Boundary Value Problems", "credit": 4 },
                { "subject": "Design Thinking and Methodology", "credit": 3 },
                { "subject": "Computer Organization and Architecture", "credit": 4 },
                { "subject": "Data Structures and Algorithms", "credit": 4 },
                { "subject": "Operating Systems", "credit": 4 },
                { "subject": "Advanced Programming Practice", "credit": 4 }
            ],
            "Semester 4": [
                { "subject": "Probability and Queueing Theory", "credit": 4 },
                { "subject": "Design and Analysis of Algorithms", "credit": 4 },
                { "subject": "Database Management Systems", "credit": 4 },
                { "subject": "Artificial Intelligence", "credit": 3 },
                { "subject": "Professional Elective-I", "credit": 3 },
                { "subject": "Social Engineering", "credit": 2 },
                { "subject": "Universal Human Values-Understanding Harmony and Ethical Human Conduct", "credit": 3 }
            ],
            "Semester 5": [
                { "subject": "Discrete Mathematics", "credit": 4 },
                { "subject": "Formal Language and Automata", "credit": 3 },
                { "subject": "Computer Networks", "credit": 4 },
                { "subject": "Machine Learning", "credit": 3 },
                { "subject": "Professional Elective - II", "credit": 3 },
                { "subject": "Open Elective - I", "credit": 3 },
                { "subject": "Community Connect", "credit": 1 }
            ],
            "Semester 6": [
                { "subject": "Data Science", "credit": 2 },
                { "subject": "Software Engineering and Project Management", "credit": 3 },
                { "subject": "Compiler Design", "credit": 3 },
                { "subject": "Professional Elective - III", "credit": 3 },
                { "subject": "Professional Elective - IV", "credit": 3 },
                { "subject": "Open Elective - II", "credit": 3 },
                { "subject": "Project / MOOC", "credit": 3 }
            ],
            "Semester 7": [
                { "subject": "Behavioral Psychology", "credit": 3 },
                { "subject": "Professional Elective - V", "credit": 3 },
                { "subject": "Professional Elective - VI", "credit": 3 },
                { "subject": "Professional Elective - VII", "credit": 3 },
                { "subject": "Professional Elective - VIII", "credit": 3 },
                { "subject": "Open Elective - III", "credit": 3 }
            ],
            "Semester 8": [
                { "subject": "Major Project / Major Project / Internship", "credit": 15 }
            ]
        },
        "AI-ML": {
            "Semester 1": [
                { "subject": "Communicative English", "credit": 3 },
                { "subject": "Calculus and Linear Algebra", "credit": 4 },
                { "subject": "Semiconductor Physics and Computational Methods", "credit": 5 },
                { "subject": "Engineering Graphics and Design", "credit": 2 },
                { "subject": "Electrical and Electronics Engineering", "credit": 4 },
                { "subject": "Programming for Problem Solving", "credit": 4 }
            ],
            "Semester 2": [
                { "subject": "Chinese / French / German / Japanese / Korean / Spanish", "credit": 3 },
                { "subject": "Philosophy of Engineering", "credit": 2 },
                { "subject": "Advanced Calculus and Complex Analysis", "credit": 4 },
                { "subject": "Chemistry", "credit": 5 },
                { "subject": "Introduction to Computational Biology", "credit": 2 },
                { "subject": "Object Oriented Design and Programming", "credit": 3 },
                { "subject": "Basic Civil and Mechanical Workshop", "credit": 2 }
            ],
            "Semester 3": [
                { "subject": "Transforms and Boundary Value Problems", "credit": 4 },
                { "subject": "Design Thinking and Methodology", "credit": 3 },
                { "subject": "Computer Organization and Architecture", "credit": 4 },
                { "subject": "Data Structures and Algorithms", "credit": 4 },
                { "subject": "Operating Systems", "credit": 4 },
                { "subject": "Advanced Programming Practice", "credit": 4 }
            ],
            "Semester 4": [
                { "subject": "Probability and Queueing Theory", "credit": 4 },
                { "subject": "Design and Analysis of Algorithms", "credit": 4 },
                { "subject": "Database Management Systems", "credit": 4 },
                { "subject": "Artificial Intelligence", "credit": 3 },
                { "subject": "Professional Elective - I", "credit": 3 },
                { "subject": "Social Engineering", "credit": 2 },
                { "subject": "Universal Human Values- Understanding Harmony and Ethical Human Conduct", "credit": 3 }
            ],
            "Semester 5": [
                { "subject": "Discrete Mathematics", "credit": 4 },
                { "subject": "Formal Language and Automata", "credit": 3 },
                { "subject": "Computer Networks", "credit": 4 },
                { "subject": "Machine Learning", "credit": 3 },
                { "subject": "Professional Elective - II", "credit": 3 },
                { "subject": "Open Elective - I", "credit": 3 },
                { "subject": "Community Connect", "credit": 1 }
            ],
            "Semester 6": [
                { "subject": "Data Science", "credit": 2 },
                { "subject": "Software Engineering and Project Management", "credit": 3 },
                { "subject": "Compiler Design", "credit": 3 },
                { "subject": "Professional Elective - III", "credit": 3 },
                { "subject": "Professional Elective - IV", "credit": 3 },
                { "subject": "Open Elective - II", "credit": 3 },
                { "subject": "Project / MOOC", "credit": 3 }
            ],
            "Semester 7": [
                { "subject": "Behavioral Psychology", "credit": 3 },
                { "subject": "Professional Elective - V", "credit": 3 },
                { "subject": "Professional Elective - VI", "credit": 3 },
                { "subject": "Deep Learning Techniques", "credit": 4 },
                { "subject": "Report Writing", "credit": 2 },
                { "subject": "Open Elective - III", "credit": 3 }
            ],
            "Semester 8": [
                { "subject": "Major Project / Major Project / Internship", "credit": 15 }
            ]
        },
        "ECE": {
            "Semester 1": [
                { "subject": "Communicative English", "credit": 3 },
                { "subject": "Calculus and Linear Algebra", "credit": 4 },
                { "subject": "Physics: Electromagnetic Theory, Quantum Mechanics, Waves and Optics", "credit": 5 },
                { "subject": "Engineering Graphics and Design", "credit": 2 },
                { "subject": "Electrical and Electronics Engineering", "credit": 4 }
            ],
            "Semester 2": [
                { "subject": "Chinese / French / German / Japanese / Korean / Spanish", "credit": 3 },
                { "subject": "Philosophy of Engineering", "credit": 2 },
                { "subject": "Advanced Calculus and Complex Analysis", "credit": 4 },
                { "subject": "Chemistry", "credit": 5 },
                { "subject": "Electronic System and PCB Design", "credit": 3 },
                { "subject": "Programming for Problem Solving", "credit": 4 },
                { "subject": "Biology", "credit": 2 },
                { "subject": "Basic Civil and Mechanical Workshop", "credit": 2 }
            ],
            "Semester 3": [
                { "subject": "Transforms and Boundary Value Problems", "credit": 4 },
                { "subject": "Social Engineering", "credit": 2 },
                { "subject": "Computer Organization and Architecture", "credit": 4 },
                { "subject": "Solid State Devices", "credit": 3 },
                { "subject": "Digital Logic Design", "credit": 3 },
                { "subject": "Electromagnetic Theory and Interference", "credit": 3 },
                { "subject": "Devices and Digital IC Lab", "credit": 2 },
                { "subject": "Universal Human Values - Understanding Harmony and Ethical Human Conduct", "credit": 3 }
            ],
            "Semester 4": [
                { "subject": "Probability and Stochastic Process", "credit": 4 },
                { "subject": "Analog and Linear Electronic Circuits", "credit": 3 },
                { "subject": "Signal Processing", "credit": 3 },
                { "subject": "Analog and Linear Electronic Circuits Lab", "credit": 2 },
                { "subject": "Artificial Intelligence", "credit": 3 },
                { "subject": "Professional Elective - I", "credit": 3 },
                { "subject": "Design Thinking and Methodology", "credit": 3 }
            ],
            "Semester 5": [
                { "subject": "Discrete Mathematics", "credit": 4 },
                { "subject": "Microprocessor, Microcontroller and Interfacing Techniques", "credit": 4 },
                { "subject": "VLSI Design and Technology", "credit": 3 },
                { "subject": "VLSI Design Lab", "credit": 2 },
                { "subject": "Professional Elective - II", "credit": 3 },
                { "subject": "Open Elective - I", "credit": 3 },
                { "subject": "Community Connect", "credit": 1 }
            ],
            "Semester 6": [
                { "subject": "Data Science", "credit": 2 },
                { "subject": "Analog and Digital Communication", "credit": 3 },
                { "subject": "Microwave and Optical Communication", "credit": 3 },
                { "subject": "Communication Lab", "credit": 2 },
                { "subject": "Professional Elective - III", "credit": 3 },
                { "subject": "Professional Elective - IV", "credit": 3 },
                { "subject": "Open Elective - II", "credit": 3 },
                { "subject": "Project / MOOC", "credit": 3 }
            ],
            "Semester 7": [
                { "subject": "Behavioral Psychology", "credit": 3 },
                { "subject": "Wireless Communication and Antenna Systems", "credit": 3 },
                { "subject": "Computer Communication and Network Security", "credit": 3 },
                { "subject": "Professional Elective - V", "credit": 3 },
                { "subject": "Professional Elective - VI", "credit": 3 },
                { "subject": "Open Elective - III", "credit": 3 }
            ],
            "Semester 8": [
                { "subject": "Major Project / Major Project / Internship", "credit": 15 }
            ]
        },
        "IT": {
            "Semester 1": [
                { "subject": "Chinese / French / German / Japanese / Korean / Spanish", "credit": 3 },
                { "subject": "Philosophy of Engineering", "credit": 2 },
                { "subject": "Calculus and Linear Algebra", "credit": 4 },
                { "subject": "Chemistry", "credit": 5 },
                { "subject": "Introduction to Computational Biology", "credit": 2 },
                { "subject": "Programming for Problem Solving", "credit": 4 },
                { "subject": "Basic Civil and Mechanical Workshop", "credit": 2 }
            ],
            "Semester 2": [
                { "subject": "Communicative English", "credit": 3 },
                { "subject": "Advanced Calculus and Complex Analysis", "credit": 4 },
                { "subject": "Semiconductor Physics and Computational Methods", "credit": 5 },
                { "subject": "Engineering Graphics and Design", "credit": 2 },
                { "subject": "Electrical and Electronics Engineering", "credit": 4 },
                { "subject": "Object Oriented Design and Programming", "credit": 3 }
            ],
            "Semester 3": [
                { "subject": "Numerical Methods and Analysis", "credit": 4 },
                { "subject": "Design Thinking and Methodology", "credit": 3 },
                { "subject": "Computer Organization and Architecture", "credit": 4 },
                { "subject": "Data Structures and Algorithms", "credit": 4 },
                { "subject": "Operating Systems", "credit": 4 },
                { "subject": "Advanced Programming Practice", "credit": 4 }
            ],
            "Semester 4": [
                { "subject": "Probability and Queueing Theory", "credit": 4 },
                { "subject": "Design and Analysis of Algorithms", "credit": 4 },
                { "subject": "Database Management Systems", "credit": 4 },
                { "subject": "Artificial Intelligence", "credit": 3 },
                { "subject": "Professional Elective - I", "credit": 3 },
                { "subject": "Social Engineering", "credit": 2 },
                { "subject": "Universal Human Values - Understanding Harmony and Ethical Human Conduct", "credit": 3 }
            ],
            "Semester 5": [
                { "subject": "Discrete Mathematics", "credit": 4 },
                { "subject": "Formal Language and Automata", "credit": 3 },
                { "subject": "Computer Networks", "credit": 4 },
                { "subject": "Big Data Essentials", "credit": 3 },
                { "subject": "Professional Elective - II", "credit": 3 },
                { "subject": "Open Elective - I", "credit": 3 },
                { "subject": "Community Connect", "credit": 1 }
            ],
            "Semester 6": [
                { "subject": "Data Science", "credit": 2 },
                { "subject": "Software Engineering Perspectives in Computer Game Development", "credit": 3 },
                { "subject": "Information Retrieval Techniques", "credit": 3 },
                { "subject": "Professional Elective - III", "credit": 3 },
                { "subject": "Professional Elective - IV", "credit": 3 },
                { "subject": "Open Elective - II", "credit": 3 },
                { "subject": "Project / MOOC", "credit": 3 }
            ],
            "Semester 7": [
                { "subject": "Behavioral Psychology", "credit": 3 },
                { "subject": "Professional Elective - V", "credit": 3 },
                { "subject": "Professional Elective - VI", "credit": 3 },
                { "subject": "Professional Elective - VII", "credit": 3 },
                { "subject": "Professional Elective - VIII", "credit": 3 },
                { "subject": "Open Elective - III", "credit": 3 }
            ],
            "Semester 8": [
                { "subject": "Major Project / Major Project / Internship", "credit": 15 }
            ]
        },
        "Cybersecurity": {
            "Semester 1": [
                { "subject": "Chinese / French / German / Japanese / Korean / Spanish", "credit": 3 },
                { "subject": "Philosophy of Engineering", "credit": 2 },
                { "subject": "Calculus and Linear Algebra", "credit": 4 },
                { "subject": "Chemistry", "credit": 5 },
                { "subject": "Introduction to Computational Biology", "credit": 2 },
                { "subject": "Programming for Problem Solving", "credit": 4 },
                { "subject": "Basic Civil and Mechanical Workshop", "credit": 2 }
            ],
            "Semester 2": [
                { "subject": "Communicative English", "credit": 3 },
                { "subject": "Advanced Calculus and Complex Analysis", "credit": 4 },
                { "subject": "Semiconductor Physics and Computational Methods", "credit": 5 },
                { "subject": "Engineering Graphics and Design", "credit": 2 },
                { "subject": "Electrical and Electronics Engineering", "credit": 4 },
                { "subject": "Object Oriented Design and Programming", "credit": 3 }
            ],
            "Semester 3": [
                { "subject": "Numerical Methods and Analysis", "credit": 4 },
                { "subject": "Design Thinking and Methodology", "credit": 3 },
                { "subject": "Computer Organization and Architecture", "credit": 4 },
                { "subject": "Data Structures and Algorithms", "credit": 4 },
                { "subject": "Operating Systems", "credit": 4 },
                { "subject": "Advanced Programming Practice", "credit": 4 }
            ],
            "Semester 4": [
                { "subject": "Probability and Queueing Theory", "credit": 4 },
                { "subject": "Design and Analysis of Algorithms", "credit": 4 },
                { "subject": "Database Management Systems", "credit": 4 },
                { "subject": "Artificial Intelligence", "credit": 3 },
                { "subject": "Professional Elective-I", "credit": 3 },
                { "subject": "Social Engineering", "credit": 2 },
                { "subject": "Universal Human Values - Understanding Harmony and Ethical Human Conduct", "credit": 3 }
            ],
            "Semester 5": [
                { "subject": "Discrete Mathematics", "credit": 4 },
                { "subject": "Formal Language and Automata", "credit": 3 },
                { "subject": "Computer Networks", "credit": 4 },
                { "subject": "Security Risk Management Principles", "credit": 3 },
                { "subject": "Professional Elective - II", "credit": 3 },
                { "subject": "Open Elective - I", "credit": 3 },
                { "subject": "Community Connect", "credit": 1 }
            ],
            "Semester 6": [
                { "subject": "Data Science", "credit": 2 },
                { "subject": "Software Engineering and Project Management", "credit": 3 },
                { "subject": "Malware Analysis", "credit": 3 },
                { "subject": "Professional Elective - III", "credit": 3 },
                { "subject": "Professional Elective - IV", "credit": 3 },
                { "subject": "Open Elective - II", "credit": 3 },
                { "subject": "Project / MOOC", "credit": 3 }
            ],
            "Semester 7": [
                { "subject": "Behavioral Psychology", "credit": 3 },
                { "subject": "Professional Elective - V", "credit": 3 },
                { "subject": "Professional Elective - VI", "credit": 3 },
                { "subject": "Professional Elective - VII", "credit": 3 },
                { "subject": "Professional Elective - VIII", "credit": 3 },
                { "subject": "Open Elective - III", "credit": 3 }
            ],
            "Semester 8": [
                { "subject": "Major Project / Major Project / Internship", "credit": 15 }
            ]
        }
    }
};
