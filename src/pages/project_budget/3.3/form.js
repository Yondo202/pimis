import React, { useContext, useEffect } from 'react'
import FormTextareaCol from 'components/form_textarea_col/formTextareaCol'
import NumberFormat from 'react-number-format'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import CloseSVG from 'assets/svgComponents/closeSVG'
import UrgudulContext, { initialState } from 'components/utilities/urgudulContext'
import { years } from 'components/utilities/urgudulContext'


const newShare = {
    product: '',
    percentage: '',
}

function ProjectBudget3() {
    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData
    const sales = Object.keys(data.applicationDetail31s).length > 0 ? data.applicationDetail31s : initialState.applicationDetail31s
    const shares = data.applicationDetail32s

    useEffect(() => {
        Object.keys(data.applicationDetail31s).length === 0 && setData(prevState => ({ ...prevState, applicationDetail31s: initialState.applicationDetail31s }))
        shares.length === 0 && setData(prevState => ({ ...prevState, applicationDetail32s: initialState.applicationDetail32s }))
    }, [])

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value, changed33: true })
    }

    const handleInputSales = (e) => {
        setData({ ...data, applicationDetail31s: { ...data.applicationDetail31s, [e.target.id]: { ...data.applicationDetail31s[e.target.id], [e.target.name]: e.target.value.replaceAll(',', '') } }, changed33: true })
    }

    const handleInputProduct = (e) => {
        const newShares = shares
        newShares[e.target.id][e.target.name] = e.target.value
        setData({ ...data, applicationDetail32s: newShares, changed33: true })
    }

    const handleAdd = () => {
        setData({ ...data, applicationDetail32s: [...shares, { ...newShare }] })
    }

    const handleRemove = (index) => {
        setData({ ...data, applicationDetail32s: shares.filter((_, i) => i !== index), changed33: true })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h3 className="tw-text-gray-600 tw-font-semibold tw-ml-4 tw-mb-4">3.3 Аж ахуй нэгжийн борлуулалтын орлого</h3>

            <form onSubmit={handleSubmit}>
                <h3 className="tw-text-gray-600 tw-font-semibold tw-ml-4 tw-mb-8 tw-pl-4">
                    A. Байгууллагын 3 жилийн зорилт.
                </h3>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-12 tw-mx-auto tw-text-sm tw-border-t tw-bg-white">
                    <div className="tw-w-full tw-p-4 tw-pl-6 tw-bg-gray-100 tw-rounded-t-lg">
                        2017 онтой харьцуулахад дараагийн 5 жилд борлуулалтын орлогыг
                        <input className="tw-bg-transparent tw-outline-none tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-mx-3 tw-w-16 tw-pr-1 focus:tw-border-blue-600 tw-transition tw-duration-300 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" type="number" value={data.up_sale_5y} name="up_sale_5y" onChange={handleInput} />
                        %-аар өсгөнө.
                    </div>

                    <div className="tw-w-full tw-p-4 tw-pl-6">
                        2017 онтой харьцуулахад дараагийн 5 жилд
                        <input className="tw-bg-transparent tw-outline-none tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-mx-3 tw-w-16 tw-pr-1 focus:tw-border-blue-600 tw-transition tw-duration-300 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" type="number" value={data.new_hire_5y} name="new_hire_5y" onChange={handleInput} />
                        ажилтан нэмж авна.
                    </div>

                    <FormTextareaCol label="Байгууллагын бүтээгдэхүүн үйлчилгээний хүрээг төрөлжүүлэхийн тулд (тодорхойлж бичнэ үү):" value={data.for_product_range} name="for_product_range" onChange={handleInput} classAppend="tw-bg-gray-100" />

                    <FormTextareaCol label="Экспортыг эхлэх, эсвэл нэмэгдүүлэхийн тулд:" value={data.for_export} name="for_export" onChange={handleInput} classAppend="tw-rounded-b-lg" />
                </div>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-text-sm tw-pb-6 tw-border-t tw-bg-white">
                    <div className="tw-w-full tw-rounded-t-lg tw-font-semibold tw-bg-gray-100 tw-h-12 tw-flex">
                        <p className="tw-font-semibold tw-self-center tw-ml-4">Аж ахуй нэгжийн дараагийн 3 жилийн борлуулалтын төлөвлөлтийг дараах хүснэгтийн дагуу тодорхойлно уу:</p>
                    </div>

                    <table className="tw-w-full">
                        <thead>
                            <tr className="tw-h-12">
                                <th className="">
                                    {/* Аж ахуйн нэгжийн нэр */}
                                </th>
                                <th className="tw-font-medium tw-text-center">{years[0]} онд</th>
                                <th className="tw-font-medium tw-text-center">{years[1]} онд</th>
                                <th className="tw-font-medium tw-text-center">{years[2]} онд</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tw-bg-gray-100 tw-h-16">
                                <td className="tw-px-3 tw-py-1 tw-font-medium">Нийт борлуулалт</td>
                                {
                                    years.map(item =>
                                        <td key={item}>
                                            <div className="tw-flex tw-items-center tw-w-3/4 tw-mx-auto tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300">
                                                <span className="tw-text-lg tw-font-medium tw-mx-2">₮</span>
                                                <NumberFormat className="tw-w-full tw-pr-2 tw-bg-transparent tw-outline-none tw-py-2" thousandSeparator={true} value={sales.net_sales && sales.net_sales[item]} name={item} id="net_sales" onChange={handleInputSales} />
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>
                            <tr className="tw-h-16">
                                <td className="tw-px-3 tw-py-1 tw-font-medium">Дотоодын зэх зээл дэх борлуулалт</td>
                                {
                                    years.map(item =>
                                        <td key={item}>
                                            <div className="tw-flex tw-items-center tw-w-3/4 tw-mx-auto tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300">
                                                <span className="tw-text-lg tw-font-medium tw-mx-2">₮</span>
                                                <NumberFormat className="tw-w-full tw-pr-2 tw-bg-transparent tw-outline-none tw-py-2" thousandSeparator={true} value={sales.domestic_sales && sales.domestic_sales[item]} name={item} id="domestic_sales" onChange={handleInputSales} />
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>
                            <tr className="tw-bg-gray-100 tw-h-16">
                                <td className="tw-px-3 tw-py-1 tw-font-medium">Экспортын зах зээл дэх борлуулалт</td>
                                {
                                    years.map(item =>
                                        <td key={item}>
                                            <div className="tw-flex tw-items-center tw-w-3/4 tw-mx-auto tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300">
                                                <span className="tw-text-lg tw-font-medium tw-mx-2">₮</span>
                                                <NumberFormat className="tw-w-full tw-pr-2 tw-bg-transparent tw-outline-none tw-py-2" thousandSeparator={true} value={sales.foreign_sales && sales.foreign_sales[item]} name={item} id="foreign_sales" onChange={handleInputSales} />
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="tw-text-gray-600 tw-font-semibold tw-mb-8 tw-pl-4">B. Нийт үйлдвэрлэл эсвэл борлуулалтад эзлэх одоогийн бүтээгдэхүүн, үйлчилгээний хувийг тодорхойлно уу.</h3>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-12 tw-mx-auto tw-text-sm tw-border-t tw-bg-gray-50">
                    {
                        shares.map((item, i) =>
                            <div className="tw-flex tw-items-center tw-justify-between" key={i}>
                                <div className="tw-flex-grow tw-max-w-3xl even:tw-bg-gray-100 tw-p-4 tw-pl-6 tw-flex tw-items-center tw-whitespace-nowrap">
                                    <span className="tw-font-medium">{String.fromCharCode(65 + i)}.</span>
                                    <input className="tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-flex-grow tw-max-w-lg tw-mx-2 tw-text-gray-700 focus:tw-border-blue-600 tw-outline-none tw-transition tw-duration-300" type="text" value={item.product} name="product" id={i} onChange={handleInputProduct} />
                                    нь
                                    <input className="tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-pr-1 tw-w-16 tw-mx-2 tw-text-gray-700 focus:tw-border-blue-600 tw-outline-none tw-transition tw-duration-300" type="number" min="0" value={item.percentage} name="percentage" id={i} onChange={handleInputProduct} />
                                    <span className="tw-font-bold tw-mr-1">%</span>
                                    -ийг эзэлдэг.
                                </div>
                                <button className="tw-text-red-500 tw-mr-2 sm:tw-ml-4 sm:tw-mr-8 focus:tw-outline-none active:tw-text-red-600 tw-rounded-md active:tw-bg-red-200" onClick={() => handleRemove(i)}>
                                    <CloseSVG className="tw-w-5 tw-h-5" />
                                </button>
                            </div>
                        )
                    }

                    <div className="tw-flex tw-justify-end tw-items-center tw-pb-4 sm:tw-pr-6">
                        <span className="tw-text-xs tw-italic tw-opacity-80 tw-mr-2">{shares.length}/10</span>
                        {
                            shares.length < 10 && <button className="focus:tw-outline-none tw-text-green-500 active:tw-text-green-600 tw-flex tw-items-center" onClick={handleAdd}>
                                <PlusCircleSVG className="tw-w-8 tw-h-8" />
                            </button>
                        }
                    </div>
                </div>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-8 tw-mx-auto tw-text-sm tw-border-t">
                    <FormTextareaCol label="C. Одоогийн зах зээл болон үйлчлүүлэгчдийг тодорхойлно уу." value={data.market_def} name="market_def" onChange={handleInput} />
                </div>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-8 tw-mx-auto tw-text-sm tw-border-t">
                    <FormTextareaCol label="D. Одоогийн зорьж буй зах зээлийн нөхцөл байдлыг тодорхойлно уу." value={data.target_market} name="target_market" onChange={handleInput} classAppend="bg-gray-100" />
                </div>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-text-sm tw-border-t">
                    <FormTextareaCol label="E. Таны гол өрсөлдөгч хэн бэ?" value={data.main_competitor} name="main_competitor" onChange={handleInput} />
                </div>
            </form>
        </>
    )
}

export default ProjectBudget3
