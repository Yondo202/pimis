import React, { useState, useEffect } from 'react'
import { TextareaCell } from '../contract_reports/protectionReport'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'
import { Fill, Signature } from './makeContract'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import { TableCellCurrency } from './activityPlanAttach'

const initialPlan = [{
   purchase: null,
   cost: null,
   procedure: null,
   evaluation_date: null,
   tender_date: null,
   contract_date: null,
   end_date: null,
   comment: null
}]

const initialSigners = [{
   order: 1,
   name: null,
   position: null,
   signature: null,
   date: null
}]

export default function PurchasePlanAttach({ contractId }) {
   const AlertCtx = useContext(AlertContext)

   const [plan, setPlan] = useState(initialPlan)

   const handleInput = (key, value, index) => setPlan(prev => {
      const next = [...prev]
      next[index][key] = value ?? null
      return next
   })

   const handleAdd = () => setPlan(prev => [...prev, {
      purchase: null,
      cost: null,
      procedure: null,
      evaluation_date: null,
      tender_date: null,
      contract_date: null,
      end_date: null,
      comment: null
   }])

   const handleRemove = (index) => setPlan(prev => prev.filter((_, i) => i !== index))

   const [signers, setSigners] = useState(initialSigners)

   const handleInputSigner = (key, value, index) => setSigners(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   useEffect(() => {
      if (contractId === null || contractId === undefined) {
         return
      }
      axios.get(`contracts/${contractId}/attach-4`, {
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
         axios.post(`contracts/${contractId}/attach-4`, {
            rows: plan,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const plan = res.data.data.rows
            const signers = res.data.data.signers
            plan?.length && setPlan(plan)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт 4-ыг хадгаллаа.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт 4-ыг хадгалж чадсангүй.' })
         })
      } else {
         axios.put(`contracts/${contractId}/attach-4`, {
            rows: plan,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const plan = res.data.data.rows
            const signers = res.data.data.signers
            plan?.length && setPlan(plan)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт 4-ыг шинэчиллээ.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт 4-ыг шинэчилж чадсангүй.' })
         })
      }
   }

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-py-6 print-break-after">
         <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6 tw-mx-2 sm:tw-mx-8">
            Хавсралт 4. Худалдан авах ажиллагааны төлөвлөгөө
         </div>

         <div className="tw-mt-10 tw-mx-2 sm:tw-mx-4 tw-relative">
            <table>
               <thead>
                  <tr>
                     <th className={`${classCell} tw-text-center`}>№</th>
                     <th className={`${classCell} tw-text-center`}>Худалдан авах бараа, ажил, үйлчилгээний нэр, төрөл, тоо хэмжээ, хүчин чадал</th>
                     <th className={`${classCell} tw-text-center`}>Төсөвт өртөг (төгрөг)</th>
                     <th className={`${classCell} tw-text-center`}>Худалдан авах ажиллагаанд мөрдөх журам</th>
                     <th className={`${classCell} tw-text-center`}>Худалдан авах ажиллагаанд мөрдөх хугацаа</th>
                     <th className={`${classCell} tw-text-center`}>Тайлбар, тодруулга</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {plan.map((row, i) =>
                     <tr key={i}>
                        <td className={classCell}>{i + 1}</td>
                        <TextareaCell value={row.purchase} name="purchase" index={i} setter={handleInput} />
                        <TableCellCurrency value={row.cost} name="cost" index={i} setter={handleInput} />
                        <TextareaCell value={row.procedure} name="procedure" index={i} setter={handleInput} />
                        <td className={classCell}>
                           <DateField label="Үнэлгээний хороо байгуулах огноо" value={row.evaluation_date} name="evaluation_date" index={i} setter={handleInput} />
                           <DateField label="Тендер зарлах огноо" value={row.tender_date} name="tender_date" index={i} setter={handleInput} />
                           <DateField label="Гэрээ байгуулах огноо" value={row.contract_date} name="contract_date" index={i} setter={handleInput} />
                           <DateField label="Гэрээ дуусгавар болох, дүгнэх" value={row.end_date} name="end_date" index={i} setter={handleInput} />
                        </td>
                        <TextareaCell value={row.comment} name="comment" index={i} setter={handleInput} />
                        <td className="">
                           <MinusCircleSVG className="tw-w-7 tw-h-7 tw-text-red-500 active:tw-text-red-600 tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-transition-colors tw-cursor-pointer" onClick={() => handleRemove(i)} />
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
            <PlusCircleSVG className="tw-w-7 tw-h-7 tw-text-green-500 active:tw-text-green-600 tw-transition-colors tw-cursor-pointer tw-absolute tw--bottom-4 tw-right-4 print-invisbile" onClick={handleAdd} />
         </div>

         <div className="tw-mt-10 tw-pb-8 tw-mx-4 sm:tw-mx-12 print-no-break">
            <div className="">
               <span className="tw-mr-2">
                  Баталсан:
               </span>
               <Fill value={signers[0].name} name="name" index={0} setter={handleInputSigner} editable defaultLength={20} />
            </div>
            <p className="tw-mt-1">
               Санхүүгийн дэмжлэг хүртэгч хуулийн этгээдийн захирал
            </p>
            <Signature signer={signers[0]} setter={setSigners} />
         </div>

         <div className="tw-flex tw-justify-center">
            <button className="tw-my-8 tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-rounded tw-py-2 tw-px-8 hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors print-invisible" onClick={handleSave}>
               Хадгалах
            </button>
         </div>
      </div>
   )
}

const classCell = 'tw-border tw-border-gray-300 tw-px-2'
const classInputDate = 'focus:tw-outline-none tw-w-32 tw-ml-1 tw-border-b tw-border-gray-500 tw-rounded-none print-hide'

function DateField({ label, value, name, index, setter, classAppend }) {
   return (
      <div className={`tw-leading-tight tw-text-xs tw-py-0.5 ${classAppend}`}>
         <div className="">
            {label}:
         </div>
         <input className={classInputDate} type="date" value={value ?? ''} onChange={e => setter(name, e.target.value, index)} />
         <span className="tw-hidden tw-text-13px print-show">
            {value?.replaceAll('-', '.')}
         </span>
      </div>
   )
}
