import AlertContext from 'components/utilities/alertContext'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import { useParams } from 'react-router'
import HelpPopup from 'components/help_popup/helpPopup'
import { acceptDocTypes } from './page2'
import FileCard from './fileCard'
import FileCardAdd from './fileCardAdd'

export default function AttachmentUploadsFirst() {
   const [form, setForm] = useState(initialState)

   const [editCode, setEditCode] = useState()

   const inputRef = useRef()

   const AlertCtx = useContext(AlertContext)
   const FilePreviewCtx = useContext(FilePreviewContext)

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
            params: { userId: userId, stage: 1 }
         }).then(res => {
            setForm(res.data.data)
         })
      } else {
         axios.get('evidences', {
            headers: { 'Authorization': getLoggedUserToken() },
            params: { stage: 1 }
         }).then(res => {
            setForm(res.data.data)
         })
      }
   }, [])

   return (
      <div className="tw-relative tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-bg-white tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-p-2">
         <div className="tw-p-3 tw-flex tw-items-center">
            <span className="tw-text-base tw-font-medium tw-text-blue-500 tw-pl-2">
               Нотлох бичиг баримтууд I
            </span>
            <HelpPopup classAppend="tw-ml-2 tw-mr-2" main="/.../" />
         </div>

         <input className="tw-invisible tw-absolute" type="file" accept={acceptDocTypes} onChange={handleFileInput} ref={inputRef} />

         <ol className="tw-list-decimal tw-list-inside tw-m-2 tw-rounded-sm tw-shadow-md tw-divide-y tw-divide-dashed">
            {form.map(item =>
               <li className="tw-p-2 tw-pl-4 tw-pt-3" key={item.code}>
                  <span className="tw-text-sm">{item.description}</span>

                  <div className="tw-flex tw-flex-wrap tw-mt-1">
                     {item.files?.map((file, j) =>
                        <FileCard name={file.name} type={file.mimetype} size={file.size} removeFile={() => handleRemoveFile(item.code, j)} classAppend="tw-m-2" uploading={file === 'loading' && true} downloadFile={() => handleDownloadFile(item.code, j)} key={file.id} />
                     )}

                     <FileCardAdd classAppend="tw-m-2" onClick={() => handleButtonClick(item.code)} />
                  </div>
               </li>
            )}
         </ol>

         {(userId === undefined || null) &&
            <div className="tw-flex tw-items-center tw-justify-end tw-pt-6 tw-pb-4 tw-px-2">
               <button className="tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-700 tw-transition-colors" onClick={handleSubmit}>
                  Хадгалах
               </button>
            </div>
         }
      </div>
   )
}

const initialState = [{
   code: 'gerchilgee',
   description: 'Хуулийн этгээдийн улсын бүртгэлийн гэрчилгээний хуулбар',
   stage: 1,
   files: null
}, {
   code: 'tailan',
   description: 'Сүүлийн 2 жилийн аудитлагдсан санхүүгийн тайлан',
   stage: 1,
   files: null
}, {
   code: 'uuriin_sanhuujilt',
   description: 'Төлөвлөсөн үйл ажиллагааг өөрийн санхүүжилтээр гүйцэтгэх боломжтойг нотолсон баримт бичиг (сүүлийн 2 жилийн мөнгөн урсгалын тайлан, 1 жилийн мөнгөн урсгалын төлөвлөгөө, банкны хуулга гм)',
   stage: 1,
   files: null
}, {
   code: 'umchlul',
   description: 'Аж ахуйн нэгжийн эцсийн өмчлөгчийг тодорхойлох баримт бичгүүд (дүрэм гм)',
   stage: 1,
   files: null
}, {
   code: 'tulhuur_ajilchid',
   description: 'Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, боловсрол, ур чадварыг илэрхийлэх намтар(Дор хаяж 3 албан тушаалтны мэдээлэл)',
   stage: 1,
   files: null
}]
