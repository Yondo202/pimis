import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        title: "Company list",
        "Register number":"Register number",
        "Company name":"Company name",
        "Issued":"Issued",
        "Expiration":"Expiration",
        "Insurance type":"Insurance type",
        "Total":"Total",
        "Indemnity":"Indemnity",
        "Sum insured":"Sum insured",

        "Export Data":"Export Data",
        "Product name":"Product name",

        // Төслийн үр дүнг хэмжих
        "Project Results Indicators":"Project Results Indicators",
        "Indicator Name":"Indicator Name",
        "Measurement":"Measurement",
        "Cumalative":"Cumalative",
        "Current":"Current",

        "percent":"percent",
        "number":"number",
        "amount":"amount",

        "Print":"Print",
        "Download":"Download",
        "Calculate":"Calculate",

        "PDO Level I Results Indicators":"PDO Level I Results Indicators",
        "Intermediate Results Indicators":"Intermediate Results Indicators",

      }
    },
    mn: {
        translations: {
          title: "Байгууллагын жагсаалт",
          "Register number":'Регистрийн дугаар',
          "Company name":"Байгууллагын нэр",
          "Issued":'Эхлэх хугацаа',
          "Expiration":"Дуусах хугацаа",
          "Insurance type":'Даатгалын төрөл',
          "Total":'Нийт',
          "Indemnity":"Нөхөн төлбөр",
          "Sum insured":"Нийт даатгуулсан",

          "Export Data":"Экспортын мэдээлэл",
          "Product name":"Бүтээгдэхүүн",


          // Төслийн үр дүнг хэмжих
          "Project Results Indicators":"Төслийн үр дүнг хэмжих шалгуур үзүүлэлтүүд",
          "Indicator Name":"Шалгуур үзүүлэлт",
          "Measurement":"Хэмжүүр",
          "Cumalative":"Зорилтот",
          "Current":"Одоогийн",

          "percent":"Хувь",
          "number":"Тоо",
          "amount":"Дүн",

          "Print":"Хэвлэх",
          "Download":"Татах",
          "Calculate":"Бодох",

          "PDO Level I Results Indicators":"Эхний шатны шалгуур үзүүлэлт",
          "Intermediate Results Indicators":"Дунд шатны шалгуур үзүүлэлт",
        },

    },
    
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

//   interpolation: {
//     escapeValue: false, // not needed for react!!
//     formatSeparator: ","
//   },

  react: {
    wait: true
  }
});

export default i18n;