import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { TextareaCell } from '../contract_reports/protectionReport'
import { Fill, Signature } from './makeContract'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import { formatNumberAlt } from 'components/utilities/utilities'
import { TableCellCurrency } from './activityPlanAttach'

const initialReport = [{
   activity: null,
   budget: null,
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

export default function FinalCostAttach({ contractId }) {
   const AlertCtx = useContext(AlertContext)

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
      next[index][key] = value ?? null
      return next
   })

   const handleAdd = () => setReport(prev => [...prev, {
      activity: null,
      budget: null,
      payment: null,
      final_cost: null,
      attachments: null,
      reviewed_amount: null,
      reduction_reason: null
   }])


   const handleRemove = (index) => setReport(prev => prev.filter((report, i) => i !== index))

   const netBudget = report.reduce((acc, cv) => acc += +cv.budget, 0)
   const netPayment = report.reduce((acc, cv) => acc += +cv.payment, 0)
   const netFinalCost = report.reduce((acc, cv) => acc += +cv.final_cost, 0)
   const netReviewedAmount = report.reduce((acc, cv) => acc += +cv.reviewed_amount, 0)

   const [signers, setSigners] = useState(initialSigners)

   const handleInputSigners = (key, value, index) => setSigners(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   useEffect(() => {
      if (contractId === null || contractId === undefined) {
         return
      }
      axios.get(`contracts/${contractId}/attach-2`, {
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
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Эхлээд гэрээгээ үүсгэнэ үү.' })
         return
      }
      if (report[0].id === undefined) {
         axios.post(`contracts/${contractId}/attach-2`, {
            rows: report,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const report = res.data.data.rows
            const signers = res.data.data.signers
            report?.length && setReport(report)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт 2-ыг хадгаллаа.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт 2-ыг хадгалж чадсангүй.' })
         })
      } else {
         axios.put(`contracts/${contractId}/attach-2`, {
            rows: report,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const report = res.data.data.rows
            const signers = res.data.data.signers
            report?.length && setReport(report)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт 2-ийг шинэчиллээ.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт 2-ийг шинэчилж чадсангүй.' })
         })
      }
   }

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-py-6 print-break-after">
         <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6 tw-mx-2 sm:tw-mx-8">
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

         <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4 tw-relative">
            <table>
               <thead>
                  <tr>
                     <th className={`${classCell} tw-text-center`}>№</th>
                     <th className={`${classCell} tw-text-center`}>
                        Үйл ажиллагаа <span className="tw-font-light">(зөвшөөрөгдөх зардал)</span>
                     </th>
                     <th className={`${classCell} tw-text-center`}>
                        Үйл ажиллагааны нийт төсөвт өртөг <span className="tw-font-light">/НӨАТ ороогүй/</span>
                     </th>
                     <th className={`${classCell} tw-text-center`}>
                        Явцын төлбөрийн дүн <span className="tw-font-light">/НӨАТ ороогүй/</span>
                     </th>
                     <th className={`${classCell} tw-text-center`}>
                        Эцсийн төлбөрийн эцсийн дүн <span className="tw-font-light">/НӨАТ ороогүй/</span>
                     </th>
                     <th className={`${classCell} tw-text-center`}>Холбогдох баримтууд*</th>
                     <th className={`${classCell} tw-text-center`}>Санхүүгийн дэмжлэг олгогчийн хянасан дүн</th>
                     <th className={`${classCell} tw-text-center`}>
                        Санхүүгийн дэмжлэгийг бууруулсан тохиолдолд шалтгаан <span className="tw-font-light">/үндэслэл/</span>
                     </th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {report.map((row, i) =>
                     <tr key={i}>
                        <td className={classCell}>
                           {i + 1}
                        </td>
                        <TextareaCell value={row.activity} name="activity" index={i} setter={handleInputReport} />
                        <TableCellCurrency value={row.budget} name="budget" index={i} setter={handleInputReport} />
                        <TableCellCurrency value={row.payment} name="payment" index={i} setter={handleInputReport} />
                        <TableCellCurrency value={row.final_cost} name="final_cost" index={i} setter={handleInputReport} />
                        <td className={classCell}>
                           file upload
                        </td>
                        <TableCellCurrency value={row.reviewed_amount} name="reviewed_amount" index={i} setter={handleInputReport} />
                        <TextareaCell value={row.reduction_reason} name="reduction_reason" index={i} setter={handleInputReport} />
                        <td className="">
                           <MinusCircleSVG className="tw-w-7 tw-h-7 tw-text-red-500 active:tw-text-red-600 tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-transition-colors tw-cursor-pointer" onClick={() => handleRemove(i)} />
                        </td>
                     </tr>
                  )}
                  <tr>
                     <td className={classCell}></td>
                     <td className={classCell}>Нийт зардлын дүн</td>
                     <td className={classCell}>
                        <NetAmount sum={netBudget} />
                     </td>
                     <td className={classCell}>
                        <NetAmount sum={netPayment} />
                     </td>
                     <td className={classCell}>
                        <NetAmount sum={netFinalCost} />
                     </td>
                     <td className={classCell}></td>
                     <td className={classCell}>
                        <NetAmount sum={netReviewedAmount} />
                     </td>
                     <td className={classCell}></td>
                  </tr>
                  <tr>
                     <td className={classCell}></td>
                     <td className={classCell}>Үүнээс: Санхүүгийн дэмжлэгийн дүн</td>
                     <td className={classCell}>
                        <NetAmount sum={netBudget / 2} />
                     </td>
                     <td className={classCell}>
                        <NetAmount sum={netPayment / 2} />
                     </td>
                     <td className={classCell}>
                        <NetAmount sum={netFinalCost / 2} />
                     </td>
                     <td className={classCell}></td>
                     <td className={classCell}>
                        <NetAmount sum={netReviewedAmount / 2} />
                     </td>
                     <td className={classCell}></td>
                  </tr>
               </tbody>
            </table>
            <PlusCircleSVG className="tw-w-7 tw-h-7 tw-text-green-500 active:tw-text-green-600 tw-transition-colors tw-cursor-pointer tw-absolute tw--bottom-4 tw-right-4 print-invisbile" onClick={handleAdd} />
         </div>

         <div className="tw-mt-10 tw-mx-4 sm:tw-mx-12">
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
                        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-4 print-no-break" key={signer.order}>
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

         <div className="tw-mt-10 tw-pb-8 tw-mx-2 sm:tw-mx-8">
            <p className="" style={{ textIndent: 16 }}>
               Холбогдох баримт* Төлбөрийн баримт, бүртгэлийн хураамж төлсөн баримт, түрээс төлсөн тохиолдолд төлбөрийн баримт, үзэсгэлэнд оролцогчдын нисэх тийз (хамгийн бага тарифаар), паспортын хуулбар, зочид буудлын зардал (Сангийн сайдын тушаалаар батлагдсан  төрийн албан хаагчийн зардлаас хэтрэхгүй), аудит хийлгэсэн бол аудитын тайлан, зөвлөх үйлчилгээ авсан бол зөвлөх үйлчилгээний тайлан, лабораторийн шинжилгээ хийлгэсэн бол үр дүн, судалгаа хийлгэсэн бол судалгааны тайлан, гэрчилгээний хуулбар, шаардлагатай бусад баримт бичиг.
            </p>

            <p className="tw-mt-2" style={{ textIndent: 16 }}>
               Хэрэв туслан гүйцэтгэгч нь гадаадын компани, хувь хүн бол: холбогдох татварын албанд татвар шилжүүлсэн баримт, компанийн гэрчилгээ, иргэний үнэмлэхийн хуулбар, тухайн улстай байгуулсан давхар татварын гэрээний хуулбар.
            </p>

            <p className="tw-mt-2" style={{ textIndent: 16 }}>
               Гадаад валютаар хийгдсэн төлбөрүүдийг гүйлгээ хийгдсэн өдрийн өмнөх өдрийн Монголбанкны албан ханшаар төгрөгт хөрвүүлэн тооцож ирүүлэх ба санхүүгийн дэмжлэг нь уг дүнгийн 50 хувь байх бөгөөд Гэрээний Хавсралт 1-д заасан дүнгээс ихгүй байна.
            </p>
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

function NetAmount({ sum }) {
   return (
      <span className="tw-float-right">
         {isNaN(sum)
            ? '-'
            : `${formatNumberAlt(sum)} ₮`
         }
      </span>
   )
}
