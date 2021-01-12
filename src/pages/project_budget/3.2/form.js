import React, { useContext, useEffect } from 'react'
import FormDouble from 'components/form_double/formDouble'
import UrgudulContext, { initialState } from 'components/utilities/urgudulContext'
import CloseSVG from 'assets/svgComponents/closeSVG'

function ProjectBudget2() {
    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData
    const fundings = Object.keys(data.applicationDetail2s).length > 0 ? data.applicationDetail2s : initialState.applicationDetail2s

    useEffect(() => {
        Object.keys(data.applicationDetail2s).length === 0 && setData({ ...data, applicationDetail2s: { ...initialState.applicationDetail2s } })
    }, [])

    const handleInput = (e) => {
        setData({ ...data, applicationDetail2s: { ...data.applicationDetail2s, [e.target.id]: { ...data.applicationDetail2s[e.target.id], [e.target.name]: e.target.value } }, changed32: true })
    }

    const handleInputFormat = (e) => {
        setData({ ...data, applicationDetail2s: { ...data.applicationDetail2s, [e.target.id]: { ...data.applicationDetail2s[e.target.id], [e.target.name]: e.target.value.replaceAll(',', '') } }, changed32: true })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h3 className="tw-text-gray-600 tw-font-semibold tw-ml-4 tw-mb-4">3.2. Төслийн нийт санхүүжилт</h3>
            <p className="tw-text-sm tw-italic tw-opacity-80 tw-ml-4 tw-mb-2">Энэхүү төслийг хэрэгжүүлэхээр дэмжигдсэн бусад санхүүжүүлэгчдийнхээ (өөрийн санхүүжилт, бусад санхүүгийн дэмжлэг, бусад санхүүгийн эх үүсвэр г.м.) жагсаалтыг хавсаргана уу.</p>
            <p className="tw-text-sm tw-italic tw-opacity-80 tw-ml-4 tw-mb-2">Төслийг санхүүжүүлэх өөрийн хөрөнгийн талаар тодорхой бичнэ үү.</p>
            <p className="tw-text-sm tw-italic tw-opacity-80 tw-ml-4 tw-mb-8">Нийт санхүүжилтийн хэмжээ Асуулт 3.1-д тусгагдсан төслийн нийт зардалтай тэнцүү байна.</p>

            <form onSubmit={handleSubmit}>
                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-text-sm tw-border-t tw-bg-white">
                    <div className="tw-w-full tw-rounded-t-lg tw-bg-gray-100 tw-h-12 tw-flex">
                        <p className="tw-font-semibold tw-self-center tw-ml-4">Санхүүжилтийн эх үүсвэрүүдээ бичнэ үү.</p>
                    </div>

                    <FormDouble label="Түншлэлийн хөтөлбөрийн санхүүгийн дэмжлэг:" subLabel1="Хүсэж буй хэмжээ:" subLabel2="Тайлбар:" value1={fundings.support.amount} name1="amount" id="support" onChangeFormat={handleInputFormat} onChange={handleInput} value2={fundings.support.comment} name2="comment" />

                    <FormDouble label="Өөрийн хөрөнгөөр:" subLabel1="Хэмжээ:" subLabel2="Тайлбар:" value1={fundings.self.amount} name1="amount" id="self" onChangeFormat={handleInputFormat} onChange={handleInput} value2={fundings.self.comment} name2="comment" placeholder="Танай байгууллагын санхүүжүүлэх хэмжээ төслийн нийт зардлыг санхүүжүүлэхэд хүрэлцээтэй гэдгийг баталгаажуулах бичиг баримт шаардлагатай болж болно." classAppend="tw-bg-gray-100" />

                    <FormDouble label="Бусад эх үүсвэр:" subLabel1="Хэмжээ:" subLabel2="Тайлбар:" value1={fundings.other.amount} name1="amount" id="other" onChangeFormat={handleInputFormat} onChange={handleInput} value2={fundings.other.comment} name2="comment" placeholder="Хэрэв санхүүжилтийн бусад эх үүсвэр амжилттай шийдэгдэх эсэх нь тодорхой болоогүй байгаа бол тухайн эх үүсвэрийн хэлэлцээрийн өнөөгийн байдал болон шийдвэр гарах таамаглаж буй хугацааг бичнэ үү. [Танай байгууллагын санхүүжүүлэх хэмжээ төслийн нйит зардлыг санхүүжүүлэхэд хүрэлцээтэй гэдгийг баталгаажуулах бичиг баримт шаардлагатай болж болно]" classAppend="tw-rounded-b-lg" />
                </div>
            </form>
        </>
    )
}

export default ProjectBudget2
