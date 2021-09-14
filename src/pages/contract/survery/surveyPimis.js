import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import AlertContext from 'components/utilities/alertContext'

export default function SurveyPimis() {
   const AlertCtx = useContext(AlertContext)

   const [survey, setSurvey] = useState({})

   const handleInput = (key, value) => setSurvey(prev => ({ ...prev, [key]: value }))

   useEffect(() => {

   }, [])

   const handleSave = () => {

   }

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-font-medium tw-text-base tw-p-2 tw-text-center tw-mt-4">
               Түншлэлийн хөтөлбөрийн нэмэлт судалгаа*
            </div>

            <div className="tw-mt-6">
               <Question order={1} question="Төслийн дэмжлэгтэйгээр олон улсад хүлээн зөвшөөрөгдөх чанарын баталгаажуулалт авсан эсэх?"
                  value={survey.quality_cert} name="quality_cert" setter={handleInput} />

               <Question order={2} question="Хөтөлбөрт хамрагдаж буй аж ахуйн нэгж нь эмэгтэй эзэнтэй эсэх?"
                  value={survey.female_owner} name="female_owner" setter={handleInput} />

               <Question order={3} question="Аж ахуй нэгжийн хэмжээ, ЖДҮ эсэх?"
                  value={survey.jdu} name="jdu" setter={handleInput} />

               <Question order={4} question="Уул уурхайн үйл ажиллагаа эрхэлдэг эсэх?"
                  value={survey.is_mining} name="is_mining" setter={handleInput} />

               <Question order={5} question="Цар тахлын хүндрэлийг даван туулахад үзүүлэх санхүүгийн дэмжлэгт хамрагдсан эсэх?"
                  value={survey.pandemic_support} name="pandemic_support" setter={handleInput} />

               <Question order={6} question="Төслийн дэмжлэгт хамрагдсан магадлан итгэмжлэгдсэн лабораториудаас үр шим хүртсэн эсэх?"
                  value={survey.lab_support} name="lab_support" setter={handleInput} />

               <Question order={7} question="Төслөөс оруулсан хөрөнгө оруулалт нь хэрэгцээ шаардлагад нь нийцсэн гэж үзэж байна уу?"
                  value={survey.sufficient_funding} name="sufficient_funding" setter={handleInput} />
            </div>

            <div className="tw-flex tw-justify-center">
               <button className="tw-my-8 tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-rounded tw-py-2 tw-px-8 hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors print-invisbile" onClick={handleSave}>
                  Хадгалах
               </button>
            </div>
         </div>
      </div>
   )
}

function Question({ question, order, value, name, setter }) {
   return (
      <div className="tw-mb-4 tw-mx-2">
         <div className="">
            <span className="tw-font-medium tw-mr-2">{order}.</span>
            {question}
         </div>
         <div className="tw-ml-6">
            <div className="">
               <input className="tw-mr-2" type="checkbox" id={`question-${order}-true`} checked={value === true} onChange={() => setter(name, true)} />
               <span className="" htmlFor={`question-${order}-true`}>Тийм</span>
            </div>
            <div className="">
               <input className="tw-mr-2" type="checkbox" id={`question-${order}-false`} checked={value === false} onChange={() => setter(name, false)} />
               <span className="" htmlFor={`question-${order}-false`}>Үгүй</span>
            </div>
         </div>
      </div>
   )
}
