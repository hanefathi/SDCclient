import React, { useState } from "react";
import usergray from "@assets/images/usergray.svg";
import phgendergray from "@assets/images/phgendergray.svg";
import government from "@assets/images/government.svg";
import money from "@assets/images/money.svg";
import company from "@assets/images/company.svg";
import Date from "@assets/images/Date.svg";
import hugeiconsjob from "@assets/images/hugeiconsjob.svg";
import teenyiconsgray from "@assets/images/teenyiconsgray.svg";
import Group from "@assets/images/Group.svg";

const FormInput = ({
  name,
  setName,
  nationalcode,
  setNationalcode,
  companyname,
  setCompanyname,
  organization,
  setOrganization,
  hoghogh,
  setHoghogh,
  ghest,
  setGhest,
  logo,
  setLogo,
  jobStatus,
  setJobStatus,
  gender,
  setGender,
  date,
  setDate,
  handleModalOpen,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  nationalcode: string;
  setNationalcode: React.Dispatch<React.SetStateAction<string>>;
  companyname: string;
  setCompanyname: React.Dispatch<React.SetStateAction<string>>;
  organization: string;
  setOrganization: React.Dispatch<React.SetStateAction<string>>;
  hoghogh: string ;
  setHoghogh: React.Dispatch<React.SetStateAction<string>>;
  ghest: string;
  setGhest: React.Dispatch<React.SetStateAction<string>>;
  logo: File | null | any;
  setLogo: React.Dispatch<React.SetStateAction<File | null | any>>;
  jobStatus: string | any | undefined | null;
  setJobStatus: React.Dispatch<React.SetStateAction<string | any | undefined | null>>;
  gender: string | any | undefined | null;
  setGender: React.Dispatch<React.SetStateAction<string | any | undefined | null>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  handleModalOpen: () => void;
}) => {
  const [jobDate, setJobDate] = useState<any | undefined | null>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setLogo(file);
    // console.log("Form Data:", formData);
  };
  return (
    <div className=" w-2/5 pl-10 mr-20 mt-20 mb-28 border-2 border-dashed border-[#3C50E0] border-sky-500 border-radius rounded border-gray-200 ">
      <h1 className="text-right text-[#3C50E0] text-blue mr-4 mt-4">
        {" "}
        فرم درخواست
      </h1>
      <form className=" space-y-8 text-[#8A99AF]">
        <div className="flex items-center justify-between text-right mt-10 ">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-radius rounded border-gray-200 p-2 w-60 text-right"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
          />
          <label
            htmlFor="name"
            className="mr-6 flex justify-between items-center"
          >
            نام کامل
            <img
              src={teenyiconsgray}
              className="w-7 h-7 ml-1"
              alt="Unsigned Requests Icon"
            />
          </label>
        </div>

        <div className="flex items-center justify-between text-right ">
          <input
            type="text"
            id="nationalcode"
            value={nationalcode}
            onChange={(e) => setNationalcode(e.target.value)}
            className="border border-radius rounded border-gray-200 p-2 w-60 text-right"
            placeholder="کد ملی خود را وارد کنید"
          />
          <label
            htmlFor="nationalcode"
            className="mr-6 flex justify-between items-center"
          >
            کد ملی
            <img
              src={usergray}
              className="w-6 h-6 ml-1"
              alt="Unsigned Requests Icon"
            />
          </label>
        </div>

        <div className="flex items-center justify-end ">
          <div className="flex items-center space-x-4 space-x-reverse">
            <label className="flex items-center space-x-2 flex-row-reverse mr-4">
              <input
                type="radio"
                name="gender"
                value="آقا"
                onChange={() => setGender("آقا")}
                className="mr-2 ml-2"
              />
              آقا
            </label>
            <label className="flex items-center space-x-2 flex-row-reverse MR-4">
              <input
                type="radio"
                name="gender"
                value="خانم"
                onChange={() => setGender("خانم")}
                className="mr-28 ml-3"
              />
              خانم
            </label>
          </div>
          <label
            htmlFor="gender"
            className=" flex justify-end items-center mr-6"
          >
            جنسیت
            <img
              src={phgendergray}
              className="w-7 h-7 ml-1"
              alt="Gender Icon"
            />
          </label>
        </div>

        <div className="flex items-center justify-end text-right">
          <div className="flex items-center space-x-4 space-x-reverse">
            <label className="flex items-center flex-row-reverse mr-4">
              <input
                type="radio"
                name="jobStatus"
                value="بازنشسته"
                onChange={() => {
                  setJobStatus("بازنشسته");
                  setJobDate("");
                }}
                className="mr-2 ml-2"
              />
              بازنشسته
            </label>
            <label className="flex items-center space-x-2 flex-row-reverse">
              <input
                type="radio"
                name="jobStatus"
                value="کارمند"
                onChange={() => {
                  setJobStatus("کارمند");
                  setJobDate("");
                }}
                className="mr-16 ml-2"
              />
              کارمند
            </label>
          </div>
          <label
            htmlFor={jobStatus}
            className="mr-6 flex justify-between items-center"
          >
            وضعیت شغلی
            <img
              src={hugeiconsjob}
              className="w-7 h-7 ml-1"
              alt="Job Status Icon"
            />
          </label>
        </div>

        {jobStatus === "کارمند" && (
          <div className="flex items-center justify-between text-right mt-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-radius rounded border-gray-200 p-2 w-60 text-right"
              style={{
                direction: "rtl",
              }}
            />
            <label className="mr-6 flex justify-between items-center">
              تاریخ شروع به کار
              <img src={Date} className="w-7 h-7 ml-1" alt="Start Date Icon" />
            </label>
          </div>
        )}

        {jobStatus === "بازنشسته" && (
          <div className="flex items-center justify-between text-right mt-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-radius rounded border-gray-200 p-2 w-60 text-right"
              style={{
                direction: "rtl",
              }}
            />
            <label className="mr-6 flex justify-between items-center">
              تاریخ بازنشستگی
              <img
                src={Date}
                className="w-7 h-7 ml-1 "
                alt="Retirement Date Icon"
              />
            </label>
          </div>
        )}

        <div className="flex items-center justify-between text-right  ">
          <input
            type="text"
            id="name"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="border border-radius rounded border-gray-200 p-2 w-60 text-right"
            placeholder="نام سازمان خود را وارد کنید"
          />
          <label
            htmlFor="name"
            className="mr-6 flex justify-between items-center"
          >
            سازمان
            <img
              src={government}
              className="w-7 h-7 ml-1"
              alt="Unsigned Requests Icon"
            />
          </label>
        </div>

        <div className="flex items-center justify-between text-right  ">
          <input
            type="text"
            id="name"
            value={hoghogh}
            onChange={(e) => setHoghogh(e.target.value)}
            className="border border-radius rounded border-gray-200 p-2 w-60"
            placeholder="ریال"
          />
          <label
            htmlFor="name"
            className="mr-6 flex justify-between items-center"
          >
            میزان حقوق
            <img
              src={money}
              className="w-7 h-7 ml-1"
              alt="Unsigned Requests Icon"
            />
          </label>
        </div>

        <div className="flex items-center justify-between text-right  ">
          <input
            type="text"
            id="name"
            value={ghest}
            onChange={(e) => setGhest(e.target.value)}
            className="border border-radius rounded border-gray-200 p-2 w-60"
            placeholder="ریال"
          />
          <label
            htmlFor="name"
            className="mr-6 flex justify-between items-center"
          >
            مبلغ قسط
            <img
              src={money}
              className="w-7 h-7 ml-1"
              alt="Unsigned Requests Icon"
            />
          </label>
        </div>

        <div className="flex items-center justify-between text-right  ">
          <input
            type="text"
            id="name"
            value={companyname}
            onChange={(e) => setCompanyname(e.target.value)}
            className="border border-radius rounded border-gray-200 p-2 w-60 text-right"
            placeholder="نام شرکت را وارد کنید"
          />
          <label
            htmlFor="name"
            className="mr-2 flex justify-between items-center"
          >
            نام شرکت
            <img
              src={company}
              className="w-7 h-7 ml-1 mr-4"
              alt="Unsigned Requests Icon"
            />
          </label>
        </div>
        <div className="flex items-center text-right  ">
          <button className="flex items-center border border-radius rounded border-gray-200 bg-[#3C50E0] text-white w-1/6 h-10    ">
            آپلود فایل
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-radius rounded border-gray-200 p-2 w-40"
          />

          <label
            htmlFor="logo"
            className="ml-20 mr-1 flex justify-left items-center"
          >
            آیکون شرکت
            <img
              src={teenyiconsgray}
              className="w-7 h-7 ml-2 mr-4"
              alt="Unsigned Requests Icon"
            />
          </label>
        </div>

        <div className="flex items-center justify-between text-right  ">
          <button
            className="flex border border-radius rounded border-gray-200 bg-[#3C50E0] text-white px-36 py-2 mb-2 "
            onClick={(e) => {
              e.preventDefault();
              handleModalOpen(); // Only handle opening the modal here
            }}
          >
            <img
              src={Group}
              className="w-7 h-7 ml-1"
              alt="Unsigned Requests Icon"
            />
            ثبت و بررسی نهایی
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInput;
