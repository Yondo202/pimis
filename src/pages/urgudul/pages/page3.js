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
import { yearsArr, yearObj, tableCellClass, tableInputClass } from './page2'
import LoadFromOtherProject from '../loadFromOtherProject'

const initialDirectors = [
   {
      fullname: null,
      position: null,
      phone: null,
      email: null,
      project_role: null,
   },
]

export default function UrgudulPage3({ projects = [] }) {
   const [directors, setDirectors] = useState(initialDirectors)
   const [validate, setValidate] = useState(false)
   const [initialized, setInitialized] = useState(false)

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
      setInitialized(true)
   }, [projectId])

   // const [occupations, setOccupations] = useState([])

   // useEffect(() => {
   //    axios.get('occupations').then(res => {
   //       setOccupations(res.data.data)
   //    })
   // }, [])

   const handleSubmit = () => {
      setValidate(true)
      let allValid = true
      directors.forEach(director => {
         allValid = allValid && Object.keys(initialDirectors[0]).every(key => !checkInvalid(director[key], key === 'project_role' && 'quill'))
      })
      if (!allValid) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      if (directors.length < 1) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Түлхүүр албан тушаалтны мэдээлэл оруулна уу.' })
         return
      }

      if (projectId === undefined || projectId === null) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
         history.push('/urgudul/1')
      }
      axios.put(`projects/${projectId}`, { directors: directors }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Түлхүүр албан тушаалтнуудыг хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
      })
   }

   const otherProjects = projects.filter(project => project.id !== UrgudulCtx.data.id)

   const loadFromOtherProjectDirectors = (id) => {
      axios.get(`projects/${id}`, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         const directorsToLoad = res.data.data?.directors
         if (directorsToLoad instanceof Array && directorsToLoad?.length) {
            setDirectors(directorsToLoad)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонгосон өргөдлөөс мэдээллийг нь орууллаа.' })
         } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Сонгосон өргөдөл түлхүүр албан тушаалтнуудаа оруулаагүй байна.' })
         }
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сонгосон өргөдлийн мэдээллийг татаж чадсангүй.' })
      })
   }

   return (<>
      <div className={containerClass}>
         <UrgudulHeader
            label="Түлхүүр албан тушаалтнуудын жагсаалт"
            LoadFromOtherProject={<LoadFromOtherProject classAppend="tw-absolute tw-right-4" otherProjects={otherProjects} loadFromOtherProject={loadFromOtherProjectDirectors} />}
         />

         {directors.map((director, i) =>
            <div className="tw-flex tw-px-2" key={i}>
               <ExpandableContainer classAppend="tw-flex-grow" order={i + 1} label={director.fullname} placeholder="Түлхүүр албан тушаалтан" initialized={initialized}>
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                     <FormInline label="Албан тушаалтны овог нэр" value={director.fullname} name="fullname" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(director.fullname)} />

                     {/* <SearchSelect label="Албан тушаал" data={occupations} value={director.position} name="position" id={i} displayName="description_mon" setForm={handleInput} classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-full" /> */}

                     <FormInline label="Албан тушаал" value={director.position} name="position" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(director.position)} />

                     <FormInline label="Гар утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={director.phone} name="phone" index={i} setter={handleInputFormatted} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(director.phone)} />

                     <FormInline label="Имэйл хаяг" type="email" value={director.email} name="email" index={i} setter={handleInput} validate classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(director.email)} />
                  </div>

                  <FormRichText
                     label="Төслийг хэрэгжүүлэхэд гүйцэтгэх үүрэг"
                     HelpPopup={<HelpPopup classAppend="tw-ml-2" main="Тухайлбал ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв боловсруулах, төслийг хэрэгжүүлэхэд дэмжлэг үзүүлэх гм." />}
                     modules="small"
                     value={director.project_role}
                     name="project_role"
                     index={i}
                     setter={handleInput}
                     classAppend="tw-pl-3 tw-pt-1 tw-pb-2"
                     invalid={validate && checkInvalid(director.project_role, 'quill')}
                  />
               </ExpandableContainer>

               <div className="tw-flex tw-items-center">
                  <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
               </div>
            </div>
         )}

         <div className="tw-flex tw-justify-end tw-items-center">
            <span className="tw-italic tw-text-gray-500 tw-text-xs">
               Түлхүүр албан тушаалтан нэмэх
            </span>
            <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2 tw-ml-1 tw-my-0.5" classButton={`tw-text-green-500 active:tw-text-green-600`} />
         </div>

         <div className="tw-flex tw-justify-end">
            <SaveButton buttonAppend="tw-m-6" onClick={handleSubmit} />
         </div>
      </div>

      {isCluster && <ClusterMembers otherProjects={otherProjects} />}
   </>
   )
}

