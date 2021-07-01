import AlertContext from 'components/utilities/alertContext'
import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import { Transition, animated } from 'react-spring/renderprops'
import { basicInputClass, containerClass, UrgudulHeader, SaveButton } from './page1'
import axios from 'axiosbase'
import SearchSelect from 'components/urgudul_components/searchSelect'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/help_popup/helpPopup'
import FormRichText from 'components/urgudul_components/formRichText'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'

const initialDirectors = [
   {
      fullname: null,
      position: null,
      phone: null,
      email: null,
      project_role: null,
   },
]

export default function UrgudulPage3() {
   const [directors, setDirectors] = useState(initialDirectors)

   const handleInput = (key, value, index) => setDirectors(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleInputFormatted = (key, values, index) => setDirectors(prev => {
      const next = [...prev]
      next[index][key] = values.formattedValue
      return next
   })

   const handleRemove = (index) => setDirectors(prev => prev.filter((_, i) => i !== index))

   const handleAdd = () => setDirectors(prev => [...prev, {
      fullname: null,
      position: null,
      phone: null,
      email: null,
      project_role: null,
   }])

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)
   const history = useHistory()

   const projectId = UrgudulCtx.data.id
   const isCluster = UrgudulCtx.data.project_type === 1

   useEffect(() => {
      const value = UrgudulCtx.data.directors
      if (value instanceof Array && value?.length) {
         setDirectors(value)
      }
   }, [projectId])

   // const [occupations, setOccupations] = useState([])

   // useEffect(() => {
   //    axios.get('occupations').then(res => {
   //       setOccupations(res.data.data)
   //    })
   // }, [])

   const handleSubmit = () => {
      if (projectId === undefined || projectId === null) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
         history.push('/urgudul/1')
      }
      axios.put(`projects/${projectId}`, { directors: directors }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийг хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
      })
   }

   return (<>
      <div className={containerClass}>
         <UrgudulHeader
            label="Түлхүүр албан тушаалтнуудын жагсаалт"
         />

         {directors.map((director, i) =>
            <div className="tw-flex odd:tw-bg-gray-50 tw-px-2" key={i}>
               <div className="tw-flex-grow">
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                     <FormInline label="Албан тушаалтны овог нэр" value={director.fullname} name="fullname" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                     {/* <SearchSelect label="Албан тушаал" data={occupations} value={director.position} name="position" id={i} displayName="description_mon" setForm={handleInput} classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-full" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} /> */}

                     <FormInline label="Албан тушаал" value={director.position} name="position" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                     <FormInline label="Гар утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={director.phone} name="phone" index={i} setter={handleInputFormatted} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" />

                     <FormInline label="Имэйл хаяг" type="email" value={director.email} name="email" index={i} setter={handleInput} validate classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />
                  </div>

                  <FormRichText
                     label="Төслийг хэрэгжүүлэхэд гүйцэтгэх үүрэг"
                     HelpPopup={<HelpPopup classAppend="tw-ml-2" main="Тухайлбал ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв боловсруулах, төслийг хэрэгжүүлэхэд дэмжлэг үзүүлэх гм." position="top-left" />}
                     modules="small"
                     value={director.project_role}
                     name="project_role"
                     index={i}
                     setter={handleInput}
                     classAppend="tw-pl-3 tw-pt-1"
                  />
               </div>

               <div className="tw-flex tw-items-center">
                  <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
               </div>
            </div>
         )}

         <div className="tw-flex tw-justify-end">
            <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2" classButton={`tw-text-green-500 active:tw-text-green-600`} />
         </div>

         <div className="tw-flex tw-justify-end">
            <SaveButton buttonAppend="tw-m-6" onClick={handleSubmit} />
         </div>
      </div>

      <ClusterMembers isCluster={isCluster} />
   </>
   )
}

const initialMembers = [
   {
      company_name: null,
      company_register: null,
      main_activity: null,
      sales_year: null,
      sales_amount: null,
      director_name: null,
      director_phone: null,
      director_email: null,
   },
]

const thisYear = new Date().getFullYear()
const last3years = [thisYear - 3, thisYear - 2, thisYear - 1]

