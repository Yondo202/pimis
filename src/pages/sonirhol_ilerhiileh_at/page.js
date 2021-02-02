import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import FormSignature from 'components/urgudul_components/formSignature'
import './style.css'
import SignaturePad from 'react-signature-canvas'
import TrashSVG from 'assets/svgComponents/trashSVG'


const dateNow = new Date().toLocaleDateString()

function LetterOfInterest() {
    const [logoURL, setLogoURL] = useState()

    const [stampURL, setStampURL] = useState()

    const inputRefLogo = useRef()
    const inputRefStamp = useRef()

    const handleUploadLogo = (e) => {
        e.preventDefault()

        const reader = new FileReader()
        const file = e.target.files[0]
        reader.onloadend = () => {
            setLogoURL(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleUploadStamp = (e) => {
        e.preventDefault()

        const reader = new FileReader()
        const file = e.target.files[0]
        reader.onloadend = () => {
            setStampURL(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const sigCanvasRef = useRef()

    const handleDrawSignature = () => {

    }

    const handleClearSignature = () => {

    }

    const SVG = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>

    return (
        <div className="letter-container">
            <div className="tw-relative tw-mt-2 tw-h-0.5 tw-bg-gray-700 tw-rounded-full tw-mx-8">
                <span className="tw-absolute tw-top-0 tw-right-1 tw-text-sm tw-text-gray-700 hover:tw-text-blue-700 tw-transition-colors">
                    <a href="http://www.edp.mn" style={{ textDecoration: 'none' }}>www.edp.mn</a>
                </span>
            </div>

            <div className="tw-mt-12 tw-p-2 tw-text-center tw-w-3/5 tw-mx-auto tw-text-xl tw-font-medium tw-uppercase tw-tracking-wide tw-text-gray-700">
                Экспортыг дэмжих төсөлд илгээж буй сонирхол илэрхийлэх албан тоот
            </div>

            <div className="tw-relative tw-mt-12 tw-h-0.5 tw-bg-gray-700 tw-rounded-full tw-mx-8" />

            <div className="tw-mt-2 tw-flex tw-px-10">
                <div className="tw-relative tw-p-1">
                    <img src={logoURL ? logoURL : SVG} alt="Байгууллагын лого" className="tw-w-32 tw-h-32 tw-object-cover tw-bg-gray-200" onClick={() => inputRefLogo.current.click()} />
                    <input type="file" name="" id="" className="tw-invisible tw-absolute" onChange={handleUploadLogo} ref={inputRefLogo} />
                </div>

                <div className="tw-p-2 tw-pl-5 tw-w-full tw-flex tw-flex-col tw-justify-start tw-text-sm tw-text-gray-700">
                    <input className="tw-bg-transparent focus:tw-outline-none focus:tw-shadow-md tw-px-1" type="text" placeholder="... ААН албан ёсны нэр" />
                    <input className="tw-bg-transparent focus:tw-outline-none tw-mt-2 focus:tw-shadow-md tw-px-1" type="text" placeholder="... ААН хаяг бүтнээр" />

                    <div className="tw-mt-3 tw-h-14">
                        <ReactQuill theme="bubble" bounds={'quill'} tabIndex={0} />
                    </div>
                </div>
            </div>

            <div className="tw-relative tw-mt-4 tw-px-10 tw-flex tw-h-28">
                <div className="tw-w-4/12 tw-p-2 tw-pr-5">
                    <span className="tw-text-gray-700 float-right tw-text-sm tw-font-medium tw-uppercase tw-tracking-wide">
                        Товч мэдээлэл
                    </span>
                </div>

                <div className="tw-flex-grow tw-p-2 tw-pl-4">
                    <ReactQuill theme="bubble" bounds={'quill'} tabIndex={0} placeholder="... Кластер болон аж ахуйн нэгжийн альнаар нь хандаж буй талаарх мэдээлэл, Ямар шалтгаанаар, ямар хугацаанд хэрэгжүүлэх, ямар үнийн дүн бүхий хүсэлтийг гаргаж байгаа талаарх мэдээлэл." />
                </div>
            </div>

            <div className="tw-relative tw-mt-4 tw-px-10 tw-flex tw-h-28">
                <div className="tw-w-4/12 tw-p-2 tw-pr-5">
                    <span className="tw-text-gray-700 float-right tw-text-sm tw-font-medium tw-uppercase tw-tracking-wide">
                        Шалгуур хангалт
                    </span>
                </div>

                <div className="tw-flex-grow tw-p-2 tw-pl-4">
                    <ReactQuill theme="bubble" bounds={'quill'} tabIndex={0} placeholder="... Төслийн хувьд төслөөс шаардагдаж буй бүхий л шалгууруудыг хангаж буй бөгөөд ямар нэгэн сонирхлын зөрчилгүй талаарх мэдээлэл." />
                </div>
            </div>

            <div className="tw-relative tw-mt-4 tw-px-10 tw-flex tw-h-28">
                <div className="tw-w-4/12 tw-p-2 tw-pr-5">
                    <span className="tw-text-gray-700 float-right tw-text-sm tw-font-medium tw-uppercase tw-tracking-wide">
                        Худалдан авалт
                    </span>
                </div>

                <div className="tw-flex-grow tw-p-2 tw-pl-4">
                    <ReactQuill theme="bubble" bounds={'quill'} tabIndex={0} placeholder="... Уг төслийг хэрэгжүүлэхэд хамтран ажиллах туслан гүйцэтгэгч_ ханган нийлүүлэгч, зөвлөхүүд, үйлдвэрлэгчид, үйлчилгээ үзүүлэгчдийг сонгохдоо зах зээлийн өрсөлдөөнд суурилсан, чанартай, чадвар бүхий туслан гүйцэтгэгчийг хуулийн хүрээнд бусад хэн нэгнээс хараат бусаар үнэн зөвөөр сонгон шалгаруулах бөгөөд хэн нэгнийг хууран мэхлэх, үйлдэл гаргахгүй талаарх мэдэгдэл." />
                </div>
            </div>

            <div className="tw-relative tw-mt-4 tw-px-10 tw-flex tw-h-28">
                <div className="tw-w-4/12 tw-p-2 tw-pr-5">
                    <span className="tw-text-gray-700 float-right tw-text-sm tw-font-medium tw-uppercase tw-tracking-wide">
                        Авилгалын эсрэг
                    </span>
                </div>

                <div className="tw-flex-grow tw-p-2 tw-pl-4">
                    <ReactQuill theme="bubble" bounds={'quill'} tabIndex={0} placeholder="... Өргөдөл гаргагч нь уг төсөлд хамрагдахад хэн нэгэнд авилгалын шинж чанартай үйлдэл гаргаагүй бөгөөд цаашид гаргахгүй талаар баталж, Дэлхийн банкны авилгалтай тэмцэх гарын авлагатай танилцаж, төслийг хэрэгжүүлэх үйл ажиллагаанд мөрдлөг болгон ажиллахаа баталсан мэдээлэл." />
                </div>
            </div>

            <div className="divider" />

            <div className="tw-relative tw-mt-8 tw-text-sm tw-h-44 tw-text-gray-700">
                <span className="tw-absolute tw-top-4 tw-left-8 tw-font-medium">Гүйцэтгэх захирал:</span>
                <input className="tw-bg-transparent focus:tw-outline-none tw-absolute tw-top-4 tw-left-40 focus:tw-shadow-md tw-px-1 tw-w-72" type="text" />

                <span className="tw-absolute tw-top-20 tw-left-10 tw-font-medium">Гарын үсэг:</span>
                <SignaturePad canvasProps={{ className: 'tw-bg-gray-200 tw-absolute tw-top-12 tw-left-32', width: 300, height: 90 }} ref={sigCanvasRef} onEnd={handleDrawSignature} />

                <img src={stampURL && stampURL} alt="Байгууллагын тамга тэмдэг" className="tw-w-32 tw-h-32 tw-object-cover tw-bg-gray-200 tw-absolute tw-top-4 tw-right-44" onClick={() => inputRefStamp.current.click()} />
                <input type="file" name="" id="" className="tw-invisible tw-absolute" onChange={handleUploadStamp} ref={inputRefStamp} />
            </div>

            <div className="tw-absolute tw-bottom-8 tw-left-1/2 tw-transform tw--translate-x-1/2 tw-text-lg tw-font-medium tw-tracking-wide">
                {dateNow}
            </div>
        </div>
    )
}

export default LetterOfInterest
