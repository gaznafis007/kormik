/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const JobSpecification = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8"
    >
      <div className="flex items-center space-x-2 mb-2">
        <InformationCircleIcon className="h-5 w-5 text-rose-500" />
        <h3 className="text-rose-500 font-semibold capitalize">{title}</h3>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-white"
      >
        {children}
      </motion.p>
    </motion.div>
  );
};

export default JobSpecification;

