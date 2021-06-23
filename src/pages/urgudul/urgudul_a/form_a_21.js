import React, { useContext, useEffect, useRef, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/help_popup/helpPopup'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import FormOptions from 'components/urgudul_components/formOptions'
import FormRichText from 'components/urgudul_components/formRichText'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import FileCard from 'pages/attachments/fileCard'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import TreeSelect from 'components/urgudul_components/treeSelect'
import LoadFromOtherProject from '../loadFromOtherProject'
import { acceptDocTypes } from 'pages/attachments/page'
import { helperTable } from './form_a_1'
import FileCardAdd from 'pages/attachments/fileCardAdd'
import { Transition, animated } from 'react-spring/renderprops'

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

function UrgudulClusters({ projects }) {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.clusters && UrgudulCtx.data.clusters?.length) {
            setForm(UrgudulCtx.data.clusters)
        }
    }, [UrgudulCtx.data.id])

    const handleInput = (key, value, index) => setForm(prev => {
        const next = [...prev]
        next[index][key] = value
        return next
    })

    const handleInputFormatted = (key, values, index) => setForm(prev => {
        const next = [...prev]
        next[index][key] = values.formattedValue
        return next
    })

    const [editIndex, setEditIndex] = useState()

    const fileInputRef = useRef()

    const handleFileInputClick = (index) => {
        setEditIndex(index)
        fileInputRef.current.value = null
        fileInputRef.current.click()
    }

    const handleInputFile = (e) => {
        const formData = new FormData()
        if (!e.target.files[0]) return
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
            const newForm = form
            newForm[editIndex].attachedFiles = [res.data.data]
            setForm([...newForm])
        }).catch(err => {
            const newForm = form
            newForm[editIndex].attachedFiles = null
            setForm([...newForm])
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Гэрээний файлыг хадгалж чадсангүй.' })
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
            const URL = window.URL.createObjectURL(res.data)
            FilePreviewCtx.setFile({ open: true, src: URL })
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Файлыг татаж чадсангүй.' })
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

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        let allValid = true
        for (const obj of form) {
            allValid = allValid && Object.keys(initialState[0]).every(key => !checkInvalid(obj[key], key === 'project_contribution' && 'quill'))
        }

        if (form.length < 1) {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Дор хаяж 1 кластерийн гишүүн байгууллагын мэдээлэл оруулна.' })
            return
        }

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, { clusters: form }, {
                    headers: {
                        'Authorization': getLoggedUserToken()
                    }
                }).then(res => {
                    UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Кластерийн мэдээллийг хадгаллаа.' })
                    history.push('/urgudul/4')
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

    const [sectors, setSectors] = useState([])

    useEffect(() => {
        axios.get('business-sector').then(res => {
            setSectors(res.data.data)
        })
    }, [])

    const otherProjects = projects.filter(project => project.id !== UrgudulCtx.data.id)

    const loadFromOtherProjectCluster = (id) => {
        axios.get(`projects/${id}`, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            const loadCluster = res.data.data?.clusters ?? []
            if (loadCluster.length > 0) {
                setForm(loadCluster)
            } else {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Кластерийн байгууллагуудын мэдээллээ оруулаагүй өргөдөл байна.' })
                return
            }
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонгосон өргөдлөөс мэдээллийг нь орууллаа.' })
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сонгосон өргөдлийн мэдээллийг татаж чадсангүй.' })
        })
    }

    return (
        <div className="tw-relative tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="">
                <div className="tw-p-3 tw-flex tw-items-center tw-relative">
                    <span className="tw-pl-2 tw-font-medium tw-text-base tw-text-blue-500">Кластерын гишүүн байгууллагууд</span>

                    <HelpPopup classAppend="tw-ml-2 tw-mr-2" main="Тухайн кластерт оролцогч, бусад аж ахуйн нэгжүүдийг жагсаалт, тэдгээрийн төлөөлөх албан тушаалтан, овог нэрийн хамт." position="bottom" />

                    <LoadFromOtherProject classAppend="tw-absolute tw-right-4" otherProjects={otherProjects} loadFromOtherProject={loadFromOtherProjectCluster} />
                </div>

                {UrgudulCtx.data.project_number &&
                    <div className="tw-ml-5 tw-mb-2 tw-text-13px">
                        Өргөдлийн дугаар:
                        <span className="tw-text-blue-500 tw-ml-2 tw-font-medium">{UrgudulCtx.data.project_number}</span>
                    </div>
                }
            </div>

            <input className="tw-absolute tw-invisible" type="file" accept={acceptDocTypes} onChange={handleInputFile} ref={fileInputRef} />

            {form.map((item, i) =>
                <div className="tw-flex even:tw-bg-gray-50" key={i}>
                    <div className="tw-flex-grow">
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-3">
                            <FormInline label="Кластерын гишүүн аж ахуйн нэгж" type="text" value={item.company_name || ''} name="company_name" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" invalid={validate && checkInvalid(item.company_name)} />

                            <FormInline label="Төлөөлөх албан тушаалтны нэр" type="text" value={item.representative_name || ''} name="representative_name" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" invalid={validate && checkInvalid(item.representative_name)} />

                            <FormInline label="Төлөөлөгчийн утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={item.representative_phone || ''} name="representative_phone" index={i} setter={handleInputFormatted} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" invalid={validate && checkInvalid(item.representative_phone)} />

                            <FormInline label="Төлөөлөгчийн имэйл" type="email" value={item.representative_email || ''} name="representative_email" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" validate={true} invalid={validate && checkInvalid(item.representative_email)} />

                            <TreeSelect data={sectors} label="Салбар" displayName="bdescription_mon" value={item.business_sectorId} name="business_sectorId" index={i} handleChange={handleInput} invalid={validate && checkInvalid(item.business_sectorId)} />

                            <div className="tw-w-full tw-max-w-md tw-flex">
                                <FormOptions label="Аж ахуйн нэгжийн хэмжээ" options={['Бичил', 'Жижиг', 'Дунд']} values={[1, 2, 3]} value={item.company_size} name="company_size" id={i} setForm={handleInput} classLabel={i % 2 === 1 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.company_size)} />

                                <div className="tw-relative tw-w-2">
                                    <HelpPopup classAppend="tw-right-5 tw-top-1" main="Аж ахуйн нэгжийн хэмжээ нь борлуулалт эсвэл бүтэн цагийн ажилтнуудын аль өндрөөр тогтоосноор ангилал нь тогтоно. Жишээ нь:" list={["$30M борлуулалттай 30 хүнтэй аж ахуйн нэгжийн хувьд Дунд ангиллын аж ахуйн нэгжид хамаарна."]} position="top" />
                                </div>
                            </div>

                            <div className="tw-p-2 tw-max-w-md">
                                {helperTable}
                            </div>

                            <FormOptions label="Манай дэмжлэг хүртэгч мөн эсэх" options={['Тийм', 'Үгүй']} values={[true, false]} value={item.support_recipient} name="support_recipient" id={i} setForm={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.support_recipient)} />
                        </div>

                        <FormRichText
                            label="Төслийн төлөвлөлт, гүйцэтгэлд оруулах хувь нэмэр"
                            invalid={validate && checkInvalid(item.project_contribution, 'quill')}
                            HelpPopup={<HelpPopup classAppend="tw-ml-2" main="Ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв боловсруулах, төслийг хэрэгжүүлэхэд дэмжлэг үзүүлэх гм." position="top-left" />}
                            modules="small"
                            value={item.project_contribution || ''}
                            name="project_contribution"
                            index={i}
                            setter={handleInput}
                            classAppend="tw-pl-6 tw-pt-1 tw-pr-1"
                        />

                        <div className="tw-w-full">
                            <div className="tw-flex tw-items-center tw-pl-6 tw-pr-2 tw-py-3">
                                <span className={`tw-text-sm ${validate && checkInvalid(item.attachedFiles) && 'tw-text-red-500'} tw-transition-colors`}>
                                    Кластерийн хамтын ажиллагааны гэрээ
                                </span>

                                <HelpPopup classAppend="tw-ml-2" main="Кластерийн тэргүүлэгч ААН болоод гишүүн ААН талуудын хийсэн хамтын ажиллагааны гэрээгээ файлаар хавсаргана уу." position="top-left" />
                            </div>

                            <Transition
                                items={item.attachedFiles}
                                from={{ transform: 'scale(0)' }}
                                enter={{ transform: 'scale(1)' }}
                                leave={{ display: 'none' }}>
                                {item1 => item1
                                    ? anims => {
                                        const file = item.attachedFiles || []
                                        return <FileCard name={file[0]?.name} type={file[0]?.mimetype} size={file[0]?.size} classAppend="tw-ml-9 tw-mb-5" uploading={item.attachedFiles === 'loading' && true} removeFile={() => handleRemoveFile(i)} downloadFile={() => handleDownloadFile(i)} style={anims} />
                                    }
                                    : anims => <FileCardAdd classAppend="tw-ml-9 tw-mb-5" onClick={() => handleFileInputClick(i)} style={anims} />
                                }
                            </Transition>
                        </div>
                    </div>

                    <div className="tw-flex tw-items-center">
                        <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                    </div>
                </div>
            )}

            <div className="tw-flex tw-justify-end tw-items-center tw-py-1">
                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                    Кластерийн гишүүн байгууллагууд
                </div>

                <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classButton={`tw-text-green-500 active:tw-text-green-600 tw-mr-2 ${validate && form.length < 1 && 'tw-border tw-border-red-500'}`} />
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-6 tw-mb-4 tw-mr-4" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px tw-font-light" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulClusters
