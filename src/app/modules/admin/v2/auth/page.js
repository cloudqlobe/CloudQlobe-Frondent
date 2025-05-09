// useAuth.js
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axiosInstance from "../utils/axiosinstance";

const useAuth = (role = 'user') => {
  console.log("user",role);
  
  const [authState, setAuthState] = useState({
    isAuthenticated: null,
    isLoading: true,
    userRole: null
  });

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get(
        `/auth/${role}/auth/check`,
        { withCredentials: true }
      );
      
      setAuthState({
        isAuthenticated: response.data.success,
        isLoading: false,
        userRole: role
      });
      
      if (!response.data.success) {
        toast.error(response.data.message || "Authentication failed");
      }
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userRole: null
      });
      
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || "Authentication error");
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, [role]);

  return authState;
};

export default useAuth;