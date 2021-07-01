import React, { useState, useRef } from 'react'
import NumberFormat from 'react-number-format'

function FormInline({ label, value, type, formats, name, index, setter, placeholder, HelpPopup, validate, classAppend, classLabel, classInput, invalid }) {
    const [focused, setFocused] = useState(false)

    const inputRef = useRef()

    const handleBlur = () => {
        setFocused(false)
        validate && value && inputRef.current.reportValidity()
    }

    return (
        <div className={`tw-relative tw-px-3 tw-pt-8 tw-pb-3.5 ${classAppend}`}>
            <label className={`tw-absolute tw-px-1 ${classLabel ? classLabel : 'tw-bg-white'} tw-rounded-full tw-whitespace-nowrap ${focused ? 'tw-text-sm tw-top-2 tw-left-2' : 'tw-text-xs tw-top-6 tw-left-6'} tw-transition-all tw-duration-300`}>
                {label}
            </label>

            <div className="tw-flex">
                {type === 'numberFormat'
                    ? <NumberFormat className={`tw-h-8.5 tw-text-sm tw-bg-transparent tw-border ${invalid ? 'tw-border-red-500' : 'tw-border-gray-400 focus:tw-border-blue-700'} tw-rounded tw-pt-2 tw-pb-1 tw-px-2 tw-outline-none tw-transition-colors tw-duration-700 tw-placeholder-gray-400 tw-text-13px focus:tw-shadow ${classInput}`} {...formats} value={value ?? ''} onValueChange={(values) => setter(name, values, index)} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />

                    : <input className={`tw-h-8.5 tw-text-sm tw-bg-transparent tw-border ${invalid ? 'tw-border-red-500' : 'tw-border-gray-400 focus:tw-border-blue-700'} tw-rounded tw-pt-2 tw-pb-1 tw-px-2 tw-outline-none tw-transition-colors tw-duration-700 tw-placeholder-gray-400 tw-text-13px focus:tw-shadow ${classInput}`} type={type} {...formats} value={value ?? ''} onChange={e => setter(name, e.target.value, index)} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={handleBlur} ref={inputRef} />
                }

                <div className="tw-w-0 tw-transform-gpu tw--translate-y-6 tw-ml-auto">
                    {HelpPopup && HelpPopup}
                </div>
            </div>
        </div>
    )
}

export default FormInline
