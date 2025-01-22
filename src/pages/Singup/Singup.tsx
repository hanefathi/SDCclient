import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import collabora from "@assets/images/collabora.svg";

export default function Signup() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isDomestic, setIsDomestic] = useState(false);
  const [isForeign, setIsForeign] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
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

  return (
    <div className="min-h-screen grid grid-cols-[2fr_1fr]  ">
    
      <div
        className="bg-cover bg-center relative w-200 "
        style={{
          backgroundImage: `url(${collabora})`,
        }}
      ></div>

    
      <div className="flex justify-center items-center bg-white relative mr-15">
        <div className="absolute left-[-25%] bg-white p-8 rounded-lg shadow-lg w-96 z-10 ">
          <h2 className="text-3xl font-bold text-[#8A99AF] text-right mb-6">ثبت نام</h2>
          <form onSubmit={handleLogin}>
            
            <div className="mb-4 flex items-center justify-end">
              <div className="flex items-center">
                <label htmlFor="domestic" className="text-sm font-semibold text-black mr-2">
                  اتباع داخلی
                </label>
                <input
                  type="checkbox"
                  id="domestic"
                  checked={isDomestic}
                  onChange={() => handleCheckboxChange("domestic")}
                  className="form-checkbox text-[#3C50E0] focus:ring-[#2F44C2]"
                />
              </div>
              <div className="flex items-center space-x-reverse space-x-2 ml-6">
                <label htmlFor="foreign" className="text-sm font-semibold text-black mr-2">
                  اتباع خارجی
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
              <label htmlFor="password" className="block text-sm font-semibold text-[#8A99AF] text-right">
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
            </div>

            <p className="text-sm mb-4 text-right">در صورت فراموشی رمز عبور بر روی لینک کلیک کنید</p>

           
            <button
              type="submit"
              className="w-full py-3 bg-[#3C50E0] text-white font-semibold rounded-md hover:bg-[#2F44C2] transition duration-300"
            >
              ورود
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            <button
              onClick={() => navigate("/signup")}
              className="text-[#3C50E0] font-semibold hover:text-[#2F44C2] transition duration-300"
            >
              ثبت نام کنید
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
