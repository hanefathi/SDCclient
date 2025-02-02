import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PDFPreview from "./components/PDFPreview/PDFPreview";
import FormInput from "./components/FormInput/FormInput";
import ParentComponent from "./components/Modal/Modal";
import chevronrightblue from "@assets/images/chevronrightblue.svg";



export default function FormPage() {
  const [name, setName] = useState<string>("");
  const [nationalcode, setNationalcode] = useState<string>("");
  const [companyname, setCompanyname] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [hoghogh, setHoghogh] = useState<string>("");
  const [ghest, setGhest] = useState<string>("");
  const [logo, setLogo] = useState<File | null | any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobStatus, setJobStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const navigate = useNavigate();
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const [formData, setFormData] = useState({
    name: "",
    nationalcode: "",
    companyname: "",
    organization: "",
    hoghogh: "",
    ghest: "",
    gender: "",
    jobStatus: "",
    logo: logo ? URL.createObjectURL(logo) : null,
    date:"",
  });

  return (
    <div className="relative bg-[#eef2ff] min-h-screen">
      <button 
        className="absolute top-12 right-16 text-1xl font-bold text-[#3C50E0] flex items-center"
        onClick={() => navigate("/Home")} 
      > 
        بازگشت 
        <img src={chevronrightblue} className="w-6 h-6 ml-2" alt="بازگشت" />
      </button>
      <div className="flex p-6 justify-between">
        <PDFPreview
          name={name}
          nationalcode={nationalcode}
          companyname={companyname}
          hoghogh={hoghogh}
          ghest={ghest}
          logo={logo}
          gender={gender}
          jobStatus={jobStatus}
          date={date}
          
        />
        <FormInput
          name={name}
          setName={setName}
          nationalcode={nationalcode}
          setNationalcode={setNationalcode}
          companyname={companyname}
          setCompanyname={setCompanyname}
          organization={organization}
          setOrganization={setOrganization}
          hoghogh={hoghogh}
          setHoghogh={setHoghogh}
          ghest={ghest}
          setGhest={setGhest}
          logo={logo}
          setLogo={setLogo}
          jobStatus={jobStatus}
          setJobStatus={setJobStatus}
          gender={gender}
          setGender={setGender}
          date={date}
          setDate={setDate}
          handleModalOpen={() => {
            setFormData({ name, nationalcode, companyname, organization, hoghogh, ghest, gender, jobStatus ,logo, date});
            handleModalOpen();
          }}
        />

      </div>
      {isModalOpen && (
        <ParentComponent
          isOpen={isModalOpen}
          onClose={handleModalClose}
          data={formData} 
        />
      )}

    </div>
  );
}

