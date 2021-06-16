import React, { useContext, useEffect, useState } from 'react'
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
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'


const initialState = [
    {
        activity: null,
        budget_cost: null,
    },
]

function UrgudulActivities() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.activities && UrgudulCtx.data.activities?.length) {
            setForm(UrgudulCtx.data.activities)
        }
        UrgudulCtx.data.project_type === 1 && setIsCluster(true)
    }, [UrgudulCtx.data.id])

    const handleInputFormat = (values, key, index) => {
        const newForm = form
        newForm[index][key] = values.value
        setForm([...newForm])
    }

    const handleSetForm = (name, value, index) => {
        setForm(prev => {
            const newForm = [...prev]
            newForm[index][name] = value
            return newForm
        })
    }

    const handleAdd = () => {
        const newObj = {
            activity: null,
            budget_cost: null,
        }

        setForm([...form, newObj])
    }

    const handleRemove = (index) => {
        setForm(form.filter((_, i) => i !== index))
    }

    const net = form.map(item => + item.budget_cost).reduce((a, b) => a + b, 0)

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        let allValid = true
        for (const obj of form) {
            allValid = allValid && Object.keys(initialState[0]).every(key => !checkInvalid(obj[key], key === 'activity' && 'quill'))
        }

        if (UrgudulCtx.data.id) {
            if (allValid) {
                if (net / 2 <= 50000) {
                    axios.put(`projects/${UrgudulCtx.data.id}`, { activities: form }, {
                        headers: {
                            'Authorization': getLoggedUserToken()
                        }
                    }).then(res => {
                        UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                        AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Үйл ажиллагааны мэдээллийг хадгаллаа.' })
                        history.push('/urgudul/7')
                    }).catch(err => {
                        AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                    })
                } else {
                    AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Экспортыг дэмжих төслөөс хүссэн санхүүжилт $50,000 -оос хэтэрсэн байна.' })
                }
            } else {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
            }
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
            history.push('/urgudul/1')
        }
    }

    const [validate, setValidate] = useState(false)

    const checkInvalid = (value, type) => {
        switch (value) {
            case null:
                return true
            case '':
                return true
            case '<p><br></p>':
                if (type === 'quill') return true
                else return false
            default:
                return false
        }
    }

    const [isCluster, setIsCluster] = useState(false)

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="">
                <div className="tw-p-3 tw-flex tw-items-center">
                    <span className="tw-pl-2 tw-font-medium tw-text-base tw-text-blue-500">
                        {isCluster ? 'Кластераар хийх үйл ажиллагаа' : '- Аж ахуйн нэгжээр хийх үйл ажиллагаа'}
                    </span>

                    {isCluster ?
                        <HelpPopup classAppend="tw-ml-2 tw-mr-2" main="Кластерт нийтэд нь нөлөөлөх үйл ажиллагаа, үр өгөөжийн талаар бичнэ үү. (Хэрэв хэд хэдэн үйл ажиллагаа байгаа бол шинээр мөр нэмж бичнэ үү.)" position="bottom" />
                        :
                        <HelpPopup classAppend="tw-ml-2 tw-mr-2" main="Аж ахуйн нэгжийн хийг гүйцэтгэх үйл ажиллагааг бичнэ үү. (Хэрэв хэд хэдэн үйл ажиллагаа байгаа бол шинээр мөр нэмж бичнэ үү.)" position="bottom" />
                    }
                </div>

                {UrgudulCtx.data.project_number &&
                    <div className="tw-ml-5 tw-mb-2 tw-text-13px">
                        Өргөдлийн дугаар:
                        <span className="tw-text-blue-500 tw-ml-2 tw-font-medium">{UrgudulCtx.data.project_number}</span>
                    </div>
                }
            </div>

            {form.map((item, i) =>
                <div className="tw-flex odd:tw-bg-gray-50" key={i}>
                    <div className="tw-flex-grow">
                        <div className="tw-flex tw-items-center tw-px-2 tw-mt-2">
                            <span className={`tw-ml-4 tw-text-sm ${validate && checkInvalid(item.activity, 'quill') && 'tw-text-red-500'} tw-transition-colors`}>
                                {`Үйл ажиллагаа ${i + 1}:`}
                            </span>
                        </div>

                        <div className="tw-py-2 tw-pl-5 tw-pr-3 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                            <FormRichText modules="small" value={item.activity || ''} name="activity" id={i} setForm={handleSetForm} />
                        </div>

                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-2">
                            <div className="tw-w-full tw-max-w-lg tw-flex">
                                <FormInline label="Дээрх үйл ажиллагааны төсөвт зардал, доллароор" type="numberFormat" formats={{ thousandSeparator: true, prefix: '$ ' }} value={item.budget_cost || ''} name="budget_cost" id={i} onChange={handleInputFormat} classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-32" invalid={validate && checkInvalid(item.budget_cost)} />

                                <div className="tw-relative tw-w-2 tw-ml-56">
                                    <HelpPopup classAppend="tw-right-5 tw-top-1" main="Энэхүү зардлийн тал хувийг өргөдөл гаргагч өөрийн талаас, тал хувийг экспортыг дэмжих төслийн зүгээс гаргах юм." list={['Үйл ажиллагааны төсөвт дүнг тооцохдоо бодит өртөгөөс 20 хувиас дээш хэлбэлзэлтэй байж болохгүй тул бодитоор өртөгөөр тооцоолно уу.', 'Экспортыг дэмжих төслийн санхүүжилтийн дээд хэмжээ нь $50,000 гэдгийг анхаарна уу.']} position="top-left" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tw-flex tw-items-center">
                        <ButtonTooltip tooltip="Устгах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                    </div>
                </div>
            )}

            <div className="tw-flex tw-justify-end tw-items-center tw-py-1">
                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                    Үйл ажиллагаанууд
                </div>

                <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2" classButton="tw-text-green-500 active:tw-text-green-600" />
            </div>

            <div className="tw-w-full tw-p-1 tw-pl-3">
                <div className="tw-p-0.5 tw-text-sm">
                    Нийт үйл ажиллагаануудын төсөвт зардал:
                    <span className="tw-ml-2">${!isNaN(net) && net}</span>
                </div>

                <div className="tw-p-0.5">
                    <span className={`tw-text-sm ${validate && net / 2 > 50000 && 'tw-text-red-500'} tw-transition-colors tw-duration-300`}>
                        Үүний ЭДТ-өөс санхүүжүүлэх нь:
                        <span className="tw-ml-2">
                            ${!isNaN(net) && net / 2}
                        </span>
                        {!isNaN(net) && net / 2 > 50000 &&
                            <HelpPopup classAppend="tw-ml-2 tw-inline-flex tw-top-1.5" buttonClass="tw-text-red-400 active:tw-text-red-600" main="Экспортыг дэмжих төслөөс олгох санхүүжилт нь $50,000 хэтрэхгүй байна." position="top-left" />
                        }
                    </span>
                </div>

                <div className="tw-p-0.5 tw-text-sm">
                    Өргөдөл гаргагч талаас санхүүжүүлэх нь:
                    <span className="tw-ml-2">${!isNaN(net) && net / 2}</span>
                </div>

                <div className="tw-p-0.5 tw-text-sm">
                    Өргөдөл гаргагчийн оролцоо нийт төслийн зардалд эзлэх хувь нь (C/A %):
                    <span className="tw-ml-2 tw-text-blue-500 tw-font-medium">50%</span>
                </div>
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-6 tw-mb-4 tw-mr-4" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px tw-font-light" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulActivities
