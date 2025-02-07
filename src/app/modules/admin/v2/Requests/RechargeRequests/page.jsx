import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../layout/page';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaFilter } from 'react-icons/fa';
import { RiApps2Line } from "react-icons/ri";
import axiosInstance from '../../utils/axiosinstance';
import adminContext from '../../../../../../context/page';

const RechargerequestPage = () => {
  const { adminDetails } = useContext(adminContext)
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate()

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('v3/api/Allrecharge');
      if (response.data.success) {
        if(adminDetails.role === 'accountMember'){
          const RequestData = response?.data?.data.filter(data => data.serviceEngineer === 'NOC CloudQlobe')
          setPayments(RequestData);
        }else if(adminDetails.role === 'account' || adminDetails.role === "superAdmin"){
          setPayments(response.data.data)        
        }
      } else {
        console.error('Failed to fetch data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the provider mounts
  useEffect(() => {
    fetchData();
  }, [adminDetails?.role]);


  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterApply = () => {
    setPayments(prevPayments => {
      return prevPayments.filter(payment => filter === 'All' || payment.status === filter);
    });
  };


  const handlePickupData = async (rechargeId) => {
    console.log(rechargeId);
    
    try {
      console.log("Picking up test:", rechargeId);
      const serviceEngineer = adminDetails.name;
      const response = await axiosInstance.put(
        `v3/api/adminMember/updateAccountMemberTicket/${adminDetails.id}`,
        { rechargeId }
      );
      const testResponse = await axiosInstance.put(`/v3/api/updateRechargeData/${rechargeId}`, { serviceEngineer })
      window.location.reload();
    } catch (error) {
      console.error("Error updating admin member:", error);
    }
  };

  return (
    <Layout>
      <div className="p-6 text-gray-600">
        <h2 className="text-3xl font-semibold flex items-center mb-4">
          <RiApps2Line className="mr-2 text-yellow-500 text-5xl" />
          Recharge Requests
        </h2>

        <div className="flex justify-between items-center mb-4">
          <button

            className="px-4 py-2 bg-green-500 text-white flex items-center rounded-md"
            onClick={() => navigate('/admin/recharge')} // Pass a callback function to onClick

          >
            <FaPlusCircle className="mr-2" />
            Add Payment
          </button>
          <div className="flex items-center">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="p-2 border rounded-md bg-white mr-2"
            >
              <option value="All">All</option>
              <option value="Process">Process</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
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
              <th className="p-2">Customer ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Payment Time</th>
              <th className="p-2">Reference No</th>
              <th className="p-2">Account Agent</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="bg-gray-100">
                <td className="p-2">{payment?.UserId}</td>
                <td className="p-2">${payment.amount}</td>
                <td className="p-2">{new Date(payment.dateAndTime).toLocaleString()}</td>
                <td className="p-2">{payment.referenceNo}</td>
                <td className="p-2">{payment.accountAgent}</td>
                <td className="p-2">{payment.transactionStatus}</td>
                <td className="p-2 text-right">
                  <div className="flex justify-end">
                    <button

                      className="px-4 py-2 w-36 bg-blue-500 text-white flex items-center justify-center rounded-md"
                      onClick={() => handlePickupData(payment._id)} // Pass the payment data
                    >
                      <FaPlusCircle className="mr-2" />
                      Pickup
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default RechargerequestPage;