import React, { useState, useContext, useEffect } from 'react'
import AlertContext from 'components/utilities/alertContext'
import axios from 'axiosbase'
import { Fill, Signature } from '../make_contract/makeContract'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'

const initialState = [{
   description: 'Байгаль орчин, нийгмийн удирдлагын төлөвлөгөөний хэрэгжилт',
   order: 1,
   status: null,
   comment: null
}, {
   description: 'Хяналт, шинжилгээний үр дүн ба урьдчилан тооцоолоогүй нөлөөлөл (Хяналт шинжилгээний төлөвлөгөөний хэрэгжилтийн байдал, Бохирдлын хэмжээ нь стандартаас хэтэрсэн (хэрэв байгаа бол), эсхүл байгаль орчин, нийгмийн удирдлагын төлөвлөгөөнд урьдчилан авч үзээгүй гэнэтийн нөлөөлөл, түүнийг залруулах үйл ажиллагаа/авсан арга хэмжээ. Лабораторийн шинжилгээний хариуг хавсаргах шаардлагатай)',
   order: 2,
   status: null,
   comment: null
}, {
   description: 'Зөвлөлдөх уулзалт (зөвлөлдөх уулзалтын дэлгэрэнгүй мэдээлэл, хэлэлцсэн асуудлууд, оролцогчдын гаргасан санал, үр дүн)',
   order: 3,
   status: null,
   comment: null
}, {
   description: 'Оролцогч талуудаас ирүүлсэн гомдол, гомдол барагдуулах механизмын хэрэгжилт (өргөдөл/гомдлын нарийвчилсан мэдээлэл ба авсан арга хэмжээ)',
   order: 4,
   status: null,
   comment: null
}, {
   description: 'Бусад асуудал/ жендер, нийгмийн хамгааллын чиглэлээр хэрэгжүүлсэн ажлууд',
   order: 5,
   status: null,
   comment: null
}, {
   description: 'Дүгнэлт ба зөвлөмж',
   order: 6,
   status: null,
   comment: null
}]

const initialSigners = [{
   order: 1,
   name: null,
   position: 'Экспортыг дэмжих төслийн захирал',
   signature: null
}, {
   order: 2,
   name: null,
   position: 'Экспортыг дэмжих төслийн зохицуулагч',
   signature: null
}, {
   order: 3,
   name: null,
   position: 'Экспортыг дэмжих төслийн санхүүгийн мэргэжилтэн',
   signature: null
}, {
   order: 4,
   name: null,
   position: 'Экспортыг дэмжих төслийн бизнес хөгжлийн ахлах мэргэжилтэн',
   signature: null
}, {
   order: 5,
   name: null,
   position: 'Экспортыг дэмжих төслийн байгаль орчин, нийгмийн хамгааллын зөвлөх',
   signature: null
}, {
   order: 6,
   name: null,
   position: 'Санхүүгийн дэмжлэг хүртэгч хуулийн этгээдийн захирал',
   signature: null
}, {
   order: 7,
   name: null,
   position: 'Санхүүгийн дэмжлэг хүртэгч хуулийн этгээдийн байгаль орчны ажилтан',
   signature: null
}]

