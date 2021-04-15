import React, { useContext, useEffect, useState } from 'react'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import HelpPopup from 'components/help_popup/helpPopup'
import FormInline from 'components/urgudul_components/formInline'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import PenSVG from 'assets/svgComponents/penSVG'
import SearchSelect from 'components/urgudul_components/searchSelect'
import FormSelect from 'components/urgudul_components/formSelect'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import FormSignature from 'components/urgudul_components/formSignature'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { Transition } from 'react-spring/renderprops'


const initialState = [
    {
        applicant: true,
        companyId: null,
        representative_positionId: null,
        representative_name: null,
        representative_signature: null,
        submitDate: null,
    },
]

function UrgudulNoticeCluster() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.id !== undefined) {
            if (UrgudulCtx.data.noticeClusters && UrgudulCtx.data.noticeClusters?.length) {
                setForm(prevState => {
                    const newForm = UrgudulCtx.data.noticeClusters
                    newForm[applicantIndex].companyId = UrgudulCtx.data.company?.id || 0
                    return newForm
                })
                setAgreed(true)
            } else {
                const newForm = form
                newForm[applicantIndex].companyId = UrgudulCtx.data.company?.id || 0
                setForm([...newForm])
            }
        }
    }, [UrgudulCtx.data.id])

    const handleInput = (e) => {
        const newForm = form
        newForm[e.target.id][e.target.name] = e.target.value
        setForm([...newForm])
    }

    const handleSetForm = (key, value, index) => {
        const newForm = form
        newForm[index][key] = value
        setForm([...newForm])
    }

    const applicantIndex = form.findIndex(obj => obj.applicant === true)
    const applicantItem = form[applicantIndex]

    const handleAdd = () => {
        const newObj = {
            applicant: null,
            companyId: null,
            representative_positionId: null,
            representative_name: null,
            representative_signature: null,
            submitDate: null,
        }

        setForm([...form, newObj])
    }

    const handleRemove = (index) => {

        setForm(form.filter((_, i) => i !== index))
    }

    const [occupations, setOccupations] = useState([])

    useEffect(() => {
        axios.get('occupations')
            .then(res => {
                console.log(res.data)
                setOccupations(res.data.data)
            })
    }, [])

    const companyName = UrgudulCtx.data.company?.company_name || ''
    const clusters = UrgudulCtx.data.clusters

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        let allValid = true
        for (const obj of form) {
            allValid = allValid && Object.keys(initialState[0]).filter(item => item !== 'applicant').every(key => !checkInvalid(obj[key]))
        }

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, { noticeClusters: form }, {
                    headers: {
                        'Authorization': getLoggedUserToken(),
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                        AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хамтрагч талуудын мэдээлэл хадгалагдлаа.' })
                        history.push('/urgudul/10')
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

    const [checkList, setCheckList] = useState(new Set())
    const [agreed, setAgreed] = useState()

    const handleCheckList = (key, checked) => {
        if (checked) {
            setCheckList(prev => (new Set(prev).add(key)))
        } else {
            setCheckList(prev => {
                const newcheckList = new Set(prev)
                newcheckList.delete(key)
                return newcheckList
            })
        }
    }

    return (
        <div className="tw-pb-20 tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm">
            <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
                <div className="">
                    <div className="tw-font-medium tw-p-3 tw-flex tw-items-center tw-text-15px">
                        <span className="tw-text-blue-500 tw-text-xl tw-mx-2">D</span>
                        <span className="tw-leading-tight">- Мэдэгдэл</span>

                        <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерын өргөдлийн хувьд дараах зүйлсийг мэдэгдэж байна." position="bottom" />
                    </div>

                    {UrgudulCtx.data.project_number &&
                        <div className="tw-ml-5 tw-mb-2 tw-font-medium tw-text-13px">
                            Өргөдлийн дугаар:
                        <span className="tw-text-blue-500 tw-ml-2">{UrgudulCtx.data.project_number}</span>
                        </div>
                    }
                </div>

                <div>
                    <div className="tw-p-2 tw-mt-2 tw-text-center tw-font-medium tw-text-15px">
                        Өргөдөл гаргагч болон хамтран хүсэлт гаргаж буй хамтрагч талуудад дараах зүйлсийг мэдэгдэж байна:
                    </div>

                    <div className="tw-mt-2 tw-mx-4 tw-text-sm tw-font-medium tw-rounded tw-shadow-md">
                        <div className="tw-py-2 tw-pl-6 tw-pr-2 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                            <span className="">
                                1. Өргөдөл гаргагч нь шалгуур үзүүлэлтийг бүрэн хангасан бөгөөд хориотой зардал, хориотой үйл ажиллагааны чиглэлийг энэхүү санхүүжилтийн төсөлд хамруулаагүй.
                        </span>
                            <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has(1)} onChange={e => handleCheckList(1, e.target.checked)} />
                        </div>
                        <div className="tw-pl-6 tw-pr-2 odd:tw-bg-gray-50">
                            <div className="tw-py-2 tw-pr-12">
                                2. Өргөдөл гаргагч нь кластерын бүтцэд орсон гишүүн байгууллагуудтай дараах чиглэлээр нягт мэдээлэл, хамтын ажиллагаатай ажиллана:
                        </div>
                            <div className="">
                                <div className="tw-py-2 tw-pl-4 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                                    <span className="">
                                        a. Бүх гишүүд энэхүү өргөдлийн маягтад буй мэдээлэлтэй танилцсан бөгөөд өөр өөрсдийн үүргийг ойлгож байгаа.
                                </span>
                                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has('2a')} onChange={e => handleCheckList('2a', e.target.checked)} />
                                </div>
                                <div className="tw-py-2 tw-pl-4 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                                    <span className="">
                                        b. Өргөдөл гаргагч нь кластерын бусад гишүүдтэй уг төслийн хэрэгжилтийн талаар тогтмол мэдээлэлтэй хамтарч ажиллана.
                                </span>
                                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has('2b')} onChange={e => handleCheckList('2b', e.target.checked)} />
                                </div>
                                <div className="tw-py-2 tw-pl-4 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                                    <span className="">
                                        c. Бүх гишүүд өргөдөл гаргагч аж ахуйн нэгжээс Экспортыг дэмжих төсөлд илгээгдэж буй тайлан мэдээлэлтэй танилцсан байна.
                                </span>
                                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has('2c')} onChange={e => handleCheckList('2c', e.target.checked)} />
                                </div>
                                <div className="tw-py-2 tw-pl-4 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                                    <span className="">
                                        d. Экспортыг дэмжих төсөлд илгээгдэх төслийн өөрчлөлтүүд нь илгээгдэхээс өмнө кластерын гишүүн байгууллага хооронд зөвшилцөж, шийдэлд хүрсэн санал байна.
                                </span>
                                    <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has('2d')} onChange={e => handleCheckList('2d', e.target.checked)} />
                                </div>
                            </div>
                        </div>

                        <div className="tw-py-2 tw-pl-6 tw-pr-2 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                            <span className="">
                                3. Өргөдөл гаргагч нь кластерын бусад гишүүдтэй уг төслийн бэлтгэл, удирдлагын хувьд шууд хариуцлага хүлээх бөгөөд зуучлагчийн байр суурьтай оролцохгүй.
                        </span>
                            <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has(3)} onChange={e => handleCheckList(3, e.target.checked)} />
                        </div>
                        <div className="tw-py-2 tw-pl-6 tw-pr-2 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                            <span className="">
                                4. Өргөдөл гаргагч нь Байгаль орчны шалгуур, өргөдөл гаргагчийн шалгуур, зардлын шалгуурыг бүрэн хангаж тэнцсэн бөгөөд аль нэг гишүүн нь уг шалгуурыг хангаагүй тохиолдолд уг санхүүжилтийн хүсэлт нь бүрэн татгалзах үндэслэл болно.
                        </span>
                            <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has(4)} onChange={e => handleCheckList(4, e.target.checked)} />
                        </div>
                        <div className="tw-py-2 tw-pl-6 tw-pr-2 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                            <span className="">
                                5. Өргөдөл гаргагч нь санал болгосон үйл ажиллагааны төлөвлөгөөг хэрэгжүүлэхэд санхүүгийн хувьд болон үйл ажиллагааны хувьд хүчин чадалтай бөгөөд үүнийгээ нотлон харуулна.
                        </span>
                            <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has(5)} onChange={e => handleCheckList(5, e.target.checked)} />
                        </div>
                        <div className="tw-py-2 tw-pl-6 tw-pr-2 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                            <span className="">
                                6. Кластерын гишүүд нь өргөдөл гаргагчид Экспортыг дэмжих төслөөс олгогдох Үр дүнтэй түншлэлийн санхүүжилтийн гэрээнд гарын үсэг зурах бүрэн эрхийг олгосон.
                        </span>
                            <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has(6)} onChange={e => handleCheckList(6, e.target.checked)} />
                        </div>
                        <div className="tw-py-2 tw-pl-6 tw-pr-2 tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50">
                            <span className="">
                                7. Кластерын гишүүд нь энэхүү төслийн үйл ажиллагааны төлөвлөгөөнөөс бий болох үр шимийг хамтран эзэмших, төслийг хэрэгжүүлэхэд шаардлагатай удирдлага, санхүүжилтийн зардлыг хамтран гаргахаар тохиролцсон.
                        </span>
                            <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has(7)} onChange={e => handleCheckList(7, e.target.checked)} />
                        </div>
                    </div>

                    <div className="tw-px-6 tw-py-1 tw-mt-4 tw-text-sm tw-font-medium">
                        Энэхүү өргөдлийн маягтанд орсон бүхий л мэдээллийг үнэн зөвөөр мэдээллэсэн бөгөөд санаатай болон санаандгүйгээр мэдээллийг хооронд нь зөрүүлэх, мэдээллийг нотлох баримт нь мэдээллээс зөрөх, нотлох баримтгүй байх нь уг санхүүжилтийг олгохоос татгалзах, цаашид өргөдөл хүлээн авахгүй хүртэл шийдвэр гаргах шалтгаан болохыг бүрэн ойлгож байгаа болно.
                    </div>

                    <div className="tw-flex tw-justify-end tw-items-center">
                        <button className="tw-inline-flex tw-items-center focus:tw-outline-none tw-rounded tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-pl-3 tw-pr-4 tw-py-2 tw-mr-8 tw-mb-8 tw-mt-4" onClick={() => setAgreed(!agreed)}>
                            <span className={`tw-rounded-full tw-border ${agreed ? 'tw-border-white' : 'tw-border-blue-300'} tw-transition-colors tw-w-4 tw-h-4 tw-flex tw-items-center tw-justify-center tw-mr-2`}>
                                <span className={`tw-rounded-full ${agreed ? 'tw-bg-white' : 'tw-bg-transparent'} tw-transition-colors tw-w-2 tw-h-2`}></span>
                            </span>
                            <span className={`${agreed ? 'tw-text-white' : 'tw-text-blue-200'} tw-transition-colors tw-font-medium tw-leading-tight`}>
                                Зөвшөөрч байна
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                items={agreed}
                from={{ transform: 'scale(0)' }}
                enter={{ transform: 'scale(1)' }}
                leave={{ transform: 'scale(0)' }}>
                {item => item && (anims =>
                    <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed" style={anims}>
                        <div className="tw-p-2 tw-pl-4 tw-pt-4 tw-text-blue-500 tw-font-medium">
                            Өргөдөл гаргагч ААН төлөөлж:
                        </div>

                        <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-4">
                            <div className="tw-w-full tw-h-full tw-max-w-lg tw-flex tw-place-items-center tw-p-2 tw-pl-8">
                                <span className="tw-text-sm tw-font-medium">Аж ахуйн нэгжийн нэр:</span>
                                {companyName &&
                                    <span className="tw-ml-3 tw-bg-indigo-50 tw-rounded tw-py-1 tw-px-2 tw-text-sm tw-text-indigo-500 tw-font-medium">{companyName}</span>
                                }
                            </div>

                            <SearchSelect label="Албан тушаал" data={occupations} value={applicantItem.representative_positionId} name="representative_positionId" id={applicantIndex} displayName="description_mon" setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full tw-max-w-xs" invalid={validate && checkInvalid(applicantItem.representative_positionId)} />

                            <FormInline label="Овог нэр" type="text" value={applicantItem.representative_name || ''} name="representative_name" id={applicantIndex} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full tw-max-w-xs" invalid={validate && checkInvalid(applicantItem.representative_name)} />

                            <div className="tw-w-full tw-h-full tw-max-w-lg tw-row-span-2">
                                <div className="tw-flex tw-items-center tw-px-2 tw-pt-4">
                                    <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(applicantItem.representative_signature) ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                                    <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(applicantItem.representative_signature) && 'tw-text-red-500'}`}>
                                        Гарын үсэг
                                </span>
                                </div>

                                <FormSignature value={applicantItem.representative_signature} name="representative_signature" id={applicantIndex} setForm={handleSetForm} classAppend="tw-pl-8 tw-pr-2 tw-py-2 tw-justify-center" canvasProps={{ width: 360, height: 100 }} />
                            </div>

                            <FormInline label="Огноо" type="date" value={applicantItem.submitDate || ''} name="submitDate" id={applicantIndex} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" invalid={validate && checkInvalid(applicantItem.submitDate)} />
                        </div>

                        <div className="tw-p-2 tw-pl-4 tw-pt-4 tw-text-blue-500 tw-font-medium">
                            Кластерийн гишүүн ААН-үүдийг төлөөлж:
                        </div>

                        {form.map((item, i) =>
                            applicantIndex !== i &&
                            <div className="tw-flex even:tw-bg-gray-50 tw-px-4" key={i}>
                                <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                                    <FormSelect label="Аж ахуйн нэгжийн нэр" data={clusters} value={item.companyId} name="companyId" id={i} setForm={handleSetForm} displayName="company_name" classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full tw-max-w-xs" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.companyId)} />

                                    <SearchSelect label="Албан тушаал" data={occupations} value={item.representative_positionId} name="representative_positionId" id={i} displayName="description_mon" setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full tw-max-w-xs" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.representative_positionId)} />

                                    <FormInline label="Овог нэр" type="text" value={item.representative_name || ''} name="representative_name" id={i} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} classInput="tw-w-full tw-max-w-xs" invalid={validate && checkInvalid(item.representative_name)} />

                                    <div className="tw-w-full tw-h-full tw-max-w-lg tw-row-span-2">
                                        <div className="tw-flex tw-items-center tw-px-2 tw-pt-4">
                                            <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(item.representative_signature) ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                                            <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(item.representative_signature) && 'tw-text-red-500'}`}>
                                                Гарын үсэг
                                            </span>
                                        </div>

                                        <FormSignature value={item.representative_signature} name="representative_signature" id={i} setForm={handleSetForm} classAppend="tw-pl-8 pw-pr-2 tw-py-2 tw-justify-center" canvasProps={{ width: 360, height: 100 }} />
                                    </div>

                                    <FormInline label="Огноо" type="date" value={item.submitDate || ''} name="submitDate" id={i} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} classInput="tw-w-40" invalid={validate && checkInvalid(item.submitDate)} />
                                </div>

                                <div className="tw-flex tw-items-center">
                                    <ButtonTooltip tooltip="Устгах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                                </div>
                            </div>
                        )}

                        <div className="tw-flex tw-justify-end tw-items-center tw-py-1 tw-px-2">
                            <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                                ААН-ийн төлөөлөгчид
                            </div>

                            <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2" classButton="tw-text-green-500 active:tw-text-green-600" />
                        </div>

                        <div className="tw-flex tw-justify-end">
                            <ButtonTooltip classAppend="tw-mt-6 tw-mb-4 tw-mr-4" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    )
}

export default UrgudulNoticeCluster
