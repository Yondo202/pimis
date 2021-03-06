import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext, useEffect, useState } from 'react'
import HelpPopup from 'components/help_popup/helpPopup'
import LoadFromOtherProject from '../loadFromOtherProject'
import AlertContext from 'components/utilities/alertContext'
import FormOptions from 'components/urgudul_components/formOptions'
import { animated, Transition, config } from 'react-spring/renderprops'
import axios from 'axiosbase'
import FormInline from 'components/urgudul_components/formInline'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import NumberFormat from 'react-number-format'
import FormSelect from 'components/urgudul_components/formSelect'
import ModalWindow from 'components/modal_window/modalWindow'
import { useHistory } from 'react-router-dom'

export default function UrgudulPage1({ projects = [] }) {
   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)
   const history = useHistory()

   const [form, setForm] = useState({ ...initialState })
   const [products, setProducts] = useState([{ ...initialProducts[0] }])
   const [exportCountries, setExportCountries] = useState([{ ...initialExportCountries[0], type: 'newMarket' }])
   const [exportCountries1, setExportCountries1] = useState([{ ...initialExportCountries[0], type: 'target' }])
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
      if (Object.keys(temp).length) {
         setForm(prev => ({ ...prev, ...temp }))
      } else {
         setForm({ ...initialState })
      }

      const value = UrgudulCtx.data.exportProducts
      if (value instanceof Array && value?.length) {
         setProducts(value)
      } else {
         setProducts([{ ...initialProducts[0] }])
      }

      const value1 = UrgudulCtx.data.exportCountries
      if (value1 instanceof Array && value1?.length) {
         setExportCountries(value1)
      } else {
         setExportCountries([{ ...initialExportCountries[0], type: 'newMarket' }])
      }

      const value2 = UrgudulCtx.data.exportCountries1
      if (value2 instanceof Array && value2?.length) {
         setExportCountries1(value2)
      } else {
         setExportCountries1([{ ...initialExportCountries[0], type: 'target' }])
      }
   }, [projectId])

   const handleSubmitCreate = () => {
      if (period.open !== true) {
         setModalOpen(true)
         return
      }

      setValidate(true)
      let allValid = true
      Object.keys(initialState)
         .filter(key => !validateArr.includes(key))
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
               case 'export_marketing':
                  if (form[key] === 1) {
                     allValid = allValid && !checkInvalid(form[`${key}_cost`])
                  }
                  break
               case 'quality_control':
                  if (form[key] === 1) {
                     allValid = allValid && !checkInvalid(form[`${key}_cost`])
                  }
                  break
               case 'tech_control':
                  if (form[key] === 1) {
                     allValid = allValid && !checkInvalid(form[`${key}_cost`])
                  }
                  break
               default:
                  allValid = allValid && !checkInvalid(form[key])
            }
         })
      products.forEach(product => {
         allValid = allValid && !checkInvalid(product.product_name) && !checkInvalid(product.hs_code)
      })
      form.entering_new_market === 1 && exportCountries.forEach(country => {
         country.current === -1
            ? allValid = allValid && !checkInvalid(country.current_other)
            : allValid = allValid && !checkInvalid(country.current)
         country.planned === -1
            ? allValid = allValid && !checkInvalid(country.planned_other)
            : allValid = allValid && !checkInvalid(country.planned)
      })
      exportCountries1.forEach(country => {
         country.current === -1
            ? allValid = allValid && !checkInvalid(country.current_other)
            : allValid = allValid && !checkInvalid(country.current)
         country.planned === -1
            ? allValid = allValid && !checkInvalid(country.planned_other)
            : allValid = allValid && !checkInvalid(country.planned)
      })
      if (!allValid) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: '?????????????????????? ???????????? ?????????????? ????.' })
         return
      }

      axios.post('projects', { ...form, exportProducts: products, exportCountries: exportCountries, exportCountries1: exportCountries1 }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: '?????????????? ????????????????.' })
         history.push('/urgudul/2')
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: '?????????? ????????????, ?????????????? ???????????? ??????????????????.' })
      })
   }

   const handleSubmitEdit = () => {
      setValidate(true)
      let allValid = true
      Object.keys(initialState)
         .filter(key => !validateArr.includes(key))
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
               case 'export_marketing':
                  if (form[key] === 1) {
                     allValid = allValid && !checkInvalid(form[`${key}_cost`])
                  }
                  break
               case 'quality_control':
                  if (form[key] === 1) {
                     allValid = allValid && !checkInvalid(form[`${key}_cost`])
                  }
                  break
               case 'tech_control':
                  if (form[key] === 1) {
                     allValid = allValid && !checkInvalid(form[`${key}_cost`])
                  }
                  break
               default:
                  allValid = allValid && !checkInvalid(form[key])
            }
         })
      products.forEach(product => {
         allValid = allValid && !checkInvalid(product.product_name) && !checkInvalid(product.hs_code)
      })
      form.entering_new_market === 1 && exportCountries.forEach(country => {
         country.current === -1
            ? allValid = allValid && !checkInvalid(country.current_other)
            : allValid = allValid && !checkInvalid(country.current)
         country.planned === -1
            ? allValid = allValid && !checkInvalid(country.planned_other)
            : allValid = allValid && !checkInvalid(country.planned)
      })
      exportCountries1.forEach(country => {
         country.current === -1
            ? allValid = allValid && !checkInvalid(country.current_other)
            : allValid = allValid && !checkInvalid(country.current)
         country.planned === -1
            ? allValid = allValid && !checkInvalid(country.planned_other)
            : allValid = allValid && !checkInvalid(country.planned)
      })
      if (!allValid) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: '?????????????????????? ???????????? ?????????????? ????.' })
         return
      }

      axios.put(`projects/${projectId}`, { ...form, exportProducts: products, exportCountries: exportCountries, exportCountries1: exportCountries1 }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: '?????????????????? ??????????????????.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: '?????????? ????????????, ?????????????? ??????????????????.' })
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
         AlertCtx.setAlert({ open: true, variant: 'success', msg: '???????????????? ?????????????????? ???????????????????? ???? ????????????????.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: '???????????????? ?????????????????? ???????????????????? ?????????? ??????????????????.' })
      })
   }

   const [productsOther, setProductsOther] = useState([])
   const [countriesOther, setCountriesOther] = useState([])
   const [period, setPeriod] = useState({
      open: null,
      period: {},
   })

   useEffect(() => {
      axios.get('/urgudul-datas/products-other').then(res => setProductsOther(res.data.data))
      axios.get('/urgudul-datas/countries-other').then(res => setCountriesOther(res.data.data))
      axios.get('accept-periods', {
         headers: { Authorization: getLoggedUserToken() },
         params: { checkOpen: true }
      }).then(res => {
         setPeriod(res.data.data)
      })
   }, [])

   const [modalOpen, setModalOpen] = useState(false)

   return (
      <>
         <div className={containerClass}>
            <UrgudulHeader
               label="???????????????????? ?????????????? ?????????? ?????????????????? ??????????"
               HelpPopup={isCluster && <HelpPopup classAppend="tw-mx-2" main="?????????? ?????????????? ?????? ?????????????????? ?????????????????? ???? ?????????? ?????????????? ???????????? ?????????????? ????." />}
               projectNumber={UrgudulCtx.data.project_number}
               LoadFromOtherProject={<LoadFromOtherProject classAppend="tw-absolute tw-right-4" otherProjects={otherProjects} loadFromOtherProject={loadFromOtherProject} />}
            />

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-2">
               <FormOptions label="?????????????????? ??????????" options={['???? ?????????? ????????', '??????????????']} values={[0, 1]} value={form.project_type} name="project_type" setter={handleInput} invalid={validate && checkInvalid(form.project_type)} />

               <FormInline label="?????????????? ??????" type="text" value={form.project_name} name="project_name" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(form.project_name)} />

               <StaticText
                  label={isCluster ? '?????????????????? ???????????????????? ??????' : '???? ?????????? ????????'}
                  text={companyName}
               />

               <FormInline label="???????????????????? ????????????" type="number" value={form.register_number} name="register_number" setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(form.register_number)} />

               <div className="md:tw-col-span-2 tw-w-full tw-max-w-3xl">
                  <div className="tw-text-sm tw-p-2 tw-pb-0 tw-font-medium tw-text-blue-900">
                     ?????????????? ?????????????? ???????????????? ?????????? ?????????????? ?????????? ???????????????????????? ????????
                  </div>
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                     <FormOptions label="?????????????? ????????????????" options={optionsYesNo} values={[1, 0]} value={form.female_shareholder} name="female_shareholder" setter={handleInput} invalid={validate && checkInvalid(form.female_shareholder)} />
                     <FormOptions label="?????????????? ?????????? ??????????????????" options={optionsYesNo} values={[1, 0]} value={form.female_executive} name="female_executive" setter={handleInput} invalid={validate && checkInvalid(form.female_executive)} />
                  </div>
               </div>

               <FormOptions label="?????? ?????????????????????? ????????????" options={activityClass} values={[1, 2, 3]} value={form.activity_direction} name="activity_direction" setter={handleInput} invalid={validate && checkInvalid(form.activity_direction)} />

               <div className="md:tw-col-span-2 tw-w-full tw-max-w-3xl">
                  <div className="tw-text-sm tw-p-2 tw-pb-0 tw-font-medium tw-text-blue-900">
                     ?????????????????? ?????? ???????????????????????????? ?????????????? /???????????? ?????????????????????????? ????????????/
                  </div>
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                     <div className="tw-w-full">
                        <FormSelect
                           data={productsOther}
                           setter={handleInput}
                           name="main_export"
                           label="???????????????? ????????????????:"
                           value={form.main_export}
                           displayName="description_mon"
                           invalid={validate && checkInvalid(form.main_export)}
                           classAppend="tw-max-w-xs tw--mt-4"
                        />
                        <OthersInline
                           value={form.main_export_other}
                           name="main_export_other"
                           setter={handleInput}
                           invalid={validate && checkInvalid(form.main_export_other)}
                           valueEffect={form.main_export}
                        />
                     </div>
                     <div className="tw-w-full">
                        <FormSelect
                           data={productsOther}
                           setter={handleInput}
                           name="main_export_planned"
                           label="???? ?????????????????? ?????????? ????????????????????:"
                           value={form.main_export_planned}
                           displayName="description_mon"
                           invalid={validate && checkInvalid(form.main_export_planned)}
                           classAppend="tw-max-w-xs tw--mt-4"
                        />
                        <OthersInline
                           value={form.main_export_planned_other}
                           name="main_export_planned_other"
                           setter={handleInput}
                           invalid={validate && checkInvalid(form.main_export_planned_other)}
                           valueEffect={form.main_export_planned}
                        />
                     </div>
                  </div>
               </div>

               <ExportProducts label="???????????????????? ??????????????????????????????" list={products} setter={setProducts} validate={validate}
                  HelpPopup={<HelpPopup classAppend="tw-mx-2" main="???? ???????????????????????????? HS ?????????? ???????????? ?????????????? ?????????? ????." link="https://gaali.mn/hscode/mn" />}
               />

               <FormOptions label="?????????????? ???????? ???????????? ?????????????????????? ????????"
                  HelpPopup={<HelpPopup classAppend="tw-mx-2" main="5000 ????.?????????????????? ???????? ?????????? ????????????." />}
                  options={optionsYesNo} values={[1, 0]} value={form.export_experience} name="export_experience" setter={handleInput} invalid={validate && checkInvalid(form.export_experience)}
               />

               <FormOptions label="???????????? ?????????????? ?????????????? ?????????????????? ???????? ?????? ?????????? ?????????????? ????????"
                  HelpPopup={<HelpPopup classAppend="tw-mx-2" main="?????????? ???????? ?????? ?????????? ?????????????????? ???????????? ???????????????? ????." />}
                  options={optionsYesNo} values={[1, 0]} value={form.entering_new_market} name="entering_new_market" setter={handleInput} invalid={validate && checkInvalid(form.entering_new_market)}
               />

               <ExportCountries label="???????? ?????? ???????? ?????????? ????????????" list={exportCountries} setter={setExportCountries} validate={validate} countriesOther={countriesOther} type="newMarket" openCondition={form.entering_new_market === 1} cleanUp={() => setExportCountries([{ ...initialExportCountries[0], type: 'newMarket' }])} />

               <ExportCountries label="?????????????????? ???????????????? ????????????" list={exportCountries1} setter={setExportCountries1} validate={validate} countriesOther={countriesOther} type="target" openCondition={true} />

               <PlannedActivity label="???????????????????? ?????? ?????????????????????? ????????????" setter={handleInput} validate={validate}
                  values={[{
                     check: form.export_marketing,
                     cost: form.export_marketing_cost
                  }, {
                     check: form.quality_control,
                     cost: form.quality_control_cost
                  }, {
                     check: form.tech_control,
                     cost: form.tech_control_cost
                  }]}
               />
            </div>

            <div className="tw-flex tw-justify-end">
               <SaveButton
                  buttonAppend="tw-m-6"
                  onClick={isCreated ? handleSubmitEdit : handleSubmitCreate}
                  label={isCreated ? undefined : '?????????????? ????????????'} />
            </div>
         </div>

         <Transition
            items={period.open === false && (UrgudulCtx.data.id === undefined || UrgudulCtx.data.id === null)}
            from={{ transform: 'scale(0)' }}
            enter={{ transform: 'scale (1)' }}
            leave={{ transform: 'scale (0)' }}
            config={config.stiff}
         >
            {item => item && (anims =>
               <animated.div className="tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white" style={anims}>
                  <div className="tw-text-center tw-text-sm tw-p-2 tw-pt-5">
                     ?????????????? ???????????? ???????? ?????????????? ???????????????????? ??????????.
                  </div>
                  <div className="tw-text-center tw-text-13px tw-p-2 tw-pb-4">
                     {period.period.start_date
                        ? <span>
                           {`?????????????????? ?????????????? ???????????????? `}
                           <span className="tw-text-blue-500">{period.period.start_date}</span>
                           {` -?????? `}
                           <span className="tw-text-blue-500">{period.period.end_date}</span>
                           {` ?????????????? ?????????????? ???????????????? ??????????.`}
                        </span>
                        : `?????????????????? ?????????????? ???????????????? ?????????????????????? ??????????.`
                     }
                  </div>
               </animated.div>
            )}
         </Transition>

         <ModalWindow modalOpen={modalOpen} setModalOpen={setModalOpen}
            modalAppend="tw-max-w-md tw-ring-2 tw-ring-indigo-500"
         >
            <div className="tw-text-center tw-text-sm tw-p-2 tw-pt-4">
               ?????????????? ???????????? ???????? ?????????????? ???????????????????? ??????????.
            </div>
            <div className="tw-text-center tw-text-13px tw-pt-2 tw-pb-3 tw-px-4">
               {period.period.start_date
                  ? <span>
                     {`?????????????????? ?????????????? ???????????????? `}
                     <span className="tw-text-blue-500">{period.period.start_date}</span>
                     {` -?????? `}
                     <span className="tw-text-blue-500">{period.period.end_date}</span>
                     {` ?????????????? ?????????????? ???????????????? ??????????.`}
                  </span>
                  : `?????????????????? ?????????????? ???????????????? ?????????????????????? ??????????.`
               }
            </div>
         </ModalWindow>
      </>
   )
}

const initialState = {
   project_type: null,
   project_name: null,
   register_number: null,
   female_shareholder: null,
   female_executive: null,
   activity_direction: null,
   main_export: null,
   main_export_other: null,
   main_export_planned: null,
   main_export_planned_other: null,
   export_experience: null,
   entering_new_market: null,
   export_marketing: null,
   export_marketing_cost: null,
   quality_control: null,
   quality_control_cost: null,
   tech_control: null,
   tech_control_cost: null
}

const initialProducts = [{
   product_name: null,
   hs_code: null,
}]

const initialExportCountries = [{
   current: null,
   current_other: null,
   planned: null,
   planned_other: null
}]

export const optionsYesNo = [
   '????????',
   '????????'
]

export const activityClass = [
   '?????????? ???? ?????????? ?????????????????? ????????????????????',
   '?????????? ????????????????',
   '???????????? ?????????????? ??????????????????, ???????????????????? ??????????????????',
]

export const plannedActivityClass = {
   export_marketing: '?????????????????? ?????? ?????????? ?????????????????? ??????????????????, ????????????????????????, ???????????? ???????????????????? ???????????? ??????????????????',
   quality_control: '?????????????????? ???????????????????????????? ?????????????? ??????????????, ??????????????????, ??????????????????????????????',
   tech_control: '?????????????????? ????????????????????????, ???????????????????????? ????????????????????, ?????????????? ???????????????????????? ???????? ????????????, ?????????? ???????????????????????? ???????????????? ??????????'
}

export const containerClass = 'tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed'

const validateArr = [
   'main_export_other',
   'main_export_planned_other',
   'export_marketing_cost',
   'quality_control_cost',
   'tech_control_cost'
]

export const UrgudulHeader = ({ label, HelpPopup, LoadFromOtherProject, projectNumber }) => (
   <div className="">
      <div className="tw-p-3 tw-flex tw-items-center tw-relative">
         <span className="tw-text-base tw-font-medium tw-text-blue-500">{label}</span>
         {HelpPopup && HelpPopup}
         {LoadFromOtherProject && LoadFromOtherProject}
      </div>

      {projectNumber &&
         <div className="tw-ml-5 tw-mb-2 tw-text-13px">
            ?????????????????? ????????????:
            <span className="tw-text-blue-500 tw-ml-2 tw-font-medium">{projectNumber}</span>
         </div>
      }
   </div>
)

function OthersInline({ value, name, index, setter, invalid, valueEffect }) {
   useEffect(() => {
      valueEffect !== -1 && setter(name, null, index)
   }, [valueEffect])

   return (
      <Transition
         items={valueEffect === -1}
         from={{ opacity: 0, height: 0 }}
         enter={{ opacity: 1, height: 'auto' }}
         leave={{ opacity: 0, height: 0 }}
         config={config.stiff}
      >
         {item => item && (anims =>
            <animated.div className="tw-pl-3 tw-overflow-hidden tw-flex tw-items-center" style={anims}>
               <span className="tw-text-sm">??????????:</span>
               <input className={`${basicInputClass} tw-ml-2 tw-flex-grow ${invalid && 'tw-border-red-500'} tw-transition-colors`} style={{ maxWidth: 248 }} value={value ?? ''} onChange={e => setter(name, e.target.value, index)} />
            </animated.div>
         )}
      </Transition>
   )
}

