import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Clock,
  Target,
  Sparkles,
  Home,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import AccessibleButton from './AccessibleButton';
import LoadingSpinner from './LoadingSpinner';
import SkipNavigation from './SkipNavigation';
import {
  useAnimationConfig,
  pageVariants,
  pageTransition,
  cardVariants,
  fadeVariants
} from '../utils/animations';

const SuggestionPage = () => {
  const navigate = useNavigate();
  const { shouldReduceMotion } = useAnimationConfig();
  const {
    currentActivity,
    isLoading,
    sessionStats,
    getNewSuggestion,
    acceptActivity,
    rejectActivity,
    resetSession,
    getSessionProgress,
    hasActivitiesRemaining
  } = useAppContext();

  useEffect(() => {
    // Get first suggestion if none exists
    if (!currentActivity && !isLoading && hasActivitiesRemaining()) {
      getNewSuggestion();
    }
  }, [currentActivity, isLoading, hasActivitiesRemaining, getNewSuggestion]);

  const handleAccept = () => {
    const activityId = acceptActivity();
    if (activityId) {
      navigate(`/tutorial/${activityId}`);
    }
  };

  const handleReject = () => {
    rejectActivity();
  };

  const handleReset = () => {
    resetSession();
  };

  const handleHome = () => {
    navigate('/');
  };

  const progress = getSessionProgress();

  // Remove the local variants since we're using the shared ones

  if (!hasActivitiesRemaining() && !currentActivity) {
    return (
      <>
        <SkipNavigation />
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4" role="main" id="main-content">
          <motion.div
            className="max-w-md mx-auto text-center text-white bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            role="dialog"
            aria-labelledby="completion-title"
            aria-describedby="completion-description"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-300" aria-hidden="true" />
            <h2 id="completion-title" className="text-3xl font-bold mb-4">Congratulations!</h2>
            <p id="completion-description" className="text-lg mb-6">
              You've seen all {progress.totalActivities} activities!
              Ready to start fresh?
            </p>
            <div className="space-y-3">
              <AccessibleButton
                onClick={handleReset}
                className="w-full px-6 py-3 flex items-center justify-center gap-2"
                variant="primary"
                ariaLabel="Reset session and start over with new activities"
              >
                <RotateCcw className="w-5 h-5" aria-hidden="true" />
                Start Over
              </AccessibleButton>
              <AccessibleButton
                onClick={handleHome}
                className="w-full px-6 py-3 flex items-center justify-center gap-2"
                variant="ghost"
                ariaLabel="Return to home page"
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                Home
              </AccessibleButton>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SkipNavigation />
      <motion.div
        className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-4"
        role="main"
        id="main-content"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition(shouldReduceMotion)}
      >
        {/* Header */}
        <header className="max-w-4xl mx-auto pt-6 pb-4">
          <nav className="flex justify-between items-center text-white" role="navigation" aria-label="Main navigation">
            <AccessibleButton
              onClick={handleHome}
              className="flex items-center gap-2 px-4 py-2"
              variant="ghost"
              ariaLabel="Return to home page"
            >
              <Home className="w-5 h-5" aria-hidden="true" />
              Home
            </AccessibleButton>

            <div className="text-center" role="status" aria-live="polite">
              <div className="text-sm opacity-80">Progress</div>
              <div className="font-semibold" aria-label={`${progress.shownCount} of ${progress.totalActivities} activities shown`}>
                {progress.shownCount} / {progress.totalActivities}
              </div>
            </div>

            <AccessibleButton
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2"
              variant="ghost"
              ariaLabel="Reset session and start over"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
              Reset
            </AccessibleButton>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                className="py-20"
                variants={fadeVariants(shouldReduceMotion)}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <LoadingSpinner
                  message="Finding your next inspiration..."
                  size="large"
                />
              </motion.div>
            ) : currentActivity ? (
              <motion.article
                key={currentActivity.id}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                variants={cardVariants(shouldReduceMotion)}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="article"
                aria-labelledby="activity-title"
                aria-describedby="activity-description"
              >
                {/* Activity Card */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4" role="group" aria-label="Activity details">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium" role="text">
                      {currentActivity.category}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1" role="text">
                      <Target className="w-4 h-4" aria-hidden="true" />
                      {currentActivity.difficulty}
                    </span>
                  </div>

                  <h2 id="activity-title" className="text-3xl font-bold text-gray-800 mb-4">
                    {currentActivity.title}
                  </h2>

                  <p id="activity-description" className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {currentActivity.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-8" role="group" aria-label="Activity requirements">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span aria-label={`Estimated time: ${currentActivity.estimatedTime}`}>
                        {currentActivity.estimatedTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" aria-hidden="true" />
                      <span aria-label={`${currentActivity.materials.length} materials needed`}>
                        {currentActivity.materials.length} materials needed
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4" role="group" aria-label="Activity response options">
                    <AccessibleButton
                      onClick={handleAccept}
                      className="flex-1 px-6 py-4 text-lg flex items-center justify-center gap-3 shadow-lg"
                      variant="success"
                      ariaLabel={`Accept ${currentActivity.title} and view tutorial`}
                    >
                      <ThumbsUp className="w-6 h-6" aria-hidden="true" />
                      Yes, let's do it!
                    </AccessibleButton>

                    <AccessibleButton
                      onClick={handleReject}
                      className="flex-1 px-6 py-4 text-lg flex items-center justify-center gap-3 shadow-lg"
                      variant="danger"
                      ariaLabel={`Reject ${currentActivity.title} and show another activity`}
                    >
                      <ThumbsDown className="w-6 h-6" aria-hidden="true" />
                      Show me something else
                    </AccessibleButton>
                  </div>
                </div>
              </motion.article>
          ) : null}
        </AnimatePresence>

          {/* Session Stats */}
          {sessionStats.totalShown > 0 && (
            <motion.aside
              className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              role="complementary"
              aria-labelledby="session-stats-title"
            >
              <h3 id="session-stats-title" className="sr-only">Session Statistics</h3>
              <div className="grid grid-cols-3 gap-4 text-sm" role="group" aria-label="Session statistics">
                <div>
                  <div className="font-semibold text-lg" aria-label={`${sessionStats.totalShown} activities shown`}>
                    {sessionStats.totalShown}
                  </div>
                  <div className="opacity-80">Shown</div>
                </div>
                <div>
                  <div className="font-semibold text-lg text-green-300" aria-label={`${sessionStats.acceptedCount} activities accepted`}>
                    {sessionStats.acceptedCount}
                  </div>
                  <div className="opacity-80">Accepted</div>
                </div>
                <div>
                  <div className="font-semibold text-lg text-red-300" aria-label={`${sessionStats.rejectedCount} activities rejected`}>
                    {sessionStats.rejectedCount}
                  </div>
                  <div className="opacity-80">Rejected</div>
                </div>
              </div>
            </motion.aside>
          )}
        </main>
      </motion.div>
    </>
  );
};

export default SuggestionPage;
