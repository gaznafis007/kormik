/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
const TextArea = ({label, type, name, placeholder, handler, defaultValue, className}) => {
    return (
      <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2"
    >
      <label className="text-rose-400 font-semibold capitalize">{label}</label>
      <textarea
        onChange={handler}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full p-2 rounded-md bg-slate-700 text-white border border-slate-600 focus:border-rose-400 focus:ring focus:ring-rose-300 focus:ring-rose-opacity-50 ${className}`}
      ></textarea>
    </motion.div>
    );
};

export default TextArea;

