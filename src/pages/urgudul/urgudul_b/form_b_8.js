import React, { useEffect, useState } from 'react'
import HelpPopup from 'components/helpModal/helpPopup'
import axios from 'axiosbase'
import ButtonTooltip from 'components/buttonTooltip/buttonTooltip'
import SearchSelectCompact from 'components/urgudul_components/searchSelectCompact'
import PenSVG from 'assets/svgComponents/penSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import NumberFormat from 'react-number-format'


const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const dates = [
    '2016',                     //0
    `${year - 2}/${month}`,
    `${year - 1}/${month}`,
    `${year}/${month}`,
    '7777',          //4
    `${year + 1}/${month}`,
    `${year + 2}/${month}`,
    `${year + 3}/${month}`,
]

const datesObj = {
    [dates[0]]: '',
    [dates[1]]: '',
    [dates[2]]: '',
    [dates[3]]: '',
    [dates[4]]: '',
    [dates[5]]: '',
    [dates[6]]: '',
    [dates[7]]: '',
}

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
    export_countries: [
        {
            ...datesObj,
            country_id: '',
        },
    ],
    export_products: [
        {
            ...datesObj,
            product_name: '',
        },
    ]
}

function UrgudulCalculations() {
    const [form, setForm] = useState(initialState)

    const handleInput = (key, value, objName) => {
        setForm({ ...form, [objName]: { ...form[objName], [key]: value } })
    }

    const handleSetFormCountry = (key, value, index) => {
        const newArr = form.export_countries
        newArr[index].country_id = value
        setForm({ ...form, export_countries: newArr })
    }

    const handleInputNested = (key, value, index, arrName) => {
        const newArr = form[arrName]
        newArr[index][key] = value
        setForm({ ...form, [arrName]: newArr })
    }

    const handleInputProductName = (e) => {
        const newArr = form.export_products
        newArr[e.target.id].product_name = e.target.value
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
        setForm({ ...form, export_countries: [...form.export_countries, { ...datesObj, country_id: '' }] })
    }

    const handleAddProduct = () => {
        setForm({ ...form, export_products: [...form.export_products, { ...datesObj, product_name: '' }] })
    }

    const handleRemoveField = (arrName, index) => {
        setForm({ ...form, [arrName]: form[arrName].filter((_, i) => i !== index) })
    }

    return (
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">B8</span>
                - Өөрийн төслийн хувьд дараах тооцооллыг хийнэ үү

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="/.../" position="bottom" />
            </div>

            <table className="tw-text-sm">
                <thead>
                    <tr className="tw-bg-blue-50">
                        <th className="tw-border tw-text-center"></th>
                        <th className="tw-border tw-text-center">{dates[0]}</th>
                        <th className="tw-border tw-text-center">{dates[1]}</th>
                        <th className="tw-border tw-text-center">{dates[2]}</th>
                        <th className="tw-border tw-text-center">{dates[3]}</th>
                        <th className="tw-border tw-text-center tw-flex tw-justify-evenly">
                            {dates[4]}
                            <HelpPopup main="Төслийн дуусах хугацаа, сар жилээр" position="bottom" />
                        </th>
                        <th className="tw-border tw-text-center">{dates[5]}</th>
                        <th className="tw-border tw-text-center">{dates[6]}</th>
                        <th className="tw-border tw-text-center">{dates[7]}</th>
                        <th className="tw-border tw-text-center">Нэгж</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="tw-h-8">
                        <td className="tw-border pl-2 pr-1 tw-font-medium">Борлуулалт</td>
                        {
                            dates.map((item, i) =>
                                <td className="tw-border tw-px-1" key={i}>
                                    <div className="tw-flex tw-justify-center">
                                        <NumberFormat className="tw-px-1 tw-outline-none tw-w-20 tw-bg-indigo-50 tw-rounded" value={form.sales[item]} thousandSeparator={true} prefix="$ " onValueChange={values => handleInput(item, values.value, 'sales')} />
                                    </div>
                                </td>
                            )
                        }
                        <td className="tw-border tw-font-bold">$</td>
                    </tr>
                    <tr className="tw-h-8">
                        <td className="tw-border px-1">
                            <div className="tw-flex tw-justify-between tw-items-center">
                                <span className="pl-1 tw-font-medium">Ажлын байр</span>

                                <HelpPopup main="НДШ төлдөг бүтэн цагийн ажлын байрны тоо." position="bottom" />
                            </div>
                        </td>
                        {
                            dates.map((item, i) =>
                                <td className="tw-border tw-px-1" key={i}>
                                    <div className="tw-flex tw-justify-center">
                                        <NumberFormat className="tw-px-1 tw-outline-none tw-w-20 tw-bg-indigo-50 tw-rounded" value={form.fullTime_workplace[item]} thousandSeparator={true} onValueChange={values => handleInput(item, values.value, 'fullTime_workplace')} />
                                    </div>
                                </td>
                            )
                        }
                        <td className="tw-border tw-truncate tw-font-medium">Т/х</td>
                    </tr>
                    <tr className="tw-h-8">
                        <td className="tw-border px-1">
                            <div className="tw-flex tw-justify-between tw-items-center">
                                <span className="pl-1 tw-font-medium">Бүтээмж</span>

                                <HelpPopup main="Нэг жилд үйлдвэрлэх үйлдвэрлэлийн тоо хэмжээ гм." position="bottom" />
                            </div>
                        </td>
                        {
                            dates.map((item, i) =>
                                <td className="tw-border tw-px-1" key={i}>
                                    <div className="tw-flex tw-justify-center">
                                        <NumberFormat className="tw-px-1 tw-outline-none tw-w-20 tw-bg-indigo-50 tw-rounded" value={form.productivity[item]} thousandSeparator={true} onValueChange={values => handleInput(item, values.value, 'productivity')} />
                                    </div>
                                </td>
                            )
                        }
                        <td className="tw-border tw-truncate tw-font-medium">Т/х</td>
                    </tr>
                    <tr className="tw-h-8">
                        <td className="tw-border pl-2 pr-1 tw-font-medium">Экспорт</td>
                        {
                            dates.map((item, i) =>
                                <td className="tw-border" key={i}>
                                    <div className="tw-flex tw-justify-center">
                                        <NumberFormat className="tw-px-1 tw-outline-none tw-w-20 tw-bg-indigo-50 tw-rounded" value={form.export[item]} thousandSeparator={true} prefix="$ " onValueChange={values => handleInput(item, values.value, 'export')} />
                                    </div>
                                </td>
                            )
                        }
                        <td className="tw-border tw-truncate tw-font-bold">$</td>
                    </tr>
                    <tr className="tw-h-8 tw-bg-blue-50">
                        <td className="tw-border" colSpan="9">
                            <div className="tw-flex tw-items-center tw-font-medium">
                                <PenSVG className="tw-w-5 tw-h-5 tw-mx-1" />
                                Экпорт хийсэн улсуудын талаарх мэдээлэл
                            </div>
                        </td>
                        <td className="tw-border tw-truncate tw-font-bold">$</td>
                    </tr>
                    {
                        form.export_countries.map((item, i) =>
                            <tr className="tw-h-8" key={i}>
                                <td className="tw-border tw-px-1">
                                    <SearchSelectCompact placeholder={`Экспорт хийсэн улс ${i + 1}`} data={countries} value={form.export_countries[i].country_id} name="country_id" id={i} description="description" description_mon="description_mon" setForm={handleSetFormCountry} classDiv="tw-bg-indigo-50 tw-rounded" classInput="tw-w-36 tw-bg-transparent" />
                                </td>
                                {
                                    dates.map((key, j) =>
                                        <td className="tw-border tw-px-1" key={j}>
                                            <div className="tw-flex tw-justify-center">
                                                <NumberFormat className="tw-px-1 tw-outline-none tw-w-20 tw-bg-indigo-50 tw-rounded" value={form.export_countries[i][key]} thousandSeparator={true} prefix="$ " onValueChange={values => handleInputNested(key, values.value, i, 'export_countries')} />
                                            </div>
                                        </td>
                                    )
                                }
                                <td className="tw-border">
                                    <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-7 tw-h-7 tw-transition-colors tw-duration-300" />} onClick={() => handleRemoveField('export_countries', i)} classAppend="tw-text-red-500 active:tw-text-red-600 tw-mx-auto" />
                                </td>
                            </tr>
                        )
                    }
                    <tr className="tw-h-8">
                        <td className="tw-border" colSpan="10">
                            <div className="tw-flex tw-justify-end tw-items-center">
                                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                                    {form.export_countries.length}ш улс нэмсэн байна.
                                </div>

                                <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-7 tw-h-7 tw-transition-colors tw-duration-300" />} onClick={handleAddCountry} classAppend="tw-text-blue-500 active:tw-text-blue-600 tw-mr-1" />
                            </div>
                        </td>
                    </tr>
                    <tr className="tw-h-8 tw-bg-blue-50">
                        <td className="tw-border" colSpan="9">
                            <div className="tw-flex tw-items-center tw-font-medium">
                                <PenSVG className="tw-w-5 tw-h-5 tw-mx-1" />
                                Экпорт хийсэн бүтээгдэхүүнүүдийн талаарх мэдээлэл
                            </div>
                        </td>
                        <td className="tw-border tw-truncate tw-font-bold">$</td>
                    </tr>
                    {
                        form.export_products.map((item, i) =>
                            <tr className="tw-h-8" key={i}>
                                <td className="tw-border tw-px-1">
                                    <input className="tw-w-full tw-px-1 tw-outline-none tw-placeholder-gray-500 tw-bg-indigo-50 tw-rounded" placeholder={`Бүтээгдэхүүн ${i + 1}`} type="text" value={form.export_products[i].product_name} name="product_name" id={i} onChange={handleInputProductName} />
                                </td>
                                {
                                    dates.map((key, j) =>
                                        <td className="tw-border tw-px-1" key={j}>
                                            <div className="tw-flex tw-justify-center">
                                                <NumberFormat className="tw-px-1 tw-outline-none tw-w-20 tw-bg-indigo-50 tw-rounded" thousandSeparator={true} prefix="$ " value={form.export_products[i][key]} onValueChange={values => handleInputNested(key, values.value, i, 'export_products')} />
                                            </div>
                                        </td>
                                    )
                                }
                                <td className="tw-border">
                                    <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-7 tw-h-7 tw-transition-colors tw-duration-300" />} onClick={() => handleRemoveField('export_products', i)} classAppend="tw-text-red-500 active:tw-text-red-600 tw-mx-auto" />
                                </td>
                            </tr>
                        )
                    }
                    <tr className="tw-h-8">
                        <td className="tw-border" colSpan="10">
                            <div className="tw-flex tw-justify-end tw-items-center">
                                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                                    {form.export_products.length}ш бүтээгдэхүүн нэмсэн байна.
                                </div>

                                <ButtonTooltip tooltip="Нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-7 tw-h-7 tw-transition-colors tw-duration-300" />} onClick={handleAddProduct} classAppend="tw-text-blue-500 active:tw-text-blue-600 tw-mr-1" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UrgudulCalculations
