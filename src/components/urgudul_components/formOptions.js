import React from 'react'

function FormOptions({ label, options, values, value, name, index, setter, classAppend, classLabel, invalid, HelpPopup }) {
    const handleSelect = (key, value, index) => {
        setter(key, value, index)
    }

    const checked = (index) => {
        return value === values[index]
    }

    return (
        <div className={`tw-px-3 tw-pt-2 tw-pb-3 ${classAppend}`}>
            {label &&
                <label className={`${invalid && 'tw-text-red-500'} tw-transition-colors ${classLabel} tw-text-sm tw-flex tw-items-center tw-mb-1`}>
                    {label}
                    {HelpPopup && HelpPopup}
                </label>
            }

            <div className="tw-flex tw-flex-col tw-items-start tw-pl-2">
                {options?.map((item, i) =>
                    <div className="tw-flex tw-items-center tw-py-1 tw-cursor-pointer" key={i} onClick={() => handleSelect(name, values[i], index)}>
                        <div className={`tw-relative tw-w-4 tw-h-4 tw-rounded-full tw-border-2 ${checked(i) ? 'tw-border-blue-700' : 'tw-border-gray-500'} tw-transition-colors tw-duration-300 tw-flex-shrink-0`}>
                            <span className={`tw-absolute tw-transform-gpu tw-top-1/2 tw-left-1/2 tw--translate-y-1/2 tw--translate-x-1/2 tw-w-2 tw-h-2 tw-rounded-full tw-bg-blue-700 ${checked(i) ? 'tw-opacity-100' : 'tw-opacity-0'} tw-transition-opacity tw-duration-300`} />
                        </div>
                        <span className="tw-text-13px tw-ml-1.5">{item}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FormOptions
