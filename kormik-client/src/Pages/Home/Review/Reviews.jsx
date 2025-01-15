/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import useAxiosForData from '../../../hooks/useAxiosForData/useAxiosForData';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import Loading from '../../../Shared/Loading/Loading';

function Reviews() {
  const [currentReview, setCurrentReview] = useState(0);
  const [reviews] = useAxiosForData('/reviews');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reviews.length > 0) {
      setLoading(false);
      const timer = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [reviews]);

  if (loading) {
    return <Loading type="spinner" size="md" text="Loading reviews..." />;
  }

  if (reviews.length === 0) {
    return <div className="text-center py-16 text-gray-600">No reviews available.</div>;
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="bg-gradient-to-r from-purple-700 to-indigo-700 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">
          What Our Users Say
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            {reviews[currentReview] && (
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-xl p-8"
              >
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full mr-4"
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${reviews[currentReview].name}`}
                    alt={reviews[currentReview].name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{reviews[currentReview].name}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < reviews[currentReview].rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">"{reviews[currentReview].description}"</p>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={prevReview}
            disabled={reviews.length < 2}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md disabled:opacity-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextReview}
            disabled={reviews.length < 2}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md disabled:opacity-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="flex justify-center mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`h-3 w-3 mx-1 rounded-full transition-colors duration-200 ${
                currentReview === index ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;

