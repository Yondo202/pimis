import React from 'react'

export default function RowImage(props) {
    return (
        <div className="tw-flex tw-border-t tw-border-b tw-border-gray-400 first:tw-border-t-0 last:tw-border-b-0">
            <div className="tw-w-1/2 tw-border-r tw-border-gray-400 tw-px-2 tw-pt-1.5 tw-pb-1">
                {props.label}
            </div>
            <div className="tw-w-1/2 tw-p-2">
                <img src={props.src} alt="гарын үсэг" />
            </div>
        </div>
    )
}