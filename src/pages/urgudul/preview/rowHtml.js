import React from 'react'


export default function RowHtml(props) {
    return (
        <div className="tw-flex tw-flex-wrap">
            <div className="tw-w-full tw-border tw-border-gray-400 tw-p-2">
                {props.label}
            </div>
            <div dangerouslySetInnerHTML={{ __html: props.html }} className="tw-w-full tw-border tw-border-gray-400 tw-p-2" />
        </div>
    )
}