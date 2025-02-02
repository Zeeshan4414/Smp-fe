// import React, { useRef, useState } from 'react';
// import { Send } from "lucide-react"
// import emailjs from 'emailjs-com';



// const Contact = () => {
//     const [formData, setFormData] = useState({
//       name1: '',
//       emailFrom: '',
//       subject: '',
//       message: '',
//     });
//     const [error, setError] = useState("");
//     const contactRef = useRef(null)
//     const form = useRef();
  
//     const handleChange = (e) => {
//         const { name, value } = e.target;
      
//         // Regular expression for name field (only letters and spaces allowed)
//         const nameRegex = /^[A-Za-z\s]*$/;
      
//         // Regular expression for email field (allow letters, numbers, @, ., and -)
//         const emailRegex = /^[A-Za-z0-9@.\s-]*$/;
      
//         if (name === "name1") {
//           // Validate for name field (only letters and spaces allowed)
//           if (nameRegex.test(value) || value === "") {
//             setFormData({
//               ...formData,
//               [name]: value,
//             });
//           }
//         } else if (name === "email") {
//           // Validate for email field (allow letters, numbers, @, ., and -)
//           if (emailRegex.test(value) || value === "") {
//             setFormData({
//               ...formData,
//               [name]: value,
//             });
//           }
//         }
//       };
//   const CustomButton = ({ children, onClick, className }) => (
//     <button
//       onClick={onClick}
//       className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 ${className}`}
//     >
//       {children}
//     </button>
//   )
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     emailjs
//       .sendForm('service_o1g3fkd', 'template_jznxnzo', form.current, '4pLCitBQt7bGIcGZd')
//       .then((result) => {
//         console.log(result.text);
//         alert('Thank you for your message! Your email has been sent.');
//         setFormData({ name1: '', emailFrom: '', subject: '', message: '' });
//       }, (error) => {
//         console.log('EmailJS Error:', error.text);
//         alert('There was an issue sending your message. Please try again later.');
//       });
//   };
//   return(
// <section ref={contactRef} className="bg-gray-200 py-20 px-4">
// <div className="max-w-3xl mx-auto">
//   <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-down">
//     Contact Us
//   </h2>
//   {/* 
//   <div className="bg-blue-100 rounded-lg shadow-lg p-6">
//     <form
//       onSubmit={(e) => {
//         e.preventDefault()
//         // Add your email sending logic here
//         alert("Thank you for your message. We will get back to you soon!")
//       }}
//     >
//       <div className="space-y-4">
//         <div>
//           <label htmlFor="name" className="ml-3 block text-md font-bold text-gray-700 mb-1">
//             Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             placeholder="Your Name"
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="ml-3 block text-md font-bold text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             placeholder="your@email.com"
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label htmlFor="message" className="ml-3 block text-md font-bold text-gray-700 mb-1">
//             Message
//           </label>
//           <textarea
//             id="message"
//             placeholder="Your message here..."
//             required
//             rows={4}
//             className="w-full px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//         </div>
//         <CustomButton type="submit" className="w-60 mx-auto flex items-center justify-center">
//           Send Message
//           <Send className="ml-2 h-4 w-4" />
//         </CustomButton>
//       </div>
//     </form>
//   </div>
// </div>
// </section> */}

//       <div className="relative  bg-cover bg-center">
//         <div className=" w-80 md:w-[30rem] mx-auto p-6 sm:p-8 bg-gray-400 rounded-lg border border-gray-300 shadow-4xl mt-12 mb-8 backdrop-blur-lg"  >
//           <form ref={form} onSubmit={handleSubmit} className="space-y-4" >
//             <div className="mb-4">
//               <label className={`block text-sky-100 font-bold`}>Name:</label>
//               <input
//                 type="text"
//                 name="name1"
//                 value={formData.name1}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 `}
//                 placeholder="Enter your name"
//                 required
//               />
//               {error && <p className="text-red-500 text-sm">{error}</p>}
//             </div>
//             <div className="mb-4">
//               <label className={`block text-sky-100 font-bold`}>Email</label>
//               <input
//                 type="email"
//                 name="emailFrom"
//                 value={formData.emailFrom}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 `}
//                 placeholder="Enter your email"
//                 required
//               />
              
