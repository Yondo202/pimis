import React, { useState, useEffect } from 'react'
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

function FormRichText({ label, HelpPopup, modules, value, name, index, setter, invalid, classAppend, classLabel, classQuill, height }) {
    const [quillModules, setQuillModules] = useState({})

    useEffect(() =>
        setQuillModules(prev => {
            if (modules === 'full') return modulesFull
            if (modules === 'small') return modulesSmall
            if (modules instanceof Object) return modules
            return prev
        }), [modules])

    return (
        <div className={classAppend}>
            {label &&
                <div className={`tw-flex tw-items-center tw-pr-2 tw-pt-2 ${classLabel}`}>
                    <span className={`tw-text-sm ${invalid && 'tw-text-red-500'} tw-transition-colors`}>
                        {label}
                    </span>

                    {HelpPopup && HelpPopup}
                </div>
            }

            <div className={`tw-pr-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden ${classQuill}`} style={{ height: height, minHeight: '128px', maxHeight: '768px' }}>
                <ReactQuill theme="snow" id={`react-quill-${name}-${index}`} modules={quillModules} tabIndex={0} value={value ?? ''} onChange={content => setter(name, content, index)} />
            </div>
        </div>
    )
}

export default FormRichText
