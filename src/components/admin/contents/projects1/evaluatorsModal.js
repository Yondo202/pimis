import CloseSVG from 'assets/svgComponents/closeSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import axios from 'axiosbase'
import React, { useEffect, useRef, useState } from 'react'
import { animated, config, Transition } from 'react-spring/renderprops'


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

export default function EvaluatorsModal(props) {
    const showModal = props.modalEvaluators.open

    const handleEvaluatorsClose = () => {
        props.setModalEvaluators({ ...props.modalEvaluators, open: false })
    }

    const modalRef = useRef()

    const handleClickOutside = (e) => {
        if (showModal && !modalRef.current?.contains(e.target)) {
            handleEvaluatorsClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

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

    return (
        <Transition items={showModal}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}>
            {showModal => showModal && (anims =>
                <animated.div style={anims} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8">
                    <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-p-4 tw-m-2 tw-w-full tw-max-w-xl tw-text-sm" ref={modalRef}>
                        <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2" onClick={handleEvaluatorsClose}>
                            <CloseSVG className="tw-w-6 tw-h-6" />
                        </button>

                        <div className="tw-text-center tw-p-2 tw-text-base">
                            Үнэлгээний хорооны гишүүд
                        </div>

                        <div className="">Томилсон гишүүд:</div>

                        <div className="tw-h-20 tw-overflow-y-auto tw-border">
                            {evaluators.map((evaluator, i) =>
                                <div className="tw-flex tw-justify-between tw-items-center hover:tw-bg-blue-100" key={i}>
                                    {evaluator.name}
                                    <button className="" onClick={() => handleRemove(i)}>
                                        <CloseSVG className="tw-w-4 tw-h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="tw-inline-flex tw-items-center tw-border tw-px-2">
                            <input className="tw-py-1 focus:tw-outline-none" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                            <SearchSVG className="tw-w-4 tw-h-4" />
                        </div>

                        <div className="tw-h-32 tw-overflow-y-auto tw-border">
                            {unelgeeniiHorooniiGishuud.filter(obj => !evaluatorsMap.includes(obj.name)).filter(filter).map(evaluator =>
                                <div className="hover:tw-bg-blue-100" key={evaluator.name} onClick={() => handleAdd(evaluator)}>
                                    {evaluator.name}
                                </div>
                            )}
                        </div>

                        <div className="tw-flex tw-justify-center tw-p-2">
                            <button className="tw-py-1 tw-px-4 tw-bg-gray-500 tw-text-white tw-rounded-md focus:tw-outline-none active:tw-bg-gray-600 tw-transition-colors" onClick={handleEvaluatorsSubmit}>
                                Хадгалах
                            </button>
                        </div>
                    </div>
                </animated.div>
            )}
        </Transition>
    )
}
