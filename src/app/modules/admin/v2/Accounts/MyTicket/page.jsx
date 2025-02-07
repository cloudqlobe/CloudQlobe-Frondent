import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaMoneyCheckAlt, FaCreditCard, FaTasks, FaCogs, FaClipboardList } from "react-icons/fa";
import DashboardLayout from "../../layout/page";
import { FcElectroDevices, FcBarChart } from "react-icons/fc";
import { SiTask } from "react-icons/si";
import { HiChartSquareBar } from "react-icons/hi";
import { ImBooks, ImPodcast } from "react-icons/im";
import adminContext from "../../../../../../context/page";
import axiosInstance from "../../utils/axiosinstance";
import { PickupTable, RequestsTable } from "./table";

const RequestsPage = () => {
  const { adminDetails } = useContext(adminContext);
  const [requests, setRequests] = useState([]);
  const [recharge, setRecharge] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [newRequest, setNewRequest] = useState({ category: "", priority: "", status: "" });
  const [newStatus, setNewStatus] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [showPickupModal, setShowPickupModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (!adminDetails?.id) return;

      try {
        const memberDataResponse = await axiosInstance.get(`v3/api/adminMember/accountMember/${adminDetails.id}`);
        console.log("customer", memberDataResponse);

        //testData
        const testDataResponse = await axiosInstance.get(`v3/api/tests`);

        const rechargeRequestResponse = await axiosInstance.get(`v3/api/Allrecharge`);
        console.log("rechargeRequestResponse", rechargeRequestResponse.data.data);

        const rechargeRequestData = rechargeRequestResponse.data.data || [];
        const filterRechargeRequest = memberDataResponse.data.rechargeId.map((id) =>
          rechargeRequestData.find(ticket => ticket._id === id)
        );
        setRecharge(filterRechargeRequest)

        // const testData = testDataResponse.data || [];
        // const filter = memberDataResponse.data.testingDataId.map((id) =>
        //   testData.find(test => test._id === id)
        // );
        // setVendor(filter)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [adminDetails?.id]);

  const handlePickupClick = (test) => {
    if (test.category === "Recharge Request") {
      setNewStatus(test.status);
      setSelectedTest(test)
    } else if (test.category === "Vendor Payment") {
      setNewStatus(test.status);
      setSelectedTest(test)
    }
    setShowPickupModal(true);
  };

  const handleCancel = () => {
    setShowPickupModal(false);
  };

  const handleUpdateStatus = async () => {
    if(selectedTest.category === 'Recharge Request'){
      const response = await axiosInstance.put(`v3/api/updateRechargeData/${selectedTest?._id}`, { transactionStatus: newStatus });  
      setRequests(prevRequests =>
        prevRequests.map(test =>
          test._id === selectedTest._id ? { ...test, transactionStatus: newStatus } : test
        )
      );
    }
    //  else if(selectedTest.category === 'Vendor Payment'){
    //   const response = await axiosInstance.put(`v3/api/troubleticket/${selectedTest?._id}`, { status: newStatus });  
    //   setRequests(prevRequests =>
    //     prevRequests.map(ticket =>
    //       ticket._id === selectedTest._id ? { ...ticket, status: newStatus } : ticket
    //     )
    //   );
    // }
    setShowPickupModal(false);
  };

  const openModal = () => {

  }

  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const filterByCategory = (category) => {
    if (category === 'Recharge Request') {
      setRequests(recharge)
    } else if (category === 'Vendor Payment') {
      setRequests(vendor)
    }
    setActiveCategory(category);
  };

  const filteredRequests = requests.filter((request) => {
    return (
      (activeCategory === "All" || request.category === activeCategory)
    );
  });

  // Count the number of requests per category
  const categoryCounts = {
    All: requests.length,
    "Recharge Request": 2,
    "Vendor Payment": 1,
    "Overdraft": 1,
    "Private Rate": 0,
    "Special Tasks": 1,
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 text-gray-800">
        <h2 className="text-3xl text-gray-700 font-bold mb-6 flex items-center">
          <FcElectroDevices className="mr-3 text-4xl" /> Requests Management
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
              <option value="Recharge Request">Recharge Request</option>
              <option value="Vendor Payment">Vendor Payment</option>
              <option value="Overdraft">Overdraft</option>
              <option value="Private Rate">Private Rate</option>
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
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transform transition-transform hover:scale-105 flex items-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        </div>

        {/* Category Tabs (White background with grey hover effect, white text, and counts) */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { category: "Live Tickets", icon: <HiChartSquareBar className="text-blue-600" />, count: categoryCounts["All"] },
            { category: "Recharge Request", icon: <SiTask className="text-green-500" />, count: categoryCounts["Recharge Request"] },
            { category: "Vendor Payment", icon: <FaMoneyCheckAlt className="text-yellow-500" />, count: categoryCounts["Vendor Payment"] },
            { category: "Overdraft", icon: <FaCogs className="text-orange-500" />, count: categoryCounts["Overdraft"] },
            { category: "Private Rate", icon: <ImBooks className="text-purple-600" />, count: categoryCounts["Private Rate"] },
            { category: "Special Tasks", icon: <FaTasks className="text-red-500" />, count: categoryCounts["Special Tasks"] },
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
        {/* <div className="bg-white p-6 shadow-lg rounded-lg">
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
              {filteredRequests.map((request, index) => (
                <tr
                  key={request.id}
                  className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <td className="py-3 px-5">{request.id}</td>
                  <td className="py-3 px-5">{request.title}</td>
                  <td className="py-3 px-5">{request.category}</td>
                  <td className="py-3 px-5">{request.priority}</td>
                  <td className="py-3 px-5">{request.status}</td>
                  <td className="py-3 px-5">{request.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <RequestsTable
          activeCategory={activeCategory}
          filteredRequests={filteredRequests}
          openModal={openModal}
          handlePickupClick={handlePickupClick}
        />

        <PickupTable
          handleCancel={handleCancel}
          handleUpdateStatus={handleUpdateStatus}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          showPickupModal={showPickupModal}
        />
      </div>
    </DashboardLayout>
  );
};

export default RequestsPage;