export default function ProtectionReport({ contract = {} }) {
   const AlertCtx = useContext(AlertContext)

   const contractId = contract.id

   const [report, setReport] = useState(initialState)

   const handleInput = (key, value, index) => setReport(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const [signers, setSigners] = useState(initialSigners)

   const handleInputSigners = (key, value, order) => setSigners(prev => {
      const next = [...prev]
      const index = next.findIndex(signer => signer.order === order)
      next[index][key] = value
      return next
   })

   useEffect(() => {
      if (contractId === null || contractId === undefined) {
         return
      }
      axios.get(`contracts/${contractId}/protection-report`, {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         const report = res.data.data.rows
         const signers = res.data.data.signers
         report?.length && setReport(report)
         signers?.length && setSigners(signers)
      })
   }, [contractId])

   const handleSave = () => {
      if (contractId === null || contractId === undefined) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Түншлэлийн гэрээ сонгогдоогүй байна.' })
         return
      }
      if (report[0].id === undefined) {
         axios.post(`contracts/${contractId}/protection-report`, {
            rows: report,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const report = res.data.data.rows
            const signers = res.data.data.signers
            report?.length && setReport(report)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Тайланг хадгаллаа.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Тайланг хадгалж чадсангүй.' })
         })
      } else {
         axios.put(`contracts/${contractId}/protection-report`, {
            rows: report,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const report = res.data.data.rows
            const signers = res.data.data.signers
            report?.length && setReport(report)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Тайланг шинэчиллээ.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Тайланг шинэчилж чадсангүй.' })
         })
      }
   }

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-py-6 print-break-after">
         <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6 tw-mx-2 sm:tw-mx-8">
            ii) ХАМГААЛЛЫН ҮЙЛ АЖИЛЛАГААНЫ ХЯНАЛТЫН ТАЙЛАН
         </div>

         <div className="tw-font-medium tw-text-center tw-mt-4 tw-mx-4 sm:tw-mx-12">
            Санхүүгийн дэмжлэг хүртэгчийн байгаль орчин, нийгмийн удирдлага, хяналт шинжилгээний төлөвлөгөөний хэрэгжилт
         </div>

         <div className="tw-mt-10 tw-mx-2 sm:tw-mx-4">
            <table className="">
               <thead>
                  <tr>
                     <th className={`${classCell} tw-text-center`}>№</th>
                     <th className={`${classCell} tw-text-center`}>Агуулга</th>
                     <th className={`${classCell} tw-text-center`}>Хэрэгжилтийн байдал/Төлөв</th>
                     <th className={`${classCell} tw-text-center`}>Тайлбар</th>
                  </tr>
               </thead>
               <tbody>
                  {report.map((row, i) =>
                     <tr key={row.order}>
                        <td className={classCell}>{row.order}</td>
                        <td className={classCell}>{row.description}</td>
                        <TextareaCell value={row.status} name="status" index={i} setter={handleInput} />
                        <TextareaCell value={row.comment} name="comment" index={i} setter={handleInput} />
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         <div className="tw-flex tw-justify-center tw-mt-10 tw-pb-8 tw-mx-4 sm:tw-mx-12">
            <div className="">
               {[{
                  minOrder: 1,
                  maxOrder: 1,
                  category: 'Баталсан'
               }, {
                  minOrder: 2,
                  maxOrder: 5,
                  category: 'Хянасан'
               }, {
                  minOrder: 6,
                  maxOrder: 7,
                  category: 'Бэлтгэсэн'
               }].map(category =>
                  <div className="tw-flex flex tw-flex-wrap tw-mt-1" key={category.category}>
                     <div className="tw-pl-2 tw-mt-2 tw-mb-3 tw-w-60 tw-font-medium">
                        {category.category}:
                     </div>
                     <div className="">
                        {signers.filter(signer => signer.order >= category.minOrder && signer.order <= category.maxOrder).map(signer =>
                           <div className="tw-mb-3 print-no-break" key={signer.order}>
                              <div className="tw-flex tw-items-center tw-mt-1">
                                 <span className="tw-mr-2 print-hide">
                                    Нэр:
                                 </span>
                                 <Fill value={signer.name} name="name" index={signer.order} setter={handleInputSigners} editable defaultLength={24} />
                              </div>
                              <p className="tw-mt-1">
                                 {signer.position}
                              </p>
                              <Signature signer={signer} setter={setSigners} />
                           </div>
                        )}
                     </div>
                  </div>
               )}
            </div>
         </div>

         <div className="tw-flex tw-justify-center">
            <button className="tw-my-8 tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-rounded tw-py-2 tw-px-8 hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors print-invisbile" onClick={handleSave}>
               Хадгалах
            </button>
         </div>
      </div>
   )
}

const classCell = 'tw-border tw-border-gray-300 tw-px-2 tw-relative'

export function TextareaCell({ value, name, index, setter, placeholder, height = 60 }) {
   return (
      <td className={`${classCell}`} style={{ padding: 0, minWidth: 120 }}>
         <div className="tw-p-2 tw-invisible tw-break-all tw-leading-tight tw-text-13px" style={{ minHeight: height }}>
            {value ?? ''}
         </div>
         <textarea className="tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-w-full tw-p-2 tw-resize-none tw-overflow-hidden focus:tw-outline-none tw-bg-transparent tw-placeholder-opacity-30 tw-text-13px" value={value ?? ''} onChange={e => setter(name, e.target.value, index)} placeholder={placeholder} />
      </td>
   )
}
