import React, { useState, useEffect } from 'react';
import {
  Building2,
  Hash,
  Mail,
  Users,
  Globe,
  Activity,
  Trophy
} from 'lucide-react';
import DashboardLayout from '../dash_layout/page';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../../utils/axiosinstance';
import CurrencyTicker from '../../../../components/TickerCli';
import CurrencyTickerCC from '../../../../components/TickerCC';

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [profileData, setProfileData] = useState(null);

  const stats = [
    { icon: Users, label: 'Active Users', value: '500', trend: '+12%' },
    { icon: Trophy, label: 'Success Ratio', value: '98%', trend: '+1%' },
    { icon: Globe, label: 'Destinations', value: '50', trend: '+8%' },
    { icon: Activity, label: 'Carriers Interconnections', value: '250+', trend: '+2%' },
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const customerId = decoded.id;
          console.log(customerId);

          const response = await axiosInstance.get(`api/customer/${customerId}`);
          console.log(response.data.customer, "data profile")
          setProfileData(response.data.customer);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchProfileData();
  }, []);
  const company = {
    id: profileData?.customerId || "NA",
    name: profileData?.companyName || "NA",
    email: profileData?.companyEmail || "NA",
    country: profileData?.country || "NA"
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full overflow-x-hidden">
        <div className="flex flex-col bg-white items-center space-y-8 px-4 py-4 w-full max-w-[1400px] mx-auto">
          <div className=" " style={{ maxWidth: "100%", width: "100%" }}>
            <div className="flex bg-gray-200 rounded-lg shadow-lg p-6 gap-6">
              {/* Welcome Section */}
              <div className="w-1/3 flex flex-col justify-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="text-orange-600" size={28} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome back to our<br />
                  dashboard 👋
                </h1>
                <p className="text-gray-500">Stay updated with our latest Updates</p>
                <div className="flex space-x-2 mt-4">

                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px bg-gray-100" />

              {/* Company Details Section */}
              <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Hash size={18} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-500">Customer ID</span>
                  </div>
                  <p className="text-gray-800 font-medium pl-7">{company.id}</p>
                </div>

                <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Building2 size={18} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-500">Company Name</span>
                  </div>
                  <p className="text-gray-800 font-medium pl-7">{company.name}</p>
                </div>

                <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail size={18} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-500">Contact Email</span>
                  </div>
                  <p className="text-gray-800 font-medium pl-7">{company.email}</p>
                </div>

                <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Globe size={18} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-500">Country</span>
                  </div>
                  <p className="text-gray-800 font-medium pl-7">{company.country}</p>
                </div>
              </div>
            </div>
            
            <CurrencyTickerCC />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const backgroundColors = [

                  'bg-green-500',
                  'bg-orange-400',
                  'bg-blue-400',
                  'bg-rose-500'
                ];

                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${selectedCard === index ? 'ring-2 ring-white-500' : ''
                      } ${backgroundColors[index % backgroundColors.length]}`}
                    onClick={() => setSelectedCard(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Icon className="text-orange-600" size={24} />
                      </div>
                      <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-white' : 'text-red-500'}`}>
                        {stat.trend}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mt-4">{stat.value}</h3>
                    <p className="text-white text-sm">{stat.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="bg-white p-4 mx-4 rounded-xl shadow-sm overflow-hidden">
              <CurrencyTicker />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};


export default Dashboard;