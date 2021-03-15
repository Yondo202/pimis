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

    const [agreed, setAgreed] = useState()

    return (
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-text-sm tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center" style={{ fontSize: '15px' }}>
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2 tw-leading-5">D</span>
                - Мэдэгдэл

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерын өргөдлийн хувьд дараах зүйлсийг мэдэгдэж байна." position="bottom" />
            </div>

            <div>
                <div className="tw-p-2 tw-mt-2 tw-mb-1 text-center tw-font-medium" style={{ fontSize: '15px' }}>
                    Өргөдөл гаргагч болон хамтран хүсэлт гаргаж буй хамтрагч талуудад дараах зүйлсийг мэдэгдэж байна:
                </div>

                <ul className="tw-list-disc tw-pl-8 tw-pr-2 tw-text-sm">
                    <li className="tw-py-1">
                        Өргөдөл гаргагч нь шалгуур үзүүлэлтийг бүрэн хангасан бөгөөд хориотой зардал, хориотой үйл ажиллагааны чиглэлийг энэхүү санхүүжилтийн төсөлд хамруулаагүй.
                    </li>
                    <li className="tw-py-1">
                        Өргөдөл гаргагч нь кластерын бүтцэд орсон гишүүн байгууллагуудтай дараах чиглэлээр нягт мэдээлэл, хамтын ажиллагаатай ажиллана:
                        <ul className="tw-list-disc tw-pl-4">
                            <li className="tw-py-1">
                                Бүх гишүүд энэхүү өргөдлийн маягтад буй мэдээлэлтэй танилцсан бөгөөд өөр өөрсдийн үүргийг ойлгож байгаа.
                            </li>
                            <li className="tw-py-1">
                                Өргөдөл гаргагч нь кластерын бусад гишүүдтэй уг төслийн хэрэгжилтийн талаар тогтмол мэдээлэлтэй хамтарч ажиллана.
                            </li>
                            <li className="tw-py-1">
                                Бүх гишүүд өргөдөл гаргагч аж ахуйн нэгжээс Экспортыг дэмжих төсөлд илгээгдэж буй тайлан мэдээлэлтэй танилцсан байна.
                            </li>
                            <li className="tw-py-1">
                                Экспортыг дэмжих төсөлд илгээгдэх төслийн өөрчлөлтүүд нь илгээгдэхээс өмнө кластерын гишүүн байгууллага хооронд зөвшилцөж, шийдэлд хүрсэн санал байна.
                            </li>
                        </ul>
                    </li>

                    <li className="tw-py-1">
                        Өргөдөл гаргагч нь кластерын бусад гишүүдтэй уг төслийн бэлтгэл, удирдлагын хувьд шууд хариуцлага хүлээх бөгөөд зуучлагчийн байр суурьтай оролцохгүй.
                    </li>
                    <li className="tw-py-1">
                        Өргөдөл гаргагч нь Байгаль орчны шалгуур, өргөдөл гаргагчийн шалгуур, зардлын шалгуурыг бүрэн хангаж тэнцсэн бөгөөд аль нэг гишүүн нь уг шалгуурыг хангаагүй тохиолдолд уг санхүүжилтийн хүсэлт нь бүрэн татгалзах үндэслэл болно.
                    </li>
                    <li className="tw-py-1">
                        Өргөдөл гаргагч нь санал болгосон үйл ажиллагааны төлөвлөгөөг хэрэгжүүлэхэд санхүүгийн хувьд болон үйл ажиллагааны хувьд хүчин чадалтай бөгөөд үүнийгээ нотлон харуулна.
                    </li>
                    <li className="tw-py-1">
                        Кластерын гишүүд нь өргөдөл гаргагчид Экспортыг дэмжих төслөөс олгогдох Үр дүнтэй түншлэлийн санхүүжилтийн гэрээнд гарын үсэг зурах бүрэн эрхийг олгосон.
                    </li>
                    <li className="tw-py-1">
                        Кластерын гишүүд нь энэхүү төслийн үйл ажиллагааны төлөвлөгөөнөөс бий болох үр шимийг хамтран эзэмших, төслийг хэрэгжүүлэхэд шаардлагатай удирдлага, санхүүжилтийн зардлыг хамтран гаргахаар тохиролцсон.
                    </li>
                </ul>

                <div className="tw-px-4 tw-py-1 tw-mt-2 tw-text-sm">
                    Энэхүү өргөдлийн маягтанд орсон бүхий л мэдээллийг үнэн зөвөөр мэдээллэсэн бөгөөд санаатай болон санаандгүйгээр мэдээллийг хооронд нь зөрүүлэх, мэдээллийг нотлох баримт нь мэдээллээс зөрөх, нотлох баримтгүй байх нь уг санхүүжилтийг олгохоос татгалзах, цаашид өргөдөл хүлээн авахгүй хүртэл шийдвэр гаргах шалтгаан болохыг бүрэн ойлгож байгаа болно.
                </div>

                <div className="tw-flex tw-justify-end tw-items-center">
                    <button className="tw-inline-flex tw-items-center focus:tw-outline-none tw-rounded tw-bg-blue-500 active:tw-bg-blue-600 tw-transition-colors tw-pl-2 tw-pr-3 tw-py-1.5 tw-mr-4 tw-mb-4 tw-mt-2" onClick={() => setAgreed(!agreed)}>
                        <span className={`tw-rounded-full tw-border ${agreed ? 'tw-border-white' : 'tw-border-blue-300'} tw-transition-colors tw-w-4 tw-h-4 tw-flex tw-items-center tw-justify-center tw-mr-1.5`}>
                            <span className={`tw-rounded-full ${agreed ? 'tw-bg-white' : 'tw-bg-transparent'} tw-transition-colors tw-w-2 tw-h-2`}></span>
                        </span>
                        <span className={`${agreed ? 'tw-text-white' : 'tw-text-blue-200'} tw-transition-colors tw-font-medium tw-leading-tight`}>
                            Зөвшөөрч байна
                        </span>
                    </button>
                </div>
            </div>

            {agreed &&
                <div className="tw-divide-y tw-divide-dashed">
                    <div className="tw-p-2 tw-pl-4 tw-pt-4 tw-text-blue-500 tw-font-medium">
                        Өргөдөл гаргагч ААН төлөөлж:
                    </div>

                    <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                        <div className="tw-w-full tw-h-full tw-max-w-lg tw-flex tw-place-items-center tw-p-2 tw-pl-8">
                            <span className="tw-text-sm tw-font-medium">Аж ахуйн нэгжийн нэр:</span>
                            {companyName &&
                                <span className="tw-ml-3 tw-bg-indigo-50 tw-rounded-lg tw-py-1 tw-px-2 tw-text-sm tw-text-indigo-500 tw-font-medium">{companyName}</span>
                            }
                        </div>

                        <SearchSelect label="Албан тушаал" data={occupations} value={applicantItem.representative_positionId} name="representative_positionId" id={applicantIndex} displayName="description_mon" setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-96" invalid={validate && checkInvalid(applicantItem.representative_positionId)} />

                        <FormInline label="Овог нэр" type="text" value={applicantItem.representative_name || ''} name="representative_name" id={applicantIndex} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-80" invalid={validate && checkInvalid(applicantItem.representative_name)} />

                        <div className="tw-w-full tw-h-full tw-max-w-lg tw-row-span-2">
                            <div className="tw-flex tw-items-center tw-px-2 tw-pt-4">
                                <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(applicantItem.representative_signature) ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                                <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(applicantItem.representative_signature) && 'tw-text-red-500'}`}>
                                    Гарын үсэг
                                </span>
                            </div>

                            <FormSignature value={applicantItem.representative_signature} name="representative_signature" id={applicantIndex} setForm={handleSetForm} classAppend="tw-px-2 tw-py-2 tw-justify-center" canvasProps={{ width: 300, height: 100 }} />
                        </div>

                        <FormInline label="Огноо" type="date" value={applicantItem.submitDate || ''} name="submitDate" id={applicantIndex} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" invalid={validate && checkInvalid(applicantItem.submitDate)} />
                    </div>

                    <div className="tw-p-2 tw-pl-4 tw-pt-4 tw-text-blue-500 tw-font-medium">
                        Кластерийн гишүүн ААН-үүдийг төлөөлж:
                    </div>

                    {form.filter((_, i) => i !== applicantIndex).map((item, i) =>
                        <div className="tw-flex even:tw-bg-gray-50" key={i}>
                            <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                                <FormSelect label="Аж ахуйн нэгжийн нэр" data={clusters} value={item.companyId} name="companyId" id={i} setForm={handleSetForm} displayName="company_name" classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-96" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.companyId)} />

                                <SearchSelect label="Албан тушаал" data={occupations} value={item.representative_positionId} name="representative_positionId" id={i} displayName="description_mon" setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-96" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.representative_positionId)} />

                                <FormInline label="Овог нэр" type="text" value={item.representative_name || ''} name="representative_name" id={i} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} classInput="tw-w-80" invalid={validate && checkInvalid(item.representative_name)} />

                                <div className="tw-w-full tw-h-full tw-max-w-lg tw-row-span-2">
                                    <div className="tw-flex tw-items-center tw-px-2 tw-pt-4">
                                        <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(item.representative_signature) ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                                        <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(item.representative_signature) && 'tw-text-red-500'}`}>
                                            Гарын үсэг
                                        </span>
                                    </div>

                                    <FormSignature value={item.representative_signature} name="representative_signature" id={i} setForm={handleSetForm} classAppend="tw-px-2 tw-py-2 tw-justify-center" canvasProps={{ width: 300, height: 100 }} />
                                </div>

                                <FormInline label="Огноо" type="date" value={item.submitDate || ''} name="submitDate" id={i} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} classInput="tw-w-40" invalid={validate && checkInvalid(item.submitDate)} />
                            </div>

                            <div className="tw-flex tw-items-center">
                                <ButtonTooltip tooltip="Устгах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                            </div>
                        </div>
                    )}

                    <div className="tw-flex tw-justify-end tw-items-center tw-py-1">
                        <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                            ААН-ийн төлөөлөгчид
                    </div>

                        <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2" classButton="tw-text-green-500 active:tw-text-green-600" />
                    </div>

                    <div className="tw-flex tw-justify-end">
                        <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4" classButton="tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600 tw-text-sm" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
                    </div>
                </div>
            }
        </div>
    )
}

export default UrgudulNoticeCluster
