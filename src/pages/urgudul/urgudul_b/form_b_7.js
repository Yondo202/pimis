import FormSmall from 'components/form_small/formSmall'
import FormTextareaCol from 'components/form_textarea_col/formTextareaCol'
import React, { useState } from 'react'


const initialState = {
    sales_growth: '',
    export_growth: '',
    profit_growth: '',
    efficiency_growth: '',
    explanation_growth: '',
    assumptions: '',
}

function UrgudulBenefits() {
    const [form, setForm] = useState(initialState)

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <FormSmall label="Борлуулалт:" type="text" value={form.sales_growth} name="sales_growth" onChange={handleInput} />

            <FormSmall label="Экспорт:" type="text" value={form.sales_growth} name="sales_growth" onChange={handleInput} />

            <FormSmall label="Ашиг:" type="text" value={form.sales_growth} name="sales_growth" onChange={handleInput} />

            <FormSmall label="Бүтээмж:" type="text" value={form.sales_growth} name="sales_growth" onChange={handleInput} />

            <FormSmall label="Ажлын байр:" type="text" value={form.sales_growth} name="sales_growth" onChange={handleInput} />

            <FormTextareaCol label="Таамаглал:" value={form.assumptions} name="assumptions" onChange={handleInput} />
        </div>
    )
}

export default UrgudulBenefits
