import React, { useContext, useEffect, useState } from 'react'
import HelpPopup from 'components/help_popup/helpPopup'
import axios from 'axiosbase'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import SearchSelectCompact from 'components/urgudul_components/searchSelectCompact'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import NumberFormat from 'react-number-format'
import UrgudulContext from 'components/utilities/urgudulContext'


const year = new Date().getFullYear()
const month = new Date().getMonth() + 1

const dates = [
    'baseYear',
    'year--',
    'year-',
    'submitDate',
    'endDate',
    'year+',
    'year++',
    'year+++',
]

const datesObj = {
    'baseYear': '',
    'year--': '',
    'year-': '',
    'submitDate': '',
    'endDate': '',
    'year+': '',
    'year++': '',
    'year+++': '',
}

// const datesArr = [
//     { year: 2016, coltype: 'baseYear', amount: '' },
//     { year: year - 2, coltype: 'year--', amount: '' },
//     { year: year - 1, coltype: 'year-', amount: '' },
//     { year: year, month: month, coltype: 'submitDate', amount: '' },
//     { year: 2222, month: 77, coltype: 'endDate', amount: '' },
//     { year: year + 1, coltype: 'year+', amount: '' },
//     { year: year + 2, coltype: 'year++', amount: '' },
//     { year: year + 3, coltype: 'year+++', amount: '' },
// ]

const initialState = {
    sales: {
        ...datesObj
    },
    fullTime_workplace: {
        ...datesObj
    },
    productivity: {
        ...datesObj
    },
    export: {
        ...datesObj
    },
    export_details: [
        {
            country_id: '',
            export_products: [
                {
                    ...datesObj,
                    product_name: '',
                },
            ],
        },
    ],
    sumbitDate: {
        year: year,
        month: month,
    },
    endDate: {
        year: 2222,
        month: 11,
    },
    baseYear: 2016,
}

