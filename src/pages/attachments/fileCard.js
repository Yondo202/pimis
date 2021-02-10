import React from 'react'
import CloseSVG from 'assets/svgComponents/closeSVG'
import DownloadSVG from 'assets/svgComponents/downloadSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'


const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
function bytesFormat(x) {
    let l = 0, n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
        n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

export default function FileCard(props) {
    return (
        <div className={`tw-inline-flex tw-bg-indigo-50 tw-rounded-lg ${props.classAppend} ${props.uploading && 'tw-animate-pulse'}`}>
            <div className="tw-relative">
                <svg className="tw-h-20" viewBox="0 0 285 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.725098 20.775C0.725098 9.78453 9.63483 0.875 20.6251 0.875H194.75L284.3 90.425V329.225C284.3 340.215 275.39 349.125 264.4 349.125H20.6251C9.63483 349.125 0.725098 340.215 0.725098 329.225V20.775Z" fill="url(#paint0_linear)" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M194.75 0.875V70.525C194.75 81.5153 203.66 90.425 214.65 90.425H284.3L194.75 0.875Z" fill="url(#paint1_linear)" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="0.725098" y1="0.875" x2="0.725098" y2="349.125" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FFDFB8" />
                            <stop offset="1" stopColor="#FFCA8A" />
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="194.75" y1="0.875" x2="194.75" y2="90.425" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FFCC8F" />
                            <stop offset="1" stopColor="#FFBB69" />
                        </linearGradient>
                    </defs>
                </svg>

                <span className="tw-absolute tw-top-1/2 tw-transform tw--translate-y-1/2 tw-left-1/2 tw--translate-x-1/2 tw-text-sm tw-font-medium tw-w-14 tw-text-center tw-truncate tw-uppercase">
                    {props.name?.split('.').pop()}
                </span>
                <span className="tw-absolute tw-bottom-1 tw-left-1/2 tw-transform tw--translate-x-1/2 tw-whitespace-nowrap tw-text-xs tw-font-medium">
                    ({bytesFormat(props.size)})
                </span>
            </div>

            <div className="tw-p-2 tw-pr-0 tw-text-xs tw-font-medium tw-w-28 tw-h-20 tw-break-words tw-overflow-ellipsis tw-overflow-hidden tw-leading-tight">
                {props.name}
            </div>

            <div className={`tw-h-20 tw-flex tw-flex-col tw-justify-between tw-items-center ${props.uploading && 'tw-invisible'}`}>
                <ButtonTooltip tooltip="Устгах" beforeSVG={<CloseSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} onClick={props.removeFile} classAppend="tw-p-0.5" classButton="tw-text-red-400 active:tw-text-red-500" />

                <ButtonTooltip tooltip="Нээх" beforeSVG={<DownloadSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} onClick={props.downloadFile} classAppend="tw-mb-1 tw-p-0.5" classButton="tw-text-blue-400 active:tw-text-blue-500" />
            </div>
        </div>
    )
}