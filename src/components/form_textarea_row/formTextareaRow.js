import React, { useState } from 'react'

function FormTextareaRow(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="tw-flex tw-py-2 tw-h-22">
            <div className="tw-w-32 tw-p-2 tw-pl-4">
                <label className={`${focused && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                    {props.label}
                </label>
            </div>
            <textarea className="tw-flex-grow tw-h-14 tw-m-2 tw-py-1 tw-px-2 tw-outline-none tw-border tw-border-gray-300 tw-rounded-md focus:tw-border-blue-600 tw-transition tw-duration-300" value={props.value} name={props.name} onChange={props.onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        </div>
    )
}

export default FormTextareaRow
