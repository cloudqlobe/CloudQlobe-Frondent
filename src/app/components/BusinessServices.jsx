import React from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const BusinessServices = () => {
  const services = [
    "Online media assistance",
    "Business consulting",
    "No spam",
    "24/7 customer support",
    "Email assistance",
    "Account manager",
  ];

  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left Section */}
      <div  className="md:w-4/5 flex justify-around w-full">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl font-semibold text-gray-700 mb-8 text-left">
          You are always our first <br />
          priority
        </h1>

        {/* Service List */}
        <ul className="space-y-4">
          {services.map((service, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="text-green-500 w-5 h-5" />
              <span className="text-gray-600 text-lg">{service}</span>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex items-center justify-between  md:justify-start md:space-x-4 w-full px-3 md:px-0 ">
      <button
        onClick={() => navigate("/modules/auth/Base/login")}
        className="w-32 md:w-48 py-3 text-sm md:text-base text-white rounded-md bg-blue-400 hover:bg-blue-500 transition-all duration-300"
      >
        FREE DEMO
      </button>
      <button
        onClick={() => navigate("/pricing")}
        className="w-32 md:w-48 py-3 text-sm md:text-base text-white rounded-md bg-orange-400 hover:bg-orange-500 transition-all duration-300"
      >
        RATES
      </button>
    </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 md:flex hidden justify-center">
        <img
          src="/images/12.svg"
          alt="Person sitting at desk with laptop"
          width={500}
          height={400}
          className="w-full max-w-md object-contain"
        />
      </div>
      </div>
    </div>
  );
};

export default BusinessServices;
