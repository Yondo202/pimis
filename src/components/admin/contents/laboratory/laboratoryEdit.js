import React, { useContext, useEffect, useState } from 'react'
import AlertContext from 'components/utilities/alertContext'
import axios from 'axiosbase'
import { useHistory, useParams } from 'react-router'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { FormElement } from 'pages/training/training_admin/trainingEdit'

const intialState = {
   lab_name: null,
   year_given: null,
   cert_given: null
}

export default function LaboratoryEdit() {
   const AlertCtx = useContext(AlertContext)

   const [laboratory, setLaboratory] = useState([])

   const handleInputIndex = (key, value, index) => setLaboratory(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleInputYear = (key, value, year) => setLaboratory(prev => {
      const next = [...prev]
      const index = laboratory.findIndex(lab => lab.year_given === year)
      next[index][key] = value
      return next
   })

   const netCertsGiven = laboratory.reduce((acc, cv) => acc += +cv.cert_given, 0)

   const handleRemove = (year) => setLaboratory(prev => prev.filter(row => row.year_given !== year))

   const handleAdd = () => {

   }

   const [laboratoryId, setLaboratoryId] = useState(useParams().id)

   useEffect(() => {
      if (laboratoryId !== undefined && laboratoryId !== null) {
         axios.get(`laboratories/${laboratoryId}`, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            setLaboratory(res.data.data)
         })
      }
   }, [])

   const history = useHistory()

   const handleSubmit = () => {
      if (laboratoryId !== null && laboratoryId !== undefined) {
         axios.put(`laboratories/${laboratoryId}`, laboratory, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            setLaboratory(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Лабораторын мэдээллийг шинэчиллээ.' })
            history.push('/laboratories')
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Лабораторын мэдээллийг засаж чадсангүй.' })
         })
      } else {
         axios.post(`laboratories`, laboratory, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            setLaboratory(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Лабораторын мэдээлэл нэмэгдлээ.' })
            history.push('/laboratories')
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Лабораторыг нэмж чадсангүй.' })
         })
      }
   }

   const handleDelete = () => {
      if (laboratoryId === null || laboratoryId === undefined) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Лаборатор сонгоогүй байна.' })
         return
      }
      axios.delete(`laboratories/${laboratoryId}`, {
         headers: { authorization: getLoggedUserToken() }
      }).then(res => {
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Лабораторыг устгалаа.' })
         history.push('/laboratories')
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Лабораторыг устгаж чадсангүй.' })
      })
   }

   const [form, setForm] = useState({
      year: null,
      count: null
   })

   const handleInputForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-w-full">
         <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px" onClick={() => history.push('/laboratories')}>
            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
            Буцах
         </button>

         <div className="tw-rounded tw-shadow-md tw-bg-white tw-max-w-5xl tw-w-full tw-pt-8 tw-mt-6">
            <div className="tw-text-center tw-p-2 tw-mb-8 tw-text-lg tw-font-medium">
               Лабораторын мэдээлэл оруулах
            </div>

            <div className="tw-flex tw-flex-col tw-w-full">
               <FormElement label="Лабораторын нэр" value={laboratory.lab_name} keyName="lab_name" index={0} onChange={handleInputIndex} />

               <FormElement label="Чанарын баталгаажуулалт өгсөн тоо">
                  {laboratory
                     .sort((a, b) => a.year_given > b.year_given)
                     .map(lab =>
                        <div className="">
                           <span className="">{lab.year_given}</span>
                           <input className={classInput} type="number" value={lab.cert_given} onChange={e => handleInputYear('cert_given', e.target.value, lab.year_given)} />
                           <button onClick={() => handleRemove(lab.year_given)}>
                              Хасах
                           </button>
                        </div>
                     )
                  }

                  <div className="">
                     <input className={classInput} type="number" value={form.year} onChange={e => handleInputForm('year', e.target.value)} placeholder="Он" />
                     <input className={classInput} type="number" value={form.count} onChange={e => handleInputForm('count', e.target.value)} placeholder="Тоо" />
                     <button onClick={handleAdd}>
                        Нэмэх
                     </button>
                  </div>
               </FormElement>

               <FormElement label="">
                  <span className="">{netCertsGiven}</span>
               </FormElement>
            </div>

            <div className="tw-flex tw-justify-center tw-items-center tw-relative">
               {laboratoryId &&
                  <button className="tw-absolute tw-left-4 tw-rounded tw-bg-red-500 active:tw-bg-red-500 tw-transition-colors hover:tw-shadow-md tw-py-1.5 tw-px-6 tw-text-white tw-font-medium focus:tw-outline-none tw-text-13px" onClick={handleDelete}>
                     Устгах
                  </button>
               }

               <button className="tw-rounded tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-py-1.5 tw-px-6 tw-text-white tw-font-medium tw-my-6 focus:tw-outline-none tw-text-13px" onClick={handleSubmit}>
                  Хадгалах
               </button>
            </div>
         </div>
      </div>
   )
}

const classInput = 'focus:tw-outline-none focus:tw-ring-2 tw-ring-blue-400 tw-border tw-border-gray-400 tw-rounded tw-px-2 tw-py-1 tw-transition-colors tw-bg-transparent tw-w-24'
