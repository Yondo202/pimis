import React, { useState } from 'react'
import NumberFormat from 'react-number-format'

function FormInline(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className={`flex flex-col flex-nowrap p-4 pl-6 w-full ${props.classAppend}`}>
            <label className={`text-sm text-gray-700 ${focused && 'font-semibold -translate-x-1 -translate-y-1'} transition duration-300 transform-gpu`}>
                {props.label}
            </label>
            {
                props.type === 'phoneFormat' ?
                    <NumberFormat className="text-sm border border-gray-300 rounded-md mt-1 py-2 px-3 text-gray-700 focus:border-blue-600 outline-none transition duration-300 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" format="(+976) #### ####" mask="_" value={props.value} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                    :
                    <input className="text-sm border border-gray-300 rounded-md mt-1 py-2 px-3 text-gray-700 focus:border-blue-600 outline-none transition duration-300 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" type={props.type} value={props.value} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            }
        </div>
    )
}

export default FormInline
