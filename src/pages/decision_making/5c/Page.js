import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { todayStr } from 'components/utilities/utilities'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { useHistory } from 'react-router-dom'
import ModalWindow from 'components/modal_window/modalWindow'
import PenAltSVG from 'assets/svgComponents/penAltSVG'
import SignaturePad from 'react-signature-canvas'
import { capitalize } from 'components/utilities/utilities'

const rowDescriptions = {
    z: 'Өргөдөл гаргагчийн төслийг дэмжих саналтай эсэх',

    a: 'A ХЭСЭГ: Өргөдөл гаргагч экспорт хийх чадавхитай эсэх',
    a1: 'Шалгуур үзүүлэлтийг бүрэн хангасан эсэх (Шалгууруудыг хэрхэн хангасан талаарх мэдээлэл)',
    a2: 'Дотоодын зах зээл дээр байр сууриа олсон эсэх (Дотоодын зах зээл дээрх байр суурь, зорилтот зах зээлийн мэдээлэл)',
    a3: 'Одоогийн компанийн борлуулалт, ашигт гол нөлөө бүхий бүтээгдэхүүн, үйлчилгээ нь урт хугацааны өрсөлдөх чадвар бүхий бүтээгдэхүүн эсэх',
    a4: 'Санхүүгийн чадавхитай эсэх (Санхүүгийн үзүүлэлтүүд, ашигт ажиллагаа, санхүүгийн хүчин чадал)',
    a5: 'Чадавхи бүхий хүний нөөц, баг бүрдүүлж чадсан эсэх',
    a6: 'Экспорт хийсэн туршлагатай эсэх (Экспортын мэдээлэлд өгсөн дүн шинжилгээ)',

    b: 'B ХЭСЭГ: Экспорт хөгжлийн төлөвлөгөө нь хэрэгжих боломжтой бөгөөд Монгол улсын экспортонд нөлөө үзүүлэх чадвартай эсэх',
    b1: 'Зорилтот экспорт хийх улсад өрсөлдөх боломжтой эсэх (зах зээлийн багтаамж, зорилтот зах зээлийн хэмжээний талаарх мэдээлэл)',
    b2: 'Экспортын зорилтот зах зээлийн зорилтот хэрэглэгчдийн бүлэгт тохирсон бүтээгдэхүүн, үйлчилгээг нийлүүлэх боломжтой эсэх (хэрэглэгчдийн зан төлөв, сонирхлын талаар судалгаанд үндэслэсэн)',
    b3: 'Экспортын зорилтот зах зээлд өрсөлдөх чадвараа нэмэгдүүлэх төлөвлөгөө, хүчин чадалтай эсэх (өрсөлдөгчдийн судалгаанд үндэслэсэн шинжилгээ)',
    b4: 'Экспортын зах зээлд захиалгыг тасралтгүй ханган, үйлдвэрлэх боломжтой эсэх (үйлдвэрлэлийн төлөвлөгөөнд суурилсан шинжилгээ)',
    b5: 'Экспортын зах зээлд тохирсон чанарын удирдлагыг хангах боломжтой эсэх (тавигдаж буй чанарын удирдлагыг нэвтрүүлэх болон тасралтгүй хангах нөөц боломжийн талаарх шинжилгээ)',
    b6: 'Экспортын бүтээгдэхүүний өртгийг бодитой тооцож, экспортын нэмэлт зардлуудыг тусгаж тооцсон эсэх',
    b7: 'Зах зээлд нэвтрэх оновчтой стратегитай эсэх',
    b8: 'Түгээлт, ханган нийлүүлэлтийг оновчтой төлөвлөсөн эсэх',
    b9: 'Төслийн өгөөж нь өргөдөл гаргагчид санхүүгийн өгөөжтэй эсэх (төслөөр бий болох санхүүгийн тооцооллын шинжилгээ)',

    c: 'C ХЭСЭГ: Хэрэгжүүлэх арга хэмжээ нь урт хугацаанд өгөөж, давуу талыг бий болгож буй эсэх',
    c1: 'Өргөдөл гаргагчийн төлөвлөсөн үйл ажиллагаа нь 9 сарын дотор хэрэгжих боломжтой эсэх',
    c2: 'Уг үйл ажиллагаа нь Экспорт хөгжлийн төлөвлөгөөтэй уялдаж, үр дүнтэй байх чадах эсэх',
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

const initialInfo = {
    analyst_name: '',
    check_start: '',
    check_end: '',
    accept_tips: '',
    decline_reason: '',
    ahlah_name: '',
    ahlah_signature: null,
    zuvluh_name: '',
    zuvluh_signature: null
}

const editors = ['edpadmin', 'member', 'ahlah_bhsh']

export default function AnalystReport() {
    const [rows, setRows] = useState(initialState)
    const [company, setCompany] = useState({})
    const [analyst, setAnalyst] = useState({})

    const canEdit = editors.includes(analyst.role)

    const AlertCtx = useContext(AlertContext)

    const handleInput = (key, value, rowcode) => {
        if (canEdit) {
            setRows(prev => {
                const next = [...prev]
                const index = next.findIndex(row => row.rowcode === rowcode)
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
            axios.get(`projects/${projectId}/bds-evaluation5c`, {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                if (res.data.data?.rows?.length === initialState.length) {
                    setRows(res.data.data.rows)
                }
                setInfo(prev => ({ ...prev, ...res.data.data.info }))
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
                const analyst = res.data.data
                setAnalyst(analyst)
                setInfo(prev => ({
                    ...prev,
                    analyst_name: prev.analyst_name || `${analyst.lastname?.substr(0, 1)?.toUpperCase()}. ${capitalize(analyst.firstname)}`
                }))
            })
        }
    }, [])

    const [commentsOpen, setCommentsOpen] = useState(initialCommentsOpen)

    const handleCommentOpen = (key, value) => {
        setCommentsOpen({ ...commentsOpen, [key]: value })
    }

    const handleSubmit = () => {
        if (info.analyst_name && info.check_start && info.check_end) {
            axios.post(`projects/${projectId}/bds-evaluation5c`, { rows: rows, info: info }, {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Шинжээчийн тайланг хадгаллаа.' })
            }).catch(err => {
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
            })
        } else {
            setValidate(true)
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Дээрх талбаруудыг гүйцэд бөглөнө үү.' })
        }
    }

    const [info, setInfo] = useState(initialInfo)

    const handleInputInfo = (key, value) => {
        setInfo(prev => ({ ...prev, [key]: value }))
    }

    const isCheckedZ = rows.filter(row => row.rowcode === 'z')[0]?.isChecked

    const [previewModalOpen, setPreviewModalOpen] = useState(false)

    const [validate, setValidate] = useState(false)

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

                <DecisionMakingPreviewModal previewModalOpen={previewModalOpen} setPreviewModalOpen={setPreviewModalOpen} previewComponent={<AnalystReportPreview rows={rows} info={info} company={company} analyst={analyst} />} />

                <div className="tw-p-3 tw-pb-2 tw-flex tw-items-center">
                    <span className=" tw-pl-2 tw-font-medium tw-text-blue-500 tw-text-base">
                        Бизнес шинжээчийн шинжилгээний тайлан
                    </span>
                </div>

                <div className="tw-border-b tw-border-dashed tw-text-13px tw-pl-5 tw-pr-3 tw-pb-1 tw-leading-snug">
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

                <div className="tw-ml-4 tw-mr-2 tw-mt-4">
                    <div className="tw-flex tw-items-center">
                        <label className="tw-mb-0 tw-mr-4">
                            Шинжилгээ хийсэн Бизнес шинжээч:
                        </label>
                        <input className={`${classInput} ${validate && !(info.analyst_name) && 'tw-border-dashed tw-border-red-500'}`} value={info.analyst_name} onChange={e => handleInputInfo('analyst_name', e.target.value)} placeholder="Овог нэр" />
                    </div>

                    <div className="tw-flex tw-items-center tw-mt-3">
                        <label className="tw-mb-0">
                            Шинжилгээ, дүгнэлт хийсэн хугацаа:
                        </label>
                        <span>
                            <input className={`tw-border tw-rounded tw-shadow-inner tw-ml-4 tw-mr-1 tw-w-36 tw-pl-1 tw-py-0.5 focus:tw-outline-none ${validate && !(info.check_start) && 'tw-border-dashed tw-border-red-500'} tw-text-13px`} type="date" max={todayStr} value={info.check_start} onChange={e => handleInputInfo('check_start', e.target.value)} /> -аас
                            <input className={`tw-border tw-rounded tw-shadow-inner tw-ml-2 tw-mr-1 tw-w-36 tw-pl-1 tw-py-0.5 focus:tw-outline-none ${validate && !(info.check_end) && 'tw-border-dashed tw-border-red-500'} tw-text-13px`} type="date" max={todayStr} value={info.check_end} onChange={e => handleInputInfo('check_end', e.target.value)} /> -ны хооронд.
                        </span>
                    </div>

                    <Transition
                        items={isCheckedZ}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0, display: 'none' }}>
                        {item => item
                            ? anims =>
                                <animated.div className="tw-mt-1.5" style={anims}>
                                    <FormRichText
                                        label="Төслийг дэмжиж буй бол хэрэгжүүлэх явцад анхаарах зөвлөмж:"
                                        modules="small"
                                        value={info.accept_tips}
                                        name="accept_tips"
                                        setter={handleInputInfo}
                                        classQuill="tw-max-w-4xl"
                                    />
                                </animated.div>
                            : anims =>
                                <animated.div className="tw-mt-1.5" style={anims}>
                                    <FormRichText
                                        label="Хэрэв төслийг дэмжихээс татгалзсан бол татгалзсан шалтгаан:"
                                        modules="small"
                                        value={info.decline_reason}
                                        name="decline_reason"
                                        setter={handleInputInfo}
                                        classQuill="tw-max-w-4xl"
                                    />
                                </animated.div>
                        }
                    </Transition>
                </div>

                <div className="tw-rounded-sm tw-shadow-md tw-border-t tw-border-gray-100 tw-mx-2 tw-mt-6 tw-divide-y tw-divide-dashed">
                    {rows.map(row =>
                        <div key={row.rowcode}>
                            <div className="tw-flex tw-items-center tw-text-sm">
                                <span className={`tw-px-4 tw-py-2.5 tw-flex-grow ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === "z" ? "" : "tw-pl-8 tw-font-light"}`} style={row.rowcode === 'z' ? { fontSize: '15px' } : {}}>
                                    {!['a', 'b', 'c', 'z'].includes(row.rowcode) &&
                                        <span className="tw-mr-2 tw-font-normal">
                                            {row.rowcode.slice(-1)}.
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

                                <ButtonTooltip tooltip="Тайлбар оруулах" beforeSVG={<AnnotationSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} classAppend={`tw-mr-4 ${row.rowcode === "a" || row.rowcode === "b" || row.rowcode === "c" || row.rowcode === 'z' ? 'tw-mr-7' : ''}`} classButton={`${row.comment ? 'tw-text-blue-600 active:tw-text-blue-500' : 'tw-text-gray-600 active:tw-text-gray-500'} tw-transition-colors tw-p-0.5`} onClick={() => handleCommentOpen(row.rowcode, !commentsOpen[row.rowcode])} />
                            </div>

                            <Transition
                                items={commentsOpen[row.rowcode]}
                                from={{ height: 0, opacity: 0, }}
                                enter={{ height: 'auto', opacity: 1 }}
                                leave={{ height: 0, opacity: 0 }}
                                config={{ tension: 300, clamp: true }}>
                                {item => item && (anims =>
                                    <div className="tw-overflow-hidden tw-pl-14 tw-pr-3" style={anims}>
                                        <FormRichText
                                            modules="small"
                                            value={row.comment}
                                            name="comment"
                                            index={row.rowcode}
                                            setter={handleInput}
                                            classQuill="tw-pb-10"
                                            height={180}
                                        />
                                    </div>
                                )}
                            </Transition>
                        </div>
                    )}
                </div>

                <div className="tw-mt-8 tw-p-2 tw-mb-4" style={{ marginLeft: '10%' }}>
                    <div className="">
                        Сонгон шалгаруулалтын багийн хуралд танилцуулахыг зөвшөөрсөн:
                    </div>
                    <div className="tw-pl-4 tw-mt-2">
                        <div className="">
                            <input className={classInput} value={info.ahlah_name} onChange={e => handleInputInfo('ahlah_name', e.target.value)} placeholder="Овог нэр" />
                        </div>
                        <p className="tw-mt-1 tw-font-light">
                            Бизнес хөгжлийн ахлах мэргэжилтэн
                        </p>
                        <Signature value={info.ahlah_signature} name="ahlah_signature" setter={handleInputInfo} />
                    </div>

                    <div className="tw-mt-6">
                        Боловсруулсан:
                    </div>
                    <div className="tw-pl-4 tw-mt-2">
                        <div className="">
                            <input className={classInput} value={info.zuvluh_name} onChange={e => handleInputInfo('zuvluh_name', e.target.value)} placeholder="Овог нэр" />
                        </div>
                        <p className="tw-mt-1 tw-font-light">
                            Бизнес хөгжлийн зөвлөх
                        </p>
                        <Signature value={info.zuvluh_signature} name="zuvluh_signature" setter={handleInputInfo} />
                    </div>
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

const classInput = 'tw-border tw-rounded tw-shadow-inner tw-mr-1 tw-w-56 tw-pl-1 tw-py-0.5 focus:tw-outline-none'
const classSignature = 'tw-w-52 tw-h-16 tw-border tw-rounded tw-border-gray-400 tw-cursor-pointer print-border-bottom'

function Signature({ value, name, index, setter }) {
    const [sigModalOpen, setSigModalOpen] = useState(false)
    const [hovered, setHovered] = useState(false)

    const sigCanvasRef = useRef()

    const handleDrawSignature = () => {
        setter(name, sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png'), index)
    }

    const handleClearSignature = () => {
        sigCanvasRef.current.clear()
        setter(name, null, index)
    }

    return (
        <div className="tw-flex tw-flex-wrap tw-mt-1">
            <div className="tw-relative">
                {value
                    ? <img src={value} alt="Гарын үсэг" className={`${classSignature} tw-object-scale-down print-border-bottom`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setSigModalOpen(true)} />
                    : <div className={classSignature} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setSigModalOpen(true)} />
                }
                <PenAltSVG className={`tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw-w-7 tw-h-7 tw-text-gray-600 tw-transform-gpu ${hovered ? 'tw--translate-y-1/2 tw-opacity-100' : 'tw--translate-y-3/4 tw-opacity-0'} tw-transition-all tw-duration-300 tw-cursor-pointer`} onMouseEnter={() => setHovered(true)} onClick={() => setSigModalOpen(true)} />
            </div>

            <ModalWindow modalOpen={sigModalOpen} setModalOpen={setSigModalOpen}>
                <div className="tw-p-2 tw-flex tw-flex-col">
                    <div className="tw-text-sm tw-mb-2">
                        Гарын үсэг зурах:
                    </div>

                    <SignaturePad canvasProps={{ className: 'tw-rounded tw-border tw-border-gray-400', width: 624, height: 192 }} ref={sigCanvasRef} onEnd={handleDrawSignature} />

                    <div className="tw-flex tw-justify-center tw-mt-4">
                        <button className="tw-rounded tw-text-white tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-w-32 tw-py-1 focus:tw-outline-none tw-font-light" onClick={handleClearSignature}>
                            Арилгах
                        </button>
                        <button className="tw-rounded tw-text-white tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-w-32 tw-py-1 tw-ml-3 focus:tw-outline-none tw-font-light" onClick={() => setSigModalOpen(false)}>
                            Болсон
                        </button>
                    </div>
                </div>
            </ModalWindow>
        </div>
    )
}
