import React, { useState } from 'react'

function FormTextareaRow(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="flex py-2 h-22">
            <div className="w-32 p-2 pl-4">
                <label className={`${focused && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                    {props.label}
                </label>
            </div>
            <textarea className="flex-grow h-14 m-2 py-1 px-2 outline-none border border-gray-300 rounded-md focus:border-blue-600 transition duration-300" value={props.value} name={props.name} onChange={props.onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        </div>
    )
}

export default FormTextareaRow
