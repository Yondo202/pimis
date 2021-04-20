import CloseSVG from 'assets/svgComponents/closeSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import axios from 'axiosbase'
import { DateBox } from 'devextreme-react'
import React, { useEffect, useRef, useState } from 'react'
import { animated, config, Transition } from 'react-spring/renderprops'
import RowMember from './rowMember'


const now = new Date()

export default function EvaluatorsModal(props) {
    const showModal = props.evaluatorsModal.open
    const project = props.evaluatorsModal.project

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

    const evaluatorsLength = evaluators.length || 0

    useEffect(() => {
        setEvaluators([])
    }, [])

    const [search, setSearch] = useState('')

    const filter = (obj) => {
        if (obj) {
            const str = `${obj.lastname} ${obj.firstname}`.toLowerCase()
            return str.includes(search.toLowerCase())
        } else {
            return true
        }
    }

    const handleEvaluatorsSubmit = () => {
        axios.post()
    }

    const evaluatorsMap = evaluators.map(obj => obj.id)

    const handleRemove = (id) => {
        setEvaluators(evaluators.filter(obj => obj.id !== id))
    }

    const handleAdd = (id) => {
        setEvaluators([...evaluators, { id: id }])
    }

    const [dateTime, setDateTime] = useState(now)

    const handleSetDateTime = (e) => setDateTime(e.value)

    const getMemberData = (id) => props.members?.filter(obj => obj.id === id)[0]

    const membersMap = props.members?.filter(member => !evaluatorsMap.includes(member.id)).filter(filter)
    const membersLength = membersMap.length || 0

    return (
        <Transition items={showModal}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            config={config.stiff}>
            {showModal => showModal && (anims =>
                <animated.div style={anims} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8">
                    <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-p-4 tw-m-2 tw-w-full tw-max-w-2xl tw-text-sm" ref={modalRef}>
                        <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2" onClick={handleEvaluatorsClose}>
                            <CloseSVG className="tw-w-6 tw-h-6" />
                        </button>

                        <div className="tw-text-center tw-p-2 tw-mb-2 tw-text-base tw-font-medium">
                            Үнэлгээний хорооны гишүүд
                        </div>

                        <div className="tw-text-right tw-font-medium tw-pr-2 tw-text-15px">
                            {project.project_name}
                        </div>
                        <div className="tw-text-right tw-font-medium tw-pr-2">
                            {project.project_type_name}
                        </div>
                        <div className="tw-mb-2 tw-text-right tw-font-medium tw-pr-2">
                            {project.project_start}
                        </div>

                        <div className="tw-py-1 tw-mb-2 tw-font-medium tw-text-sm">
                            Энэ төсөлд томилсон гишүүд:
                        </div>

                        <div className="tw-grid tw-grid-cols-4 tw-grid-rows-1 tw-font-medium tw-border-b tw-border-gray-400 tw-bg-blue-50 tw-py-1">
                            <div className="tw-px-4">Овог</div>
                            <div className="tw-px-4">Нэр</div>
                            <div className="tw-px-4">Утас</div>
                            <div className="tw-text-center">Үйлдэл</div>
                        </div>
                        <div className="tw-h-36 tw-overflow-y-auto">
                            <Transition
                                items={evaluators} keys={item => item.id}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ display: 'none' }}
                                config={config.stiff}>
                                {item => anims => <RowMember style={anims} member={getMemberData(item.id)} action="хасах" onClick={() => handleRemove(item.id)} />}
                            </Transition>
                            {evaluatorsLength < 5 &&
                                [...Array(5 - evaluatorsLength).keys()].map(i =>
                                    <div key={i} className="tw-h-7 even:tw-bg-blue-50" />
                                )
                            }
                        </div>

                        <div className="tw-flex tw-items-end tw-justify-between tw-mt-8 tw-mb-3">
                            <span className="tw-mr-4 tw-font-medium">Үнэлгээний хорооны гишүүдээс томилох:</span>
                            <div className="tw-inline-flex tw-items-center tw-border tw-border-gray-400 tw-rounded tw-pl-1.5 tw-pr-1 focus-within:tw-border-blue-500 tw-text-gray-600 focus-within:tw-text-blue-600 tw-transition-colors">
                                <input className="tw-py-1 focus:tw-outline-none tw-text-gray-700 tw-text-13px" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                                <SearchSVG className="tw-w-4 tw-h-4 tw-transition-colors" />
                            </div>
                        </div>

                        <div className="tw-grid tw-grid-cols-4 tw-grid-rows-1 tw-font-medium tw-border-b tw-border-gray-400 tw-bg-blue-50 tw-py-1">
                            <div className="tw-px-4">Овог</div>
                            <div className="tw-px-4">Нэр</div>
                            <div className="tw-px-4">Утас</div>
                            <div className="tw-text-center">Үйлдэл</div>
                        </div>
                        <div className="tw-h-36 tw-overflow-y-auto">
                            <Transition
                                items={membersMap}
                                keys={item => item.id}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ display: 'none' }}
                                config={config.stiff}>
                                {item => anims => <RowMember style={anims} member={item} action="нэмэх" onClick={() => handleAdd(item.id)} />}
                            </Transition>
                            {membersLength < 5 &&
                                [...Array(5 - membersLength).keys()].map(i =>
                                    <div key={i} className="tw-h-7 even:tw-bg-blue-50" />
                                )
                            }
                        </div>

                        <div className="tw-flex tw-flex-wrap sm:tw-flex-nowrap tw-items-center tw-mt-8">
                            <div className="tw-w-full sm:tw-w-1/2 tw-font-medium tw-pt-2 tw-pb-1 tw-leading-tight">
                                Уулзалтын цаг товлох:
                            </div>
                            <DateBox className="tw-w-full sm:tw-w-1/2" type="datetime" value={dateTime} onValueChanged={handleSetDateTime} applyButtonText="Уулзалт товлох" cancelButtonText="Болих" />
                        </div>

                        <div className="tw-flex tw-justify-center tw-p-2 tw-mt-8">
                            <button className="tw-py-1 tw-px-4 tw-bg-gray-600 tw-text-white tw-rounded-md focus:tw-outline-none active:tw-bg-gray-500 tw-transition-colors hover:tw-shadow-md" onClick={handleEvaluatorsSubmit}>
                                Хадгалах
                            </button>
                        </div>
                    </div>
                </animated.div>
            )}
        </Transition>
    )
}
