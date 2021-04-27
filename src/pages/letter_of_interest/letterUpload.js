import { useQuery } from 'components/utilities/useQueryLocation'
import FileCard from 'pages/attachments/fileCard'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import { animated, Transition } from 'react-spring/renderprops'
import FileCardAdd from 'pages/attachments/fileCardAdd'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import HelpPopup from 'components/help_popup/helpPopup'
import PaperClipSVG from 'assets/svgComponents/paperClipSVG'
import PenAltSVG from 'assets/svgComponents/penAltSVG'
import LetterPreview from './preview'


export default function LetterUpload() {
   const [file, setFile] = useState(null)

   const userId = useQuery().get('userId')

   useEffect(() => {
      if (userId !== null && userId !== undefined) {
         // axios.get('', {
         //    headers: { Authorization: getLoggedUserToken() },
         // }).then(res => {
         //    console.log(res)
         // }).catch(err => {
         //    console.error(err.response)
         // })
      } else {
         // axios.get('', {
         //    headers: { Authorization: getLoggedUserToken() },
         // }).then(res => {
         //    console.log(res)
         // }).catch(err => {
         //    console.error(err.response)
         // })
      }
   }, [])

   const AlertCtx = useContext(AlertContext)

   const fileInputRef = useRef()

   const handleAddFileClick = () => fileInputRef.current.click()

   const handleInputFile = (e) => {
      const formData = new FormData()
      if (!e.target.files[0]) return
      formData.append('file', e.target.files[0])
      formData.append('description', 'Сонирхол илэрхийлэх албан тоот файлаар.')
      setFile('loading')

      axios.post('attach-files', formData, {
         headers: {
            'Authorization': getLoggedUserToken(),
            'Content-Type': 'multipart/form-data',
         }
      }).then(res => {
         console.log(res)
         setFile(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсаргасан файлыг хадгалагдлаа.' })
      }).catch(err => {
         console.log(err.response)
         setFile(null)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Хавсаргасан файлыг хадгалж чадсангүй.' })
      })
   }

   const handleRemoveFile = () => setFile(null)

   const FilePreviewCtx = useContext(FilePreviewContext)

   const handleDownloadFile = () => {
      axios.get(`attach-files/${file.id}`, {
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

   const handleNavLetterOIWeb = () => history.push('/letter-of-interest/web')

   const AnimatedFileCard = animated(FileCard)
   const AnimtaedFileCardAdd = animated(FileCardAdd)

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-absolute tw-top-0 tw-w-full">
         <div className={`tw-w-full ${userId ? 'tw-max-w-5xl' : 'tw-max-w-2xl'} tw-mx-auto tw-bg-white tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-border-t tw-border-gray-100 tw-divide-y tw-divide-dashed`}>
            <div className="tw-font-medium tw-p-3 tw-mb-1 tw-pb-2 tw-flex tw-items-center">
               <span className="tw-text-xl tw-mx-2 tw-leading-tight tw-text-blue-500">3</span>
               <span className="tw-text-15px tw-mr-4">
                  - Сонирхол илэрхийлэх албан тоот
               </span>
               {!userId &&
                  <HelpPopup classAppend="" main="Та сонирхол илэрхийлэх албан тоотоо файлаар хавсаргах юм уу, эсвэл цахим хэлбэрээр үүсгэж болно." position="bottom" />
               }
            </div>

            <div className="tw-relative tw-p-2 tw-pl-4">
               <div className="tw-text-15px tw-font-medium tw-flex tw-items-center tw-mt-2">
                  <PaperClipSVG className="tw-w-5 tw-h-5 tw-mr-2 tw-text-gray-600" />
                  {userId
                     ? 'Сонирхол илэрхийлэх албан тоот файлаар'
                     : 'Сонирхол илэрхийлэх албан тоот файлаар хавсаргах'
                  }
               </div>

               <div className="tw-mt-3 tw-ml-3">
                  <Transition
                     items={file}
                     from={{ transform: 'scale(0)' }}
                     enter={{ transform: 'scale(1)' }}
                     leave={{ display: 'none' }}>
                     {item => item
                        ? anims =>
                           <AnimatedFileCard name={file?.name} type={file?.mimetype} size={file?.size} classAppend="tw-my-1 tw-mx-1.5" uploading={file === 'loading' && true} removeFile={handleRemoveFile} downloadFile={handleDownloadFile} style={anims} />
                        : anims => (userId
                           ? <div className="tw-pt-4 tw-pb-2 tw-font-medium tw-italic tw-text-gray-500">
                              Файлаар илүүлээгүй байна.
                           </div>
                           : <AnimtaedFileCardAdd classAppend="tw-my-1 tw-mx-1.5" onClick={handleAddFileClick} style={anims} />
                        )
                     }
                  </Transition>
               </div>

               {!userId &&
                  <div className="tw-flex tw-justify-center">
                     <button className="tw-my-2 tw-flex tw-items-center tw-text-white tw-font-medium tw-rounded hover:tw-shadow tw-px-6 tw-py-1.5 tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors focus:tw-outline-none">
                        Хадгалах
                  </button>
                  </div>
               }

               <input className="tw-absolute tw-invisible" type="file" onChange={handleInputFile} ref={fileInputRef} />
            </div>

            <div className="tw-p-2 tw-pl-4">
               <div className="tw-text-15px tw-font-medium tw-mt-2 tw-flex tw-items-center">
                  <PenAltSVG className="tw-w-5 tw-h-5 tw-mr-2 tw-text-gray-600" />
                  {userId
                     ? 'Сонирхол илэрхийлэх албан тоот цахимаар'
                     : 'Сонирхол илэрхийлэх албан тоот цахим хэлбэрээр үүсгэх'
                  }
               </div>

               {userId
                  ? <div className="tw-mt-6 tw-px-2 tw-w-full tw-overflow-x-auto tw-overflow-y-hidden">
                     <LetterPreview />
                  </div>

                  : <div className="tw-flex tw-justify-center">
                     <button className="tw-mt-28 tw-mb-6 tw-flex tw-items-center tw-text-white tw-font-medium tw-rounded hover:tw-shadow tw-pl-5 tw-pr-3 tw-py-1.5 tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors focus:tw-outline-none" onClick={handleNavLetterOIWeb}>
                        Цахим хэлбэрээр үүсгэх
                        <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform-gpu tw--rotate-90 tw-ml-1" />
                     </button>
                  </div>
               }
            </div>
         </div>
      </div>
   )
}
