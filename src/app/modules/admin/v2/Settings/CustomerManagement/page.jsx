import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../layout/page';
import axiosInstance from '../../utils/axiosinstance';

const CustomersPage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('companyName');
  const [search, setSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('');
  const [addedByFilter, setAddedByFilter] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState({
    customerId: null,
    userId: '',
    fromManager: '',
    fromManagerId: '',
    toManager: '',
    toManagerId: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [accountManagers, setAccountManagers] = useState([]);
console.log(accountManagers);

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

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axiosInstance.get('api/admin/allsaleMember');
        console.log(res.data);
        
        setAccountManagers(res.data.members || []);
      } catch (error) {
        console.error('Error fetching managers', error);
      }
    };
    fetchManagers();
  }, []);

  const handleSort = (field) => setSort(field);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setLeadStatusFilter('');
    setAddedByFilter('');
  };

  const handleAddLead = () => navigate('/admin/Addlead');

  const handleLeadStatusFilter = (status) => {
    setLeadStatusFilter(status);
    setSearch('');
  };

  const handleAddedByFilter = (managerId) => {
    setAddedByFilter(managerId);
    setSearch('');
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

  const handleTransferClick = (customer) => {
    setTransferData({
      customerId: customer.customerId,
      userId: customer.id,
      fromManager: customer.accountManager || 'Self Registered',
      fromManagerId: customer.memberId,
      toManager: '',
      toManagerId: '',
      note: '',
      date: new Date().toISOString().split('T')[0],
    });
    setShowTransferModal(true);
  };

  const handleTransferSubmit = async () => {
    const {
      customerId,
      userId,
      fromManager,
      fromManagerId,
      toManager,
      toManagerId,
      note,
      date
    } = transferData;
console.log(transferData);

    if (!toManagerId && !toManager) {
      toast.error('Please select a manager to transfer to.');
      return;
    }

    try {
      await axiosInstance.post('/api/superAdmin/transferCustomer',
        { customerId, userId, fromManager, fromManagerId, toManager, toManagerId, note, date });
      toast.success('Customer transferred successfully!');
      setShowTransferModal(false);
      const response = await axiosInstance.get('api/customers');
      setCustomers(response.data.customer || []);
    } catch (error) {
      console.error('Transfer failed:', error);
      toast.error(error.response?.data?.message || 'Failed to transfer customer.');
    }
  };

  const getLeadStatusColor = (status) => {
    switch (status) {
      case 'junk': return 'text-red-500';
      case 'hot': return 'text-orange-500';
      case 'new': return 'text-blue-500';
      case 'active': return 'text-green-500';
      case 'inactive': return 'text-gray-500';
      default: return 'text-black';
    }
  };

  const filteredAndSortedCustomers = customers
    .filter(customer => {
      const leadStatusMatch = leadStatusFilter === '' || customer.leadStatus === leadStatusFilter;
      
      const addedByMatch = addedByFilter === '' || 
        (addedByFilter === 'Self Registered' 
          ? !customer.accountManager 
          : customer.memberId === addedByFilter);

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
      <div className="text-gray-800 min-h-screen" style={{ width: "96vw",marginLeft:"23px"}}>
        <h1 className="text-3xl font-bold mb-4 text-black">Customer Management</h1>
        <p className="text-gray-600 mb-6">Manage customers and leads here.</p>

        <div className="flex mb-6 gap-4">
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
              className={`px-4 py-2 rounded-lg border ${leadStatusFilter === '' ? 'bg-indigo-500 text-white' : 'border-indigo-500 text-indigo-500 bg-white'}`}
            >
              All
            </button>
            {['new', 'hot', 'active', 'inactive', 'junk'].map(status => (
              <button
                key={status}
                onClick={() => handleLeadStatusFilter(status)}
                className={`px-4 py-2 rounded-lg border ${getLeadStatusColor(status)} ${leadStatusFilter === status ? 'bg-opacity-20' : 'border-current'}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-medium">Added By:</span>
            <select
              value={addedByFilter}
              onChange={(e) => handleAddedByFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="Self Registered">Self Registered</option>
              {accountManagers.map(manager => (
                <option key={manager.id} value={manager.id}>
                  {manager.fullName}
                </option>
              ))}
            </select>
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
                    <td className="py-2 px-4 border">{customer.companyName}</td>
                    <td className="py-2 px-4 border">{customer.contactPerson}</td>
                    <td className="py-2 px-4 border">{customer.userEmail}</td>
                    <td className="py-2 px-4 border">{customer.country}</td>
                    <td className="py-2 px-4 border">
                      {customer.accountManager || 'Self Registered'}
                    </td>
                    <td className="py-2 px-4 border">
                      <div className="flex gap-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                          onClick={() => handleTransferClick(customer)}
                        >
                          Transfer Manager
                        </button>
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

        {showTransferModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Transfer Manager</h3>
                <button onClick={() => setShowTransferModal(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">From Account Manager</label>
                <input
                  type="text"
                  value={transferData.fromManager}
                  disabled
                  className="mt-1 w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">To Account Manager</label>
                <select
                  className="mt-1 w-full border rounded px-3 py-2"
                  value={transferData.toManagerId}
                  onChange={(e) => {
                    const selectedManager = accountManagers.find(
                      (manager) => manager.id == e.target.value
                    );
                    console.log(selectedManager);
                    console.log(e.target.value);
                    
                    setTransferData({
                      ...transferData,
                      toManager: selectedManager ? selectedManager.fullName : "",
                      toManagerId: e.target.value,
                    });
                  }}
                >
                  <option value="">Select a manager</option>
                  {accountManagers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Note</label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Enter note..."
                  value={transferData.note}
                  onChange={(e) => setTransferData({ ...transferData, note: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowTransferModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleTransferSubmit}
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        )}

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