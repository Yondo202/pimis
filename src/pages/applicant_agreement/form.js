import React, { useContext, useRef, useState } from 'react'
import ArrowSVG from 'assets/svgComponents/arrowSVG'
import PenSVG from 'assets/svgComponents/penSVG'
import MailSVG from 'assets/svgComponents/mailSVG'
import FormSmall from 'components/form_small/formSmall'
import UrgudulContext from 'components/utilities/urgudulContext'
import SignaturePad from 'react-signature-canvas'
import axios from 'axios'


function ApplicantAgreement() {
    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData

    const [changed, setChanged] = useState(false)

    const sigCanvas = useRef()

    const clearCanvas = () => {
        sigCanvas.current.clear()
        setData({ ...data, signature: '' })
    }

    const handleInputSignature = () => {
        setData({ ...data, signature: sigCanvas.current.getTrimmedCanvas().toDataURL('image/png') })
        setChanged(true)
    }

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setChanged(true)
    }

    const handleInputCheckbox = (e) => {
        setData({ ...data, [e.target.name]: e.target.checked })
        setChanged(true)
    }

    const handleInputSubidiary = (e) => {
        setData({ ...data, subsidiaries: { ...data.subsidiaries, [e.target.name]: e.target.value } })
        setChanged(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const submitData = () => {
        // if (data.implementation && data.documentation && data.not_subsidiary && data.transparency && data.decision && data.head_company !== '' && data.name !== '' & data.date !== '' && data.signature !== '') {
        if (changed) {
            const body = {
                implementation: data.implementation,
                documentation: data.documentation,
                not_subsidiary: data.not_subsidiary,
                head_company: data.head_company,
                subsidiaries: data.subsidiaries,
                transparency: data.transparency,
                decision: data.decision,
                name: data.name,
                date: data.date,
                signature: data.signature,
            }

            axios.put(`http://192.168.88.78:3000/api/applications/${data.id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        } else {

        }
        //     alert('Өргөдлийг илгээлээ.')
        // } else { alert('Талбаруудыг гүйцэт бөгнө үү.') }
    }

    return (
        <div className="tw-w-full tw-max-w-5xl tw-mx-auto tw-py-20 tw-flex tw-flex-col tw-text-gray-700">
            <h3 className="tw-text-gray-600 tw-font-semibold tw-ml-4 tw-mb-4">
                4. Өргөдөл гаргагчийн мэдэгдэл
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-text-sm">
                    <div className="tw-flex tw-items-center tw-justify-between tw-rounded-t-lg tw-bg-gray-100">
                        <p className="tw-p-4 tw-font-medium">Дээрх 3-р хэсэгт тайлбарласан үйл ажиллагааг Түншлэлийн хөтөлбөрөөр зөвшөөрсөн тохиолдолд төлөвлөж буй үйл ажиллагааныхаа төлбөрийг төлөх санхүүжилт байгаа бөгөөд бүрэн хэрэгжүүлэхээр төлөвлөж байна.</p>
                        <input className="tw-m-4" type="checkbox" checked={data.implementation} name="implementation" onChange={handleInputCheckbox} />
                    </div>
                    <div className="tw-flex tw-items-center tw-justify-between">
                        <p className="tw-p-4 tw-font-medium">Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг авснаас хойш доод тал нь 5 жилийн хугацааны туршид борлуулалтын орлогын дэлгэрэнгүй мэдээлэл ирүүлэх, түүнчлэн санхүүгийн тухайн жилийн экспортын тоо хэмжээ, үнийн дүнгийн мэдээлэл бүхий албан бичгийг Гаалийн Ерөнхий газраас авч ирүүлэхийг зөвшөөрч байна.</p>
                        <input className="tw-m-4" type="checkbox" checked={data.documentation} name="documentation" onChange={handleInputCheckbox} />
                    </div>
                    <div className="tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-bg-gray-100">
                        <p className="tw-p-4 tw-flex-grow tw-font-medium">
                            Охин компани биш
                            <ArrowSVG className="tw-w-4 tw-h-4 tw-inline tw-transform tw-rotate-90 tw--translate-y-1 tw-animate-pulse" />
                        </p>
                        <input className="tw-m-4" type="checkbox" checked={data.not_subsidiary} name="not_subsidiary" onChange={handleInputCheckbox} />

                        <div className={`tw-w-full tw-p-2 tw-pl-6 tw-border-b tw-bg-white tw-transition-all tw-duration-300 ${data.not_subsidiary ? 'tw-h-60 tw-opacity-100' : 'tw-h-0 tw-opacity-0'}`}>
                            <div className="tw-mb-4 tw-font-medium">
                                Дараах компанийн нэгдэл болсон
                            <input className="tw-bg-transparent tw-w-4/6 tw-max-w-xs tw-outline-none tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-1 tw-mx-1 focus:tw-border-blue-600 tw-transition tw-duration-300" type="text" value={data.head_company} name="head_company" onChange={handleInput} />
                            толгой компанид харьяалагддаг болохыг баталж байна. Толгой компанийн хараат болон охин компаниуд:
                        </div>

                            <ol className="tw-list-decimal tw-pl-8">
                                <li><input className="tw-max-w-xs tw-w-4/6 tw-ml-2 tw-mb-2 tw-bg-transparent tw-outline-none tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 focus:tw-border-blue-600 tw-transition tw-duration-300" type="text" value={data.subsidiaries && data.subsidiaries.id1} name="id1" onChange={handleInputSubidiary} /></li>
                                <li><input className="tw-max-w-xs tw-w-4/6 tw-ml-2 tw-mb-2 tw-bg-transparent tw-outline-none tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 focus:tw-border-blue-600 tw-transition tw-duration-300" type="text" value={data.subsidiaries && data.subsidiaries.id2} name="id2" onChange={handleInputSubidiary} /></li>
                                <li><input className="tw-max-w-xs tw-w-4/6 tw-ml-2 tw-mb-2 tw-bg-transparent tw-outline-none tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 focus:tw-border-blue-600 tw-transition tw-duration-300" type="text" value={data.subsidiaries && data.subsidiaries.id3} name="id3" onChange={handleInputSubidiary} /></li>
                            </ol>
                        </div>
                    </div>

                    <div className="tw-flex tw-items-center tw-justify-between">
                        <p className="tw-p-4 tw-font-medium">Би/бид өөрт байгаа бүх мэдээлэл, мэдлэгийн хүрээнд энэхүү өргөдөлд үнэн, зөв мэдээллийг тусгасан бөгөөд буруу, худал мэдээлэл өгсөн тохиолдолд санхүүгийн дэмжлэг авах шийдвэрт нөлөөлнө гэдгийг хүлээн зөвшөөрч байна.</p>
                        <input className="tw-m-4" type="checkbox" checked={data.transparency} name="transparency" onChange={handleInputCheckbox} />
                    </div>

                    <div className="tw-flex tw-items-center tw-justify-between tw-rounded-b-lg tw-bg-gray-100">
                        <p className="tw-p-4 tw-font-medium">Би/бид худал мэдээлэл өгсөн тохиолдолд санхүүгийн дэмжлэг олгохгүй байх шийдвэрт хүргэнэ гэдгийг ойлгож байна.</p>
                        <input className="tw-m-4" type="checkbox" checked={data.decision} name="decision" onChange={handleInputCheckbox} />
                    </div>
                </div>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-text-sm tw-flex tw-flex-wrap">
                    <div className="tw-flex tw-items-center tw-w-full tw-h-12 tw-bg-gray-100">
                        <p className="tw-font-semibold tw-ml-4">Дээрх мэдээллийг уншиж, ойлгосон гэдгийг баталгаажуулан энэхүү өргөдөлд гарын үсэг зурж огноог бичнэ үү.</p>
                    </div>

                    <div className="tw-inline-flex tw-flex-col tw-w-full">
                        <div />

                        <FormSmall label="Нэр:" type="text" value={data.name} name="name" onChange={handleInput} instruction="Өргөдөл гаргагчийг төлөөлөх эрх бүхий хүний нэрийг бичнэ үү." />

                        <FormSmall label="Огноо:" type="date" value={data.date} name="date" onChange={handleInput} />
                    </div>

                    <div className="tw-inline-flex tw-flex-col tw-w-full tw-p-4">
                        <label className="tw-font-medium tw-mb-4">Гарын үсэг:</label>

                        <SignaturePad canvasProps={{ className: 'tw-flex-grow-0 tw-mx-auto tw-mb-4 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-md hover:tw-border-blue-600 tw-w-80 tw-h-36' }} ref={sigCanvas} onEnd={handleInputSignature} />

                        <button className="tw-flex-grow-0 tw-mx-auto tw-font-medium tw-border tw-border-gray-300 tw-py-2 tw-px-4 tw-rounded-full focus:tw-outline-none tw-inline-flex tw-items-center hover:tw-border-gray-600 hover:tw-shadow-md active:tw-bg-gray-600 active:tw-text-white" onClick={clearCanvas}>
                            Дахин зурах
                            <PenSVG className="tw-w-4 tw-h-4 tw-ml-2 tw-animate-pulse" />
                        </button>
                    </div>
                </div>
            </form>

            <button className="tw-rounded-full tw-py-2 tw-px-6 tw-self-end tw-mr-12 tw-inline-flex tw-items-center tw-font-medium tw-text-white tw-bg-blue-600 focus:tw-outline-none active:tw-bg-blue-700 hover:tw-shadow-lg" onClick={submitData}>
                Илгээх
                <MailSVG className="tw-w-5 tw-h-5 tw-ml-2 tw-animate-pulse" />
            </button>
        </div>
    )
}

export default ApplicantAgreement
