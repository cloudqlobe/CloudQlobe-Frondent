import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import {toast,ToastContainer} from 'react-toastify';
import axiosInstance from "../../utils/axiosinstance";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for showing password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const customerId = decoded.id;
          // Make an API call to check if the user is valid
          const response = await axiosInstance.get(`api/customer/${customerId}`); // Adjust the endpoint as needed
          // If the user exists in the database, redirect to the dashboard
          if (response.data) {
            navigate("/modules/customer/pages/home");
          }
        } catch (error) {
          console.error("User not authenticated or token is invalid", error);
        }
      }
    };
    
    checkAuthentication();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
  
    try {
      // Make the login request
      const response = await axiosInstance.post("api/login", {
        username,
        password,
      }, {
        withCredentials: true // Important for cookies
      });
      // Show success message
      toast.success("Login successful! Redirecting...");
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      // Show success toast with a small delay
      setTimeout(() => {
        toast.success("Successfully logged in!");
      }, 1500);
  
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";
      
      if (err.response) {
        switch (err.response.status) {
          case 400:
          case 401:
            errorMessage = "Invalid username or password";
            break;
          case 404:
            errorMessage = "User not found";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row bg-[#F7F5F4] md:p-8 rounded-lg  shadow-md max-w-6xl md:mx-auto md:mt-24 md:mb-8">
    <ToastContainer/>
      <div className="md:w-1/2 mb-8 md:mb-0 px-16 md:block hidden  ">
        <h1 className="text-3xl font-semibold mb-6">Sign In</h1>
        <img
          src="/images/15.svg"
          alt="Sign In Illustration"
          className="w-full h-auto"
        />
      </div>
      <div className="md:w-1/2 mt-5  md:ml-[43rem] md:mt-[-220px] p-5 md:p-0" >
      <p className="text-2xl font-bold font-serif mb-4 text-center block md:hidden">Login</p>
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              User ID
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 border rounded-md md:w-[20em] w-full "
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="mt-5" style={{ marginTop: "2em" }}>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border rounded-md w-full md:w-[20em]"
              required
              disabled={loading} // Disable input while loading
            />{" "}
            &nbsp;
            <button
              type="button"
              className="mt-2 text-sm text-gray-600 hover:underline focus:outline-none"
              onClick={() => setShowPassword(!showPassword)} // Toggle show password
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <button
            onClick={() => navigate('/Registers')}
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4">
          <a href="forgot-password" className="text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
      {/* Display loading spinner or progress indicator */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-grey bg-opacity-75">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-12 w-12"></div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
