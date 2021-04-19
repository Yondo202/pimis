import React, { useContext, useEffect } from 'react'
import CloseSVG from 'assets/svgComponents/closeSVG'
import AlertContext from 'components/utilities/alertContext'
import { Transition } from 'react-spring/renderprops'


const classTheme = {
    bgColor: {
        success: 'tw-bg-green-500',
        error: 'tw-bg-red-500',
        normal: 'tw-bg-indigo-500',
    },
    btnColor: {
        success: 'tw-bg-green-50',
        error: 'tw-bg-red-50',
        normal: 'tw-bg-indigo-50'
    },
    btnActiveColor: {
        success: 'tw-bg-green-100',
        error: 'tw-bg-red-100',
        normal: 'tw-bg-indigo-100',
    },
    svgColor: {
        success: 'tw-text-green-500',
        error: 'tw-text-red-500',
        normal: 'tw-text-indigo-500',
    },
}

function AlertDialog() {
    const AlertCtx = useContext(AlertContext)
    const alert = AlertCtx.alert
    const setAlert = AlertCtx.setAlert

    const show = alert.open

    useEffect(() => {
        show && setTimeout(() => {
            setAlert({ ...alert, open: false })
        }, 3000)
    }, [alert])

    const closeAlert = () => {
        setAlert({ ...alert, open: false })
    }

    return (
        <Transition items={show}
            from={{ bottom: window.innerWidth < 640 ? '-32px' : '-48px' }}
            enter={{ bottom: window.innerWidth < 640 ? '32px' : '48px' }}
            leave={{ bottom: window.innerWidth < 640 ? '-32px' : '-48px' }}>
            {
                show => show && (props =>
                    <div style={props} className="tw-fixed tw-w-full tw-flex tw-justify-center tw-z-50">
                        <div className={`tw-inline-flex tw-items-center tw-flex-grow tw-mx-2 tw-text-sm sm:tw-max-w-lg sm:tw-mx-0 tw-shadow-md tw-rounded-lg tw-p-1.5 ${classTheme.bgColor[alert.variant]}`}>
                            <p className="tw-ml-2 tw-flex-grow tw-text-center tw-text-white tw-font-semibold">
                                {alert.msg}
                            </p>
                            <button className={`tw-ml-2 tw-rounded-lg focus:tw-outline-none ${classTheme.btnColor[alert.variant]} active:${classTheme.btnActiveColor[alert.variant]}`} onClick={closeAlert}>
                                <CloseSVG className={`tw-w-6 tw-h-6 ${classTheme.svgColor[alert.variant]}`} />
                            </button>
                        </div>
                    </div >
                )
            }
        </Transition>
    )
}

export default AlertDialog
