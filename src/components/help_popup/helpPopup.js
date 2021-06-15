import React, { useState, useEffect, useRef } from 'react'
import QuestionMarkSVG from 'assets/svgComponents/questionMarkSVG'


function HelpPopup(props) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const divRef = useRef()
    const buttonRef = useRef()

    const handleClickOutside = e => {
        if (open && !divRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    const [size, setSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        setSize({ width: divRef.current.clientWidth, height: divRef.current.clientHeight })
    }, [])

    let positionStyle = {}

    switch (props.position) {
        case 'top':
            positionStyle = { top: `${-size.height - 4}px`, left: `${-size.width / 2 + 12}px` }
            break
        case 'bottom':
            positionStyle = { bottom: `${-size.height - 4}px`, left: `${-size.width / 2 + 12}px` }
            break
        case 'left':
            positionStyle = { top: `${-size.height / 2 + 12}px`, left: `${-size.width - 4}px` }
            break
        case 'right':
            positionStyle = { top: `${-size.height / 2 + 12}px`, right: `${-size.width - 4}px` }
            break
        case 'top-left':
            positionStyle = { top: `${-size.height - 2}px`, left: `${-size.width - 2}px` }
            break
        case 'top-right':
            positionStyle = { top: `${-size.height - 2}px`, right: `${-size.width - 2}px` }
            break
        case 'bottom-left':
            positionStyle = { bottom: `${-size.height - 2}px`, left: `${-size.width - 2}px` }
            break
        default:
            positionStyle = { bottom: `${-size.height - 2}px`, right: `${-size.width - 2}px` }
            break
    }

    return (
        <div className={`tw-relative tw-flex ${props.classAppend}`}>
            <button className={`tw-rounded-full focus:tw-outline-none hover:tw-shadow-md ${props.buttonClass ? props.buttonClass : 'tw-text-gray-600 active:tw-text-gray-800'} tw-transition-colors tw-duration-300`} onClick={() => { setOpen(!open) }} ref={buttonRef}>
                <QuestionMarkSVG style={{ width: 22, height: 22 }} />
            </button>

            <div className={`tw-absolute ${props.popupClass || 'tw-w-72'} tw-bg-indigo-600 tw-bg-opacity-90 tw-text-white tw-font-normal tw-rounded-lg tw-shadow-md tw-p-2 tw-z-10 ${open ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`} style={{ ...positionStyle, fontSize: '13px' }} ref={divRef}>
                <div className="tw-ml-2">
                    {props.main}
                </div>
                {props.list &&
                    <ul className="tw-list-disc tw-pl-6 tw-mt-1">
                        {
                            props.list.map((item, i) =>
                                <li className="tw-py-1" key={i}>
                                    {item}
                                </li>
                            )
                        }
                    </ul>
                }

            </div>
        </div>
    )
}

export default HelpPopup
