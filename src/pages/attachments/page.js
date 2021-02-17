import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import FileCard from './fileCard'
import PlusSVG from 'assets/svgComponents/plusSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import AlertContext from 'components/utilities/alertContext'
import FilePreviewContext from 'components/utilities/filePreviewContext'


const initialState = [
    {
        "code": "export_plan",
        "description": "Экспорт хөгжлийн төлөвлөгөө.",
        "files": null
    },
    {
        "code": "baigal_orchin",
        "description": "Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, Байгаль орчны удирдлагын төлөвлөгөө.",
        "files": null
    },
    {
        "code": "gerchilgee",
        "description": "Хуулийн этгээдийн улсын бүртгэлийн гэрчилгээний хуулбар.",
        "files": null
    },
    {
        "code": "prevbalance",
        "description": "Өмнөх 2 жилийн санхүүгийн тайлан.",
        "files": null
    },
    {
        "code": "tatvariin_or",
        "description": "Холбогдох дүүргийн татварын албанаас 12 сараас дээш хугацааны татварын өргүйг нотолсон тодорхойлолт, баримт.",
        "files": null
    },
    {
        "code": "ndsh_ajiltan",
        "description": "Холбогдох нийгмийн даатгалын газраас 12 сараас дээш хугацааны өргүйг нотолсон тодорхойлолт, баримт, нийгмийн даатгал төлдөг ажилчдын тооны мэдээлэл.",
        "files": null
    },
    {
        "code": "zeel_lavlagaa",
        "description": "Монгол банкны зээлийн мэдээллийн сангаас муу ангиллын зээлгүйг нотолсон тодорхойлолт, баримт.",
        "files": null
    },
    {
        "code": "omchlogchiin_todorhoilolt",
        "description": "Хуулийн этгээдийн эцсийн өмчлөгчдийг тодорхойлох баримт.",
        "files": null
    },
    {
        "code": "ajiltanii_namtar",
        "description": "Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, ур чадварыг илэрхийлэх намтар. (Дор хаяж 3 албан тушаалтны мэдээлэл)",
        "files": null
    },
    {
        "code": "oyunii_ezemshil",
        "description": "Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо.",
        "files": null
    },
    {
        "code": "banknii_huulga",
        "description": "Санхүүжилтийг бүрэн хийх боломжтойг нотолсон баримт бичиг, банкны хуулга гм.",
        "files": null
    },
    {
        "code": "busad_barimt",
        "description": "Бусад шаардлагатай баримт бичиг.",
        "files": null
    }
]

