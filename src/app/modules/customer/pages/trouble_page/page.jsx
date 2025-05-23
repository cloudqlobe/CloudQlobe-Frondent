import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Loader2, Building2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../dash_layout/page";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosinstance";


// Tab Button component for selecting different views
const TabButton = ({ active, children, onClick, color }) => {
  const colorClasses = {
    blue: "border-blue-600",
    rose: "border-amber-600",
    orange: "border-orange-600",
    emerald: "border-emerald-600",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-4 text-sm font-bold transition-all relative rounded-xl shadow-sm border-2 ${
        active
          ? `${colorClasses[color]} text-gray-900`
          : "border-transparent bg-white text-gray-600 hover:text-gray-800"
      }`}
      style={{
        boxShadow: active ? `0 4px 12px -2px rgba(0, 0, 0, 0.08)` : undefined,
      }}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        {children}
      </div>
    </motion.button>
  );
};

// Table row component for displaying ticket data
const TicketTable = ({ ticket, customerData, onClick, onCellEdit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-red-100 text-red-700 border-red-200",
      inProgress: "bg-amber-100 text-amber-700 border-amber-200",
      resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <motion.tr
      key={ticket.id}
      whileHover={{ backgroundColor: "#f9fafb" }}
      onClick={() => onClick(ticket.id)}
      className="cursor-pointer transition duration-200"
    >
<td className="px-4 py-2 text-gray-900 font-medium border">
  {(ticket.ticketCategory || "N/A").toUpperCase()}
</td>
<td className="px-4 py-2 text-gray-900 font-medium border">
  {ticket.followUpMethod.toUpperCase()}
</td>
      <td className="px-4 py-2 border">
        <span
          className="text-gray-900 font-medium cursor-pointer"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onCellEdit(ticket.id, "accountManager", e.target.textContent)}
        >
          {ticket.accountManager}
        </span>
      </td>
      <td className="px-4 py-2 border">
        <span
          className="text-gray-900 font-medium cursor-pointer"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onCellEdit(ticket.id, "supportEngineer", e.target.textContent)}
        >
          {ticket.supportEngineer}
        </span>
      </td>
      <td className="px-4 py-2 border">
        <span className="text-gray-900 font-medium">{formatDate(ticket.ticketTime) || 'N/A'}</span>
      </td>
      <td className="px-4 py-2 border">
        <div
          className={`px-3 py-1 text-center rounded-full border ${getStatusColor(ticket.status)}`}
        >
          <span className="text-sm font-medium">
            {ticket.status.charAt(0).toUpperCase() +
              ticket.status.slice(1)}
          </span>
        </div>
      </td>
    </motion.tr>
  );
};

const FollowUp = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [troubleTicket, setTroubleTicket] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);
  const [customer_id, setCustomer_id] = useState(null);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // eslint-disable-next-line no-undef
      const decodedToken = jwtDecode(token);
      
      setCustomerId(decodedToken.customerId);
      setCustomer_id(decodedToken.id)
      setCompanyName(decodedToken.companyName || "");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!customer_id) return;

      try {
        const ticketResponse = await axiosInstance.get(`api/troubleticket`);        
        const filteredData = ticketResponse.data.troubletickets.filter(
          (item) => item.customerId == customer_id
        );        
        setTroubleTicket(filteredData);
        

        const customerIds = [
          ...new Set(filteredData.map((item) => item.customer_id)),
        ];
        const customers = {};
        for (const id of customerIds) {
          const response = await axiosInstance.get(`api/customer/${id}`);          
          customers[id] = response.data;
        }
        setCustomerData(customers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  const getFilteredTickets = () => {
    return troubleTicket.filter((ticket) => {
      if (activeTab === "all") return true;
      return ticket.status === activeTab;
    });
  };

  const handleRowClick = (ticketId) => {
  };

  const handleCellEdit = (ticketId, field, value) => {
    setTroubleTicket((prevData) =>
      prevData.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const filteredTickets = getFilteredTickets();
  
  const navigate = useNavigate('/add-ticket')
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-400 p-3 rounded-xl shadow-sm">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {companyName || "Ticket Dashboard"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Company ID: {customerId || "Loading..."}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-sm hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span onClick={()=>navigate("/add-ticket")} className="font-bold">Create Ticket</span>
              </motion.button>
            </div>

            <div className="flex space-x-4 px-8 py-6 overflow-x-auto">
              <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")} color="blue">
                All Tickets
              </TabButton>
              <TabButton active={activeTab === "Pending"} onClick={() => setActiveTab("Pending")} color="rose">
                Pending
              </TabButton>
              <TabButton active={activeTab === "inProgress"} onClick={() => setActiveTab("inProgress")} color="orange">
                In Progress
              </TabButton>
              <TabButton active={activeTab === "resolved"} onClick={() => setActiveTab("resolved")} color="emerald">
                Resolved
              </TabButton>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Follow Up Method</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Account Manager</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Support Engineer</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estimated Time</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredTickets.map((ticket) => (
                        <TicketTable
                          key={ticket.id}
                          ticket={ticket}
                          customerData={customerData}
                          onClick={handleRowClick}
                          onCellEdit={handleCellEdit}
                        />
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FollowUp;
