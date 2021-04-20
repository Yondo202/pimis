import CloseSVG from 'assets/svgComponents/closeSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import React, { useEffect, useRef } from 'react'
import { animated, Transition } from 'react-spring/renderprops'


export default function RequestsModal(props) {
    const showModal = props.requestsModalOpen
    const setModal = props.setRequestsModalOpen

    const modalRef = useRef()

    const handleClickOutside = (e) => {
        if (!modalRef.current?.contains(e.target)) {
            setModal(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
        <Transition
            items={showModal}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}>
            {item => item && (anims =>
                <animated.div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-flex tw-justify-center tw-items-center" style={anims}>
                    <Transition
                        items={showModal}
                        from={{ transform: 'translateY(-20px)' }}
                        enter={{ transform: 'translateY(0)' }}
                        leave={{ transform: 'translateY(20px)' }}>
                        {item1 => item1 && (anims1 =>
                            <animated.div style={anims1} className="tw-bg-white tw-relative tw-rounded-md tw-shadow-lg tw-p-4 tw-m-8 tw-w-full tw-max-w-3xl tw-flex tw-flex-col tw-items-center" ref={modalRef}>
                                <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2 tw-transition-colors" onClick={() => setModal(false)}>
                                    <CloseSVG className="tw-w-6 tw-h-6" />
                                </button>

                                <div className="tw-flex tw-flex-wrap tw-justify-start">
                                    {props.requests.map(item =>
                                        <button className="tw-w-32 tw-h-40 tw-rounded-md tw-shadow-md tw-border tw-m-3 tw-transform-gpu hover:tw-scale-105 tw-transition-all tw-duration-300 focus:tw-outline-none tw-inline-flex tw-flex-col" key={item.id} onClick={() => props.handleSelectRequest(item.id)}>
                                            <div className="tw-w-32 tw-h-24 tw-rounded-t-md tw-flex tw-justify-center tw-items-center tw-text-white tw-text-lg tw-font-bold tw-bg-gray-400">
                                                ID: {item.id}
                                            </div>
                                            <div className="tw-pl-2 tw-mt-1 tw-truncate tw-text-xs tw-font-medium tw-w-full tw-text-left">
                                                {item.fullname}
                                            </div>
                                            <div className="tw-pl-2 tw-mt-0.5 tw-truncate tw-text-xs tw-font-medium tw-w-full tw-text-left">
                                                {item.phone}
                                            </div>
                                            <div className="tw-pl-2 tw-mt-0.5 tw-truncate tw-text-xs tw-font-medium tw-w-full tw-text-left">
                                                {item.trainee_count}
                                            </div>
                                        </button>
                                    )}

                                    <button className="tw-w-32 tw-h-40 tw-rounded-md tw-shadow-md tw-border tw-m-3 tw-transform-gpu hover:tw-scale-110 tw-transition-all tw-duration-300 focus:tw-outline-none tw-inline-flex tw-flex-col" onClick={() => setModal(false)}>
                                        <div className="tw-w-32 tw-h-24 tw-bg-gray-400 tw-rounded-t-md tw-flex tw-justify-center tw-items-center">
                                            <PlusSVG className="tw-w-10 tw-h-10 tw-text-white" />
                                        </div>
                                        <div className="tw-px-2 tw-w-full tw-text-center tw-mt-2 tw-text-xs tw-font-medium">
                                            Шинээр захиалгат сургалтын хүсэлт үүсгэх
                                        </div>
                                    </button>
                                </div>
                            </animated.div>
                        )}
                    </Transition>
                </animated.div>
            )}
        </Transition>
    )
}
