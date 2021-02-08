import React, { useEffect, useState } from "react";
import HelpPopup from "components/help_popup/helpPopup";


const FirstEvaluation = () => {
  const [rows, setRows] = useState(initialState);

  const handleInput = (key, value, rowcode) => {
    const index = rows.findIndex(row => row.rowcode === rowcode)
    const newRows = rows
    newRows[index][key] = value
    setRows([...newRows])
  }

  const isCheckedA = rows.filter(row => row.category === 'A' && row.rowcode !== 'a').every(row => row.isChecked)
  const isCheckedB = rows.filter(row => row.category === 'B' && row.rowcode !== 'b').every(row => row.isChecked)
  const isCheckedC = rows.filter(row => row.category === 'C' && row.rowcode !== 'c').every(row => row.isChecked)

  useEffect(() => {
    if (isCheckedA) {
      handleInput('isChecked', true, 'a')
    } else {
      handleInput('isChecked', false, 'a')
    }

    if (isCheckedB) {
      handleInput('isChecked', true, 'b')
    } else {
      handleInput('isChecked', false, 'b')
    }

    if (isCheckedC) {
      handleInput('isChecked', true, 'c')
    } else {
      handleInput('isChecked', false, 'c')
    }

    if (isCheckedA && isCheckedB && isCheckedC) {
      handleInput('isChecked', true, 'z')
    } else {
      handleInput('isChecked', false, 'z')
    }
  }, [isCheckedA, isCheckedB, isCheckedC])

  return (
    <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-text-gray-700 tw-bg-white tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-p-2">
      <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
        <span className="tw-text-blue-500 tw-text-xl tw-mx-2">5a</span>
        <span className="tw-text-lg">
          - Анхан шатны үнэлгээний хуудас
        </span>
        <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Үнэлгээний шалгуурууд нь хэсэг болон дэд бүрэлдэхүүн хэсгүүдэд хуваагдаж байгаа бөгөөд хэрэв аль нэг хэсэгт нь зөвлөгдөөгүй байх юм бол өргөдөл гаргагчийн материал нь дараагийн шатанд шалгарах боломжгүй болно." position="bottom" />
      </div>

      <div className="tw-rounded-sm tw-shadow-md tw-border-t tw-border-gray-50 tw-mx-2 tw-mt-2 tw-divide-y tw-divide-dashed">
        {rows.map((row, index) => (
          <div
            key={row.order}
            className={`tw-flex tw-items-center tw-justify-between tw-text-sm ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === 'z' ? "tw-bg-gray-50" : ""}`}
          >
            <span className={`tw-px-4 tw-py-2.5 ${row.rowcode === 'z' && 'tw-pl-6 tw-font-medium'} ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" ? "tw-font-medium" : ""}`}>
              {row.description}
            </span>

<<<<<<< HEAD
            <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} name={row.rowcode} onChange={(e) => { onUpdateItem(index, e.target.checked) }} />
=======
            {
              {
                'z': <input className="tw-w-4 tw-h-4 tw-mr-8 tw-ml-2 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} disabled />,
                'a': <input className="tw-w-4 tw-h-4 tw-mr-6 tw-ml-2 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} disabled />,
                'b': <input className="tw-w-4 tw-h-4 tw-mr-6 tw-ml-2 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} disabled />,
                'c': <input className="tw-w-4 tw-h-4 tw-mr-6 tw-ml-2 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} disabled />,
              }[row.rowcode]
              || <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} name={row.rowcode} onChange={e => handleInput('isChecked', e.target.checked, row.rowcode)} />
            }

>>>>>>> e09b26a5c82811b73ccd48339ecca6ad414ee896
          </div>
        ))}
      </div>

      <div className="tw-flex tw-items-center tw-justify-end tw-pt-6 tw-pb-4 tw-px-2">
        <button className="tw-bg-blue-500 tw-text-white tw-font-medium tw-text-base tw-px-3 tw-py-1 tw-rounded-lg hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-600">Хадгалах</button>
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