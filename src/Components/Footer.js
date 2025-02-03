// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Facebook, Twitter, Instagram } from "lucide-react";
// import logoImage from '../pictures/logo.jpeg';

// const Footer = () => {
//     return (
//         <footer className="bg-gray-800 text-white pt-8 px-0">
//             <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
//                 {/* Logo and Intro */}
//                 <div className="w-full md:w-1/3 mb-6 md:mb-0 flex items-center">
//                     <img src={logoImage || "/placeholder.svg"} alt="Social Manager Pro Logo" className="h-12 w-auto mr-4 rounded-full" />
//                     <div>
//                         <h3 className="text-2xl font-bold">Social Manager Pro</h3>
//                         <p className="text-gray-400">Empowering your social media presence</p>
//                     </div>
//                 </div>

//                 {/* Quick Links */}
//                 <div className="w-full md:w-1/3 mb-6 md:mb-0">
//                     <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//                     <ul className="space-y-2">
//                         <li>
//                             <Link to="/features" className="text-gray-400 hover:text-white transition duration-300">
//                                 Features
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/pricing" className="text-gray-400 hover:text-white transition duration-300">
//                                 Pricing
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/about" className="text-gray-400 hover:text-white transition duration-300">
//                                 About Us
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">
//                                 Contact
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>

//                 {/* Social Media Links */}
//                 <div className="w-full md:w-1/3">
//                     <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
//                     <div className="flex space-x-4">
//                         <a href="#" className="text-gray-400 hover:text-white transition duration-300">
//                             <Facebook className="h-6 w-6" />
//                         </a>
//                         <a href="#" className="text-gray-400 hover:text-white transition duration-300">
//                             <Twitter className="h-6 w-6" />
//                         </a>
//                         <a href="#" className="text-gray-400 hover:text-white transition duration-300">
//                             <Instagram className="h-6 w-6" />
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             {/* Privacy Policy Button */}
//             <div className="text-center mt-4">
//                 <Link to="/privacy-policy">
//                     <button
//                         className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
//                         Privacy Policy
//                     </button>
//                 </Link>
//             </div>
//             {/* Footer Bottom Text */}
//             <div className="mt-8 text-center text-gray-400 py-2 bg-black">
//                 <p>&copy; 2025 Social Manager Pro. All rights reserved.</p>
//             </div>

            
//         </footer>
//     );
// };

// export default Footer;
// import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Facebook, Twitter, Instagram } from "lucide-react";
// import logoImage from '../pictures/logo.jpeg';




// const Footer = () => {
//     const featuresRef = useRef(null)
//     const scrollTo = (ref) => {
//         ref.current.scrollIntoView({ behavior: "smooth" })
//       }
//     return (
//         <footer className="bg-gray-800 text-white pt-12 px-0">
//             <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
//                 {/* Logo and Intro */}
//                 <div className="w-full md:w-1/3 mb-6 md:mb-0 flex items-center pl-14">
//                     <img src={logoImage || "/placeholder.svg"} alt="Social Manager Pro Logo" className="h-12 w-auto mr-4 rounded-full" />
//                     <div>
//                         <h3 className="text-3xl font-bold text-white">Social Manager Pro</h3>
//                         <p className="text-gray-400 text-sm">Empowering your social media presence</p>
//                     </div>
//                 </div>

//                 {/* Quick Links - 2 columns */}
//                 <div className="flex flex-col justify-center items-center  md:w-1/3 mb-6 md:mb-0">
//   {/* Quick Links Section */}
//   <h4 className="text-xl font-bold text-white text-center mb-4">Quick Links</h4>

//   {/* Flex container for two columns */}
//   <div className="flex justify-center">
//     <div className="space-y-2 w-28">
//       <ul className="space-y-2">
//         <li>
//           <button className="text-gray-400 hover:text-white transition duration-300 cursor-pointer" onClick={() => {
//                   scrollTo(featuresRef)}}>
//             Features
//           </button>
//         </li>
//         <li>
//           <a href="#pricing" className="text-gray-400 hover:text-white transition duration-300">
//             Pricing
//           </a>
//         </li>
//       </ul>
//     </div>
//     <div className="space-y-2 w-1/2">
//       <ul className="space-y-2">
//         <li>
//           <a href="#about" className="text-gray-400 hover:text-white transition duration-300">
//             About Us
//           </a>
//         </li>
//         <li>
//           <a href="#contact" className="text-gray-400 hover:text-white transition duration-300">
//             Contact
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>


