import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axiosbase'
import { Fragment } from 'react'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import FormRichText from 'components/urgudul_components/formRichText'

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

   const history = useHistory()

   const handleNavTrainings = () => history.push('/trainings')

   const handleSubmit = () => {
      axios.post(`training-requests`, feedback, {
         headers: { Authorization: getLoggedUserToken() },
         params: { trainingId: trainingId },
      }).then(res => {
         console.log(res)
         setFeedback(res.data.data)
      }).catch(err => {
         console.error(err.response)
      })
   }

   const categories = new Set()
   for (const question of questionnaire) {
      categories.add(question.category)
   }

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-flex tw-justify-center tw-w-full tw-px-4 tw-pt-8 tw-pb-20">
         <div className="tw-rounded tw-shadow-md tw-bg-white tw-max-w-5xl tw-w-full tw-relative">
            <div className="tw-flex">
               <button className="tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-pl-3 tw-pr-5 tw-text-sm tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-my-2 tw-ml-2" onClick={handleNavTrainings}>
                  <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform-gpu tw-rotate-90 tw-mr-1" />
                  Буцах
               </button>
            </div>

            <div className="tw-text-base tw-font-medium tw-text-center tw-mb-4 tw-mt-2">
               Сургалтанд үнэлгээ өгөх
            </div>

            <div className="">

            </div>

            <table>
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
                                    {questionnaire.filter(question => question.category === 'Бичвэр').map(question =>
                                       <div className="">
                                          <div className="">
                                             {question.description}
                                          </div>
                                          <div className="tw-h-40 tw-resize-y tw-overflow-y-hidden" style={{ minHeight: '128px', maxHeight: '768px' }}>
                                             <FormRichText modules="small" value={''} name="company_introduction" setForm={() => { }} />
                                          </div>
                                       </div>
                                    )}
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
                                    <EvaluationTdElement />
                                    <EvaluationTdElement />
                                    <EvaluationTdElement />
                                    <EvaluationTdElement />
                                    <EvaluationTdElement />
                                 </tr>
                              )}
                           </Fragment>
                     }
                  })}
               </tbody>
            </table>

            <div className="tw-flex tw-justify-center">
               <button className="focus:tw-outline-none tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-px-8 tw-py-2 tw-text-white tw-font-medium tw-mt-12 tw-mb-8" onClick={handleSubmit}>
                  Илгээх
               </button>
            </div>
         </div>
      </div>
   )
}

const EvaluationTdElement = ({ }) => {

   return (
      <td className="tw-border tw-border-gray-400" onClick={() => { }}>
         ***
      </td>
   )
}
