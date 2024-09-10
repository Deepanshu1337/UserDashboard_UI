import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditUserModal from "../components/EditUserModal";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialUsers = [
  {
    id: "1e8b6c40-8e60-4a6b-bae4-45e379c09f5a",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "Active",
  },
  {
    id: "2f8d6e61-3b20-4c3d-97a1-4b5e6d726f2b",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    status: "Inactive",
  },
  {
    id: "3g9e7f72-9c30-4d4e-a7b1-56c7d8e81b2c",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    status: "Active",
  },
  {
    id: "4h0f8g83-0d40-4e5f-8b2a-67d8e9f92c3d",
    name: "David Wilson",
    email: "david.wilson@example.com",
    status: "Active",
  },
  {
    id: "5i1g9h94-1e50-4f6a-9c3b-78e9f0g03d4e",
    name: "Eva Adams",
    email: "eva.adams@example.com",
    status: "Inactive",
  },
  {
    id: "6j2h0k05-2f60-4g7b-a4c4-89f0g1h14e5f",
    name: "Frank Miller",
    email: "frank.miller@example.com",
    status: "Active",
  },
  {
    id: "7k3i1l16-3g70-4h8c-b5d5-90g1h2i25f6g",
    name: "Grace Lee",
    email: "grace.lee@example.com",
    status: "Inactive",
  },
  {
    id: "8l4j2m27-4h80-5i9d-c6e6-01h2i3j36g7h",
    name: "Henry Walker",
    email: "henry.walker@example.com",
    status: "Active",
  },
  {
    id: "9m5k3n38-5i90-6j0e-d7f7-12i3j4k47h8i",
    name: "Isabella Harris",
    email: "isabella.harris@example.com",
    status: "Inactive",
  },
  {
    id: "0n6l4o49-6j00-7k1f-e8g8-23j4k5l58i9j",
    name: "James Clark",
    email: "james.clark@example.com",
    status: "Active",
  },
];

const UserTable = ({ isAnalyticalPage }) => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);


  // function for selecting current user
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsAddingUser(false);
  };

  // function for genrating new user with uuid
  const handleAddUser = () => {
    setSelectedUser({ id: uuidv4(), name: "", email: "", status: "Active" });
    setIsAddingUser(true);
  };

  // function for adding new user or updating new user
  const handleSaveUser = (updatedUser) => {
    setTimeout(() => {
      if (isAddingUser) {
        const newUser = { ...updatedUser, id: uuidv4() };
        const userList = [...users, newUser];
        setUsers(userList);
        toast.success(
          `Added: ${newUser.name}, ${newUser.email}, ${newUser.status}`,
          { autoClose: 2000 }
        );
      } else {
        const userList = users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...updatedUser } : user
        );
        setUsers(userList);
        toast.success(
          `Updated: ${updatedUser.name}, ${updatedUser.email}, ${updatedUser.status}`,
          { autoClose: 2000 }
        );
      }
      setSelectedUser(null);
      setIsAddingUser(false);
    }, 300);
  };


  // function for handling cancel button
  const handleCancelEdit = () => {
    setSelectedUser(null);
    setIsAddingUser(false);
  };

  // function for handling user deletion
  const handleDeleteUser = (userId) => {
    setTimeout(() => {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      toast.success("User deleted successfully", { autoClose: 2000 });
    }, 300);
  };

  // function for implimention dynamic search 
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm focus:outline-none focus:shadow-outline"
          >
            Add User
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-3 border-b text-left text-xs sm:text-sm">S. No.</th>
              <th className="py-2 px-3 border-b text-left text-xs sm:text-sm">User Name</th>
              <th className="py-2 px-3 border-b text-left text-xs sm:text-sm max-w-[200px] whitespace-normal overflow-hidden text-ellipsis">User Email</th>
              <th className="py-2 px-3 border-b text-left text-xs sm:text-sm">Status</th>
              {!isAnalyticalPage && (
                <>
                  <th className="py-2 px-3 border-b text-left text-xs sm:text-sm">Edit</th>
                  <th className="py-2 px-3 border-b text-left text-xs sm:text-sm">Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-3 text-left text-xs sm:text-sm">{index + 1}</td>
                <td className="py-2 px-3 text-left text-xs sm:text-sm">{user.name}</td>
                <td className="py-2 px-3 text-left text-xs sm:text-sm max-w-[200px] whitespace-normal overflow-hidden text-ellipsis">{user.email}</td>
                <td className="py-2 px-3 text-left text-xs sm:text-sm">
                  <div
                    className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${
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
                    <td className="py-2 px-2 text-left">
                      <button
                        onClick={() => handleUserSelect(user)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm focus:outline-none focus:shadow-outline"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-2 px-2 text-left">
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
