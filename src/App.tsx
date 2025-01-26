import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './pages/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Requests from './pages/Requests/Requests';
import Settings from './pages/Settings/Settings';
import Tutorials from './pages/Tutorials/Tutorials';
import Navbar from './pages/Navbar/Navbar';
import FormPage from './pages/FormPage/FormPage';
import MainPage from './pages/MainPage/MainPage';
import Login from './pages/Login/Login';
// import Signup from './pages/Signup/Signup'; // Fixed typo in 'Signup'
import { getCookie } from './utills/Cookies/cookieUtils';
import axios from 'axios';
import './index.css';

// Define User type
interface User {
  id: string;
  // Add other relevant user properties here
}

// Define context type
interface ProfileContextType {
  user: User | null; // User can be null initially
}

// Create context with a default value
export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

function Layout() {
  const location = useLocation();
  const hideNavbarAndSidebar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";
  
  const { user, setUser } = useContext(ProfileContext) || { user: null, setUser: () => {} }; // Use context

  const fetchData = async () => {
    const token = getCookie("authToken");
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/v1/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
      // Optionally navigate to login or handle the error
      // navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <div className="flex flex-col h-screen">
      {!hideNavbarAndSidebar && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}
      <div className="flex flex-1">
        {!hideNavbarAndSidebar && (
          <div className="flex-1 pt-20 pr-48">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/tutorials" element={<Tutorials />} />
            </Routes>
          </div>
        )}
        
        {hideNavbarAndSidebar && (
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/signup" element={<Signup />} /> */}
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null); // Initialize user state

  return (
    <ProfileContext.Provider value={{ user, setUser }}>
      <Router>
        <Layout />
      </Router>
    </ProfileContext.Provider>
  );
}
