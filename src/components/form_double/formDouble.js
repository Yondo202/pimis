import React, { useState } from 'react'
import NumberFormat from 'react-number-format'

function FormDouble(props) {
    const [focus1, setFocus1] = useState(false)
    const [focus2, setFocus2] = useState(false)

    return (
        <div className={`w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x ${props.classAppend}`}>
            <div className="pl-4 py-6 pr-2 w-full sm:w-3/12 h-auto">
                <label className="font-medium">
                    {props.label}
                </label>
            </div>
            <div className="p-2 w-full sm:w-9/12 flex flex-wrap items-center">
                <label className={`inline-block p-2 align-middle ${focus1 && 'font-semibold translate-x-2'} transition duration-300 transform-gpu`}>
                    {props.subLabel1}
                </label>
                <div className="inline-flex items-center ml-8 w-36 border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300">
                    <span className="text-lg font-medium mx-2">₮</span>
                    <NumberFormat className="w-28 text-sm bg-transparent outline-none py-2 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" thousandSeparator={true} value={props.value1} name={props.name1} id={props.id} onChange={props.onChangeFormat} onFocus={() => setFocus1(true)} onBlur={() => setFocus1(false)} />
                </div>
                <label className={`w-full p-2 ${focus2 && 'font-semibold translate-x-2'} transition duration-300 transform-gpu`}>
                    {props.subLabel2}
                </label>
                <textarea className="w-full text-sm h-24 mx-2 mb-2 py-2 px-3 outline-none border border-gray-300 rounded-md focus:border-blue-600 transition duration-300 placeholder-gray-700 placeholder-opacity-50 focus:placeholder-opacity-70" value={props.value2} name={props.name2} id={props.id} onChange={props.onChange} onFocus={() => setFocus2(true)} onBlur={() => setFocus2(false)} placeholder={props.placeholder} />
            </div>
        </div>
    )
}

export default FormDouble
