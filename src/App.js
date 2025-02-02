import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route , useLocation} from 'react-router-dom';
import './Components/App.css';
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AuthForm from './Components/AuthForm';
import Dashboard from './Components/Dashboard';
import MainPage from './Components/MainPage';
import Settings from './Components/Setting';
import DataDeletionPolicy from './Components/DataDeletionPolicy';
import PrivacyPolicy from './Components/PrivacyPolicy';
import TotalPosts from './Components/TotalPosts';
import ScheduledPosts from './Components/ScheduledPosts';
import Chatbot from './Components/chatbot';
import Sidebar from './Components/Sidebar';
import Loader from './Components/Loader';
import CreatePost from './Components/CreatePost';



const MainLayout = ({ children, homeRef, featuresRef, aboutRef, contactRef  }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header logo="/path/to/your/logo.png" homeRef={homeRef} featuresRef={featuresRef} aboutRef={aboutRef} contactRef={contactRef} />
      <div className="flex-grow relative overflow-y-auto">
        {loading && (
          <div className="absolute inset-0  bg-gray-500/50 z-50 flex items-center justify-center">
            <div className="w-full h-screen bg-gray-300/60 p-10 flex justify-center items-center">
              
                <Loader />
              
            </div>
          </div>
        )}
        {!loading && <div>{children}</div>}
      </div>
      <Footer isDashboard={false} />
    </div>
  );
}

  


const DashboardLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading for a certain amount of time (e.g., fetching data)
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // Show loader for 800ms
    return () => clearTimeout(timer);
  }, [location]); // Re-run effect on route change

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar stays unchanged */}
      <div className="flex flex-grow">
        <Sidebar />
        
        {/* Content area */}
        <div className="flex-grow relative overflow-y-auto">
          {/* Show loader only if loading is true */}
          {loading && (
            <div className="absolute inset-20 z-50 flex items-center justify-center">
              <div className="w-full h-full p-10 flex justify-center items-center">
                
                  <Loader />
                
              </div>
            </div>
          )}

          {/* Render content when not loading */}
          {!loading && <div>{children}</div>}
        </div>
      </div>

      {/* Footer stays unchanged */}
      <Footer isDashboard={true} />
    </div>
  );
};
const AppContent = () => {
  

  // const [loading, setLoading] = useState(false);
  // const location = useLocation();

  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => setLoading(false), 2000); // Show loader for 800ms
  //   return () => clearTimeout(timer);
  // }, [location]);

  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  return (
    
    <>
      {/* {loading && <Loader/>} 
      <div className={loading ? "hidden" : "block"}>  */}
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout 
            homeRef={homeRef}
            featuresRef={featuresRef}
            aboutRef={aboutRef}
            contactRef={contactRef}>
              <MainPage 
              homeRef={homeRef}
              featuresRef={featuresRef}
              aboutRef={aboutRef}
              contactRef={contactRef}/>
            </MainLayout>
          }
        />
        <Route path="/auth" element={<AuthForm />} />
        <Route
          path="/data-deletion"
          element={
            <MainLayout>
              <DataDeletionPolicy />
            </MainLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <MainLayout>
              <PrivacyPolicy />
            </MainLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
        <Route
          path="/posts"
          element={
            <DashboardLayout>
              <TotalPosts />
            </DashboardLayout>
          }
        />
        <Route
          path="/sch-posts"
          element={
            <DashboardLayout>
              <ScheduledPosts />
            </DashboardLayout>
          }
        />
        <Route
          path="/chatbot"
          element={
            <DashboardLayout>
              <Chatbot />
            </DashboardLayout>
          }
        />
        <Route
          path="/create-post"
          element={
            <DashboardLayout>
              <CreatePost />
            </DashboardLayout>
          }
        />
      </Routes>
      
    </>
  )
}
const App = () => (
  <Router>
    <AppContent /> {/* Ensure the useLocation hook is inside the Router */}
  </Router>
);
export default App
