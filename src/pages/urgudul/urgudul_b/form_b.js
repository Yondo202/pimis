import React, { useContext, useEffect, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/help_popup/helpPopup'
import PenSVG from 'assets/svgComponents/penSVG'
import FormRichText from 'components/urgudul_components/formRichText'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'


const initialState = {
    project_duration: null,
    project_start: null,
    project_end: null,
    project_introduction: null,
    preperation: null,
    identified_problems: null,
    suggested_solutions: null,
    expected_result: null,
}

const quillTypes = [
    'project_introduction',
    'preperation',
    'identified_problems',
    'suggested_solutions',
    'expected_result',
]

function UrgudulBreakdown() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        let temp = {}
        Object.keys(initialState).forEach(key => {
            if (UrgudulCtx.data[key] && UrgudulCtx.data[key] !== null) temp[key] = UrgudulCtx.data[key]
        })
        setForm({ ...form, ...temp })
    }, [UrgudulCtx.data.id])

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleInputFormat = (values, name) => {
        setForm({ ...form, [name]: values.value })
    }

    const handleSetForm = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        const allValid = Object.keys(form).every(key => !checkInvalid(form[key], quillTypes.includes(key) && 'quill'))

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, form, {
                    headers: {
                        'Authorization': getLoggedUserToken()
                    }
                }).then(res => {
                    console.log(res.data)
                    UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Төслийн задаргаа хадгалагдлаа.' })
                    history.push('/urgudul/6')
                }).catch(err => {
                    console.log(err.response?.data)
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                })
            } else {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Аль нэг талбар бөглөгдөөгүй байна. Та гүйцэт бөглөнө үү.' })
            }
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
            history.push('/urgudul/1')
        }
    }

    const [validate, setValidate] = useState(false)

    const checkInvalid = (value, type) => {
        switch (value) {
            case null:
                return true
            case '':
                return true
            case '<p><br></p>':
                if (type === 'quill') return true
                break
            default:
                return false
        }
    }

    return (
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center tw-text-15px">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2 tw-leading-5">B</span>
                - Төслийн задаргаа

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Түлхүүр албан тушаалтны жагсаалт, тэдгээрийн овог нэр, албан тушаалын хамт." position="bottom" />
            </div>

            <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-center">
                <div className="tw-w-full tw-max-w-lg tw-flex">
                    <FormInline label="Төслийн үргэлжлэх хугацаа" type="numberFormat" formats={{ format: '# сар' }} value={form.project_duration || ''} name="project_duration" onChange={handleInputFormat} classAppend="tw-flex-grow" classInput="tw-w-20" invalid={validate && checkInvalid(form.project_duration)} />

                    <div className="tw-relative tw-w-2">
                        <HelpPopup classAppend="tw-right-5 tw-top-1" main="Төслийг хэрэгжүүлэх нийт төслийн үргэлжлэх хугацаа. (Сараар)" position="top-left" />
                    </div>
                </div>

                <FormInline label="Төслийн эхлэх хугацаа" type="date" value={form.project_start || ''} name="project_start" onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" invalid={validate && checkInvalid(form.project_start)} />

                <FormInline label="Төслийн дуусах хугацаа" type="date" value={form.project_end || ''} name="project_end" onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" invalid={validate && checkInvalid(form.project_end)} />
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(form.project_introduction, 'quill') ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                    <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(form.project_introduction, 'quill') && 'tw-text-red-500'} tw-transition-colors`}>
                        Төслийн танилцуулга
                    </span>

                    <HelpPopup classAppend="tw-ml-auto" main="Одоогийн нөхцөл байдал, гол асуудал, төслийн агуулгын талаар товч танилцуулна." list={['Ямар зах зээлийн боломж харагдаж буй ба үүнийг хэрхэн тодорхойлсон бэ?', 'Потенциалт худалдан авагч нар хэн бэ? гэх зэргийг нарийн тодорхойлоно уу.']} position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                    <FormRichText modules="small" value={form.project_introduction || ''} name="project_introduction" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(form.preperation, 'quill') ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                    <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(form.preperation, 'quill') && 'tw-text-red-500'}`}>
                        Бэлтгэл ажил
                    </span>

                    <HelpPopup classAppend="tw-ml-auto" main="Төслийн бэлтгэл ажил хийгдсэн байгаа эсэх. Зорилтот зах зээлийн судалгаа, хэрэглэгчийн судалгаа хийсэн эсэх. Хэрэв тийм бол уг ажлын талаар товч тайлбар бичих. Бэлтгэл зах зээлийн судалгаа нь зах зээлийн боломжоо үр дүнтэй тодорхойлж чадаж буй эсэхэд хамгийн их нөлөөтэй болно." position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                    <FormRichText modules="small" value={form.preperation || ''} name="preperation" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(form.identified_problems, 'quill') ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                    <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(form.identified_problems, 'quill') && 'tw-text-red-500'} tw-transition-colors`}>
                        Тодорхойлсон асуудлууд
                    </span>

                    <HelpPopup classAppend="tw-ml-auto" main="Уг төслөөр ямар асуудлуудыг шийдвэрлэж, төслийн танилцуулгад тодорхойлсон зах зээлийн боломжийг ашиглах боломжтой болох вэ?" position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                    <FormRichText modules="small" value={form.identified_problems || ''} name="identified_problems" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(form.suggested_solutions, 'quill') ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                    <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(form.suggested_solutions, 'quill') && 'tw-text-red-500'} tw-transition-colors`}>
                        Санал болгож буй шийдэл
                    </span>

                    <HelpPopup classAppend="tw-ml-auto" main="Дээр тодорхойлсон асуудлуудыг шийдвэрлэхэд санал болгож буй ямар шийдлүүд байгаа вэ? Хувь аж ахуйн нэгжээрээ болон кластераар шийдвэрлэх үйл ажиллагааг санал болгоно уу." position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                    <FormRichText modules="small" value={form.suggested_solutions || ''} name="suggested_solutions" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(form.expected_result, 'quill') ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                    <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(form.expected_result, 'quill') && 'tw-text-red-500'}`}>
                        Төлөвлөсөн үйл ажиллагаа болон зорилтот хүлээгдэж буй үр дүн
                    </span>

                    <HelpPopup classAppend="tw-ml-auto" main="Уг төслийн хүрээнд хийхээр зорьж буй гол үйл ажиллагаануудыг тус бүрийн хүлээгдэж буй үр дүнтэй нь бичнэ үү" list={['Хэмжих хэмжүүрийг тодорхой бичнэ үү.', 'Үйл ажиллагаа нь практик бодит үр дүн авчрах ажил байхыг анхаарна уу.', '(Аж ахуйн нэгжийн болон кластераар хийх ажлуудыг тусад нь бичнэ.)']} position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                    <FormRichText modules="small" value={form.expected_result || ''} name="expected_result" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-6 tw-mb-4 tw-mr-4" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulBreakdown
