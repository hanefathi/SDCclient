// components/DateFilter.tsx
import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Date from "@assets/images/Date.svg";

import jMoment from "jalali-moment";

interface CustomDatePickerProps {
  value: any;
  setValue: (value: any) => void;
  handleDateChange: (date: any) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, setValue, handleDateChange }) => {
  return (
    <div className="relative w-60 flex justify-start items-center ">
      <img src={Date} className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2" alt="Icon" />
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        placeholder={value ? "" : "تاریخ را انتخاب کنید"} 
        value={value}
        onChange={(date) => {
          console.log("Selected Date:", date);
          setValue(date);
          handleDateChange(date);
          
        }}
        style={{color:"#9ca3af", height:"40px" , borderColor:"#f3f4f6" , borderRadius:"10px " , textAlign:"end"}}
        
      />
      
       
    </div>
  );
};

export default CustomDatePicker;
