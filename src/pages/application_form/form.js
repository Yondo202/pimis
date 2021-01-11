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
    // AlertCtx.setAlert({...AlertCtx})

    return (
        <div className="w-full max-w-5xl mx-auto text-gray-700">
            <div className="w-full rounded-lg shadow-md bg-gradient-to-tl from-green-100 to-blue-300 flex flex-col mb-8">
                <h3 className="text-4xl font-bold text-gray-700 self-start ml-12 mt-20 mb-16">Өргөдлийн маягт</h3>

                <p className="italic opacity-80 text-sm self-start ml-8 mb-4">Жич: Налуулж бичигдсэн бүх мэдээлэл энэ маягтыг бөглөх үйлчлүүлэгчид туслахад зориулагдсан болно.</p>

                <form className="self-end mr-4 mb-4 sm:flex" onSubmit={handleSubmit}>
                    <div className="flex flex-nowrap justify-end items-center mb-1">
                        <label className="font-semibold">Компани эсвэл нэгдэл:</label>
                        <select className="px-1 py-1 mx-2 text-sm font-semibold outline-none border border-gray-300 rounded-md focus:border focus:border-blue-600 transition duration-300" value={data.project_type} name="project_type" onChange={handleInputInt}>
                            <option className="font-semibold" value={0}>Компани</option>
                            <option className="font-semibold" value={1}>Кластер</option>
                        </select>
                    </div>
                    <div className="flex flex-nowrap justify-end items-center mb-1">
                        <label className="ml-4 font-semibold">Огноо:</label>
                        <input className="w-36 px-1 py-1 h- mx-2 text-sm font-semibold outline-none border border-gray-300 rounded-md focus:border focus:border-blue-600 transition duration-300" type="date" value={data.ognoo} name="ognoo" onChange={handleInput} />
                    </div>
                </form>
            </div>

            {
                {
                    0: <EnterpriseInfo />,
                    1: <ClusterCompanies />,
                }[data.project_type]
            }

            <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-700 bg-opacity-70 ${modalOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-300`}>
                <div className="bg-white relative rounded-md shadow-lg p-4 m-8 w-full max-w-3xl flex flex-col items-center">
                    <button className="border focus:outline-none text-red-500 active:text-red-700 border-red-500 rounded-md absolute top-4 right-4" onClick={() => setModalOpen(false)}>
                        <CloseSVG className="w-8 h-8" />
                    </button>
                    <div className="text-center mt-4 mb-8 mx-8 font-semibold">
                        Хадгалагдсан маягт сонгох
                    </div>
                    <div className="w-full mb-8">
                        <span className="font-semibold">Хадгалагдсан маягтууд:</span>
                        <button className="border ml-4 py-1 px-2 rounded-md focus:outline-none active:shadow-lg" onClick={() => loadData(28)}>
                            ID: 28
                        </button>
                        <button className="border ml-4 py-1 px-2 rounded-md focus:outline-none active:shadow-lg" onClick={() => loadData(42)}>
                            ID: 42
                        </button>
                        <button className="border ml-4 py-1 px-2 rounded-md focus:outline-none active:shadow-lg" onClick={() => loadData(id)}>
                            ID: {id}
                        </button>
                        <input className="w-12 ml-8 py-1 px-2 border border-red-300 rounded-md" type="number" value={id} onChange={e => setId(e.target.value)} />
                    </div>
                    <button className="border p-1 pr-2 rounded-md bg-green-500 text-white focus:outline-none active:bg-green-600 hover:shadow-lg flex items-center" onClick={() => newData()}>
                        <PlusSVG className="w-5 h-5 mr-1 animate-pulse" />
                        <span className="">Шинээр өргөдлийн маягт бөглөх</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ApplicationForm
