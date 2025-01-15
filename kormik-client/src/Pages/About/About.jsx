
import { motion } from "framer-motion";
import { CheckCircleIcon, UserGroupIcon, BriefcaseIcon } from "@heroicons/react/24/solid";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-slate-700 text-white min-h-screen flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative bg-slate-800 text-center py-16 px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-rose-500"
        >
          About Kormik
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-slate-300 mt-4 text-lg max-w-2xl mx-auto"
        >
          At Kormik, we empower businesses with state-of-the-art solutions that
          drive growth and innovation. From tailored strategies to advanced tools, 
          we are dedicated to building a better tomorrow, together.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-8"
        >
          <button className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition">
            Get in Touch
          </button>
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-semibold text-center text-rose-500 mb-8"
        >
          Our Core Values
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Value 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-sm bg-slate-800 p-6 rounded-lg shadow-md"
          >
            <UserGroupIcon className="h-12 w-12 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
            <p className="text-slate-300">
              Working together with our partners and clients is at the heart of
              everything we do.
            </p>
          </motion.div>

          {/* Value 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-sm bg-slate-800 p-6 rounded-lg shadow-md"
          >
            <BriefcaseIcon className="h-12 w-12 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Professionalism</h3>
            <p className="text-slate-300">
              Ensuring quality, integrity, and excellence in every solution we
              deliver.
            </p>
          </motion.div>

          {/* Value 3 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-sm bg-slate-800 p-6 rounded-lg shadow-md"
          >
            <CheckCircleIcon className="h-12 w-12 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-slate-300">
              Continuously evolving to provide cutting-edge tools and solutions
              for modern challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-800 py-16 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-semibold text-center text-rose-500 mb-8"
        >
          Meet Our Team
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Team Member 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xs bg-slate-700 p-6 rounded-lg shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1576110598658-096ae24cdb97?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-center">Jane Doe</h3>
            <p className="text-slate-300 text-center text-sm">
              CEO & Founder
            </p>
          </motion.div>

          {/* Team Member 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xs bg-slate-700 p-6 rounded-lg shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-center">John Smith</h3>
            <p className="text-slate-300 text-center text-sm">
              Lead Developer
            </p>
          </motion.div>

          {/* Team Member 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xs bg-slate-700 p-6 rounded-lg shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1656077727614-0ddda354698e?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-center">Emily Johnson</h3>
            <p className="text-slate-300 text-center text-sm">
              Marketing Specialist
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-900 py-8 text-center">
        <p className="text-slate-400 text-sm">
          © 2025 Kormik. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
};

export default About;
