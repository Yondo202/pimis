import React, { useContext, useRef } from 'react'
import CloseSVG from 'assets/svgComponents/closeSVG'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import { Transition } from 'react-spring/renderprops'
import DownloadSVG from 'assets/svgComponents/downloadSVG'


export default function FilePreviewModal() {
    const FilePreviewCtx = useContext(FilePreviewContext)

    const handleClose = () => {
        FilePreviewCtx.setFile({ ...FilePreviewCtx.file, open: false })
    }

    const show = FilePreviewCtx.file.open
    const src = FilePreviewCtx.file.src

    const linkRef = useRef()

    const handleDownload = () => {
        linkRef.current.click()
    }

    return (
        <Transition items={show}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}>
            {
                show => show && (props =>
                    <div style={props} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8">
                        <div className="tw-relative tw-w-full tw-h-full tw-bg-white tw-rounded-md tw-shadow-lg tw-p-2 tw-pt-10 tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2" onClick={handleClose}>
                                <CloseSVG className="tw-w-6 tw-h-6" />
                            </button>

                            <embed src={src} className="tw-w-full tw-h-full tw-object-center tw-object-contain" title="Файлыг нээж харах" />

                            <button className="tw-px-3 tw-py-1 tw-m-8 tw-rounded-lg focus:tw-outline-none hover:tw-shadow-md active:tw-bg-blue-600 tw-bg-blue-500 tw-text-sm text-white tw-flex tw-flex-col tw-items-center" onClick={handleDownload}>
                                <DownloadSVG className="tw-w-10 tw-h-10" />
                                Файлыг татаж авах
                            </button>

                            <a className="tw-absolute tw-invisible" href={src} download ref={linkRef}> </a>
                        </div>
                    </div>
                )
            }
        </Transition>
    )
}