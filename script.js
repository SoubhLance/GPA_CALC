// Theme functionality
let currentTheme = 'boy';

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const themeLabel = document.querySelector('.theme-label');
    
    if (currentTheme === 'boy') {
        body.setAttribute('data-theme', 'girl');
        themeIcon.textContent = '👧';
        themeLabel.textContent = 'Girl';
        currentTheme = 'girl';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '👦';
        themeLabel.textContent = 'Boy';
        currentTheme = 'boy';
    }
    
    localStorage.setItem('theme', currentTheme);
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection + '-section').classList.add('active');
        });
    });

    // Initialize other functionality
    initializeConverters();
    initializeDropdowns();
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
    const cgpaResult = document.getElementById('cgpa-result');
    const percentageResult = document.getElementById('percentage-result');

    if (cgpaInput && cgpaResult) {
        cgpaInput.addEventListener('input', function() {
            const cgpa = parseFloat(this.value);
            if (!isNaN(cgpa) && cgpa >= 0 && cgpa <= 10) {
                const percentage = (cgpa * 9.5).toFixed(2);
                cgpaResult.textContent = `${percentage}%`;
                cgpaResult.style.color = 'var(--primary-color)';
            } else if (this.value === '') {
                cgpaResult.textContent = 'Enter CGPA to convert';
                cgpaResult.style.color = 'var(--text-muted)';
            } else {
                cgpaResult.textContent = 'Invalid CGPA (0-10)';
                cgpaResult.style.color = 'var(--error-color)';
            }
        });
    }

    if (percentageInput && percentageResult) {
        percentageInput.addEventListener('input', function() {
            const percentage = parseFloat(this.value);
            if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
                const cgpa = (percentage / 9.5).toFixed(2);
                percentageResult.textContent = cgpa;
                percentageResult.style.color = 'var(--primary-color)';
            } else if (this.value === '') {
                percentageResult.textContent = 'Enter percentage to convert';
                percentageResult.style.color = 'var(--text-muted)';
            } else {
                percentageResult.textContent = 'Invalid percentage (0-100)';
                percentageResult.style.color = 'var(--error-color)';
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

// Update courses dropdown
function updateCourses() {
    const regulation = document.getElementById("regulation").value;
    const courseDropdown = document.getElementById("course");
    
    courseDropdown.innerHTML = '<option value="">Choose Course</option>';
    
    if (!regulation) {
        resetSubjects();
        return;
    }
    
    for (let course in regulations[regulation]) {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseDropdown.appendChild(option);
    }
    
    document.getElementById("semester").innerHTML = '<option value="">Choose Semester</option>';
    resetSubjects();
}

// Update semesters dropdown
function updateSemesters() {
    const regulation = document.getElementById("regulation").value;
    const course = document.getElementById("course").value;
    const semesterDropdown = document.getElementById("semester");
    
    semesterDropdown.innerHTML = '<option value="">Choose Semester</option>';
    
    if (!regulation || !course) {
        resetSubjects();
        return;
    }
    
    for (let semester in regulations[regulation][course]) {
        const option = document.createElement("option");
        option.value = semester;
        option.textContent = semester;
        semesterDropdown.appendChild(option);
    }
    
    resetSubjects();
}

// Load subjects in card format
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
    
    container.innerHTML = "";
    
    subjects.forEach((subjectObj, index) => {
        const subjectCard = document.createElement("div");
        subjectCard.className = "subject-card";
        
        subjectCard.innerHTML = `
            <div class="subject-header">
                <span class="subject-name">${subjectObj.subject}</span>
                <span class="subject-credits">${subjectObj.credit} Credits</span>
            </div>
            <div class="grade-selector">
                <button class="grade-btn" data-grade="O" onclick="selectGrade(this, ${index})">O</button>
                <button class="grade-btn" data-grade="A+" onclick="selectGrade(this, ${index})">A+</button>
                <button class="grade-btn" data-grade="A" onclick="selectGrade(this, ${index})">A</button>
                <button class="grade-btn" data-grade="B+" onclick="selectGrade(this, ${index})">B+</button>
                <button class="grade-btn" data-grade="B" onclick="selectGrade(this, ${index})">B</button>
                <button class="grade-btn" data-grade="C" onclick="selectGrade(this, ${index})">C</button>
                <button class="grade-btn" data-grade="F" onclick="selectGrade(this, ${index})">F</button>
            </div>
        `;
        
        container.appendChild(subjectCard);
    });
    
    // Show subjects grid
    document.getElementById("subjects-grid").style.display = "block";
    
    // Update stats
    updateStats();
}

// Select grade function
function selectGrade(button, index) {
    const card = button.closest('.subject-card');
    const allButtons = card.querySelectorAll('.grade-btn');
    
    allButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    
    updateProgress();
}

// Update progress bar
function updateProgress() {
    const totalSubjects = document.querySelectorAll('.subject-card').length;
    const selectedGrades = document.querySelectorAll('.grade-btn.selected').length;
    const progress = totalSubjects > 0 ? (selectedGrades / totalSubjects) * 100 : 0;
    
    document.getElementById('progress-fill').style.width = progress + '%';
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
    const selectedGrades = document.querySelectorAll('.grade-btn.selected');
    
    if (selectedGrades.length !== subjects.length) {
        alert("Please select grades for all subjects.");
        return;
    }
    
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    selectedGrades.forEach((gradeBtn, index) => {
        const grade = gradeBtn.getAttribute('data-grade');
        const credit = subjects[index].credit;
        const gradePoint = grades[grade];
        
        totalCredits += credit;
        totalGradePoints += gradePoint * credit;
    });
    
    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    const performance = getPerformanceGrade(parseFloat(gpa));
    const percentage = (parseFloat(gpa) * 9.5).toFixed(2);
    
    // Update results
    document.getElementById("gpa-display").textContent = gpa;
    document.getElementById("credits-display").textContent = totalCredits;
    document.getElementById("grade-points-display").textContent = totalGradePoints.toFixed(2);
    document.getElementById("percentage-display").textContent = percentage + "%";
    
    // Update stats header
    document.getElementById("current-gpa").textContent = gpa;
    document.getElementById("total-subjects").textContent = subjects.length;
    document.getElementById("performance-level").textContent = performance;
    
    // Show results panel
    document.getElementById("results-panel").classList.add("show");
    document.getElementById("results-panel").scrollIntoView({ behavior: 'smooth' });
}

// Reset calculator
function resetCalculator() {
    document.getElementById("regulation").selectedIndex = 0;
    document.getElementById("course").innerHTML = '<option value="">Choose Course</option>';
    document.getElementById("semester").innerHTML = '<option value="">Choose Semester</option>';
    
    resetSubjects();
    resetStats();
    
    document.getElementById("results-panel").classList.remove("show");
}

// Reset subjects
function resetSubjects() {
    document.getElementById("subjects-grid").style.display = "none";
    document.getElementById("subjects-container").innerHTML = "";
    document.getElementById("progress-fill").style.width = "0%";
}

// Update stats
function updateStats() {
    document.getElementById("current-gpa").textContent = "0.00";
    document.getElementById("total-subjects").textContent = document.querySelectorAll('.subject-card').length;
    document.getElementById("performance-level").textContent = "-";
}

// Reset stats
function resetStats() {
    document.getElementById("current-gpa").textContent = "0.00";
    document.getElementById("total-subjects").textContent = "0";
    document.getElementById("performance-level").textContent = "-";
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme === 'girl') {
        toggleTheme();
    }
}

// Complete regulations data
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
