import { useState, useEffect, useContext } from 'react'
import urgudulContext from 'components/utilities/urgudulContext'

const useStateContext = (storageKey, initialState) => {
    const urgudulCtx = useContext(urgudulContext)

    const [value, setValue] = useState(
        urgudulCtx.data[storageKey] || initialState
    )

    useEffect(() => {
        urgudulCtx.setData({ ...urgudulCtx.data, [storageKey]: value })
    }, [value])

    return [value, setValue]
}

export default useStateContext
