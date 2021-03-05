import React, { Fragment, useEffect, useState } from "react";
import HelpPopup from "components/help_popup/helpPopup";
import axios from "axiosbase";
import getLoggedUserToken from "components/utilities/getLoggedUserToken";
import FormRichText from "components/urgudul_components/formRichText";
import { config, Transition } from "react-spring/renderprops";
import PenSVG from "assets/svgComponents/penSVG";


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

  return (
    <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-text-gray-700 tw-bg-white tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-p-2">
      <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
        <span className="tw-text-blue-500 tw-text-xl tw-mx-2">5a</span>
        <span className="tw-text-lg">
          - Анхан шатны үнэлгээний хуудас
        </span>
      </div>

      <div className="tw-rounded-sm tw-shadow-md tw-border-t tw-border-gray-50 tw-mx-2 tw-mt-2 tw-divide-y tw-divide-dashed">
        {rows.map(row =>
          <div key={row.code}>
            <div key={row.code} className={`tw-flex tw-items-center tw-justify-between tw-text-sm ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === "z" ? "" : ""}`}>
              <span className={`tw-px-4 tw-py-2.5 ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === "z" ? "tw-font-medium" : "tw-pl-8"}`} style={row.rowcode === 'z' ? { fontSize: '15px' } : {}}>
                {row.description}
              </span>

              {{
                'z': <button className="tw-relative tw-flex tw-items-center tw-leading-tight tw-bg-gray-300 focus:tw-outline-none tw-rounded-full tw-font-medium tw-mr-4 tw-shadow-inner" style={{ fontSize: '13px', height: '22px' }} onClick={() => handleInput('isChecked', !row.isChecked, 'z')}>
                  <span className="tw-w-20 tw-text-center tw-z-10 tw-text-white">
                    Тэнцсэн
                  </span>
                  <span className="tw-w-20 tw-text-center tw-z-10 tw-text-white">
                    Тэнцээгүй
                  </span>
                  <span className={`tw-w-1/2 tw-h-6 tw-rounded-full tw-absolute ${row.isChecked ? 'tw-bg-green-500' : 'tw-transform-gpu tw-translate-x-20 tw-bg-red-500'} tw-transition-transform tw-duration-300 tw-ease-in-out`} style={{ height: '26px' }} />
                </button>,
              }[row.rowcode]
                || <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} name={row.rowcode} onChange={e => handleInput('isChecked', e.target.checked, row.rowcode)} />
              }
            </div>

            <Transition
              items={!row.isChecked}
              from={{ height: 0, opacity: 0 }}
              enter={{ height: 'auto', opacity: 1 }}
              leave={{ height: 0, opacity: 0 }}
              config={config.stiff}
            >
              {item => item && (anims =>
                <div className="tw-flex tw-justify-end tw-items-start tw-overflow-hidden" style={anims}>
                  <textarea className="tw-w-full tw-max-w-md focus:tw-outline-none tw-border tw-border-gray-400 tw-rounded tw-p-2 tw-mt-1 tw-mr-3 tw-mb-3 tw-resize-none" value={row.comment} onChange={e => handleInput('comment', e.target.value, row.rowcode)} rows="3" placeholder="Тайлбар ..." />
                </div>
              )}
            </Transition>
          </div>
        )}
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