import React, { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalProps } from "./Modal";
import SuccessModal from "./../SuccessModal/SuccessModal"; 
import axios from "axios";
import { getCookie } from "@/utills/Cookies/cookieUtils";
import { useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import yekan from "./Yekan"

var font = yekan;




const InformationModal: React.FC<ModalProps> = ({ isOpen, onClose, data, onSignDocument }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); 

  const handleSignDocument = () => {
    setIsLoading(true); 
    setTimeout(() => {
      setIsLoading(false);
      onSignDocument();
      setIsSuccessModalOpen(true);
    }, 3000);
  };



const createTransaction=async(pdf:string)=>{
  const token = getCookie("authToken"
  );
  if (!token) return; // Guard clause
  const body = 
    {
      "fullName":data.name,
      "companyName": data.companyname,
      "organizationName": data.organization,
      "isMale": data.gender=="" || data.gender==undefined?true:false,
      "deficitAmount":parseInt(data.ghest),
      "salaryAmount": parseInt(data.hoghogh),
      "nationalCode": data.nationalcode,
      "empStatus":data.jobStatus==""?1:0,
      "docUrl": pdf
}

  try {
    const response = await axios.post(`${import.meta.env.VITE_HOST}/api/v1/transaction`,body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    alert("عملیات با موفقیت ثبت شد")
    generatePDF((await response.data).trackId)
    navigate("/home")
  } catch (error) {
    console.error(error);
  }
  
  
}

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





  const handleSigning = async() =>{
  var pdf = generatePDF()
  createTransaction(pdf)
  return
  }

  

  const generatePDF = (name:any) => {
    const doc = new jsPDF();

   var image = URL.createObjectURL(data.logo)

  if(image!=null){
   doc.addImage(image,doc.internal.pageSize.width - 42,10,35,35)
  }


    // Add the font to the VFS (make sure 'font' is defined)
    doc.addFileToVFS('Vazir.ttf', font);
    doc.addFont('Vazir.ttf', 'Vazir', 'normal'); // Register the font

    // Set the font and size
    doc.setFont('Vazir');
    doc.setFontSize(10); // Set font size

    doc.text(`شرکت ${data.companyname?data.companyname:"......."}`, doc.internal.pageSize.width - 10, 85, { align: 'right' });
  doc.text("با سلام و احترام", doc.internal.pageSize.width - 10, 100, { align: 'right' });
    // Write Persian text
    const persianText = `
بدینوسیله بنا بر تقاضای جناب آقای / سرکار خانم ${data.name ? data.name : "......"} به شماره ملی ${data.nationalcode ? data.nationalcode : "........."} گواهی می‌شود نامبرده فوق در شرکت ${data.companyname ? data.companyname : ".........."} از تاریخ ................ می‌باشد و حقوق و مزایای ناخالص ایشان به صورت ماهیانه به مبلغ ${data.hoghogh ? data.hoghogh : "........"} ریال است. با توجه به مبلغ ماهیانه قسط به میزان ${data.ghest ? data.ghest : "......"} تومان به موجب ضمانت فوق، این شرکت تعهد می‌نماید چنانچه وام گیرنده به هر علت از پرداخت اقساط در سر رسید معین خودداری نماید با گزارش کتبی بانک تا زمان پایان قرارداد وی با این شرکت، مبلغ موردنظر را از حقوق وی طبق قانون کسر و به بانک پرداخت کند`;

    // Split text into lines automatically
    const splitText = doc.splitTextToSize(persianText, 230); // Adjust width as needed

    // Set starting y position
    const startY = 110; // Adjust this value as needed

    // Add a greeting text aligned to the right


    // Write the main text aligned to the right
    splitText.forEach((line:any, index:any) => {
        // Calculate the x position for right alignment
        const xPosition = doc.internal.pageSize.width - 10; // Adjust as needed
        doc.text(line, xPosition, startY + (index * 10), { align: 'right' }); // Right alignment
    });

    // Get the base64 string of the PDF
    const pdfBase64 = doc.output('datauristring');

    // Alert the base64 string
    const cleanedSuffixImage = pdfBase64.replace(/^data:application\/pdf;filename=generated\.pdf;base64,/, '');
    const pdf = "data:application/pdf;base64," + cleanedSuffixImage;
if(name!=null){
  doc.save(`Emzagar-${name}.pdf`);
}

   return pdf

    // Save the PDF
    // doc.save("document.pdf");
};




  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay className="fixed inset-0 bg-white bg-opacity-10 z-50" />
        <DialogContent className="bg-white rounded-lg w-1/3 h-full px-6 shadow-lg">
          <h3 className="text-md font-semibold text-[#3C50E0] flex flex-row-reverse mt-3">
            مرور اطلاعات
          </h3>
          <div className="space-y-3 text-right">
            <h1 className="text-md font-semibold text-[#6681A9] mb-4">اطلاعات شخصی</h1>
            <p><strong className="ml-44 text-[#6681A9] text-sm">نام و نام خانوادگی:</strong> {data.name}</p>
            <p><strong className="ml-60 text-[#6681A9] text-sm">کد ملی:</strong> {data.nationalcode}</p>
            <p><strong className="ml-60 text-[#6681A9] text-sm">جنسیت:</strong> {data.gender}</p>
            <p><strong className="ml-60 text-[#6681A9] text-sm">سازمان:</strong> {data.organization}</p>
            <p><strong className="ml-48 text-[#6681A9] text-sm">وضعیت شغلی:</strong> {data.jobStatus}</p>
          </div>
          <p className="text-[#CBCBCB] text-sm font-bold -mt-3">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
          <div className="space-y-3 text-right">
            <p className="text-md font-semibold text-[#6681A9] text-right -mt-2 mb-4">اطلاعات حقوقی</p>
            <p><strong className="ml-60 text-[#6681A9] text-right text-sm">حقوق:</strong> {data.hoghogh} ریال</p>
            <p><strong className="ml-60 text-[#6681A9] text-right text-sm">قسط:</strong> {data.ghest} ریال</p>
            <p><strong className="ml-60 text-[#6681A9] text-sm">نام شرکت:</strong> {data.companyname}</p>
            <p className="flex items-center text-sm">
              
              {data.logo ? (
                <img
                src={data.logo ? URL.createObjectURL(data.logo) : null}
                className="w-20 h-14 ml-24"
                alt="Logo"
              />
              ) : (
                <span>لوگو موجود نیست</span>
              )}
              <strong className=" text-[#6681A9] ml-52">:لوگو شرکت</strong>
            </p>
          </div>

          <div className="flex justify-center ">
            <Button
              className="bg-[#3C50E0] text-white hover:bg-blue-600 w-5/6 h-10 mt-10"
              onClick={handleSigning} 
            >
              {isLoading ? "لطفاً صبر کنید..." : "امضا سند"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          trackingCode="123456789"  
      />
    )}
    </>
  );
};

export default InformationModal;
