import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import FormInline from 'components/urgudul_components/formInline'
import FormOptions from 'components/urgudul_components/formOptions'
import TreeSelect from 'components/urgudul_components/treeSelect'
import FormRichText from 'components/urgudul_components/formRichText'
import { animated, Transition } from 'react-spring/renderprops'
import FileCard from 'pages/attachments/fileCard'
import FileCardAdd from 'pages/attachments/fileCardAdd'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import AlertContext from 'components/utilities/alertContext'
import { useParams } from 'react-router'
import { titleClass, buttonClass } from './trainingsList'
import ModalWindow from 'components/modal_window/modalWindow'
import ExclamationSVG from 'assets/svgComponents/exclamationSVG'
import CheckCircleSVG from 'assets/svgComponents/checkCircleSVG'

export default function TrainingUserRegistration() {
   const [registration, setRegistration] = useState(initialState)

   const handleInput = (key, value) => setRegistration(prev => ({ ...prev, [key]: value }))

   const handleInputFormat = (values, name) => setRegistration(prev => ({ ...prev, [name]: values.value }))

   const handleInputEvent = (e) => setRegistration(prev => ({ ...prev, [e.target.name]: e.target.value }))

   const [sectors, setSectors] = useState([])

   useEffect(() => {
      axios.get('business-sector').then(res => {
         setSectors(res.data.data)
      })
   }, [])

   const [tab, setTab] = useState(true)

   const handleRemoveFile = (key) => setRegistration(prev => ({ ...prev, [key]: null }))

   const FilePreviewCtx = useContext(FilePreviewContext)
   const AlertCtx = useContext(AlertContext)

   const handleDownloadFile = (id) => {
      axios.get(`attach-files/${id}`, {
         headers: { Authorization: getLoggedUserToken() },
         responseType: 'blob',
      }).then(res => {
         const URL = window.URL.createObjectURL(res.data)
         FilePreviewCtx.setFile({ open: true, src: URL })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Файлыг татахад чадсангүй.' })
      })
   }

   // const AnimatedFileCard = animated(FileCard)
   // const AnimatedFileCardAdd = animated(FileCardAdd)

   const [editKey, setEditKey] = useState()

   const fileInputRef = useRef()

   const handleFileClick = (key) => {
      setEditKey(key)
      fileInputRef.current.value = null
      fileInputRef.current.click()
   }

   const handleFileInput = (e) => {
      const formData = new FormData()
      if (!e.target.files[0]) return
      formData.append('file', e.target.files[0])
      formData.append('description', descriptions[editKey])
      setRegistration(prev => ({ ...prev, [editKey]: 'loading' }))

      axios.post('attach-files', formData, {
         headers: {
            'Authorization': getLoggedUserToken(),
            'Content-Type': 'multipart/form-data',
         }
      }).then(res => {
         setRegistration(prev => ({ ...prev, [editKey]: res.data.data }))
      }).catch(err => {
         setRegistration(prev => ({ ...prev, [editKey]: null }))
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Файлыг хадгалж чадсангүй.' })
      })
   }

   const trainingId = useParams().trainingId

   const handleSubmit = () => {
      setValidate(true)
      const allValid = Object.keys(initialState).every(key => {
         switch (key) {
            case 'company_introduction_file':
               if (!checkInvalid(registration.company_introduction, 'quill')) {
                  return true
               } else {
                  return !checkInvalid(registration.company_introduction_file)
               }
            case 'company_introduction':
               if (!checkInvalid(registration.company_introduction_file)) {
                  return true
               } else {
                  return !checkInvalid(registration.company_introduction, 'quill')
               }
            default:
               return !checkInvalid(registration[key], quillTypes.includes(key) && 'quill')
         }
      })

      if (allValid !== true) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      if (trainingId !== undefined && trainingId !== null) {
         axios.post(`trainings/${trainingId}/registrations`, registration)
            .then(res => {
               setRegisterSuccessInfo({ fullname: registration.fullname })
               setModalOpenRegisterSuccess(true)
               setRegistration(initialState)
               setValidate(false)
            }).catch(err => {
               if (err.response.status === 490) {
                  setModalOpenIsFull(true)
                  return
               }
               AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Танийг сургалтанд бүртгэж чадсангүй.' })
            })
      } else {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Бүртгүүлэх сургалтаа сонгоно уу.' })
      }
   }

   const [modalOpenIsFull, setModalOpenIsFull] = useState(false)

   useEffect(() => {
      const timer = setTimeout(() => {
         if (modalOpenIsFull === true) {
            setModalOpenIsFull(false)
         }
      }, 3000)
      return () => clearTimeout(timer)
   }, [modalOpenIsFull])

   const [modalOpenRegisterSuccess, setModalOpenRegisterSuccess] = useState(false)
   const [registerSuccessInfo, setRegisterSuccessInfo] = useState({ fullname: '' })

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
      <div className="tw-text-gray-700 tw-text-sm tw-w-full tw-relative tw-p-2 tw-pb-12">
         <div className={titleClass}>
            Сургалтанд бүртгүүлэх
         </div>

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-4 tw-place-items-start tw-mt-3">
            <FormInline label="Овог нэр" type="text" value={registration.fullname ?? ''} name="fullname" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(registration.fullname)} />

            <FormOptions label="Хүйс" options={['Эрэгтэй', 'Эмэгтэй']} values={['Эрэгтэй', 'Эмэгтэй']} value={registration.gender ?? ''} name="gender" setForm={handleInput} classAppend="tw-w-full tw-max-w-md" invalid={validate && checkInvalid(registration.gender)} />

            <FormInline label="Регистрийн дугаар" type="text" value={registration.register_number ?? ''} name="register_number" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-md" invalid={validate && checkInvalid(registration.register_number)} />

            <FormInline label="Утасны дугаар" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={registration.phone ?? ''} name="phone" onChange={handleInputFormat} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(registration.phone)} />

            <FormInline label="Имэйл хаяг" type="email" value={registration.email ?? ''} name="email" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" validate={true} invalid={validate && checkInvalid(registration.email)} />

            <FormInline label="Байгууллагын нэр" type="text" value={registration.company_name ?? ''} name="company_name" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(registration.company_name)} />

            <FormInline label="Одоогийн ажлын албан тушаал" type="text" value={registration.employee_position ?? ''} name="employee_position" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(registration.employee_position)} />

            <TreeSelect data={sectors} label="Ямар чиглэлээр үйл ажиллагаа явуулдаг вэ?" displayName="bdescription_mon" value={registration.business_sectorId} name="business_sectorId" handleChange={handleInput} invalid={validate && checkInvalid(registration.business_sectorId)} />

            <FormInline label="Жилийн борлуулалтын тоо хэмжээ" type="numberFormat" formats={{ thousandSeparator: true, prefix: '$ ' }} value={registration.annual_sales ?? ''} name="annual_sales" onChange={handleInputFormat} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(registration.annual_sales)} />

            <div className="tw-w-full md:tw-col-span-2">
               <FormLabel label="Манай сургалтад хамрагдах нь танд ямар ашиг тустай вэ? Энэхүү сургалтаас ямар үр дүн хүлээж байгаа вэ?" invalid={validate && checkInvalid(registration.training_benefit, 'quill')} />

               <div className="tw-px-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: 160, maxHeight: 786 }}>
                  <FormRichText modules="small" value={registration.training_benefit ?? ''} name="training_benefit" setForm={handleInput} />
               </div>
            </div>

            <div className="tw-w-full md:tw-col-span-2">
               <div className="tw-flex tw-items-end tw-text-13px tw-mt-5 tw-mb-2">
                  <span className="tw-border-b tw-border-gray-400 tw-ml-3 tw-pl-1 tw-pr-4 tw-font-light tw-pb-0.5">
                     Байгууллагын танилцуулга:
                  </span>
                  <button className={tab ? classActiveTab : classInactiveTab} onClick={() => setTab(true)}>
                     Файлаар
                  </button>
                  <button className={tab ? classInactiveTab : classActiveTab} onClick={() => setTab(false)}>
                     Бичихээр
                  </button>
                  <span className="tw-flex-grow tw-border-b tw-border-gray-400 tw-mr-3" />
               </div>

               <Transition
                  items={tab}
                  from={{ opacity: 0, height: 'auto' }}
                  enter={{ opacity: 1, height: 'auto' }}
                  leave={{ display: 'none' }}>
                  {item => item
                     ? anims =>
                        <animated.div className="tw-overflow-y-hidden" style={anims}>
                           <FormLabel classAppend="tw--mt-3" label="Та доорх хэсэгт өөрийн ажиллаж буй байгууллагын танилцуулгыг хавсаргана уу." invalid={checkInvalid(registration.company_introduction, 'quill') && validate && checkInvalid(registration.company_introduction_file)} />
                           <div className="tw-h-28 tw-pl-8 tw-mt-3">
                              <Transition
                                 items={registration.company_introduction_file}
                                 from={{ transform: 'scale(0)' }}
                                 enter={{ transform: 'scale(1)' }}
                                 leave={{ display: 'none' }}>
                                 {item1 => item1
                                    ? anims1 => <FileCard name={item1?.name} type={item1?.mimetype} size={item1?.size} classAppend="" uploading={item1 === 'loading' && true} removeFile={() => handleRemoveFile('company_introduction_file')} downloadFile={() => handleDownloadFile(item1.id)} style={anims1} />
                                    : anims1 => <FileCardAdd classAppend="" onClick={() => handleFileClick('company_introduction_file')} style={anims1} />
                                 }
                              </Transition>
                           </div>
                        </animated.div>
                     : anims =>
                        <animated.div className="tw-overflow-y-hidden" style={anims}>
                           <FormLabel classAppend="tw--mt-3" label="Та доорх хэсэгт өөрийн ажиллаж буй байгууллагын танилцуулгыг бичнэ үү." invalid={checkInvalid(registration.company_introduction_file) && validate && checkInvalid(registration.company_introduction, 'quill')} />
                           <div className="tw-px-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: 160, maxHeight: 768 }}>
                              <FormRichText modules="small" value={registration.company_introduction ?? ''} name="company_introduction" setForm={handleInput} />
                           </div>
                        </animated.div>
                  }
               </Transition>
            </div>

            <div className="">
               <FormLabel classAppend="tw-mt-4" label="Та доорх хэсэгт ажилтнаа сургалтад хамруулах тухай байгууллагын хүсэлт, албан тоотыг хавсаргана уу." invalid={validate && checkInvalid(registration.company_request_file)} />
               <div className="tw-h-20 tw-pl-8 tw-mt-3">
                  <Transition
                     items={registration.company_request_file}
                     from={{ transform: 'scale(0)' }}
                     enter={{ transform: 'scale(1)' }}
                     leave={{ display: 'none' }}>
                     {item1 => item1
                        ? anims1 => <FileCard name={item1?.name} type={item1?.mimetype} size={item1?.size} classAppend="" uploading={item1 === 'loading' && true} removeFile={() => handleRemoveFile('company_request_file')} downloadFile={() => handleDownloadFile(item1.id)} style={anims1} />
                        : anims1 => <FileCardAdd classAppend="" onClick={() => handleFileClick('company_request_file')} style={anims1} />
                     }
                  </Transition>
               </div>
            </div>

            <div className="">
               <FormLabel classAppend="tw-mt-4" label="Та доорх хэсэгт иргэний үнэмлэхний хуулбарыг хавсаргана уу." invalid={validate && checkInvalid(registration.register_file)} />
               <div className="tw-h-20 tw-pl-8 tw-mt-3">
                  <Transition
                     items={registration.register_file}
                     from={{ transform: 'scale(0)' }}
                     enter={{ transform: 'scale(1)' }}
                     leave={{ display: 'none' }}>
                     {item1 => item1
                        ? anims1 => <FileCard name={item1?.name} type={item1?.mimetype} size={item1?.size} classAppend="" uploading={item1 === 'loading' && true} removeFile={() => handleRemoveFile('register_file')} downloadFile={() => handleDownloadFile(item1.id)} style={anims1} />
                        : anims1 => <FileCardAdd classAppend="" onClick={() => handleFileClick('register_file')} style={anims1} />
                     }
                  </Transition>
               </div>
            </div>
         </div>

         <input className="tw-invisible tw-absolute tw-w-0 tw-h-0" type="file" accept=".pdf, image/*, .doc, .docx" onChange={handleFileInput} ref={fileInputRef} />

         <div className="tw-flex tw-justify-end">
            <button
               className={`${buttonClass} tw-text-sm tw-px-4 tw-m-4 tw-mt-8`}
               onClick={handleSubmit}>
               Бүртгүүлэх
            </button>
         </div>

         <ModalWindow modalOpen={modalOpenIsFull} setModalOpen={setModalOpenIsFull} modalAppend="tw-p-5">
            <div className="tw-px-4 tw-pt-4 tw-pb-2 tw-font-medium tw-text-base tw-flex tw-items-center tw-justify-center">
               Уучлаарай
               <ExclamationSVG className="tw-w-6 tw-h-6 tw-text-red-500 tw-ml-1" />
            </div>
            <div className="tw-font-medium tw-py-4 tw-px-4">
               Бүртгэл дүүрсэн байна.
            </div>
         </ModalWindow>

         <ModalWindow modalOpen={modalOpenRegisterSuccess} setModalOpen={setModalOpenRegisterSuccess} modalAppend="tw-p-5 tw-max-w-sm">
            <div className="tw-px-4 tw-pt-4 tw-pb-2 tw-font-medium tw-text-base tw-flex tw-items-center tw-justify-center">
               Бүртгэл хийгдлээ
               <CheckCircleSVG className="tw-w-6 tw-h-6 tw-text-green-500 tw-ml-1" />
            </div>
            <div className="tw-font-medium tw-py-4 tw-px-4 tw-text-center">
               {registerSuccessInfo.fullname} танийг сургалтанд бүртгэлээ. Та имэйлээ шалгана уу, баярлалаа.
            </div>
         </ModalWindow>
      </div>
   )
}

