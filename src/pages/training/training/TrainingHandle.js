import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import PlusSVG from 'assets/svgComponents/plusSVG'
import { Transition } from 'react-spring/renderprops'
import FilePreviewContext from 'components/utilities/filePreviewContext'

export default function TrainingHandle() {
   const [trainings, setTrainings] = useState([])

   const AlertCtx = useContext(AlertContext)
   const FilePreviwCtx = useContext(FilePreviewContext)

   useEffect(() => {
      axios.get('trainings', {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         console.log(res)
         setTrainings(res.data.data)
      }).catch(err => {
         console.error(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтуудыг татаж чадсангүй.' })
      })
   }, [])

   return (
      <div className="">
         <button className="tw-flex tw-items-center">
            <PlusSVG className="tw-w-4 tw-h-4" />
            <Transition>

            </Transition>
         </button>

         <table className="">
            <thead>
               <tr>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td></td>
               </tr>
            </tbody>
         </table>
      </div>
   )
}
