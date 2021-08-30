import React, { useState, useEffect } from 'react'
import { TextareaCell } from '../performance_report/controlReport'
import { Signature } from './makeContract'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'

const initialState = [{
   order: '1',
   work: null,
   start_date: null,
   end_date: null,
   budget: null,
   in_charge: null
}, {
   order: '1.1',
   work: null,
   start_date: null,
   end_date: null,
   budget: null,
   in_charge: null
}, {
   order: '1.2',
   work: null,
   start_date: null,
   end_date: null,
   budget: null,
   in_charge: null
}, {
   order: '2',
   work: null,
   start_date: null,
   end_date: null,
   budget: null,
   in_charge: null
}, {
   order: '2.1',
   work: null,
   start_date: null,
   end_date: null,
   budget: null,
   in_charge: null
}, {
   order: '2.2',
   work: null,
   start_date: null,
   end_date: null,
   budget: null,
   in_charge: null
}]

const initialSigners = [{
   position: 'Экспортыг дэмжих төслийн Зохицуулагч',
   signature: null,
   date: null
}, {
   position: 'Санхүүгийн дэмжлэг хүртэгч хуулийн этгээдийн захирал',
   signature: null,
   date: null
}]

export default function ActivityPlanAttach({ contractId }) {
   const AlertCtx = useContext(AlertContext)

   const [plan, setPlan] = useState(initialState)

   const handleInput = (key, value, index) => setPlan(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

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
         const plan = res.data.data.attach
         const signers = res.data.data.signers
         plan && setPlan(plan)
         signers && setSigners(signers)
      })
   }, [contractId])

   const handleSave = () => {
      if (contractId === null || contractId === undefined) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Эхлээд гэрээгээ үүсгэнэ үү.' })
         return
      }

      axios.post(`contracts/${contractId}/attach-1`, {
         attach: plan,
         signers: signers
      }, {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт 1-ийг хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт 1-ийг хадгалж чадсангүй.' })
      })
   }

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6">
               Хавсралт 1. Түншлэлийн гэрээний үйл ажиллагааны төлөвлөгөө
            </div>

            <div className="tw-font-light tw-text-center tw-mt-2 tw-mx-4 sm:tw-mx-12">
               (Энэхүү Үйл ажиллагааны төлөвлөгөө нь хүсэлт гаргагч этгээдийн Экспорт хөгжүүлэх төлөвлөгөөнд заасан арга хэмжээнүүдийг хэрхэн биелүүлэхийг заасан байх ёстой бөгөөд тэдгээрийг Санхүүгийн дэмжлэг олгогчийн зүгээс санхүүжүүлэх шаардлагатай.)
            </div>

            <div className="tw-mt-8 tw-mx-2 sm:tw-mx-4">
               <table>
                  <thead>
                     <tr>
                        <th className={classCell}>№</th>
                        <th className={classCell}>
                           Зөвшөөрөгдсөн ажлууд <span className="tw-font-light">(Ажлыг чухлаас бусад гэж эрэмбэлэх)</span>
                        </th>
                        <th className={classCell}>Эхлэх огноо</th>
                        <th className={classCell}>Дуусах огноо</th>
                        <th className={classCell}>
                           Баталсан зардлын дээд хэмжээ <span className="tw-font-light">/төг/</span>
                        </th>
                        <th className={classCell}>Хариуцах этгээд</th>
                     </tr>
                  </thead>
                  <tbody>
                     {plan.map((row, i) =>
                        <tr key={i}>
                           <td className={classCell}>{row.order}</td>

                           <TextareaCell value={row.work} name="work" index={i} setter={handleInput} />

                           <td className={classCell}>
                              <input className={classInputDate} type="date" value={row.start_date} onChange={e => handleInput('start_date', e.target.value, i)} />
                           </td>
                           <td className={classCell}>
                              <input className={classInputDate} type="date" value={row.end_date} onChange={e => handleInput('end_date', e.target.value, i)} />
                           </td>

                           <TextareaCell value={row.budget} name="budget" index={i} setter={handleInput} />
                           <TextareaCell value={row.in_charge} name="in_charge" index={i} setter={handleInput} />
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            <div className="tw-mt-6 tw-mx-4 sm:tw-mx-8">
               <div>Тэмдэглэл:</div>
               <p className="tw-mt-4">
                  -	Бараа, зөвлөхийн бус үйлчилгээ болон зөвлөхийн үйлчилгээ авах аливаа худалдан авалт нь Дэлхийн банкны Худалдан авах ажиллагааны дараах зарчимд нийцсэн байна:  i) мөнгөний үнэ цэнэ;   ii) хэмнэлт;   iii) зохистой байдал;   iv) зорилгод нийцэх;   v) үр ашиг;   vi) ил тод байдал; болон   vii) шударга байдал. (Экспортыг дэмжих төслийн Худалдан авах ажиллагааны хялбарчилсан удирдамж);
               </p>
               <p className="tw-mt-4">
                  -	Хэрэв Санхүүгийн дэмжлэг хүртэгч нь дээр дурдсан өндөр ач холбогдол бүхий үр дүнд бодитоор нөлөөлж болзошгүй тэргүүн ээлжийн үйл ажиллагаануудыг хэрэгжүүлээгүй бол санхүүгийн дэмжлэгийг нөхөн олгохгүй.
               </p>
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4 tw-pb-8">
               {signers.map((signer, i) =>
                  <div className="tw-mb-4" key={i}>
                     <p className="">
                        {signer.position}:
                     </p>
                     <Signature signer={signer} setter={setSigners} />
                     <div className="">
                        <span className="">Огноо:</span>
                        <input className={classInputDate} type="date" value={signer.date} onChange={e => handleChangeSigner('date', e.target.value, i)} />
                     </div>
                  </div>
               )}
            </div>

            <div className="tw-flex tw-justify-center">
               <button className="tw-my-8 tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-rounded tw-py-2 tw-px-8 hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors" onClick={handleSave}>
                  Хадгалах
               </button>
            </div>
         </div>
      </div>
   )
}

const classCell = 'tw-border tw-border-gray-300 tw-px-2'
const classInputDate = 'focus:tw-outline-none tw-w-36'
