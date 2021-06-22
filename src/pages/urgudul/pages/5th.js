import AlertContext from 'components/utilities/alertContext'
import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext } from 'react'
import { UrgudulHeader } from './1st'

export default function UrgudulPage5() {
   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)

   return (
      <div className="">
         <UrgudulHeader
            label="Экспортын мэдээлэл"
         />

      </div>
   )
}
