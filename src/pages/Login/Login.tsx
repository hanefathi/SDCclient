import React, { useState ,useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backlogin from "@assets/images/backlogin.jpg";
// import CAPTCHA from "@assets/images/CAPTCHA.svg";
import FormNegarblue from "@assets/images/FormNegarblue.svg";
// import Cookies from 'js-cookie';
import { setCookie } from '@/utills/Cookies/cookieUtils';


import axios from 'axios';

interface OtpResponse {
  statusCode: number;
  message: string;
  otp: string;
}

type otpResToken = {
  token: string,
  expiresIn:number
}

export default function Login() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isDomestic, setIsDomestic] = useState(false);
  const [isForeign, setIsForeign] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]); 
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [timer, setTimer] = useState(120);
  // const [status, setStatus] = useState<number>(1)
  const [otp, setOtp] = useState<string | null>("");
  // const [responseData, setResponseData] = useState(null);
  // const [error, setError] = useState(null);
  // const [responseCode, setResponseCode] = useState<string | null >("")
  const [isSignUp, setIsSignUp] = useState(true)


  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCodeSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
   
      setIsCodeSent(false);
      alert("کد منقضی شد. لطفاً دوباره تلاش کنید.");
    }

    return () => clearInterval(interval); 
  }, [isCodeSent, timer]);

  const handleLogin = (e: React.FormEvent,status:boolean) => {
    if (status==true){
      e.preventDefault();
    setIsCodeSent(true);
    setTimer(120); 

    if(isSignUp==true){
      fetchSignUp()
      return
    }

    fetchLogin() 
    return
    }
    return
  };

