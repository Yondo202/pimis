import React, { useState } from 'react'
import FormInline from 'components/form_inline/formInline'
import FormSmall from 'components/form_small/formSmall'


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

    return (
        <div className="tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <FormInline label="Аж ахуй нэгжийн нэр:" type="text" value={form.company_name} name="company_name" onChange={handleInput} />

            <FormInline label="Аж ахуйн нэгжийг төлөөлөх албан тушаалтны овог нэр:" type="text" value={form.representative_name} name="representative_name" onChange={handleInput} classAppend="sm:tw-w-3/6" />

            <FormInline label="Төлөөлөгчийн албан тушаал:" type="text" value={form.representative_position} name="representative_position" onChange={handleInput} classAppend="sm:tw-w-3/6" />

            <FormInline label="ААН бүртгүүлсэн огноо:" type="text" value={form.registered_date} name="registered_date" onChange={handleInput} classAppend="sm:tw-w-2/6" />

            <FormInline label="Регистерийн дугаар:" type="text" value={form.registration_number} name="registration_number" onChange={handleInput} classAppend="sm:tw-w-2/6" />

            <FormInline label="Албан ёсны хаяг:" type="text" value={form.official_address} name="official_address" onChange={handleInput} />

            <FormInline label="Албан газрын утас:" type="text" value={form.telephone} name="telephone" onChange={handleInput} classAppend="sm:tw-w-2/6" />

            <FormInline label="Гар утас:" type="text" value={form.handphone} name="handphone" onChange={handleInput} classAppend="sm:tw-w-2/6" />

            <FormInline label="Гол харилцааг авч явах имэйл хаяг:" type="text" value={form.email} name="email" onChange={handleInput} classAppend="sm:tw-w-3/6" />

            <FormInline label="Вэбсайт:" type="text" value={form.website} name="website" onChange={handleInput} classAppend="sm:tw-w-3/6" />

            <FormInline label="Компанийн хэмжээ:" type="text" value={form.company_size} name="company_size" onChange={handleInput} />

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

                <div className="tw-text-sm tw-italic tw-opacity-80">
                    Аж ахуйн нэгжийн хэмжээ нь борлуулалт эсвэл бүтэн цагийн ажилтнуудын аль өндрөөр тогтоосноор ангилал нь тогтоно. Жишээ нь $30M борлуулалттай 30 хүнтэй аж ахуйн нэгжийн хувьд Дунд ангиллын аж ахуйн нэгжид хамаарна.
                </div>
            </div>

            <FormInline label="Төслийн төлөвлөлт, гүйцэтгэл дэх оролцоо:" type="text" value={form.project_plan} name="project_plan" onChange={handleInput} />
        </div>
    )
}

export default UrgudulApplicant
