import React, { useState, useRef, useEffect } from 'react'

function ButtonTooltip(props) {
    const [hovered, setHovered] = useState(false)

    const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 })
    const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 })

    const buttonRef = useRef()
    const tooltipRef = useRef()

    useEffect(() => {
        setButtonSize({ width: buttonRef.current.clientWidth, height: buttonRef.current.clientHeight })
        props.tooltip && setTooltipSize({ width: tooltipRef.current.clientWidth, height: tooltipRef.current.clientHeight })
    }, [])

    const positionStyle = { bottom: `${-tooltipSize.height - 8}px`, left: `${(buttonSize.width - tooltipSize.width) / 2}px` }

    return (
        <button className={`tw-relative tw-rounded-lg hover:tw-shadow-lg focus:tw-outline-none tw-flex tw-items-center ${props.classAppend}`} onClick={props.onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} ref={buttonRef}>
            {props.beforeSVG}

            {
                props.label && <span className={`tw-mx-1 tw-font-medium ${props.classLabel}`}>{props.label}</span>
            }

            {props.afterSVG}

            {
                props.tooltip && <div className={`tw-absolute tw-px-2 tw-py-0.5 tw-rounded-md tw-bg-gray-500 tw-bg-opacity-90 tw-text-white tw-text-xs tw-font-normal tw-italic tw-z-10 ${hovered ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`} ref={tooltipRef} style={positionStyle}>
                    {props.tooltip}
                </div>
            }
        </button>
    )
}

export default ButtonTooltip
