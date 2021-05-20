import PenSVG from 'assets/svgComponents/penSVG'
import axios from 'axiosbase'
import HelpPopup from 'components/help_popup/helpPopup'
import FormInline from 'components/urgudul_components/formInline'
import FormRichText from 'components/urgudul_components/formRichText'
import TreeSelect from 'components/urgudul_components/treeSelect'
import AlertContext from 'components/utilities/alertContext'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import React, { useContext, useEffect, useState } from 'react'
import { titleClass, buttonClass } from './trainingsList'
import { FormLabel } from './userRegistration'

export default function TrainingRequest() {
   const [request, setRequest] = useState(initialState)
   const [sectors, setSectors] = useState([])

   useEffect(() => {
      axios.get('business-sector').then(res => {
         console.log(res.data)
         setSectors(res.data.data)
      })
   }, [])

   const handleInput = (key, value) => setRequest(prev => ({ ...prev, [key]: value }))

   const handleInputEvent = (e) => setRequest(prev => ({ ...prev, [e.target.name]: e.target.value }))

   const handleInputFormat = (values, name) => setRequest(prev => ({ ...prev, [name]: values.value }))

   const AlertCtx = useContext(AlertContext)

   const handleSubmit = () => {
      axios.post('training-requests', request, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         console.log(res)
         setRequest(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сургалтын хүсэлт илгээгдлээ.' })
      }).catch(err => {
         console.error(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Хүсэлт илгээж чадсангүй.' })
      })
   }

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-w-full tw-p-2 tw-pb-12">
         <div className={titleClass}>
            Захиалгат сургалтын хүсэлт
         </div>

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-pl-1 tw-pr-4 tw-mt-3">
            <FormInline label="Овог нэр" type="text" value={request.fullname ?? ''} name="fullname" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" />

            <FormInline label="Ажлын байрны албан тушаал" type="text" value={request.employee_position ?? ''} name="employee_position" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" />

            <FormInline label="Регистрийн дугаар" type="text" value={request.registration_number ?? ''} name="registration_number" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" />

            <FormInline label="Утасны дугаар" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={request.phone ?? ''} name="phone" onChange={handleInputFormat} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" />

            <div className="tw-w-full md:tw-col-span-2">
               <FormLabel label="Хуулийн этгээдийн товч тахилцуулга." SVG={PenSVG} />

               <div className="tw-pl-8 tw-pr-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: 160, maxHeight: 786 }}>
                  <FormRichText modules="small" value={request.company_introduction ?? ''} name="company_introduction" setForm={handleInput} />
               </div>
            </div>

            <FormInline label="Имэйл хаяг" type="email" value={request.company_email ?? ''} name="company_email" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" validate={true} />

            <TreeSelect data={sectors} label="Харьялагдах салбар" displayName="bdescription_mon" value={request.business_sectorId} name="business_sectorId" handleChange={handleInput} />

            <FormInline label="Улсын бүртгэлийн дугаар" type="text" value={request.company_registration_number ?? ''} name="company_registration_number" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" />

            <FormInline label="Сургалтад хамрагдах ажилчдын тоо" type="number" value={request.participant_number ?? ''} name="participant_number" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" />

            <div className="tw-w-full md:tw-col-span-2">
               <div className="">
                  <FormLabel label="Та ямар чиглэлээр ямар сургалт авах хүсэлтэй байгаа вэ? Та сургалтын хэрэгцээ, шаардлагаа тодорхой бичнэ үү." SVG={PenSVG} HelpPopup={<HelpPopup classAppend="tw-mx-2" main="Экспортод чиглэсэн байх шаардлагатай." position="bottom" />} />
               </div>

               <div className="tw-pl-8 tw-pr-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: 160, maxHeight: 786 }}>
                  <FormRichText modules="small" value={request.training_request ?? ''} name="training_request" setForm={handleInput} />
               </div>
            </div>

            <div className="tw-w-full md:tw-col-span-2">
               <FormLabel label="Та сургалтад хамрагдсанаар та ямар ур чадвар эзэмших вэ? Та сургалтаас авах ашиг, үр дүнгийн талаар дэлгэрэнгүй бичнэ үү." SVG={PenSVG} />

               <div className="tw-pl-8 tw-pr-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: 160, maxHeight: 786 }}>
                  <FormRichText modules="small" value={request.training_benefit ?? ''} name="training_benefit" setForm={handleInput} />
               </div>
            </div>
         </div>

         <div className="tw-flex tw-justify-end">
            <button
               className={`${buttonClass} tw-text-sm tw-px-4 tw-m-4 tw-mt-8`}
               onClick={handleSubmit}>
               Хүсэлт өгөх
            </button>
         </div>
      </div>
   )
}

const initialState = {
   fullname: null,
   registration_number: null,
   employee_position: null,
   phone: null,
   company_introduction: null,
   business_sectorId: null,
   company_registration_number: null,
   company_email: null,
   participant_number: null,
   training_request: null,
   training_benefit: null,
}
