import React, { useState, useRef } from 'react'
import NumberFormat from 'react-number-format'

function FormInline(props) {
    const [focused, setFocused] = useState(false)

    const inputRef = useRef()

    const handleBlur = () => {
        setFocused(false)
        props.validate && props.value && inputRef.current.reportValidity()
    }

    return (
        <div className={`tw-relative tw-px-3 tw-pt-8 tw-pb-3.5 tw-flex tw-items-center ${props.classAppend}`}>
            <label className={`tw-absolute tw-px-1 ${props.classLabel ? props.classLabel : 'tw-bg-white'} tw-rounded-full tw-whitespace-nowrap ${focused ? 'tw-text-sm tw-top-2 tw-left-2' : 'tw-text-xs tw-top-6 tw-left-6'} tw-transition-all tw-duration-300`}>
                {props.label}
            </label>

            {props.type === 'numberFormat'
                ? <NumberFormat className={`tw-h-8.5 tw-text-sm tw-bg-transparent tw-border ${props.invalid ? 'tw-border-red-500' : 'tw-border-gray-400 focus:tw-border-blue-700'} tw-rounded tw-pt-2 tw-pb-1 tw-px-2 tw-outline-none tw-transition-colors tw-duration-700 tw-placeholder-gray-400 tw-text-13px focus:tw-shadow ${props.classInput}`} {...props.formats} value={props.value} onValueChange={(values) => props.setter(props.name, values, props.index)} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />

                : <input className={`tw-h-8.5 tw-text-sm tw-bg-transparent tw-border ${props.invalid ? 'tw-border-red-500' : 'tw-border-gray-400 focus:tw-border-blue-700'} tw-rounded tw-pt-2 tw-pb-1 tw-px-2 tw-outline-none tw-transition-colors tw-duration-700 tw-placeholder-gray-400 tw-text-13px focus:tw-shadow ${props.classInput}`} type={props.type} {...props.formats} value={props.value} onChange={e => props.setter(props.name, e.target.value, props.index)} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={handleBlur} ref={inputRef} />
            }
        </div>
    )
}

export default FormInline
