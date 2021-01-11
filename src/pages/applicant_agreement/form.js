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
        <div className="w-full max-w-5xl mx-auto py-20 flex flex-col text-gray-700">
            <h3 className="text-gray-600 font-semibold ml-4 mb-4">
                4. Өргөдөл гаргагчийн мэдэгдэл
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto text-sm">
                    <div className="flex items-center justify-between rounded-t-lg bg-gray-100">
                        <p className="p-4 font-medium">Дээрх 3-р хэсэгт тайлбарласан үйл ажиллагааг Түншлэлийн хөтөлбөрөөр зөвшөөрсөн тохиолдолд төлөвлөж буй үйл ажиллагааныхаа төлбөрийг төлөх санхүүжилт байгаа бөгөөд бүрэн хэрэгжүүлэхээр төлөвлөж байна.</p>
                        <input className="m-4" type="checkbox" checked={data.implementation} name="implementation" onChange={handleInputCheckbox} />
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="p-4 font-medium">Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг авснаас хойш доод тал нь 5 жилийн хугацааны туршид борлуулалтын орлогын дэлгэрэнгүй мэдээлэл ирүүлэх, түүнчлэн санхүүгийн тухайн жилийн экспортын тоо хэмжээ, үнийн дүнгийн мэдээлэл бүхий албан бичгийг Гаалийн Ерөнхий газраас авч ирүүлэхийг зөвшөөрч байна.</p>
                        <input className="m-4" type="checkbox" checked={data.documentation} name="documentation" onChange={handleInputCheckbox} />
                    </div>
                    <div className="flex items-center justify-between flex-wrap bg-gray-100">
                        <p className="p-4 flex-grow font-medium">Охин компани биш <ArrowSVG className="w-4 h-4 inline transform rotate-90 -translate-y-1 animate-pulse" /></p>
                        <input className="m-4" type="checkbox" checked={data.not_subsidiary} name="not_subsidiary" onChange={handleInputCheckbox} />

                        <div className={`w-full p-2 pl-6 border-b bg-white transition-all duration-300 ${data.not_subsidiary ? 'h-60 opacity-100' : 'h-0 opacity-0'}`}>
                            <div className="mb-4 font-medium">
                                Дараах компанийн нэгдэл болсон
                            <input className="bg-transparent w-4/6 max-w-xs outline-none border border-gray-300 rounded-md py-2 px-1 mx-1 focus:border-blue-600 transition duration-300" type="text" value={data.head_company} name="head_company" onChange={handleInput} />
                            толгой компанид харьяалагддаг болохыг баталж байна. Толгой компанийн хараат болон охин компаниуд:
                        </div>

                            <ol className="list-decimal pl-8">
                                <li><input className="max-w-xs w-4/6 ml-2 mb-2 bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 focus:border-blue-600 transition duration-300" type="text" value={data.subsidiaries && data.subsidiaries.id1} name="id1" onChange={handleInputSubidiary} /></li>
                                <li><input className="max-w-xs w-4/6 ml-2 mb-2 bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 focus:border-blue-600 transition duration-300" type="text" value={data.subsidiaries && data.subsidiaries.id2} name="id2" onChange={handleInputSubidiary} /></li>
                                <li><input className="max-w-xs w-4/6 ml-2 mb-2 bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 focus:border-blue-600 transition duration-300" type="text" value={data.subsidiaries && data.subsidiaries.id3} name="id3" onChange={handleInputSubidiary} /></li>
                            </ol>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="p-4 font-medium">Би/бид өөрт байгаа бүх мэдээлэл, мэдлэгийн хүрээнд энэхүү өргөдөлд үнэн, зөв мэдээллийг тусгасан бөгөөд буруу, худал мэдээлэл өгсөн тохиолдолд санхүүгийн дэмжлэг авах шийдвэрт нөлөөлнө гэдгийг хүлээн зөвшөөрч байна.</p>
                        <input className="m-4" type="checkbox" checked={data.transparency} name="transparency" onChange={handleInputCheckbox} />
                    </div>

                    <div className="flex items-center justify-between rounded-b-lg bg-gray-100">
                        <p className="p-4 font-medium">Би/бид худал мэдээлэл өгсөн тохиолдолд санхүүгийн дэмжлэг олгохгүй байх шийдвэрт хүргэнэ гэдгийг ойлгож байна.</p>
                        <input className="m-4" type="checkbox" checked={data.decision} name="decision" onChange={handleInputCheckbox} />
                    </div>
                </div>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto text-sm flex flex-wrap">
                    <div className="flex items-center w-full h-12 bg-gray-100">
                        <p className="font-semibold ml-4">Дээрх мэдээллийг уншиж, ойлгосон гэдгийг баталгаажуулан энэхүү өргөдөлд гарын үсэг зурж огноог бичнэ үү.</p>
                    </div>

                    <div className="inline-flex flex-col w-full">
                        <div />

                        <FormSmall label="Нэр:" type="text" value={data.name} name="name" onChange={handleInput} instruction="Өргөдөл гаргагчийг төлөөлөх эрх бүхий хүний нэрийг бичнэ үү." />

                        <FormSmall label="Огноо:" type="date" value={data.date} name="date" onChange={handleInput} />
                    </div>

                    <div className="inline-flex flex-col w-full p-4">
                        <label className="font-medium mb-4">Гарын үсэг:</label>

                        <SignaturePad canvasProps={{ className: 'flex-grow-0 mx-auto mb-4 border border-gray-300 rounded-lg shadow-md hover:border-blue-600 w-80 h-36' }} ref={sigCanvas} onEnd={handleInputSignature} />

                        <button className="flex-grow-0 mx-auto font-medium border border-gray-300 py-2 px-4 rounded-full focus:outline-none inline-flex items-center hover:border-gray-600 hover:shadow-md active:bg-gray-600 active:text-white" onClick={clearCanvas}>
                            Дахин зурах
                            <PenSVG className="w-4 h-4 ml-2 animate-pulse" />
                        </button>
                    </div>
                </div>
            </form>

            <button className="rounded-full py-2 px-6 self-end mr-12 inline-flex items-center font-medium text-white bg-blue-600 focus:outline-none active:bg-blue-700 hover:shadow-lg" onClick={submitData}>
                Илгээх
                <MailSVG className="w-5 h-5 ml-2 animate-pulse" />
            </button>
        </div>
    )
}

export default ApplicantAgreement
