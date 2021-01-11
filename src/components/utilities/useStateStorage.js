import { useState, useEffect } from 'react'

const useStateStorage = (storageKey, initialState) => {
    const [value, setValue] = useState(
        JSON.parse(sessionStorage.getItem(storageKey)) || initialState
    )

    useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify(value))
    }, [value])

    return [value, setValue];
}

export default useStateStorage
