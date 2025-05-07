// src/components/Logout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { removeCookie } from "../../../../utils/cookieUtils";

const Logout = ({ buttonClasses }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    removeCookie("authToken"); // Remove token from cookies
    navigate("/");
  };

  return (
    <>
      {/* Optional Logo: <Logo /> */}
      <button
        onClick={handleLogout}
        className={`${buttonClasses} bg-red-600 hover:bg-red-700`}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </>
  );
};

export default Logout;
