import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

const LogoutButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("v3/api/admin/adminToken", {
        withCredentials: true,
      });

      if (response.data.message === "Logged out successfully") {
        sessionStorage.removeItem("adminData");
        localStorage.removeItem('adminID')
        localStorage.removeItem('MemberadminID')
        navigate("/admin/signin");
        toast.success("Logged out successfully", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.", { position: "top-right" });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
      >
        Admin Menu
        <svg
          className={`size-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg dark:bg-neutral-800 dark:border dark:border-neutral-700">
        
          <a
            href="/admin/profile"
            className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            Profile
          </a>
          
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;