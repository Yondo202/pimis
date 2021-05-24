import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import ArrowSVG from 'assets/svgComponents/arrowSVG'
import PenAltSVG from 'assets/svgComponents/penAltSVG'

export default function FeedbackQuestionnaireHandle() {
   const [questionnaire, setQuestionnaire] = useState([])

   const [categoryInput, setCategoryInput] = useState('')
   const [descriptionInput, setDescriptionInput] = useState('')

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      axios.get('trainings/questionnaire', {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         console.log(res)
         setQuestionnaire(res.data.data)
      }).catch(err => {
         console.error(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Асуумжуудыг татаж чадсангүй.' })
      })
   }, [])

   const categories = new Set()
   for (const question of questionnaire) {
      categories.add(question.category)
   }
   if (categories.has('Бичвэр')) categories.delete('Бичвэр')
   const categroiesArr = [...categories].sort((a, b) => {
      const orderA = questionnaire.find(question => question.category === a).category_order
      const orderB = questionnaire.find(question => question.category === b).category_order
      return orderA - orderB
   })
   categroiesArr.push('Бичвэр')

   const maxCategoryOrder = questionnaire.reduce((acc, cv) => acc = Math.max(acc, cv.category_order), 0)

   const handleSubmit = () => {
      axios.post('trainings/questionnaire', questionnaire, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         console.log(res)
         setQuestionnaire(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Үнэлгээний асуумжуудыг хадгаллаа.' })
      }).catch(err => {
         console.error(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Үнэлгээний асуумжуудыг хадгалж чадсангүй.' })
      })
   }

   const handleAddCategory = () => {
      if (categroiesArr.includes(categoryInput)) {
         return AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Ангилал давхцаж байна.' })
      }
      if (categoryInput === '' || descriptionInput === '') {
         return AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбар хоосон байна.' })
      }

      setQuestionnaire(prev => [...prev, {
         category_order: maxCategoryOrder + 1,
         description_order: 1,
         category: categoryInput,
         description: descriptionInput,
      }])

      setCategoryInput('')
      setDescriptionInput('')
   }

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-pb-10 tw-w-full">
         <div className="tw-mt-8 tw-p-4 tw-bg-white tw-rounded tw-shadow-md tw-max-w-5xl tw-w-full">
            <div className="tw-text-lg tw-font-medium tw-p-2 tw-text-center tw-mt-4 tw-mb-6">
               Сургалтын үнэлгээний асуумж тохируулах
            </div>

            {categroiesArr.map((category, i) =>
               <Category questionnaire={questionnaire.filter(question => question.category === category)} setQuestionnaire={setQuestionnaire} AlertCtx={AlertCtx} key={category} maxCategoryOrder={maxCategoryOrder} index={i} />
            )}

            <div className="tw-mt-4 tw-text-13px">
               <div className="tw-flex tw-items-center tw-py-1">
                  <span className="tw-font-medium tw-mr-2 tw-text-sm">Ангилал: </span>
                  <input className={`${inputClass} tw-mr-3`} style={inputStyle} value={categoryInput} onChange={e => setCategoryInput(e.target.value)} />
               </div>

               <div className="tw-flex tw-items-center tw-py-1 tw-ml-4 tw-mr-2 tw-mt-0.5">
                  <span className="tw-font-medium tw-mr-2">Асуумж:</span>
                  <input className={`${inputClass} tw-max-w-lg tw-mr-3`} value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)} />
                  <button className="tw-ml-auto tw-py-1 tw-px-2 focus:tw-outline-none tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-rounded hover:tw-shadow-md tw-text-white tw-tracking-wide" onClick={handleAddCategory}>
                     Ангилал нэмэх
                  </button>
               </div>
            </div>

            <div className="tw-flex tw-justify-center">
               <button className="tw-py-1.5 tw-px-8 tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-10 tw-mb-6" onClick={handleSubmit}>
                  Хадгалах
               </button>
            </div>
         </div>
      </div>
   )
}

const Category = ({ questionnaire, setQuestionnaire, AlertCtx, maxCategoryOrder, index }) => {
   const [categoryEdit, setCategoryEdit] = useState('')
   const [categoryEditing, setCategoryEditing] = useState(false)

   const [descriptionInput, setDescriptionInput] = useState('')

   const category = questionnaire[0]?.category
   const categoryOrder = questionnaire[0]?.category_order
   const maxDescriptionOrder = questionnaire.reduce((acc, cv) => acc = Math.max(acc, cv.description_order), 0)

   const handleAddDescription = () => {
      if (questionnaire.findIndex(question => question.description === descriptionInput) !== -1) {
         return AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Асуумж давхцаж байна.' })
      }
      if (descriptionInput === '') {
         return AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбар хоосон байна.' })
      }

      setQuestionnaire(prev => {
         if (questionnaire.length === 0) {
            return [...prev, {
               category_order: maxCategoryOrder + 1,
               description_order: 1,
               category: 'Бичвэр',
               description: descriptionInput,
            }]
         } else {
            return [...prev, {
               category_order: categoryOrder,
               description_order: maxDescriptionOrder + 1,
               category: category,
               description: descriptionInput,
            }]
         }
      })

      setDescriptionInput('')
   }

   const handleRemoveDescription = (desc) => {
      const newQuestionnaire = questionnaire.filter(question => question.description !== desc)

      if (newQuestionnaire.length === 0) {
         setQuestionnaire(prev => {
            return sortQuestionnaire(prev.filter(question => question.category !== category))
         })
      }

      let i = 1
      const orderedQuestionnaire = []
      for (const question of newQuestionnaire) {
         orderedQuestionnaire.push({ ...question, description_order: i })
         i++
      }

      setQuestionnaire(prev => {
         const newPrev = prev.filter(question => question.category !== category)
         return [...newPrev, ...orderedQuestionnaire]
      })
   }

   let isTextCategory = false
   if (questionnaire.length === 0) isTextCategory = true
   if (category === 'Бичвэр') isTextCategory = true

   const handleChangeCategory = (catOrder, value) => {
      setQuestionnaire(prev => {
         const newPrev = [...prev]
         let i = 0
         for (const question of newPrev) {
            if (question.category_order === catOrder) {
               newPrev[i].category = value
            }
            i++
         }
         return newPrev
      })
   }

   const handleFocusCategory = () => {
      setCategoryEdit(category)
      setCategoryEditing(true)
   }

   const handleBlurCategory = () => {
      handleChangeCategory(categoryOrder, categoryEdit)
      setCategoryEditing(false)
      setCategoryEdit('')
   }

   const handleChangeDescription = (descOrder, value) => {
      setQuestionnaire(prev => {
         const index = prev.findIndex(question => question.category_order === categoryOrder && question.description_order === descOrder)
         const newPrev = [...prev]
         newPrev[index].description = value
         return newPrev
      })
   }

   const moveOrderCategory = (direction) => {
      if (direction === 'up') {
         if (categoryOrder === 1) return
         setQuestionnaire(prev => {
            const next = [...prev]
            let i = 0
            for (const question of next) {
               if (question.category_order === categoryOrder) {
                  next[i].category_order = categoryOrder - 1
               } else if (question.category_order === categoryOrder - 1) {
                  next[i].category_order = categoryOrder
               }
               i++
            }
            return next
         })
      } else if (direction === 'down') {
         if (categoryOrder === maxCategoryOrder) return
         setQuestionnaire(prev => {
            return prev
         })
      }
   }

   const moveOrderDescription = (descOrder, direction) => {
      if (direction === 'up') {
         if (descOrder === 1) return
         setQuestionnaire(prev => {
            const indexUp = prev.findIndex(question => question.category_order === categoryOrder && question.description_order === descOrder - 1)
            const descUp = prev[indexUp].description
            const indexSelf = prev.findIndex(question => question.category_order === categoryOrder && question.description_order === descOrder)
            const descSelf = prev[indexSelf].description
            const next = [...prev]
            prev[indexUp].description = descSelf
            prev[indexSelf].description = descUp
            return next
         })
      } else if (direction === 'down') {
         if (descOrder === maxDescriptionOrder) return
         setQuestionnaire(prev => {
            return prev
         })
      }
   }

   return (
      <div className="tw-font-medium tw-mt-2 tw-text-13px">
         <div className="tw-py-1 tw-text-sm">
            {questionnaire.length === 0 || category === 'Бичвэр'
               ? `${index + 1}. Бичвэр`
               : <span className="tw-flex tw-items-center">
                  {index + 1}.
                  {categoryEditing
                     ? <input className={`${inputClass} tw-ml-2`} style={inputStyle} value={categoryEdit} onChange={e => setCategoryEdit(e.target.value)} onBlur={handleBlurCategory} autoFocus />
                     : <>
                        <span className="tw-ml-2">{category}</span>
                        <span className="tw-flex tw-items-center tw-ml-auto" style={{ marginRight: 68 }}>
                           <PenAltSVG className="tw-w-5 tw-h-5 tw-m-0.5 tw-cursor-pointer active:tw-text-gray-900 tw-transition-colors" onClick={handleFocusCategory} />
                           <ArrowSVG className={`${arrowClass} tw-rotate-90`} onClick={() => moveOrderCategory('down')} />
                           <ArrowSVG className={`${arrowClass} tw--rotate-90`} onClick={() => moveOrderCategory('up')} />
                        </span>
                     </>
                  }
               </span>
            }
         </div>
         {questionnaire.length === 0
            ? <div className="tw-italic tw-ml-4 tw-pl-2 tw-text-gray-500 tw-py-1">
               Бичвэр асуумж байхгүй байна.
            </div>
            : questionnaire.map((question, i) =>
               <div className="tw-ml-4 tw-mr-2 tw-flex tw-items-center tw-justify-between tw-py-1" key={i}>
                  <span className="tw-flex tw-items-center tw-flex-grow">
                     {i + 1}.
                     <EditableInput question={question} handleChangeDescription={handleChangeDescription} />
                  </span>
                  <ArrowSVG className={`${arrowClass} tw-rotate-90`} onClick={() => moveOrderDescription(question.description_order, 'down')} />
                  <ArrowSVG className={`${arrowClass} tw--rotate-90`} onClick={() => moveOrderDescription(question.description_order, 'up')} />
                  <button className="focus:tw-outline-none tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-rounded hover:tw-shadow-md tw-px-2 tw-py-0.5 tw-text-white tw-tracking-wide tw-ml-1.5" onClick={() => handleRemoveDescription(question.description)}>
                     Хасах
                  </button>
               </div>
            )}
         <div className="tw-ml-4 tw-mr-2 tw-flex tw-items-center tw-justify-between tw-py-1">
            <input className={`${inputClass} tw-max-w-xl tw-ml-5 tw-mr-3`} type="text" value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)} />
            <button className="focus:tw-outline-none tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-rounded hover:tw-shadow-md tw-px-2 tw-py-0.5 tw-text-white tw-tracking-wide" onClick={handleAddDescription}>
               Асуумж нэмэх
            </button>
         </div>
      </div>
   )
}

const inputClass = 'focus:tw-outline-none tw-px-2 tw-py-1 tw-border tw-border-gray-400 tw-rounded tw-flex-grow focus:tw-ring-2 tw-ring-blue-400 tw-transition-colors tw-font-medium'
const inputStyle = { maxWidth: 200 }
const arrowClass = 'tw-w-4 tw-h-4 tw-transform-gpu tw-cursor-pointer tw-m-0.5 active:tw-text-gray-900 tw-transition-colors'

const EditableInput = ({ question, handleChangeDescription }) => {
   const [inputEdit, setInputEdit] = useState('')
   const [inputEditting, setInputEditting] = useState(false)

   const handleFocus = () => {
      setInputEdit(question.description)
      setInputEditting(true)
   }

   const handleBlur = () => {
      handleChangeDescription(question.description_order, inputEdit)
      setInputEditting(false)
      setInputEdit('')
   }

   return (inputEditting
      ? <input className={`${inputClass} tw-max-w-xl tw-ml-2 tw-mr-3`} value={inputEdit} onChange={e => setInputEdit(e.target.value)} onBlur={handleBlur} autoFocus />
      : <>
         <span className="tw-ml-2">{question.description}</span>
         <PenAltSVG className="tw-w-5 tw-h-5 tw-m-0.5 tw-ml-auto tw-cursor-pointer active:tw-text-gray-900 tw-transition-colors" onClick={handleFocus} />
      </>
   )
}

function sortQuestionnaire(body) {
   const questionnaireWithoutText = body.filter(question => question.category !== 'Бичвэр')
   const questionnaireText = body.filter(question => question.category === 'Бичвэр')

   questionnaireWithoutText.sort((a, b) => {
      if (a.category_order === b.category_order) {
         return a.description_order - b.description_order
      } else {
         return a.category_order - b.category_order
      }
   })

   questionnaireText.sort((a, b) => {
      return a.description_order - b.description_order
   })

   const questionnaire = [...questionnaireWithoutText, ...questionnaireText]

   let i = 0
   let j = 0
   let category
   for (const [index, question] of questionnaire.entries()) {
      if (category !== question.category) {
         category = question.category
         i++
         j = 1
      } else {
         j++
      }

      questionnaire[index].category_order = i
      questionnaire[index].description_order = j
   }

   return questionnaire
}
