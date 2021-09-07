import AnnotationSVG from 'assets/svgComponents/annotationSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import React, { useContext, useEffect, useState } from 'react'
import { animated, Transition } from 'react-spring/renderprops'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import SearchSVG from 'assets/svgComponents/searchSVG'
import DecisionMakingPreviewModal from 'pages/decision_making/5a/previewModal'
import CompilationChecklistPreview from './preview'
import { useParams } from 'react-router'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { useHistory } from 'react-router-dom'

const rowDescriptions = {
    z: 'Өргөдөл гаргагч нь шалгаруулалтад оролцох бүрэн бүрдүүлбэр, нотлох баримттай эсэх',

    a: 'A ХЭСЭГ: Өргөдөл гаргагч шалгуур үзүүлэлт хангасан эсэх',
    a1: 'Санхүүгийн тайлангаар орлогын шалгуурыг хангаж байгаа эсэх',
    a2: 'Төлөвлөсөн үйл ажиллагааг гүйцэтгэх боломжтой дор хаяж 3 байгууллагаас үнийн санал авч, харьцуулсан судалгаанд тулгуурлан үйл ажиллагааны төсвөө боловсруулсан эсэх',
    a3: 'Хуулийн этгээдийн эцсийн өмчлөгч иргэдийг тодорхойлсон баримтуудыг бүрэн гүйцэд илгээсэн эсэх /иргэний үнэмлэхийн мэдээлэл, эзэмшлийн хувь/',
    a4: 'Эцсийн өмчлөгчийн мэдээлэл нь шалгуур хангалтын зөрчилгүй эсэх',
    a5: 'Санхүүжилт бүрэн хийх боломжтойг нотолсон баримт бичиг',
    a6: 'Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо, сургалт, зөвлөх үйлчилгээний хувьд сонгон шалгаруулах ажлын даалгавар, ажил гүйцэтгүүлэх байгууллага зөвлөхийн ур чадварыг илэрхийлэх баримт бичиг',
    a7: 'Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, ур чадварыг илэрхийлэх намтар /3 албан тушаалтны CV/',
    a8: 'Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, байгаль орчны удирдлагын төлөвлөгөө',
    a9: 'Бусад шаардлагатай баримт бичиг /Эхний шалгаруулалтад тэнцэхэд нэмэлтээр шаардсан бичиг баримтууд/',

    b: 'B ХЭСЭГ: Чанарын шаардлага хангасан Экспорт хөгжлийн төлөвлөгөө боловсруулж, зорилтуудаа тодорхой болгосон эсэх',
    b1: 'Экспортын зорилтот зах зээлүүдээ (орнуудаа) тодорхойлж, үнэлэн, сонголт хийсэн эсэх',
    b2: 'Зорилтот орон тус бүрд зорилтот сегментээ тодорхойлж, зах зээлийн хэмжээг оновчтой таамагласан эсэх',
    b3: 'Зорилтот сегмент бүрийнхээ хэрэглэгчийн зан төлөв, хэрэгцээ шаардлагыг судалсан эсэх',
    b4: 'Зорилтот сегмент бүрд өрсөлдөж буй өрсөлдөгчдөө бүтээгдэхүүн үйлчилгээний хамт өөртэйгөө харьцуулан, давуу тал, баримтлах стратегиа тодорхойлсон эсэх',
    b5: 'Зорилтот сегментдээ хүрэх нийлүүлэлтийн арга хэрэгслээ төлөвлөсөн эсэх',
    b6: 'Экспортыг зохицуулах хууль, эрхзүйн орчноо судалж, шаардлагатай хийх ажил, зарцуулах хугацаа, зардлаа нарийвчилж төлөвлөсөн эсэх',
    b7: 'Борлуулалтын төлөвлөгөөгөө зорилтот зах зээл бүртээ боловсруулсан эсэх',
    b8: 'Бүтээгдэхүүн, үйлчилгээний чанарын стандартаа тодорхойлсон эсэх',
    b9: 'Зорилтот зах зээлд тохируулан бүтээгдэхүүнээ хөгжүүлэх төлөвлөгөөгөө тодорхойлсон эсэх',
    b10: 'Үйлдвэрлэлийн хүчин чадлаа нарийн төлөвлөсөн эсэх',
    b11: 'Бэлтгэн нийлүүлэлтийн сүлжээний удирдлагаа төлөвлөсөн эсэх',
    b12: 'Үнийн стратегиа тодорхойлсон эсэх',
    b13: 'Зах зээлд нэвтрэх стратегиа тодорхойлсон эсэх',
    b14: 'Идэвхжүүлэлтийн стратегиа тодорхойлсон эсэх',

    c: 'C ХЭСЭГ: Кластерын шалгуур хангасан эсэх',
    c1: 'Экспортын зорилгоор харилцан ашигтай хамтын ажиллагааны гэрээ байгуулсан эсэх',
    c2: 'Кластерын гишүүн байгууллагууд нь хоорондоо хамааралгүй байх',
    c3: 'Кластерын тэргүүлэгч ААН нь жилийн 300 сая төгрөгөөс дээш борлуулалтын орлоготой эсэх'
}

const initialCommentsOpen = Object.keys(rowDescriptions).reduce((a, c) => ({ ...a, [c]: false }), {})

const initialState = Object.entries(rowDescriptions).map(([rowcode, description], i) => ({
    description: description,
    isChecked: false,
    comment: '',
    rowcode: rowcode,
    order: i + 1,
    category: rowcode[0].toUpperCase()
}))

const editors = ['edpadmin', 'member', 'ahlah_bhsh']

export default function CompilationChecklist() {
    const [rows, setRows] = useState(initialState)
    const [company, setCompany] = useState({})
    const [evalautor, setEvaluator] = useState({})

    const canEdit = editors.includes(evalautor.role)

    const AlertCtx = useContext(AlertContext)

    const handleInput = (key, value, rowcode) => {
        if (canEdit) {
            const index = rows.findIndex(row => row.rowcode === rowcode)
            const newRows = [...rows]
            newRows[index][key] = value
            setRows(newRows)
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Засвар оруулах эрх байхгүй байна.' })
        }
    }

    const projectId = useParams().id
    const loggedUserId = localStorage.getItem('userId')

    useEffect(() => {
        if (projectId) {
            axios.get(`projects/${projectId}/bds-evaluation5b`, {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                if (res.data.data?.length === initialState.length) {
                    setRows(res.data.data)
                }
            })

            axios.get('pps-infos/registered-companies', {
                headers: { Authorization: getLoggedUserToken() },
                params: { projectId: projectId },
            }).then(res => {
                setCompany(res.data.data[0] ?? {})

                const projectType = res.data.data[0].project?.project_type
                if (projectType === 0) {
                    setRows(prev => prev.filter(row => row.category !== 'C'))
                }
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
        axios.post(`projects/${projectId}/bds-evaluation5b`, rows, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Бүрдүүлбэрүүдийг шалгах хуудсыг хадгаллаа.' })
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
        })
    }

    const [previewModalOpen, setPreviewModalOpen] = useState(false)

    const history = useHistory()

    return (
        <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-text-gray-700">
            <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px" onClick={() => history.goBack()}>
                <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
                Буцах
            </button>

            <div className="tw-bg-white tw-mt-6 tw-mb-16 tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
                <button className="tw-float-right tw-mt-2 tw-mr-2 tw-py-1 tw-pl-3 tw-pr-5 tw-bg-blue-800 active:tw-bg-blue-700 tw-rounded tw-text-white hover:tw-shadow-md focus:tw-outline-none tw-transition-colors tw-flex tw-items-center tw-font-light" onClick={() => setPreviewModalOpen(true)}>
                    <SearchSVG className="tw-w-4 tw-h-4 tw-mr-1" />
                    Харах
                </button>

                <DecisionMakingPreviewModal previewModalOpen={previewModalOpen} setPreviewModalOpen={setPreviewModalOpen} previewComponent={<CompilationChecklistPreview rows={rows} company={company} />} />

                <div className="tw-p-3 tw-pb-2 tw-flex tw-items-center">
                    <span className="tw-text-base tw-font-medium tw-text-blue-500 tw-pl-2">
                        Бүрдүүлбэрийн нотлох баримтыг шалгах хуудас
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
                                <span className={`tw-px-4 tw-py-2.5 tw-flex-grow ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === "z" ? "" : "tw-pl-8 tw-font-light"}`}>
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

                                <ButtonTooltip tooltip="Тайлбар оруулах" beforeSVG={<AnnotationSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} classAppend={`tw-mr-4 ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === 'z' ? 'tw-mr-7' : ''}`} classButton={`${row.comment ? 'tw-text-blue-600 active:tw-text-blue-500' : 'tw-text-gray-600 active:tw-text-gray-500'} tw-transition-colors tw-p-0.5`} onClick={() => handleCommentOpen(row.rowcode, !commentsOpen[row.rowcode])} />
                            </div>

                            <Transition
                                items={commentsOpen[row.rowcode]}
                                from={{ height: 0, opacity: 0 }}
                                enter={{ height: 'auto', opacity: 1 }}
                                leave={{ height: 0, opacity: 0 }}
                                config={{ tension: 300, clamp: true }}>
                                {item => item && (anims =>
                                    <animated.div className="tw-flex tw-justify-end tw-items-start tw-overflow-hidden" style={anims}>
                                        <textarea className="tw-w-full tw-max-w-md focus:tw-outline-none tw-border tw-border-gray-400 tw-rounded tw-px-1.5 tw-py-1 tw-mt-1 tw-mx-3 tw-mb-3 tw-resize-none tw-text-13px" value={row.comment} onChange={e => handleInput('comment', e.target.value, row.rowcode)} rows="3" placeholder="Тайлбар ..." />
                                    </animated.div>
                                )}
                            </Transition>
                        </div>
                    )}
                </div>

                {projectId && canEdit &&
                    <div className="tw-flex tw-items-center tw-justify-end tw-h-20 tw-mt-2 tw-mr-2">
                        <button className="tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-700 tw-transition-colors" onClick={handleSubmit}>
                            Хадгалах
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
