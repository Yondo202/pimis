import React, { createContext, useState } from 'react'


const AlertContext = createContext()

const initialState = {
    open: false,
    variant: '',    //success, error, normal
    msg: '',
}

export function AlertStore(props) {
    const [alert, setAlert] = useState(initialState)

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertContext
