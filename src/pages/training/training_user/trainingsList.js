import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import { useHistory } from 'react-router'

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

   const navRegistration = (id) => history.push(`/trainings/${id}/registration`)

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
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-w-full tw-px-4 tw-pt-8 tw-pb-20">
         <div className="tw-bg-white tw-rounded tw-shadow-md w-full tw-p-2 tw-pt-8">
            <div className="tw-text-base tw-font-medium tw-text-center tw-mb-8">
               Зохион байгуулагдах сургалтууд
            </div>

            <table className="">
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
            </table>
         </div>
      </div>
   )
}

const tableHeaders = [
   'Сургалтын нэр',
   'Сургалтын агуулга, файлаар',
   'Сургалтын төрөл',
   'Сургалтын хэлбэр',
   'Сургалт эхлэх өдөр',
   'Сургалт дуусах өдөр',
   'Сургалтын цаг',
   'Сургалт зохион байгуулах байгууллага',
   'Байршил, сургалт зохион байгуулагдах хаяг',
   'Оролцогчдын тоо',
   'Сургалтын цар хүрээ',
   'Бүртгүүлэх',
]

const rowFields = [
   'training_name',
   'module_file',
   'training_type',
   'training_method',
   'start_date',
   'end_date',
   'start_time',
   'organizer',
   'location',
   'participant_number',
   'scope',
   'registerButton',
]
