import PaperClipSVG from 'assets/svgComponents/paperClipSVG'
import React, { useContext } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import AlertContext from 'components/utilities/alertContext'

export default function RowFile(props) {
   const file = props.file

   const FilePreviewCtx = useContext(FilePreviewContext)
   const AlertCtx = useContext(AlertContext)

   const handleClickFile = () => {
      if (file?.id === undefined || file?.id === null) {
         return
      }

      axios.get(`attach-files/${file?.id}`, {
         headers: { Authorization: getLoggedUserToken() },
         responseType: 'blob',
      }).then(res => {
         console.log(res)
         const URL = window.URL.createObjectURL(res.data)
         FilePreviewCtx.setFile({ open: true, src: URL })
      }).catch(err => {
         console.log(err.response)
         AlertCtx.setAlert({open: true, variant: 'error', msg: 'Алдаа гарлаа. Файлыг татаж чадсангүй.'})
      })
   }

   return (
      <div className="tw-flex">
         <div className="tw-w-1/2 tw-border-r tw-border-gray-400 tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center">
            {props.label}
         </div>
         <div className="tw-w-1/2 tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center tw-underline" >
            <PaperClipSVG className="tw-w-4 tw-h-4 tw-mr-1" />
            <span className="tw-underline tw-cursor-pointer" onClick={handleClickFile}>
               {file?.name}
            </span>
         </div>
      </div>
   )
}