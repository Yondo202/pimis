import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'

export default function SurveyPimis() {
   const [survey, setSurvey] = useState({})

   useEffect(() => {

   }, [])

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="">
               Судалгаа*
            </div>

            <div className="">

            </div>
         </div>
      </div>
   )
}

function Question() {
   return (
      <div className="">

      </div>
   )
}
