import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import axiosInstance from "../../utils/axiosinstance";

const Logout = ({ buttonClasses }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    try {
      await axiosInstance.post("/api/logout", null, {
        withCredentials: true,
      });

      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`${buttonClasses} bg-red-600 hover:bg-red-700 flex items-center gap-2`}
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
};

export default Logout;
