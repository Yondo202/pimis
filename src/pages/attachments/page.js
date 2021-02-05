import React, { useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import PaperClipSVG from 'assets/svgComponents/paperClipSVG'
import CloseSVG from 'assets/svgComponents/closeSVG'
import FileCard from './fileCard'


const listItems = [
    {
        title: 'Экспорт хөгжлийн төлөвлөгөө.',
        key: 'edp_plan',
    },
    {
        title: 'Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, Байгаль орчны удирдлагын төлөвлөгөө.',
        key: 'env_assest',
    },
    {
        title: 'Хуулийн этгээдийн улсын бүртгэлийн гэрчилгээний хуулбар.',
        key: 'state_reg',
    },
    {
        title: 'Өмнөх 2 жилийн санхүүгийн тайлан.',
        key: 'financial_report',
    },
    {
        title: 'Холбогдох дүүргийн татварын албанаас 12 сараас дээш хугацааны татварын өргүйг нотолсон тодорхойлолт, баримт.',
        key: 'tax_debt',
    },
    {
        title: 'Холбогдох нийгмийн даатгалын газраас 12 сараас дээш хугацааны өргүйг нотолсон тодорхойлолт, баримт, нийгмийн даатгал төлдөг ажилчдын тооны мэдээлэл.',
        key: 'social_insurance',
    },
    {
        title: 'Монгол банкны зээлийн мэдээллийн сангаас муу ангиллын зээлгүйг нотолсон тодорхойлолт, баримт.',
        key: 'bank_loan',
    },
    {
        title: 'Хуулийн этгээдийн эцсийн өмчлөгчдийг тодорхойлох баримт.',
        key: 'legal_owner',
    },
    {
        title: 'Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, ур чадварыг илэрхийлэх намтар. (Дор хаяж 3 албан тушаалтны мэдээлэл)',
        key: 'employee_bios',
    },
    {
        title: 'Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо.',
        key: 'int_property',
    },
    {
        title: 'Санхүүжилтийг бүрэн хийх боломжтойг нотолсон баримт бичиг, банкны хуулга гм.',
        key: 'financial_capacity',
    },
    {
        title: 'Бусад шаардлагатай баримт бичиг.',
        key: 'others',
    },
]

export default function AttachmentUploads() {
    const [files, setFiles] = useState({})

    const [edit, setEditKey] = useState()

    const inputRef = useRef()

    const handleButtonClick = (key) => {
        setEditKey(key)
        inputRef.current.click()
    }

    const handleFileInput = (e) => {
        const newArr = []
        Array.from(e.target.files).forEach(file => {
            newArr.push(file)
        })
        const prevFiles = files[edit] || []
        setFiles({ ...files, [edit]: [...prevFiles, ...newArr] })
    }

    const handleRemoveFile = (key, index) => {
        setFiles({ ...files, [key]: files[key].filter((_, i) => i !== index) })
    }

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append(files)

        axios.post('', formData, {
            hearder: {
                'Authorization': getLoggedUserToken(),
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err.response?.data)
        })
    }

    return (
        <div className="tw-relative tw-text-gray-700">
            <input className="tw-invisible tw-absolute" type="file" multiple="multiple" onChange={handleFileInput} ref={inputRef} />

            <ol className="tw-list-decimal tw-list-inside tw-m-4 tw-mb-6 tw-shadow-md">

                {
                    listItems.map((list, i) =>
                        <li className="tw-p-2 tw-pl-4 tw-font-medium odd:tw-bg-gray-50">
                            <span className="tw-text-sm">{list.title}</span>

                            <button className="tw-ml-4 tw-py-1 tw-px-2 tw-bg-blue-500 tw-text-white tw-text-sm tw-font-medium tw-rounded-lg focus:tw-outline-none hover:tw-shadow-md active:tw-bg-blue-600 tw-inline-flex tw-items-center" onClick={() => handleButtonClick(list.key)}>
                                Файл оруулах
                                <PaperClipSVG className="tw-w-4 tw-h-4 tw-ml-1" />
                            </button>

                            <div className="tw-flex tw-flex-wrap tw-mt-1">
                                {
                                    files[list.key]?.map((file, j) =>
                                        <FileCard name={file.name} type={file.type.split('/')[1]} size={file.size} removeFile={() => handleRemoveFile(list.key, j)} />
                                    )
                                }
                            </div>
                        </li>
                    )
                }
            </ol>
        </div>
    )
}