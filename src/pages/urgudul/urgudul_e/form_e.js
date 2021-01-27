import React, { useContext, useState } from 'react'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import HelpPopup from 'components/help_popup/helpPopup'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'


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

    const UrgudulCtx = useContext(UrgudulContext)

    const handleSubmit = () => {
        axios.put(`projects/${UrgudulCtx.data.id}`, form)
            .then(res => {
                console.log(res.data)
                UrgudulCtx.setData(res.data.data)
            })
            .catch(err => {
                console.log(err.response?.data)
            })
    }

    return (
        <div className="tw-mt-8 tw-py-2 tw-mb-20 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">E</span>
                - Шалгах хуудас

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="/.../" position="bottom" />
            </div>

            <div className="tw-pl-4 tw-pr-2 tw-pt-3 tw-text-sm tw-font-medium">
                Өргөдлийг илгээхийн өмнө дараах шалгууруудыг бүрэн эсэхийг шалгана уу. Зөвлөсөн тэмдгээр арын нүдэнд тэмдэглэнэ үү:
            </div>

            <div className="tw-m-4 tw-mb-6 tw-shadow-md">
                <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                    <span className="tw-px-4 tw-py-2">
                        <span className="tw-font-medium tw-mr-2">1.</span>
                    Санал болгосон өргөдлийн маягтын форматын дагуу мэдээллийг бөглөсөн.
                </span>
                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.format} name="format" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                    <span className="tw-px-4 tw-py-2">
                        <span className="tw-font-medium tw-mr-2">2.</span>
                    Төсвийг ам.доллараар бэлтгэсэн.
                </span>
                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.dollar} name="dollar" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                    <span className="tw-px-4 tw-py-2">
                        <span className="tw-font-medium tw-mr-2">3.</span>
                    Төслийг хэрэгжүүлэх хугацаа нь 9 сараас хэтрэхгүй байна.
                    <HelpPopup classAppend="tw-ml-2 tw-inline-flex tw-top-1.5" main="Хамгийн дээд хугацаа нь 9 сар болно." position="bottom" />
                    </span>
                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.nine_months} name="nine_months" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                    <span className="tw-px-4 tw-py-2">
                        <span className="tw-font-medium tw-mr-2">4.</span>
                    Экспортыг дэмжих төслөөс хүссэн нийт санхүүжилт нь кластерын хувьд 100,000 ам.доллараас, аж ахуйн нэгжийн хувьд 50,000 ам.доллараас хэтрэхгүй байна.
                    <HelpPopup classAppend="tw-ml-2 tw-inline-flex tw-top-1.5" main="Өмнө нь авсан болон энэ удаа хүсч буй нийт дүн нь дээрх дүнгээс хэтрэхгүй байх ёстой." position="bottom" />
                    </span>
                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.max_amount} name="max_amount" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                    <span className="tw-px-4 tw-py-2">
                        <span className="tw-font-medium tw-mr-2">5.</span>
                    Экспортыг дэмжих төслөөс хүссэн санхүүжилтийн дүнтэй тэнцүү хэмжээний санхүүжилтийг өргөдөл гаргагч нь өөрийн компанийн зүгээс гаргах бөгөөд энэ дүн нь өргөдөл гаргахаас өмнөх зардал ороогүй дүн байна.
                </span>
                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.self_fund} name="self_fund" onChange={handleInputCheckbox} />
                </div>

                <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                    <span className="tw-px-4 tw-py-2">
                        <span className="tw-font-medium tw-mr-2">6.</span>
                    Мэдэгдэл нь өргөдөл гаргагч болон кластерын гишүүд бүрээр гарын үсэг зурагдсан байна.
                </span>
                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.signed} name="signed" onChange={handleInputCheckbox} />
                </div>
            </div>

            <div className="tw-pl-4 tw-pr-2 tw-pt-3 tw-text-sm tw-font-medium">
                Урьдчилсан мэдүүлгээр буюу эхний шатанд тэнцсэн өргөдөл гаргагч нь ажлын 10 хоногийн дотор дараах материалыг бүрдүүлэн өгнө:
            </div>

            <ol className="tw-list-decimal tw-list-inside tw-text-sm tw-m-4 tw-mb-6 tw-shadow-md">
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Экспорт хөгжлийн төлөвлөгөө.
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, Байгаль орчны удирдлагын төлөвлөгөө.
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Хуулийн этгээдийн улсын бүртгэлийн гэрчилгээний хуулбар.
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Өмнөх 2 жилийн санхүүгийн тайлан. /Энэ оны санхүүгийн тайлангийн хамт/
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Холбогдох дүүргийн татварын албанаас 12 сараас дээш хугацааны татварын өргүйг нотолсон тодорхойлолт, баримт.
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Холбогдох нийгмийн даатгалын газраас 12 сараас дээш хугацааны өргүйг нотолсон тодорхойлолт, баримт, нийгмийн даатгал төлдөг ажилчдын тооны мэдээлэл.
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Монголбанкны зээлийн мэдээллийн сангаас муу ангиллын зээлгүйг нотолсон тодорхойлолт, баримт.
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Хуулийн этгээдийн эцсийн өмчлөгчдийг тодорхойлох баримт.
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, ур чадварыг илэрхийлэх намтар. (Дор хаяж 3 албан тушаалтны мэдээлэл)
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо.
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Санхүүжилтийг бүрэн хийх боломжтойг нотолсон баримт бичиг, банкны хуулга гм.
                </li>
                <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                    Бусад шаардлагатай баримт бичиг.
                </li>
            </ol>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4 tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600" classLabel="tw-text-white" label="Зөвшөөрөх" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulChecklist
