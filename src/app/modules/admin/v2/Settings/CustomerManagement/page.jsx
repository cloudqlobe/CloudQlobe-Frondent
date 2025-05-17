import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../layout/page';
import axiosInstance from '../../utils/axiosinstance';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('companyName');
  const [search, setSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('');
  const [addedByFilter, setAddedByFilter] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('api/customers');
        setCustomers(response.data.customer || []);
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Failed to fetch customers');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleSort = (field) => setSort(field);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    // Reset filters when searching
    setLeadStatusFilter('');
    setAddedByFilter('');
  };

  const handleAddLead = () => navigate('/admin/Addlead');

  const handleLeadStatusFilter = (status) => {
    setLeadStatusFilter(status);
    setSearch(''); // Clear search when applying filter
  };

  const handleAddedByFilter = (addedBy) => {
    setAddedByFilter(addedBy);
    setSearch(''); // Clear search when applying filter
  };

  const promptDeleteCustomer = (customerId) => {
    setCustomerToDelete(customerId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;

    try {
      await axiosInstance.delete(`api/superAdmin/deleteCustomer/${customerToDelete}`);
      setCustomers(prev => prev.filter(customer => customer.id !== customerToDelete));
      toast.success('Customer deleted successfully!');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer');
    } finally {
      setShowDeleteModal(false);
      setCustomerToDelete(null);
    }
  };

  const getLeadStatusColor = (status) => {
    switch (status) {
      case 'junk':
        return 'text-red-500';
      case 'hot':
        return 'text-orange-500';
      case 'new':
        return 'text-blue-500';
      case 'active':
        return 'text-green-500';
      case 'inactive':
        return 'text-gray-500';
      default:
        return 'text-black';
    }
  };

  const filteredAndSortedCustomers = customers
    .filter(customer => {
      // Check if the lead status matches the filter
      const leadStatusMatch =
        leadStatusFilter === '' || customer.leadStatus === leadStatusFilter;

      // Check if added by matches the filter
      const addedByMatch =
        addedByFilter === '' ||
        (addedByFilter === 'Self Registered'
          ? !customer.futureUseOne
          : customer.futureUseOne === addedByFilter);

      // Check if the search term matches any customer property
      const searchMatch = search === '' ||
        Object.values(customer).some(value => {
          if (value === null || value === undefined) return false;
          if (Array.isArray(value)) {
            return value
              .map(item => String(item).toLowerCase())
              .join(', ')
              .includes(search.toLowerCase());
          }
          return String(value).toLowerCase().includes(search.toLowerCase());
        });

      return leadStatusMatch && addedByMatch && searchMatch;
    })
    .sort((a, b) => {
      const aValue = a[sort] || '';
      const bValue = b[sort] || '';

      if (sort === 'futureUseOne') {
        const aSortValue = String(aValue || 'self registered').toLowerCase();
        const bSortValue = String(bValue || 'self registered').toLowerCase();
        return aSortValue.localeCompare(bSortValue);
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      if (Array.isArray(aValue) && Array.isArray(bValue)) {
        const aJoined = aValue.map(item => String(item)).join(', ');
        const bJoined = bValue.map(item => String(item)).join(', ');
        return aJoined.localeCompare(bJoined);
      }

      return 0;
    });

  return (
    <Layout>
      <div className="p-8 text-gray-800 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-black">Customer Management</h1>
        <p className="text-gray-600 mb-6">Manage customers and leads here.</p>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddLead}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap"
          >
            Add New Lead
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex flex-wrap gap-2 mr-4">
            <span className="font-medium self-center">Lead Status:</span>
            <button
              onClick={() => handleLeadStatusFilter('')}
              className={`px-4 py-2 rounded-lg border ${leadStatusFilter === '' ? 'bg-indigo-500 text-white' : 'border-indigo-500 text-indigo-500 bg-white'
                }`}
            >
              All
            </button>
            {['new', 'hot', 'active', 'inactive', 'junk'].map(status => (
              <button
                key={status}
                onClick={() => handleLeadStatusFilter(status)}
                className={`px-4 py-2 rounded-lg border ${getLeadStatusColor(status)} ${leadStatusFilter === status ? 'bg-opacity-20' : 'border-current'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="font-medium self-center">Added By:</span>
            <button
              onClick={() => handleAddedByFilter('')}
              className={`px-4 py-2 rounded-lg border ${addedByFilter === '' ? 'bg-indigo-500 text-white' : 'border-indigo-500 text-indigo-500 bg-white'
                }`}
            >
              All
            </button>
            <button
              onClick={() => handleAddedByFilter('Self Registered')}
              className={`px-4 py-2 rounded-lg border ${addedByFilter === 'Self Registered' ? 'bg-gray-500 text-white' : 'border-gray-500 text-gray-500 bg-white'
                }`}
            >
              Self Registered
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredAndSortedCustomers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg">No customers found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('companyName')}>
                    Company Name {sort === 'companyName' && '↓'}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('contactPerson')}>
                    Contact Person {sort === 'contactPerson' && '↓'}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('userEmail')}>
                    Contact Email {sort === 'userEmail' && '↓'}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('country')}>
                    Country {sort === 'country' && '↓'}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('futureUseOne')}>
                    Added By {sort === 'futureUseOne' && '↓'}
                  </th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCustomers.map(customer => (
                  <tr key={customer.id} className="border hover:bg-gray-50">
                    <td
                      className="py-2 px-4 border"
                    >
                      {customer.companyName}
                    </td>
                    <td className="py-2 px-4 border">{customer.contactPerson}</td>
                    <td className="py-2 px-4 border">{customer.userEmail}</td>
                    <td className="py-2 px-4 border">{customer.country}</td>
                    <td className="py-2 px-4 border">
                      {customer.accountManager ? customer.accountManager : 'Self Registered'}
                    </td>
                    <td className="py-2 px-4 border">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            promptDeleteCustomer(customer.id);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Confirm Deletion</h3>
                <button
                  onClick={cancelDelete}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete this customer? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomersPage;