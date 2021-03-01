import React, { useState } from 'react'


export default function ButtonHover(props) {
    const [hover, setHover] = useState()

    return (
        <button style={props.style} className="tw-flex tw-items-center tw-h-6 tw-px-1 tw-justify-between tw-text-sm hover:tw-bg-gray-100 focus:tw-outline-none tw-transition-colors" onClick={props.onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <span>
                {props.label}
            </span>
            <span className={`tw-rounded tw-bg-gray-500 tw-h-4 tw-leading-tight tw-px-2 tw-text-white ${hover ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-opacity tw-duration-300`} style={{ fontSize: '13px' }}>
                {props.action}
            </span>
        </button>
    )
}