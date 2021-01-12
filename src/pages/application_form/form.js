import React, { useContext, useState } from 'react'
import ClusterCompanies from 'pages/cluster_companies/form'
import EnterpriseInfo from 'pages/enterprise_info/form'
import CloseSVG from 'assets/svgComponents/closeSVG'
import axios from 'axios'
import UrgudulContext, { initialState } from 'components/utilities/urgudulContext'
import PlusSVG from 'assets/svgComponents/plusSVG'
import AlertContext from 'components/utilities/alertContext'


function ApplicationForm() {
    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData

    const handleInputInt = (e) => {
        setData({ ...data, [e.target.name]: +e.target.value })
    }

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const [modalOpen, setModalOpen] = useState(true)

    const loadData = (id) => {
        axios.get(`http://192.168.88.78:3000/api/applications/${id}`)
            .then(res => {
                console.log(res.data)
                setData({ ...data, ...res.data.data })
                setModalOpen(false)
            }).catch(err => {
                console.log(err)
            })
    }

    const newData = () => {
        setData({ ...initialState, project_type: 0, companies: [] })
        setModalOpen(false)
    }

    const [id, setId] = useState()

    const AlertCtx = useContext(AlertContext)

    const showSuccess = () => {
        AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Tanii medeelel amjilttai hadgalagdlaa.' })
    }

    const showError = () => {
        AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Talbaruudiig buren buglunu uu.' })
    }

    return (
        <div className="tw-w-full tw-max-w-5xl tw-mx-auto tw-text-gray-700">
            <div className="tw-w-full tw-rounded-lg tw-shadow-md tw-bg-gradient-to-tl tw-from-green-100 tw-to-blue-300 tw-flex tw-flex-col tw-mb-8">
                <h3 className="tw-text-4xl tw-font-bold tw-text-gray-700 tw-self-start tw-ml-12 tw-mt-20 tw-mb-16">Өргөдлийн маягт</h3>

                <p className="tw-italic tw-opacity-80 tw-text-sm tw-self-start tw-ml-8 tw-mb-4">Жич: Налуулж бичигдсэн бүх мэдээлэл энэ маягтыг бөглөх үйлчлүүлэгчид туслахад зориулагдсан болно.</p>

                <form className="tw-self-end tw-mr-4 tw-mb-4 sm:tw-flex" onSubmit={handleSubmit}>
                    <div className="tw-flex tw-flex-nowrap tw-justify-end tw-items-center tw-mb-1">
                        <label className="tw-font-semibold">Компани эсвэл нэгдэл:</label>
                        <select className="tw-px-1 tw-py-1 tw-mx-2 tw-text-sm tw-font-semibold tw-outline-none tw-border tw-border-gray-300 tw-rounded-md focus:tw-border focus:tw-border-blue-600 tw-transition tw-duration-300" value={data.project_type} name="project_type" onChange={handleInputInt}>
                            <option className="tw-font-semibold" value={0}>Компани</option>
                            <option className="tw-font-semibold" value={1}>Кластер</option>
                        </select>
                    </div>
                    <div className="tw-flex tw-flex-nowrap tw-justify-end tw-items-center tw-mb-1">
                        <label className="tw-ml-4 tw-font-semibold">Огноо:</label>
                        <input className="tw-w-36 tw-px-1 tw-py-1 tw-mx-2 tw-text-sm tw-font-semibold tw-outline-none tw-border tw-border-gray-300 tw-rounded-md focus:tw-border focus:tw-border-blue-600 tw-transition tw-duration-300" type="date" value={data.ognoo} name="ognoo" onChange={handleInput} />
                    </div>
                </form>
            </div>

            {
                {
                    0: <EnterpriseInfo />,
                    1: <ClusterCompanies />,
                }[data.project_type]
            }

            <div className={`tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-70 ${modalOpen ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`}>
                <div className="tw-bg-white tw-relative tw-rounded-md tw-shadow-lg tw-p-4 tw-m-8 tw-w-full tw-max-w-3xl tw-flex tw-flex-col tw-items-center">
                    <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-4 tw-right-4" onClick={() => setModalOpen(false)}>
                        <CloseSVG className="tw-w-8 tw-h-8" />
                    </button>
                    <div className="tw-text-center tw-mt-4 tw-mb-8 tw-mx-8 tw-font-semibold">
                        Хадгалагдсан маягт сонгох
                    </div>
                    <div className="tw-w-full tw-mb-8">
                        <span className="tw-font-semibold">Хадгалагдсан маягтууд:</span>
                        <button className="tw-border tw-ml-4 tw-py-1 tw-px-2 tw-rounded-md focus:tw-outline-none active:tw-shadow-lg" onClick={() => loadData(28)}>
                            ID: 28
                        </button>
                        <button className="tw-border tw-ml-4 tw-py-1 tw-px-2 tw-rounded-md focus:tw-outline-none active:tw-shadow-lg" onClick={() => loadData(42)}>
                            ID: 42
                        </button>
                        <button className="tw-border tw-ml-4 tw-py-1 tw-px-2 tw-rounded-md focus:tw-outline-none active:tw-shadow-lg" onClick={() => loadData(id)}>
                            ID: {id}
                        </button>
                        <input className="tw-w-12 tw-ml-8 tw-py-1 tw-px-2 tw-border tw-border-red-300 tw-rounded-md" type="number" value={id} onChange={e => setId(e.target.value)} />
                    </div>
                    <button className="tw-border tw-p-1 tw-pr-2 tw-rounded-md tw-bg-green-500 tw-text-white focus:tw-outline-none active:tw-bg-green-600 hover:tw-shadow-lg tw-flex tw-items-center" onClick={() => newData()}>
                        <PlusSVG className="tw-w-5 tw-h-5 tw-mr-1 tw-animate-pulse" />
                        <span className="">Шинээр өргөдлийн маягт бөглөх</span>
                    </button>
                </div>
            </div>

            <button className="tw-p-1 tw-bg-green-400" onClick={showSuccess}>
                Alert Button
            </button>
            <button className="tw-p-1 tw-bg-red-400" onClick={showError}>
                Alert Button
            </button>
        </div>
    )
}

export default ApplicationForm
