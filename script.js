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
    
    // Initialize converter input listeners
    initializeConverters();
    
    // Focus on first input
    const firstInput = document.querySelector('.course-name');
    if (firstInput) {
        firstInput.focus();
    }
});

// Course management functions
function addCourse() {
    const container = document.getElementById('courses-container');
    const courseRow = document.createElement('div');
    courseRow.className = 'course-row';
    
    courseRow.innerHTML = `
        <div class="input-group">
            <label>Course Name</label>
            <input type="text" placeholder="e.g., Physics I" class="course-name">
        </div>
        <div class="input-group">
            <label>Credits</label>
            <input type="number" placeholder="3" class="course-credits" min="1" max="10">
        </div>
        <div class="input-group">
            <label>Grade</label>
            <select class="course-grade">
                <option value="0">Select Grade</option>
                <option value="10">O (10)</option>
                <option value="9">A+ (9)</option>
                <option value="8">A (8)</option>
                <option value="7">B+ (7)</option>
                <option value="6">B (6)</option>
                <option value="5">C (5)</option>
                <option value="4">P (4)</option>
                <option value="0">F (0)</option>
            </select>
        </div>
        <button class="remove-btn" onclick="removeCourse(this)">×</button>
    `;
    
    container.appendChild(courseRow);
    
    // Add animation
    courseRow.style.opacity = '0';
    courseRow.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        courseRow.style.transition = 'all 0.3s ease';
        courseRow.style.opacity = '1';
        courseRow.style.transform = 'translateY(0)';
    }, 10);
}

function removeCourse(button) {
    const courseRow = button.parentElement;
    const container = document.getElementById('courses-container');
    
    // Don't remove if it's the only course
    if (container.children.length > 1) {
        // Add animation before removing
        courseRow.style.transition = 'all 0.3s ease';
        courseRow.style.opacity = '0';
        courseRow.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            courseRow.remove();
        }, 300);
    } else {
        showNotification('At least one course is required!', 'error');
    }
}

function calculateGPA() {
    const courseRows = document.querySelectorAll('.course-row');
    let totalCredits = 0;
    let totalGradePoints = 0;
    let validCourses = 0;
    const errors = [];

    courseRows.forEach((row, index) => {
        const credits = parseFloat(row.querySelector('.course-credits').value);
        const grade = parseFloat(row.querySelector('.course-grade').value);
        const courseName = row.querySelector('.course-name').value.trim();

        // Validation
        if (!courseName) {
            errors.push(`Course ${index + 1}: Please enter course name`);
        }
        if (!credits || credits <= 0) {
            errors.push(`Course ${index + 1}: Please enter valid credits`);
        }
        if (grade < 0) {
            errors.push(`Course ${index + 1}: Please select a grade`);
        }

        if (credits > 0 && grade >= 0 && courseName) {
            totalCredits += credits;
            totalGradePoints += credits * grade;
            validCourses++;
        }
    });

    // Show errors if any
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return;
    }

    if (validCourses === 0) {
        showNotification('Please enter valid course details!', 'error');
        return;
    }

    const gpa = totalGradePoints / totalCredits;
    
    // Display results with animation
    document.getElementById('gpa-value').textContent = gpa.toFixed(2);
    document.getElementById('total-credits').textContent = totalCredits;
    document.getElementById('grade-points').textContent = totalGradePoints.toFixed(2);
    
    const resultSection = document.getElementById('gpa-result');
    resultSection.style.display = 'block';
    
    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    showNotification('GPA calculated successfully!', 'success');
}

function resetGPA() {
    // Clear all inputs
    const courseRows = document.querySelectorAll('.course-row');
    courseRows.forEach(row => {
        row.querySelector('.course-name').value = '';
        row.querySelector('.course-credits').value = '';
        row.querySelector('.course-grade').value = '0';
    });

    // Hide result
    const resultSection = document.getElementById('gpa-result');
    resultSection.style.display = 'none';

    // Reset to single course row
    const container = document.getElementById('courses-container');
    while (container.children.length > 1) {
        container.removeChild(container.lastChild);
    }
    
    // Focus on first input
    const firstInput = document.querySelector('.course-name');
    if (firstInput) {
        firstInput.focus();
    }
    
    showNotification('Form reset successfully!', 'success');
}

// Converter functions
function initializeConverters() {
    const cgpaInput = document.getElementById('cgpa-input');
    const percentageInput = document.getElementById('percentage-input');
    
    if (cgpaInput) {
        cgpaInput.addEventListener('input', convertCGPAToPercentage);
    }
    
    if (percentageInput) {
        percentageInput.addEventListener('input', convertPercentageToCGPA);
    }
}

