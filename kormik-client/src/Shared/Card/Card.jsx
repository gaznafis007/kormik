/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
const Card = ({ title, children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl text-rose-400 font-semibold font-sans capitalize mb-3"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-slate-200 font-sans leading-relaxed"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Card;
