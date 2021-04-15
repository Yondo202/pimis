import React, { useContext, useEffect, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/help_popup/helpPopup'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import PenSVG from 'assets/svgComponents/penSVG'
import FormRichText from 'components/urgudul_components/formRichText'
import UrgudulContext from 'components/utilities/urgudulContext'
import axios from 'axiosbase'
import SearchSelect from 'components/urgudul_components/searchSelect'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'


const initialState = [
    {
        position: null,
        director_name: null,
        director_phone: null,
        director_email: null,
        employed_date: null,
        project_contribution: null,
    },
]

function UrugudulDirectors() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.directors && UrgudulCtx.data.directors?.length) {
            setForm(UrgudulCtx.data.directors)
        }
    }, [UrgudulCtx.data.id])

    const handleInput = (e) => {
        const newForm = form
        newForm[e.target.id][e.target.name] = e.target.value
        setForm([...newForm])
    }

    const handleInputFormatted = (values, key, index) => {
        const newForm = form
        newForm[index][key] = values.formattedValue
        setForm([...newForm])
    }

    const handleAdd = () => {
        const newObj = {
            position: null,
            director_name: null,
            director_phone: null,
            director_email: null,
            employed_date: null,
            project_contribution: null,
        }

        setForm([...form, newObj])
    }

    const handleRemove = (index) => {
        setForm(form.filter((_, i) => i !== index))
    }

    const handleSetForm = (key, value, index) => {
        setForm(prev => {
            const newForm = [...prev]
            newForm[index][key] = value
            return newForm
        })
    }

    const [occupations, setOccupations] = useState([])

    useEffect(() => {
        axios.get('occupations')
            .then(res => {
                console.log(res.data)
                setOccupations(res.data.data)
            })
    }, [])

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        let allValid = true
        for (const obj of form) {
            allValid = allValid && Object.keys(initialState[0]).every(key => !checkInvalid(obj[key], key === 'project_contribution' && 'quill'))
        }

        if (form.length < 3) {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Та доод тал нь 3-аас дээш түлхүүр ажилтны мэдээлэл оруулна уу.' })
            return
        }

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, { directors: form }, {
                    headers: { 'Authorization': getLoggedUserToken() },
                })
                    .then(res => {
                        console.log(res.data)
                        UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                        AlertCtx.setAlert({ open: true, variant: 'success', msg: 'АНН мэдээлэл хадгалагдлаа.' })
                        history.push('/urgudul/4')
                    })
                    .catch(err => {
                        console.log(err.response?.data)
                        AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                    })
            } else {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Аль нэг талбар бөглөгдөөгүй байна. Та гүйцэт бөглөнө үү.' })
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
                break
            default:
                return false
        }
    }

    return (
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="">
                <div className="tw-font-medium tw-p-3 tw-flex tw-items-center tw-text-15px">
                    <span className="tw-text-blue-500 tw-text-xl tw-mx-2">A2</span>
                    <span className="tw-leading-tight">- Аж ахуйн нэгжийг төлөөлөгчид</span>

                    <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="ААН нэгжийг төлөөлүүлж 3-аас түлхүүр албан тушаалтны мэдээллээ оруулна уу." position="bottom" />
                </div>

                {UrgudulCtx.data.project_number &&
                    <div className="tw-ml-5 tw-mb-2 tw-font-medium tw-text-13px">
                        Өргөдлийн дугаар:
                        <span className="tw-text-blue-500 tw-ml-2">{UrgudulCtx.data.project_number}</span>
                    </div>
                }
            </div>

            {form.map((item, i) =>
                <div className="tw-flex odd:tw-bg-gray-50" key={i}>
                    <div className="tw-flex-grow">
                        <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                            <SearchSelect label="Албан тушаал" data={occupations} value={item.position} name="position" id={i} displayName="description_mon" setForm={handleSetForm} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-96" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} invalid={validate && checkInvalid(item.position)} />

                            <FormInline label="Төлөөлөх албан тушаалтны нэр" type="text" value={item.director_name || ''} name="director_name" id={i} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" invalid={validate && checkInvalid(item.director_name)} />

                            <FormInline label="Төлөөлөгчийн утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={item.director_phone || ''} name="director_phone" id={i} onChange={handleInputFormatted} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" invalid={validate && checkInvalid(item.director_phone)} />

                            <FormInline label="Төлөөлөгчийн имэйл" type="email" value={item.director_email || ''} name="director_email" id={i} onChange={handleInput} classAppend="tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" validate={true} invalid={validate && checkInvalid(item.director_email)} />

                            <FormInline label="Тухайн байгууллагад ажиллаж эхэлсэн он сар өдөр" type="date" value={item.employed_date || ''} name="employed_date" id={i} onChange={handleInput} classAppend="tw-w-full" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" invalid={validate && checkInvalid(item.employed_date)} />
                        </div>

                        <div className="tw-w-full">
                            <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                                <PenSVG className={`tw-w-5 tw-h-5 ${validate && checkInvalid(item.project_contribution, 'quill') ? 'tw-text-red-500' : 'tw-text-gray-600'} tw-transition-colors`} />
                                <span className={`tw-ml-2 tw-text-sm tw-font-medium ${validate && checkInvalid(item.project_contribution, 'quill') && 'tw-text-red-500'} tw-transition-colors`}>
                                    Энэхүү төслийн төлөвлөлт, гүйцэтгэлд оруулах хувь нэмэр
                                </span>

                                <HelpPopup classAppend="tw-ml-auto" main="Тухайлбал ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв боловсруулах, төслийг хэрэгжүүлэхэд дэмжлэг үзүүлэх гм." position="top-left" />
                            </div>

                            <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                                <FormRichText modules="small" value={item.project_contribution || ''} name="project_contribution" id={i} setForm={handleSetForm} />
                            </div>
                        </div>
                    </div>

                    <div className="tw-flex tw-items-center">
                        <ButtonTooltip tooltip="Устгах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                    </div>
                </div>
            )}

            <div className="tw-flex tw-justify-end tw-items-center tw-pt-2">
                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                    Түлхүүр албан тушаалтнууд
                </div>

                <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2" classButton={`tw-text-green-500 active:tw-text-green-600 ${validate && form.length < 3 && 'tw-border tw-border-red-500 tw-border-dashed'}`} />
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-6 tw-mb-4 tw-mr-4" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrugudulDirectors
