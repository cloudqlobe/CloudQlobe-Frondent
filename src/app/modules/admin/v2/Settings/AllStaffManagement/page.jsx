import React, { useContext, useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ShieldCheckIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Layout from '../../layout/page';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import axiosInstance from '../../utils/axiosinstance';
import adminContext from '../../../../../../context/page';

const AllStaffManagment = () => {
    const { adminDetails } = useContext(adminContext)
    const url = adminDetails.role;
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ fullName: '', email: '', password: '', role: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [errors, setErrors] = useState({ fullName: '', email: '', password: '' });

    const [account, setAccount] = useState([]);
    const [support, setSupport] = useState([]);
    const [lead, setLead] = useState([]);
    const [accountControlOpen, setAccountControlOpen] = useState(false);
    const [supportControlOpen, setSupportControlOpen] = useState(false);
    const [leadControlOpen, setLeadControlOpen] = useState(false);



    useEffect(() => {
        if (!url) return; // Prevent unnecessary calls

        const fetchMembers = async () => {
            try {
                const accountResponse = await axiosInstance.get(`v3/api/adminMember/allaccountMember`);
                const supportResponse = await axiosInstance.get(`v3/api/adminMember/allsupportMember`);
                const leadResponse = await axiosInstance.get(`v3/api/adminMember/allleadMember`);
                console.log("accountResponse", accountResponse.data);
                console.log("supportResponse", supportResponse.data);
                console.log("leadResponse", leadResponse.data);
                setAccount(accountResponse.data)
                setSupport(supportResponse.data)
                setLead(leadResponse.data)

            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        }

        fetchMembers();
    }, [url]);


    const leadToggleAccessControl = () => {
        setLeadControlOpen(!leadControlOpen);
    };
    const accountToggleAccessControl = () => {
        setAccountControlOpen(!accountControlOpen);
    };
    const supportToggleAccessControl = () => {
        setSupportControlOpen(!supportControlOpen);
    };

    const validateInputs = () => {
        const errors = {};
        // Full name validation
        if (!newUser.fullName.trim()) {
            errors.fullName = 'Full name is required.';
        } else if (newUser.fullName.length < 3) {
            errors.fullName = 'Full name must be at least 3 characters long.';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newUser.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!emailRegex.test(newUser.email)) {
            errors.email = 'Invalid email format.';
        }

        // Password validation
        if (!newUser.password.trim()) {
            errors.password = 'Password is required.';
        } else if (newUser.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        } else if (!/[0-9]/.test(newUser.password) || !/[!@#$%^&*]/.test(newUser.password)) {
            errors.password = 'Password must include at least one number and one special character.';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddUserClick = () => {
        setNewUser({ fullName: '', email: '', password: '', role: '' });
        setEditingUserId(null);
        setErrors({});
        setIsModalOpen(true);
    };

    const handleEditUserClick = async (id) => {
        const userToEdit = users.find(user => user._id === id);
        console.log("id", id);

        if (userToEdit) {
            setNewUser({ fullName: userToEdit.fullName, email: userToEdit.email, password: '', role: userToEdit.role });
            setEditingUserId(id);
            setErrors({});
            setIsModalOpen(true);
        }
    };

    const handleSaveUser = async () => {
        if (!validateInputs()) return;

        try {
            let response;
            if (editingUserId) {
                response = await axiosInstance.put(`v3/api/adminMember/update${url}Member/${editingUserId}`, newUser);
            } else {
                response = await axiosInstance.post(`v3/api/adminMember/create${url}Member`, newUser);
            }
            console.log(response);

            if (response.data) {
                setUsers(prevUsers => editingUserId
                    ? prevUsers.map(user => (user._id === editingUserId ? { ...user, ...response.data.data } : user))
                    : [...prevUsers, response.data.data]
                );
                toast.success(editingUserId ? "Member updated successfully" : "Member added successfully");
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Error saving Member");
        }
    };

    const handleDeleteUser = async (id, role) => {
        try {
            console.log("Deleting Member with ID:", id);
            const response = await axiosInstance.delete(`v3/api/adminMember/delete${role}Member/${id}`);
            console.log(response.data.message);

            // Show success toast
            toast.success("Admin Member deleted successfully");

            // Update the state to remove the deleted user
            if (role === 'lead') {
                setLead(lead.filter((user) => user._id !== id));
            } else if (role === 'account') {
                setAccount(account.filter((user) => user._id !== id));
            } else if (role === 'support') {
                setSupport(support.filter((user) => user._id !== id));
            }
        } catch (error) {
            console.error("Error deleting user:", error);

            // Show error toast
            toast.error("Server error");
        }
    };


    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6"> {url} Settings</h1>

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
                                <PlusIcon className="w-5 h-5 inline-block" /> Add New Member
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
                                            <div className="space-x-2">
                                                <button
                                                    //   onClick={() => handleEditUserClick(user._id)}
                                                    className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user._id, "lead")}
                                                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
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
                                <PlusIcon className="w-5 h-5 inline-block" /> Add New Member
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
                                            <div className="space-x-2">
                                                <button
                                                    //   onClick={() => handleEditUserClick(user._id)}
                                                    className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                      onClick={() => handleDeleteUser(user._id,"account")}
                                                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
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
                                <PlusIcon className="w-5 h-5 inline-block" /> Add New Member
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
                                            <div className="space-x-2">
                                                <button
                                                    //   onClick={() => handleEditUserClick(user._id)}
                                                    className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                      onClick={() => handleDeleteUser(user._id,"support")}
                                                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Dialog Box */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">{editingUserId ? 'Edit User' : 'Add New User'}</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Full Name */}
                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    value={newUser.fullName}
                                    onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                                />
                                {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-700">Email ID</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                                />
                                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                                />
                                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSaveUser}
                                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
                                >
                                    {editingUserId ? 'Save Changes' : 'Add User'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer />

            </div>
        </Layout>
    );
};

export default AllStaffManagment;
