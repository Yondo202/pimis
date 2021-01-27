import React, { useContext, useState } from 'react'
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


const initialState = [
    {
        position: '',
        director_name: '',
        employed_date: '',
        project_contribution: '',
    },
]

function UrugudulDirectors() {
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

    const handleSetForm = (key, value, index) => {
        const newForm = form
        newForm[index][key] = value
        setForm([...newForm])
    }

    const UrgudulCtx = useContext(UrgudulContext)

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        if (UrgudulCtx.data.id) {
            axios.put(`projects/${UrgudulCtx.data.id}`, { directors: form })
                .then(res => {
                    console.log(res.data)
                    UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'АНН мэдээлэл хадгалагдлаа.' })
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
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">A2</span>
                - ААН

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Түлхүүр албан тушаалтны жагсаалт, тэдгээрийн овог нэр, албан тушаалын хамт." position="bottom" />
            </div>

            {
                form.map((item, i) =>
                    <div className="tw-flex odd:tw-bg-gray-50" key={i}>
                        <div className="tw-flex-grow">
                            <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-center">
                                <div className="tw-border tw-border-dashed tw-w-full tw-max-w-lg tw-flex">
                                    <SearchSelect label="Албан тушаал" api="occupations" keys={['data']} value={item.position} name="position" id={i} description="description" description_mon="description_mon" setForm={handleSetForm} />
                                </div>

                                <FormInline label="Төлөөлөх албан тушаалтны нэр" type="text" value={item.director_name} name="director_name" id={i} onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                                <FormInline label="Тухайн байгууллагад ажиллаж эхэлсэн он сар өдөр" type="date" value={item.employed_date} name="employed_date" id={i} onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" />
                            </div>

                            <div className="tw-w-full tw-border tw-border-dashed">
                                <div className="tw-flex tw-items-center tw-p-2 tw-mt-1">
                                    <PenSVG className="tw-w-6 tw-h-6 tw-text-gray-600" />
                                    <span className="tw-ml-2 tw-text-sm tw-font-medium">Энэхүү төслийн төлөвлөлт, гүйцэтгэлд оруулах хувь нэмэр</span>

                                    <HelpPopup classAppend="tw-ml-auto" main="Тухайлбал ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв боловсруулах, төслийг хэрэгжүүлэхэд дэмжлэг үзүүлэх гм." position="top-left" />
                                </div>

                                <div className="tw-py-2 tw-px-4 tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                                    <FormRichText modules="small" value={item.project_contribution} name="project_contribution" id={i} setForm={handleSetForm} />
                                </div>
                            </div>
                        </div>

                        <div className="tw-flex tw-items-center">
                            <ButtonTooltip tooltip="Устгах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classAppend="tw-text-red-500 active:tw-text-red-600" />
                        </div>
                    </div>
                )
            }

            <div className="tw-flex tw-justify-end tw-items-center tw-pt-2">
                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                    {form.length}ш хүний мэдээлэл нэмсэн байна.
                </div>

                <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-text-green-500 active:tw-text-green-600 tw-mr-2" />
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4 tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrugudulDirectors
