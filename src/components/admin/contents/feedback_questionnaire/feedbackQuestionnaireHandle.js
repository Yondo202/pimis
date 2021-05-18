import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'

export default function FeedbackQuestionnaireHandle() {
   const [questionnaire, setQuestionnaire] = useState([])

   const [categoryInput, setCategoryInput] = useState('')
   const [descriptionInput, setDescriptionInput] = useState('')

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      axios.get('training-questionnaire', {
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
      axios.post('training-questionnaire', questionnaire, {
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
               <div className="tw-flex tw-items-center tw-py-0.5">
                  <span className="tw-font-medium tw-mr-2 tw-text-sm">Ангилал: </span>
                  <input className="focus:tw-outline-none tw-py-1 tw-px-2 tw-border tw-border-gray-400 focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition-colors tw-rounded tw-flex-grow" style={{ maxWidth: 200 }} type="text" value={categoryInput} onChange={e => setCategoryInput(e.target.value)} />
               </div>

               <div className="tw-flex tw-items-center tw-py-0.5 tw-ml-4 tw-mr-2 tw-mt-0.5">
                  <span className="tw-font-medium tw-mr-2">Асуумж:</span>
                  <input className="focus:tw-outline-none tw-py-1 tw-px-2 tw-border tw-border-gray-400 focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition-colors tw-flex-grow tw-max-w-md tw-rounded tw-mr-3" type="text" value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)} />

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
   const [descriptionInput, setDescriptionInput] = useState('')

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
               category_order: questionnaire[0].category_order,
               description_order: questionnaire.length + 1,
               category: questionnaire[0].category,
               description: descriptionInput,
            }]
         }
      })

      setDescriptionInput('')
   }

   const handleRemoveDescription = (desc) => {
      const newQuestionnaire = questionnaire.filter(question => question.description !== desc)

      if (newQuestionnaire.length === 0) {
         setQuestionnaire(prev => prev.filter(question => question.category !== questionnaire[0].category))
         return
      }

      let i = 1
      const orderedQuestionnaire = []
      for (const question of newQuestionnaire) {
         orderedQuestionnaire.push({ ...question, description_order: i })
         i++
      }

      setQuestionnaire(prev => {
         const newPrev = prev.filter(question => question.category !== questionnaire[0].category)
         return [...newPrev, ...orderedQuestionnaire]
      })
   }

   let isTextCategory = false
   if (questionnaire.length === 0) isTextCategory = true
   if (questionnaire[0]?.category === 'Бичвэр') isTextCategory = true

   return (
      <div className="tw-font-medium tw-mt-2 tw-text-13px">
         <div className="tw-py-0.5 tw-text-sm">
            {questionnaire.length === 0
               ? `${index + 1}. Бичвэр`
               : `${index + 1}. ${questionnaire[0].category}`
            }
         </div>
         {questionnaire.length === 0
            ? <div className="tw-italic tw-ml-4 tw-pl-2 tw-text-gray-500 tw-py-0.5">
               Бичвэр асуумж байхгүй байна.
            </div>
            : questionnaire.map((question, i) =>
               <div className="tw-ml-4 tw-mr-2 tw-flex tw-items-center tw-justify-between tw-py-0.5" key={question.description}>
                  <span className="">
                     {i + 1}. {question.description}
                  </span>
                  <button className="focus:tw-outline-none tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-rounded hover:tw-shadow-md tw-px-2 tw-py-0.5 tw-text-white tw-tracking-wide" onClick={() => handleRemoveDescription(question.description)}>
                     Хасах
                  </button>
               </div>
            )}
         <div className="tw-ml-4 tw-mr-2 tw-flex tw-items-center tw-justify-between tw-py-0.5">
            <input className="tw-ml-4 focus:tw-outline-none tw-px-2 tw-py-1 tw-mr-3 tw-border tw-border-gray-400 tw-rounded tw-flex-grow tw-max-w-md focus:tw-ring-2 tw-ring-blue-500 tw-transition-colors" type="text" value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)} />
            <button className="focus:tw-outline-none tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-rounded hover:tw-shadow-md tw-px-2 tw-py-0.5 tw-text-white tw-tracking-wide" onClick={handleAddDescription}>
               Асуумж нэмэх
            </button>
         </div>
      </div>
   )
}
