import CloseSVG from 'assets/svgComponents/closeSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import React, { useEffect, useRef, useState } from 'react'
import { config, Transition } from 'react-spring/renderprops'


const nemsenGishuud = [
    { name: 'Bat' },
    { name: 'Bold' }
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

    const [search, setSearch] = useState('')

    const filter = (obj) => {
        if (obj) {
            const str = ('' + obj.name).toLowerCase()
            return str.includes(search.toLowerCase())
        } else {
            return true
        }
    }

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

                        <div className="">Томилсон гишүүд:</div>

                        <div className="tw-h-20 tw-overflow-y-auto">
                            {nemsenGishuud.map(evaluator =>
                                <div className="tw-flex tw-justify-between tw-items-center hover:tw-bg-blue-100" key={evaluator.name}>
                                    {evaluator.name}
                                    <CloseSVG className="tw-w-4 tw-h-4" />
                                </div>
                            )}
                        </div>

                        <input className="tw-w-full tw-border" style={{ maxWidth: '240px' }} value={search} onChange={e => setSearch(e.target.value)} />

                        <div className="tw-h-32 tw-overflow-y-auto">
                            {unelgeeniiHorooniiGishuud.filter(filter).map(evaluator =>
                                <div className="hover:tw-bg-blue-100" key={evaluator.name}>
                                    {evaluator.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    )
}