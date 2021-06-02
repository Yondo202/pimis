import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import './reactQuill.css'


const modulesFull = {
    toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        ['blockquote', 'code-block'],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['link', 'image', 'video'],
        ['clean'],
    ]
}

const modulesSmall = {
    toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        ['link'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean'],
    ]
}

function FormRichText(props) {
    const handleOnChange = (content) => {
        props.setForm(props.name, content, props.id)
    }

    let modules
    switch (props.modules) {
        case 'full':
            modules = modulesFull
            break
        case 'small':
            modules = modulesSmall
            break
        default:
            if (typeof props.modules === 'object') modules = props.modules
            break
    }

    return (
        <ReactQuill theme="snow" id={`react-quill-${props.name}-${props.id}`} modules={modules} tabIndex={0} value={props.value} onChange={content => handleOnChange(content)} />
    )
}

export default FormRichText
