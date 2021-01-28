import React, { useContext, useState } from 'react'
import HelpPopup from 'components/help_popup/helpPopup'
import FormRichText from 'components/urgudul_components/formRichText'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'


const initialState = {
    applicant_overview: '',
    applicant_experience: '',
}

function UrgudulOverview() {
    const [form, setForm] = useState(initialState)

    const handleSetForm = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    const UrgudulCtx = useContext(UrgudulContext)

    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleSubmit = () => {
        if (UrgudulCtx.data.id) {
            axios.put(`projects/${UrgudulCtx.data.id}`, form)
                .then(res => {
                    console.log(res.data)
                    UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Танилцуулга мэдээлэл хадгалагдлаа.' })
                })
                .catch(err => {
                    console.log(err.response?.data)
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                })
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
            setTimeout(() => history.push('/urgudul/1'), 3000)
        }
    }

    return (
        <div className="tw-mt-8 tw-mb-20 tw-py-2 tw-rounded-lg tw-shadow-md tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">A3</span>
                {
                    'cluster_' ? '- Өргөдөл гаргагч кластерын хувьд кластерын хамтрагч талуудын товч танилцуулга'
                        :
                        '- Өргөдөл гаргагч аж ахуй нэгжийн товч танилцуулга'
                }

                {
                    'cluster_' ? <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерын тэргүүлэгч аж ахуйн нэгж болон бусад гишүүдийн хооронд кластерын хамтын ажиллагаа хэрхэн эхэлж, ямар хугацаанд, ямар хэмжээнд явагдаж буй талаар товч мэдээлэл. Үүнд:" list={['Кластераар хамтарч хийж буй эсвэл кластер дотор солилцож буй гол бүтээгдэхүүн, үйлчилгээг үнийн дүнгийн хамт оруулна уу.', 'Мөн хамааралтай холбоод, судалгааны хүрээлэнгүүдтэй ямар хэмжээний хамааралтай ажилладаг талаарх мэдээлэл оруулна уу.']} position="bottom" />
                        :
                        <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="ААН-ийн хувьд экспортын бүтээгдэхүүний гол орцыг борлуулалтанд эзлэх үнийн дүнгээр оруулах бөгөөд үүнийг хаана хаанаас авч буй талаар мэдээлэлийг оруулна уу." position="bottom" />
                }
            </div>

            <div className="tw-py-2 tw-px-4 tw-h-64 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                <FormRichText modules="full" value={form.applicant_overview} name="applicant_overview" setForm={handleSetForm} />
            </div>

            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">A4</span>
                {`- Өргөдөл гаргагч ${'cluster_' ? 'кластерын' : 'ААН-ийн'} төслийг хэрэгжүүлэх техникийн туршлага:`}

                <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." position="bottom" />
            </div>

            <div className="tw-py-2 tw-px-4 tw-h-64 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                <FormRichText modules="full" value={form.applicant_experience} name="applicant_experience" setForm={handleSetForm} />
            </div>

            <div className="tw-flex tw-justify-end">
                <ButtonTooltip classAppend="tw-mt-4 tw-mb-2 tw-mr-4" classButton="tw-px-2 tw-py-1 tw-bg-blue-500 active:tw-bg-blue-600" classLabel="tw-text-white" label="Хадгалах" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default UrgudulOverview
