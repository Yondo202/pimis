import React from 'react'


export default function RowHtml(props) {
    return (
        <div className="tw-flex tw-flex-wrap">
            <div className="tw-w-full tw-border tw-border-gray-400 tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center">
                {props.label}
            </div>
            <div className="tw-w-full tw-border tw-border-gray-400 tw-p-2">
                <div dangerouslySetInnerHTML={{ __html: props.html }} className="tw-bg-blue-50 tw-p-2" />
            </div>
        </div>
    )
}