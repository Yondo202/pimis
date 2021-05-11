import React, { useEffect, useRef, useState } from 'react'
import { translation } from 'components/admin/contents/projects1/ProjectHandle'
import { animated, config, Transition } from 'react-spring/renderprops'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'


export default function FilterDropDown(props) {
    const [dropdown, setDropdown] = useState(false)
    const dropdownRef = useRef()
    const buttonRef = useRef()

    const handleClickOutside = (e) => {
        if (dropdown && !dropdownRef.current?.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const handleSelect = (key) => {
        props.setFilterBy(key)
        setDropdown(false)
    }

    return (
        <div className="tw-relative tw-border-l tw-border-gray-500 tw-pl-1">
            <button className="tw-flex tw-items-center tw-px-1 tw-rounded-md focus:tw-outline-none active:tw-bg-gray-100" onClick={() => setDropdown(!dropdown)} ref={buttonRef}>
                <span className="tw-text-sm tw-whitespace-nowrap tw-font-medium">
                    {translation[props.filterBy]}
                </span>
                <ChevronDownSVG className="tw-w-4 tw-h-4 tw-ml-1 tw-flex-shrink-0" />
            </button>

            <Transition items={dropdown}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {dropdown => dropdown && (props =>
                    <animated.div style={props} className="tw-absolute tw-top-8 tw--right-2 tw-w-40 tw-grid tw-grid-cols-1 tw-z-10 tw-bg-white tw-rounded-md tw-shadow-md tw-divide-y tw-divide-dashed" ref={dropdownRef}>
                        {Object.keys(translation).map(key =>
                            <button className="tw-font-medium tw-p-2 tw-pl-3 hover:tw-bg-blue-100 tw-whitespace-nowrap tw-text-left first:tw-rounded-t-md last:tw-rounded-b-md focus:tw-outline-none tw-text-13px" key={key} onClick={() => handleSelect(key)}>
                                {translation[key]}
                            </button>
                        )}
                    </animated.div>
                )}
            </Transition>
        </div>
    )
}
