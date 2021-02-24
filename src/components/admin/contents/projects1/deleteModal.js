import React, { useEffect, useRef } from 'react'
import axios from 'axiosbase'
import { config, Transition } from 'react-spring/renderprops'
import CloseSVG from 'assets/svgComponents/closeSVG'


export default function DeleteModal(props) {
    const showModal = props.modalDelete.open

    const handleModalClose = () => {
        props.setModalDelete({ ...props.modalDelete, open: false })
    }

    const handleProjectDelete = () => {
        axios.delete()
    }

    const modalRef = useRef()

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
                    <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-p-4 tw-m-2 tw-w-full tw-max-w-xl tw-flex tw-flex-wrap tw-justify-center tw-border-2 tw-border-red-600 tw-border-opacity-80" ref={modalRef}>
                        <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2" onClick={handleModalClose}>
                            <CloseSVG className="tw-w-6 tw-h-6" />
                        </button>

                        <div className="tw-w-full tw-text-center tw-px-2 tw-py-4 tw-text-base">
                            <span className="tw-text-red-500 tw-text-lg tw-mr-2">
                                ID:{props.modalDelete.id}
                            </span>
                            өргөдлийн маягтыг устгах уу?
                        </div>

                        <button className="tw-py-1 tw-px-4 tw-bg-gray-500 tw-text-white tw-rounded-md focus:tw-outline-none active:tw-bg-gray-600 tw-transition-colors tw-mr-3" onClick={handleProjectDelete}>
                            Тийм
                        </button>

                        <button className="tw-py-1 tw-px-4 tw-bg-gray-500 tw-text-white tw-rounded-md focus:tw-outline-none active:tw-bg-gray-600 tw-transition-colors" onClick={handleModalClose}>
                            Үгүй
                        </button>
                    </div>
                </div>
            )}
        </Transition>
    )
}