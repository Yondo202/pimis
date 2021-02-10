import React, { useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import PaperClipSVG from 'assets/svgComponents/paperClipSVG'
import FileCard from './fileCard'
import PlusSVG from 'assets/svgComponents/plusSVG'


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
            header: {
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
            <input className="tw-invisible tw-absolute" type="file" onChange={handleFileInput} ref={inputRef} />

            <ol className="tw-list-decimal tw-list-inside tw-m-4 tw-mb-6 tw-shadow-md">

                {
                    listItems.map((list, i) =>
                        <li className="tw-p-2 tw-pl-4 tw-font-medium odd:tw-bg-gray-50">
                            <span className="tw-text-sm">{list.title}</span>

                            <button className="tw-ml-4 tw-py-0.5 tw-px-1.5 tw-text-sm tw-border tw-border-gray-600 tw-font-medium tw-rounded-lg focus:tw-outline-none hover:tw-shadow-md active:tw-text-blue-500 active:tw-border-blue-500 tw-inline-flex tw-items-center" onClick={() => handleButtonClick(list.key)}>
                                <span className="tw-text-gray-700">Файл оруулах</span>
                                <PaperClipSVG className="tw-w-4 tw-h-4 tw-ml-1" />
                            </button>

                            <div className="tw-flex tw-flex-wrap tw-mt-1">
                                {
                                    files[list.key]?.map((file, j) =>
                                        <FileCard name={file.name} type={file.type.split('/')[1]} size={file.size} removeFile={() => handleRemoveFile(list.key, j)} classAppend="tw-my-1 tw-mx-1.5" />
                                    )
                                }

                                <button className="tw-inline-flex tw-bg-indigo-300 tw-rounded-lg tw-my-1 tw-mx-1.5 focus:tw-outline-none" onClick={() => handleButtonClick(list.key)}>
                                    <div className="tw-relative">
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

                                        <span className="tw-absolute tw-top-1/2 tw-transform tw--translate-y-1/2 tw-left-1/2 tw--translate-x-1/2">
                                            <PlusSVG className="tw-w-8 tw-h-8 tw-text-white" />
                                        </span>
                                    </div>

                                    <div className="tw-p-2 tw-text-xs tw-font-medium tw-w-20 tw-h-20 tw-leading-tight tw-inline-flex tw-justify-center tw-items-center tw-text-white">
                                        Файл нэмж оруулах
                                    </div>
                                </button>
                            </div>
                        </li>
                    )
                }
            </ol>
        </div>
    )
}