function convertCGPAToPercentage() {
    const cgpa = parseFloat(document.getElementById('cgpa-input').value);
    const resultDiv = document.getElementById('percentage-result');

    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
        resultDiv.textContent = 'Enter valid CGPA (0-10)';
        resultDiv.style.color = '#e74c3c';
        return;
    }

    // Using SRM's conversion formula: Percentage = (CGPA - 0.5) * 10
    const percentage = (cgpa - 0.5) * 10;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    
    resultDiv.textContent = `${clampedPercentage.toFixed(2)}%`;
    resultDiv.style.color = '#3498db';
    
    // Add animation
    resultDiv.style.transform = 'scale(1.05)';
    setTimeout(() => {
        resultDiv.style.transform = 'scale(1)';
    }, 200);
}

function convertPercentageToCGPA() {
    const percentage = parseFloat(document.getElementById('percentage-input').value);
    const resultDiv = document.getElementById('cgpa-result');

    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        resultDiv.textContent = 'Enter valid Percentage (0-100)';
        resultDiv.style.color = '#e74c3c';
        return;
    }

    // Using SRM's conversion formula: CGPA = (Percentage / 10) + 0.5
    const cgpa = (percentage / 10) + 0.5;
    const clampedCGPA = Math.max(0, Math.min(10, cgpa));
    
    resultDiv.textContent = `${clampedCGPA.toFixed(2)} CGPA`;
    resultDiv.style.color = '#3498db';
    
    // Add animation
    resultDiv.style.transform = 'scale(1.05)';
    setTimeout(() => {
        resultDiv.style.transform = 'scale(1)';
    }, 200);
}

// Tab switching functionality (alternative to inline onclick)
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    // Show selected tab content
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const activeTab = document.querySelector('.tab-content.active');
        
        if (activeTab && activeTab.id === 'gpa-tab') {
            calculateGPA();
        }
    }
    
    // Escape to reset
    if (e.key === 'Escape') {
        const activeTab = document.querySelector('.tab-content.active');
        
        if (activeTab && activeTab.id === 'gpa-tab') {
            resetGPA();
        }
    }
    
    // Ctrl/Cmd + N to add new course
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        const activeTab = document.querySelector('.tab-content.active');
        
        if (activeTab && activeTab.id === 'gpa-tab') {
            addCourse();
        }
    }
});

// Enhanced input validation
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('course-credits')) {
        const value = parseFloat(e.target.value);
        if (value < 1 || value > 10) {
            e.target.style.borderColor = '#e74c3c';
        } else {
            e.target.style.borderColor = '#e0e0e0';
        }
    }
});

// Auto-save functionality (optional)
function saveToLocalStorage() {
    const courseRows = document.querySelectorAll('.course-row');
    const courses = [];
    
    courseRows.forEach(row => {
        const courseName = row.querySelector('.course-name').value;
        const credits = row.querySelector('.course-credits').value;
        const grade = row.querySelector('.course-grade').value;
        
        if (courseName || credits || grade !== '0') {
            courses.push({ courseName, credits, grade });
        }
    });
    
    localStorage.setItem('srmGPAData', JSON.stringify(courses));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('srmGPAData');
    if (savedData) {
        const courses = JSON.parse(savedData);
        const container = document.getElementById('courses-container');
        
        // Clear existing courses
        container.innerHTML = '';
        
        // Add saved courses
        courses.forEach(course => {
            const courseRow = document.createElement('div');
            courseRow.className = 'course-row';
            courseRow.innerHTML = `
                <div class="input-group">
                    <label>Course Name</label>
                    <input type="text" placeholder="e.g., Physics I" class="course-name" value="${course.courseName}">
                </div>
                <div class="input-group">
                    <label>Credits</label>
                    <input type="number" placeholder="3" class="course-credits" min="1" max="10" value="${course.credits}">
                </div>
                <div class="input-group">
                    <label>Grade</label>
                    <select class="course-grade">
                        <option value="0">Select Grade</option>
                        <option value="10" ${course.grade === '10' ? 'selected' : ''}>O (10)</option>
                        <option value="9" ${course.grade === '9' ? 'selected' : ''}>A+ (9)</option>
                        <option value="8" ${course.grade === '8' ? 'selected' : ''}>A (8)</option>
                        <option value="7" ${course.grade === '7' ? 'selected' : ''}>B+ (7)</option>
                        <option value="6" ${course.grade === '6' ? 'selected' : ''}>B (6)</option>
                        <option value="5" ${course.grade === '5' ? 'selected' : ''}>C (5)</option>
                        <option value="4" ${course.grade === '4' ? 'selected' : ''}>P (4)</option>
                        <option value="0" ${course.grade === '0' ? 'selected' : ''}>F (0)</option>
                    </select>
                </div>
                <button class="remove-btn" onclick="removeCourse(this)">×</button>
            `;
            container.appendChild(courseRow);
        });
        
        // If no courses were saved, add one default course
        if (courses.length === 0) {
            addCourse();
        }
    }
}

// Auto-save on input changes
document.addEventListener('input', function(e) {
    if (e.target.closest('.course-row')) {
        saveToLocalStorage();
    }
});

// Load saved data on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadFromLocalStorage, 100);
});
