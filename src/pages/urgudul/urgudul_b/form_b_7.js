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
        setForm({ ...form, [key]: value })
    }

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        const allValid = Object.keys(initialState).every(key => !checkInvalid(form[key]))

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, { benefit: form }, {
                    headers: {
                        'Authorization': getLoggedUserToken()
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                        AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Төслийн үр ашгийн талаарх мэдээлэл хадгалагдлаа.' })
                        history.push('/urgudul/8')
                    })
                    .catch(err => {
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
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2 tw-leading-5">B7</span>
                - Төслийн үр ашгийн талаар

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Экспортын орлогын өсөлт, ашгийн өсөлт, бүтээмжийн өсөлт, ажлын байрны өсөлт бүр дээр ямар үр ашиг хүлээгдэж буйг тоон хэмжээгээр болон тайлбарлан бичнэ үү." position="bottom" />
            </div>

            <div className="tw-p-2 tw-pl-4 tw-text-sm tw-font-medium tw-border tw-border-dashed">
                Өсөлтийн хувиудыг нь оруулна уу.
            </div>

            <div className="tw-flex-grow tw-flex tw-flex-wrap">
                <FormInline label="Борлуулалт:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.sales_growth || ''} name="sales_growth" onChange={handleInputFormat} classAppend={validate && checkInvalid(form.sales_growth) && 'tw-border tw-border-dashed tw-border-red-500'} classInput="tw-w-24" />

                <FormInline label="Экспорт:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.export_growth || ''} name="export_growth" onChange={handleInputFormat} classAppend={validate && checkInvalid(form.export_growth) && 'tw-border tw-border-dashed tw-border-red-500'} classInput="tw-w-24" />

                <FormInline label="Ашиг:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.profit_growth || ''} name="profit_growth" onChange={handleInputFormat} classAppend={validate && checkInvalid(form.profit_growth) && 'tw-border tw-border-dashed tw-border-red-500'} classInput="tw-w-24" />

                <FormInline label="Бүтээмж:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.efficiency_growth || ''} name="efficiency_growth" onChange={handleInputFormat} classAppend={validate && checkInvalid(form.efficiency_growth) && 'tw-border tw-border-dashed tw-border-red-500'} classInput="tw-w-24" />

                <FormInline label="Ажлын байр:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.workplace_growth || ''} name="workplace_growth" onChange={handleInputFormat} classAppend={validate && checkInvalid(form.workplace_growth) && 'tw-border tw-border-dashed tw-border-red-500'} classInput="tw-w-24" />
            </div>

            <div className={`tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden ${validate && checkInvalid(form.growths_explanation, 'quill') && 'tw-border tw-border-dashed tw-border-red-500'}`} style={{ minHeight: '128px', maxHeight: '768px' }}>
                <FormRichText modules="small" value={form.growths_explanation || ''} name="growths_explanation" setForm={handleSetForm} />
            </div>

            <div className="tw-w-full tw-border tw-border-dashed">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className="tw-w-5 tw-h-5 tw-text-gray-600" />
                    <span className="tw-ml-2 tw-text-sm tw-font-medium">Таамаглал</span>

                    <HelpPopup classAppend="tw-ml-auto" main="Дээр дурдсан таамаглалыг тооцоолсон үндэслэл, шалтгааныг энд тайлбарлана уу." position="top-left" />
                </div>

                <div className={`tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden ${validate && checkInvalid(form.assumptions, 'quill') && 'tw-border tw-border-dashed tw-border-red-500'}`} style={{ minHeight: '128px', maxHeight: '768px' }}>
                    <FormRichText modules="small" value={form.assumptions || ''} name="assumptions" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4" classButton="tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulBenefits
