
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';


const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="relative z-10 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Find Top Talent for Your 
              <span className="bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent"> Next Big Idea</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Connect with skilled freelancers and bring your projects to life on Kormik, 
              the premier marketplace for digital talent.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/signup" className="inline-flex items-center px-8 py-4 rounded-full bg-rose-500 text-white font-semibold text-lg hover:bg-rose-600 transition-colors duration-300">
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <img 
              src="https://cdn.dribbble.com/userupload/14791095/file/original-f7da5bf396be0d44ed38bd084cd5cb07.png?resize=1024x768&vertical=center" 
              alt="Freelancers collaborating" 
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.15"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
    </section>
  );
};

export default HeroSection;

