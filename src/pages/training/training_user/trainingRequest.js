import PenSVG from 'assets/svgComponents/penSVG'
import axios from 'axiosbase'
import HelpPopup from 'components/help_popup/helpPopup'
import FormInline from 'components/urgudul_components/formInline'
import FormRichText from 'components/urgudul_components/formRichText'
import TreeSelect from 'components/urgudul_components/treeSelect'
import AlertContext from 'components/utilities/alertContext'
import React, { useContext, useEffect, useState } from 'react'
import { titleClass, buttonClass } from './trainingsList'
import { FormLabel } from './userRegistration'

export default function TrainingRequest() {
   const [request, setRequest] = useState(initialState)
   const [sectors, setSectors] = useState([])

   useEffect(() => {
      axios.get('business-sector').then(res => {
         setSectors(res.data.data)
      })
   }, [])

   const handleInput = (key, value) => setRequest(prev => ({ ...prev, [key]: value }))

   const handleInputFormat = (key, values) => setRequest(prev => ({ ...prev, [key]: values.value }))

   const AlertCtx = useContext(AlertContext)

   const handleSubmit = () => {
      setValidate(true)
      const allValid = Object.keys(initialState).every(key => !checkInvalid(request[key], quillTypes.includes(key) && 'quill'))
      if (allValid !== true) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      axios.post('trainings/requests', request).then(res => {
         setRequest(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сургалтын хүсэлтийг хүлээж авлаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хүсэлт илгээж чадсангүй.' })
      })
   }

   const [validate, setValidate] = useState(false)

   const checkInvalid = (value, type) => {
      switch (value) {
         case null:
            return true
         case '':
            return true
         case '<p><br></p>':
            if (type === 'quill') return true
            else return false
         default:
            return false
      }
   }

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-w-full tw-p-2 tw-pb-12">
         <div className={titleClass}>
            Захиалгат сургалтын хүсэлт
         </div>

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-gap-x-4 tw-mt-3">
            <FormInline label="Овог нэр" type="text" value={request.fullname} name="fullname" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(request.fullname)} />

            <FormInline label="Ажлын байрны албан тушаал" type="text" value={request.employee_position} name="employee_position" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(request.employee_position)} />

            <FormInline label="Регистрийн дугаар" type="text" value={request.registration_number} name="registration_number" setter={handleInput} classAppend="tw-w-full tw-max-w-md" invalid={validate && checkInvalid(request.registration_number)} />

            <FormInline label="Утасны дугаар" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={request.phone} name="phone" setter={handleInputFormat} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(request.phone)} />

            <FormRichText
               label="Хуулийн этгээдийн товч тахилцуулга."
               invalid={validate && checkInvalid(request.company_introduction, 'quill')}
               modules="small"
               value={request.company_introduction}
               name="company_introduction"
               setter={handleInput}
               classAppend="md:tw-col-span-2 tw-w-full tw-pl-3 tw-pt-1"
            />

            <FormInline label="Имэйл хаяг" type="email" value={request.company_email} name="company_email" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" validate={true} invalid={validate && checkInvalid(request.company_email)} />

            <TreeSelect data={sectors} label="Харьялагдах салбар" displayName="bdescription_mon" value={request.business_sectorId} name="business_sectorId" handleChange={handleInput} invalid={validate && checkInvalid(request.business_sectorId)} />

            <FormInline label="Улсын бүртгэлийн дугаар" type="number" value={request.company_registration_number} name="company_registration_number" setter={handleInput} classAppend="tw-w-full tw-max-w-md" invalid={validate && checkInvalid(request.company_registration_number)} />

            <FormInline label="Сургалтад хамрагдах ажилчдын тоо" type="number" value={request.participant_number} name="participant_number" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(request.participant_number)} />

            <FormRichText
               label="Та ямар чиглэлээр ямар сургалт авах хүсэлтэй байгаа вэ? Та сургалтын хэрэгцээ, шаардлагаа тодорхой бичнэ үү."
               HelpPopup={<HelpPopup classAppend="tw-mr-2" main="Экспортод чиглэсэн байх шаардлагатай." position="bottom" />}
               invalid={validate && checkInvalid(request.training_request, 'quill')}
               modules="small"
               value={request.training_request}
               name="training_request"
               setter={handleInput}
               classAppend="md:tw-col-span-2 tw-w-full tw-pl-3 tw-pt-1"
            />

            <FormRichText
               label="Та сургалтад хамрагдсанаар та ямар ур чадвар эзэмших вэ? Та сургалтаас авах ашиг, үр дүнгийн талаар дэлгэрэнгүй бичнэ үү."
               invalid={validate && checkInvalid(request.training_benefit, 'quill')}
               modules="small"
               value={request.training_benefit}
               name="training_benefit"
               setter={handleInput}
               classAppend="md:tw-col-span-2 tw-w-full tw-pl-3 tw-pt-1"
            />
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

const quillTypes = ['company_introduction', 'training_request', 'training_benefit']
