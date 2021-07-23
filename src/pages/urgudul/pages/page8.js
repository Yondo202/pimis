import React, { useContext, useEffect, useRef, useState } from 'react'
import HelpPopup from 'components/help_popup/helpPopup'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import { Link, useHistory } from 'react-router-dom'
import { animated, Transition } from 'react-spring/renderprops'
import { UrgudulHeader } from './page1'

const initialState = {
   format: false,
   nine_months: false,
   max_amount: false,
   self_fund: false,
   signed: false,
}

export default function UrgudulPage8() {
   const [form, setForm] = useState(initialState)

   const UrgudulCtx = useContext(UrgudulContext)
   const isConfirmed = UrgudulCtx.data.confirmed === 1

   useEffect(() => {
      if (isConfirmed) {
         let temp = {}
         Object.keys(initialState).forEach(key => {
            temp[key] = true
         })
         setForm(temp)
      }
   }, [UrgudulCtx.data.id])

   const handleInputCheckbox = (e) => {
      !isConfirmed && setForm({ ...form, [e.target.name]: e.target.checked })
   }

   const AlertCtx = useContext(AlertContext)

   const history = useHistory()

   const handleSubmit = () => {
      if (UrgudulCtx.data.id) {
         axios.put(`projects/${UrgudulCtx.data.id}`, { confirmed: Object.values(form).every(bool => bool) ? 1 : 0 }, {
            headers: { 'Authorization': getLoggedUserToken() },
         }).then(res => {
            UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийг баталгаажууллаа.' })
            setModalOpen(false)
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Өргөдлийг баталгаажуулж чадсангүй.' })
            setModalOpen(false)
         })
      } else {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
         history.push('/urgudul/1')
      }
   }

   const [modalOpen, setModalOpen] = useState(false)

   const modalRef = useRef()

   const handleClickOutside = (e) => {
      if (modalOpen && !modalRef.current?.contains(e.target)) {
         setModalOpen(false)
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   })

   const handleOpenModal = () => {
      if (Object.values(form).every(bool => bool)) {
         setModalOpen(true)
      } else {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Шалгах хуудастай танилцаж зөвлөнө үү.' })
      }
   }

   return (
      <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pb-10">
         <div className="tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <UrgudulHeader
               label="Шалгах хуудас"
               HelpPopup={<HelpPopup classAppend="tw-ml-2" main="/.../" />}
               projectNumber={UrgudulCtx.data.project_number}
            />

            <div>
               <div className="tw-px-5 tw-pt-3 tw-text-sm">
                  Өргөдлийг илгээхийн өмнө дараах шалгууруудыг бүрэн эсэхийг шалгана уу. Зөвлөсөн тэмдгээр арын нүдэнд тэмдэглэнэ үү:
               </div>

               <div className="tw-m-4 tw-mb-6 tw-shadow-md tw-font-light">
                  <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                     <span className="tw-px-4 tw-py-2">
                        <span className="tw-mr-2">1.</span>
                        Санал болгосон өргөдлийн маягтын форматын дагуу мэдээллийг бөглөсөн.
                     </span>
                     <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.format} name="format" onChange={handleInputCheckbox} />
                  </div>

                  <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                     <span className="tw-px-4 tw-py-2">
                        <span className="tw-mr-2">2.</span>
                        Төслийг хэрэгжүүлэх хугацаа нь 9 сараас хэтрэхгүй байна.
                        <HelpPopup classAppend="tw-ml-2 tw-inline-flex tw-top-1.5" main="Хамгийн дээд хугацаа нь 9 сар болно." />
                     </span>
                     <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.nine_months} name="nine_months" onChange={handleInputCheckbox} />
                  </div>

                  <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                     <span className="tw-px-4 tw-py-2">
                        <span className="tw-mr-2">3.</span>
                        Экспортыг дэмжих төслөөс хүссэн нийт санхүүжилт нь кластерын хувьд 100,000 ам.доллараас, аж ахуйн нэгжийн хувьд 50,000 ам.доллараас хэтрэхгүй байна.
                        <HelpPopup classAppend="tw-ml-2 tw-inline-flex tw-top-1.5" main="Өмнө нь авсан болон энэ удаа хүсч буй нийт дүн нь дээрх дүнгээс хэтрэхгүй байх ёстой." />
                     </span>
                     <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.max_amount} name="max_amount" onChange={handleInputCheckbox} />
                  </div>

                  <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                     <span className="tw-px-4 tw-py-2">
                        <span className="tw-mr-2">4.</span>
                        Экспортыг дэмжих төслөөс хүссэн санхүүжилтийн дүнтэй тэнцүү хэмжээний санхүүжилтийг өргөдөл гаргагч нь өөрийн компанийн зүгээс гаргах бөгөөд энэ дүн нь өргөдөл гаргахаас өмнөх зардал ороогүй дүн байна.
                     </span>
                     <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.self_fund} name="self_fund" onChange={handleInputCheckbox} />
                  </div>

                  <div className="tw-flex tw-items-center tw-justify-between tw-text-sm odd:tw-bg-gray-50">
                     <span className="tw-px-4 tw-py-2">
                        <span className="tw-mr-2">5.</span>
                        Мэдэгдэл нь өргөдөл гаргагч болон кластерын гишүүд бүрээр гарын үсэг зурагдсан байна.
                     </span>
                     <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={form.signed} name="signed" onChange={handleInputCheckbox} />
                  </div>
               </div>

               <div className="tw-flex tw-justify-end">
                  <button className={`tw-m-6 tw-mt-2 tw-px-6 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-sm tw-font-light tw-text-white focus:tw-outline-none tw-rounded tw-transition-colors ${isConfirmed && 'tw-opacity-70'}`} onClick={() => !isConfirmed && handleOpenModal()}>
                     {isConfirmed
                        ? `Өргөдөл баталгаажсан байна`
                        : `Өргөдлийг баталгаажуулах`
                     }
                  </button>
               </div>
            </div>
         </div>

         <Transition
            items={modalOpen}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}>
            {item => item && (anims =>
               <animated.div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8" style={anims}>
                  <Transition
                     items={modalOpen}
                     from={{ transform: 'translateY(-20px)' }}
                     enter={{ transform: 'translateY(0)' }}
                     leave={{ transform: 'translateY(20px)' }}>
                     {item1 => item1 && (anims1 =>
                        <animated.div className="tw-bg-white tw-p-4 tw-relative tw-rounded tw-shadow-md tw-max-w-md tw-ring-2 tw-ring-indigo-500" style={anims1} ref={modalRef}>
                           <div className="tw-text-15px tw-p-2 tw-text-center tw-font-medium">
                              Анхааруулга
                           </div>
                           <div className="tw-text-sm tw-p-2 tw-text-center">
                              Өргөдлийг баталгаажуулсны дараа та дахин өөрчлөлт хийх эрхгүй болох тул бүрэн гүйцэт бөглөсний дараа баталгаажуулна уу.
                           </div>
                           <div className="tw-flex tw-justify-center tw-text-sm">
                              <button className="tw-rounded focus:tw-outline-none tw-bg-blue-700 active:tw-bg-blue-800 tw-transition-colors tw-px-4 tw-py-1.5 tw-mt-4 tw-mb-2 tw-text-white tw-font-light" onClick={handleSubmit}>
                                 Баталгаажуулах
                              </button>
                              <button className="tw-rounded focus:tw-outline-none tw-bg-blue-700 active:tw-bg-blue-800 tw-transition-colors tw-px-4 tw-py-1.5 tw-mt-4 tw-mb-2 tw-ml-4 tw-text-white tw-font-light" onClick={() => setModalOpen(false)}>
                                 Болих
                              </button>
                           </div>
                        </animated.div>
                     )}
                  </Transition>
               </animated.div>
            )}
         </Transition>

         <Transition
            items={isConfirmed}
            from={{ transform: 'scale(0)' }}
            enter={{ transform: 'scale(1)' }}
            leave={{ transform: 'scale(0)' }}
            config={{ clamp: true }}
         >
            {item => item && (anims =>
               <animated.div className="tw-mt-8 tw-mb-20 tw-rounded-lg tw-shadow-md tw-min-w-min tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed" style={anims}>
                  <div className="tw-p-3 tw-font-medium tw-text-blue-500 tw-text-base">
                     <span className="">Бүрдүүлэх нотлох бичиг баримтууд</span>
                  </div>

                  <div className="">
                     <div className="tw-px-5 tw-pt-3 tw-text-sm">
                        Урьдчилсан мэдүүлгээр буюу эхний шатанд тэнцсэн өргөдөл гаргагч нь ажлын 10 хоногийн дотор дараах материалуудыг бүрдүүлж өгөхийг анхаарна уу. Үүнд:
                     </div>

                     <ol className="tw-list-decimal tw-list-inside tw-text-sm tw-m-4 tw-mb-6 tw-shadow-md tw-font-light">
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Экспорт хөгжлийн төлөвлөгөө.
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, Байгаль орчны удирдлагын төлөвлөгөө.
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Хуулийн этгээдийн улсын бүртгэлийн гэрчилгээний хуулбар.
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Өмнөх 2 жилийн санхүүгийн тайлан. /Энэ оны санхүүгийн тайлангийн хамт/
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Холбогдох дүүргийн татварын албанаас 12 сараас дээш хугацааны татварын өргүйг нотолсон тодорхойлолт, баримт.
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Холбогдох нийгмийн даатгалын газраас 12 сараас дээш хугацааны өргүйг нотолсон тодорхойлолт, баримт, нийгмийн даатгал төлдөг ажилчдын тооны мэдээлэл.
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Монгол банкны зээлийн мэдээллийн сангаас муу ангиллын зээлгүйг нотолсон тодорхойлолт, баримт.
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Хуулийн этгээдийн эцсийн өмчлөгчдийг тодорхойлох баримт.
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, ур чадварыг илэрхийлэх намтар. (Дор хаяж 3 албан тушаалтны мэдээлэл)
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо.
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Санхүүжилтийг бүрэн хийх боломжтойг нотолсон баримт бичиг, банкны хуулга гм.
                        </li>
                        <li className="tw-p-2 tw-pl-4 odd:tw-bg-gray-50">
                           Бусад шаардлагатай баримт бичиг.
                        </li>
                     </ol>

                     <div className="tw-flex tw-justify-end">
                        <Link to="/attachments">
                           <button className="tw-mt-2 tw-mb-6 tw-mr-4 tw-px-6 tw-py-2 tw-bg-blue-800 active:tw-bg-blue-700 tw-text-sm tw-text-white focus:tw-outline-none tw-rounded tw-transition-colors tw-font-light">
                              Нотлох бичиг баримтууд
                           </button>
                        </Link>
                     </div>
                  </div>
               </animated.div>
            )}
         </Transition>
      </div >
   )
}
