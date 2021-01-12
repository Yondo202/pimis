import React, { useState } from 'react'
import NumberFormat from 'react-number-format'

function FormSmall(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-lg last:tw-rounded-b-lg">
            <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                <label className={`tw-text-sm tw-text-gray-700 ${focused && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                    {props.label}
                </label>
            </div>
            <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                {
                    props.type === "numberFormat" ?
                        <NumberFormat className="tw-w-24 tw-bg-transparent tw-text-sm tw-text-gray-700 tw-outline-none tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 focus:tw-border-blue-600 tw-transition tw-duration-300 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" thousandSeparator={true} value={props.value} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                        :
                        <input className={`${props.type === 'text' ? 'tw-w-full' : (props.type === 'date' ? 'tw-w-40' : 'tw-w-24')} tw-bg-transparent tw-text-sm tw-text-gray-700 tw-outline-none tw-border tw-border-gray-300 tw-rounded-md tw-py-2 tw-px-3 tw-focus:border-blue-600 tw-transition tw-duration-300 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70`} type={props.type} value={props.value} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                }
                <p className="tw-text-xs tw-italic tw-opacity-80 tw-text-gray-700 tw-align-bottom tw-mt-2">{props.instruction}</p>
            </div>
        </div>
    )
}

export default FormSmall
