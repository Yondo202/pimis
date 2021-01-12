import React, { useContext, useEffect, useState } from 'react'
import FormSmall from 'components/form_small/formSmall'
import FormInline from 'components/form_inline/formInline'
import { useHistory } from 'react-router-dom'
import DocAddSVG from 'assets/svgComponents/docAddSVG'
import UrgudulContext, { initialState } from 'components/utilities/urgudulContext'
import axios from 'axios'
import SearchSVG from 'assets/svgComponents/searchSVG'


function EnterpriseInfo() {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const [changed, setChanged] = useState(false)

    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData

    const [company, setCompany] = useState(data.companies[0] || initialState.companies[0])

    const handleInput = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value })
        setChanged(true)
    }

    const handleInputFormat = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value.replaceAll(',', '') })
        setChanged(true)
    }

    const [businessSectors, setBusinessSectors] = useState([])
    const [locations, setLocations] = useState([])
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios.get('http://192.168.88.78:3000/api/business-sector')
            .then(res => {
                setBusinessSectors(res.data.data)
                company.business_sectorid && setSearchSector(res.data.data.filter(obj => obj.id === company.business_sectorid)[0].bdescription_mon)
            }).catch(err => {
                console.log(err)
            })

        axios.get('http://192.168.88.78:3000/api/locations')
            .then(res => {
                setLocations(res.data.data)
                company.locationid && setSearchLocation(res.data.data.filter(obj => obj.id === company.locationid)[0].description_mon)
            }).catch(err => {
                console.log(err)
            })

        axios.get('http://192.168.88.78:3000/api/countries')
            .then(res => {
                setCountries(res.data.data)
                company.invested_countryid && setSearchCountry(res.data.data.filter(obj => obj.id === company.invested_countryid)[0].description_mon)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const filterSector = (obj) => {
        if (obj) {
            const str = ('' + obj['bdescription_mon']).toLowerCase()
            return str.includes(searchSector.toLowerCase())
        } else {
            return true
        }
    }

    const compareSector = (a, b) => {
        if (a.bdescription_mon > b.bdescription_mon) {
            return 1
        } else if (a.bdescription_mon < b.bdescription_mon) {
            return -1
        } else return 0
    }

    const filter = (obj, searchState) => {
        if (obj) {
            const str = ('' + obj.description_mon).toLowerCase()
            return str.includes(searchState.toLowerCase())
        }
    }

    const compare = (a, b) => {
        if (a.description_mon > b.description_mon) {
            return 1
        } else if (a.description_mon < b.description_mon) {
            return -1
        } else return 0
    }

    const [focusWoman, setFocusWoman] = useState(false)

    const [focusSector, setFocusSector] = useState(false)
    const [searchSector, setSearchSector] = useState('')

    const handleFocusSector = () => {
        setSearchSector('')
        setFocusSector(true)
        setChanged(true)
    }

    const handleBlurSector = () => {
        if (businessSectors.map(obj => obj.bdescription_mon).includes(searchSector)) {
            setCompany({ ...company, business_sectorid: businessSectors.filter(obj => obj.bdescription_mon === searchSector)[0].id })
        } else {
            setCompany({ ...company, business_sectorid: '' })
            setSearchSector('')
        }
        setFocusSector(false)
    }

    const handleSelectSector = (id, desc) => {
        setCompany({ ...company, business_sectorid: id })
        setChanged(true)
        setSearchSector(desc)
    }

    const [focusLocation, setFocusLocation] = useState(false)
    const [searchLocation, setSearchLocation] = useState('')

    const handleFocusLocation = () => {
        setSearchLocation('')
        setFocusLocation(true)
        setChanged(true)
    }

    const handleBlurLocation = () => {
        if (locations.map(obj => obj.description_mon).includes(searchLocation)) {
            setCompany({ ...company, locationid: locations.filter(obj => obj.description_mon === searchLocation)[0].id })
        } else {
            setCompany({ ...company, locationid: '' })
            setSearchLocation('')
        }
        setFocusLocation(false)
    }

    const handleSelectLocation = (id, desc) => {
        setCompany({ ...company, locationid: id })
        setChanged(true)
        setSearchLocation(desc)
    }

    const [focusForeign, setFocusForeign] = useState(false)

    const [focusCountry, setFocusCountry] = useState(false)
    const [searchCountry, setSearchCountry] = useState('')

    const handleFocusCountry = () => {
        setSearchCountry('')
        setFocusCountry(true)
        setChanged(true)
    }

    const handleBlurCountry = () => {
        if (countries.map(obj => obj.description_mon).includes(searchCountry)) {
            setCompany({ ...company, invested_countryid: countries.filter(obj => obj.description_mon === searchCountry)[0].id })
        } else {
            setCompany({ ...company, invested_countryid: '' })
            setSearchCountry('')
        }
        setFocusCountry(false)
    }

    const handleSelectCountry = (id, desc) => {
        setCompany({ ...company, invested_countryid: id })
        setChanged(true)
        setSearchCountry(desc)
    }

    const [focusInvest, setFocusInvest] = useState(false)

    const [focusTax, setFocusTax] = useState(false)

    const history = useHistory()

    const navToProjectIntro = () => {
        const body = {
            project_type: 0,
            ognoo: data.ognoo,
            companies: [{ ...company, head_company: true }]
        }

        if (changed) {
            data.id ?
                axios.put(`http://192.168.88.78:3000/api/applications/${data.id}`, body, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(res => {
                    console.log(res.data)
                    setData({ ...data, ...res.data.data })
                    history.push('/page/1')
                }).catch(err => {
                    console.log(err)
                })
                :
                axios.post('http://192.168.88.78:3000/api/applications', body, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(res => {
                    console.log(res.data)
                    setData({ ...data, ...res.data.data })
                    history.push('/page/1')
                }).catch(err => {
                    console.log(err)
                })
        } else {
            history.push('/page/1')
        }
    }

    return (
        <div className="tw-w-full tw-pb-20 tw-flex tw-flex-col">
            <h3 className="tw-text-xl tw-text-gray-600 tw-font-semibold tw-ml-4 tw-my-8 tw-self-start">
                1. Аж ахуйн нэгжийн мэдээлэл
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-10 tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-gray-50">
                    <FormInline label="Аж ахуй нэгжийн нэр:" type="text" value={company.cname} name="cname" onChange={handleInput} classAppend="sm:tw-w-4/6" placeholder="ААН-ийн гэрчилгээнд бичигдсэн нэрийг бүтнээр бичнэ үү." />

                    <FormInline label="Холбоо барих хүний нэр:" type="text" value={company.contactname} name="contactname" onChange={handleInput} classAppend="sm:tw-w-3/6" />

                    <FormInline label="Албан тушаал:" type="text" value={company.contact_position} name="contact_position" onChange={handleInput} classAppend="sm:tw-w-3/6" />

                    <FormInline label="Шуудангийн хаяг:" type="text" value={company.postal_address} name="postal_address" onChange={handleInput} classAppend="sm:tw-w-5/6" />

                    <FormInline label="Оффисын байршил:" type="text" value={company.address_detail} name="address_detail" onChange={handleInput} classAppend="sm:tw-w-5/6" />

                    <FormInline label="Утас:" type="phoneFormat" value={company.phone1} name="phone1" onChange={handleInput} classAppend="sm:tw-w-3/6" />

                    <FormInline label="Суурин утас 1:" type="phoneFormat" value={company.phone2} name="phone2" onChange={handleInput} classAppend="sm:tw-w-3/6" />

                    <FormInline label="Суурин утас 2:" type="phoneFormat" value={company.phone3} name="phone3" onChange={handleInput} classAppend="sm:tw-w-3/6" />

                    <FormInline label="Гар утас:" type="phoneFormat" value={company.handphone} name="handphone" onChange={handleInput} classAppend="sm:tw-w-3/6" />

                    <FormInline label="Э-шуудан:" type="email" value={company.c_email} name="c_email" onChange={handleInput} classAppend="sm:tw-w-4/6" />

                    <FormInline label="Веб хуудас, олон нийтийн сүлжээний хаяг:" type="text" value={company.social_info} name="social_info" onChange={handleInput} classAppend="sm:tw-w-4/6" />
                </div>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-bg-white tw-border-t">
                    <FormSmall label="Аж ахуйн нэгжийн эрх зүйн байдал:" type="text" value={company.legal_state} name="legal_state" onChange={handleInput} />

                    <FormSmall label="Татвар төлөгчийн дугаар:" type="numberFormat" value={company.registerno} name="registerno" onChange={handleInputFormat} />

                    <FormSmall label="Улсын бүртгэлийн №:" type="numberFormat" value={company.state_registerno} name="state_registerno" onChange={handleInputFormat} />

                    <FormSmall label="Бүртгүүлсэн он:" type="date" value={company.registered_date} name="registered_date" onChange={handleInput} />

                    <FormSmall label="Нийт ажилтны тоо:" type="numberFormat" value={company.empcount} name="empcount" onChange={handleInputFormat} />

                    <FormSmall label="Мэргэжилтэй ажилтны тоо:" type="numberFormat" value={company.workman} name="workman" onChange={handleInputFormat} />

                    <FormSmall label="Мэргэжилгүй ажилтны тоо:" type="numberFormat" value={company.not_workman} name="not_workman" onChange={handleInputFormat} />

                    <FormSmall label="Тогтмол ажилтны тоо:" type="numberFormat" value={company.pernament_empcount} name="pernament_empcount" onChange={handleInputFormat} />

                    <FormSmall label="Түр ажилтны тоо:" type="numberFormat" value={company.temp_empcount} name="temp_empcount" onChange={handleInputFormat} />

                    <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-lg last:tw-rounded-b-lg">
                        <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                            <label className={`tw-text-sm tw-text-gray-700 ${focusWoman && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                Эмэгтэй эзэмшигчтэй эсэх:
                            </label>
                        </div>
                        <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                            <input className="" name="women_owned" type="radio" checked={company.women_owned == "1"} value="1" onChange={handleInput} onFocus={() => setFocusWoman(true)} onBlur={() => setFocusWoman(false)} />
                            <label className="tw-text-sm tw-font-medium tw-mx-2">Тийм</label>
                            <input className="tw-ml-8" name="women_owned" type="radio" checked={company.women_owned == "0"} value="0" onChange={handleInput} onFocus={() => setFocusWoman(true)} onBlur={() => setFocusWoman(false)} />
                            <label className="tw-text-sm tw-font-medium tw-mx-2">Үгүй</label>
                        </div>
                    </div>

                    <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-md last:tw-rounded-b-md">
                        <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                            <label className={`tw-min-w-min tw-text-sm ${focusSector && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                Салбар:
                            </label>
                        </div>
                        <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                            <div className="tw-w-full sm:tw-max-w tw-flex tw-items-center tw-px-2 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300">
                                <SearchSVG className={`tw-w-4 tw-h-4 ${focusSector ? 'tw-text-blue-700' : 'tw-text-gray-500'} tw-transition-colors tw-duration-300`} />
                                <input className="tw-flex-grow tw-mx-2 tw-py-2 tw-bg-transparent tw-text-sm tw-outline-none" type="text" value={searchSector} onChange={e => setSearchSector(e.target.value)} onFocus={handleFocusSector} onBlur={handleBlurSector} />
                            </div>
                            <div className={`tw-my-2 tw-text-sm tw-rounded-md tw-border tw-border-r-0 tw-border-gray-300 tw-shadow-sm tw-divide-y tw-divide-dashed tw-overflow-y-auto ${focusSector ? 'tw-visible tw-opacity-100 tw-h-60' : 'tw-invisible tw-opacity-0 tw-h-0'} tw-transition-all tw-duration-300`}>
                                {
                                    businessSectors.filter(filterSector).sort(compareSector).length ?
                                        businessSectors.filter(filterSector).sort(compareSector).map((item, i) =>
                                            <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-gray-50' onMouseDown={() => handleSelectSector(item.id, item.bdescription_mon)} key={item.id}>
                                                <span className="tw-font-semibold tw-pr-2">{i + 1}.</span>
                                                {item.bdescription_mon}
                                            </div>) :
                                        <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">Хайлт олдсонгүй.</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-md last:tw-rounded-b-md">
                        <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                            <label className={`tw-min-w-min tw-text-sm ${focusLocation && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                Байршил:
                            </label>
                        </div>
                        <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                            <div className="tw-w-full sm:tw-max-w tw-flex tw-items-center tw-px-2 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300">
                                <SearchSVG className={`tw-w-4 tw-h-4 ${focusLocation ? 'tw-text-blue-700' : 'tw-text-gray-500'} tw-transition-colors tw-duration-300`} />
                                <input className="tw-flex-grow tw-mx-2 tw-py-2 tw-bg-transparent tw-text-sm tw-outline-none" type="text" value={searchLocation} onChange={e => setSearchLocation(e.target.value)} onFocus={handleFocusLocation} onBlur={handleBlurLocation} />
                            </div>
                            <div className={`tw-my-2 tw-text-sm tw-rounded-md tw-border tw-border-r-0 tw-border-gray-300 tw-shadow-sm tw-divide-y tw-divide-dashed tw-overflow-y-auto ${focusLocation ? 'tw-visible tw-opacity-100 tw-h-60' : 'tw-invisible tw-opacity-0 tw-h-0'} tw-transition-all tw-duration-300`}>
                                {
                                    locations.filter(obj => filter(obj, searchLocation)).sort(compare).length ?
                                        locations.filter(obj => filter(obj, searchLocation)).sort(compare).map((item, i) =>
                                            <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-gray-50' onMouseDown={() => handleSelectLocation(item.id, item.description_mon)} key={item.id}>
                                                <span className="tw-font-semibold tw-pr-2">{i + 1}.</span>
                                                {item.description_mon}
                                            </div>) :
                                        <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">Хайлт олдсонгүй.</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-lg last:tw-rounded-b-lg">
                        <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                            <label className={`tw-text-sm tw-text-gray-700 ${focusForeign && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                Гадаад хөрөнгө оруулалттай эсэх:
                            </label>
                        </div>
                        <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                            <input className="" name="foreign_invested" type="radio" checked={company.foreign_invested == "1"} value="1" onChange={handleInput} onFocus={() => setFocusForeign(true)} onBlur={() => setFocusForeign(false)} />
                            <label className="tw-text-sm tw-font-medium tw-mx-2">Тийм</label>
                            <input className="tw-ml-8" name="foreign_invested" type="radio" checked={company.foreign_invested == "0"} value="0" onChange={handleInput} onFocus={() => setFocusForeign(true)} onBlur={() => setFocusForeign(false)} />
                            <label className="tw-text-sm tw-font-medium tw-mx-2">Үгүй</label>
                        </div>
                    </div>

                    {
                        company.foreign_invested == '1' && <>
                            <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-md last:tw-rounded-b-md">
                                <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                                    <label className={`tw-min-w-min tw-text-sm ${focusCountry && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                        Аль улсын гадаад хөрөнгө оруулалт болох нь:
                            </label>
                                </div>
                                <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                                    <div className="tw-w-full sm:tw-max-w tw-flex tw-items-center tw-px-2 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300">
                                        <SearchSVG className={`tw-w-4 tw-h-4 ${focusCountry ? 'tw-text-blue-700' : 'tw-text-gray-500'} tw-transition-colors tw-duration-300`} />
                                        <input className="tw-flex-grow tw-mx-2 tw-py-2 tw-bg-transparent tw-text-sm tw-outline-none" type="text" value={searchCountry} onChange={e => setSearchCountry(e.target.value)} onFocus={handleFocusCountry} onBlur={handleBlurCountry} />
                                    </div>
                                    <div className={`tw-my-2 tw-text-sm tw-rounded-md tw-border tw-border-r-0 tw-border-gray-300 tw-shadow-sm tw-divide-y tw-divide-dashed tw-overflow-y-auto ${focusCountry ? 'tw-visible tw-opacity-100 tw-h-60' : 'tw-invisible tw-opacity-0 tw-h-0'} tw-transition-all tw-duration-300`}>
                                        {
                                            countries.filter(obj => filter(obj, searchCountry)).sort(compare).length ?
                                                countries.filter(obj => filter(obj, searchCountry)).sort(compare).map((item, i) =>
                                                    <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-gray-50' onMouseDown={() => handleSelectCountry(item.id, item.description_mon)} key={item.id}>
                                                        <span className="tw-font-semibold tw-pr-2">{i + 1}.</span>
                                                        {item.description_mon}
                                                    </div>) :
                                                <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">Хайлт олдсонгүй.</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-lg last:tw-rounded-b-lg">
                                <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                                    <label className={`tw-text-sm tw-text-gray-700 ${focusInvest && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                        Гадаад хөрөнгө оруулалтын эзлэх хувь:
                                    </label>
                                </div>
                                <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                                    <div className="tw-w-16 tw-pl-2 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300 tw-flex tw-items-center">
                                        <input className="tw-w-full tw-text-sm tw-bg-transparent tw-outline-none tw-py-2 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" type="number" value={company.invest_percent} name="invest_percent" onChange={handleInput} onFocus={() => setFocusInvest(true)} onBlur={() => setFocusInvest(false)} />
                                        <span className="tw-text tw-font-bold tw-mx-2">%</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-lg last:tw-rounded-b-lg">
                        <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                            <label className={`tw-text-sm tw-text-gray-700 ${focusTax && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                Татвар төлдөг эсэх:
                            </label>
                        </div>
                        <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                            <input className="" name="tax_payment" type="radio" checked={company.tax_payment == "1"} value="1" onChange={handleInput} onFocus={() => setFocusTax(true)} onBlur={() => setFocusTax(false)} />
                            <label className="tw-text-sm font-medium mx-2">Тийм</label>
                            <input className="tw-ml-8" name="tax_payment" type="radio" checked={company.tax_payment == "0"} value="0" onChange={handleInput} onFocus={() => setFocusTax(true)} onBlur={() => setFocusTax(false)} />
                            <label className="text-sm font-medium mx-2">Үгүй</label>
                        </div>
                    </div>
                </div>
            </form>

            <button className="tw-rounded-full tw-py-2 tw-px-4 tw-self-end tw-mr-12 tw-inline-flex tw-items-center tw-font-medium tw-text-white tw-bg-blue-600 focus:tw-outline-none active:tw-bg-blue-700 hover:tw-shadow-lg" onClick={navToProjectIntro}>
                Төслийн маягт бөглөх
                    <DocAddSVG className="tw-w-5 tw-h-5 tw-ml-2 tw-animate-pulse" />
            </button>
        </div>
    )
}

export default EnterpriseInfo
