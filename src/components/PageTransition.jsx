import React from "react";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className="w-full flex-1 flex flex-col items-center justify-start"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
