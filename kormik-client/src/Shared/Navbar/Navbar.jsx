import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logOut().then(() => {
      toast.error("You are logged out");
    });
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Find Job", href: "/jobs" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <Logo/>
            <span className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent hidden md:inline">
              Kormik
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="relative group text-gray-200 hover:text-rose-500 transition-colors duration-300"
              >
                <span>{item.label}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-rose-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user?.uid ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-200 hover:text-rose-500 transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/postJob"
                  className="text-gray-200 hover:text-rose-500 transition-colors duration-300"
                >
                  Find Talents
                </Link>
                <button
                  onClick={handleLogOut}
                  className="px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="px-6 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600 transition-all duration-300 transform hover:scale-105"
              >
                Join Now
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-200 hover:text-rose-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-slate-700 border-t border-slate-600`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block px-3 py-2 rounded-md text-gray-200 hover:text-rose-500 hover:bg-slate-600 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
          {user?.uid ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-gray-200 hover:text-rose-500 hover:bg-slate-600 transition-colors duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/postJob"
                className="block px-3 py-2 rounded-md text-gray-200 hover:text-rose-500 hover:bg-slate-600 transition-colors duration-300"
              >
                Find Talent
              </Link>
              <button
                onClick={handleLogOut}
                className="w-full text-left px-3 py-2 rounded-md text-gray-200 hover:text-rose-500 hover:bg-slate-600 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="block px-3 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600 transition-colors duration-300"
            >
              Join Now
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;