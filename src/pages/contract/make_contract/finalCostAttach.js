import React from 'react'
import { useState } from 'react'
import { TextareaCell } from '../performance_report/controlReport'
import { Fill, Signature } from './makeContract'

const initialReport = [{
   order: 1,
   activity: null,
   butget: null,
   payment: null,
   final_cost: null,
   attachments: null,
   reviewed_amount: null,
   reduction_reason: null
}, {
   order: 2,
   activity: null,
   butget: null,
   payment: null,
   final_cost: null,
   attachments: null,
   reviewed_amount: null,
   reduction_reason: null
}, {
   order: 3,
   activity: null,
   butget: null,
   payment: null,
   final_cost: null,
   attachments: null,
   reviewed_amount: null,
   reduction_reason: null
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
   position: 'Экспортыг дэмжих төслийн бизнес хөгжлийн зөвлөх',
   signature: null
}, {
   order: 6,
   position: 'Санхүүгийн дэмжлэг хүртэгч хуулийн этгээдийн захирал',
   signature: null
}, {
   order: 7,
   position: 'Санхүүгийн дэмжлэг хүртэгч хуулийн этгээдийн ерөнхий ерөнхий нягтлан бодогч',
   signature: null
}]

export default function FinalCostAttach() {
   const [info, setInfo] = useState({
      name: null,
      contract_number: null,
      finance_amount: null,
      contract_duration: null,
      progress_pay: null,
      final_pay: null
   })

   const handleInput = (key, value) => setInfo(prev => ({ ...prev, [key]: value }))

   const [report, setReport] = useState(initialReport)

   const handleInputReport = (key, value, index) => setReport(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const [signers, setSigners] = useState(initialSigners)

   const handleInputSigners = (key, value, index) => setSigners(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6">
               (i)   Хавсралт 2. Тайлан
               <div className="">
                  Явцын/ Эцсийн зардлын тайлан
               </div>
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-6">
               <div className="">
                  Санхүүгийн дэмжлэг хүртэгчийн нэр: <Fill value={info.name} name="name" setter={handleInput} editable defaultLength={16} dotted />
               </div>
               <div className="tw-mt-1">
                  Гэрээний дугаар: <Fill value={info.contract_number} name="contract_number" setter={handleInput} editable defaultLength={8} dotted />
               </div>
               <div className="tw-mt-1">
                  Санхүүгийн дэмжлэгийн хэмжээ: <Fill value={info.finance_amount} name="finance_amount" setter={handleInput} editable defaultLength={12} dotted />₮
               </div>
               <div className="tw-mt-1">
                  Гэрээний хугацаа: <Fill value={info.contract_duration} name="contract_duration" setter={handleInput} editable defaultLength={12} dotted />
               </div>
               <div className="tw-mt-1">
                  Явцын төлбөрийн хуваарь: <Fill value={info.progress_pay} name="progress_pay" setter={handleInput} editable defaultLength={12} dotted />
               </div>
               <div className="tw-mt-1">
                  Сүүлийн төлбөрийн хуваарь: <Fill value={info.final_pay} name="final_pay" setter={handleInput} editable defaultLength={12} dotted />
               </div>
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4">
               <table>
                  <thead>
                     <tr>
                        <th className={classCell}>№</th>
                        <th className={classCell}>
                           Үйл ажиллагаа <span className="tw-font-light">(зөвшөөрөгдөх зардал)</span>
                        </th>
                        <th className={classCell}>
                           Үйл ажиллагааны нийт төсөвт өртөг <span className="tw-font-light">/НӨАТ ороогүй/</span>
                        </th>
                        <th className={classCell}>
                           Явцын төлбөрийн дүн <span className="tw-font-light">/НӨАТ ороогүй/</span>
                        </th>
                        <th className={classCell}>
                           Эцсийн төлбөрийн эцсийн дүн <span className="tw-font-light">/НӨАТ ороогүй/</span>
                        </th>
                        <th className={classCell}>Холбогдох баримтууд*</th>
                        <th className={classCell}>Санхүүгийн дэмжлэг олгогчийн хянасан дүн</th>
                        <th className={classCell}>
                           Санхүүгийн дэмжлэгийг бууруулсан тохиолдолд шалтгаан <span className="tw-font-light">/үндэслэл/</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {report.map((row, i) =>
                        <tr key={row.order}>
                           <td className={classCell}>
                              {row.order}
                           </td>
                           <TextareaCell value={row.activity} name="activity" index={i} setter={handleInputReport} />
                           <TextareaCell value={row.butget} name="butget" index={i} setter={handleInputReport} />
                           <TextareaCell value={row.payment} name="payment" index={i} setter={handleInputReport} />
                           <TextareaCell value={row.final_cost} name="final_cost" index={i} setter={handleInputReport} />
                           <td className={classCell}>
                              file upload
                           </td>
                           <TextareaCell value={row.reviewed_amount} name="reviewed_amount" index={i} setter={handleInputReport} />
                           <TextareaCell value={row.reduction_reason} name="reduction_reason" index={i} setter={handleInputReport} />
                        </tr>
                     )}
                     <tr>
                        <td className={classCell}></td>
                        <td className={classCell}>Нийт зардлын дүн</td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                     </tr>
                     <tr>
                        <td className={classCell}></td>
                        <td className={classCell}>Үүнээс: Санхүүгийн дэмжлэгийн дүн</td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                        <td className={classCell}></td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div className="tw-mt-6 tw-mx-4 sm:tw-mx-12">
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
                              <Signature signer={signer} setter={setSigners} />
                              <div className="tw-mt-2">
                                 {signer.position}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               )}
            </div>

            <div className="tw-mt-6 tw-pb-10 tw-mx-2 sm:tw-mx-6">
               <p className="">
                  Холбогдох баримт* Төлбөрийн баримт, бүртгэлийн хураамж төлсөн баримт, түрээс төлсөн тохиолдолд төлбөрийн баримт, үзэсгэлэнд оролцогчдын нисэх тийз (хамгийн бага тарифаар), паспортын хуулбар, зочид буудлын зардал (Сангийн сайдын тушаалаар батлагдсан  төрийн албан хаагчийн зардлаас хэтрэхгүй), аудит хийлгэсэн бол аудитын тайлан, зөвлөх үйлчилгээ авсан бол зөвлөх үйлчилгээний тайлан, лабораторийн шинжилгээ хийлгэсэн бол үр дүн, судалгаа хийлгэсэн бол судалгааны тайлан, гэрчилгээний хуулбар, шаардлагатай бусад баримт бичиг.
               </p>

               <p className="tw-mt-2">
                  Хэрэв туслан гүйцэтгэгч нь гадаадын компани, хувь хүн бол: холбогдох татварын албанд татвар шилжүүлсэн баримт, компанийн гэрчилгээ, иргэний үнэмлэхийн хуулбар, тухайн улстай байгуулсан давхар татварын гэрээний хуулбар.
               </p>

               <p className="tw-mt-2">
                  Гадаад валютаар хийгдсэн төлбөрүүдийг гүйлгээ хийгдсэн өдрийн өмнөх өдрийн Монголбанкны албан ханшаар төгрөгт хөрвүүлэн тооцож ирүүлэх ба санхүүгийн дэмжлэг нь уг дүнгийн 50 хувь байх бөгөөд Гэрээний Хавсралт 1-д заасан дүнгээс ихгүй байна.
               </p>
            </div>
         </div>
      </div>
   )
}

const classCell = 'tw-border tw-border-gray-300 tw-px-2'
