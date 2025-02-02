import { useState } from "react";
import axios from "axios";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendLink = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post("https://smp-be-mysql.vercel.app/auth/forgot-password", { email });
      setMessage(response.data.msg || "A reset link has been sent to your email.");
      setError(""); // Clear any previous error
      setEmail("");
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your email, and we'll send you a reset link.
        </p>

        <form onSubmit={handleSendLink} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Success Message */}
        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
