import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import { useHistory, useParams } from 'react-router'
import FileCardAdd from 'pages/attachments/fileCardAdd'
import { Transition, animated } from 'react-spring/renderprops'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import FileCard from 'pages/attachments/fileCard'
import FilePreviewContext from 'components/utilities/filePreviewContext'

export default function TrainingEdit() {
   const [training, setTraining] = useState(initialState)

   const handleInput = (key, value) => setTraining(prev => ({ ...prev, [key]: value }))

   const [trainingId, setTrainingId] = useState(useParams().id)

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      if (trainingId !== null && trainingId !== undefined) {
         axios.get(`trainings/${trainingId}`, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            console.log(res)
            setTraining(res.data.data)
         }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтыг татаж чадсангүй.' })
         })
      }
   }, [])

   const handleSubmit = () => {
      if (trainingId !== null && trainingId !== undefined) {
         axios.put(`trainings/${trainingId}`, training, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            console.log(res)
            setTraining(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сургалтын мэдээллэл нэмэгдлээ' })
         }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалт үүсгэж чадсангүй.' })
         })
      }
      else {
         axios.post('trainings', training, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            console.log(res)
            setTraining(res.data.data)
            setTrainingId(res.data.data.id)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сургалтын мэдээллэл нэмэгдлээ' })
         }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалт засаж чадсангүй.' })
         })
      }
   }

   const handleFileInput = (e) => {
      const formData = new FormData()
      if (!e.target.files[0]) return
      formData.append('file', e.target.files[0])
      formData.append('description', 'Сургалтын хөтөлбөр файлаар.')
      setTraining(prev => ({ ...prev, module_file: 'loading' }))

      axios.post('attach-files', formData, {
         headers: {
            'Authorization': getLoggedUserToken(),
            'Content-Type': 'multipart/form-data',
         }
      }).then(res => {
         console.log(res)
         setTraining(prev => ({ ...prev, module_file: res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Файл амжилттай хадгалагдлаа.' })
      }).catch(err => {
         console.log(err.response)
         setTraining(prev => ({ ...prev, module_file: null }))
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Файлыг хадгалж чадсангүй.' })
      })
   }

   const AnimatedFileCard = animated(FileCard)
   const AnimatedFileCardAdd = animated(FileCardAdd)

   const fileInputRef = useRef()

   const handleAddFileClick = () => {
      fileInputRef.current.value = null
      fileInputRef.current.click()
   }

   const handleRemoveFile = () => setTraining(prev => ({ ...prev, module_file: null }))

   const FilePreviewCtx = useContext(FilePreviewContext)

   const handleDownloadFile = () => {
      axios.get(`attach-files/${training.module_file?.id}`, {
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

   const history = useHistory()

   return (
      <div className="tw-absolute tw-text-gray-700 tw-text-sm tw-w-full">
         <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px" onClick={() => history.push('/trainings')}>
            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
            Буцах
         </button>

         <div className="tw-rounded tw-shadow-md tw-bg-white tw-max-w-5xl tw-w-full tw-pt-8 tw-mt-6">
            <div className="tw-text-center tw-p-2 tw-mb-8 tw-text-lg tw-font-semibold">
               Сургалтын мэдээлэл оруулах
            </div>

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-stretch tw-p-2 tw-w-full">
               <FormElement label="Сургалтын нэр" value={training.training_name} keyName="training_name" onChange={handleInput} />

               <FormElement label="Сургалтын агуулга, файлаар">
                  <Transition
                     items={training.module_file}
                     from={{ transform: 'scale(0)' }}
                     enter={{ transform: 'scale(1)' }}
                     leave={{ display: 'none' }}>
                     {item => item
                        ? anims =>
                           <AnimatedFileCard name={item?.name} type={item?.mimetype} size={item?.size} classAppend="" uploading={item === 'loading' && true} removeFile={handleRemoveFile} downloadFile={handleDownloadFile} style={anims} />
                        : anims =>
                           <AnimatedFileCardAdd classAppend="" onClick={handleAddFileClick} style={anims} />
                     }
                  </Transition>

                  <input className="tw-invisible tw-absolute tw-bottom-0" type="file" onChange={handleFileInput} ref={fileInputRef} />
               </FormElement>

               <FormElement label="Сургалтын төрөл">
                  <SelectChild options={trainingTypes} value={training.training_type} keyName="training_type" handleInput={handleInput} />
               </FormElement>

               <FormElement label="Сургалтын хэлбэр">
                  <SelectChild options={trainingMethods} value={training.training_method} keyName="training_method" handleInput={handleInput} />
               </FormElement>

               <FormElement label="Сургалт эхлэх өдөр">
                  <input className="tw-border tw-border-gray-400 tw-rounded focus:tw-outline-none focus:tw-ring-2 tw-ring-blue-400 tw-px-1.5 tw-py-0.5" type="date" style={{ width: 146 }} value={training.start_date ?? ''} onChange={e => handleInput('start_date', e.target.value)} />
               </FormElement>

               <FormElement label="Сургалт дуусах өдөр">
                  <input className="tw-border tw-border-gray-400 tw-rounded focus:tw-outline-none focus:tw-ring-2 tw-ring-blue-400 tw-px-1.5 tw-py-0.5" type="date" style={{ width: 146 }} value={training.end_date ?? ''} onChange={e => handleInput('end_date', e.target.value)} />
               </FormElement>

               <FormElement label="Сургалтын цаг">
                  <div className="tw-flex tw-items-center">
                     <span className="tw-text-13px tw-font-medium">Эхлэх цаг:</span>
                     <input className="tw-ml-2 tw-border tw-border-gray-400 tw-rounded focus:tw-outline-none focus:tw-ring-2 tw-ring-blue-400 tw-px-1.5 tw-py-0.5" type="time" style={{ width: 110 }} value={training.start_time ?? ''} onChange={e => handleInput('start_time', e.target.value)} />
                  </div>

                  <div className="tw-mt-2 tw-flex tw-items-center">
                     <span className="tw-text-13px tw-font-medium">Дуусах цаг:</span>
                     <input className="tw-ml-2 tw-border tw-border-gray-400 tw-rounded focus:tw-outline-none focus:tw-ring-2 tw-ring-blue-400 tw-px-1.5 tw-py-0.5" type="time" style={{ width: 110 }} value={training.end_time ?? ''} onChange={e => handleInput('end_time', e.target.value)} />
                  </div>
               </FormElement>

               <FormElement label="Сургалт зохион байгуулах байгууллага" value={training.organizer} keyName="organizer" onChange={handleInput} />

               <FormElement label="Байршил, сургалт зохион байгуулагдах хаяг" value={training.location} keyName="location" onChange={handleInput} />

               <FormElement label="Оролцогчдын тоо" type="number" width={80} value={training.participant_number} keyName="participant_number" onChange={handleInput} />

               <FormElement label="Сургалтын цар хүрээ">
                  <SelectChild options={trainingScopes} value={training.scope} keyName="scope" handleInput={handleInput} />
               </FormElement>
            </div>

            <div className="tw-flex tw-justify-center">
               <button className="tw-rounded tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-py-2 tw-px-6 tw-text-white tw-font-medium tw-my-6 focus:tw-outline-none tw-mr-8" onClick={handleSubmit}>
                  Хадгалах
               </button>
            </div>
         </div>
      </div>
   )
}

const initialState = {
   training_name: null,
   module_file: null,
   training_type: null,
   training_method: null,
   start_date: null,
   end_date: null,
   start_time: null,
   end_time: null,
   organizer: null,
   location: null,
   participant_number: null,
   scope: null,
}

const FormElement = ({ label, children, type, width, value, keyName, onChange, classAppend }) => (
   <div className={`tw-max-w-md tw-relative tw-m-1 tw-pl-1 tw-w-full ${classAppend ?? ''}`} style={{ minHeight: 96 }}>
      <div className="tw-mb-2 tw-font-medium">
         {label}:
      </div>

      {children
         ? children
         : <input
            className="focus:tw-outline-none focus:tw-ring-2 tw-ring-blue-400 tw-border tw-border-gray-400 tw-rounded tw-px-1.5 tw-py-1 tw-transition-colors"
            type={type ?? 'text'}
            style={{ width: width ?? '100%', maxWidth: 240 }}
            value={value ?? ''}
            onChange={e => onChange(keyName, e.target.value)} />
      }
   </div>
)

const SelectChild = ({ options, value, keyName, handleInput }) => {
   const [dropOpen, setDropOpen] = useState(false)
   const [otherSelected, setOtherSelected] = useState(false)
   const optionsPlus = [...options, 'Бусад']

   const handleSelect = (option) => {
      if (option === 'Бусад') {
         handleInput(keyName, '')
         setDropOpen(false)
         setOtherSelected(true)
      } else {
         handleInput(keyName, option)
         setDropOpen(false)
         setOtherSelected(false)
      }
   }

   const buttonRef = useRef()
   const dropDownRef = useRef()

   const handleClickOutside = (e) => {
      if (!buttonRef.current?.contains(e.target) && !dropDownRef.current?.contains(e.target)) {
         setDropOpen(false)
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   })

   return (
      <div className="tw-relative tw-h-20 tw-w-full">
         <button
            className="tw-w-40 tw-h-7 tw-rounded focus:tw-outline-none hover:tw-shadow-md tw-border tw-border-gray-400 tw-flex tw-items-center focus:tw-ring-2 tw-ring-blue-400 tw-transition-colors"
            onClick={() => setDropOpen(prev => !prev)}
            ref={buttonRef}>
            <span className="tw-mx-2">
               {options.includes(value)
                  ? value
                  : value === null
                     ? 'Сонгох'
                     : 'Бусад'
               }
            </span>
            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-ml-auto tw-mr-1" />
         </button>

         <Transition
            items={dropOpen}
            from={{ height: 0, opacity: 0 }}
            enter={{ height: 'auto', opacity: 1 }}
            leave={{ height: 0, opacity: 0 }}>
            {item => item && (anims =>
               <animated.div
                  className="tw-absolute tw-top-8 tw-left-0 tw-w-40 tw-rounded tw-shadow-md tw-z-10 tw-border tw-border-gray-400 tw-bg-white tw-overflow-hidden tw-divide-y tw-divide-dashed"
                  style={anims}
                  ref={dropDownRef}>
                  {optionsPlus.map(option =>
                     <div className="tw-cursor-pointer tw-py-1 tw-px-1.5 hover:tw-bg-blue-300 tw-transition-colors" key={option} onClick={() => handleSelect(option)}>
                        {option}
                     </div>
                  )}
               </animated.div>
            )}
         </Transition>

         <Transition
            items={!options.includes(value) && otherSelected}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}>
            {item => item && (anims =>
               <animated.div className="tw-mt-5 tw-flex tw-items-center" style={anims}>
                  <span className="tw-ml-1 tw-text-13px tw-font-medium">
                     Бусад:
                  </span>
                  <input className="tw-w-28 tw-border tw-border-gray-400 tw-rounded focus:tw-outline-none tw-py-1 tw-px-1.5 tw-ml-1 focus:tw-ring-2 tw-ring-blue-400" type="text" value={value ?? ''} onChange={e => handleInput(keyName, e.target.value)} />
               </animated.div>
            )}
         </Transition>
      </div>
   )
}

const trainingTypes = [
   'Ерөнхий сургалт',
   'Захиалгат сургалт',
]

const trainingMethods = [
   'Цахим',
   'Танхим',
]

const trainingScopes = [
   'Дотоод сургалт',
   'Гадаад сургалт',
]
