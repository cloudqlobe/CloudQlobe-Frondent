import React from "react";
import { SiBitcomet } from "react-icons/si";
import { FaPlusCircle } from 'react-icons/fa';

const RequestsTable = ({ activeCategory, filteredRequests, openModal, handlePickupClick }) => {
    return (
        <div className="bg-white p-6 shadow-lg rounded-lg">
            <table className="min-w-full bg-white">
                <thead className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center">
                    {activeCategory === "Recharge Request" && (
                        <tr>
                            <th className="p-2">Customer ID</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2">Payment Time</th>
                            <th className="p-2">Reference No</th>
                            <th className="p-2">Account Agent</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                        </tr>
                    )}
                    {activeCategory === "Vendor Payment" && (
                        <tr>
                            <th className="p-2">Carrier ID</th>
                            <th className="p-2">Account Manager</th>
                            <th className="p-2">Service Category</th>
                            <th className="p-2">Account Associate</th>
                            <th className="p-2">Carrier Type</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {activeCategory === "Recharge Request" &&
                        filteredRequests.map((payment, index) => (
                            <tr key={index} className="bg-gray-100">
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
                                            onClick={() => handlePickupClick(payment)} // Pass the payment data
                                        >
                                            <FaPlusCircle className="mr-2" />
                                            Pickup
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    {activeCategory === "Trouble Tickets" &&
                        filteredRequests.map((data, index) => (
                            <tr key={data.id} className="hover:bg-gray-100">
                                <td className="border px-6 py-3">{data.companyId || "N/A"}</td>
                                <td className="border px-6 py-3">{data.accountManager || "N/A"}</td>
                                <td className="border px-6 py-3">{data.ticketCategory || "N/A"}</td>
                                <td className="border px-6 py-3">{data.supportEngineer || "N/A"}</td>
                                <td className="border px-6 py-3">{data.status || "N/A"}</td>
                                <td className="border px-6 py-3">{data.ticketPriority || "N/A"}</td>
                                <td className="border px-6 py-3 space-x-2">
                                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600" onClick={() => handlePickupClick(data)}>Pickup</button>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600">View</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

const VeiwPage = ({ isModalOpen, selectedRate, closeModal }) => {
    return (
        <>
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
        </>
    )
}

const PickupTable = ({ showPickupModal, handleCancel, handleUpdateStatus, newStatus, setNewStatus }) => {
    return (
        <>
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
        </>
    )
}

export {
    VeiwPage,
    RequestsTable,
    PickupTable
};