import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import { useHistory } from 'react-router'
import { Transition, animated, Spring } from 'react-spring/renderprops'
import PaperClipSVG from 'assets/svgComponents/paperClipSVG'
import CalendarSVG from 'assets/svgComponents/calendarSVG'
import ClockSVG from 'assets/svgComponents/clockSVG'
import LocationMarkerSVG from 'assets/svgComponents/locationMarker'
import UsersSVG from 'assets/svgComponents/usersSVG'
import HelpPopup from 'components/help_popup/helpPopup'
import LibrarySVG from 'assets/svgComponents/librarySVG'

export default function TrainingList() {
   const [trainings, setTrainings] = useState([])

   const AlertCtx = useContext(AlertContext)
   const FilePreviewCtx = useContext(FilePreviewContext)

   useEffect(() => {
      axios.get('trainings', {
         headers: { Authorization: getLoggedUserToken() },
         params: { user: true }
      }).then(res => {
         console.log(res)
         setTrainings(res.data.data)
      }).catch(err => {
         console.error(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтуудыг татаж чадсангүй.' })
      })
   }, [])

   const history = useHistory()

   const navRegistration = (id, e) => {
      e.stopPropagation()
      history.push(`/trainings/${id}/registration`)
   }

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

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-w-full tw-px-4 tw-pt-8 tw-pb-20 tw-flex tw-justify-center">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-w-full tw-max-w-2xl tw-p-2 tw-pt-8 tw-pb-8">
            <div className="tw-text-base tw-font-medium tw-text-center tw-mb-8">
               Зохион байгуулагдах сургалтууд
            </div>

            {/* <table className="">
               <thead>
                  <tr>
                     {tableHeaders.map(header =>
                        <th className="tw-border tw-border-gray-400" key={header}>
                           {header}
                        </th>
                     )}
                  </tr>
               </thead>
               <tbody>
                  {trainings.map(training =>
                     <tr className="" key={training.id}>
                        {rowFields.map(field => {
                           switch (field) {
                              case 'module_file':
                                 return <td className="tw-border tw-border-gray-400" key={field}>
                                    <button
                                       className="tw-w-32 tw-truncate focus:tw-outline-none tw-rounded tw-px-2 tw-py-0.5 tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-text-white"
                                       onClick={() => handleDownloadFile(training.module_file?.id)}
                                       title={training.module_file?.name}>
                                       {training.module_file?.name}
                                    </button>
                                 </td>
                              case 'start_time':
                                 return <td className="tw-border tw-border-gray-400" key={field}>
                                    {training.start_time} - {training.end_time}
                                 </td>
                              case 'registerButton':
                                 return <td className="tw-border tw-border-gray-400" key={field}>
                                    <button className="focus:tw-outline-none tw-rounded tw-px-2 tw-py-0.5 tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-text-white" onClick={() => navRegistration(training.id)}>
                                       Бүртгүүлэх
                                    </button>
                                 </td>
                              default:
                                 return <td className="tw-border tw-border-gray-400" key={field}>
                                    {training[field]}
                                 </td>
                           }
                        })}
                     </tr>
                  )}
               </tbody>
            </table> */}

            <div className="tw-text-15px tw-font-medium tw-px-2 tw-py-1 tw-text-gray-600">
               Зарлагдсан сургалтууд
            </div>

            <div className="tw-overflow-x-hidden tw-overflow-y-auto tw-p-2" style={{ maxHeight: 768 }}>
               {trainings.map(training =>
                  <TrainingCard training={training} key={training.id} navRegistration={navRegistration} handleDownloadFile={handleDownloadFile} />
               )}
            </div>

            <TrainingRequest />

            <TrainingFeedback />
         </div>
      </div>
   )
}

// const tableHeaders = [
//    'Сургалтын нэр',
//    'Сургалтын агуулга, файлаар',
//    'Сургалтын төрөл',
//    'Сургалтын хэлбэр',
//    'Сургалт эхлэх өдөр',
//    'Сургалт дуусах өдөр',
//    'Сургалтын цаг',
//    'Сургалт зохион байгуулах байгууллага',
//    'Байршил, сургалт зохион байгуулагдах хаяг',
//    'Оролцогчдын тоо',
//    'Сургалтын цар хүрээ',
//    'Бүртгүүлэх',
// ]

// const rowFields = [
//    'training_name',
//    'module_file',
//    'training_type',
//    'training_method',
//    'start_date',
//    'end_date',
//    'start_time',
//    'organizer',
//    'location',
//    'participant_number',
//    'scope',
//    'registerButton',
// ]

