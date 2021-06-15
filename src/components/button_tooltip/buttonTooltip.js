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
        <div className={`tw-relative tw-inline-flex ${props.classAppend}`}>
            <button className={`tw-rounded hover:tw-shadow-md focus:tw-outline-none tw-flex tw-items-center ${props.classButton} tw-transition-colors`} onClick={props.onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} ref={buttonRef}>
                {props.beforeSVG}

                {props.label &&
                    <span className={`tw-mx-1 ${props.classLabel}`}>{props.label}</span>
                }

                {props.afterSVG}
            </button>
            {props.tooltip &&
                <div className={`tw-absolute tw-px-2 tw-py-0.5 tw-rounded-md tw-bg-gray-600 tw-bg-opacity-90 tw-text-white tw-text-xs tw-font-normal tw-italic tw-text-center tw-z-10 ${hovered ? 'tw-visible tw-opacity-100 tw-block' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`} ref={tooltipRef} style={positionStyle}>
                    {props.tooltip}
                </div>
            }
        </div>
    )
}

export default ButtonTooltip
