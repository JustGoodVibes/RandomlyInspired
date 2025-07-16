import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Target, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AccessibleButton from './AccessibleButton';
import SkipNavigation from './SkipNavigation';
import PageWrapper from './PageWrapper';
import {
  useAnimationConfig,
  containerVariants,
  itemVariants,
  floatingVariants
} from '../utils/animations';

const LandingPage = () => {
  const navigate = useNavigate();
  const { shouldReduceMotion } = useAnimationConfig();

  const handleGetInspired = () => {
    navigate('/suggestions');
  };

  return (
    <>
      <SkipNavigation />
      <PageWrapper
        className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center px-4 py-8 sm:p-4"
        role="main"
        id="main-content"
      >
        <motion.div
          className="max-w-4xl mx-auto text-center text-white w-full"
          variants={containerVariants(shouldReduceMotion)}
          initial="hidden"
          animate="visible"
        >
          {/* Floating Icons - Hidden on mobile to prevent overlap */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
            <motion.div
              className="absolute top-20 left-4 sm:left-10 text-white/20"
              variants={floatingVariants(shouldReduceMotion, 0)}
              animate="animate"
            >
              <Sparkles size={24} className="sm:w-8 sm:h-8" />
            </motion.div>
            <motion.div
              className="absolute top-32 right-4 sm:right-20 text-white/20"
              variants={floatingVariants(shouldReduceMotion, 1)}
              animate="animate"
            >
              <Star size={20} className="sm:w-7 sm:h-7" />
            </motion.div>
            <motion.div
              className="absolute bottom-32 left-4 sm:left-20 text-white/20"
              variants={floatingVariants(shouldReduceMotion, 2)}
              animate="animate"
            >
              <Heart size={18} className="sm:w-6 sm:h-6" />
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-4 sm:right-10 text-white/20"
              variants={floatingVariants(shouldReduceMotion, 0.5)}
              animate="animate"
            >
              <Target size={22} className="sm:w-8 sm:h-8" />
            </motion.div>
          </div>

          {/* Main Content */}
          <motion.div variants={itemVariants(shouldReduceMotion)}>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent leading-tight"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              RandomlyInspired
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants(shouldReduceMotion)}>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Discover new hobbies, learn exciting skills, and embark on creative adventures.
              Let us inspire your next journey of growth and fun!
            </p>
          </motion.div>

          <motion.div variants={itemVariants(shouldReduceMotion)}>
            <AccessibleButton
              onClick={handleGetInspired}
              className="group bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl shadow-2xl hover:shadow-3xl flex items-center gap-2 sm:gap-3 mx-auto max-w-xs sm:max-w-none"
              ariaLabel="Start discovering new activities and hobbies"
              variant="secondary"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              <span className="whitespace-nowrap">Get Inspired!</span>
              <ArrowRight
                className={`w-5 h-5 sm:w-6 sm:h-6 ${shouldReduceMotion ? '' : 'group-hover:translate-x-1 transition-transform'}`}
                aria-hidden="true"
              />
            </AccessibleButton>
          </motion.div>

          <motion.div
            variants={itemVariants(shouldReduceMotion)}
            className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4 sm:px-0"
          >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 text-center">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 mx-auto" />
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">30+ Activities</h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">From cooking to crafts, sports to skills</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 text-center">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 mx-auto" />
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Step-by-Step</h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">Detailed tutorials for every activity</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 text-center sm:col-span-2 md:col-span-1">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 mx-auto" />
            <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">No Repeats</h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">Smart tracking prevents duplicate suggestions</p>
          </div>
          </motion.div>
        </motion.div>
      </PageWrapper>
    </>
  );
};

export default LandingPage;
