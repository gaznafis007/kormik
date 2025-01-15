import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { EyeIcon, HeartIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

const Gallery = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Digital Art Portfolio",
      category: "Design",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      author: "Sarah Chen",
      price: 2500,
      likes: 128
    },
    {
      id: 2,
      title: "E-commerce Platform",
      category: "Development",
      image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?q=80&w=800&auto=format&fit=crop",
      author: "Mike Johnson",
      price: 8000,
      likes: 95
    },
    {
      id: 3,
      title: "Brand Identity",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=800&auto=format&fit=crop",
      author: "Emma Davis",
      price: 3500,
      likes: 210
    },
    {
      id: 4,
      title: "Mobile App UI",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop",
      author: "Alex Wong",
      price: 5000,
      likes: 152
    },
    {
      id: 5,
      title: "Marketing Campaign",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
      author: "Lisa Taylor",
      price: 4200,
      likes: 88
    },
    {
      id: 6,
      title: "3D Animation",
      category: "Animation",
      image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=800&auto=format&fit=crop",
      author: "David Park",
      price: 6800,
      likes: 176
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 relative">
        <motion.div
            className="absolute inset-0 bg-rose-500 rounded-full blur-3xl opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">
              Made on Kormik
            </span>
          </h2>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary projects crafted by talented professionals on our platform.
            From cutting-edge designs to innovative developments, experience the limitless possibilities with Kormik.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-2xl bg-slate-800 shadow-xl"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <AnimatePresence>
                {hoveredId === project.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent"
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-rose-400 text-sm font-semibold mb-2"
                      >
                        {project.category}
                      </motion.p>
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white text-2xl font-bold mb-3"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-between text-slate-300"
                      >
                        <span className="text-lg">{project.author}</span>
                        <span className="text-rose-400 font-semibold text-lg">${project.price.toLocaleString()}</span>
                      </motion.div>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <HeartIcon className="h-5 w-5 text-rose-500" />
                          <span className="text-slate-300">{project.likes}</span>
                        </div>
                        <Link
                          to={`/project/${project.id}`}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors duration-300"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Project
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link to="/jobs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white text-lg font-semibold shadow-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Explore More Projects</span>
              <CurrencyDollarIcon className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;

