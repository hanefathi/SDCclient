import React, { useState } from 'react';
import { Document, Page, Text, View, PDFDownloadLink, Font } from '@react-pdf/renderer';

// Register the font
Font.register({
  family: 'Vazirmatn',
  src: '/src/assets/font/Vazirmatn.ttf',
  fontStyle: 'normal',
  fontWeight: 'normal',
}) as void; // Cast to void to ignore the return value

// Define the props for PdfDocument
interface PdfDocumentProps {
  name: string;
  nationalcode: string;
}

// PdfDocument component
const PdfDocument: React.FC<PdfDocumentProps> = ({ name, nationalcode }) => (
  <Document>
    <Page size="A4" style={{ fontFamily: 'Vazirmatn', padding: '20px', textAlign: 'right' }}>
      <View style={{ margin: '10px', fontSize: '14px', lineHeight: 1.6, textAlign: 'right' }}>
        <Text style={{maxWidth: '100%' }}>
          با سلام، خواهشمند است اقدامات لازم جهت اتصال فیلترشکن سیستم اینجانب {name}
          با کد ملی {nationalcode} را پیگیری فرمایید. با تشکر و احترام
        </Text>
      </View>
    </Page>
  </Document>
);

// Form component
const PdfForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [nationalcode, setNationalcode] = useState<string>('');

  return (
    <div className="flex p-4 justify-between">
      <div className="w-1/2">
        <div className="border bg-white shadow-lg w-[595px] h-[842px] p-4">
          <PdfDocument name={name} nationalcode={nationalcode} />
        </div>
      </div>

      <div className="w-1/2 pl-10">
        <h2 className="text-right text-xl mb-4">فرم ارسال درخواست</h2>

        <form className="space-y-4">
          <div className="text-right">
            <label htmlFor="name" className="block">نام</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-60"
            />
          </div>

          <div className="text-right">
            <label htmlFor="nationalcode" className="block">کد ملی</label>
            <input
              type="text"
              id="nationalcode"
              value={nationalcode}
              onChange={(e) => setNationalcode(e.target.value)}
              className="border p-2 w-60"
            />
          </div>

          <div className="text-right mt-4">
            <PDFDownloadLink
              document={<PdfDocument name={name} nationalcode={nationalcode} />}
              fileName="form.pdf"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              دانلود PDF
            </PDFDownloadLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PdfForm;