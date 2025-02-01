import React, { createContext, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './pages/Sidebar/Sidebar';
import Home from './pages/Home/Home';
// import Requests from './pages/Requests/Requests';
import Settings from './pages/Settings/Settings';
import Tutorials from './pages/Tutorials/Tutorials';
import Navbar from './pages/Navbar/Navbar';
import FormPage from './pages/FormPage/FormPage';
import MainPage from './pages/MainPage/MainPage';
import Login from './pages/Login/Login';
// import { getCookie } from './utills/Cookies/cookieUtils';
// import axios from 'axios';
import './index.css';

interface User {
  id: string;
  // Add other relevant user properties here
}

interface ProfileContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

function Layout() {
  const location = useLocation();
  const hideNavbarAndSidebar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";
  const [user, setUser] = useState<User | null>(null); // Initialize user state to null


  return (
    <ProfileContext.Provider value={{ user, setUser }}>
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
                {/* <Route path="/requests" element={<Requests />} /> */}
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
              </Routes>
            </div>
          )}
        </div>
      </div>
    </ProfileContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
