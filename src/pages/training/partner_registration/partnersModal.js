import React, { useContext, useEffect, useRef } from 'react'
import { Transition } from 'react-spring/renderprops'
import axios from 'axiosbase'
import CloseSVG from 'assets/svgComponents/closeSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'


export default function PartnersModal(props) {
    const showModal = props.partnersModalOpen
    const setModal = props.setPartnersModalOpen

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

    const AlertCtx = useContext(AlertContext)

    const handleDeleteProject = (id, e) => {
        e.stopPropagation()

        axios.delete(`training-partners/${id}`, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res.data)
            props.setPartners(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Cургалтын байгууллагын мэдээллийг устгалаа.' })
        }).catch(err => {
            console.log(err.response?.data)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Устгаж чадсангүй.' })
        })
    }

    return (
        <Transition
            items={showModal}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}>
            {item => item && (anims =>
                <div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-flex tw-justify-center tw-items-center" style={anims}>
                    <Transition
                        items={showModal}
                        from={{ transform: 'translateY(-20px)' }}
                        enter={{ transform: 'translateY(0)' }}
                        leave={{ transform: 'translateY(20px)' }}>
                        {item1 => item1 && (anims1 =>
                            <div style={anims1} className="tw-bg-white tw-relative tw-rounded-md tw-shadow-lg tw-p-4 tw-m-8 tw-w-full tw-max-w-3xl tw-flex tw-flex-col tw-items-center" ref={modalRef}>
                                <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2 tw-transition-colors" onClick={() => setModal(false)}>
                                    <CloseSVG className="tw-w-6 tw-h-6" />
                                </button>

                                <div className="tw-flex tw-flex-wrap tw-justify-start">
                                    {props.partners.map(item =>
                                        <button className="tw-w-32 tw-h-40 tw-rounded-md tw-shadow-md tw-border tw-m-3 tw-transform-gpu hover:tw-scale-105 tw-transition-all tw-duration-300 focus:tw-outline-none tw-inline-flex tw-flex-col tw-relative" key={item.id} onClick={() => props.handleSelectPartner(item.id)}>
                                            <div className="tw-text-white tw-transition-colors active:tw-bg-gray-300 tw-rounded tw-absolute tw-flex tw-items-center tw-justify-center" style={{ top: 3, right: 1 }} onClick={e => handleDeleteProject(item.id, e)}>
                                                <CloseSVG className="tw-w-6 tw-h-6" />
                                            </div>
                                            <div className="tw-w-32 tw-h-24 tw-rounded-t-md tw-flex tw-justify-center tw-items-center tw-text-white tw-text-lg tw-font-bold tw-bg-gray-400">
                                                ID: {item.id}
                                            </div>
                                            <div className="tw-pl-2 tw-mt-1 tw-truncate tw-text-xs tw-font-medium tw-w-full tw-text-left">
                                                {item.introduction_file?.name}
                                            </div>
                                            <div className="tw-pl-2 tw-mt-0.5 tw-truncate tw-text-xs tw-font-medium tw-w-full tw-text-left">
                                                {item.legal_entity?.name}
                                            </div>
                                            <div className="tw-pl-2 tw-mt-0.5 tw-truncate tw-text-xs tw-font-medium tw-w-full tw-text-left">
                                                {item.trainers?.name}
                                            </div>
                                        </button>
                                    )}

                                    <button className="tw-w-32 tw-h-40 tw-rounded-md tw-shadow-md tw-border tw-m-3 tw-transform-gpu hover:tw-scale-110 tw-transition-all tw-duration-300 focus:tw-outline-none tw-inline-flex tw-flex-col" onClick={() => setModal(false)}>
                                        <div className="tw-w-32 tw-h-24 tw-bg-gray-400 tw-rounded-t-md tw-flex tw-justify-center tw-items-center">
                                            <PlusSVG className="tw-w-10 tw-h-10 tw-text-white" />
                                        </div>
                                        <div className="tw-px-2 tw-w-full tw-text-center tw-mt-2 tw-text-xs tw-font-medium">
                                            Шинээр сургалтын байгууллага бүртгэх
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </Transition>
                </div>
            )}
        </Transition>
    )
}