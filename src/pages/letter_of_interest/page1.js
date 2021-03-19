import AlertContext from 'components/utilities/alertContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import { useParams } from 'react-router'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import SignaturePad from 'react-signature-canvas'
import CloseSVG from 'assets/svgComponents/closeSVG'
import UploadSVG from 'assets/svgComponents/uploadSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import PreviewModal from './previewModal'
import ReactQuill from 'react-quill'
import './style.css'
import { useReactToPrint } from 'react-to-print'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'


const initialState = {
    company_logo: null,
    company_name: null,
    company_address: null,
    company_phone: null,
    company_fax: null,
    company_email: null,
    company_register: null,
    submit_date: null,
    number: null,
    letter: null,
    director_position: null,
    director_name: null,
    director_signature: null,
    company_stamp: null,
}

const modules = {
    toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        ['link'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean'],
    ]
}

const helperTexts = {
    basicInfo: {
        title: 'Сонирхол илэрхийлэх нь',
        text: 'Төсөлд хамрагдах хүсэлтээ илэрхийлэн бичнэ үү.',
    },
    projectInfo: {
        title: 'Товч мэдээлэл',
        text: 'Кластер болон аж ахуйн нэгжийн альнаар нь хандаж буй талаарх мэдээлэл. Ямар шалтгаанаар, ямар хугацаанд хэрэгжүүлэх, ямар үнийн дүн бүхий хүсэлтийг гаргаж байгаа талаарх мэдээллээ бичнэ үү.',
    },
    criteria: {
        title: 'Шалгуур хангалт',
        text: 'Төслийн хувьд төслөөс шаардагдаж буй бүхий л шалгууруудыг хангаж буй бөгөөд ямар нэгэн сонирхлын зөрчилгүй талаарх мэдээллээ бичнэ үү.',
    },
    purchases: {
        title: 'Худалдан авалт',
        text: 'Уг төслийг хэрэгжүүлэхэд хамтран ажиллах туслан гүйцэтгэгч ханган нийлүүлэгч, зөвлөхүүд, үйлдвэрлэгчид, үйлчилгээ үзүүлэгчдийг сонгохдоо зах зээлийн өрсөлдөөнд суурилсан, чанартай, чадвар бүхий туслан гүйцэтгэгчийг хуулийн хүрээнд бусад хэн нэгнээс хараат бусаар үнэн зөвөөр сонгон шалгаруулах бөгөөд хэн нэгнийг хууран мэхлэх, үйлдэл гаргахгүй талаарх мэдэгдлээ бичнэ үү.',
    },
    antiCorruption: {
        title: 'Авилгалын эсрэг',
        text: 'Өргөдөл гаргагч нь уг төсөлд хамрагдахад хэн нэгэнд авилгалын шинж чанартай үйлдэл гаргаагүй бөгөөд цаашид гаргахгүй талаар баталж, Дэлхийн банкны авилгалтай тэмцэх гарын авлагатай танилцаж, төслийг хэрэгжүүлэх үйл ажиллагаанд мөрдлөг болгон ажиллахаа баталсан мэдээллээ бичнэ үү.',
    },
}

