import React from 'react'


export default function Row({ label, value, classAppend, labelClass }) {
    return (
        <div className={`tw-flex ${classAppend}`}>
            <div className={`tw-w-1/2 tw-border-r tw-border-gray-400 tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center ${labelClass}`}>
                {label}
            </div>
            <div className="tw-w-1/2 tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center">
                {value}
            </div>
        </div>
    )
}
