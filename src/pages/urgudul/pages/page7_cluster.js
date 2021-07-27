import React, { useContext, useEffect, useState } from 'react'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import HelpPopup from 'components/help_popup/helpPopup'
import FormInline from 'components/urgudul_components/formInline'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import axios from 'axiosbase'
import UrgudulContext from 'components/utilities/urgudulContext'
import SearchSelect from 'components/urgudul_components/searchSelect'
import FormSelect from 'components/urgudul_components/formSelect'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import FormSignature from 'components/urgudul_components/formSignature'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { animated, Transition } from 'react-spring/renderprops'
import LoadFromOtherProject from '../loadFromOtherProject'
import { UrgudulHeader, SaveButton, StaticText } from './page1'
import { ExpandableContainer } from './page3'

const initialState = [
   {
      applicant: true,
      companyId: null,
      representative_positionId: null,
      representative_name: null,
      representative_signature: null,
      submitDate: null,
   },
]

export default function UrgudulPage7Cluster({ projects = [] }) {
   const [form, setForm] = useState(initialState)
   const [initialized, setInitialized] = useState(false)

   const UrgudulCtx = useContext(UrgudulContext)

   useEffect(() => {
      if (UrgudulCtx.data.id !== undefined) {
         if (UrgudulCtx.data.noticeClusters && UrgudulCtx.data.noticeClusters?.length) {
            const newForm = [...UrgudulCtx.data.noticeClusters]
            const applicantIndex = newForm.findIndex(obj => obj.applicant === true)
            newForm[applicantIndex].companyId = UrgudulCtx.data.company?.id || 0
            setForm([...newForm])
            setCheckList(new Set([1, '2a', '2b', '2c', 3, 4, 5, 6, 7, 8, 9]))
            setAgreed(true)
         } else {
            const newForm = [...form]
            newForm[applicantIndex].companyId = UrgudulCtx.data.company?.id || 0
            setForm(newForm)
         }
      }
      setInitialized(true)
   }, [UrgudulCtx.data.id])

   const handleInput = (key, value, index) => setForm(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const applicantIndex = form.findIndex(obj => obj.applicant === true)
   const applicantItem = form[applicantIndex] ?? {}

   const handleAdd = () => {
      const newObj = {
         applicant: null,
         companyId: null,
         representative_positionId: null,
         representative_name: null,
         representative_signature: null,
         submitDate: null,
      }
      setForm([...form, newObj])
   }

   const handleRemove = (index) => {
      setForm(form.filter((_, i) => i !== index))
   }

   const [occupations, setOccupations] = useState([])

   useEffect(() => {
      axios.get('occupations').then(res => {
         setOccupations(res.data.data)
      })
   }, [])

   const [companyName, setCompanyName] = useState(localStorage.getItem('companyname') ?? UrgudulCtx.data.user?.companyname)
   const [clusters, setClusters] = useState(UrgudulCtx.data.clusters)

   const AlertCtx = useContext(AlertContext)

   const history = useHistory()

   const handleSubmit = () => {
      setValidate(true)
      let allValid = true
      for (const obj of form) {
         allValid = allValid && Object.keys(initialState[0]).filter(item => item !== 'applicant').every(key => !checkInvalid(obj[key]))
      }

      if (UrgudulCtx.data.id) {
         if (allValid) {
            axios.put(`projects/${UrgudulCtx.data.id}`, { noticeClusters: form }, {
               headers: {
                  'Authorization': getLoggedUserToken(),
               }
            }).then(res => {
               UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
               AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Төлөөлөгч талуудын мэдээллийг хадгаллаа.' })
            }).catch(err => {
               AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
            })
         } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         }
      } else {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
         history.push('/urgudul/1')
      }
   }

   const [validate, setValidate] = useState(false)

   const checkInvalid = (value) => {
      switch (value) {
         case null:
            return true
         case '':
            return true
         default:
            return false
      }
   }

   const [checkList, setCheckList] = useState(new Set())
   const [agreed, setAgreed] = useState()

   const handleCheckList = (key, checked) => {
      if (checked) {
         setCheckList(prev => (new Set(prev).add(key)))
      } else {
         setCheckList(prev => {
            const newcheckList = new Set(prev)
            newcheckList.delete(key)
            return newcheckList
         })
      }
   }

   const handleClickAgree = () => {
      if (checkList.size === 11) {
         if (!agreed) {
            setAgreed(true)
            window.scrollBy({ top: 400, left: 0, behavior: 'smooth' })
         }
      } else {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Дээрх мэдээлэлтэй уншиж танилцаад зөвлөж тэмдэглэнэ үү.' })
      }
   }

   const otherProjects = projects.filter(project => project.id !== UrgudulCtx.data.id)

   const loadFromOtherProjectNoticeCluster = (id) => {
      if (!agreed) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Эхлээд мэдэгдэлтэй танилцаж зөвшөөрч байна товчийг дарна уу.' })
         return
      }

      axios.get(`projects/${id}`, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         const loadNoticeCluster = res.data.data?.noticeClusters ?? []
         if (loadNoticeCluster.length > 0) {
            setForm(loadNoticeCluster)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонгосон өргөдлөөс мэдээллийг нь орууллаа.' })
         } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Сонгосон өргөдөл кластерийн төлөөлөгчдөө оруулаагүй байна.' })
         }
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сонгосон өргөдлийн мэдээллийг татаж чадсангүй.' })
      })
   }

   return (
      <div className="tw-pb-10 tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-text-sm">
         <div className="tw-mt-8 tw-rounded-lg tw-shadow-md tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <UrgudulHeader
               label="Мэдэгдэл"
               HelpPopup={<HelpPopup classAppend="tw-ml-2" main="Кластерын өргөдлийн хувьд дараах зүйлсийг мэдэгдэж байна." />}
               projectNumber={UrgudulCtx.data.project_number}
               LoadFromOtherProject={<LoadFromOtherProject classAppend="tw-absolute tw-right-4" otherProjects={otherProjects} loadFromOtherProject={loadFromOtherProjectNoticeCluster} />}
            />

            <div>
               <div className="tw-p-1 tw-mt-2 tw-text-center">
                  Өргөдөл гаргагч болон хамтран хүсэлт гаргаж буй аж ахуйн нэгжүүд нь дараах зүйлсийг мэдэгдэж байна:
               </div>

               <div className="tw-mt-2 tw-mx-4 tw-text-sm tw-font-light tw-rounded tw-shadow-md tw-text-13px">
                  <Notice checkList={checkList} handleCheckList={handleCheckList}
                     order={1}
                     notice="Өргөдөл гаргагч нь шалгуур үзүүлэлтийг бүрэн хангасан бөгөөд хориотой зардал, хориотой үйл ажиллагааны чиглэлийг энэхүү санхүүжилтийн төсөлд хамруулаагүй."
                  />
                  <div className="tw-pl-6 tw-pr-2 odd:tw-bg-gray-50">
                     <div className="tw-py-2 tw-pr-12">
                        2. Өргөдөл гаргагч нь кластерын гишүүн байгууллагуудтай дараах чиглэлээр нягт уялдаа холбоотой ажиллана:
                     </div>
                     <div className="">
                        <Notice checkList={checkList} handleCheckList={handleCheckList} sub
                           order="2a"
                           notice="Бүх гишүүд энэхүү өргөдлийн маягтад бичсэн мэдээлэлтэй танилцсан бөгөөд өөр өөрсдийн үүргийг ойлгож байгаа."
                        />
                        <Notice checkList={checkList} handleCheckList={handleCheckList} sub
                           order="2b"
                           notice="Өргөдөл гаргагч нь кластерын бусад гишүүдийг уг төслийн хэрэгжилтийн талаар тогтмол мэдээллээр хангаж ажиллана."
                        />
                        <Notice checkList={checkList} handleCheckList={handleCheckList} sub
                           order="2c"
                           notice="Бүх гишүүд Экспортыг дэмжих төсөлд илгээж буй өргөдөл гаргагч аж ахуйн нэгжийн тайлан, мэдээлэлтэй танилцсан байна.Экспортыг дэмжих төсөлд илгээх төслийн өөрчлөлтүүд нь кластерын гишүүн байгууллага хооронд хэлэлцэгдэж, зөвшилцөлд хүрсэн санал байна."
                        />
                     </div>
                  </div>
                  <Notice checkList={checkList} handleCheckList={handleCheckList}
                     order={3}
                     notice="Өргөдөл гаргагч нь кластерын бусад гишүүдийг бүрэн төлөөлж, төслийн бэлтгэл ажил, хэрэгжилтэд шууд хариуцлага хүлээнэ."
                  />
                  <Notice checkList={checkList} handleCheckList={handleCheckList}
                     order={4}
                     notice="Өргөдөл гаргагч нь байгаль орчны шалгуур, өргөдөл гаргагчийн шалгуур, зардлын шалгуурыг бүрэн хангасан бөгөөд аль нэг гишүүн нь эдгээр шалгуурыг хангаагүй тохиолдолд энэ нь санхүүжилтийн хүсэлтээс бүрэн татгалзах үндэслэл болно."
                  />
                  <Notice checkList={checkList} handleCheckList={handleCheckList}
                     order={5}
                     notice="Өргөдөл гаргагч нь санал болгосон үйл ажиллагааны төлөвлөгөөг хэрэгжүүлэхэд санхүүгийн болон үйл ажиллагааны хувьд хүчин чадалтай бөгөөд үүнийг нотлох баримтуудыг бүрэн хавсаргасан."
                  />
                  <Notice checkList={checkList} handleCheckList={handleCheckList}
                     order={6}
                     notice="Кластерын гишүүд нь өргөдөл гаргагчид Экспортыг дэмжих төслөөс олгогдох Үр дүнтэй түншлэлийн санхүүжилтийн гэрээнд гарын үсэг зурах бүрэн эрхийг олгосон."
                  />
                  <Notice checkList={checkList} handleCheckList={handleCheckList}
                     order={7}
                     notice="Кластерын гишүүд нь энэхүү төслийн дэмжлэгийг хамтран хүртэх, төслийг хэрэгжүүлэхэд шаардлагатай удирдлага, санхүүжилтийн зардлыг хамтран гаргахаар тохиролцсон."
                  />
                  <Notice checkList={checkList} handleCheckList={handleCheckList}
                     order={8}
                     notice="Өргөдөл гаргагч болон кластерын гишүүн аж ахуйн нэгжүүд нь шаардлагатай тохиолдолд экспортын үйл ажиллагаатай холбоотой туршлага, мэдлэг, мэдээллээ Экспортыг дэмжих төсөлд хамрагдаж буй болон хамрагдах хүсэлт гаргасан бусад аж ахуйн нэгжүүдтэй нээлттэй, үнэ төлбөргүйгээр хуваалцаж, төслийн зүгээс зохион байгуулж буй албан ёсны сургалт, сурталчилгааны арга хэмжээнд оролцоно."
                  />
                  <Notice checkList={checkList} handleCheckList={handleCheckList}
                     order={9}
                     notice="Өргөдөл гаргагч болон кластерын гишүүн аж ахуйн нэгжүүд нь Экспортыг дэмжих төслийн зүгээс гаргах аливаа сурталчилгаа, мэдээллийн чанартай контентүүдэд тухайн аж ахуйн нэгжүүдийн талаарх мэдээллийг тусгаж, олон нийтэд мэдээлэхийг хүлээн зөвшөөрч байна."
                  />
               </div>

               <div className="tw-px-8 tw-py-1 tw-mt-3 tw-text-sm tw-font-light">
                  Өргөдөл гаргагчаас шалтгаалан мэдээлэл буруу бөглөх, материал дутуу илгээх, дэмжих чиглэлийн бус өргөдлийн материал хүргүүлэх тохиолдолд энэ нь төслийн нэгжийн зүгээс татгалзах шалтгаан болох бөгөөд дараагийн цонх нээгдэх хүртэл дахин материал авч судлах, тайлбар хүргүүлэх боломжгүйг хүлээн зөвшөөрөв. Энэхүү өргөдлийн маягтад орсон бүх мэдээллийг үнэн зөвөөр мэдүүлсэн бөгөөд санаатай болон санаандгүйгээр мэдээллийг хооронд нь зөрүүлэх, мэдээллийг нотлох баримт нь мэдээллээс зөрөх, нотлох баримтгүй байх нь уг санхүүжилтийг олгохоос татгалзах, цаашид өргөдөл хүлээн авахгүй байх хүртэлх шийдвэр гаргах шалтгаан болохыг бүрэн ойлгож байгаа болно.
               </div>

               <div className="tw-flex tw-justify-end tw-items-center">
                  <button className="tw-inline-flex tw-items-center focus:tw-outline-none tw-rounded tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-pl-3 tw-pr-4 tw-py-2 tw-m-6 tw-mt-2" onClick={handleClickAgree}>
                     <span className={`tw-rounded-full tw-border ${agreed ? 'tw-border-white' : 'tw-border-blue-300'} tw-transition-colors tw-w-4 tw-h-4 tw-flex tw-items-center tw-justify-center tw-mr-2`}>
                        <span className={`tw-rounded-full ${agreed ? 'tw-bg-white' : 'tw-bg-transparent'} tw-transition-colors tw-w-2 tw-h-2`}></span>
                     </span>
                     <span className={`${agreed ? 'tw-text-white' : 'tw-text-blue-200'} tw-transition-colors tw-leading-tight tw-font-light`}>
                        Зөвшөөрч байна
                     </span>
                  </button>
               </div>
            </div>
         </div>

         <Transition
            items={agreed}
            from={{ transform: 'scale(0)' }}
            enter={{ transform: 'scale(1)' }}
            leave={{ transform: 'scale(0)' }}>
            {item => item && (anims =>
               <animated.div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed" style={anims}>
                  <div className="tw-p-2 tw-pl-4 tw-text-blue-500 tw-font-medium">
                     Өргөдөл гаргагч ААН төлөөлж:
                  </div>

                  <ExpandableContainer classAppend="tw-pl-2" order={1} label={applicantItem.representative_name} placeholder="Өргөдөл гаргагч ААН төлөөлөгч" initialized={initialized}>
                     <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-4">
                        <StaticText label="Аж ахуйн нэгжийн нэр" text={companyName} />

                        <SearchSelect label="Албан тушаал" data={occupations} value={applicantItem.representative_positionId} name="representative_positionId" index={applicantIndex} displayName="description_mon" setter={handleInput} classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-full" invalid={validate && checkInvalid(applicantItem.representative_positionId)} />

                        <FormInline label="Овог нэр" type="text" value={applicantItem.representative_name} name="representative_name" index={applicantIndex} setter={handleInput} classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-full" invalid={validate && checkInvalid(applicantItem.representative_name)} />

                        <div className="tw-w-full tw-h-full tw-max-w-sm tw-pl-4">
                           <div className={`tw-text-sm tw-pt-2 tw-font-light ${validate && checkInvalid(applicantItem.representative_signature) && 'tw-text-red-500'}`}>
                              Гарын үсэг
                           </div>

                           <FormSignature value={applicantItem.representative_signature} name="representative_signature" index={applicantIndex} setter={handleInput} classAppend="tw-pl-8 tw-pr-2 tw-pb-3 tw-pt-1 tw-justify-center" canvasProps={{ width: 360, height: 100 }} />
                        </div>

                        <FormInline label="Огноо" type="date" value={applicantItem.submitDate} name="submitDate" index={applicantIndex} setter={handleInput} classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-40" invalid={validate && checkInvalid(applicantItem.submitDate)} />
                     </div>
                  </ExpandableContainer>

                  <div className="tw-p-2 tw-pl-4 tw-text-blue-500 tw-font-medium">
                     Кластерийн гишүүн ААН-үүдийг төлөөлж:
                  </div>

                  {form.map((item, i) =>
                     applicantIndex !== i &&
                     <div className="tw-flex tw-pl-2 tw-pr-4" key={i}>
                        <ExpandableContainer classAppend="tw-flex-grow" order={applicantIndex > i ? i + 2 : i + 1} label={item.representative_name} placeholder="Кластерийн гишүүн ААН төлөөлөгч" initialized={initialized}>
                           <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                              <FormSelect label="Аж ахуйн нэгжийн нэр" data={clusters} value={item.companyId} name="companyId" index={i} setter={handleInput} displayName="company_name" classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-full" invalid={validate && checkInvalid(item.companyId)} />

                              <SearchSelect label="Албан тушаал" data={occupations} value={item.representative_positionId} name="representative_positionId" index={i} displayName="description_mon" setter={handleInput} classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-full" invalid={validate && checkInvalid(item.representative_positionId)} />

                              <FormInline label="Овог нэр" type="text" value={item.representative_name} name="representative_name" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-full" invalid={validate && checkInvalid(item.representative_name)} />

                              <div className="tw-w-full tw-h-full tw-max-w-sm tw-pl-5">
                                 <div className={`tw-pt-2 tw-text-sm tw-font-light ${validate && checkInvalid(item.representative_signature) && 'tw-text-red-500'}`}>
                                    Гарын үсэг
                                 </div>

                                 <FormSignature value={item.representative_signature} name="representative_signature" index={i} setter={handleInput} classAppend="tw-pl-6 pw-pr-2 tw-pb-3 tw-pt-1 tw-justify-center" canvasProps={{ width: 360, height: 100 }} />
                              </div>

                              <FormInline label="Огноо" type="date" value={item.submitDate} name="submitDate" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-40" invalid={validate && checkInvalid(item.submitDate)} />
                           </div>
                        </ExpandableContainer>

                        <div className="tw-flex tw-items-center">
                           <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                        </div>
                     </div>
                  )}

                  <div className="tw-flex tw-justify-end tw-items-center tw-py-1 tw-px-2">
                     <div className="tw-text-xs tw-italic tw-text-gray-600 tw-mr-2">
                        ААН-ийн төлөөлөгчид
                     </div>

                     <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2" classButton="tw-text-green-500 active:tw-text-green-600" />
                  </div>

                  <div className="tw-flex tw-justify-end">
                     <SaveButton onClick={handleSubmit} buttonAppend="tw-m-6" />
                  </div>
               </animated.div>
            )}
         </Transition>
      </div>
   )
}

export const Notice = ({ checkList, handleCheckList, order, sub, notice }) => (
   <div className={`tw-py-2 ${sub ? 'tw-pl-4' : 'tw-pl-6 tw-pr-2'} tw-flex tw-justify-between tw-items-center odd:tw-bg-gray-50`}>
      <span className="">
         {order}. {notice}
      </span>
      <input className="tw-w-4 tw-h-4 tw-mx-4 tw-flex-shrink-0" type="checkbox" checked={checkList.has(order)} onChange={e => handleCheckList(order, e.target.checked)} />
   </div>
)
