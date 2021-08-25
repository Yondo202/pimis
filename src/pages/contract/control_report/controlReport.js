import React, { useState, useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'
import { useEffect } from 'react'
import axios from 'axiosbase'
import { Signature } from '../make_contract/makeContract'

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
   position: 'Экспортыг дэмжих төслийн захирал',
   signature: null
}, {
   order: 2,
   position: 'Экспортыг дэмжих төслийн зохицуулагч',
   signature: null
}, {
   order: 3,
   position: 'Экспортыг дэмжих төслийн санхүүгийн мэргэжилтэн',
   signature: null
}, {
   order: 4,
   position: 'Экспортыг дэмжих төслийн бизнес хөгжлийн ахлах мэргэжилтэн',
   signature: null
}, {
   order: 5,
   position: 'Экспортыг дэмжих төслийн байгаль орчин, нийгмийн хамгааллын зөвлөх',
   signature: null
}, {
   order: 6,
   position: 'Санхүүгийн дэмжлэг хүртэгч хуулийн этгээдийн захирал',
   signature: null
}, {
   order: 7,
   position: 'Санхүүгийн дэмжлэг хүртэгч хуулийн этгээдийн байгаль орчны ажилтан',
   signature: null
}]

export default function ControlReport() {
   const [report, setReport] = useState(initialState)

   const handleInput = (key, value, index) => setReport(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const AlertCtx = useContext(AlertContext)

   const [signers, setSigrners] = useState(initialSigners)

   useEffect(() => {
      // axios.post()
   }, [])

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-font-medium tw-text-center tw-mt-6">
               ii ХАМГААЛЛЫН ҮЙЛ  АЖИЛЛАГААНЫ ХЯНАЛТЫН ТАЙЛАН
            </div>

            <div className="tw-font-medium tw-text-center tw-mt-4">
               Санхүүгийн дэмжлэг хүртэгчийн байгаль орчин, нийгмийн удирдлага, хяналт шинжилгээний төлөвлөгөөний хэрэгжилт
            </div>

            <div className="tw-mt-6 tw-mx-4 sm:tw-mx-12">
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

            <div className="tw-mt-10 tw-pb-12 tw-mx-4 sm:tw-mx-12">
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
                  <div className="tw-flex tw-flex-wrap lg:tw-flex-nowrap" key={category.category}>
                     <div className="tw-mt-2 tw-w-44 tw-flex-shrink-0 tw-font-medium">
                        {category.category}:
                     </div>
                     <div className="tw-w-full tw-pl-4 lg:tw-pl-0">
                        {signers.filter(signer => signer.order >= category.minOrder && signer.order <= category.maxOrder).map(signer =>
                           <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-4" key={signer.order}>
                              <Signature signer={signer} setter={setSigrners} />
                              <div className="tw-mt-2">
                                 {signer.position}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

const classCell = 'tw-border tw-border-gray-300 tw-px-2 tw-relative'

function TextareaCell({ value, name, index, setter }) {
   return (
      <td className={`${classCell}`} style={{ padding: 0, minWidth: 120 }}>
         <div className="tw-p-2 tw-invisible tw-break-all tw-leading-tight" style={{ minHeight: 60 }}>
            {value ?? ''}
         </div>
         <textarea className="tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-w-full tw-p-2 tw-resize-none tw-overflow-hidden focus:tw-outline-none tw-bg-transparent" value={value ?? ''} onChange={e => setter(name, e.target.value, index)} />
      </td>
   )
}
