import React ,{useEffect, useState} from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import addbutton from "@assets/images/addbutton.svg";
import { useNavigate } from "react-router-dom";
import eye from "@assets/images/eye.svg";
import frame from "@assets/images/frame.svg";
import imghome from "@assets/images/imghome.png";
import folderblue from "@assets/images/folderblue.svg";
import leftline from "@assets/images/leftline.svg";
import { getCookie } from '@/utills/Cookies/cookieUtils';
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  const stats = {
    totalRequests: 18,
    successfulRequests: 16,
    unsignedRequests: 4,
  };

  const requestsData = [
    { status: "در انتظار", date: "1403/08/19",fullname: " محمد امینی", hoghogh: "100,000,000", installmentAmount: "10,000,000", trackingCode: "123456", signStatus: "در انتظار امضا",id:"1" },
    { status: "موفق", date: "1403/08/18", fullname: " محمد امینی ", hoghogh: "200,000,000", installmentAmount: "20,000,000", trackingCode: "654321", signStatus: "امضا شده",id:"2"  },
    { status: "در انتظار", date: "1403/08/19",fullname: " محمد امینی ",hoghogh: "100,000,000", installmentAmount: "10,000,000", trackingCode: "123456", signStatus: "امضا شده",id:"3"  },
    { status: "موفق", date: "1403/08/18", fullname: "  محمد امینی",hoghogh: "200,000,000", installmentAmount: "20,000,000", trackingCode: "654321", signStatus: "انصراف از امضا" ,id:"4" },
    { status: "در انتظار", date: "1403/08/19",fullname: " محمد امینی ", hoghogh: "100,000,000", installmentAmount: "10,000,000", trackingCode: "123456", signStatus: "انصراف از امضا",id:"5"  },
    { status: "موفق", date: "1403/08/18",fullname: "سارا احمدی", hoghogh: "200,000,000", installmentAmount: "20,000,000", trackingCode: "654321", signStatus: "انصراف از امضا" ,id:"6" },
    { status: "در انتظار", date: "1403/08/19",fullname: "سارا احمدی", hoghogh: "100,000,000", installmentAmount: "10,000,000", trackingCode: "123456", signStatus: "در انتظار امضا",id:"7" },
    { status: "موفق", date: "1403/08/18",fullname: "سارا احمدی", hoghogh: "200,000,000", installmentAmount: "20,000,000", trackingCode: "654321", signStatus: "انصراف از امضا" ,id:"8" },
    { status: "در انتظار", date: "1403/08/19",fullname: "سارا احمدی", hoghogh: "100,000,000", installmentAmount: "10,000,000", trackingCode: "123456", signStatus: "در انتظار امضا",id:"9" },
    { status: "در انتظار", date: "1403/08/19",fullname: "سارا احمدی", hoghogh: "100,000,000", installmentAmount: "10,000,000", trackingCode: "123456", signStatus: "امضا شده",id:"10"  },
  ];

