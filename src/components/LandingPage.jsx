import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Target, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AccessibleButton from './AccessibleButton';
import SkipNavigation from './SkipNavigation';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetInspired = () => {
    navigate('/suggestions');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <SkipNavigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4" role="main" id="main-content">
      <motion.div
        className="max-w-4xl mx-auto text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 text-white/20"
            variants={floatingVariants}
            animate="animate"
          >
            <Sparkles size={32} />
          </motion.div>
          <motion.div
            className="absolute top-32 right-20 text-white/20"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
          >
            <Star size={28} />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-20 text-white/20"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
          >
            <Heart size={24} />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-white/20"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '0.5s' }}
          >
            <Target size={30} />
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div variants={itemVariants}>
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            RandomlyInspired
          </motion.h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Discover new hobbies, learn exciting skills, and embark on creative adventures. 
            Let us inspire your next journey of growth and fun!
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccessibleButton
            onClick={handleGetInspired}
            className="group bg-white text-purple-600 px-8 py-4 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto"
            ariaLabel="Start discovering new activities and hobbies"
            variant="secondary"
          >
            <Sparkles className="w-6 h-6" aria-hidden="true" />
            Get Inspired!
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </AccessibleButton>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Target className="w-8 h-8 mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">30+ Activities</h3>
            <p className="text-sm text-white/80">From cooking to crafts, sports to skills</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Heart className="w-8 h-8 mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Step-by-Step</h3>
            <p className="text-sm text-white/80">Detailed tutorials for every activity</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Star className="w-8 h-8 mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">No Repeats</h3>
            <p className="text-sm text-white/80">Smart tracking prevents duplicate suggestions</p>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </>
  );
};

export default LandingPage;