function ClusterMembers({ isCluster }) {
   const [members, setMembers] = useState(initialMembers)

   const handleInput = (key, value, index) => setMembers(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleRemove = (index) => setMembers(prev => prev.filter((_, i) => i !== index))

   const handleAdd = () => setMembers(prev => [...prev, {
      company_name: null,
      company_register: null,
      main_activity: null,
      sales_year: null,
      sales_amount: null,
      director_name: null,
      director_phone: null,
      director_email: null,
   }])

   const [netSales, setNetSales] = useState(null)

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)
   const history = useHistory()

   const projectId = UrgudulCtx.data.id

   useEffect(() => {
      const value = UrgudulCtx.data.clusters
      if (value instanceof Array && value?.length) {
         setMembers(value)
      }
   }, [projectId])

   const handleSubmit = () => {
      if (projectId === undefined || projectId === null) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
         history.push('/urgudul/1')
      }
      axios.put(`projects/${projectId}`, { clusters: members }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Гишүүн байгууллагуудыг хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
      })
   }

   return (
      <Transition
         items={isCluster}
         from={{ transform: 'scale(0)' }}
         enter={{ transform: 'scale(1)' }}
         leave={{ transform: 'scale(0)' }}
         config={{ clamp: true }}
      >
         {item => item && (anims =>
            <animated.div className={containerClass} style={anims}>
               <UrgudulHeader
                  label="Кластерын гишүүн байгууллагууд"
               />

               {members.map((member, i) =>
                  <div className="tw-flex odd:tw-bg-gray-50 tw-px-2" key={i}>
                     <div className="tw-flex-grow tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                        <FormInline label="Аж ахуйн нэгжийн нэр" value={member.company_name} name="company_name" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                        <FormInline label="Регистрийн дугаар" type="number" value={member.company_register} name="company_register" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" />

                        <FormInline label="Голлох борлуулалт хийдэг үйл ажиллагааны чиглэл" value={member.main_activity} name="main_activity" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                        <div className="tw-flex">
                           <FormSelectValue label="Борлуулалтын жил сонгох" width={120} options={last3years} value={member.sales_year} keyName="sales_year" index={i} setter={handleInput} />

                           <FormInline label="Аж ахуйн нэгжийн борлуулалт" type="number" value={member.sales_amount} name="sales_amount" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" />
                        </div>

                        <FormInline label="Гүйцэтгэх захирлын нэр" value={member.director_name} name="director_name" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                        <FormInline label="Гүйцэтгэх захирлын утасны дугаар" value={member.director_phone} name="director_phone" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" />

                        <FormInline label="Гүйцэтгэх захирлын имэйл" type="email" value={member.director_email} name="director_email" index={i} setter={handleInput} validate classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />
                     </div>

                     <div className="tw-flex tw-items-center">
                        <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
                     </div>
                  </div>
               )}

               <div className="tw-flex tw-justify-end">
                  <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2" classButton={`tw-text-green-500 active:tw-text-green-600`} />
               </div>

               <div className="tw-p-3 tw-pl-5">
                  <div className="">
                     Кластерын гишүүдийн нийт борлуулалт /төгрөгөөр/ /тэргүүлэх ААН-г оролцуулаад/
                  </div>
                  <NumberFormat className={`${basicInputClass} tw-mt-2 tw-py-1.5`} prefix="₮ " decimalScale={2} thousandSeparator value={netSales} onValueChange={values => setNetSales(values.floatValue)} />
               </div>

               <div className="tw-flex tw-justify-end">
                  <SaveButton buttonAppend="tw-m-6" onClick={handleSubmit} />
               </div>
            </animated.div>
         )}
      </Transition>
   )
}

const FormSelectValue = ({ label, options, value, keyName, index, setter, classAppend, classLabel, invalid, width }) => {
   const [open, setOpen] = useState(false)

   const selectRef = useRef()
   const buttonRef = useRef()

   const handleClickOutside = e => {
      if (open && !selectRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
         setOpen(false)
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   })

   const handleSelect = (value) => {
      setter(keyName, value, index)
      setOpen(false)
   }

   return (
      <div className={`tw-relative tw-pl-3 tw-pr-3 tw-pt-8 tw-pb-3 tw-flex tw-flex-col ${classAppend}`}>
         <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-whitespace-nowrap ${classLabel} ${open ? 'tw-text-sm tw-top-2 tw-left-2' : 'tw-text-xs tw-top-6 tw-left-6'} tw-transition-all tw-duration-300`}>
            {label}
         </label>

         <button className={`tw-h-8.5 tw-flex tw-items-center tw-text-sm tw-border tw-rounded tw-pt-2 tw-pb-1 tw-px-2 focus:tw-outline-none ${invalid ? 'tw-border-red-500' : (open ? 'tw-border-blue-700 tw-shadow' : 'tw-border-gray-500')} tw-transition-colors tw-duration-700`} onClick={() => setOpen(prev => !prev)} style={{ width: width }} ref={buttonRef}>
            <span className="tw-h-5 tw-text-13px">
               {value ?? 'Сонгох'}
            </span>
            <ChevronDownSVG className={`tw-w-4 tw-h-4 tw-ml-auto ${open ? 'tw-text-blue-700' : 'tw-text-gray-600'} tw-transition-colors`} />
         </button>

         <Transition
            items={open}
            from={{ opacity: 0, height: 0 }}
            enter={{ opacity: 1, height: 'auto' }}
            leave={{ opacity: 0, height: 0 }}
            config={{ clamp: true }}
         >
            {item => item && (anims =>
               <div className="tw-absolute tw-left-3 tw-z-10 tw-bg-white tw-text-sm tw-rounded tw-shadow-sm tw-border tw-border-gray-500 tw-divide-y tw-divide-dashed tw-overflow-y-auto tw-max-h-48" style={{ ...anims, top: 72, width: width }} ref={selectRef}>
                  {options.map((option, i) =>
                     <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-600 hover:tw-text-gray-50 tw-text-13px tw-transition-colors tw-cursor-pointer' onMouseDown={() => handleSelect(option)} key={i}>
                        {option}
                     </div>
                  )}
               </div>
            )}
         </Transition>
      </div>
   )
}
