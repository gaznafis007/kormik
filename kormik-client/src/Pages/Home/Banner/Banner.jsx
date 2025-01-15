import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import freelanceOne from "../../../assets/freelance-lottie-1.json";
import freelanceTwo from "../../../assets/freelance-lottie-2.json";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-slate-700 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Content Section */}
          <motion.div 
            className="flex-1 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent">
                  Hire Top Talent
                </span>
                <br />
                <span className="text-white">For Your Next Project</span>
              </h1>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg text-gray-300 max-w-2xl"
            >
              Connect with skilled professionals across various fields and get your project 
              done faster and smarter. Whether you are looking for developers, designers, 
              writers, or marketers, we have the right talent ready to bring your ideas to life.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/postJob"
                  className="inline-flex items-center px-8 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-lg hover:bg-rose-600 transition-colors duration-300"
                >
                  Post Project
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-8 py-3 rounded-full border-2 border-rose-500 text-rose-500 font-semibold hover:bg-rose-500 hover:text-white transition-all duration-300"
                >
                  Find Project
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Animation Section */}
          <motion.div 
            className="flex-1 w-full md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Swiper
              className="h-[400px] w-full rounded-2xl shadow-2xl"
              effect="fade"
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Autoplay, Pagination, EffectFade]}
            >
              <SwiperSlide>
                <div className="bg-slate-800 rounded-2xl p-4">
                  <Lottie className="h-full" animationData={freelanceOne} />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-slate-800 rounded-2xl p-4">
                  <Lottie className="h-full" animationData={freelanceTwo} />
                </div>
              </SwiperSlide>
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;