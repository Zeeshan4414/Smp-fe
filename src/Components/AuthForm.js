import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';


const AuthForm = ({ onClose = () => { }, isSignUp: initialSignUp = false, setIsLoggedIn = () => { } }) => {
  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); // For reset password
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);  // Show loading while processing
    try {
      let url;
      let method = 'POST'; // Default method

      if (isResetPassword) {
        // Password reset logic
        url = 'https://smp-be-mysql.vercel.app/auth/update-password'; // Updated URL
        method = 'PUT'; // Change to PUT for password reset
        const payload = { email, password, newPassword };
        await axios({ method, url, data: payload });

        console.log('Password reset successful');
        // Reset form fields and state
        setIsResetPassword(false);
        setEmail('');
        setNewPassword('');
        // Optionally, navigate to the login page or show a success message
      } else {
        // Sign up or sign in logic
        url = isSignUp
          ? 'https://smp-be-mysql.vercel.app/auth/signup' // Updated URL for signup
          : 'https://smp-be-mysql.vercel.app/auth/signin'; // Updated URL for signin
        const payload = { name, email, password };
        const response = await axios.post(url, payload);
        localStorage.setItem('authToken', response.data.token);
        setIsLoggedIn(true);
        navigate('/dashboard');
      }
      if (typeof onClose === 'function') {
        onClose();
        
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
    setIsResetPassword(true);
    setError('');
    navigate('/forget-password');
  };

  //     return (
  //         <div className="form-container">
  //             <h2>{isResetPassword ? 'Reset Password' : isSignUp ? 'Sign Up' : 'Sign In'}</h2>
  //             <form onSubmit={handleSubmit} className="auth-form">
  //                 {error && <p className="error-message">{error}</p>}
  //                 {!isResetPassword && isSignUp && (
  //                     <input
  //                         type="text"
  //                         placeholder="Name"
  //                         value={name}
  //                         onChange={(e) => setName(e.target.value)}
  //                         required
  //                         className="input-field"
  //                     />
  //                 )}
  //                 <input
  //                     type="email"
  //                     placeholder="Email"
  //                     value={email}
  //                     onChange={(e) => setEmail(e.target.value)}
  //                     required
  //                     className="input-field"
  //                 />
  //                 {!isResetPassword && (
  //                     <input
  //                         type="password"
  //                         placeholder="Password"
  //                         value={password}
  //                         onChange={(e) => setPassword(e.target.value)}
  //                         required
  //                         className="input-field"
  //                     />
  //                 )}
  //                 {isResetPassword && (
  //                     <input
  //                         type="password"
  //                         placeholder="New Password"
  //                         value={newPassword}
  //                         onChange={(e) => setNewPassword(e.target.value)}
  //                         required
  //                         className="input-field"
  //                     />
  //                 )}
  //                 <button type="submit" className="submit-btn">
  //                     {isResetPassword ? 'Reset Password' : isSignUp ? 'Sign Up' : 'Sign In'}
  //                 </button>
  //                 {!isResetPassword && (
  //                     <button type="button" onClick={toggleForm} className="toggle-btn">
  //                         {isSignUp ? 'Already have an account? Sign In' : 'New here? Sign Up'}
  //                     </button>
  //                 )}
  //                 {!isResetPassword && (
  //                     <button type="button" onClick={handleForgotPassword} className="forgot-password-btn">
  //                         Forgot Password?
  //                     </button>
  //                 )}
  //                 <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
  //                     Continue with Google
  //                 </button>
  //                 <button type="button" className="close-btn" onClick={onClose}>Close</button>
  //             </form>
  //         </div>
  //     );
  // };

  // export default AuthForm;

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500/50 rounded-lg z-10">
          <Loader />
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="w-full max-w-md">
          <div className={`${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity`}>
            <form onSubmit={handleSubmit} className=" bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                {isResetPassword ? "Reset Password" : isSignUp ? "Sign Up" : "Sign In"}
              </h2>

              {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}



              {!isResetPassword && isSignUp && (
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

              {!isResetPassword && (
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

              {isResetPassword && (
                <div className="mb-6">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  {isResetPassword ? "Reset Password" : isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </div>

              {!isResetPassword && (
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
                <button type="button" className="text-sm text-gray-500 hover:text-gray-800" onClick= {onClose = () => { navigate('/')}}>
                  Close
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthForm