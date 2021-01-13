import FormSmall from 'components/form_small/formSmall'
import React, { useState } from 'react'

const initialState = {
    project_duration: '',
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

    return (
        <div className="tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <FormSmall label="Төслийг хэрэгжүүлэх нийт төслийн үргэлжлэх хугацаа (сараар):" type="text" value={form.project_duration} name="project_duration" onChange={handleInput} />

            <FormSmall label="Төслийн танилцуулга:" type="text" value={form.project_introduction} name="project_introduction" onChange={handleInput} />

            <FormSmall label="Бэлтгэл ажил:" type="text" value={form.preperation} name="preperation" onChange={handleInput} />

            <FormSmall label="Тодорхойлсон асуудлууд:" type="text" value={form.identified_problems} name="identified_problems" onChange={handleInput} />

            <FormSmall label="Санал болгож буй шийдэл:" type="text" value={form.suggested_solutions} name="suggested_solutions" onChange={handleInput} />
        </div>
    )
}

export default UrgudulBreakdown