const initialState = {
   fullname: null,
   gender: null,
   register_number: null,
   phone: null,
   email: null,
   company_name: null,
   employee_position: null,
   business_sectorId: null,
   annual_sales: null,
   training_benefit: null,
   company_introduction: null,
   company_introduction_file: null,
   company_request_file: null,
   register_file: null,
}

export const FormLabel = ({ label, classAppend, HelpPopup, invalid }) => (
   <div className={`tw-flex tw-items-center tw-pl-3 tw-pt-4 ${classAppend ?? ''}`}>
      <span className={`tw-text-sm tw-transition-colors tw-leading-tight ${invalid && 'tw-text-red-500'} tw-transition-colors`}>
         {label}
      </span>
      {HelpPopup && HelpPopup}
   </div>
)

const descriptions = {
   company_introduction_file: 'Cургалтанд бүртгүүлэгчийн байгууллагын танилцуулга.',
   company_request_file: 'Cургалтанд бүртгүүлэгчийн ажилтнаа сургалтад хамруулах тухай байгууллагын хүсэлт, албан тоот.',
   register_file: 'Cургалтанд бүртгүүлэгчийн иргэний үнэмлэхний хуулбар.',
}

const classActiveTab = 'tw-rounded-t-lg tw-border-l tw-border-t tw-border-r tw-border-gray-400 tw-px-2 tw-pb-0.5 tw-pt-1.5 focus:tw-outline-none'
const classInactiveTab = 'tw-font-light tw-rounded-t-lg tw-border-b tw-border-gray-400 tw-px-2 tw-pb-0.5 tw-pt-1.5 focus:tw-outline-none tw-bg-gray-200'

const quillTypes = ['training_benefit', 'company_introduction']
