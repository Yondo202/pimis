import React, { useState, useRef, useEffect } from 'react'
import PenSVG from 'assets/svgComponents/penSVG'
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
            <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-font-medium tw-whitespace-nowrap tw-top-2 tw-left-8 ${focused ? 'tw-text-sm' : 'tw-text-xs tw-top-6 tw-left-12'} tw-transition-all tw-duration-300`}>
                {props.label}
            </label>

            <PenSVG className={`tw-w-6 tw-h-6 ${focused && 'tw-text-blue-500'} tw-transition-colors tw-duration-300`} />

            {
                props.type === 'numberFormat' ?
                    <NumberFormat className={`tw-ml-2 tw-text-sm tw-border tw-border-gray-400 tw-rounded-md tw-pt-2 tw-pb-1 tw-px-2 focus:tw-border-blue-500 tw-outline-none tw-transition-colors tw-duration-300 tw-placeholder-gray-400 ${props.classInput}`} {...props.formats} value={props.value} onValueChange={(values) => props.onChange(values, props.name, props.id)} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                    :
                    <input className={`tw-ml-2 tw-text-sm tw-border tw-border-gray-400 tw-rounded-md tw-pt-2 tw-pb-1 tw-px-2 focus:tw-border-blue-500 tw-outline-none tw-transition-colors tw-duration-300 tw-placeholder-gray-400 ${props.classInput}`} type={props.type} value={props.value} name={props.name} id={props.id} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={handleBlur} ref={inputRef} />
            }
        </div>
    )
}

export default FormInline
