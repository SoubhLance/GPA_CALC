# 🎓 SRM University GPA Calculator

A modern, responsive web application for calculating GPA, CGPA, and percentage conversions specifically designed for SRM University students following the 10-point grading system.

![SRM GPA Calculator](https://img.shields.io/badge/SRM-GPA%20Calculator-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 📊 **GPA Calculator**
- **Dynamic course management** - Add/remove courses with smooth animations
- **Real-time validation** - Instant feedback on input errors
- **Detailed results** - Shows GPA, total credits, and grade points
- **Auto-save functionality** - Preserves your data using localStorage
- **Keyboard shortcuts** - Quick actions for power users

### 🔄 **CGPA Converter**
- **CGPA to Percentage** conversion using SRM's official formula
- **Percentage to CGPA** conversion with real-time updates
- **Input validation** - Ensures values are within valid ranges
- **Smooth animations** - Enhanced user experience

### 🎨 **Modern UI/UX**
- **Dark theme** - Black and blue color scheme for reduced eye strain
- **Responsive design** - Works perfectly on all devices
- **Smooth animations** - Professional transitions and effects
- **Notification system** - Success, error, and warning alerts
- **Glassmorphism effects** - Modern visual design

## 🚀 Demo

[Live Demo](https://your-username.github.io/srm-gpa-calculator) | [View Screenshots](#screenshots)

## 🛠 Installation

### Quick Start
1. Clone the repository:
   ```
   git clone https://github.com/your-username/srm-gpa-calculator.git
   ```
2. Navigate to the project directory: 
```
cd srm-gpa-calculator
```
3. Open `index.html` in your web browser or serve it using a local server.

4. Visit `http://localhost:8000` in your browser

### File Structure
```
srm-gpa-calculator/
├── index.html 
├── styles.css
├── script.js
└── README.md
```


## 💻 Usage

### GPA Calculator
1. **Add Courses**: Click "➕ Add Course" to add new courses
2. **Enter Details**: Fill in course name, credits, and select grade
3. **Calculate**: Click "🧮 Calculate GPA" or press `Ctrl+Enter`
4. **View Results**: See your GPA, total credits, and grade points
5. **Reset**: Click "🔄 Reset" or press `Escape` to clear all data

### CGPA Converter
1. **Switch to Converter Tab**: Click "🔄 CGPA Converter"
2. **CGPA to Percentage**: Enter CGPA (0-10) to get percentage
3. **Percentage to CGPA**: Enter percentage (0-100) to get CGPA

### Keyboard Shortcuts
- `Ctrl/Cmd + Enter` - Calculate GPA
- `Escape` - Reset form
- `Ctrl/Cmd + N` - Add new course

## 🎯 SRM Grading System

The calculator uses SRM University's official 10-point grading system:

| Grade | Points | Description |
|-------|--------|-------------|
| O     | 10     | Outstanding |
| A+    | 9      | Excellent   |
| A     | 8      | Very Good   |
| B+    | 7      | Good        |
| B     | 6      | Above Average |
| C     | 5      | Average     |
| P     | 4      | Pass        |
| F     | 0      | Fail        |

### Conversion Formulas
- **CGPA to Percentage**: `Percentage = (CGPA - 0.5) × 10`
- **Percentage to CGPA**: `CGPA = (Percentage ÷ 10) + 0.5`

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No external dependencies
- **localStorage** - Data persistence

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- **Optimized animations** - 60fps smooth transitions
- **Efficient DOM manipulation** - Minimal reflows and repaints
- **localStorage caching** - Instant data restoration
- **Responsive images** - Optimized for all screen sizes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test on multiple browsers and devices
- Update documentation if needed

## 📝 Changelog

### v2.0.0 (Latest)
- ✨ Added dark theme with blue accents
- 🎨 Improved UI/UX with modern design
- 🔄 Enhanced converter functionality
- 📱 Better mobile responsiveness
- 🎯 Added keyboard shortcuts
- 💾 Implemented auto-save feature

### v1.0.0
- 🚀 Initial release
- 📊 Basic GPA calculator
- 🔄 CGPA converter
- 📱 Responsive design

## 🐛 Known Issues

- None currently reported

## 📋 TODO

- [ ] Add cumulative GPA calculation across semesters
- [ ] Export results to PDF
- [ ] Add grade prediction feature
- [ ] Implement dark/light theme toggle
- [ ] Add more university grading systems

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SRM University** for the grading system specifications
- **Students** who provided feedback and testing
- **Contributors** who helped improve the application

## 📞 Support

If you encounter any issues or have questions:

1. **Check the FAQ** in the [Wiki](https://github.com/soubhlance/srm-gpa-calculator/wiki)
2. **Search existing issues** in the [Issues](https://github.com/soubhlance/srm-gpa-calculator/issues) tab
3. **Create a new issue** if your problem isn't already reported
4. **Email**: studysadhu2022@gmail.com

## 🌟 Show Your Support

If this project helped you, please consider:
- ⭐ **Starring** the repository
- 🍴 **Forking** for your own modifications
- 📢 **Sharing** with your classmates
- 🐛 **Reporting** any bugs you find

---

**Made with ❤️ for SRM University students**

![Footer](https://img.shields.io/badge/Made%20with-❤️-red)
![SRM](https://img.shields.io/badge/For-SRM%20Students-blue)


