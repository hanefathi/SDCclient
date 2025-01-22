import React, { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalProps } from "./Modal";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./../SuccessModal/SuccessModal"; 

const InformationModal: React.FC<ModalProps> = ({ isOpen, onClose, data, onSignDocument }) => {
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
              onClick={handleSignDocument} 
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
