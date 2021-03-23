import React, { useContext, useRef, useState } from 'react'
import FormRichText from 'components/urgudul_components/formRichText'
import PaperClipSVG from 'assets/svgComponents/paperClipSVG'
import { Transition } from 'react-spring/renderprops-universal'
import FileCard from 'pages/attachments/fileCard'
import AlertContext from 'components/utilities/alertContext'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import FilePreviewContext from 'components/utilities/filePreviewContext'


const initialState = {
    fullname: null,
    regisration: null,
    phone: null,
    company_name: null,
    position: null,
    benefit: null,
    introduction_text: null,
    introduction_file: null,
    request_file: null,
    identity_file: null,
}

const descriptions = {
    introduction_file: 'Сургалтанд бүртгүүлэгчийн байгууллагын танилцуулга.',
    request_file: 'Ажилтнаа сургалтад хамруулах тухай хүсэлт, албан тоот.',
    identity_file: 'Сургалтанд бүртгүүлэгчийн иргэний үнэмлэхний хуулбар.',
}

export default function TrainingRegistration() {
    const [form, setForm] = useState(initialState)

    const handleInput = (key, value) => setForm({ ...form, [key]: value })

    const fileInputRef = useRef(null)

    const [editKey, setEditKey] = useState()

    const AlertCtx = useContext(AlertContext)

    const handleFileClick = (key) => {
        setEditKey(key)
        fileInputRef.current.click()
    }

    const handleFileInput = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('description', descriptions[editKey])
        setForm({ ...form, [editKey]: 'loading' })

        axios.post('attach-files', formData, {
            headers: {
                'Authorization': getLoggedUserToken(),
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            console.log(res.data)
            setForm({ ...form, [editKey]: res.data.data })
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Файл амжилттай хадгалагдлаа.' })
        }).catch(err => {
            console.log(err.response?.data)
            setForm({ ...form, [editKey]: null })
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Файлыг хадгалж чадсангүй.' })
        })
    }

    const handleRemoveFile = (key) => {
        setForm({ ...form, [key]: null })
    }

    const FilePreviewCtx = useContext(FilePreviewContext)

    const handleDownloadFile = (key) => {
        axios.get(`attach-files/${form[key].id}`, {
            headers: {
                'Authorization': getLoggedUserToken(),
            },
            responseType: 'blob',
        }).then(res => {
            console.log(res)
            const URL = window.URL.createObjectURL(res.data)
            FilePreviewCtx.setFile({ open: true, src: URL })
        }).catch(err => {
            console.log(err.response)
        })
    }

    const introductionFileGiven = form.introduction_file ? true : false
    const requestFileGiven = form.request_file ? true : false
    const identityFileGiven = form.identity_file ? true : false

    return (
        <div className="tw-text-gray-700 tw-text-sm tw-flex tw-justify-center tw-w-full tw-px-4">
            <div className="tw-max-w-5xl tw-w-full tw-shadow-md tw-rounded tw-p-2 tw-mt-10 tw-mb-20 tw-bg-white">
                <div className="tw-text-center tw-text-xl tw-font-medium tw-mt-6">
                    1. Сургалтанд бүртгүүлэх
                </div>

                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-mt-8 tw-p-2">
                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-font-medium">
                            Овог нэр
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="text" value={form.fullname || ''} onChange={e => handleInput('fullname', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-font-medium">
                            Рэгистрийн дугаар
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="number" value={form.regisration || ''} onChange={e => handleInput('regisration', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-font-medium">
                            Утасны дугаар
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="number" value={form.phone || ''} onChange={e => handleInput('phone', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-font-medium">
                            Байгууллагын нэр
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="text" value={form.company_name || ''} onChange={e => handleInput('company_name', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
                        <div className="tw-font-medium">
                            Одоогийн ажлын албан тушаал
                        </div>
                        <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-sm tw-rounded tw-border tw-border-gray-500" type="text" value={form.position || ''} onChange={e => handleInput('position', e.target.value)} />
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full md:tw-col-span-2">
                        <div className="tw-font-medium tw-mt-2">
                            Манай сургалтад хамрагдах нь танд ямар ашиг тустай вэ? Энэхүү сургалтаас ямар үр дүн хүлээж байгаа вэ?
                        </div>

                        <div className="tw-mt-1 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-w-full tw-max-w-3xl" style={{ minHeight: '128px', maxHeight: '768px' }}>
                            <FormRichText modules="small" value={form.benefit} name="benefit" setForm={handleInput} />
                        </div>
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full tw-justify-items-start md:tw-col-span-2">
                        <div className="tw-font-medium">
                            Та өөрийн ажиллаж буй байгууллагын танилцуулгыг бичнэ үү
                        </div>

                        <div className="tw-mt-1 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-w-full tw-max-w-3xl" style={{ minHeight: '128px', maxHeight: '768px' }}>
                            <FormRichText modules="small" value={form.introduction_text} name="introduction_text" setForm={handleInput} />
                        </div>

                        <div className="tw-font-medium tw-mt-2">
                            Эсвэл танилцуулгыг файлаар хавсаргана уу
                        </div>

                        <div className="tw-relative tw-h-24">
                            <Transition
                                items={introductionFileGiven}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}>
                                {item => item
                                    ? anims =>
                                        <div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileCard name={form.introduction_file?.name} type={form.introduction_file?.mimetype} size={form.introduction_file?.size} classAppend="" uploading={form.introduction_file === 'loading' && true} removeFile={() => handleRemoveFile('introduction_file')} downloadFile={() => handleDownloadFile('introduction_file')} />
                                        </div>
                                    : anims =>
                                        <div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileAttachButton onClick={() => handleFileClick('introduction_file')} />
                                        </div>
                                }
                            </Transition>
                        </div>
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full tw-justify-items-start md:tw-col-span-2">
                        <div className="tw-font-medium">
                            Та ажилтнаа сургалтад хамруулах тухай өөрийн байгууллагын хүсэлт, албан тоотоо файлаар хавсаргана уу
                        </div>

                        <div className="tw-relative tw-h-24">
                            <Transition
                                items={requestFileGiven}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}>
                                {item => item
                                    ? anims =>
                                        <div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileCard name={form.request_file?.name} type={form.request_file?.mimetype} size={form.request_file?.size} classAppend="" uploading={form.request_file === 'loading' && true} removeFile={() => handleRemoveFile('request_file')} downloadFile={() => handleDownloadFile('request_file')} />
                                        </div>
                                    : anims =>
                                        <div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileAttachButton onClick={() => handleFileClick('request_file')} />
                                        </div>
                                }
                            </Transition>
                        </div>
                    </div>

                    <div className="tw-py-2 tw-px-4 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full tw-justify-items-start md:tw-col-span-2">
                        <div className="tw-font-medium">
                            Та иргэний үнэмлэхний хуулбараа файлаар хавсаргана уу
                        </div>

                        <div className="tw-relative tw-h-24">
                            <Transition
                                items={identityFileGiven}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}>
                                {item => item
                                    ? anims =>
                                        <div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileCard name={form.identity_file?.name} type={form.identity_file?.mimetype} size={form.identity_file?.size} classAppend="" uploading={form.identity_file === 'loading' && true} removeFile={() => handleRemoveFile('identity_file')} downloadFile={() => handleDownloadFile('identity_file')} />
                                        </div>
                                    : anims =>
                                        <div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileAttachButton onClick={() => handleFileClick('identity_file')} />
                                        </div>
                                }
                            </Transition>
                        </div>
                    </div>
                </div>

                <input className="tw-invisible tw-h-0 tw-absolute" type="file" onChange={handleFileInput} ref={fileInputRef} />

                <div className="tw-flex tw-justify-center">
                    <button className="tw-mt-6 tw-mb-10 tw-py-2 tw-px-8 tw-bg-blue-900 active:tw-bg-blue-800 tw-transition-all tw-text-white tw-text-15px focus:tw-outline-none tw-rounded hover:tw-shadow-md">
                        Хадгалах
                    </button>
                </div>
            </div>
        </div >
    )
}

export const FileAttachButton = (props) => (
    <button className="tw-py-1.5 tw-px-6 tw-text-sm tw-border tw-border-gray-500 tw-font-medium tw-rounded focus:tw-outline-none hover:tw-shadow-md tw-inline-flex tw-items-center tw-transition-colors active:tw-bg-gray-200" onClick={props.onClick}>
        <span className="tw-whitespace-nowrap">Файл оруулах</span>
        <PaperClipSVG className="tw-w-4 tw-h-4 tw-ml-1" />
    </button>
)