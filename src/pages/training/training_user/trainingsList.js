import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import { useHistory } from 'react-router'
import { Transition, animated } from 'react-spring/renderprops'
import CalendarSVG from 'assets/svgComponents/calendarSVG'
import ClockSVG from 'assets/svgComponents/clockSVG'
import LocationMarkerSVG from 'assets/svgComponents/locationMarker'
import UsersSVG from 'assets/svgComponents/usersSVG'
import LibrarySVG from 'assets/svgComponents/librarySVG'
import { Link } from 'react-router-dom'
import ModalWindow from 'components/modal_window/modalWindow'
import ExclamationSVG from 'assets/svgComponents/exclamationSVG'

export default function TrainingsList() {
   const [trainings, setTrainings] = useState([])

   const AlertCtx = useContext(AlertContext)
   const FilePreviewCtx = useContext(FilePreviewContext)

   useEffect(() => {
      axios.get('trainings', {
         params: { status: 'active' },
      }).then(res => {
         setTrainings(res.data.data)
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сургалтуудыг татаж чадсангүй.' })
      })
   }, [])

   const handleDownloadFile = (id) => {
      axios.get(`attach-files/${id}`, {
         headers: { Authorization: getLoggedUserToken() },
         responseType: 'blob',
      }).then(res => {
         const URL = window.URL.createObjectURL(res.data)
         FilePreviewCtx.setFile({ open: true, src: URL })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Файлыг татаж чадсангүй.' })
      })
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

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-w-full tw-p-2 tw-pb-12">
         <div className={titleClass}>
            Зарлагдсан сургалтууд
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

         {trainings.map(training =>
            <TrainingCard training={training} key={training.id} handleDownloadFile={handleDownloadFile} setModalOpenIsFull={setModalOpenIsFull} />
         )}

         {/* {[{ ...trainings[0], training_name: 'Экпортыг дэмжих төслийн ерөнхий сургалт', registeredUserCount: 25 }].map(training =>
            <TrainingCard training={training} key={training.id} handleDownloadFile={handleDownloadFile} setModalOpenIsFull={setModalOpenIsFull} />
         )} */}

         <ModalWindow modalOpen={modalOpenIsFull} setModalOpen={setModalOpenIsFull} modalAppend="tw-p-5">
            <div className="tw-px-4 tw-pt-4 tw-pb-2 tw-font-medium tw-text-base tw-flex tw-items-center tw-justify-center">
               Уучлаарай
               <ExclamationSVG className="tw-w-6 tw-h-6 tw-text-red-500 tw-ml-1" />
            </div>
            <div className="tw-font-medium tw-py-4 tw-px-4">
               Бүртгэл дүүрсэн байна.
            </div>
         </ModalWindow>
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

const TrainingCard = ({ training, handleDownloadFile, setModalOpenIsFull }) => {
   const [expanded, setExpanded] = useState(false)

   const history = useHistory()

   const navRegistration = (id, e) => {
      e.stopPropagation()

      if (isFull) {
         return setModalOpenIsFull(true)
      }
      history.push(`/trainings/${id}/registration`)
   }

   const handleViewFile = (e) => {
      e.stopPropagation()
      handleDownloadFile(training.module_file.id)
   }

   const isFull = training.registeredUserCount >= training.participant_number

   return (
      <div className="tw-cursor-pointer tw-mt-4 tw-rounded-md tw-shadow-md tw-p-4" onClick={() => setExpanded(prev => !prev)}>
         <div className="tw-flex">
            <div className="tw-flex-grow">
               <div className="tw-flex tw-items-center tw-text-blue-500 tw-font-medium tw-text-15px">
                  {training.training_name}
               </div>
               <div className="tw-flex tw-items-center tw-font-medium tw-mt-1">
                  <UsersSVG className={`tw-w-4 tw-h-4 tw-mr-2 ${isFull ? 'tw-text-red-500' : 'tw-text-green-500'} tw-transition-colors`} strokeWidth={2.4} />
                  {training.registeredUserCount}/{training.participant_number}
               </div>
            </div>
            <button className={`tw-flex-shrink-0 tw-self-end ${buttonClass}`} onClick={e => navRegistration(training.id, e)}>
               Бүртгүүлэх
            </button>
         </div>

         <Transition
            items={expanded}
            from={{ height: 0 }}
            enter={{ height: 'auto' }}
            leave={{ height: 0 }}>
            {item => item && (anims =>
               <animated.div className="tw-overflow-hidden tw-text-13px tw-font-medium" style={anims}>
                  <div className="tw-pt-1 tw-pl-6">
                     <button className="focus:tw-outline-none tw-leading-tight tw-font-medium tw-border-b tw-border-blue-500 tw-transition-colors tw-transition-shadow hover:tw-shadow-md tw-text-blue-500 active:tw-text-blue-600 active:tw-border-blue-600" onClick={handleViewFile}>
                        Сургалтын агуулгыг харах
                     </button>
                  </div>
                  <div className="tw-mt-1 tw-pl-6">
                     <span className="tw-mr-2">Төрөл:</span>
                     {training.training_type}
                  </div>
                  <div className="tw-mt-1 tw-pl-6">
                     <span className="tw-mr-2">Орчин:</span>
                     {training.training_method}
                  </div>
                  <div className="tw-flex tw-items-center tw-mt-1">
                     <CalendarSVG className="tw-w-5 tw-h-5 tw-mr-1" />
                     <span className="">{training.start_date}</span>
                     <span className="tw-mx-1">–</span>
                     <span className="">{training.end_date}</span>
                  </div>
                  <div className="tw-flex tw-items-center tw-mt-1">
                     <ClockSVG className="tw-w-5 tw-h-5 tw-mr-1" />
                     <span className="">{training.start_time?.slice(0, 5)}</span>
                     <span className="tw-mx-1">–</span>
                     <span className="">{training.end_time?.slice(0, 5)}</span>
                  </div>
                  <div className="tw-flex tw-items-center tw-mt-1">
                     <LibrarySVG className="w-5 tw-h-5 tw-mr-1" />
                     {training.trainerOrganization?.organization_name}
                  </div>
                  <div className="tw-flex tw-items-center tw-mt-1">
                     <LocationMarkerSVG className="w-5 tw-h-5 tw-mr-1" />
                     {training.location}
                  </div>
                  <div className="tw-mt-1 tw-pl-6">
                     {training.scope}
                  </div>
               </animated.div>
            )}
         </Transition>
      </div>
   )
}

export const titleClass = 'tw-text-sm tw-font-medium tw-uppercase tw-p-1 tw-border-b tw-border-gray-400'

export const buttonClass = 'tw-rounded tw-border tw-border-blue-500 tw-text-xs tw-text-blue-500 tw-px-2.5 tw-py-1 focus:tw-outline-none active:tw-border-blue-700 active:tw-text-blue-700 tw-transition-colors tw-transition-shadow hover:tw-shadow-md tw-font-medium'
