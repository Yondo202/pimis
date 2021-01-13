import React, { useState } from 'react'


const initialState = {
    format: false,
    dollar: false,
    nine_months: false,
    max_amount: false,
    self_fund: false,
    signed: false,
}

function UrgudulChecklist() {
    const [form, setForm] = useState(initialState)

    const handleInputCheckbox = (e) => {
        setForm({ ...form, [e.target.name]: e.target.checked })
    }

    return (
        <div className="">
            <div className="tw-text-sm tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
                <div className="tw-flex tw-items-center tw-justify-between tw-rounded-t-lg tw-bg-gray-100">
                    <p className="tw-p-4 tw-font-medium">
                        Санал болгосон өргөдлийн маягтын форматын дагуу мэдээллийг бөглөсөн.
                    </p>
                    <input className="tw-m-4" type="checkbox" checked={form.format} name="format" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-p-4 tw-font-medium">
                        Төсвийг ам.доллараар бэлтгэсэн.
                    </p>
                    <input className="tw-m-4" type="checkbox" checked={form.dollar} name="dollar" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-bg-gray-100">
                    <p className="tw-p-4 tw-flex-grow tw-font-medium">
                        Төслийг хэрэгжүүлэх хугацаа нь 9 сараас хэтрэхгүй байна. (Хамгийн дээд хугацаа)
                    </p>
                    <input className="tw-m-4" type="checkbox" checked={form.nine_months} name="nine_months" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-p-4 tw-font-medium">
                        Экспортыг дэмжих төслөөс хүссэн нийт санхүүжилт нь кластерын хувьд 100,000 ам.доллараас, аж ахуйн нэгжийн хувьд 50,000 ам.доллараас хэтрэхгүй байна. (Өмнө авсан болон энэ удаа хүсч буй нийт дүн нь дээрх дүнгээс хэтрэхгүй)
                    </p>
                    <input className="tw-m-4" type="checkbox" checked={form.max_amount} name="max_amount" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between tw-rounded-b-lg tw-bg-gray-100">
                    <p className="tw-p-4 tw-font-medium">
                        Экспортыг дэмжих төслөөс хүссэн санхүүжилтийн дүнтэй тэнцүү хэмжээний санхүүжилтийг өргөдөл гаргагч нь өөрийн компанийн зүгээс гаргах бөгөөд энэ дүн нь өргөдөл гаргахаас өмнөх зардал ороогүй дүн байна.
                    </p>
                    <input className="tw-m-4" type="checkbox" checked={form.self_fund} name="self_fund" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between tw-rounded-b-lg tw-bg-gray-100">
                    <p className="tw-p-4 tw-font-medium">
                        Мэдэгдэл нь өргөдөл гаргагч болон кластерын гишүүд бүрээр гарын үсэг зурагдсан байна.
                    </p>
                    <input className="tw-m-4" type="checkbox" checked={form.signed} name="signed" onChange={handleInputCheckbox} />
                </div>
            </div>
        </div>
    )
}

export default UrgudulChecklist
