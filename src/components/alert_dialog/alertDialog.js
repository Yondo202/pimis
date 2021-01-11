import CheckSVG from 'assets/svgComponents/checkSVG'
import CloseSVG from 'assets/svgComponents/closeSVG'
import AlertContext from 'components/utilities/alertContext'
import React, { useContext } from 'react'

function AlertDialog() {
    const AlertCtx = useContext(AlertContext)
    const alert = AlertCtx.alert
    const setAlert = AlertCtx.setAlert

    return (
        <div className="fixed right-1/2 transform translate-x-1/2 bottom-12 border border-red-500 w-full max-w-xl mx-2 h-10">
            <p className="">
                {alert.msg}
            </p>
            <button className="">
                {
                    {
                        'success': <CheckSVG className="w-5 h-5" />,
                        'error': <CloseSVG className="w-5 h-5" />,
                    }[alert.variant]
                }
            </button>

        </div>
    )
}

export default AlertDialog
