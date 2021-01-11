import React, { useContext, useState } from 'react'
import ProjectBudget1 from 'pages/project_budget/3.1/form'
import ProjectBudget2 from 'pages/project_budget/3.2/form'
import ProjectBudget3 from 'pages/project_budget/3.3/form'
import ProjectBudget4 from 'pages/project_budget/3.4/form'
import { useHistory } from 'react-router-dom'
import ArrowSVG from 'assets/svgComponents/arrowSVG'
import NumberFormat from 'react-number-format'
import useStateContext from 'components/utilities/useStateContext'
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
        <div className="w-full max-w-5xl mx-auto py-20 flex flex-col text-gray-700">
            <h3 className="text-xl text-gray-600 font-semibold ml-4 mb-4">
                3. Төслийн зардал болон санхүүжилт
            </h3>
            <p className="text-sm italic opacity-80 ml-4">Санхүүгийн дэмжлэгийн дээд хэмжээ: ААН-д 50,000 ам.доллар, Кластерт 100,000 ам.доллар.</p>
            <p className="text-sm italic opacity-80 ml-4 mb-8">Төслийн зөвшөөрөгдсөн зардлын зөвхөн 50%-ийг Түншлэлийн хөтөлбөрийн хүрээнд санхүүжүүлнэ.</p>

            <form className="bg-gray-50 rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mx-auto mb-20" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x rounded-lg">
                    <div className="p-2 pt-5 pl-4 w-full sm:w-8/12 h-auto sm:h-24">
                        <label className={`text-sm ${focused && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                            Төслөөс хүсэж буй санхүүгийн дэмжлэгийн нийт хэмжээ, ам.доллароор:
                        </label>
                    </div>
                    <div className="py-3 px-4 flex-grow sm:w-4/12">
                        <div className="w-32 border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300 flex items-center">
                            <span className="text-lg font-medium mx-2">$</span>
                            <NumberFormat className="w-24 text-sm bg-transparent outline-none py-2 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" thousandSeparator={true} value={data.totalbudget} name="totalbudget" onChange={handleInputFormat} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                        </div>
                    </div>
                </div>
            </form>

            <ProjectBudget1 />

            <ProjectBudget2 />

            <ProjectBudget3 />

            <ProjectBudget4 />

            <button className="rounded-full self-end py-2 px-4 mr-12 inline-flex items-center font-medium text-white bg-blue-600 focus:outline-none active:bg-blue-700 hover:shadow-lg" onClick={navToAgreement}>
                Үргэлжлүүлэх
                <ArrowSVG className="w-5 h-5 ml-2 animate-pulse" />
            </button>
        </div>
    )
}

export default ProjectBudget
