import HelpPopup from 'components/help_popup/helpPopup'
import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext } from 'react'
import { containerClass, UrgudulHeader } from './page1'
import ExportData from 'components/admin/contents/insurance/exportData/ExportData'

export default function UrgudulPage5New() {
   const UrgudulCtx = useContext(UrgudulContext)
   const isCluster = UrgudulCtx.data.project_type === 1
   const userId = UrgudulCtx.data.userId

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Экспортын мэдээлэл"
            projectNumber={UrgudulCtx.data.project_number}
            HelpPopup={isCluster && <HelpPopup classAppend="tw-mx-2" main="Хэрэв кластер бол кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." />}
         />

         <div className="tw-p-4 tw-pb-10">
            <ExportData userId={userId} />
         </div>
      </div>
   )
}