const initialMembers = [
   {
      company_name: null,
      company_register: null,
      main_activity: null,
      // sales_year: null,
      // sales_amount: null,
      sales: {
         ...yearObj,
      },
      director_name: null,
      director_phone: null,
      director_email: null,
   },
]

function ClusterMembers({ otherProjects }) {
   const [members, setMembers] = useState(initialMembers)
   const [netSales, setNetSales] = useState(null)
   const [validate, setValidate] = useState(false)
   const [initialized, setInitialized] = useState(false)

   const handleInput = (key, value, index) => setMembers(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleInputFormatted = (key, values, index) => setMembers(prev => {
      const next = [...prev]
      next[index][key] = values.formattedValue
      return next
   })

   const handleRemove = (index) => setMembers(prev => prev.filter((_, i) => i !== index))

   const handleAdd = () => setMembers(prev => [...prev, {
      company_name: null,
      company_register: null,
      main_activity: null,
      // sales_year: null,
      // sales_amount: null,
      sales: {
         ...yearObj,
      },
      director_name: null,
      director_phone: null,
      director_email: null,
   }])

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)
   const history = useHistory()

   const projectId = UrgudulCtx.data.id

   const [years, setYears] = useState(yearsArr)

   const handleInputSales = (key, value, index) => setMembers(prev => {
      const next = [...prev]
      next[index].sales[key] = value ?? null
      return next
   })

   useEffect(() => {
      const value = UrgudulCtx.data.clusters
      if (value instanceof Array && value?.length) {
         value.forEach((member, i) => {
            if (member.sales === null || member.sales === undefined) {
               value[i].sales = { ...yearObj }
            }
         })
         setMembers(value)
      }

      const value1 = UrgudulCtx.data.cluster_net_sales
      if (value1 !== null && value1 !== undefined) {
         setNetSales(value1)
      }

      setInitialized(true)
   }, [projectId])

   const handleSubmit = () => {
      setValidate(true)
      let allValid = true
      members.forEach(member => {
         allValid = allValid && Object.keys(initialMembers[0])
            .filter(key => key !== 'sales')
            .every(key => !checkInvalid(member[key]))
         allValid = allValid && Object.values(member.sales).every(val => !checkInvalid(val))
      })
      allValid = allValid && !checkInvalid(netSales)
      if (!allValid) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      if (members.length < 1) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Кластерын гишүүн байгууллагуудын мэдээлэл оруулна уу.' })
         return
      }

      if (projectId === undefined || projectId === null) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
         history.push('/urgudul/1')
      }
      axios.put(`projects/${projectId}`, { clusters: members, cluster_net_sales: netSales }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Гишүүн байгууллагуудыг хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
      })
   }

   const loadFromOtherProjectCluster = (id) => {
      axios.get(`projects/${id}`, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         const projectToLoad = res.data.data
         const value = projectToLoad?.clusters
         if (value instanceof Array && value?.length) {
            value.forEach((member, i) => {
               if (member.sales === null || member.sales === undefined) {
                  value[i].sales = { ...yearObj }
               }
            })
            setMembers(value)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонгосон өргөдлөөс мэдээллийг нь орууллаа.' })
         } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Сонгосон өргөдөл кластерын гишүүн байгууллагуудаа оруулаагүй байна.' })
         }
         const value1 = projectToLoad?.cluster_net_sales
         if (value1 !== null && value1 !== undefined) {
            setNetSales(value1)
         }
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сонгосон өргөдлийн мэдээллийг татаж чадсангүй.' })
      })
   }

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Кластерын гишүүн байгууллагууд"
            LoadFromOtherProject={<LoadFromOtherProject classAppend="tw-absolute tw-right-4" otherProjects={otherProjects} loadFromOtherProject={loadFromOtherProjectCluster} />}
         />

         {members.map((member, i) =>
            <div className="tw-flex tw-px-2" key={i}>
               <ExpandableContainer classAppend="tw-flex-grow" order={i + 1} label={member.company_name} placeholder="Кластерийн гишүүн байгууллага" initialized={initialized}>
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                     <FormInline label="Аж ахуйн нэгжийн нэр" value={member.company_name} name="company_name" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(member.company_name)} />

                     <FormInline label="Регистрийн дугаар" type="number" value={member.company_register} name="company_register" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(member.company_register)} />

                     <FormInline label="Голлох борлуулалт хийдэг үйл ажиллагааны чиглэл" value={member.main_activity} name="main_activity" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(member.main_activity)} />

                     {/* <div className="tw-flex">
                     <FormSelectValue label="Борлуулалтын жил сонгох" width={120} options={last3years} value={member.sales_year} keyName="sales_year" index={i} setter={handleInput} classAppend="tw-mr-8" />

                     <FormInline label="Аж ахуйн нэгжийн борлуулалт" type="numberFormat" formats={{ prefix: '₮ ', decimalScale: 2, thousandSeparator: true }} value={member.sales_amount} name="sales_amount" index={i} setter={handleInputFormat} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" />
                  </div> */}

                     <div className="md:tw-col-span-2 tw-pl-3 tw-pt-5 tw-pb-2">
                        <table className="">
                           <thead>
                              <tr>
                                 <th className={tableCellClass}></th>
                                 {years.map(year =>
                                    <th className={`${tableCellClass} tw-py-2 tw-font-medium tw-text-center`} key={year}>
                                       {year}
                                    </th>
                                 )}
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td className={tableCellClass}>
                                    Аж ахуйн нэгжийн борлуулалт
                                 </td>
                                 {years.map(year =>
                                    <td className={tableCellClass} key={year}>
                                       <NumberFormat className={`${tableInputClass} ${validate && checkInvalid(member.sales[year]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'} tw-transition-colors`} prefix="₮ " decimalScale={2} thousandSeparator value={member.sales[year]} onValueChange={values => handleInputSales(year, values.floatValue, i)} />
                                    </td>
                                 )}
                              </tr>
                           </tbody>
                        </table>
                     </div>

                     <FormInline label="Гүйцэтгэх захирлын нэр" value={member.director_name} name="director_name" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(member.director_name)} />

                     <FormInline label="Гүйцэтгэх захирлын утасны дугаар" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={member.director_phone} name="director_phone" index={i} setter={handleInputFormatted} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(member.director_phone)} />

                     <FormInline label="Гүйцэтгэх захирлын имэйл" type="email" value={member.director_email} name="director_email" index={i} setter={handleInput} validate classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(member.director_email)} />
                  </div>
               </ExpandableContainer>

               <div className="tw-flex tw-items-center">
                  <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
               </div>
            </div>
         )}

         <div className="tw-flex tw-justify-end tw-items-center">
            <span className="tw-italic tw-text-gray-500 tw-text-xs">
               Гишүүн байгууллага нэмэх
            </span>
            <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2 tw-ml-1 tw-my-0.5" classButton={`tw-text-green-500 active:tw-text-green-600`} />
         </div>

         <div className="tw-p-3 tw-pl-5">
            <div className="tw-flex tw-items-center">
               Кластерын гишүүдийн нийт борлуулалт
               <HelpPopup classAppend="tw-ml-2" main="Тэргүүлэх ААН-ийг оролцуулаад сүүлийн жилээр тооцон оруулна уу." />
            </div>
            <NumberFormat className={`${basicInputClass} tw-mt-2 tw-py-1.5 ${validate && checkInvalid(netSales) && 'tw-border-red-500'}`} prefix="₮ " decimalScale={2} thousandSeparator value={netSales} onValueChange={values => setNetSales(values.floatValue ?? null)} />
         </div>

         <div className="tw-flex tw-justify-end">
            <SaveButton buttonAppend="tw-m-6" onClick={handleSubmit} />
         </div>
      </div>
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
               <animated.div className="tw-absolute tw-left-3 tw-z-10 tw-bg-white tw-text-sm tw-rounded tw-shadow-sm tw-border tw-border-gray-500 tw-divide-y tw-divide-dashed tw-overflow-y-auto tw-max-h-48" style={{ ...anims, top: 72, width: width }} ref={selectRef}>
                  {options.map((option, i) =>
                     <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-600 hover:tw-text-gray-50 tw-text-13px tw-transition-colors tw-cursor-pointer' onMouseDown={() => handleSelect(option)} key={i}>
                        {option}
                     </div>
                  )}
               </animated.div>
            )}
         </Transition>
      </div>
   )
}

