import React, { useContext, useEffect, useState } from "react";
import { SiVitest, SiBitcomet } from "react-icons/si";
import DashboardLayout from "../../layout/page";
import axiosInstance from "../../utils/axiosinstance";
import adminContext from "../../../../../../context/page";

const TestingPage = () => {
  const { adminDetails } = useContext(adminContext)
  const [testsData, setTestsData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [ratesData, setRatesData] = useState([]);
  const [cliRatesData, setCliRatesData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("total");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  // console.log("filteredData", filteredData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersResponse, testsResponse, ratesResponse, cliRatesResponse] = 
          await Promise.all([
            axiosInstance.get("api/customers"),
            axiosInstance.get("api/testrates"),
            axiosInstance.get("api/admin/ccrates"),
            axiosInstance.get("api/admin/clirates"),
          ]);
  
        // Ensure data exists before processing
        const customersData = customersResponse.data?.customer || [];
        const testsData = testsResponse.data?.testrate || [];
        const ratesData = ratesResponse.data?.ccrates || [];
        const cliRatesData = cliRatesResponse.data?.clirates || [];
  
        // Safe parsing of rateId
        const parsedRates = testsData.map(test => ({
          ...test,
          rateId: safeJsonParse(test.rateId) // Use helper function to prevent errors
        }));
  
        // Update state
        setCustomersData(customersData);
        setTestsData(parsedRates);
        setRatesData(ratesData);
        setCliRatesData(cliRatesData);
  
        console.log("testsData", parsedRates);
        console.log("customersData", customersData);
        console.log("ratesData", ratesData);
        console.log("cliRatesData", cliRatesData);
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  // Helper function to safely parse JSON
  const safeJsonParse = (str) => {
    try {
      return str ? JSON.parse(str) : []; // Return empty array if parsing fails
    } catch (e) {
      console.error("Invalid JSON format:", str);
      return []; // Return empty array on error
    }
  };
  

  const applyFilters = () => {
    let filtered = testsData
    .map((test) => {
      const customer = customersData.find((customer) => customer?.id == test.customerId);
  
      if (!customer) return null; // Ensure customer exists before proceeding
  console.log(adminDetails.role);
  
      if (adminDetails.role === "support" || adminDetails.role === "superAdmin") {
        return {
          ...customer,
          testId: test.id,
          testStatus: test.testStatus,
          serviceEngineer: test.serviceEngineer,
        };
      } else if (test.serviceEngineer ===  "NOC CloudQlobe") { //"NOC CloudQlobe"||
        return {
          ...customer,
          testId: test.id,
          testStatus: test.testStatus,
          serviceEngineer: test.serviceEngineer,
        };
      }
  
      return null; // Explicitly return null if no condition matches
    })
    .filter(Boolean); // Remove null values
  
    if (activeTab === "initiated") {
      filtered = filtered.filter(
        (customer) => customer.testStatus === "Initiated"
      );
    } else if (activeTab === "failed") {
      filtered = filtered.filter(
        (customer) => customer.testStatus === "Failed"
      );
    }

console.log("filtered",filtered);

    if (filterStatus) {
      filtered = filtered.filter(
        (customer) => customer.testStatus === filterStatus
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.companyName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          customer.customerId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
console.log("filtered",filtered);

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [activeTab, filterStatus, searchTerm, testsData, customersData]);

  const openModal = (testId) => {
    console.log("testId for the specific row", testId);
    const selectedTest = testsData.find((test) => test.id === testId);
    console.log("selectedTest", selectedTest);
    
    if (selectedTest && Array.isArray(selectedTest.rateId)) {
      // Extract all _id values from rateId array
      const rateIds = selectedTest.rateId.map((rate) => rate._id);
    
      const filteredRates =
        selectedTest.rateType === "CCRate"
          ? ratesData.filter((rate) => rateIds.includes(rate._id)) // Compare against extracted _ids
          : cliRatesData.filter((rate) => rateIds.includes(rate._id));
    
      setSelectedCustomer(filteredRates);
      setIsModalOpen(true);
      console.log(filteredRates);
    }
  };

  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handlePickupData = async (testId) => {
    try {
      console.log("Picking up test:", testId);
      const serviceEngineer = adminDetails.name;
      const testStatus = 'Pending';
      const response = await axiosInstance.put(
        `api/member/updateMemberTest/${adminDetails.id}`,
        { testId }
      );
      window.location.reload();
      const testResponse = await axiosInstance.put(`api/member/tests/${testId}`, { serviceEngineer, testStatus })
      console.log("Updated Admin Member:", response.data);
      console.log("serviceEngineer", serviceEngineer)
    } catch (error) {
      console.error("Error updating admin member:", error);
    }
  };


  const getTicketCount = (status) => {
    if (status === "total") return testsData.length;
    return testsData?.filter((test) => test.testStatus === status).length;
  };

  return (
    <DashboardLayout>
      <div className='p-6 bg-gray-50 text-gray-800'>
        <div className='flex items-center mb-6'>
          <SiVitest className='h-10 w-10 text-orange-500 mr-4' />
          <h2 className='text-3xl text-gray-500 font-default'>Testing Page</h2>
        </div>

        {/* Tabs Section */}
        <div className='flex justify-between mb-6'>
          {["total", "initiated", "failed"].map((status, index) => (
            <div
              key={status}
              className={`flex-1 ${index !== 0 ? "ml-4" : ""
                } bg-gradient-to-r ${status === "total"
                  ? "from-blue-400 to-blue-600"
                  : status === "initiated"
                    ? "from-green-400 to-green-600"
                    : "from-yellow-400 to-yellow-600"
                } text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
              onClick={() => setActiveTab(status)}>
              <h3 className='text-lg font-semibold'>
                {status === "total"
                  ? "Live"
                  : status === "initiated"
                    ? "Test Passed"
                    : "Test Failed"}
              </h3>
              <p className='text-4xl font-bold mt-2'>
                {getTicketCount(status)}
              </p>
            </div>
          ))}
        </div>

        {/* Filter and Search Section */}
        <div className='bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-6'>
          {/* Left side: Status filter and filter button */}
          <div className='flex space-x-4'>
            <select
              className='p-2 bg-white border rounded shadow'
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}>
              <option value=''>All Statuses</option>
              <option value='Initiated'>Test Initiated</option>
              <option value='Failed'>Test Failed</option>
              <option value='Passed'>Test Passed</option>
            </select>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
              onClick={applyFilters}>
              Filter
            </button>
          </div>

          {/* Right side: Search input */}
          <div className='flex'>
            <input
              type='text'
              className='p-2 border rounded shadow'
              placeholder='Search by Customer ID or Company Name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* White Container for Tab Content */}
        <div className='mt-6 p-6 bg-white shadow-md rounded-lg'>
          <table className='min-w-full bg-white'>
            <thead className='bg-[#005F73] text-white'>
              <tr>
                <th className='py-2 px-4'>Customer ID</th>
                <th className='py-2 px-4'>Company Name</th>
                <th className='py-2 px-4'>Service Engineer</th>
                <th className='py-2 px-4 text-center'>Status</th>
                <th className='py-2 px-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((customer, index) => (
                <tr
                  key={customer.testId}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className='py-2 px-4'>{customer.customerId}</td>
                  <td className='py-2 px-4'>{customer.companyName || "N/A"}</td>
                  <td className='py-2 px-4'>{customer.serviceEngineer || "NOC CloudQlobe"}</td>
                  <td className='py-2 px-4'>{customer.testStatus || "N/A"}</td>
                  <td className='py-2 px-4 text-right'>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2'
                      onClick={() => openModal(customer.testId)}>
                      View
                    </button>
                    <button
                      className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition'
                      onClick={() =>
                        handlePickupData(customer.testId)
                      }>
                      Pickup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedCustomer && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-2/3'>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center'>
                <SiBitcomet className='h-6 w-6 text-orange-500 mr-2' />
                <h3 className='text-xl font-default'>
                  Details for {selectedCustomer.companyName}
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
                    {selectedCustomer.map((customer, customerIndex) => (
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
    </DashboardLayout>
  );
};

export default TestingPage;