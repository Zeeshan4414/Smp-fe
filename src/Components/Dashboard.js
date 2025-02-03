// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import './Dashboard.css';
// // import FacebookLoginCheck from './FacebookLoginCheck';
// // // import TotalPosts from './TotalPosts'; // Import the TotalPosts component

// // const Dashboard = () => {
// //     const [isSidebarOpen, setSidebarOpen] = useState(false);
// //     const [userInfo, setUserInfo] = useState(null);
// //     // const [showTotalPosts, setShowTotalPosts] = useState(false); // State to toggle TotalPosts component

// //     const toggleSidebar = () => {
// //         setSidebarOpen(!isSidebarOpen);
// //     };

// //     // const handleTotalPostsClick = () => {
// //     //     setShowTotalPosts((prevState) => !prevState); // Toggle TotalPosts component visibility
// //     // };

// //     useEffect(() => {
// //         // Fetch user information from your API
// //         const fetchUserData = async () => {
// //             try {
// //                 const response = await fetch('https://smp-be-mysql.vercel.app/auth/user', {
// //                     method: 'GET',
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                         'Authorization': `Bearer ${localStorage.getItem('token')}` // If using JWT
// //                     }
// //                 });

// //                 if (response.ok) {
// //                     const data = await response.json();
// //                     console.log('User data:', data); // Add this line
// //                     setUserInfo(data);
// //                 } else {
// //                     console.error('Failed to fetch user data:', response.statusText);
// //                 }
// //             } catch (error) {
// //                 console.error('Error fetching user data:', error);
// //             }
// //         };

// //         fetchUserData();
// //     }, []);

// //     return (
// //         // <div className="dashboard">
// //         //     <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //         //         <div className="menu-icon" onClick={toggleSidebar}>
// //         //             &#9776; {/* 3-line menu icon */}
// //         //         </div>
// //         //         <h3>Personal Info</h3>
// //         //         {userInfo ? (
// //         //             <>
// //         //                 <p>{userInfo.name}</p>
// //         //                 <p>{userInfo.email}</p>
// //         //             </>
// //         //         ) : (
// //         //             <p>Loading...</p>
// //         //         )}
// //         //         <hr />
// //         //         <Link to="/settings" className="sidebar-link">
// //         //             <button className="sidebar-btn">Settings</button>
// //         //         </Link>
// //         //         <Link to="/posts" className="sidebar-link">
// //         //             <button className="sidebar-btn">
// //         //                 Total Posts
// //         //             </button>
// //         //         </Link>
// //         //         <Link to="/sch-posts" className="sidebar-link">
// //         //             <button className="sidebar-btn">
// //         //                 Scheduled Posts
// //         //             </button>
// //         //         </Link>
// //         //         <Link to="/chatbot" className="sidebar-link">
// //         //             <button className="sidebar-btn">
// //         //                 Chatbot
// //         //             </button>
// //         //         </Link>
// //         //         {/* <button className="sidebar-btn" onClick={handleTotalPostsClick}>
// //         //             {showTotalPosts ? 'Hide Total Posts' : 'Total Posts'}
// //         //         </button> */}
// //         //     </div>
// //         //     <div className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //         //         <h2>Welcome to your Dashboard</h2>

// //         //         {/* Pass the email to FacebookLoginCheck */}
// //         //         {userInfo && <FacebookLoginCheck email={userInfo.email} />}

// //         //         {/* Show TotalPosts when the button is clicked */}
// //         //         {/* {showTotalPosts && <TotalPosts />} */}
// //         //     </div>
// //         // </div>
// //         <div className="dashboard flex min-h-screen">
// //   {/* Sidebar */}
// //   <div
// //     className={`sidebar bg-gray-800 text-white p-4 transition-all duration-300 ${
// //       isSidebarOpen ? 'w-64' : 'w-16'
// //     }`}
// //   >
// //     {/* Menu Icon */}
// //     <div
// //       className="menu-icon text-xl cursor-pointer mb-6 text-center"
// //       onClick={toggleSidebar}
// //     >
// //       &#9776;
// //     </div>
// //     <h3 className={`text-lg font-semibold ${!isSidebarOpen ? 'hidden' : ''}`}>
// //       Personal Info
// //     </h3>
// //     {userInfo ? (
// //       <>
// //         <p className={`${!isSidebarOpen ? 'hidden' : ''}`}>{userInfo.name}</p>
// //         <p className={`${!isSidebarOpen ? 'hidden' : ''}`}>{userInfo.email}</p>
// //       </>
// //     ) : (
// //       <p>Loading...</p>
// //     )}
// //     <hr className="my-4" />

// //     {/* Sidebar Links */}
// //     {['Settings', 'Total Posts', 'Scheduled Posts', 'Chatbot'].map((item, idx) => (
// //       <Link
// //         key={idx}
// //         to={`/${item.toLowerCase().replace(' ', '-')}`}
// //         className="sidebar-link block mb-2"
// //       >
// //         <button className="sidebar-btn bg-blue-600 hover:bg-blue-500 text-white w-full text-left p-2 rounded-md">
// //           {item}
// //         </button>
// //       </Link>
// //     ))}
// //   </div>

