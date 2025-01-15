/* eslint-disable react/prop-types */

import { motion } from 'framer-motion';

const Heading = ({ children, className }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-4xl text-center font-bold mb-6 capitalize ${className}`}
    >
      <span className="bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">
        {children}
      </span>
    </motion.h1>
  );
};

export default Heading;

