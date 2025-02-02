// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Header.css';
// import AuthForm from './AuthForm';
// import logo from '../pictures/logo.jpeg';

// function Header() {

//   const homeRef = useRef(null)
//   const featuresRef = useRef(null)
//   const aboutRef = useRef(null)
//   const contactRef = useRef(null)

//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [showAuthForm, setShowAuthForm] = useState(false);
//     const [isSignUp, setIsSignUp] = useState(false);
//     const navigate = useNavigate();
//     const scrollTo = (ref) => {
//       ref.current.scrollIntoView({ behavior: "smooth" })
//     }
//     useEffect(() => {
//         const tokenFromUrl = new URLSearchParams(window.location.search).get('token');
//         if (tokenFromUrl) {
//             localStorage.setItem('token', tokenFromUrl);
//             setIsLoggedIn(true);
//             window.history.replaceState({}, document.title, "/dashboard"); // Remove token from URL
//         } else {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 setIsLoggedIn(true);
//             }
//         }

//         const loadGoogleAuth = () => {
//             if (window.gapi) {
//                 window.gapi.load('auth2', () => {
//                     window.gapi.auth2.init({
//                         client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google client ID
//                     });
//                 });
//             }
//         };

//         const checkGapi = setInterval(() => {
//             if (window.gapi) {
//                 clearInterval(checkGapi);
//                 loadGoogleAuth();
//             }
//         }, 100);

//         return () => clearInterval(checkGapi); // Clean up the interval on component unmount
//     }, []);

//     const handleLoginClick = () => {
//         setIsSignUp(false);
//         setShowAuthForm(true);
//     };

//     const handleSignupClick = () => {
//         setIsSignUp(true);
//         setShowAuthForm(true);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');

//         const auth2 = window.gapi?.auth2?.getAuthInstance();
//         if (auth2) {
//             auth2.signOut().then(() => {
//                 auth2.disconnect();
//                 console.log('User signed out from Google.');
//             });
//         }

//         setIsLoggedIn(false);
//         navigate('/');
//     };

//     const handleCloseAuthForm = () => {
//         setShowAuthForm(false);
//     };

//     return (
//         <>
//             <header className="header">
//                 <div className="logo" onClick={() => navigate('/')}>
//                     <img src={logo} alt="Logo" className="logo-image" />
//                     <h1>Social Manager Pro</h1>
//                 </div>
//                 <nav className="nav-links">
//                     <a href="#home">Home</a>
//                     <a href="#about">About</a>
//                     <a href="#contact">Contact</a>
//                 </nav>
//                 <div className="auth-buttons">
//                     {isLoggedIn ? (
//                         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//                     ) : (
//                         <>
//                             <button className="login-btn" onClick={handleLoginClick}>Login</button>
//                             <button className="signup-btn" onClick={handleSignupClick}>Signup</button>
//                         </>
//                     )}
//                 </div>
//             </header>
//             {showAuthForm && (
//                 <div className="auth-form-overlay">
//                     <AuthForm
//                         onClose={handleCloseAuthForm}
//                         isSignUp={isSignUp}
//                         setIsLoggedIn={setIsLoggedIn}
//                     />
//                 </div>
//             )}
//         </>
//     );
// }
import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react";
import logoimage from "../pictures/logo.jpeg"

const Header = ({ logo, homeRef, featuresRef, aboutRef, contactRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: "Home", ref: homeRef },
    { name: "Features", ref: featuresRef },
    { name: "About", ref: aboutRef },
    { name: "Contact", ref: contactRef },
  ]

  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="bg-gray-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logoimage} alt="Logo" className="h-8 w-auto mr-3 rounded-lg" />
            <Link to="/" className="text-2xl font-bold text-blue-600">
            {/* <img src={logo} alt="Logo" className="logo-image" /> */}
              SMP
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  scrollTo(item.ref)
                  setIsMenuOpen(false)
                }}
                className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-md font-bold transition duration-150 ease-in-out"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  scrollTo(item.ref)
                  setIsMenuOpen(false)
                }}
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

