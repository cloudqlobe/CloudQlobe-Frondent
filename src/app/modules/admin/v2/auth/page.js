import { useEffect, useState } from "react";
import { toast,ToastContainer } from 'react-toastify';
import axiosInstance from "../utils/axiosinstance";

const useAuth = () => {
    console.log("auth file");
    
    const [authState, setAuthState] = useState({
        isAuthenticated: null,
        isLoading: true
    });

    const checkAuth = async () => {
        try {
            const response = await axiosInstance.get(
                "/api/member/auth/check",
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('id')}`
                    }
                }
            );
            
            setAuthState({
                isAuthenticated: response.data.success || false,
                isLoading: false
            });
            
            if (response.data.success) {
                toast.success("Authentication successful");
            } else {
                toast.error(response.data.message || "Authentication failed");
            }
        } catch (error) {
            setAuthState({
                isAuthenticated: false,
                isLoading: false
            });
            
            if (error.response?.status !== 401) {
                toast.error(error.response?.data?.message || "Authentication error");
            }
        }
    };
    <ToastContainer/>

    useEffect(() => {
        checkAuth();
    }, []);

    return authState;
};

export default useAuth;