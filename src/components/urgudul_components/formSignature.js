import CloseSVG from 'assets/svgComponents/closeSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import React, { useEffect, useRef } from 'react'
import SignaturePad from 'react-signature-canvas'


function FormSignature({ value, index, setter, name, classAppend, classCanvas, canvasProps }) {
    const sigCanvasRef = useRef()

    const emptyDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

    useEffect(() => {
        sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png') === emptyDataURL && sigCanvasRef.current.fromDataURL(value)
    }, [value])

    const handleDrawSignature = () => {
        setter(name, sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png'), index)
    }

    const handleClearCanvas = () => {
        sigCanvasRef.current.clear()
        setter(name, null, index)
    }

    return (
        <div className={`tw-flex tw-items-center ${classAppend}`}>
            <SignaturePad canvasProps={{ className: `tw-border tw-border-gray-400 tw-rounded tw-shadow ${classCanvas}`, ...canvasProps }} ref={sigCanvasRef} onEnd={handleDrawSignature} />

            <ButtonTooltip tooltip="Арилгах" beforeSVG={<CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors tw-duration-300" />} onClick={handleClearCanvas} classAppend="tw-mx-2" classButton="tw-text-red-500 active:tw-text-red-600" />
        </div>
    )
}

export default FormSignature
