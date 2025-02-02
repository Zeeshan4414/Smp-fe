// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { Home, Settings, Calendar, MessageCircle, LogOut, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react"
// import logoImage from "../pictures/logo.jpeg"

// const Sidebar = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true)
//   const [userInfo, setUserInfo] = useState(null)
//   const navigate = useNavigate()

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen)
//   }

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch("https://smp-be-mysql.vercel.app/auth/user", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         })

//         if (response.ok) {
//           const data = await response.json()
//           setUserInfo(data)
//         } else {
//           console.error("Failed to fetch user data:", response.statusText)
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error)
//       }
//     }

//     fetchUserData()
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem("token")

//     const auth2 = window.gapi?.auth2?.getAuthInstance()
//     if (auth2) {
//       auth2.signOut().then(() => {
//         auth2.disconnect()
//         console.log("User signed out from Google.")
//       })
//     }

//     navigate("/")
//   }

//   const sidebarItems = [
//     { name: "Dashboard", icon: Home, link: "/dashboard" },
//     { name: "Settings", icon: Settings, link: "/settings" },
//     { name: "Total Posts", icon: Calendar, link: "/posts" },
//     { name: "Scheduled Posts", icon: Calendar, link: "/sch-posts" },
//     { name: "Chatbot", icon: MessageCircle, link: "/chatbot" },
//     { name: "Create Post", icon: PlusCircle, link: "/create-post" },
//   ]

//   return (
//     <div
//       className={`bg-gray-200 shadow-lg transition-all duration-300 ease-in-out flex flex-col h-screen ${
//         isSidebarOpen ? "w-64" : "w-20"
//       }`}
//     >
//       <div className="flex items-center justify-between p-4 border-b border-gray-200">
//         <div className="flex items-center">
//           <img src={logoImage || "/placeholder.svg"} alt="Logo" className="h-8 w-8 rounded-full" />
//           <h2
//             className={`ml-3 text-xl font-semibold text-gray-800 transition-opacity duration-300 ${
//               !isSidebarOpen ? "opacity-0 w-0" : "opacity-100"
//             }`}
//           >
//             Dashboard
//           </h2>
//         </div>
//         <button
//           onClick={toggleSidebar}
//           className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
//         >
//           {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//         </button>
//       </div>

//       <div className={`px-4 py-4 border-b border-gray-200 ${!isSidebarOpen && "hidden"}`}>
//         <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Personal Info</h3>
//         {userInfo ? (
//           <div className="mt-2">
//             <p className="text-sm font-medium text-gray-900">{userInfo?.name || "No name provided"}</p>
//             <p className="text-sm text-gray-600">{userInfo?.email || "No email provided"}</p>
//           </div>
//         ) : (
//           <p className="text-sm text-gray-600 mt-2">Loading...</p>
//         )}
//       </div>

//       <nav className="flex-grow mt-4 overflow-y-auto">
//         {sidebarItems.map((item, index) => (
//           <Link
//             key={index}
//             to={item.link}
//             className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//           >
//             <item.icon size={20} className="mr-4" />
//             <span className={`${!isSidebarOpen ? "hidden" : ""} transition-opacity duration-300`}>{item.name}</span>
//           </Link>
//         ))}
//       </nav>

//       <button
//         onClick={handleLogout}
//         className="flex items-center px-4 py-3 mt-auto mb-4 text-red-600 hover:bg-red-50 transition-colors duration-200"
//       >
//         <LogOut size={20} className="mr-4" />
//         <span className={`${!isSidebarOpen ? "hidden" : ""} transition-opacity duration-300`}>Logout</span>
//       </button>
//     </div>
//   )
// }

// export default Sidebar

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Home, Settings, Calendar, MessageCircle, LogOut, PlusCircle, Menu, X } from "lucide-react"
import logoImage from "../pictures/logo.jpeg"


const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('authToken', token)
    }

    const fetchUserData = async () => {
      // Retrieve the token with the correct key 'authToken'
      const token = localStorage.getItem('authToken')

      if (!token) {
        console.error('Token is not available in localStorage')
        return
      }

      try {
        const response = await fetch("https://smp-be-mysql.vercel.app/auth/user", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Use the 'authToken' key here
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUserInfo(data)
        } else {
          console.error("Failed to fetch user data:", response.statusText)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")

    const auth2 = window.gapi?.auth2?.getAuthInstance()
    if (auth2) {
      auth2.signOut().then(() => {
        auth2.disconnect()
        console.log("User signed out from Google.")
      })
    }

    navigate("/")
  }

  const sidebarItems = [
    { name: "Dashboard", icon: Home, link: "/dashboard" },
    { name: "Create Post", icon: PlusCircle, link: "/create-post" },
    { name: "Total Posts", icon: Calendar, link: "/posts" },
    { name: "Scheduled Posts", icon: Calendar, link: "/sch-posts" },
    { name: "Chatbot", icon: MessageCircle, link: "/chatbot" },
    { name: "Settings", icon: Settings, link: "/settings" },

  ]
  const handleClick = (link) => {
    navigate(link, { state: { email: userInfo.email } }); // Passing email as state
  };

  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col h-screen ${isSidebarOpen ? "w-64" : "w-20"
        }`}
    >
      <div className={`flex flex-col ${isSidebarOpen ? "items-end" : "items-center"} p-4 border-b border-gray-200`}>
        {isSidebarOpen ? (
          <>
            <button
              onClick={toggleSidebar}
              className="p-1 mb-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <X size={20} />
            </button>
            <div className="w-full flex items-center">
              <img src={logoImage || "/placeholder.svg"} alt="Logo" className="h-8 w-8 rounded-full" />
              <h2 className="ml-3 text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={toggleSidebar}
              className="p-1 mb-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <Menu size={20} />
            </button>
            <img src={logoImage || "/placeholder.svg"} alt="Logo" className="h-8 w-8 rounded-full" />
          </>
        )}
      </div>

      <div className={`px-4 py-4 border-b border-gray-200 ${!isSidebarOpen && "hidden"}`}>
        <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Personal Info</h3>
        {userInfo ? (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-900">{userInfo?.name || "No name provided"}</p>
            <p className="text-sm text-gray-600">{userInfo?.email || "No email provided"}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-600 mt-2">Loading...</p>
        )}
      </div>

      <nav className="flex-grow mt-4 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item.link)}
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
          >
            <item.icon size={20} className="mr-4" />
            <span className={`${!isSidebarOpen ? "hidden" : ""} transition-opacity duration-300`}>{item.name}</span>
          </button>


        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-3 mt-auto mb-4 text-red-600 hover:bg-red-50 transition-colors duration-200"
      >
        <LogOut size={20} className="mr-4" />
        <span className={`${!isSidebarOpen ? "hidden" : ""} transition-opacity duration-300`}>Logout</span>
      </button>


    </div>
  )
}

export default Dashboard

