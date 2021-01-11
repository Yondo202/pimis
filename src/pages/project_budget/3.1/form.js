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
            <h3 className="text-gray-600 font-semibold ml-4 mb-4">3.1. Төслийн нийт зардал</h3>
            <p className="text-sm italic opacity-80 ml-4 mb-8">Экспортын хөгжлийн төлөвлөгөөнийхөө дагуу төслийг хэрэгжүүлэхэд шаардлагатай бүх зардлыг харуулна уу.</p>

            <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto">
                <div className="w-full rounded-t-lg bg-gray-100 h-12 flex">
                    <p className="text-sm italic opacity-80 self-center ml-4">Экспортын хөгжлийн төлөвлөгөөнийхөө дагуу төслийг хэрэгжүүлэхэд шаардлагатай бүх зардлыг харуулна уу.</p>
                </div>

                {
                    activities.map((item, i) =>
                        <div className="flex items-center odd:bg-gray-100 border-b" key={i}>
                            <div className="flex-grow divide-y divide-dashed border-r">
                                <FormTextarea label={`Үйл ажиллагаа ${i + 1}`} value={activities[i].activity} name="activity" id={i} onChange={handleInputActivity} />

                                <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-gray-200 sm:divide-x first:rounded-t-lg last:rounded-b-lg">
                                    <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                                        <label className={`text-sm ${focus[i].expense && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                            Зардал:
                                        </label>
                                    </div>
                                    <div className="py-3 px-4 flex-grow sm:w-7/12">
                                        <div className="w-36 border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300 flex items-center">
                                            <span className="text-lg font-medium mx-2">₮</span>
                                            <NumberFormat className="w-28 text-sm bg-transparent outline-none py-2 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" thousandSeparator={true} value={activities[i].cost} name="cost" id={i} onChange={handleInputFormatId} onFocus={() => handleFocus(i, 'expense', true)} onBlur={() => handleFocus(i, 'expense', false)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-gray-200 sm:divide-x first:rounded-t-lg last:rounded-b-lg">
                                    <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                                        <label className={`text-sm ${focus[i].finance && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                            Та энэ зардлыг санхүүгийн дэмжлэгээр санхүүжүүлэх үү?
                                        </label>
                                    </div>
                                    <form className="py-3 px-4 flex-grow sm:w-7/12" onSubmit={handleSubmit}>
                                        <input className="" name="byedp" type="radio" id={i} checked={activities[i].byedp === "true"} value="true" onChange={handleInputActivity} onFocus={() => handleFocus(i, 'finance', true)} onBlur={() => handleFocus(i, 'finance', false)} />
                                        <label className="text-sm font-medium mx-2">Тийм</label>
                                        <input className="ml-8" name="byedp" type="radio" id={i} checked={activities[i].byedp === "false"} value="false" onChange={handleInputActivity} onFocus={() => handleFocus(i, 'finance', true)} onBlur={() => handleFocus(i, 'finance', false)} />
                                        <label className="text-sm font-medium mx-2">Үгүй</label>
                                    </form>
                                </div>

                                <FormTextareaCol label={`Үйл ажиллагаа ${i + 1}-ийг хэрэгжүүлэх шалтгааныг бичнэ үү:`} value={activities[i].reason} name="reason" id={i} onChange={handleInputActivity} />

                                <FormTextareaCol label="Энэ үйл ажиллагаанаас олж болох нэмэлт борлуулалтын орлогын тооцоог бичнэ үү, жил бүрээр:" value={activities[i].sales_years} name="sales_years" id={i} onChange={handleInputActivity} />

                                <div className="w-full p-4 pl-6 pb-0 flex flex-col">
                                    <label className={`text-sm text-gray-700 ${focus[i].cost && 'font-semibold -translate-x-1 -translate-y-1'} transition duration-300 transform-gpu`}>
                                        {`Үйл ажиллагаа ${i + 1}-ийг хэрэгжүүлэхэд шаардлагатай 3 байгуулагаас авсан үнийн саналыг хавсаргасан болно:`}
                                    </label>
                                    <form className="flex items-center py-4 px-3" onSubmit={handleSubmit}>
                                        <input type="radio" name="costs_included" id={i} checked={activities[i].costs_included === "true"} value="true" onChange={handleInputActivity} onFocus={() => handleFocus(i, 'cost', true)} onBlur={() => handleFocus(i, 'cost', false)} />
                                        <label className="text-sm font-medium mx-2">Тийм</label>
                                        <input className="ml-8" type="radio" name="costs_included" id={i} checked={activities[i].costs_included === "false"} value="false" onChange={handleInputActivity} onFocus={() => handleFocus(i, 'cost', true)} onBlur={() => handleFocus(i, 'cost', false)} />
                                        <label className="text-sm font-medium mx-2">Үгүй</label>
                                    </form>
                                </div>

                                <FormTextareaCol label="Хэрэв 'үгүй' бол шалтгааныг бичнэ үү:" value={activities[i].unincluded_reason} name="unincluded_reason" id={i} onChange={handleInputActivity} />
                            </div>

                            <button className="m-2 focus:outline-none text-red-500 active:text-red-600" onClick={() => handleRemove(i)}>
                                <MinusCircleSVG className="w-8 h-8" />
                            </button>
                        </div>
                    )
                }

                {
                    activities.length < 10 && <button className="mr-2 my-2 float-right focus:outline-none text-green-500 active:text-green-600 flex items-center" onClick={handleAdd}>
                        <PlusCircleSVG className="w-8 h-8" />
                    </button>
                }
                <span className="text-xs italic opacity-80 float-right mr-2 my-4">{activities.length}/10</span>

                <FormTextareaCol label="Дээрх үйл ажиллагааны аль нэгийг, эсвэл бүгдийг хэрэгжүүлэхэд гадны үйлчилгээ үзүүлэгч байгууллага, эсвэл зөвлөх хэрэгтэй бол тэдний бүрэн намтар, чадамжийг харуулсан мэдэгдэл, ур чадвар, тухайн зөвлөх үйлчилгээтэй холбоотой туршлагыг баталсан нотолгоо зэргийг хавсаргана уу. Тухайн үйлчилгээ үзүүлэгч байгууллага, эсвэл зөвлөхөөс дээр дурьдагдсан үйл ажиллагаатай ижил төстэй үйлчилгээг авсан доод тал нь хоёр этгээдийн холбоо барих хаяг (нэр, утасны дугаар, э-шуудангийн хаяг г.м.)-ийн мэдээллийг бичнэ. Энэхүү өргөдлийн маягтыг хүлээн авснаар Бизнес хөгжлийн шинжээч эдгээр үйлчилгээ авсан байгууллагуудтай холбоо барьж тодорхойлолт авах болно гэдгийг зөвшөөрч байна:" value={data.external_info} name="external_info" onChange={handleInput} classAppend="border-t border-b border-dashed" />

                <FormTextareaCol label="Энэ бизнес төлөвлөөгөөтэй холбоотой бусад мэдээлэл:" value={data.other_info} name="other_info" onChange={handleInput} />
            </div>
        </>
    )
}

export default ProjectBudget1
