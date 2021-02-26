import React, { useState } from 'react'


export default function ButtonHover(props) {
    const [hover, setHover] = useState()

    return (
        <button className="tw-flex tw-items-center tw-h-7 px-2 tw-justify-between hover:tw-bg-blue-100 focus:tw-outline-none" onClick={props.onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <span>
                {props.label}
            </span>
            <span className={`tw-rounded tw-bg-gray-500 tw-px-2 tw-text-white ${hover ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-opacity`} style={{ fontSize: '13px' }}>
                {props.action}
            </span>
        </button>
    )
}