const TrainingCard = ({ training, navRegistration, handleDownloadFile }) => {
   const [expanded, setExpanded] = useState(false)

   const handleViewFile = (e) => {
      e.stopPropagation()
      handleDownloadFile(training.module_file.id)
   }

   return (
      <div className="tw-rounded-lg tw-cursor-pointer tw-border tw-border-gray-500 tw-w-full tw-p-1 tw-mb-4 tw-font-medium tw-relative" onClick={() => setExpanded(prev => !prev)}>
         <div className="tw-text-base tw-px-2 tw-border-b tw-border-gray-500 tw-flex tw-items-center tw-justify-between tw-py-1 tw--mx-1">
            {training.training_name}
            <span className="tw-flex tw-items-center tw-mr-1">
               <UsersSVG className="tw-w-5 tw-h-5 tw-mr-1" />
               {training.registeredUserCount}/{training.participant_number}
            </span>
         </div>

         <Spring
            from={{ height: 30 }}
            to={{ height: expanded ? 'auto' : 76 }}>
            {anims =>
               <animated.div className="tw-overflow-hidden" style={anims}>
                  <div className="hover:tw-bg-blue-500 hover:tw-text-white tw-rounded-md tw-transition-colors tw-pt-0.5 tw-pb-1 tw-px-1 tw-mt-1" onClick={handleViewFile}>
                     <span className="tw-border-b tw-border-current tw-inline-flex tw-items-center">
                        <span className="tw-mr-0.5">
                           Сургалтын агуулгыг харах
                        </span>
                        <PaperClipSVG className="tw-w-5 tw-h-5" />
                     </span>
                  </div>
                  <div className="tw-px-1 tw-mt-0.5">
                     Төрөл: {training.training_type}
                  </div>
                  <div className="tw-px-1 tw-mt-0.5">
                     Орчин: {training.training_method}
                  </div>
                  <div className="tw-flex tw-items-center tw-px-1 tw-mt-0.5">
                     <CalendarSVG className="tw-w-5 tw-h-5 tw-mr-1" />
                     <span className="">{training.start_date}</span>
                     <span className="tw-mx-1">–</span>
                     <span className="">{training.end_date}</span>
                  </div>
                  <div className="tw-flex tw-items-center tw-px-1 tw-mt-0.5">
                     <ClockSVG className="tw-w-5 tw-h-5 tw-mr-1" />
                     <span className="">{training.start_time?.slice(0, 5)}</span>
                     <span className="tw-mx-1">–</span>
                     <span className="">{training.end_time?.slice(0, 5)}</span>
                  </div>
                  <div className="tw-flex tw-items-center tw-px-1 tw-mt-0.5">
                     <LibrarySVG className="w-5 tw-h-5 tw-mr-1" />
                     {training.organizer}
                  </div>
                  <div className="tw-flex tw-items-center tw-px-1 tw-mt-0.5">
                     <LocationMarkerSVG className="w-5 tw-h-5 tw-mr-1" />
                     {training.location}
                  </div>
                  <div className="tw-px-1 tw-mt-0.5">
                     {training.scope}
                  </div>
                  <div className="tw-flex tw-justify-end">
                     <button className="focus:tw-outline-none tw-rounded tw-px-5 tw-py-1 tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-text-white tw-mb-2 tw-mr-2" onClick={e => navRegistration(training.id, e)}>
                        Бүртгүүлэх
                     </button>
                  </div>
               </animated.div>
            }
         </Spring>
      </div>
   )
}

const TrainingRequest = () => {
   const history = useHistory()
   const handleNavRequest = () => history.push('/trainings/request')

   return (
      <div className="tw-mt-6 tw-w-full">
         <div className="tw-flex tw-items-center tw-border-b tw-border-gray-500">
            <span className="tw-text-15px tw-font-medium tw-px-1 tw-py-1 tw-text-gray-600">
               Захиалгат сургалтын хүсэлт илгээх
            </span>
            <HelpPopup classAppend="tw-mx-2" popupClass="tw-w-96" main="Та захиалгат сургалтын хүсэлтээр дамжуулан сургалт зохион байгуулагч талуудад өөрт хэрэгтэй байгаа сургалтын чиглэл, хөтөлбөрийн талаарх мэдээллийг хүргүүлэх боломжтой." position="bottom" />
         </div>

         <div className="tw-flex tw-justify-end">
            <button className="focus:tw-outline-none tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-px-8 tw-py-1.5 tw-text-white tw-font-medium tw-my-4 tw-mr-4" onClick={handleNavRequest}>
               Хүсээлт илгээх
            </button>
         </div>
      </div>
   )
}

const TrainingFeedback = () => {
   const [code, setCode] = useState('')

   const history = useHistory()
   const handleNavFeedback = () => history.push(`/trainings/${1}/feedback`)

   return (
      <div className="tw-mt-6 tw-w-full">
         <div className="tw-flex tw-items-center tw-border-b tw-border-gray-500">
            <span className="tw-text-15px tw-font-medium tw-px-1 tw-py-1 tw-text-gray-600">
               Сургалтад үнэлгээ өгөх
            </span>
            <HelpPopup classAppend="tw-mx-2" popupClass="tw-w-96" main="Та өөрийн хамрагдсан сургалтанд үнэлгээ өгөх, сургалтын талаарх санал хүсэлтээ ирүүлэх хүсэлтэй бол үүгээр хандана уу." list={['Сургалтанд бүртгүүлэх үед имэйл хаягаар ирсэн кодыг оруулна уу.']} position="bottom" />
         </div>

         <div className="tw-flex tw-items-center tw-justify-end">
            <span className="tw-mr-2 tw-font-medium">Код:</span>
            <input className="tw-px-1.5 tw-py-1 tw-w-20 tw-rounded focus:tw-ring-2 tw-ring-blue-500 focus:tw-outline-none tw-border-2 tw-border-blue-500 tw-transition-colors" type="text" value={code} onChange={e => setCode(e.target.value)} />

            <button className="focus:tw-outline-none tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-px-8 tw-py-1.5 tw-text-white tw-font-medium tw-ml-4 tw-my-4 tw-mr-4" onClick={handleNavFeedback}>
               Үнэлгий өгөх
            </button>
         </div>
      </div>
   )
}
