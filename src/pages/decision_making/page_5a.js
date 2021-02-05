import React, { useEffect, useState } from "react";

const FirstEvaluation = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(initialState);
  }, []);

  const onUpdateItem = (index, isChecked) => {
    setRows((prevstate) => {
      const list = prevstate.map((item, j) => {
        if (j === index) {
          item.isChecked = isChecked;
          return item;
        } else {
          return item;
        }
      });

      return list;
    });
  };

  return (
    <div className="tw-bg-gray-100 tw-flex tw-items-center tw-justify-center tw-text-sm ">
      <div className="tw-w-11/12 tw-max-w-5xl tw-bg-white tw-mt-4 tw-border tw-rounded-md tw-shadow-md tw-p-2">
        <div className="tw-text-2xl tw-text-center tw-mt-4">АНХАН ШАТНЫ ҮНЭЛГЭЭНИЙ ХУУДАС</div>
        <div className="tw-mt-5">
          <span>
            Үнэлгээний шалгуурууд нь хэсэг болон дэд бүрэлдэхүүн хэсгүүдэд хуваагдаж байгаа бөгөөд хэрэв аль нэг хэсэгт N (Үгүй) гэж сонгогдсон бол өргөдөл гаргагчийн материал нь дараагийн шатанд
            шалгарах боломжгүй болно.
          </span>
        </div>
        <div className="tw-border tw-rounded-sm tw-mt-2">
          {rows.map((row, index) => (
            <div
              key={row.order}
              className={`tw-flex tw-items-center tw-justify-between tw-text-sm ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" ? "tw-bg-gray-200" : "tw-bg-white"} `}
            >
              <span className="tw-px-4 tw-py-2">{row.description}</span>
              <input
                className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0"
                type="checkbox"
                checked={row.isChecked}
                name={row.rowcode}
                onChange={(e) => {
                  onUpdateItem(index, e.target.checked);
                }}
              />
            </div>
          ))}
        </div>
        <div className="tw-flex tw-items-center tw-justify-end tw-m-2">
          <button className="tw-border tw-bg-green-800 tw-p-2 tw-text-gray-100 tw-w-24 tw-rounded-md">Хадгалах</button>
        </div>
      </div>
    </div>
  );
};

const rowsDescriptions = {
  z: "Өргөдөл гаргагч нь дараагийн шатанд тэнцсэн эсэх?",
  a: "A ХЭСЭГ: Өргөдөл гаргагчийн шалгуур хангалт",
  a1: "Өргөдөл гаргагч нь зөвшөөрөгдсөн үйлдвэрлэл, үйлчилгээний салбарынх мөн эсэх",
  a2: "Сүүлийн 2 жилийн хугацаанд тогтвортой үйл ажиллагаа явуулсан эсэх",
  a3: "Жилийн борлуулалтын хэмжээ 50 мянгаас - 50 сая ам.долларын хооронд эсэх",
  a4: "Нийгмийн даатгалд бүртгэлтэй бүтэн цагийн ажилтны тоо 10-250 хооронд эсэх",
  a5: "12 сараас дээш хугацааны татвар болон нийгмийн даатгалын өргүй эсэх",
  a6: "Муу зээлийн түүхгүй эсэх",
  a7: "Аж ахуйн нэгжийн аль нэгэн хувь нийлүүлэгч нь улс төрийн нөлөө бүхий этгээд мөн эсэх",
  a8: "Байгаль орчны үнэлгээний шалгуурыг хангасан эсэх",
  b: "B ХЭСЭГ: Төслийн шалгуур",
  b1: "Төслийн үр дүнд экспортын шинэ зах зээл бий болох, экспортын хэмжээ өсөх, экспортлогч компани мэдэгдэхүйц хэмжээнд өсөх эсэх?",
  b2: "Төслийг хэрэгжүүлэх үйл ажиллагаа нь 9 сарын дотор хэрэгжих боломжтой эсэх? ",
  b3: "Төслийг хэрэгжүүлэх үйл ажиллагааны зардал нь 5 мянган ам.доллараас 50 мянган ам.долларын хооронд эсэх?",
  c: "C ХЭСЭГ: Зардлын шалгуур",
  c1: "Төлөвлөсөн зардал нь хориотой үйл ажиллагааны ангилалд ороогүй эсэх",
  c2: "Төлөвлөсөн зардал нь хориотой ангиллын зардалд ороогүй эсэх",
};

const initialState = [
  {
    description: rowsDescriptions.z,
    isChecked: false,
    rowcode: "z",
    order: 1,
    category: "@",
  },
  {
    description: rowsDescriptions.a,
    isChecked: false,
    rowcode: "a",
    order: 5,
    category: "A",
  },
  {
    description: rowsDescriptions.a1,
    isChecked: false,
    rowcode: "a1",
    order: 10,
    category: "A",
  },
  {
    description: rowsDescriptions.a2,
    isChecked: false,
    rowcode: "a2",
    order: 15,
    category: "A",
  },
  {
    description: rowsDescriptions.a3,
    isChecked: false,
    rowcode: "a3",
    order: 20,
    category: "A",
  },
  {
    description: rowsDescriptions.a4,
    isChecked: false,
    rowcode: "a4",
    order: 25,
    category: "A",
  },
  {
    description: rowsDescriptions.a5,
    isChecked: false,
    rowcode: "a5",
    order: 30,
    category: "A",
  },
  {
    description: rowsDescriptions.a6,
    isChecked: false,
    rowcode: "a6",
    order: 35,
    category: "A",
  },
  {
    description: rowsDescriptions.a7,
    isChecked: false,
    rowcode: "a7",
    order: 40,
    category: "A",
  },
  {
    description: rowsDescriptions.a8,
    isChecked: false,
    rowcode: "a8",
    order: 45,
    category: "A",
  },
  {
    description: rowsDescriptions.b,
    isChecked: false,
    rowcode: "b",
    order: 50,
    category: "B",
  },
  {
    description: rowsDescriptions.b1,
    isChecked: false,
    rowcode: "b1",
    order: 55,
    category: "B",
  },
  {
    description: rowsDescriptions.b2,
    isChecked: false,
    rowcode: "b2",
    order: 60,
    category: "B",
  },
  {
    description: rowsDescriptions.b3,
    isChecked: false,
    rowcode: "b3",
    order: 65,
    category: "B",
  },
  {
    description: rowsDescriptions.c,
    isChecked: false,
    rowcode: "c",
    order: 70,
    category: "C",
  },
  {
    description: rowsDescriptions.c1,
    isChecked: false,
    rowcode: "c1",
    order: 75,
    category: "C",
  },
  {
    description: rowsDescriptions.c2,
    isChecked: false,
    rowcode: "c2",
    order: 80,
    category: "C",
  },
];

export default FirstEvaluation;
