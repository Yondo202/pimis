import React, { useContext, useEffect, useRef, useState } from 'react'
import HelpPopup from 'components/help_popup/helpPopup'
import axios from 'axiosbase'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import SearchSelectCompact from 'components/urgudul_components/searchSelectCompact'
import NumberFormat from 'react-number-format'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { Fragment } from 'react'
import { config, Transition } from 'react-spring/renderprops'
import CloseSVG from 'assets/svgComponents/closeSVG'
import TreeSelectCompact from 'components/urgudul_components/treeSelectCompact'


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
                    product_name: null,
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

export const sortDates = (datesObj) => {
    const keys = Object.keys(datesObj)
    const filterYears = keys.filter(key => key !== 'submitDate' && key !== 'endDate')
    const highestYear = Math.max(...filterYears)
    const insertIndex = keys.findIndex(key => +key === highestYear - 2)
    filterYears.splice(insertIndex, 0, 'submitDate', 'endDate')
    return filterYears
}

function UrgudulCalculations() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.id !== undefined) {
            const exportDatas = UrgudulCtx.data.exportDatas

            if (Object.keys(exportDatas || []).length > 0) {
                setForm({
                    ...exportDatas,
                    submitDate: {
                        year: exportDatas?.submitDate?.year ?? year,
                        month: exportDatas?.submitDate?.month ?? month,
                    },
                    endDate: {
                        year: +exportDatas?.endDate?.year ?? UrgudulCtx.data.project_end?.split('-')[0],
                        month: +exportDatas?.endDate?.month ?? UrgudulCtx.data.project_end?.split('-')[1],
                    }
                })
            } else {
                setForm({
                    ...form,
                    endDate: {
                        year: +UrgudulCtx.data.project_end?.split('-')[0] || null,
                        month: +UrgudulCtx.data.project_end?.split('-')[1] || null,
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
        newArr[countryIndex].export_products[productIndex][key] = value
        setForm({ ...form, export_details: newArr })
    }

    const [countries, setCounties] = useState([])
    const [products, setProducts] = useState([])
    const [rates, setRates] = useState([])

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

        axios.get('currency-rates')
            .then(res => {
                console.log(res.data)
                setRates(res.data.data)
            })
    }, [])

    const datesForm = sortDates(form.sales)
    const datesFormObj = datesForm.reduce((a, c) => ({ ...a, [c]: null }), {})

    const getRate = (year) => rates.filter(rate => rate.eyear === year)[0]?.usd_to_mnt

    const handleAddCountry = () => {
        const newCountry = {
            countryId: null,
            export_products: [
                {
                    ...datesFormObj,
                    productId: null,
                    product_name: null,
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
            productId: null,
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
        Object.keys(exportSums).forEach(key => allValid = allValid && !isNaN(exportSums[key]))

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

    const endDateGiven = form.endDate.year && form.endDate.month

    const [suggestPage5Open, setSuggestPage5Open] = useState(false)

    const suggestPage5Ref = useRef(null)

    const handleClickOutside = (e) => {
        if (!suggestPage5Ref.current?.contains(e.target)) {
            setSuggestPage5Open(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const navToPage5 = () => history.push('/urgudul/5')

    const handleFocusCheck = () => !endDateGiven && setSuggestPage5Open(true)

    const containerRef = useRef()

    return (
        <div className="tw-flex tw-justify-center tw-w-full tw-px-4">
            <div className="tw-mt-8 tw-mb-80 tw-py-2 tw-rounded-lg tw-shadow-md tw-border-t tw-border-gray-100 tw-bg-white tw-max-w-full">
                <div className="tw-border-b tw-border-dashed">
                    <div className="tw-font-medium tw-p-3 tw-flex tw-items-center tw-text-15px">
                        <span className="tw-text-blue-500 tw-text-xl tw-mx-2">B8</span>
                        <span className="tw-leading-tight">- Өөрийн төслийн хувьд дараах тооцооллыг хийнэ үү</span>

                        <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Мөнгөн дүн бүхий тооцооллуудыг тухайн жилийн доор харуулсан тэр оны долларын ханшийг ашиглан доллар руу хөрвүүлж хийнэ үү." position="bottom" />
                    </div>

                    {UrgudulCtx.data.project_number &&
                        <div className="tw-ml-5 tw-mb-2 tw-font-medium tw-text-13px">
                            Өргөдлийн дугаар:
                            <span className="tw-text-blue-500 tw-ml-2">{UrgudulCtx.data.project_number}</span>
                        </div>
                    }
                </div>

                <div className="tw-text-sm tw-mt-6 tw-overflow-x-auto tw-overflow-y-hidden tw-mx-auto" ref={containerRef}>
                    <table className="tw-mx-1.5">
                        <thead>
                            <tr className="tw-h-9">
                                <th className="tw-border tw-border-gray-300 tw-text-center"></th>
                                {datesForm.map(date => {
                                    switch (date) {
                                        case 'submitDate':
                                            return <th className="tw-border tw-border-gray-300" key={date}>
                                                <div className="tw-flex tw-flex-col tw-items-center tw-py-1">
                                                    <span className="tw-mt-2">
                                                        {`${form.submitDate.year || ''}-${form.submitDate.month || ''}`}
                                                    </span>
                                                    <span className="tw-text-xs tw-mt-1 tw-px-1 tw-text-indigo-500" style={{ minHeight: 15 }}>
                                                        {getRate(form.submitDate.year) && `(${getRate(form.submitDate.year).toFixed(2)} ₮)`}
                                                    </span>
                                                </div>
                                            </th>
                                        case 'endDate':
                                            return <th className="tw-border tw-border-gray-300" key={date}>
                                                <div className="tw-flex tw-flex-col tw-items-center tw-py-1">
                                                    <div className={`tw-flex tw-justify-around tw-items-center ${!endDateGiven && 'tw-bg-red-100 tw-rounded'} tw-mx-1 tw-mt-1`}>
                                                        {`${form.endDate.year ? form.endDate.year : ''}-${form.endDate.month ? form.endDate.month : ''}`}
                                                        <HelpPopup main="Төслийн дуусах хугацаа, жил сараар." position="bottom" />
                                                    </div>
                                                    <span className="tw-text-xs tw-mt-0.5 tw-px-1 tw-text-indigo-500" style={{ minHeight: 15 }}>
                                                        {getRate(form.endDate.year) && `(${getRate(form.endDate.year).toFixed(2)} ₮)`}
                                                    </span>
                                                </div>
                                            </th>
                                        default:
                                            return <th className="tw-border tw-border-gray-300 tw-text-center" key={date}>
                                                <div className="tw-flex tw-flex-col tw-items-center tw-py-1">
                                                    <span className="tw-mt-2">
                                                        {date}
                                                    </span>
                                                    <span className="tw-text-xs tw-mt-1 tw-px-1 tw-text-indigo-500" style={{ minHeight: 15 }}>
                                                        {getRate(+date) && `(${getRate(+date).toFixed(2)} ₮)`}
                                                    </span>
                                                </div>
                                            </th>
                                    }
                                })}
                                <th className="tw-border tw-border-gray-300 tw-text-center">Нэгж</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tw-h-9">
                                <td className="tw-border tw-border-gray-300 pl-2 pr-1 tw-font-medium">Борлуулалт</td>
                                {datesForm.map((item, i) =>
                                    <td className="tw-border tw-border-gray-300 tw-px-1" key={i}>
                                        <div className="tw-flex tw-justify-center">
                                            <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(form.sales[item]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={form.sales[item] || ''} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} onValueChange={values => handleInput(item, values.floatValue, 'sales')} onFocus={handleFocusCheck} />
                                        </div>
                                    </td>
                                )}
                                <td className="tw-border tw-border-gray-300 tw-font-bold tw-text-center">$</td>
                            </tr>
                            <tr className="tw-h-9">
                                <td className="tw-border tw-border-gray-300 tw-px-1">
                                    <div className="tw-flex tw-justify-between tw-items-center">
                                        <span className="pl-1 tw-font-medium">Ажлын байр</span>

                                        <HelpPopup classAppend="tw-ml-2" main="НДШ төлдөг бүтэн цагийн ажлын байрны тоо." position="bottom" />
                                    </div>
                                </td>
                                {datesForm.map((item, i) =>
                                    <td className="tw-border tw-border-gray-300 tw-px-1" key={i}>
                                        <div className="tw-flex tw-justify-center">
                                            <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(form.fullTime_workplace[item]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={form.fullTime_workplace[item] || ''} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} onValueChange={values => handleInput(item, values.floatValue, 'fullTime_workplace')} onFocus={handleFocusCheck} />
                                        </div>
                                    </td>
                                )}
                                <td className="tw-border tw-border-gray-300 tw-truncate tw-font-medium tw-text-center">Т/х</td>
                            </tr>
                            <tr className="tw-h-9">
                                <td className="tw-border tw-border-gray-300 tw-px-1">
                                    <div className="tw-flex tw-justify-between tw-items-center">
                                        <span className="pl-1 tw-font-medium">Бүтээмж</span>

                                        <HelpPopup classAppend="tw-ml-2" main="Нэг жилд үйлдвэрлэх үйлдвэрлэлийн тоо хэмжээ гм." position="bottom" />
                                    </div>
                                </td>
                                {datesForm.map((item, i) =>
                                    <td className="tw-border tw-border-gray-300 tw-px-1" key={i}>
                                        <div className="tw-flex tw-justify-center">
                                            <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(form.productivity[item]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={form.productivity[item] || ''} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} onValueChange={values => handleInput(item, values.floatValue, 'productivity')} onFocus={handleFocusCheck} />
                                        </div>
                                    </td>
                                )}
                                <td className="tw-border tw-border-gray-300 tw-truncate tw-font-medium tw-text-center">Т/х</td>
                            </tr>
                            <tr className="tw-h-9">
                                <td className="tw-border tw-border-gray-300 tw-px-1">
                                    <div className="tw-flex tw-justify-between tw-items-center">
                                        <span className="pl-1 tw-font-medium">Экспорт</span>

                                        <HelpPopup classAppend="tw-ml-2" main="Экспортын тооцоог доорх хүснэгтэнд экспорт хийсэн улс болон бүтээгдхүүнээр задлан бичнэ үү." position="bottom" />
                                    </div>
                                </td>
                                {datesForm.map((item, i) =>
                                    <td className="tw-border tw-border-gray-300 tw-px-1" key={i}>
                                        <div className={`tw-text-right tw-font-medium tw-truncate tw-w-20 tw-px-1 tw-py-0.5 tw-rounded ${validate && isNaN(exportSums[item]) && 'tw-bg-red-100'}`}>
                                            {exportSums[item] !== 0 && exportSums[item]?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </td>
                                )}
                                <td className="tw-border tw-border-gray-300 tw-truncate tw-font-bold tw-text-center">$</td>
                            </tr>
                            {form.export_details.map((country, i) =>
                                <Fragment key={i}>
                                    <tr className="tw-h-9">
                                        <td className="tw-border tw-border-gray-300 tw-px-1">
                                            <SearchSelectCompact placeholder="Экспорт хийсэн улс" data={countries} value={country.countryId} name="countryId" id={i} displayName="description_mon" setForm={handleSetFormCountry} classDiv={validate && checkInvalid(country.countryId) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'} classInput="tw-bg-transparent tw-font-medium" selectWidth={containerRef.current?.getBoundingClientRect().width > 220 ? 220 : containerRef.current?.getBoundingClientRect().width - 54} />
                                        </td>
                                        <td className="tw-border tw-border-gray-300 tw-px-2" colSpan={datesForm.length}>
                                            <button className="tw-float-right tw-bg-gray-600 tw-text-white tw-text-xs tw-font-medium tw-rounded-sm focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors tw-py-1 tw-px-4" onClick={() => handleRemoveCountry(i)}>
                                                Улсыг хасах
                                            </button>
                                        </td>
                                        <td className="tw-border tw-truncate tw-font-bold tw-text-center">$</td>
                                    </tr>
                                    {
                                        country.export_products.map((product, j) =>
                                            <Fragment key={j}>
                                                <tr className="tw-h-9">
                                                    <td className="tw-border tw-border-gray-300 tw-px-1">
                                                        {/* <SearchSelectCompact placeholder={`Бүтээгдэхүүний ангилал`} data={products} value={product.productId} name="productId" id={j} id2={i} displayName="description_mon" setForm={handleSetFormProduct} classDiv={validate && checkInvalid(product.productId) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'} classInput="tw-bg-transparent tw-font-medium" selectWidth={containerRef.current?.getBoundingClientRect().width - 54} /> */}
                                                        <TreeSelectCompact data={products} placeholder="Бүтээгдэхүүний ангилал" displayName="description_mon" value={product.productId} name="productId" index={j} index1={i} handleChange={handleSetFormProduct} selectWidth={containerRef.current?.getBoundingClientRect().width - 36} validate={validate && checkInvalid(product.productId)} />
                                                    </td>
                                                    <td className="tw-border tw-border-gray-300 tw-px-2" colSpan={datesForm.length + 1}>
                                                        <button className="tw-float-right tw-bg-gray-600 tw-text-white tw-text-xs tw-font-medium tw-rounded-sm focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors tw-py-1 tw-px-2" onClick={() => handleRemoveProduct(j, i)}>
                                                            Бүтээгдэхүүнийг хасах
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr className="tw-h-9">
                                                    <td className="tw-border tw-border-gray-300 tw-px-1">
                                                        <div className="tw-flex tw-items-center">
                                                            <input className={`tw-flex-grow focus:tw-outline-none tw-px-1.5 tw-py-0.5 tw-ml-3 tw-rounded ${validate && checkInvalid(product.product_name) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'} tw-font-medium tw-placeholder-gray-500`} type="text" value={product.product_name || ''} onChange={e => handleSetFormProduct('product_name', e.target.value, j, i)} placeholder="Бүтээгдэхүүний код" title={product.product_name} />
                                                            <HelpPopup classAppend="tw-ml-1" main="Гаалийн бараа, бүтээгдэхүүний кодыг бичнэ үү." position="bottom" />
                                                        </div>
                                                    </td>
                                                    {
                                                        datesForm.map((key, k) =>
                                                            <td className="tw-border tw-border-gray-300 tw-px-1" key={k}>
                                                                <div className="tw-flex tw-justify-center">
                                                                    <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(product[key]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={product[key] || ''} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} onValueChange={values => handleSetFormProduct(key, values.floatValue, j, i)} onFocus={handleFocusCheck} />
                                                                </div>
                                                            </td>
                                                        )
                                                    }
                                                    <td className="tw-border tw-border-gray-300 tw-truncate tw-font-bold tw-text-center">$</td>
                                                </tr>
                                            </Fragment>
                                        )
                                    }
                                    <tr className="tw-h-9">
                                        <td className="tw-border tw-border-gray-300 tw-px-2" colSpan={datesForm.length + 2}>
                                            <button className="tw-float-right tw-bg-gray-600 tw-text-white tw-text-xs tw-font-medium tw-rounded-sm focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors tw-py-1 tw-px-2" onClick={() => handleAddProduct(i)}>
                                                Бүтээгдэхүүн нэмэх
                                            </button>
                                        </td>
                                    </tr>
                                </Fragment>
                            )}
                            <tr className="tw-h-9">
                                <td className="tw-border tw-border-gray-300 tw-px-2" colSpan={datesForm.length + 2}>
                                    <button className="tw-float-right tw-bg-gray-600 tw-text-white tw-text-xs tw-font-medium tw-rounded-sm focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors tw-py-1 tw-px-4" onClick={handleAddCountry}>
                                        Улс нэмэх
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="tw-flex tw-justify-center">
                    <ButtonTooltip classAppend="tw-mt-12 tw-mb-8" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
                </div>
            </div>

            <Transition
                items={suggestPage5Open}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                config={config.stiff}>
                {item => item && (anims =>
                    <div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10" style={anims}>
                        <Transition
                            items={suggestPage5Open}
                            from={{ transform: 'translateY(-20px' }}
                            enter={{ transform: 'translateY(0)' }}
                            leave={{ transform: 'translateY(20px' }}
                            config={config.stiff}>
                            {item1 => item1 && (anims1 =>
                                <div className="tw-w-80 tw-p-1 tw-bg-white tw-rounded-md tw-grid tw-grid-cols-1 tw-shadow-md tw-ring-2 tw-ring-indigo-500" style={anims1} ref={suggestPage5Ref}>
                                    <button className="tw-float-right tw-text-red-500 tw-justify-self-end focus:tw-outline-none active:tw-text-red-600 tw-transition-colors tw-border tw-border-red-500 tw-rounded active:tw-border-red-600" onClick={() => setSuggestPage5Open(false)}>
                                        <CloseSVG className="tw-w-5 tw-h-5" />
                                    </button>

                                    <div className="tw-text-15px tw-text-center tw-mx-6 md:tw-mx-10 tw-mt-2 tw-leading-relaxed">
                                        Төслийн дуусах хугацаа тодорхойгүй байна. Та эхлээд хуудас 5-ыг бөглөнө үү.
                                    </div>

                                    <button className="tw-py-2 tw-px-5 tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-text-white tw-rounded hover:tw-shadow-md focus:tw-outline-none tw-justify-self-center tw-mt-6 tw-mb-4 tw-text-sm" onClick={navToPage5}>
                                        5 хуудас руу шилжих
                                    </button>
                                </div>
                            )}
                        </Transition>
                    </div>
                )}
            </Transition>
        </div>
    )
}

export default UrgudulCalculations
