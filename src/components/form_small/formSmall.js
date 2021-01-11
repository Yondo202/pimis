import React, { useState } from 'react'
import NumberFormat from 'react-number-format'

function FormSmall(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-lg last:rounded-b-lg">
            <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                <label className={`text-sm text-gray-700 ${focused && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                    {props.label}
                </label>
            </div>
            <div className="py-3 px-4 flex-grow sm:w-7/12">
                {
                    props.type === "numberFormat" ?
                        <NumberFormat className="w-24 bg-transparent text-sm text-gray-700 outline-none border border-gray-300 rounded-md py-2 px-3 focus:border-blue-600 transition duration-300 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" thousandSeparator={true} value={props.value} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                        :
                        <input className={`${props.type === 'text' ? 'w-full' : (props.type === 'date' ? 'w-40' : 'w-24')} bg-transparent text-sm text-gray-700 outline-none border border-gray-300 rounded-md py-2 px-3 focus:border-blue-600 transition duration-300 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70`} type={props.type} value={props.value} name={props.name} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                }
                <p className="text-xs italic opacity-80 text-gray-700 align-bottom mt-2">{props.instruction}</p>
            </div>
        </div>
    )
}

export default FormSmall