// //   {/* Content */}
// //   <div className={`content flex-1 p-6 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
// //     <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>

// //     {/* Pass the email to FacebookLoginCheck */}
// //     {userInfo && <FacebookLoginCheck email={userInfo.email} />}
// //   </div>
// // </div>

// //     );
// // };

// // export default Dashboard;




// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import './Dashboard.css';
// // import FacebookLoginCheck from './FacebookLoginCheck';
// // import InstagramLoginCheck from './InstagramLoginCheck';

// // const Dashboard = () => {
// //     const [isSidebarOpen, setSidebarOpen] = useState(false);
// //     const [userInfo, setUserInfo] = useState(null);

// //     const toggleSidebar = () => {
// //         setSidebarOpen(!isSidebarOpen);
// //     };

// //     useEffect(() => {
// //         const fetchUserData = async () => {
// //             try {
// //                 const response = await fetch('https://smp-be-mysql.vercel.app/auth/user', {
// //                     method: 'GET',
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                         'Authorization': `Bearer ${localStorage.getItem('token')}`
// //                     }
// //                 });

// //                 if (response.ok) {
// //                     const data = await response.json();
// //                     console.log('User data:', data); // Verify data structure here
// //                     setUserInfo(data);
// //                 } else {
// //                     console.error('Failed to fetch user data:', response.statusText);
// //                 }
// //             } catch (error) {
// //                 console.error('Error fetching user data:', error);
// //             }
// //         };

// //         fetchUserData();
// //     }, []);

// //     return (
// //         <div className="dashboard">
// //             <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //                 <div className="menu-icon" onClick={toggleSidebar}>
// //                     &#9776;
// //                 </div>
// //                 <h3>Personal Info</h3>
// //                 {userInfo ? (
// //                     <>
// //                         <p>{userInfo?.name || 'No name provided'}</p>
// //                         <p>{userInfo?.email || 'No email provided'}</p>
// //                     </>
// //                 ) : (
// //                     <p>Loading...</p>
// //                 )}
// //                 <hr />
// //                 <Link to="/settings" className="sidebar-link">
// //                     <button className="sidebar-btn">Settings</button>
// //                 </Link>
// //             </div>
// //             <div className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //                 <h2>Welcome to your Dashboard</h2>

// //                 <FacebookLoginCheck />
// //                 <InstagramLoginCheck />
// //             </div>
// //         </div>
// //     );
// // };

// // export default Dashboard;
// // import { useState, useEffect } from "react"
// // import { Link } from "react-router-dom"
// // import FacebookLoginCheck from "./FacebookLoginCheck"
// // import { Home, Settings, Calendar, MessageCircle, Menu, X, ChevronRight } from "lucide-react"

// // const Dashboard = () => {
// //   const [isSidebarOpen, setSidebarOpen] = useState(true)
// //   const [userInfo, setUserInfo] = useState(null)

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!isSidebarOpen)
// //   }

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const response = await fetch("https://smp-be-mysql.vercel.app/auth/user", {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         })

// //         if (response.ok) {
// //           const data = await response.json()
// //           setUserInfo(data)
// //         } else {
// //           console.error("Failed to fetch user data:", response.statusText)
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user data:", error)
// //       }
// //     }

// //     fetchUserData()
// //   }, [])

// //   const sidebarItems = [
// //     { name: "Dashboard", icon: Home, link: "/dashboard" },
// //     { name: "Settings", icon: Settings, link: "/settings" },
// //     { name: "Total Posts", icon: Calendar, link: "/posts" },
// //     { name: "Scheduled Posts", icon: Calendar, link: "/sch-posts" },
// //     { name: "Chatbot", icon: MessageCircle, link: "/chatbot" },
// //   ]

// //   return (
// //     <div className="flex h-screen bg-gray-100">
// //       {/* Sidebar */}
// //       <div className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
// //         <div className="flex justify-between items-center p-4">
// //           <h2 className={`text-xl font-semibold text-gray-800 ${!isSidebarOpen && "hidden"}`}>Dashboard</h2>
// //           <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
// //             {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
// //           </button>
// //         </div>
// //         <nav className="mt-8">
// //           {sidebarItems.map((item, index) => (
// //             <Link
// //               key={index}
// //               to={item.link}
// //               className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
// //             >
// //               <item.icon size={20} className="mr-4" />
// //               <span className={`${!isSidebarOpen && "hidden"}`}>{item.name}</span>
// //               {!isSidebarOpen && <ChevronRight size={16} className="ml-auto" />}
// //             </Link>
// //           ))}
// //         </nav>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 overflow-x-hidden overflow-y-auto">
// //         <header className="bg-white shadow-sm">
// //           <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
// //             <h1 className="text-2xl font-semibold text-gray-900">Welcome to your Dashboard</h1>
// //           </div>
// //         </header>
// //         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
// //           {/* User Info Card */}
// //           {userInfo && (
// //             <div className="bg-white shadow rounded-lg p-6 mb-6">
// //               <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
// //               <p className="text-gray-600">
// //                 <span className="font-medium">Name:</span> {userInfo.name}
// //               </p>
// //               <p className="text-gray-600">
// //                 <span className="font-medium">Email:</span> {userInfo.email}
// //               </p>
// //             </div>
// //           )}

