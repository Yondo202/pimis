import React, { useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'


const initialState = {
    project_type: '',
    company_name: '',
    project_name: '',
}

function UrgudulFront() {
    const [form, setForm] = useState(initialState)

    const handleClickForm = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="tw-w-full tw-max-w-5xl tw-mx-auto tw-text-gray-700">
            <div className="tw-mt-8 tw-p-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
                <div className="tw-text-2xl tw-font-semibold tw-py-8 tw-px-4 tw-text-center tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-blue-500 tw-to-green-500">
                    Түншлэлийн дэмжлэг хүсэх өргөдлийн маягт
                </div>

                <div className="tw-my-2 tw-flex tw-flex-col tw-items-center">
                    <div className="tw-pl-11 tw-pr-3 tw-flex tw-flex-col tw-w-full tw-max-w-md">
                        <div className="tw-mt-4 tw-font-medium">
                            Өргөдлийн төрөл:
                        </div>

                        <button className={`tw-mt-4 tw-p-1.5 tw-border tw-rounded-lg tw-flex tw-items-center focus:tw-outline-none tw-transition-colors tw-duration-300 ${form.project_type === 'company' && 'tw-border-blue-500'}`} onClick={() => handleClickForm('project_type', 'company')} >
                            <div className={`tw-ml-1 tw-w-4 tw-h-4 tw-border tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-transition-colors tw-duration-300 ${form.project_type === 'company' ? 'tw-border-blue-500' : 'tw-border-gray-700'}`}>
                                <span className={`tw-w-2 tw-h-2 tw-rounded-full ${form.project_type === 'company' ? 'tw-bg-blue-500' : 'tw-bg-transparent'} tw-transition-colors tw-duration-300`} />
                            </div>

                            <span className="tw-ml-2 tw-text-sm">Аж ахуй нэгж</span>
                        </button>

                        <button className={`tw-my-2 tw-p-1.5 tw-border tw-rounded-lg tw-flex tw-items-center focus:tw-outline-none tw-transition-colors tw-duration-300 ${form.project_type === 'cluster' && 'tw-border-green-500'}`} onClick={() => handleClickForm('project_type', 'cluster')} >
                            <div className={`tw-ml-1 tw-w-4 tw-h-4 tw-border tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-transition-colors tw-duration-300 ${form.project_type === 'cluster' ? 'tw-border-green-500' : 'tw-border-gray-700'}`}>
                                <span className={`tw-w-2 tw-h-2 tw-rounded-full ${form.project_type === 'cluster' ? 'tw-bg-green-500' : 'tw-bg-transparent'} tw-transition-colors tw-duration-300`} />
                            </div>

                            <span className="tw-ml-2 tw-text-sm">Кластер</span>
                        </button>
                    </div>

                    <FormInline label={form.project_type === 'cluster' ? 'Кластерын тэргүүлэгч байгууллагын нэр:' : 'Аж ахуйн нэгжийн нэр'} type="text" value={form.company_name} name="company_name" onChange={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" />

                    <FormInline label="Төслийн нэр" type="text" value={form.project_name} name="project_name" onChange={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" />
                </div>
            </div>
        </div>
    )
}

export default UrgudulFront
