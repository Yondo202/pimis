import React, { useEffect, useState } from "react";
import HelpPopup from "components/help_popup/helpPopup";
import axios from "axiosbase";
import getLoggedUserToken from "components/utilities/getLoggedUserToken";
import FormRichText from "components/urgudul_components/formRichText";


const FirstEvaluation = () => {
  const [rows, setRows] = useState(initialState);

  const handleInput = (key, value, rowcode) => {
    const index = rows.findIndex(row => row.rowcode === rowcode)
    const newRows = rows
    newRows[index][key] = value
    setRows([...newRows])
  }

  const [evaluations, setEvaluations] = useState(initialState)

  useEffect(() => {
    axios.get(`projects/${1}/first-evalutions`, {
      headers: { Authorization: getLoggedUserToken() },
    }).then(res => {
      console.log(res.data)
      setEvaluations(res.data.data)
    }).catch(err => {
      console.log(err.response?.data)
    })
  }, [])

  const zIsChecked = rows.filter(obj => obj.rowcode === 'z')[0].isChecked

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
        {rows.map(row =>
          <div key={row.code} className={`tw-flex tw-items-center tw-justify-between tw-text-sm ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === "z" ? "" : ""}`}>
            <span className={`tw-px-4 tw-py-2.5 ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === "z" ? "tw-font-medium" : ""}`} style={row.rowcode === 'z' ? { fontSize: '15px' } : {}}>
              {row.description}
            </span>

            {{
              'z': <button className="tw-relative tw-flex tw-items-center tw-h-6 tw-leading-tight tw-bg-gray-100 focus:tw-outline-none tw-rounded-full tw-font-medium" style={{ fontSize: '13px' }} onClick={() => handleInput('isChecked', !zIsChecked, 'z')}>
                <span className="tw-w-20 tw-text-center tw-z-10">
                  Тэнцсэн
                </span>
                <span className="tw-w-20 tw-text-center tw-z-10">
                  Тэнцээгүй
                </span>
                <span className={`tw-w-1/2 tw-h-7 tw-rounded-full tw-absolute ${zIsChecked ? 'tw-bg-green-300' : 'tw-transform-gpu tw-translate-x-20 tw-bg-gray-200'} tw-transition-transform tw-duration-300 tw-ease-in-out`} />
              </button>,
            }[row.rowcode]
              || <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} name={row.rowcode} onChange={e => handleInput('isChecked', e.target.checked, row.rowcode)} />
            }
          </div>
        )}
      </div>

      <div className="">
        <div className="tw-ml-3 tw-p-1 tw-mt-4 tw-text-sm tw-font-medium">
          {zIsChecked ? 'Тэнцүүлсэн' : 'Тэнцүүлээгүй'} тайлбар
        </div>

        <div className="tw-py-1 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
          <FormRichText modules="small" />
        </div>
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
    comment: '',
    rowcode: "z",
    order: 1,
    category: "@",
  },
  {
    description: rowsDescriptions.a,
    isChecked: false,
    comment: '',
    rowcode: "a",
    order: 5,
    category: "A",
  },
  {
    description: rowsDescriptions.a1,
    isChecked: false,
    comment: '',
    rowcode: "a1",
    order: 10,
    category: "A",
  },
  {
    description: rowsDescriptions.a2,
    isChecked: false,
    comment: '',
    rowcode: "a2",
    order: 15,
    category: "A",
  },
  {
    description: rowsDescriptions.a3,
    isChecked: false,
    comment: '',
    rowcode: "a3",
    order: 20,
    category: "A",
  },
  {
    description: rowsDescriptions.a4,
    isChecked: false,
    comment: '',
    rowcode: "a4",
    order: 25,
    category: "A",
  },
  {
    description: rowsDescriptions.a5,
    isChecked: false,
    comment: '',
    rowcode: "a5",
    order: 30,
    category: "A",
  },
  {
    description: rowsDescriptions.a6,
    isChecked: false,
    comment: '',
    rowcode: "a6",
    order: 35,
    category: "A",
  },
  {
    description: rowsDescriptions.a7,
    isChecked: false,
    comment: '',
    rowcode: "a7",
    order: 40,
    category: "A",
  },
  {
    description: rowsDescriptions.a8,
    isChecked: false,
    comment: '',
    rowcode: "a8",
    order: 45,
    category: "A",
  },
  {
    description: rowsDescriptions.b,
    isChecked: false,
    comment: '',
    rowcode: "b",
    order: 50,
    category: "B",
  },
  {
    description: rowsDescriptions.b1,
    isChecked: false,
    comment: '',
    rowcode: "b1",
    order: 55,
    category: "B",
  },
  {
    description: rowsDescriptions.b2,
    isChecked: false,
    comment: '',
    rowcode: "b2",
    order: 60,
    category: "B",
  },
  {
    description: rowsDescriptions.b3,
    isChecked: false,
    comment: '',
    rowcode: "b3",
    order: 65,
    category: "B",
  },
  {
    description: rowsDescriptions.c,
    isChecked: false,
    comment: '',
    rowcode: "c",
    order: 70,
    category: "C",
  },
  {
    description: rowsDescriptions.c1,
    isChecked: false,
    comment: '',
    rowcode: "c1",
    order: 75,
    category: "C",
  },
  {
    description: rowsDescriptions.c2,
    isChecked: false,
    comment: '',
    rowcode: "c2",
    order: 80,
    category: "C",
  },
];

export default FirstEvaluation;