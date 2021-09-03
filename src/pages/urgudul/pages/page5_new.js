import HelpPopup from 'components/help_popup/helpPopup'
import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext } from 'react'
import { containerClass, UrgudulHeader } from './page1'

export default function UrgudulPage5New() {
   const UrgudulCtx = useContext(UrgudulContext)
   const isCluster = UrgudulCtx.data.project_type === 1

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Экспортын мэдээлэл"
            projectNumber={UrgudulCtx.data.project_number}
            HelpPopup={isCluster && <HelpPopup classAppend="tw-mx-2" main="Хэрэв кластер бол кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." />}
         />

         <div className="tw-px-2">
            Экспортийн дата оруулах
         </div>
      </div>
   )
}
