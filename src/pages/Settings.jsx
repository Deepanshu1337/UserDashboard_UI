import React from 'react';
import UserTable from '../components/UserTable';

const Settings = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <UserTable isAnalyticalPage={false} />
    </div>
  );
};

export default Settings;