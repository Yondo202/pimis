import React, { useContext, useEffect, useState } from 'react'
import HelpPopup from 'components/help_popup/helpPopup'
import FormRichText from 'components/urgudul_components/formRichText'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import LoadFromOtherProject from '../loadFromOtherProject'


const initialState = {
    applicant_overview: null,
    applicant_experience: null,
}

function UrgudulOverview({ projects }) {
    const [form, setForm] = useState(initialState)

    const UrgudulCtx = useContext(UrgudulContext)

    useEffect(() => {
        if (UrgudulCtx.data.id !== undefined) {
            let temp = {}
            Object.keys(initialState).forEach(key => {
                if (UrgudulCtx.data[key]) temp[key] = UrgudulCtx.data[key]
            })
            setForm(prev => ({ ...prev, ...temp }))
            UrgudulCtx.data.project_type === 1 && setIsCluster(true)
        }
    }, [UrgudulCtx.data.id])

    const handleSetForm = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        setValidate(true)
        const allValid = Object.values(form).every(value => !checkInvalid(value))

        if (UrgudulCtx.data.id) {
            if (allValid) {
                axios.put(`projects/${UrgudulCtx.data.id}`, form, {
                    headers: {
                        'Authorization': getLoggedUserToken()
                    }
                })
                    .then(res => {
                        UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                        AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Танилцуулга мэдээллийг хадгаллаа.' })
                        history.push('/urgudul/5')
                    })
                    .catch(err => {
                        AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                    })
            } else {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
            }
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
            history.push('/urgudul/1')
        }
    }

    const [validate, setValidate] = useState(false)

    const checkInvalid = (value) => {
        switch (value) {
            case null:
                return true
            case '':
                return true
            case '<p><br></p>':
                return true
            default:
                return false
        }
    }

    const [isCluster, setIsCluster] = useState(false)

    const otherProjects = projects.filter(project => project.id !== UrgudulCtx.data.id)

    const loadFromOtherProjectOverview = (id) => {
        axios.get(`projects/${id}`, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            const loadProject = res.data.data ?? {}
            setForm({
                applicant_overview: loadProject.applicant_overview || null,
                applicant_experience: loadProject.applicant_experience || null,
            })
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонгосон өргөдлөөс мэдээллийг нь орууллаа.' })
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сонгосон өргөдлийн мэдээллийг татаж чадсангүй.' })
        })
    }

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            {UrgudulCtx.data.project_number &&
                <div className="tw-ml-5 tw-mt-2 tw-mb-3 tw-text-13px tw-relative">
                    Өргөдлийн дугаар:
                    <span className="tw-text-blue-500 tw-ml-2 tw-font-medium">{UrgudulCtx.data.project_number}</span>

                    <LoadFromOtherProject classAppend="tw-absolute tw-right-4 tw--top-2.5" otherProjects={otherProjects} loadFromOtherProject={loadFromOtherProjectOverview} />
                </div>
            }

            <FormRichText
                label={isCluster
                    ? 'Өргөдөл гаргагч кластерын хувьд кластерын хамтрагч талуудын товч танилцуулга'
                    : 'Өргөдөл гаргагч аж ахуй нэгжийн товч танилцуулга'
                }
                invalid={validate && checkInvalid(form.applicant_overview)}
                HelpPopup={isCluster
                    ? <HelpPopup classAppend="tw-ml-2" main="Кластерын тэргүүлэгч аж ахуйн нэгж болон бусад гишүүдийн хооронд кластерын хамтын ажиллагаа хэрхэн эхэлж, ямар хугацаанд, ямар хэмжээнд явагдаж буй талаар товч мэдээлэл. Үүнд:" list={['Кластераар хамтарч хийж буй эсвэл кластер дотор солилцож буй гол бүтээгдэхүүн, үйлчилгээг үнийн дүнгийн хамт оруулна уу.', 'Мөн хамааралтай холбоод, судалгааны хүрээлэнгүүдтэй ямар хэмжээний хамааралтай ажилладаг талаарх мэдээлэл оруулна уу.']} position="bottom" />
                    : <HelpPopup classAppend="tw-ml-2" main="ААН-ийн хувьд экспортын бүтээгдэхүүний гол орцыг борлуулалтанд эзлэх үнийн дүнгээр оруулах бөгөөд үүнийг хаана хаанаас авч буй талаар мэдээллийг оруулна уу." position="bottom" />
                }
                modules="full"
                value={form.applicant_overview}
                name="applicant_overview"
                setter={handleSetForm}
                height={256}
                classAppend="tw-pr-2 tw-pl-5"
            />

            <FormRichText
                label={`Өргөдөл гаргагч ${isCluster ? 'кластерын' : 'ААН-ийн'} төслийг хэрэгжүүлэх техникийн туршлага`}
                invalid={validate && checkInvalid(form.applicant_experience)}
                HelpPopup={<HelpPopup classAppend="tw-ml-2 tw-mr-2" main="Кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." position="bottom" />}
                modules="full"
                value={form.applicant_experience}
                name="applicant_experience"
                setter={handleSetForm}
                height={256}
                classAppend="tw-pr-2 tw-pl-5"
            />

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-6 tw-mb-4 tw-mr-4" classButton="tw-px-8 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px tw-font-light" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulOverview
