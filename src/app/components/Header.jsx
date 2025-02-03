import { useState, useRef, useEffect } from "react";
import { Globe, LogOut, LayoutDashboard, UserPlus, LogIn, Menu, X } from "lucide-react";
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
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-[#323F3F] shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      {/* Left Section */}
      <div className="flex items-center">
        <a href="/" className="block hover:scale-110 transition-all duration-200">
          <img src="/images/logohh.svg" alt="Cloudqlobe" width={32} height={32} className="h-16 w-48" />
        </a>
      </div>

      <button onClick={toggleMenu} className="lg:hidden text-white hover:text-orange-500 transition-all">
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className={`lg:flex hidden items-center space-x-6`}>
        <a href="/" className="text-white hover:text-orange-500">Home</a>
        <a href="/about" className="text-white hover:text-orange-500">About</a>
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
        <a href="/contact" className="text-white hover:text-orange-500">Contact</a>
        <a href="/pricing" className="text-white hover:text-orange-500">Rates</a>
        <a href="/faq" className="text-white hover:text-orange-500">FAQ</a>
      </div>

      <div className="relative" ref={languageRef}>
        <button
          onClick={toggleLanguageDropdown}
          className="flex items-center text-white hover:text-orange-500 px-4 py-1 border border-gray-400 hover:border-orange-500 rounded-md">
          <Globe size={20} className="mr-2" />
          {selectedLanguage}
        </button>
        {isLanguageDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
            {["English", "German", "Spanish", "French", "Italian", "Chinese", "Japanese"].map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">
                {language}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex items-center space-x-3">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center hover:bg-blue-700">
                <LayoutDashboard size={18} />
                <span className="ml-2">Dashboard</span>
              </button>
            </Link>
            <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded-md flex items-center hover:bg-red-700">
              <LogOut size={18} />
              <span className="ml-2">Logout</span>
            </button>
          </>
        ) : (
          <>
            <a href="/Registers">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md flex items-center hover:bg-green-700">
                <UserPlus size={18} />
                <span className="ml-2">SIGN UP</span>
              </button>
            </a>
            <a href="/signIn">
              <button className="bg-orange-400 text-white px-6 py-2 rounded-md flex items-center hover:bg-orange-500">
                <LogIn size={18} />
                <span className="ml-2">LOGIN</span>
              </button>
            </a>
          </>
        )}
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#323F3F] shadow-md lg:hidden opacity-90">
        <div className="flex flex-col space-y-3 py-4 px-6">
          <a href="/" className="text-white hover:text-orange-500">Home</a>
          <a href="/about" className="text-white hover:text-orange-500">About</a>
          <a href="/contact" className="text-white hover:text-orange-500">Contact</a>
          <a href="/pricing" className="text-white hover:text-orange-500">Rates</a>
          <a href="/faq" className="text-white hover:text-orange-500">FAQ</a>
      
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
      
          <div className="flex flex-col space-y-2">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center justify-center hover:bg-blue-700">
                    <LayoutDashboard size={18} />
                    <span className="ml-2">Dashboard</span>
                  </button>
                </Link>
                <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded-md flex items-center justify-center hover:bg-red-700">
                  <LogOut size={18} />
                  <span className="ml-2">Logout</span>
                </button>
              </>
            ) : (
              <>
                <a href="/Registers">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-md flex items-center justify-center hover:bg-green-700">
                    <UserPlus size={18} />
                    <span className="ml-2">SIGN UP</span>
                  </button>
                </a>
                <a href="/signIn">
                  <button className="bg-orange-400 text-white px-6 py-2 rounded-md flex items-center justify-center hover:bg-orange-500">
                    <LogIn size={18} />
                    <span className="ml-2">LOGIN</span>
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      
      )}
    </nav>
  );
};

export default Header;