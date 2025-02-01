import React from "react";
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import Profile from "@assets/images/Profile.png";

Font.register({
  family: "Vazirmatn",
  src: "/src/assets/font/Vazirmatn.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});

const PdfDocument = ({
  name,
  nationalcode,
  companyname,
  hoghogh,
  ghest,
  logo,
  date,
}: {
  name: string;
  nationalcode: string;
  companyname: string;
  hoghogh: string;
  ghest: string;
  logo: File | null;
  date: string;
}) => (
  <Document>
    <Page style={{ fontFamily: "Vazirmatn", padding: "20px", textAlign: "right" }}>
      <View style={{ margin: "10px", fontSize: "14px", lineHeight: 1.6, textAlign: "right" }}>
        <View style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
          <Text style={{ maxWidth: "80%" }}>
            <div className="flex items-center justify-end mr-2">
              <p className="text-right mr-4"> شرکت {companyname}</p>
              <img
                src={logo ? URL.createObjectURL(logo) : Profile}
                className="w-12 h-12"
                alt="Logo"
              />
            </div>
            <p className="m-5">با سلام و احترام </p>
          </Text>
        </View>
        <Text style={{ maxWidth: "80%", textAlign: "right" }}>
          <p className="m-5 flex justify-center">
            {`
          بدینوسیله بنا بر تقاضای جناب آقای / سرکار خانم
            ${name ? name : <> ................. </>} به شماره ملی
            ${nationalcode ? nationalcode : <> ................. </>} گواهی می‌شود نامبرده فوق در شرکت
            ${companyname ? companyname : <> ................ </>} از تاریخ
            ${date ? date : <> ................ </>} می‌باشد و حقوق و مزایای ناخالص ایشان به صورت ماهیانه به مبلغ
            ${hoghogh ? hoghogh : <> .............. </>} ریال است. با توجه به مبلغ ماهیانه قسط به میزان
            ${ghest ? ghest : <> .............. </>} تومان به موجب ضمانت فوق، این شرکت تعهد
            می‌نماید چنانچه وام گیرنده به هر علت از پرداخت اقساط در سر رسید معین
            خودداری نماید با گزارش کتبی بانک تا زمان پایان قرارداد وی با این شرکت،
            مبلغ موردنظر را از حقوق وی طبق قانون کسر و به بانک پرداخت کند.
           `}
            </p>
         
        </Text>
      </View>
    </Page>
  </Document>
);

const PDFPreview = ({
  name,
  gender,
  jobStatus,
  nationalcode,
  companyname,
  hoghogh,
  ghest,
  logo,
  date,
}: {
  name: string;
  gender:string | any;
  jobStatus:string | any;
  nationalcode: string;
  companyname: string;
  hoghogh: string;
  ghest: string;
  logo: File | null;
  date: string;
}) => (
  <div className="border bg-white shadow-lg ml-28 mt-20 w-[495px] h-[542px] p-4">
    <PdfDocument
      name={name}
      nationalcode={nationalcode}
      companyname={companyname}
      hoghogh={hoghogh}
      ghest={ghest}
      logo={logo}
      date={date}
    />
  </div>
);

export default PDFPreview;
