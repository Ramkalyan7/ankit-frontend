import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dob: "",
    age: "",
    contactNumber: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      //const response = await axios.get("http://localhost:8000/profile"); // Replace with your actual endpoint
      const response = await axios.get("http://localhost:8000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditMode(true);
    setEditedData(userData);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");
    try {
      // await axios.put("http://localhost:8000/profile", editedData); // Replace with your actual endpoint
      await axios.put("http://localhost:8000/profile", editedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(editedData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="py-20">
      <div className="max-w-md mx-auto  p-6 bg-white rounded-md shadow-md  ">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          {editMode ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.name}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          {editMode ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Date of Birth
          </label>
          {editMode ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              name="dob"
              value={editedData.dob}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.dob}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Age</label>
          {editMode ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="age"
              value={editedData.age}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.age}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Contact Number
          </label>
          {editMode ? (
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="contactNumber"
              value={editedData.contactNumber}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.contactNumber}</span>
          )}
        </div>
        <div className="flex items-center">
          {editMode ? (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
