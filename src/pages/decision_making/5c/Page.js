import React, { useContext, useEffect, useState } from 'react'
import FormRichText from 'components/urgudul_components/formRichText'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import AnnotationSVG from 'assets/svgComponents/annotationSVG'
import { animated, Transition } from 'react-spring/renderprops'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import SearchSVG from 'assets/svgComponents/searchSVG'
import DecisionMakingPreviewModal from 'pages/decision_making/5a/previewModal'
import AnalystReportPreview from './preview'
import { useParams } from 'react-router'
import { todayStr } from 'pages/urgudul/urgudul_a/form_a_1'


const rowDescriptions = {
    z: 'Өргөдөл гаргагчийн төслийг дэмжих саналтай эсэх?',
    a: 'A ХЭСЭГ: Өргөдөл гаргагч экспорт хийх чадавхитай эсэх?',
    a1: 'Шалгуур үзүүлэлтийг бүрэн хангасан эсэх (Шалгууруудыг хэрхэн хангасан талаарх мэдээлэл)',
    a2: 'Дотоодын зах зээл дээр байр сууриа олсон эсэх (Дотоодын зах зээл дээрх байр суурь, зорилтот зах зээлийн мэдээлэл)',
    a3: 'Одоогийн компанийн борлуулалт, ашигт гол нөлөө бүхий бүтээгдэхүүн, үйлчилгээ нь урт хугацааны өрсөлдөх чадвар бүхий бүтээгдэхүүн эсэх',
    a4: 'Санхүүгийн чадавхитай эсэх (Санхүүгийн үзүүлэлтүүд, ашигт ажиллагаа, санхүүгийн хүчин чадал)',
    a5: 'Чадавхи бүхий хүний нөөц, баг бүрдүүлж чадсан эсэх',
    a6: 'Экспорт хийсэн туршлагатай эсэх (Экспортын мэдээлэлд өгсөн дүн шинжилгээ)',
    a7: 'Төслийн санхүүжилт дууссаны дараа, экспортын зах зээлдээ үргэлжлүүлэн байр сууриа бататгах санхүүгийн чадавхи, хүсэлтэй эсэх',
    b: 'B ХЭСЭГ: Экспорт хөгжлийн төлөвлөгөө нь хэрэгжих боломжтой бөгөөд Монгол улсын экспортонд нөлөө үзүүлэх чадвартай эсэх?',
    b1: 'Зорилтот экспорт хийх улсад өрсөлдөх боломжтой эсэх (зах зээлийн багтаамж, зорилтот зах зээлийн хэмжээний талаарх мэдээлэл)',
    b2: 'Экспортын зорилтот зах зээлийн зорилтот хэрэглэгчдийн бүлэгт тохирсон бүтээгдэхүүн, үйлчилгээг нийлүүлэх боломжтой эсэх (хэрэглэгчдийн зан төлөв, сонирхлын талаар судалгаанд үндэслэсэн)',
    b3: 'Экспортын зорилтот зах зээлд өрсөлдөх чадвараа нэмэгдүүлэх төлөвлөгөө, хүчин чадалтай эсэх (өрсөлдөгчдийн судалгаанд үндэслэсэн шинжилгээ)',
    b4: 'Экспортын зах зээлд захиалгыг тасралтгүй ханган, үйлдвэрлэх боломжтой эсэх (үйлдвэрлэлийн төлөвлөгөөнд суурилсан шинжилгээ)',
    b5: 'Экспортын зах зээлд тохирсон чанарын удирдлагыг хангах боломжтой эсэх (тавигдаж буй чанарын удирдлагыг нэвтрүүлэх болон тасралтгүй хангах нөөц боломжийн талаарх шинжилгээ)',
    b6: 'Экспортын зах зээлд зориулсан өртгийн сүлжээг оновчтой удирдах боломжтой эсэх (өртгийн сүлжээний оролцогчдын шинжилгээ)',
    b7: 'Зах зээлд нэвтрэх оновчтой стратегитай эсэх',
    b8: 'Түгээлт, ханган нийлүүлэлтийг оновчтой төлөвлөсөн эсэх',
    b9: 'Төслийн өгөөж нь өргөдөл гаргагчид санхүүгийн өгөөжтэй эсэх (төслөөр бий болох санхүүгийн тооцооллын шинжилгээ)',
    b10: 'Төслөөс гарах үр дүн нь экспортын хэмжээ, экспортлогч улс, экспортлогчдын тоонд шууд нөлөөлөл үзүүлэх боломжтой эсэх (экспортын мэдээлэлтэй харьцуулсан шинжилгээ)',
    c: 'C ХЭСЭГ: Хэрэгжүүлэх арга хэмжээ нь урт хугацаанд өгөөж, давуу талыг бий болгож буй эсэх?',
    c1: 'Өргөдөл гаргагчийн төлөвлөсөн үйл ажиллагаа нь 9 сарын дотор хэрэгжих боломжтой эсэх',
    c2: 'Уг үйл ажиллагаа нь Экспорт хөгжлийн төлөвлөгөөтэй уялдаж, үр дүнтэй байх чадах эсэх',
}

