import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import FileCard from './fileCard'
import PlusSVG from 'assets/svgComponents/plusSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import AlertContext from 'components/utilities/alertContext'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import HelpPopup from 'components/help_popup/helpPopup'
import { useParams } from 'react-router-dom'
import FileCardAdd from './fileCardAdd'


const initialState = [
    {
        "code": "export_plan",
        "description": "Экспорт хөгжлийн төлөвлөгөө.",
        "files": null,
    },
    {
        "code": "baigal_orchin",
        "description": "Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, Байгаль орчны удирдлагын төлөвлөгөө.",
        "files": null,
    },
    {
        "code": "gerchilgee",
        "description": "Хуулийн этгээдийн улсын бүртгэлийн гэрчилгээний хуулбар.",
        "files": null,
    },
    {
        "code": "prevbalance",
        "description": "Өмнөх 2 жилийн санхүүгийн тайлан. (Энэ оны санхүүгийн тайлангийн хамт)",
        "files": null,
    },
    {
        "code": "tatvariin_or",
        "description": "Холбогдох дүүргийн татварын албанаас 12 сараас дээш хугацааны татварын өргүйг нотолсон тодорхойлолт, баримт.",
        "files": null,
    },
    {
        "code": "ndsh_ajiltan",
        "description": "Холбогдох нийгмийн даатгалын газраас 12 сараас дээш хугацааны өргүйг нотолсон тодорхойлолт, баримт, нийгмийн даатгал төлдөг ажилчдын тооны мэдээлэл.",
        "files": null,
    },
    {
        "code": "zeel_lavlagaa",
        "description": "Монгол банкны зээлийн мэдээллийн сангаас муу ангиллын зээлгүйг нотолсон тодорхойлолт, баримт.",
        "files": null,
    },
    {
        "code": "omchlogchiin_todorhoilolt",
        "description": "Хуулийн этгээдийн эцсийн өмчлөгчдийг тодорхойлох баримт.",
        "files": null,
    },
    {
        "code": "ajiltanii_namtar",
        "description": "Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, ур чадварыг илэрхийлэх намтар. (Дор хаяж 3 албан тушаалтны мэдээлэл)",
        "files": null,
    },
    {
        "code": "oyunii_ezemshil",
        "description": "Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо.",
        "files": null,
    },
    {
        "code": "banknii_huulga",
        "description": "Санхүүжилтийг бүрэн хийх боломжтойг нотолсон баримт бичиг, банкны хуулга гм.",
        "files": null,
    },
    {
        "code": "busad_barimt",
        "description": "Бусад шаардлагатай баримт бичиг.",
        "files": null,
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
        if (!e.target.files[0]) return
        formData.append('file', e.target.files[0])
        const index = form.findIndex(item => item.code === editCode)
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
            console.log(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Файлыг татаж чадсангүй.' })
        })
    }

    const handleSubmit = () => {
        console.log(getLoggedUserToken())
        console.log(form)
        axios.post('evidences', form, {
            headers: { 'Authorization': getLoggedUserToken() },
        }).then(res => {
            console.log(res.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт файлуудыг амжилттай хадгаллаа.' })
        }).catch(err => {
            console.log(err.response?.data)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Хавсралт файлуудыг хадгалж чадсангүй.' })
        })
    }

    const projectId = useParams().id

    useEffect(() => {
        if (projectId) {
            axios.get(`evidences/${projectId}`, {
                headers: { 'Authorization': getLoggedUserToken() },
            }).then(res => {
                console.log(res.data)
                setForm(res.data.data)
            }).catch(err => {
                console.log(err.response?.data)
            })
        } else {
            axios.get('evidences', {
                headers: { 'Authorization': getLoggedUserToken() },
            }).then(res => {
                console.log(res.data)
                setForm(res.data.data)
            }).catch(err => {
                console.log(err.response?.data)
            })
        }
    }, [])

    return (
        <div className="tw-relative tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-bg-white tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-p-2">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">2</span>
                <span className="tw-text-lg">
                    - Нотлох бичиг баримтууд
                </span>
                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="/.../" position="bottom" />
            </div>

            <input className="tw-invisible tw-absolute" type="file" onChange={handleFileInput} ref={inputRef} />

            <ol className="tw-list-decimal tw-list-inside tw-m-2 tw-rounded-sm tw-shadow-md tw-divide-y tw-divide-dashed">
                {form.map(item =>
                    <li className="tw-p-2 tw-pl-4 tw-font-medium odd:tw-bg-gray-50" key={item.code}>
                        <span className="tw-text-sm">{item.description}</span>

                        <div className="tw-flex tw-flex-wrap tw-mt-1">
                            {item.files?.map((file, j) =>
                                <FileCard name={file.name} type={file.mimetype} size={file.size} removeFile={() => handleRemoveFile(item.code, j)} classAppend="tw-my-1 tw-mx-1.5" uploading={file === 'loading' && true} downloadFile={() => handleDownloadFile(item.code, j)} key={file.id} />
                            )}

                            <FileCardAdd classAppend="tw-my-1 tw-mx-1.5" onClick={() => handleButtonClick(item.code)} />
                        </div>
                    </li>
                )}
            </ol>

            {(projectId === undefined || null) &&
                <div className="tw-flex tw-items-center tw-justify-end tw-pt-6 tw-pb-4 tw-px-2">
                    <button className="tw-bg-blue-800 tw-text-white tw-font-medium tw-text-15px tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-700 tw-transition-colors" onClick={handleSubmit}>
                        Хадгалах
                </button>
                </div>
            }
        </div>
    )
}