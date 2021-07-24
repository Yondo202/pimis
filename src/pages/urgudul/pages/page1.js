import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext, useEffect, useState } from 'react'
import HelpPopup from 'components/help_popup/helpPopup'
import LoadFromOtherProject from '../loadFromOtherProject'
import AlertContext from 'components/utilities/alertContext'
import FormOptions from 'components/urgudul_components/formOptions'
import { animated, Transition } from 'react-spring/renderprops'
import axios from 'axiosbase'
import FormInline from 'components/urgudul_components/formInline'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import NumberFormat from 'react-number-format'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { useRef } from 'react'
import useClickOutside from 'components/utilities/useClickOutside'

export default function UrgudulPage1({ projects = [] }) {
   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)

   const [form, setForm] = useState(initialState)
   const [products, setProducts] = useState(initialProducts)
   const [companyName, setCompanyName] = useState(localStorage.getItem('companyname') ?? UrgudulCtx.data.user?.companyname)
   const [validate, setValidate] = useState(false)

   const handleInput = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

   const handleInputFormat = (key, values) => setForm(prev => ({ ...prev, [key]: values.floatValue ?? null }))

   const projectId = UrgudulCtx.data.id
   const isCreated = projectId !== undefined && projectId !== null
   const isCluster = UrgudulCtx.data.project_type === 1

   useEffect(() => {
      const temp = {}
      Object.keys(initialState).forEach(key => {
         const value = UrgudulCtx.data[key]
         if (value !== undefined && value !== null) {
            temp[key] = value
         }
      })
      setForm(prev => ({ ...prev, ...temp }))

      const value = UrgudulCtx.data.exportProducts
      if (value instanceof Array && value?.length) {
         setProducts(value)
      }
   }, [projectId])

   const handleSubmitCreate = () => {
      setValidate(true)
      let allValid = true
      Object.keys(initialState)
         .filter(key => !['main_export_other', 'main_export_planned_other', 'export_country_other', 'export_country_planned_other'].includes(key))
         .forEach(key => {
            switch (key) {
               case 'main_export':
                  form[key] === -1
                     ? allValid = allValid && !checkInvalid(form.main_export_other)
                     : allValid = allValid && !checkInvalid(form[key])
                  break
               case 'main_export_planned':
                  form[key] === -1
                     ? allValid = allValid && !checkInvalid(form.main_export_planned_other)
                     : allValid = allValid && !checkInvalid(form[key])
                  break
               case 'export_country':
                  form[key] === -1
                     ? allValid = allValid && !checkInvalid(form.export_country_other)
                     : allValid = allValid && !checkInvalid(form[key])
                  break
               case 'export_country_planned':
                  form[key] === -1
                     ? allValid = allValid && !checkInvalid(form.export_country_planned_other)
                     : allValid = allValid && !checkInvalid(form[key])
                  break
               default:
                  allValid = allValid && !checkInvalid(form[key])
            }
         })
      products.forEach(product => {
         allValid = allValid && !checkInvalid(product.product_name) && !checkInvalid(product.hs_code)
      })
      if (!allValid) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      axios.post('projects', { ...form, exportProducts: products }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдөл үүсгэлээ.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, өргөдөл үүсгэж чадсангүй.' })
      })
   }

   const handleSubmitEdit = () => {
      setValidate(true)
      let allValid = true
      Object.keys(initialState)
         .filter(key => !['main_export_other', 'main_export_planned_other', 'export_country_other', 'export_country_planned_other'].includes(key))
         .forEach(key => {
            switch (key) {
               case 'main_export':
                  form[key] === -1
                     ? allValid = allValid && !checkInvalid(form.main_export_other)
                     : allValid = allValid && !checkInvalid(form[key])
                  break
               case 'main_export_planned':
                  form[key] === -1
                     ? allValid = allValid && !checkInvalid(form.main_export_planned_other)
                     : allValid = allValid && !checkInvalid(form[key])
                  break
               case 'export_country':
                  form[key] === -1
                     ? allValid = allValid && !checkInvalid(form.export_country_other)
                     : allValid = allValid && !checkInvalid(form[key])
                  break
               case 'export_country_planned':
                  form[key] === -1
                     ? allValid = allValid && !checkInvalid(form.export_country_planned_other)
                     : allValid = allValid && !checkInvalid(form[key])
                  break
               default:
                  allValid = allValid && !checkInvalid(form[key])
            }
         })
      products.forEach(product => {
         allValid = allValid && !checkInvalid(product.product_name) && !checkInvalid(product.hs_code)
      })
      if (!allValid) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      axios.put(`projects/${projectId}`, { ...form, exportProducts: products }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийг хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
      })
   }

   const otherProjects = projects.filter(project => project.id !== UrgudulCtx.data.id)

   const loadFromOtherProject = (id) => {
      axios.get(`projects/${id}`, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         const projectToLoad = res.data.data
         const temp = {}
         Object.keys(initialState).forEach(key => {
            const value = projectToLoad[key]
            if (value !== undefined && value !== null) {
               temp[key] = value
            }
         })
         setForm({ ...initialState, ...temp })
         const value = projectToLoad.exportProducts
         if (value instanceof Array && value?.length) {
            setProducts(value)
         }
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонгосон өргөдлөөс мэдээллийг нь орууллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сонгосон өргөдлийн мэдээллийг татаж чадсангүй.' })
      })
   }

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Санхүүгийн дэмжлэг хүсэх өргөдлийн маягт"
            HelpPopup={isCluster && <HelpPopup classAppend="tw-mx-2" main="Хэрэв кластер бол кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." />}
            projectNumber={UrgudulCtx.data.project_number}
            LoadFromOtherProject={<LoadFromOtherProject classAppend="tw-absolute tw-right-4" otherProjects={otherProjects} loadFromOtherProject={loadFromOtherProject} />}
         />

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-2">
            <FormOptions label="Өргөдлийн төрөл" options={['Аж ахуйн нэгж', 'Кластер']} values={[0, 1]} value={form.project_type} name="project_type" setter={handleInput} invalid={validate && checkInvalid(form.project_type)} />

            <FormInline label="Төслийн нэр" type="text" value={form.project_name} name="project_name" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(form.project_name)} />

            <StaticText
               label={isCluster ? 'Кластерын тэргүүлэгч ААН' : 'Аж ахуйн нэгж'}
               text={companyName}
            />

            <FormInline label="Регистрийн дугаар" type="number" value={form.register_number} name="register_number" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(form.register_number)} />

            <FormOptions label="Үйл ажиллагааны чиглэл" options={activityClass} values={[1, 2, 3]} value={form.activity_direction} name="activity_direction" setter={handleInput} invalid={validate && checkInvalid(form.activity_direction)} />

            <div className="md:tw-col-span-2 tw-w-full">
               <div className="tw-text-sm tw-p-2">
                  Экспортын гол бүтээгдэхүүний ангилал /Зөвхөн үйлдвэрлэлийн салбар/
               </div>
               <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                  <SelectWithOther
                     label="Одоогийн байдлаар:"
                     options={productClass}
                     value={form.main_export}
                     valueOther={form.main_export_other}
                     keyName="main_export"
                     keyNameOther="main_export_other"
                     setter={handleInput}
                     invalid={validate && checkInvalid(form.main_export)}
                     invalidOther={validate && checkInvalid(form.main_export_other)}
                  />
                  <SelectWithOther
                     label="Уг өргөдлийн хувьд төлөвлөсөн:"
                     options={productClass}
                     value={form.main_export_planned}
                     valueOther={form.main_export_planned_other}
                     keyName="main_export_planned"
                     keyNameOther="main_export_planned_other"
                     setter={handleInput}
                     invalid={validate && checkInvalid(form.main_export_planned)}
                     invalidOther={validate && checkInvalid(form.main_export_planned_other)}
                  />
               </div>
            </div>

            <ExportProducts label="Экспортийн бүтээгдэхүүнүүд" list={products} setter={setProducts} validate={validate} />

            <div className="md:tw-col-span-2 tw-w-full">
               <div className="tw-text-sm tw-p-2">
                  Экспортын зорилтот орны нэр
               </div>
               <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                  <SelectWithOther
                     label="Одоогийн байдлаар:"
                     options={exportCountries}
                     value={form.export_country}
                     valueOther={form.export_country_other}
                     keyName="export_country"
                     keyNameOther="export_country_other"
                     setter={handleInput}
                     invalid={validate && checkInvalid(form.export_country)}
                     invalidOther={validate && checkInvalid(form.export_country_other)}
                  />
                  <SelectWithOther
                     label="Уг өргөдлийн хувьд төлөвлөсөн:"
                     options={exportCountries}
                     value={form.export_country_planned}
                     valueOther={form.export_country_planned_other}
                     keyName="export_country_planned"
                     keyNameOther="export_country_planned_other"
                     setter={handleInput}
                     invalid={validate && checkInvalid(form.export_country_planned)}
                     invalidOther={validate && checkInvalid(form.export_country_planned_other)}
                  />
               </div>
            </div>

            <PlannedActivity label="Төлөвлөсөн үйл ажиллагааны чиглэл" value={form.planned_activity} valueCost={form.planned_activity_cost} setter={handleInput} validate={validate} />

            <FormInline label="Төлөвлөсөн үйл ажиллагааны нийт төсөв" type="numberFormat" formats={{ prefix: '₮ ', decimalScale: 2, thousandSeparator: true }} value={form.planned_activity_budget} name="planned_activity_budget" setter={handleInputFormat} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" />
         </div>

         <div className="tw-flex tw-justify-end">
            <SaveButton
               buttonAppend="tw-m-6"
               onClick={isCreated ? handleSubmitEdit : handleSubmitCreate}
               label={isCreated ? undefined : 'Өргөдөл үүсгэх'} />
         </div>
      </div >
   )
}

