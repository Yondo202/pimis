import React, { useContext, useEffect, useRef, useState } from 'react'
import FormInline from 'components/urgudul_components/formInline'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import AlertContext from 'components/utilities/alertContext'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router-dom'
import { animated, config, Transition } from 'react-spring/renderprops'
import CloseSVG from 'assets/svgComponents/closeSVG'


const initialState = {
    project_type: null,
    company_name: null,
    project_name: null,
}

function UrgudulFront() {
    const [form, setForm] = useState(initialState)
    const [period, setPeriod] = useState({
        open: undefined,
        period: {},
    })

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        let temp = {}
        Object.keys(initialState).forEach(key => {
            if (UrgudulCtx.data[key] !== null || UrgudulCtx.data[key] !== undefined) temp[key] = UrgudulCtx.data[key]
        })
        setForm({ ...form, ...temp })

        axios.get('accept-periods', {
            headers: { Authorization: getLoggedUserToken() },
            params: { checkOpen: true }
        }).then(res => {
            setPeriod(res.data.data)
        })
    }, [UrgudulCtx.data.id])

    const handleClickForm = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmitNew = () => {
        if (period.open) {
            setValidate(true)
            const allValid = Object.values(form).every(value => !checkInvalid(value))

            if (allValid) {
                axios.post('projects', form, {
                    headers: {
                        'Authorization': getLoggedUserToken()
                    }
                }).then(res => {
                    UrgudulCtx.setData(res.data.data)
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийн маягт үүслээ.' })
                    history.push('/urgudul/2')
                }).catch(err => {
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Маягт үүсгэж чадсангүй.' })
                })
            } else {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Аль нэг талбар бөглөгдөөгүй байна. Та гүйцэт бөглөнө үү.' })
            }
        } else {
            setModalOpen(true)
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
                UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Маягтын мэдээлэл хадгалагдлаа.' })
                history.push('/urgudul/2')
            }).catch(err => {
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

    const [modalOpen, setModalOpen] = useState(false)

    const modalRef = useRef()

    const handleClickOutside = (e) => {
        if (modalOpen && !modalRef.current?.contains(e.target)) {
            setModalOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
        <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto">
            <div className="tw-mt-8 tw-p-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
                <div className="">
                    <div className="tw-text-2xl tw-font-semibold tw-pt-8 tw-pb-6 tw-px-4 tw-text-center tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-blue-500 tw-to-green-500">
                        Түншлэлийн дэмжлэг хүсэх өргөдлийн маягт
                    </div>

                    {UrgudulCtx.data.project_number &&
                        <div className="tw-mb-2 tw-font-medium tw-text-13px tw-px-2 tw-text-center">
                            Өргөдлийн дугаар:
                            <span className="tw-text-blue-500 tw-ml-2">{UrgudulCtx.data.project_number}</span>
                        </div>
                    }
                </div>

                <div className="tw-p-2 tw-pb-5 tw-flex tw-flex-col tw-items-center">
                    <div className="tw-pl-11 tw-pr-3 tw-flex tw-flex-col tw-w-full tw-max-w-md">
                        <div className={`tw-mt-4 tw-text-sm tw-font-medium ${validate && checkInvalid(form.project_type) && 'tw-text-red-500'} tw-transition-colors`}>
                            Өргөдлийн төрөл:
                        </div>

                        <button className={`tw-mt-3 tw-p-1.5 tw-border tw-rounded-lg tw-flex tw-items-center focus:tw-outline-none tw-transition-colors tw-duration-300 ${form.project_type === 0 && 'tw-border-blue-500'}`} onClick={() => handleClickForm('project_type', 0)} >
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

                    <FormInline label={form.project_type === 1 ? 'Кластерын тэргүүлэгч байгууллагын нэр:' : 'Аж ахуйн нэгжийн нэр'} type="text" value={form.company_name || ''} name="company_name" onChange={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(form.company_name)} />

                    <FormInline label="Төслийн нэр" type="text" value={form.project_name || ''} name="project_name" onChange={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(form.project_name)} />

                    {UrgudulCtx.data.id ?
                        <ButtonTooltip classAppend="tw-mt-6" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmitEdit} />
                        :
                        <ButtonTooltip classAppend="tw-mt-6" classButton="tw-px-8 tw-py-2 tw-bg-green-500 active:tw-bg-green-600 tw-text-15px" classLabel="tw-text-white" label="Маягт үүсгэх" onClick={handleSubmitNew} />
                    }
                </div>
            </div>

            <Transition
                items={period.open === false && !UrgudulCtx.data.id}
                from={{ transform: 'scale(0)' }}
                enter={{ transform: 'scale (1)' }}
                leave={{ transform: 'scale (0)' }}>
                {item => item && (anims =>
                    <animated.div className="tw-mt-8 tw-mb-20 tw-p-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-border-t tw-border-gray-100 tw-bg-white tw-flex tw-flex-col tw-items-center tw-font-medium" style={anims}>
                        <div className="tw-text-center tw-text-base tw-p-2 tw-mt-2">
                            Өргөдөл хүлээж авах хугацаа нээгдээгүй байна.
                        </div>
                        <div className="tw-text-center tw-text-sm tw-p-2 tw-max-w-sm tw-mb-2">
                            {period.period.start_date
                                ? <span>
                                    {`Дараагийн нээгдэх хугацааг `}
                                    <span className="tw-text-blue-500">{period.period.start_date}</span>
                                    {` -аас `}
                                    <span className="tw-text-blue-500">{period.period.end_date}</span>
                                    {` хооронд байхаар төлөвлөж байна.`}
                                </span>
                                : `Дараагийн нээгдэх хугацааг төлөвлөөгүй байна.`
                            }
                        </div>
                    </animated.div>
                )}
            </Transition>

            <Transition
                items={modalOpen}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {item => item && (anims =>
                    <animated.div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8" style={anims}>
                        <Transition
                            items={modalOpen}
                            from={{ transform: 'translateY(-20px)' }}
                            enter={{ transform: 'translateY(-0)' }}
                            leave={{ transform: 'translateY(20px)' }}>
                            {item1 => item1 && (anims1 =>
                                <animated.div className="tw-bg-white tw-p-4 tw-relative tw-rounded tw-shadow-md tw-max-w-md tw-ring-2 tw-ring-indigo-500 tw-font-medium" style={{ minWidth: 300, ...anims1 }} ref={modalRef}>
                                    <button className="tw-absolute tw-top-1.5 tw-right-1.5 tw-text-red-500 active:tw-text-red-600 tw-transition-colors focus:tw-outline-none tw-border tw-border-red-500 tw-rounded active:tw-border-red-600" onClick={() => setModalOpen(false)}>
                                        <CloseSVG className="tw-w-5 tw-h-5" />
                                    </button>
                                    <div className="tw-text-center tw-p-2 tw-mt-4" style={{ fontSize: 17 }}>
                                        Өргөдөл хүлээж авах хугацаа нээгдээгүй байна.
                                    </div>
                                    <div className="tw-text-center tw-text-sm tw-p-2 tw-mt-4">
                                        {period.period.start_date
                                            ? <span>
                                                {`Дараагийн нээгдэх хугацааг `}
                                                <span className="tw-text-blue-500">{period.period.start_date}</span>
                                                {` -аас `}
                                                <span className="tw-text-blue-500">{period.period.end_date}</span>
                                                {` хооронд байхаар төлөвлөж байна.`}
                                            </span>
                                            : `Дараагийн нээгдэх хугацааг төлөвлөөгүй байна.`
                                        }
                                    </div>
                                </animated.div>
                            )}
                        </Transition>
                    </animated.div>
                )}
            </Transition>
        </div>
    )
}

export default UrgudulFront
