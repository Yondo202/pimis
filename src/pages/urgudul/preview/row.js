import React from 'react'


export default function Row(props) {
    return (
        <div className="tw-flex tw-border tw-border-gray-400">
            <div className="tw-w-1/2 tw-border-r tw-border-gray-400 tw-p-2">
                {props.label}
            </div>
            <div className="tw-w-1/2 tw-p-2">
                {props.value}
            </div>
        </div>
    )
}