const initialState = {
   project_type: null,
   project_name: null,
   register_number: null,
   activity_direction: null,
   main_export: null,
   main_export_other: null,
   main_export_planned: null,
   main_export_planned_other: null,
   export_country: null,
   export_country_other: null,
   export_country_planned: null,
   export_country_planned_other: null,
   planned_activity: null,
   planned_activity_cost: null,
   planned_activity_budget: null,
}

const initialProducts = [
   {
      product_name: null,
      hs_code: null,
   }
]

export const activityClass = [
   'Хөдөө аж ахуйд суурилсан үйлдвэрлэл',
   'Аялал жуулчлал',
   'Соёлын бүтээлч үйлдвэрэл, мэдээллийн технологи',
]

export const productClass = [
   'Хүнсний бүтээгдэхүүн',
   'Бэлэн хувцас',
   'Гутал, цүнх, арьсан эдлэл',
   'Хивс',
   'Монгол гэр',
   'Амьтны хоол',
   'Түүхий эд: мах',
   'Түүхий эд: ноолуур/ноос',
   'Түүхий эд: арьс, шир',
]

export const exportCountries = [
   'БНСУ',
   'Япон',
   'ХБНГУ',
   'АНУ',
   'Итали',
   'Франц',
   'Их Британи',
   'БНХАУ',
   'ОХУ',
]

