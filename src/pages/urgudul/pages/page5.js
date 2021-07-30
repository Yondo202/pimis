import React, { useContext, useEffect, useRef, useState, Fragment } from 'react'
import HelpPopup from 'components/help_popup/helpPopup'
import axios from 'axiosbase'
import SearchSelectCompact from 'components/urgudul_components/searchSelectCompact'
import NumberFormat from 'react-number-format'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import TreeSelectCompact from 'components/urgudul_components/treeSelectCompact'
import { SaveButton, UrgudulHeader } from './page1'

const year = new Date().getFullYear()
const baseYear = 2016

const dates = Array.from({ length: year + 3 - baseYear + 1 }, (x, i) => baseYear + i)

const datesObj = dates.reduce((a, c) => ({ ...a, [c]: null }), {})

const initialState = {
   sales: {
      ...datesObj
   },
   fullTime_workplace: {
      ...datesObj
   },
   export_details: [
      {
         countryId: null,
         export_products: [
            {
               ...datesObj,
               productId: null,
               product_name: null,
            },
         ],
      },
   ],
}

function UrgudulPage5() {
   const [form, setForm] = useState(initialState)

   const UrgudulCtx = useContext(UrgudulContext)
   const isCluster = UrgudulCtx.data.project_type === 1

   useEffect(() => {
      if (UrgudulCtx.data.id !== undefined) {
         const exportDatas = UrgudulCtx.data.exportDatas
         if (Object.keys(exportDatas || []).length > 0) {
            setForm(exportDatas)
         } else {
            setForm(form)
         }
      }
   }, [UrgudulCtx.data.id])

   const handleInput = (key, value, objName) => {
      setForm({ ...form, [objName]: { ...form[objName], [key]: value ?? null } })
   }

   const handleSetFormCountry = (key, value, index) => {
      const newArr = form.export_details
      newArr[index].countryId = value
      setForm({ ...form, export_details: newArr })
   }

   const handleSetFormProduct = (key, value, productIndex, countryIndex) => {
      const newArr = form.export_details
      newArr[countryIndex].export_products[productIndex][key] = value ?? null
      setForm({ ...form, export_details: newArr })
   }

   const [countries, setCounties] = useState([])
   const [products, setProducts] = useState([])

   useEffect(() => {
      axios.get('countries').then(res => {
         setCounties(res.data.data)
      })

      axios.get('products').then(res => {
         setProducts(res.data.data.docs)
      })
   }, [])

   const datesForm = Object.keys(form.sales).sort()
   const datesFormObj = datesForm.reduce((a, c) => ({ ...a, [c]: null }), {})

   const handleAddCountry = () => {
      const newCountry = {
         countryId: null,
         export_products: [
            {
               ...datesFormObj,
               productId: null,
               product_name: null,
            },
         ],
      }
      setForm({ ...form, export_details: [...form.export_details, newCountry] })
   }

   const handleRemoveCountry = (countryIndex) => {
      setForm({ ...form, export_details: form.export_details.filter((_, i) => i !== countryIndex) })
   }

   const handleAddProduct = (countryIndex) => {
      const newCountries = form.export_details
      const newProducts = form.export_details[countryIndex].export_products
      const newProduct = {
         ...datesFormObj,
         productId: null,
         product_name: null,
      }
      newCountries[countryIndex].export_products = [...newProducts, newProduct]
      setForm({ ...form, export_details: newCountries })
   }

   const handleRemoveProduct = (productIndex, countryIndex) => {
      const newCountries = form.export_details
      const newProducts = form.export_details[countryIndex].export_products
      newCountries[countryIndex].export_products = newProducts.filter((_, i) => i !== productIndex)
      setForm({ ...form, export_details: newCountries })
   }

   const exportSums = { ...datesFormObj }

   for (const country of form.export_details) {
      for (const product of country.export_products) {
         Object.keys(exportSums).forEach(key => {
            exportSums[key] = +exportSums[key] + +product[key]
         })
      }
   }

   const AlertCtx = useContext(AlertContext)

   const history = useHistory()

   const handleSubmit = () => {
      setValidate(true)
      let allValid = true
      const arr = ['sales', 'fullTime_workplace']
      arr.forEach(key => {
         allValid = allValid && datesForm.every(item => !checkInvalid(form[key][item]))
      })
      for (const country of form.export_details) {
         allValid = allValid && country.countryId
         for (const product of country.export_products) {
            allValid = allValid && datesForm.every(item => !checkInvalid(product[item]))
         }
      }
      Object.keys(exportSums).forEach(key => allValid = allValid && !isNaN(exportSums[key]))

      if (UrgudulCtx.data.id) {
         if (allValid) {
            axios.put(`projects/${UrgudulCtx.data.id}`, { exportDatas: form }, {
               headers: { 'Authorization': getLoggedUserToken() }
            }).then(res => {
               UrgudulCtx.setData({ ...UrgudulCtx.data, ...res.data.data })
               AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Экспортын мэдээлэллийг хадгаллаа.' })
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

   const containerRef = useRef()

   return (
      <div className="tw-flex tw-justify-center tw-w-full tw-px-4">
         <div className="tw-mt-8 tw-mb-70 tw-rounded-lg tw-shadow-md tw-border-t tw-border-gray-100 tw-bg-white tw-max-w-full">
            <UrgudulHeader
               label="Экспортын мэдээлэл"
               projectNumber={UrgudulCtx.data.project_number}
               HelpPopup={isCluster && <HelpPopup classAppend="tw-mx-2" main="Хэрэв кластер бол кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." />}
            />

            <div className="tw-text-sm tw-overflow-x-auto tw-overflow-y-hidden tw-mx-auto" ref={containerRef}>
               <table className="tw-mx-1.5 tw-text-13px">
                  <thead>
                     <tr className="tw-h-9">
                        <th className="tw-border tw-border-gray-300 tw-text-center"></th>
                        <th className="tw-border tw-border-gray-300 tw-text-center tw-px-1">Нэгж</th>
                        {datesForm.map(date => <th className="tw-border tw-border-gray-300 tw-text-center" key={date}>
                           {date}
                        </th>
                        )}
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="tw-h-9">
                        <td className="tw-border tw-border-gray-300 tw-pl-2 tw-pr-1">
                           Нийт борлуулалт
                        </td>
                        <td className="tw-border tw-border-gray-300 tw-text-center">₮</td>
                        {datesForm.map((item, i) =>
                           <td className="tw-border tw-border-gray-300 tw-px-1" key={i}>
                              <div className="tw-flex tw-justify-center">
                                 <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(form.sales[item]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={form.sales[item]} thousandSeparator={true} onValueChange={values => handleInput(item, values.floatValue, 'sales')} />
                              </div>
                           </td>
                        )}
                     </tr>
                     <tr className="tw-h-9">
                        <td className="tw-border tw-border-gray-300 tw-px-1">
                           <div className="tw-flex tw-justify-between tw-items-center">
                              <span className="pl-1">Ажилчдын тоо</span>
                              <HelpPopup classAppend="tw-ml-2" main="НДШ төлдөг бүтэн цагийн ажилчдын тоо." />
                           </div>
                        </td>
                        <td className="tw-border tw-border-gray-300 tw-truncate tw-text-center">Т/х</td>
                        {datesForm.map((item, i) =>
                           <td className="tw-border tw-border-gray-300 tw-px-1" key={i}>
                              <div className="tw-flex tw-justify-center">
                                 <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(form.fullTime_workplace[item]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={form.fullTime_workplace[item]} thousandSeparator={true} onValueChange={values => handleInput(item, values.floatValue, 'fullTime_workplace')} />
                              </div>
                           </td>
                        )}
                     </tr>
                     <tr className="tw-h-9">
                        <td className="tw-border tw-border-gray-300 tw-px-1">
                           <div className="tw-flex tw-justify-between tw-items-center">
                              <span className="pl-1">Экспортын нийт борлуулалт</span>
                              <HelpPopup classAppend="tw-ml-2" main="Экспортын тооцоог доорх хүснэгтэнд экспорт хийсэн улс болон бүтээгдхүүнээр задлан бичнэ үү." />
                           </div>
                        </td>
                        <td className="tw-border tw-border-gray-300 tw-truncate tw-text-center">₮</td>
                        {datesForm.map((item, i) =>
                           <td className="tw-border tw-border-gray-300 tw-px-1" key={i}>
                              <div className="tw-text-right tw-font-medium tw-truncate tw-w-20 tw-px-1 tw-py-0.5 tw-rounded">
                                 {exportSums[item] !== 0 && !isNaN(exportSums[item]) && exportSums[item]?.toLocaleString()}
                              </div>
                           </td>
                        )}
                     </tr>
                     {form.export_details.map((country, i) =>
                        <Fragment key={i}>
                           <tr className="tw-h-9">
                              <td className="tw-border tw-border-gray-300 tw-px-1" style={{ maxWidth: 213.8 }}>
                                 <SearchSelectCompact placeholder="Экспорт хийсэн улс" data={countries} value={country.countryId} name="countryId" index={i} displayName="description_mon" setter={handleSetFormCountry} classDiv={validate && checkInvalid(country.countryId) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'} classInput="tw-bg-transparent" selectWidth={containerRef.current?.getBoundingClientRect().width > 220 ? 220 : containerRef.current?.getBoundingClientRect().width - 54} />
                              </td>
                              <td className="tw-border tw-border-gray-300 tw-px-1" colSpan={datesForm.length + 1}>
                                 <button className="tw-float-right tw-bg-blue-800 tw-text-white tw-text-xs tw-rounded focus:tw-outline-none active:tw-bg-blue-600 tw-transition-colors tw-py-1 tw-px-4" onClick={() => handleRemoveCountry(i)}>
                                    Улсыг хасах
                                 </button>
                              </td>
                           </tr>
                           {country.export_products.map((product, j) =>
                              <Fragment key={j}>
                                 <tr className="tw-h-9">
                                    <td className="tw-border tw-border-gray-300 tw-px-1" style={{ maxWidth: 213.8 }}>
                                       <TreeSelectCompact data={products} placeholder="Бүтээгдэхүүний ангилал" displayName="description_mon" value={product.productId} name="productId" index={j} index1={i} setter={handleSetFormProduct} selectWidth={containerRef.current?.getBoundingClientRect().width - 36} validate={validate && checkInvalid(product.productId)} classAppend="tw-ml-2" />
                                    </td>
                                    <td className="tw-border tw-border-gray-300 tw-px-1" colSpan={datesForm.length + 1}>
                                       <button className="tw-float-right tw-bg-blue-800 tw-text-white tw-text-xs tw-rounded focus:tw-outline-none active:tw-bg-blue-600 tw-transition-colors tw-py-1 tw-px-2" onClick={() => handleRemoveProduct(j, i)}>
                                          Бүтээгдэхүүнийг хасах
                                       </button>
                                    </td>
                                 </tr>
                                 <tr className="tw-h-9">
                                    <td className="tw-border tw-border-gray-300 tw-px-1">
                                       <div className="tw-flex tw-items-center">
                                          <input className={`tw-text-13px tw-flex-grow focus:tw-outline-none tw-px-1.5 tw-py-1 tw-ml-4 tw-rounded ${validate && checkInvalid(product.product_name) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'} tw-placeholder-gray-500`} type="number" value={product.product_name || ''} onChange={e => handleSetFormProduct('product_name', e.target.value, j, i)} placeholder="HS код" title={product.product_name} />
                                       </div>
                                    </td>
                                    <td className="tw-border tw-border-gray-300 tw-truncate tw-text-center">₮</td>
                                    {datesForm.map((key, k) =>
                                       <td className="tw-border tw-border-gray-300 tw-px-1" key={k}>
                                          <div className="tw-flex tw-justify-center">
                                             <NumberFormat className={`tw-px-1 tw-py-0.5 tw-outline-none tw-w-20 tw-rounded tw-text-right ${validate && checkInvalid(product[key]) ? 'tw-bg-red-100' : 'tw-bg-indigo-50'}`} value={product[key]} thousandSeparator={true} onValueChange={values => handleSetFormProduct(key, values.floatValue, j, i)} />
                                          </div>
                                       </td>
                                    )}
                                 </tr>
                              </Fragment>
                           )}
                           <tr className="tw-h-9">
                              <td className="tw-border tw-border-gray-300 tw-px-1" colSpan={datesForm.length + 2}>
                                 <button className="tw-float-left tw-bg-blue-800 tw-text-white tw-text-xs tw-rounded focus:tw-outline-none active:tw-bg-blue-600 tw-transition-colors tw-py-1 tw-px-2 tw-ml-4 tw-mr-2" onClick={() => handleAddProduct(i)}>
                                    Бүтээгдэхүүн нэмэх
                                 </button>
                              </td>
                           </tr>
                        </Fragment>
                     )}
                     <tr className="tw-h-9">
                        <td className="tw-border tw-border-gray-300 tw-px-1" colSpan={datesForm.length + 2}>
                           <button className="tw-float-left tw-bg-blue-800 tw-text-white tw-text-xs tw-rounded focus:tw-outline-none active:tw-bg-blue-600 tw-transition-colors tw-py-1 tw-px-4 tw-mr-2" onClick={handleAddCountry}>
                              Улс нэмэх
                           </button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div className="tw-flex tw-justify-center tw-py-8">
               <SaveButton onClick={handleSubmit} />
            </div>
         </div>
      </div>
   )
}

export default UrgudulPage5

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
