import { Bar, Line} from 'react-chartjs-2';
import "../Dashboard/dashboard.css";
import Layout from '../layout/page';
import {
  ChartBarIcon
} from "@heroicons/react/24/outline";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import adminContext from '../../../../../context/page';
import { useContext } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminHomePage = () => {
  const { adminDetails } = useContext(adminContext);

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Leads",
        data: [30, 45, 65, 50, 70, 90],
        backgroundColor: "#34D399",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Rates",
        data: [10, 15, 20, 15, 25, 30],
        borderColor: "#ef4444",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Layout>
      <main className="flex-grow p-4 bg-offwhite-100 mt-0" style={{ width: "98vw", marginLeft: "-140px" }}>
        <div className="mx-auto min-h-screen bg-[#f4f7fd] p-6 font-sans">
          <div className="text-3xl font-semibold text-gray-800 mb-1">Hello {adminDetails.name}</div>
          <p className="text-gray-500 mb-6">Never put off till tomorrow what can be done today! 📛</p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card title="480" subtitle="Go on" percent={100} color="bg-blue-500" />
            <Card title="180" subtitle="Intention" percent={60} color="bg-white" />
            <Card title="72" subtitle="Deal" percent={48} color="bg-white" />
            <Card title="72" subtitle="No intention" percent={0} color="bg-red-300" icon />
            <AutoCard />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
            <h3 className="text-xl font-bold text-gray-700 flex items-center space-x-3 mb-6">
              <ChartBarIcon className="w-8 h-8 text-blue-600" />
              <span>CHART ANALYSIS</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="chart-card bg-white p-4 rounded-lg h-80">
                <h4 className="text-lg font-semibold mb-4 text-gray-600">Lead Generation Over Time</h4>
                <Bar data={barData} options={chartOptions} />
              </div>

              <div className="chart-card bg-white p-4 rounded-lg h-80">
                <h4 className="text-lg font-semibold mb-4 text-gray-600">Rate Analysis Over Time</h4>
                <Line data={lineData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

// Card Component
const Card = ({ title, subtitle, percent, color, icon }) => {
  return (
    <div
      className={`${color} ${color === 'bg-white' ? 'text-gray-800' : 'text-white'} rounded-xl shadow-md p-5 flex flex-col justify-between h-32 relative`}>
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

// AutoCard Component
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

export default AdminHomePage;
