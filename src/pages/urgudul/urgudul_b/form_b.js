import React, { useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/helpModal/helpPopup'


const initialState = {
    project_duration: '',
    start_date: '',
    end_date: '',
    project_introduction: '',
    preperation: '',
    identified_problems: '',
    suggested_solutions: '',
}

function UrgudulBreakdown() {
    const [form, setForm] = useState(initialState)

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleInputFormat = (values, name) => {
        setForm({ ...form, [name]: values.value })
    }

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mr-2">B</span>
                - Төслийн задаргаа

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="ТТүлхүүр албан тушаалтны жагсаалт, тэдгээрийн овог нэр, албан тушаалын хамт." position="bottom" />
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

                <FormInline label="Төслийн танилцуулга" type="text" value={form.project_introduction} name="project_introduction" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                <FormInline label="Бэлтгэл ажил" type="text" value={form.preperation} name="preperation" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                <FormInline label="Тодорхойлсон асуудлууд" type="text" value={form.identified_problems} name="identified_problems" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                <FormInline label="Санал болгож буй шийдэл" type="text" value={form.suggested_solutions} name="suggested_solutions" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />
            </div>
        </div>
    )
}

export default UrgudulBreakdown
