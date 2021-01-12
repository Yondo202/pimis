import CheckSVG from 'assets/svgComponents/checkSVG'
import CloseSVG from 'assets/svgComponents/closeSVG'
import AlertContext from 'components/utilities/alertContext'
import React, { useContext, useEffect } from 'react'


const classTheme = {
    bgColor: {
        success: 'tw-bg-green-500',
        error: 'tw-bg-red-500',
    },
    btnColor: {
        success: 'tw-bg-green-50',
        error: 'tw-bg-red-50',
    },
    btnActiveColor: {
        success: 'tw-bg-green-100',
        error: 'tw-bg-red-100'
    }
}

function AlertDialog() {
    const AlertCtx = useContext(AlertContext)
    const alert = AlertCtx.alert
    const setAlert = AlertCtx.setAlert

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ ...alert, open: false })
        }, 3000)

        return () => clearTimeout(timer)
    }, [alert, alert.open, setAlert])

    const classAppend = `${alert.open ? 'tw-bottom-8 sm:tw-bottom-16' : 'tw--bottom-8 sm:tw--bottom-16'}`

    const closeAlert = () => {
        setAlert({ ...alert, open: false })
    }

    return (
        <div className={`tw-fixed tw-w-full tw-flex tw-justify-center tw-transition-all tw-duration-500 ${classAppend}`}>
            <div className={`tw-inline-flex tw-flex-grow tw-mx-2 sm:tw-max-w-lg sm:tw-mx-0 tw-shadow-md tw-rounded-lg tw-p-2 tw-z-10 ${classTheme.bgColor[alert.variant]}`}>
                <p className="tw-ml-2 tw-flex-grow tw-text-center tw-text-white tw-font-semibold">
                    {alert.msg}
                </p>
                <button className={`tw-ml-2 tw-rounded-lg focus:tw-outline-none ${classTheme.btnColor[alert.variant]} active:${classTheme.btnActiveColor[alert.variant]}`} onClick={closeAlert}>
                    {
                        {
                            'success': <CheckSVG className="tw-w-6 tw-h-6 tw-text-green-500" />,
                            'error': <CloseSVG className="tw-w-6 tw-h-6 tw-text-red-500" />,
                        }[alert.variant]
                    }
                </button>
            </div>
        </div >
    )
}

export default AlertDialog
