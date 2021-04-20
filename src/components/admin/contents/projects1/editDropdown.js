import React, { useEffect, useRef, useState } from 'react'
import { animated, config, Transition } from 'react-spring/renderprops'
import PenSVG from 'assets/svgComponents/penSVG'


export default function EditDropdown(props) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef()
    const buttonRef = useRef()

    const handleClickOutside = (e) => {
        if (open && !dropdownRef.current?.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
        <div className="tw-flex tw-justify-center">
            <div className="tw-relative">
                <button className="tw-text-gray-600 tw-inline-flex tw-items-center active:tw-text-gray-400 focus:tw-outline-none tw-rounded-full tw-bg-gradient-to-t tw-from-gray-200 tw-via-gray-50" style={{ padding: '3px' }} onClick={() => setOpen(!open)} ref={buttonRef}>
                    <PenSVG className="tw-w-5 tw-h-5 tw-transition-colors" />
                </button>
                <Transition items={open}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                    config={config.stiff}>
                    {open => open && (anims =>
                        <animated.div style={anims} className="tw-absolute tw-top-7 tw--right-2 tw-w-64 tw-grid tw-grid-cols-1 tw-z-10 tw-bg-white tw-rounded-md tw-shadow-md tw-divide-y tw-divide-dashed" ref={dropdownRef}>
                            {props.items?.map(item =>
                                <button className="tw-font-medium tw-p-2 tw-pl-3 hover:tw-bg-blue-100 tw-whitespace-nowrap tw-text-left first:tw-rounded-t-md last:tw-rounded-b-md focus:tw-outline-none tw-text-13px" onClick={() => { item.function(props.id); setOpen(false) }} key={item.label}>
                                    {item.label}
                                </button>
                            )}
                        </animated.div>
                    )}
                </Transition>
            </div>
        </div>
    )
}