const [user, setUser] = useState<object>({})

  const [selectedRecords, setSelectedRecords] = useState<string[]>([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [requests, setRequests] = useState(requestsData);
  const [signatureFilter, setSignatureFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = requestsData.filter((request) => {
    return (
      (signatureFilter ? request.signStatus.includes(signatureFilter) : true) &&
      (dateFilter ? request.date === dateFilter : true) &&
      (searchQuery
        ? request.trackingCode.includes(searchQuery) ||
          request.hoghogh.includes(searchQuery)
        : true)
    );
  });
  
  const toggleSelectAll = () => {
    setSelectAll((prev) => !prev);
    if (!selectAll) {
      setSelectedRecords(filteredRequests.map((request) => request.id));
    } else {
      setSelectedRecords([]);
    }
  };
  

  const toggleSelectRecord = (id: string) => {
    setSelectedRecords((prev) =>
      prev.includes(id)
        ? prev.filter((recordId) => recordId !== id)
        : [...prev, id]
    );
  };

const handleCheckCookie = () => {
  const cookieValue = getCookie('authToken');
  if (cookieValue) {
    return
  } else {
    navigate("/login")
  }
};







const fetchData= async()=>{
  const token = getCookie("authToken"); // Example token
  try {
      const response =axios.get(import.meta.env.VITE_HOST + `/api/v1/user/me`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
    setUser((await response).data)

  } catch (error) {
    navigate("/login")
      console.log(error);
  }
}

useEffect(() => {
fetchData()
}, []);
  

  return (
    <div className="p-8 bg-[#eef2ff] min-h-screen md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="text-right mr-4">
        <p className='text-2xl font-bold text-[#1C2434]'>   داشبورد </p>
      </div>
    
      <div className="flex items-center justify-center">
      <div className="flex flex-rows-4 mb-6 mt-6 text-right w-3/4">
      
        <div className="bg-white text-right w-60 h-48 border-b shadow-sm">
          <div className="  mt-10 ">
            <div className=" absolute left-16 bottom-84">
              <img src={imghome} className="w-50 h-50 " alt="Icon" />
            </div>
          </div>     
        </div>
         
        <div className="bg-white p-4 shadow-sm text-right w-64 h-48 ">
          <div className="flex flex-col items-center justify-center space-x-2 pr-4 mt-10"style={{ direction: "rtl" }}>
            <div className="text-center flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#353535] border border-radius rounded-lg bg-[#EBEDFC] w-16 h-16 flex items-center justify-center">
                {stats.unsignedRequests}
              </span>
              <p className="text-sm font-semibold mt-2 text-[#8A99AF]">
                درخواست‌های امضا نشده
              </p>
            </div>
          </div>
          </div>

          <div className="border-r border-gray-200 bg-white py-8"></div>

          <div className="bg-white p-4 shadow-lg text-right w-64 h-48">
            <div className="flex flex-col items-center justify-center space-x-2 pr-4 mt-10" 
            style={{ direction: 'rtl' }}>
             
              <div className='text-center flex flex-col items-center justify-center'>
                <span className="text-3xl font-bold text-[#353535] border border-radius rounded-lg bg-[#EBEDFC] w-16 h-16 flex items-center justify-center"> 
                  {stats.successfulRequests} </span>
                <p className="text-sm font-semibold mt-2 text-[#8A99AF]"> درخواست‌های موفق</p> 
              </div>
            </div>          
          </div>

          <div className="border-r border-gray-200 bg-white py-20 "></div>

          <div className="bg-white p-4 shadow-lg text-right w-64 h-48">
            <div className="flex flex-col items-center justify-center space-x-2 pr-4 mt-10" style={{ direction: 'rtl' }}>
             
              <div className='text-center flex flex-col items-center justify-center'>
              <span className="text-3xl font-bold text-[#353535] border border-radius rounded-lg bg-[#EBEDFC] w-16 h-16 flex items-center justify-center"> 
                {stats.totalRequests} </span>
                <p className="text-sm font-semibold text-[#8A99AF] mt-2"> درخواست‌های ساخته شده</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-60 h-60 ml-4 ">
            <button 
              onClick={() => navigate('/form')}
              className=" border-radius bg-white text-black text-sm font-bold w-60 h-48 mt-6 border border-dashed border-4 border-gray-300"
            >
              
              <img src={addbutton} className="w-20 h-20 ml-20 mb-2 " alt="Add Request Icon" />
              <span >  ساخت فرم </span>
            </button>
            </div>
        </div>


      <div className="bg-white p-3 border-radius rounded-sm">
        <div className="flex justify-between items-center mb-4 ">
          <button 
          className='flex items-center text-[#8A99AF] px-2 py-1 border-radius rounded-sm '
          onClick={() => navigate('/Requests')}> 
            {/* <img src={Vector} className='text-[#3C50E0] ml-2 mr-2' alt="Group Icon" /> */}
             مشاهده درخواست ها
          </button>
          
          <div className="text-right">
            <p className='flex items-center text-1xl font-bold text-[#3C50E0] '>
            بایگانی درخواست ها
          
          <img
            src={folderblue}
            className="w-6 h-6 ml-2"
            alt="Unsigned Requests Icon"
          />
            </p>
          </div>
        </div>

     
        <div className="bg-white rounded-lg shadow-lg overflow-hidden text-sm">
          <Table >
            <TableHeader>
              <TableRow className="bg-[#1C2434] text-white text-center">
                <TableCell > </TableCell>
                <TableCell className="text-left px-5">وضعیت امضا</TableCell>
                <TableCell>مبلغ قسط (ریال)</TableCell>
                <TableCell> حقوق ماهیانه (ریال)</TableCell>
                <TableCell> نام و نام خانوادگی </TableCell>
                <TableCell>تاریخ ثبت</TableCell>
                <TableCell className="text-center flex flex-row-reverse items-center justify-center ">
                  <input
                    type="checkbox"
                    className=" h-4 w-4 text-blue-600 ml-4"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  کد رهگیری
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestsData.map((request, index) => {
                let signStatusClass = '';
                if (request.signStatus === "در انتظار امضا") {
                  signStatusClass = "bg-[#FFA70B] bg-opacity-10 text-[#FFA70B]";
                } else if (request.signStatus === "امضا شده") {
                  signStatusClass = "bg-[#219653] bg-opacity-10 text-[#219653]";
                } else if (request.signStatus === "انصراف از امضا") {
                  signStatusClass = "bg-[#D34053] bg-opacity-10 text-[#D34053]";
                }

                return (
                  <TableRow key={request.id}>
                    <TableCell>
                      {request.signStatus === "در انتظار امضا" ? (
                        <div className="flex items-center justify-center text-center">
                          <button className="flex justify-end bg-[#3C50E0] text-white px-6 py-1 rounded-sm text-center">
                            <img src={leftline} className='text-[#3C50E0] mr-1' alt="Group Icon" />
                            ادامه 
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2 justify-center">
                          <button className="bg-white text-[#6681A9] px-2 py-1 rounded-lg">
                            <img src={eye} className="w-6 h-6 ml-2" alt=" Icon" />
                          </button>
                          <button className="bg-white text-[#3C50E0] px-2 py-1 rounded-lg">
                            <img
                              src={frame}
                              className="w-6 h-6 ml-2"
                              alt=" Icon"
                            />
                          </button>
                        </div>
                      )}
                    </TableCell>

                    <TableCell className={`flex items-center justify-center space-x-2 rounded-full w-28 h-8 mt-2 text-left ${signStatusClass}`}>
                      {request.signStatus}
                    </TableCell>

                    <TableCell className="text-center text-[#6681A9]">{request.installmentAmount}</TableCell>
                    <TableCell className="text-center text-[#6681A9]">{request.hoghogh}</TableCell>
                    <TableCell className="text-center text-[#6681A9]">{request.fullname}</TableCell>
                    <TableCell className="text-center text-[#6681A9]">{request.date}</TableCell>
                    <TableCell className="flex flex-row-reverse items-center justify-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 ml-4"
                        checked={selectedRecords.includes(request.id)}
                        onChange={() => toggleSelectRecord(request.id)}
                      />
                      <span >{request.trackingCode}</span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
       </div>
       </div>
  );
}
