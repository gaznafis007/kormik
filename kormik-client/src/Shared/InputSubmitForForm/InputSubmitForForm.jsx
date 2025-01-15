/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const InputSubmitForForm = ({ value, type }) => {
  return (
    <motion.input
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      value={value}
      className="mt-6 bg-rose-500 p-3 w-full capitalize text-white font-semibold rounded-md cursor-pointer hover:bg-rose-600 transition-colors duration-200"
    />
  );
};

export default InputSubmitForForm;

