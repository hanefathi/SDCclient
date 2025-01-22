import React, { useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import succeccicon from "@assets/images/succeccicon.jpg";
import vuesax from "@assets/images/vuesax.svg";
import documentdownloadwhite from "@assets/images/documentdownloadwhite.svg";
import homeblue from "@assets/images/homeblue.svg";
import DownloadModal from "./components/DownloadModal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingCode: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, trackingCode }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  const handleDownload = async () => {
    // onClose(); 
    setIsDownloading(true); 
    
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsDownloading(false); 
    alert("دانلود کامل شد!");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-10 z-10" />
        <DialogContent className="bg-white rounded-lg w-1/3 h-auto px-6 py-4 shadow-lg">
          <div className="flex items-center justify-end">
            <h3 className="text-lg font-semibold text-[#009B1A] text-center mr-4">
              سند شما با موفقیت ثبت شد
            </h3>
            <img src={succeccicon} className="w-12 h-12 ml-2 mr-4" alt="Icon" />
          </div>
          <label className="text-right text-md text-[#3C50E0] mr-4">کدپیگیری</label>
          <div className="relative flex">
            <input
              type="text"
              name="trackingCode"
              value={trackingCode}
              className="ml-5 w-11/12 h-16 border rounded flex items-center justify-center text-right text-[#3C50E0] text-xl"
              readOnly
            />
            <img src={vuesax} className="absolute left-8 top-4 w-8 h-8" alt="Icon" />
          </div>

          <div className="flex justify-between gap-9">
            <Button
              className="bg-white text-[#3C50E0] w-2/4 h-10 ml-4 flex items-center justify-center border border-gray-200"
              onClick={() => navigate("/Home")}
            >
              خانه
              <img src={homeblue} className="ml-2" alt="Icon" />
            </Button>

            <Button
              className="bg-[#3C50E0] text-white hover:bg-blue-600 w-2/4 h-10 mr-4 flex items-center justify-center"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <span>در حال دانلود...</span>
              ) : (
                <>
                  دانلود
                  <img src={documentdownloadwhite} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Show DownloadModal if downloading is true */}
      {isDownloading && (
        <DownloadModal isOpen={isDownloading} onClose={() => setIsDownloading(false)} />
      )}
    </>
  );
};

export default SuccessModal;