function UrgudulCalculations() {
    const [form, setForm] = useState(initialState)

    const handleInput = (key, value, objName) => {
        setForm({ ...form, [objName]: { ...form[objName], [key]: value } })
    }

    const handleSetFormCountry = (key, value, index) => {
        const newArr = form.export_details
        newArr[index].country_id = value
        setForm({ ...form, export_details: newArr })
    }

    const handleInputProductName = (value, productIndex, countryIndex) => {
        const newArr = form.export_details
        newArr[countryIndex].export_products[productIndex].product_name = value
        setForm({ ...form, export_products: newArr })
    }

    const handleInputProductExport = (key, value, productIndex, countryIndex) => {
        const newArr = form.export_details
        newArr[countryIndex].export_products[productIndex][key] = value
        setForm({ ...form, export_products: newArr })
    }

    const [countries, setCounties] = useState([])

    useEffect(() => {
        axios.get('countries')
            .then(res => {
                console.log(res.data)
                setCounties(res.data.data)
            })
    }, [])

    const handleAddCountry = () => {
        const newCountry = {
            country_id: '',
            export_products: [
                {
                    ...datesObj,
                    product_name: '',
                },
            ],
        }
        setForm({ ...form, export_details: [...form.export_details, newCountry] })
    }

    const handleRemoveCountry = (countryIndex) => {
        setForm({ ...form, export_details: form.export_details.filter((_, i) => i !== countryIndex) })
    }

    const handleAddProduct = (countryIndex) => {
        const newCountries = form.export_details
        const newProducts = form.export_details[countryIndex].export_products
        const newProduct = {
            ...datesObj,
            product_name: '',
        }
        newCountries[countryIndex].export_products = [...newProducts, newProduct]
        setForm({ ...form, export_details: newCountries })
    }

    const handleRemoveProduct = (productIndex, countryIndex) => {
        const newCountries = form.export_details
        const newProducts = form.export_details[countryIndex].export_products
        newCountries[countryIndex].export_products = newProducts.filter((_, i) => i !== productIndex)
        setForm({ ...form, export_details: newCountries })
    }

    const UrgudulCtx = useContext(UrgudulContext)

    const handleSubmit = () => {
        axios.put(`projects/${UrgudulCtx.data.id}`, { export_data: form })
            .then(res => {
                console.log(res.data)
                UrgudulCtx.setData(res.data.data)
            })
            .catch(err => {
                console.log(err.response?.data)
            })
    }

    return (
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">B8</span>
                - Өөрийн төслийн хувьд дараах тооцооллыг хийнэ үү

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="/.../" position="bottom" />
            </div>

            <div className="tw-overflow-x-auto tw-overflow-y-hidden">
                <table className="tw-text-sm">
                    <thead>
                        <tr className="tw-h-9">
                            <th className="tw-border tw-text-center"></th>
                            <th className="tw-border tw-text-center">{dates[0]}</th>
                            <th className="tw-border tw-text-center">{dates[1]}</th>
                            <th className="tw-border tw-text-center">{dates[2]}</th>
                            <th className="tw-border tw-text-center">{dates[3]}</th>
                            <th className="tw-border">
                                <div className="tw-flex tw-justify-evenly tw-items-center">
                                    {dates[4]}
                                    <HelpPopup main="Төслийн дуусах хугацаа, сар жилээр" position="bottom" />
                                </div>
                            </th>
                            <th className="tw-border tw-text-center">{dates[5]}</th>
                            <th className="tw-border tw-text-center">{dates[6]}</th>
                            <th className="tw-border tw-text-center">{dates[7]}</th>
                            <th className="tw-border tw-text-center">Нэгж</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="tw-h-9">
                            <td className="tw-border pl-2 pr-1 tw-font-medium">Борлуулалт</td>
                            {
                                dates.map((item, i) =>
                                    <td className="tw-border tw-px-1" key={i}>
                                        <div className="tw-flex tw-justify-center">
                                            <NumberFormat className="tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-bg-indigo-100 tw-rounded" value={form.sales[item]} thousandSeparator={true} prefix="$ " onValueChange={values => handleInput(item, values.value, 'sales')} />
                                        </div>
                                    </td>
                                )
                            }
                            <td className="tw-border tw-font-bold tw-text-center">$</td>
                        </tr>
                        <tr className="tw-h-9">
                            <td className="tw-border tw-px-1">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <span className="pl-1 tw-font-medium">Ажлын байр</span>

                                    <HelpPopup main="НДШ төлдөг бүтэн цагийн ажлын байрны тоо." position="bottom" />
                                </div>
                            </td>
                            {
                                dates.map((item, i) =>
                                    <td className="tw-border tw-px-1" key={i}>
                                        <div className="tw-flex tw-justify-center">
                                            <NumberFormat className="tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-bg-indigo-100 tw-rounded" value={form.fullTime_workplace[item]} thousandSeparator={true} onValueChange={values => handleInput(item, values.value, 'fullTime_workplace')} />
                                        </div>
                                    </td>
                                )
                            }
                            <td className="tw-border tw-truncate tw-font-medium tw-text-center">Т/х</td>
                        </tr>
                        <tr className="tw-h-9">
                            <td className="tw-border tw-px-1">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <span className="pl-1 tw-font-medium">Бүтээмж</span>

                                    <HelpPopup main="Нэг жилд үйлдвэрлэх үйлдвэрлэлийн тоо хэмжээ гм." position="bottom" />
                                </div>
                            </td>
                            {
                                dates.map((item, i) =>
                                    <td className="tw-border tw-px-1" key={i}>
                                        <div className="tw-flex tw-justify-center">
                                            <NumberFormat className="tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-bg-indigo-100 tw-rounded" value={form.productivity[item]} thousandSeparator={true} onValueChange={values => handleInput(item, values.value, 'productivity')} />
                                        </div>
                                    </td>
                                )
                            }
                            <td className="tw-border tw-truncate tw-font-medium tw-text-center">Т/х</td>
                        </tr>
                        <tr className="tw-h-9">
                            <td className="tw-border tw-px-1">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <span className="pl-1 tw-font-medium">Экспорт</span>

                                    <HelpPopup main="Экспортын тооцоог доорх хүснэгтэнд экспорт хийсэн улс болон бүтээгдхүүнээр задлан бичнэ үү." position="bottom" />
                                </div>
                            </td>
                            {
                                dates.map((item, i) =>
                                    <td className="tw-border" key={i}>
                                        <div className="tw-flex tw-justify-center">
                                            <NumberFormat className="tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-bg-indigo-100 tw-rounded" value={form.export[item]} thousandSeparator={true} prefix="$ " onValueChange={values => handleInput(item, values.value, 'export')} />
                                        </div>
                                    </td>
                                )
                            }
                            <td className="tw-border tw-truncate tw-font-bold tw-text-center">$</td>
                        </tr>
                        {
                            form.export_details.map((country, i) =>
                                <>
                                    <tr className="tw-h-9" key={i}>
                                        <td className="tw-border tw-px-1">
                                            <SearchSelectCompact placeholder={`Экспорт хийсэн улс ${i + 1}`} data={countries} value={country.country_id} name="country_id" id={i} description="description" description_mon="description_mon" setForm={handleSetFormCountry} classDiv="tw-py-0.5 tw-bg-indigo-100 tw-rounded" classInput="tw-w-36 tw-bg-transparent" />
                                        </td>
                                        <td className="tw-border tw-px-2" colSpan="8">
                                            <button className="tw-float-right tw-px-1 tw-py-0.5 tw-text-red-400 tw-text-xs tw-font-semibold tw-rounded focus:tw-outline-none tw-border tw-border-red-400 active:tw-bg-red-100" onClick={() => handleRemoveCountry(i)}>
                                                Экспорт хийдэг улсыг хасах
                                        </button>
                                        </td>
                                        <td className="tw-border tw-truncate tw-font-bold tw-text-center">$</td>
                                    </tr>
                                    {
                                        country.export_products.map((product, j) =>
                                            <tr className="tw-h-9">
                                                <td className="tw-border tw-px-1">
                                                    <input className="tw-w-full tw-px-1 tw-py-0.5 tw-outline-none tw-placeholder-gray-500 tw-bg-indigo-100 tw-rounded" placeholder={`Бүтээгдэхүүн ${j + 1}`} type="text" value={product.product_name} onChange={e => handleInputProductName(e.target.value, j, i)} />
                                                </td>
                                                {
                                                    dates.map((key, k) =>
                                                        <td className="tw-border tw-px-1" key={k}>
                                                            <div className="tw-flex tw-justify-center">
                                                                <NumberFormat className="tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-bg-indigo-100 tw-rounded" value={product[key]} thousandSeparator={true} prefix="$ " onValueChange={values => handleInputProductExport(key, values.value, j, i)} />
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                                <td className="tw-border">
                                                    <ButtonTooltip tooltip="Бүтээгдэхүүнийг хасах" beforeSVG={<MinusCircleSVG className="tw-w-7 tw-h-7 tw-transition-colors tw-duration-300" />} onClick={() => handleRemoveProduct(j, i)} classAppend="tw-text-red-500 active:tw-text-red-600 tw-mx-auto" />
                                                </td>
                                            </tr>
                                        )
                                    }
                                    <tr className="tw-h-9">
                                        <td className="tw-border" colSpan="10">
                                            <div className="tw-flex tw-justify-end tw-items-center">
                                                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                                                    Тус улсад {country.export_products.length}ш бүтээгдэхүүн нэмсэн байна.
                                                </div>

                                                <ButtonTooltip tooltip="Бүтээгдэхүүн нэмж оруулах" beforeSVG={<PlusCircleSVG className="tw-w-7 tw-h-7 tw-transition-colors tw-duration-300" />} onClick={() => handleAddProduct(i)} classAppend="tw-text-blue-500 active:tw-text-blue-600 tw-mr-1" />
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        }
                        <tr className="tw-h-9">
                            <td className="tw-border" colSpan="10">
                                <div className="tw-flex tw-justify-start tw-items-center tw-px-2">
                                    <button className="tw-float-right tw-px-1 tw-py-0.5 tw-text-green-400 tw-text-xs tw-font-semibold tw-rounded focus:tw-outline-none tw-border tw-border-green-400 active:tw-bg-green-100" onClick={handleAddCountry}>
                                        Экспорт хийдэг улс нэмж оруулах
                                    </button>

                                    <div className="tw-text-xs tw-italic tw-text-gray-600 tw-ml-2">
                                        {form.export_details.length}ш улс оруулсан байна.
                                </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4 tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulCalculations
