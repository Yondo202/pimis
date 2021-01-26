import React, { useContext, useState } from 'react'
import ProjectBudget1 from 'pages/project_budget/3.1/form'
import ProjectBudget2 from 'pages/project_budget/3.2/form'
import ProjectBudget3 from 'pages/project_budget/3.3/form'
import ProjectBudget4 from 'pages/project_budget/3.4/form'
import { useHistory } from 'react-router-dom'
import ArrowSVG from 'assets/svgComponents/arrowSVG'
import NumberFormat from 'react-number-format'
import axios from 'axios'
import UrgudulContext from 'components/utilities/urgudulContext'

const initialState = {
    wanted_budget: ''
}

function ProjectBudget() {
    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData

    const [changed, setChanged] = useState(false)

    const handleInputFormat = (e) => {
        setData({ ...data, [e.target.name]: e.target.value.replaceAll(',', '') })
        setChanged(true)
    }

    const [focused, setFocused] = useState(false)

    const history = useHistory()

    const navToAgreement = () => {
        if (changed || data.changed31 || data.changed32 || data.changed33 || data.changed34) {
            let body = {}

            changed && Object.assign(body, {
                totalbudget: data.totalbudget,
            })

            data.changed31 && Object.assign(body, {
                applicationDetail1s: data.applicationDetail1s,
                external_info: data.external_info,
                other_info: data.other_info,
            })

            data.changed32 && Object.assign(body, {
                applicationDetail2s: data.applicationDetail2s,
            })

            data.changed33 && Object.assign(body, {
                up_sale_5y: data.up_sale_5y,
                new_hire_5y: data.new_hire_5y,
                for_product_range: data.for_product_range,
                for_export: data.for_export,
                applicationDetail31s: data.applicationDetail31s,
                applicationDetail32s: data.applicationDetail32s,
                market_def: data.market_def,
                target_market: data.target_market,
                main_competitor: data.main_competitor,
            })

            data.changed34 && Object.assign(body, {
                applicationDetail4s: data.applicationDetail4s,
            })

            axios.put(`http://192.168.88.78:3000/api/applications/${data.id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log(res.data)
                history.push('/page/3')
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="tw-w-full tw-max-w-5xl tw-mx-auto tw-py-20 tw-flex tw-flex-col tw-text-gray-700">
            <h3 className="tw-text-xl tw-text-gray-600 tw-font-semibold tw-ml-4 tw-mb-4">
                3. Төслийн зардал болон санхүүжилт
            </h3>
            <p className="tw-text-sm tw-italic tw-opacity-80 tw-ml-4">Санхүүгийн дэмжлэгийн дээд хэмжээ: ААН-д 50,000 ам.доллар, Кластерт 100,000 ам.доллар.</p>
            <p className="tw-text-sm tw-italic tw-opacity-80 tw-ml-4 tw-mb-8">Төслийн зөвшөөрөгдсөн зардлын зөвхөн 50%-ийг Түншлэлийн хөтөлбөрийн хүрээнд санхүүжүүлнэ.</p>

            <form className="tw-bg-gray-50 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-mb-20" onSubmit={handleSubmit}>
                <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x tw-rounded-lg">
                    <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-8/12 tw-h-auto sm:tw-h-24">
                        <label className={`tw-text-sm ${focused && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                            Төслөөс хүсэж буй санхүүгийн дэмжлэгийн нийт хэмжээ, ам.доллароор:
                        </label>
                    </div>
                    <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-4/12">
                        <div className="tw-w-32 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300 tw-flex tw-items-center">
                            <span className="tw-text-lg tw-font-medium tw-mx-2">$</span>
                            <NumberFormat className="tw-w-24 tw-text-sm tw-bg-transparent tw-outline-none tw-py-2 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" thousandSeparator={true} value={data.totalbudget} name="totalbudget" onChange={handleInputFormat} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                        </div>
                    </div>
                </div>
            </form>

            <ProjectBudget1 />

            <ProjectBudget2 />

            <ProjectBudget3 />

            <ProjectBudget4 />

            <button className="tw-rounded-full tw-self-end tw-py-2 tw-px-4 tw-mr-12 tw-inline-flex tw-items-center tw-font-medium tw-text-white tw-bg-blue-600 focus:tw-outline-none active:tw-bg-blue-700 hover:tw-shadow-lg" onClick={navToAgreement}>
                Үргэлжлүүлэх
                <ArrowSVG className="tw-w-5 tw-h-5 tw-ml-2 tw-animate-pulse" />
            </button>
        </div>
    )
}

export default ProjectBudget
