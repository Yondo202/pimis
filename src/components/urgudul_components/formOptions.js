import React, { useState } from 'react'
import PenAltSVG from 'assets/svgComponents/penAltSVG'


function FormOptions(props) {
    const [focused, setFocused] = useState(false)

    const handleSelect = (key, value, index) => {
        props.setForm(key, value, index)
    }

    const checked = (index) => {
        return props.value === props.values[index]
    }

    return (
        <div className={`tw-relative tw-px-3 tw-pt-8 tw-pb-3 tw-flex tw-items-center ${props.classAppend}`}>
            <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-font-medium tw-whitespace-nowrap tw-top-2 tw-left-8 ${focused ? 'tw-text-sm' : 'tw-text-xs tw-top-6 tw-left-12'} tw-transition-all tw-duration-300`}>
                {props.label}
            </label>

            <PenAltSVG className={`tw-relative tw-top-1 tw-w-6 tw-h-6 ${focused && 'tw-text-blue-500'} tw-transition-colors tw-duration-300`} />

            <div className="tw-ml-2 tw-text-sm tw-pt-3 tw-pb-1 tw-px-2 focus:tw-outline-none tw-flex tw-flex-wrap tw-items-center" tabIndex="0" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
                {
                    props.options?.map((item, i) =>
                        <>
                            <div className={`tw-mr-1 tw-w-4 tw-h-4 tw-rounded-full tw-border-2 ${checked(i) ? 'tw-border-blue-500' : 'tw-border-gray-500'} tw-transition-colors tw-duration-300 tw-flex tw-justify-center tw-items-center`} onClick={() => handleSelect(props.name, props.values[i], props.id)}>
                                {
                                    checked(i) &&
                                    <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-blue-500 tw-transition-colors tw-duration-300" />
                                }
                            </div>

                            <span htmlFor={`${props.name}-${i}`} className="tw-mr-2" onClick={() => handleSelect(props.name, props.values[i], props.index)}>
                                {item}
                            </span>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default FormOptions
