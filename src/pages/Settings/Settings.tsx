import React, { useState } from 'react';

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: "اطلاعات شخصی" },
    { id: 2, name: "اطلاعات تماس" },
    { id: 3, name: "بازبینی و تأیید" },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
  
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep === step.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-px bg-gray-300 mx-2"></div>
            )}
          </div>
        ))}
      </div>

   
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold">{steps[currentStep - 1].name}</h2>
        <p className="mt-2">محتوای مرحله {currentStep} نمایش داده می‌شود.</p>
      </div>

      
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          قبلی
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default Stepper;

