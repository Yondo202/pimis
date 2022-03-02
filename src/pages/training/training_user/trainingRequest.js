import CheckCircleSVG from 'assets/svgComponents/checkCircleSVG'
import axios from 'axiosbase'
import HelpPopup from 'components/help_popup/helpPopup'
import ModalWindow from 'components/modal_window/modalWindow'
import FormInline from 'components/urgudul_components/formInline'
import FormRichText from 'components/urgudul_components/formRichText'
import FormSelect from 'components/urgudul_components/formSelect'
import AlertContext from 'components/utilities/alertContext'
import React, { useContext, useEffect, useState } from 'react'
import { Transition, animated } from 'react-spring/renderprops'
import { buttonClass, titleClass } from './trainingsList'

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
      const allValid = Object.keys(initialState).every(key => {
         switch (key) {
            case 'business_sector_other':
               return request.business_sectorId === 1024
                  ? !checkInvalid(request.business_sector_other)
                  : true
            default:
               return !checkInvalid(request[key], quillTypes.includes(key) && 'quill')
         }
      })

      if (allValid !== true) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      axios.post('trainings/requests', request).then(res => {
         setModalOpenSuccess(true)
         setRequest(initialState)
         setValidate(false)
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

   const [modalOpenSuccess, setModalOpenSuccess] = useState(false)

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

            <div className="tw-w-full tw-max-w-md">
               <FormSelect data={sectors} label="Харъяалагдах салбар" displayName="bdescription_mon" value={request.business_sectorId} name="business_sectorId" setter={handleInput} classAppend="" invalid={validate && checkInvalid(request.business_sectorId)} />

               <Transition
                  items={request.business_sectorId === 1024}
                  from={{ height: 0, opacity: 0 }}
                  enter={{ height: 'auto', opacity: 1 }}
                  leave={{ height: 0, opacity: 0 }}
                  onDestroyed={() => handleInput('business_sector_other', null)}
               >
                  {item => item && (anims =>
                     <div className="tw-flex tw-overflow-hidden tw-pl-3 tw-pr-3 tw-gap-x-3 tw-mt-1" style={anims}>
                        <span className="tw-mt-1.5">
                           Бусад:
                        </span>
                        <input type="text" className={`focus:tw-outline-none tw-border ${(validate && checkInvalid(request.business_sector_other)) ? 'tw-border-red-500' : 'tw-border-gray-400'} focus:tw-border-blue-700 tw-duration-700 tw-transition-colors tw-rounded tw-py-1 tw-px-2 tw-flex-grow`} value={request.business_sector_other} onChange={e => handleInput('business_sector_other', e.target.value)} />
                     </div>
                  )}
               </Transition>
            </div>

            <FormInline label="Улсын бүртгэлийн дугаар" type="number" value={request.company_registration_number} name="company_registration_number" setter={handleInput} classAppend="tw-w-full tw-max-w-md" invalid={validate && checkInvalid(request.company_registration_number)} />

            <FormInline label="Сургалтад хамрагдах ажилчдын тоо" type="number" value={request.participant_number} name="participant_number" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(request.participant_number)} />

            <FormRichText
               label="Та ямар чиглэлээр ямар сургалт авах хүсэлтэй байна вэ? Та сургалтын хэрэгцээ, шаардлагаа тодорхой бичнэ үү."
               HelpPopup={<HelpPopup classAppend="tw-mr-2" main="Экспортод чиглэсэн байх шаардлагатай." />}
               invalid={validate && checkInvalid(request.training_request, 'quill')}
               modules="small"
               value={request.training_request}
               name="training_request"
               setter={handleInput}
               classAppend="md:tw-col-span-2 tw-w-full tw-pl-3 tw-pt-1"
            />

            <FormRichText
               label="Та сургалтад хамрагдсанаар ямар ур чадвар эзэмших вэ? Та сургалтаас авах ашиг, үр дүнгийн талаар дэлгэрэнгүй бичнэ үү."
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

         <ModalWindow modalOpen={modalOpenSuccess} setModalOpen={setModalOpenSuccess} modalAppend="tw-p-5">
            <div className="tw-px-4 tw-pt-4 tw-pb-2 tw-font-medium tw-text-base tw-flex tw-items-center tw-justify-center">
               Захиалгат сургалтын хүсэлтийг хүлээж авлаа
               <CheckCircleSVG className="tw-w-6 tw-h-6 tw-text-green-500 tw-ml-1" />
            </div>
         </ModalWindow>
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
   business_sector_other: null,
   company_registration_number: null,
   company_email: null,
   participant_number: null,
   training_request: null,
   training_benefit: null,
}

const quillTypes = ['company_introduction', 'training_request', 'training_benefit']
