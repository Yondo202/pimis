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

export default function UrgudulPage1() {
   const [form, setForm] = useState(initialState)
   const [products, setProducts] = useState(initialProducts)
   const [companyName, setCompanyName] = useState(localStorage.getItem('companyname'))

   const handleInput = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

   const handleInputFormat = (key, values) => setForm(prev => ({ ...prev, [key]: values.floatValue }))

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)

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
      axios.put(`projects/${projectId}`, { ...form, exportProducts: products }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийг хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
      })
   }

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Түншлэлийн дэмжлэг хүсэх өргөдлийн маягт"
            HelpPopup={isCluster && <HelpPopup classAppend="tw-mx-2" main="Кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." />}
            projectNumber={UrgudulCtx.data.project_number}
         />

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-2">
            <FormOptions label="Өргөдлийн төрөл" options={['Аж ахуйн нэгж', 'Кластер']} values={[0, 1]} value={form.project_type} name="project_type" setter={handleInput} />

            <StaticText
               label={isCluster ? 'Кластерын тэргүүлэгч ААН-ийн нэр' : 'Аж ахуйн нэгж'}
               text={companyName}
            />

            <FormInline label="Гэрчилгээний дугаар" type="number" value={form.certificate_number} name="certificate_number" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" />

            <FormOptions label="Үйл ажиллагааны чиглэл" options={activityClass} values={[1, 2, 3]} value={form.activity_direction} name="activity_direction" setter={handleInput} />

            <div className="md:tw-col-span-2 tw-w-full">
               <div className="tw-text-sm tw-p-2">
                  Экспортын гол бүтээгдэхүүний ангилал /Зөвхөн үйлдвэрлэлийн салбар/
               </div>
               <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                  <Select1
                     label="Одоогийн байдлаар:"
                     options={productClass}
                     value={form.main_export}
                     valueOther={form.main_export_other}
                     keyName="main_export"
                     keyNameOther="main_export_other"
                     setter={handleInput}
                  />
                  <Select1
                     label="Уг өргөдлийн хувьд төлөвлөсөн:"
                     options={productClass}
                     value={form.main_export_planned}
                     valueOther={form.main_export_planned_other}
                     keyName="main_export_planned"
                     keyNameOther="main_export_planned_other"
                     setter={handleInput}
                  />
               </div>
            </div>

            <ExportProducts label="Экспортийн бүтээгдэхүүнүүд" list={products} setter={setProducts} />

            <div className="md:tw-col-span-2 tw-w-full">
               <div className="tw-text-sm tw-p-2">
                  Экспортын зорилтот орны нэр
               </div>
               <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                  <Select1
                     label="Одоогийн байдлаар:"
                     options={exportCountries}
                     value={form.export_country}
                     valueOther={form.export_country_other}
                     keyName="export_country"
                     keyNameOther="export_country_other"
                     setter={handleInput}
                  />
                  <Select1
                     label="Уг өргөдлийн хувьд төлөвлөсөн:"
                     options={exportCountries}
                     value={form.export_country_planned}
                     valueOther={form.export_country_planned_other}
                     keyName="export_country_planned"
                     keyNameOther="export_country_planned_other"
                     setter={handleInput}
                  />
               </div>
            </div>

            <PlannedActivity label="Төлөвлөсөн үйл ажиллагааны чиглэл" value={form.planned_activity} valueCost={form.planned_activity_cost} setter={handleInput} />

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
   certificate_number: null,
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

const activityClass = [
   'Хөдөө аж ахуйд суурилсан үйлдвэрлэл',
   'Аялал жуулчлал',
   'Соёлын бүтээлч үйлдвэрэл, мэдээллийн технологи',
]

