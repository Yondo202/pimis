import React, { useState, useEffect, useRef } from 'react'
import QuestionMarkSVG from 'assets/svgComponents/questionMarkSVG'


function HelpPopup({ classAppend, buttonClass, main, list, link }) {
    const [open, setOpen] = useState(false)

    const divRef = useRef()
    const buttonRef = useRef()

    const handleClickOutside = e => {
        if (open && !divRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const [size, setSize] = useState({ width: 0, height: 0 })
    const [buttonLocation, setButtonLocation] = useState()

    useEffect(() => {
        setSize({ width: divRef.current.clientWidth, height: divRef.current.clientHeight })
        setButtonLocation(buttonRef.current.getBoundingClientRect())
    }, [window.innerWidth])

    let popupStyle = { top: 26, left: 11 - size.width / 2 }

    if (size.width > window.innerWidth - 16) {
        popupStyle.left = 8 - buttonLocation?.left
        popupStyle.width = window.innerWidth - 16
        console.log('i run')
    } else if (window.innerWidth - 8 < buttonLocation?.left + 11 + size.width / 2) {
        popupStyle.left = window.innerWidth - size.width - buttonLocation?.left - 8
    }

    return (
        <div className={`tw-relative tw-inline-flex ${classAppend}`}>
            <button className={`tw-rounded-full focus:tw-outline-none hover:tw-shadow-md ${buttonClass ? buttonClass : 'tw-text-gray-600 active:tw-text-gray-800'} tw-transition-colors tw-duration-300`} onClick={() => { setOpen(!open) }} ref={buttonRef}>
                <QuestionMarkSVG style={{ width: 22, height: 22 }} />
            </button>

            <div className={`tw-absolute tw-w-72 tw-bg-indigo-600 tw-bg-opacity-90 tw-text-white tw-font-normal tw-rounded-lg tw-shadow-md tw-p-2 tw-z-10 ${open ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300 tw-text-13px`} style={popupStyle} ref={divRef}>
                <div className="tw-ml-2">
                    {main}
                </div>
                {list &&
                    <ul className="tw-list-disc tw-pl-6">
                        {list.map((item, i) =>
                            <li className="tw-py-1" key={i}>
                                {item}
                            </li>
                        )
                        }
                    </ul>
                }
                {link &&
                    <a className="tw-ml-2 tw-py-1" style={{ color: 'white' }} href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                    </a>
                }
            </div>
        </div>
    )
}

export default HelpPopup
