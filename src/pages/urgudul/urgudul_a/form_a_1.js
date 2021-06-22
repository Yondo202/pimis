import React, { useContext, useEffect, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/help_popup/helpPopup'
import SearchSelect from 'components/urgudul_components/searchSelect'
import FormOptions from 'components/urgudul_components/formOptions'
import FormRichText from 'components/urgudul_components/formRichText'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import FormSelect from 'components/urgudul_components/formSelect'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import TreeSelect from 'components/urgudul_components/treeSelect'
import LoadFromOtherProject from '../loadFromOtherProject'


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
    emp_count: null,
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

function UrgudulApplicant({ projects }) {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.company) {
            setForm({ ...form, ...UrgudulCtx.data.company })
        }
        UrgudulCtx.data.project_type === 1 && setIsCluster(true)
    }, [UrgudulCtx.data.id])

    const handleInput = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

    const handleInputFormat = (key, values) => {
        setForm({ ...form, [key]: values.value })
    }

    const handleInputFormatted = (key, values) => {
        setForm({ ...form, [key]: values.formattedValue })
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
                }).then(res => {
                    UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдөл гаргагчийн мэдээллийг хадгаллаа.' })
                    history.push('/urgudul/3')
                }).catch(err => {
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                })
            } else {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
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
                else return false
            default:
                return false
        }
    }

    const [isCluster, setIsCluster] = useState(false)

    const [sectors, setSectors] = useState([])

    useEffect(() => {
        axios.get('business-sector').then(res => {
            setSectors(res.data.data)
        })
    }, [])

    const otherProjects = projects.filter(project => project.id !== UrgudulCtx.data.id)

    const loadFromOtherProjectCompany = (id) => {
        axios.get(`projects/${id}`, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            const loadCompany = res.data.data?.company ?? {}
            setForm({ ...initialState, ...loadCompany })
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонгосон өргөдлөөс мэдээллийг нь орууллаа.' })
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сонгосон өргөдлийн мэдээллийг татаж чадсангүй.' })
        })
    }

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="">
                <div className="tw-p-3 tw-flex tw-items-center tw-relative">
                    <span className="tw-pl-2 tw-text-base tw-font-medium tw-text-blue-500">Өргөдөл гаргагч</span>

                    {isCluster &&
                        <HelpPopup classAppend="tw-ml-2 tw-mr-2" main="Кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." position="bottom" />
                    }

                    <LoadFromOtherProject classAppend="tw-absolute tw-right-4" otherProjects={otherProjects} loadFromOtherProject={loadFromOtherProjectCompany} />
                </div>

                {UrgudulCtx.data.project_number &&
                    <div className="tw-ml-5 tw-mb-2 tw-text-13px">
                        Өргөдлийн дугаар:
                        <span className="tw-text-blue-500 tw-ml-2 tw-font-medium">{UrgudulCtx.data.project_number}</span>
                    </div>
                }
            </div>

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-3">
                <FormInline label="Аж ахуйн нэгжийн нэр" type="text" value={form.company_name || ''} name="company_name" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(form.company_name)} />

                <FormInline label="Аж ахуйн нэгжийг төлөөлөх албан тушаалтны овог нэр" type="text" value={form.representative_name || ''} name="representative_name" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(form.representative_name)} />

                <FormInline label="Төлөөлөгчийн албан тушаал" type="text" value={form.representative_position || ''} name="representative_position" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(form.representative_position)} />

                <FormInline label="ААН бүртгүүлсэн огноо" type="date" formats={{ max: todayStr }} value={form.registered_date || ''} name="registered_date" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(form.registered_date)} />

                <FormInline label="Регистерийн дугаар" type="numberFormat" value={form.registration_number || ''} name="registration_number" setter={handleInputFormat} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(form.registration_number)} />

                <div className="tw-relative tw-w-full tw-max-w-md">
                    <FormInline label="Албан ёсны хаяг" type="text" value={form.official_address || ''} name="official_address" setter={handleInput} classInput="tw-w-full" invalid={validate && checkInvalid(form.official_address)} />

                    <div className="tw-flex tw-flex-wrap">
                        <SearchSelect label="Байршил" api="locations" keys={['data']} value={form.locationId} name="locationId" setForm={handleInput} displayName="description_mon" classAppend="tw-w-52" invalid={validate && checkInvalid(form.locationId)} />

                        <div className="tw-relative tw-w-2">
                            <HelpPopup classAppend="tw-right-5 tw-top-1" main="Улаанбаатар хотыг сонгосон үед дүүрэг сонгоно уу." position="top-left" />
                        </div>

                        {form.locationId === 39 &&
                            <FormSelect label="Дүүрэг" data={districts} value={form.districtId} name="districtId" setForm={handleInput} displayName="description_mon" classAppend="tw-w-52" invalid={validate && checkInvalid(form.districtId)} />
                        }
                    </div>
                </div>

                <FormInline label="Албан газрын утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={form.telephone || ''} name="telephone" setter={handleInputFormatted} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(form.telephone)} />

                <FormInline label="Гар утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={form.handphone || ''} name="handphone" setter={handleInputFormatted} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(form.handphone)} />

                <div className="tw-w-full tw-max-w-md tw-flex">
                    <FormInline label="Имэйл хаяг" type="email" value={form.email || ''} name="email" setter={handleInput} classAppend="tw-flex-grow" classInput="tw-w-full" validate={true} invalid={validate && checkInvalid(form.email)} />

                    <div className="tw-relative tw-w-2">
                        <HelpPopup classAppend="tw-right-5 tw-top-1" main="Гол харилцааг авч явах имэйл хаягийг бичнэ үү." position="top-left" />
                    </div>
                </div>

                <FormInline label="Вэбсайт" type="text" value={form.website || ''} name="website" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(form.website)} />

                <div className="tw-w-full tw-max-w-md tw-flex">
                    <FormOptions label="Компаний хэмжээ" options={['Бичил', 'Жижиг', 'Дунд']} values={[1, 2, 3]} value={form.company_size} name="company_size" setForm={handleInput} invalid={validate && checkInvalid(form.company_size)} />

                    <div className="tw-relative tw-w-2">
                        <HelpPopup classAppend="tw-right-5 tw-top-1" main="Аж ахуйн нэгжийн хэмжээ нь борлуулалт эсвэл бүтэн цагийн ажилтнуудын аль өндрөөр тогтоосноор ангилал нь тогтоно. Жишээ нь:" list={["$30M борлуулалттай 30 хүнтэй аж ахуйн нэгжийн хувьд Дунд ангиллын аж ахуйн нэгжид хамаарна."]} position="top" />
                    </div>
                </div>

                <div className="tw-p-2 tw-max-w-md">
                    {helperTable}
                </div>

                <FormInline label="Ажилтны тоо" type="numberFormat" value={form.emp_count || ''} name="emp_count" setter={handleInputFormat} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(form.emp_count)} />

                <TreeSelect data={sectors} label="Салбар" displayName="bdescription_mon" value={form.business_sectorId} name="business_sectorId" handleChange={handleInput} invalid={validate && checkInvalid(form.business_sectorId)} />

                <FormOptions label="Гадаад хөрөнгө оруулалттай эсэх" options={['Тийм', 'Үгүй']} values={[1, 0]} value={form.foreign_invested} name="foreign_invested" setForm={handleInput} classAppend="tw-w-full tw-max-w-md" invalid={validate && checkInvalid(form.foreign_invested)} />

                {form.foreign_invested === 1 &&
                    <>
                        <SearchSelect label="Аль улсаас гадаад хөрөнгө оруулалдаг болох нь" api="countries" keys={['data']} value={form.invested_countryid} name="invested_countryid" displayName="description_mon" setForm={handleInput} classAppend="tw-w-full tw-max-w-sm" invalid={validate && checkInvalid(form.invested_countryid)} />

                        <FormInline label="Гадаад хөрөнгө оруулалтын эзлэх хувь" type="numberFormat" formats={{ format: '### %' }} value={form.investment_percent || ''} name="investment_percent" setter={handleInputFormat} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(form.investment_percent)} />
                    </>
                }
            </div>

            <FormRichText
                label="Төслийн төлөвлөлт, гүйцэтгэл дэх оролцоо"
                HelpPopup={<HelpPopup classAppend="tw-ml-2" main="Ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв батлах, нийт төслийн удирдлага, худалдан авалтын удирдлага, төслийн тайлагнал, нөөцийн удирдлага гм." position="top-left" />}
                modules="small"
                value={form.project_plan || ''}
                name="project_plan"
                setter={handleInput}
                invalid={validate && checkInvalid(form.project_plan, 'quill')}
                classAppend="tw-pl-6 tw-pr-3"
            />

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-6 tw-mb-4 tw-mr-4" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px tw-font-light" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulApplicant

