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
        <div className="w-full pb-20 flex flex-col">
            <h3 className="text-xl text-gray-600 font-semibold ml-4 my-8 self-start">
                1. Аж ахуйн нэгжийн мэдээлэл
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-10 mx-auto border-t border-gray-100 bg-gray-50">
                    <FormInline label="Аж ахуй нэгжийн нэр:" type="text" value={company.cname} name="cname" onChange={handleInput} classAppend="sm:w-4/6" placeholder="ААН-ийн гэрчилгээнд бичигдсэн нэрийг бүтнээр бичнэ үү." />

                    <FormInline label="Холбоо барих хүний нэр:" type="text" value={company.contactname} name="contactname" onChange={handleInput} classAppend="sm:w-3/6" />

                    <FormInline label="Албан тушаал:" type="text" value={company.contact_position} name="contact_position" onChange={handleInput} classAppend="sm:w-3/6" />

                    <FormInline label="Шуудангийн хаяг:" type="text" value={company.postal_address} name="postal_address" onChange={handleInput} classAppend="sm:w-5/6" />

                    <FormInline label="Оффисын байршил:" type="text" value={company.address_detail} name="address_detail" onChange={handleInput} classAppend="sm:w-5/6" />

                    <FormInline label="Утас:" type="phoneFormat" value={company.phone1} name="phone1" onChange={handleInput} classAppend="sm:w-3/6" />

                    <FormInline label="Суурин утас 1:" type="phoneFormat" value={company.phone2} name="phone2" onChange={handleInput} classAppend="sm:w-3/6" />

                    <FormInline label="Суурин утас 2:" type="phoneFormat" value={company.phone3} name="phone3" onChange={handleInput} classAppend="sm:w-3/6" />

                    <FormInline label="Гар утас:" type="phoneFormat" value={company.handphone} name="handphone" onChange={handleInput} classAppend="sm:w-3/6" />

                    <FormInline label="Э-шуудан:" type="email" value={company.c_email} name="c_email" onChange={handleInput} classAppend="sm:w-4/6" />

                    <FormInline label="Веб хуудас, олон нийтийн сүлжээний хаяг:" type="text" value={company.social_info} name="social_info" onChange={handleInput} classAppend="sm:w-4/6" />
                </div>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto">
                    <FormSmall label="Аж ахуйн нэгжийн эрх зүйн байдал:" type="text" value={company.legal_state} name="legal_state" onChange={handleInput} />

                    <FormSmall label="Татвар төлөгчийн дугаар:" type="numberFormat" value={company.registerno} name="registerno" onChange={handleInputFormat} />

                    <FormSmall label="Улсын бүртгэлийн №:" type="numberFormat" value={company.state_registerno} name="state_registerno" onChange={handleInputFormat} />

                    <FormSmall label="Бүртгүүлсэн он:" type="date" value={company.registered_date} name="registered_date" onChange={handleInput} />

                    <FormSmall label="Нийт ажилтны тоо:" type="numberFormat" value={company.empcount} name="empcount" onChange={handleInputFormat} />

                    <FormSmall label="Мэргэжилтэй ажилтны тоо:" type="numberFormat" value={company.workman} name="workman" onChange={handleInputFormat} />

                    <FormSmall label="Мэргэжилгүй ажилтны тоо:" type="numberFormat" value={company.not_workman} name="not_workman" onChange={handleInputFormat} />

                    <FormSmall label="Тогтмол ажилтны тоо:" type="numberFormat" value={company.pernament_empcount} name="pernament_empcount" onChange={handleInputFormat} />

                    <FormSmall label="Түр ажилтны тоо:" type="numberFormat" value={company.temp_empcount} name="temp_empcount" onChange={handleInputFormat} />

                    <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-lg last:rounded-b-lg">
                        <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                            <label className={`text-sm text-gray-700 ${focusWoman && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                Эмэгтэй эзэмшигчтэй эсэх:
                            </label>
                        </div>
                        <div className="py-3 px-4 flex-grow sm:w-7/12">
                            <input className="" name="women_owned" type="radio" checked={company.women_owned == "1"} value="1" onChange={handleInput} onFocus={() => setFocusWoman(true)} onBlur={() => setFocusWoman(false)} />
                            <label className="text-sm font-medium mx-2">Тийм</label>
                            <input className="ml-8" name="women_owned" type="radio" checked={company.women_owned == "0"} value="0" onChange={handleInput} onFocus={() => setFocusWoman(true)} onBlur={() => setFocusWoman(false)} />
                            <label className="text-sm font-medium mx-2">Үгүй</label>
                        </div>
                    </div>

                    <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-md last:rounded-b-md">
                        <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                            <label className={`min-w-min text-sm ${focusSector && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                Салбар:
                            </label>
                        </div>
                        <div className="py-3 px-4 flex-grow sm:w-7/12">
                            <div className="w-full sm:max-w flex items-center px-2 border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300">
                                <SearchSVG className={`w-4 h-4 ${focusSector ? 'text-blue-700' : 'text-gray-500'} transition-colors duration-300`} />
                                <input className="flex-grow mx-2 py-2 bg-transparent text-sm outline-none" type="text" value={searchSector} onChange={e => setSearchSector(e.target.value)} onFocus={handleFocusSector} onBlur={handleBlurSector} />
                            </div>
                            <div className={`my-2 text-sm rounded-md border border-r-0 border-gray-300 shadow-sm divide-y divide-dashed overflow-y-auto ${focusSector ? 'visible opacity-100 h-60' : 'invisible opacity-0 h-0'} transition-all duration-300`}>
                                {
                                    businessSectors.filter(filterSector).sort(compareSector).length ?
                                        businessSectors.filter(filterSector).sort(compareSector).map((item, i) =>
                                            <div className='p-1 pl-2 hover:bg-blue-500 hover:text-gray-50' onMouseDown={() => handleSelectSector(item.id, item.bdescription_mon)} key={item.id}>
                                                <span className="font-semibold pr-2">{i + 1}.</span>
                                                {item.bdescription_mon}
                                            </div>) :
                                        <p className="p-1 text-xs text-center mt-4 italic opacity-80">Хайлт олдсонгүй.</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-md last:rounded-b-md">
                        <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                            <label className={`min-w-min text-sm ${focusLocation && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                Байршил:
                            </label>
                        </div>
                        <div className="py-3 px-4 flex-grow sm:w-7/12">
                            <div className="w-full sm:max-w flex items-center px-2 border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300">
                                <SearchSVG className={`w-4 h-4 ${focusLocation ? 'text-blue-700' : 'text-gray-500'} transition-colors duration-300`} />
                                <input className="flex-grow mx-2 py-2 bg-transparent text-sm outline-none" type="text" value={searchLocation} onChange={e => setSearchLocation(e.target.value)} onFocus={handleFocusLocation} onBlur={handleBlurLocation} />
                            </div>
                            <div className={`my-2 text-sm rounded-md border border-r-0 border-gray-300 shadow-sm divide-y divide-dashed overflow-y-auto ${focusLocation ? 'visible opacity-100 h-60' : 'invisible opacity-0 h-0'} transition-all duration-300`}>
                                {
                                    locations.filter(obj => filter(obj, searchLocation)).sort(compare).length ?
                                        locations.filter(obj => filter(obj, searchLocation)).sort(compare).map((item, i) =>
                                            <div className='p-1 pl-2 hover:bg-blue-500 hover:text-gray-50' onMouseDown={() => handleSelectLocation(item.id, item.description_mon)} key={item.id}>
                                                <span className="font-semibold pr-2">{i + 1}.</span>
                                                {item.description_mon}
                                            </div>) :
                                        <p className="p-1 text-xs text-center mt-4 italic opacity-80">Хайлт олдсонгүй.</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-lg last:rounded-b-lg">
                        <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                            <label className={`text-sm text-gray-700 ${focusForeign && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                Гадаад хөрөнгө оруулалттай эсэх:
                            </label>
                        </div>
                        <div className="py-3 px-4 flex-grow sm:w-7/12">
                            <input className="" name="foreign_invested" type="radio" checked={company.foreign_invested == "1"} value="1" onChange={handleInput} onFocus={() => setFocusForeign(true)} onBlur={() => setFocusForeign(false)} />
                            <label className="text-sm font-medium mx-2">Тийм</label>
                            <input className="ml-8" name="foreign_invested" type="radio" checked={company.foreign_invested == "0"} value="0" onChange={handleInput} onFocus={() => setFocusForeign(true)} onBlur={() => setFocusForeign(false)} />
                            <label className="text-sm font-medium mx-2">Үгүй</label>
                        </div>
                    </div>

                    {
                        company.foreign_invested == '1' && <>
                            <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-md last:rounded-b-md">
                                <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                                    <label className={`min-w-min text-sm ${focusCountry && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                        Аль улсын гадаад хөрөнгө оруулалт болох нь:
                            </label>
                                </div>
                                <div className="py-3 px-4 flex-grow sm:w-7/12">
                                    <div className="w-full sm:max-w flex items-center px-2 border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300">
                                        <SearchSVG className={`w-4 h-4 ${focusCountry ? 'text-blue-700' : 'text-gray-500'} transition-colors duration-300`} />
                                        <input className="flex-grow mx-2 py-2 bg-transparent text-sm outline-none" type="text" value={searchCountry} onChange={e => setSearchCountry(e.target.value)} onFocus={handleFocusCountry} onBlur={handleBlurCountry} />
                                    </div>
                                    <div className={`my-2 text-sm rounded-md border border-r-0 border-gray-300 shadow-sm divide-y divide-dashed overflow-y-auto ${focusCountry ? 'visible opacity-100 h-60' : 'invisible opacity-0 h-0'} transition-all duration-300`}>
                                        {
                                            countries.filter(obj => filter(obj, searchCountry)).sort(compare).length ?
                                                countries.filter(obj => filter(obj, searchCountry)).sort(compare).map((item, i) =>
                                                    <div className='p-1 pl-2 hover:bg-blue-500 hover:text-gray-50' onMouseDown={() => handleSelectCountry(item.id, item.description_mon)} key={item.id}>
                                                        <span className="font-semibold pr-2">{i + 1}.</span>
                                                        {item.description_mon}
                                                    </div>) :
                                                <p className="p-1 text-xs text-center mt-4 italic opacity-80">Хайлт олдсонгүй.</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-lg last:rounded-b-lg">
                                <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                                    <label className={`text-sm text-gray-700 ${focusInvest && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                        Гадаад хөрөнгө оруулалтын эзлэх хувь:
                            </label>
                                </div>
                                <div className="py-3 px-4 flex-grow sm:w-7/12">
                                    <div className="w-16 pl-2 border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300 flex items-center">
                                        <input className="w-full text-sm bg-transparent outline-none py-2 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" type="number" value={company.invest_percent} name="invest_percent" onChange={handleInput} onFocus={() => setFocusInvest(true)} onBlur={() => setFocusInvest(false)} />
                                        <span className="text font-bold mx-2">%</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-lg last:rounded-b-lg">
                        <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                            <label className={`text-sm text-gray-700 ${focusTax && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                Татвар төлдөг эсэх:
                            </label>
                        </div>
                        <div className="py-3 px-4 flex-grow sm:w-7/12">
                            <input className="" name="tax_payment" type="radio" checked={company.tax_payment == "1"} value="1" onChange={handleInput} onFocus={() => setFocusTax(true)} onBlur={() => setFocusTax(false)} />
                            <label className="text-sm font-medium mx-2">Тийм</label>
                            <input className="ml-8" name="tax_payment" type="radio" checked={company.tax_payment == "0"} value="0" onChange={handleInput} onFocus={() => setFocusTax(true)} onBlur={() => setFocusTax(false)} />
                            <label className="text-sm font-medium mx-2">Үгүй</label>
                        </div>
                    </div>
                </div>
            </form>

            <button className="rounded-full py-2 px-4 self-end mr-12 inline-flex items-center font-medium text-white bg-blue-600 focus:outline-none active:bg-blue-700 hover:shadow-lg" onClick={navToProjectIntro}>
                Төслийн маягт бөглөх
                    <DocAddSVG className="w-5 h-5 ml-2 animate-pulse" />
            </button>
        </div>
    )
}

export default EnterpriseInfo
