import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DashboardLayout from "../../layout/page";
import { AiOutlineFolderOpen, AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BsGraphUp, BsTools } from "react-icons/bs";
import axiosInstance from "../../utils/axiosinstance";
import adminContext from "../../../../../../context/page";
import { PickupTable, RequestsTable, VeiwPage, ViewPage } from "./table"; // Import the new component

const RequestsPage = () => {
  const { adminDetails } = useContext(adminContext);
  const [requests, setRequests] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [newRequest, setNewRequest] = useState({ category: "", priority: "", status: "" });
  const [did, setDID] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [enquiry, setEnquiry] = useState([])
  const [showPickupModal, setShowPickupModal] = useState(false);
  console.log(requests);

  useEffect(() => {
    const fetchData = async () => {
      if (!adminDetails?.id) return;

      try {
        const role = adminDetails.role
        const memberDataResponse = await axiosInstance.get(`api/member/${role}/${adminDetails.id}`);

        const response = await axiosInstance.get('api/member/enquiry');
        const didresponse = await axiosInstance.get('api/member/didNumber')
        const EnquiryData = response?.data.enquirys || [];
        const DIDData = didresponse?.data.didnumbers || [];

        const enquiryIds = JSON.parse(memberDataResponse.data.member.enquiry_ids || '[]');
        const didIds = JSON.parse(memberDataResponse.data.member.did_enquirie_ids || '[]');

        const member = {
          ...memberDataResponse.data.member,
          enquiry_ids: enquiryIds,
          did_enquirie_ids: didIds,
        };
        console.log(member);

        const filterEnquiry = (member.enquiry_ids || []).map((item) =>
          EnquiryData.find((enquiry) => enquiry.id === item.enquiryId)
        ).filter(Boolean);

        const filterDID = (member.did_enquirie_ids || []).map((item) =>
          DIDData.find((enquiry) => enquiry.id === item.didId)
        ).filter(Boolean);
        console.log(filterDID);
        setDID(filterDID)
        setEnquiry(filterEnquiry);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [adminDetails?.id]);
  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const filterByCategory = (category) => {
    console.log("category", category);

    if (category === 'Enquiry') {
      setRequests(enquiry)
    } else if (category === 'DID Numbers') {
      setRequests(did)
    }
    setActiveCategory(category);
  };

  const openModal = (id) => {
    if(activeCategory === 'Enquiry'){
      const selectedTest = enquiry.find((test) => test.id === id);
      console.log(selectedTest);
      setSelectedView(selectedTest)
      if (selectedTest) {
        setIsModalOpen(true);
      }
    }else if(activeCategory === 'DID Numbers'){
      const selectedTest = did.find((test) => test.id === id);
      console.log(selectedTest);
      setSelectedView(selectedTest)
      if (selectedTest) {
        setIsModalOpen(true);
      }      
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedView(null);
  };

  const handlePickupClick = (data) => {

    if (data.category === 'Enquiry') {
      setNewStatus(data.status);
      setSelectedTest(data)
    } else if (data.category === 'DID Numbers') {
      setNewStatus(data.status);
      setSelectedTest(data)
    }
    setShowPickupModal(true);
  };

  const handleCancel = () => {
    setShowPickupModal(false);
  };

  const handleUpdateStatus = async () => {
    if (selectedTest.category === 'Enquiry') {
      console.log(newStatus);
      
      const response = await axiosInstance.put(`api/member/updateEnquiryStatus/${selectedTest?.id}`, { newStatus });
      setRequests(prevRequests =>
        prevRequests?.map(test =>
          test.id === selectedTest.id ? { ...test, status: newStatus } : test
        )
      );
    } else if (selectedTest.category === 'DID Numbers') {
      const response = await axiosInstance.put(`api/member/updateDidStatus/${selectedTest?.id}`, { newStatus });
      setRequests(prevRequests =>
        prevRequests?.map(ticket =>
          ticket.id === selectedTest.id ? { ...ticket, status: newStatus } : ticket
        )
      );
    }
    setShowPickupModal(false);
  };

  const filteredRequests = requests?.filter((request) => {
    console.log(request);

    return (
      (activeCategory === "All" || request.category === activeCategory)
    );
  });

  const categoryCounts = {
    All: requests?.length,
    "Enquiry": enquiry.length,
    "DID Numbers": did.length,
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
            { category: "Enquiry", icon: <MdOutlineTaskAlt className="text-green-500" />, count: categoryCounts["Enquiry"] },
            { category: "DID Numbers", icon: <AiOutlineCheckCircle className="text-yellow-500" />, count: categoryCounts["DID Numbers"] },
          ]?.map(({ category, icon, count }) => (
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
        <RequestsTable
          activeCategory={activeCategory}
          filteredRequests={filteredRequests}
          openModal={openModal}
          handlePickupClick={handlePickupClick}
        />

      </div>
      <ViewPage
        isModalOpen={isModalOpen}
        selectedEnquiry={selectedView}
        activeCategory={activeCategory}
        closeModal={closeModal}
      />

      <PickupTable
        handleCancel={handleCancel}
        handleUpdateStatus={handleUpdateStatus}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        showPickupModal={showPickupModal}
      />
    </DashboardLayout>
  );
};

export default RequestsPage;