export const plannedActivityClass = [
   'Экспортын маркетинг',
   'Экспортын бүтээгдэхүүний чанарын удирдлага, гэрчилгээжүүлэлт',
   'Экспортын бүтээгдэхүүний үйлдвэрлэл, технологийн удирдлага',
]

export const containerClass = 'tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed'

export const UrgudulHeader = ({ label, HelpPopup, LoadFromOtherProject, projectNumber }) => (
   <div className="">
      <div className="tw-p-3 tw-flex tw-items-center tw-relative">
         <span className="tw-text-base tw-font-medium tw-text-blue-500">{label}</span>
         {HelpPopup && HelpPopup}
         {LoadFromOtherProject && LoadFromOtherProject}
      </div>

      {projectNumber &&
         <div className="tw-ml-5 tw-mb-2 tw-text-13px">
            Өргөдлийн дугаар:
            <span className="tw-text-blue-500 tw-ml-2 tw-font-medium">{projectNumber}</span>
         </div>
      }
   </div>
)

function SelectWithOther({ label, HelpPopup, options, value, valueOther, keyName, keyNameOther, setter, invalid, invalidOther }) {
   const [open, setOpen] = useState(false)

   const getValue = (id) => id === -1
      ? 'Бусад'
      : options[id - 1]

   const buttonRef = useRef()
   const dropdownRef = useRef()

   useClickOutside([buttonRef, dropdownRef], open, () => setOpen(false))

   return (
      <div className="tw-w-full tw-pl-4 tw-pb-2">
         <div className="tw-text-sm tw-flex tw-items-center">
            {label}
            {HelpPopup && HelpPopup}
         </div>

         <div className="tw-mt-1.5 tw-pl-2">
            <div className="tw-relative">
               <button className={`tw-flex tw-items-center tw-border tw-rounded tw-py-1.5 tw-px-2 focus:tw-outline-none ${invalid ? 'tw-border-red-500' : (open ? 'tw-border-blue-700 tw-shadow' : 'tw-border-gray-500')} tw-transition-colors tw-duration-700`} style={{ minWidth: 160 }} onClick={() => setOpen(prev => !prev)} ref={buttonRef}>
                  <span className="tw-text-13px tw-mr-1.5">
                     {getValue(value) ?? 'Сонгох'}
                  </span>
                  <ChevronDownSVG className="tw-w-4 tw-h-4 tw-ml-auto" />
               </button>

               <Transition
                  items={open}
                  from={{ height: 0, opacity: 0 }}
                  enter={{ height: 'auto', opacity: 1 }}
                  leave={{ height: 0, opacity: 0 }}
                  config={{ clamp: true }}
               >
                  {item => item && (anims =>
                     <animated.div className="tw-absolute tw-top-9 tw-left-0 tw-bg-white tw-overflow-hidden tw-rounded tw-shadow-sm tw-border tw-border-gray-400 tw-divide-y tw-divide-dashed tw-z-10 tw-text-13px" style={anims} ref={dropdownRef}>
                        {options.map((option, i) =>
                           <div className="tw-py-1.5 tw-pl-2 tw-pr-4 hover:tw-bg-blue-600 hover:tw-text-gray-50 tw-transition-colors tw-cursor-pointer" style={{ minWidth: 160 }} onClick={() => { setter(keyName, i + 1); setOpen(false) }}>
                              <span className="tw-pr-1.5">{i + 1}.</span>
                              {option}
                           </div>
                        )}
                        <div className="tw-py-1.5 tw-pl-2 tw-pr-4 hover:tw-bg-blue-600 hover:tw-text-gray-50 tw-transition-colors tw-cursor-pointer" style={{ minWidth: 160 }} onClick={() => { setter(keyName, -1); setOpen(false) }}>
                           <span className="tw-pr-2">{options.length + 1}.</span>
                           Бусад
                        </div>
                     </animated.div>
                  )}
               </Transition>

               <Transition
                  items={value === -1}
                  from={{ opacity: 0, height: 0 }}
                  enter={{ opacity: 1, height: 'auto' }}
                  leave={{ opacity: 0, height: 0 }}
                  config={{ clamp: true }}
               >
                  {item => item && (anims =>
                     <animated.div className="tw-pt-2 tw-pl-1 tw-overflow-hidden tw-flex tw-items-center" style={anims}>
                        <span className="tw-text-sm">Бусад:</span>
                        <input className={`${basicInputClass} tw-ml-2 tw-flex-grow ${invalidOther && 'tw-border-red-500'} tw-transition-colors`} style={{ maxWidth: 240 }} value={valueOther ?? ''} onChange={e => setter(keyNameOther, e.target.value)} />
                     </animated.div>
                  )}
               </Transition>
            </div>
         </div>
      </div>
   )
}

export const SaveButton = ({ onClick, buttonAppend, label }) => (
   <button className={`focus:tw-outline-none tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px tw-font-light tw-text-white tw-transition-colors ${buttonAppend}`} onClick={onClick}>
      {label ?? 'Хадгалах'}
   </button>
)

function ExportProducts({ label, list, setter, HelpPopup, validate }) {
   const handleInput = (key, value, index) => setter(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleRemove = (index) => setter(prev => prev.filter((_, i) => i !== index))

   const handleAdd = () => setter(prev => {
      const next = [...prev]
      next.push({
         product_name: null,
         hs_code: null,
      })
      return next
   })

   return (
      <div className="md:tw-col-span-2 tw-w-full tw-mt-2 tw-max-w-xl">
         <div className="tw-text-sm tw-p-2 tw-flex tw-items-center">
            {label}
            {HelpPopup && HelpPopup}
         </div>

         <div className="tw-pl-4">
            {list.map((item, i) =>
               <div className="tw-flex tw-items-center tw-pb-0.5" key={i}>
                  <span className="tw-text-15px">{i + 1}.</span>

                  <input className={`${basicInputClass} tw-ml-2 tw-flex-grow ${validate && checkInvalid(item?.product_name) && 'tw-border-red-500'} tw-transition-colors`} value={item?.product_name ?? ''} onChange={e => handleInput('product_name', e.target.value, i)} placeholder="Бүтээгдэхүүний нэр" />

                  <input className={`${basicInputClass} tw-ml-4 ${validate && checkInvalid(item?.hs_code) && 'tw-border-red-500'} tw-transition-colors`} type="number" value={item?.hs_code ?? ''} onChange={e => handleInput('hs_code', e.target.value, i)} placeholder="HS код" />

                  <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classAppend="tw-ml-3" classButton="tw-text-red-500 active:tw-text-red-600" />
               </div>
            )}
         </div>

         <div className="tw-flex tw-justify-end tw-items-center">
            <span className="tw-italic tw-text-gray-500 tw-text-xs">
               Экпортын бүтээгдэхүүн нэмэх
            </span>
            <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-ml-1" classButton="tw-text-green-500 active:tw-text-green-600" />
         </div>
      </div>
   )
}

function PlannedActivity({ label, HelpPopup, value, valueCost, setter, validate }) {
   const handleChange = (id) => {
      setter('planned_activity', id)
      setter('planned_activity_cost', null)
   }

   return (
      <div className="md:tw-col-span-2 tw-w-full tw-mt-2">
         <div className="tw-text-sm tw-p-2 tw-flex tw-items-center">
            <span className={validate && checkInvalid(value) && 'tw-text-red-500 tw-transition-colors'}>
               {label}
            </span>
            {HelpPopup && HelpPopup}
         </div>

         <div className="tw-pl-3">
            {plannedActivityClass.map((option, i) =>
               <div className="tw-flex tw-flex-col tw-items-start" key={i}>
                  <div className="tw-cursor-pointer tw-flex tw-items-center tw-pl-2 tw-py-1" onClick={() => handleChange(i + 1)}>
                     <span className={`tw-rounded-full tw-w-4 tw-h-4 tw-border-2 ${value === i + 1 ? 'tw-border-blue-700' : 'tw-border-gray-500'} tw-transition-colors tw-flex tw-justify-center tw-items-center`}>
                        <span className={`tw-rounded-full tw-w-2 tw-h-2 ${value === i + 1 ?
                           'tw-bg-blue-700' : 'tw-bg-transparent'} tw-transition-colors`} />
                     </span>
                     <span className="tw-ml-1.5">
                        {option}
                     </span>
                  </div>
                  <Transition
                     items={value === i + 1}
                     from={{ opacity: 0, height: 0 }}
                     enter={{ opacity: 1, height: 'auto' }}
                     leave={{ opacity: 0, height: 0 }}
                     config={{ clamp: true }}
                  >
                     {item => item && (anims =>
                        <animated.span className="tw-pl-8 tw-flex tw-items-center tw-py-1" style={anims}>
                           Үнийн дүн:
                           <NumberFormat className={`${basicInputClass} tw-ml-2 ${validate && checkInvalid(valueCost) && 'tw-border-red-500'} tw-transition-colors`} value={valueCost ?? ''} prefix="₮ " decimalScale={2} thousandSeparator onValueChange={values => setter('planned_activity_cost', values.floatValue)} />
                        </animated.span>
                     )}
                  </Transition>
               </div>
            )}
         </div>
      </div>
   )
}

export const basicInputClass = 'tw-outline-none tw-py-1 tw-px-2 tw-rounded tw-border tw-border-gray-400 focus:tw-border-blue-700 focus:tw-shadow tw-duration-700 tw-transition-colors'

export const StaticText = ({ label, text, HelpPopup }) => (
   <div className="tw-w-full tw-max-w-md tw-p-3">
      <div className="tw-text-sm tw-flex tw-items-center">
         {label}
         {HelpPopup && HelpPopup}
      </div>
      {text &&
         <div className="tw-mt-2">
            <span className="tw-ml-2 tw-bg-indigo-50 tw-rounded tw-py-1 tw-px-2 tw-text-sm tw-text-indigo-500">{text}</span>
         </div>
      }
   </div>
)

export const checkInvalid = (value) => {
   switch (value) {
      case null:
         return true
      case '':
         return true
      default:
         return false
   }
}
