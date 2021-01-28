import React, { useContext, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import FormRichText from 'components/urgudul_components/formRichText'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PenSVG from 'assets/svgComponents/penSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import HelpPopup from 'components/help_popup/helpPopup'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'


const initialState = [
    {
        activity: '',
        budget_cost: '',
        edp_funding: '',
        applicant_contribution: '',
    },
]

function UrgudulActivities() {
    const [form, setForm] = useState(initialState)

    const handleInput = (e) => {
        const newForm = form
        newForm[e.target.id][e.target.name] = e.target.value
        setForm([...newForm])
    }

    const handleInputFormat = (values, key, index) => {
        const newForm = form
        newForm[index][key] = values.value
        setForm([...newForm])
    }

    const handleSetForm = (name, value, index) => {
        const newForm = form
        newForm[index][name] = value
        setForm([...newForm])
    }

    const handleAdd = () => {
        setForm([...form, { ...initialState[0] }])
    }

    const handleRemove = (index) => {
        setForm(form.filter((_, i) => i !== index))
    }

    const net = form.map(item => + item.budget_cost).reduce((a, b) => a + b, 0)
    const edp = form.map(item => + item.edp_funding).reduce((a, b) => a + b, 0)
    const self = form.map(item => + item.applicant_contribution).reduce((a, b) => a + b, 0)
    const selfPerc = (self / net) * 100

    const UrgudulCtx = useContext(UrgudulContext)

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        if (UrgudulCtx.data.id) {
            axios.put(`projects/${UrgudulCtx.data.id}`, { activities: form })
                .then(res => {
                    console.log(res.data)
                    UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Үйл ажиллагааны талаарх мэдээлэл хадгалагдлаа.' })
                })
                .catch(err => {
                    console.log(err.response?.data)
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                })
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
            setTimeout(() => history.push('/urgudul/1'), 3000)
        }
    }

    return (
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">B6</span>
                {
                    'cluster_' ? '- Кластераар хийх үйл ажиллагаа' : '- Аж ахуйн нэгжээр хийх үйл ажиллагаа'
                }

                {
                    'cluster_' ?
                        <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерт нийтэд нь нөлөөлөх үйл ажиллагаа, үр өгөөжийн талаар бичнэ үү. (Хэрэв хэд хэдэн үйл ажиллагаа байгаа бол шинээр мөр нэмж бичнэ үү.)" position="bottom" />
                        :
                        <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Аж ахуйн нэгжийн хийг гүйцэтгэх үйл ажиллагааг бичнэ үү. (Хэрэв хэд хэдэн үйл ажиллагаа байгаа бол шинээр мөр нэмж бичнэ үү.)" position="bottom" />
                }
            </div>

            {
                form.map((item, i) =>
                    <div className="tw-flex odd:tw-bg-gray-50" key={i}>
                        <div className="tw-flex-grow">
                            <div className="tw-border tw-border-dashed">
                                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                                    <PenSVG className="tw-w-6 tw-h-6 tw-text-gray-600" />
                                    <span className="tw-ml-2 tw-text-sm tw-font-medium">
                                        {`Үйл ажиллагаа ${i + 1}:`}
                                    </span>
                                </div>

                                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                                    <FormRichText modules="small" value={item.activity} name="activity" id={i} setForm={handleSetForm} />
                                </div>
                            </div>

                            <div className="tw-p-2 tw-pl-4 tw-border tw-border-dashed tw-flex">
                                <span className="tw-text-sm tw-font-medium">
                                    Үйл ажиллагааны төсөөлж буй төсөв:
                                </span>

                                <HelpPopup classAppend="tw-ml-auto sm:tw-ml-12" main="Нийт дүнг тооцохдоо бодит өртөгөөс 20 хувиас дээш хэлбэлзэлтэй байж болохгүй тул бодитоор өртөгөөр тооцоолно уу." position="bottom" />
                            </div>

                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                                <FormInline label="Үйл ажиллагааны төсөвт зардал, доллароор" type="numberFormat" formats={{ thousandSeparator: true, prefix: '$ ' }} value={item.budget_cost} name="budget_cost" id={i} onChange={handleInputFormat} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-32" />

                                <FormInline label="ЭДТ-өөс санхүүжүүлэгдэх нь, доллараар" type="numberFormat" formats={{ thousandSeparator: true, prefix: '$ ' }} value={item.edp_funding} name="edp_funding" id={i} onChange={handleInputFormat} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-32" />

                                <div className="tw-border tw-border-dashed tw-w-full tw-max-w-lg tw-flex">
                                    <FormInline label="Өргөдөл гаргагчийн оролцоо (бэлэн мөнгө)" type="numberFormat" formats={{ thousandSeparator: true, prefix: '$ ' }} value={item.applicant_contribution} name="applicant_contribution" id={i} onChange={handleInputFormat} classAppend="tw-flex-grow" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-32" />

                                    <div className="tw-relative tw-w-2">
                                        <HelpPopup classAppend="tw-right-5 tw-top-1" main="/.../" position="top-left" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tw-flex tw-items-center">
                            <ButtonTooltip tooltip="Устгах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                        </div>
                    </div>
                )
            }

            <div className="tw-flex tw-justify-end tw-items-center tw-py-1">
                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                    {form.length}ш үйл ажиллагаа нэмсэн байна.
                </div>

                <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2" classButton="tw-text-green-500 active:tw-text-green-600" />
            </div>

            <div className="tw-w-full tw-pl-2">
                <div className="tw-p-0.5 tw-text-sm">
                    Нийт үйл ажиллагааны төсөвт зардал:
                    <span className="tw-ml-2 tw-text-base tw-font-medium">${net}</span>
                </div>

                <div className="tw-p-0.5 tw-text-sm">
                    Үүнээс ЭДТ-өөс санхүүжүүлэгдэх нь:
                    <span className="tw-ml-2 tw-text-base tw-font-medium">${edp}</span>
                </div>

                <div className="tw-p-0.5 tw-text-sm">
                    Өргөдөл гаргагч талаас санхүүжүүлэгдэх нь:
                    <span className="tw-ml-2 tw-text-base tw-font-medium">${self}</span>
                </div>

                <div className="tw-p-0.5">
                    <span className="tw-text-sm">
                        Өргөдөл гаргагчийн оролцоо нийт төслийн зардалд эзлэх хувиар (C/A %):

                        <span className="tw-ml-2 tw-text-base tw-font-medium">{!isNaN(selfPerc) && `${+ selfPerc.toFixed(2)}%`}</span>
                        {
                            !(selfPerc >= 0 && selfPerc <= 100) && !isNaN(selfPerc) &&
                            <HelpPopup classAppend="tw-ml-4 tw-inline-flex tw-top-1.5" buttonClass="tw-text-red-400 active:tw-text-red-600" main="Тоцоолол алдаатай байна. Өргөгдөл гаргагчийн оролцооны нийт эзлэх хувь нь 0-ээс бага эсвэл 100-аас их байх боломжгүй." position="top-left" />
                        }
                    </span>
                </div>
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4" classButton="tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulActivities
