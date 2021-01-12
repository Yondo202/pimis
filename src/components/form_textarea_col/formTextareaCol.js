import React, { useState } from 'react'

function FormTextareaCol(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className={`tw-w-full tw-flex tw-flex-col tw-flex-nowrap tw-p-4 tw-pl-6 first:tw-rounded-t-lg last:tw-rounded-b-lg ${props.classAppend}`}>
            <label className={`tw-text-sm tw-text-gray-700 tw-mb-2 ${focused && 'tw-font-semibold tw--translate-x-1 tw--translate-y-1'} tw-transition tw-duration-300 tw-transform-gpu`}>
                {props.label}
            </label>
            <div>
                <textarea className="tw-w-full tw-h-16 tw-text-sm tw-bg-transparent tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-text-gray-700 focus:tw-border-blue-600 tw-outline-none tw-transition tw-duration-300 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" value={props.value} name={props.name} id={props.id} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            </div>
        </div>
    )
}

export default FormTextareaCol