export const todayStr = new Date().toISOString().split('T')[0]

export const helperTable = <table className="tw-text-sm tw-w-full">
    <thead>
        <tr className="tw-h-8 tw-text-13px">
            <th className="tw-font-light tw-text-center">Аж ахуйн нэгжийн хэмжээ</th>
            <th className="tw-font-light tw-text-center">Жилийн борлуулалт (ам.дол)</th>
            <th className="tw-font-light tw-text-center">Бүтэн цагийн ажилтны тоо</th>
        </tr>
    </thead>
    <tbody className="tw-text-13px tw-font-light">
        <tr className="tw-h-7 tw-bg-blue-50">
            <td className="tw-pl-2">Бичил</td>
            <td className="tw-pl-2">{'< $50 мян'}</td>
            <td className="tw-pl-2">{'< 10'}</td>
        </tr>
        <tr className="tw-h-7">
            <td className="tw-pl-2">Жижиг</td>
            <td className="tw-pl-2">{'> $50 мян ≤ $10 сая'}</td>
            <td className="tw-pl-2">{'>=10, <50'}</td>
        </tr>
        <tr className="tw-h-7 tw-bg-blue-50">
            <td className="tw-pl-2">Дунд</td>
            <td className="tw-pl-2">{'> $10 сая ≤ $50 сая'}</td>
            <td className="tw-pl-2">{'>=50, <250'}</td>
        </tr>
    </tbody>
</table>
