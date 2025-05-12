import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ChatSummaryChart = ({ data = [], summary = {}, fetchTransactionData, startDate, setStartDate, endDate, setEndDate, loading }) => {
  // Ensure data is formatted correctly
  const formattedData = data.map(item => ({
    ...item,
    _id: new Date(item._id).toLocaleDateString(), // Convert to readable date
  }));

  console.log("Chart Data:", formattedData);

  return (
    <div className="p-4 max-w-4xl mx-auto text-white shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Transaction Summary</h2>

        {/* Date Filters */}
        <div className="mb-4 flex gap-4">
            <input
                type="date"
                className="p-2 border rounded mx-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                className="p-2 border rounded mx-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={fetchTransactionData} className="px-4 py-2 bg-blue-500 text-black rounded">
                Filter
            </button>
        </div>

        {/* Summary Boxes */}
        <div className="grid grid-cols-3  mb-4">
            <div className=" bg-gray-100 rounded">Last Day: ৳{summary.lastDayTotal}</div>
            <div className=" bg-gray-100 rounded">Last 7 Days: ৳{summary.last7DaysTotal}</div>
            <div className=" bg-gray-100 rounded">Last 30 Days: ৳{summary.last30DaysTotal}</div>
        </div>

        {/* Loading State */}
        {loading ? (
            <p className="text-center text-gray-500">Loading data...</p>
        ) : (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" data={formattedData} stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        )}
    </div>
);
};

export default ChatSummaryChart;
