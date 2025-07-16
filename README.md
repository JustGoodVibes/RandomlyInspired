# 🌟 RandomlyInspired

**Discover new hobbies, learn exciting skills, and embark on creative adventures!**

RandomlyInspired is a beautiful, fully-accessible web application that randomly suggests new activities and hobbies for users to try, complete with detailed step-by-step tutorials.

🌐 **[Live Demo](https://justgoodvibes.github.io/RandomlyInspired/)** | 📱 **[Mobile Friendly](https://justgoodvibes.github.io/RandomlyInspired/)** | ♿ **[Accessibility Compliant](https://justgoodvibes.github.io/RandomlyInspired/)**

![RandomlyInspired Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC) ![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1-green) ![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue)

## ✨ Features

### 🎯 **Core Functionality**
- **Random Activity Generator**: Smart suggestion system with 30+ diverse activities
- **Session Tracking**: Avoids repeating suggestions during the current session
- **Interactive Tutorials**: Step-by-step instructions with progress tracking
- **User Response System**: Clear "Yes" and "No" options for each suggestion

### 🎨 **Design & UX**
- **Beautiful Interface**: Modern gradient backgrounds and smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for engaging interactions
- **Professional Typography**: Inter font family for excellent readability

### ♿ **Accessibility Features**
- **WCAG 2.1 Compliant**: Full screen reader support and keyboard navigation
- **ARIA Labels**: Comprehensive labeling for assistive technologies
- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **Focus Management**: Clear focus indicators and logical tab order
- **Skip Navigation**: Quick access to main content

### 📚 **Activity Database**
30+ carefully curated activities across multiple categories:
- **🎨 Arts & Crafts**: Watercolor painting, origami, candle making, knitting
- **🍳 Cooking**: Homemade pasta, sourdough bread, sushi, pizza
- **🏃 Sports & Fitness**: Rock climbing, skateboarding, cycling
- **🎵 Music & Performance**: Ukulele, moonwalk dance
- **🧠 Skills & Learning**: Juggling, card magic, sign language, astronomy
- **🌱 Wellness & Nature**: Meditation, gardening, geocaching
- **🔧 DIY & Building**: Birdhouse construction, terrarium building

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JustGoodVibes/RandomlyInspired.git
   cd RandomlyInspired
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Live Demo

🌐 **[Try RandomlyInspired Live](https://justgoodvibes.github.io/RandomlyInspired/)**

The application is deployed on GitHub Pages and fully functional with all features including:
- ✅ Random activity suggestions
- ✅ Interactive tutorials
- ✅ Session tracking
- ✅ Full accessibility support
- ✅ Responsive design

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: Local Storage

## 📱 User Journey

1. **Landing Page**: Welcome screen with inspiring design and "Get Inspired!" button
2. **Activity Suggestions**: Random activity display with detailed information
3. **Decision Making**: Accept to view tutorial or reject for new suggestion
4. **Tutorial Experience**: Step-by-step instructions with interactive progress tracking
5. **Session Management**: Smart tracking prevents duplicate suggestions

## 🎯 Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.jsx     # Welcome screen
│   ├── SuggestionPage.jsx  # Activity suggestions
│   ├── TutorialPage.jsx    # Step-by-step tutorials
│   ├── AccessibleButton.jsx # Accessible button component
│   ├── LoadingSpinner.jsx   # Loading states
│   └── SkipNavigation.jsx   # Accessibility navigation
├── context/             # React Context providers
│   └── AppContext.jsx      # Global state management
├── data/               # Application data
│   └── activities.js       # 30+ activity database
├── hooks/              # Custom React hooks
│   └── useSuggestionManager.js # Suggestion logic
└── App.jsx             # Main application component
```

## 🌟 Key Features in Detail

### Smart Suggestion System
- Tracks shown activities in session storage
- Prevents duplicate suggestions
- Provides session statistics
- Reset functionality for fresh start

### Comprehensive Tutorials
- Materials list for each activity
- Step-by-step instructions
- Interactive progress tracking
- Completion celebrations

### Accessibility First
- Screen reader compatible
- Keyboard navigation support
- High contrast ratios
- Semantic HTML structure

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern React and Tailwind CSS
- Accessibility guidelines from WCAG 2.1
- Icons provided by Lucide React
- Animations powered by Framer Motion

## 🚀 Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions. Every push to the main branch triggers a new deployment.

**Live Application**: [https://justgoodvibes.github.io/RandomlyInspired/](https://justgoodvibes.github.io/RandomlyInspired/)

### Deployment Process
1. Code is pushed to the main branch
2. GitHub Actions workflow builds the application
3. Built files are deployed to GitHub Pages
4. Application is live and accessible worldwide

---

**Ready to get inspired? [Try RandomlyInspired now!](https://justgoodvibes.github.io/RandomlyInspired/)** 🚀
