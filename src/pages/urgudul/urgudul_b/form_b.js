import React, { useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/helpModal/helpPopup'
import PenSVG from 'assets/svgComponents/penSVG'
import FormRichText from 'components/urgudul_components/formRichText'


const initialState = {
    project_duration: '',
    start_date: '',
    end_date: '',
    project_introduction: '',
    preperation: '',
    identified_problems: '',
    suggested_solutions: '',
    expected_result: '',
}

function UrgudulBreakdown() {
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
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">B</span>
                - Төслийн задаргаа

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Түлхүүр албан тушаалтны жагсаалт, тэдгээрийн овог нэр, албан тушаалын хамт." position="bottom" />
            </div>

            <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-center">
                <div className="tw-border tw-border-dashed tw-w-full tw-max-w-lg tw-flex">
                    <FormInline label="Төслийн үргэлжлэх хугацаа" type="numberFormat" formats={{ format: '# сар' }} value={form.project_duration} name="project_duration" onChange={handleInputFormat} classAppend="tw-flex-grow" classInput="tw-w-20" />

                    <div className="tw-relative tw-w-2">
                        <HelpPopup classAppend="tw-right-5 tw-top-1" main="Төслийг хэрэгжүүлэх нийт төслийн үргэлжлэх хугацаа. (Сараар)" position="top-left" />
                    </div>
                </div>

                <FormInline label="Төслийн үргэлжлэх хугацаа" type="date" value={form.start_date} name="start_date" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-40" />

                <FormInline label="Төслийн үргэлжлэх хугацаа" type="date" value={form.end_date} name="end_date" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-40" />
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className="tw-w-6 tw-h-6 tw-text-gray-600" />
                    <span className="tw-ml-2 tw-text-sm tw-font-medium">Төслийн танилцуулга</span>

                    <HelpPopup classAppend="tw-ml-auto" main="Одоогийн нөхцөл байдал, гол асуудал, төслийн агуулгын талаар товч танилцуулна." list={['Ямар зах зээлийн боломж харагдаж буй ба үүнийг хэрхэн тодорхойлсон бэ?', 'Потенциалт худалдан авагч нар хэн бэ? гэх зэргийг нарийн тодорхойлоно уу.']} position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y" style={{ resize: 'vertical', overflowY: 'auto' }}>
                    <FormRichText modules="small" value={form.project_introduction} name="project_introduction" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className="tw-w-6 tw-h-6 tw-text-gray-600" />
                    <span className="tw-ml-2 tw-text-sm tw-font-medium">Бэлтгэл ажил</span>

                    <HelpPopup classAppend="tw-ml-auto" main="Төслийн бэлтгэл ажил хийгдсэн байгаа эсэх. Зорилтот зах зээлийн судалгаа, хэрэглэгчийн судалгаа хийсэн эсэх. Хэрэв тийм бол уг ажлын талаар товч тайлбар бичих. Бэлтгэл зах зээлийн судалгаа нь зах зээлийн боломжоо үр дүнтэй тодорхойлж чадаж буй эсэхэд хамгийн их нөлөөтэй болно." position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y" style={{ resize: 'vertical', overflowY: 'auto' }}>
                    <FormRichText modules="small" value={form.preperation} name="preperation" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className="tw-w-6 tw-h-6 tw-text-gray-600" />
                    <span className="tw-ml-2 tw-text-sm tw-font-medium">Тодорхойлсон асуудлууд</span>

                    <HelpPopup classAppend="tw-ml-auto" main="Уг төслөөр ямар асуудлуудыг шийдвэрлэж, төслийн танилцуулгад тодорхойлсон зах зээлийн боломжийг ашиглах боломжтой болох вэ?" position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y" style={{ resize: 'vertical', overflowY: 'auto' }}>
                    <FormRichText modules="small" value={form.identified_problems} name="identified_problems" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className="tw-w-6 tw-h-6 tw-text-gray-600" />
                    <span className="tw-ml-2 tw-text-sm tw-font-medium">Санал болгож буй шийдэл</span>

                    <HelpPopup classAppend="tw-ml-auto" main="Дээр тодорхойлсон асуудлуудыг шийдвэрлэхэд санал болгож буй ямар шийдлүүд байгаа вэ? Хувь аж ахуйн нэгжээрээ болон кластераар шийдвэрлэх үйл ажиллагааг санал болгоно уу." position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y" style={{ resize: 'vertical', overflowY: 'auto' }}>
                    <FormRichText modules="small" value={form.suggested_solutions} name="suggested_solutions" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className="tw-w-6 tw-h-6 tw-text-gray-600" />
                    <span className="tw-ml-2 tw-text-sm tw-font-medium">Төлөвлөсөн үйл ажиллагаа болон зорилтот хүлээгдэж буй үр дүн</span>

                    <HelpPopup classAppend="tw-ml-auto" main="Уг төслийн хүрээнд хийхээр зорьж буй гол үйл ажиллагаануудыг тус бүрийн хүлээгдэж буй үр дүнтэй нь бичнэ үү" list={['Хэмжих хэмжүүрийг тодорхой бичнэ үү.', 'Үйл ажиллагаа нь практик бодит үр дүн авчрах ажил байхыг анхаарна уу.', '(Аж ахуйн нэгжийн болон кластераар хийх ажлуудыг тусад нь бичнэ.)']} position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y" style={{ resize: 'vertical', overflowY: 'auto' }}>
                    <FormRichText modules="small" value={form.expected_result} name="expected_result" setForm={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

export default UrgudulBreakdown
