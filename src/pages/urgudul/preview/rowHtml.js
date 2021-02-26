import React from 'react'


export default function RowHtml(props) {
    return (
        <>
            <div className="tw-w-full tw-border-t tw-border-b tw-border-gray-400 first:tw-border-t-0 tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center">
                {props.label}
            </div>
            <div className={`tw-w-full tw-p-2 ${props.borderBottom && 'tw-border-b tw-border-gray-400'}`} >
                <div dangerouslySetInnerHTML={{ __html: props.html }} className="tw-bg-blue-50 tw-p-2" />
            </div>
        </>
    )
}