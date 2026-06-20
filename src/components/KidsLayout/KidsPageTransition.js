import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0,
    x: -50,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.95,
    transition: {
      ease: "easeInOut",
      duration: 0.2
    }
  }
};

const KidsPageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default KidsPageTransition;
