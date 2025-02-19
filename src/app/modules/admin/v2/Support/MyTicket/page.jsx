import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DashboardLayout from "../../layout/page";
import { AiOutlineFolderOpen, AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineReportProblem, MdOutlineTaskAlt } from "react-icons/md";
import { BsGraphUp, BsTools } from "react-icons/bs";
import { RiTaskFill } from "react-icons/ri";
import axiosInstance from "../../utils/axiosinstance";
import adminContext from "../../../../../../context/page";
import { PickupTable, RequestsTable, VeiwPage } from "./table"; // Import the new component

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
  const [troubleTicket, setTroubleTicket] = useState([])
  const [showPickupModal, setShowPickupModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!adminDetails?.id) return;

      try {
        const memberDataResponse = await axiosInstance.get(`api/member/support/${adminDetails.id}`);
        //testData
        const testDataResponse = await axiosInstance.get(`api/member/tests`);
        const ratesResponse = await axiosInstance.get("api/admin/ccrates");
        const cliRatesResponse = await axiosInstance.get(`api/admin/clirates`);

        const troubleTicketResponse = await axiosInstance.get(`api/member/troubleticket`);
        const troubleTicketData = troubleTicketResponse?.data.troubletickets || [];

        const ticketId = JSON.parse(memberDataResponse.data.member.troubleTicketId)
        const member = {
          ...memberDataResponse.data.member,
          troubleTicketId:ticketId
        }

        const filterTroubleTicket = (member.troubleTicketId || []).map((id) =>
          troubleTicketData.find((ticket) => ticket.id === id.troubleTicketId)
        ).filter(Boolean); // Remove null values
            
        setTroubleTicket(filterTroubleTicket)        


        const testId = JSON.parse(memberDataResponse.data.member.testingDataId)
        const memberData = {
          ...memberDataResponse.data.member,
          testingDataId:testId
        }

        const testData = testDataResponse?.data.testData || [];
        const filter = memberData.testingDataId?.map((id) => {
          const matchedTest = testData.find((test) => test.id === id.testId);
        
          if (matchedTest && matchedTest.rateId) {
            try {
              matchedTest.rateId = JSON.parse(matchedTest.rateId);
            } catch (error) {
              console.error("Error parsing rateId:", error);
              matchedTest.rateId = []; // Set to empty array if parsing fails
            }
          }
        
          return matchedTest;
        });
        
        setTestData(filter)
        setRatesData(ratesResponse.data.ccrates);
        setCliRatesData(cliRatesResponse.data.clirates)
        
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
    if (category === 'Testing Requests') {
      setRequests(testData)
    } else if (category === 'Trouble Tickets') {
      setRequests(troubleTicket)    
    }
    setActiveCategory(category);
  };

  const openModal = (testId) => {

    const selectedTest = testData.find((test) => test.id === testId);
    if (selectedTest && Array.isArray(selectedTest.rateId)) {

      // Extract rate IDs from selectedTest.rateId
      const rateIds = selectedTest.rateId?.map((rate) => rate._id);
  
      const filteredRates =
        selectedTest.rateType === "CCRate"
          ? ratesData.filter((rate) => rateIds.includes(rate._id))
          : cliRatesData.filter((rate) => rateIds.includes(rate._id));
  
      setSelectedRate(filteredRates);  
      setIsModalOpen(true);
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRate(null);
  };

  const handlePickupClick = (test) => {
    
    if(test.category === 'Testing Requests'){
      setNewStatus(test.testStatus);
      setSelectedTest(test)
    }else if(test.category === 'Trouble Tickets'){
      setNewStatus(test.status);
      setSelectedTest(test)
    }
    setShowPickupModal(true);
  };

  const handleCancel = () => {
    setShowPickupModal(false);
  };

  const handleUpdateStatus = async () => {  
    if(selectedTest.category === 'Testing Requests'){
      const response = await axiosInstance.put(`api/member/teststatus/${selectedTest?.id}`, { newStatus });  
      setRequests(prevRequests =>
        prevRequests?.map(test =>
          test.id === selectedTest.id ? { ...test, testStatus: newStatus } : test
        )
      );
    } else if(selectedTest.category === 'Trouble Tickets'){
      const response = await axiosInstance.put(`api/member/troubleticketstatus/${selectedTest?.id}`, { status: newStatus });  
      setRequests(prevRequests =>
        prevRequests?.map(ticket =>
          ticket.id === selectedTest.id ? { ...ticket, status: newStatus } : ticket
        )
      );   
    }
    setShowPickupModal(false);
  };

  const filteredRequests = requests?.filter((request) => {
    return (
      (activeCategory === "All" || request.category === activeCategory)
    );
  });

  const categoryCounts = {
    All: requests?.length,
    "Live Tickets": 0,
    "Solved Tickets": 0,
    "Trouble Tickets": troubleTicket?.length || 0,
    "Testing Requests": testData?.length || 0,
    "Special Tasks": 0,
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
      <VeiwPage
        isModalOpen={isModalOpen}
        selectedRate={selectedRate}
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