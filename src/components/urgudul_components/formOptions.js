import React from 'react'

function FormOptions({ label, options, values, value, name, index, setter, classAppend, classLabel, invalid }) {
    const handleSelect = (key, value, index) => {
        setter(key, value, index)
    }

    const checked = (index) => {
        return value === values[index]
    }

    return (
        <div className={`tw-relative tw-px-3 tw-pt-8 tw-pb-3 tw-flex tw-items-center ${classAppend}`}>
            <label className={`tw-absolute tw-rounded-full tw-whitespace-nowrap ${invalid && 'tw-text-red-500'} tw-transition-colors tw-duration-300 ${classLabel} tw-text-sm tw-top-2 tw-left-3`}>
                {label}
            </label>

            <div className="tw-flex tw-flex-col tw-items-start tw-pl-2">
                {options?.map((item, i) =>
                    <div className="tw-flex tw-items-center tw-py-1 tw-cursor-pointer" key={i} onClick={() => handleSelect(name, values[i], index)}>
                        <div className={`tw-w-4 tw-h-4 tw-rounded-full tw-border-2 ${checked(i) ? 'tw-border-blue-700' : 'tw-border-gray-500'} tw-transition-colors tw-flex tw-justify-center tw-items-center`}>
                            {checked(i) &&
                                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-blue-700 tw-transition-colors" />
                            }
                        </div>

                        <span className="tw-text-13px tw-ml-1.5">{item}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FormOptions
