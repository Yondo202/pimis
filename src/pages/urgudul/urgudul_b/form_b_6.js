import FormTextareaCol from 'components/form_textarea_col/formTextareaCol'
import React, { useState } from 'react'


const initialState = [
    {
        activity: '',
    },
]


function UrgudulActivities() {
    const [form, setForm] = useState(initialState)

    const handleInput = (e) => {
        const newForm = form
        newForm[e.target.id][e.target.name] = e.target.value
        setForm([...newForm])
    }

    const handleAdd = () => {
        setForm([...form, { ...initialState[0] }])
    }

    const handleRemove = (index) => {
        setForm(form.filter((_, i) => i !== index))
    }

    return (
        <div className="tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            {
                form.map((item, i) =>
                    <div className="tw-flex tw-flex-nowrap tw-items-center" key={i}>
                        <FormTextareaCol label="Аж ахуйн нэгжээр хийх үйл ажиллагаа:" value={item.activity} name="activity" id={i} onChange={handleInput} />

                        <button className="tw-bg-red-500 tw-text-white tw-p-1" onClick={() => handleRemove(i)}>
                            Хасах
                        </button>
                    </div>
                )
            }

            <div className="">
                <button className="tw-bg-green-500 tw-text-white tw-p-1" onClick={handleAdd}>
                    Нэмэх
                </button>
            </div>
        </div>
    )
}

export default UrgudulActivities
