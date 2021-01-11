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
            <h3 className="text-gray-600 font-semibold ml-4 mb-4">3.3 Аж ахуй нэгжийн борлуулалтын орлого</h3>

            <form onSubmit={handleSubmit}>
                <h3 className="text-gray-600 font-semibold ml-4 mb-4 pl-4">A. Байгууллагын 3 жилийн зорилт.</h3>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto text-sm">
                    <div className="w-full p-4 pl-6 bg-gray-100 rounded-t-lg">
                        2017 онтой харьцуулахад дараагийн 5 жилд борлуулалтын орлогыг
                        <input className="bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 mx-3 w-16 pr-1 focus:border-blue-600 transition duration-300 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" type="number" value={data.up_sale_5y} name="up_sale_5y" onChange={handleInput} />
                        %-аар өсгөнө.
                    </div>

                    <div className="w-full p-4 pl-6">
                        2017 онтой харьцуулахад дараагийн 5 жилд
                        <input className="bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 mx-3 w-16 pr-1 focus:border-blue-600 transition duration-300 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" type="number" value={data.new_hire_5y} name="new_hire_5y" onChange={handleInput} />
                        ажилтан нэмж авна.
                    </div>

                    <FormTextareaCol label="Байгууллагын бүтээгдэхүүн үйлчилгээний хүрээг төрөлжүүлэхийн тулд (тодорхойлж бичнэ үү):" value={data.for_product_range} name="for_product_range" onChange={handleInput} classAppend="bg-gray-100" />

                    <FormTextareaCol label="Экспортыг эхлэх, эсвэл нэмэгдүүлэхийн тулд:" value={data.for_export} name="for_export" onChange={handleInput} classAppend="rounded-b-lg" />
                </div>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto text-sm pb-6">
                    <div className="w-full rounded-t-lg font-semibold bg-gray-100 h-12 flex">
                        <p className="font-semibold self-center ml-4">Аж ахуй нэгжийн дараагийн 3 жилийн борлуулалтын төлөвлөлтийг дараах хүснэгтийн дагуу тодорхойлно уу:</p>
                    </div>

                    <table className="w-full">
                        <thead>
                            <tr className="h-12">
                                <th className="">
                                    {/* Аж ахуйн нэгжийн нэр */}
                                </th>
                                <th className="font-medium">{years[0]} онд</th>
                                <th className="font-medium">{years[1]} онд</th>
                                <th className="font-medium">{years[2]} онд</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-100 h-16">
                                <td className="px-3 py-1 font-medium">Нийт борлуулалт</td>
                                {
                                    years.map(item =>
                                        <td key={item}>
                                            <div className="flex items-center w-3/4 mx-auto border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300">
                                                <span className="text-lg font-medium mx-2">₮</span>
                                                <NumberFormat className="w-full pr-2 bg-transparent outline-none py-2" thousandSeparator={true} value={sales.net_sales && sales.net_sales[item]} name={item} id="net_sales" onChange={handleInputSales} />
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>
                            <tr className="h-16">
                                <td className="px-3 py-1 font-medium">Дотоодын зэх зээл дэх борлуулалт</td>
                                {
                                    years.map(item =>
                                        <td key={item}>
                                            <div className="flex items-center w-3/4 mx-auto border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300">
                                                <span className="text-lg font-medium mx-2">₮</span>
                                                <NumberFormat className="w-full pr-2 bg-transparent outline-none py-2" thousandSeparator={true} value={sales.domestic_sales && sales.domestic_sales[item]} name={item} id="domestic_sales" onChange={handleInputSales} />
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>
                            <tr className="bg-gray-100 h-16">
                                <td className="px-3 py-1 font-medium">Экспортын зах зээл дэх борлуулалт</td>
                                {
                                    years.map(item =>
                                        <td key={item}>
                                            <div className="flex items-center w-3/4 mx-auto border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300">
                                                <span className="text-lg font-medium mx-2">₮</span>
                                                <NumberFormat className="w-full pr-2 bg-transparent outline-none py-2" thousandSeparator={true} value={sales.foreign_sales && sales.foreign_sales[item]} name={item} id="foreign_sales" onChange={handleInputSales} />
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-gray-600 font-semibold mb-4 pl-4">B. Нийт үйлдвэрлэл эсвэл борлуулалтад эзлэх одоогийн бүтээгдэхүүн, үйлчилгээний хувийг тодорхойлно уу.</h3>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto text-sm">
                    {
                        shares.map((item, i) =>
                            <div className="flex items-center justify-between" key={i}>
                                <div className="flex-grow max-w-3xl even:bg-gray-100 p-4 pl-6 flex items-center whitespace-nowrap">
                                    <span className="font-medium">{String.fromCharCode(65 + i)}.</span>
                                    <input className="border border-gray-300 rounded-md py-2 px-3 flex-grow max-w-lg mx-2 text-gray-700 focus:border-blue-600 outline-none transition duration-300" type="text" value={item.product} name="product" id={i} onChange={handleInputProduct} />
                                    нь
                                    <input className="border border-gray-300 rounded-md py-2 px-3 pr-1 w-16 mx-2 text-gray-700 focus:border-blue-600 outline-none transition duration-300" type="number" min="0" value={item.percentage} name="percentage" id={i} onChange={handleInputProduct} />
                                    <span className="font-bold mr-1">%</span>
                                    -ийг эзэлдэг.
                                </div>
                                <button className="text-red-500 mr-2 sm:ml-4 sm:mr-8 focus:outline-none active:text-red-600 rounded-md active:bg-red-200" onClick={() => handleRemove(i)}>
                                    <CloseSVG className="w-5 h-5" />
                                </button>
                            </div>
                        )
                    }

                    <div className="flex justify-end items-center pb-4 sm:pr-6">
                        <span className="text-xs italic opacity-80 mr-2">{shares.length}/10</span>
                        {
                            shares.length < 10 && <button className="focus:outline-none text-green-500 active:text-green-600 flex items-center" onClick={handleAdd}>
                                <PlusCircleSVG className="w-8 h-8" />
                            </button>
                        }
                    </div>
                </div>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-8 mx-auto text-sm">
                    <FormTextareaCol label="C. Одоогийн зах зээл болон үйлчлүүлэгчдийг тодорхойлно уу." value={data.market_def} name="market_def" onChange={handleInput} />
                </div>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-8 mx-auto text-sm">
                    <FormTextareaCol label="D. Одоогийн зорьж буй зах зээлийн нөхцөл байдлыг тодорхойлно уу." value={data.target_market} name="target_market" onChange={handleInput} classAppend="bg-gray-100" />
                </div>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto text-sm">
                    <FormTextareaCol label="E. Таны гол өрсөлдөгч хэн бэ?" value={data.main_competitor} name="main_competitor" onChange={handleInput} />
                </div>
            </form>
        </>
    )
}

export default ProjectBudget3
