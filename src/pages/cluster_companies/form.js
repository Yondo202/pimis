import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CloseSVG from 'assets/svgComponents/closeSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import DocAddSVG from 'assets/svgComponents/docAddSVG'
import FormInline from 'components/form_inline/formInline'
import FormSmall from 'components/form_small/formSmall'
import UrgudulContext, { initialState } from 'components/utilities/urgudulContext'
import axios from 'axios'
import PenSVG from 'assets/svgComponents/penSVG'
import BadgeSVG from 'assets/svgComponents/badgeSVG'


function ClusterCompanies(props) {
    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData

    const [modal, setModal] = useState({
        open: false,
        index: '',
    })

    const [confirm, setConfirm] = useState({
        open: false,
        index: '',
    })

    const [company, setCompany] = useState({ ...initialState.companies[0] })

    const handleInput = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value })
    }

    const handleInputFormat = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value.replaceAll(',', '') })
    }

    const openAdd = () => {
        setCompany({ ...initialState.companies[0] })
        setModal({ open: true, index: '' })
        setSearchSector('')
        setSearchLocation('')
        setSearchCountry('')
    }

    const openEdit = (index, sectorId, locationId, countryId) => {
        setCompany(data.companies[index])
        setModal({ open: true, index: index })
        setSearchSector(businessSectors.filter(obj => obj.id == sectorId)[0] ? businessSectors.filter(obj => obj.id == sectorId)[0].bdescription_mon : '')
        setSearchLocation(locations.filter(obj => obj.id == locationId)[0] ? locations.filter(obj => obj.id == locationId)[0].description_mon : '')
        setSearchCountry(countries.filter(obj => obj.id == countryId)[0] ? countries.filter(obj => obj.id == countryId)[0].description_mon : '')
    }

    const openRemove = (index) => {
        setConfirm({ open: true, index: index })
    }


    const handleAddCompany = async () => {
        if (data.id) {
            axios.post('http://192.168.88.78:3000/api/companies', { ...company, ppsApplicationId: data.id }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log(res.data)
                setData({ ...data, companies: [...data.companies, res.data.data] })
                setModal({ open: false, index: '' })
            }).catch(err => {
                console.log(err.response.data)
            });
        } else {
            const body = {
                project_type: 1,
                ognoo: data.ognoo,
                companies: [company],
            }

            axios.post('http://192.168.88.78:3000/api/applications', body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log(res.data)
                setData({ ...data, ...res.data.data })
            }).catch(err => {
                console.log(err.response.data)
            })
        }
    }

    const handleEditCompany = () => {
        axios.put(`http://192.168.88.78:3000/api/companies/${data.companies[modal.index].id}`, company, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log(res.data)
            const newCompanies = [...data.companies]
            newCompanies[modal.index] = res.data.data
            setData({ ...data, companies: newCompanies })
            setModal({ open: false, id: '' })
        }).catch(err => {
            console.log(err)
        })
    }

    const handleRemoveCompany = () => {
        axios.delete(`http://192.168.88.78:3000/api/companies/${data.companies[confirm.index].id}`)
            .then(res => {
                console.log(res.data)
                setData({ ...data, companies: data.companies.filter((_, i) => i !== confirm.index) })
                setConfirm({ open: false, index: '' })
            }).catch(err => {
                console.log(err)
            })
    }

    const closeModal = () => {
        setModal({ ...modal, open: false })
    }

    const closeConfirm = () => {
        setConfirm({ ...confirm, open: false })
    }

    const [businessSectors, setBusinessSectors] = useState([])
    const [locations, setLocations] = useState([])
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios.get('http://192.168.88.78:3000/api/business-sector')
            .then(res => {
                setBusinessSectors(res.data.data)
            }).catch(err => {
                console.log(err)
            })

        axios.get('http://192.168.88.78:3000/api/locations')
            .then(res => {
                setLocations(res.data.data)
            }).catch(err => {
                console.log(err)
            })

        axios.get('http://192.168.88.78:3000/api/countries')
            .then(res => {
                setCountries(res.data.data)
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
    }

    const handleBlurSector = () => {
        if (businessSectors.map(obj => obj.bdescription_mon).includes(searchSector)) {
            setCompany({ ...company, business_sectorid: businessSectors.filter(obj => obj.bdescription_mon === searchSector)[0].id })
        } else {
            setData({ ...company, business_sectorid: '' })
            setSearchSector('')
        }
        setFocusSector(false)
    }

    const handleSelectSector = (id, desc) => {
        setCompany({ ...company, business_sectorid: id })
        setSearchSector(desc)
    }

    const [focusLocation, setFocusLocation] = useState(false)
    const [searchLocation, setSearchLocation] = useState('')

    const handleFocusLocation = () => {
        setSearchLocation('')
        setFocusLocation(true)
    }

    const handleBlurLocation = () => {
        if (locations.map(obj => obj.description_mon).includes(searchLocation)) {
            setCompany({ ...company, locationid: locations.filter(obj => obj.description_mon === searchLocation)[0].id })
        } else {
            setData({ ...data, locationid: '' })
            setSearchLocation('')
        }
        setFocusLocation(false)
    }

    const handleSelectLocation = (id, desc) => {
        setCompany({ ...company, locationid: id })
        setSearchLocation(desc)
    }

    const [focusForeign, setFocusForeign] = useState(false)

    const [focusCountry, setFocusCountry] = useState(false)
    const [searchCountry, setSearchCountry] = useState('')

    const handleFocusCountry = () => {
        setSearchCountry('')
        setFocusCountry(true)
    }

    const handleBlurCountry = () => {
        if (countries.map(obj => obj.description_mon).includes(searchCountry)) {
            setCompany({ ...company, invested_countryid: countries.filter(obj => obj.description_mon === searchCountry)[0].id })
        } else {
            setData({ ...data, invested_countryid: '' })
            setSearchCountry('')
        }
        setFocusCountry(false)
    }

    const handleSelectCountry = (id, desc) => {
        setCompany({ ...company, invested_countryid: id })
        setSearchCountry(desc)
    }

    const [focusInvest, setFocusInvest] = useState(false)

    const [focusTax, setFocusTax] = useState(false)

    const history = useHistory()

    const navToProjectIntro = () => {
        const body = {
            project_type: 1,
            ognoo: data.ognoo,
        }

        data.id &&
            axios.put(`http://192.168.88.78:3000/api/applications/${data.id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log(res.data)
                setData({ ...data, project_type: res.data.data.project_type, ognoo: res.data.data.ognoo })
                history.push('/page/1')
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="tw-w-full tw-pb-20 tw-flex tw-flex-col">
            <h3 className="tw-text-xl tw-text-gray-600 tw-font-semibold tw-ml-4 tw-my-8 tw-self-start">
                1. Кластер компаниудын мэдээлэл
            </h3>

            <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-border-t tw-bg-gray-50 tw-flex tw-flex-col">
                <ol className="tw-list-decimal tw-list-outside tw-p-4 tw-pl-10 tw-font-medium">
                    {
                        data.companies.map((item, i) =>
                            <li className="tw-mb-4 tw-pl-2" key={i}>
                                <div className="tw-flex tw-items-center tw-font-normal">
                                    {
                                        item.cname ? <span className="tw-flex-grow tw-font-semibold tw-text-gray-600">{item.cname}</span> : <span className="flex-grow p-2 text-xs italic opacity-80">Компаний мэдээллийг засварлана уу.</span>
                                    }
                                    {
                                        item.head_company == "1" && <label className="tw-text-xs tw-italic tw-opacity-80 tw-flex tw-items-center tw-mr-4">
                                            <BadgeSVG className="tw-w-5 tw-h-5" />
                                            Толгой компани
                                        </label>
                                    }

                                    <button className="tw-rounded-md tw-p-1 tw-text-blue-500 active:tw-text-blue-600 active:tw-bg-gray-200 focus:tw-outline-none" onClick={() => { openEdit(i, item.business_sectorid, item.locationid, item.invested_countryid) }} title="Засварлах">
                                        <PenSVG className="tw-w-5 tw-h-5" />
                                    </button>
                                    <button className="tw-rounded-md tw-p-1 tw-text-red-500 active:tw-text-red-600 active:tw-bg-gray-200 focus:tw-outline-none" onClick={() => { openRemove(i) }} title="Устгах">
                                        <CloseSVG className="tw-w-5 tw-h-5" />
                                    </button>
                                </div>
                            </li>
                        )
                    }
                </ol>

                <button className="tw-self-end tw-mb-4 tw-mr-4 tw-py-1 tw-pl-1 tw-pr-2 tw-text-sm tw-rounded-md focus:tw-outline-none tw-bg-green-500 tw-text-white tw-flex tw-items-center hover:tw-shadow-lg active:tw-bg-green-600" onClick={openAdd}>
                    <PlusSVG className="tw-w-5 tw-h-5 tw-mr-1" />
                    <span className="tw-font-semibold">Компани нэмж оруулах</span>
                </button>
            </div>

            <div className={`tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-70 ${modal.open ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`}>
                <div className="tw-bg-white tw-relative tw-rounded-md tw-shadow-lg tw-m-2 sm:tw-m-12 tw-w-full tw-max-w-5xl tw-h-5/6 tw-overflow-y-auto tw-text-sm">
                    <div className="tw-h-12 tw-sticky tw-top-0">
                        <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-float-right tw-mt-1 tw-mr-1 sm:tw-mt-4 sm:tw-mr-4" onClick={closeModal}>
                            <CloseSVG className="tw-w-8 tw-h-8" />
                        </button>
                    </div>

                    <h3 className="tw-text-xl tw-font-bold tw-text-center mb-4">
                        Кластерт компани шинээр нэмэх
                    </h3>

                    <div className="tw-p-4 tw-pl-6 tw-w-full tw-flex tw-items-center">
                        <BadgeSVG className="tw-w-5 tw-h-5 tw-flex-shrink-0" />
                        <label className="tw-text-sm tw-font-semibold tw-text-gray-700 tw-whitespace-nowrap">
                            Толгой компани эсэх:
                        </label>
                        <input className="tw-ml-2 sm:tw-ml-8 tw-w-4 tw-h-4 tw-flex-shrink-0" name="head_company" type="radio" checked={company.head_company == "1"} value="1" onChange={handleInput} />
                        <label className="tw-text-sm tw-font-medium tw-mx-1">Тийм</label>
                        <input className="tw-ml-2 sm:tw-ml-8 tw-w-4 tw-h-4 tw-flex-shrink-0" name="head_company" type="radio" checked={company.head_company == "0"} value="0" onChange={handleInput} />
                        <label className="tw-text-sm tw-font-medium tw-mx-1">Үгүй</label>
                    </div>

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

                    <div className="tw-w-full tw-h-6 tw-border-b tw-border-dashed" />

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
                                <div className="tw-py-3 tw-px-4 tw-flex-grow tw-sm:w-7/12">
                                    <div className="tw-w-16 tw-pl-2 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300 tw-flex items-center">
                                        <input className="tw-w-full tw-text-sm tw-bg-transparent tw-outline-none tw-py-2 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" type="number" value={company.invest_percent} name="invest_percent" onChange={handleInput} onFocus={() => setFocusInvest(true)} onBlur={() => setFocusInvest(false)} />
                                        <span className="text font-bold mx-2">%</span>
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
                            <label className="tw-text-sm tw-font-medium tw-mx-2">Тийм</label>
                            <input className="tw-ml-8" name="tax_payment" type="radio" checked={company.tax_payment == "0"} value="0" onChange={handleInput} onFocus={() => setFocusTax(true)} onBlur={() => setFocusTax(false)} />
                            <label className="tw-text-sm tw-font-medium tw-mx-2">Үгүй</label>
                        </div>
                    </div>

                    <div className="tw-flex tw-justify-center tw-border-t tw-border-dashed tw-py-4">
                        <button className="tw-py-2 tw-px-8 tw-bg-green-500 active:tw-bg-green-600 tw-text-white tw-font-semibold tw-rounded-lg tw-mr-6 focus:tw-outline-none hover:tw-shadow-lg" onClick={modal.index === '' ? handleAddCompany : handleEditCompany}>
                            {modal.index === '' ? 'Хадгалах' : 'Засварлах'}
                        </button>
                        <button className="tw-py-2 tw-px-8 tw-bg-red-500 active:tw-bg-red-600 tw-text-white tw-font-semibold tw-rounded-lg focus:tw-outline-none hover:tw-shadow-lg" onClick={closeModal}>
                            Болих
                        </button>
                    </div>
                </div>
            </div>

            <div className={`tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-70 ${confirm.open ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`}>
                <div className="tw-bg-white tw-relative tw-rounded-md tw-shadow-lg tw-p-4 tw-m-2 tw-w-full tw-max-w-xl tw-flex tw-flex-col tw-border-2 tw-border-red-600 tw-border-opacity-80">
                    <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-4 tw-right-4" onClick={closeConfirm}>
                        <CloseSVG className="tw-w-8 tw-h-8" />
                    </button>
                    <h3 className="tw-text-xl tw-font-bold tw-mb-4 tw-text-center">Компани устгах</h3>
                    <p className="tw-mb-4 tw-font-semibold">
                        <span className="tw-mr-1 tw-text-red-500">"{data.companies[confirm.index] && data.companies[confirm.index].cname}"</span>
                        гэсэн компанийг устгах уу?
                    </p>
                    <div className="tw-flex tw-justify-end">
                        <button className="tw-py-1 tw-px-6 tw-bg-green-500 active:tw-bg-green-600 tw-text-white tw-font-semibold tw-rounded-lg tw-mr-2 focus:tw-outline-none hover:tw-shadow-lg" onClick={closeConfirm}>Болих</button>
                        <button className="tw-py-1 tw-px-6 tw-bg-red-500 active:tw-bg-red-600 tw-text-white tw-font-semibold tw-rounded-lg focus:tw-outline-none hover:tw-shadow-lg" onClick={handleRemoveCompany}>Устгах</button>
                    </div>
                </div>
            </div>

            <button className="tw-rounded-full tw-py-2 tw-px-4 tw-self-end tw-mr-12 tw-inline-flex tw-items-center tw-font-medium tw-text-white tw-bg-blue-600 focus:tw-outline-none active:tw-bg-blue-700 hover:tw-shadow-lg" onClick={navToProjectIntro}>
                Төслийн маягт бөглөх
                    <DocAddSVG className="tw-w-5 tw-h-5 tw-ml-2" />
            </button>
        </div>
    )
}

export default ClusterCompanies
