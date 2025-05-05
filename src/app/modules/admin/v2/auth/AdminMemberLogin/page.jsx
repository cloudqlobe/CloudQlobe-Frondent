import React, { useContext, useState } from "react";
// import Supreadmin from "./../../../../../rb_5425.png";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
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
    if (
      !formData.username ||
      !formData.password ||
      !formData.selectDepartment
    ) {
      return toast.error("Please fill in all fields");
    }

    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `api/member/${formData.selectDepartment}/login`,
        formData,
        { withCredentials: true }
      );
      sessionStorage.setItem(
        "adminData",
        JSON.stringify(response.data.adminData)
      );
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
    <div>
      <div class="font-[sans-serif] bg-gray-50">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 items-center lg:gap-10 gap-4">
          <div class="max-md:order-1 h-screen min-h-full">
            <img
              src="/images/AdminLogin.jpg"
              class="w-full h-full object-cover"
              alt="login-image"
            />
          </div>

          <form class="lg:col-span-2 max-w-lg w-full p-6 mx-auto">
            <div class="mb-12">
              <h3 class="text-gray-800 text-4xl font-extrabold">
                Member Sign in
              </h3>
            </div>

            <div>
              <label class="text-gray-800 text-sm block mb-2">username</label>
              <div class="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  class="bg-transparent w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter username"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div class="mt-8">
              <label class="text-gray-800 text-sm block mb-2">Password</label>
              <div class="relative flex items-center">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  required
                  class="bg-transparent w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />

                <span
                  class="absolute right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="mb-4 mt-8">
              <label
                htmlFor="selectDepartment"
                className="block text-sm font-medium text-gray-700"
              >
                Select Department:
              </label>
              <select
                id="selectDepartment"
                name="selectDepartment"
                value={formData.selectDepartment}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  -- Select a Department --
                </option>
                <option value="supportMember">Support Member</option>
                <option value="accountMember">Accounts Member</option>
                <option value="saleMember">Sales Member</option>
                <option value="carrierMember">Carriers Member</option>
                <option value="leadMember">Leads Member</option>
              </select>
              <div className="mt-1 text-sm text-red-600 hidden">
                Please select a department.
              </div>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  class="text-gray-800 ml-3 block text-sm"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div class="mt-8">
              <button
                type="button"
                class="w-full py-2.5 px-5 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminMemberSignInPage