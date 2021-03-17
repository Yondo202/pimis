import FormInline from 'components/urgudul_components/formInline'
import FormRichText from 'components/urgudul_components/formRichText'
import React, { useState } from 'react'


const initialState = {
    fullname: '',
    regisration: '',
    phone: '',
    company_name: '',
    position: '',
    benefit: '',
    introduction_text: '',
    introduction_file: '',
    request: '',
    identity: '',
}

export default function TrainingRegistration() {
    const [file] = useState()

    return (
        <div className="tw-text-gray-700 tw-text-sm">
            <div className="tw-text-center tw-text-xl tw-font-semibold tw-mt-10">
                1. Сургалтанд бүртгүүлэх
            </div>

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-mt-6 tw-p-2 tw-max-w-7xl">
                {/* <FormInline label="Овог нэр" type="text" value={''} name="company_name" onChange={() => { }} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" /> */}

                <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Овог нэр
                    </div>
                    <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs" type="text" />
                </div>

                <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Рэгистрийн дугаар
                    </div>
                    <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs" type="number" />
                </div>

                <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Утасны дугаар
                    </div>
                    <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs" type="number" />
                </div>

                <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Байгууллагын нэр
                    </div>
                    <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs" type="text" />
                </div>

                <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Одоогийн ажлын албан тушаал
                    </div>
                    <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs" type="text" />
                </div>

                <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Манай сургалтад хамрагдах нь танд ямар ашиг тустай вэ? Энэхүү сургалтаас ямар үр дүн хүлээж байгаа вэ? (Бичих)
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                        <FormRichText modules="small" value={''} name="project_plan" setForm={() => { }} />
                    </div>
                </div>

                <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Та доорх хэсэгт өөрийн ажиллаж буй байгууллагын танилцуулгыг хавсаргана уу. (File-аар мөн бичих сонголттой)
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                        <FormRichText modules="small" value={''} name="project_plan" setForm={() => { }} />
                    </div>

                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Файл хавсаргах
                    </div>
                    <input className="" type="file" />
                </div>

                <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Та доорх хэсэгт ажилтнаа сургалтад хамруулах тухай байгууллагын хүсэлт, албан тоотыг хавсаргана уу (File-аар)
                    </div>

                    <input className="" type="file" />
                </div>

                <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                    <div className="tw-ml-1 tw-font-medium tw-text-15px">
                        Та доорх хэсэгт иргэний үнэмлэхний хуулбарыг хавсаргана уу.(File-аар)
                    </div>

                    <input className="" type="file" />
                </div>
            </div>

            <button className="tw-float-right tw-mt-6 tw-mr-4 tw-py-2 tw-px-8 tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-all tw-text-white tw-text-15px focus:tw-outline-none tw-rounded hover:tw-shadow-md">
                Хадгалах
            </button>
        </div >
    )
}