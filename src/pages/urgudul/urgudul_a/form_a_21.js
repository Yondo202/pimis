import React, { useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/helpModal/helpPopup'
import ButtonTooltip from 'components/buttonTooltip/buttonTooltip'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import FormOptions from 'components/urgudul_components/formOptions'


const initialState = [
    {
        company_name: '',
        representative_name: '',
        company_size: '',
        support_recipient: '',
        project_contribution: '',
    },
]

function UrugudulClusters() {
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

    const handleSetForm = (name, value, index) => {
        const newForm = form
        newForm[index][name] = value
        setForm([...newForm])
    }

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">A2</span>
                - Кластерын гишүүн байгууллагууд

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Тухайн кластерт оролцогч, бусад аж ахуйн нэгжүүдийг жагсаалт, тэдгээрийн төлөөлөх албан тушаалтан, овог нэрийн хамт." position="bottom" />
            </div>

            {
                form.map((item, i) =>
                    <div className="tw-flex odd:tw-bg-gray-100" key={i}>
                        <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-center">
                            <FormInline label="Кластерын гишүүн аж ахуйн нэгж" type="text" value={item.company_name} name="company_name" id={i} onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                            <FormInline label="Төлөөлөх албан тушаалтны нэр" type="text" value={item.representative_name} name="representative_name" id={i} onChange={handleInput} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" classInput="tw-w-full" />

                            <FormOptions label="Аж ахуйн нэгжийн хэмжээ" options={['Бичил', 'Жижиг', 'Дунд']} values={[1, 2, 3]} value={item.company_size} name="company_size" id={i} setForm={handleSetForm} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" />

                            <FormOptions label="Манай дэмжлэг хүртэгч мөн эсэх?" options={['Тийм', 'Үгүй']} values={[1, 0]} value={item.support_recipient} name="support_recipient" id={i} setForm={handleSetForm} classAppend="tw-border tw-border-dashed tw-w-full tw-max-w-lg" />

                            <div className="tw-border tw-border-dashed tw-w-full tw-max-w-lg tw-flex">
                                <FormInline label="Төслийн төлөвлөлт, гүйцэтгэлд оруулах хувь нэмэр" type="text" value={item.project_contribution} name="project_contribution" id={i} onChange={handleInput} classAppend="tw-flex-grow" classInput="tw-w-full" />

                                <div className="tw-relative tw-w-2">
                                    <HelpPopup classAppend="tw-right-5 tw-top-1" main="Ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв боловсруулах, төслийг хэрэгжүүлэхэд дэмжлэг үзүүлэх гм." position="top-left" />
                                </div>
                            </div>
                        </div>

                        <div className="tw-flex tw-items-center">
                            <ButtonTooltip tooltip="Устгах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classAppend="tw-text-red-500 active:tw-text-red-600" classLabel="tw-text-sm" />
                        </div>
                    </div>
                )
            }

            <div className="tw-flex tw-justify-end tw-items-center tw-pt-2">
                <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                    {form.length}ш кластерийн гишүүн байгууллага байна.
                </div>

                <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-text-green-500 active:tw-text-green-600 tw-mr-2" />
            </div>
        </div>
    )
}

export default UrugudulClusters
