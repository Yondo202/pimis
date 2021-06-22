import React, { useState } from 'react'

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
            <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-whitespace-nowrap ${props.invalid && 'tw-text-red-500'} tw-transition-colors tw-duration-300 ${props.classLabel} tw-text-sm tw-top-4 tw-left-3`}>
                {props.label}
            </label>

            <div className="tw-ml-2 tw-text-sm tw-pt-3 tw-pb-1 tw-px-2 focus:tw-outline-none tw-flex tw-flex-wrap tw-items-center" tabIndex="0" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
                {props.options?.map((item, i) =>
                    <button className="tw-inline-flex tw-items-center tw-bg-transparent focus:tw-outline-none hover:tw-shadow tw-rounded-lg tw-px-1 tw-mr-1" key={i} onClick={() => handleSelect(props.name, props.values[i], props.id)}>
                        <div className={`tw-mr-1 tw-w-4 tw-h-4 tw-rounded-full tw-border-2 ${checked(i) ? 'tw-border-blue-700' : 'tw-border-gray-500'} tw-transition-colors tw-flex tw-justify-center tw-items-center`}>
                            {checked(i) &&
                                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-blue-700 tw-transition-colors" />
                            }
                        </div>

                        <span className="tw-text-13px">{item}</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default FormOptions
