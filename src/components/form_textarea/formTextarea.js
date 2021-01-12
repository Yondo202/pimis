import React, { useState } from 'react'

function FormTextarea(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className={`tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-gray-200 sm:tw-divide-x first:tw-rounded-t-lg last:tw-rounded-b-lg ${props.classAppend}`}>
            <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                <label className={`tw-text-sm tw-text-gray-700 ${focused && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                    {props.label}
                </label>
            </div>
            <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                <textarea className="tw-w-full tw-text-sm tw-text-gray-700 tw-bg-transparent tw-outline-none tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 focustw-border-blue-600 tw-transition tw-duration-300 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" value={props.value} id={props.id} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} rows={props.rows ? props.rows : '3'} />
            </div>
        </div>
    )
}

export default FormTextarea
