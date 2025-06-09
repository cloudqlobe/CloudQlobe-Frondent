import React, { useEffect, useState } from 'react';
import Layout from '../../layout/page';
import axiosInstance from '../../utils/axiosinstance';

const TargetedRatePage = () => {
    const [showCLI, setShowCLI] = useState(true);
    const [ccRates, setCcRates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [editMode, setEditMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editData, setEditData] = useState({});
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState([]);

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

    const filteredRates = ccRates.filter(rate =>
        rate.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="p-6 text-gray-900" style={{ marginLeft: "-172px" }}>
                <h2 className="text-xl font-bold flex items-center ml-4">TARGETED RATES</h2>

                {/* Tab Buttons */}
                <div className="mt-4 flex space-x-4 ml-4">
                    <button
                        onClick={() => setShowCLI(false)}
                        className={`px-4 py-2 rounded ${!showCLI ? 'bg-orange-500 text-white' : 'bg-orange-500 text-black'}`}
                    >
                        CLI Rates
                    </button>
                    <button
                        onClick={() => setShowCLI(true)}
                        className={`px-4 py-2 rounded ${showCLI ? 'bg-green-500 text-white' : 'bg-green-500 text-black'}`}
                    >
                        CC Rates
                    </button>
                </div>

                {/* Action Buttons and Search Bar */}
                {showCLI && (
                    <div className="mt-4 ml-4 flex flex-col space-y-4">
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

                        {/* Search Bar */}
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Search by country..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            )}
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
                                        <th className="p-2 ml-0">Country</th>
                                        <th className="p-2 text-center">Quality Description</th>
                                        <th className="p-2 text-center">Priority</th>
                                        <th className="p-2 text-center">Buying Range (USD)</th>
                                        <th className="p-2 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRates.map((rate, index) => {
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
                                                <td className="p-2 ">{rate.country}</td>
                                                <td className="p-2 text-center">{rate.qualityDescription}</td>
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
                                                        <span className={rate.status === 'Active' ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                                                            {rate.status}
                                                        </span>
                                                    )}
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
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