import { useQuery } from 'components/utilities/useQueryLocation'
import FileCard from 'pages/attachments/fileCard'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'

export default function LetterUpload() {
   const [file, setFile] = useState({})
   const [letter, setLetter] = useState({})

   const userId = useQuery().get('userId')

   useEffect(() => {
      userId && axios.get('letter-of-interests', {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         console.log(res.data)
         setLetter(res.data.data)
      }).catch(err => {
         console.log(err.response?.data)
      })
   }, [])

   const history = useHistory()

   const navLetterOIWeb = () => {
      history.push('/letter-of-interest/web')
   }

   return (
      <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm tw-text-gray-700 tw-bg-white tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
         <div className="tw-font-medium tw-p-3 tw-pb-2 tw-flex tw-items-center">
            <span className="tw-text-xl tw-mx-2 tw-leading-tight tw-text-blue-500">3</span>
            <span className="tw-text-base">
               - Сонирхол илэрхийлэх албан тоот
            </span>
         </div>

         <div className="">
            <div className="">
               Сонирхол илэрхийлэх албан тоотоо файлаар хавсаргах
            </div>

            <FileCard />
         </div>

         <div className="">
            <div className="">
               Сонирхол илэрхийлэх албан тоот цахим хэлбэрээр ирүүлэх
            </div>
            <div className="">
               <button className="" onClick={navLetterOIWeb}>
                  Цахим хэлбэрээр үүсгэх
               </button>
            </div>
         </div>
      </div>
   )
}
