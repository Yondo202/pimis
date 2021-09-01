import React, { useState, useEffect } from 'react'
import { Fill, Signature } from './makeContract'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'

const initialOwners = [{
   fullname: null,
   citizenship: null,
   residence_country: null,
   share_quarter: null,
   voting_share_quarter: null,
   directive: null
}]

const initialSigners = [{
   order: 1,
   name: null,
   position: null,
   signature: null,
   date: null
}]

export default function OwnershipAttach({ contract = {} }) {
   const AlertCtx = useContext(AlertContext)

   const contractId = contract.id

   const [owners, setOwners] = useState(initialOwners)

   const handleInputOwner = (key, value, index) => setOwners(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleAdd = () => setOwners(prev => [...prev, {
      fullname: null,
      citizenship: null,
      residence_country: null,
      share_quarter: null,
      voting_share_quarter: null,
      directive: null
   }])

   const handleRemove = (index) => setOwners(prev => prev.filter((_, i) => i !== index))

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
      axios.get(`contracts/${contractId}/attach-3`, {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         const owners = res.data.data.rows
         const signers = res.data.data.signers
         owners?.length && setOwners(owners)
         signers?.length && setSigners(signers)
      })
   }, [contractId])

   const handleSave = () => {
      if (contractId === null || contractId === undefined) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Эхлээд гэрээгээ үүсгэнэ үү.' })
         return
      }
      if (owners[0].id === undefined) {
         axios.post(`contracts/${contractId}/attach-3`, {
            rows: owners,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const owners = res.data.data.rows
            const signers = res.data.data.signers
            owners?.length && setOwners(owners)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт 3-ыг хадгаллаа.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт 3-ыг хадгалж чадсангүй.' })
         })
      } else {
         axios.put(`contracts/${contractId}/attach-3`, {
            rows: owners,
            signers: signers
         }, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const owners = res.data.data.rows
            const signers = res.data.data.signers
            owners?.length && setOwners(owners)
            signers?.length && setSigners(signers)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Хавсралт 3-ыг шинэчиллээ.' })
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Хавсралт 3-ыг шинэчилж чадсангүй.' })
         })
      }
   }

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6 tw-mx-2 sm:tw-mx-8">
               Хавсралт 3. Эцсийн өмчлөгчийн мэдээлэл
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4 tw-border tw-border-gray-300 tw-p-2 tw-text-13px tw-font-sans">
               ЗААВАР:
               <p className="tw-mt-4">
                  Энэхүү эцсийн өмчлөлийн талаархи мэдээллийг ("Маягт") Санхүүгийн дэмжлэг хүртэгч байгууллагууд бөглөнө. Санхүүгийн дэмжлэг хүртэгч гишүүн байгууллага тус бүр тусдаа маягт бөглөж ирүүлнэ. Энэхүү маягтанд ирүүлэх эцсийн өмчлөгчийн тухай мэдээлэл нь маягтыг бөглөж ирүүлсэн өдрийн байдлаар хүчинтэй байна.
               </p>

               <p className="tw-mt-4">
                  Энэхүү маягтад заасан эцсийн өмчлөгч гэж Санхүүгийн дэмжлэг хүртэгч гишүүн байгууллагыг эцсийн байдлаар өмчилж, удирдаж байгаа дараахь нөхцлүүдийн аль нэгийг нь эсвэл заримыг нь хангаж байгаа хувь хүнийг хэлнэ:
               </p>
               <ul className="tw-px-2">
                  {[
                     '-	Хувьцааны 25 ба түүнээс дээш хувийг шууд болон шууд бус хэлбэрээр эзэмшиж буй;',
                     '-	Саналын эрхтэй хувьцааны 25 ба түүнээс дээш хувийг шууд ба шууд бус хэлбэрээр эзэмшиж буй;',
                     '-	Дэмжлэг хүртэгч гишүүдийн Удирдах зөвлөл буюу түүнтэй адилтгах удирдах байгууллагуудын олонхийг шууд болон шууд бусаар томилох эрхтэй.'
                  ].map((item, i) =>
                     <li className="tw-mt-2" key={i}>
                        {item}
                     </li>
                  )}
               </ul>
            </div>

            <div className="tw-mt-8 tw-mx-2 sm:tw-mx-4">
               <div className="tw-ml-2 tw-font-medium">
                  Хэнд: Экспортыг дэмжих төсөлд
               </div>
               <p className="tw-mt-3">
                  {contract.year ?? '____'} оны {contract.month ?? '__'} дугаар сарын {contract.day ?? '__'}-ний өдөр байгуулсан Гэрээний дагуу эцсийн өмчлөгчийн талаар нэмэлт мэдээлэл өгөх үүргийн дагуу
               </p>
               <p className="tw-ml-2 tw-mt-1">
                  (i) бид дараах эцсийн өмчлөгчийн мэдээллийг өгч байна.
               </p>
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4 tw-relative">
               <table>
                  <thead>
                     <tr>
                        {[
                           'Эцсийн өмчлөгчийн мэдээлэл',
                           'Хувьцааны 25 ба түүнээс дээш хувийг шууд болон шууд бус хэлбэрээр эзэмшиж байгаа',
                           'Саналын эрхтэй хувьцааны 25% ба түүнээс дээш хувийг шууд ба шууд бус хэлбэрээр эзэмшиж байгаа',
                           'Санхүүгийн дэмжлэг хүртэгч гишүүдийн Удирдах зөвлөл буюу түүнтэй адилтгах удирдах байгууллагуудын олонхыг шууд болон шууд бусаар томилох эрхтэй'
                        ].map((header, i) =>
                           <th className={`${classCell} tw-text-center` } key={i}>
                              {header}
                           </th>
                        )}
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {owners.map((owner, i) =>
                        <tr key={i}>
                           <td className={classCell} style={{ width: 180 }}>
                              <div className="tw-flex tw-py-0.5">
                                 <Fill value={owner.fullname} name="fullname" index={i} setter={handleInputOwner} editable dotted placeholder="Овог нэр" />
                                 <span className="tw-mx-1">,</span>
                              </div>
                              <div className="tw-flex tw-py-0.5">
                                 <Fill value={owner.citizenship} name="citizenship" index={i} setter={handleInputOwner} editable dotted placeholder="Иргэний харьяалал" />
                                 <span className="tw-mx-1">,</span>
                              </div>
                              <div className="tw-flex tw-py-0.5">
                                 <Fill value={owner.residence_country} name="residence_country" index={i} setter={handleInputOwner} editable dotted placeholder="Оршин суугаа улс" />
                                 <span className="tw-mx-1">,</span>
                              </div>
                           </td>

                           <TableCellCheckbox checked={owner.share_quarter} name="share_quarter" index={i} setter={handleInputOwner} />
                           <TableCellCheckbox checked={owner.voting_share_quarter} name="voting_share_quarter" index={i} setter={handleInputOwner} />
                           <TableCellCheckbox checked={owner.directive} name="directive" index={i} setter={handleInputOwner} />
                           <td className="">
                              <MinusCircleSVG className="tw-w-7 tw-h-7 tw-text-red-500 active:tw-text-red-600 tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-transition-colors tw-cursor-pointer" onClick={() => handleRemove(i)} />
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
               <PlusCircleSVG className="tw-w-7 tw-h-7 tw-text-green-500 active:tw-text-green-600 tw-transition-colors tw-cursor-pointer tw-absolute tw--bottom-4 tw-right-4" onClick={handleAdd} />
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4">
               <div className="">
                  <div className="tw-font-medium tw-ml-2">
                     ЭСХҮЛ
                  </div>
                  <p className="tw-ml-2 tw-mt-1">
                     (ii) Дараах нөхцөлүүдийн аль нэгийг эсхүл заримыг нь хангасан эцсийн өмчлөгч байхгүй болохыг мэдэгдэж байна:
                  </p>
                  <ul className="tw-list-disc tw-list-inside tw-px-3.5 tw-mt-0.5">
                     {[
                        'Хувьцааны 25 ба түүнээс дээш хувийг шууд болон шууд бус хэлбэрээр эзэмшиж байгаа',
                        'Саналын эрхтэй хувьцааны 25 ба түүнээс дээш хувийг шууд ба шууд бус хэлбэрээр эзэмшиж байгаа',
                        'Санхүүгийн дэмжлэг хүртэгч гишүүдийн Удирдах зөвлөл буюу түүнтэй адилтгах удирдах байгууллагуудын олонхыг шууд болон шууд бусаар томилох эрхтэй'
                     ].map((item, i) =>
                        <li className="tw-py-0.5" key={i}>
                           {item}
                        </li>
                     )}
                  </ul>
               </div>

               <div className="tw-mt-2">
                  <div className="tw-font-medium tw-ml-2">
                     ЭСХҮЛ
                  </div>
                  <p className="tw-ml-2 tw-mt-1">
                     (iii) Бид дараах нөхцөлүүдийн аль нэгийг нь эсхүл заримыг нь хангаж байгаа эцсийн өмчлөгчийг тодорхойлох боломжгүй гэдгээ мэдэгдэж байна. [Хэрэв энэ сонголтыг сонгосон бол Санхүүгийн дэмжлэг хүртэгч гишүүн яагаад тодорхойлж чадахгүй байгаа талаар тайлбар өгөх шаардлагатай]:
                  </p>
                  <ul className="tw-list-disc tw-list-inside tw-px-3.5 tw-mt-0.5">
                     {[
                        'Хувьцааны 25 ба түүнээс дээш хувийг шууд болон шууд бус хэлбэрээр эзэмшиж байгаа',
                        'Саналын эрхтэй хувьцааны 25% ба түүнээс дээш хувийг шууд ба шууд бус хэлбэрээр эзэмшиж байгаа',
                        'Санхүүгийн дэмжлэг хүртэгч гишүүдийн Удирдах зөвлөл буюу түүнтэй адилтгах удирдах байгууллагуудын олонхыг шууд болон шууд бусаар томилох эрхтэй'
                     ].map((item, i) =>
                        <li className="tw-py-0.5" key={i}>
                           {item}
                        </li>
                     )}
                  </ul>
               </div>
            </div>

            <div className="tw-mt-6 tw-pb-8 tw-mx-4 sm:tw-mx-12">
               {signers.map((signer, i) =>
                  <div className="" key={i}>
                     <div className="tw-flex tw-items-center tw-mt-1.5">
                        <span className="tw-mr-2">
                           Компаний нэр:
                        </span>
                        <Fill setter={() => { }} editable defaultLength={20} dotted />
                     </div>
                     <div className="tw-flex tw-items-center tw-mt-1.5">
                        <span className="tw-mr-2">
                           Компанийг төлөөлж гарын үсэг зурах эрх бүхий хүний нэр:
                        </span>
                        <Fill value={signer.name} name="name" index={i} setter={handleInputSigner} editable defaultLength={20} dotted />
                     </div>
                     <div className="tw-flex tw-items-center tw-mt-1.5">
                        <span className="tw-mr-2">
                           Албан тушаал:
                        </span>
                        <Fill value={signer.position} name="position" index={i} setter={handleInputSigner} editable defaultLength={20} dotted />
                     </div>
                     <div className="">
                        <Signature signer={signer} setter={setSigners} />
                     </div>
                     <div className="tw-flex tw-items-center tw-mt-1.5">
                        <span className="tw-mr-3">
                           Гарын үсэг зурсан огноо:
                        </span>
                        <input className="focus:tw-outline-none tw-w-32 tw-text-13px tw-border-b tw-border-gray-500 tw-rounded-none" type="date" value={signer.date ?? ''} onChange={e => handleInputSigner('date', e.target.value, i)} />
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

const classCell = "tw-border tw-border-gray-300 tw-px-2"

function TableCellCheckbox({ checked, name, index, setter, }) {
   return (
      <td className={classCell}>
         <div className="tw-flex tw-items-center tw-px-2">
            <input className="tw-w-3.5 tw-h-3.5" type="checkbox" checked={typeof (checked) === 'boolean' && checked} onChange={() => setter(name, true, index)} id={`${name}-${index}-true`} />
            <label className="tw-ml-1 tw-mb-0" htmlFor={`${name}-${index}-true`}>Тийм</label>
         </div>
         <div className="tw-flex tw-items-center tw-px-2">
            <input className="tw-w-3.5 tw-h-3.5" type="checkbox" checked={typeof (checked) === 'boolean' && !checked} onChange={() => setter(name, false, index)} id={`${name}-${index}-false`} />
            <label className="tw-ml-1 tw-mb-0" htmlFor={`${name}-${index}-false`}>Үгүй</label>
         </div>
      </td>
   )
}
