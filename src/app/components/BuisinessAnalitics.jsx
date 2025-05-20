import React, { useEffect, useState } from "react";
import { FaUsersCog } from "react-icons/fa";
import {
  FaUsers,
  FaGlobe,
  FaUserFriends, // new icon for carrier interconnections
  FaMapMarkerAlt,
} from "react-icons/fa";

const stats = [
  {
    title: "Carrier Interconnections",
    value: "250+",
    icon: <FaUsersCog />, // updated icon
    color: "#f97316", // orange-500
    percentage: 85,
  },
  {
    title: "Live Clients",
    value: "500+",
    icon: <FaUsers />,
    color: "#22c55e", // green-500
    percentage: 92,
  },
  {
    title: "Direct Destinations",
    value: "50+",
    icon: <FaMapMarkerAlt />,
    color: "#3b82f6", // blue-500
    percentage: 68,
  },
  {
    title: "Global Reach",
    value: "100+ Countries",
    icon: <FaGlobe />,
    color: "#8b5cf6", // purple-500
    percentage: 76,
  },
];

const BusinessAnalytics = () => {
  const [progress, setProgress] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) =>
        prev.map((val, i) =>
          val < stats[i].percentage ? val + 1 : val
        )
      );
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const getGradient = (value, color) =>
    `conic-gradient(${color} ${value * 3.6}deg, #e5e7eb 0deg)`;

  return (
    <div className="w-full py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4"
            >
              <div
                className="w-44 h-44 rounded-full flex items-center justify-center relative"
                style={{
                  background: getGradient(progress[index], stat.color),
                }}
              >
                <div className="w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center shadow-xl text-5xl text-gray-800">
                  <span
                    className="text-6xl" // Removed 'animate-bounce'
                    style={{ color: stat.color }}
                  >
                    {stat.icon}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600 text-center text-lg">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalytics;