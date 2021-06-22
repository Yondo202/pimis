import UrgudulContext from 'components/utilities/urgudulContext'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
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
import { useEffect } from 'react'

export default function UrgudulPage1() {
   const [form, setForm] = useState(initialState)

   const handleInput = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)

   const isCluster = true

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Түншлэлийн дэмжлэг хүсэх өргөдлийн маягт"
            HelpPopup={isCluster && <HelpPopup classAppend="tw-mx-2" main="Кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." position="bottom" />}
            project_number={UrgudulCtx.data.project_number}
         />

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-3">
            <FormOptions label="Өргөдлийн төрөл" options={['Аж ахуйн нэгж', 'Кластер']} values={[0, 1]} value={form.project_type} name="project_type" setForm={handleInput} />

            <FormInline label="Аж ахуйн нэгж / Кластерын тэргүүлэгч ААН/-ийн нэр" value={form.company_name || ''} name="company_name" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" />

            <FormInline label="Гэрчилгээний дугаар" type="number" value={form.certificate_number || ''} name="certificate_number" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" />

            <FormOptions label="Үйл ажиллагааны чиглэл" options={activityClass} values={[1, 2, 3]} value={form.activity_direction} name="activity_direction" setForm={handleInput} />

            <div className="md:tw-col-span-2">
               <div className="tw-text-sm tw-p-2">
                  Экспортын гол бүтээгдэхүүний ангилал /Зөвхөн үйлдвэрлэлийн салбар/
               </div>
               <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                  <Select1
                     label="Одоогийн байдлаар"
                     options={productClass}
                     value={form.main_export}
                     keyName="main_export"
                     setter={handleInput}
                  />
                  <Select1
                     label="Уг өргөдлийн хувьд төлөвлөсөн"
                     options={productClass}
                     value={form.main_export_planned}
                     keyName="main_export_planned"
                     setter={handleInput}
                  />
               </div>
            </div>

            <ExportProducts label="Экспортын бүтээгдэхүүний нэрс, HS код" list={form.export_products} setter={setForm} />

            <div className="md:tw-col-span-2">
               <div className="tw-text-sm tw-p-2">
                  Экспортын зорилтот орны нэр
               </div>
               <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                  <Select1
                     label="Одоогийн байдлаар"
                     options={exportCountries}
                     value={form.export_country}
                     keyName="export_country"
                     setter={handleInput}
                  />
                  <Select1
                     label="Уг өргөдлийн хувьд төлөвлөсөн"
                     options={exportCountries}
                     value={form.export_country_planned}
                     keyName="export_country_planned"
                     setter={handleInput}
                  />
               </div>
            </div>

            <PlannedActivity label="Төлөвлөсөн үйл ажиллагааны чиглэл" value={form.planned_activity} setter={handleInput} />

            <FormInline label="Төлөвлөсөн үйл ажиллагааны нийт төсөв" value={form.planned_activity_budget || ''} name="planned_activity_budget" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" />
         </div>

         <div className="tw-flex tw-justify-end">
            <SaveButton buttonAppend="tw-mt-6 tw-mb-4 tw-mr-4" />
         </div>
      </div >
   )
}

const initialState = {
   project_type: null,
   company_name: null,
   certificate_number: null,
   activity_direction: null,
   main_export: null,
   main_export_planned: null,
   export_products: [{
      product_name: null,
      hs_code: null,
   }],
   export_country: null,
   export_country_planned: null,
   planned_activity: null,
   planned_activity_cost: null,
   planned_activity_budget: null,
}

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

export const containerClass = 'tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed'

export const UrgudulHeader = ({ label, HelpPopup, LoadFromOtherProject, project_number }) => (
   <div className="">
      <div className="tw-p-3 tw-flex tw-items-center tw-relative">
         <span className="tw-pl-2 tw-text-base tw-font-medium tw-text-blue-500">{label}</span>

         {HelpPopup && HelpPopup}

         {LoadFromOtherProject && LoadFromOtherProject}
      </div>

      {project_number &&
         <div className="tw-ml-5 tw-mb-2 tw-text-13px">
            Өргөдлийн дугаар:
            <span className="tw-text-blue-500 tw-ml-2 tw-font-medium">{project_number}</span>
         </div>
      }
   </div>
)

function Select1({ label, HelpPopup, options, value, keyName, setter }) {
   const isOther = value !== null && !options.includes(value)

   const checked = (option) => {
      if (option === 'Бусад') {
         return isOther
      } else {
         return value === option
      }
   }

   return (
      <div className="">
         <div className="tw-text-sm tw-p-2 tw-flex tw-items-center">
            {label}

            {HelpPopup && HelpPopup}
         </div>

         <div className="">
            {[...options, 'Бусад'].map(option =>
               <div className="tw-flex tw-items-center tw-p-2" onClick={() => setter(keyName, option)} key={option}>
                  <span className={`tw-w-4 tw-h-4 tw-rounded-full tw-border-2 ${checked(option) ? 'tw-border-blue-700' : 'tw-border-gray-500'} tw-transition-colors tw-flex tw-justify-center tw-items-center`}>
                     <span className={`tw-w-2 tw-h-2 tw-rounded-full ${checked(option) ? 'tw-bg-blue-700' : 'tw-bg-transparent'} tw-transition-colors`} />
                  </span>

                  <span className="">
                     {option}
                  </span>
               </div>
            )}

            <Transition
               items={isOther}
               from={{ height: 0, opacity: 0 }}
               enter={{ height: 'auto', opacity: 1 }}
               leave={{ height: 0, opacity: 0 }}
            >
               {item => item && (anims =>
                  <animated.div className="tw-p-2 tw-overflow-hidden" style={anims}>
                     <input className={`${basicInputClass}`} value={value === 'Бусад' ? '' : value} onChange={e => setter(keyName, e.target.value)} />
                  </animated.div>
               )}
            </Transition>
         </div>
      </div>
   )
}

const SaveButton = ({ onClick, buttonAppend }) => (
   <button className={`focus:tw-outline-none tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px tw-font-light tw-text-white tw-transition-colors ${buttonAppend}`} onClick={onClick}>
      Хадгалах
   </button>
)

function ExportProducts({ label, list, setter, HelpPopup }) {
   const handleInputEP = (key, value, index) => setter(prev => {
      const nextEP = [...prev.export_products]
      nextEP[index][key] = value
      return { ...prev, export_products: nextEP }
   })

   const handleRemove = (index) => setter(prev => {
      const nextEP = prev.export_products.filter((_, i) => i !== index)
      return { ...prev, export_products: nextEP }
   })

   const handleAdd = () => setter(prev => {
      const nextEP = [...prev.export_products]
      nextEP.push({
         product_name: null,
         hs_code: null,
      })
      return { ...prev, export_products: nextEP }
   })

   return (
      <div className="md:tw-col-span-2">
         <div className="tw-text-sm tw-p-2">
            {label}

            {HelpPopup && HelpPopup}
         </div>

         {list.map((item, i) =>
            <div className="tw-flex tw-items-center" key={i}>
               <input className={`${basicInputClass}`} value={item?.product_name || ''} onChange={e => handleInputEP('product_name', e.target.value, i)} />

               <input className={`${basicInputClass}`} type="number" value={item?.hs_code || ''} onChange={e => handleInputEP('hs_code', e.target.value, i)} />

               <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
            </div>
         )}

         <div className="">
            <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classButton="tw-text-green-500 active:tw-text-green-600 tw-mr-2" />
         </div>
      </div>
   )
}

function PlannedActivity({ label, HelpPopup, value, setter }) {
   const [costs, setCosts] = useState({})

   const handleInput = (key, value) => setCosts(prev => ({ ...prev, [key]: value }))

   const checked = (option) => value === option

   useEffect(() => {
      setter('planned_activity_cost', costs[value] ?? null)
   }, [costs[value]])

   return (
      <div className="md:tw-col-span-2">
         <div className="tw-text-sm tw-p-2 tw-flex tw-items-center">
            {label}

            {HelpPopup && HelpPopup}
         </div>

         {plannedActivityClass.map(option =>
            <div className="">
               <span className="" onClick={() => setter('planned_activity', option)}>
                  <span className={`tw-rounded-full tw-w-4 tw-h-4 tw-border-2 ${checked(option) ? 'tw-border-blue-700' : 'tw-border-gray-500'} tw-transition-colors tw-flex tw-justify-center tw-items-center`}>
                     <span className={`tw-rounded-full tw-w-2 tw-h-2 ${checked(option) ? 'tw-bg-blue-700' : 'tw-bg-transparent'} tw-transition-colors`} />
                  </span>
                  <span>
                     {option}
                  </span>
               </span>

               <Transition
                  items={checked(option)}
                  from={{ opacity: 0 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
               >
                  {item => item && (anims =>
                     <animated.span className="" style={anims}>
                        Үнийн дүн:

                        <input className={`${basicInputClass}`} type="number" value={costs[option] || ''} onChange={e => handleInput(option, e.target.value)} />
                     </animated.span>
                  )}
               </Transition>
            </div>
         )}
      </div>
   )
}

export const basicInputClass = 'tw-outline-none tw-py-1 tw-px-2 tw-rounded tw-border tw-border-gray-400 focus:tw-border-blue-700 focus:tw-shadow tw-duration-700 tw-transition-colors'