const handleSetCookie = (cookieName:string,cookieValue:string) => {
  setCookie(cookieName, cookieValue); // 1 day expiration
  console.log(otp);
};


  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newCode = [...verificationCode];
    
    
    if (/^\d?$/.test(value)) {
      newCode[index] = value;
      setVerificationCode(newCode);

      
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerifyCode = (e: React.FormEvent | null | undefined |any) => {
    e.preventDefault();
    const code = verificationCode.join("");
    if (code === otp) {
      fetchLogin()
      navigate("/home"); 
    } else {
      alert("کد وارد شده صحیح نیست.");
    }


  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleCheckboxChange = (type: "domestic" | "foreign") => {
    if (type === "domestic") {
      setIsDomestic(!isDomestic);
      if (isForeign) setIsForeign(false);
    } else {
      setIsForeign(!isForeign);
      if (isDomestic) setIsDomestic(false);
    }
  };



const fetchLogin = async () => {
  try {
      const response = await axios.post(import.meta.env.VITE_HOST+`/api/v1/auth/signin`, {
          // Your request body goes here
          phoneNumber: mobile,
          otp: otp
      }, );

      // Type assertion for response.data
      if (otp==""||otp==null|| otp==undefined){
        const res: OtpResponse = response.data;
        // alert(res.message)
        // setOtp(res.otp);
        return
      }
    
      const res: otpResToken = response.data; 
      handleSetCookie("authToken",res.token)
      navigate("/home"); 

      

  } catch (error) {
      alert("کاربر با این شماره وجود نداره.")
      setMobile("")
      setPassword("")
      setOtp("")
      setIsSignUp(true)
      setIsCodeSent(false)
  }
};



const fetchSignUp = async () => {
  // const token = getCookie("authToken"); // Example token
  try {
      const response = await axios.post(import.meta.env.VITE_HOST+`/api/v1/auth/signup`, {
          // Your request body goes here
          phoneNumber: mobile,
          nationalCode: password
      }, );

    // alert("کاربر با موفقیت ثبت نام شد" + response.data.message)
    // setOtp(response.data.otp)
  //  setIsSignUp(false)
   

  } catch (error) {
    fetchLogin()
  }
};


  return (
    <div className="min-h-screen grid grid-cols-[1fr_1fr] relative ">
      <div
        className="bg-cover bg-center ml-10 mt-6 mb-6 border-radius rounded-tr-3xl flex flex-row-reverse rounded-bl-3xl rounded-tl-xl rounded-br-xl "
        style={{
          backgroundImage: `url(${backlogin})`,
        }}
      ></div>

      <div className="absolute left-60 bottom-10 p-8 rounded-lg shadow-lg w-90 h-60 z-10 flex items-start justify-end bg-[#000000] bg-opacity-30 ">
        <div className=" bg-opacity-60 p-10 rounded-lg shadow-md max-w-md ">
          <h2 className="text-3xl font-bold text-white mb-4 text-right">
            فرم نگار
          </h2>
          <p className="text-white mb-6 text-right">
              سامانه ساخت گواهی کسر از حقوق دیجیتالی است. و به شما در سخت
            سریع فرم برای درخواست کنندگان گواهی کسر از حقوق، کمک می‌کند.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center bg-white relative mr-15">
        <div className="w-30 h-30 flex items-center justify-end text-center mr-10">
          <img
            src={FormNegarblue}
            alt=" Icon"
            className="absolute top-7 right-12 w-30 h-30"
          />
        </div>
        {isCodeSent ? (
          <div className="absolute p-8 rounded-lg w-3/5 z-10 mt-16 ">
            <h2 className="text-3xl font-bold text-[#1C2434] text-right mb-4">
                کد تایید
            </h2>
            <h3 className="text-lg text-[#8A99AF] text-right mb-14">
            کد تایید ارسال شده به شماره همراه  {mobile} را وارد نمایید
            </h3>
            
            <form onSubmit={handleVerifyCode}>
              <div className="flex justify-center mb-2">
                {verificationCode.map((code, index) => (

                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el!)} 
                    type="text"
                    maxLength={1}
                    value={code}
                    onChange={(e) => handleCodeChange(e, index)}
                    className="w-20 h-20 text-center text-2xl border rounded-md mx-2"
                    required
                  />
                ))}
              </div>
              <div className="flex items-center justify-end mb-8">
              <div className="flex items-center text-[#3C50E0]">
              {formatTime(timer)}
              </div>
              
              <button
              onClick={()=>{
                setMobile("")
                setPassword("")
                setOtp("")
                setIsSignUp(false)
                setIsCodeSent(!isCodeSent)
              }}
                type="submit"
                className=" flex items-center ml-64 w-30 text-[#3C50E0]"
              >
                ارسال مجدد کد
              </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#1C2434] text-white font-semibold rounded-md transition duration-300"
              >
                تایید کد
              </button>
            </form>
          </div>
        ) : (





          <div className="absolute p-8 rounded-lg w-3/5 z-10 mt-16 ">
            <h2 className="text-3xl font-bold text-black text-center mb-4">
              به <span className="text-[#3C50E0]">فرم نگار</span> خوش آمدید
            </h2>
            <h1 className=" font-bold text-[#8A99AF] text-center mb-10">
              سامانه ساخت گواهی کسر از حقوق دیجیتالی
            </h1>
            <form onSubmit={(e)=>{handleLogin(e,true)}}>
              <div className="mb-4">
                <label
                 
                  className="block text-sm font-semibold text-[#8A99AF] text-right"
                >
                   شماره تلفن
                </label>
                <input
                  type="text"
                  id="mobile"
                  minLength={11}
                  maxLength={11}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full p-3 border text-[#8A99AF] rounded-md mt-2 text-right"
                  placeholder="0912xxxxxxx"
                  required
                />
              </div>

            {isSignUp ? <>
            
              <div className="mb-4">
                <label
               
                  className="block text-sm font-semibold text-[#8A99AF] text-right"
                >
                   کد ملی
                </label>
                <input
                      minLength={0}
                      maxLength={10}
                  type="text"
                  id="mobile"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border text-[#8A99AF] rounded-md mt-2 text-right"
                  placeholder="002XXXXXXX"
                  required
                />
              </div>

            </>:
            <>
            
            </>}

            


              {/* <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#8A99AF] text-right"
                >
                  رمز عبور
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border text-[#8A99AF] rounded-md mt-2 text-right"
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                />
              </div> */}
              

              <div className="mb-8 flex items-center justify-end">
                <div className="flex items-center">
                  <button className="text-sm font-semibold text-[#3C50E0] mr-2" onClick={()=>setIsSignUp(!isSignUp)}>
                    {isSignUp ? "ورود با شماره تماس":"حساب ندارید ؟ ثبت نام کنید"}
                  </button>
                </div>
                
                <div className="flex items-center space-x-reverse space-x-2 ml-16">
                  <label
                    htmlFor="foreign"
                    className="text-sm font-semibold text-black mr-2"
                  >
                    مرا بخاطر داشته باش
                  </label>
                  <input
                    type="checkbox"
                    id="foreign"
                    checked={isForeign}
                    onChange={() => handleCheckboxChange("foreign")}
                    className="form-checkbox text-[#3C50E0] focus:ring-[#2F44C2]"
                  />
                </div>
              </div>

              {/* <div className=" flex items-center justify-between w-80 h-50 bg-[#F9F9F9] border border-[#D3D3D3] border rounded-sm mb-4 text-right ml-auto">
                <div>
                  <img src={CAPTCHA} className="w-18 h-18 ml-6" alt="Icon" />
                </div>
                <div>
                  <label
                    htmlFor="foreign"
                    className="text-sm font-semibold text-[#1C2434] m-2 pb-2 "
                  >
                    من ربات نیستم
                  </label>
                  <input
                    type="checkbox"
                    id="foreign"
                    checked={isForeign}
                    onChange={() => handleCheckboxChange("foreign")}
                    className=" text-[#3C50E0] focus:ring-[#2F44C2] w-6 h-6 mr-4"
                  />
                </div>
              </div> */}

              <button
              onClick={(e)=>{
                handleLogin(e,true)
              }}
                type="submit"
                className="w-full py-3 bg-[#3C50E0] text-white font-semibold rounded-md hover:bg-[#2F44C2] transition duration-300"
              >
               {isSignUp ? "عضویت" : "ورود"} 
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              <button
                onClick={() => navigate("/signup")}
                className="text-[#CCCCCC] font-semibold transition duration-300 mt-4"
              >
                حریم خصوصی و امنیت | ایجاد شده توسط{" "}
                <span className="text-[#8A99AF]"> تیم طراحی هویتا</span>
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