export default function AttachmentUploads() {
    const [form, setForm] = useState(initialState)

    const [editCode, setEditCode] = useState()

    const inputRef = useRef()

    const AlertCtx = useContext(AlertContext)
    const FilePreviewCtx = useContext(FilePreviewContext)

    const handleButtonClick = (code) => {
        setEditCode(code)
        inputRef.current.click()
    }

    const handleFileInput = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        const index = form.findIndex(item => item.code === editCode)
        console.log(index)
        formData.append('description', form[index].description)

        const newForm = form
        newForm[index].files = [...newForm[index].files || [], 'loading']
        setForm([...newForm])

        axios.post('attach-files', formData, {
            headers: {
                'Authorization': getLoggedUserToken(),
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            console.log(res.data)
            const newForm1 = form
            let newFiles = newForm1[index].files
            newFiles = newFiles.filter(item => item !== 'loading')
            newForm1[index].files = [...newFiles, res.data.data]
            setForm([...newForm1])
        }).catch(err => {
            console.log(err.response?.data)
            const newForm2 = form
            newForm2[index].files = newForm[index].files.filter(item => item !== 'loading')
            setForm([...newForm2])
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Гэрээний файлыг хадгалж чадсангүй.' })
        })
    }

    const handleRemoveFile = (code, fileIndex) => {
        const index = form.findIndex(item => item.code === code)
        const newForm = form
        newForm[index].files = newForm[index].files.filter((_, i) => i !== fileIndex)
        setForm(newForm)
    }

    const handleDownloadFile = (code, fileIndex) => {
        const index = form.findIndex(item => item.code === code)
        axios.get(`attach-files/${form[index].files[fileIndex].id}`, {
            headers: { 'Authorization': getLoggedUserToken() },
            responseType: 'blob',
        }).then(res => {
            console.log(res)
            const URL = window.URL.createObjectURL(res.data)
            FilePreviewCtx.setFile({ open: true, src: URL })
        }).catch(err => {
            console.log(err.response?.data)
        })
    }

    const handleSubmit = () => {
        axios.post('evidences', form, {
            header: { 'Authorization': getLoggedUserToken() },
        }).then(res => {
            console.log(res.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт файлуудыг амжилттай хадгаллаа.' })
        }).catch(err => {
            console.log(err.response?.data)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Хавсралт файлуудыг хадгалж чадсангүй.' })
        })
    }

    useEffect(() => {
        axios.get('evidences', {
            headers: { 'Authorization': getLoggedUserToken() },
        }).then(res => {
            console.log(res.data)
            setForm(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })
    }, [])

    return (
        <div className="tw-relative tw-text-gray-700 tw-pb-20">
            <input className="tw-invisible tw-absolute" type="file" onChange={handleFileInput} ref={inputRef} />

            <ol className="tw-list-decimal tw-list-inside tw-m-4 tw-shadow-md">
                {form.map(item =>
                    <li className="tw-p-2 tw-pl-4 tw-font-medium odd:tw-bg-gray-50" key={item.code}>
                        <span className="tw-text-sm">{item.description}</span>

                        <div className="tw-flex tw-flex-wrap tw-mt-1">
                            {item.files?.map((file, j) =>
                                <FileCard name={file.name} type={file.mimetype} size={file.size} removeFile={() => handleRemoveFile(item.code, j)} classAppend="tw-my-1 tw-mx-1.5" uploading={file === 'loading' && true} downloadFile={() => handleDownloadFile(item.code, j)} key={file.id} />
                            )}

                            <div className="tw-inline-flex tw-items-center tw-rounded-lg tw-my-1 tw-mx-1.5 focus:tw-outline-none" onClick={() => handleButtonClick(item.code)}>
                                <svg className="tw-h-20" viewBox="0 0 285 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.725098 20.775C0.725098 9.78453 9.63483 0.875 20.6251 0.875H194.75L284.3 90.425V329.225C284.3 340.215 275.39 349.125 264.4 349.125H20.6251C9.63483 349.125 0.725098 340.215 0.725098 329.225V20.775Z" fill="url(#paint0_linear)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M194.75 0.875V70.525C194.75 81.5153 203.66 90.425 214.65 90.425H284.3L194.75 0.875Z" fill="url(#paint1_linear)" />
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="0.725098" y1="0.875" x2="0.725098" y2="349.125" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FFDFB8" />
                                            <stop offset="1" stopColor="#FFCA8A" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear" x1="194.75" y1="0.875" x2="194.75" y2="90.425" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FFCC8F" />
                                            <stop offset="1" stopColor="#FFBB69" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <ButtonTooltip tooltip="Файл нэмж оруулах" beforeSVG={<PlusSVG className="tw-w-10 tw-h-10" />} classAppend="tw-right-13 tw-w-0" classButton="tw-text-white hover:tw-shadow-none" />
                            </div>
                        </div>
                    </li>
                )}
            </ol>

            <button className="tw-absolute tw-bottom-8 tw-left-1/2 tw-transform tw--translate-x-1/2 tw-bg-blue-500 tw-text-white tw-rounded-md tw-py-1 tw-px-3 tw-font-medium hover:tw-shadow-md active:tw-bg-blue-600 focus:tw-outline-none" onClick={handleSubmit}>
                Хадгалах
            </button>
        </div>
    )
}