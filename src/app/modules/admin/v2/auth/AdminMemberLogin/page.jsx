import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import adminContext from "../../../../../../context/page";
import axiosInstance from "../../utils/axiosinstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminMemberSignInPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    selectDepartment: "",
  });

  const { setAdminDetails } = useContext(adminContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (!formData.username || !formData.password || !formData.selectDepartment) {
      return toast.error("Please fill in all fields");
    }

    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `api/member/${formData.selectDepartment}/login`,
        formData,
        { withCredentials: true }
      );
      sessionStorage.setItem("adminData", JSON.stringify(response.data.adminData));
      setAdminDetails(response.data.adminData);
      setFormData({
        username: "",
        password: "",
        selectDepartment: "",
      });
      navigate("/admin/dashboard");
      toast.success("Successfully Member Login");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("This Customer Not Found!");
        } else if (error.response.status === 401) {
          toast.error("Incorrect Password 🔐");
        } else if (error.response.status === 403) {
          toast.error("Unauthorized Department Access 🚫");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800">Member Sign In</h3>
        </div>

        <form className="space-y-6" autoComplete="off">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="selectDepartment"
              value={formData.selectDepartment}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a Department</option>
              <option value="supportMember">Support Member</option>
              <option value="accountMember">Accounts Member</option>
              <option value="saleMember">Sales Member</option>
              <option value="carrierMember">Carriers Member</option>
              <option value="leadMember">Leads Member</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default AdminMemberSignInPage;