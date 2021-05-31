import React, { useContext, useEffect, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/help_popup/helpPopup'
import FormRichText from 'components/urgudul_components/formRichText'
import PenSVG from 'assets/svgComponents/penSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'


const initialState = {
    sales_growth: null,
    export_growth: null,
    profit_growth: null,
    efficiency_growth: null,
    workplace_growth: null,
    growths_explanation: null,
    assumptions: null,
}

const quillTypes = ['growths_explanation', 'assumptions']

function UrgudulBenefits() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.benefit) {
            setForm({ ...form, ...UrgudulCtx.data.benefit })
        }
    }, [UrgudulCtx.data.id])

    const handleInputFormat = (values, name) => {
        setForm({ ...form, [name]: values.value })
    }

    const handleSetForm = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        const allValid = Object.keys(initialState).every(key => !checkInvalid(form[key], quillTypes.includes(key) && 'quill'))

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, { benefit: form }, {
                    headers: {
                        'Authorization': getLoggedUserToken()
                    }
                }).then(res => {
                    UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Төслийн үр ашгийн талаарх мэдээлэл хадгалагдлаа.' })
                    history.push('/urgudul/8')
                }).catch(err => {
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
                else return false
            default:
                return false
        }
    }

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="">
                <div className="tw-font-medium tw-p-3 tw-flex tw-items-center tw-text-15px">
                    <span className="tw-text-blue-500 tw-text-xl tw-mx-2">B7</span>
                    <span className="tw-leading-tight">- Төслийн үр ашгийн талаар</span>

                    <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Экспортын орлогын өсөлт, ашгийн өсөлт, бүтээмжийн өсөлт, ажлын байрны өсөлт бүр дээр ямар үр ашиг хүлээгдэж буйг тоон хэмжээгээр болон тайлбарлан бичнэ үү." position="bottom" />
                </div>

                {UrgudulCtx.data.project_number &&
                    <div className="tw-ml-5 tw-mb-2 tw-font-medium tw-text-13px">
                        Өргөдлийн дугаар:
                        <span className="tw-text-blue-500 tw-ml-2">{UrgudulCtx.data.project_number}</span>
                    </div>
                }
            </div>

            <div className="tw-w-full">
                <div className={`tw-p-2 tw-pb-0 tw-pl-4 tw-text-sm tw-font-medium ${validate && checkInvalid(form.growths_explanation, 'quill') && 'tw-text-red-500'} tw-transition-colors`}>
                    Төсөлд хамрагдсанаар дараах үзүүлэлтүүдэд гарах өсөлтийн хувиуд болон тайлбар
                </div>

                <div className="tw-flex-grow tw-flex tw-flex-wrap">
                    <FormInline label="Борлуулалт:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.sales_growth || ''} name="sales_growth" onChange={handleInputFormat} classInput="tw-w-24" invalid={validate && checkInvalid(form.sales_growth)} />

                    <FormInline label="Экспорт:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.export_growth || ''} name="export_growth" onChange={handleInputFormat} classInput="tw-w-24" invalid={validate && checkInvalid(form.export_growth)} />

                    <FormInline label="Ашиг:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.profit_growth || ''} name="profit_growth" onChange={handleInputFormat} classInput="tw-w-24" invalid={validate && checkInvalid(form.profit_growth)} />

                    <FormInline label="Бүтээмж:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.efficiency_growth || ''} name="efficiency_growth" onChange={handleInputFormat} classInput="tw-w-24" invalid={validate && checkInvalid(form.efficiency_growth)} />

                    <FormInline label="Ажлын байр:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.workplace_growth || ''} name="workplace_growth" onChange={handleInputFormat} classInput="tw-w-24" invalid={validate && checkInvalid(form.workplace_growth)} />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                    <FormRichText modules="small" value={form.growths_explanation || ''} name="growths_explanation" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(form.assumptions, 'quill') ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                    <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(form.assumptions, 'quill') && 'tw-text-red-500'} tw-transition-colors`}>
                        Таамаглал
                    </span>

                    <HelpPopup classAppend="tw-ml-auto" main="Дээр дурдсан таамаглалыг тооцоолсон үндэслэл, шалтгааныг энд тайлбарлана уу." position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                    <FormRichText modules="small" value={form.assumptions || ''} name="assumptions" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-6 tw-mb-4 tw-mr-4" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulBenefits
