import AnnotationSVG from 'assets/svgComponents/annotationSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import React, { useContext, useEffect, useState } from 'react'
import { animated, config, Transition } from 'react-spring/renderprops'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import SearchSVG from 'assets/svgComponents/searchSVG'
import DecisionMakingPreviewModal from 'pages/decision_making/5a/previewModal'
import CompilationChecklistPreview from './preview'
import { useParams } from 'react-router'


const rowDescriptions = {
    z: 'Өргөдөл гаргагч нь шалгаруулалтанд оролцох бүрэн бүрдүүлбэр, нотлох баримттай эсэх?',
    a: 'A ХЭСЭГ: Өргөдөл гаргагчийн шалгуур хангалт',
    a1: 'Хуулийн этгээдийн улсын бүртгэлийн гэрчилгээгээ илгээсэн эсэх',
    a2: 'Сүүлийн 2 жилийн санхүүгийн тайлангаа илгээсэн эсэх',
    a3: 'Санхүүгийн тайлангаар орлогын шалгуурыг хангаж байгаа эсэх',
    a4: 'Татвар, нийгмийн даатгалаас 12 сараас дээш хугацааны өргүйг нотолсон тодорхойлолт авч, илгээсэн эсэх',
    a5: 'Нийгмийн даатгалын тайлангаар шалгуур хангасан ажилтны тоотой эсэх',
    a6: 'Монголбанкны зээлийн мэдээллийн сангаас муу ангиллын зээлгүйг нотолсон тодорхойлолт авч, илгээсэн эсэх',
    a7: 'Хуулийн этгээдийн эцсийн өмчлөгч иргэдийг тодорхойлсон баримтуудыг бүрэн гүйцэд илгээсэн эсэх /иргэний үнэмлэхний мэдээлэл, эзэмшлийн хувь/',
    a8: 'Эцсийн өмчлөгчийн мэдээлэл нь шалгуур хангалтын зөрчилгүй эсэх',
    a9: 'Санхүүжилт бүрэн хийх боломжтойг нотолсон баримт бичиг',
    a10: 'Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо, сургалт, зөвлөх үйлчилгээний хувьд сонгон шалгаруулах ажлын даалгавар, ажил гүйцэтгүүлэх байгууллага зөвлөхийн ур чадварыг илэрхийлэх баримт бичиг',
    a11: 'Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, ур чадварыг илэрхийлэх намтар /3 албан тушаалтны CV/',
    a12: 'Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, байгаль орчны удирдлагын төлөвлөгөө',
    a13: 'Бусад шаардлагатай баримт бичиг /Эхний шалгаруулалтанд тэнцэхэд нэмэлтээр шаардсан бичиг баримтууд/',
    b: 'B ХЭСЭГ: Чанарын шаардлага хангасан Экспорт хөгжлийн төлөвлөгөө боловсруулж, зорилтуудаа тодорхой болгосон эсэх',
    b1: 'Экспортын зорилтот зах зээлүүдээ (орнуудаа) тодорхойлж, үнэлэн, сонголт хийсэн эсэх',
    b2: 'Зорилтот орон тус бүрт зорилтот сегментээ тодорхойлж, зах зээлийн хэмжээг оновчтой таамагласан эсэх',
    b3: 'Зорилтот сегмент бүрийнхээ хэрэглэгчийн зан төлөв, хэрэгцээ шаардлагыг судалсан эсэх',
    b4: 'Зорилтот сегмент бүрт өрсөлдөж буй өрсөлдөгчдөө бүтээгдэхүүн үйлчилгээний хамт өөртэйгөө харьцуулан, давуу тал, баримтлах стратегиа тодорхойлсон эсэх',
    b5: 'Зорилтот сегментдээ хүрэх нийлүүлэлтийн арга хэрэгслээ төлөвлөсөн эсэ',
    b6: 'Экспортыг зохицуулах хууль, эрхзүйн орчноо судалж, шаардагдах хийх ажил, зарцуулах хугацаа, зардалаа нарийвчилж төлөвлөсөн эсэх',
    b7: 'Борлуулалтын төлөвлөгөөгөө зорилтот зах зээл бүртээ боловсруулсан эсэх',
    b8: 'Бүтээгдэхүүн, үйлчилгээний чанарын стандартаа тодорхойлсон эсэх',
    b9: 'Зорилтот зах зээлд тохируулан бүтээгдэхүүнээ хөгжүүлэх төлөвлөгөөгөө тодорхойлсон эсэх',
    b10: 'Үйлдвэрлэлийн хүчин чадлаа нарийн төлөвлөсөн эсэх',
    b11: 'Бэлтгэн нийлүүлэлтийн сүлжээний удирдлагаа төлөвлөсөн эсэх',
    b12: 'Үнийн стратегиа тодорхойлсон эсэх',
    b13: 'Зах зээлд нэвтрэх стратегиа тодорхойлсон эсэх',
    b14: 'Идэвхижүүлэлтийн стратегиа тодорхойлсон эсэх',
}

const initialCommentsOpen = Object.keys(rowDescriptions).reduce((a, c) => ({ ...a, [c]: false }), {})

