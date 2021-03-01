import React from 'react'


export default function RowMember(props) {
    return (
        <div style={props.style} className="tw-grid tw-grid-cols-4 tw-grid-rows-1 tw-py-1 tw-text-sm even:tw-bg-blue-50 tw-transition-colors">
            <div className="tw-px-2">
                {props.member?.lastname}
            </div>
            <div className="tw-px-2">
                {props.member?.firstname}
            </div>
            <div className="tw-px-2">
                {props.member?.phone}
            </div>
            <button className="tw-rounded tw-bg-gray-600 tw-leading-tight tw-text-white active:tw-bg-gray-500 tw-transition-colors focus:tw-outline-none tw-w-16 tw-place-self-center" style={{ fontSize: '13px', padding: '1px 0' }} onClick={props.onClick}>
                {props.action}
            </button>
        </div>
    )
}