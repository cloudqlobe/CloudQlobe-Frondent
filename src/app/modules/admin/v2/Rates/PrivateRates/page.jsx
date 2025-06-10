import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../layout/page';
import axiosInstance from '../../utils/axiosinstance';
import adminContext from '../../../../../../context/page';

const TargetedRatePage = () => {
    const { adminDetails } = useContext(adminContext);
    console.log(adminDetails.role);

    const [showCLI, setShowCLI] = useState(true);
    const [ccRates, setCcRates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchFilters, setSearchFilters] = useState({
        country: '',
        description: '',
        status: '',
        priority: '',
        profile: ''
    });

    const [editMode, setEditMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editData, setEditData] = useState({});
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const [formData, setFormData] = useState({
        country: '',
        qualityDescription: '',
        lcr: '',
        hcr: '',
        status: 'Active',
        priority: 'Low',
    });

    useEffect(() => {
        const fetchTargetedRates = async () => {
            try {
                const response = await axiosInstance.get('/api/admin/targeted/rate');
                setCcRates(response.data.Targetedrate);
            } catch (error) {
                console.error("Error fetching targeted rates:", error);
            }
        };

        fetchTargetedRates();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFilters]);

    // Extract unique values for dropdowns
    const uniqueCountries = [...new Set(ccRates.map(rate => rate.country))];
    const uniqueStatuses = [...new Set(ccRates.map(rate => rate.status))];
    const uniquePriorities = [...new Set(ccRates.map(rate => rate.priority))];
    
    // Extract profiles from qualityDescription (first word)
    const uniqueProfiles = [...new Set(ccRates.map(rate => {
        const desc = rate.qualityDescription || '';
        return desc.split(' ')[0];
    }))].filter(profile => profile); // Remove empty strings

    const handleAddCCRate = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/admin/targeted/rate', formData);
            const response = await axiosInstance.get('/api/admin/targeted/rate');
            setCcRates(response.data.Targetedrate);
            setFormData({
                country: '',
                qualityDescription: '',
                lcr: '',
                hcr: '',
                status: 'Active',
                priority: 'Low',
            });
            setShowModal(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleRowSelect = (index) => {
        if (editMode) {
            setSelectedRow(index);
            setEditData({ ...ccRates[index] });
        } else if (deleteMode) {
            const id = ccRates[index]._id;
            setSelectedToDelete(prev =>
                prev.includes(id)
                    ? prev.filter(item => item !== id)
                    : [...prev, id]
            );
        }
    };

    const handleApplyChanges = async () => {
        if (editMode && selectedRow !== null) {
            try {
                await axiosInstance.put(
                    `/api/admin/targeted/rate/${ccRates[selectedRow]._id}`,
                    editData
                );
                const updatedRates = [...ccRates];
                updatedRates[selectedRow] = editData;
                setCcRates(updatedRates);
                setEditMode(false);
                setSelectedRow(null);
            } catch (error) {
                console.error("Update failed", error);
            }
        }

        if (deleteMode && selectedToDelete.length > 0) {
            try {
                await Promise.all(
                    selectedToDelete.map(id =>
                        axiosInstance.delete(`/api/admin/targeted/rate/${id}`)
                    )
                );
                setCcRates(ccRates.filter(rate => !selectedToDelete.includes(rate._id)));
                setSelectedToDelete([]);
                setDeleteMode(false);
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    const filteredRates = ccRates.filter(rate => {
        // Check country filter
        if (searchFilters.country && rate.country !== searchFilters.country) return false;
        
        // Check description filter
        if (searchFilters.description && 
            !rate.qualityDescription.toLowerCase().includes(searchFilters.description.toLowerCase())) {
            return false;
        }
        
        // Check status filter
        if (searchFilters.status && rate.status !== searchFilters.status) return false;
        
        // Check priority filter
        if (searchFilters.priority && rate.priority !== searchFilters.priority) return false;
        
        // Check profile filter (first word of qualityDescription)
        if (searchFilters.profile) {
            const firstWord = rate.qualityDescription?.split(' ')[0] || '';
            if (firstWord !== searchFilters.profile) return false;
        }
        
        return true;
    });

    const totalPages = Math.ceil(filteredRates.length / rowsPerPage);
    const paginatedRates = filteredRates.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleFilterChange = (filterName, value) => {
        setSearchFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const resetFilters = () => {
        setSearchFilters({
            country: '',
            description: '',
            status: '',
            priority: '',
            profile: ''
        });
    };

    return (
        <Layout>
            <div className="p-6 text-gray-900" style={{ marginLeft: "-172px", width: "100vw" }}>
                {/* Tab Buttons */}
                <div className="mt-4 flex space-x-4 ml-4" style={{ marginLeft: "1147px", marginTop: "-38px" }}>
                    <button
                        style={{ width: "154px" }}
                        onClick={() => setShowCLI(false)}
                        className={`px-4 py-2 ${!showCLI ? 'bg-orange-500 text-white' : 'bg-orange-500 text-black'}`}
                    >
                        CLI Rates
                    </button>
                    <button
                        style={{ width: "154px" }}
                        onClick={() => setShowCLI(true)}
                        className={`px-4 py-2 ${showCLI ? 'bg-green-500 text-white' : 'bg-green-500 text-black'}`}
                    >
                        CC Rates
                    </button>
                </div>
                <h2 className="text-xl font-bold flex items-center ml-4">TARGETED RATES</h2>
                
                {/* Action Buttons and Search Bar */}
                {showCLI && (
                    <div className="mt-4 ml-4 flex flex-col space-y-4">
                        {['superAdmin'].includes(adminDetails.role) && (
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-2 rounded bg-blue-500 text-white"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={() => {
                                        setEditMode(!editMode);
                                        setDeleteMode(false);
                                        setSelectedRow(null);
                                    }}
                                    className={`px-4 py-2 rounded ${editMode ? 'bg-orange-600' : 'bg-orange-500'} text-white`}
                                >
                                    {editMode ? 'Cancel Edit' : 'Edit'}
                                </button>
                                <button
                                    onClick={() => {
                                        setDeleteMode(!deleteMode);
                                        setEditMode(false);
                                        setSelectedToDelete([]);
                                    }}
                                    className={`px-4 py-2 rounded ${deleteMode ? 'bg-red-600' : 'bg-red-500'} text-white`}
                                >
                                    {deleteMode ? 'Cancel Delete' : 'Delete'}
                                </button>
                                <button
                                    onClick={handleApplyChanges}
                                    className="px-4 py-2 rounded bg-green-500 text-white"
                                    disabled={(!editMode || selectedRow === null) && (!deleteMode || selectedToDelete.length === 0)}
                                >
                                    Apply
                                </button>
                            </div>
                        )}

                        {/* Search Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                            {/* Country Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                <select
                                    value={searchFilters.country}
                                    onChange={(e) => handleFilterChange('country', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">All Countries</option>
                                    {uniqueCountries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Description Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    placeholder="Search description..."
                                    value={searchFilters.description}
                                    onChange={(e) => handleFilterChange('description', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Status Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={searchFilters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">All Statuses</option>
                                    {uniqueStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Priority Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <select
                                    value={searchFilters.priority}
                                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">All Priorities</option>
                                    {uniquePriorities.map(priority => (
                                        <option key={priority} value={priority}>{priority}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Profile Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile</label>
                                <select
                                    value={searchFilters.profile}
                                    onChange={(e) => handleFilterChange('profile', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">All Profiles</option>
                                    {uniqueProfiles.map(profile => (
                                        <option key={profile} value={profile}>{profile}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Reset Button */}
                            <div>
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* CLI Under Maintenance */}
                {!showCLI && (
                    <div className="flex justify-center items-center h-64">
                        <h4 className="text-2xl font-semibold text-gray-600">Under Maintenance</h4>
                    </div>
                )}

                {/* CC Rates Section */}
                {showCLI && (
                    <div className="mt-6 ml-4 w-[95vw]">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead className="bg-[#005F73] text-white">
                                    <tr>
                                        {(editMode || deleteMode) && <th className="p-2 text-center">Select</th>}
                                        <th className="p-2 text-center">Country</th>
                                        <th className="p-2 text-center">Quality Description</th>
                                        <th className="p-2 text-center">Priority</th>
                                        <th className="p-2 text-center">Buying Range (USD)</th>
                                        <th className="p-2 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedRates.map((rate, index) => {
                                        const originalIndex = ccRates.findIndex(r => r._id === rate._id);
                                        const isSelected = selectedRow === originalIndex;
                                        const isSelectedForDelete = selectedToDelete.includes(rate._id);

                                        return (
                                            <tr
                                                key={rate._id}
                                                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} ${(editMode && isSelected) || (deleteMode && isSelectedForDelete)
                                                    ? 'ring-2 ring-blue-500'
                                                    : ''
                                                    }`}
                                                onClick={() => handleRowSelect(originalIndex)}
                                            >
                                                {(editMode || deleteMode) && (
                                                    <td className="p-2 text-center">
                                                        <input
                                                            type={editMode ? "radio" : "checkbox"}
                                                            checked={editMode ? isSelected : isSelectedForDelete}
                                                            onChange={() => handleRowSelect(originalIndex)}
                                                            className="h-4 w-4"
                                                        />
                                                    </td>
                                                )}
                                                <td className="p-2" style={{ width: "12%" }}>{rate.country}</td>
                                                <td className="p-2 ">{rate.qualityDescription}</td>
                                                <td className="p-2 text-center">
                                                    {editMode && isSelected ? (
                                                        <select
                                                            value={editData.priority}
                                                            onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                                                            className="border rounded px-2 py-1 w-full"
                                                        >
                                                            <option value="Low">Low</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="High">High</option>
                                                        </select>
                                                    ) : rate.priority}
                                                </td>
                                                <td className="p-2 text-center">
                                                    {editMode && isSelected ? (
                                                        <div className="flex items-center justify-center space-x-4">
                                                            <div className="flex items-center justify-between bg-green-50 border border-green-300 rounded px-2 py-1 w-32">
                                                                <input
                                                                    type="number"
                                                                    placeholder="LCR"
                                                                    value={editData.lcr}
                                                                    onChange={(e) => setEditData({ ...editData, lcr: e.target.value })}
                                                                    className="border rounded px-2 py-1 w-24 text-sm text-blue-700 font-semibold"
                                                                />                                                                <span className="text-green-700 text-xs font-medium">LCR</span>
                                                            </div>
                                                            <div className="flex items-center justify-between bg-red-50 border border-red-300 rounded px-2 py-1 w-32">
                                                                <input
                                                                    type="number"
                                                                    placeholder="HCR"
                                                                    value={editData.hcr}
                                                                    onChange={(e) => setEditData({ ...editData, hcr: e.target.value })}
                                                                    className="border rounded px-2 py-1 w-24 text-sm text-green-700 font-semibold"
                                                                />                                                                <span className="text-red-700 text-xs font-medium">HCR</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-center space-x-4">
                                                            <div className="flex items-center justify-between bg-green-50 border border-green-300 rounded px-2 py-1 w-32">
                                                                <span className="text-green-700 font-semibold">{rate.lcr}</span>
                                                                <span className="text-green-700 text-xs font-medium">LCR</span>
                                                            </div>
                                                            <div className="flex items-center justify-between bg-red-50 border border-red-300 rounded px-2 py-1 w-32">
                                                                <span className="text-red-700 font-semibold">{rate.hcr}</span>
                                                                <span className="text-red-700 text-xs font-medium">HCR</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-2 text-center">
                                                    {editMode && isSelected ? (
                                                        <select
                                                            value={editData.status}
                                                            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                                            className="border rounded px-2 py-1 w-full"
                                                        >
                                                            <option className="text-green-700" value="Active">Active</option>
                                                            <option className="text-red-700" value="Inactive">Inactive</option>
                                                        </select>
                                                    ) : (
                                                        <span className={rate.status === 'Active' ? 'text-green-700' : 'text-red-700'}>
                                                            {rate.status}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="flex justify-center items-center space-x-2 mt-4">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Popup for Add Form */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg p-6 w-[90vw] max-w-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Add Targeted Rate</h3>
                            <form onSubmit={handleAddCCRate} className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    className="border rounded px-3 py-2"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={formData.qualityDescription}
                                    onChange={(e) => setFormData({ ...formData, qualityDescription: e.target.value })}
                                    className="border rounded px-3 py-2"
                                    required
                                />
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="border rounded px-3 py-2"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <div className="flex space-x-4">
                                    <input
                                        type="number"
                                        placeholder="LCR"
                                        value={formData.lcr}
                                        onChange={(e) => setFormData({ ...formData, lcr: e.target.value })}
                                        className="border rounded px-3 py-2 w-1/2"
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="HCR"
                                        value={formData.hcr}
                                        onChange={(e) => setFormData({ ...formData, hcr: e.target.value })}
                                        className="border rounded px-3 py-2 w-1/2"
                                        required
                                    />
                                </div>

                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="border rounded px-3 py-2"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <div className="flex justify-end space-x-4 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 rounded bg-gray-300 text-black"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default TargetedRatePage;