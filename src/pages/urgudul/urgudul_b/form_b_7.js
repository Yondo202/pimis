import React, { useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import FormSmall from 'components/form_small/formSmall'
import FormTextareaCol from 'components/form_textarea_col/formTextareaCol'
import HelpPopup from 'components/helpModal/helpPopup'
import FormRichText from 'components/urgudul_components/formRichText'
import PenSVG from 'assets/svgComponents/penSVG'


const initialState = {
    sales_growth: '',
    export_growth: '',
    profit_growth: '',
    efficiency_growth: '',
    workplace_growth: '',
    growths_explanation: '',
    assumptions: '',
}

function UrgudulBenefits() {
    const [form, setForm] = useState(initialState)

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleInputFormat = (values, name) => {
        setForm({ ...form, [name]: values.value })
    }

    const handleSetForm = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">B7</span>
                - Төслийн үр ашгийн талаар

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Экспортын орлогын өсөлт, ашгийн өсөлт, бүтээмжийн өсөлт, ажлын байрны өсөлт бүр дээр ямар үр ашиг хүлээгдэж буйг тоон хэмжээгээр болон тайлбарлан бичнэ үү." position="bottom" />
            </div>

            <div className="tw-p-2 tw-pl-4 tw-text-sm tw-font-medium tw-border tw-border-dashed">
                Өсөлтийн хувиудыг нь оруулна уу.
            </div>

            <div className="tw-flex-grow tw-flex tw-flex-wrap">
                <FormInline label="Борлуулалт:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.sales_growth} name="sales_growth" onChange={handleInputFormat} classInput="tw-w-24" />

                <FormInline label="Экспорт:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.export_growth} name="export_growth" onChange={handleInputFormat} classInput="tw-w-24" />

                <FormInline label="Ашиг:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.profit_growth} name="profit_growth" onChange={handleInputFormat} classInput="tw-w-24" />

                <FormInline label="Бүтээмж:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.efficiency_growth} name="efficiency_growth" onChange={handleInputFormat} classInput="tw-w-24" />

                <FormInline label="Ажлын байр:" type="numberFormat" formats={{ thousandSeparator: true, suffix: ' %' }} value={form.workplace_growth} name="workplace_growth" onChange={handleInputFormat} classInput="tw-w-24" />
            </div>

            <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-border tw-border-dashed" style={{ resize: 'vertical', overflowY: 'auto' }}>
                <FormRichText modules="small" value={form.growths_explanation} name="growths_explanation" setForm={handleSetForm} />
            </div>

            <div className="tw-w-full tw-border tw-border-dashed">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className="tw-w-6 tw-h-6 tw-text-gray-600" />
                    <span className="tw-ml-2 tw-text-sm tw-font-medium">Таамаглал</span>

                    <HelpPopup classAppend="tw-ml-auto" main="Дээр дурдсан таамаглалыг тооцоолсон үндэслэл, шалтгааныг энд тайлбарлана уу." position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y" style={{ resize: 'vertical', overflowY: 'auto' }}>
                    <FormRichText modules="small" value={form.assumptions} name="assumptions" setForm={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

export default UrgudulBenefits
