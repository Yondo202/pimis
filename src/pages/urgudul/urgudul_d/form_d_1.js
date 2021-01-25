import FormSmall from 'components/form_small/formSmall'
import React, { useState } from 'react'
import { IoRemove } from 'react-icons/io5'


const initialState = [
    {
        compnay_name: '',
        representative_position: '',
        representative_name: '',
        representative_signature: '',
        date: '',
    },
]

function UrgudulNotice() {
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
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            {
                form.map((item, i) =>
                    <div className="tw-flex" key={i}>
                        <div className="tw-flex-grow">
                            <FormSmall label="ААН нэр:" type="text" value={item.compnay_name} name="compnay_name" id={i} onChange={handleInput} />

                            <FormSmall label="Албан тушаал:" type="text" value={item.representative_position} name="representative_position" id={i} onChange={handleInput} />

                            <FormSmall label="Овог, нэр:" type="text" value={item.representative_name} name="representative_name" id={i} onChange={handleInput} />

                            <FormSmall label="Гарын үсэг:" type="text" value={IoRemove.representative_signature} name="representative_signature" id={i} onChange={handleInput} />

                            <FormSmall label="Огноо:" type="text" value={item.date} name="date" id={i} onChange={handleInput} />
                        </div>

                        <div className="tw-flex tw-items-center">
                            <button className="tw-bg-red-500 tw-text-white tw-p-1" onClick={() => handleRemove(i)}>
                                Хасах
                            </button>
                        </div>
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

export default UrgudulNotice
