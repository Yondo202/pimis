import React, { useState, useEffect, useRef } from 'react'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import SelectorSVG from 'assets/svgComponents/selectorSVG'
import axios from 'axiosbase'


function FormSelect(props) {
    const [open, setOpen] = useState(false)

    const [fetch, setFetch] = useState([])

    useEffect(() => {
        if (props.data) {
            setFetch(props.data)
        } else {
            props.api &&
                axios.get(props.api)
                    .then(res => {
                        console.log(res.data)
                        const data = props.keys.reduce((a, v) => a[v], res.data)
                        setFetch(data)
                    }).catch(err => {
                        console.log(err.response?.data)
                    })
        }
    }, [props.data])

    const handleClickButton = () => {
        setOpen(!open)
    }

    const handleSelectId = (id) => {
        props.setForm(props.name, id, props.id)
        setOpen(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const divRef = useRef()
    const buttonRef = useRef()

    const handleClickOutside = e => {
        if (open && !divRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    return (
        <div className={`tw-relative tw-pl-10 tw-pr-3 tw-pt-8 tw-pb-3 tw-flex tw-flex-col ${props.classAppend}`}>
            <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-font-medium tw-whitespace-nowrap ${open ? 'tw-text-sm tw-top-2 tw-left-8' : 'tw-text-xs tw-top-6 tw-left-12'} tw-transition-all tw-duration-300`}>
                {props.label}
            </label>

            <SelectorSVG className={`tw-absolute tw-w-5 tw-h-5 tw-top-10 tw-left-3 tw-flex-shrink-0 ${open ? 'tw-text-blue-500' : 'tw-text-gray-600'} tw-transition-colors tw-duration-300`} />

            <button className={`tw-h-8.5 tw-flex tw-items-center tw-text-sm tw-border tw-rounded-md tw-pt-2 tw-pb-1 tw-px-2 focus:tw-outline-none ${open ? 'tw-border-blue-500' : 'tw-border-gray-400'} tw-transition-colors tw-duration-300`} onClick={handleClickButton} ref={buttonRef}>
                <span className="tw-h-5">
                    {fetch.filter(obj => obj.id === props.value)[0]?.[props.displayName]}
                </span>

                <ChevronDownSVG className={`tw-w-4 tw-h-4 tw-ml-auto ${open ? 'tw-text-blue-500' : 'tw-text-gray-500'} tw-transition-colors tw-duration-300`} />
            </button>

            <div className={`tw-text-sm tw-rounded-md tw-shadow-sm tw-border tw-border-gray-400 tw-divide-y tw-divide-dashed tw-overflow-y-auto ${open ? 'tw-visible tw-opacity-100 tw-h-48 tw-mt-2' : 'tw-invisible tw-opacity-0 tw-h-0'} tw-transition-all tw-duration-300`} ref={divRef}>
                {
                    fetch.map((item, i) =>
                        <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-gray-50' onMouseDown={() => handleSelectId(item.id)} key={item.id}>
                            <span className="tw-font-medium tw-pr-2">{i + 1}.</span>
                            {item[props.displayName]}
                        </div>)
                }
            </div>
        </div>
    )
}

export default FormSelect
