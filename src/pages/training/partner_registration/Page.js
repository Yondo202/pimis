import AlertContext from 'components/utilities/alertContext'
import FileCard from 'pages/attachments/fileCard'
import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import { animated, Transition } from 'react-spring/renderprops'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import { FileAttachButton } from '../registration/Page'
import PartnersModal from './partnersModal'


const initialState = {
    introduction_file: null,
    experience_file: null,
    legal_entity: null,
    trainers: null,
}

const descriptions = {
    introduction_file: 'Сургалтын байгууллагын танилцуулга, түүх намтар, туршлага.',
    experience_file: 'Ижил төстэй төслийн сургалтын ажлыг явуулж байсан эсэх. /нотлогоо, нотлох баримтын хамт/',
    legal_entity: 'Хуулийн этгээдийн бүртгэлийн гэрчилгээ.',
    trainers: 'Сургагч багш нарын анкет, холбогдох мэргэжлийн гэрчилгээ.',
}

export default function TrainingPartnerRegistration() {
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        axios.get('training-partners', {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res.data)
            setPartners(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })
    }, [])

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

    const handleSubmit = () => {
        if (form.id) {
            axios.put(`training-partners/${form.id}`, form, {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                console.log(res.data)
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сургалтын байгууллагын бүртгэлийг шинэчиллээ.' })
            }).catch(err => {
                console.log(err.response?.data)
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтын байгууллагын бүртгэлийг хадгалж чадсангүй.' })
            })
        } else {
            axios.post('training-partners', form, {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                console.log(res.data)
                setForm({ ...form, ...res.data.data })
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сургалтын байгууллагын бүртгэлийг хадгаллаа.' })
            }).catch(err => {
                console.log(err.response?.data)
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтын байгууллагын бүртгэлийг хадгалж чадсангүй.' })
            })
        }
    }

    const [partnersModalOpen, setPartnersModalOpen] = useState(true)

    const [partners, setPartners] = useState([])

    const handleSelectPartner = (id) => {
        axios.get(`training-partners/${id}`, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res.data)
            setForm({ ...form, ...res.data.data })
            setPartnersModalOpen(false)
        }).catch(err => {
            console.log(err.response?.data)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтын байгууллагын мэдээллийг уншиж чадсангүй.' })
        })
    }

    return (
        <div className="tw-text-gray-700 tw-text-sm tw-flex tw-justify-center tw-w-full tw-px-4">

            <PartnersModal partnersModalOpen={partnersModalOpen} setPartnersModalOpen={setPartnersModalOpen} partners={partners} handleSelectPartner={handleSelectPartner} setPartners={setPartners} />

            <div className="tw-max-w-5xl tw-w-full tw-shadow-md tw-rounded tw-p-2 tw-mt-10 tw-mb-20 tw-bg-white">
                <div className="tw-text-center tw-text-xl tw-font-medium tw-mt-6">
                    3. Сургалт хамтран зохион байгуулах сургалтын байгууллага бүртгэх
                </div>

                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-mt-8 tw-p-2 tw-gap-3">
                    <div className="">
                        <span className="tw-font-medium">
                            Сургалтын байгууллагын танилцуулга, түүх намтар, туршлага. (File-аар хавсаргах)
                        </span>

                        <div className="tw-relative tw-h-24">
                            <Transition
                                items={form.introduction_file ? true : false}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}>
                                {item => item
                                    ? anims =>
                                        <animated.div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileCard name={form.introduction_file?.name} type={form.introduction_file?.mimetype} size={form.introduction_file?.size} classAppend="" uploading={form.introduction_file === 'loading' && true} removeFile={() => handleRemoveFile('introduction_file')} downloadFile={() => handleDownloadFile('introduction_file')} />
                                        </animated.div>
                                    : anims =>
                                        <animated.div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileAttachButton onClick={() => handleFileClick('introduction_file')} />
                                        </animated.div>
                                }
                            </Transition>
                        </div>
                    </div>

                    <div className="">
                        <span className="tw-font-medium">
                            Ижил төстэй төслийн сургалтын ажлыг явуулж байсан эсэх. /нотлогоо, нотлох баримтын хамт/ (File-аар хавсаргах)
                        </span>

                        <div className="tw-relative tw-h-24">
                            <Transition
                                items={form.experience_file ? true : false}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}>
                                {item => item
                                    ? anims =>
                                        <animated.div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileCard name={form.experience_file?.name} type={form.experience_file?.mimetype} size={form.experience_file?.size} classAppend="" uploading={form.experience_file === 'loading' && true} removeFile={() => handleRemoveFile('experience_file')} downloadFile={() => handleDownloadFile('experience_file')} />
                                        </animated.div>
                                    : anims =>
                                        <animated.div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileAttachButton onClick={() => handleFileClick('experience_file')} />
                                        </animated.div>
                                }
                            </Transition>
                        </div>
                    </div>

                    <div className="">
                        <span className="tw-font-medium">
                            Хуулийн этгээдийн бүртгэлийн гэрчилгээ. (File- аар хавсаргах).
                        </span>

                        <div className="tw-relative tw-h-24">
                            <Transition
                                items={form.legal_entity ? true : false}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}>
                                {item => item
                                    ? anims =>
                                        <animated.div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileCard name={form.legal_entity?.name} type={form.legal_entity?.mimetype} size={form.legal_entity?.size} classAppend="" uploading={form.legal_entity === 'loading' && true} removeFile={() => handleRemoveFile('legal_entity')} downloadFile={() => handleDownloadFile('legal_entity')} />
                                        </animated.div>
                                    : anims =>
                                        <animated.div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileAttachButton onClick={() => handleFileClick('legal_entity')} />
                                        </animated.div>
                                }
                            </Transition>
                        </div>
                    </div>

                    <div className="">
                        <span className="tw-font-medium">
                            Сургагч багш нарын анкет, холбогдох мэргэжлийн гэрчилгээ. (File-аар хавсаргах).
                        </span>

                        <div className="tw-relative tw-h-24">
                            <Transition
                                items={form.trainers ? true : false}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}>
                                {item => item
                                    ? anims =>
                                        <animated.div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileCard name={form.trainers?.name} type={form.trainers?.mimetype} size={form.trainers?.size} classAppend="" uploading={form.trainers === 'loading' && true} removeFile={() => handleRemoveFile('trainers')} downloadFile={() => handleDownloadFile('trainers')} />
                                        </animated.div>
                                    : anims =>
                                        <animated.div className="tw-absolute tw-top-2 tw-left-2" style={anims}>
                                            <FileAttachButton onClick={() => handleFileClick('trainers')} />
                                        </animated.div>
                                }
                            </Transition>
                        </div>
                    </div>
                </div>

                <input className="tw-invisible tw-h-0 tw-absolute" type="file" onChange={handleFileInput} ref={fileInputRef} />

                <div className="tw-flex tw-justify-center">
                    <button className="tw-mt-6 tw-mb-10 tw-py-2 tw-px-8 tw-bg-blue-900 active:tw-bg-blue-800 tw-transition-all tw-text-white tw-text-15px focus:tw-outline-none tw-rounded hover:tw-shadow-md" onClick={handleSubmit}>
                        Хадгалах
                    </button>
                </div>
            </div>
        </div>
    )
}