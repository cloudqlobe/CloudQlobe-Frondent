import React, { useState, useEffect } from "react";
import { Phone, Mail, MessageSquare, User, ChevronDown } from 'lucide-react';
import axiosInstance from "../../../../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import Layout from "../../../layout/page";

const CreateTroubleTicket = () => {
  const navigate = useNavigate();
  const [companyInput, setCompanyInput] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ticketDetails, setTicketDetails] = useState({
    customerId: "",
    companyName: "",
    ticketCategory: "service",
    ticketDescription: "",
    followUpMethod: "call",
    status: "Pending",
    ticketPriority: 'Low',
    ticketTime: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosInstance.get('api/member/fetchCompanyName');
        setCompanies(response.data.customers);
        setLoading(false);
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Filter companies based on user input
  useEffect(() => {
    if (companyInput.trim() === "") {
      setFilteredCompanies([]);
      setShowDropdown(false);
      return;
    }

    const filtered = companies.filter(company =>
      company.companyName.toLowerCase().includes(companyInput.toLowerCase())
    );
    setFilteredCompanies(filtered);
    setShowDropdown(filtered.length > 0);
  }, [companyInput, companies]);

  const handleCompanySelect = (company) => {
    setCompanyInput(company.companyName);
    setTicketDetails(prev => ({
      ...prev,
      companyName: company.companyName,
      customerId: company.id
    }));
    setShowDropdown(false);
    setShowForm(true);
  };

  if (loading) {
    return <div>Loading companies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("api/member/createMember/customerTroubleTicket", ticketDetails);

      if (response.status === 201) {
        toast.success("Trouble Ticket added successfully!", {
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
          navigate("/admin/support/troubleTickets");
        }, 1000);
      } else {
        toast.error("Error adding Trouble-Ticket.", {
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
      console.error("Error submitting fTrouble-Ticket:", error);

      // Display specific error message if available
      const errorMessage = error.response?.data?.error || "Failed to submit Trouble-Ticket.";

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
    <>
      <Layout>
        <div className="min-h-screen p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Add Ticket</h2>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <label className="block mb-2 font-semibold text-gray-700">Company Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={companyInput}
                  onChange={(e) => {
                    setCompanyInput(e.target.value);
                    setShowForm(e.target.value.trim() !== "");
                  }}
                  placeholder="Search company..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  onFocus={() => companyInput && setShowDropdown(true)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-5 w-5 text-blue-500" />
                </div>
                {/* Dropdown with filtered companies */}
                {showDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCompanies.map((company) => (
                      <div
                        key={company.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCompanySelect(company)}
                      >
                       {company.companyName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                  <label className="block mb-2 font-semibold text-gray-700">Ticket Category</label>
                  <div className="relative">
                    <select
                      name="ticketCategory"
                      value={ticketDetails.ticketCategory}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      required
                    >
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

                <div className="mb-6">
                  <label className="block mb-2 font-semibold text-gray-700">Issue Description</label>
                  <textarea
                    name="ticketDescription"
                    value={ticketDetails.ticketDescription}
                    onChange={handleInputChange}
                    placeholder="Describe the issue in detail..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    required
                    rows="4"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Follow Up Method</label>
                    <div className="relative">
                      <select
                        name="followUpMethod"
                        value={ticketDetails.followUpMethod}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      >
                        <option value="call">Call</option>
                        <option value="email">Email</option>
                        <option value="chat">Chat</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        {ticketDetails.followUpMethod === 'call' && <Phone className="h-5 w-5 text-blue-500" />}
                        {ticketDetails.followUpMethod === 'email' && <Mail className="h-5 w-5 text-blue-500" />}
                        {ticketDetails.followUpMethod === 'chat' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Priority</label>
                    <div className="relative">
                      <select
                        name="ticketPriority"
                        value={ticketDetails.ticketPriority}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        required
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <User className="h-5 w-5 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                >
                  Submit Ticket
                </button>
              </form>
            )}
          </div>
        </div>
        <ToastContainer />
      </Layout>

    </>
  );
};

export default CreateTroubleTicket;