import { useState, useRef, useEffect } from "react";
import { Menu, X, Globe, LogOut, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  

  const dropdownRef = useRef(null);

  const menuRef = useRef(null);
  const languageRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
 

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleLanguageDropdown = () => setLanguageDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
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
  const navItemClasses = "text-white hover:text-orange-500 px-3 py-1 border border-transparent hover:scale-110 transition-all duration-200";
  const buttonBaseClasses = "flex items-center space-x-4 px-6 py-2 text-white rounded-md transition-all duration-200 hover:scale-110 hover:space-x-6";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#323F3F] shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="block hover:scale-110 transition-transform duration-200">
          <img src="/images/logohh.svg" alt="Cloudqlobe" width={150} height={40} className="h-12"/>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6" style={{paddingRight:"25%"}}>
       {/* Center Section */}
     
        <div className="hidden md:flex items-center space-x-0" style={{ marginRight: "1em" }}>
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
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <a href="/services/CC-Routes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                  CC Routes
                </a>
                <a href="/services/CLI-Voice-Termination" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                  CLI Voice Termination
                </a>
                <a href="/services/DID-Voice-Solutions" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
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
        {/* Desktop Language Dropdown */}
        <div className="relative" ref={languageRef}>
          <button onClick={toggleLanguageDropdown} className="flex items-center text-white hover:text-orange-500 px-4 py-1 border border-gray-400 bg-transparent rounded-md transition-all duration-200">
            <Globe size={20} className="mr-2" />
            {selectedLanguage}
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {["English", "German", "Spanish", "French", "Italian"].map((language) => (
                <button key={language} onClick={() => handleLanguageChange(language)}
                  className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 text-left">
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Authentication Buttons (Desktop) */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4" style={{paddingLeft:"61%"}}>
            <Link to="/register">
            <button className={`${buttonBaseClasses} bg-green-600 hover:bg-green-700`}>
            SIGNUP
              </button>
            </Link>
            <Link to="/login">
            <button className={`${buttonBaseClasses} bg-orange-400 hover:bg-orange-500`}>
                LOGIN
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden text-white">
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation Drawer */}
      <div ref={menuRef} className={`fixed top-0 right-0 h-full w-64 bg-[#323F3F] shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
        <button onClick={toggleMenu} className="p-4 text-white">
          <X size={24} />
        </button>
        <ul className="flex flex-col p-4 space-y-4">
          <Link to="/" className="text-white hover:text-orange-500">Home</Link>
          <Link to="/about" className="text-white hover:text-orange-500">About</Link>
          <Link to="/contact" className="text-white hover:text-orange-500">Contact</Link>
          <Link to="/pricing" className="text-white hover:text-orange-500">Pricing</Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`${navItemClasses} flex items-center`}
            >
              <span>Services</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <a href="/services/CC-Routes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                  CC Routes
                </a>
                <a href="/services/CLI-Voice-Termination" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                  CLI Voice Termination
                </a>
                <a href="/services/DID-Voice-Solutions" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                  DID Voice Solutions
                </a>
              </div>
            )}
          </div>

          {/* Mobile Language Dropdown */}
          <div className="relative">
            <button onClick={toggleLanguageDropdown} className="flex items-center text-white px-4 py-1 border border-gray-400 bg-transparent rounded-md transition-all duration-200">
              <Globe size={20} className="mr-2" />
              {selectedLanguage}
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {["English", "German", "Spanish", "French", "Italian"].map((language) => (
                  <button key={language} onClick={() => handleLanguageChange(language)}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200 text-left">
                    {language}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Authentication Buttons (Mobile) */}
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-orange-500">Dashboard</Link>
              <button onClick={handleLogout} className="text-white hover:text-red-500">Logout</button>
            </>
          ) : (
            <>
            <div className="flex items-center space-x-4">
            <Link to="/register">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
                SIGN UP
              </button>
            </Link>
            <Link to="/login">
              <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition duration-200">
                LOGIN
              </button>
            </Link>
          </div>
            </>
          )}
        </ul>

        
      </div>
    </nav>
  );
};

export default Header;