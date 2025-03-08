import React from "react";
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

                    {activeCategory === "Vendor Payment" &&
                    
                        filteredRequests.map((request, index) => (
                            <tr key={request._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td className="p-2">{request.carrierId}</td>
                                <td className="p-2 text-center">{request.accountManager}</td>
                                <td className="p-2 text-center">{request.serviceCategory}</td>
                                <td className="p-2">{request.accountAssociate}</td>
                                <td className="p-2">{request.carrierType}</td>
                                <td className="p-2">{request.status}</td>
                                <td className="p-2 text-right flex justify-end space-x-2">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white flex items-center rounded-md"
                                        onClick={() => handlePickupClick(request)} // Pass the payment data
                                    >
                                        Pickup
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

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
                                <option value="Process">Process</option>
                                <option value="Completed">Completed</option>
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
    RequestsTable,
    PickupTable
};