const productClass = [
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

const exportCountries = [
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

const plannedActivityClass = [
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

function Select1({ label, HelpPopup, options, value, valueOther, keyName, keyNameOther, setter }) {
   return (
      <div className="tw-w-full tw-pl-4 tw-pr-1">
         <div className="tw-text-sm tw-flex tw-items-center">
            {label}
            {HelpPopup && HelpPopup}
         </div>

         <div className="tw-mt-1">
            <div className="tw-h-40 tw-overflow-y-auto tw-w-full tw-flex tw-flex-col tw-items-start tw-border tw-border-gray-300 tw-rounded tw-px-1 tw-py-0.5">
               {options.map((option, i) =>
                  <div className="tw-flex tw-items-center tw-py-1 tw-cursor-pointer" onClick={() => setter(keyName, i + 1)} key={i}>
                     <span className={`tw-w-4 tw-h-4 tw-rounded-full tw-border-2 ${value === i + 1 ? 'tw-border-blue-700' : 'tw-border-gray-500'} tw-transition-colors tw-flex tw-justify-center tw-items-center`}>
                        <span className={`tw-w-2 tw-h-2 tw-rounded-full ${value === i + 1 ? 'tw-bg-blue-700' : 'tw-bg-transparent'} tw-transition-colors`} />
                     </span>
                     <span className="tw-ml-1.5">
                        {option}
                     </span>
                  </div>
               )}

               <div className="tw-flex tw-items-center tw-py-1 tw-cursor-pointer" onClick={() => setter(keyName, -1)}>
                  <span className={`tw-w-4 tw-h-4 tw-rounded-full tw-border-2 ${value === -1 ? 'tw-border-blue-700' : 'tw-border-gray-500'} tw-transition-colors tw-flex tw-justify-center tw-items-center`}>
                     <span className={`tw-w-2 tw-h-2 tw-rounded-full ${value === -1 ? 'tw-bg-blue-700' : 'tw-bg-transparent'} tw-transition-colors`} />
                  </span>
                  <span className="tw-ml-1.5">
                     Бусад
                  </span>
               </div>
            </div>

            <Transition
               items={value === -1}
               from={{ height: 0, opacity: 0 }}
               enter={{ height: 'auto', opacity: 1 }}
               leave={{ height: 0, opacity: 0 }}
            >
               {item => item && (anims =>
                  <animated.div className="tw-py-1 tw-overflow-hidden tw-flex tw-items-center" style={anims}>
                     <span className="tw-pl-5 tw-text-sm">Бусад:</span>
                     <input className={`${basicInputClass} tw-ml-2 tw-flex-grow tw-max-w-xs`} value={valueOther ?? ''} onChange={e => setter(keyNameOther, e.target.value)} />
                  </animated.div>
               )}
            </Transition>
         </div>
      </div>
   )
}

export const SaveButton = ({ onClick, buttonAppend, label }) => (
   <button className={`focus:tw-outline-none tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px tw-font-light tw-text-white tw-transition-colors ${buttonAppend}`} onClick={onClick}>
      {label ?? 'Хадгалах'}
   </button>
)

function ExportProducts({ label, list, setter, HelpPopup }) {
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
               <div className="tw-flex tw-items-center" key={i}>
                  <span className="tw-text-15px">{i + 1}.</span>

                  <input className={`${basicInputClass} tw-ml-2 tw-flex-grow`} value={item?.product_name ?? ''} onChange={e => handleInput('product_name', e.target.value, i)} placeholder="Бүтээгдэхүүний нэр" />

                  <input className={`${basicInputClass} tw-ml-4`} type="number" value={item?.hs_code ?? ''} onChange={e => handleInput('hs_code', e.target.value, i)} placeholder="HS код" />

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

function PlannedActivity({ label, HelpPopup, value, valueCost, setter }) {
   useEffect(() => {
      setter('planned_activity_cost', null)
   }, [value])

   return (
      <div className="md:tw-col-span-2 tw-w-full tw-mt-2">
         <div className="tw-text-sm tw-p-2 tw-flex tw-items-center">
            {label}
            {HelpPopup && HelpPopup}
         </div>

         <div className="tw-pl-3">
            {plannedActivityClass.map((option, i) =>
               <div className="tw-flex tw-flex-col tw-items-start" key={i}>
                  <div className="tw-cursor-pointer tw-flex tw-items-center tw-pl-2 tw-py-1" onClick={() => setter('planned_activity', i + 1)}>
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
                           <NumberFormat className={`${basicInputClass} tw-ml-2`} value={valueCost ?? ''} prefix="₮ " decimalScale={2} thousandSeparator onValueChange={values => setter('planned_activity_cost', values.floatValue)} />
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

export const StaticText = ({ label, text }) => (
   <div className="tw-w-full tw-max-w-md tw-p-3">
      <div className="tw-text-sm">
         {label}
      </div>
      {text &&
         <div className="tw-mt-2">
            <span className="tw-ml-2 tw-bg-indigo-50 tw-rounded tw-py-1 tw-px-2 tw-text-sm tw-text-indigo-500">{text}</span>
         </div>
      }
   </div>
)
