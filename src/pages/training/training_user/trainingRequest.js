import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import PenSVG from 'assets/svgComponents/penSVG'
import axios from 'axiosbase'
import HelpPopup from 'components/help_popup/helpPopup'
import FormInline from 'components/urgudul_components/formInline'
import FormRichText from 'components/urgudul_components/formRichText'
import TreeSelect from 'components/urgudul_components/treeSelect'
import AlertContext from 'components/utilities/alertContext'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
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

   const history = useHistory()

   const handleNavTrainings = () => history.push('/trainings')

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
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-flex tw-justify-center tw-w-full tw-px-4 tw-pt-8 tw-pb-20">
         <div className="tw-rounded tw-shadow-md tw-bg-white tw-max-w-5xl tw-w-full">
            <div className="tw-flex">
               <button className="tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-pl-3 tw-pr-5 tw-text-sm tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-my-2 tw-ml-2" onClick={handleNavTrainings}>
                  <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform-gpu tw-rotate-90 tw-mr-1" />
                  Буцах
               </button>
            </div>

            <div className="tw-text-base tw-font-medium tw-text-center tw-mb-4 tw-mt-2">
               Захиалгат сургалтын хүсэлт
            </div>

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-pl-1 tw-pr-4">
               <FormInline label="Овог нэр" type="text" value={request.fullname ?? ''} name="fullname" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" />

               <FormInline label="Ажлын байрны албан тушаал" type="text" value={request.employee_position ?? ''} name="employee_position" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" />

               <FormInline label="Регистрийн дугаар" type="text" value={request.registration_number ?? ''} name="registration_number" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" />

               <FormInline label="Утасны дугаар" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={request.phone ?? ''} name="phone" onChange={handleInputFormat} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" />

               <div className="tw-w-full md:tw-col-span-2">
                  <FormLabel label="Хуулийн этгээдийн товч тахилцуулга." SVG={PenSVG} />

                  <div className="tw-pl-8 tw-pr-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: '128px', maxHeight: '768px' }}>
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

                  <div className="tw-pl-8 tw-pr-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: '128px', maxHeight: '768px' }}>
                     <FormRichText modules="small" value={request.training_request ?? ''} name="training_request" setForm={handleInput} />
                  </div>
               </div>

               <div className="tw-w-full md:tw-col-span-2">
                  <FormLabel label="Та сургалтад хамрагдсанаар та ямар ур чадвар эзэмших вэ? Та сургалтаас авах ашиг, үр дүнгийн талаар дэлгэрэнгүй бичнэ үү." SVG={PenSVG} />

                  <div className="tw-pl-8 tw-pr-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: '128px', maxHeight: '768px' }}>
                     <FormRichText modules="small" value={request.training_benefit ?? ''} name="training_benefit" setForm={handleInput} />
                  </div>
               </div>
            </div>

            <div className="tw-flex tw-items-center tw-justify-center">
               <button className="focus:tw-outline-none tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-px-8 tw-py-2 tw-text-white tw-font-medium tw-mt-12 tw-mb-8" onClick={handleSubmit}>
                  Хүсэлт илгээх
               </button>
            </div>
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
