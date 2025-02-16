import React, { useContext, useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Layout from '../../layout/page';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import axiosInstance from '../../utils/axiosinstance';
import adminContext from '../../../../../../context/page';

const AllStaffManagment = () => {
    const [account, setAccount] = useState([]);
    const [support, setSupport] = useState([]);
    const [carrier, setCarrier] = useState([]);
    const [sale, setSale] = useState([]);
    const [lead, setLead] = useState([]);
    const [accountControlOpen, setAccountControlOpen] = useState(false);
    const [supportControlOpen, setSupportControlOpen] = useState(false);
    const [leadControlOpen, setLeadControlOpen] = useState(false);
    const [carrierControlOpen, setCarrierControlOpen] = useState(false);
    const [saleControlOpen, setSaleControlOpen] = useState(false);



    useEffect(() => {

        const fetchMembers = async () => {
            try {
                const accountResponse = await axiosInstance.get(`api/admin/allaccountMember`);
                const supportResponse = await axiosInstance.get(`api/admin/allsupportMember`);
                const leadResponse = await axiosInstance.get(`api/admin/allleadMember`);
                const carrierResponse = await axiosInstance.get(`api/admin/allcarrierMember`);
                const saleResponse = await axiosInstance.get(`api/admin/allsaleMember`);
                setAccount(accountResponse?.data?.members)
                setSupport(supportResponse?.data?.members)
                setLead(leadResponse?.data?.members)
                setSale(saleResponse?.data?.members)
                setCarrier(carrierResponse?.data?.members)

            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        }
        fetchMembers();
    }, []);


    const leadToggleAccessControl = () => {
        setLeadControlOpen(!leadControlOpen);
    };
    const accountToggleAccessControl = () => {
        setAccountControlOpen(!accountControlOpen);
    };
    const supportToggleAccessControl = () => {
        setSupportControlOpen(!supportControlOpen);
    };
    const saleToggleAccessControl = () => {
        setSaleControlOpen(!saleControlOpen);
    };
    const carrierToggleAccessControl = () => {
        setCarrierControlOpen(!carrierControlOpen);
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6"> Members</h1>

                {/* Manage Access Control Section */}
                <div className="border border-gray-300 rounded-lg mb-4">
                    <button
                        onClick={leadToggleAccessControl}
                        className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg transition-colors duration-200"
                    >
                        <div className="flex items-center">
                            <ShieldCheckIcon className="w-6 h-6 mr-3 text-gray-700" />
                            Manage Lead Members
                        </div>
                        {accountControlOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-700" /> : <ChevronDownIcon className="w-5 h-5 text-gray-700" />}
                    </button>

                    {leadControlOpen && (
                        <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
                            <p className="text-sm text-gray-600 mb-4">Add and manage users with specific access levels: Accounts, Support, and Sales.</p>

                            {/* Add New User Button */}
                            <button
                                // onClick={handleAddUserClick}
                                className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
                            >
                                Total Member : {lead.length}
                            </button>

                            {/* Manage Existing Users */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Manage Member</h2>
                                <ul className="space-y-4">
                                    {lead.map((user) => (
                                        <li key={user._id} className="flex justify-between items-center p-3 bg-gray-200 rounded-lg shadow-sm">
                                            <div>
                                                <h3 className="font-semibold">{user.fullName}</h3>
                                                <p className="text-sm text-gray-600">Email ID: {user.email}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="border border-gray-300 rounded-lg mb-4">
                    <button
                        onClick={accountToggleAccessControl}
                        className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg transition-colors duration-200"
                    >
                        <div className="flex items-center">
                            <ShieldCheckIcon className="w-6 h-6 mr-3 text-gray-700" />
                            Manage Account Members
                        </div>
                        {accountControlOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-700" /> : <ChevronDownIcon className="w-5 h-5 text-gray-700" />}
                    </button>

                    {accountControlOpen && (
                        <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
                            <p className="text-sm text-gray-600 mb-4">Add and manage users with specific access levels: Accounts, Support, and Sales.</p>

                            {/* Add New User Button */}
                            <button
                                // onClick={handleAddUserClick}
                                className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
                            >
                                Total Member : {account.length}
                                </button>

                            {/* Manage Existing Users */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Manage Member</h2>
                                <ul className="space-y-4">
                                    {account.map((user) => (
                                        <li key={user._id} className="flex justify-between items-center p-3 bg-gray-200 rounded-lg shadow-sm">
                                            <div>
                                                <h3 className="font-semibold">{user.fullName}</h3>
                                                <p className="text-sm text-gray-600">Email ID: {user.email}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="border border-gray-300 rounded-lg mb-4">
                    <button
                        onClick={supportToggleAccessControl}
                        className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg transition-colors duration-200"
                    >
                        <div className="flex items-center">
                            <ShieldCheckIcon className="w-6 h-6 mr-3 text-gray-700" />
                            Manage Support Members
                        </div>
                        {supportControlOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-700" /> : <ChevronDownIcon className="w-5 h-5 text-gray-700" />}
                    </button>

                    {supportControlOpen && (
                        <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
                            <p className="text-sm text-gray-600 mb-4">Add and manage users with specific access levels: Accounts, Support, and Sales.</p>

                            {/* Add New User Button */}
                            <button
                                // onClick={handleAddUserClick}
                                className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
                            >
                                Total Member : {support.length}
                                </button>

                            {/* Manage Existing Users */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Manage Member</h2>
                                <ul className="space-y-4">
                                    {support.map((user) => (
                                        <li key={user._id} className="flex justify-between items-center p-3 bg-gray-200 rounded-lg shadow-sm">
                                            <div>
                                                <h3 className="font-semibold">{user.fullName}</h3>
                                                <p className="text-sm text-gray-600">Email ID: {user.email}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="border border-gray-300 rounded-lg mb-4">
                    <button
                        onClick={saleToggleAccessControl}
                        className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg transition-colors duration-200"
                    >
                        <div className="flex items-center">
                            <ShieldCheckIcon className="w-6 h-6 mr-3 text-gray-700" />
                            Manage Sale Members
                        </div>
                        {saleControlOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-700" /> : <ChevronDownIcon className="w-5 h-5 text-gray-700" />}
                    </button>

                    {saleControlOpen && (
                        <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
                            <p className="text-sm text-gray-600 mb-4">Add and manage users with specific access levels: Accounts, Support, and Sales.</p>

                            {/* Add New User Button */}
                            <button
                                // onClick={handleAddUserClick}
                                className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
                            >
                                Total Member : {sale.length}
                                </button>

                            {/* Manage Existing Users */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Manage Member</h2>
                                <ul className="space-y-4">
                                    {sale.map((user) => (
                                        <li key={user._id} className="flex justify-between items-center p-3 bg-gray-200 rounded-lg shadow-sm">
                                            <div>
                                                <h3 className="font-semibold">{user.fullName}</h3>
                                                <p className="text-sm text-gray-600">Email ID: {user.email}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="border border-gray-300 rounded-lg mb-4">
                    <button
                        onClick={carrierToggleAccessControl}
                        className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg transition-colors duration-200"
                    >
                        <div className="flex items-center">
                            <ShieldCheckIcon className="w-6 h-6 mr-3 text-gray-700" />
                            Manage Carrier Members
                        </div>
                        {carrierControlOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-700" /> : <ChevronDownIcon className="w-5 h-5 text-gray-700" />}
                    </button>

                    {carrierControlOpen && (
                        <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
                            <p className="text-sm text-gray-600 mb-4">Add and manage users with specific access levels: Accounts, Support, and Sales.</p>

                            {/* Add New User Button */}
                            <button
                                // onClick={handleAddUserClick}
                                className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
                            >
                                Total Member : {carrier.length}
                                </button>

                            {/* Manage Existing Users */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Manage Member</h2>
                                <ul className="space-y-4">
                                    {carrier.map((user) => (
                                        <li key={user._id} className="flex justify-between items-center p-3 bg-gray-200 rounded-lg shadow-sm">
                                            <div>
                                                <h3 className="font-semibold">{user.fullName}</h3>
                                                <p className="text-sm text-gray-600">Email ID: {user.email}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <ToastContainer />

            </div>
        </Layout>
    );
};

export default AllStaffManagment;