//                 {/* Social Media Links */}
//                 <div className="w-full md:w-1/3 mb-6 md:mb-0">
//                     <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
//                     <div className="flex space-x-6">
//                         <a href="https://www.facebook.com/profile.php?id=61567652190737" target="_blank" className="text-gray-400 hover:text-white transition duration-300 ">
//                             <Facebook className="h-6 w-6" />
//                         </a>
//                         <a href="#" target="_blank" className="text-gray-400 hover:text-white transition duration-300">
//                             <Twitter className="h-6 w-6" />
//                         </a>
//                         <a href="#" target="_blank" className="text-gray-400 hover:text-white transition duration-300">
//                             <Instagram className="h-6 w-6" />
//                         </a>
//                     </div>
//                 </div>
//             </div>

//             {/* Privacy Policy Button */}
//             <div className="text-center mt-6">
//                 <Link to="/privacy-policy">
//                     <button
//                         className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300">
//                         Privacy Policy
//                     </button>
//                 </Link>
//             </div>

//             {/* Footer Bottom Text */}
//             <div className="mt-8 text-center text-white py-4 bg-black">
//                 <p>&copy; 2025 Social Manager Pro. All rights reserved.</p>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from "react"
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram } from "lucide-react"
import logoImage from "../pictures/logo.jpeg"

const Footer = ({ isDashboard,  homeRef, featuresRef, aboutRef, contactRef}) => {

  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const mainQuickLinks = [
    { name: "Home", ref: homeRef },
    { name: "Features", ref: featuresRef },
    { name: "About", ref: aboutRef },
    { name: "Contact", ref: contactRef },
  ];

  const dashboardQuickLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Total Posts", href: "/posts" },
    { name: "Scheduled Posts", href: "/sch-posts" },
    { name: "Chatbot", href: "/chatbot" },
  ]

  const quickLinks = isDashboard ? dashboardQuickLinks : mainQuickLinks

  return (
    <footer className="bg-gray-800 text-white pt-12 px-0">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
    {/* Logo and Intro */}
    <div className="flex  items-center justify-center md:items-start pt-[1.4rem]">
      <img
        src={logoImage || "/placeholder.svg"}
        alt="Social Manager Pro Logo"
        className="h-12 w-auto mb-4 rounded-full"
      />
      <div>
        <h3 className="text-3xl font-bold text-white">Social Manager Pro</h3>
        <p className="text-gray-400 text-sm">Empowering your social media presence</p>
      </div>
    </div>

    {/* Quick Links */}
    <div className="flex flex-col items-center">
      <h4 className="text-xl font-bold text-white mb-4 underline decoration-4">Quick Links</h4>
      <div className="grid grid-cols-2 gap-4">
        <ul className="space-y-2">
          {quickLinks.slice(0, 2).map((link, index) => (
            <li key={index}>
              {link.ref ? (
                <button className="text-gray-400 hover:text-white transition duration-300"key={link.name}
                onClick={() => {
                  scrollTo(link.ref)
                  
                }}>
                  {link.name}
                </button>
              ) : (
                <Link to={link.href} className="text-gray-400 hover:text-white transition duration-300">
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {quickLinks.slice(2, 4).map((link, index) => (
            <li key={index}>
              <Link to={link.href} className="text-gray-400 hover:text-white transition duration-300">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Social Media Links */}
    <div className="flex flex-col items-center">
      <h4 className="text-lg font-semibold text-white mb-4  underline decoration-4">Connect With Us</h4>
      <div className="flex space-x-6">
        <a
          href="https://www.facebook.com/profile.php?id=61567652190737"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
        >
          <Facebook className="h-6 w-6" />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
        >
          <Twitter className="h-6 w-6" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
        >
          <Instagram className="h-6 w-6" />
        </a>
      </div>
    </div>
  </div>

  {/* Privacy Policy Button */}
  <div className="text-center mt-6">
    <Link to="/privacy-policy">
      <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300">
        Privacy Policy
      </button>
    </Link>
  </div>

  {/* Footer Bottom Text */}
  <div className="mt-8 text-center text-white py-4 bg-black px-0">
    <p>&copy; 2025 <span className="text-blue-500 font-bold cursor-pointer hover:underline ">Social Manager Pro</span>. All rights reserved.</p>
  </div>
</footer>


  )
}

export default Footer

