import React, { useState } from 'react'

function FormTextarea(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className={`w-full flex flex-col flex-nowrap sm:flex-row divide-gray-200 sm:divide-x first:rounded-t-lg last:rounded-b-lg ${props.classAppend}`}>
            <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                <label className={`text-sm text-gray-700 ${focused && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                    {props.label}
                </label>
            </div>
            <div className="py-3 px-4 flex-grow sm:w-7/12">
                <textarea className="w-full text-sm text-gray-700 bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 focus:border-blue-600 transition duration-300 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" value={props.value} id={props.id} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} rows={props.rows ? props.rows : '3'} />
            </div>
        </div>
    )
}

export default FormTextarea
