import React, { useState } from 'react'
import FormSmall from 'components/form_small/formSmall'


const initialState = [
    {
        company_name: '',
        representative_name: '',
        company_size: '',
        support_recipient: '',
        project_contribution: '',
    },
]

function UrugudulClusters() {
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
                    <div className="tw-flex" key={i}>
                        <div className="tw-flex-grow">
                            <FormSmall label="Кластерын гишүүн аж ахуйн нэгж" type="text" value={item.company_name} name="company_name" id={i} onChange={handleInput} />

                            <FormSmall label="Төлөөлөх албан тушаалтны нэр" type="text" value={item.representative_name} name="representative_name" id={i} onChange={handleInput} />

                            <FormSmall label="Аж ахуйн нэгжийн хэмжээ (Бичил/Жижиг/Дунд)" type="text" value={item.company_size} name="company_size" id={i} onChange={handleInput} />

                            <FormSmall label="Манай дэмжлэг хүртэгч мөн эсэх?" type="text" value={item.support_recipient} name="support_recipient" id={i} onChange={handleInput} />

                            <FormSmall label="Төслийн төлөвлөлт, гүйцэтгэлд оруулах хувь нэмэр" type="text" value={item.project_contribution} name="project_contribution" id={i} onChange={handleInput} />
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

export default UrugudulClusters
