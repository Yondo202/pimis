import PlusSVG from 'assets/svgComponents/plusSVG'
import React, { useEffect, useRef, useState } from 'react'
import { animated, Transition } from 'react-spring/renderprops'


export default function LoadFromOtherProject({ classAppend, otherProjects, loadFromOtherProject }) {
    const [loadButtonHovered, setLoadButtonHovered] = useState(false)
    const [loadDropdownOpen, setLoadDropdownOpen] = useState(false)

    const loadbuttonRef = useRef()
    const dropdownRef = useRef()

    const handleClickOutsideDropdown = (e) => {
        if (!dropdownRef.current?.contains(e.target) && !loadbuttonRef.current?.contains(e.target)) {
            setLoadDropdownOpen(false)
        }
    }

    useEffect(() => {
        const mouseDownFn = (e) => {
            handleClickOutsideDropdown(e)
            handleClickOutsideModal(e)
        }
        document.addEventListener('mousedown', mouseDownFn)
        return () => document.removeEventListener('mousedown', mouseDownFn)
    })

    const [loadModal, setLoadModal] = useState({
        open: false,
        id: undefined,
    })

    const loadModalRef = useRef()

    const handleClickOutsideModal = (e) => {
        if (!loadModalRef.current?.contains(e.target)) {
            setLoadModal({ open: false, id: null })
        }
    }

    const handleLoadFromOtherProject = () => {
        const projectId = loadModal.id
        loadFromOtherProject(projectId)
        setLoadModal({ open: false, id: null })
    }

    return (
        <div className={`${classAppend}`}>
            <button className="tw-flex tw-items-center focus:tw-outline-none tw-rounded tw-bg-blue-700 active:tw-bg-blue-600 tw-transition-colors tw-p-0.5 tw-text-white" onClick={() => setLoadDropdownOpen(prev => !prev)} onMouseEnter={() => setLoadButtonHovered(true)} onMouseLeave={() => setLoadButtonHovered(false)} ref={loadbuttonRef}>
                <Transition
                    items={loadButtonHovered || loadDropdownOpen}
                    from={{ width: 0, marginRight: 0, marginLeft: 0, opacity: 0 }}
                    enter={{ width: 'auto', marginRight: 4, marginLeft: 4, opacity: 1 }}
                    leave={{ width: 0, marginRight: 0, marginLeft: 0, opacity: 0 }}>
                    {item => item && (anims =>
                        <animated.span className="tw-text-13px tw-whitespace-nowrap tw-overflow-clip tw-overflow-hidden tw-font-light" style={anims}>
                            ?????????? ?????????????????? ???????????????? ??????????????
                        </animated.span>
                    )}
                </Transition>
                <PlusSVG className="tw-w-6 tw-h-6" />
            </button>

            <div className="tw-relative tw-w-0 tw-float-right">
                <Transition
                    items={loadDropdownOpen}
                    from={{ height: 0, opacity: 0 }}
                    enter={{ height: 'auto', opacity: 1 }}
                    leave={{ height: 0, opacity: 0 }}>
                    {item => item && (anims =>
                        <animated.div className="tw-absolute tw-right-0 tw-top-1 tw-z-10 tw-rounded tw-overflow-hidden tw-divide-y tw-divide-dashed tw-text-xs tw-w-40 tw-bg-blue-700 tw-text-white tw-overflow-y-auto tw-overflow-x-hidden" style={{ ...anims, maxHeight: 500 }} ref={dropdownRef}>
                            {otherProjects.length === 0
                                ? <div className="tw-py-2 tw-px-2 tw-text-gray-100 tw-italic tw-text-center">
                                    ?????????????? ?????????????? ??????????
                                </div>
                                : otherProjects.map(project =>
                                    <div className="tw-cursor-pointer tw-py-2 tw-px-2 hover:tw-bg-blue-500 tw-transition-colors" onClick={() => setLoadModal({ open: true, id: project.id })} key={project.id}>
                                        {project.project_number}
                                    </div>
                                )}
                        </animated.div>
                    )}
                </Transition>
            </div>

            <Transition
                items={loadModal.open}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {item => item && (anims =>
                    <animated.div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8" style={anims}>
                        <Transition
                            items={loadModal.open}
                            from={{ transform: 'translateY(-20px)' }}
                            enter={{ transform: 'translateY(0)' }}
                            leave={{ transform: 'translateY(20px)' }}>
                            {item1 => item1 && (anims1 =>
                                <animated.div className="tw-bg-white tw-p-4 tw-relative tw-rounded tw-shadow-md tw-max-w-md tw-ring-2 tw-ring-indigo-500" style={anims1} ref={loadModalRef}>
                                    <div className="tw-text-15px tw-p-2 tw-text-center tw-font-medium">
                                        ??????????????????????
                                    </div>
                                    <div className="tw-text-sm tw-p-2 tw-text-center">
                                        ?????????????????? ???????? ???????? ???????????????? ???????????? ???????????????? ???????? ???????????????? ?????????????? ???????????????????? ???????????????? ???? ???? ?????????? ???? ???????????????? ?????????????? ???????? ?????????????????????????? ?????????????? ???????? ????.
                                    </div>
                                    <div className="tw-flex tw-justify-center tw-text-sm">
                                        <button className="tw-rounded focus:tw-outline-none tw-bg-blue-700 active:tw-bg-blue-800 tw-transition-colors tw-px-4 tw-py-1.5 tw-mt-4 tw-mb-2 tw-text-white" onClick={handleLoadFromOtherProject}>
                                            ????????????????????????
                                        </button>
                                        <button className="tw-rounded focus:tw-outline-none tw-bg-blue-700 active:tw-bg-blue-800 tw-transition-colors tw-px-4 tw-py-1.5 tw-mt-4 tw-mb-2 tw-ml-4 tw-text-white" onClick={() => setLoadModal({ open: false, id: null })}>
                                            ??????????
                                        </button>
                                    </div>
                                </animated.div>
                            )}
                        </Transition>
                    </animated.div>
                )}
            </Transition>
        </div>
    )
}
