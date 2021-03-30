import React, { useContext, useEffect, useState } from "react";
import axios from "axiosbase";
import getLoggedUserToken from "components/utilities/getLoggedUserToken";
import { config, Transition } from "react-spring/renderprops";
import ButtonTooltip from "components/button_tooltip/buttonTooltip";
import AnnotationSVG from "assets/svgComponents/annotationSVG";
import AlertContext from "components/utilities/alertContext";
import SearchSVG from "assets/svgComponents/searchSVG";
import DecisionMakingPreviewModal from "./previewModal";
import FirstEvaluationPreview from './preview'
import { useParams } from "react-router";
import Approve from 'components/admin/contents/notifyPage/Approve/Approved'
import NotApprove from 'components/admin/contents/notifyPage/notApprove/NotApproved'

const FirstEvaluation = () => {
  const [ cond, setCond ] = useState(false);
  const [rows, setRows] = useState(initialState);
  const [rowZ, setRowZ] = useState(null);
  const [ showNotify, setShowNotify ] = useState(false);

  const handleInput = (key, value, rowcode) => {
    const index = rows.findIndex(row => row.rowcode === rowcode)
    const newRows = rows
    newRows[index][key] = value
    setRows([...newRows])

    let dd = newRows.filter(el=> el.rowcode === "z");setRowZ(dd[0]?.isChecked);
  }
  
  const projectId = useParams().id

  useEffect(() => {
    projectId &&
      axios.get(`projects/${projectId}/first-evalutions`, {
        headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
        console.log(res.data, " ^^^^^^^")
        if (res.data.data?.length === initialState.length) {
          setRows(res.data.data); setCond(true);
          let dd = res.data.data.filter(el=> el.rowcode === "z");setRowZ(dd[0]?.isChecked);
        }
      }).catch(err => {
        console.log(err.response?.data)
      })
  }, [])

  const [commentsOpen, setCommentsOpen] = useState(initialCommentsOpen)

  const handleCommentOpen = (key, value) => {
    setCommentsOpen({ ...commentsOpen, [key]: value })
  }

  const AlertCtx = useContext(AlertContext)

  const handleSubmit = () => {
    axios.post(`projects/${projectId}/first-evalutions`, rows, {
      headers: { Authorization: getLoggedUserToken() },
    }).then(res => {
      console.log(res.data);
      AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Анхан шатны үнэлгээ хадгалагдлаа.' });
    }).catch(err => {
      console.log(err.response?.data)
      AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
    })
  }
  const handleSubmitSendMail = () =>{
    if(cond){ setShowNotify(true);  return }
    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Үнэлгээний хуудасыг хадагласны дараа илгээх боломжтой.' });
  }

  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  return (
    <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-text-gray-700 tw-bg-white tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">

      {showNotify?rowZ?<Approve projectId={projectId} setShowNotify={setShowNotify} />:rowZ===false?<NotApprove setShowNotify={setShowNotify} projectId={projectId} />:null
      :(<><button className="tw-float-right tw-m-2 tw-py-1 tw-pl-3 tw-pr-5 tw-bg-blue-800 active:tw-bg-blue-700 tw-rounded tw-text-white hover:tw-shadow-md focus:tw-outline-none tw-transition-colors tw-flex tw-items-center" onClick={() => setPreviewModalOpen(true)}>
                <SearchSVG className="tw-w-4 tw-h-4 tw-mr-1" />
                Харах
              </button>
              <DecisionMakingPreviewModal previewModalOpen={previewModalOpen} setPreviewModalOpen={setPreviewModalOpen} previewComponent={<FirstEvaluationPreview rows={rows} />} />
              <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">5a</span>
                <span className="tw-text-base tw-leading-tight">
                  - Анхан шатны үнэлгээний хуудас
                </span>
              </div>

              <div className="tw-rounded-sm tw-shadow-md tw-border-t tw-border-gray-100 tw-mx-2 tw-mt-2 tw-divide-y tw-divide-dashed">
                {rows.map(row =>
                  <div key={row.rowcode}>
                    <div className="tw-flex tw-items-center tw-text-sm">
                      <span className={`tw-px-4 tw-py-2.5 tw-flex-grow tw-font-medium ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === "z" ? "" : "tw-pl-8"}`} style={row.rowcode === 'z' ? { fontSize: '15px' } : {}}>
                        {row.description}
                      </span>

                      {{
                        'z': <button className="tw-relative tw-flex tw-items-center tw-leading-tight tw-bg-gray-300 focus:tw-outline-none tw-rounded-full tw-font-medium tw-mr-4 tw-shadow-inner" style={{ fontSize: '13px', height: '22px' }} onClick={() => handleInput('isChecked', !row.isChecked, 'z')}>
                          <span className="tw-w-20 tw-text-center tw-z-10 tw-text-white tw-antialiased">
                            Тийм
                          </span>
                          <span className="tw-w-20 tw-text-center tw-z-10 tw-text-white tw-antialiased">
                            Үгүй
                          </span>
                          <span className={`tw-w-1/2 tw-h-6 tw-rounded-full tw-absolute ${row.isChecked ? 'tw-bg-green-500' : 'tw-transform-gpu tw-translate-x-20 tw-bg-red-500'} tw-transition-transform tw-duration-300 tw-ease-out`} style={{ height: '26px' }} />
                        </button>,
                      }[row.rowcode]
                        || <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} name={row.rowcode} onChange={e => handleInput('isChecked', e.target.checked, row.rowcode)} />
                      }

                      <ButtonTooltip tooltip="Тайлбар оруулах" beforeSVG={<AnnotationSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} classAppend={`tw-mr-4 ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === 'z' ? 'tw-mr-7' : ''}`} classButton={`${row.comment ? 'tw-text-blue-600 active:tw-text-blue-500' : 'tw-text-gray-600 active:tw-text-gray-500'} tw-transition-colors tw-p-0.5`} onClick={() => handleCommentOpen(row.rowcode, !commentsOpen[row.rowcode])} />
                    </div>

                    <Transition
                      items={commentsOpen[row.rowcode]}
                      from={{ height: 0, opacity: 0 }}
                      enter={{ height: 'auto', opacity: 1 }}
                      leave={{ height: 0, opacity: 0 }}
                      config={config.stiff}>
                      {item => item && (anims =>
                        <div className="tw-flex tw-justify-end tw-items-start tw-overflow-hidden" style={anims}>
                          <textarea className="tw-w-full tw-max-w-md focus:tw-outline-none tw-border tw-border-gray-400 tw-rounded tw-px-1.5 tw-py-1 tw-mt-1 tw-mx-3 tw-mb-3 tw-resize-none tw-text-13px" value={row.comment} onChange={e => handleInput('comment', e.target.value, row.rowcode)} rows="3" placeholder="Тайлбар ..." />
                        </div>
                      )}
                    </Transition>
                  </div>
                )}
              </div>

              {projectId &&
                <div style={{display:`flex`, justifyContent:"space-between"}} className="tw-flex tw-items-center tw-justify-end tw-pt-6 tw-pb-4 tw-px-2">
                  <button className="tw-bg-blue-800 tw-text-white tw-font-medium tw-text-15px tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-700 tw-transition-colors" onClick={handleSubmitSendMail}>
                      Мэдэгдэл илгээх
                  </button>

                  <button className="tw-bg-blue-800 tw-text-white tw-font-medium tw-text-15px tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-700 tw-transition-colors" onClick={handleSubmit}>
                      Хадгалах
                  </button>
                </div>
              }
      </>)}


      
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

const initialCommentsOpen = Object.keys(rowsDescriptions).reduce((a, c) => ({ ...a, [c]: false }), {})

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