const initialCommentsOpen = Object.keys(rowDescriptions).reduce((a, c) => ({ ...a, [c]: false }), {})

const initialState = [
    {
        description: rowDescriptions.z,
        comment: '',
        isChecked: false,
        rowcode: 'z',
        order: 1,
        category: '@',
    },
    {
        description: rowDescriptions.a,
        comment: '',
        isChecked: false,
        rowcode: 'a',
        order: 5,
        category: 'A',
    },
    {
        description: rowDescriptions.a1,
        comment: '',
        isChecked: false,
        rowcode: 'a1',
        order: 10,
        category: 'A',
    },
    {
        description: rowDescriptions.a2,
        comment: '',
        isChecked: false,
        rowcode: 'a2',
        order: 15,
        category: 'A',
    },
    {
        description: rowDescriptions.a3,
        comment: '',
        isChecked: false,
        rowcode: 'a3',
        order: 20,
        category: 'A',
    },
    {
        description: rowDescriptions.a4,
        comment: '',
        isChecked: false,
        rowcode: 'a4',
        order: 25,
        category: 'A',
    },
    {
        description: rowDescriptions.a5,
        comment: '',
        isChecked: false,
        rowcode: 'a5',
        order: 30,
        category: 'A',
    },
    {
        description: rowDescriptions.a6,
        comment: '',
        isChecked: false,
        rowcode: 'a6',
        order: 35,
        category: 'A',
    },
    {
        description: rowDescriptions.a7,
        comment: '',
        isChecked: false,
        rowcode: 'a7',
        order: 40,
        category: 'A',
    },
    {
        description: rowDescriptions.b,
        comment: '',
        isChecked: false,
        rowcode: 'b',
        order: 45,
        category: 'B',
    },
    {
        description: rowDescriptions.b1,
        comment: '',
        isChecked: false,
        rowcode: 'b1',
        order: 50,
        category: 'B',
    },
    {
        description: rowDescriptions.b2,
        comment: '',
        isChecked: false,
        rowcode: 'b2',
        order: 55,
        category: 'B',
    },
    {
        description: rowDescriptions.b3,
        comment: '',
        isChecked: false,
        rowcode: 'b3',
        order: 60,
        category: 'B',
    },
    {
        description: rowDescriptions.b4,
        comment: '',
        isChecked: false,
        rowcode: 'b4',
        order: 65,
        category: 'B',
    },
    {
        description: rowDescriptions.b5,
        comment: '',
        isChecked: false,
        rowcode: 'b5',
        order: 70,
        category: 'B',
    },
    {
        description: rowDescriptions.b6,
        comment: '',
        isChecked: false,
        rowcode: 'b6',
        order: 75,
        category: 'B',
    },
    {
        description: rowDescriptions.b7,
        comment: '',
        isChecked: false,
        rowcode: 'b7',
        order: 80,
        category: 'B',
    },
    {
        description: rowDescriptions.b8,
        comment: '',
        isChecked: false,
        rowcode: 'b8',
        order: 85,
        category: 'B',
    },
    {
        description: rowDescriptions.b9,
        comment: '',
        isChecked: false,
        rowcode: 'b9',
        order: 90,
        category: 'B',
    },
    {
        description: rowDescriptions.b10,
        comment: '',
        isChecked: false,
        rowcode: 'b10',
        order: 95,
        category: 'B',
    },
    {
        description: rowDescriptions.c,
        comment: '',
        isChecked: false,
        rowcode: 'c',
        order: 100,
        category: 'C',
    },
    {
        description: rowDescriptions.c1,
        comment: '',
        isChecked: false,
        rowcode: 'c1',
        order: 105,
        category: 'C',
    },
    {
        description: rowDescriptions.c2,
        comment: '',
        isChecked: false,
        rowcode: 'c2',
        order: 110,
        category: 'C',
    },
]

