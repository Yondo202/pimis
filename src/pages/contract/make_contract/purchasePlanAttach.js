import React, { useState } from 'react'
import { TextareaCell } from '../performance_report/controlReport'

const initialPlan = [{
   order: 1,
   purchase: null,
   cost: null,
   procedure: null,
   evaluation_date: null,
   tender_date: null,
   contract_date: null,
   end_date: null,
   comment: null
}, {
   order: 2,
   purchase: null,
   cost: null,
   procedure: null,
   evaluation_date: null,
   tender_date: null,
   contract_date: null,
   end_date: null,
   comment: null
}, {
   order: 3,
   purchase: null,
   cost: null,
   procedure: null,
   evaluation_date: null,
   tender_date: null,
   contract_date: null,
   end_date: null,
   comment: null
}]

export default function PurchasePlanAttach() {
   const [plan, setPlan] = useState(initialPlan)

   const handleInput = (key, value, index) => setPlan(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6">
               Хавсралт 4. Худалдан авах ажиллагааны төлөвлөгөө
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4">
               <table>
                  <thead>
                     <tr>
                        <th className={classCell}>№</th>
                        <th className={classCell}>Худалдан авах бараа, ажил, үйлчилгээний нэр, төрөл, тоо хэмжээ, хүчин чадал</th>
                        <th className={classCell}>Төсөвт өртөг (төгрөг)</th>
                        <th className={classCell}>Худалдан авах ажиллагаанд мөрдөх журам</th>
                        <th className={classCell}>Худалдан авах ажиллагаанд мөрдөх хугацаа</th>
                        <th className={classCell}>Тайлбар, тодруулга</th>
                     </tr>
                  </thead>
                  <tbody>
                     {plan.map((row, i) =>
                        <tr key={row.order}>
                           <td className={classCell}>{row.order}</td>
                           <TextareaCell value={row.purchase} name="purchase" index={i} setter={handleInput} />
                           <TextareaCell value={row.cost} name="cost" index={i} setter={handleInput} />
                           <TextareaCell value={row.procedure} name="procedure" index={i} setter={handleInput} />
                           <td className={classCell}>
                              <input className={classInputDate} type="date" value={row.evaluation_date} onChange={e => handleInput('evaluation_date', e.target.value, i)} />
                              <input className={classInputDate} type="date" value={row.tender_date} onChange={e => handleInput('tender_date', e.target.value, i)} />
                              <input className={classInputDate} type="date" value={row.contract_date} onChange={e => handleInput('contract_date', e.target.value, i)} />
                              <input className={classInputDate} type="date" value={row.end_date} onChange={e => handleInput('end_date', e.target.value, i)} />
                           </td>
                           <TextareaCell value={row.comment} name="comment" index={i} setter={handleInput} />
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            <div className="tw-mt-6 tw-pb-10 tw-mx-4 sm:tw-mx-8">
               Баталсан:
               Санхүүгийн дэмжлэг хүртэгч хуулийн
               этгээдийн захирал								/			/
            </div>
         </div>
      </div>
   )
}

const classCell = 'tw-border tw-border-gray-300 tw-px-2'
const classInputDate = 'focus:tw-outline-none tw-w-36'
