import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      if (!adminDetails?.id) return; // Prevent fetching if adminDetails is not set
  
      try {
        const memberDataResponse = await axiosInstance.get(`v3/api/adminMember/supportMember/${adminDetails.id}`);
        const testDataResponse = await axiosInstance.get(`v3/api/tests`);
  
        // Ensure testDataResponse.data exists
        const testData = testDataResponse.data || [];
  
        // Filter test data based on testingDataId
        const filter = memberDataResponse.data.testingDataId.map((id) => 
          testData.find(test => test._id === id)
        );
        setTestData(filter)
        // console.log("Filtered Data:", filter);
        // console.log("Member Data Response:", memberDataResponse.data);
        // console.log("Test Data Response:", testDataResponse.data);
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
    if(category === 'Testing Requests')  {
      console.log("true");
      setRequests(testData)
    }  
    setActiveCategory(category);
  console.log(category);
  // console.log(requests);
  
  
  };

  const filteredRequests = requests.filter((request) => {
    console.log(request.category,activeCategory);
    
    return (
      (activeCategory === "All" || request.category === activeCategory)
    );
  });

  const categoryCounts = {
    All: requests.length,
    "Live Tickets": 2,
    "Solved Tickets": 2,
    "Trouble Tickets": 1,
    "Testing Requests": 1,
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
              className={`flex-1 bg-white text-gray-800 py-12 px-4 rounded-lg shadow-md transform transition-transform hover:bg-gray-200 hover:scale-105 ${
                activeCategory === category ? "bg-gray-300" : ""
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
                <th className="py-3 px-5">Request No</th>
                <th className="py-3 px-5">Work Tasks</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Priority</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="bg-gray-100">
                  <td className="py-3 px-5">{request.id}</td>
                  <td className="py-3 px-5">{request.title}</td>
                  <td className="py-3 px-5">{request.category}</td>
                  <td className="py-3 px-5">{request.priority}</td>
                  <td className="py-3 px-5">{request.testStatus}</td>
                  <td className="py-3 px-5">{request.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RequestsPage;
