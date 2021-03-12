import React, { useContext, useEffect, useState } from 'react'
import HelpPopup from 'components/help_popup/helpPopup'
import axios from 'axiosbase'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import SearchSelectCompact from 'components/urgudul_components/searchSelectCompact'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import NumberFormat from 'react-number-format'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { Fragment } from 'react'


const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const baseYear = 2016

const yearsBefore = [...Array(year - baseYear)].map((_, i) => baseYear + i)
const yearsAfter = [...Array(3)].map((_, i) => year + i + 1)

const dates = [...yearsBefore, 'submitDate', 'endDate', ...yearsAfter]

const datesObj = dates.reduce((a, c) => ({ ...a, [c]: null }), {})

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
    export_details: [
        {
            countryId: null,
            export_products: [
                {
                    ...datesObj,
                    productId: null,
                },
            ],
        },
    ],
    submitDate: {
        year: year,
        month: month,
    },
    endDate: {
        year: null,
        month: null,
    },
}

function UrgudulCalculations() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (!UrgudulCtx.data.project_end) {
            if ('project_end' in UrgudulCtx.data) {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Төслийн дуусах хугацааг оруулаагүй байна. Хуудас 5-ыг эхлээд бөглөнө үү.' })
                setTimeout(() => history.push('/urgudul/5'), 3000)
            }
        } else {
            if (Object.keys(UrgudulCtx.data.exportDatas).length > 0) {
                setForm({ ...UrgudulCtx.data.exportDatas })
            } else {
                setForm({
                    ...form, endDate: {
                        year: UrgudulCtx.data.project_end.split('-')[0],
                        month: UrgudulCtx.data.project_end.split('-')[1],
                    }
                })
            }
        }
    }, [UrgudulCtx.data.id])

    const handleInput = (key, value, objName) => {
        setForm({ ...form, [objName]: { ...form[objName], [key]: value } })
    }

    const handleSetFormCountry = (key, value, index) => {
        const newArr = form.export_details
        newArr[index].countryId = value
        setForm({ ...form, export_details: newArr })
    }

    const handleSetFormProduct = (key, value, productIndex, countryIndex) => {
        const newArr = form.export_details
        newArr[countryIndex].export_products[productIndex].productId = value
        setForm({ ...form, export_details: newArr })
    }

    const handleInputProductExport = (key, value, productIndex, countryIndex) => {
        const newArr = form.export_details
        newArr[countryIndex].export_products[productIndex][key] = value
        setForm({ ...form, export_details: newArr })
    }

    const [countries, setCounties] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('countries')
            .then(res => {
                console.log(res.data)
                setCounties(res.data.data)
            })

        axios.get('products')
            .then(res => {
                console.log(res.data)
                setProducts(res.data.data.docs)
            })
    }, [])

    const datesForm = Object.keys(form.sales)
    const datesFormObj = dates.reduce((a, c) => ({ ...a, [c]: null }), {})

    const handleAddCountry = () => {
        const newCountry = {
            countryId: null,
            export_products: [
                {
                    ...datesFormObj,
                    productId: null,
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
            ...datesFormObj,
            product_name: null,
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

    const exportSums = { ...datesFormObj }

    for (const country of form.export_details) {
        for (const product of country.export_products) {
            Object.keys(exportSums).forEach(key => {
                exportSums[key] = +exportSums[key] + +product[key]
            })
        }
    }

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        let allValid = true
        const arr = ['sales', 'fullTime_workplace', 'productivity']
        arr.forEach(key => {
            allValid = allValid && datesForm.every(item => !checkInvalid(form[key][item]))
        })
        for (const country of form.export_details) {
            allValid = allValid && country.countryId
            for (const product of country.export_products) {
                allValid = allValid && datesForm.every(item => !checkInvalid(product[item]))
            }
        }

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, { exportDatas: form }, {
                    headers: { 'Authorization': getLoggedUserToken() }
                })
                    .then(res => {
                        console.log(res.data)
                        UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                        AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Борлуулалт, экспортын тооцоолол хадгалагдлаа.' })
                        history.push('/urgudul/9')
                    })
                    .catch(err => {
                        console.log(err.response?.data)
                        AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                    })
            } else {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Аль нэг талбар бөглөгдөөгүй байна. Та гүйцэт бөглөнө үү.' })
            }
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
            history.push('/urgudul/1')
        }
    }

    const [validate, setValidate] = useState(false)

    const checkInvalid = (value) => {
        switch (value) {
            case null:
                return true
            case '':
                return true
            default:
                return false
        }
    }

    return (
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center" style={{ fontSize: '15px' }}>
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2 tw-leading-5">B8</span>
                - Өөрийн төслийн хувьд дараах тооцооллыг хийнэ үү

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="/.../" position="bottom" />
            </div>

            <div className="tw-text-sm tw-mt-3 tw-overflow-x-scroll">
                <table>
                    <thead>
                        <tr className="tw-h-9">
                            <th className="tw-border tw-text-center"></th>
                            {datesForm.map(date => {
                                switch (date) {
                                    case 'submitDate':
                                        return <th className="tw-border tw-text-center" key={date}>
                                            {`${form.submitDate.year}-${form.submitDate.month}`}
                                        </th>
                                    case 'endDate':
                                        return <th className="tw-border" key={date}>
                                            <div className="tw-flex tw-justify-evenly tw-items-center">
                                                {`${form.endDate.year ? form.endDate.year : ''}-${form.endDate.month ? form.endDate.month : ''}`}
                                                <HelpPopup main="Төслийн дуусах хугацаа, сар жилээр" position="bottom" />
                                            </div>
                                        </th>
                                    default:
                                        return <th className="tw-border tw-text-center" key={date}>
                                            {date}
                                        </th>
                                }
                            })}
                            <th className="tw-border tw-text-center">Нэгж</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="tw-h-9">
                            <td className="tw-border pl-2 pr-1 tw-font-medium">Борлуулалт</td>
                            {datesForm.map((item, i) =>
                                <td className="tw-border tw-px-1" key={i}>
                                    <div className="tw-flex tw-justify-center">
                                        <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(form.sales[item]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={form.sales[item] || ''} thousandSeparator={true} onValueChange={values => handleInput(item, values.value, 'sales')} />
                                    </div>
                                </td>
                            )}
                            <td className="tw-border tw-font-bold tw-text-center">$</td>
                        </tr>
                        <tr className="tw-h-9">
                            <td className="tw-border tw-px-1">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <span className="pl-1 tw-font-medium">Ажлын байр</span>

                                    <HelpPopup main="НДШ төлдөг бүтэн цагийн ажлын байрны тоо." position="bottom" />
                                </div>
                            </td>
                            {datesForm.map((item, i) =>
                                <td className="tw-border tw-px-1" key={i}>
                                    <div className="tw-flex tw-justify-center">
                                        <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(form.fullTime_workplace[item]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={form.fullTime_workplace[item] || ''} thousandSeparator={true} onValueChange={values => handleInput(item, values.value, 'fullTime_workplace')} />
                                    </div>
                                </td>
                            )}
                            <td className="tw-border tw-truncate tw-font-medium tw-text-center">Т/х</td>
                        </tr>
                        <tr className="tw-h-9">
                            <td className="tw-border tw-px-1">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <span className="pl-1 tw-font-medium">Бүтээмж</span>

                                    <HelpPopup main="Нэг жилд үйлдвэрлэх үйлдвэрлэлийн тоо хэмжээ гм." position="bottom" />
                                </div>
                            </td>
                            {datesForm.map((item, i) =>
                                <td className="tw-border tw-px-1" key={i}>
                                    <div className="tw-flex tw-justify-center">
                                        <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(form.productivity[item]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={form.productivity[item] || ''} thousandSeparator={true} onValueChange={values => handleInput(item, values.value, 'productivity')} />
                                    </div>
                                </td>
                            )}
                            <td className="tw-border tw-truncate tw-font-medium tw-text-center">Т/х</td>
                        </tr>
                        <tr className="tw-h-9">
                            <td className="tw-border tw-px-1">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <span className="pl-1 tw-font-medium">Экспорт</span>

                                    <HelpPopup main="Экспортын тооцоог доорх хүснэгтэнд экспорт хийсэн улс болон бүтээгдхүүнээр задлан бичнэ үү." position="bottom" />
                                </div>
                            </td>
                            {datesForm.map((item, i) =>
                                <td className="tw-border tw-px-1 tw-text-right tw-font-medium" key={i}>
                                    {exportSums[item] !== 0 && exportSums[item]?.toLocaleString()}
                                </td>
                            )}
                            <td className="tw-border tw-truncate tw-font-bold tw-text-center">$</td>
                        </tr>
                        {form.export_details.map((country, i) =>
                            <Fragment key={i}>
                                <tr className="tw-h-9">
                                    <td className="tw-border tw-px-1">
                                        <SearchSelectCompact placeholder={`Экспорт хийсэн улс ${i + 1}`} data={countries} value={country.countryId} name="countryId" id={i} displayName="description_mon" setForm={handleSetFormCountry} classDiv={`tw-py-0.5 tw-rounded ${validate && checkInvalid(country.countryId) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} classInput="tw-w-36 tw-bg-transparent tw-font-medium" />
                                    </td>
                                    <td className="tw-border tw-px-2" colSpan={datesForm.length}>
                                        <button className="tw-float-right tw-bg-gray-500 tw-text-white tw-text-xs tw-font-medium tw-rounded-sm focus:tw-outline-none active:tw-bg-gray-600" onClick={() => handleRemoveCountry(i)} style={{ padding: '3px 8px' }}>
                                            Улс хасах
                                        </button>
                                    </td>
                                    <td className="tw-border tw-truncate tw-font-bold tw-text-center">$</td>
                                </tr>
                                {
                                    country.export_products.map((product, j) =>
                                        <tr className="tw-h-9" key={j}>
                                            <td className="tw-border tw-px-1">
                                                <SearchSelectCompact placeholder={`Бүтээгдэхүүн ${j + 1}`} data={products} value={product.productId} name="productId" id={j} id2={i} displayName="description_mon" setForm={handleSetFormProduct} classDiv={`tw-py-0.5 tw-rounded ${validate && checkInvalid(product.productId) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} classInput="tw-w-36 tw-bg-transparent tw-font-medium" selectWidth={window.innerWidth > 922 ? '922px' : `${window.innerWidth - 128}px`} />
                                            </td>
                                            {
                                                datesForm.map((key, k) =>
                                                    <td className="tw-border tw-px-1" key={k}>
                                                        <div className="tw-flex tw-justify-center">
                                                            <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(product[key]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={product[key] || ''} thousandSeparator={true} onValueChange={values => handleInputProductExport(key, values.value, j, i)} />
                                                        </div>
                                                    </td>
                                                )
                                            }
                                            <td className="tw-border">
                                                <div className="tw-flex tw-items-center tw-justify-center">
                                                    <ButtonTooltip tooltip="Бүтээгдэхүүнийг хасах" beforeSVG={<MinusCircleSVG className="tw-w-7 tw-h-7 tw-transition-colors tw-duration-300" />} onClick={() => handleRemoveProduct(j, i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                <tr className="tw-h-9">
                                    <td className="tw-border tw-px-2" colSpan={datesForm.length + 2}>
                                        <button className="tw-float-right tw-bg-gray-500 tw-text-white tw-text-xs tw-font-medium tw-rounded-sm focus:tw-outline-none active:tw-bg-gray-600" onClick={() => handleAddProduct(i)} style={{ padding: '3px 8px' }}>
                                            Бүтээгдэхүүн нэмэх
                                        </button>
                                    </td>
                                </tr>
                            </Fragment>
                        )}
                        <tr className="tw-h-9">
                            <td className="tw-border tw-px-2" colSpan={datesForm.length + 2}>
                                <button className="tw-float-right tw-bg-gray-500 tw-text-white tw-text-xs tw-font-medium tw-rounded-sm focus:tw-outline-none active:tw-bg-gray-600" onClick={handleAddCountry} style={{ padding: '3px 8px' }}>
                                    Улс нэмэх
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4" classButton="tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600 tw-text-sm" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulCalculations
