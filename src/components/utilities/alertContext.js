import React, { createContext, useState } from 'react'


const AlertContext = createContext()

const initialState = {
    variant: '',    //success or error
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