//             </div>
//             <div className="mb-4">
//               <label className={`block text-sky-100 font-bold`}>Subject</label>
//               <input
//                 type="text"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 `}
//                 placeholder="Enter subject"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className={`block text-sky-100 font-bold`}>Message</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 `}
//                 placeholder="Enter your message"
//                 rows="5"
//                 required
//               ></textarea>
//             </div>
//             <div className="text-center">
//             <CustomButton type="submit" className="w-60 mx-auto flex items-center justify-center">
//           Send Message
//           <Send className="ml-2 h-4 w-4" />
//         </CustomButton>
//             </div>
//           </form>
//         </div>
//       </div>
//    </div>
//     </section>
//   )
// }
// export default Contact;

import React, { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name1: '',
    emailFrom: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState("");
  const contactRef = useRef(null);
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Regular expression for name field (only letters and spaces allowed)
    const nameRegex = /^[A-Za-z\s]*$/;

    // Regular expression for email field (allow letters, numbers, @, ., and -)
    const emailRegex = /^[A-Za-z0-9@.\s-]*$/;

    // Handle validation for name field (name1)
    if (name === 'name1') {
      if (nameRegex.test(value) || value === '') {
        setFormData({
          ...formData,
          [name]: value,
        });
        setError('');
      } else {
        setError('Name should only contain letters and spaces.');
      }
    }

    // Handle validation for email field (emailFrom)
    if (name === 'emailFrom') {
      if (emailRegex.test(value) || value === '') {
        setFormData({
          ...formData,
          [name]: value,
        });
        setError('');
      } else {
        setError('Email should only contain letters, numbers, @, ., and -.');
      }
    }

    // Handle other fields like subject and message (no validation)
    if (name === 'subject' || name === 'message') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const CustomButton = ({ children, onClick, className }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_o1g3fkd', 'template_jznxnzo', form.current, '4pLCitBQt7bGIcGZd')
      .then((result) => {
        console.log(result.text);
        alert('Thank you for your message! Your email has been sent.');
        setFormData({ name1: '', emailFrom: '', subject: '', message: '' });
      }, (error) => {
        console.log('EmailJS Error:', error.text);
        alert('There was an issue sending your message. Please try again later.');
      });
  };

  return (
    <section ref={contactRef} className="bg-blue-100 py-20 px-4">
      <div className="max-w-3xl mx-auto"> 
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-down">
          Contact Us
        </h2>

        
          <div className="w-80 md:w-[30rem] mx-auto p-6 sm:p-8 bg-gray-400 rounded-lg border border-gray-300 shadow-4xl mt-12 mb-8 backdrop-blur-lg">
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label className={`block text-white font-bold`}>Name:</label>
                <input
                  type="text"
                  name="name1"
                  value={formData.name1}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 `}
                  placeholder="Enter your name"
                  required
                />
                {error && error.includes("Name") && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </div>
              <div className="mb-4">
                <label className={`block text-sky-100 font-bold`}>Email</label>
                <input
                  type="email"
                  name="emailFrom"
                  value={formData.emailFrom}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 `}
                  placeholder="Enter your email"
                  required
                />
                {error && error.includes("Email") && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </div>
              <div className="mb-4">
                <label className={`block text-sky-100 font-bold`}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 `}
                  placeholder="Enter subject"
                  required
                />
              </div>
              <div className="mb-4">
                <label className={`block text-sky-100 font-bold`}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 `}
                  placeholder="Enter your message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <CustomButton type="submit" className="w-60 mx-auto flex items-center justify-center">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </CustomButton>
              </div>
            </form>
          </div>
        </div>     
    </section>
  );
};

export default Contact;