// //           {/* Facebook Login Check */}
// //           {userInfo && <FacebookLoginCheck email={userInfo.email} />}

// //           {/* Dashboard Overview */}
// //           <div className="bg-white shadow rounded-lg p-6 mb-6">
// //             <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //               {["Total Posts", "Scheduled Posts", "Engagement Rate", "Followers"].map((stat, index) => (
// //                 <div key={index} className="bg-gray-50 p-4 rounded-lg">
// //                   <h3 className="text-lg font-medium text-gray-700">{stat}</h3>
// //                   <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Additional Dashboard Content */}
// //           <div className="bg-white shadow rounded-lg p-6">
// //             <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
// //             <p className="text-gray-600">No recent activity to display.</p>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Dashboard

// import React from "react";
// const placeholderData = [
//   {
//     id: 1,
//     title: "Upcoming Feature Release",
//     content: "Our team is working on new scheduling features for social media management.",
//     timestamp: "Posted on Jan 10, 2025",
//   },
//   {
//     id: 2,
//     title: "Maintenance Update",
//     content: "System maintenance is scheduled for February 15 from 1 AM to 4 AM UTC.",
//     timestamp: "Posted on Jan 5, 2025",
//   },
//   {
//     id: 3,
//     title: "Tips for Engagement",
//     content: "Learn how to increase post engagement with AI-generated captions.",
//     timestamp: "Posted on Dec 30, 2024",
//   },
// ];
// const Dashboard = () => {
//   return (
//     <>
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-2xl font-semibold text-gray-900">Welcome to your Dashboard</h1>
//         </div>
//       </header>
//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {/* Dashboard Overview */}
//         <div className="bg-white shadow rounded-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {["Total Posts", "Scheduled Posts", "Already Posted"].map((stat, index) => (
//               <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-medium text-gray-700">{stat}</h3>
//                 <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//       <section className="bg-white p-6 shadow-md rounded-lg mb-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Announcements</h2>
//           <div className="space-y-4">
//             {placeholderData.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 transition duration-300"
//               >
//                 <h3 className="text-lg font-medium text-gray-700">{item.title}</h3>
//                 <p className="text-gray-600">{item.content}</p>
//                 <p className="text-sm text-gray-500 mt-2">{item.timestamp}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//     </>
//   )
// }

// export default Dashboard




import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const placeholderData = [
  {
    id: 1,
    title: "Upcoming Feature Release",
    content: "Our team is working on new scheduling features for social media management.",
    timestamp: "Posted on Jan 10, 2025",
  },
  {
    id: 2,
    title: "Maintenance Update",
    content: "System maintenance is scheduled for February 15 from 1 AM to 4 AM UTC.",
    timestamp: "Posted on Jan 5, 2025",
  },
  {
    id: 3,
    title: "Tips for Engagement",
    content: "Learn how to increase post engagement with AI-generated captions.",
    timestamp: "Posted on Dec 30, 2024",
  },
];

const Dashboard = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [totalPosts, setTotalPosts] = useState(0);
  const [scheduledPosts, setScheduledPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch total posts
  useEffect(() => {
    const fetchTotalPosts = async () => {
      try {
        const response = await fetch("https://smp-be-mysql.vercel.app/facebook-upload/posts/count", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setTotalPosts(data.totalPosts || 0);
      } catch (error) {
        console.error("Error fetching total posts:", error);
        setTotalPosts(0);
      }
    };

    const fetchScheduledPosts = async () => {
      try {
        const response = await fetch("https://smp-be-mysql.vercel.app/scheduled/count", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setScheduledPosts(data.scheduledPosts || 0);
      } catch (error) {
        console.error("Error fetching scheduled posts:", error);
        setScheduledPosts(0);
      }
    };

    if (email) {
      fetchTotalPosts();
      fetchScheduledPosts();
    }
    setIsLoading(false);
  }, [email]);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome to your Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard Overview */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Already Posted", value: totalPosts },
              { label: "Scheduled Posts", value: scheduledPosts },
              { label: "Total Posts", value: totalPosts + scheduledPosts },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {isLoading ? "Loading..." : stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <section className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Announcements</h2>
        <div className="space-y-4">
          {placeholderData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 transition duration-300"
            >
              <h3 className="text-lg font-medium text-gray-700">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
              <p className="text-sm text-gray-500 mt-2">{item.timestamp}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Dashboard;




