import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import './style.css'
import SignaturePad from 'react-signature-canvas'
import UploadSVG from 'assets/svgComponents/uploadSVG'
import CloseSVG from 'assets/svgComponents/closeSVG'
import axios from 'axiosbase'
import AlertContext from 'components/utilities/alertContext'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { animated, useTransition } from 'react-spring'
import { useParams } from 'react-router-dom'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import PreviewModal from './previewModal'
import SearchSVG from 'assets/svgComponents/searchSVG'


const initialState = {
    company_name: null,
    company_address: null,
    basic_info: null,
    project_info: null,
    criteria: null,
    purchases: null,
    anti_corruption: null,
    director_name: null,
    director_signature: null,
    company_logo: null,
    company_stamp: null,
    submit_date: null,
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

function LetterOfInterest() {
    const [form, setForm] = useState(initialState)

    const handleInput = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    const inputRefLogo = useRef()
    const inputRefStamp = useRef()

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
    }

    const projectId = useParams().id

    useEffect(() => {
        if (projectId !== undefined || null) {
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

    const [helper, setHelper] = useState({
        open: false,
        display: '',
    })

    const transitionsHelper = useTransition(helper.open, null, {
        from: { right: -320 },
        enter: { right: -300 },
        leave: { right: -320 },
    })

    const [previewModal, setPreviewModal] = useState(false)

    return (
        <div className="tw-relative tw-pt-20 tw-pb-32 tw-text-gray-700">
            <button className="tw-absolute tw-top-4 tw-right-4 tw-flex tw-items-center tw-bg-blue-500 tw-text-white tw-py-1 tw-pl-2 tw-pr-3 tw-rounded-md hover:tw-shadow-md active:tw-bg-blue-600 focus:tw-outline-none" onClick={() => setPreviewModal(true)}>
                <SearchSVG className="tw-w-4 tw-h-4" />
                <span className="tw-text-sm tw-ml-1">Урьдчилж харах</span>
            </button>

            <PreviewModal previewModal={previewModal} setPreviewModal={setPreviewModal} form={form} />

            {transitionsHelper.map(({ item, key, props }) =>
                item &&
                <animated.div key={key} style={props} className="tw-fixed tw-w-80 tw-bg-indigo-500 tw-italic tw-text-transparent tw-z-10 tw-py-4 tw-pl-4 tw-pr-6 tw-rounded-l-lg tw-transform hover:tw--translate-x-72 hover:tw-text-white tw-transition tw-duration-300">
                    <div className="tw-text-center tw-font-medium tw-mb-2 tw-text-sm">
                        {helperTexts[helper.display].title}
                    </div>

                    <span className="tw-text-sm">
                        {helperTexts[helper.display].text}
                    </span>
                </animated.div>
            )}

            <div className="letter-container" style={{ border: '1px solid rgba(0,0,0,0.3)', padding: '12px', boxSizing: 'content-box' }}>
                <div className="tw-relative tw-mt-14 tw-p-4 tw-pl-20 tw-flex">
                    {form.company_logo ?
                        <div className="tw-relative tw-w-44 tw-h-44 tw-flex-shrink-0">
                            <img src={form.company_logo} alt="Байгууллагын лого" className="tw-w-full tw-h-full tw-object-scale-down tw-shadow-md tw-cursor-pointer" onClick={() => inputRefLogo.current.click()} />
                            <button className="tw-absolute tw-top-0 tw-right-0 tw-text-red-500 active:tw-text-red-600 focus:tw-outline-none">
                                <CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" onClick={() => handleInput('company_logo', null)} />
                            </button>
                        </div>
                        :
                        <div className="tw-w-44 tw-h-44 tw-shadow-md tw-flex tw-justify-center tw-items-center tw-flex-shrink-0" onClick={() => inputRefLogo.current.click()}>
                            <UploadSVG className="tw-w-8 tw-h-8 tw-text-blue-400" />
                        </div>
                    }
                    <input type="file" className="tw-invisible tw-absolute tw-h-0" onChange={handleUploadLogo} ref={inputRefLogo} />

                    <div className="tw-relative tw-flex-grow tw-p-2 tw-pl-8">
                        <input className="tw-bg-transparent focus:tw-outline-none tw-shadow-md tw-px-1 tw-text-gray-600 tw-text-2xl tw-font-semibold tw-w-full" type="text" value={form.company_name || ''} onChange={e => handleInput('company_name', e.target.value)} placeholder="ААН албан ёсны нэр" />

                        <input className="tw-bg-transparent focus:tw-outline-none tw-mt-4 tw-shadow-md tw-px-1 tw-w-full tw-text-sm tw-font-medium" type="text" value={form.company_address || ''} onChange={e => handleInput('company_address', e.target.value)} placeholder="ААН хаяг бүтнээр" />

                        <input className="tw-bg-transparent focus:tw-outline-none tw-mt-4 tw-shadow-md tw-px-1 tw-text-sm tw-font-medium" type="date" value={form.submit_date || ''} onChange={e => handleInput('submit_date', e.target.value)} />
                    </div>
                </div>

                <div className="tw-relative tw-flex tw-justify-center tw-mt-2">
                    <span className="tw-text-lg tw-font-medium tw-uppercase tw-w-80 tw-text-center">
                        Экспортыг дэмжих төсөлд илгээх нь
                    </span>
                    <img src="/edp_logo.png" className="tw-absolute tw--top-2 tw-right-28" alt="epd logo" />
                </div>

                <div className="tw-mt-6">
                    <div className="tw-py-2 tw-px-6 tw-flex" style={{ height: '100px' }}>
                        <ReactQuill theme="snow" modules={modules} tabIndex={0} value={form.basic_info} onChange={content => handleInput('basic_info', content)} placeholder={helperTexts.basicInfo.text} onFocus={() => setHelper({ open: true, display: 'basicInfo' })} onBlur={() => setHelper({ ...helper, open: false })} />
                    </div>

                    <div className="tw-py-2 tw-px-6 tw-flex" style={{ height: '100px' }}>
                        <ReactQuill theme="snow" modules={modules} tabIndex={0} value={form.project_info} onChange={content => handleInput('project_info', content)} placeholder={helperTexts.projectInfo.text} onFocus={() => setHelper({ open: true, display: 'projectInfo' })} onBlur={() => setHelper({ ...helper, open: false })} />
                    </div>

                    <div className="tw-py-2 tw-px-6 tw-flex" style={{ height: '100px' }}>
                        <ReactQuill theme="snow" modules={modules} tabIndex={0} value={form.criteria} onChange={content => handleInput('criteria', content)} placeholder={helperTexts.criteria.text} onFocus={() => setHelper({ open: true, display: 'criteria' })} onBlur={() => setHelper({ ...helper, open: false })} />
                    </div>

                    <div className="tw-py-2 tw-px-6 tw-flex" style={{ height: '124px' }}>
                        <ReactQuill theme="snow" modules={modules} tabIndex={0} value={form.purchases} onChange={content => handleInput('purchases', content)} placeholder={helperTexts.purchases.text} onFocus={() => setHelper({ open: true, display: 'purchases' })} onBlur={() => setHelper({ ...helper, open: false })} />
                    </div>

                    <div className="tw-py-2 tw-px-6 tw-flex" style={{ height: '108px' }}>
                        <ReactQuill theme="snow" modules={modules} tabIndex={0} value={form.anti_corruption} onChange={content => handleInput('anti_corruption', content)} placeholder={helperTexts.antiCorruption.text} onFocus={() => setHelper({ open: true, display: 'antiCorruption' })} onBlur={() => setHelper({ ...helper, open: false })} />
                    </div>
                </div>

                <div className="tw-relative tw-mt-8 tw-py-4 tw-text-sm tw-pr-60">
                    <div className="tw-flex tw-justify-center">
                        <span className="tw-font-medium">Гүйцэтгэх захирал:</span>
                        <input className="tw-bg-transparent focus:tw-outline-none tw-shadow-md tw-px-1 tw-ml-2 tw-w-60" type="text" value={form.director_name || ''} onChange={e => handleInput('director_name', e.target.value)} placeholder="Овог нэр" />
                    </div>

                    <div className="tw-flex tw-justify-center tw-items-end tw-mt-2">
                        <span className="tw-font-medium tw-ml-16 tw-mb-0.5">Гарын үсэг:</span>

                        <SignaturePad canvasProps={{ className: 'tw-shadow-md tw-ml-4 tw-border-b tw-border-gray-600', width: 240, height: 80 }} ref={sigCanvasRef} onEnd={handleDrawSignature} />

                        <ButtonTooltip tooltip="Арилгах" beforeSVG={<CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" />} onClick={handleClearSignature} classAppend="tw-self-center tw-mx-2" classButton="tw-text-red-500 active:tw-text-red-600" />
                    </div>

                    {form.company_stamp ?
                        <div className="tw-w-32 tw-h-32 tw-absolute tw-top-2 tw-right-28">
                            <img src={form.company_stamp} alt="Байгууллагын тамга тэмдэг" className="tw-w-full tw-h-full tw-object-scale-down tw-shadow-md tw-cursor-pointer" onClick={() => inputRefStamp.current.click()} />
                            <button className="tw-absolute tw-top-0 tw-right-0 tw-text-red-500 active:tw-text-red-600 focus:tw-outline-none">
                                <CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" onClick={() => handleInput('company_stamp', null)} />
                            </button>
                        </div>
                        :
                        <div className="tw-w-32 tw-h-32 tw-shadow-md tw-absolute tw-top-2 tw-right-32 tw-flex tw-justify-center tw-items-center" onClick={() => inputRefStamp.current.click()}>
                            <UploadSVG className="tw-w-8 tw-h-8 tw-text-blue-400" />
                        </div>
                    }
                    <input type="file" name="" id="" className="tw-invisible tw-absolute tw-h-0" onChange={handleUploadStamp} ref={inputRefStamp} />
                </div>
            </div>

            <button className="tw-absolute tw-bottom-12 tw-left-1/2 tw-transform tw--translate-x-1/2 tw-bg-blue-500 tw-text-white tw-text-xl tw-rounded-md tw-py-1 tw-px-3 tw-font-medium hover:tw-shadow-md active:tw-bg-blue-600 focus:tw-outline-none tw-flex tw-items-center" onClick={handleSubmit}>
                Хадгалах
                <UploadSVG className="tw-w-6 tw-h-6 tw-text-white tw-ml-2" />
            </button>
        </div>
    )
}

export default LetterOfInterest
