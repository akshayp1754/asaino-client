import React, { useState, useEffect } from "react";
import LoginSignupModal from "../auth/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Navbar = ({ setIsLoginModalOpen, setIsUploadModalOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));




  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAuthenticated(!!sessionStorage.getItem("token"));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false); 
    setIsLoginModalOpen(true);
  };

  const handleUploadClick = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Please login to upload");
      setIsLoginModalOpen(true);
      return;
    }

    setIsUploadModalOpen(true);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Toggle dropdown menu
  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const openLoginModal = () => {
    console.log("openLoginModal triggered");
    setIsLoginModalOpen(true);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-transparent shadow-md py-2" : "bg-transparent py-4"
        } top-0 left-0`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  P
                </div>
                <span
                  className={`ml-2 text-xl font-bold ${
                    isScrolled ? "text-white" : "text-white"
                  }`}
                >
                  PixelShare
                </span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4"></div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative text-white flex items-center space-x-2 group">
                <FontAwesomeIcon icon={faUpload} className="text-lg" />
                <button onClick={handleUploadClick} className="relative">
                  Upload
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              </div>
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={openLoginModal}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 hover:bg-gray-100 transition duration-150 shadow-md border border-indigo-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={openLoginModal}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 shadow-md"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <button onClick={handleLogOut} className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition duration-150 shadow-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-md ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    : "text-black hover:bg-white hover:bg-opacity-10"
                } transition duration-150`}
              >
                {isMobileMenuOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
