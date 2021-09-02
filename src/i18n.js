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

        Advantages: "Advantages",
        "Flexibility to use other packages": "Flexibility to use other packages",

        "Export Data":"Export Data",
      }
    },
    mn: {
        translations: {
          title: "Байгууллагын жагсаалт",
          "Register number":'Регистрийн дугаар',
          "Issued":'Эхлэх хугацаа',
          "Expiration":"Дуусах хугацаа",
          "Insurance type":'Даатгалын төрөл',
          "Total":'Нийт',
          Advantages: "Les avantages",
            "Flexibility to use other packages":
            "Flexibilité d'utiliser d'autres packages"
          },

        "Export Data":"Экспортын мэдээлэл"
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