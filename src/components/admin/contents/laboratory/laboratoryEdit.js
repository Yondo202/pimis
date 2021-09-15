import React, { useContext, useEffect, useState } from 'react'
import AlertContext from 'components/utilities/alertContext'
import axios from 'axiosbase'
import { useHistory, useParams } from 'react-router'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { FormElement } from 'pages/training/training_admin/trainingEdit'

export default function LaboratoryEdit() {
   const AlertCtx = useContext(AlertContext)

   const [laboratory, setLaboratory] = useState([])

   const handleInputYear = (key, value, year) => setLaboratory(prev => {
      const next = [...prev]
      const index = laboratory.findIndex(lab => lab.year_given === year)
      next[index][key] = value
      return next
   })

   const netCertGiven = laboratory.reduce((acc, cv) => acc += +cv.cert_given, 0)

   const handleRemove = (year) => setLaboratory(prev => prev.filter(row => row.year_given !== year))

   const handleAdd = () => {
      const find = laboratory.findIndex(lab => lab.year_given === form.year)
      if (find !== -1) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Он давхцаж байна.' })
         return
      }

      const row = {
         labId: labId,
         lab_name: form.name,
         year_given: form.year,
         cert_given: form.count
      }
      setLaboratory(prev => [...prev, row])
      setForm(prev => ({
         ...prev,
         year: null,
         count: null
      }))
   }

   const [labId, setLabId] = useState(useParams().id)

   useEffect(() => {
      if (labId !== undefined && labId !== null) {
         axios.get(`laboratories/${labId}`, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const laboratory = (res.data.data ?? []).sort((a, b) => a.year_given > b.year_given)
            setLaboratory(laboratory)
            setForm(prev => ({ ...prev, name: laboratory[0].lab_name }))
         })
      }
   }, [])

   const history = useHistory()

   const handleSubmit = () => {
      let body = [...laboratory]
      body = body.filter(row => !['', null, undefined].includes(row.cert_given))
      if (body.length === 0) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Чанарын баталгаажуулалт өгсөн тоо нэмнэ үү.' })
         return
      }

      if (labId !== null && labId !== undefined) {
         axios.put(`laboratories/${labId}`, body, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const laboratory = (res.data.data ?? []).sort((a, b) => a.year_given > b.year_given)
            setLaboratory(laboratory)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Лабораторын мэдээллийг шинэчиллээ.' })
            history.push('/laboratories')
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Лабораторын мэдээллийг засаж чадсангүй.' })
         })
      } else {
         axios.post(`laboratories`, body, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const laboratory = (res.data.data ?? []).sort((a, b) => a.year_given > b.year_given)
            setLaboratory(laboratory)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Лабораторын мэдээлэл нэмэгдлээ.' })
            history.push('/laboratories')
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Лабораторыг нэмж чадсангүй.' })
         })
      }
   }

   const handleDelete = () => {
      if (labId === null || labId === undefined) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Лаборатор сонгоогүй байна.' })
         return
      }
      axios.delete(`laboratories/${labId}`, {
         headers: { authorization: getLoggedUserToken() }
      }).then(res => {
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Лабораторыг устгалаа.' })
         history.push('/laboratories')
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Лабораторыг устгаж чадсангүй.' })
      })
   }

   const [form, setForm] = useState({
      name: null,
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
               <FormElement label="Лабораторын нэр" value={form.name} keyName="name" onChange={handleInputForm} />

               <FormElement label="Чанарын баталгаажуулалт өгсөн тоо" height="auto">
                  {laboratory.length
                     ? laboratory
                        .sort((a, b) => a.year_given > b.year_given)
                        .map(lab =>
                           <div className="tw-mb-2 tw-flex tw-items-center" key={lab.year_given}>
                              <span className="">{lab.year_given}</span>
                              <span className="tw-mx-2">онд</span>
                              <input className={classInput} type="number" value={lab.cert_given ?? ''} onChange={e => handleInputYear('cert_given', e.target.value, lab.year_given)} />
                              <button className={`${classButton} tw-ml-auto`} onClick={() => handleRemove(lab.year_given)}>
                                 Хасах
                              </button>
                           </div>
                        )
                     : <div className="tw-mb-2 tw-flex tw-items-center tw-text-gray-500 tw-italic" style={{ height: 27 }}>
                        Чанарын баталгаажуулалт өгсөн тоо оруулаагүй байна.
                     </div>
                  }

                  <div className="tw-flex tw-items-center tw-pt-6">
                     <input className={classInput} style={{ width: 64 }} type="number" value={form.year ?? ''} onChange={e => handleInputForm('year', e.target.value)} placeholder="Он" />
                     <span className="tw-mx-2">онд</span>
                     <input className={classInput} type="number" value={form.count ?? ''} onChange={e => handleInputForm('count', e.target.value)} placeholder="Тоо" />
                     <button className={`${classButton} tw-ml-auto`} onClick={handleAdd}>
                        Нэмэх
                     </button>
                  </div>
               </FormElement>

               <FormElement label="Нийт чанарын баталгаажуулалт өгсөн тоо" childrenAppend="tw-font-medium">
                  <span className="">{netCertGiven}</span>
               </FormElement>
            </div>

            <div className="tw-flex tw-justify-center tw-items-center tw-relative">
               {labId &&
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

const classButton = 'tw-rounded tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-px-2 tw-py-0.5 focus:tw-outline-none'
