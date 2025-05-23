import { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../../../utils/axiosinstance';
import { ToastContainer, toast } from 'react-toastify';
import adminContext from '../../../../../../../../context/page';

const MyRatesPage = ({ customerId }) => {
  const { adminDetails } = useContext(adminContext)
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customerData, setCustomerData] = useState(null);
  const [testsData, setTestsData] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRates, setSelectedRates] = useState([]);
  const [currentRateType, setCurrentRateType] = useState('CCRate');
  const [ccRatesData, setCCRatesData] = useState([]);
  const [cliRatesData, setCLIRatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {

      if (customerId) {
        try {
          const response = await axiosInstance.get(`api/customer/${customerId}`);
          const customer = response.data.customer;          
          const parsedMyRates = customer.myRates ? JSON.parse(customer.myRates) : null;
          
          setCustomerData({
            ...customer,
            myRates: parsedMyRates,
          });

        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      }
    };
    fetchCustomerData();
  }, [customerId]);


  useEffect(() => {
    const fetchRatesAndTests = async () => {
      if (!customerData) return;

      try {

        // Filtering customer-specific rates
        const myRatesArray = Array.isArray(customerData?.myRates) ? customerData.myRates : [];
        const ccRates = myRatesArray.filter(rate => rate.rate === 'CC');
        const cliRates = myRatesArray.filter(rate => rate.rate === 'CLI');
        
        // Fetching test rates
        const testsResponse = await axiosInstance.get(`api/testrates`);
        const testData = testsResponse.data.testrate || [];

        // Filter tests by customerId
        const tests = testData.filter(test => test.customerId == customerData.id);

        // Parse rateId if it exists
        const parsedRates = tests.length > 0 ? tests.map(test => ({
          ...test,
          rateId: test.rateId ? JSON.parse(test.rateId) : null
        })) : [];

        setTestsData(parsedRates);

        // Fetch CLI rates
        const fetchedCLIRates = await Promise.all(
          cliRates.map(async (rate) => {
            try {
              const response = await axiosInstance.get(`api/admin/clirate/${rate.rateId}`);
              return response.data.clirates || [];
            } catch (error) {
              console.error(`Error fetching CLI rate for rateId ${rate.rateId}:`, error);
              return null; // Return null for failed requests
            }
          })
        );

        // Fetch CC rates
        const fetchedCCRates = await Promise.all(
          ccRates.map(async (rate) => {
            try {
              const response = await axiosInstance.get(`api/admin/ccrate/${rate.rateId}`);
              return response.data.ccrates || [];
            } catch (error) {
              console.error(`Error fetching CC rate for rateId ${rate.rateId}:`, error);
              return null;
            }
          })
        );

        // Remove null values before setting state
        setCLIRatesData(fetchedCLIRates.filter(rate => rate !== null));
        setCCRatesData(fetchedCCRates.filter(rate => rate !== null));

      } catch (error) {
        console.error('Error fetching rates or tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatesAndTests();
  }, [customerData]);

  useEffect(() => {
    setDataNotFound(!ccRatesData.length && !cliRatesData.length);
  }, [ccRatesData, cliRatesData]);

  const handleCheckboxChange = (rate) => {
    setSelectedRates(prevSelectedRates => {
      if (prevSelectedRates.some(item => item._id === rate._id)) {
        return prevSelectedRates.filter(item => item._id !== rate._id);
      } else {
        return [...prevSelectedRates, rate];
      }
    });
  };

  const handleRequestTest = async () => {
    try {
      const requestPromises = axiosInstance.post(`api/testrate`, {
        rateId: selectedRates,
        customerId: customerData.id,
        memberId: adminDetails.id,
        rateCustomerId: `hwq${customerData._id}`,
        testStatus: 'Test requested',
        testReason: 'Requested',
        rateType: currentRateType,
        companyName: customerData.companyName,
        companyId: customerData.customerId,
      });
      await requestPromises;
      toast.success('Tests Requested Successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error requesting tests:', error);
    }
  };

  const filteredData = (currentRateType === 'CCRate' ? ccRatesData : cliRatesData).filter(item => {

    // If statusFilter is "all", return items matching the country search
    if (statusFilter === 'all') {
      return item.country?.toLowerCase().includes(search.toLowerCase());
    }
    const hasMatchingTest = testsData.some(test =>
      Array.isArray(test.rateId)
        ? test.rateId.some(rate => rate._id === item._id) && test.testStatus === statusFilter
        : test.rateId === item._id && test.testStatus === statusFilter
    );

    return item.country?.toLowerCase().includes(search.toLowerCase()) && hasMatchingTest;
  });

  return (
    <div className="p-6 text-gray-800 bg-white">
      <div className="flex justify-between items-start w-full">
        <h2 className="text-2xl font-bold">My Rates</h2>
        {customerData && (
          <div className="flex flex-col items-end">
            <p className="text-gray-800">Company Name: <span className="font-bold">{customerData.companyName}</span></p>
            <p className="text-gray-800 mt-1">Customer ID: <span className="font-bold">{customerData.customerId}</span></p>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between space-x-4">
        <input
          type="text"
          placeholder="Search by country name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 bg-white px-4 py-2 rounded-lg border border-gray-300"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg border border-gray-300"
        >
          <option value="all">All Statuses</option>
          <option value="Test requested">Test Requested</option>
          <option value="Test Accepted">Test Accepted</option>
          <option value="Test Started"> Test Started</option>
          <option value="Processing"> Test Processing</option>
          <option value="Completed"> Test Completed</option>
          <option value="Failed"> Test Failed</option>
          <option value="No Test Requested">No Test Requested</option>
        </select>

        {!showCheckboxes && (
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setShowCheckboxes(true)}
          >
            Select Rates
          </button>
        )}
      </div>

      <div className="mt-4">
        <button
          className={`px-4 py-2 rounded-lg mr-4 ${currentRateType === 'CCRate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setCurrentRateType('CCRate')}
        >
          CCRate
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${currentRateType === 'CLIRate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setCurrentRateType('CLIRate')}
        >
          CLIRate
        </button>
      </div>

      {loading ? (
        <p>Loading rates...</p>
      ) : dataNotFound ? (
        <p>No data found.</p>
      ) : (
        <table className="min-w-full mt-6 border bg-white">
          <thead>
            <tr className="bg-[#005F73] text-white">
              {showCheckboxes && <th className="px-4 py-2">Select</th>}
              <th className="px-4 py-2">Country Code</th>
              <th className="px-4 py-2">Country Name</th>
              {currentRateType === "CCRate" && <th className="px-4 py-2">Profile</th>}
              <th className="px-4 py-2">Rate</th>
              <th className="px-4 py-2">Quality Description</th>
              {currentRateType === "CLIRate" && <th className="px-4 py-2">asr</th>}
              {currentRateType === "CLIRate" && <th className="px-4 py-2">billingCycle</th>}
              {currentRateType === "CLIRate" && <th className="px-4 py-2">rtp</th>}
              {currentRateType === "CLIRate" && <th className="px-4 py-2">acd</th>}
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {filteredData?.map((rate, index) => (
              <tr key={index} className="border-t">
                {showCheckboxes && (
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(rate)}
                    />
                  </td>
                )}
                <td className="px-4 py-2">{rate.countryCode || 'N/A'}</td>
                <td className="px-4 py-2">{rate.country || 'N/A'}</td>
                {rate.profile && <td className="px-4 py-2">{rate.profile || 'N/A'}</td>}
                <td className="px-4 py-2">{rate.rate || 'N/A'}</td>
                <td className="px-4 py-2">{rate.qualityDescription || 'N/A'}</td>
                {rate.asr && <td className="px-4 py-2">{rate.asr || 'N/A'}</td>}
                {rate.billingCycle && <td className="px-4 py-2">{rate.billingCycle || 'N/A'}</td>}
                {rate.rtp && <td className="px-4 py-2">{rate.rtp || 'N/A'}</td>}
                {rate.acd && <td className="px-4 py-2">{rate.acd || 'N/A'}</td>}
                <td className="px-4 py-2">{rate.status || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showCheckboxes && (
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setShowCheckboxes(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleRequestTest}
          >
            Request Test
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyRatesPage;
