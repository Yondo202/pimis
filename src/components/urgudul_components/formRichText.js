import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        ['blockquote', 'code-block'],
        [{ 'align': [] }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['image', 'link'],
        ['clean'],
    ]
}

function FormRichText() {
    const [value, setValue] = useState('')

    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            tabIndex={0}
            value={value}
            onChange={setValue}
        />
    )
}

export default FormRichText
