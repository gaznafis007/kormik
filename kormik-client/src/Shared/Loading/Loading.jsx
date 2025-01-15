/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const variants = {
  spinner: {
    animate: {
      rotate: 360
    },
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 1
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.5, 1]
    },
    transition: {
      repeat: Infinity,
      duration: 1.5
    }
  },
  dots: {
    animate: {
      y: ["0%", "-50%", "0%"]
    },
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "easeInOut"
    }
  }
};

const Loading = ({ type, size, text }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return (
          <motion.div
            className={`border-4 border-slate-300 border-t-rose-500 rounded-full ${sizeClasses[size]}`}
            variants={variants.spinner}
            animate="animate"
          />
        );
      case "pulse":
        return (
          <motion.div
            className={`bg-rose-500 rounded-full ${sizeClasses[size]}`}
            variants={variants.pulse}
            animate="animate"
          />
        );
      case "dots":
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className={`bg-rose-500 rounded-full ${size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"}`}
                variants={variants.dots}
                animate="animate"
                transition={{ delay: index * 0.2 }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderLoader()}
      {text && (
        <p className="text-slate-300 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;