export const checkInvalid = (value, type) => {
   switch (value) {
      case null:
         return true
      case '':
         return true
      case '<p><br></p>':
         if (type === 'quill') return true
         else return false
      default:
         return false
   }
}

export function ExpandableContainer({ order, label, children, placeholder, initialized, classAppend }) {
   const [open, setOpen] = useState(true)

   return (
      <div className={classAppend}>
         <div className="tw-inline-flex tw-items-center tw-cursor-pointer tw-pl-2 tw-py-2 tw-text-sm hover:tw-underline" onClick={() => setOpen(prev => !prev)}>
            <ChevronDownSVG className={`tw-w-4 tw-h-4 tw-transform-gpu ${!open && 'tw--rotate-90'} tw-transition-transform`} />
            <span className="tw-ml-1 tw-mr-1.5 tw-text-blue-500 tw-font-medium">{order}.</span>
            <span className="tw-pr-3">{label || placeholder}</span>
         </div>
         <Transition
            items={open}
            from={{ height: 0 }}
            enter={{ height: 'auto' }}
            leave={{ height: 0 }}
            initial={!initialized ? { height: 'auto' } : { height: 0 }}
         >
            {item => item && (anims =>
               <animated.div className="tw-overflow-hidden" style={anims}>
                  {children}
               </animated.div>
            )}
         </Transition>
      </div >
   )
}
