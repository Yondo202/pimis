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
            <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-font-medium tw-whitespace-nowrap ${props.classLabel} ${focused ? 'tw-text-sm tw-top-2 tw-left-8' : 'tw-text-xs tw-top-6 tw-left-12'} tw-transition-all tw-duration-300`}>
                {props.label}
            </label>

            <PenAltSVG className={`tw-relative tw-top-1 tw-w-5 tw-h-5 tw-flex-shrink-0 ${focused ? 'tw-text-blue-500' : 'tw-text-gray-600'} tw-transition-colors tw-duration-300`} />

            <div className="tw-ml-2 tw-text-sm tw-pt-3 tw-pb-1 tw-px-2 focus:tw-outline-none tw-flex tw-flex-wrap tw-items-center" tabIndex="0" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
                {
                    props.options?.map((item, i) =>
                        <button className="tw-inline-flex tw-items-center tw-bg-transparent focus:tw-outline-none hover:tw-shadow-md tw-rounded-lg tw-px-1 tw-mr-1" key={i} onClick={() => handleSelect(props.name, props.values[i], props.id)}>
                            <div className={`tw-mr-1 tw-w-4 tw-h-4 tw-rounded-full tw-border-2 ${checked(i) ? 'tw-border-blue-500' : 'tw-border-gray-600'} tw-transition-colors tw-duration-100 tw-flex tw-justify-center tw-items-center`} >
                                {
                                    checked(i) &&
                                    <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-blue-500 tw-transition-colors tw-duration-300" />
                                }
                            </div>

                            <span className="">{item}</span>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default FormOptions
