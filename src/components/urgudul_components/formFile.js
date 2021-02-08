import React, { useState } from 'react'
import UploadSVG from 'assets/svgComponents/uploadSVG'
import FileCard from 'pages/attachments/fileCard'


export default function FormFile(props) {
    const [focused, setFocused] = useState(false)

    return (
        <div className={`tw-relative tw-px-3 tw-pt-8 tw-pb-3.5 tw-flex tw-items-center ${props.classAppend}`}>
            <label className={`tw-absolute tw-px-1 ${props.classLabel ? props.classLabel : 'tw-bg-white'} tw-rounded-full tw-font-medium tw-whitespace-nowrap ${focused ? 'tw-text-sm tw-top-2 tw-left-8' : 'tw-text-xs tw-top-6 tw-left-12'} tw-transition-all tw-duration-300`}>
                {props.label}
            </label>

            <UploadSVG className={`tw-w-5 tw-h-5 tw-flex-shrink-0 ${focused ? 'tw-text-blue-500' : 'tw-text-gray-600'} tw-transition-colors tw-duration-300`} />

            <input className="tw-absolute tw-invisible" type="file" />

            {
                <input className={`tw-h-8.5 tw-ml-2 tw-text-sm tw-bg-transparent tw-border tw-border-gray-400 tw-rounded-md tw-pt-2 tw-pb-1 tw-px-2 focus:tw-border-blue-500 tw-outline-none tw-transition-colors tw-duration-300 tw-placeholder-gray-400 ${props.classInput}`} type="file" value={props.value} name={props.name} id={props.id} onChange={props.onChange} placeholder={props.placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            }

            {
                props.file &&
                <FileCard name={props.file.name} type={props.file.type.split('/')[1]} size={props.file.size} removeFile={() => { }} />
            }
        </div>
    )
}