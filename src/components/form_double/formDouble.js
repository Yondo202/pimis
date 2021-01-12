import React, { useState } from 'react'
import NumberFormat from 'react-number-format'

function FormDouble(props) {
    const [focus1, setFocus1] = useState(false)
    const [focus2, setFocus2] = useState(false)

    return (
        <div className={`tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x ${props.classAppend}`}>
            <div className="tw-pl-4 tw-py-6 tw-pr-2 tw-w-full sm:tw-w-3/12 tw-h-auto">
                <label className="tw-font-medium">
                    {props.label}
                </label>
            </div>
            <div className="tw-p-2 tw-w-full sm:tw-w-9/12 tw-flex tw-flex-wrap tw-items-center">
                <label className={`tw-inline-block tw-p-2 tw-align-middle ${focus1 && 'tw-font-semibold tw-translate-x-2'} tw-transition tw-duration-300 tw-transform-gpu`}>
                    {props.subLabel1}
                </label>
                <div className="tw-inline-flex tw-items-center tw-ml-8 tw-w-36 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300">
                    <span className="tw-text-lg tw-font-medium tw-mx-2">₮</span>
                    <NumberFormat className="tw-w-28 tw-text-sm tw-bg-transparent tw-outline-none tw-py-2 tw-placeholder-gray-700 tw-placeholder-opacity-50 focus:tw-placeholder-opacity-70" thousandSeparator={true} value={props.value1} name={props.name1} id={props.id} onChange={props.onChangeFormat} onFocus={() => setFocus1(true)} onBlur={() => setFocus1(false)} />
                </div>
                <label className={`tw-w-full tw-p-2 ${focus2 && 'tw-font-semibold tw-translate-x-2'} tw-transition tw-duration-300 tw-transform-gpu`}>
                    {props.subLabel2}
                </label>
                <textarea className="tw-w-full tw-bg-transparent tw-text-sm tw-h-24 tw-mx-2 tw-mb-2 tw-py-2 tw-px-3 tw-outline-none tw-border tw-border-gray-300 tw-rounded-md focus:tw-border-blue-600 tw-transition tw-duration-300 tw-placeholder-gray-700 tw-placeholder-opacity-60 focus:tw-placeholder-opacity-70" value={props.value2} name={props.name2} id={props.id} onChange={props.onChange} onFocus={() => setFocus2(true)} onBlur={() => setFocus2(false)} placeholder={props.placeholder} />
            </div>
        </div>
    )
}

export default FormDouble
