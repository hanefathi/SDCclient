import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '@assets/images/logo1.svg';
import homewhite from '@assets/images/homewhite.svg';
import home from '@assets/images/home.svg';
import book from '@assets/images/book.svg';
import bookwhite from '@assets/images/bookwhite.svg';
import folder from '@assets/images/folder.svg';
import folderwhite from '@assets/images/folderwhite.svg';
import judge from '@assets/images/judge.svg';
import judgewhite from '@assets/images/judgewhite.svg';
import Settings from '@assets/images/Settings.svg';
import Logoutwhite from '@assets/images/Logoutwhite.svg';
import Logout from '@assets/images/Logout.svg';
import headphone from '@assets/images/headphone.svg';
import { getCookie,deleteCookie } from '@/utills/Cookies/cookieUtils';
import Cookies from 'js-cookie';

export default function Sidebar() {



  const handleDeleteCookie = () => {
    Cookies.remove("authToken")
    return
};

  return (
    <aside className="fixed right-0 h-full bg-[#1C2434] w-55 p-5 z-20 rounded-10-3xl rounded-tl-3xl rounded-bl-3xl flex flex-col">
      <div className="flex justify-end mb-14">
        <img src={logo1} alt="User Profile" className="w-100 h-34 mu-10" />
      </div>

      <ul className="list-none space-y-8 font-iranyekan flex-1">
        
        <li>
          
          <Link
            to="/home"
            className={`flex items-center text-sm ${
              location.pathname === "/home" ? "text-white" : "text-[#8A99AF]"
            } justify-end mb-5`}
          >
            <span className="ml-2"> صفحه اصلی</span>
            <img
              src={location.pathname === "/home" ? homewhite : home}
              alt="Home Icon"
              className="w-6 h-6 ml-2"
            />
          </Link>
        </li>
        <li>
          
          <Link
            to="/requests"
            className={`flex items-center text-sm ${
              location.pathname === "/requests" ? "text-white" : "text-[#8A99AF]"
            } justify-end mb-5`}
          >
            <span className="ml-2">بایگانی درخواست‌ها</span>
            <img
              src={location.pathname === "/requests" ? folderwhite : folder}
              alt="Requests Icon"
              className="w-6 h-6 ml-2"
            />
          </Link>
        </li>
        <li>
          
          <Link
            to="/tutorials"
            className={`flex items-center text-sm ${
              location.pathname === "/tutorials" ? "text-white" : "text-[#8A99AF]"
            } justify-end mb-5`}
          >
            <span className="ml-2"> آموزش‌ها </span>
            <img
              src={location.pathname === "/tutorials" ? bookwhite : book}
              alt="Tutorials Icon"
              className="w-6 h-6 ml-2"
            />
          </Link>
        </li>
        <li>
          
          <Link
            to="/formpage"
            className={`flex items-center text-sm ${
              location.pathname === "/formpage" ? "text-white" : "text-[#8A99AF]"
            } justify-end mb-5`}
          >
            <span className="ml-2"> قوانین و مقررات </span>
            <img
              src={location.pathname === "/formpage" ? judgewhite : judge}
              alt="Tutorials Icon"
              className="w-6 h-6 ml-2"
            />
          </Link>
        </li>
        
       
      
        {/* <li>
          <Link to="/settings" className="flex items-center text-sm text-[#8A99AF] justify-end mb-5">
            <span className="ml-2">تنظیمات</span>
            <img src={Settings} alt="Settings Icon" className="w-6 h-6 ml-2" />
          </Link>
        </li> */}
      </ul>

   
      <div className="mt-auto space-y-4">
        <ul>
        <li>
          <Link to="/support" className="flex items-center text-sm text-[#8A99AF] justify-end mb-5">
            <span className="ml-2">پشتیبانی</span>
            <img src={headphone} alt="Support Icon" className="w-6 h-6 ml-2" />
          </Link>
        </li>
       <li>
          
{/* <button  onClick={()=>handleDeleteCookie()}>
  delete cookie
</button> */}


          <Link
          onClick={()=>handleDeleteCookie()}
            to="/login"
            className={`flex items-center text-sm ${
              location.pathname === "/login" ? "text-white" : "text-[#8A99AF]"
            } justify-end mb-5`}
          >
            <span className="ml-2"> خروج </span>
            <img
              src={location.pathname === "/login" ? Logoutwhite : Logout}
              alt="Tutorials Icon"
              className="w-6 h-6 ml-2"
            />
          </Link>
        </li>
        </ul>
      </div>
    </aside>
  );
}
