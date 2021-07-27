import React, { useState, useEffect, useRef } from 'react'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import axios from 'axiosbase'
import { Transition, animated } from 'react-spring/renderprops'
import useClickOutside from 'components/utilities/useClickOutside'

export default function FormSelect({ data, api, keys, setter, name, index, label, classAppend, classLabel, value, displayName, invalid }) {
    const [open, setOpen] = useState(false)

    const [fetch, setFetch] = useState([])

    useEffect(() => {
        if (data) {
            setFetch(data)
        } else {
            api && axios.get(api).then(res => {
                const data = keys.reduce((a, v) => a[v], res.data)
                setFetch(data)
            })
        }
    }, [data])

    const handleClickButton = () => {
        setOpen(prev => !prev)
    }

    const handleSelectId = (id) => {
        setter(name, id, index)
        setOpen(false)
    }

    const buttonRef = useRef()
    const dropdownRef = useRef()

    useClickOutside([buttonRef, dropdownRef], open, () => setOpen(false))

    const displayValue = fetch.find(obj => obj.id === value)?.[displayName] ?? 'Сонгох'

    return (
        <div className={`tw-relative tw-pl-3 tw-pr-3 tw-pt-8 tw-pb-3 ${classAppend}`}>
            <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-whitespace-nowrap ${classLabel} ${open ? 'tw-text-sm tw-top-2 tw-left-2' : 'tw-text-xs tw-top-6 tw-left-6'} tw-transition-all tw-duration-300`}>
                {label}
            </label>

            <button className={`tw-h-8.5 tw-w-full tw-flex tw-items-center tw-text-sm tw-border tw-rounded tw-pt-2 tw-pb-1 tw-px-2 focus:tw-outline-none ${invalid ? 'tw-border-red-500' : (open ? 'tw-border-blue-700 tw-shadow' : 'tw-border-gray-500')} tw-transition-colors tw-duration-700`} onClick={handleClickButton} ref={buttonRef}>
                <span className="tw-h-5 tw-text-13px tw-mr-1.5 tw-truncate" title={displayValue}>
                    {displayValue}
                </span>
                <ChevronDownSVG className={`tw-w-4 tw-h-4 tw-ml-auto ${open ? 'tw-text-blue-700' : 'tw-text-gray-600'} tw-transition-colors`} />
            </button>

            <Transition
                items={open}
                from={{ height: 0, opacity: 0 }}
                enter={{ height: 'auto', opacity: 1 }}
                leave={{ height: 0, opacity: 0 }}
                config={{ clamp: true }}
            >
                {item => item && (anims =>
                    <animated.div className="tw-absolute tw-left-3 tw-bg-white tw-overflow-hidden tw-rounded tw-shadow-sm tw-border tw-border-gray-400 tw-divide-y tw-divide-dashed tw-z-10 tw-text-13px" style={{ ...anims, top: 74, width: 'calc(100% - 24px)' }} ref={dropdownRef}>
                        {fetch.map((item, i) =>
                            <div className="tw-py-1.5 tw-pl-2 tw-pr-4 hover:tw-bg-blue-500 hover:tw-text-white tw-transition-colors tw-duration-75 tw-cursor-pointer tw-truncate" onClick={() => handleSelectId(item.id)} key={i} title={item[displayName]}>
                                <span className="tw-pr-1.5">{i + 1}.</span>
                                {item[displayName]}
                            </div>
                        )}
                    </animated.div>
                )}
            </Transition>
        </div>
    )
}
