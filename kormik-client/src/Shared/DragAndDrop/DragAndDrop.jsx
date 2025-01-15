/* eslint-disable react/prop-types */
import { FileUploader } from 'react-drag-drop-files';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

const DragAndDrop = ({ fileTypes, name, label, placeholder, className, handler, children, file }) => {
  return (
    <FileUploader name={name} types={fileTypes} handleChange={handler}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-rose-400 capitalize">
          {label}
        </label>
        {!file && (
          <div
            className={`w-full cursor-pointer p-6 bg-slate-600 rounded-md border-2 border-dashed border-rose-400 text-slate-300 hover:bg-slate-500 transition-colors duration-200 flex flex-col items-center justify-center ${className}`}
          >
            <CloudArrowUpIcon className="h-12 w-12 text-rose-400 mb-2" />
            <p className="text-center">{placeholder}</p>
          </div>
        )}
        {children}
      </motion.div>
    </FileUploader>
  );
};

export default DragAndDrop;