const initialState = [
    {
        description: rowDescriptions.z,
        isChecked: false,
        comment: '',
        rowcode: 'z',
        order: 1,
        category: '@',
    },
    {
        description: rowDescriptions.a,
        isChecked: false,
        comment: '',
        rowcode: 'a',
        order: 5,
        category: 'A',
    },
    {
        description: rowDescriptions.a1,
        isChecked: false,
        comment: '',
        rowcode: 'a1',
        order: 10,
        category: 'A',
    },
    {
        description: rowDescriptions.a2,
        isChecked: false,
        comment: '',
        rowcode: 'a2',
        order: 15,
        category: 'A',
    },
    {
        description: rowDescriptions.a3,
        isChecked: false,
        comment: '',
        rowcode: 'a3',
        order: 20,
        category: 'A',
    },
    {
        description: rowDescriptions.a4,
        isChecked: false,
        comment: '',
        rowcode: 'a4',
        order: 25,
        category: 'A',
    },
    {
        description: rowDescriptions.a5,
        isChecked: false,
        comment: '',
        rowcode: 'a5',
        order: 30,
        category: 'A',
    },
    {
        description: rowDescriptions.a6,
        isChecked: false,
        comment: '',
        rowcode: 'a6',
        order: 35,
        category: 'A',
    },
    {
        description: rowDescriptions.a7,
        isChecked: false,
        comment: '',
        rowcode: 'a7',
        order: 40,
        category: 'A',
    },
    {
        description: rowDescriptions.a8,
        isChecked: false,
        comment: '',
        rowcode: 'a8',
        order: 45,
        category: 'A',
    },
    {
        description: rowDescriptions.a9,
        isChecked: false,
        comment: '',
        rowcode: 'a9',
        order: 50,
        category: 'A',
    },
    {
        description: rowDescriptions.a10,
        isChecked: false,
        comment: '',
        rowcode: 'a10',
        order: 55,
        category: 'A',
    },
    {
        description: rowDescriptions.a11,
        isChecked: false,
        comment: '',
        rowcode: 'a11',
        order: 60,
        category: 'A',
    },
    {
        description: rowDescriptions.a12,
        isChecked: false,
        comment: '',
        rowcode: 'a12',
        order: 65,
        category: 'A',
    },
    {
        description: rowDescriptions.a13,
        isChecked: false,
        comment: '',
        rowcode: 'a13',
        order: 70,
        category: 'A',
    },
    {
        description: rowDescriptions.b,
        isChecked: false,
        comment: '',
        rowcode: 'b',
        order: 75,
        category: 'B',
    },
    {
        description: rowDescriptions.b1,
        isChecked: false,
        comment: '',
        rowcode: 'b1',
        order: 80,
        category: 'B',
    },
    {
        description: rowDescriptions.b2,
        isChecked: false,
        comment: '',
        rowcode: 'b2',
        order: 85,
        category: 'B',
    },
    {
        description: rowDescriptions.b3,
        isChecked: false,
        comment: '',
        rowcode: 'b3',
        order: 90,
        category: 'B',
    },
    {
        description: rowDescriptions.b4,
        isChecked: false,
        comment: '',
        rowcode: 'b4',
        order: 95,
        category: 'B',
    },
    {
        description: rowDescriptions.b5,
        isChecked: false,
        comment: '',
        rowcode: 'b5',
        order: 100,
        category: 'B',
    },
    {
        description: rowDescriptions.b6,
        isChecked: false,
        comment: '',
        rowcode: 'b6',
        order: 105,
        category: 'B',
    },
    {
        description: rowDescriptions.b7,
        isChecked: false,
        comment: '',
        rowcode: 'b7',
        order: 110,
        category: 'B',
    },
    {
        description: rowDescriptions.b8,
        isChecked: false,
        comment: '',
        rowcode: 'b8',
        order: 115,
        category: 'B',
    },
    {
        description: rowDescriptions.b9,
        isChecked: false,
        comment: '',
        rowcode: 'b9',
        order: 120,
        category: 'B',
    },
    {
        description: rowDescriptions.b10,
        isChecked: false,
        comment: '',
        rowcode: 'b10',
        order: 125,
        category: 'B',
    },
    {
        description: rowDescriptions.b11,
        isChecked: false,
        comment: '',
        rowcode: 'b11',
        order: 130,
        category: 'B',
    },
    {
        description: rowDescriptions.b12,
        isChecked: false,
        comment: '',
        rowcode: 'b12',
        order: 135,
        category: 'B',
    },
    {
        description: rowDescriptions.b13,
        isChecked: false,
        comment: '',
        rowcode: 'b13',
        order: 140,
        category: 'B',
    },
    {
        description: rowDescriptions.b14,
        isChecked: false,
        comment: '',
        rowcode: 'b14',
        order: 145,
        category: 'B',
    },
]

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
            const newRows = rows
            newRows[index][key] = value
            setRows([...newRows])
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
                console.log(res.data)
                if (res.data.data?.length === initialState.length) {
                    setRows(res.data.data)
                }
            }).catch(err => {
                console.log(err.response?.data)
            })

            axios.get('pps-infos/registered-companies', {
                headers: { Authorization: getLoggedUserToken() },
                params: { projectId: projectId },
            }).then(res => {
                console.log(res.data)
                setCompany(res.data.data[0] ?? {})
            }).catch(err => {
                console.log(err.response?.data)
            })

            axios.get(`users/${loggedUserId}`, {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                console.log(res.data)
                setEvaluator(res.data.data)
            }).catch(err => {
                console.log(err.response?.data)
            })
        } else {
            axios.get('pps-infos/registered-companies', {
                headers: { Authorization: getLoggedUserToken() },
                params: { userId: loggedUserId },
            }).then(res => {
                console.log(res.data)
                setCompany(res.data.data[0] ?? {})

                res.data.data[0]?.project?.id &&
                    axios.get(`projects/${res.data.data[0].project.id}/bds-evaluation5b`, {
                        headers: { Authorization: getLoggedUserToken() },
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.data?.length === initialState.length) {
                            setRows(res.data.data)
                        }
                    })
            }).catch(err => {
                console.log(err.response?.data)
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
            console.log(res.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Бүрдүүлбэрүүдийг шалгах хуудсыг хадгалагдлаа.' })
        }).catch(err => {
            console.log(err.response?.data)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
        })
    }

    const [previewModalOpen, setPreviewModalOpen] = useState(false)

    return (
        <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-text-gray-700 tw-bg-white tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <button className="tw-float-right tw-mt-2 tw-mr-2 tw-py-1 tw-pl-3 tw-pr-5 tw-bg-blue-800 active:tw-bg-blue-700 tw-rounded tw-text-white hover:tw-shadow-md focus:tw-outline-none tw-transition-colors tw-flex tw-items-center" onClick={() => setPreviewModalOpen(true)}>
                <SearchSVG className="tw-w-4 tw-h-4 tw-mr-1" />
                Харах
            </button>

            <DecisionMakingPreviewModal previewModalOpen={previewModalOpen} setPreviewModalOpen={setPreviewModalOpen} previewComponent={<CompilationChecklistPreview rows={rows} company={company} />} />

            <div className="tw-font-medium tw-p-3 tw-pb-2 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2 tw-leading-tight">5b</span>
                <span className="tw-text-base">
                    - Бүрдүүлбэрийн нотлох баримтыг шалгах хуудас
                </span>
            </div>

            <div className="tw-border-b tw-border-dashed tw-text-13px tw-pl-5 tw-pr-3 tw-pb-2 tw-font-medium tw-leading-snug">
                <div className="tw-relative">
                    Дугаар:
                    <span className="tw-absolute tw-left-32 tw-text-blue-500">{company.project?.project_number}</span>
                </div>
                <div className="tw-relative">
                    Төрөл:
                    <span className="tw-absolute tw-left-32 tw-text-blue-500">{company.project?.project_type_name}</span>
                </div>
                <div className="tw-relative">
                    Байгууллагын нэр:
                    <span className="tw-absolute tw-left-32 tw-text-blue-500">{company.companyname}</span>
                </div>
                <div className="tw-relative">
                    Төслийн нэр:
                    <span className="tw-absolute tw-left-32 tw-text-blue-500">{company.project?.project_name}</span>
                </div>
            </div>

            <div className="tw-rounded-sm tw-shadow-md tw-border-t tw-border-gray-100 tw-mx-2 tw-mt-3 tw-divide-y tw-divide-dashed">
                {rows.map(row =>
                    <div key={row.rowcode}>
                        <div className="tw-flex tw-items-center tw-text-sm">
                            <span className={`tw-px-4 tw-py-2.5 tw-flex-grow tw-font-medium ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "z" ? "" : "tw-pl-8"}`} style={row.rowcode === 'z' ? { fontSize: '15px' } : {}}>
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

                            <ButtonTooltip tooltip="Тайлбар оруулах" beforeSVG={<AnnotationSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} classAppend={`tw-mr-4 ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === 'z' ? 'tw-mr-7' : ''}`} classButton={`${row.comment ? 'tw-text-blue-600 active:tw-text-blue-500' : 'tw-text-gray-600 active:tw-text-gray-500'} tw-transition-colors tw-p-0.5`} onClick={() => handleCommentOpen(row.rowcode, !commentsOpen[row.rowcode])} />
                        </div>

                        <Transition
                            items={commentsOpen[row.rowcode]}
                            from={{ height: 0, opacity: 0 }}
                            enter={{ height: 'auto', opacity: 1 }}
                            leave={{ height: 0, opacity: 0 }}
                            config={config.stiff}>
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
                <div className="tw-flex tw-items-center tw-justify-end tw-h-20 tw-mt-2">
                    <button className="tw-bg-blue-800 tw-text-white tw-font-medium tw-text-15px tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-700 tw-transition-colors" onClick={handleSubmit}>
                        Хадгалах
                    </button>
                </div>
            }
        </div>
    )
}