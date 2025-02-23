import React, {  useState } from 'react';
import { FaCalendarAlt, FaMoneyBillAlt, FaFileUpload, FaUserCircle } from 'react-icons/fa';
import { BiSolidUser } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../layout/page'; // Import the Layout component
import axiosInstance from '../../../utils/axiosinstance';

const RechargeForm = () => {

  const [amount, setAmount] = useState('');
  const [transactionTime, setTransactionTime] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [accountAgent, setAccountAgent] = useState('');
  const [customerID,setCustomerId] = useState('')
  const [image,setImage] = useState(null);

  const handleFileChange = (img) => {
    const selectedImage = img.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
 
      // Format the date to match the backend's expected format (MM/DD/YYYY hh:mm A)
  const formattedDate = new Date(transactionTime).toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
 
     const fromData = new FormData();
     fromData.append('amount',amount)
     fromData.append('dateAndTime',formattedDate)
     fromData.append('referenceNo',referenceNo)
     fromData.append('accountAgent',accountAgent)
     fromData.append('UserId',customerID)
     fromData.append('image',image)

     try{
       const response = await  axiosInstance.post('api/member/Transactions',
       fromData
       )
    if(response.status === 201){
      toast.success("Recharge Successful!");
      setAmount('');
      setTransactionTime('');
      setReferenceNo('');
      setAccountAgent('');
      setCustomerId('');
      setImage(null);
    }else{
      toast.error('Failed to add Transaction')
    }
 
     }catch(error){
       console.log('Error uploading Transactions',error);
     }
 
  }
  return (
    <Layout> {/* Wrap the content in the Layout component */}
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="flex w-full max-w-screen-xl bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Left Side Image Section */}
          <div className="w-full lg:w-1/2 bg-offwhite flex items-center justify-center">
            <img
              src="/images/Accountsrecharge.avif"
              alt="Side Image"
              className="w-3/4 h-auto object-cover mt-9" // Added top margin for spacing
            />
          </div>

          {/* Right Side Form Section */}
          <div className="w-full lg:w-1/2 p-10 bg-white">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
              <FaMoneyBillAlt className="mr-3 text-blue-500 text-4xl" /> Recharge Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Section */}
              <div className="flex items-center space-x-4">
                <BiSolidUser  className="text-gray-600 text-2xl" />
                <input
                  type="text"
                  placeholder="Enter customerId"
                  value={customerID}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

                {/* Customer Id Section */}
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

                {/* Payment Time Section */}
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


              {/* Reference No Section */}
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

              {/* Account Agent Section */}
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

              {/* Screenshot Section */}
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
        <ToastContainer/>
      </div>
    </Layout>
  );
};

export default RechargeForm;