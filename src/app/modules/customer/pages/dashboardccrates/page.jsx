import React, { useState, useEffect } from "react";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import {jwtDecode} from "jwt-decode";
import DashboardLayout from "../dash_layout/page";
import axiosInstance from "../../../utils/axiosinstance";

const NormalRatesPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("countryCode");
  const [normalRatesData, setNormalRatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRates, setSelectedRates] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const [showSelectColumn, setShowSelectColumn] = useState(false);
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.id;
  };

  useEffect(() => {
    const fetchCustomerAndRates = async () => {
      setLoading(true);
      try {
        const customerId = getCustomerIdFromToken();
        if (customerId) {
          const customerResponse = await axiosInstance.get(
            `api/customer/${customerId}`
          );
          setCustomerData(customerResponse.data.customer);

          const ratesResponse = await axiosInstance.get("api/admin/ccrates");
          setNormalRatesData(ratesResponse.data.ccrates);
        }
      } catch (error) {
        console.error("Error fetching customer or rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAndRates();
  }, []);

  const handleAddSelectedToMyRates = async (e) => {
    e.preventDefault()
    const customerId = getCustomerIdFromToken();
    if (!customerId) {
      console.error("Customer ID not found in token");
      return;
    }

    try {
      for (const rate of selectedRates) {
        await axiosInstance.put(`api/myrate/${customerId}`, {
          rate: "CC",
          rateId: rate._id,
          testStatus: rate.testStatus,
          addedTime: rate.addedTime,
        });
      }
      alert("Selected rates successfully added to My Rates:");
      // window.alert("Rate(s) added Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding selected rates to My Rates:", error);
    }
  };

  const filteredData = normalRatesData.filter((item) =>
    item.country.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    return sort === "countryName"
      ? a.country.localeCompare(b.country)
      : a.countryCode.localeCompare(b.countryCode);
  });

  const displayedData = showOnlySelected ? selectedRates : sortedData;

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-orange-300 border-solid rounded-full"
        />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100 text-gray-800">
        <div className="mt-6 flex items-center justify-between space-x-4">
          <div className="flex w-2/3 ml-5 space-x-2">
            <input
              type="text"
              placeholder="Search by country name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-orange-600 text-white font-regular rounded-lg hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
              Search
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowSelectColumn(!showSelectColumn)}
              className="px-6 py-2 bg-green-600 text-white font-regular mr-5 rounded-lg hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {showSelectColumn ? "Hide Select Rates" : "Select Rates"}
            </button>

            <button
              style={{ marginRight: "2em" }}
              onClick={() => setShowOnlySelected(!showOnlySelected)}
              className="w-10 h-10 bg-[#005F73] text-white rounded-full hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              <FunnelIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showOnlySelected && selectedRates.length > 0 && (
          <div className="mt-6 flex justify-left ml-4">
            <button
              onClick={handleAddSelectedToMyRates}
              className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center space-x-2 shadow-md hover:bg-green-700"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Selected to My Rates</span>
            </button>
          </div>
        )}

        <div className="tableContainer overflow-x-auto py-5 rounded-lg">
          <table className="rateTable w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-[#005F73] text-white uppercase tracking-wider rounded-lg">
                {showSelectColumn && (
                  <th className="p-2 text-center border border-gray-300">Select</th>
                )}
                <th className="p-2 text-center border border-gray-300 w-1/6">Country Code</th>
                <th className="p-2 text-center border border-gray-300 w-1/4">Country Name</th>
                <th className="p-2 text-center border border-gray-300">Quality Description</th>
                <th className="p-2 text-center border border-gray-300">Rate</th>
                <th className="p-2 text-center border border-gray-300">Profile</th>
                <th className="p-2 text-center border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${
                    index % 2 === 0 ? "bg-[#dde0e5]" : "bg-[#FFFFFF]"
                  } hover:bg-[#b5b8bc] transition duration-200 ease-in-out`}
                >
                  {showSelectColumn && (
                    <td className="p-2 text-center border border-gray-300">
                      <input
                        type="checkbox"
                        checked={selectedRates.some((rate) => rate._id === item._id)}
                        onChange={() => {
                          if (selectedRates.some((rate) => rate._id === item._id)) {
                            setSelectedRates(
                              selectedRates.filter((rate) => rate._id !== item._id)
                            );
                          } else {
                            setSelectedRates([...selectedRates, item]);
                          }
                        }}
                      />
                    </td>
                  )}
                  <td className="p-2 text-center border border-gray-300">{item.countryCode}</td>
                  <td className="p-2 text-center border border-gray-300">{item.country}</td>
                  <td className="p-2 text-center border border-gray-300">{item.qualityDescription}</td>
                  <td className="p-2 text-center border border-gray-300">{item.rate}</td>
                  <td className="p-2 text-center border border-gray-300">{item.profile}</td>
                  <td className="p-2 text-center border border-gray-300">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NormalRatesPage;