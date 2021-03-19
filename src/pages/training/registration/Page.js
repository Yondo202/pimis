import React, { useRef, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import FormRichText from 'components/urgudul_components/formRichText'
import PaperClipSVG from 'assets/svgComponents/paperClipSVG'
import { Transition } from 'react-spring/renderprops-universal'
import FileCard from 'pages/attachments/fileCard'


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
    const [form, setForm] = useState(initialState)

    const fileInputRef = useRef(null)

    const introductionFileGiven = form.introduction_file ? true : false

    return (
        <div className="tw-text-gray-700 tw-text-sm tw-flex tw-justify-center tw-w-full tw-px-4">
            <div className="tw-max-w-5xl tw-w-full tw-shadow-md tw-rounded tw-p-2 tw-mt-10 tw-bg-white">
                <div className="tw-text-center tw-text-xl tw-font-semibold tw-mt-6">
                    1. Сургалтанд бүртгүүлэх
                </div>

                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-mt-8 tw-p-2 tw-max-w-7xl">
                    {/* <FormInline label="Овог нэр" type="text" value={''} name="company_name" onChange={() => { }} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" /> */}

                    <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Овог нэр
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs tw-rounded tw-border tw-border-gray-500" type="text" />
                    </div>

                    <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Рэгистрийн дугаар
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs tw-rounded tw-border tw-border-gray-500" type="number" />
                    </div>

                    <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Утасны дугаар
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs tw-rounded tw-border tw-border-gray-500" type="number" />
                    </div>

                    <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Байгууллагын нэр
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs tw-rounded tw-border tw-border-gray-500" type="text" />
                    </div>

                    <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Одоогийн ажлын албан тушаал
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs tw-rounded tw-border tw-border-gray-500" type="text" />
                    </div>

                    <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full md:tw-col-span-2">
                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Манай сургалтад хамрагдах нь танд ямар ашиг тустай вэ? Энэхүү сургалтаас ямар үр дүн хүлээж байгаа вэ? (Бичих)
                        </div>

                        <div className="tw-py-2 tw-px-1 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                            <FormRichText modules="small" value={''} name="project_plan" setForm={() => { }} />
                        </div>
                    </div>

                    <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full tw-justify-items-start md:tw-col-span-2">
                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Та доорх хэсэгт өөрийн ажиллаж буй байгууллагын танилцуулгыг хавсаргана уу. (File-аар мөн бичих сонголттой)
                        </div>

                        <div className="tw-py-2 tw-px-1 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-w-full" style={{ minHeight: '128px', maxHeight: '768px' }}>
                            <FormRichText modules="small" value={''} name="project_plan" setForm={() => { }} />
                        </div>

                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Файл хавсаргах
                        </div>

                        <Transition
                            items={introductionFileGiven}
                            from={{ opacity: 0 }}
                            enter={{ opacity: 1 }}
                            leave={{ opacity: 0 }}>
                            {item => item
                                ? anims => <div className="" style={anims}>
                                    <FileCard />
                                </div>
                                : anims => <div className="" style={anims}>
                                    <FileAttachButton onClick={() => fileInputRef.current.click()} />
                                </div>
                            }
                        </Transition>
                    </div>

                    <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full tw-justify-items-start md:tw-col-span-2">
                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Та доорх хэсэгт ажилтнаа сургалтад хамруулах тухай байгууллагын хүсэлт, албан тоотыг хавсаргана уу (File-аар)
                        </div>
                        <FileAttachButton />
                    </div>

                    <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full tw-justify-items-start md:tw-col-span-2">
                        <div className="tw-ml-1 tw-font-medium tw-text-15px">
                            Та доорх хэсэгт иргэний үнэмлэхний хуулбарыг хавсаргана уу.(File-аар)
                        </div>

                        <FileAttachButton />
                    </div>
                </div>

                <input className="tw-invisible tw-h-0 tw-absolute" type="file" ref={fileInputRef} />

                <div className="tw-flex tw-justify-center">
                    <button className="tw-my-4 tw-py-2 tw-px-8 tw-bg-blue-900 active:tw-bg-blue-800 tw-transition-all tw-text-white tw-text-15px focus:tw-outline-none tw-rounded hover:tw-shadow-md">
                        Хадгалах
                    </button>
                </div>
            </div>
        </div >
    )
}

const FileAttachButton = (props) => (
    <button className="tw-ml-6 tw-mb-4 tw-pt-2 tw-pb-1.5 tw-px-6 tw-text-sm tw-border tw-border-gray-500 tw-font-medium tw-rounded focus:tw-outline-none hover:tw-shadow-md tw-inline-flex tw-items-center tw-transition-colors active:tw-bg-gray-200" onClick={props.onClick}>
        <span className="">Файл оруулах</span>
        <PaperClipSVG className="tw-w-4 tw-h-4 tw-ml-0.5" />
    </button>
)