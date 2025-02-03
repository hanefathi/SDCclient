
import { Link, useNavigate } from "react-router-dom";
import background from "@assets/images/background.svg";
import FormNegar from "@assets/images/FormNegar.svg";

export default function MainPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };



  return (
    <div
      className="min-h-screen flex flex-col w-full"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav className=" shadow-md ">
        <div className=" ml-20 py-6 flex justify-between items-center">
          <div className="flex justify-between items-center space-x-0 bg-[#3C50E0] border-radius rounded-sm w-32 h-10">
            <button
              className="flex justify-between items-center border-radius rounded-full text-white pl-5 text-sm font-semibold mt-0"
              onClick={handleLogin}
            >
              ثبت نام
            </button>
            <p className="text-white ">/</p>
            <button
              className="flex justify-between items-center border-radius rounded-full text-white pr-5 text-sm font-semibold mt-0"
              onClick={handleLogin}
            >
              ورود
            </button>
          </div>
          <div className="w-30 h-30 flex items-center justify-end text-center mr-10">
            
            <img
                src={FormNegar}
                alt=" Icon"
            />
            </div>
          <ul className="flex space-x-6 text-white items-center justify-center absolute top-10 left-1/2 transform -translate-x-1/2">
            <li>
              <Link
                to="/support"
                className="hover:text-[#3C50E0] transition duration-300"
              >
                پشتیبانی
              </Link>
            </li>
            <li>
              <Link
                to="/rules"
                className="hover:text-[#3C50E0] transition duration-300"
              >
                قوانین و مقررات
              </Link>
            </li>
            <li>
              <Link
                to="/tutorials"
                className="hover:text-[#3C50E0] transition duration-300"
              >
                آموزش‌ها
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-[#3C50E0] transition duration-300"
              >
                خانه
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-end text-center mt-30">
        <div className=" bg-opacity-80 p-10 rounded-lg shadow-md max-w-md ">
          <h2 className="text-3xl font-bold text-white mb-4 text-right">
          گواهی‌های دیجیتالی
          </h2>
          <p className="text-white mb-6 text-right">
          سهولت در ساخت و سرعت بخشیدن به فرایند در تایید گواهی کسر از حقوق.
          </p>

          <div className="flex justify-end">
            <Link
                to="/login"
                className="bg-[#3C50E0] text-white px-6 py-2 rounded-lg hover:bg-[#2F44C2] transition duration-300"
            >
                ساخت فرم
            </Link>
            </div>
        </div>
      </div>
      
    </div>
  );
}
