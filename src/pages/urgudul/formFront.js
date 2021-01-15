import React, { useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import FormSmall from 'components/form_small/formSmall'
import UrgudulApplicant from './urgudul_a/form_a_1'
import UrugudulClusters from './urgudul_a/form_a_21'
import UrugudulDirectors from './urgudul_a/form_a_22'
import FormTextarea from 'components/form_textarea/formTextarea'
import FormTextareaCol from 'components/form_textarea_col/formTextareaCol'
import FormTextareaRow from 'components/form_textarea_row/formTextareaRow'
import UrgudulBreakdown from './urgudul_b/form_b'
import UrgudulActivities from './urgudul_b/form_b_6'
import UrgudulCalculations from './urgudul_b/form_b_8'
import UrgudulBudget from './urgudul_c/form_c'
import UrgudulNotice from './urgudul_d/form_d_1'
import UrgudulChecklist from './urgudul_e/form'
import HelpPopup from 'components/helpModal/helpPopup'


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
                <div className="tw-text-lg tw-font-medium tw-p-3 tw-flex tw-justify-center">
                    Санхүүгийн дэмжлэг хүсэх өргөдлийн маягт
                </div>

                <div className="tw-mt-4 tw-p-2 tw-pl-4 tw-flex tw-flex-col sm:tw-flex-row tw-items-center">
                    <label className="tw-font-medium tw-w-full sm:tw-w-2/6 sm:tw-text-center">
                        Өргөдлийн төрөл:
                    </label>

                    <button className={`sm:tw-ml-6 tw-mb-2 tw-w-full sm:tw-flex-grow sm:tw-w-40 tw-py-1 tw-px-2 tw-rounded-lg tw-shadow-md tw-inline-flex tw-justify-between tw-items-center focus:tw-outline-none tw-transition-colors tw-duration-300 ${form.project_type === 'company' ? 'tw-bg-gradient-to-r tw-from-blue-400 tw-to-blue-500 tw-text-gray-50' : 'tw-border tw-box-border tw-border-blue-500 tw-text-blue-500'}`} onClick={() => handleClickForm('project_type', 'company')} >
                        <span className="tw-ml-2">Аж ахуй нэгж</span>
                        <div className={`tw-w-4 tw-h-4 tw-border tw-rounded-full tw-inline-flex tw-justify-center tw-items-center ${form.project_type === 'company' ? 'tw-border-gray-50' : 'tw-border-blue-500'}`}>
                            {
                                form.project_type === 'company' &&
                                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-gray-50" />
                            }
                        </div>
                    </button>

                    <button className={`sm:tw-ml-6 tw-mb-2 tw-w-full sm:tw-flex-grow sm:tw-w-40 tw-py-1 tw-px-2 tw-rounded-lg tw-shadow-md tw-inline-flex tw-justify-between tw-items-center focus:tw-outline-none tw-transition-colors tw-duration-300 ${form.project_type === 'cluster' ? 'tw-bg-gradient-to-r tw-from-green-400 tw-to-green-500 tw-text-gray-50' : 'tw-border tw-box-border tw-border-green-500 tw-text-green-500'}`} onClick={() => handleClickForm('project_type', 'cluster')} >
                        <span className="tw-ml-2">Кластер</span>
                        <div className={`tw-w-4 tw-h-4 tw-border tw-rounded-full tw-inline-flex tw-justify-center tw-items-center ${form.project_type === 'cluster' ? 'tw-border-gray-50' : 'tw-border-green-500'}`}>
                            {
                                form.project_type === 'cluster' &&
                                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-gray-50" />
                            }
                        </div>
                    </button>
                </div>

                <FormInline label={form.project_type === 'cluster' ? 'Кластерын тэргүүлэгч байгууллагын нэр:' : 'Аж ахуйн нэгжийн нэр'} type="text" value={form.company_name} name="company_name" onChange={handleInput} classAppend="tw-max-w-lg tw-mx-auto" classInput="tw-w-full" />

                <FormInline label="Төслийн нэр" type="text" value={form.project_name} name="company_name" onChange={handleInput} classAppend="tw-max-w-lg tw-mx-auto" classInput="tw-w-full" />
            </div>

            {/* <UrgudulApplicant />

            <UrugudulClusters />

            <UrugudulDirectors />

            <FormTextareaCol label="Өргөдөл гаргагч ААН, кластерын хувьд кластерын хамтрагч талуудын товч танилцуулга:" />

            <FormTextareaCol label="Өргөдөл гаргагч ААН/кластерын төслийг хэрэгжүүлэх техникийн туршлага:" />

            <UrgudulBreakdown />

            <UrgudulActivities />

            <UrgudulCalculations />

            <UrgudulBudget />

            <UrgudulNotice />

            <HelpPopup classAppend="tw-float-right" main="" position="" />

            <UrgudulChecklist /> */}
        </div>
    )
}

export default UrgudulFront
