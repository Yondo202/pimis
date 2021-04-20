import React, { useContext, useEffect, useRef, useState } from 'react'
import CloseSVG from 'assets/svgComponents/closeSVG'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import { animated, Transition } from 'react-spring/renderprops'
import DownloadSVG from 'assets/svgComponents/downloadSVG'


const initialSize = {
    width: '0px',
    height: '0px',
}

export default function FilePreviewModal() {
    const FilePreviewCtx = useContext(FilePreviewContext)

    const handleClose = () => {
        FilePreviewCtx.setFile({ ...FilePreviewCtx.file, open: false })
    }

    const handleOnDestroyed = () => {
        setSize(initialSize)
        setSizeFull(false)
        setShowDialog(true)
    }

    const show = FilePreviewCtx.file.open
    const src = FilePreviewCtx.file.src

    const linkRef = useRef()

    const handleDownload = () => {
        linkRef.current.click()
    }

    const modalRef = useRef()

    const handleClickOutside = (e) => {
        if (show && !modalRef.current.contains(e.target)) {
            handleClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const [size, setSize] = useState(initialSize)
    const [sizeFull, setSizeFull] = useState(false)

    const iframeRef = useRef()

    const handleLoad = () => {
        setShowDialog(false)
        const width = iframeRef.current.contentWindow.document.body.scrollWidth
        const height = iframeRef.current.contentWindow.document.body.scrollHeight
        const hasSize = width && height
        if (!hasSize) setSizeFull(true)
        setSize({
            width: hasSize ? `${width}px` : '100%',
            height: hasSize ? `${height}px` : '100%',
        })
    }

    const [showDialog, setShowDialog] = useState(true)

    return (
        <Transition items={show}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            onDestroyed={!show && handleOnDestroyed}>
            {show => show && (props =>
                <animated.div style={props} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-50 tw-p-2 sm:tw-p-8">
                    <div className={`tw-relative tw-bg-white tw-rounded-md tw-shadow-lg tw-p-2 tw-pt-10 tw-inline-flex tw-flex-col tw-justify-center tw-items-center ${sizeFull && 'tw-w-full tw-h-full'} tw-max-w-full tw-max-h-full tw-z-50`} ref={modalRef}>
                        <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-z-10 tw-top-2 tw-right-2" onClick={handleClose}>
                            <CloseSVG className="tw-w-6 tw-h-6" />
                        </button>

                        <iframe src={src} className="tw-object-contain tw-object-center tw-overflow-auto tw-max-w-full tw-max-h-full" width={size.width} height={size.height} onLoad={handleLoad} title="Файлыг нээж харах" ref={iframeRef} />

                        {showDialog &&
                            <div className="tw-p-4 tw-w-72 tw-text-gray-700 tw-text-sm text-center">
                                Хавсаргасан файл гарч ирэхгүй бол доорх товчоор татаж авна уу.
                            </div>
                        }

                        <button className="tw-px-2 tw-py-1 tw-m-2 tw-mt-4 tw-rounded-lg focus:tw-outline-none hover:tw-shadow-md active:tw-bg-blue-600 tw-bg-blue-500 tw-text-xs tw-text-white tw-flex tw-flex-col tw-items-center" onClick={handleDownload}>
                            <DownloadSVG className="tw-w-8 tw-h-8" />
                            Файлыг татаж авах
                        </button>

                        <a className="tw-absolute tw-invisible" href={src} download ref={linkRef}> </a>
                    </div>
                </animated.div>
            )}
        </Transition>
    )
}
