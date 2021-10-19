import React, { useContext, useEffect, useState } from "react"
import axios from "axiosbase"
import getLoggedUserToken from "components/utilities/getLoggedUserToken"
import { animated, Transition } from "react-spring/renderprops"
import ButtonTooltip from "components/button_tooltip/buttonTooltip"
import AnnotationSVG from "assets/svgComponents/annotationSVG"
import AlertContext from "components/utilities/alertContext"
import SearchSVG from "assets/svgComponents/searchSVG"
import DecisionMakingPreviewModal from "./previewModal"
import FirstEvaluationPreview from './preview'
import { useHistory, useParams } from "react-router"
import ChevronDownSVG from "assets/svgComponents/chevronDownSVG"
import FormRichText from "components/urgudul_components/formRichText"

const editors = ['edpadmin', 'member', 'ahlah_bhsh', 'bh_zovloh']
const rootCodes = ['a', 'b', 'c', 'z']
const emptyEditor = '<p><br></p>'

const FirstEvaluation = () => {
  const [rows, setRows] = useState(initialState)
  const [saved, setSaved] = useState(false)
  const [company, setCompany] = useState({})
  const [evalautor, setEvaluator] = useState({})

  const canEdit = editors.includes(evalautor.role)

  const AlertCtx = useContext(AlertContext)

  const handleInput = (key, value, rowcode) => {
    if (canEdit) {
      setRows(prev => {
        const next = [...prev]
        const index = rows.findIndex(row => row.rowcode === rowcode)
        next[index][key] = value
        return next
      })
    } else {
      AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Засвар оруулах эрх байхгүй байна.' })
    }
  }

  const projectId = useParams().id
  const loggedUserId = localStorage.getItem('userId')

  useEffect(() => {
    if (projectId) {
      axios.get(`projects/${projectId}/first-evalutions`, {
        headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
        if (res.data.data?.length === initialState.length) {
          setRows(res.data.data)
          setSaved(true)
        }
      })

      axios.get('pps-infos/registered-companies', {
        headers: { Authorization: getLoggedUserToken() },
        params: { projectId: projectId },
      }).then(res => {
        setCompany(res.data.data[0] ?? {})
      })

      axios.get(`users/${loggedUserId}`, {
        headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
        setEvaluator(res.data.data)
      })
    }
  }, [])

  const [commentsOpen, setCommentsOpen] = useState(initialCommentsOpen)

  const handleCommentOpen = (key, value) => {
    setCommentsOpen({ ...commentsOpen, [key]: value })
  }

  const handleSubmit = () => {
    axios.post(`projects/${projectId}/first-evalutions`, rows, {
      headers: { Authorization: getLoggedUserToken() },
    }).then(res => {
      AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Анхан шатны үнэлгээ хийгдлээ.' })
      setSaved(true)
    }).catch(err => {
      AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
    })
  }

  const [previewModalOpen, setPreviewModalOpen] = useState(false)

  const isCheckedZ = rows.filter(row => row.rowcode === 'z')[0]?.isChecked

  const history = useHistory()

  const handleSendNotice = () => {
    if (saved) {
      history.push({
        pathname: `/5a/${projectId}/send-notice`,
        search: `?qualified=${isCheckedZ}`
      })
    } else {
      AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Үнэлгээний хуудсыг хадгалсны дараа мэдэгдэл илгээх боломжтой.' })
    }
  }

  return (
    <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-text-gray-700">
      <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px" onClick={() => history.goBack()}>
        <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
        Буцах
      </button>

      <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100 tw-mt-6 tw-mb-16">
        <button className="tw-float-right tw-mt-2 tw-mr-2 tw-py-1 tw-pl-3 tw-pr-5 tw-bg-blue-800 active:tw-bg-blue-700 tw-rounded tw-text-white hover:tw-shadow-md focus:tw-outline-none tw-transition-colors tw-flex tw-items-center tw-font-light" onClick={() => setPreviewModalOpen(true)}>
          <SearchSVG className="tw-w-4 tw-h-4 tw-mr-1" />
          Харах
        </button>

        <DecisionMakingPreviewModal previewModalOpen={previewModalOpen} setPreviewModalOpen={setPreviewModalOpen} previewComponent={<FirstEvaluationPreview rows={rows} company={company} />} />

        <div className="tw-p-3 tw-pb-2 tw-flex tw-items-center">
          <span className="tw-pl-2 tw-font-medium tw-text-blue-500 tw-text-base">
            Анхан шатны үнэлгээний хуудас
          </span>
        </div>

        <div className="tw-border-b tw-border-dashed tw-text-13px tw-pl-5 tw-pr-3 tw-pb-2 tw-leading-snug">
          <div className="tw-relative">
            Дугаар:
            <span className="tw-absolute tw-left-32 tw-text-blue-500 tw-font-medium">{company.project?.project_number}</span>
          </div>
          <div className="tw-relative">
            Төрөл:
            <span className="tw-absolute tw-left-32 tw-text-blue-500 tw-font-medium">{company.project?.project_type_name}</span>
          </div>
          <div className="tw-relative">
            Байгууллагын нэр:
            <span className="tw-absolute tw-left-32 tw-text-blue-500 tw-font-medium">{company.companyname}</span>
          </div>
          <div className="tw-relative">
            Төслийн нэр:
            <span className="tw-absolute tw-left-32 tw-text-blue-500 tw-font-medium">{company.project?.project_name}</span>
          </div>
        </div>

        <div className="tw-rounded-sm tw-shadow-md tw-border-t tw-border-gray-100 tw-mx-2 tw-mt-3 tw-divide-y tw-divide-dashed">
          {rows.map(row =>
            <div key={row.rowcode}>
              <div className="tw-flex tw-items-center tw-text-sm">
                <span className={`tw-px-4 tw-py-2.5 tw-flex-grow ${rootCodes.includes(row.rowcode) ? "" : "tw-pl-8 tw-font-light"}`}>
                  {!rootCodes.includes(row.rowcode) &&
                    <span className="tw-mr-2 tw-font-normal">
                      {row.rowcode?.substring(1)}.
                    </span>
                  }
                  {row.description}
                </span>

                {{
                  'z': <button className="tw-relative tw-flex tw-items-center tw-leading-tight tw-bg-gray-300 focus:tw-outline-none tw-rounded-full tw-mr-4 tw-shadow-inner" style={{ fontSize: '13px', height: '22px' }} onClick={() => handleInput('isChecked', !row.isChecked, 'z')}>
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

                <ButtonTooltip tooltip="Тайлбар оруулах" beforeSVG={<AnnotationSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} classAppend={rootCodes.includes(row.rowcode) ? 'tw-mr-9' : 'tw-mr-4'} classButton={`${(row.comment && row.comment !== emptyEditor) ? 'tw-text-blue-600 active:tw-text-blue-500' : 'tw-text-gray-600 active:tw-text-gray-500'} tw-transition-colors tw-p-0.5`} onClick={() => handleCommentOpen(row.rowcode, !commentsOpen[row.rowcode])} />
              </div>

              <Transition
                items={commentsOpen[row.rowcode]}
                from={{ height: 0, opacity: 0 }}
                enter={{ height: 'auto', opacity: 1 }}
                leave={{ height: 0, opacity: 0 }}
                config={{ tension: 300, clamp: true }}>
                {item => item && (anims =>
                  <animated.div className={`tw-overflow-hidden ${rootCodes.includes(row.rowcode) ? 'tw-pl-5 tw-pr-8' : 'tw-pl-9 tw-pr-3'}`} style={anims}>
                    <FormRichText
                      modules="small"
                      value={row.comment}
                      name="comment"
                      index={row.rowcode}
                      setter={handleInput}
                      classQuill="tw-pb-10"
                      height={180}
                    />
                  </animated.div>
                )}
              </Transition>
            </div>
          )}
        </div>

        {projectId &&
          <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-h-20 tw-mt-2">
            {canEdit &&
              <button className="tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-px-6 tw-py-2 tw-rounded hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-700 tw-transition-colors" onClick={handleSubmit}>
                Хадгалах
              </button>
            }

            <button className={`tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-700 tw-transition-colors tw-absolute tw-right-2 ${!saved && 'tw-opacity-70'}`} onClick={handleSendNotice}>
              Мэдэгдэл илгээх
            </button>
          </div>
        }
      </div>
    </div>
  );
};

const rowDescriptions = {
  z: "Өргөдөл гаргагч нь дараагийн шатанд тэнцсэн эсэх?",

  a: "A ХЭСЭГ: Өргөдөл гаргагч нь шалгуур үзүүлэлт хангасан эсэх",
  a1: "Нэгдүгээр шатанд ирүүлэх бичиг баримтыг бүрэн ирүүлсэн эсэх",
  a2: "2 ба түүнээс дээш жилийн хугацаанд тогтвортой үйл ажиллагаа явуулсан эсэх",
  a3: "Сүүлийн 2 жилийн санхүүгийн тайлангаа илгээсэн эсэх",
  a4: "Сүүлийн 2 жилийн борлуулалтын орлогын дундаж 150 сая төгрөгөөс 150 тэрбум төгрөгийн хооронд эсэх",
  a5: "Экспортыг дэмжих төслийн санхүүгийн дэмжлэгтэйгээр хийхээр төлөвлөсөн ажлуудын санхүүжилтийг урьдчилан гаргах боломжтойг нотлох баримттай эсэх /сүүлийн 2 жилийн мөнгөн урсгалын тайлан, 1 жилийн мөнгөн урсгалын төлөвлөгөө, банкны хуулга, гм/",
  a6: "Өргөдөл гаргагч нь зөвшөөрөгдсөн үйлдвэрлэл, үйлчилгээний салбарынх мөн эсэх",
  a7: "Аж ахуйн нэгжийн аль нэгэн хувь нийлүүлэгч нь улс төрийн нөлөө бүхий этгээд мөн эсэх",
  a8: "Байгаль орчны үнэлгээний шалгуурыг хангасан эсэх",
  a9: "Өргөдөл гаргагч байгууллагын түлхүүр 3 албан тушаалтны ажлын туршлага, боловсрол, ур чадварыг илэрхийлэх намтар ирүүлсэн эсэх",

  b: "B ХЭСЭГ: Төслийн шалгуур",
  b1: "Төслийн үр дүнд экспортын шинэ зах зээл бий болох, экспортын хэмжээ өсөх, экспортлогч компани мэдэгдэхүйц хэмжээнд өсөх эсэх",
  b2: "Төслийг хэрэгжүүлэх үйл ажиллагаа нь 9 сарын дотор хэрэгжих боломжтой 5 хүртэлх үйл ажиллагааг төлөвлөсөн эсэх",
  b3: "Төслийг хэрэгжүүлэх үйл ажиллагааны зардал нь 10 сая төгрөгөөс 150 сая төгрөгийн хооронд эсэх",

  c: "C ХЭСЭГ: Бусад шалгуур",
  c1: "Төлөвлөсөн зардал нь хориотой үйл ажиллагааны ангилалд ороогүй эсэх"
};

const initialCommentsOpen = Object.keys(rowDescriptions).reduce((a, c) => ({ ...a, [c]: false }), {})

const initialState = Object.entries(rowDescriptions).map(([rowcode, description], i) => ({
  description: description,
  isChecked: false,
  comment: '',
  rowcode: rowcode,
  order: i + 1,
  category: rowcode[0].toUpperCase()
}))

export default FirstEvaluation
