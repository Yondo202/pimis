import React from 'react'


export default function FormInput(props) {
    return (
        <div className="tw-p-2 tw-grid tw-grid-cols-1 tw-gap-y-0.5 tw-w-full">
            <div className="tw-ml-1 tw-font-medium tw-text-15px">
                {props.label}
            </div>
            <input className="tw-bg-white tw-py-1 tw-px-2 focus:tw-outline-none tw-w-full tw-max-w-xs tw-rounded" type="text" />
        </div>
    )
}