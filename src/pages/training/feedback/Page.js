import React, { useEffect } from 'react'
import axios from 'axios'


const spreadsheetId = '15JVTQJjo0fzrZkUCMvJFqKARTqFEignwdCTcVfsyBeA'

export default function TrainingFeedback() {
    useEffect(() => {
        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
            headers: {},
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div className="tw-text-gray-700 tw-text-sm tw-flex tw-justify-center tw-w-full tw-px-4">
            <div className="tw-max-w-5xl tw-w-full tw-shadow-md tw-rounded tw-p-2 tw-mt-10 tw-mb-20 tw-bg-white">
                <div className="tw-text-center tw-text-xl tw-font-medium tw-mt-6">
                    4. Сургалтын үнэлгээ, санал хүсэлтийн хэсэг
                </div>

                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfTYHEwbXfkiFQct1VStM7MdCa4czRJs767ENnOm6tSVPjGhw/viewform?embedded=true" className="tw-w-full tw-mt-10" height={1024} frameborder="0" marginheight="0" marginwidth="0" title="Google Form">Loading…</iframe>
            </div>
        </div>
    )
}