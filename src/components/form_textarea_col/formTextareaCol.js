import React, { useState } from 'react'

function FormTextareaCol(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className={`w-full flex flex-col flex-nowrap p-4 pl-6 first:rounded-t-lg last:rounded-b-lg ${props.classAppend}`}>
            <label className={`text-sm text-gray-700 mb-2 ${focused && 'font-semibold -translate-x-1 -translate-y-1'} transition duration-300 transform-gpu`}>
                {props.label}
            </label>
            <div>
                <textarea className="w-full h-16 text-sm bg-transparent border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:border-blue-600 outline-none transition duration-300 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" value={props.value} name={props.name} id={props.id} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            </div>
        </div>
    )
}

export default FormTextareaCol
