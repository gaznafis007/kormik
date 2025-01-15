
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-700 text-white py-8"
    >
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-rose-500">Kormik</h1>
            <p className="text-slate-300 mt-2 text-sm">
              FInd best man to get your project done. Lets grow together.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-4 md:mb-0">
            <ul className="flex flex-wrap gap-4 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-white transition"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-slate-300 hover:text-white transition"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <a
                  href="/postJob"
                  className="text-slate-300 hover:text-white transition"
                >
                  Find Talent
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-slate-300 hover:text-rose-500 transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-rose-500 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-rose-500 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-rose-500 transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-600 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center text-sm">
          <p className="text-slate-400">© 2025 BrandName. All rights reserved.</p>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="text-slate-300 hover:text-white transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-300 hover:text-white transition"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