export const SaveButton = ({ onClick, buttonAppend, label }) => (
   <button className={`focus:tw-outline-none tw-px-8 tw-py-2 tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-text-15px tw-font-light tw-text-white tw-transition-colors ${buttonAppend}`} onClick={onClick}>
      {label ?? '????????????????'}
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
      <div className="md:tw-col-span-2 tw-w-full tw-mt-2 tw-max-w-xl tw-pb-3">
         <div className="tw-text-sm tw-p-2 tw-flex tw-items-center">
            <span className="tw-font-medium tw-text-blue-900">
               {label}
            </span>
            {HelpPopup && HelpPopup}
         </div>

         <div className="tw-pl-4">
            {list.map((item, i) =>
               <div className="tw-flex tw-items-center tw-pb-1" key={i}>
                  <span className="tw-text-15px">{i + 1}.</span>

                  <input className={`${basicInputClass} tw-pt-1.5 tw-pb-1.5 tw-ml-2 tw-flex-grow ${validate && checkInvalid(item?.product_name) && 'tw-border-red-500'} tw-transition-colors`} value={item?.product_name ?? ''} onChange={e => handleInput('product_name', e.target.value, i)} placeholder="???????????????????????????? ??????" />

                  <input className={`${basicInputClass} tw-pt-1.5 tw-pb-1.5 tw-ml-4 ${validate && checkInvalid(item?.hs_code) && 'tw-border-red-500'} tw-transition-colors`} type="number" value={item?.hs_code ?? ''} onChange={e => handleInput('hs_code', e.target.value, i)} placeholder="HS ??????" />

                  <ButtonTooltip tooltip="??????????" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classAppend="tw-ml-3" classButton="tw-text-red-500 active:tw-text-red-600" />
               </div>
            )}
         </div>

         <div className="tw-flex tw-justify-end tw-items-center">
            <span className="tw-italic tw-text-gray-500 tw-text-xs">
               ???????????????? ???????????????????????? ??????????
            </span>
            <ButtonTooltip tooltip="???????????? ??????????" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-ml-1" classButton="tw-text-green-500 active:tw-text-green-600" />
         </div>
      </div>
   )
}

