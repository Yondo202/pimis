import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import FormInline from 'components/urgudul_components/formInline'
import FormOptions from 'components/urgudul_components/formOptions'
import TreeSelect from 'components/urgudul_components/treeSelect'
import FormRichText from 'components/urgudul_components/formRichText'
import PenSVG from 'assets/svgComponents/penSVG'
import { animated, Transition } from 'react-spring/renderprops'
import FileCard from 'pages/attachments/fileCard'
import FileCardAdd from 'pages/attachments/fileCardAdd'
import PaperClipSVG from 'assets/svgComponents/paperClipSVG'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import AlertContext from 'components/utilities/alertContext'
import { useParams } from 'react-router'
import { titleClass, buttonClass } from './trainingsList'

export default function TrainingUserRegistration() {
   const [registration, setRegistration] = useState(initialState)

   const handleInput = (key, value) => setRegistration(prev => ({ ...prev, [key]: value }))

   const handleInputFormat = (values, name) => setRegistration(prev => ({ ...prev, [name]: values.value }))

   const handleInputEvent = (e) => setRegistration(prev => ({ ...prev, [e.target.name]: e.target.value }))

   const [sectors, setSectors] = useState([])

   useEffect(() => {
      axios.get('business-sector')
         .then(res => {
            console.log(res.data)
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
         console.log(res)
         const URL = window.URL.createObjectURL(res.data)
         FilePreviewCtx.setFile({ open: true, src: URL })
      }).catch(err => {
         console.log(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Файлыг татахад алдаа гарлаа.' })
      })
   }

   const AnimatedFileCard = animated(FileCard)
   const AnimatedFileCardAdd = animated(FileCardAdd)

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
         console.log(res.data)
         setRegistration(prev => ({ ...prev, [editKey]: res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Файл амжилттай хадгалагдлаа.' })
      }).catch(err => {
         console.log(err.response?.data)
         setRegistration(prev => ({ ...prev, [editKey]: null }))
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Файлыг хадгалж чадсангүй.' })
      })
   }

   const trainingId = useParams().trainingId

   const handleSubmit = () => {
      if (trainingId !== undefined && trainingId !== null) {
         axios.post(`training-registrations`, registration, {
            headers: { Authorization: getLoggedUserToken() },
            params: { trainingId: trainingId }
         }).then(res => {
            console.log(res)
            setRegistration(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Танийг сургалтанд бүртгэлээ.' })
         }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Танийг сургалтанд бүртгэж чадсангүй.' })
         })
      } else {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Бүртгүүлэх сургалтаа сонгоно уу.' })
      }
   }

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-w-full tw-relative tw-p-2 tw-pb-12">
         <div className={titleClass}>
            Сургалтанд бүртгүүлэх
         </div>

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-pl-1 tw-pr-4 tw-mt-3">
            <FormInline label="Овог нэр" type="text" value={registration.fullname ?? ''} name="fullname" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" />

            <FormOptions label="Хүйс" options={['Эрэгтэй', 'Эмэгтэй']} values={['Эрэгтэй', 'Эмэгтэй']} value={registration.gender ?? ''} name="gender" setForm={handleInput} classAppend="tw-w-full tw-max-w-lg" />

            <FormInline label="Регистрийн дугаар" type="text" value={registration.register_number ?? ''} name="register_number" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" />

            <FormInline label="Утасны дугаар" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={registration.phone ?? ''} name="phone" onChange={handleInputFormat} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" />

            <FormInline label="Имэйл хаяг" type="email" value={registration.email ?? ''} name="email" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" validate={true} />

            <FormInline label="Байгууллагын нэр" type="text" value={registration.company_name ?? ''} name="company_name" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" />

            <FormInline label="Одоогийн ажлын албан тушаал" type="text" value={registration.employee_position ?? ''} name="employee_position" onChange={handleInputEvent} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-full" />

            <TreeSelect data={sectors} label="Ямар чиглэлээр үйл ажиллагаа явуулдаг вэ?" displayName="bdescription_mon" value={registration.business_sectorId} name="business_sectorId" handleChange={handleInput} />

            <FormInline label="Жилийн борлуулалтын тоо хэмжээ" type="numberFormat" formats={{ thousandSeparator: true, prefix: '$ ' }} value={registration.annual_sales ?? ''} name="annual_sales" onChange={handleInputFormat} classAppend="tw-w-full tw-max-w-lg" classInput="tw-w-40" />

            <div className="tw-w-full md:tw-col-span-2">
               <FormLabel label="Манай сургалтад хамрагдах нь танд ямар ашиг тустай вэ? Энэхүү сургалтаас ямар үр дүн хүлээж байгаа вэ?" SVG={PenSVG} />

               <div className="tw-pl-8 tw-pr-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: 160, maxHeight: 786 }}>
                  <FormRichText modules="small" value={registration.training_benefit ?? ''} name="training_benefit" setForm={handleInput} />
               </div>
            </div>

            <div className="tw-w-full md:tw-col-span-2">
               <div className="tw-flex tw-items-end tw-text-13px tw-mt-5 tw-mb-2">
                  <span className="tw-border-b tw-border-gray-400 tw-ml-3 tw-pl-1 tw-pr-4 tw-font-medium tw-pb-0.5">
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
                           <FormLabel classAppend="tw--mt-3" label="Та доорх хэсэгт өөрийн ажиллаж буй байгууллагын танилцуулгыг хавсаргана уу." SVG={PaperClipSVG} />
                           <div className="tw-h-28 tw-pl-8 tw-mt-3">
                              <Transition
                                 items={registration.company_introduction_file}
                                 from={{ transform: 'scale(0)' }}
                                 enter={{ transform: 'scale(1)' }}
                                 leave={{ display: 'none' }}>
                                 {item1 => item1
                                    ? anims1 => <AnimatedFileCard name={item1?.name} type={item1?.mimetype} size={item1?.size} classAppend="" uploading={item1 === 'loading' && true} removeFile={() => handleRemoveFile('company_introduction_file')} downloadFile={() => handleDownloadFile(item1.id)} style={anims1} />
                                    : anims1 => <AnimatedFileCardAdd classAppend="" onClick={() => handleFileClick('company_introduction_file')} style={anims1} />
                                 }
                              </Transition>
                           </div>
                        </animated.div>
                     : anims =>
                        <animated.div className="tw-overflow-y-hidden" style={anims}>
                           <FormLabel classAppend="tw--mt-3" label="Та доорх хэсэгт өөрийн ажиллаж буй байгууллагын танилцуулгыг бичнэ үү." SVG={PenSVG} />
                           <div className="tw-pl-8 tw-pr-2 tw-py-2 tw-h-40 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl" style={{ minHeight: 160, maxHeight: 768 }}>
                              <FormRichText modules="small" value={registration.company_introduction ?? ''} name="company_introduction" setForm={handleInput} />
                           </div>
                        </animated.div>
                  }
               </Transition>
            </div>

            <div className="">
               <FormLabel classAppend="tw-mt-4" label="Та доорх хэсэгт ажилтнаа сургалтад хамруулах тухай байгууллагын хүсэлт, албан тоотыг хавсаргана уу." SVG={PaperClipSVG} />
               <div className="tw-h-20 tw-pl-8 tw-mt-3">
                  <Transition
                     items={registration.company_request_file}
                     from={{ transform: 'scale(0)' }}
                     enter={{ transform: 'scale(1)' }}
                     leave={{ display: 'none' }}>
                     {item1 => item1
                        ? anims1 => <AnimatedFileCard name={item1?.name} type={item1?.mimetype} size={item1?.size} classAppend="" uploading={item1 === 'loading' && true} removeFile={() => handleRemoveFile('company_request_file')} downloadFile={() => handleDownloadFile(item1.id)} style={anims1} />
                        : anims1 => <AnimatedFileCardAdd classAppend="" onClick={() => handleFileClick('company_request_file')} style={anims1} />
                     }
                  </Transition>
               </div>
            </div>

            <div className="">
               <FormLabel classAppend="tw-mt-4" label="Та доорх хэсэгт иргэний үнэмлэхний хуулбарыг хавсаргана уу." SVG={PaperClipSVG} />
               <div className="tw-h-20 tw-pl-8 tw-mt-3">
                  <Transition
                     items={registration.register_file}
                     from={{ transform: 'scale(0)' }}
                     enter={{ transform: 'scale(1)' }}
                     leave={{ display: 'none' }}>
                     {item1 => item1
                        ? anims1 => <AnimatedFileCard name={item1?.name} type={item1?.mimetype} size={item1?.size} classAppend="" uploading={item1 === 'loading' && true} removeFile={() => handleRemoveFile('register_file')} downloadFile={() => handleDownloadFile(item1.id)} style={anims1} />
                        : anims1 => <AnimatedFileCardAdd classAppend="" onClick={() => handleFileClick('register_file')} style={anims1} />
                     }
                  </Transition>
               </div>
            </div>
         </div>

         <input className="tw-invisible tw-absolute tw-w-0 tw-h-0" type="file" onChange={handleFileInput} ref={fileInputRef} />

         <div className="tw-flex tw-justify-end">
            <button
               className={`${buttonClass} tw-text-sm tw-px-4 tw-m-4 tw-mt-8`}
               onClick={handleSubmit}>
               Бүртгүүлэх
            </button>
         </div>
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

export const FormLabel = ({ label, SVG, classAppend, HelpPopup }) => (
   <div className={`tw-flex tw-items-center tw-pl-3 tw-pt-4 ${classAppend ?? ''}`}>
      <SVG className="tw-w-5 tw-h-5 tw-text-gray-600 tw-transition-colors tw-flex-shrink-0" />
      <span className="tw-mx-2 tw-text-sm tw-font-medium tw-transition-colors tw-leading-tight">
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

const classActiveTab = 'tw-font-medium tw-rounded-t-lg tw-border-l tw-border-t tw-border-r tw-border-gray-400 tw-px-2 tw-pb-0.5 tw-pt-1.5 focus:tw-outline-none'
const classInactiveTab = 'tw-rounded-t-lg tw-border-b tw-border-gray-400 tw-px-2 tw-pb-0.5 tw-pt-1.5 focus:tw-outline-none tw-bg-gray-100'
