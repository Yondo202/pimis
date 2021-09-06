import React, { useState, useEffect } from 'react'
import { TextareaCell } from '../contract_reports/protectionReport'
import { Signature } from './makeContract'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import NumberFormat from 'react-number-format'

const initialState = [{
   work: null,
   start_date: null,
   end_date: null,
   budget: null,
   in_charge: null
}]

const initialSigners = [{
   order: 1,
   position: 'Экспортыг дэмжих төслийн Зохицуулагч',
   signature: null,
   date: null
}, {
   order: 2,
   position: 'Санхүүгийн дэмжлэг хүртэгч хуулийн этгээдийн захирал',
   signature: null,
   date: null
}]

export default function ActivityPlanAttach({ contractId }) {
   const AlertCtx = useContext(AlertContext)

   const [plan, setPlan] = useState(initialState)

   const handleInput = (key, value, index) => setPlan(prev => {
      const next = [...prev]
      next[index][key] = value ?? null
      return next
   })

   const handleAdd = () => setPlan(prev => [...prev, {
      work: null,
      start_date: null,
      end_date: null,
      budget: null,
      in_charge: null
   }])

   const handleRemove = (index) => setPlan(prev => prev.filter((plan, i) => i !== index))

   const [signers, setSigners] = useState(initialSigners)

   const handleChangeSigner = (key, value, index) => setSigners(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   useEffect(() => {
      if (contractId === null || contractId === undefined) {
         return
      }
      axios.get(`contracts/${contractId}/attach-1`, {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         const plan = res.data.data.rows
         const signers = res.data.data.signers
         plan?.length && setPlan(plan)
         signers?.length && setSigners(signers)
      })
   }, [contractId])

   const handleSave = () => {
      if (contractId === null || contractId === undefined) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Эхлээд гэрээгээ үүсгэнэ үү.' })
         return
      }
      if (plan[0].id === undefined) {
         axios.post(`contracts/${contractId}/attach-1`, {
            rows: plan,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const plan = res.data.data.rows
            const signers = res.data.data.signers
            plan?.length && setPlan(plan)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт 1-ийг хадгаллаа.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт 1-ийг хадгалж чадсангүй.' })
         })
      } else {
         axios.put(`contracts/${contractId}/attach-1`, {
            rows: plan,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const plan = res.data.data.rows
            const signers = res.data.data.signers
            plan?.length && setPlan(plan)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт 1-ийг шинэчиллээ.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт 1-ийг шинэчилж чадсангүй.' })
         })
      }
   }

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-py-6 print-break-after">
         <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6 tw-mx-2 sm:tw-mx-8">
            Хавсралт 1. Түншлэлийн гэрээний үйл ажиллагааны төлөвлөгөө
         </div>

         <div className="tw-font-light tw-text-center tw-mt-2 tw-mx-4 sm:tw-mx-12">
            (Энэхүү Үйл ажиллагааны төлөвлөгөө нь хүсэлт гаргагч этгээдийн Экспорт хөгжүүлэх төлөвлөгөөнд заасан арга хэмжээнүүдийг хэрхэн биелүүлэхийг заасан байх ёстой бөгөөд тэдгээрийг Санхүүгийн дэмжлэг олгогчийн зүгээс санхүүжүүлэх шаардлагатай.)
         </div>

         <div className="tw-mt-8 tw-mx-2 sm:tw-mx-4 tw-relative">
            <table>
               <thead>
                  <tr>
                     <th className={`${classCell} tw-text-center`}>№</th>
                     <th className={`${classCell} tw-text-center`}>
                        Зөвшөөрөгдсөн ажлууд <span className="tw-font-light">(Ажлыг чухлаас бусад гэж эрэмбэлэх)</span>
                     </th>
                     <th className={`${classCell} tw-text-center`}>Эхлэх огноо</th>
                     <th className={`${classCell} tw-text-center`}>Дуусах огноо</th>
                     <th className={`${classCell} tw-text-center`}>
                        Баталсан зардлын дээд хэмжээ <span className="tw-font-light">/төг/</span>
                     </th>
                     <th className={`${classCell} tw-text-center`}>Хариуцах этгээд</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {plan.map((row, i) =>
                     <tr key={i}>
                        <td className={classCell}>{i + 1}</td>

                        <TextareaCell value={row.work} name="work" index={i} setter={handleInput} />

                        <td className={classCellAlt}>
                           <input className={classInputDate} type="date" value={row.start_date ?? ''} onChange={e => handleInput('start_date', e.target.value, i)} />
                           <span className="tw-hidden print-show">
                              {row.start_date?.replaceAll('-', '.')}
                           </span>
                        </td>
                        <td className={classCellAlt}>
                           <input className={classInputDate} type="date" value={row.end_date ?? ''} onChange={e => handleInput('end_date', e.target.value, i)} />
                           <span className="tw-hidden print-show">
                              {row.end_date?.replaceAll('-', '.')}
                           </span>
                        </td>

                        {/* <TextareaCell value={row.budget} name="budget" index={i} setter={handleInput} /> */}
                        <TableCellCurrency value={row.budget} name="budget" index={i} setter={handleInput} />
                        <TextareaCell value={row.in_charge} name="in_charge" index={i} setter={handleInput} />
                        <td className="">
                           <MinusCircleSVG className="tw-w-7 tw-h-7 tw-text-red-500 active:tw-text-red-600 tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-transition-colors tw-cursor-pointer" onClick={() => handleRemove(i)} />
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
            <PlusCircleSVG className="tw-w-7 tw-h-7 tw-text-green-500 active:tw-text-green-600 tw-transition-colors tw-cursor-pointer tw-absolute tw--bottom-4 tw-right-4 print-invisbile" onClick={handleAdd} />
         </div>

         <div className="tw-mt-6 tw-mx-2 sm:tw-mx-8">
            <div>Тэмдэглэл:</div>
            <p className="tw-mt-4">
               -	Бараа, зөвлөхийн бус үйлчилгээ болон зөвлөхийн үйлчилгээ авах аливаа худалдан авалт нь Дэлхийн банкны Худалдан авах ажиллагааны дараах зарчимд нийцсэн байна:  i) мөнгөний үнэ цэнэ;   ii) хэмнэлт;   iii) зохистой байдал;   iv) зорилгод нийцэх;   v) үр ашиг;   vi) ил тод байдал; болон   vii) шударга байдал. (Экспортыг дэмжих төслийн Худалдан авах ажиллагааны хялбарчилсан удирдамж);
            </p>
            <p className="tw-mt-4">
               -	Хэрэв Санхүүгийн дэмжлэг хүртэгч нь дээр дурдсан өндөр ач холбогдол бүхий үр дүнд бодитоор нөлөөлж болзошгүй тэргүүн ээлжийн үйл ажиллагаануудыг хэрэгжүүлээгүй бол санхүүгийн дэмжлэгийг нөхөн олгохгүй.
            </p>
         </div>

         <div className="tw-mt-8 tw-mx-4 sm:tw-mx-12 tw-pb-8">
            {signers.map((signer, i) =>
               <div className="tw-mt-6 print-no-break" key={i}>
                  <p className="">
                     {signer.position}:
                  </p>
                  <Signature signer={signer} setter={setSigners} />
                  <div className="tw-mt-2">
                     <span className="tw-mr-3">Огноо:</span>
                     <input className={classInputDate} type="date" value={signer.date ?? ''} onChange={e => handleChangeSigner('date', e.target.value, i)} />
                     <span className="tw-hidden print-show">
                        {signer.date?.replaceAll('-', '.')}
                     </span>
                  </div>
               </div>
            )}
         </div>

         <div className="tw-flex tw-justify-center">
            <button className="tw-my-8 tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-rounded tw-py-2 tw-px-8 hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors print-invisbile" onClick={handleSave}>
               Хадгалах
            </button>
         </div>
      </div>
   )
}

const classCell = 'tw-border tw-border-gray-300 tw-px-2'
const classCellAlt = 'tw-border tw-border-gray-300 tw-p-2 tw-align-top'
const classInputDate = 'focus:tw-outline-none tw-w-32 tw-text-13px tw-border-b tw-border-gray-500 tw-rounded-none print-hide'

export function TableCellCurrency({ value, name, index, setter }) {
   return (
      <td className={classCellAlt}>
         <NumberFormat className="focus:tw-outline-none tw-rounded-none tw-border-b-2 tw-border-gray-700 tw-border-dotted tw-text-right tw-w-28 tw-float-right print-no-border tw-text-13px" thousandSeparator suffix=" ₮" value={value ?? ''} onValueChange={values => setter(name, values.floatValue, index)} />
      </td>
   )
}
