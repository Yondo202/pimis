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
import FormRichTextCKE from 'components/urgudul_components/formRichTextCKE'
import NumberFormat from 'react-number-format'
import { TextareaCell } from 'pages/contract/contract_reports/protectionReport'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import { toCurrencyString } from 'pages/urgudul/preview/Preview'
import useClickOutside from 'components/utilities/useClickOutside'

const rowDescriptions = {
    z: 'Өргөдөл гаргагчийн төслийг дэмжих саналтай эсэх',

    a: 'A ХЭСЭГ: Өргөдөл гаргагч экспорт хийх чадавхитай эсэх',
    a1: 'Шалгуур үзүүлэлтийг бүрэн хангасан эсэх (Шалгууруудыг хэрхэн хангасан талаарх мэдээлэл)',
    a2: 'Дотоодын зах зээл дээр байр сууриа олсон эсэх (Дотоодын зах зээл дээрх байр суурь, зорилтот зах зээлийн мэдээлэл)',
    a3: 'Санхүүгийн чадавхитай эсэх (Санхүүгийн үзүүлэлтүүд, ашигт ажиллагаа, санхүүгийн хүчин чадал)',
    a4: 'Чадавхи бүхий хүний нөөц, баг бүрдүүлж чадсан эсэх',
    a5: 'Экспорт хийсэн туршлагатай эсэх (Экспортын мэдээлэлд өгсөн дүн шинжилгээ)',

    b: 'B ХЭСЭГ: Экспорт хөгжлийн төлөвлөгөө нь хэрэгжих боломжтой бөгөөд Монгол улсын экспортонд нөлөө үзүүлэх чадвартай эсэх',
    b1: 'Зорилтот экспорт хийх улсад өрсөлдөх боломжтой эсэх (зах зээлийн багтаамж, зорилтот зах зээлийн хэмжээний талаарх мэдээлэл)',
    b2: 'Экспортын зорилтот зах зээлд өрсөлдөх чадвараа нэмэгдүүлэх төлөвлөгөө, хүчин чадалтай эсэх (өрсөлдөгчдийн судалгаанд үндэслэсэн шинжилгээ)',
    b3: 'Экспортын зах зээлд захиалгыг тасралтгүй ханган, үйлдвэрлэх боломжтой эсэх (үйлдвэрлэлийн төлөвлөгөөнд суурилсан шинжилгээ)',
    b4: 'Экспортын зах зээлд зориулсан өртгийн сүлжээг оновчтой удирдах боломжтой эсэх (өртгийн сүлжээний оролцогчдын шинжилгээ)',
    b5: 'Зах зээлд нэвтрэх оновчтой стратегитай эсэх',
    b6: 'Түгээлт, ханган нийлүүлэлтийг оновчтой төлөвлөсөн эсэх',
    b7: 'Төслөөс гарах үр дүн нь экспортын хэмжээ, экспортлогч улс, экспортлогчдын тоонд шууд нөлөөлөл үзүүлэх боломжтой эсэх (экспортын мэдээлэлтэй харьцуулсан шинжилгээ)',

    c: 'C ХЭСЭГ: Хэрэгжүүлэх арга хэмжээ нь урт хугацаанд өгөөж, давуу талыг бий болгож буй эсэх',
    c1: 'Өргөдөл гаргагчийн төлөвлөсөн үйл ажиллагаа нь 9 сарын дотор хэрэгжих боломжтой эсэх',
    c2: 'Уг үйл ажиллагаа нь Экспорт хөгжлийн төлөвлөгөөтэй уялдаж, үр дүнтэй байж чадах эсэх'
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
    requested_funding: '',
    available_funding: '',
    analyst_name: '',
    check_start: '',
    check_end: '',
    info: '',
    ahlah_name: '',
    ahlah_signature: null,
    zuvluh_name: '',
    zuvluh_signature: null
}

const editors = ['edpadmin', 'member', 'ahlah_bhsh', 'bh_zovloh']
const rootCodes = ['a', 'b', 'c', 'z']
// const emptyEditor = '<p><br></p>'
const emptyEditor = ''

const rowFundingDeals = {
    planned_activity: null,
    requested_funding: null,
    proposal_funding: null,
    approved_funding: null
}

export const headersFundingDeals = [
    '№',
    'Төлөвлөсөн үйл ажиллагаа',
    'Хүссэн санхүүжилт /төгрөг/',
    'Зөвлөхийн санал /төгрөг/'
]

