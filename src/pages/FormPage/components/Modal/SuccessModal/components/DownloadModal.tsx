import React from "react";
import download from "@assets/images/download.svg";
import Recfront from "@assets/images/Recfront.svg";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-60 flex items-center justify-center border border-red-500">

      <div className="relative bg-white w-70 h-70 rounded-lg p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="flex flex-col items-center justify-center h-full">
          <img src={download} className="w-16 h-16 mb-4" alt="Downloading" />
          <span className="text-black text-lg mb-4">...در حال دانلود</span>
          <div className="flex space-x-2 space-x-reverse">
            <img src={Recfront} className="w-8 h-8" alt="Progress" />
            <img src={Recfront} className="w-8 h-8" alt="Progress" />
            <img src={Recfront} className="w-8 h-8" alt="Progress" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;