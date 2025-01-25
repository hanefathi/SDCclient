import React from 'react';
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
import Signup from './pages/Singup/Singup';
import './index.css';

function Layout() {
  const location = useLocation();
  const hideNavbarAndSidebar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

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
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
