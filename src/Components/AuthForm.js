import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const AuthForm = ({ onClose = () => { }, isSignUp: initialSignUp = false, setIsLoggedIn = () => { } }) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSignUp(initialSignUp);

    setTimeout(() => {
      setIsLoading(false); // Hide loader after the delay
    }, 2000); // Adjust delay as needed
  }, [initialSignUp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true); // Show loading while processing

    if (isForgotPassword) {
      // Forgot Password Request
      try {
        const response = await axios.post("https://smp-be-mysql.vercel.app/auth/forgot-password", { email });
        setMessage(response.data.msg || "A reset link has been sent to your email.");
        setIsForgotPassword(false); // Hide the form after submission
        setEmail("");
      } catch (err) {
        setError(err.response?.data?.msg || "Something went wrong.");
      }
      setIsLoading(false); // Hide loading after processing
      return;
    }

    try {
      let url = isSignUp
        ? 'https://smp-be-mysql.vercel.app/auth/signup' // Updated URL for signup
        : 'https://smp-be-mysql.vercel.app/auth/signin'; // Updated URL for signin

      const payload = { name, email, password };
      const response = await axios.post(url, payload);

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setIsLoggedIn(true);
        navigate('/dashboard');
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      if (error.response) {
        setError(error.response.data.msg || 'Authentication failed.');
      } else if (error.request) {
        setError('No response from the server.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'https://smp-be-mysql.vercel.app/auth/google'; // Updated URL
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setError('');
  };

  return (
    <div className="form-container">
      <h2>{isForgotPassword ? 'Forgot Password' : isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      {message ? (
        <p className="success-message">{message}</p> // Display success message
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="error-message">{error}</p>}

          {isForgotPassword ? (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
              <button type="submit" className="submit-btn">
                Send Reset Link
              </button>
              <button type="button" onClick={() => setIsForgotPassword(false)} className="toggle-btn">
                Back to Sign In
              </button>
            </>
          ) : (
            <>
              {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500/50 rounded-lg z-10">
                  <Loader />
                </div>
              )}
              <div className="flex items-center justify-center min-h-screen bg-gray-300">
                <div className="w-full max-w-md">
                  <div className={`${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity`}>
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        {isSignUp ? "Sign Up" : "Sign In"}
                      </h2>

                      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

                      {isSignUp && (
                        <div className="mb-4">
                          <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      )}

                      <div className="mb-4">
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>

                      {!isForgotPassword && (
                        <div className="mb-6">
                          <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-6">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                          {isSignUp ? "Sign Up" : "Sign In"}
                        </button>
                      </div>

                      {!isForgotPassword && (
                        <div className="flex flex-col space-y-4">
                          <button type="button" onClick={toggleForm} className="text-sm text-blue-500 hover:text-blue-800">
                            {isSignUp ? "Already have an account? Sign In" : "New here? Sign Up"}
                          </button>

                          <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm text-blue-500 hover:text-blue-800"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      )}

                      <div className="mt-6">
                        <button
                          type="button"
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                          onClick={handleGoogleSignIn}
                        >
                          Continue with Google
                        </button>
                      </div>

                      <div className="mt-6 text-center">
                        <button type="button" className="text-sm text-gray-500 hover:text-gray-800" onClick={onClose}>
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default AuthForm;
