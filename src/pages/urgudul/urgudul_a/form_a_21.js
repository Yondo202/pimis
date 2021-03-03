import React, { useContext, useEffect, useRef, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/help_popup/helpPopup'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import FormOptions from 'components/urgudul_components/formOptions'
import PenSVG from 'assets/svgComponents/penSVG'
import FormRichText from 'components/urgudul_components/formRichText'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import SearchSelect from 'components/urgudul_components/searchSelect'
import UploadSVG from 'assets/svgComponents/uploadSVG'
import FileCard from 'pages/attachments/fileCard'
import PaperClipSVG from 'assets/svgComponents/paperClipSVG'
import FilePreviewContext from 'components/utilities/filePreviewContext'


const initialState = [
    {
        company_name: null,
        representative_name: null,
        representative_phone: null,
        representative_email: null,
        business_sectorId: null,
        company_size: null,
        support_recipient: null,
        project_contribution: null,
        attachedFiles: null,
    },
]

function UrugudulClusters() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.clusters && UrgudulCtx.data.clusters?.length) {
            setForm(UrgudulCtx.data.clusters)
        }
    }, [UrgudulCtx.data.id])

    const handleInput = (e) => {
        const newForm = form
        newForm[e.target.id][e.target.name] = e.target.value
        setForm([...newForm])
    }

    const handleInputFormatted = (values, key, index) => {
        const newForm = form
        newForm[index][key] = values.formattedValue
        setForm([...newForm])
    }

    const [editIndex, setEditIndex] = useState()

    const fileInputRef = useRef()

    const handleFileInputClick = (index) => {
        setEditIndex(index)
        fileInputRef.current.click()
    }

    const handleInputFile = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('description', 'Кластерийн гишүүн байгууллагуудын хамтын ажиллагааны гэрээ')
        const newForm = form
        newForm[editIndex].attachedFiles = 'loading'
        setForm([...newForm])

        axios.post('attach-files', formData, {
            headers: {
                'Authorization': getLoggedUserToken(),
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            console.log(res.data)
            const newForm = form
            newForm[editIndex].attachedFiles = [res.data.data]
            setForm([...newForm])
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Гэрээний файл амжилттай хадгалагдлаа.' })
        }).catch(err => {
            console.log(err.response?.data)
            const newForm = form
            newForm[editIndex].attachedFiles = null
            setForm([...newForm])
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Гэрээний файлыг хадгалж чадсангүй.' })
        })
    }

    const handleRemoveFile = (index) => {
        const newForm = form
        newForm[index].attachedFiles = null
        setForm([...newForm])
    }

    const FilePreviewCtx = useContext(FilePreviewContext)

    const handleDownloadFile = (index) => {
        axios.get(`attach-files/${form[index].attachedFiles[0].id}`, {
            headers: {
                'Authorization': getLoggedUserToken(),
            },
            responseType: 'blob',
        }).then(res => {
            console.log(res)
            const URL = window.URL.createObjectURL(res.data)
            FilePreviewCtx.setFile({ open: true, src: URL })
        }).catch(err => {
            console.log(err.response?.data)
        })
    }

    const handleAdd = () => {
        const newObj = {
            company_name: null,
            representative_name: null,
            representative_phone: null,
            representative_email: null,
            business_sectorId: null,
            company_size: null,
            support_recipient: null,
            project_contribution: null,
            attachedFiles: null,
        }

        setForm([...form, newObj])
    }

    const handleRemove = (index) => {
        setForm(form.filter((_, i) => i !== index))
    }

    const handleSetForm = (key, value, index) => {
        const newForm = form
        newForm[index][key] = value
        setForm([...newForm])
    }

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        let allValid = true
        for (const obj of form) {
            allValid = allValid && Object.keys(initialState[0]).every(key => !checkInvalid(obj[key], key === 'project_contribution' && 'quill'))
        }

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, { clusters: form }, {
                    headers: {
                        'Authorization': getLoggedUserToken()
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                        AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Кластерийн мэдээлэл хадгалагдлаа.' })
                        history.push('/urgudul/4')
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

    const [sectors, setSectors] = useState([])

    useEffect(() => {
        axios.get('business-sector')
            .then(res => {
                console.log(res.data)
                setSectors(res.data.data)
            })
    }, [])

    return (
        <div className="tw-relative tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center" style={{ fontSize: '15px' }}>
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">A2</span>
                - Кластерын гишүүн байгууллагууд

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Тухайн кластерт оролцогч, бусад аж ахуйн нэгжүүдийг жагсаалт, тэдгээрийн төлөөлөх албан тушаалтан, овог нэрийн хамт." position="bottom" />
            </div>

            <input className="tw-absolute tw-invisible" type="file" onChange={handleInputFile} ref={fileInputRef} />

            {form.map((item, i) =>
                <div className="tw-flex even:tw-bg-gray-50" key={i}>
                    <div className="tw-flex-grow">
                        <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                            <FormInline label="Кластерын гишүүн аж ахуйн нэгж" type="text" value={item.company_name || ''} name="company_name" id={i} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" invalid={validate && checkInvalid(item.company_name)} />

                            <FormInline label="Төлөөлөх албан тушаалтны нэр" type="text" value={item.representative_name || ''} name="representative_name" id={i} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" invalid={validate && checkInvalid(item.representative_name)} />

                            <FormInline label="Төлөөлөгчийн утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={item.representative_phone || ''} name="representative_phone" id={i} onChange={handleInputFormatted} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" invalid={validate && checkInvalid(item.representative_phone)} />

                            <FormInline label="Төлөөлөгчийн имэйл" type="email" value={item.representative_email || ''} name="representative_email" id={i} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" validate={true} invalid={validate && checkInvalid(item.representative_email)} />

                            <SearchSelect label="Салбар" data={sectors} value={item.business_sectorId} name="business_sectorId" id={i} displayName="bdescription_mon" setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.business_sectorId)} />

                            <div className="tw-w-full tw-max-w-lg tw-flex">
                                <FormOptions label="Аж ахуйн нэгжийн хэмжээ" options={['Бичил', 'Жижиг', 'Дунд']} values={[1, 2, 3]} value={item.company_size} name="company_size" id={i} setForm={handleSetForm} classAppend="tw-flex-grow" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.company_size)} />

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

                            <FormOptions label="Манай дэмжлэг хүртэгч мөн эсэх" options={['Тийм', 'Үгүй']} values={[true, false]} value={item.support_recipient} name="support_recipient" id={i} setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.support_recipient)} />
                        </div>

                        <div className="tw-w-full">
                            <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                                <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(item.project_contribution, 'quill') ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                                <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(item.project_contribution, 'quill') && 'tw-text-red-500'} tw-transition-colors`}>
                                    Төслийн төлөвлөлт, гүйцэтгэлд оруулах хувь нэмэр
                                </span>

                                <HelpPopup classAppend="tw-ml-auto" main="Ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв боловсруулах, төслийг хэрэгжүүлэхэд дэмжлэг үзүүлэх гм." position="top-left" />
                            </div>

                            <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                                <FormRichText modules="small" value={item.project_contribution || ''} name="project_contribution" id={i} setForm={handleSetForm} />
                            </div>
                        </div>

                        <div className="tw-w-full">
                            <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                                <UploadSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(item.attachedFiles) ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                                <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(item.attachedFiles) && 'tw-text-red-500'} tw-transition-colors`}>
                                    Кластерийн хамтын ажиллагааны гэрээ
                                </span>

                                <HelpPopup classAppend="tw-ml-auto" main="Кластерийн тэргүүлэгч ААН болоод гишүүн ААН талуудын хийсэн хамтын ажиллагааны гэрээгээ файлаар хавсаргана уу." position="top-left" />
                            </div>

                            {item.attachedFiles ?
                                <FileCard name={item.attachedFiles[0]?.name} type={item.attachedFiles[0]?.mimetype} size={item.attachedFiles[0]?.size} classAppend="tw-ml-6 tw-mb-4" uploading={item.attachedFiles === 'loading' && true} removeFile={() => handleRemoveFile(i)} downloadFile={() => handleDownloadFile(i)} />
                                :
                                <button className="tw-ml-6 tw-mb-4 tw-py-0.5 tw-px-1.5 tw-text-sm tw-border tw-border-gray-600 tw-font-medium tw-rounded-lg focus:tw-outline-none hover:tw-shadow-md active:tw-text-blue-500 active:tw-border-blue-500 tw-inline-flex tw-items-center" onClick={() => handleFileInputClick(i)}>
                                    <span className="tw-text-gray-700">Файл оруулах</span>
                                    <PaperClipSVG className="tw-w-4 tw-h-4 tw-ml-1" />
                                </button>
                            }
                        </div>
                    </div>

                    <div className="tw-flex tw-items-center">
                        <ButtonTooltip tooltip="Устгах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                    </div>
                </div>
            )}

            <div className="tw-flex tw-justify-end tw-items-center tw-pt-2">
                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                    Кластерийн гишүүн байгууллагууд
                </div>

                <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classButton="tw-text-green-500 active:tw-text-green-600 tw-mr-2" />
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4" classButton="tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600 tw-text-sm" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrugudulClusters
