import React, { useContext, useState } from 'react'
import ButtonTooltip from 'components/buttonTooltip/buttonTooltip'
import HelpPopup from 'components/helpModal/helpPopup'
import FormInline from 'components/urgudul_components/formInline'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'


const initialState = [
    {
        compnay_name: '',
        representative_position: '',
        representative_name: '',
        representative_signature: '',
        date: '',
    },
]

function UrgudulNoticeCluster() {
    const [form, setForm] = useState(initialState)

    const handleInput = (e) => {
        const newForm = form
        newForm[e.target.id][e.target.name] = e.target.value
        setForm([...newForm])
    }

    const handleAdd = () => {
        setForm([...form, { ...initialState[0] }])
    }

    const handleRemove = (index) => {
        setForm(form.filter((_, i) => i !== index))
    }

    const UrgudulCtx = useContext(UrgudulContext)

    const handleSubmit = () => {
        axios.put(`projects/${UrgudulCtx.data.id}`, form)
            .then(res => {
                console.log(res.data)
                UrgudulCtx.setData(res.data.data)
            })
            .catch(err => {
                console.log(err.response?.data)
            })
    }

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">D</span>
                - Мэдэгдэл

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерын өргөдлийн хувьд дараах зүйлсийг мэдэгдэж байна." position="bottom" />
            </div>

            <div className="tw-px-2 tw-py-1 tw-text-sm">
                Өргөдөл гаргагч болон хамтран хүсэлт гаргаж буй хамтрагч нар дараах зүйлсийг мэдэгдэж байна:
            </div>

            <ul className="tw-list-disc tw-pl-8 tw-py-1 tw-pr-2 tw-text-sm">
                <li>
                    Өргөдөл гаргагч нь шалгуур үзүүлэлтийг бүрэн хангасан бөгөөд хориотой зардал, хориотой үйл ажиллагааны чиглэлийг энэхүү санхүүжилтийн төсөлд хамруулаагүй.
                </li>
                <li className="tw-py-2">
                    Өргөдөл гаргагч нь кластерын бүтцэд орсон гишүүн байгууллагуудтай дараах чиглэлээр нягт мэдээлэл, хамтын ажиллагаатай ажиллана:
                    <ul className="tw-list-disc tw-pl-4">
                        <li>
                            Бүх гишүүд энэхүү өргөдлийн маягтад буй мэдээлэлтэй танилцсан бөгөөд өөр өөрсдийн үүргийг ойлгож байгаа.
                        </li>
                        <li>
                            Өргөдөл гаргагч нь кластерын бусад гишүүдтэй уг төслийн хэрэгжилтийн талаар тогтмол мэдээлэлтэй хамтарч ажиллана.
                        </li>
                        <li>
                            Бүх гишүүд өргөдөл гаргагч аж ахуйн нэгжээс Экспортыг дэмжих төсөлд илгээгдэж буй тайлан мэдээлэлтэй танилцсан байна.
                        </li>
                        <li>
                            Экспортыг дэмжих төсөлд илгээгдэх төслийн өөрчлөлтүүд нь илгээгдэхээс өмнө кластерын гишүүн байгууллага хооронд зөвшилцөж, шийдэлд хүрсэн санал байна.
                        </li>
                    </ul>
                </li>
                <li>
                    Өргөдөл гаргагч нь кластерын бусад гишүүдтэй уг төслийн бэлтгэл, удирдлагын хувьд шууд хариуцлага хүлээх бөгөөд зуучлагчийн байр суурьтай оролцохгүй.
                </li>
                <li>
                    Өргөдөл гаргагч нь Байгаль орчны шалгуур, өргөдөл гаргагчийн шалгуур, зардлын шалгуурыг бүрэн хангаж тэнцсэн бөгөөд аль нэг гишүүн нь уг шалгуурыг хангаагүй тохиолдолд уг санхүүжилтийн хүсэлт нь бүрэн татгалзах үндэслэл болно.
                </li>
                <li>
                    Өргөдөл гаргагч нь санал болгосон үйл ажиллагааны төлөвлөгөөг хэрэгжүүлэхэд санхүүгийн хувьд болон үйл ажиллагааны хувьд хүчин чадалтай бөгөөд үүнийгээ нотлон харуулна.
                </li>
                <li>
                    Кластерын гишүүд нь өргөдөл гаргагчид Экспортыг дэмжих төслөөс олгогдох Үр дүнтэй түншлэлийн санхүүжилтийн гэрээнд гарын үсэг зурах бүрэн эрхийг олгосон.
                </li>
                <li>
                    Кластерын гишүүд нь энэхүү төслийн үйл ажиллагааны төлөвлөгөөнөөс бий болох үр шимийг хамтран эзэмших, төслийг хэрэгжүүлэхэд шаардлагатай удирдлага, санхүүжилтийн зардлыг хамтран гаргахаар тохиролцсон.
                </li>
            </ul>

            <div className="tw-px-2 tw-py-1 tw-text-sm">
                Энэхүү өргөдлийн маягтанд орсон бүхий л мэдээллийг үнэн зөвөөр мэдээллэсэн бөгөөд санаатай болон санаандгүйгээр мэдээллийг хооронд нь зөрүүлэх, мэдээллийг нотлох баримт нь мэдээллээс зөрөх, нотлох баримтгүй байх нь уг санхүүжилтийг олгохоос татгалзах, цаашид өргөдөл хүлээн авахгүй хүртэл шийдвэр гаргах шалтгаан болохыг бүрэн ойлгож, гарын үсэг зурсан:
            </div>

            <div>
                {
                    form.map((item, i) =>
                        <div className="tw-flex even:tw-bg-gray-50" key={i}>
                            <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                                <FormInline label="ААН нэр:" type="text" value={item.compnay_name} name="compnay_name" id={i} onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                                <FormInline label="Албан тушаал:" type="text" value={item.representative_position} name="representative_position" id={i} onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                                <FormInline label="Овог, нэр:" type="text" value={item.representative_name} name="representative_name" id={i} onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                                <FormInline label="Гарын үсэг:" type="text" value={item.representative_signature} name="representative_signature" id={i} onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                                <FormInline label="Огноо:" type="date" value={item.date} name="date" id={i} onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classLabel={i % 2 === 0 && 'tw-bg-gray-50'} classInput="tw-w-40" />
                            </div>

                            <div className="tw-flex tw-items-center">
                                <ButtonTooltip tooltip="Устгах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classAppend="tw-text-red-500 active:tw-text-red-600" />
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="tw-flex tw-justify-end tw-items-center tw-py-1">
                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                    {form.length}ш кластерын байгууллага нэмсэн байна.
                </div>

                <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-text-green-500 active:tw-text-green-600 tw-mr-2" />
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4 tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulNoticeCluster
