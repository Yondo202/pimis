import React, { useEffect, useRef } from 'react'
import { config, Transition } from 'react-spring/renderprops'
import LetterPreview from './preview'
import CloseSVG from 'assets/svgComponents/closeSVG'


export default function PreviewModal(props) {
    const showModal = props.previewModal

    const handleModalClose = () => {
        props.setPreviewModal(false)
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
            leave={{ opacity: 0 }}
            config={config.stiff}>
            {showModal => showModal && (anims =>
                <div style={anims} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8">
                    <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-p-4 tw-m-2 tw-max-h-full tw-max-w-screen-xl tw-box-border tw-overflow-auto" ref={modalRef}>
                        <button className="tw-z-10 tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded tw-absolute tw-top-2 tw-right-2 tw-transition-colors" onClick={handleModalClose}>
                            <CloseSVG className="tw-w-6 tw-h-6" />
                        </button>

                        <LetterPreview form={props.form} />
                    </div>
                </div>
            )}
        </Transition>
    )
}