export default function AnalystReport({ seeMember, setOpen }) {
    const [rows, setRows] = useState(initialState)
    const [company, setCompany] = useState({})
    const [analyst, setAnalyst] = useState({})
    const [canEdit, setCanEdit] = useState(true)

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

    const fetchData = (projectId) => {
        axios.get(`projects/${projectId}/bds-evaluation5c`, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            if (res.data.data?.rows?.length === initialState.length) {
                setRows(res.data.data.rows)
            }
            setInfo(prev => ({ ...prev, ...res.data.data?.info }))
            if (res.data.data?.deals?.length) {
                setFundingDeals(res.data.data.deals)
            }
        })
        axios.get('pps-infos/registered-companies', {
            headers: { Authorization: getLoggedUserToken() },
            params: { projectId: projectId },
        }).then(res => {
            setCompany(res.data.data[0] ?? {})
        })
    }

    useEffect(() => {
        if (projectId) {
            fetchData(projectId)
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
        if (seeMember) {
            fetchData(seeMember)
            setPreviewModalOpen(true)
        }
    }, [])

    const [commentsOpen, setCommentsOpen] = useState(initialCommentsOpen)

    const handleCommentOpen = (key, value) => {
        setCommentsOpen({ ...commentsOpen, [key]: value })
    }

    const handleSubmit = () => {
        if (info.requested_funding && info.analyst_name && info.check_start && info.check_end) {
            axios.post(`projects/${projectId}/bds-evaluation5c`, { rows: rows, info: info, deals: fundingDeals }, {
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
    const [fundingDeals, setFundingDeals] = useState([{ ...rowFundingDeals }])

    const handleInputInfo = (key, value) => {
        if (canEdit) {
            setInfo(prev => ({ ...prev, [key]: value }))
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Засвар оруулах эрх байхгүй байна.' })
        }
    }

    const openConditionAhlah = () => {
        if (analyst.role === 'ahlah_bhsh') {
            return true
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Бизнес хөгжлийн ахлах мэргэжилтэн засах боломжтой' })
            return false
        }
    }

    const openConditionZuvluh = () => {
        if (analyst.role === 'bh_zovloh') {
            return true
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Бизнес хөгжлийн зөвлөх засах боломжтой' })
            return false
        }
    }


    const hanleInputFunding = (key, value, index) => {
        if (canEdit) {
            setFundingDeals(prev => {
                const next = [...prev]
                next[index][key] = value
                return next
            })
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Засвар оруулах эрх байхгүй байна.' })
        }
    }

    const rowAddFunding = () => {
        if (canEdit) {
            setFundingDeals(prev => [...prev, { ...rowFundingDeals }])
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Засвар оруулах эрх байхгүй байна.' })
        }
    }

    const rowRemoveFunding = (index) => {
        if (canEdit) {
            if (fundingDeals.length <= 1) return
            setFundingDeals(prev => prev.filter((_, i) => i !== index))
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Засвар оруулах эрх байхгүй байна.' })
        }
    }

    const [previewModalOpen, setPreviewModalOpen] = useState(false)

    const [validate, setValidate] = useState(false)

    const history = useHistory()

    return (
        <>
            <DecisionMakingPreviewModal previewModalOpen={previewModalOpen} setPreviewModalOpen={seeMember ? setOpen : setPreviewModalOpen} previewComponent={<AnalystReportPreview rows={rows} info={info} deals={fundingDeals} company={company} analyst={analyst} />} />

            {!seeMember &&
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

                        <div className="tw-p-3 tw-pb-2 tw-flex tw-items-center">
                            <span className=" tw-pl-2 tw-font-medium tw-text-blue-500 tw-text-base">
                                Шинжилгээний тайлан
                            </span>
                        </div>

                        <div className="tw-border-b tw-border-dashed tw-text-13px tw-pl-5 tw-pr-3 tw-pb-1 tw-leading-snug">
                            <div className="tw-relative">
                                Өргөдлийн дугаар:
                                <span className="tw-absolute tw-left-32 tw-text-blue-500 tw-font-medium">{company.project?.project_number}</span>
                            </div>
                            <div className="tw-relative">
                                Өргөдлийн төрөл:
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
                                    Хүсэж буй санхүүжилтийн дүн:
                                </label>
                                <NumberFormat className={`${classInputNumber} ${validate && !(info.requested_funding) && 'tw-border-dashed tw-border-red-500'}`} value={info.requested_funding} onValueChange={values => handleInputInfo('requested_funding', values.floatValue)} thousandSeparator decimalScale={2} suffix=' ₮' />
                            </div>

                            <div className="tw-flex tw-items-center tw-mt-3">
                                <label className="tw-mb-0 tw-mr-4">
                                    Хүсэж болох санхүүжилтийн дүн:
                                </label>
                                <NumberFormat className={`${classInputNumber} `} value={info.available_funding} onValueChange={values => handleInputInfo('available_funding', values.floatValue)} thousandSeparator decimalScale={2} suffix=' ₮' />
                            </div>

                            <div className="tw-flex tw-items-center tw-mt-3">
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

                            <div className="tw-flex tw-items-center tw-mt-3">
                                <label className="tw-mb-0 tw-mr-4">
                                    Дэмжих, эсэх талаарх санал:
                                </label>
                                <Select options={options} value={rows.find(row => row.rowcode === 'z').isChecked} name="isChecked" index="z" setter={handleInput} />
                            </div>

                            <div className="tw-inline-block tw-relative tw-mt-4 tw-mr-8">
                                <table className="">
                                    <thead>
                                        <tr>
                                            {headersFundingDeals.map(header =>
                                                <th className={`${classCell} tw-py-1 tw-font-medium`} key={header}>
                                                    {header}
                                                </th>
                                            )}
                                            <th style={{ width: 29 }} />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fundingDeals.map((row, i) =>
                                            <tr key={i}>
                                                <td className={classCell}>
                                                    {i + 1}.
                                                </td>
                                                <TextareaCell value={row.planned_activity} name="planned_activity" index={i} setter={hanleInputFunding} height={50} />
                                                <td className={classCell}>
                                                    <NumberFormat className={classCellInputNumber} value={row.requested_funding} onValueChange={values => hanleInputFunding('requested_funding', values.floatValue, i)} thousandSeparator decimalScale={2} />
                                                </td>
                                                <td className={classCell}>
                                                    <NumberFormat className={classCellInputNumber} value={row.proposal_funding} onValueChange={values => hanleInputFunding('proposal_funding', values.floatValue, i)} thousandSeparator decimalScale={2} />
                                                </td>
                                                <td className="">
                                                    <MinusCircleSVG className="tw-w-7 tw-h-7 tw-text-red-500 active:tw-text-red-600 tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-transition-colors tw-cursor-pointer" onClick={() => rowRemoveFunding(i)} />
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className={`${classCell} tw-pl-2.5`} colSpan={2}>
                                                Нийт
                                            </td>
                                            <td className={`${classCell} tw-text-right`}>
                                                {toCurrencyString(fundingDeals.reduce((acc, cv) => acc + (+cv.requested_funding || 0), 0))}
                                            </td>
                                            <td className={`${classCell} tw-text-right`}>
                                                {toCurrencyString(fundingDeals.reduce((acc, cv) => acc + (+cv.proposal_funding || 0), 0))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <PlusCircleSVG className="tw-w-7 tw-h-7 tw-text-green-500 active:tw-text-green-600 tw-transition-colors tw-cursor-pointer tw-absolute tw--bottom-4 tw-right-4 print-invisbile" onClick={rowAddFunding} />
                            </div>

                            <div className="tw-mt-4 tw-mr-8">
                                <FormRichTextCKE
                                    value={info.info}
                                    name="info"
                                    setter={handleInputInfo}
                                    placeholder="Компаний танилцуулга, бүтээгдэхүүн, төслийн тухай"
                                />
                            </div>
                        </div>

                        <div className="tw-rounded-sm tw-shadow-md tw-border-t tw-border-gray-100 tw-mx-2 tw-mt-4 tw-divide-y tw-divide-dashed">
                            {rows.filter(row => row.rowcode !== 'z').map(row =>
                                <div key={row.rowcode}>
                                    <div className="tw-flex tw-items-center tw-text-sm">
                                        <span className={`tw-px-4 tw-py-2.5 tw-flex-grow ${rootCodes.includes(row.rowcode) ? "" : "tw-pl-8 tw-font-light"}`} style={row.rowcode === 'z' ? { fontSize: '15px' } : {}}>
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
                                        from={{ height: 0, opacity: 0, }}
                                        enter={{ height: 'auto', opacity: 1 }}
                                        leave={{ height: 0, opacity: 0 }}
                                        config={{ tension: 300, clamp: true }}>
                                        {item => item && (anims =>
                                            <animated.div className={`tw-overflow-hidden ${rootCodes.includes(row.rowcode) ? 'tw-pl-5 tw-pr-8' : 'tw-pl-9 tw-pr-3'}`} style={anims}>
                                                {/* <FormRichText
                                            modules="small"
                                            value={row.comment}
                                            name="comment"
                                            index={row.rowcode}
                                            setter={handleInput}
                                            classQuill="tw-pb-10"
                                            height={180}
                                        /> */}
                                                <FormRichTextCKE
                                                    value={row.comment}
                                                    name="comment"
                                                    index={row.rowcode}
                                                    setter={handleInput}
                                                />
                                            </animated.div>
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
                                    /Бизнес хөгжлийн ахлах мэргэжилтэн/
                                </p>
                                <Signature value={info.ahlah_signature} name="ahlah_signature" setter={handleInputInfo} openCondition={openConditionAhlah} />
                            </div>

                            <div className="tw-mt-6">
                                Боловсруулсан:
                            </div>
                            <div className="tw-pl-4 tw-mt-2">
                                <div className="">
                                    <input className={classInput} value={info.zuvluh_name} onChange={e => handleInputInfo('zuvluh_name', e.target.value)} placeholder="Овог нэр" />
                                </div>
                                <p className="tw-mt-1 tw-font-light">
                                    /Бизнес хөгжлийн зөвлөх/
                                </p>
                                <Signature value={info.zuvluh_signature} name="zuvluh_signature" setter={handleInputInfo} openCondition={openConditionZuvluh} />
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
            }
        </>
    )
}

const classInput = 'tw-border tw-rounded tw-shadow-inner tw-mr-1 tw-w-56 tw-px-1.5 tw-py-0.5 focus:tw-outline-none'
const classInputNumber = 'tw-border tw-rounded tw-shadow-inner tw-mr-1 tw-w-40 tw-px-1.5 tw-py-0.5 focus:tw-outline-none tw-text-right'
const classSignature = 'tw-w-52 tw-h-16 tw-border tw-rounded tw-border-gray-400 tw-cursor-pointer print-border-bottom'
const classCell = 'tw-border tw-border-gray-300 tw-px-2 tw-text-13px'
const classCellInputNumber = 'focus:tw-outline-none tw-text-right tw-w-full tw-py-4 tw-text-13px'

function Signature({ value, name, index, setter, openCondition = () => true }) {
    const [sigModalOpen, setSigModalOpen] = useState(false)
    const [hovered, setHovered] = useState(false)

    const sigCanvasRef = useRef()

    const handleOpen = () => {
        const toOpen = openCondition()
        toOpen && setSigModalOpen(true)
    }

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
                    ? <img src={value} alt="Гарын үсэг" className={`${classSignature} tw-object-scale-down print-border-bottom`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={handleOpen} />
                    : <div className={classSignature} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={handleOpen} />
                }
                <PenAltSVG className={`tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw-w-7 tw-h-7 tw-text-gray-600 tw-transform-gpu ${hovered ? 'tw--translate-y-1/2 tw-opacity-100' : 'tw--translate-y-3/4 tw-opacity-0'} tw-transition-all tw-duration-300 tw-cursor-pointer`} onMouseEnter={() => setHovered(true)} onClick={handleOpen} />
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

const options = [{
    label: 'Тийм',
    value: true
}, {
    label: 'Үгүй',
    value: false
}]

function Select({ options = [], value, name, index, setter, classAppend }) {
    const [open, setOpen] = useState(false)

    const buttonRef = useRef()
    const dropdownRef = useRef()

    const handleSelect = (value) => {
        setter(name, value, index)
        setOpen(false)
    }

    useClickOutside([buttonRef, dropdownRef], open, () => setOpen(false))

    return (
        <div className={`tw-relative tw-text-13px ${classAppend}`}>
            <button className="tw-py-0.5 tw-pr-1 tw-pl-2 tw-border tw-border-gray-400 tw-rounded focus:tw-outline-none tw-inline-flex tw-items-center" ref={buttonRef} onClick={() => setOpen(prev => !prev)}>
                {options.find(option => option.value === value)?.label ?? <span className="tw-text-gray-500">Сонгох</span>}
                <ChevronDownSVG className="tw-w-4 tw-h-4 tw-ml-1 tw-text-gray-500" />
            </button>

            <Transition
                items={open}
                from={{ height: 0, opacity: 0 }}
                enter={{ height: 'auto', opacity: 1 }}
                leave={{ height: 0, opacity: 0 }}
                config={{ tension: 300, clamp: true }}
            >
                {item => item && (anims =>
                    <animated.div className="tw-absolute tw-z-10 tw-border tw-border-gray-400 tw-rounded tw-overflow-hidden tw-w-full tw-top-8 tw-bg-white" style={anims} ref={dropdownRef}>
                        {options.map((option, i) =>
                            <div className="tw-cursor-pointer tw-py-0.5 tw-pl-2 tw-pr-1" key={i} onClick={() => handleSelect(option.value)}>
                                {option.label}
                            </div>
                        )}
                    </animated.div>
                )}
            </Transition>
        </div>
    )
}
