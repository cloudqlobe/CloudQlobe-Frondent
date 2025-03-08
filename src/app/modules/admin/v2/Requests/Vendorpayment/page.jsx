import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../layout/page';
import { FaPlusCircle, FaFilter } from 'react-icons/fa';
import { SiContributorcovenant } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import adminContext from '../../../../../../context/page';

const VendorRequestPage = () => {
  const { adminDetails } = useContext(adminContext)
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filter, setFilter] = useState('All');
  const [vendorRequests, setVendorRequests] = useState([]);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('api/member/getAllVendor');
      console.log(response.data.vendor);
      console.log(adminDetails.role);
      
      if (response.data.success) {
        if(adminDetails.role === 'accountMember'){
          const RequestData = response?.data?.vendor.filter(data => data.serviceEngineer === 'NOC CloudQlobe')
          console.log("RequestData",RequestData);
          
          setVendorRequests(RequestData);
          setFilteredRequests(RequestData); 
        }else if(adminDetails.role === 'account' || adminDetails.role === "superAdmin"){
          setVendorRequests(response.data.vendor)
          setFilteredRequests(response.data.vendor);         
        }
      } else {
        console.error('Failed to fetch data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [adminDetails?.role]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleFilterApply = () => {
    setFilteredRequests(
      filter === 'All'
        ? vendorRequests
        : vendorRequests.filter((request) => request.carrierDetails.status === filter)
    );
  };

  useEffect(() => {
    handleFilterApply();
  }, [filter, vendorRequests]);


  const handlePickupData = async (vendorId) => {
    
    try {
      console.log("Picking up test:", vendorId);
      const serviceEngineer = adminDetails.name;
      const response = await axiosInstance.put(
        `api/member/updateMemberVendorId/${adminDetails.id}`,
        { vendorId }
      );
      const testResponse = await axiosInstance.put(`api/member/updateVendor/${vendorId}`, { serviceEngineer })
      window.location.reload();
    } catch (error) {
      console.error("Error updating admin member:", error);
    }
  };

  return (
    <Layout>
      <div className="p-6 text-gray-600">
        <h2 className="text-3xl font-default flex items-center mb-4">
          <SiContributorcovenant className="mr-2 text-yellow-500 text-5xl" />
          Vendor Payment Request
        </h2>

        <div className="flex justify-between mb-4 items-center">
          <button
           onClick={() => navigate('/admin/vendor_form')} // Pass a callback function to onClick
            className="px-4 py-2 bg-green-500 text-white flex items-center rounded-md"
          >
            <FaPlusCircle className="mr-2" />
            Add Vendor Payment
          </button>

          <div className="flex items-center">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="p-2 border rounded-md bg-white mr-2"
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
              <option value="Pending">Pending</option>
            </select>
            <button
              onClick={handleFilterApply}
              className="px-4 py-2 bg-orange-500 text-white flex items-center rounded-md"
            >
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <table className="min-w-full border-collapse mb-6">
          <thead className="bg-[#005F73] text-white">
            <tr>
              <th className="p-2">Carrier ID</th>
              <th className="p-2">Account Manager</th>
              <th className="p-2">Service Category</th>
              <th className="p-2">Account Associate</th>
              <th className="p-2">Carrier Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request, index) => (
              <tr key={request.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="p-2">{request.carrierId}</td>
                <td className="p-2 text-center">{request.accountManager}</td>
                <td className="p-2 text-center">{request.serviceCategory}</td>
                <td className="p-2">{request.accountAssociate}</td>
                <td className="p-2">{request.carrierType}</td>
                <td className="p-2">{request.transactionStatus}</td>
                <td className="p-2 text-right flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white flex items-center rounded-md"
                    onClick={() => handlePickupData(request.id)} // Pass the payment data
                  >
                    Pickup
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>       
      </div>
    </Layout>
  );
};

export default VendorRequestPage;