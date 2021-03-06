import CloseSVG from 'assets/svgComponents/closeSVG';
import React, { useEffect, useRef } from 'react'
import { Transition, animated } from 'react-spring/renderprops'


export default function DecisionMakingPreviewModal(props) {
    const showModal = props.previewModalOpen

    const handleModalClose = () => {
        props.setPreviewModalOpen(false)
    }

    const modalRef = useRef();

    const handleClickOutside = (e) => {
        if (showModal && !modalRef.current?.contains(e.target)) {
            handleModalClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
        <Transition items={showModal}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}>
            {showModal => showModal && (anims =>
                <animated.div style={anims} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-20 tw-p-2 sm:tw-p-8 md:tw-pl-72">
                    <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-p-4 tw-m-2 tw-max-h-full tw-max-w-screen-xl tw-box-border tw-overflow-auto" ref={modalRef}>
                        <button className="tw-z-10 tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded tw-absolute tw-top-2 tw-right-2 tw-transition-colors" onClick={handleModalClose}>
                            <CloseSVG className="tw-w-6 tw-h-6" />
                        </button>

                        {props.previewComponent}
                    </div>
                </animated.div>
            )}
        </Transition>
    )
}
