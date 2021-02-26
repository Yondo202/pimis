import CloseSVG from 'assets/svgComponents/closeSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import axios from 'axiosbase'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import { DateBox } from 'devextreme-react'
import React, { useEffect, useRef, useState } from 'react'
import { config, Transition } from 'react-spring/renderprops'
import ButtonHover from './buttonHover'


const nemsenGishuud = [
    { name: 'Bat' },
    { name: 'Bold' },
]

const unelgeeniiHorooniiGishuud = [
    { name: 'Bat' },
    { name: 'Bold' },
    { name: 'Zulaa' },
    { name: 'Naraa' },
    { name: 'Tsetsgee' },
    { name: 'Enkhee' },
    { name: 'Tuvshin' },
]

const now = new Date()

export default function EvaluatorsModal(props) {
    const showModal = props.evaluatorsModal.open

    const handleEvaluatorsClose = () => {
        props.setEvaluatorsModal({ ...props.evaluatorsModal, open: false })
    }

    const modalRef = useRef()

    // const handleClickOutside = (e) => {
    //     if (showModal && !modalRef.current?.contains(e.target)) {
    //         handleEvaluatorsClose()
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside)
    //     return () => document.removeEventListener('mousedown', handleClickOutside)
    // })

    const [evaluators, setEvaluators] = useState([])

    useEffect(() => {
        setEvaluators(nemsenGishuud)
    }, [])

    const [search, setSearch] = useState('')

    const filter = (obj) => {
        if (obj) {
            const str = ('' + obj.name).toLowerCase()
            return str.includes(search.toLowerCase())
        } else {
            return true
        }
    }

    const handleEvaluatorsSubmit = () => {
        axios.post()
    }

    const evaluatorsMap = evaluators.map(obj => obj.name)

    const handleRemove = (index) => {
        setEvaluators(evaluators.filter((_, i) => i !== index))
    }

    const handleAdd = (obj) => {
        setEvaluators([...evaluators, obj])
    }

    const [dateTime, setDateTime] = useState(now)

    return (
        <Transition items={showModal}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            config={config.stiff}>
            {showModal => showModal && (anims =>
                <div style={anims} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8">
                    <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-p-4 tw-m-2 tw-w-full tw-max-w-xl tw-text-sm" ref={modalRef}>
                        <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2" onClick={handleEvaluatorsClose}>
                            <CloseSVG className="tw-w-6 tw-h-6" />
                        </button>

                        <div className="tw-text-center tw-p-2 tw-text-base">
                            Үнэлгээний хорооны гишүүд
                        </div>

                        <div className="tw-py-2" style={{ fontSize: '15px' }}>
                            Томилсон гишүүд:
                        </div>

                        <div className="tw-h-28 tw-border tw-border-gray-400 tw-rounded tw-w-full tw-grid tw-grid-cols-1 tw-place-content-start tw-overflow-y-auto" style={{ fontSize: '15px' }}>
                            {evaluators.map((evaluator, i) =>
                                <ButtonHover label={evaluator.name} action="хасах" onClick={() => handleRemove(i)} key={i} />
                            )}
                        </div>

                        <div className="tw-flex tw-items-center tw-mt-6 tw-mb-2">
                            <span className="tw-mr-4">Гишүүд томилох:</span>
                            <div className="tw-inline-flex tw-items-center tw-border tw-border-gray-400 tw-rounded tw-pl-2 tw-pr-1">
                                <input className="tw-py-1 focus:tw-outline-none" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                                <SearchSVG className="tw-w-4 tw-h-4" />
                            </div>
                        </div>

                        <div className="tw-h-36 tw-border tw-border-gray-400 tw-rounded tw-w-full tw-grid tw-grid-cols-1 tw-place-content-start tw-overflow-y-auto" style={{ fontSize: '15px' }}>
                            {unelgeeniiHorooniiGishuud.filter(obj => !evaluatorsMap.includes(obj.name)).filter(filter).map((evaluator, i) =>
                                <ButtonHover label={evaluator.name} action="нэмэх" onClick={() => handleAdd(evaluator)} key={i} />
                            )}
                        </div>

                        <div className="tw-flex tw-flex-wrap sm:tw-flex-nowrap tw-mt-8">
                            <div className="tw-w-full sm:tw-w-1/2">
                                Уулзалтын цаг товлох:
                            </div>
                            <DateBox className="tw-w-full sm:tw-w-1/2" type="datetime" value={dateTime} onChange={e => setDateTime(e.value)} applyButtonText="Уулзалт товлох" cancelButtonText="Болих" />
                        </div>

                        <div className="tw-flex tw-justify-center tw-p-2 tw-mt-8">
                            <button className="tw-py-1 tw-px-4 tw-bg-gray-500 tw-text-white tw-rounded-md focus:tw-outline-none active:tw-bg-gray-600 tw-transition-colors" onClick={handleEvaluatorsSubmit}>
                                Хадгалах
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    )
}