import React, { createContext, useState } from 'react'


const UrgudulContext = createContext()

export const UrgudulStore = (props) => {
    const [data, setData] = useState({})

    return (
        <UrgudulContext.Provider value={{ data, setData }}>
            {props.children}
        </UrgudulContext.Provider>
    )
}

export default UrgudulContext
