import { useState, useEffect } from "react"
import { Link, useNavigate, Outlet } from "react-router-dom"
import { Home, Settings, Calendar, MessageCircle, Menu, X, LogOut, PlusCircle } from "lucide-react"

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://smp-be-mysql.vercel.app/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    { name: "Dashboard", icon: Home, link: "/Dashboard" },
    { name: "Create Post", icon: PlusCircle, link: "/create-post" },
    { name: "Total Posts", icon: Calendar, link: "/posts" },
    { name: "Scheduled Posts", icon: Calendar, link: "/sch-posts" },
    { name: "Chatbot", icon: MessageCircle, link: "/chatbot" },
    { name: "Settings", icon: Settings, link: "/settings" },
    
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className={`text-xl font-semibold text-gray-800 ${!isSidebarOpen && "hidden"}`}>Dashboard</h2>
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Personal Info in Sidebar */}
        <div className={`px-4 py-2 ${!isSidebarOpen && "hidden"}`}>
          <h3 className="text-sm font-semibold text-gray-600">Personal Info</h3>
          {userInfo ? (
            <>
              <p className="text-sm text-gray-600">{userInfo?.name || "No name provided"}</p>
              <p className="text-sm text-gray-600">{userInfo?.email || "No email provided"}</p>
            </>
          ) : (
            <p className="text-sm text-gray-600">Loading...</p>
          )}
          <hr className="my-2 border-gray-200" />
        </div>

        <nav className="flex-grow mt-4">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
            >
              <item.icon size={20} className="mr-4" />
              <span className={`${!isSidebarOpen && "hidden"}`}>{item.name}</span>
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 text-red-600 hover:bg-red-100 transition-colors duration-200 mt-auto mb-4"
        >
          <LogOut size={20} className="mr-4" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout

