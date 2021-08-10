import HelpPopup from 'components/help_popup/helpPopup'
import FormInline from 'components/urgudul_components/formInline'
import AlertContext from 'components/utilities/alertContext'
import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext, useEffect, useState } from 'react'
import { containerClass, UrgudulHeader, SaveButton, checkInvalid } from './page1'
import NumberFormat from 'react-number-format'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router-dom'

const thisYear = new Date().getFullYear()
export const yearsArr = [thisYear - 3, thisYear - 2, thisYear - 1]
export const yearObj = yearsArr.reduce((acc, cv) => ({ ...acc, [cv]: null }), {})

const initialSales = {
   net: {
      ...yearObj,
   },
   export: {
      ...yearObj,
   }
}

const initialInfos = {
   company_phone: null,
   company_website: null,
   company_address: null,
}

export default function UrgudulPage2() {
   const [sales, setSales] = useState(initialSales)

   const handleInputSales = (key, year, value) => setSales(prev => {
      const nextKey = { ...prev[key] }
      nextKey[year] = value ?? null
      return { ...prev, [key]: nextKey }
   })

   const [years, setYears] = useState(yearsArr)
   const [infos, setInfos] = useState(initialInfos)
   const [validate, setValidate] = useState(false)

   const handleInputInfos = (key, value) => setInfos(prev => ({ ...prev, [key]: value }))

   const handleInputFormattedInfos = (key, values) => setInfos(prev => ({ ...prev, [key]: values.formattedValue }))

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)
   const history = useHistory()

   const projectId = UrgudulCtx.data.id
   const isCluster = UrgudulCtx.data.project_type === 1

   useEffect(() => {
      const value = UrgudulCtx.data.salesData
      if (value !== null && value !== undefined && Object.keys(value.net).length !== 0) {
         setSales(value)
         setYears(Object.keys(value.net).sort())
      }

      const temp = {}
      Object.keys(initialInfos).forEach(key => {
         const value = UrgudulCtx.data[key]
         if (value !== undefined && value !== null) {
            temp[key] = value
         }
      })
      setInfos(prev => ({ ...prev, ...temp }))
   }, [projectId])

   const handleSubmit = () => {
      setValidate(true)
      let allValid = true
      Object.values(sales).forEach(obj => {
         allValid = allValid && Object.values(obj).every(val => !checkInvalid(val))
      })
      allValid = allValid && Object.keys(initialInfos).every(key => !checkInvalid(infos[key]))
      if (!allValid) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      if (projectId === undefined || projectId === null) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
         history.push('/urgudul/1')
      }
      axios.put(`projects/${projectId}`, { salesData: sales, ...infos }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийг хадгаллаа.' })
         history('/urgudul/3')
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
      })
   }

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Өргөдөл гаргагчийн мэдээлэл"
            projectNumber={UrgudulCtx.data.project_number}
            HelpPopup={isCluster && <HelpPopup classAppend="tw-mx-2" main="Кластерын хувьд тэргүүлэх аж ахуйн нэгжийн хувьд бөглөнө үү." />}
         />

         <div className="tw-pb-4 tw-pl-2.5 tw-pr-2">
            <div className="tw-p-2 tw-mt-2 tw-text-sm">
               Борлуулалт болон экпортын хэмжээ
            </div>

            <table className="tw-ml-2">
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
                        Жилийн борлуулалтын хэмжээ
                     </td>
                     {years.map(year =>
                        <td className={tableCellClass} key={year}>
                           <NumberFormat className={`${tableInputClass} ${validate && checkInvalid(sales.net?.[year]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'} tw-transition-colors`} prefix="₮ " decimalScale={2} thousandSeparator value={sales.net?.[year]} onValueChange={values => handleInputSales('net', year, values.floatValue)} />
                        </td>
                     )}
                  </tr>
                  <tr>
                     <td className={tableCellClass}>
                        Жилийн экспортын хэмжээ
                     </td>
                     {yearsArr.map(year =>
                        <td className={tableCellClass} key={year}>
                           <NumberFormat className={`${tableInputClass} ${validate && checkInvalid(sales.export?.[year]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'} tw-transition-colors`} prefix="₮ " decimalScale={2} thousandSeparator value={sales.export?.[year]} onValueChange={values => handleInputSales('export', year, values.floatValue)} />
                        </td>
                     )}
                  </tr>
               </tbody>
            </table>
         </div>

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-px-2">
            <FormInline label="Албан газрын утасны дугаар" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={infos.company_phone} name="company_phone" setter={handleInputFormattedInfos} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" invalid={validate && checkInvalid(infos.company_phone)} />

            <FormInline label="Вэбсайт" value={infos.company_website} name="company_website" setter={handleInputInfos} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(infos.company_website)} />

            <FormInline label="Албан ёсны хаяг" value={infos.company_address} name="company_address" setter={handleInputInfos} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" invalid={validate && checkInvalid(infos.company_address)} />
         </div>

         <div className="tw-flex tw-justify-end">
            <SaveButton buttonAppend="tw-m-6" onClick={handleSubmit} />
         </div>
      </div>
   )
}

export const tableCellClass = 'tw-border tw-border-gray-300 tw-px-2'
export const tableInputClass = 'focus:tw-outline-none tw-py-1 tw-px-2 tw-my-1 tw-text-right tw-rounded-sm tw-w-32'
