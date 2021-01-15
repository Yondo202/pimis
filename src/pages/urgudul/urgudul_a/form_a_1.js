import React, { useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/helpModal/helpPopup'


const initialState = {
    company_name: '',
    representative_name: '',
    representative_position: '',
    registered_date: '',
    registration_number: '',
    official_address: '',
    telephone: '',
    handphone: '',
    email: '',
    website: '',
    company_size: '',
    project_plan: '',
}

function UrgudulApplicant() {
    const [form, setForm] = useState(initialState)

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleInputFormat = (values, name) => {
        setForm({ ...form, [name]: values.value })
    }

    const handleInputFormatted = (values, name) => {
        setForm({ ...form, [name]: values.formattedValue })
    }

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mr-2">A1</span>
                - Өргөдөл гаргагч

                {
                    'cluster_' && <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." position="bottom" />
                }
            </div>

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-center">
                <FormInline label="Аж ахуй нэгжийн нэр" type="text" value={form.company_name} name="company_name" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                <FormInline label="Аж ахуйн нэгжийг төлөөлөх албан тушаалтны овог нэр" type="text" value={form.representative_name} name="representative_name" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                <FormInline label="Төлөөлөгчийн албан тушаал" type="text" value={form.representative_position} name="representative_position" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                <FormInline label="ААН бүртгүүлсэн огноо" type="date" value={form.registered_date} name="registered_date" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-40" />

                <FormInline label="Регистерийн дугаар" type="numberFormat" formats={{ thousandSeparator: true }} value={form.registration_number} name="registration_number" onChange={handleInputFormat} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-40" />

                <FormInline label="Албан ёсны хаяг" type="text" value={form.official_address} name="official_address" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                <FormInline label="Албан газрын утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={form.telephone} name="telephone" onChange={handleInputFormatted} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-40" />

                <FormInline label="Гар утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={form.handphone} name="handphone" onChange={handleInputFormatted} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-40" />

                <div className="tw-border tw-border-dashed tw-w-full tw-max-w-lg tw-flex">
                    <FormInline label="Гол харилцааг авч явах имэйл хаяг" type="email" value={form.email} name="email" onChange={handleInput} classAppend="tw-flex-grow" classInput="tw-w-full" validate={true} />

                    <div className="tw-relative tw-w-2">
                        <HelpPopup classAppend="tw-right-5 tw-top-1" main="Гол харилцааг авч явах имэйл хаягийг бичнэ үү." position="top-left" />
                    </div>
                </div>

                <FormInline label="Вэбсайт" type="text" value={form.website} name="website" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                {/* SELECT COMP-OOR ZASNA */}
                <FormInline label="Компанийн хэмжээ" type="text" value={form.company_size} name="company_size" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                <div className="">
                    <table className="tw-w-full">
                        <thead>
                            <tr className="tw-h-10 tw-font-medium tw-text-base">
                                <th>Аж ахуйн нэгжийн хэмжээ</th>
                                <th>Жилийн борлуулалт (ам.дол)</th>
                                <th>Бүтэн цагийн ажилтны тоо</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tw-h-10 tw-bg-gray-100">
                                <td>Бичил</td>
                                <td>{'< $50 мян'}</td>
                                <td>{'< 10'}</td>
                            </tr>
                            <tr className="tw-h-10">
                                <td>Жижиг</td>
                                <td>{'> $50 мян ≤ $10 сая'}</td>
                                <td>{'>=10, <50'}</td>
                            </tr>
                            <tr className="tw-h-10 tw-bg-gray-100">
                                <td>Дунд</td>
                                <td>{'> $10 сая ≤ $50 сая'}</td>
                                <td>{'>=50, <250'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <HelpPopup main="Аж ахуйн нэгжийн хэмжээ нь борлуулалт эсвэл бүтэн цагийн ажилтнуудын аль өндрөөр тогтоосноор ангилал нь тогтоно. Жишээ нь $30M борлуулалттай 30 хүнтэй аж ахуйн нэгжийн хувьд Дунд ангиллын аж ахуйн нэгжид хамаарна." position="top-left" />
                </div>

                <FormInline label="Төслийн төлөвлөлт, гүйцэтгэл дэх оролцоо" type="text" value={form.project_plan} name="project_plan" onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />
            </div>
        </div>
    )
}

export default UrgudulApplicant
