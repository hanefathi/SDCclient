import React, { useEffect, useState, useContext } from 'react';
import notification from '@assets/images/notification.svg'; 
import userstatue from '@assets/images/userstatue.svg';
import Profile from '@assets/images/Profile.png';
import calendar from '@assets/images/calendar.svg';
import clock from '@assets/images/clock.svg';
import moment from 'jalali-moment';
import { ProfileContext } from '@/App'; // Ensure correct import path
import { Button } from 'antd';
import axios from 'axios';

export default function Navbar() {
  const context = useContext(ProfileContext);
  const [dateTime, setDateTime] = useState<string>('');
  const [fullName, setFullName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>(Profile); // Default profile image

  // Handle potential undefined context
  if (!context) {
    return null; // or a loading state
  }

  const { user } = context;

  useEffect(() => {
    // Set initial state from user context
    setFullName(user.fullName || "مهمان");
    setPhoneNumber(user.phoneNumber || "0912XXXXXXX");

    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(user.profileImage);
        setProfileImage(response.data.image);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileImage();

    const now = moment();
    const formattedDate = now.format('jYYYY/jMM/jDD HH:mm');
    setDateTime(formattedDate);
  }, [user]); // Dependency on user to re-run effect if user changes

  return (
    <nav className="fixed top-0 left-0 right-40 z-10 flex justify-between items-center bg-[#FFFFFF] h-20 px-12 shadow-md" style={{direction:'rtl'}}>
      <div className="flex items-left" style={{direction:"ltr"}}>
        <div className="flex flex-col text-center">
          <span className="text-black">{fullName}</span>
          <Button className="text-[#8A99AF] border-none text-xs">
            {phoneNumber}
          </Button>
        </div>
        <img src={'data:image/jpeg;base64,'+profileImage} alt="User Profile" className="w-12 h-12 rounded-full" />
      </div>

      <div className="flex items-center space-x-1">
        <div className="relative flex items-center justify-center w-10 h-10 border-gray-100 rounded-full cursor-pointer">
          <img src={notification} alt="Notification Icon" className="w-6 h-6" />
          <img src={userstatue} alt="User Status Icon" className="w-2 h-2 absolute top-3.5 right-3.5 transform translate-x-1 -translate-y-1" />
        </div>

        <div className="text-center text-black flex-grow flex items-center justify-center space-x-2">
          <img src={calendar} alt="Calendar Icon" className="w-6 h-6 ml-4" />
          <span className='text-[#6681A9]'>{dateTime.split(' ')[0]}</span>
          <img src={clock} alt="Clock Icon" className="w-5 h-5 ml-1" />
          <span className='text-[#6681A9]'>{dateTime.split(' ')[1]}</span>
        </div>
      </div>
    </nav>
  );
}
