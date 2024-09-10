import React from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import UserTable from '../components/UserTable';

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <BarChart />
      </div>
      <div>
        <PieChart />
      </div>
      <div className="md:col-span-2">
        <UserTable isAnalyticalPage={true}/>
      </div>
    </div>
  );
};

export default Analytics;