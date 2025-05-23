import { useState, useRef, useEffect } from "react";
import {
  Globe,
  LogOut,
  LayoutDashboard,
  UserPlus,
  LogIn,
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dropdownRef = useRef(null);
  const languageRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleLanguageDropdown = () => setLanguageDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (languageRef.current && !languageRef.current.contains(event.target)) {
      setLanguageDropdownOpen(false);
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setLanguageDropdownOpen(false);
  };

  const handleLogout = () => {
    console.log("header");
    
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const navItemClasses =
    "text-white hover:text-orange-500 px-3 py-1 border border-transparent hover:scale-110 transition-all duration-200";
  const buttonBaseClasses =
    "flex items-center space-x-4 px-6 py-2 text-white rounded-md transition-all duration-200 hover:scale-110 hover:space-x-6";

  return (
    <nav className="flex justify-between items-center p-0 bg-[#323F3F] shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      {/* Left Section */}
      <div className="flex items-center " style={{ marginLeft: "1em" }}>
        <a
          href="/"
          className="block p-0 hover:scale-110 transition-all duration-200"
        >
          <img
            src="/images/logohh.svg"
            alt="Cloudqlobe"
            width={32}
            height={32}
            className="h-16 w-48"
          />
        </a>
      </div>
      {/* Mobile Menu Button */}
      <button className="md:hidden mx-3 text-white" onClick={toggleMenu}>
        <Menu size={28} />
      </button>

      {/* Mobile Menu */}

      {isMenuOpen && (
        <motion.div
          className="absolute top-16 right-0 w-full bg-[#323F3F] p-6 shadow-lg rounded-b-lg z-50 md:hidden flex flex-col space-y-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
        >
          {/* Navigation Links */}
          <a
            href="/"
            className="text-white text-lg font-medium hover:text-orange-500 transition"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-white text-lg font-medium hover:text-orange-500 transition"
          >
            About
          </a>
          <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="text-white hover:text-orange-500 flex items-center">
            Services
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <a href="/services/CC-Routes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">CC Routes</a>
              <a href="/services/CLI-Voice-Termination" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">CLI Voice Termination</a>
              <a href="/services/DID-Voice-Solutions" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">DID Voice Solutions</a>
            </div>
          )}
        </div>
          <a
            href="/contact"
            className="text-white text-lg font-medium hover:text-orange-500 transition"
          >
            Contact
          </a>
          <a
            href="/pricing"
            className="text-white text-lg font-medium hover:text-orange-500 transition"
          >
            Rates
          </a>
          <a
            href="/faq"
            className="text-white text-lg font-medium hover:text-orange-500 transition"
          >
            FAQ
          </a>

          {/* Authentication Links */}
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-white text-lg font-medium hover:text-orange-500 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/Registers"
                className="bg-green-600 text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Sign Up
              </a>
              <a
                href="/signIn"
                className="bg-orange-600 text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Login
              </a>
            </>
          )}
        </motion.div>
      )}

      {/* Center Section */}
      <div className="md:flex items-center space-x-1 hidden">
        <div
          className="hidden md:flex items-center space-x-0"
          style={{ marginRight: "1em" }}
        >
          <a href="/" className={navItemClasses}>
            <span>Home</span>
          </a>
          <a href="/about" className={navItemClasses}>
            <span>About</span>
          </a>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`${navItemClasses} flex items-center`}
            >
              <span>Services</span>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <a
                  href="/services/CC-Routes"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
                >
                  CC Routes
                </a>
                <a
                  href="/services/CLI-Voice-Termination"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
                >
                  CLI Voice Termination
                </a>
                <a
                  href="/services/DID-Voice-Solutions"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
                >
                  DID Voice Solutions
                </a>
              </div>
            )}
          </div>
          <a href="/contact" className={navItemClasses}>
            <span>Contact</span>
          </a>
          <a href="/pricing" className={navItemClasses}>
            <span>Rates</span>
          </a>
          <a href="/faq" className={navItemClasses}>
            <span>FAQ</span>
          </a>
        </div>
        <div className="relative md:flex hidden" ref={languageRef}>
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center text-white hover:text-orange-500 px-8 py-1 border border-gray-400 hover:border-orange-500 bg-transparent rounded-md hover:scale-110 transition-all duration-200"
          >
            <Globe size={20} className="mr-2" />
            {selectedLanguage}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {[
                "English",
                "German",
                "Spanish",
                "French",
                "Italian",
                "Chinese",
                "Japanese",
              ].map((language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageChange(language)}
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200 text-left"
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div
        className="md:flex items-center hidden space-x-3"
        style={{ marginRight: "1em" }}
      >
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">
              <button
                className={`${buttonBaseClasses} bg-blue-600 hover:bg-blue-700`}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className={`${buttonBaseClasses} bg-red-600 hover:bg-red-700`}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <a href="/Registers">
              <button
                className={`${buttonBaseClasses} bg-green-600 hover:bg-green-700`}
              >
                <UserPlus size={18} />
                <span>SIGN UP</span>
              </button>
            </a>
            <a href="/signIn">
              <button
                className={`${buttonBaseClasses} bg-orange-400 hover:bg-orange-500`}
              >
                <LogIn size={18} />
                <span>LOGIN</span>
              </button>
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
