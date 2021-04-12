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
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import { Transition } from 'react-spring/renderprops'
import QuestionMarkSVG from 'assets/svgComponents/questionMarkSVG'


const initialState = {
    company_logo: null,
    company_name: null,
    company_address: null,
    company_phone: null,
    company_fax: null,
    company_email: null,
    company_register: null,
    submit_date: null,
    snumber: null,
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

export default function LetterOfInterest() {
    const [form, setForm] = useState(initialState)

    const handleInput = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }))
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
        allValid = allValid && Object.keys(initialState).every(key => !checkInvalid(form[key], key === 'letter' && 'quill'))

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
                    setForm({ ...form, ...res.data.data })
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

    const locationTextareaRef = useRef()

    const [helpOpen, setHelpOpen] = useState(false)

    const helperRef = useRef(null)
    const helpButtonRef = useRef(null)

    const handleClickOutside = (e) => {
        if (!helperRef.current?.contains(e.target) && !helpButtonRef.current?.contains(e.target)) {
            setHelpOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
        <div className="tw-text-gray-700 tw-text-sm">
            <div className="">
                <button className="tw-mt-4 tw-ml-4 tw-mb-10 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-pl-5 tw-pr-6 tw-text-15px tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors" onClick={() => setPreviewModal(true)}>
                    <SearchSVG className="tw-w-4 tw-h-4" />
                    <span className="tw-text-sm tw-ml-2">Урьдчилж харах</span>
                </button>
            </div>

            <PreviewModal previewModal={previewModal} setPreviewModal={setPreviewModal} form={form} />

            <Transition
                items={helpOpen}
                from={{ transform: 'translateX(384px)', opacity: 0.4 }}
                enter={{ transform: 'translateX(0)', opacity: 1 }}
                leave={{ transform: 'translateX(384px)', opacity: 0.4 }}>
                {item => item && (anims =>
                    <div className="tw-fixed tw-right-0 tw-top-20 tw-z-20 tw-bg-indigo-500 tw-text-white tw-ml-8 tw-w-full md:tw-w-96 tw-rounded-lg tw-p-2" style={anims} ref={helperRef}>
                        <div className="tw-mx-2 tw-text-13px tw-leading-snug">
                            Сонирхол албан тоот бичих зөвлөмж. Албан тоотдоо дараах зүйлсийг тусган бичнэ үү.
                        </div>

                        <ul className="tw-text-13px tw-list-disc tw-list-outside tw-leading-snug tw-mt-2 tw-ml-5">
                            {Object.keys(helperTexts).map(key =>
                                <li className="tw-mt-1">
                                    {helperTexts[key].title} - {helperTexts[key].text}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </Transition>

            <div className="letter-container" style={{ border: '1px solid rgba(0,0,0,0.3)', padding: '12px', boxSizing: 'content-box' }}>
                <div className="tw-grid tw-grid-cols-2 tw-grid-rows-1 tw-mt-20 tw-mx-24 tw-text-13px tw-text-blue-600">
                    <div className="tw-relative tw-grid tw-grid-cols-1 tw-mr-8">
                        {form.company_logo ?
                            <div className="tw-w-w-full tw-h-36 tw-justify-self-center">
                                <img src={form.company_logo} alt="Байгууллагын лого" className="tw-w-full tw-h-full tw-object-scale-down tw-shadow-md tw-cursor-pointer" onClick={() => inputRefLogo.current.click()} />
                                <button className="tw-absolute tw-top-0 tw-right-0 tw-text-red-500 active:tw-text-red-600 focus:tw-outline-none">
                                    <CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" onClick={() => handleInput('company_logo', null)} />
                                </button>
                            </div>
                            :
                            <button className={`tw-w-full tw-h-36 tw-justify-self-center tw-shadow-md tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-blue-400 tw-text-sm focus:tw-outline-none active:tw-text-blue-300 tw-transition-colors ${validate && checkInvalid(form.company_logo) && 'tw-border tw-border-red-500 tw-border-dashed'}`} onClick={() => inputRefLogo.current.click()}>
                                <UploadSVG className="tw-w-8 tw-h-8" />
                                <span className="tw-font-medium tw-mt-1">Лого</span>
                            </button>
                        }
                        <input type="file" className="tw-invisible tw-absolute tw-h-0" onChange={handleUploadLogo} ref={inputRefLogo} />

                        <input className={`tw-mt-1 tw-px-0.5 tw-text-center tw-text-sm tw-shadow-inner tw-rounded focus:tw-outline-none tw-uppercase tw-leading-tight ${validate && checkInvalid(form.company_name) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} type="text" value={form.company_name || ''} onChange={e => handleInput('company_name', e.target.value)} placeholder="ААН албан ёсны нэр" />

                        <textarea className={`tw-px-0.5 tw-shadow-inner tw-rounded focus:tw-outline-none tw-leading-tight tw-text-center tw-overflow-y-hidden tw-resize-y ${validate && checkInvalid(form.company_address) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} style={{ minHeight: 32, height: locationTextareaRef.current?.scrollHeight }} value={form.company_address || ''} onChange={e => handleInput('company_address', e.target.value)} placeholder="ААН хаяг бүтнээр" ref={locationTextareaRef} />

                        <div className="tw-mt-1 tw-flex tw-justify-center">
                            <div className="tw-flex tw-items-center tw-mr-2 tw-leading-tight ">
                                <span className="tw-mr-1">
                                    Утас:
                                </span>
                                <input className={`tw-px-0.5 tw-shadow-inner focus:tw-outline-none tw-rounded tw-w-20 ${validate && checkInvalid(form.company_phone) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} type="text" value={form.company_phone || ''} onChange={e => handleInput('company_phone', e.target.value)} />
                            </div>

                            <div className="tw-flex tw-items-center tw-leading-tight">
                                <span className="tw-mr-1">
                                    Факс:
                                </span>
                                <input className={`tw-px-0.5 tw-shadow-inner focus:tw-outline-none tw-rounded tw-w-20 ${validate && checkInvalid(form.company_fax) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} type="text" value={form.company_fax || ''} onChange={e => handleInput('company_fax', e.target.value)} />
                            </div>
                        </div>

                        <div className="tw-mt-0.5 tw-flex tw-justify-center tw-items-center tw-leading-tight">
                            <span className="tw-mr-1">
                                Имэйл:
                            </span>
                            <input className={`tw-px-0.5 tw-shadow-inner focus:tw-outline-none tw-rounded ${validate && checkInvalid(form.company_email) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} type="text" value={form.company_email || ''} onChange={e => handleInput('company_email', e.target.value)} />
                        </div>

                        <div className="tw-mt-0.5 tw-flex tw-justify-center tw-items-center tw-leading-tight">
                            <span className="tw-mr-1">
                                УБД:
                            </span>
                            <input className={`tw-px-0.5 tw-shadow-inner focus:tw-outline-none tw-rounded ${validate && checkInvalid(form.company_register) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} type="text" value={form.company_register || ''} onChange={e => handleInput('company_register', e.target.value)} />
                        </div>

                        <div className="tw-mt-0.5 tw-flex tw-justify-center tw-items-center tw-leading-tight">
                            <input className={`tw-px-0.5 tw-shadow-inner focus:tw-outline-none tw-rounded ${validate && checkInvalid(form.submit_date) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} style={{ width: 124 }} type="date" value={form.submit_date || ''} onChange={e => handleInput('submit_date', e.target.value)} />

                            <span className="tw-ml-2">
                                №:
                            </span>
                            <input className={`tw-px-0.5 tw-ml-1 tw-shadow-inner focus:tw-outline-none tw-rounded tw-w-24 ${validate && checkInvalid(form.snumber) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} type="text" value={form.snumber || ''} onChange={e => handleInput('snumber', e.target.value)} />
                        </div>
                    </div>

                    <div className="tw-uppercase tw-text-center tw-text-2xl tw-px-8 tw-pt-8 tw-ml-8 tw-text-blue-500">
                        "Экспортыг дэмжих төсөл"-д
                    </div>
                </div>

                <div className="tw-text-xl tw-mt-8 tw-flex tw-items-center" style={{ marginLeft: '18%' }}>
                    Төсөлд хамрагдах тухай
                    <button className="tw-ml-auto tw-mr-16 focus:tw-outline-none tw-text-indigo-500 active:tw-text-indigo-700" onClick={() => setHelpOpen(true)} ref={helpButtonRef}>
                        <QuestionMarkSVG className="tw-w-6 tw-h-6 tw-transition-colors" />
                    </button>
                </div>

                <div className={`tw-mx-16 tw-p-1 tw-flex tw-rounded ${validate && checkInvalid(form.letter, 'quill') && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} style={{ height: 690 }}>
                    <ReactQuill theme="snow" modules={modules} tabIndex={0} value={form.letter} onChange={content => handleInput('letter', content)} placeholder={"Сонирхол илэрхийлэх албан тоотоо энд бичнэ үү."} />
                </div>

                <div className="tw-relative tw-h-40 tw-mt-10 tw-mx-24">
                    <div className="tw-absolute tw-top-8 tw-left-2">
                        Хүндэтгэсэн:
                    </div>

                    <div className="tw-absolute tw-top-10 tw-left-1/2 tw-transform-gpu tw--translate-x-1/2 tw-w-full tw-flex tw-justify-center tw-items-center tw-z-10">
                        <input className={`tw-py-1 tw-px-0.5 tw-uppercase tw-shadow-inner focus:tw-outline-none tw-rounded ${validate && checkInvalid(form.director_position) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} type="text" value={form.director_position || ''} onChange={e => handleInput('director_position', e.target.value)} placeholder="Албан тушаал" />

                        <div className="tw-flex tw-items-start tw-ml-2">
                            <SignaturePad canvasProps={{ className: `tw-shadow-inner tw-bg-blue-100 tw-bg-opacity-50 tw-rounded ${validate && checkInvalid(form.director_signature) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`, width: 260, height: 90 }} ref={sigCanvasRef} onEnd={handleDrawSignature} />

                            <ButtonTooltip tooltip="Арилгах" beforeSVG={<CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" />} onClick={handleClearSignature} classAppend="tw-w-px" classButton="tw-text-red-500 active:tw-text-red-600" />
                        </div>

                        <input className={`tw-ml-2 tw-py-1 tw-px-0.5 tw-uppercase tw-shadow-inner focus:tw-outline-none tw-rounded ${validate && checkInvalid(form.director_name) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} type="text" value={form.director_name || ''} onChange={e => handleInput('director_name', e.target.value)} placeholder="Овог нэр" />
                    </div>

                    {form.company_stamp ?
                        <div className="tw-w-44 tw-h-44 tw-absolute tw-top-2 tw-left-1/2 tw-transform-gpu tw--translate-x-1/2 tw--z-10">
                            <img src={form.company_stamp} alt="Байгууллагын тамга тэмдэг" className="tw-w-full tw-h-full tw-object-scale-down tw-shadow-md tw-cursor-pointer" onClick={() => inputRefStamp.current.click()} />
                            <button className="tw-absolute tw-top-0 tw-right-0 tw-text-red-500 active:tw-text-red-600 focus:tw-outline-none">
                                <CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" onClick={() => handleInput('company_stamp', null)} />
                            </button>
                        </div>
                        :
                        <button className={`tw-w-44 tw-h-44 tw-shadow-md tw-absolute tw-top-2 tw-left-1/2 tw-transform-gpu tw--translate-x-1/2 tw--z-10 tw-flex tw-flex-col tw-justify-end tw-items-center tw-text-blue-400 focus:tw-outline-none active:tw-text-blue-300 tw-transition-colors ${validate && checkInvalid(form.company_stamp) && 'tw-border tw-border-red-500 tw-border-dashed'} tw-transition-colors`} onClick={() => inputRefStamp.current.click()}>
                            <UploadSVG className="tw-w-7 tw-h-7" />
                            <span className="tw-font-medium tw-mb-1 tw-text-13px">Тамга</span>
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