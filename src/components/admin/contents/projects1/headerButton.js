import React from 'react'
import { translation } from 'components/admin/contents/projects1/ProjectHandle'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'


export default function HeaderButton(props) {
    return (
        <button className="tw-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-md active:tw-bg-gray-100 focus:tw-outline-none" onClick={() => props.sortBy(props.name)}>
            <span className="tw-text-sm tw-font-medium">
                {translation[props.name]}
            </span>

            <ChevronDownSVG className={`tw-w-4 tw-h-4 tw-flex-shrink-0 tw-ml-1 tw-transform ${props.sort.by === props.name && !props.sort.asc && 'tw-rotate-180'}`} />
        </button>
    )
}