import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { useReactToPrint } from 'react-to-print'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import PrintSVG from 'assets/svgComponents/printSVG'
import { useParams } from 'react-router-dom'


const initialState = {
    company_name: null,
    company_address: null,
    basic_info: null,
    project_info: null,
    criteria: null,
    purchases: null,
    anti_corruption: null,
    director_name: null,
    director_signature: null,
    company_logo: null,
    company_stamp: null,
    submit_date: null,
}

export default function LetterPreview(props) {
    const [form, setForm] = useState(props.form || initialState)

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const projectId = useParams().id

    useEffect(() => {
        if (props.form === undefined || null) {
            if (projectId !== undefined || null) {
                axios.get(`letter-of-interests/${projectId}`, {
                    headers: {
                        'Authorization': getLoggedUserToken(),
                    },
                }).then(res => {
                    console.log(res.data)
                    setForm({ ...form, ...res.data.data })
                }).catch(err => {
                    console.log(err.response?.data)
                })
            } else {
                axios.get('letter-of-interests', {
                    headers: {
                        'Authorization': getLoggedUserToken(),
                    },
                }).then(res => {
                    console.log(res.data)
                    setForm({ ...form, ...res.data.data })
                }).catch(err => {
                    console.log(err.response?.data)
                })
            }
        }
    }, [])

    return (
        <div className="tw-relative tw-text-gray-700">
            <button className="tw-ml-2 tw-mb-4 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-px-5 tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-text-15px" onClick={handlePrint}>
                <span className="tw-text-sm">Хэвлэх болон PDF-ээр татах</span>
                <PrintSVG className="tw-w-5 tw-h-5 tw-ml-2" />
            </button>

            <div className="letter-container" ref={componentRef}>
                <div className="tw-relative tw-mt-14 tw-p-4 tw-pl-20 tw-flex">
                    {form.company_logo ?
                        <img src={form.company_logo} alt="Байгууллагын лого" className="tw-w-44 tw-h-44 tw-flex-shrink-0 tw-object-scale-down" />
                        :
                        <div className="tw-w-44 tw-h-44" />
                    }

                    <div className="tw-relative tw-flex-grow tw-p-2 tw-pl-8">
                        <div className="tw-px-1 tw-text-gray-600 tw-text-2xl tw-font-semibold tw-w-full">
                            {form.company_name || ''}
                        </div>

                        <div className="tw-mt-4 tw-px-1 tw-w-full tw-text-sm tw-font-medium">
                            {form.company_address || ''}
                        </div>

                        <div className="tw-mt-4 tw-px-1 tw-text-sm tw-font-medium">
                            {form.submit_date || ''}
                        </div>
                    </div>
                </div>

                <div className="tw-relative tw-flex tw-justify-center tw-mt-2">
                    <span className="tw-text-lg tw-font-medium tw-uppercase tw-w-80 tw-text-center">
                        Экспортыг дэмжих төсөлд илгээх нь
                    </span>
                    <img src="/edp_logo.png" className="tw-absolute tw--top-2 tw-right-28" alt="epd logo" />
                </div>

                <div className="tw-mt-6">
                    <div className="tw-py-2 tw-px-6 tw-flex tw-overflow-hidden" style={{ height: '100px' }}>
                        <div dangerouslySetInnerHTML={{ __html: form.basic_info || '' }} />
                    </div>

                    <div className="tw-py-2 tw-px-6 tw-flex tw-overflow-hidden" style={{ height: '100px' }}>
                        <div dangerouslySetInnerHTML={{ __html: form.project_info || '' }} />
                    </div>

                    <div className="tw-py-2 tw-px-6 tw-flex tw-overflow-hidden" style={{ height: '100px' }}>
                        <div dangerouslySetInnerHTML={{ __html: form.criteria || '' }} />
                    </div>

                    <div className="tw-py-2 tw-px-6 tw-flex tw-overflow-hidden" style={{ height: '124px' }}>
                        <div dangerouslySetInnerHTML={{ __html: form.purchases || '' }} />
                    </div>

                    <div className="tw-py-2 tw-px-6 tw-flex tw-overflow-hidden" style={{ height: '108px' }}>
                        <div dangerouslySetInnerHTML={{ __html: form.anti_corruption || '' }} />
                    </div>
                </div>

                <div className="tw-relative tw-mt-8 tw-py-4 tw-text-sm tw-pr-60">
                    <div className="tw-flex tw-justify-center">
                        <span className="tw-font-medium">Гүйцэтгэх захирал:</span>
                        <div className="tw-px-1 tw-ml-2 tw-w-60">
                            {form.director_name || ''}
                        </div>
                    </div>

                    <div className="tw-flex tw-justify-center tw-items-end tw-mt-2">
                        <span className="tw-font-medium tw-ml-16 tw-mb-0.5">Гарын үсэг:</span>

                        {form.director_signature ?
                            <img src={form.director_signature || ''} className="tw-w-60 tw-h-20 tw-ml-4 tw-border-b tw-border-gray-600 tw-flex-shrink-0" alt="Гарын үсэг" />
                            :
                            <div className="tw-w-60 tw-h-20 tw-ml-4 tw-border-b tw-border-gray-600 tw-flex-shrink-0" />
                        }

                        <div className="tw-w-6 tw-h-6 tw-mx-2" />
                    </div>

                    {form.company_stamp ?
                        <img src={form.company_stamp} alt="Байгууллагын тамга тэмдэг" className="tw-w-32 tw-h-32 tw-absolute tw-top-2 tw-right-28 tw-object-scale-down"></img>
                        :
                        <div className="tw-w-32 tw-h-32 tw-absolute tw-top-2 tw-right-32" />
                    }
                </div>
            </div>
        </div>
    )
}