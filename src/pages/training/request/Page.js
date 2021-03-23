import HelpPopup from 'components/help_popup/helpPopup'
import FormRichText from 'components/urgudul_components/formRichText'
import React, { useState } from 'react'


const initialState = {
    needs: null,
    expectation: null,
    fullname: null,
    position: null,
    phone: null,
    introduction: null,
    sector: null,
    registration: null,
    email: null,
    trainee_count: null,
}

export default function TrainingRequest() {
    const [form, setForm] = useState(initialState)

    const handleInput = (key, value) => setForm({ ...form, [key]: value })

    return (
        <div className="tw-text-gray-700 tw-text-sm tw-flex tw-justify-center tw-w-full tw-px-4">
            <div className="tw-max-w-5xl tw-w-full tw-shadow-md tw-rounded tw-p-2 tw-mt-10 tw-mb-20 tw-bg-white">
                <div className="tw-text-center tw-text-xl tw-font-medium tw-mt-6">
                    2. Захиалгат сургалтын хүсэлт авах
                </div>

                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-mt-8 tw-p-2">
                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full md:tw-col-span-2">
                        <div className="tw-flex tw-items-center ">
                            <span className="tw-font-medium">Сургалтын хэрэгцээ, шаардлага</span>

                            <HelpPopup classAppend="" main="Та ямар чиглэлээр ямар сургалт авах хүсэлтэй байгаа вэ? Тухайн сургалтад хамрагдах зорилго нь юу вэ? Та сургалтын хэрэгцээ, шаардлагаа тодорхой бичнэ үү." position="bottom" />
                        </div>

                        <div className="tw-mt-1 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-w-full tw-max-w-3xl" style={{ minHeight: '128px', maxHeight: '768px' }}>
                            <FormRichText modules="small" value={form.needs} name="needs" setForm={handleInput} />
                        </div>
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full md:tw-col-span-2">
                        <div className="tw-flex tw-items-center">
                            <span className="tw-font-medium">Сургалтаас ямар үр дүн хүлээж байна вэ?</span>

                            <HelpPopup classAppend="" main="Та сургалтад хамрагдсанаар ямар ур чадвар эзэмших вэ? Тухайн сургалтад оролцсоноор таны ажилд ямар нөлөө үзүүлэх вэ? Та сургалтаас авах ашиг, үр дүнгийн талаар дэлгэрэнгүй бичнэ үү." position="bottom" />
                        </div>

                        <div className="tw-mt-1 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-w-full tw-max-w-3xl" style={{ minHeight: '128px', maxHeight: '768px' }}>
                            <FormRichText modules="small" value={form.expectation} name="expectation" setForm={handleInput} />
                        </div>
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <span className="tw-font-medium">
                            Овог нэр
                        </span>

                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="text" value={form.fullname || ''} onChange={e => handleInput('fullname', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <span className="tw-font-medium">
                            Ажлын байрны албан тушаал
                        </span>

                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="text" value={form.position || ''} onChange={e => handleInput('position', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <span className="tw-font-medium">
                            Утасны дугаар
                        </span>

                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="number" value={form.phone || ''} onChange={e => handleInput('phone', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full md:tw-col-span-2">
                        <span className="tw-font-medium">
                            Хуулийн этгээдийн товч тахилцуулга (Аж ахуй нэгж)
                        </span>

                        <div className="tw-mt-1 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-w-full tw-max-w-3xl" style={{ minHeight: '128px', maxHeight: '768px' }}>
                            <FormRichText modules="small" value={form.introduction} name="introduction" setForm={handleInput} />
                        </div>
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <span className="tw-font-medium">
                            Харьялагдах салбар (Хуулийн этгээд, aж ахуй нэгж)
                        </span>

                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="text" value={form.sector || ''} onChange={e => handleInput('sector', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <span className="tw-font-medium">
                            Улсын бүртгэлийн дугаар (Хуулийн этгээд, aж ахуй нэгж)
                        </span>

                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="number" value={form.registration || ''} onChange={e => handleInput('registration', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <span className="tw-font-medium">
                            Имэйл хаяг
                        </span>

                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="email" value={form.email || ''} onChange={e => handleInput('email', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <span className="tw-font-medium">
                            Сургалтад хамрагдах ажилчдын тоо
                        </span>

                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="number" value={form.trainee_count || ''} onChange={e => handleInput('trainee_count', e.target.value)} />
                    </div>
                </div>

                <div className="tw-flex tw-justify-center">
                    <button className="tw-mt-6 tw-mb-10 tw-py-2 tw-px-8 tw-bg-blue-900 active:tw-bg-blue-800 tw-transition-all tw-text-white tw-text-15px focus:tw-outline-none tw-rounded hover:tw-shadow-md">
                        Хадгалах
                    </button>
                </div>
            </div>
        </div>
    )
}