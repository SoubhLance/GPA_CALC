import { useState, useEffect } from 'react';
import { Calculator, BarChart3, RefreshCw, TrendingUp, BookOpen, Target, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const GPACalculator = () => {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('calculator');
  const [regulation, setRegulation] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState({});
  const [results, setResults] = useState(null);
  const [cgpaInput, setCgpaInput] = useState('');
  const [percentageInput, setPercentageInput] = useState('');

  const grades = { "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C": 5, "F": 0 };

    // Complete regulations data
      const regulations = {
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
      
    const getPerformanceGrade = (gpa) => {
    if (gpa >= 9.5) return "Outstanding";
    if (gpa >= 8.5) return "Excellent";
    if (gpa >= 7.5) return "Very Good";
    if (gpa >= 6.5) return "Good";
    if (gpa >= 5.5) return "Average";
    if (gpa >= 4.5) return "Below Average";
    return "Poor";
  };

  const loadSubjects = () => {
    if (regulation && course && semester && regulations[regulation]?.[course]?.[semester]) {
      setSubjects(regulations[regulation][course][semester]);
      setSelectedGrades({});
      setResults(null);
    } else {
      setSubjects([]);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, [regulation, course, semester]);

  const handleGradeSelect = (index, grade) => {
    setSelectedGrades(prev => ({ ...prev, [index]: grade }));
  };

  const calculateGPA = () => {
    if (Object.keys(selectedGrades).length !== subjects.length) {
      alert("Please select grades for all subjects.");
      return;
    }

    let totalGradePoints = 0;
    let totalCredits = 0;

    subjects.forEach((subject, index) => {
      const grade = selectedGrades[index];
      const gradePoint = grades[grade];
      totalCredits += subject.credit;
      totalGradePoints += gradePoint * subject.credit;
    });

    const gpa = (totalGradePoints / totalCredits).toFixed(2);
    const performance = getPerformanceGrade(parseFloat(gpa));
    const percentage = (parseFloat(gpa) * 9.5).toFixed(2);

    setResults({
      gpa,
      credits: totalCredits,
      gradePoints: totalGradePoints.toFixed(2),
      percentage,
      performance,
      totalSubjects: subjects.length
    });
  };

  const resetCalculator = () => {
    setRegulation('');
    setCourse('');
    setSemester('');
    setSubjects([]);
    setSelectedGrades({});
    setResults(null);
  };

  const progress = subjects.length > 0 ? (Object.keys(selectedGrades).length / subjects.length) * 100 : 0;

  const themeColors = theme === 'dark' 
    ? 'from-blue-600 to-blue-500' 
    : 'from-blue-500 to-blue-400';

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-blue-50 via-blue-100 to-white'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
      
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <motion.div
          onClick={toggleTheme}
          className={`flex h-[50px] w-[100px] rounded-full p-[5px] shadow-lg cursor-pointer ${
            theme === 'dark' ? 'bg-slate-800/50 backdrop-blur-lg border border-white/10' : 'bg-white backdrop-blur-lg border border-blue-300 shadow-blue-200'
          } ${theme === 'light' && 'justify-end'}`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`flex h-[40px] w-[40px] items-center justify-center rounded-full ${
              theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-yellow-400 to-orange-400'
            }`}
            layout
            transition={spring}
          >
            <motion.div whileTap={{ rotate: 360 }} transition={{ duration: 0.3 }}>
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-white" />
              ) : (
                <Sun className="h-5 w-5 text-white" />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-blue-300'} rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-blue-300'} rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700`}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-5xl font-bold mb-2 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent' : 'bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent'}`}>
            Smart<span className="font-black">GPA</span>
          </h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-700'}>Calculate with Style</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { id: 'calculator', icon: Calculator, label: 'GPA Calculator' },
            { id: 'converter', icon: RefreshCw, label: 'CGPA Converter' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                activeSection === id
                  ? `bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg text-white ${theme === 'light' && 'shadow-blue-300'}`
                  : theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-white hover:bg-blue-50 text-gray-900 border border-blue-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Stats Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-md'} backdrop-blur-lg border rounded-2xl p-6 hover:transform hover:-translate-y-1 transition-all min-w-[280px]`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{results?.gpa || '0.00'}</div>
                <div className={theme === 'dark' ? 'text-slate-400 text-sm' : 'text-gray-600 text-sm'}>Current GPA</div>
              </div>
            </div>
          </div>
          <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-md'} backdrop-blur-lg border rounded-2xl p-6 hover:transform hover:-translate-y-1 transition-all`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{results?.totalSubjects || subjects.length || 0}</div>
                <div className={theme === 'dark' ? 'text-slate-400 text-sm' : 'text-gray-600 text-sm'}>Total Subjects</div>
              </div>
            </div>
          </div>
          <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-md'} backdrop-blur-lg border rounded-2xl p-6 hover:transform hover:-translate-y-1 transition-all`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{results?.performance || '-'}</div>
                <div className={theme === 'dark' ? 'text-slate-400 text-sm' : 'text-gray-600 text-sm'}>Performance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        {activeSection === 'calculator' && (
          <div className="space-y-6">
            {/* Selection Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-sm'} backdrop-blur-lg border rounded-2xl p-6`}>
                <label className={`block text-sm font-semibold mb-3 uppercase tracking-wide ${theme === 'dark' ? 'text-slate-300' : 'text-gray-800'}`}>
                  Regulation Year
                </label>
                <select
                  value={regulation}
                  onChange={(e) => { setRegulation(e.target.value); setCourse(''); setSemester(''); }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' 
                      : 'bg-white border-blue-200 text-gray-900 focus:border-blue-500'
                  } focus:ring-2 focus:ring-blue-500/20 transition-all`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}>Choose Year</option>
                  <option value="2018" className={theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}>2018</option>
                  <option value="2021" className={theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}>2021</option>
                </select>
              </div>
              <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-sm'} backdrop-blur-lg border rounded-2xl p-6`}>
                <label className={`block text-sm font-semibold mb-3 uppercase tracking-wide ${theme === 'dark' ? 'text-slate-300' : 'text-gray-800'}`}>
                  Course
                </label>
                <select
                  value={course}
                  onChange={(e) => { setCourse(e.target.value); setSemester(''); }}
                  disabled={!regulation}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 disabled:opacity-50' 
                      : 'bg-white border-blue-200 text-gray-900 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500'
                  } focus:ring-2 focus:ring-blue-500/20 transition-all`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}>Choose Course</option>
                  {regulation && Object.keys(regulations[regulation] || {}).map(c => (
                    <option key={c} value={c} className={theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}>{c}</option>
                  ))}
                </select>
              </div>
              <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-sm'} backdrop-blur-lg border rounded-2xl p-6`}>
                <label className={`block text-sm font-semibold mb-3 uppercase tracking-wide ${theme === 'dark' ? 'text-slate-300' : 'text-gray-800'}`}>
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  disabled={!course}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 disabled:opacity-50' 
                      : 'bg-white border-blue-200 text-gray-900 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500'
                  } focus:ring-2 focus:ring-blue-500/20 transition-all`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}>Choose Semester</option>
                  {course && Object.keys(regulations[regulation]?.[course] || {}).map(s => (
                    <option key={s} value={s} className={theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subjects Grid */}
            {subjects.length > 0 && (
              <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-md'} backdrop-blur-lg border rounded-2xl p-8`}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-4">Enter Your Grades</h3>
                  <div className={`w-full h-2 ${theme === 'dark' ? 'bg-white/5' : 'bg-blue-100'} rounded-full overflow-hidden`}>
                    <div
                      className={`h-full bg-gradient-to-r ${themeColors} transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {subjects.map((subject, index) => (
                    <div key={index} className={`${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-blue-500/50' : 'bg-blue-50/50 border-blue-200 hover:border-blue-400'} border rounded-xl p-4 transition-all`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-sm">{subject.subject}</span>
                        <span className={`px-3 py-1 bg-gradient-to-r ${themeColors} rounded-full text-xs font-semibold text-white`}>
                          {subject.credit} Credits
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(grades).map(grade => (
                          <button
                            key={grade}
                            onClick={() => handleGradeSelect(index, grade)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                              selectedGrades[index] === grade
                                ? `bg-gradient-to-r ${themeColors} shadow-lg text-white`
                                : theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-white hover:bg-blue-100 text-gray-900 border border-blue-200'
                            }`}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={calculateGPA}
                    className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${themeColors} rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-white`}
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate GPA
                  </button>
                  <button
                    onClick={resetCalculator}
                    className={`flex items-center gap-2 px-8 py-3 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-blue-200 hover:bg-blue-50'} border rounded-xl font-semibold transition-all`}
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* Results Panel */}
            {results && (
              <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-md'} backdrop-blur-lg border rounded-2xl p-8 animate-in slide-in-from-bottom-4`}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-4">Your Results</h3>
                  <div className={`text-7xl font-black bg-gradient-to-r ${themeColors} bg-clip-text text-transparent animate-pulse`}>
                    {results.gpa}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Credits', value: results.credits },
                    { label: 'Grade Points', value: results.gradePoints },
                    { label: 'Percentage', value: `${results.percentage}%` }
                  ].map(({ label, value }) => (
                    <div key={label} className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4 text-center`}>
                      <div className={theme === 'dark' ? 'text-slate-400 text-sm mb-1' : 'text-gray-600 text-sm mb-1'}>{label}</div>
                      <div className="text-2xl font-bold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Converter Section */}
        {activeSection === 'converter' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-md'} backdrop-blur-lg border rounded-2xl p-8`}>
              <h4 className="text-xl font-bold mb-4 text-center">CGPA to Percentage</h4>
              <input
                type="number"
                value={cgpaInput}
                onChange={(e) => setCgpaInput(e.target.value)}
                placeholder="Enter CGPA"
                min="0"
                max="10"
                step="0.01"
                className={`w-full px-4 py-3 rounded-xl border ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' 
                    : 'bg-white border-blue-200 text-gray-900 placeholder-gray-400'
                } focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4`}
              />
              <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-200'} border rounded-xl p-6 text-center`}>
                <div className={`text-3xl font-bold bg-gradient-to-r ${themeColors} bg-clip-text text-transparent`}>
                  {cgpaInput && !isNaN(cgpaInput) && cgpaInput >= 0 && cgpaInput <= 10
                    ? `${(parseFloat(cgpaInput) * 9.5).toFixed(2)}%`
                    : 'Enter CGPA to convert'}
                </div>
              </div>
            </div>
            <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-md'} backdrop-blur-lg border rounded-2xl p-8`}>
              <h4 className="text-xl font-bold mb-4 text-center">Percentage to CGPA</h4>
              <input
                type="number"
                value={percentageInput}
                onChange={(e) => setPercentageInput(e.target.value)}
                placeholder="Enter Percentage"
                min="0"
                max="100"
                step="0.01"
                className={`w-full px-4 py-3 rounded-xl border ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' 
                    : 'bg-white border-blue-200 text-gray-900 placeholder-gray-400'
                } focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4`}
              />
              <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-200'} border rounded-xl p-6 text-center`}>
                <div className={`text-3xl font-bold bg-gradient-to-r ${themeColors} bg-clip-text text-transparent`}>
                  {percentageInput && !isNaN(percentageInput) && percentageInput >= 0 && percentageInput <= 100
                    ? (parseFloat(percentageInput) / 9.5).toFixed(2)
                    : 'Enter percentage to convert'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Section */}
        {activeSection === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-md'} backdrop-blur-lg border rounded-2xl p-8 min-h-[300px]`}>
              <h4 className="text-xl font-bold mb-6 text-center">Grade Distribution</h4>
              <div className={`flex items-center justify-center h-48 border-2 border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-blue-200'} rounded-xl`}>
                <div className={`text-center ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Grade data will appear here</p>
                </div>
              </div>
            </div>
            <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-blue-200 shadow-md'} backdrop-blur-lg border rounded-2xl p-8 min-h-[300px]`}>
              <h4 className="text-xl font-bold mb-6 text-center">Performance Trend</h4>
              <div className={`flex items-center justify-center h-48 border-2 border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-blue-200'} rounded-xl`}>
                <div className={`text-center ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Trend data will appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPACalculator;