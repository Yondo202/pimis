import React from 'react'


export default function Row(props) {
    return (
        <div className="tw-flex">
            <div className="tw-w-1/2 tw-border-r tw-border-gray-400 tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center">
                {props.label}
            </div>
            <div className="tw-w-1/2 tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center">
                {props.value}
            </div>
        </div>
    )
}