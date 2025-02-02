import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const baseURL = 'https://smp-be-mysql.vercel.app'; // Replace with your backend's base URL

    const handleUpdateEmail = async () => {
        try {
            const response = await axios.put(`${baseURL}/auth/update-email`, { email }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log(response.data);
            alert('Email updated successfully!');
            setEmail(''); // Reset email input
        } catch (error) {
            console.error('Error updating email:', error.response?.data || error.message);
            alert(error.response?.data?.msg || 'Failed to update email.');
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const response = await axios.put(`${baseURL}/auth/update-password`, { password, newPassword }, {
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
        try {
            const response = await axios.delete(`${baseURL}/auth/delete`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Settings</h2>
    
        {/* Update Email Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Update Email</h3>
          <div className="flex items-center space-x-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your new email"
              className="w-[32rem] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-500 text-gray-800"
            />
            <button
              onClick={handleUpdateEmail}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update Email
            </button>
          </div>
        </div>
    
        {/* Update Password Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Update Password</h3>
          <div className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Current password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-500 text-gray-800"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-gray-500 text-gray-800"
            />
            <button
              onClick={handleUpdatePassword}
              className="w-[12rem] h-auto mx-auto flex justify-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update Password
            </button>
          </div>
        </div>
    
        {/* Delete Account Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Delete Account</h3>
          <p className="text-gray-600 mb-6">
            Warning: Deleting your account is permanent. Please be sure before proceeding.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="w-[12rem] py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
          >
            Delete Account
          </button>
        </div>
      </div>
    );
  }    

export default Settings;
