import React, { createContext, useState } from 'react'


const FilePreviewContext = createContext()

const initialState = {
    open: false,
    src: '',    //blob URL
}

export function FilePreviewStore(props) {
    const [file, setFile] = useState(initialState)

    return (
        <FilePreviewContext.Provider value={{ file, setFile }}>
            {props.children}
        </FilePreviewContext.Provider>
    )
}

export default FilePreviewContext
