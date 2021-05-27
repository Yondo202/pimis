import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import AlertContext from 'components/utilities/alertContext'
import FormRichText from 'components/urgudul_components/formRichText'
import { titleClass, buttonClass } from './trainingsList'
import CheckCircleSVG from 'assets/svgComponents/checkCircleSVG'
import ModalWindow from 'components/modal_window/modalWindow'
import ShieldCheckSVG from 'assets/svgComponents/shieldCheckSVG'
import { Transition, animated } from 'react-spring/renderprops'
import SpinnerSVG from 'assets/svgComponents/spinnerSVG'
import CalendarSVG from 'assets/svgComponents/calendarSVG'
import LibrarySVG from 'assets/svgComponents/librarySVG'
import ClipboardListSVG from 'assets/svgComponents/clipboardListSVG'
import ExclamationSVG from 'assets/svgComponents/exclamationSVG'

export default function TrainingFeedback() {
   const [feedback, setFeedback] = useState([])
   const [questionnaire, setQuestionnaire] = useState([])

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      axios.get('trainings/questionnaire')
         .then(res => {
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

   const handleSubmit = () => {
      if (training.id === null || training.id === undefined) {
         setModalOpenPass(true)
         setErrorMsg('Нууц кодоо оруулна уу.')
         return
      } else {
         setErrorMsg('')
      }

      axios.post(`trainings/${training.id}/feedbacks`, feedback, {
         params: { registrationId: training.trainingRegistrations[0].id },
      }).then(res => {
         console.log(res)
         setFeedback(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сургалтын үнэлгээг хүлээж авлаа.' })
      }).catch(err => {
         console.error(err.response)
         if (err.response.status === 490) {
            setModalOpenFeedbackGiven(true)
            return
         }
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтын үнэлгээг хадгалж чадсангүй.' })
      })
   }

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

   // const handleInput = (key, value, index) => setFeedback(prev => {
   //    const newState = [...prev]
   //    newState[index][key] = value
   //    return newState
   // })

   const [modalOpenPass, setModalOpenPass] = useState(true)
   const [passcode, setPasscode] = useState('')
   const [errorMsg, setErrorMsg] = useState('')
   const [training, setTraining] = useState({})

   const handleSubmitPasscode = () => {
      if (passcode === '' || passcode === null) {
         setErrorMsg('Нууц кодоо оруулна уу.')
         return
      } else {
         setErrorMsg('')
      }
      setTraining('loading')
      axios.get(`trainings/find-by`, {
         params: { passcode: passcode },
      }).then(res => {
         console.log(res)
         const training = res.data.data
         if (training === null) {
            setTraining({})
            setErrorMsg('Нууц код буруу байна.')
            return
         }
         const registrationId = training.trainingRegistrations[0]?.id
         if (registrationId === null || registrationId === undefined) {
            setTraining({})
            setErrorMsg('Бүртгэл олдсонгүй.')
            return
         }
         setTraining(res.data.data)
         setModalOpenPass(false)
         setErrorMsg('')
      }).catch(err => {
         console.error(err.response)
         setTraining({})
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтын мэдээллийг олж чадсангүй.' })
      })
   }

   const [modalOpenFeedbackGiven, setModalOpenFeedbackGiven] = useState(false)

   useEffect(() => {
      const timer = setTimeout(() => {
         if (modalOpenFeedbackGiven === true) {
            setModalOpenFeedbackGiven(false)
         }
      }, 3000)
      return () => clearTimeout(timer)
   }, [modalOpenFeedbackGiven])

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-w-full tw-relative tw-p-2 tw-pb-12">
         <div className={titleClass}>
            Сургалтанд үнэлгээ өгөх
         </div>

         <ModalWindow modalOpen={modalOpenPass} setModalOpen={setModalOpenPass} modalAppend="tw-p-5 tw-max-w-sm tw-flex tw-flex-col">
            <div className="tw-flex tw-items-center tw-justify-center tw-font-medium tw-text-15px tw-p-2">
               Нууц код
               <ShieldCheckSVG className="tw-w-5 tw-h-5 tw-ml-1 tw-text-blue-500" />
            </div>
            <div className="tw-text-center tw-font-medium tw-text-sm tw-p-2 tw-mt-2">
               Сургалтанд бүртгүүлэх үед имэйлээр ирсэн нууц кодоо оруулна уу.
            </div>
            <div className="tw-flex tw-items-center tw-p-2 tw-justify-center tw-text-13px tw-mt-2">
               <input className="tw-py-1 tw-px-2 tw-rounded focus:tw-outline-none tw-border tw-border-gray-400 tw-transition-colors tw-mr-2 tw-w-24 focus:tw-ring-1 tw-ring-blue-400" type="text" value={passcode} onChange={e => setPasscode(e.target.value)} />
               <button className={`${buttonClass} tw-flex tw-items-center`} onClick={handleSubmitPasscode}>
                  Оруулах
                  <Transition
                     items={training === 'loading'}
                     from={{ width: 0, marginLeft: 0 }}
                     enter={{ width: 'auto', marginLeft: 2 }}
                     leave={{ width: 0, marginLeft: 0 }}>
                     {item => item && (anims =>
                        <animated.span style={anims}>
                           <SpinnerSVG className="tw-w-4 tw-h-4 tw-animate-spin" style={anims} />
                        </animated.span>
                     )}
                  </Transition>
               </button>
            </div>
            <Transition
               items={errorMsg}
               from={{ transform: 'scale(0)', marginTop: 0 }}
               enter={{ transform: 'scale(1)', marginTop: 8 }}
               leave={{ display: 'none' }}>
               {item => item && (anims =>
                  <animated.div className="tw-text-red-500 tw-text-center tw-italic tw-font-medium" style={anims}>
                     {errorMsg}
                  </animated.div>
               )}
            </Transition>
         </ModalWindow>

         <div className="tw-mt-4 tw-px-2 tw-pb-2 tw-font-medium">
            <div className="tw-flex tw-items-center tw-py-1">
               <ClipboardListSVG className="tw-w-5 tw-h-5 tw-text-blue-500 tw-mr-1" />
               <span className="tw-text-gray-600 tw-mr-3">Сургалтын нэр:</span>
               <span className="tw-uppercase">{training.training_name}</span>
            </div>
            <div className="tw-flex tw-items-center tw-py-1">
               <LibrarySVG className="tw-w-5 tw-h-5 tw-text-blue-500 tw-mr-1" />
               <span className="tw-text-gray-600 tw-mr-3">Зохион байгуулагч:</span>
               <span className="tw-uppercase">{training.organizer}</span>
            </div>
            <div className="tw-flex tw-items-center tw-py-1">
               <CalendarSVG className="tw-w-5 tw-h-5 tw-text-blue-500 tw-mr-1" />
               <span className="tw-text-gray-600 tw-mr-3">Огноо:</span>
               <span className="">{training.start_date}</span>
               <span className="tw-mx-1">–</span>
               <span className="">{training.end_date}</span>
            </div>
         </div>

         <div className="tw-rounded-md tw-shadow-md tw-py-2 tw-px-4 tw-font-medium tw-text-13px tw-mb-4 tw-text-gray-600" style={{ textIndent: 16 }}>
            Мэдэгдэл тус бүрт санал нийлж байгаа, эсвэл санал нийлэхгүй байгаагаа “1”-ээс “5” хүртэлх оноогоор үнэлнэ. Үнэлгээ “1” нь огт санал нийлэхгүй байгааг, “5” нь бүрэн санал нийлж буйг, харин “3” нь санал нийлэх, нийлэхгүй байгаагийн аль нь ч биш гэдгийг илэрхийлнэ.
         </div>

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

         {categoriesArr.map((categoryObj, i) =>
            <FormCategory category={categoryObj.category} feedback={feedback} setFeedback={setFeedback} key={categoryObj.categoryOrder} index={i} />
         )}

         <div className="tw-flex tw-justify-end">
            <button
               className={`${buttonClass} tw-text-sm tw-px-4 tw-m-4`}
               onClick={handleSubmit}>
               Үнэлгээ өгөх
               </button>
         </div>

         <ModalWindow modalOpen={modalOpenFeedbackGiven} setModalOpen={setModalOpenFeedbackGiven} modalAppend="tw-p-5">
            <div className="tw-px-4 tw-pt-4 tw-pb-2 tw-font-medium tw-text-base tw-flex tw-items-center tw-justify-center">
               Уучлаарай
               <ExclamationSVG className="tw-w-6 tw-h-6 tw-text-red-500 tw-ml-1" />
            </div>
            <div className="tw-font-medium tw-py-4 tw-px-4">
               Та сургатанд үнэлгээ өгсөн байна.
            </div>
         </ModalWindow>
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
      <div className="tw-mt-5">
         {category !== 'Бичвэр' &&
            <div className="tw-text-15px tw-font-medium tw-text-blue-500 tw-pl-2 tw-tracking-wide">
               {index + 1}. {category}
            </div>
         }

         {feedbackFiltered.map(question => {
            const rowIndex = feedback.findIndex(item => item.category === category && item.description === question.description)

            return <div className="tw-rounded-md tw-shadow-md tw-py-2 tw-px-4 tw-mt-2 tw-mb-6" key={question.description}>
               <div className="tw-font-medium tw-mt-2 tw-flex tw-items-center">
                  <CheckCircleSVG className="tw-w-5 tw-h-5 tw-mr-1 tw-text-green-500 tw-flex-grow-0" />
                  {question.description}
               </div>

               {category === 'Бичвэр'
                  ? <div className="tw-h-32 tw-resize-y tw-overflow-y-hidden tw-max-w-3xl tw-p-2 tw-pl-5 tw-pb-3 tw-mr-3" style={{ minHeight: 160, maxHeight: 512 }}>
                     <FormRichText modules="small" value={feedback[rowIndex].comment} name="comment" id={rowIndex} setForm={handleInput} />
                  </div>

                  : <div className="tw-flex tw-flex-col tw-items-center tw-font-medium tw-mt-2 tw-mb-2 tw-text-13px tw-tracking-wide tw-text-gray-600 tw-px-4">
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
