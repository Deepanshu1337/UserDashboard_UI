import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register necessary components and plugins
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        data: [44, 55, 13, 33],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Distribution of Product Categories</h2>
      <div className="p-5  w-full max-w-2xl mx-auto h-[400px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;