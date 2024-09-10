import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import EditUserModal from "../components/EditUserModal";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = ({ isAnalyticalPage }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsAddingUser(false);
  };

  const handleAddUser = () => {
    setSelectedUser({ id: uuidv4(), name: "", email: "", status: "Active" });
    setIsAddingUser(true);
  };

  const handleSaveUser = (updatedUser) => {
    setTimeout(() => {
      if (isAddingUser) {
        const newUser = { ...updatedUser, id: uuidv4() };
        const userList = [...users, newUser];
        setUsers(userList);
        localStorage.setItem("users", JSON.stringify(userList));
        toast.success(
          `Added: ${newUser.name}, ${newUser.email}, ${newUser.status}`,
          { autoClose: 2000 }
        );
      } else {
        const userList = users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...updatedUser } : user
        );
        setUsers(userList);
        localStorage.setItem("users", JSON.stringify(userList));
        toast.success(
          `Updated: ${updatedUser.name}, ${updatedUser.email}, ${updatedUser.status}`,
          { autoClose: 2000 }
        );
      }
      setSelectedUser(null);
      setIsAddingUser(false);
    }, 300);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
    setIsAddingUser(false);
  };

  const handleDeleteUser = (userId) => {
    setTimeout(() => {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("User deleted successfully", { autoClose: 2000 });
    }, 300);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">List of Users</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <label className="hidden sm:block text-xs sm:text-sm font-bold mr-2 mb-1 sm:mb-0">
            Search User
          </label>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow appearance-none border rounded-full py-1 sm:py-2 px-2 sm:px-3 text-gray-700 leading-tight text-xs sm:text-sm focus:outline-none focus:shadow-outline"
          />
        </div>
        {!isAnalyticalPage && (
          <button
            onClick={handleAddUser}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-sm focus:outline-none focus:shadow-outline"
          >
            Add User
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 border-b text-left">S. No.</th>
              <th className="py-3 px-4 border-b text-left">User Name</th>
              <th className="hidden md:inline-flex py-3 px-4 border-b text-left">User Email</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
              {!isAnalyticalPage && (
                <>
                  <th className="py-3 px-2 border-b text-left">Edit</th>
                  <th className="py-3 px-2 border-b text-left">Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4 text-left">{index + 1}</td>
                <td className="py-3 px-4 text-left">{user.name}</td>
                <td className="hidden md:table-cell py-3 px-4 text-left">{user.email}</td>
                <td className="py-3 px-4 text-left">
                  <div
                    className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                      user.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {user.status}
                  </div>
                </td>
               
                {!isAnalyticalPage && (
                  <>
                    <td className="py-3 px-2 text-left">
                      <button
                        onClick={() => handleUserSelect(user)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm focus:outline-none focus:shadow-outline"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-3 px-2 text-left">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm focus:outline-none focus:shadow-outline"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={handleCancelEdit}
          isAddingUser={isAddingUser}
        />
      )}
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default UserTable;