function ExportCountries({ label, HelpPopup, list, setter, validate, countriesOther, type, openCondition = false, cleanUp = () => { } }) {
   const handleInput = (key, value, index) => setter(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleRemove = (index) => setter(prev => prev.filter((_, i) => i !== index))

   const handleAdd = () => setter(prev => {
      const next = [...prev]
      next.push({
         current: null,
         current_other: null,
         planned: null,
         planned_other: null,
         type: type
      })
      return next
   })

   useEffect(() => {
      !openCondition && cleanUp()
   }, [openCondition])

   return (
      <Transition
         items={openCondition}
         from={{ height: 0, opacity: 0 }}
         enter={{ height: 'auto', opacity: 1 }}
         leave={{ height: 0, opacity: 0 }}
         config={config.stiff}
      >
         {item => item && (anims =>
            <animated.div className="md:tw-col-span-2 tw-w-full tw-mt-2 tw-max-w-3xl" style={anims}>
               <div className="tw-text-sm tw-p-2 tw-pb-0 tw-flex tw-items-center">
                  <span className="tw-font-medium tw-text-blue-900">
                     {label}
                  </span>
                  {HelpPopup && HelpPopup}
               </div>

               <div className="tw-pl-4">
                  {list.map((item, i) =>
                     <div className="tw-flex tw-items-center" key={i}>
                        <span className="tw-text-15px">{i + 1}.</span>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-flex-grow">
                           <div className="tw-w-full">
                              <FormSelect
                                 data={countriesOther}
                                 setter={handleInput}
                                 name="current"
                                 index={i}
                                 label="???????????????? ????????????????:"
                                 value={item.current}
                                 displayName="description_mon"
                                 invalid={validate && checkInvalid(item.current)}
                                 classAppend="tw-max-w-xs tw--mt-4"
                              />
                              <OthersInline
                                 value={item.current_other}
                                 name="current_other"
                                 index={i}
                                 setter={handleInput}
                                 invalid={validate && checkInvalid(item.current_other)}
                                 valueEffect={item.current}
                              />
                           </div>
                           <div className="tw-w-full">
                              <FormSelect
                                 data={countriesOther.filter(country => country.id !== -2)}
                                 setter={handleInput}
                                 name="planned"
                                 index={i}
                                 label="???? ?????????????????? ?????????? ????????????????????:"
                                 value={item.planned}
                                 displayName="description_mon"
                                 invalid={validate && checkInvalid(item.planned)}
                                 classAppend="tw-max-w-xs tw--mt-4"
                              />
                              <OthersInline
                                 value={item.planned_other}
                                 name="planned_other"
                                 index={i}
                                 setter={handleInput}
                                 invalid={validate && checkInvalid(item.planned_other)}
                                 valueEffect={item.planned}
                              />
                           </div>
                        </div>
                        <ButtonTooltip tooltip="??????????" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classAppend="tw-ml-3" classButton="tw-text-red-500 active:tw-text-red-600" />
                     </div>
                  )}
               </div>
               <div className="tw-flex tw-justify-end tw-items-center">
                  <span className="tw-italic tw-text-gray-500 tw-text-xs">
                     ?????????????????? ???????????????? ???????? ??????????
                  </span>
                  <ButtonTooltip tooltip="???????????? ??????????" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-ml-1" classButton="tw-text-green-500 active:tw-text-green-600" />
               </div>
            </animated.div>
         )}
      </Transition>
   )
}

function PlannedActivity({ label, HelpPopup, values, setter, validate }) {
   const handleChange = (name, index) => {
      if (values[index].check === 1) {
         setter(name, 0)
         setter(`${name}_cost`, null)
      } else {
         setter(name, 1)
      }
   }

   const sumActivityCost = values.reduce((acc, cv) => acc + (+cv.cost || 0), 0)

   return (
      <div className="md:tw-col-span-2 tw-w-full tw-mt-2">
         <div className="tw-text-sm tw-p-2 tw-pb-1 tw-flex tw-items-center">
            <span className="tw-font-medium tw-text-blue-900">
               {label}
            </span>
            {HelpPopup && HelpPopup}
         </div>

         <div className="tw-pl-3">
            {Object.entries(plannedActivityClass).map(([name, label], i) =>
               <div className="tw-flex tw-flex-col tw-items-start" key={i}>
                  <div className="tw-cursor-pointer tw-flex tw-items-center tw-pl-2 tw-py-1" onClick={() => handleChange(name, i)}>
                     <span className={`tw-rounded-full tw-w-4 tw-h-4 tw-border-2 ${values[i].check === 1 ? 'tw-border-blue-700' : 'tw-border-gray-500'} tw-transition-colors tw-flex tw-justify-center tw-items-center`}>
                        <span className={`tw-rounded-full tw-w-2 tw-h-2 ${values[i].check === 1 ?
                           'tw-bg-blue-700' : 'tw-bg-transparent'} tw-transition-colors`} />
                     </span>
                     <span className="tw-ml-1.5">
                        {label}
                     </span>
                  </div>
                  <Transition
                     items={values[i].check === 1}
                     from={{ opacity: 0, height: 0 }}
                     enter={{ opacity: 1, height: 'auto' }}
                     leave={{ opacity: 0, height: 0 }}
                     config={config.stiff}
                  >
                     {item => item && (anims =>
                        <animated.span className="tw-pl-8 tw-flex tw-items-center tw-py-1" style={anims}>
                           ?????????? ??????:
                           <NumberFormat className={`${basicInputClass} tw-ml-2 ${validate && checkInvalid(values[i].cost) && 'tw-border-red-500'} tw-transition-colors`} value={values[i].cost} prefix="??? " decimalScale={2} thousandSeparator onValueChange={values => setter(`${name}_cost`, values.floatValue)} />
                        </animated.span>
                     )}
                  </Transition>
               </div>
            )}
         </div>
         <StaticText
            label="???????????????????? ?????? ?????????????????????? ???????? ??????????"
            text={`??? ${sumActivityCost.toLocaleString()}`}
         />
      </div>
   )
}

export const basicInputClass = 'tw-outline-none tw-py-1 tw-px-2 tw-rounded tw-border tw-border-gray-400 focus:tw-border-blue-700 focus:tw-shadow tw-duration-700 tw-transition-colors'

export const StaticText = ({ label, text, HelpPopup, classLabel }) => (
   <div className="tw-w-full tw-max-w-md tw-p-3">
      <div className={`tw-text-sm tw-flex tw-items-center ${classLabel}`}>
         {label}
         {HelpPopup && HelpPopup}
      </div>
      {text &&
         <div className="tw-mt-2">
            <span className="tw-ml-2 tw-bg-indigo-50 tw-rounded tw-py-1 tw-px-2 tw-text-sm tw-text-indigo-500">
               {text}
            </span>
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