const initialEvaluator = {
    check_start: '',
    check_end: '',
    accept_tips: '',
    decline_reason: '',
}

const editors = ['edpadmin', 'member', 'ahlah_bhsh']

export default function AnalystReport() {
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
            axios.get(`projects/${projectId}/bds-evaluation5c`, {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                if (res.data.data?.rows?.length === initialState.length) {
                    setRows(res.data.data.rows)
                }
                setInfo(res.data.data.info)
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
        } else {
            axios.get('pps-infos/registered-companies', {
                headers: { Authorization: getLoggedUserToken() },
                params: { userId: loggedUserId },
            }).then(res => {
                setCompany(res.data.data[0] ?? {})
                res.data.data[0]?.project?.id &&
                    axios.get(`projects/${res.data.data[0].project.id}/bds-evaluation5c`, {
                        headers: { Authorization: getLoggedUserToken() },
                    }).then(res => {
                        if (res.data.data?.rows?.length === initialState.length) {
                            setRows(res.data.data.rows)
                        }
                        setInfo(res.data.data.info)
                    })
            })
        }
    }, [])

    const [commentsOpen, setCommentsOpen] = useState(initialCommentsOpen)

    const handleCommentOpen = (key, value) => {
        setCommentsOpen({ ...commentsOpen, [key]: value })
    }

    const handleSubmit = () => {
        if (info.check_start && info.check_end) {
            axios.post(`projects/${projectId}/bds-evaluation5c`, { rows: rows, info: info }, {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Шинжилгээний тайланг хадгалагдлаа.' })
            }).catch(err => {
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
            })
        } else {
            setValidate(true)
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Дээрх талбаруудыг гүйцэд бөглөнө үү.' })
        }
    }

    const [info, setInfo] = useState(initialEvaluator)

    const handleInputEvaluator = (key, value) => {
        setInfo(prev => ({ ...prev, [key]: value }))
    }

    const isCheckedZ = rows.filter(row => row.rowcode === 'z')[0]?.isChecked

    const [previewModalOpen, setPreviewModalOpen] = useState(false)

    const [validate, setValidate] = useState(false)

    return (
        <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-text-gray-700 tw-bg-white tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <button className="tw-float-right tw-mt-2 tw-mr-2 tw-py-1 tw-pl-3 tw-pr-5 tw-bg-blue-800 active:tw-bg-blue-700 tw-rounded tw-text-white hover:tw-shadow-md focus:tw-outline-none tw-transition-colors tw-flex tw-items-center" onClick={() => setPreviewModalOpen(true)}>
                <SearchSVG className="tw-w-4 tw-h-4 tw-mr-1" />
                Харах
            </button>

            <DecisionMakingPreviewModal previewModalOpen={previewModalOpen} setPreviewModalOpen={setPreviewModalOpen} previewComponent={<AnalystReportPreview rows={rows} info={info} company={company} evalautor={evalautor} />} />

            <div className="tw-font-medium tw-p-3 tw-pb-2 tw-flex tw-items-center">
                <span className="tw-text-xl tw-mx-2 tw-leading-tight tw-text-blue-500">5c</span>
                <span className="tw-text-base">
                    - Бизнес шинжээчийн шинжилгээний тайлан
                </span>
            </div>

            <div className="tw-border-b tw-border-dashed tw-text-13px tw-pl-5 tw-pr-3 tw-pb-1 tw-font-medium tw-leading-snug">
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

            <div className="tw-mx-3 tw-mt-2">
                <div className="tw-flex tw-items-center">
                    <label className="tw-mb-0 tw-font-medium">
                        Шинжилгээ хийсэн Бизнес шинжээч:
                    </label>
                    <span className="tw-ml-3 tw-bg-gray-50 tw-rounded tw-py-0.5 tw-px-2 tw-text-sm tw-text-blue-600 tw-font-medium">
                        {evalautor.id && `${evalautor.lastname.substr(0, 1).toUpperCase()}. ${evalautor.firstname}`}
                    </span>
                </div>

                <div className="tw-flex tw-items-center tw-mt-3">
                    <label className="tw-mb-0 tw-font-medium">
                        Шинжилгээ, дүгнэлт хийсэн хугацаа:
                    </label>
                    <span>
                        <input className={`tw-border tw-rounded tw-shadow-inner tw-ml-4 tw-mr-1 tw-w-36 tw-pl-1 tw-py-0.5 focus:tw-outline-none ${validate && !(info.check_start) && 'tw-border-dashed tw-border-red-500'}`} type="date" max={todayStr} value={info.check_start} onChange={e => handleInputEvaluator('check_start', e.target.value)} /> -аас
                        <input className={`tw-border tw-rounded tw-shadow-inner tw-ml-2 tw-mr-1 tw-w-36 tw-pl-1 tw-py-0.5 focus:tw-outline-none ${validate && !(info.check_end) && 'tw-border-dashed tw-border-red-500'}`} type="date" max={todayStr} value={info.check_end} onChange={e => handleInputEvaluator('check_end', e.target.value)} /> -ны хооронд.
                    </span>
                </div>

                <Transition
                    items={isCheckedZ}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0, display: 'none' }}>
                    {item => item
                        ? anims =>
                            <animated.div className="tw-mt-3" style={anims}>
                                <div className="tw-font-medium">
                                    Төслийг дэмжиж буй бол хэрэгжүүлэх явцад анхаарах зөвлөмж:
                                </div>
                                <div className="tw-mt-1 tw-h-32 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl tw-shadow-inner tw-rounded-lg" style={{ minHeight: '128px', maxHeight: '768px' }}>
                                    <FormRichText modules="small" value={info.accept_tips} name="accept_tips" setForm={handleInputEvaluator} />
                                </div>
                            </animated.div>
                        : anims =>
                            <animated.div className="tw-mt-3" style={anims}>
                                <div className="tw-font-medium">
                                    Хэрэв төслийг дэмжихээс татгалзсан бол татгалзсан шалтгаан:
                                </div>
                                <div className="tw-mt-1 tw-h-32 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl tw-shadow-inner tw-rounded-lg" style={{ minHeight: '128px', maxHeight: '768px' }}>
                                    <FormRichText modules="small" value={info.decline_reason} name="decline_reason" setForm={handleInputEvaluator} />
                                </div>
                            </animated.div>
                    }
                </Transition>
            </div>

            <div className="tw-rounded-sm tw-shadow-md tw-border-t tw-border-gray-100 tw-mx-2 tw-mt-6 tw-divide-y tw-divide-dashed">
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
                            leave={{ height: 0, opacity: 0 }}>
                            {item => item && (anims =>
                                <div className="tw-flex tw-justify-end tw-items-start tw-overflow-hidden" style={anims}>
                                    <textarea className="tw-w-full tw-max-w-md focus:tw-outline-none tw-border tw-border-gray-400 tw-rounded tw-px-1.5 tw-py-1 tw-mt-1 tw-mx-3 tw-mb-3 tw-resize-none tw-text-13px" value={row.comment} onChange={e => handleInput('comment', e.target.value, row.rowcode)} rows="3" placeholder="Тайлбар ..." />
                                </div>
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