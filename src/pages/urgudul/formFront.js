import React, { useContext, useEffect, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import AlertContext from 'components/utilities/alertContext'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router-dom'


const initialState = {
    project_type: null,
    company_name: null,
    project_name: null,
}

function UrgudulFront() {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        let temp = {}
        Object.keys(initialState).forEach(key => {
            if (UrgudulCtx.data[key]) temp[key] = UrgudulCtx.data[key]
        })
        setForm({ ...form, ...temp })
    }, [UrgudulCtx.data.id])

    const handleClickForm = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        const allValid = Object.values(form).every(value => !checkInvalid(value))

        if (allValid) {
            axios.post('projects', form, {
                headers: {
                    'Authorization': getLoggedUserToken()
                }
            }).then(res => {
                console.log(res.data)
                UrgudulCtx.setData(res.data.data)
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийн маягт үүслээ.' })
                history.push('/urgudul/2')
            }).catch(err => {
                console.log(err.response?.data)
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Маягт үүсгэж чадсангүй.' })
            })
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Аль нэг талбар бөглөгдөөгүй байна. Та гүйцэт бөглөнө үү.' })
        }
    }

    const handleSubmitEdit = () => {
        setValidate(true)
        const allValid = Object.values(form).every(value => !checkInvalid(value))

        if (allValid) {
            axios.put(`projects/${UrgudulCtx.data.id}`, form, {
                headers: {
                    'Authorization': getLoggedUserToken()
                }
            }).then(res => {
                console.log(res.data)
                UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Маягтын мэдээлэл хадгалагдлаа.' })
                history.push('/urgudul/2')
            }).catch(err => {
                console.log(err.response?.data)
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
            })
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Аль нэг талбар бөглөгдөөгүй байна. Та гүйцэт бөглөнө үү.' })
        }
    }

    const [validate, setValidate] = useState(false)

    const checkInvalid = (value) => {
        switch (value) {
            case null:
                return true
            case '':
                return true
            default:
                return false
        }
    }

    return (
        <div className="tw-w-full tw-max-w-5xl tw-mx-auto tw-text-gray-700">
            <div className="tw-mt-8 tw-mb-20 tw-p-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
                <div className="tw-text-2xl tw-font-semibold tw-py-8 tw-px-4 tw-text-center tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-blue-500 tw-to-green-500">
                    Түншлэлийн дэмжлэг хүсэх өргөдлийн маягт
                </div>

                <div className="tw-p-2 tw-pb-5 tw-flex tw-flex-col tw-items-center">
                    <div className={`tw-pl-11 tw-pr-3 tw-flex tw-flex-col tw-w-full tw-max-w-md ${validate && checkInvalid(form.project_type) && 'tw-border tw-border-dashed tw-border-red-500'}`}>
                        <div className="tw-mt-4 tw-font-medium">
                            Өргөдлийн төрөл:
                        </div>

                        <button className={`tw-mt-4 tw-p-1.5 tw-border tw-rounded-lg tw-flex tw-items-center focus:tw-outline-none tw-transition-colors tw-duration-300 ${form.project_type === 0 && 'tw-border-blue-500'}`} onClick={() => handleClickForm('project_type', 0)} >
                            <div className={`tw-ml-1 tw-w-4 tw-h-4 tw-border tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-transition-colors tw-duration-300 ${form.project_type === 0 ? 'tw-border-blue-500' : 'tw-border-gray-700'}`}>
                                <span className={`tw-w-2 tw-h-2 tw-rounded-full ${form.project_type === 0 ? 'tw-bg-blue-500' : 'tw-bg-transparent'} tw-transition-colors tw-duration-300`} />
                            </div>

                            <span className="tw-ml-2 tw-text-sm">Аж ахуй нэгж</span>
                        </button>

                        <button className={`tw-my-2 tw-p-1.5 tw-border tw-rounded-lg tw-flex tw-items-center focus:tw-outline-none tw-transition-colors tw-duration-300 ${form.project_type === 1 && 'tw-border-green-500'}`} onClick={() => handleClickForm('project_type', 1)} >
                            <div className={`tw-ml-1 tw-w-4 tw-h-4 tw-border tw-rounded-full tw-inline-flex tw-justify-center tw-items-center tw-transition-colors tw-duration-300 ${form.project_type === 1 ? 'tw-border-green-500' : 'tw-border-gray-700'}`}>
                                <span className={`tw-w-2 tw-h-2 tw-rounded-full ${form.project_type === 1 ? 'tw-bg-green-500' : 'tw-bg-transparent'} tw-transition-colors tw-duration-300`} />
                            </div>

                            <span className="tw-ml-2 tw-text-sm">Кластер</span>
                        </button>
                    </div>

                    <FormInline label={form.project_type === 'cluster' ? 'Кластерын тэргүүлэгч байгууллагын нэр:' : 'Аж ахуйн нэгжийн нэр'} type="text" value={form.company_name || ''} name="company_name" onChange={handleInput} classAppend={`tw-w-full tw-max-w-md ${validate && checkInvalid(form.company_name) && 'tw-border tw-border-dashed tw-border-red-500'}`} classInput="tw-w-full" />

                    <FormInline label="Төслийн нэр" type="text" value={form.project_name || ''} name="project_name" onChange={handleInput} classAppend={`tw-w-full tw-max-w-md ${validate && checkInvalid(form.project_name) && 'tw-border tw-border-dashed tw-border-red-500'}`} classInput="tw-w-full" />

                    {
                        UrgudulCtx.data.id ?
                            <ButtonTooltip classAppend="tw-mt-4" classButton="tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmitEdit} />
                            :
                            <ButtonTooltip classAppend="tw-mt-4" classButton="tw-px-2 tw-py-1 tw-bg-green-500 active:tw-bg-green-600" classLabel="tw-text-white" label="Маягт үүсгэх" onClick={handleSubmit} />
                    }
                </div>
            </div>
        </div>
    )
}

export default UrgudulFront
