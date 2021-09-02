import React, { useState, useEffect, useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { Fill, Signature } from '../make_contract/makeContract'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import { TextareaCell } from './protectionReport'

const initialForm = [{
   work_completed: null,
   approved: true
}]

const initialFormAlt = [{
   work_completed: null,
   approved: false
}]

const initialSigners = [{
   order: 1,
   name: null,
   position: null,
   signature: null,
   date: null
}, {
   order: 2,
   name: null,
   position: 'Төслийн зохицуулагч',
   signature: null,
   date: null
}, {
   order: 3,
   name: null,
   position: 'Бизнес хөгжлийн ахлах мэргэжилтэн',
   signature: null,
   date: null
}, {
   order: 4,
   name: null,
   position: 'Бизнес хөгжлийн зөвлөх',
   signature: null,
   date: null
}, {
   order: 5,
   name: null,
   position: 'Хяналт-шинжилгээ, үнэлгээний мэргэжилтэн',
   signature: null,
   date: null
}, {
   order: 6,
   name: null,
   position: '',
   signature: null,
   date: null
}]

const descriptions = {
   4: '/Хариуцсан бизнес хөгжлийн зөвлөх/',
   6: '/Санхүүгийн дэмжлэг хүртэгч байгууллагын удирдах албан тушаалтан/'
}

export default function PerformanceReport({ contract ={} }) {
   const AlertCtx = useContext(AlertContext)

   const contractId = contract.id

   const [info, setInfo] = useState({
      contract_number: null,
      receiver_name: null,
      phone: null,
      email: null
   })

   const handleInput = (key, value) => setInfo(prev => ({ ...prev, [key]: value }))

   const [form, setForm] = useState(initialForm)

   const handleInputForm = (key, value, index) => setForm(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleAdd = () => setForm(prev => [...prev, {
      work_completed: null,
      approved: true
   }])

   const handleRemove = (index) => setForm(prev => prev.filter((_, i) => i !== index))

   const [formAlt, setFormAlt] = useState(initialFormAlt)

   const handleInputFormAlt = (key, value, index) => setFormAlt(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleAddAlt = () => setFormAlt(prev => [...prev, {
      work_completed: null,
      approved: false
   }])

   const handleRemoveAlt = (index) => setFormAlt(prev => prev.filter((_, i) => i !== index))

   const [signers, setSigners] = useState(initialSigners)

   const handleInputSigner = (key, value, order) => setSigners(prev => {
      const next = [...prev]
      const index = next.findIndex(signer => signer.order === order)
      next[index][key] = value
      return next
   })

   useEffect(() => {
      if (contractId === null || contractId === undefined) {
         return
      }
      axios.get(`contracts/${contractId}/performance-report`, {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         const form = res.data.data.approved
         const formAlt = res.data.data.disapproved
         const signers = res.data.data.signers
         form?.length && setForm(form)
         formAlt?.length && setFormAlt(formAlt)
         signers?.length && setSigners(signers)
      })
   }, [contractId])

   const handleSave = () => {
      if (contractId === null || contractId === undefined) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Түншлэлийн гэрээ сонгогдоогүй байна.' })
         return
      }
      if (form[0].id === undefined) {
         axios.post(`contracts/${contractId}/performance-report`, {
            approved: form,
            disapproved: formAlt,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const form = res.data.data.approved
            const formAlt = res.data.data.disapproved
            const signers = res.data.data.signers
            form?.length && setForm(form)
            formAlt?.length && setFormAlt(formAlt)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Ажлын гүйцэтгэлийг хадгаллаа.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Ажлын гүйцэтгэлийг хадгалж чадсангүй.' })
         })
      } else {
         axios.put(`contracts/${contractId}/performance-report`, {
            approved: form,
            disapproved: formAlt,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const form = res.data.data.approved
            const formAlt = res.data.data.disapproved
            const signers = res.data.data.signers
            form?.length && setForm(form)
            formAlt?.length && setFormAlt(formAlt)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Ажлын гүйцэтгэлийг шинэчиллээ.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Ажлын гүйцэтгэлийг шинэчилж чадсангүй.' })
         })
      }
   }

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6 tw-mx-2 sm:tw-mx-8">
               iii) АЖЛЫН ГҮЙЦЭТГЭЛ ХҮЛЭЭН АВАХ МАЯГТ
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-6">
               <div className="">
                  Гэрээний дугаар: <Fill value={info.contract_number} name="contract_number" setter={handleInput} editable defaultLength={12} dotted />
               </div>
               <div className="tw-mt-1">
                  Санхүүгийн дэмжлэг хүртэгчийн нэр: <Fill value={info.receiver_name} name="receiver_name" setter={handleInput} editable defaultLength={20} dotted />
               </div>
               <div className="tw-mt-1">
                  Утасны дугаар: <Fill value={info.phone} name="phone" setter={handleInput} editable defaultLength={12} dotted />
               </div>
               <div className="tw-mt-1">
                  Имэйл: <Fill value={info.email} name="email" setter={handleInput} editable defaultLength={20} dotted />
               </div>
            </div>

            <div className="tw-font-medium tw-mt-6 tw-mx-2 sm:tw-mx-6">
               Энэхүү маягтад гарын үсэг зурагдсанаар дараах гүйцэтгэх ажлуудыг батлагдсанд тооцно.
            </div>
            <div className="tw-flex tw-justify-center tw-mt-4 tw-mx-2 sm:tw-mx-4">
               <div className="tw-inline-block tw-relative">
                  <table className="">
                     <thead>
                        <tr>
                           {[
                              '№',
                              'Гүйцэтгэсэн ажлууд'
                           ].map((header, i) =>
                              <th className={`${classCell} tw-text-center`} key={i} style={i === 1 ? { minWidth: 600 } : {}}>
                                 {header}
                              </th>
                           )}
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {form.map((item, i) =>
                           <tr key={i}>
                              <td className={classCell}>{i + 1}</td>
                              <TextareaCell value={item.work_completed} name="work_completed" index={i} setter={handleInputForm} placeholder="/Гүйцэтгэсэн ажлын чанарыг бичнэ үү/" />
                              <td className="">
                                 <MinusCircleSVG className="tw-w-7 tw-h-7 tw-text-red-500 active:tw-text-red-600 tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-transition-colors tw-cursor-pointer" onClick={() => handleRemove(i)} />
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
                  <PlusCircleSVG className="tw-w-7 tw-h-7 tw-text-green-500 active:tw-text-green-600 tw-transition-colors tw-cursor-pointer tw-absolute tw--bottom-4 tw-right-4" onClick={handleAdd} />
               </div>
            </div>

            <div className="tw-font-medium tw-mt-10 tw-mx-2 sm:tw-mx-6">
               Хангалтгүй тохиолдолд: Доор дурдсан ажлын гүйцэтгэлийг хангалтгүй эсхүл хийгээгүй гэж Санхүүгийн дэмжлэг олгогч үзэж байна.
            </div>
            <div className="tw-flex tw-justify-center tw-mt-3 tw-mx-2 sm:tw-mx-4">
               <div className="tw-inline-block tw-relative">
                  <table className="">
                     <thead>
                        <tr>
                           {[
                              '№',
                              'Гүйцэтгэсэн ажлууд'
                           ].map((header, i) =>
                              <th className={`${classCell} tw-text-center`} key={i} style={i === 1 ? { minWidth: 600 } : {}}>
                                 {header}
                              </th>
                           )}
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {formAlt.map((item, i) =>
                           <tr key={i}>
                              <td className={classCell}>{i + 1}</td>
                              <TextareaCell value={item.work_completed} name="work_completed" index={i} setter={handleInputFormAlt} placeholder="/Гүйцэтгэсэн ажлын чанарыг бичнэ үү/" />
                              <td className="">
                                 <MinusCircleSVG className="tw-w-7 tw-h-7 tw-text-red-500 active:tw-text-red-600 tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-transition-colors tw-cursor-pointer" onClick={() => handleRemoveAlt(i)} />
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
                  <PlusCircleSVG className="tw-w-7 tw-h-7 tw-text-green-500 active:tw-text-green-600 tw-transition-colors tw-cursor-pointer tw-absolute tw--bottom-4 tw-right-4" onClick={handleAddAlt} />
               </div>
            </div>

            <div className="tw-flex tw-justify-center">
               <div className="tw-mt-10 tw-mb-8 tw-mx-4 sm:tw-mx-auto">
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
                     maxOrder: 6,
                     category: 'Бэлтгэсэн'
                  }].map(category =>
                     <div className="tw-flex flex tw-flex-wrap tw-mt-3" key={category.category}>
                        <div className="tw-pl-2 tw-mt-2 tw-mb-3 tw-w-60 tw-font-medium">
                           {category.category}:
                        </div>
                        <div className="">
                           {signers.filter(signer => signer.order >= category.minOrder && signer.order <= category.maxOrder).map((signer, i) =>
                              <div className="tw-mb-3">
                                 <div className="tw-flex tw-items-center tw-mt-1.5">
                                    <span className="tw-mr-2">
                                       Нэр:
                                    </span>
                                    <Fill value={signer.name} name="name" index={signer.order} setter={handleInputSigner} editable defaultLength={20} dotted />
                                 </div>
                                 <div className="tw-flex tw-items-center tw-mt-1.5">
                                    <span className="tw-mr-2">
                                       Албан тушаал:
                                    </span>
                                    <Fill value={signer.position} name="position" index={signer.order} setter={handleInputSigner} editable defaultLength={20} dotted />
                                 </div>
                                 <div className="">
                                    <Signature signer={signer} setter={setSigners} />
                                 </div>
                                 <div className="tw-flex tw-items-center tw-mt-1.5">
                                    <span className="tw-mr-3">
                                       Огноо:
                                    </span>
                                    <input className="focus:tw-outline-none tw-w-32 tw-text-13px tw-border-b tw-border-gray-500 tw-rounded-none" type="date" value={signer.date ?? ''} onChange={e => handleInputSigner('date', e.target.value, signer.order)} />
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  )}
               </div>
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
