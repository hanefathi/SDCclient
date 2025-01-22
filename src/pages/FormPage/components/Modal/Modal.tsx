import React, { useState } from "react";
import InformationModal from "./InformationModal/InformationModal";
import SuccessModal from "./SuccessModal/SuccessModal";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(isOpen);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string>("1234567890");

  const handleSignDocument = () => {
    setIsInformationModalOpen(false); 
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false); 
    onClose(); 
  };

  return (
    <>
      <InformationModal
        isOpen={isInformationModalOpen}
        onClose={() => setIsInformationModalOpen(false)}
        data={data}
        onSignDocument={handleSignDocument} 
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        trackingCode={trackingCode}
      />
    </>
  );
};

export default Modal;
