import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import Layout from "../../../layout/page";
import { Phone, Mail, MessageSquare, User, Briefcase } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFollowUpInAccounts = () => {
  const navigate = useNavigate();
  const [followUpDetails, setFollowUpDetails] = useState({
    customerId: "",
    companyId: "",
    followupDescription: "",
    followupMethod: "call",
    followupStatus: "Pending",
    followupCategory: "Accounts",
    followupTime: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFollowUpDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axiosInstance.post("api/member/createcustomerfollowups", followUpDetails);
    
    if (response.status === 201) {
      toast.success("Follow-up added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Navigate after a short delay to allow toast to be seen
      setTimeout(() => {
        navigate("/admin/account/followup");
      }, 1000);
    } else {
      toast.error("Error adding follow-up.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    console.error("Error submitting follow-up:", error);
    
    // Display specific error message if available
    const errorMessage = error.response?.data?.error || "Failed to submit follow-up.";
    
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,  // Longer display for errors
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

  return (
    <Layout>
      <div className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Add Follow-Up</h2>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <label className="block mb-2 font-semibold text-gray-700">Select Customer</label>
            <div className="relative">
              <input type="text"
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                name="customerId"
                value={followUpDetails.customerId}
                onChange={handleInputChange}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Briefcase className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">Follow-Up Description</label>
              <textarea
                name="followupDescription"
                value={followUpDetails.followupDescription}
                onChange={handleInputChange}
                placeholder="Enter follow-up description..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                required
                rows="4"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Follow-Up Method</label>
                <div className="relative">
                  <select
                    name="followupMethod"
                    value={followUpDetails.followupMethod}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="chat">Chat</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    {followUpDetails.followupMethod === 'call' && <Phone className="h-5 w-5 text-blue-500" />}
                    {followUpDetails.followupMethod === 'email' && <Mail className="h-5 w-5 text-blue-500" />}
                    {followUpDetails.followupMethod === 'chat' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Follow-Up Category</label>
                <div className="relative">
                  <select
                    name="followupCategory"
                    value={followUpDetails.followupCategory}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Accounts">Accounts</option>
                    <option value="General">General</option>
                    <option value="Leads">Leads</option>
                    <option value="Customers">Customers</option>
                    <option value="Carriers">Carriers</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Add Follow-Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddFollowUpInAccounts;
