import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosinstance';
import Layout from '../../layout/page';

const ManagerTransfersPage = () => {
    const [transfers, setTransfers] = useState([]);
    const [filteredTransfers, setFilteredTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const response = await axiosInstance.get('/api/superAdmin/manager-transfers');
                setTransfers(response.data.transferManager);
                setFilteredTransfers(response.data.transferManager);
            } catch (error) {
                console.error('Error fetching transfers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransfers();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredTransfers(transfers);
        } else {
            const filtered = transfers.filter(transfer =>
                transfer.customerId.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTransfers(filtered);
        }
    }, [searchTerm, transfers]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <Layout>
            <div className=" text-gray-800 min-h-screen" style={{ width: "95vw", marginLeft: "-124px" }}>
                <h1 className="text-3xl font-bold mb-4 text-black">Lead Transfer</h1>
                <p className="text-gray-600 mb-6">Lead Transfer Details </p>

                <div className="flex mb-6 gap-4">
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search by Customer ID..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                </div>
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="py-3 px-4 text-left cursor-pointer">
                                    Customer ID
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer">
                                    From Manager
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer">
                                    To Manager
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer">
                                    Note
                                </th>
                                <th className="py-3 px-4 text-left cursor-pointer">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransfers.map(customer => (
                                <tr key={customer.id} className="border hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{customer.customerId}</td>
                                    <td className="py-2 px-4 border">{customer.fromManager}</td>
                                    <td className="py-2 px-4 border">{customer.toManager}</td>
                                    <td className="py-2 px-4 border">{customer.note}</td>
                                    <td className="py-2 px-4 border">
                                        {new Date(customer.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default ManagerTransfersPage;