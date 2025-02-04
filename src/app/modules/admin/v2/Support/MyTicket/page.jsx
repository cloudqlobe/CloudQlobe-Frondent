import React, { useContext, useEffect, useState } from "react";
import { SiBitcomet } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import DashboardLayout from "../../layout/page";
import { AiOutlineFolderOpen, AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineReportProblem, MdOutlineTaskAlt } from "react-icons/md";
import { BsGraphUp, BsTools } from "react-icons/bs";
import { RiTaskFill } from "react-icons/ri";
import axiosInstance from "../../utils/axiosinstance";
import adminContext from "../../../../../../context/page";

const RequestsPage = () => {
  const { adminDetails } = useContext(adminContext);
  const [requests, setRequests] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [newRequest, setNewRequest] = useState({ category: "", priority: "", status: "" });
  const [testData, setTestData] = useState([]);
  const [ratesData, setRatesData] = useState([]);
  const [cliRatesData, setCliRatesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [selectedTest, setSelectedTest] = useState('');

  const [showPickupModal, setShowPickupModal] = useState(false);
  // console.log("newStatus", newStatus);
  // console.log("selectedTest", selectedTest);

  // console.log(requests);

  useEffect(() => {
    const fetchData = async () => {
      if (!adminDetails?.id) return; // Prevent fetching if adminDetails is not set

      try {
        const memberDataResponse = await axiosInstance.get(`v3/api/adminMember/supportMember/${adminDetails.id}`);
        const testDataResponse = await axiosInstance.get(`v3/api/tests`);
        const ratesResponse = await axiosInstance.get("v3/api/rates");
        const cliRatesResponse = await axiosInstance.get(`v3/api/clirates`);

        // Ensure testDataResponse.data exists
        const testData = testDataResponse.data || [];

        // Filter test data based on testingDataId
        const filter = memberDataResponse.data.testingDataId.map((id) =>
          testData.find(test => test._id === id)
        );
        setTestData(filter)
        setRatesData(ratesResponse.data);
        setCliRatesData(cliRatesResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [adminDetails?.id]); // Only trigger effect when adminDetails.id is available


  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const filterByCategory = (category) => {
    if (category === 'Testing Requests') {
      setRequests(testData)
    }
    setActiveCategory(category);
  };

  const openModal = (testId) => {
    const selectedTest = testData.find((test) => test._id === testId);

    if (selectedTest && Array.isArray(selectedTest.rateId)) {
      const filteredRates =
        selectedTest.rateType === "CCRate"
          ? ratesData.filter((rate) => selectedTest.rateId.includes(rate._id))
          : cliRatesData.filter((rate) => selectedTest.rateId.includes(rate._id));

      setSelectedRate(filteredRates);
      setIsModalOpen(true);
      // console.log(filteredRates);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRate(null);
  };

  const handlePickupClick = (test) => {
    setNewStatus(test.testStatus);
    setSelectedTest(test)
    setShowPickupModal(true);
  };

  const handleCancel = () => {
    setShowPickupModal(false);
  };

  const handleUpdateStatus = async () => {
    const response = await axiosInstance.put(`v3/api/tests/${selectedTest?._id}`,{testStatus:newStatus});
    console.log("response",response);
    
    setRequests(prevRequests =>
      prevRequests.map(test =>
        test._id === selectedTest._id ? { ...test, testStatus: newStatus } : test
      )
    );
    setShowPickupModal(false);
  };

  const filteredRequests = requests.filter((request) => {
    return (
      (activeCategory === "All" || request.category === activeCategory)
    );
  });

  const categoryCounts = {
    All: requests.length,
    "Live Tickets": 2,
    "Solved Tickets": 2,
    "Trouble Tickets": 1,
    "Testing Requests": testData?.length ,
    "Special Tasks": 1,
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 text-gray-800">
        <h2 className="text-3xl text-gray-700 font-bold mb-6 flex items-center">
          <AiOutlineFolderOpen className="mr-3 text-4xl" /> Ticket Management
        </h2>

        {/* Search Area with Filters */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Search and Filter Requests</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Title"
              className="p-3 border rounded-lg w-1/4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="category"
              value={newRequest.category}
              onChange={handleInputChange}
              className="p-3 border rounded shadow-lg w-1/4"
            >
              <option value="">Category</option>
              <option value="Live Tickets">Live Tickets</option>
              <option value="Solved Tickets">Solved Tickets</option>
              <option value="Trouble Tickets">Trouble Tickets</option>
              <option value="Testing Requests">Testing Requests</option>
              <option value="Special Tasks">Special Tasks</option>
            </select>
            <select
              name="priority"
              value={newRequest.priority}
              onChange={handleInputChange}
              className="p-3 border rounded shadow-lg w-1/4"
            >
              <option value="">Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              name="status"
              value={newRequest.status}
              onChange={handleInputChange}
              className="p-3 border rounded shadow-lg w-1/4"
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transform transition-transform hover:scale-105 flex items-center">
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { category: "Total Tickets", icon: <BsGraphUp className="text-blue-600" />, count: categoryCounts["All"] },
            { category: "Live Tickets", icon: <MdOutlineTaskAlt className="text-green-500" />, count: categoryCounts["Live Tickets"] },
            { category: "Solved Tickets", icon: <AiOutlineCheckCircle className="text-yellow-500" />, count: categoryCounts["Solved Tickets"] },
            { category: "Trouble Tickets", icon: <MdOutlineReportProblem className="text-orange-500" />, count: categoryCounts["Trouble Tickets"] },
            { category: "Testing Requests", icon: <BsTools className="text-purple-600" />, count: categoryCounts["Testing Requests"] },
            { category: "Special Tasks", icon: <RiTaskFill className="text-red-500" />, count: categoryCounts["Special Tasks"] },
          ].map(({ category, icon, count }) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`flex-1 bg-white text-gray-800 py-12 px-4 rounded-lg shadow-md transform transition-transform hover:bg-gray-200 hover:scale-105 ${activeCategory === category ? "bg-gray-300" : ""
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-5xl">{icon}</span>
                <span className="text-lg">{category} ({count})</span>
              </div>
            </button>
          ))}
        </div>

        {/* Requests Table */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center">
              <tr>
                <th className='py-2 px-4'>Customer ID</th>
                <th className='py-2 px-4'>Company Name</th>
                <th className='py-2 px-4'>Service Engineer</th>
                <th className='py-2 px-4 text-center'>Status</th>
                <th className='py-2 px-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((customer, index) => (
                <tr
                  key={customer.testId}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className='py-2 px-4'>{customer.companyId}</td>
                  <td className='py-2 px-4'>{customer.companyName || "N/A"}</td>
                  <td className='py-2 px-4'>{customer.serviceEngineer || "NOC CloudQlobe"}</td>
                  <td className='py-2 px-4'>{customer.testStatus || "N/A"}</td>
                  <td className='py-2 px-4 text-right'>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2'
                      onClick={() => openModal(customer._id)}
                    >
                      View
                    </button>
                    <button
                      className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition'
                      onClick={() => handlePickupClick(customer)}
                    >
                      Pickup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedRate && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-2/3'>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center'>
                <SiBitcomet className='h-6 w-6 text-orange-500 mr-2' />
                <h3 className='text-xl font-default'>
                  Details for {selectedRate.companyName}
                </h3>
              </div>
              <button onClick={closeModal} className='text-gray-500 text-2xl'>
                &times;
              </button>
            </div>
            <div className='max-w-screen-xl mx-auto p-5'>
              <div className='min-w-full bg-white shadow-md rounded-lg'>
                <table className='min-w-full bg-white'>
                  <thead className='bg-indigo-500 text-white'>
                    <tr>
                      <th className='py-2 px-6 text-sm'>Country Code</th>
                      <th className='py-2 px-6 text-sm'>Country</th>
                      <th className='py-2 px-6 text-sm'>Price</th>
                      <th className='py-2 px-6 text-sm'>Description</th>
                      <th className='py-2 px-6 text-sm'>Profile</th>
                      <th className='py-2 px-6 text-sm'>Status</th>
                      <th className='py-2 px-6 text-sm'>Test Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {selectedRate.map((customer, customerIndex) => (
                      <tr
                        key={`${customer._id}-${customer._id}-${customerIndex}`}
                        className={
                          customerIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                        }>
                        <td className='py-2 px-6 text-sm'>
                          {customer?.countryCode || "N/A"}
                        </td>
                        <td className='py-2 px-6 text-sm'>
                          {customer?.country || "N/A"}
                        </td>
                        <td className='py-2 px-6 text-sm'>
                          {customer?.rate || "N/A"}
                        </td>
                        <td className='py-2 px-6 text-sm'>
                          {customer?.qualityDescription || "N/A"}
                        </td>
                        <td className='py-2 px-6 text-sm'>
                          {customer?.profile || "N/A"}
                        </td>
                        <td className='py-2 px-6 text-sm'>
                          {customer?.status || "N/A"}
                        </td>
                        <td className='py-2 px-6 text-sm'>
                          {customer?.testStatus || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPickupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white rounded-md p-6 w-1/3">
            <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Change Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="p-2 border rounded-md w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Process">Process</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RequestsPage;
