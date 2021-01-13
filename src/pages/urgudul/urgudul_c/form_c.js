import FormSmall from 'components/form_small/formSmall'
import React, { useState } from 'react'


const initialState = [
    {
        activity: '',
        budget_cost: '',
        edp_funding: '',
        applicant_contribution: '',
    },
]

function UrgudulBudget() {
    const [form, setForm] = useState(initialState)

    const handleInput = (e) => {
        const newForm = form
        newForm[e.target.id][e.target.name] = e.target.value
        setForm([...newForm])
    }

    return (
        <div className="tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            {
                form.map((item, i) =>
                    <div className="">
                        <label>{item.activity}</label>

                        <FormSmall label="Үйл ажиллагааны төсөвт зардал ($)" type="text" value={item.budget_cost} name="budget_cost" id={i} onChange={handleInput} />

                        <FormSmall label="ЭДТ-с санхүүжилт ($)" type="text" value={item.edp_funding} name="edp_funding" id={i} onChange={handleInput} />

                        <FormSmall label="Өргөдөл гаргагчийн оролцоо (бэлэн мөнгө)" type="text" value={item.applicant_contribution} name="applicant_contribution" id={i} onChange={handleInput} />
                    </div>
                )
            }
        </div>
    )
}

export default UrgudulBudget
