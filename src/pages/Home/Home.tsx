import React, { useEffect, useState, useContext } from "react";
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
import { ProfileContext } from "@/App";
import moment from 'moment-jalaali';

// axios.defaults.headers.common['Cache-Control'] = 'no-cache';
// axios.defaults.headers.common['Pragma'] = 'no-cache';
// axios.defaults.headers.common['Expires'] = '0';

// Define the Request type
interface Transaction {
  status: number;
  createdAt: string; // Adjust type based on your data
  fullName: string;
  salaryAmount: number;
  deficitAmount: number;
  trackId: string;
  id: string; // Adjust type based on your data
}

interface Req {
  status: number;
  date: string; // Assuming jalaliDate returns a string
  fullname: string;
  hoghogh: number;
  installmentAmount: number;
  trackingCode: string;
  signStatus: string;
  id: string;
}

interface StatsType {
  totalRequests: number;
  successfulRequests: number;
  unsignedRequests: number;
}

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext<any>(ProfileContext);

  const [pdfbas64view, setPdfbas64view] = useState<string | undefined>();
  const [requestsData, setRequestsData] = useState<Req[]>([]);
  const [managerReq, setManagerReq] = useState<any[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState<any>(false);
  const [signatureFilter, setSignatureFilter] = useState<any>("");
  const [dateFilter, setDateFilter] = useState("");
  // const [searchQuery, setSearchQuery] = useState<any>("");
  const [roles, setRoles] = useState<string[]>([]);

  const stats: StatsType = {
    totalRequests: user?.transactions.length || 0,
    successfulRequests: user?.transactions.filter((transaction: { status: number }) => transaction.status === 1).length || 0,
    unsignedRequests: user?.transactions.filter((transaction: { status: number }) => transaction.status === 0).length || 0,
  };
  

  const jalaliDate = (data: string): string => {
    return moment(data).format('jYYYY/jM/jD');
  };



  function formatNumber(amount:number) {
    return amount.toLocaleString();
  }


  
const handleStatusSigned=(status:number)=>{
let text;
switch (status) {
  case 1:
    text="امضا شده"
    break;

    case 2:
      text="انصراف از امضا"
      break;

  default:
  text="در انتظار امضا"
    break;
}
return text
}




const handleDeleteTransaction=async(id:number)=>{
  const token = getCookie("authToken"
  );
  if (!token) return; // Guard clause
  try {
    const response = await axios.delete(`${import.meta.env.VITE_HOST}/api/v1/transaction/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    alert("عملیات با موفقیت حدف گردید")
    fetchData()
    
  } catch (error) {
    console.error(error);
  }
  
  
}




  const createReq = (): void => {
    if (!user?.transactions) return; // Guard clause
  
    const arr: Req[] = user.transactions.map((transaction: Transaction) => ({
      status: transaction.status,
      date: jalaliDate(transaction.createdAt),
      fullname: transaction.fullName,
      hoghogh:formatNumber(transaction.salaryAmount) ,
      installmentAmount:formatNumber(transaction.deficitAmount) ,
      trackingCode: transaction.trackId,
      signStatus: handleStatusSigned(transaction.status) ,
      id: transaction.id,
    }));

    const managerArr: Req[] = user.transactionsManager.map((transaction: Transaction) => ({
      status: transaction.status,
      date: jalaliDate(transaction.createdAt),
      fullname: transaction.fullName,
      hoghogh:formatNumber(transaction.salaryAmount) ,
      installmentAmount:formatNumber(transaction.deficitAmount) ,
      trackingCode: transaction.trackId,
      signStatus: handleStatusSigned(transaction.status) ,
      id: transaction.id,
    }));
  
   
    setRoles(user.role);
     setRequestsData(arr.reverse());
    setManagerReq(managerArr.reverse())
  };

  const toggleSelectAll = () => {
    setSelectAll((prev: boolean) => !prev);
    
    setSelectedRecords((prev: any[]) => {
      const newSelectAll = !prev.length; // Determine if we are selecting all or none
      return newSelectAll ? filteredRequests.map(request => request.id) : [];
    });
  };
  
  const toggleSelectRecord = (id: number) => {
    setSelectedRecords((prev: number[]) =>
      prev.includes(id) ? prev.filter(recordId => recordId !== id) : [...prev, id]
    );
  };

  const handleCheckCookie = () => {
    const cookieValue = getCookie('authToken');
    if (!cookieValue) {
      navigate("/login");
    }
  };

  const fetchData = async () => {
    const token = getCookie("authToken");
    if (!token) return; // Guard clause
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/v1/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      navigate("/login");
      console.error(error);
    }
  };




  const handleSigningTransaction = async (id:number) => {
    const token = getCookie("authToken");
    if (!token) return; // Guard clause
    const data = {
      "username":"sp_zamanian",
      "password":"W2$i%43REd!",
      "apiVersion":null
  }

    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST}/api/v1/transaction/gatewaylink/`+id,data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      window.location.href = response.data.gatewayLink;
    } catch (error) {
      console.error(error);
    }
  };





  useEffect(() => {
    handleCheckCookie();
    fetchData();
  }, []);

  useEffect(() => {
    createReq();
  }, [user]);

  const fetchDataPdf = async (trackId: number) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/v1/file/pdf?trackId=${trackId}`);
      return response.data.pdf; // Assuming this returns the Base64 string
    } catch (error) {
      console.error('Error fetching PDF:', error);
      throw error;
    }
  };

  const handlePdf = async (trackId: number,show:true) => {
    const pdfBase64 = await fetchDataPdf(trackId);

    if(show==true) {
      setPdfbas64view(pdfBase64)
      return
    }

    const byteCharacters = atob(pdfBase64);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([byteNumbers], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Emzagar-${trackId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const searchQuery = requestsData.filter(request => {
  //   return (
  //     (signatureFilter ? request.signStatus.includes(signatureFilter) : true) &&
  //     (dateFilter ? request.date === dateFilter : true) &&
  //     (searchQuery
  //       ? request.trackingCode.includes(searchQuery) ||
  //         request.hoghogh.includes(searchQuery)
  //       : true)
  //   );
  // });






  return (
<>

{pdfbas64view ? <>
<button onClick={()=>setPdfbas64view(undefined)} className="bg-[#ffffff] w-[100%] h-[2rem] flex
 justify-end items-center absolute top-0 z-[21]">
<a href="" onClick={()=>setPdfbas64view(undefined)}  className="mr-[1.5rem]" >بستن X </a>
</button>
<iframe
        src={'data:application/pdf;base64,'+pdfbas64view}
        className="absolute z-[20] top-[2rem] w-[100%] h-[100%]"
        title="PDF Viewer"
      />
</> : null}



<div className="p-8 bg-[#eef2ff] min-h-screen md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="text-right mr-4">
        <p className='text-2xl font-bold text-[#1C2434]'>  
           داشبورد </p>
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

        {roles.includes("ADMIN") && <>
         <div className="w-60 h-60 ml-4 ">
            <button 
              onClick={() => navigate('/form')}
              className=" border-radius bg-white text-black text-sm font-bold w-60 h-48 mt-6 border border-dashed border-4 border-gray-300"
            >
              
              <img src={addbutton} className="w-20 h-20 ml-20 mb-2 " alt="Add Request Icon" />
              <span >  ساخت فرم </span>
            </button>
            </div>
        </>}
       


            
        </div>





{/* Manager Tables */}
{roles.includes("ADMIN") && <>
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

            اسناد ثبت شده شما

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
                <TableCell>مبلغ کسری (ریال)</TableCell>
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
              {managerReq.map((request, index) => {
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
                      {request.signStatus === "در انتظار امضا" ||  request.signStatus === "انصراف از امضا" ? (

                      
                        <div className="flex items-center justify-center text-center">
                      
                        {roles.includes("ADMIN")==false?
                        
                        <>
                        
                        </>:<>


                        <button className="flex justify-end bg-[#e0553c] text-white px-6 py-1 rounded-sm text-center" onClick={()=>handleDeleteTransaction(request.id)}>
                            <img src={leftline} className='text-[#db5c35] mr-1' alt="Group Icon" />
                            حذف 
                        </button>

                        <button className="flex justify-end bg-[#3C50E0] text-white px-6 py-1 rounded-sm text-center" onClick={()=>handleSigningTransaction(request.id)}>
                            <img src={leftline} className='text-[#3C50E0] mr-1' alt="Group Icon" />
                            ادامه 
                        </button>
                        </>}
                        
                        <div className="flex space-x-2 justify-center">
                          <button className="bg-white text-[#6681A9] px-2 py-1 rounded-lg" onClick={()=>{handlePdf(request.trackingCode,true)}}>
                            <img src={eye} className="w-6 h-6 ml-2" alt=" Icon" />
                          </button>
                          <button className="bg-white text-[#3C50E0] px-2 py-1 rounded-lg" onClick={()=>{handlePdf(request.trackingCode,false)}}>
                            <img
                              src={frame}
                              className="w-6 h-6 ml-2"
                              alt=" Icon"
                            />
                          </button>
                        </div>
                          
                        </div>

                        
                      ) : (
                        <div className="flex space-x-2 justify-center">
                          <button className="bg-white text-[#6681A9] px-2 py-1 rounded-lg" onClick={()=>{handlePdf(request.trackingCode,true)}}>
                            <img src={eye} className="w-6 h-6 ml-2" alt=" Icon" />
                          </button>


                       

                          <button className="bg-white text-[#3C50E0] px-2 py-1 rounded-lg" onClick={()=>{handlePdf(request.trackingCode,false)}}>
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
</>
}

{/* // Request Tables */}
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
                <TableCell>مبلغ کسری (ریال)</TableCell>
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
                      
                        {roles.includes("ADMIN")==false?
                        
                        <>
                        
                        </>:<>
                        <button className="flex justify-end bg-[#3C50E0] text-white px-6 py-1 rounded-sm text-center">
                            <img src={leftline} className='text-[#3C50E0] mr-1' alt="Group Icon" />
                            ادامه 
                        </button>
                        </>}
                        
                        <div className="flex space-x-2 justify-center">
                          <button className="bg-white text-[#6681A9] px-2 py-1 rounded-lg" onClick={()=>{handlePdf(request.trackingCode,true)}}>
                            <img src={eye} className="w-6 h-6 ml-2" alt=" Icon" />
                          </button>
                          <button className="bg-white text-[#3C50E0] px-2 py-1 rounded-lg" onClick={()=>{handlePdf(request.trackingCode,false)}}>
                            <img
                              src={frame}
                              className="w-6 h-6 ml-2"
                              alt=" Icon"
                            />
                          </button>
                        </div>
                          
                        </div>

                        
                      ) : (
                        <div className="flex space-x-2 justify-center">
                          <button className="bg-white text-[#6681A9] px-2 py-1 rounded-lg" onClick={()=>{handlePdf(request.trackingCode,true)}}>
                            <img src={eye} className="w-6 h-6 ml-2" alt=" Icon" />
                          </button>
                          <button className="bg-white text-[#3C50E0] px-2 py-1 rounded-lg" onClick={()=>{handlePdf(request.trackingCode,false)}}>
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

</>
);
}
