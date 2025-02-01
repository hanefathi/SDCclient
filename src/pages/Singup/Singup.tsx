import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import collabora from "@assets/images/collabora.svg";
import axios from 'axios';
interface OtpResponse {
  statusCode: number;
  message: string;
  otp: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [stateForm, setStateForm] = useState(3); // Start with stateForm 1
  const [otp, setOtp] = useState<string | null>(null);
  // const [responseData, setResponseData] = useState(null);
  // const [error, setError] = useState(null);
 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

 

  
  const toggleForm = (newState: number) => {
    setStateForm(newState);
  };



//   const fetchData = async () => {
//     const token = null; // Example token
//     try {
//         const response = await axios.post(`http://localhost:8081/auth/signin`, {
//             // Your request body goes here
//             phoneNumber: "09917403979",
//             otp: ""
//         }, {
//             headers: {
//                 "Content-Type": "application/json", // Corrected from application.json
//                 "Authorization": "Bearer " + token // Corrected Authorization spelling
//             }
//         });

//         // Type assertion for response.data
//         const res: OtpResponse = response.data;

//         alert(res.otp); // This will alert the OTP

//     } catch (error) {
//         alert(error);
//     }
// };



const fetchData = async () => {
  // const token = null; // Example token
  try {
      const response = await axios.post(`http://localhost:8081/auth/signin`, {
          // Your request body goes here
          phoneNumber: mobile,
          otp: ""
      }, );

      // Type assertion for response.data
      const res: OtpResponse = response.data;

      alert(res.otp); // This will alert the OTP

  } catch (error) {
      alert("کاربر با این وجود ندارد");
  }
};
  return (
    <div className="min-h-screen grid grid-cols-[2fr_1fr]">
      <div
        className="bg-cover bg-center relative w-200"
        style={{
          backgroundImage: `url(${collabora})`,
        }}
      ></div>
    
   

      {stateForm === 1 ? (
        <>
          {/* Sign up form */}
          <div className="flex justify-center items-center bg-white relative mr-15">
            <div className="absolute left-[-25%] bg-white p-8 rounded-lg shadow-lg w-96 z-10">
              <h2 className="text-3xl font-bold text-[#8A99AF] text-right mb-6">ثبت نام</h2>
              <form onSubmit={handleLogin}>
             
                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-sm font-semibold text-[#8A99AF] text-right">
                    شماره همراه
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-3 border text-[#8A99AF] rounded-md mt-2 text-right"
                    placeholder="شماره همراه خود را وارد کنید"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="text" className="block text-sm font-semibold text-[#8A99AF] text-right">
                    شماره شناسنامه
                  </label>
                  <input
                    type="text"
                    id="nationalCode"
                    value={nationalCode}
                    onChange={(e) => setNationalCode(e.target.value)}
                    className="w-full p-3 border text-[#8A99AF] rounded-md mt-2 text-right"
                    placeholder="رمز عبور خود را وارد کنید"
                    required
                  />
                </div>
                <p className="text-sm mb-4 text-right">در صورت فراموشی رمز عبور بر روی لینک کلیک کنید</p>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#3C50E0] text-white font-semibold rounded-md hover:bg-[#2F44C2] transition duration-300"
                >
                  ثبت نام
                </button>
              </form>
              <p className="mt-4 text-sm text-center">
                <button
                  onClick={() => toggleForm(3)} // Switch to OTP form
                  className="text-[#3C50E0] font-semibold hover:text-[#2F44C2] transition duration-300"
                >
                 ورود
                </button>
              </p>
            </div>
          </div>
        </>
      ) : stateForm === 2 ? (
        <>
          {/* OTP Login form */}
          <div className="flex justify-center items-center bg-white relative mr-15">
            <div className="absolute left-[-25%] bg-white p-8 rounded-lg shadow-lg w-96 z-10">
              <h2 className="text-3xl font-bold text-[#8A99AF] text-right mb-6">رمز یکبار مصرف</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-sm font-semibold text-[#8A99AF] text-right">
                    رمز یکبار مصرف به شماره {mobile} ارسال شد
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp !== null ? otp : ""}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 border text-[#8A99AF] rounded-md mt-2 text-right"
                    placeholder="رمز خود را وارد کنید"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#3C50E0] text-white font-semibold rounded-md hover:bg-[#2F44C2] transition duration-300"
                >
                  ورود
                </button>
              </form>
              {/* <p className="mt-4 text-sm text-center">
                <button
                  onClick={() => toggleForm(1)} // Switch to Sign up form
                  className="text-[#3C50E0] font-semibold hover:text-[#2F44C2] transition duration-300"
                >
                  ثبت نام کنید
                </button>
              </p> */}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Additional Form (e.g., Form 3) */}
          <div className="flex justify-center items-center bg-white relative mr-15">
            <div className="absolute left-[-25%] bg-white p-8 rounded-lg shadow-lg w-96 z-10">
              <h2 className="text-3xl font-bold text-[#8A99AF] text-right mb-6">شماره تماس</h2>
              {/* Add your form fields for stateForm 3 here */}
              <form onSubmit={handleLogin}>
                {/* Example input */}
                <div className="mb-4">
                  <label htmlFor="example" className="block text-sm font-semibold text-[#8A99AF] text-right">
                    شماره تماس خود را وارد کنید
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-3 border text-[#8A99AF] rounded-md mt-2 text-right"
                    placeholder="شماره تماس خود را وارد کنید"
                    required
                  />
                </div>
                <button
                 onClick={() => {
                  setStateForm(2)
                  fetchData();
                 }} 
                  type="submit"
                  className="w-full py-3 bg-[#3C50E0] text-white font-semibold rounded-md hover:bg-[#2F44C2] 
                  transition duration-300"
                >
                  تایید
                </button>
              </form>
              <p className="mt-4 text-sm text-center">
                <button
                  onClick={() => toggleForm(1)} // Switch to Sign up form
                  className="text-[#3C50E0] font-semibold hover:text-[#2F44C2] transition duration-300"
                >
                 ثبت نام کنید
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
