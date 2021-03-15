import React, { useContext, useEffect, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/help_popup/helpPopup'
import SearchSelect from 'components/urgudul_components/searchSelect'
import FormOptions from 'components/urgudul_components/formOptions'
import PenSVG from 'assets/svgComponents/penSVG'
import FormRichText from 'components/urgudul_components/formRichText'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import FormSelect from 'components/urgudul_components/formSelect'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'


const initialState = {
    company_name: null,
    representative_name: null,
    representative_position: null,
    registered_date: null,
    registration_number: null,
    official_address: null,
    locationId: null,
    districtId: null,
    telephone: null,
    handphone: null,
    email: null,
    website: null,
    company_size: null,
    project_plan: null,
    business_sectorId: null,
    foreign_invested: null,
    invested_countryid: null,
    investment_percent: null,
}

export const districts = [
    {
        id: 1,
        description_mon: 'Багануур',
        description: 'Baganuur',
    },
    {
        id: 2,
        description_mon: 'Багахангай',
        description: 'Bagakhangai',
    },
    {
        id: 3,
        description_mon: 'Баянгол',
        description: 'Bayangol',
    },
    {
        id: 4,
        description_mon: 'Баянзүрх',
        description: 'Bayanzurkh',
    },
    {
        id: 5,
        description_mon: 'Налайх',
        description: 'Nalaikh',
    },
    {
        id: 6,
        description_mon: 'Сонгинохайрхан',
        description: 'SonginoKhairkhan',
    },
    {
        id: 7,
        description_mon: 'Сүхбаатар',
        description: 'Sukhbaatar',
    },
    {
        id: 8,
        description_mon: 'Хан-Уул',
        description: 'Khan-Uul',
    },
    {
        id: 9,
        description_mon: 'Чингэлтэй',
        description: 'Chingeltei',
    },
]

function UrgudulApplicant() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.company) {
            setForm({ ...form, ...UrgudulCtx.data.company })
        }
        UrgudulCtx.data.project_type === 1 && setIsCluster(true)
    }, [UrgudulCtx.data.id])

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleInputFormat = (values, name) => {
        setForm({ ...form, [name]: values.value })
    }

    const handleInputFormatted = (values, name) => {
        setForm({ ...form, [name]: values.formattedValue })
    }

    const handleSetForm = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        let allValid = true
        Object.keys(initialState).forEach(key => {
            switch (key) {
                case 'districtId':
                    if (form.locationId === 39) allValid = allValid && !checkInvalid(form.districtId)
                    break
                case 'invested_countryid':
                    if (form.foreign_invested === 1) allValid = allValid && !checkInvalid(form.invested_countryid)
                    break
                case 'investment_percent':
                    if (form.foreign_invested === 1) allValid = allValid && !checkInvalid(form.investment_percent)
                    break
                default:
                    allValid = allValid && !checkInvalid(form[key], key === 'project_plan' && 'quill')
            }
        })

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, { company: form }, {
                    headers: {
                        'Authorization': getLoggedUserToken()
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                        AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдөл гаргагчийн мэдээлэл хадгалагдлаа.' })
                        history.push('/urgudul/3')
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

    const checkInvalid = (value, type) => {
        switch (value) {
            case null:
                return true
            case '':
                return true
            case '<p><br></p>':
                if (type === 'quill') return true
                break
            default:
                return false
        }
    }

    const [isCluster, setIsCluster] = useState(false)

    return (
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center tw-text-15px">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2 tw-leading-5">A1</span>
                - Өргөдөл гаргагч

                {isCluster &&
                    <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." position="bottom" />
                }
            </div>

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                <FormInline label="Аж ахуйн нэгжийн нэр" type="text" value={form.company_name || ''} name="company_name" onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" invalid={validate && checkInvalid(form.company_name)} />

                <FormInline label="Аж ахуйн нэгжийг төлөөлөх албан тушаалтны овог нэр" type="text" value={form.representative_name || ''} name="representative_name" onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" invalid={validate && checkInvalid(form.representative_name)} />

                <FormInline label="Төлөөлөгчийн албан тушаал" type="text" value={form.representative_position || ''} name="representative_position" onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" invalid={validate && checkInvalid(form.representative_position)} />

                <FormInline label="ААН бүртгүүлсэн огноо" type="date" value={form.registered_date || ''} name="registered_date" onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" invalid={validate && checkInvalid(form.registered_date)} />

                <FormInline label="Регистерийн дугаар" type="numberFormat" value={form.registration_number || ''} name="registration_number" onChange={handleInputFormat} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" invalid={validate && checkInvalid(form.registration_number)} />

                <div className="tw-relative tw-w-full tw-max-w-lg">
                    <div className="tw-flex">
                        <FormInline label="Албан ёсны хаяг" type="text" value={form.official_address || ''} name="official_address" onChange={handleInput} classAppend="tw-flex-grow" classInput="tw-w-full" invalid={validate && checkInvalid(form.official_address)} />

                        <div className="tw-relative tw-w-2">
                            <HelpPopup classAppend="tw-right-5 tw-top-1" main="Улаанбаатар хотыг сонгосон үед дүүрэг сонгоно уу." position="top-left" />
                        </div>
                    </div>

                    <div className="tw-flex tw-flex-wrap">
                        <SearchSelect label="Байршил" api="locations" keys={['data']} value={form.locationId} name="locationId" setForm={handleSetForm} displayName="description_mon" classAppend="tw-w-60" invalid={validate && checkInvalid(form.locationId)} />

                        {form.locationId === 39 &&
                            <FormSelect label="Дүүрэг" data={districts} value={form.districtId} name="districtId" setForm={handleSetForm} displayName="description_mon" classAppend="tw-w-56" invalid={validate && checkInvalid(form.districtId)} />
                        }
                    </div>
                </div>

                <FormInline label="Албан газрын утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={form.telephone || ''} name="telephone" onChange={handleInputFormatted} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" invalid={validate && checkInvalid(form.telephone)} />

                <FormInline label="Гар утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={form.handphone || ''} name="handphone" onChange={handleInputFormatted} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" invalid={validate && checkInvalid(form.handphone)} />

                <div className="tw-w-full tw-max-w-lg tw-flex">
                    <FormInline label="Имэйл хаяг" type="email" value={form.email || ''} name="email" onChange={handleInput} classAppend="tw-flex-grow" classInput="tw-w-full" validate={true} invalid={validate && checkInvalid(form.email)} />

                    <div className="tw-relative tw-w-2">
                        <HelpPopup classAppend="tw-right-5 tw-top-1" main="Гол харилцааг авч явах имэйл хаягийг бичнэ үү." position="top-left" />
                    </div>
                </div>

                <FormInline label="Вэбсайт" type="text" value={form.website || ''} name="website" onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" invalid={validate && checkInvalid(form.website)} />

                <div className="tw-w-full tw-max-w-lg tw-flex">
                    <FormOptions label="Компаний хэмжээ" options={['Бичил', 'Жижиг', 'Дунд']} values={[1, 2, 3]} value={form.company_size} name="company_size" setForm={handleSetForm} classAppend="tw-flex-grow" invalid={validate && checkInvalid(form.company_size)} />

                    <div className="tw-relative tw-w-2 tw-ml-auto">
                        <HelpPopup classAppend="tw-right-5 tw-top-1" main="Аж ахуйн нэгжийн хэмжээ нь борлуулалт эсвэл бүтэн цагийн ажилтнуудын аль өндрөөр тогтоосноор ангилал нь тогтоно. Жишээ нь:" list={["$30M борлуулалттай 30 хүнтэй аж ахуйн нэгжийн хувьд Дунд ангиллын аж ахуйн нэгжид хамаарна."]} position="top-left" />
                    </div>
                </div>

                <div className="tw-p-2 tw-max-w-lg">
                    <table className="tw-text-sm tw-w-full">
                        <thead>
                            <tr className="tw-h-8">
                                <th className="tw-font-medium tw-text-center">Аж ахуйн нэгжийн хэмжээ</th>
                                <th className="tw-font-medium tw-text-center">Жилийн борлуулалт (ам.дол)</th>
                                <th className="tw-font-medium tw-text-center">Бүтэн цагийн ажилтны тоо</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tw-h-8 tw-bg-blue-100">
                                <td className="tw-pl-2">Бичил</td>
                                <td className="tw-pl-2">{'< $50 мян'}</td>
                                <td className="tw-pl-2">{'< 10'}</td>
                            </tr>
                            <tr className="tw-h-8">
                                <td className="tw-pl-2">Жижиг</td>
                                <td className="tw-pl-2">{'> $50 мян ≤ $10 сая'}</td>
                                <td className="tw-pl-2">{'>=10, <50'}</td>
                            </tr>
                            <tr className="tw-h-8 tw-bg-blue-100">
                                <td className="tw-pl-2">Дунд</td>
                                <td className="tw-pl-2">{'> $10 сая ≤ $50 сая'}</td>
                                <td className="tw-pl-2">{'>=50, <250'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <SearchSelect label="Салбар" api="business-sector" keys={['data']} value={form.business_sectorId} name="business_sectorId" displayName="bdescription_mon" setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" invalid={validate && checkInvalid(form.business_sectorId)} />

                <FormOptions label="Гадаад хөрөнгө оруулалттай эсэх" options={['Тийм', 'Үгүй']} values={[1, 0]} value={form.foreign_invested} name="foreign_invested" setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" invalid={validate && checkInvalid(form.foreign_invested)} />

                {form.foreign_invested === 1 &&
                    <>
                        <SearchSelect label="Аль улсаас гадаад хөрөнгө оруулалдаг болох нь" api="countries" keys={['data']} value={form.invested_countryid} name="invested_countryid" displayName="description_mon" setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" invalid={validate && checkInvalid(form.invested_countryid)} />

                        <FormInline label="Гадаад хөрөнгө оруулалтын эзлэх хувь" type="numberFormat" formats={{ format: '### %' }} value={form.investment_percent || ''} name="investment_percent" onChange={handleInputFormat} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-16" invalid={validate && checkInvalid(form.investment_percent)} />
                    </>
                }
            </div>

            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                    <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(form.project_plan, 'quill') ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                    <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(form.project_plan, 'quill') && 'tw-text-red-500'} tw-transition-colors`}>
                        Төслийн төлөвлөлт, гүйцэтгэл дэх оролцоо
                    </span>

                    <HelpPopup classAppend="tw-ml-auto" main="Ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв батлах, нийт төслийн удирдлага, худалдан авалтын удирдлага, төслийн тайлагнал, нөөцийн удирдлага гм." position="top-left" />
                </div>

                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                    <FormRichText modules="small" value={form.project_plan || ''} name="project_plan" setForm={handleSetForm} />
                </div>
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-6 tw-mb-4 tw-mr-4" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulApplicant
