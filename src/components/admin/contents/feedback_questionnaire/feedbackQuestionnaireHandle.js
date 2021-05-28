import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
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

   let category
   let categoryOrder
   const categoriesArr = []
   for (const question of questionnaire) {
      if (category !== question.category || categoryOrder !== question.category_order) {
         categoriesArr.push({
            category: question.category,
            categoryOrder: question.category_order,
         })
         category = question.category
         categoryOrder = question.category_order
      }
   }
   categoriesArr.sort((a, b) => a.categoryOrder - b.categoryOrder)

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
      if (categoriesArr.map(categoryObj => categoryObj.category !== 'Бичвэр' && categoryObj.category).includes(categoryInput)) {
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

            {categoriesArr.map((categoryObj, i) =>
               <Category questionnaire={questionnaire.filter(question => question.category === categoryObj.category && question.category_order === categoryObj.categoryOrder)} setQuestionnaire={setQuestionnaire} AlertCtx={AlertCtx} key={i} />
            )}

            <div className="tw-mt-4 tw-text-13px">
               <div className="tw-flex tw-items-center tw-py-1">
                  <span className="tw-font-medium tw-mr-2 tw-text-sm">Ангилал: </span>
                  <input className={`${inputClass} tw-mr-3 tw-flex-grow`} style={inputStyle} value={categoryInput} onChange={e => setCategoryInput(e.target.value)} />
               </div>

               <div className="tw-flex tw-items-center tw-py-1 tw-ml-4 tw-mr-2 tw-mt-0.5">
                  <span className="tw-font-medium tw-mr-2">Асуумж:</span>
                  <input className={`${inputClass} tw-max-w-xl tw-mr-3 tw-flex-grow`} value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)} />
                  <button className="tw-ml-auto tw-py-1 tw-px-2 focus:tw-outline-none tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-rounded hover:tw-shadow-md tw-text-white tw-tracking-wide" onClick={handleAddCategory}>
                     Ангилал нэмэх
                  </button>
               </div>
            </div>

            <div className="tw-italic tw-text-gray-600 tw-font-semibold tw-mt-4 tw-p-1 tw-pl-4 tw-text-13px tw-font-sans">
               *Бичвэр - гэсэн ангилал үүсгэснээр сургалтын үнэлгээг асуулжийн дагуу бичгээр авах боломжтой.
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

const Category = ({ questionnaire, setQuestionnaire, AlertCtx }) => {
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

      setQuestionnaire(prev => [...prev, {
         category_order: categoryOrder,
         description_order: maxDescriptionOrder + 1,
         category: category,
         description: descriptionInput,
      }])

      setDescriptionInput('')
   }

   const handleRemoveDescription = (desc) => {
      const newQuestionnaire = questionnaire.filter(question => question.description !== desc)

      if (newQuestionnaire.length === 0) {
         setQuestionnaire(prev => {
            return sortQuestionnaire(prev.filter(question => question.category !== category))
         })
         return
      }

      let i = 1
      const orderedQuestionnaire = []
      for (const question of newQuestionnaire) {
         orderedQuestionnaire.push({ ...question, description_order: i })
         i++
      }

      setQuestionnaire(prev => {
         const next = prev.filter(question => question.category !== category)
         return [...next, ...orderedQuestionnaire]
      })
   }

   const handleChangeCategory = (category, key, value) => {
      setQuestionnaire(prev => {
         const next = [...prev]
         let i = 0
         for (const question of next) {
            if (question.category === category) {
               next[i][key] = value
            }
            i++
         }
         return next
      })
   }

   const handleChangeDescription = (descOrder, key, value) => {
      setQuestionnaire(prev => {
         const index = prev.findIndex(question => question.category === category && question.description_order === descOrder)
         const next = [...prev]
         next[index][key] = value
         return next
      })
   }

   return (
      <div className="tw-font-medium tw-mt-2 tw-text-13px">
         <EditableCategory category={category} categoryOrder={categoryOrder} handleChangeCategory={handleChangeCategory} />
         {questionnaire.sort((a, b) => a.description_order - b.description_order).map((question, i) =>
            <div className="tw-ml-4 tw-mr-2 tw-flex tw-items-center tw-justify-between tw-py-1" key={i}>
               <EditableDescription question={question} handleChangeDescription={handleChangeDescription} />
               <button className="focus:tw-outline-none tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-rounded hover:tw-shadow-md tw-px-2 tw-py-0.5 tw-text-white tw-tracking-wide tw-ml-1.5" onClick={() => handleRemoveDescription(question.description)}>
                  Хасах
               </button>
            </div>
         )}
         <div className="tw-ml-4 tw-mr-2 tw-flex tw-items-center tw-justify-between tw-py-1">
            <input className={`${inputClass} tw-max-w-xl tw-ml-5 tw-mr-3 tw-flex-grow`} type="text" value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)} />
            <button className="focus:tw-outline-none tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-rounded hover:tw-shadow-md tw-px-2 tw-py-0.5 tw-text-white tw-tracking-wide" onClick={handleAddDescription}>
               Асуумж нэмэх
            </button>
         </div>
      </div>
   )
}

const inputClass = 'focus:tw-outline-none tw-px-1 tw-py-1 tw-border tw-border-gray-400 tw-rounded focus:tw-ring-2 tw-ring-blue-400 tw-transition-colors tw-font-medium'
const inputStyle = { maxWidth: 200 }
const svgClass = 'tw-w-5 tw-h-5 tw-m-0.5 tw-cursor-pointer active:tw-text-gray-900 tw-transition-colors'

const EditableCategory = ({ category, categoryOrder, handleChangeCategory }) => {
   const [orderEdit, setOrderEdit] = useState('')
   const [orderEditting, setOrderEditting] = useState(false)

   const [catEdit, setCatEdit] = useState('')
   const [catEditting, setCatEditting] = useState(false)

   const handleFocusOrder = () => {
      setOrderEdit(categoryOrder)
      setOrderEditting(true)
   }

   const handleBlurOrder = () => {
      handleChangeCategory(category, 'category_order', Math.floor(+orderEdit))
      setOrderEditting(false)
      setOrderEdit('')
   }

   const handleFocusCat = () => {
      setCatEdit(category)
      setCatEditting(true)
   }

   const handleBlurCat = () => {
      handleChangeCategory(category, 'category', catEdit)
      setCatEditting(false)
      setCatEdit('')
   }

   const categoryIsText = category === 'Бичвэр'
   return (
      <div className="tw-py-1 tw-text-sm tw-flex tw-items-center">
         {orderEditting
            ? <input className={`${inputClass} tw-w-10`} type="number" value={orderEdit} onChange={e => numCheck(e, setOrderEdit)} onBlur={handleBlurOrder} autoFocus />
            : <span className="tw-flex tw-items-center">
               <PenAltSVG className={svgClass} onClick={handleFocusOrder} />
               {categoryOrder}.
            </span>
         }
         {catEditting
            ? <input className={`${inputClass} tw-flex-grow tw-ml-3`} style={inputStyle} value={catEdit} onChange={e => setCatEdit(e.target.value)} onBlur={handleBlurCat} autoFocus />
            : <span className="tw-flex tw-items-center tw-ml-3">
               <span className={categoryIsText ? 'tw-text-blue-500' : ''}>
                  {category}
               </span>
               <PenAltSVG className={`${svgClass} tw-ml-1`} onClick={handleFocusCat} />
            </span>
         }
      </div>
   )
}

const EditableDescription = ({ question, handleChangeDescription }) => {
   const [orderEdit, setOrderEdit] = useState('')
   const [orderEditting, setOrderEditting] = useState(false)

   const [descEdit, setDescEdit] = useState('')
   const [descEditting, setDescEditting] = useState(false)

   const handleFocusOrder = () => {
      setOrderEdit(question.description_order)
      setOrderEditting(true)
   }

   const handleBlurOrder = () => {
      handleChangeDescription(question.description_order, 'description_order', Math.floor(+orderEdit))
      setOrderEditting(false)
      setOrderEdit('')
   }

   const handleFocusDesc = () => {
      setDescEdit(question.description)
      setDescEditting(true)
   }

   const handleBlurDesc = () => {
      handleChangeDescription(question.description_order, 'description', descEdit)
      setDescEditting(false)
      setDescEdit('')
   }

   return (
      <div className="tw-flex tw-items-center tw-flex-grow">
         {orderEditting
            ? <input className={`${inputClass} tw-w-10`} type="number" value={orderEdit} onChange={e => numCheck(e, setOrderEdit)} onBlur={handleBlurOrder} autoFocus />
            : <span className="tw-flex tw-items-center">
               <PenAltSVG className={`${svgClass}`} onClick={handleFocusOrder} />
               {question.description_order}.
            </span>
         }
         {descEditting
            ? <input className={`${inputClass} tw-flex-grow tw-max-w-xl tw-ml-3 tw-mr-3`} value={descEdit} onChange={e => setDescEdit(e.target.value)} onBlur={handleBlurDesc} autoFocus />
            : <span className="tw-flex tw-items-center tw-ml-3 tw-mr-3">
               {question.description}
               <PenAltSVG className={`${svgClass} tw-ml-1`} onClick={handleFocusDesc} />
            </span>
         }
      </div>
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

function numCheck(e, fn) {
   const value = e.target.value
   if (!isNaN(+value)) {
      fn(value)
   }
}