export default function LetterOfInterest1() {
    const [form, setForm] = useState(initialState)

    const handleInput = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    const inputRefLogo = useRef(null)
    const inputRefStamp = useRef(null)

    const handleUploadLogo = (e) => {
        e.preventDefault()

        const reader = new FileReader()
        const file = e.target.files[0]
        reader.onloadend = () => {
            handleInput('company_logo', reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleUploadStamp = (e) => {
        e.preventDefault()

        const reader = new FileReader()
        const file = e.target.files[0]
        reader.onloadend = () => {
            handleInput('company_stamp', reader.result)
        }
        reader.readAsDataURL(file)
    }

    const sigCanvasRef = useRef()

    const handleDrawSignature = () => {
        handleInput('director_signature', sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png'))
    }

    const handleClearSignature = () => {
        sigCanvasRef.current.clear()
        handleInput('director_signature', null)
    }

    const AlertCtx = useContext(AlertContext)

    const handleSubmit = () => {
        setValidate(true)
        let allValid = true
        allValid = allValid && Object.keys(initialState).every(key => !checkInvalid(form[key]))

        if (allValid) {
            if (form.id) {
                axios.put(`letter-of-interests/${form.id}`, { ...form }, {
                    headers: {
                        'Authorization': getLoggedUserToken(),
                    },
                }).then(res => {
                    console.log(res.data)
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонирхол илэрхийлэх албан тоот хадгалагдлаа.' })
                }).catch(err => {
                    console.log(err.response?.data)
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Хадгалж чадсангүй.' })
                })
            } else {
                axios.post('letter-of-interests', form, {
                    headers: {
                        'Authorization': getLoggedUserToken(),
                    },
                }).then(res => {
                    console.log(res.data)
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонирхол илэрхийлэх албан тоот хадгалагдлаа.' })
                }).catch(err => {
                    console.log(err.response?.data)
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Хадгалж чадсангүй.' })
                })
            }
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Аль нэг талбар бөглөгдөөгүй байна. Та гүйцэт бөглөнө үү.' })
        }
    }

    const projectId = useParams().id

    useEffect(() => {
        if (projectId !== undefined && projectId !== null) {
            axios.get(`letter-of-interests/${projectId}`, {
                headers: {
                    'Authorization': getLoggedUserToken(),
                },
            }).then(res => {
                console.log(res.data)
                setForm({ ...form, ...res.data.data })
            }).catch(err => {
                console.log(err.response?.data)
            })
        } else {
            axios.get('letter-of-interests', {
                headers: {
                    'Authorization': getLoggedUserToken(),
                },
            }).then(res => {
                console.log(res.data)
                setForm({ ...form, ...res.data.data })
            }).catch(err => {
                console.log(err.response?.data)
            })
        }
    }, [])

    const emptyDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

    useEffect(() => {
        sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png') === emptyDataURL && sigCanvasRef.current.fromDataURL(form.director_signature)
    }, [form.director_signature])

    const [previewModal, setPreviewModal] = useState(false)

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

    const componentRef = useRef(null)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <div className="tw-text-gray-700 tw-text-sm">
            <div className="">
                <button className="tw-mt-4 tw-ml-4 tw-mb-10 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-pl-5 tw-pr-6 tw-text-15px tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors" onClick={() => setPreviewModal(true)}>
                    <SearchSVG className="tw-w-4 tw-h-4" />
                    <span className="tw-text-sm tw-ml-2">Урьдчилж харах</span>
                </button>

                <button onClick={handlePrint}>
                    Print
                </button>
            </div>

            <PreviewModal previewModal={previewModal} setPreviewModal={setPreviewModal} form={form} />

            <div className="letter-container" ref={componentRef}>
                <div className="tw-grid tw-grid-cols-2 tw-grid-rows-1 tw-mt-20 tw-mx-32">
                    <div className="tw-relative tw-grid tw-grid-cols-1 tw-gap-y-1.5">
                        {form.company_logo ?
                            <div className="tw-w-36 tw-h-36 tw-justify-self-center">
                                <img src={form.company_logo} alt="Байгууллагын лого" className="tw-w-full tw-h-full tw-object-scale-down tw-shadow-md tw-cursor-pointer" onClick={() => inputRefLogo.current.click()} />
                                <button className="tw-absolute tw-top-0 tw-right-0 tw-text-red-500 active:tw-text-red-600 focus:tw-outline-none">
                                    <CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" onClick={() => handleInput('company_logo', null)} />
                                </button>
                            </div>
                            :
                            <button className={`tw-w-36 tw-h-36 tw-justify-self-center tw-shadow-md tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-blue-400 tw-text-sm focus:tw-outline-none active:tw-text-blue-300 tw-transition-colors ${validate && checkInvalid(form.company_logo) && 'tw-border tw-border-red-500 tw-border-dashed'}`} onClick={() => inputRefLogo.current.click()}>
                                <UploadSVG className="tw-w-8 tw-h-8" />
                                <span className="tw-font-medium tw-mt-1">Лого</span>
                            </button>
                        }
                        <input type="file" className="tw-invisible tw-absolute tw-h-0" onChange={handleUploadLogo} ref={inputRefLogo} />

                        <input className="tw-mt-3 tw-py-0.5 tw-px-2 tw-text-center tw-text-base tw-shadow-inner tw-rounded focus:tw-outline-none" type="text" value={form.company_name} onChange={e => handleInput('company_name', e.target.value)} placeholder="ААН албан ёсны нэр" />

                        <textarea className="tw-py-0.5 tw-px-2 tw-resize-none tw-shadow-inner tw-rounded focus:tw-outline-none" rows="3" value={form.company_address} onChange={e => handleInput('company_address', e.target.value)} placeholder="ААН хаяг бүтнээр" />

                        <div className="tw-flex tw-justify-center">
                            <div className="tw-flex mr-4">
                                <span className="tw-mr-2">
                                    Утас:
                                </span>
                                <input className="tw-py-0.5 tw-px-2 tw-shadow-inner focus:tw-outline-none tw-rounded tw-w-28" type="text" value={form.company_phone} onChange={e => handleInput('company_phone', e.target.value)} />
                            </div>

                            <div className="tw-flex">
                                <span className="tw-mr-2">
                                    Факс:
                                </span>
                                <input className="tw-py-0.5 tw-px-2 tw-shadow-inner focus:tw-outline-none tw-rounded tw-w-28" type="text" value={form.company_fax} onChange={e => handleInput('company_fax', e.target.value)} />
                            </div>
                        </div>

                        <div className="tw-flex tw-justify-center">
                            <span className="tw-mr-2">
                                Имэйл:
                            </span>
                            <input className="tw-py-0.5 tw-px-2 tw-shadow-inner focus:tw-outline-none tw-rounded" type="text" value={form.company_email} onChange={e => handleInput('company_email', e.target.value)} />
                        </div>

                        <div className="tw-flex tw-justify-center">
                            <span className="tw-mr-2">
                                УБД:
                            </span>
                            <input className="tw-py-0.5 tw-px-2 tw-shadow-inner focus:tw-outline-none tw-rounded" type="text" value={form.company_register} onChange={e => handleInput('company_register', e.target.value)} />
                        </div>

                        <div className="tw-flex tw-justify-center">
                            <input className="tw-py-0.5 tw-px-2 tw-shadow-inner focus:tw-outline-none tw-rounded tw-w-40" type="date" value={form.submit_date} onChange={e => handleInput('submit_date', e.target.value)} />

                            <span className="tw-ml-4">
                                №:
                            </span>
                            <input className="tw-py-0.5 tw-px-2 tw-ml-2 tw-shadow-inner focus:tw-outline-none tw-rounded tw-w-32" type="text" value={form.number} onChange={e => handleInput('number', e.target.value)} />
                        </div>
                    </div>

                    <div className="tw-uppercase tw-text-center tw-text-xl tw-px-10 tw-pt-10">
                        "Экспортыг дэмжих төсөл"-д
                    </div>
                </div>

                <div className="tw-text-xl tw-mt-14" style={{ marginLeft: '18%' }}>
                    Төсөлд хамрагдах тухай
                </div>

                <div className={`tw-mt-4 tw-mx-16 tw-p-1 tw-flex tw-rounded ${validate && checkInvalid(form.letter, 'quill') && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} style={{ height: 600 }}>
                    <ReactQuill theme="snow" modules={modules} tabIndex={0} value={form.letter} onChange={content => handleInput('letter', content)} placeholder={"Сонирхол илэрхийлэх албан тоотоо энд бичнэ үү."} />
                </div>

                <div className="tw-relative tw-h-40 tw-mt-6 tw-mx-24">
                    <div className="tw-absolute tw-top-10 tw-left-2">
                        Хүндэтгэсэн:
                    </div>

                    <div className="tw-absolute tw-top-10 tw-left-1/2 tw-transform-gpu tw--translate-x-1/2 tw-flex tw-items-center tw-z-10">
                        <input className="tw-py-1 tw-px-2 tw-uppercase tw-shadow-inner focus:tw-outline-none tw-rounded" type="text" value={form.director_position} onChange={e => handleInput('director_position', e.target.value)} placeholder="Албан тушаал" />

                        <div className="tw-flex tw-items-start tw-ml-2">
                            <SignaturePad canvasProps={{ className: `tw-shadow-inner ${validate && checkInvalid(form.director_signature) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`, width: 260, height: 80 }} ref={sigCanvasRef} onEnd={handleDrawSignature} />

                            <ButtonTooltip tooltip="Арилгах" beforeSVG={<CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" />} onClick={handleClearSignature} classAppend="" classButton="tw-text-red-500 active:tw-text-red-600" />
                        </div>

                        <input className="tw-ml-2 tw-py-1 tw-px-2 tw-uppercase tw-shadow-inner focus:tw-outline-none tw-rounded" type="text" value={form.director_name} onChange={e => handleInput('director_name', e.target.value)} placeholder="Албан тушаал" />
                    </div>

                    {form.company_stamp ?
                        <div className="tw-w-40 tw-h-40 tw-absolute tw-top-2 tw-left-1/2 tw-transform-gpu tw--translate-x-1/2 tw--z-10">
                            <img src={form.company_stamp} alt="Байгууллагын тамга тэмдэг" className="tw-w-full tw-h-full tw-object-scale-down tw-shadow-md tw-cursor-pointer" onClick={() => inputRefStamp.current.click()} />
                            <button className="tw-absolute tw-top-0 tw-right-0 tw-text-red-500 active:tw-text-red-600 focus:tw-outline-none">
                                <CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" onClick={() => handleInput('company_stamp', null)} />
                            </button>
                        </div>
                        :
                        <button className={`tw-w-40 tw-h-40 tw-shadow-md tw-absolute tw-top-2 tw-left-1/2 tw-transform-gpu tw--translate-x-1/2 tw--z-10 tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-blue-400 focus:tw-outline-none active:tw-text-blue-300 tw-transition-colors ${validate && checkInvalid(form.company_stamp) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} onClick={() => inputRefStamp.current.click()}>
                            <UploadSVG className="tw-w-8 tw-h-8" />
                            <span className="tw-font-medium tw-mt-1">Тамга</span>
                        </button>
                    }
                    <input type="file" name="" id="" className="tw-invisible tw-absolute tw-h-0" onChange={handleUploadStamp} ref={inputRefStamp} />
                </div>
            </div>

            <div className="tw-flex tw-justify-center">
                <button className="tw-mt-12 tw-mb-16 tw-bg-blue-800 tw-text-white tw-text-15px tw-rounded tw-py-2 tw-px-8 tw-font-medium hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors" onClick={handleSubmit}>
                    Хадгалах
                </button>
            </div>
        </div>
    )
}