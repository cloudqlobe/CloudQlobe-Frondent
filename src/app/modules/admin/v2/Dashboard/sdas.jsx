import React from 'react';
import { CheckCircle, Plane, Phone, Bus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fd] p-6 font-sans">
      <div className="text-3xl font-semibold text-gray-800 mb-1">Hello! Leon</div>
      <p className="text-gray-500 mb-6">
        Never put off till tomorrow what can be done today! 📛
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card title="480" subtitle="Go on" percent={100} color="bg-blue-500" />
        <Card title="180" subtitle="Intention" percent={60} color="bg-white" />
        <Card title="72" subtitle="Deal" percent={48} color="bg-white" />
        <Card title="72" subtitle="No intention" percent={0} color="bg-red-300" icon />
        <AutoCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-gray-500 mb-4 font-medium">Mockup</h2>
          <MockupItem icon={<Plane size={20} />} label="AIR PLANE" name="Daniel Gonzalez" />
          <MockupItem icon={<Phone size={20} />} label="TELEPHONE" name="Barbara Brown" />
          <MockupItem icon={<Bus size={20} />} label="BUS" name="Edward Martinez" />
        </div>
        <div>
          <h2 className="text-gray-500 mb-4 font-medium">Company</h2>
          <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg mb-1">FMOUNTAIN COMPANY</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Leading big data solution provider in China, aiming to use big data and artificial intelligence
              </p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow">
                🔒 UNLOCK
              </button>
            </div>
            <img
              src="https://img.icons8.com/fluency/96/skyscrapers.png"
              alt="Company"
              className="w-28"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, percent, color, icon }) => {
  return (
    <div
      className={`${color} ${
        color === 'bg-white' ? 'text-gray-800' : 'text-white'
      } rounded-xl shadow-md p-5 flex flex-col justify-between h-32 relative`}
    >
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-sm">{subtitle}</div>
      {icon && (
        <div className="absolute bottom-4 right-4 text-white opacity-30">
          <svg width="24" height="24" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-3.95 19.21l-1.41 1.41a1 1 0 0 0 1.41 1.41l1.41-1.41A10 10 0 1 0 12 2z" />
          </svg>
        </div>
      )}
      <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-blue-400 h-1.5 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

const AutoCard = () => {
  return (
    <div className="bg-[#252e52] text-white rounded-xl p-5 h-32 shadow-md relative">
      <div className="text-2xl font-bold">800</div>
      <div className="text-sm">Distribution</div>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
        <div className="bg-blue-400 h-1.5 rounded-full w-full"></div>
      </div>
      <div className="absolute top-3 right-3 bg-white text-gray-800 px-3 py-1 rounded-lg shadow text-xs">
        ✅ Work has been <br /> completed!
      </div>
    </div>
  );
};

const MockupItem = ({ icon, label, name }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between mb-3">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-2 rounded-full">{icon}</div>
        <div>
          <div className="font-semibold">{label}</div>
          <div className="text-sm text-gray-500">{name}</div>
        </div>
      </div>
      <div className="text-gray-400">⋮</div>
    </div>
  );
};

export default Dashboard;