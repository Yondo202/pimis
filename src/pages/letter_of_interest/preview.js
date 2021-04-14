import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useParams } from 'react-router'
import { useReactToPrint } from 'react-to-print'
import axios from 'axiosbase'
import PrintSVG from 'assets/svgComponents/printSVG'


const initialState = {
    company_logo: null,
    company_name: null,
    company_address: null,
    company_phone: null,
    company_fax: null,
    company_email: null,
    company_register: null,
    submit_date: null,
    snumber: null,
    letter: null,
    director_position: null,
    director_name: null,
    director_signature: null,
    company_stamp: null,
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
        <div className="tw-relative tw-text-gray-700 tw-text-sm tw-mb-12">
            <button className="tw-ml-2 tw-mb-8 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-px-5 tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-text-15px" onClick={handlePrint}>
                <span className="tw-text-sm">Хэвлэх болон PDF-ээр татах</span>
                <PrintSVG className="tw-w-5 tw-h-5 tw-ml-2" />
            </button>

            <div className="letter-container" ref={componentRef}>
                <div className="tw-grid tw-grid-cols-2 tw-grid-rows-1 tw-mt-20 tw-mx-24 tw-text-13px tw-text-blue-600">
                    <div className="tw-relative tw-grid tw-grid-cols-1 tw-mr-8">
                        {form.company_logo ?
                            <div className="tw-w-w-full tw-h-36 tw-justify-self-center">
                                <img src={form.company_logo} alt="Байгууллагын лого" className="tw-w-full tw-h-full tw-object-scale-down" />
                            </div>
                            :
                            <div className="tw-w-full tw-h-36 tw-bg-transparent" />
                        }

                        <span className="tw-mt-1 tw-px-0.5 tw-text-center tw-text-sm tw-uppercase tw-leading-tight">
                            {form.company_name}
                        </span>

                        <span className="tw-mt-1 tw-px-1 tw-leading-tight tw-text-center">
                            {form.company_address}
                        </span>

                        <div className="tw-mt-1 tw-flex tw-justify-center">
                            <div className="tw-flex tw-items-center tw-mr-2 tw-leading-tight ">
                                <span className="tw-mr-1">
                                    Утас:
                                </span>
                                <span className="tw-px-0.5">
                                    {form.company_phone}
                                </span>
                            </div>

                            <div className="tw-flex tw-items-center tw-leading-tight">
                                <span className="tw-mr-1">
                                    Факс:
                                    </span>
                                <span className="tw-px-0.5" type="text">
                                    {form.company_fax}
                                </span>
                            </div>
                        </div>

                        <div className="tw-mt-1 tw-flex tw-justify-center tw-items-center tw-leading-tight">
                            <span className="tw-mr-1">
                                Имэйл:
                            </span>
                            <span className="tw-px-1">
                                {form.company_email}
                            </span>
                        </div>

                        <div className="tw-mt-1 tw-flex tw-justify-center tw-items-center tw-leading-tight">
                            <span className="tw-mr-1">
                                УБД:
                                </span>
                            <span className="tw-px-1">
                                {form.company_register}
                            </span>
                        </div>

                        <div className="tw-mt-1 tw-flex tw-justify-center tw-items-center tw-leading-tight">
                            <span className="tw-px-0.5">
                                {form.submit_date}
                            </span>

                            <span className="tw-ml-2">
                                №:
                            </span>
                            <span className="tw-px-0.5 tw-ml-1">
                                {form.snumber}
                            </span>
                        </div>
                    </div>

                    <div className="tw-uppercase tw-text-center tw-font-medium tw-text-xl tw-px-8 tw-pt-8 tw-ml-8">
                        "Экспортыг дэмжих төсөл"-д
                    </div>
                </div>

                <div className="tw-text-2xl tw-font-medium tw-mt-8" style={{ marginLeft: '18%' }}>
                    Төсөлд хамрагдах тухай
                </div>

                <div dangerouslySetInnerHTML={{ __html: form.letter }} className="tw-mx-16 tw-mt-2 tw-p-1" style={{ minHeight: 740 }} />

                <div className="tw-relative tw-h-40 tw-mt-10 tw-mx-24">
                    <div className="tw-absolute tw-top-8 tw-left-2 tw-font-medium tw-text-base tw-uppercase">
                        Хүндэтгэсэн:
                    </div>

                    <div className="tw-absolute tw-top-10 tw-left-1/2 tw-transform-gpu tw--translate-x-1/2 tw-w-full tw-flex tw-justify-center tw-items-center tw-z-10">
                        <span className="tw-text-center tw-font-medium tw-mr-2 tw-py-1 tw-px-0.5 tw-uppercase tw-whitespace-nowrap">
                            {form.director_position}
                        </span>

                        {form.director_signature ?
                            <img src={form.director_signature} className="tw-ml-2 tw-flex-shrink-0" style={{ width: 260, height: 90 }} alt="Гарын үсэг" />
                            :
                            <div className="tw-ml-2 tw-flex-shrink-0" style={{ width: 260, height: 90 }} />
                        }

                        <span className="tw-text-center tw-font-medium tw-ml-2 tw-py-1 tw-px-0.5 tw-uppercase tw-whitespace-nowrap">
                            {form.director_name}
                        </span>
                    </div>

                    {form.company_stamp ?
                        <div className="tw-w-44 tw-h-44 tw-absolute tw-top-2 tw-left-1/2 tw-transform-gpu tw--translate-x-1/2 tw--z-10">
                            <img src={form.company_stamp} alt="Байгууллагын тамга тэмдэг" className="tw-w-full tw-h-full tw-object-scale-down" />
                        </div>
                        :
                        <div className="tw-w-44 tw-h-44 tw-absolute tw-top-2 tw-left-1/2 tw-transform-gpu tw--translate-x-1/2 tw--z-10" />
                    }
                </div>
            </div>
        </div>
    )
}
