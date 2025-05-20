import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMoneyBillAlt, FaFileUpload, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { BiSolidUser } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../layout/page';
import axiosInstance from '../../../utils/axiosinstance';

const RechargeForm = () => {
  const [amount, setAmount] = useState('');
  const [transactionTime, setTransactionTime] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [accountAgent, setAccountAgent] = useState('');
  const [customerID, setCustomerId] = useState('');
  const [image, setImage] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [companyInput, setCompanyInput] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosInstance.get('api/member/fetchCompanyName');
        setCompanies(response.data.customers);
      } catch (err) {
        console.error(err.message);
        toast.error("Failed to load companies");
      }
    };
    fetchCompanies();
  }, []);

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
    setCustomerId(company.id);
    setShowDropdown(false);
    setFocusedIndex(-1);
  };

  const handleFileChange = (img) => {
    const selectedImage = img.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerID) {
      toast.error("Please select a company");
      return;
    }

    const formattedDate = new Date(transactionTime).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const fromData = new FormData();
    fromData.append('amount', amount);
    fromData.append('dateAndTime', formattedDate);
    fromData.append('referenceNo', referenceNo);
    fromData.append('accountAgent', accountAgent);
    fromData.append('UserId', customerID);
    fromData.append('image', image);
    fromData.append('companyName', companyInput);

    try {
      const response = await axiosInstance.post('api/member/Transactions', fromData);
      if (response.status === 201) {
        toast.success("Recharge Successful!");
        setAmount('');
        setTransactionTime('');
        setReferenceNo('');
        setAccountAgent('');
        setCustomerId('');
        setCompanyInput('');
        setImage(null);
      } else {
        toast.error('Failed to add Transaction');
      }
    } catch (error) {
      console.error('Error uploading Transactions', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit transaction");
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-1">
        <div className="flex w-full max-w-[90rem] bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Left Side Image Section */}
          <div className="w-1/2 bg-offwhite hidden lg:flex items-center justify-center">
            <img
              src="/images/Accountsrecharge.avif"
              alt="Side Image"
              className="w-3/4 h-auto object-cover mt-9"
            />
          </div>

          {/* Right Side Form Section */}
          <div className="w-full lg:w-1/2 p-10 bg-white">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
              <FaMoneyBillAlt className="mr-3 text-blue-500 text-4xl" /> Recharge Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name Search Section */}
              <div className="flex items-center space-x-4 relative">
                <BiSolidUser className="text-gray-600 text-2xl" />
                <div className="w-full relative">
                  <input
                    type="text"
                    value={companyInput}
                    onChange={(e) => {
                      setCompanyInput(e.target.value);
                      setFocusedIndex(-1);
                    }}
                    placeholder="Search company..."
                    onFocus={() => companyInput && setShowDropdown(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setFocusedIndex((prev) => (prev + 1) % filteredCompanies.length);
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setFocusedIndex((prev) => (prev - 1 + filteredCompanies.length) % filteredCompanies.length);
                      } else if (e.key === 'Enter' && focusedIndex >= 0) {
                        e.preventDefault();
                        handleCompanySelect(filteredCompanies[focusedIndex]);
                      }
                    }}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700">
                    <FaChevronDown className="text-blue-500" />
                  </div>
                  {showDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredCompanies.map((company, index) => (
                        <div
                          key={company.id}
                          className={`p-3 cursor-pointer hover:bg-gray-100 ${index === focusedIndex ? 'bg-gray-100' : ''}`}
                          onClick={() => handleCompanySelect(company)}
                          onDoubleClick={() => handleCompanySelect(company)}
                          onMouseEnter={() => setFocusedIndex(index)}
                        >
                          {company.companyName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <input type="hidden" value={customerID} />

              {/* Amount */}
              <div className="flex items-center space-x-4">
                <FaMoneyBillAlt className="text-gray-600 text-2xl" />
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Transaction Time */}
              <div className="flex items-center space-x-4">
                <FaCalendarAlt className="text-gray-600 text-2xl" />
                <input
                  type="datetime-local"
                  value={transactionTime}
                  onChange={(e) => setTransactionTime(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Reference No */}
              <div className="flex items-center space-x-4">
                <FaFileUpload className="text-gray-600 text-2xl" />
                <input
                  type="text"
                  placeholder="Enter Reference No"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Account Agent */}
              <div className="flex items-center space-x-4">
                <FaUserCircle className="text-gray-600 text-2xl" />
                <input
                  type="text"
                  placeholder="Enter Account Agent"
                  value={accountAgent}
                  onChange={(e) => setAccountAgent(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Screenshot Upload */}
              <div className="flex items-center space-x-4">
                <FaFileUpload className="text-gray-600 text-2xl" />
                <div className="flex flex-col w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default RechargeForm;