import HelpPopup from 'components/help_popup/helpPopup'
import FormInline from 'components/urgudul_components/formInline'
import AlertContext from 'components/utilities/alertContext'
import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext } from 'react'
import { useState } from 'react'
import { containerClass, UrgudulHeader } from './1st'

const thisYear = new Date().getFullYear()
const yearsArr = [thisYear - 3, thisYear - 2, thisYear - 1]
const yearObj = yearsArr.reduce((acc, cv) => ({ ...acc, [cv]: null }), {})

const initialSales = {
   annual_sales: {
      ...yearObj,
   },
   annual_export: {
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
      nextKey[year] = value
      return { ...prev, [key]: nextKey }
   })

   const [infos, setInfos] = useState(initialInfos)

   const handleInputInfos = (key, value) => setInfos(prev => ({ ...prev, [key]: value }))

   const handleInputFormattedInfos = (key, values) => setInfos(prev => ({ ...prev, [key]: values.formattedValue }))

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)

   const isCluster = true

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Өргөдөл гаргагч"
            project_number={UrgudulCtx.data.project_number}
            HelpPopup={isCluster && <HelpPopup classAppend="tw-mx-2" main="Кластерын хувьд тэргүүлэх аж ахуйн нэгжийн хувьд бөглөнө үү." />}
         />

         <div className="tw-pb-4">
            <div className="tw-p-2 tw-text-sm">
               Борлуулалт болон Экпортын хэмжээ
            </div>

            <table className="tw-ml-4">
               <thead>
                  <tr>
                     <th className={tableCellClass}></th>
                     {yearsArr.map(year =>
                        <th className={tableCellClass} key={year}>
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
                     {yearsArr.map(year =>
                        <td className={tableCellClass}>
                           <input className={tableInputClass} type="number" value={sales.annual_sales[year]} onChange={e => handleInputSales('annual_sales', year, e.target.value)} />
                        </td>
                     )}
                  </tr>
                  <tr>
                     <td className={tableCellClass}>
                        Жилийн экспортын хэмжээ
                     </td>
                     {yearsArr.map(year =>
                        <td className={tableCellClass}>
                           <input className={tableInputClass} type="number" value={sales.annual_export[year]} onChange={e => handleInputSales('annual_export', year, e.target.value)} />
                        </td>
                     )}
                  </tr>
               </tbody>
            </table>
         </div>

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
            <FormInline label="Албан газрын утасны дугаар" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={infos.company_phone || ''} name="company_phone" setter={handleInputFormattedInfos} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-40" />

            <FormInline label="Вэбсайт" value={infos.company_website || ''} name="company_website" setter={handleInputInfos} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" />

            <FormInline label="Албан ёсны хаяг" value={infos.company_address || ''} name="company_address" setter={handleInputInfos} classAppend="tw-w-full tw-max-w-md" classInput="tw-w-full" />
         </div>
      </div>
   )
}

const tableCellClass = 'tw-border tw-px-2'
const tableInputClass = 'tw-outline-none tw-py-1 tw-px-2 tw-my-1 tw-text-right tw-rounded-none tw-border-b tw-border-transparent focus:tw-border-gray-700'
