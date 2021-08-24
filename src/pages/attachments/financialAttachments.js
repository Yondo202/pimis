import React, { useContext, useEffect, useRef, useState } from 'react'
import AlertContext from 'components/utilities/alertContext'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import HelpPopup from 'components/help_popup/helpPopup'
import { acceptDocTypes } from './evidenceAttachments2'
import FileCard from './fileCard'
import FileCardAdd from './fileCardAdd'

const initialState = [{
   code: 'sanhuugiin_barimtuud',
   description: 'Хийгдсэн ажлуудын санхүүгийн баримтууд',
   stage: 4,
   files: null
}]

export default function FinancialAttachments() {
   const [form, setForm] = useState(initialState)

   const [editCode, setEditCode] = useState()

   const inputRef = useRef()

   const AlertCtx = useContext(AlertContext)
   const FilePreviewCtx = useContext(FilePreviewContext)
   const history = useHistory()

   const handleButtonClick = (code) => {
      setEditCode(code)
      inputRef.current.value = null
      inputRef.current.click()
   }

   const handleFileInput = (e) => {
      const formData = new FormData()
      if (!e.target.files[0]) return
      formData.append('file', e.target.files[0])
      const index = form.findIndex(item => item.code === editCode)
      formData.append('description', form[index].description)

      const newForm = form
      newForm[index].files = [...newForm[index].files || [], 'loading']
      setForm([...newForm])

      axios.post('attach-files', formData, {
         headers: {
            'Authorization': getLoggedUserToken(),
            'Content-Type': 'multipart/form-data',
         }
      }).then(res => {
         const newForm1 = [...form]
         let newFiles = newForm1[index].files
         newFiles = newFiles.filter(item => item !== 'loading')
         newForm1[index].files = [...newFiles, res.data.data]
         setForm(newForm1)
      }).catch(err => {
         const newForm2 = [...form]
         newForm2[index].files = newForm[index].files.filter(item => item !== 'loading')
         setForm(newForm2)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт файлыг хадгалж чадсангүй.' })
      })
   }

   const handleRemoveFile = (code, fileIndex) => {
      const index = form.findIndex(item => item.code === code)
      const newForm = form
      newForm[index].files = newForm[index].files.filter((_, i) => i !== fileIndex)
      setForm(newForm)
   }

   const handleDownloadFile = (code, fileIndex) => {
      const index = form.findIndex(item => item.code === code)
      axios.get(`attach-files/${form[index].files[fileIndex].id}`, {
         headers: { 'Authorization': getLoggedUserToken() },
         responseType: 'blob',
      }).then(res => {
         const URL = window.URL.createObjectURL(res.data)
         FilePreviewCtx.setFile({ open: true, src: URL })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Файлыг татаж чадсангүй.' })
      })
   }

   const handleSubmit = () => {
      axios.post('evidences', form, {
         headers: { 'Authorization': getLoggedUserToken() },
      }).then(res => {
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт файлуудыг амжилттай хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт файлуудыг хадгалж чадсангүй.' })
      })
   }

   const userId = useParams().id

   useEffect(() => {
      if (userId) {
         axios.get(`evidences`, {
            headers: { 'Authorization': getLoggedUserToken() },
            params: { userId: userId, stage: 4 }
         }).then(res => {
            setForm(res.data.data)
         })
      } else {
         axios.get('evidences', {
            headers: { 'Authorization': getLoggedUserToken() },
            params: { stage: 4 }
         }).then(res => {
            setForm(res.data.data)
         })
      }
   }, [])

   return (
      <div className="tw-relative tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm">
         {userId &&
            <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px" onClick={() => history.goBack()}>
               <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
               Буцах
            </button>
         }

         <div className="tw-bg-white tw-mt-6 tw-mb-16 tw-rounded-lg tw-shadow-md tw-p-2">
            <div className="tw-p-3 tw-flex tw-items-center">
               <span className="tw-text-base tw-font-medium tw-text-blue-500 tw-pl-2">
                  Хийгдсэн ажлуудын санхүүгийн баримтууд
               </span>
               <HelpPopup classAppend="tw-ml-2 tw-mr-2" main="/.../" />
            </div>

            <input className="tw-invisible tw-absolute" type="file" accept={acceptDocTypes} onChange={handleFileInput} ref={inputRef} />

            <div className="tw-mx-4 tw-rounded-sm tw-shadow-md tw-divide-y tw-divide-dashed tw-mb-6">
               {form.map(item =>
                  <div className="tw-flex tw-flex-wrap tw-p-2" key={item.code}>
                     {item.files?.map((file, j) =>
                        <FileCard name={file.name} type={file.mimetype} size={file.size} removeFile={() => handleRemoveFile(item.code, j)} classAppend="tw-m-2" uploading={file === 'loading' && true} downloadFile={() => handleDownloadFile(item.code, j)} key={file.id} />
                     )}

                     <FileCardAdd classAppend="tw-m-2" onClick={() => handleButtonClick(item.code)} />
                  </div>
               )}
            </div>

            {!userId &&
               <div className="tw-flex tw-items-center tw-justify-end tw-pb-4 tw-px-2">
                  <button className="tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-700 tw-transition-colors" onClick={handleSubmit}>
                     Хадгалах
                  </button>
               </div>
            }
         </div>
      </div>
   )
}
