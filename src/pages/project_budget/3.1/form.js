import React, { useContext, useEffect, useState } from 'react'
import FormTextarea from 'components/form_textarea/formTextarea'
import FormTextareaCol from 'components/form_textarea_col/formTextareaCol'
import NumberFormat from 'react-number-format'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import UrgudulContext, { initialState } from 'components/utilities/urgudulContext'


const newActivity = {
    activity: '',
    cost: '',
    byedp: '',
    reason: '',
    sales_years: '',
    costs_included: '',
    unincluded_reason: '',
}

const initialFocusState = Array(10).fill([
    {
        expense: false,
        finance: false,
        cost: false,
    },
])

function ProjectBudget1() {
    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData
    const activities = data.applicationDetail1s

    useEffect(() => {
        activities.length === 0 && setData({ ...data, applicationDetail1s: initialState.applicationDetail1s })
    }, [])

    const handleInputActivity = (e) => {
        const newActivities = activities
        newActivities[e.target.id][e.target.name] = e.target.value
        setData({ ...data, applicationDetail1s: newActivities, changed31: true })
    }

    const handleInputFormatId = (e) => {
        const newActivities = activities
        newActivities[e.target.id][e.target.name] = e.target.value.replaceAll(',', '')
        setData({ ...data, applicationDetail1s: newActivities, changed31: true })
    }

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value, changed31: true })
    }

    const [focus, setFocus] = useState(initialFocusState)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleAdd = () => {
        setData({ ...data, applicationDetail1s: [...activities, { ...newActivity }] })
    }

    const handleRemove = (index) => {
        setData({ ...data, applicationDetail1s: activities.filter((_, i) => i !== index), changed31: true })
    }

    const handleFocus = (i, item, value) => {
        const newFocus = focus
        newFocus[i][item] = value
        setFocus([...newFocus])
    }

    return (
        <>
            <h3 className="tw-text-gray-600 tw-font-semibold tw-ml-4 tw-mb-4">3.1. Төслийн нийт зардал</h3>
            <p className="tw-text-sm tw-italic tw-opacity-80 tw-ml-4 tw-mb-8">Экспортын хөгжлийн төлөвлөгөөнийхөө дагуу төслийг хэрэгжүүлэхэд шаардлагатай бүх зардлыг харуулна уу.</p>

            <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-border-t tw-bg-white">
                <div className="tw-w-full tw-rounded-t-lg tw-bg-gray-100 tw-h-12 tw-flex">
                    <p className="tw-text-sm tw-italic tw-opacity-80 tw-self-center tw-ml-4">Экспортын хөгжлийн төлөвлөгөөнийхөө дагуу төслийг хэрэгжүүлэхэд шаардлагатай бүх зардлыг харуулна уу.</p>
                </div>

                {
                    activities.map((item, i) =>
                        <div className="tw-flex tw-items-center odd:tw-bg-gray-100 tw-border-b" key={i}>
                            <div className="tw-flex-grow tw-divide-y tw-divide-dashed tw-border-r">
                                <FormTextarea label={`Үйл ажиллагаа ${i + 1}`} value={activities[i].activity} name="activity" id={i} onChange={handleInputActivity} />

                                <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-gray-200 sm:tw-divide-x first:tw-rounded-t-lg last:tw-rounded-b-lg">
                                    <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                                        <label className={`tw-text-sm ${focus[i].expense && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                            Зардал:
                                        </label>
                                    </div>
                                    <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                                        <div className="tw-w-36 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300 tw-flex tw-items-center">
                                            <span className="tw-text-lg tw-font-medium tw-mx-2">₮</span>
                                            <NumberFormat className="tw-w-28 tw-text-sm tw-bg-transparent tw-outline-none tw-py-2 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" thousandSeparator={true} value={activities[i].cost} name="cost" id={i} onChange={handleInputFormatId} onFocus={() => handleFocus(i, 'expense', true)} onBlur={() => handleFocus(i, 'expense', false)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-gray-200 sm:tw-divide-x first:tw-rounded-t-lg last:tw-rounded-b-lg">
                                    <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                                        <label className={`tw-text-sm ${focus[i].finance && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                            Та энэ зардлыг санхүүгийн дэмжлэгээр санхүүжүүлэх үү?
                                        </label>
                                    </div>
                                    <form className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12" onSubmit={handleSubmit}>
                                        <input className="" name="byedp" type="radio" id={i} checked={activities[i].byedp === "true"} value="true" onChange={handleInputActivity} onFocus={() => handleFocus(i, 'finance', true)} onBlur={() => handleFocus(i, 'finance', false)} />
                                        <label className="tw-text-sm tw-font-medium tw-mx-2">Тийм</label>
                                        <input className="tw-ml-8" name="byedp" type="radio" id={i} checked={activities[i].byedp === "false"} value="false" onChange={handleInputActivity} onFocus={() => handleFocus(i, 'finance', true)} onBlur={() => handleFocus(i, 'finance', false)} />
                                        <label className="tw-text-sm tw-font-medium tw-mx-2">Үгүй</label>
                                    </form>
                                </div>

                                <FormTextareaCol label={`Үйл ажиллагаа ${i + 1}-ийг хэрэгжүүлэх шалтгааныг бичнэ үү:`} value={activities[i].reason} name="reason" id={i} onChange={handleInputActivity} />

                                <FormTextareaCol label="Энэ үйл ажиллагаанаас олж болох нэмэлт борлуулалтын орлогын тооцоог бичнэ үү, жил бүрээр:" value={activities[i].sales_years} name="sales_years" id={i} onChange={handleInputActivity} />

                                <div className="tw-w-full tw-p-4 tw-pl-6 tw-pb-0 tw-flex tw-flex-col">
                                    <label className={`tw-text-sm tw-text-gray-700 ${focus[i].cost && 'tw-font-semibold tw--translate-x-1 tw--translate-y-1'} tw-transition tw-duration-300 tw-transform-gpu`}>
                                        {`Үйл ажиллагаа ${i + 1}-ийг хэрэгжүүлэхэд шаардлагатай 3 байгуулагаас авсан үнийн саналыг хавсаргасан болно:`}
                                    </label>
                                    <form className="tw-flex tw-items-center tw-py-4 tw-px-3" onSubmit={handleSubmit}>
                                        <input type="radio" name="costs_included" id={i} checked={activities[i].costs_included === "true"} value="true" onChange={handleInputActivity} onFocus={() => handleFocus(i, 'cost', true)} onBlur={() => handleFocus(i, 'cost', false)} />
                                        <label className="tw-text-sm tw-font-medium tw-mx-2">Тийм</label>
                                        <input className="tw-ml-8" type="radio" name="costs_included" id={i} checked={activities[i].costs_included === "false"} value="false" onChange={handleInputActivity} onFocus={() => handleFocus(i, 'cost', true)} onBlur={() => handleFocus(i, 'cost', false)} />
                                        <label className="tw-text-sm tw-font-medium tw-mx-2">Үгүй</label>
                                    </form>
                                </div>

                                <FormTextareaCol label="Хэрэв 'үгүй' бол шалтгааныг бичнэ үү:" value={activities[i].unincluded_reason} name="unincluded_reason" id={i} onChange={handleInputActivity} />
                            </div>

                            <button className="tw-m-2 focus:tw-outline-none tw-text-red-500 active:tw-text-red-600" onClick={() => handleRemove(i)}>
                                <MinusCircleSVG className="tw-w-8 tw-h-8" />
                            </button>
                        </div>
                    )
                }

                {
                    activities.length < 10 && <button className="tw-mr-2 tw-my-2 tw-float-right focus:tw-outline-none tw-text-green-500 active:tw-text-green-600 tw-flex tw-items-center" onClick={handleAdd}>
                        <PlusCircleSVG className="tw-w-8 tw-h-8" />
                    </button>
                }
                <span className="tw-text-xs tw-italic tw-opacity-80 tw-float-right tw-mr-2 tw-my-4">{activities.length}/10</span>

                <FormTextareaCol label="Дээрх үйл ажиллагааны аль нэгийг, эсвэл бүгдийг хэрэгжүүлэхэд гадны үйлчилгээ үзүүлэгч байгууллага, эсвэл зөвлөх хэрэгтэй бол тэдний бүрэн намтар, чадамжийг харуулсан мэдэгдэл, ур чадвар, тухайн зөвлөх үйлчилгээтэй холбоотой туршлагыг баталсан нотолгоо зэргийг хавсаргана уу. Тухайн үйлчилгээ үзүүлэгч байгууллага, эсвэл зөвлөхөөс дээр дурьдагдсан үйл ажиллагаатай ижил төстэй үйлчилгээг авсан доод тал нь хоёр этгээдийн холбоо барих хаяг (нэр, утасны дугаар, э-шуудангийн хаяг г.м.)-ийн мэдээллийг бичнэ. Энэхүү өргөдлийн маягтыг хүлээн авснаар Бизнес хөгжлийн шинжээч эдгээр үйлчилгээ авсан байгууллагуудтай холбоо барьж тодорхойлолт авах болно гэдгийг зөвшөөрч байна:" value={data.external_info} name="external_info" onChange={handleInput} classAppend="tw-border-t tw-border-b tw-border-dashed" />

                <FormTextareaCol label="Энэ бизнес төлөвлөөгөөтэй холбоотой бусад мэдээлэл:" value={data.other_info} name="other_info" onChange={handleInput} />
            </div>
        </>
    )
}

export default ProjectBudget1
