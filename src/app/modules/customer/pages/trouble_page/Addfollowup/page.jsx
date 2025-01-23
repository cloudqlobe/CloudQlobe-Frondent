import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Calendar, Phone, Mail, MessageSquare, User, Briefcase } from 'lucide-react';
import DashboardLayout from "../../dash_layout/page";
import axios from "axios";
import axiosInstance from "../../../../utils/axiosinstance";

const AddTroubleTicket = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [ticketDetails, setTicketDetails] = useState({
    customerId: "",
    companyId: "",
    ticketDescription: "",
    ticketMethod: "call",
    status: "pending",
    ticketCategory: "service",
    ticketTime: new Date(),
  });

  useEffect(() => {
    const fetchCustomerById = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found");
          return;
        }

        // Decode the token to extract customerId
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const customerId = decodedToken.id;

        // Fetch customer by customerId
        const response = await axiosInstance.get(`v3/api/customers/${customerId}`);
        setCustomers([response.data]); // Assuming you want to set customer data in the array
        
        setTicketDetails((prevDetails) => ({...prevDetails, customerId:customerId, companyId:response.data.customerId}))
      } catch (error) {
        console.error("Error fetching customer by ID:", error);
      }
    };

    fetchCustomerById();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ticketDetails",ticketDetails);
    
    try {
      const response = await axiosInstance.post("v3/api/troubleticket", ticketDetails);
      if (response.status === 201) {
        alert("Trouble Ticket added successfully!");
        window.location.href = "/Support_page"; // Redirect after successful submission
      } else {
        alert("Error adding Trouble Ticket.");
      }
    } catch (error) {
      console.error("Error submitting Trouble Ticket:", error);
      alert("Failed to submit Trouble Ticket.");
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Add Ticket</h2>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <label className="block mb-2 font-semibold text-gray-700">Select Customer</label>
            <div className="relative">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                value={selectedCustomer}
                onChange={(e) => {
                  const customer = customers.find(c => c._id === e.target.value);
                  setSelectedCustomer(e.target.value);
                  setTicketDetails({
                    ...ticketDetails,
                    customerId: customer._id,
                    companyId: customer.customerId,
                  });
                }}
              >
                <option value="">Select Company Name</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.companyName} ({customer.customerType})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Briefcase className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>

          {selectedCustomer && (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700">Please write your issue</label>
                <textarea
                  name="ticketDescription"
                  value={ticketDetails.ticketDescription}
                  onChange={handleInputChange}
                  placeholder="Enter Trouble Ticket description..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  required
                  rows="4"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Ticket Priority</label>
                  <div className="relative">
                    <select
                      name="ticketMethod"
                      value={ticketDetails.ticketMethod}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                      <option value="call">Call</option>
                      <option value="email">Email</option>
                      <option value="chat">Chat</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      {ticketDetails.ticketMethod === 'call' && <Phone className="h-5 w-5 text-blue-500" />}
                      {ticketDetails.ticketMethod === 'email' && <Mail className="h-5 w-5 text-blue-500" />}
                      {ticketDetails.ticketMethod === 'chat' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Ticket Category</label>
                  <div className="relative">
                    <select
                      name="ticketCategory"
                      value={ticketDetails.ticketCategory}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="service">Service Issue</option>
                      <option value="account">Account Issue</option>
                      <option value="other">Other Issue</option>
                      <option value="sale">Sales Issue</option>
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
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddTroubleTicket;
