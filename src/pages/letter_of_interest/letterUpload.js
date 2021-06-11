import useQuery from 'components/utilities/useQueryLocation'
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
import { acceptDocTypes } from 'pages/attachments/page'


export default function LetterUpload() {
   const [form, setForm] = useState({
      attachedFile: null,
   })

   const userId = useQuery().get('userId')

   useEffect(() => {
      if (userId !== null && userId !== undefined) {
         axios.get('letter-of-interests', {
            headers: { Authorization: getLoggedUserToken() },
            params: { userId: userId },
         }).then(res => {
            if (res.data.data !== null && res.data.data !== undefined) {
               setForm(res.data.data)
            }
         })
      } else {
         axios.get('letter-of-interests', {
            headers: { Authorization: getLoggedUserToken() },
            params: { file: true },
         }).then(res => {
            if (res.data.data !== null && res.data.data !== undefined) {
               setForm(res.data.data)
            }
         })
      }
   }, [])

   const AlertCtx = useContext(AlertContext)

   const fileInputRef = useRef()

   const handleAddFileClick = () => {
      fileInputRef.current.value = null
      fileInputRef.current.click()
   }

   const handleInputFile = (e) => {
      const formData = new FormData()
      if (!e.target.files[0]) return
      formData.append('file', e.target.files[0])
      formData.append('description', 'Сонирхол илэрхийлэх албан тоот файлаар.')
      setForm({ attachedFile: 'loading' })

      axios.post('attach-files', formData, {
         headers: {
            'Authorization': getLoggedUserToken(),
            'Content-Type': 'multipart/form-data',
         }
      }).then(res => {
         setForm({ attachedFile: res.data.data })
      }).catch(err => {
         setForm({ attachedFile: null })
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Хавсаргасан файлыг хадгалж чадсангүй.' })
      })
   }

   const handleRemoveFile = () => setForm({ attachedFile: null })

   const FilePreviewCtx = useContext(FilePreviewContext)

   const handleDownloadFile = () => {
      axios.get(`attach-files/${form.attachedFile?.id}`, {
         headers: { Authorization: getLoggedUserToken() },
         responseType: 'blob',
      }).then(res => {
         const URL = window.URL.createObjectURL(res.data)
         FilePreviewCtx.setFile({ open: true, src: URL })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Файлыг татахад алдаа гарлаа.' })
      })
   }

   const history = useHistory()

   const handleNavLetterOIWeb = () => history.push('/letter-of-interest/web')

   // const AnimatedFileCard = animated(FileCard)
   // const AnimatedFileCardAdd = animated(FileCardAdd)

   const handleSubmitFile = () => {
      if (form.id) {
         axios.put(`letter-of-interests/${form.id}`, form, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            setForm(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Файлаар хавсаргасныг хадгаллаа.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Хавсаргасан файлыг хадгалж чадсангүй.' })
         })
      } else {
         axios.post(`letter-of-interests`, form, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            setForm(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Файлаар хавсаргасныг хадгаллаа.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Хавсаргасан файлыг хадгалж чадсангүй.' })
         })
      }
   }

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
                     items={form.attachedFile}
                     from={{ transform: 'scale(0)' }}
                     enter={{ transform: 'scale(1)' }}
                     leave={{ display: 'none' }}>
                     {item => item
                        ? anims =>
                           <FileCard name={item?.name} type={item?.mimetype} size={item?.size} classAppend="tw-my-1 tw-mx-1.5" uploading={item === 'loading' && true} removeFile={handleRemoveFile} downloadFile={handleDownloadFile} style={anims} />
                        : anims => (userId
                           ? <div className="tw-pt-4 tw-pb-2 tw-font-medium tw-italic tw-text-gray-500">
                              Файлаар иpүүлээгүй байна.
                           </div>
                           : <FileCardAdd classAppend="tw-my-1 tw-mx-1.5" onClick={handleAddFileClick} style={anims} />
                        )
                     }
                  </Transition>
               </div>

               {!userId &&
                  <div className="tw-flex tw-justify-center">
                     <button className="tw-my-2 tw-flex tw-items-center tw-text-white tw-font-medium tw-rounded hover:tw-shadow-md tw-px-6 tw-py-1.5 tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors focus:tw-outline-none" onClick={handleSubmitFile}>
                        Хадгалах
                     </button>
                  </div>
               }

               <input className="tw-absolute tw-invisible" type="file" accept={acceptDocTypes} onChange={handleInputFile} ref={fileInputRef} />
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
                  ? form.letter
                     ? <div className="tw-mt-6 tw-px-2 tw-w-full tw-overflow-x-auto tw-overflow-y-hidden">
                        <LetterPreview form={form} />
                     </div>
                     : <div className="tw-ml-3 tw-mt-3 tw-pt-4 tw-pb-2 tw-font-medium tw-italic tw-text-gray-500">
                        Цахимаар үүсгээгүй байна.
                     </div>

                  : <div className="tw-flex tw-justify-center">
                     <button className="tw-mt-28 tw-mb-6 tw-flex tw-items-center tw-text-white tw-font-medium tw-rounded hover:tw-shadow-md tw-pl-5 tw-pr-3 tw-py-1.5 tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors focus:tw-outline-none" onClick={handleNavLetterOIWeb}>
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
