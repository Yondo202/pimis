import React, { useState } from 'react'
import NumberFormat from 'react-number-format'

function FormInline(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className={`tw-flex tw-flex-col tw-flex-nowrap tw-p-4 tw-pl-6 tw-w-full ${props.classAppend}`}>
            <label className={`tw-text-sm tw-text-gray-700 ${focused && 'tw-font-semibold tw--translate-x-1 tw--translate-y-1'} tw-transition tw-duration-300 tw-transform-gpu`}>
                {props.label}
            </label>
            {
                props.type === 'phoneFormat' ?
                    <NumberFormat className="tw-text-sm tw-border tw-border-gray-300 tw-rounded-md tw-mt-1 tw-py-2 tw-px-3 tw-text-gray-700 focus:tw-border-blue-600 tw-outline-none tw-transition tw-duration-300 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" format="(+976) #### ####" mask="_" value={props.value} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                    :
                    <input className="tw-text-sm tw-border tw-border-gray-300 tw-rounded-md tw-mt-1 tw-py-2 tw-px-3 tw-text-gray-700 focus:tw-border-blue-600 tw-outline-none tw-transition tw-duration-300 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" type={props.type} value={props.value} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            }
        </div>
    )
}

export default FormInline
