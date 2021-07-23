import React, { useState } from 'react'
import { containerClass, UrgudulHeader, SaveButton, StaticText } from './page1'
import FormOptions from 'components/urgudul_components/formOptions'
import FormRichText from 'components/urgudul_components/formRichText'
import FormInline from 'components/urgudul_components/formInline'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import { useContext } from 'react'
import UrgudulContext from 'components/utilities/urgudulContext'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import HelpPopup from 'components/help_popup/helpPopup'
import { checkInvalid, ExpandableContainer } from './page3'

export default function UrgudulPage6() {
   const [activities, setActivities] = useState(initialActivities)
   const [validate, setValidate] = useState(false)
   const [initialized, setInitialized] = useState(false)

   const handleInput = (key, value, index) => setActivities(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleInputFormat = (key, values, index) => setActivities(prev => {
      const next = [...prev]
      next[index][key] = values.floatValue ?? null
      return next
   })

   const handleRemove = (index) => setActivities(prev => prev.filter((_, i) => i !== index))

   const handleAdd = () => setActivities(prev => [...prev, {
      activityId: null,
      explanation: null,
      budget: null,
   }])

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)
   const history = useHistory()

   const projectId = UrgudulCtx.data.id

   useEffect(() => {
      const value = UrgudulCtx.data.activities
      if (value instanceof Array && value?.length) {
         setActivities(value)
      }
      setInitialized(true)
   }, [projectId])

   const handleSubmit = () => {
      setValidate(true)
      let allValid = true
      activities.forEach(activity => {
         allValid = allValid && Object.keys(initialActivities[0]).every(key => !checkInvalid(activity[key], key === 'explanation' && 'quill'))
      })
      if (!allValid) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      if (projectId === undefined || projectId === null) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
         history.push('/urgudul/1')
      }
      axios.put(`projects/${projectId}`, { activities: activities }, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийг хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
      })
   }

   const sumBudget = activities.reduce((acc, cv) => acc + +cv.budget, 0)

   const unconstrained = activities.every(activity => activity.activityId !== 1 && activity.activityId !== 2)

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Төлөвлөсөн үйл ажиллагаа, төсөв"
            HelpPopup={<HelpPopup classAppend="tw-mx-2" main="Дээд тал нь 5 үйл ажиллагаа сонгох боломжтой. Мөн экспорт хөгжлийн төлөвлөгөө, зах зээлийн судалгаа гэж сонгосон бол өөр үйл ажиллагаа нэмэх боломжгүй болно." />}
         />

         {activities.map((activity, i) =>
            <div className="tw-flex tw-px-2">
               <ExpandableContainer classAppend="tw-flex-grow" order={i + 1} label={activitiyOptions[activity.activityId - 1]} placeholder="Үйл ажиллагаа" initialized={initialized}>
                  <FormOptions options={activitiyOptions} values={Array.from({ length: 9 }, (_, i) => i + 1)} value={activity.activityId} name="activityId" index={i} setter={handleInput} invalid={validate && checkInvalid(activity.activityId)} />

                  <FormRichText
                     label="Тайлбар"
                     modules="small"
                     value={activity.explanation}
                     setter={handleInput}
                     name="explanation"
                     index={i}
                     classAppend="tw-pl-3"
                     invalid={validate && checkInvalid(activity.explanation, 'quill')}
                  />

                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                     <FormInline label="Үйл ажиллагааны төсөв" type="numberFormat" formats={{ prefix: '₮ ', decimalScale: 2, thousandSeparator: true }} value={activity.budget} name="budget" index={i} setter={handleInputFormat} invalid={validate && checkInvalid(activity.budget)} />

                     <StaticText label="Экспортыг дэмжих төслөөс санхүүжигдэх" text={isNaN(activity.budget) ? '0 ₮' : `${(activity.budget / 2).toLocaleString()} ₮`} />
                  </div>
               </ExpandableContainer>

               <div className="tw-flex tw-items-center">
                  <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
               </div>
            </div>
         )}

         {activities.length < 6 && unconstrained &&
            <div className="tw-flex tw-justify-end tw-items-center">
               <span className="tw-italic tw-text-gray-500 tw-text-xs">
                  Үйл ажиллагаа нэмэх
               </span>
               <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2 tw-ml-1" classButton={`tw-text-green-500 active:tw-text-green-600`} />
            </div>
         }

         <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-pr-10 tw-pl-2 tw-pb-2">
            <StaticText label="Нийт үйл ажиллагануудын төсөвт зардал" text={isNaN(sumBudget) ? '0 ₮' : `${sumBudget.toLocaleString()} ₮`} />

            <StaticText label="Нийт экспортыг дэмжих төслөөс хүсч буй санхүүжилт" text={isNaN(sumBudget) ? '0 ₮' : `${(sumBudget / 2).toLocaleString()} ₮`} />
         </div>

         <div className="tw-flex tw-justify-end">
            <SaveButton buttonAppend="tw-m-6" onClick={handleSubmit} />
         </div>
      </div>
   )
}

const initialActivities = [
   {
      activityId: null,
      explanation: null,
      budget: null,
   },
]

export const activitiyOptions = [
   'Экспорт хөгжлийн төлөвлөгөө',
   'Зах зээлийн судалгаа',
   'Вебсайт, брэндбүүк, сав баглаа боодол, каталог хөгжүүлэлт',
   'Сурталчилгааны эх бэлтгэл, видео сурталчилгаа, дуут сурталчилгаа бүтээх',
   'Сурталчилгаа цацах',
   'Үзэсгэлэн худалдаа',
   'ERP систем',
   'Чанарын удирдлага',
   'Бүтээгдэхүүн хөгжүүлэлт, шинэ загвар',
]
