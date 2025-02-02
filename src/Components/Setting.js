import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const baseURL = 'https://smp-be-mysql.vercel.app'; // Replace with your backend's base URL


  const handleUpdatePassword = async () => {
    try {
      const response = await axios.put(`${baseURL}/auth/update-password`, { email, password, newPassword }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response.data);
      alert('Password updated successfully!');
      setPassword(''); // Reset password input
      setNewPassword(''); // Reset newPassword input
    } catch (error) {
      console.error('Error updating password:', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Failed to update password.');
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('authToken')
    try {
      const response = await axios.delete(`${baseURL}/auth/delete`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      alert('Account deleted successfully!');
      localStorage.removeItem('token'); // Optionally clear the token
      // Optionally redirect the user after account deletion
      window.location.href = '/'; // Redirect to login or home page
    } catch (error) {
      console.error('Error deleting account:', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Failed to delete account.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Settings</h2>

      {/* Update Password Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">Update Password</h3>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Current password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpdatePassword}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-48 h-auto mx-auto flex"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">Delete Account</h3>
        <button
          onClick={handleDeleteAccount}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300 w-auto"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Settings;
