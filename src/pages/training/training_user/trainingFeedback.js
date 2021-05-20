import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import FormRichText from 'components/urgudul_components/formRichText'
import { titleClass, buttonClass } from './trainingsList'
import CheckCircleSVG from 'assets/svgComponents/checkCircleSVG'
import ModalWindow from 'components/modal_window/modalWindow'
import ShieldCheckSVG from 'assets/svgComponents/shieldCheckSVG'

export default function TrainingFeedback() {
   const [feedback, setFeedback] = useState([])
   const [questionnaire, setQuestionnaire] = useState([])

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      axios.get('training-questionnaire', {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         console.log(res)
         setQuestionnaire(res.data.data)
         const initialFeedback = []
         for (const question of res.data.data) {
            initialFeedback.push({
               category: question.category,
               description: question.description,
               evaluation: null,
               comment: null,
            })
         }
         setFeedback(initialFeedback)
      }).catch(err => {
         console.error(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Асуумжуудыг татаж чадсангүй.' })
      })
   }, [])

   const trainingId = useParams().trainingId

   const handleSubmit = () => {
      axios.post(`training-feedbacks`, feedback, {
         headers: { Authorization: getLoggedUserToken() },
         params: { trainingId: trainingId },
      }).then(res => {
         console.log(res)
         setFeedback(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сургалтын үнэлгээг хадгаллаа.' })
      }).catch(err => {
         console.error(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтын үнэлгээг хадгалж чадсангүй.' })
      })
   }

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

   // const handleInput = (key, value, index) => setFeedback(prev => {
   //    const newState = [...prev]
   //    newState[index][key] = value
   //    return newState
   // })

   const [modalOpenPass, setModalOpenPass] = useState(true)
   const [passcode, setPasscode] = useState('')
   const [validation, setValidation] = useState(false)
   const [training, setTraining] = useState({})

   const handleSubmitPasscode = () => {
      if (passcode === '' || passcode === null) {
         setValidation(true)
         return
      }

      setTraining('loading')

      axios.get('trainings/find/' + passcode, {
         // params: { passcode: passcode },
      }).then(res => {
         console.log(res)
         if (res.data.data === null) {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сургалт олдсонгүй.' })
         }
         setTraining(res.data.data)
         setModalOpenPass(false)
      }).catch(err => {
         console.error(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтын мэдээллийг татаж чадсангүй.' })
      })
   }

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-w-full tw-relative tw-p-2 tw-pb-12">
         <div className={titleClass}>
            Сургалтанд үнэлгээ өгөх
         </div>

         <ModalWindow modalOpen={modalOpenPass} setModalOpen={setModalOpenPass} modalAppend="tw-p-5 tw-max-w-sm tw-flex tw-flex-col">
            <div className="tw-flex tw-items-center tw-justify-center tw-font-medium tw-text-15px tw-p-2">
               Нууц үг
               <ShieldCheckSVG className="tw-w-5 tw-h-5 tw-ml-1 tw-text-blue-500" />
            </div>
            <div className="tw-text-center tw-font-medium tw-text-sm tw-p-2 tw-mt-2">
               Сургалтанд бүртгүүлэх үед имэйлээр ирсэн нууц үгийг оруулна уу.
            </div>
            <div className="tw-flex tw-items-center tw-p-2 tw-justify-center tw-text-13px tw-mt-2">
               <input className="tw-py-1 tw-px-2 tw-rounded focus:tw-outline-none focus:tw-ring-1 tw-ring-blue-600 tw-border tw-border-gray-400 tw-transition-colors tw-mr-2 tw-w-32" type="text" value={passcode} onChange={e => setPasscode(e.target.value)} />
               <button className={`${buttonClass}`} onClick={handleSubmitPasscode}>
                  Оруулах
               </button>
            </div>
         </ModalWindow>

         {/* <table>
               <thead>
                  <tr>
                     <th className="tw-border tw-border-gray-400">Ангилал</th>
                     <th className="tw-border tw-border-gray-400">1</th>
                     <th className="tw-border tw-border-gray-400">2</th>
                     <th className="tw-border tw-border-gray-400">3</th>
                     <th className="tw-border tw-border-gray-400">4</th>
                     <th className="tw-border tw-border-gray-400">5</th>
                  </tr>
               </thead>
               <tbody>
                  {[...categories].map(category => {
                     switch (category) {
                        case 'Бичвэр':
                           return <tr className="">
                              <td colSpan="6">
                                 <div className="">
                                    {questionnaire.filter(question => question.category === 'Бичвэр').map(question => {
                                       const index = feedback.findIndex(item => item.category === question.category && item.description === question.description)
                                       return <div className="" key={question.description}>
                                          <div className="">
                                             {question.description}
                                          </div>
                                          <div className="tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                                             <FormRichText modules="small" value={feedback[index]?.comment} name="comment" id={index} setForm={handleInput} />
                                          </div>
                                       </div>
                                    })}
                                 </div>
                              </td>
                           </tr>

                        default:
                           return <Fragment key={category}>
                              <tr>
                                 <th className="tw-border tw-border-gray-400" colSpan="6">{category}</th>
                              </tr>
                              {questionnaire.filter(question => question.category === category).map(question =>
                                 <tr className="" key={question.id}>
                                    <td className="tw-border tw-border-gray-400">{question.description}</td>
                                    <EvaluationTdElement question={question} feedback={feedback} setFeedback={setFeedback} rating={1} />
                                    <EvaluationTdElement question={question} feedback={feedback} setFeedback={setFeedback} rating={2} />
                                    <EvaluationTdElement question={question} feedback={feedback} setFeedback={setFeedback} rating={3} />
                                    <EvaluationTdElement question={question} feedback={feedback} setFeedback={setFeedback} rating={4} />
                                    <EvaluationTdElement question={question} feedback={feedback} setFeedback={setFeedback} rating={5} />
                                 </tr>
                              )}
                           </Fragment>
                     }
                  })}
               </tbody>
            </table> */}

         {categroiesArr.map((category, i) =>
            <FormCategory category={category} feedback={feedback} setFeedback={setFeedback} key={category} index={i} />
         )}

         <div className="tw-flex tw-justify-end">
            <button
               className={`${buttonClass} tw-text-sm tw-px-4 tw-m-4`}
               onClick={handleSubmit}>
               Үнэлгээ өгөх
               </button>
         </div>
      </div>
   )
}

// const EvaluationTdElement = ({ question, feedback, setFeedback, rating }) => {
//    const index = feedback.findIndex(item => item.category === question.category && item.description === question.description)

//    const handleClick = () => {
//       setFeedback(prev => {
//          const newState = [...prev]
//          newState[index].evaluation = rating
//          return newState
//       })
//    }

//    return (
//       <td className="tw-border tw-border-gray-400 tw-w-8" onClick={handleClick}>
//          {feedback[index]?.evaluation === rating &&
//             <div className="tw-rounded-full tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-blue-500">
//                <span className="tw-h-3 tw-w-3 tw-bg-blue-500 tw-rounded-full" />
//             </div>
//          }
//       </td>
//    )
// }

const FormCategory = ({ category, feedback, setFeedback, index }) => {
   const feedbackFiltered = feedback.filter(question => question.category === category)

   const handleInput = (key, value, index) => setFeedback(prev => {
      const newState = [...prev]
      newState[index][key] = value
      return newState
   })

   return (
      <div className="tw-pt-4 tw-pb-2">
         <div className="tw-text-15px tw-font-medium tw-text-blue-500 tw-pl-2 tw-tracking-wide">
            {index + 1}. {category}
         </div>

         {feedbackFiltered.map(question => {
            const rowIndex = feedback.findIndex(item => item.category === category && item.description === question.description)

            return <div className="tw-rounded-md tw-shadow-md tw-py-2 tw-px-4 tw-mt-2 tw-mb-6" key={question.description}>
               <div className="tw-font-medium tw-mt-2 tw-flex tw-items-center">
                  <CheckCircleSVG className="tw-w-5 tw-h-5 tw-mr-1 tw-text-green-500 tw-flex-grow-0" />
                  {question.description}
               </div>

               {category === 'Бичвэр'
                  ? <div className="tw-h-32 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl tw-p-2 tw-pl-5 tw-mr-3" style={{ minHeight: 160, maxHeight: 786 }}>
                     <FormRichText modules="small" value={feedback[rowIndex].comment} name="comment" id={rowIndex} setForm={handleInput} />
                  </div>

                  : <div className="tw-flex tw-flex-col tw-items-center tw-font-medium tw-mt-2 tw-mb-1 tw-text-13px tw-tracking-wide tw-text-gray-600 tw-px-4">
                     <div className="tw-max-w-sm tw-flex tw-justify-between tw-w-full">
                        <span className="tw-mr-1 tw-whitespace-nowrap">Огт санал нийлэхгүй</span>
                        <span className="tw-ml-1 tw-whitespace-nowrap">Бүрэн санал нийлнэ</span>
                     </div>

                     <div className="tw-flex tw-justify-around tw-w-full tw-max-w-xs tw-mt-2">
                        {[...Array(5).keys()].map(i =>
                           <button
                              className={`focus:tw-outline-none tw-flex-shrink-0 tw-mx-3 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-w-6 tw-h-6 ${question.evaluation === i + 1 ? 'tw-bg-blue-500 tw-text-white' : 'tw-shadow-inner tw-border-b'} tw-font-medium tw-transition-colors`}
                              onClick={() => handleInput('evaluation', i + 1, rowIndex)}
                              key={i}>
                              <span style={{ paddingTop: 1, paddingRight: 1 }}>{i + 1}</span>
                           </button>
                        )}
                     </div>
                  </div>
               }
            </div>
         })}
      </div>
   )
}
