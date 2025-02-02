import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  // TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import folder from "@assets/images/folder.svg";
import leftline from "@assets/images/leftline.svg";
import search from "@assets/images/search.svg";
import trashgray from "@assets/images/trashgray.svg";
import trash from "@assets/images/trash.svg";
import documentdownloadgray from "@assets/images/documentdownloadgray.svg";
import documentdownload from "@assets/images/documentdownload.svg";
// import chevron from "@assets/images/chevron.svg";
import outline from "@assets/images/outline.svg";
import mingcuteleft from "@assets/images/mingcuteleft.svg";
import mingcuteright from "@assets/images/mingcuteright.svg";
import eye from "@assets/images/eye.svg";
import frame from "@assets/images/frame.svg";
import ConfirmationModal from './components/ConfirmationModal';
import CustomDatePicker from "@/components/CustomDatePicker";
// import DatePicker, { Value } from "react-multi-date-picker"; // Import Value type
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// import { parse } from 'date-fns';
import jMoment from 'jalali-moment';

export default function Requests() {
  // const stats = {
  //   totalRequests: 18,
  //   successfulRequests: 16,
  //   unsignedRequests: 2,
  // };

  

  const requestsData = [
    {
      id: "1",
      status: "در انتظار",
      date: "1403/09/11",
      fullname:' محمد امینی',
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "در انتظار امضا",
    },
    {
      id: "2",
      status: "موفق",
      date: "1403/08/11",
      fullname:' محمد امینی',
      loanAmount: "200,000,000",
      installmentAmount: "20,000,000",
      trackingCode: "654321",
      signStatus: "ثبت",
    },
    {
      id: "3",
      status: "انصراف ",
      date: "1403/09/10",
      fullname:' محمد امینی',
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "انصراف",
    },
    {
      id: "4",
      status: "در انتظار",
      date: "1403/09/01",
      fullname:' محمد امینی', 
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "در انتظار امضا",
    },
    {
      id: "5",
      status: "موفق",
      date: "1403/08/02",
      fullname:' محمد امینی',
      loanAmount: "200,000,000",
      installmentAmount: "20,000,000",
      trackingCode: "654321",
      signStatus: "ثبت",
    },
    {
      id: "6",
      status: " انصراف",
      date: "1403/09/03",
      fullname:' محمد امینی',
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "انصراف",
    },
    {
      id: "7",
      status: "در انتظار",
      date: "1403/09/04",
      fullname:' محمد امینی',
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "در انتظار امضا",
    },
    {
      id: "8",
      status: "موفق",
      date: "1403/09/05",
      fullname:' محمد امینی',
      loanAmount: "200,000,000",
      installmentAmount: "20,000,000",
      trackingCode: "654321",
      signStatus: "ثبت",
    },
    {
      id: "9",
      status: "در انتظار",
      date: "1403/09/06",
      fullname:' محمد امینی',
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "ثبت",
    },
    {
      id: "10",
      status: "در انتظار",
      date: "1403/09/06",
      fullname:' محمد امینی',
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "در انتظار امضا",
    },
    {
      id: "11",
      status: "موفق",
      date: "1403/09/07",
      fullname:' محمد امینی',
      loanAmount: "200,000,000",
      installmentAmount: "20,000,000",
      trackingCode: "654321",
      signStatus: "ثبت",
    },
    {
      id: "12",
      status: "در انتظار",
      date: "1403/09/08",
      fullname:' محمد امینی',
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "ثبت",
    },
    {
      id: "13",
      status: " انصراف",
      date: "1403/09/09",
      fullname:' محمد امینی',
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "انصراف",
    },
    {
      id: "14",
      status: " انصراف",
      date: "1403/09/09",
      fullname:' محمد امینی',
      loanAmount: "100,000,000",
      installmentAmount: "10,000,000",
      trackingCode: "123456",
      signStatus: "انصراف",
    },
  
  ];

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [signatureFilter, setSignatureFilter] = useState("");

  const itemsPerPage = 8;
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;

  const [requests, setRequests] = useState(requestsData);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dateFilter, setDateFilter] = useState<string | null>("");

  const handleDateChange = (date: any) => {
    if (date && typeof date === 'object' && 'toDate' in date) {
      const formattedDate = jMoment(date.toDate()).format("jYYYY/jMM/jDD");
      console.log("Formatted Date:", formattedDate); // Debug line
      setDateFilter(formattedDate);
    } else {
      setDateFilter(null);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when filters change.
  }, [dateFilter]);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const requestDate = jMoment(request.date, 'jYYYY/jMM/jDD').toDate().getTime();
      const filterDate = dateFilter ? jMoment(dateFilter, 'jYYYY/jMM/jDD').toDate().getTime() : null;

      const matchesDate = dateFilter
        ? requestDate === filterDate
        : true;

      const matchesSignature = signatureFilter ? request.signStatus.includes(signatureFilter) : true;
      const matchesSearch = searchQuery
        ? request.trackingCode.includes(searchQuery) || request.loanAmount.includes(searchQuery)
        : true;

      return matchesDate && matchesSignature && matchesSearch;
    });
  }, [requests, signatureFilter, dateFilter, searchQuery]);

  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    if (selectedRecords.length === 0) return;
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setRequests((prev) =>
      prev.filter((request) => !selectedRecords.includes(request.id))
    );
    setSelectedRecords([]);
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredRequests]);

  const [value, setValue] = useState<any>(new Date());

  return (
    <div className="p-10 bg-[#eef2ff] min-h-screen font-iranyekan">
      
   
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative w-full lg:w-1/3">
          <input
            type="text"
            className="w-full h-10 pl-10 pr-7 border rounded-lg border-gray-200 text-right"
            placeholder="جستجو مبلغ یا کد رهگیری"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src={search}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 ml-8"
            alt="Search Icon"
          />
        </div>
        <div className="flex text-right">
          <button className="text-xl font-bold text-[#1C2434]">
           
            بایگانی درخواست ها
          </button>
          <img
            src={folder}
            className="w-10 h-10 ml-2"
            alt="Unsigned Requests Icon"
          />
        </div>
      </div>

    
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
     
        <div className="flex items-center justify-start w-full lg:w-auto gap-1">
          
        <button 
        onClick={() => navigate('/login')}
        className="flex justify-end bg-[#3C50E0] text-white px-3 py-1 rounded-sm text-center text-sm">
             خروجی 
             <img src={outline} className=' ml-1' alt="Group Icon" />
        </button>
                      
        <button
            onClick={handleDelete}
            disabled={selectedRecords.length === 0}
            className={`flex items-center px-1 py-2 rounded-md ml-2 ${
              selectedRecords.length > 0
                ? "text-red-600"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            حذف
            <img
              src={selectedRecords.length > 0 ? trash : trashgray}
              className="w-5 h-5 ml-2"
              alt="Delete Icon"
            />
          </button>
          <ConfirmationModal
            isOpen={isModalOpen}
            title="حذف درخواست‌ها"
            message="آیا از حذف درخواست‌های انتخاب‌شده اطمینان دارید؟"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />


          <button
            disabled={selectedRecords.length === 0}
            className={`flex items-center px-1 py-2 rounded-md ${
              selectedRecords.length > 0
                ? "text-blue-600"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            دانلود
            <img
              src={
                selectedRecords.length > 0
                  ? documentdownload
                  : documentdownloadgray
              }
              className="w-5 h-5 ml-2"
              alt="Download Icon"
            />
          </button>
        </div>

    
        <div className="flex flex-wrap justify-end items-center  w-full lg:w-auto">
          <div className="relative w-60">
            <select
              className=" p-2 w-full h-10 border rounded-lg border-white bg-white text-gray-400 "
              style={{ direction: "rtl" }}
              onChange={(e) => setSignatureFilter(e.target.value)}
            >
              <option value="" className="text-right ">
                 وضعیت‌ امضا
              </option>
              <option value="در انتظار امضا" >در انتظار امضا</option>
              <option value="ثبت">ثبت</option>
              <option value="انصراف">انصراف</option>
            </select>
          </div>

          <div className="relative w-60 flex justify-end items-center ml-4">
          <CustomDatePicker value={value} setValue={setValue} handleDateChange={handleDateChange} />

          </div>
          <p>فیلترها</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className="bg-[#1C2434] text-white">
              <TableCell></TableCell>
              <TableCell className="text-left px-5">وضعیت امضا</TableCell>
              <TableCell className="text-center">مبلغ قسط (ریال)</TableCell>
              <TableCell className="text-center"> حقوق ماهیانه (ریال)</TableCell>
              <TableCell className="text-center"> نام و نام خانوادگی</TableCell>
              <TableCell className="text-center">تاریخ ثبت</TableCell>
              <TableCell className="text-center flex items-center justify-center ">
              کد رهگیری
              <input
                type="checkbox"
                aria-label="Select all requests"
                className="form-checkbox h-4 w-4 text-blue-600 ml-4"
                checked={selectAll}
                onChange={toggleSelectAll}
              />

               
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRequests.map((request) => {
              let signStatusClass = "";
              switch (request.signStatus.trim()) {
                case "در انتظار امضا":
                  signStatusClass = "bg-[#FFA70B] bg-opacity-10 text-[#FFA70B]";
                  break;
                case "ثبت":
                  signStatusClass = "bg-[#219653] bg-opacity-10 text-[#219653]";
                  break;
                case "انصراف":
                  signStatusClass = "bg-[#D34053] bg-opacity-10 text-[#D34053]";
                  break;
                default:
                  signStatusClass = "";
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

                  <TableCell
                      className={`flex justify-center items-center rounded-full w-28 h-8 mt-2 text-center  ${signStatusClass}`}
                    >
                      {request.signStatus}
                    </TableCell>

                  <TableCell className="text-center text-[#6681A9]">
                    {request.installmentAmount}
                  </TableCell>
                  <TableCell className="text-center text-[#6681A9]">
                    {request.loanAmount}
                  </TableCell>
                  <TableCell className="text-center text-[#6681A9]">
                    {request.fullname}
                  </TableCell>
                  <TableCell className="text-center text-[#6681A9]">
                    {request.date}
                  </TableCell>

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

    
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 mx-1 rounded-lg ${
            currentPage === 1 ? " cursor-not-allowed" : " text-white"
          }`}
        >
          <img src={mingcuteleft} alt="Previous" className="w-4 h-4" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-2 py-1 mx-1 rounded-lg ${
              index + 1 === currentPage
                ? "border border-[#4A6DFF] text-[#4A6DFF]"
                : " text-[#8A99AF]"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 mx-1 rounded-lg ${
            currentPage === totalPages ? "cursor-not-allowed" : " text-white"
          }`}
        >
          <img src={mingcuteright} alt="Next" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

