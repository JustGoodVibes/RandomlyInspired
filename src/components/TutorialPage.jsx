import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Target,
  CheckCircle,
  Circle,
  Package,
  BookOpen,
  Star,
  Home,
  RotateCcw
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityById } from '../data/activities';
import { useAppContext } from '../context/AppContext';
import AccessibleButton from './AccessibleButton';
import SkipNavigation from './SkipNavigation';
import PageWrapper from './PageWrapper';
import ConfettiAnimation from './ConfettiAnimation';
import {
  useAnimationConfig,
  containerVariants,
  itemVariants
} from '../utils/animations';

const TutorialPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shouldReduceMotion } = useAnimationConfig();
  const { getNewSuggestion } = useAppContext();
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showMaterials, setShowMaterials] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  const activity = getActivityById(parseInt(id));

  // Check if all steps are completed and trigger confetti
  const allStepsCompleted = activity && completedSteps.size === activity.steps.length;

  // Trigger confetti when all steps are completed (one-time celebration)
  useEffect(() => {
    if (allStepsCompleted && !hasTriggeredConfetti && activity.steps.length > 0) {
      setShowConfetti(true);
      setHasTriggeredConfetti(true);

      // Announce completion for screen readers
      const announcement = `Congratulations! You have completed all ${activity.steps.length} steps for ${activity.title}. Well done!`;

      // Create a temporary element for screen reader announcement
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'assertive');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);

      // Clean up the announcer after a delay
      setTimeout(() => {
        if (document.body.contains(announcer)) {
          document.body.removeChild(announcer);
        }
      }, 3000);
    }
  }, [allStepsCompleted, hasTriggeredConfetti, activity]);

  // Reset confetti trigger when steps are unchecked
  useEffect(() => {
    if (!allStepsCompleted && hasTriggeredConfetti) {
      setHasTriggeredConfetti(false);
    }
  }, [allStepsCompleted, hasTriggeredConfetti]);

  if (!activity) {
    return (
      <>
        <SkipNavigation />
        <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center p-4" role="main" id="main-content">
          <div className="text-center text-white max-w-md mx-auto" role="alert" aria-live="assertive">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Activity Not Found</h1>
            <p className="mb-4 text-sm sm:text-base leading-relaxed">The requested activity could not be found.</p>
            <AccessibleButton
              onClick={() => navigate('/')}
              className="px-6 py-3"
              variant="secondary"
              ariaLabel="Return to home page"
            >
              Go Home
            </AccessibleButton>
          </div>
        </div>
      </>
    );
  }

  const toggleStep = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const handleBackToSuggestions = () => {
    navigate('/suggestions');
  };

  const handleNewSuggestion = () => {
    getNewSuggestion();
    navigate('/suggestions');
  };

  const handleHome = () => {
    navigate('/');
  };

  const progressPercentage = (completedSteps.size / activity.steps.length) * 100;

  // Using shared animation variants

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <SkipNavigation />

      {/* Confetti Animation */}
      <ConfettiAnimation
        isActive={showConfetti}
        onComplete={() => setShowConfetti(false)}
        duration={3000}
        particleCount={60}
      />

      <PageWrapper
        className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
      >
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
            <nav className="flex items-center justify-between text-white" role="navigation" aria-label="Tutorial navigation">
              <AccessibleButton
                onClick={handleBackToSuggestions}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-sm sm:text-base"
                variant="ghost"
                ariaLabel="Go back to activity suggestions"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span className="hidden xs:inline">Back to Suggestions</span>
                <span className="xs:hidden">Back</span>
              </AccessibleButton>

              <div className="flex gap-2" role="group" aria-label="Navigation options">
                <AccessibleButton
                  onClick={handleNewSuggestion}
                  className="flex items-center gap-2 px-4 py-2"
                  variant="ghost"
                  ariaLabel="Get a new activity suggestion"
                >
                  <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  New Suggestion
                </AccessibleButton>

                <AccessibleButton
                  onClick={handleHome}
                  className="flex items-center gap-2 px-4 py-2"
                  variant="ghost"
                  ariaLabel="Return to home page"
                >
                  <Home className="w-5 h-5" aria-hidden="true" />
                  Home
                </AccessibleButton>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto p-4 sm:p-6 py-6 sm:py-8" id="main-content" role="main">
          <motion.div
            variants={containerVariants(shouldReduceMotion)}
            initial="hidden"
            animate="visible"
          >
            {/* Activity Header */}
            <motion.header
              className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6"
              variants={itemVariants(shouldReduceMotion)}
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4" role="group" aria-label="Activity details">
                <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium" role="text">
                  {activity.category}
                </span>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(activity.difficulty)}`} role="text">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" aria-hidden="true" />
                  {activity.difficulty}
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium" role="text">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" aria-hidden="true" />
                  {activity.estimatedTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {activity.title}
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                {activity.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-4" role="group" aria-labelledby="progress-label">
                <div className="flex justify-between items-center mb-2">
                  <span id="progress-label" className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500" aria-live="polite">
                    {completedSteps.size} / {activity.steps.length} steps completed
                  </span>
                </div>
                <div
                  className="w-full bg-gray-200 rounded-full h-2"
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`Tutorial progress: ${Math.round(progressPercentage)}% complete`}
                >
                  <motion.div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
                  />
                </div>
              </div>

              {allStepsCompleted && (
                <motion.div
                  className="bg-gradient-to-r from-green-50 to-purple-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 relative overflow-hidden"
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.3 }}
                  role="alert"
                  aria-live="polite"
                  aria-describedby="completion-description"
                >
                  <motion.div
                    animate={shouldReduceMotion ? {} : {
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Star className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-green-800 flex items-center gap-2">
                      Congratulations!
                      {!shouldReduceMotion && <span className="text-purple-600" aria-hidden="true">🎉</span>}
                    </h3>
                    <p id="completion-description" className="text-green-700 text-sm">
                      You've completed all {activity.steps.length} steps for {activity.title}. Great job!
                    </p>
                  </div>

                  {/* Subtle background animation for reduced motion users */}
                  {shouldReduceMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                    />
                  )}
                </motion.div>
              )}
            </motion.header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Materials Section */}
              <motion.aside
                className="lg:col-span-1"
                variants={itemVariants(shouldReduceMotion)}
                role="complementary"
                aria-labelledby="materials-heading"
              >
                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 sticky top-4">
                  <AccessibleButton
                    onClick={() => setShowMaterials(!showMaterials)}
                    className="flex items-center justify-between w-full mb-4 p-0 bg-transparent text-gray-800 hover:bg-transparent"
                    variant="ghost"
                    ariaLabel={`${showMaterials ? 'Hide' : 'Show'} materials list`}
                    aria-expanded={showMaterials}
                    aria-controls="materials-list"
                  >
                    <h2 id="materials-heading" className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                      <span className="leading-tight">Materials Needed</span>
                    </h2>
                    <motion.div
                      animate={{ rotate: shouldReduceMotion ? 0 : (showMaterials ? 180 : 0) }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                      aria-hidden="true"
                    >
                      <ArrowLeft className="w-5 h-5 transform rotate-90" />
                    </motion.div>
                  </AccessibleButton>

                  {showMaterials && (
                    <motion.ul
                      id="materials-list"
                      className="space-y-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      role="list"
                      aria-label="Required materials for this activity"
                    >
                      {activity.materials.map((material, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          role="listitem"
                        >
                          <Circle className="w-2 h-2 mt-2 text-purple-500 fill-current" aria-hidden="true" />
                          <span className="text-gray-700">{material}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </motion.aside>

              {/* Steps Section */}
              <motion.section
                className="lg:col-span-2"
                variants={itemVariants(shouldReduceMotion)}
                role="main"
                aria-labelledby="steps-heading"
              >
                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                  <h2 id="steps-heading" className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                    <span className="leading-tight">Step-by-Step Instructions</span>
                  </h2>

                  <div className="space-y-4" role="list" aria-label="Tutorial steps">
                    {activity.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          completedSteps.has(index)
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 bg-gray-50 hover:border-purple-300'
                        }`}
                        onClick={() => toggleStep(index)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleStep(index);
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        role="listitem"
                        tabIndex={0}
                        aria-pressed={completedSteps.has(index)}
                        aria-label={`Step ${index + 1}: ${step}. ${completedSteps.has(index) ? 'Completed' : 'Not completed'}. Press to toggle completion.`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1" aria-hidden="true">
                            {completedSteps.has(index) ? (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                                Step {index + 1}
                              </span>
                            </div>
                            <p className={`leading-relaxed ${
                              completedSteps.has(index) ? 'text-green-800' : 'text-gray-700'
                            }`}>
                              {step}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            </div>
          </motion.div>
        </main>
      </PageWrapper>
    </>
  );
};

export default TutorialPage;
