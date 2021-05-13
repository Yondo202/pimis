import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axiosbase'
import { Fragment } from 'react'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'

export default function TrainingFeedback() {
   const [feedback, setFeedback] = useState(initialState)

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

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-flex tw-justify-center tw-w-full tw-px-4 tw-pt-8 tw-pb-20">
         <div className="tw-rounded tw-shadow-md tw-bg-white tw-max-w-5xl tw-w-full tw-relative">
            <div className="tw-flex">
               <button className="tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-pl-3 tw-pr-5 tw-text-sm tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-my-2 tw-ml-2" onClick={handleNavTrainings}>
                  <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform-gpu tw-rotate-90 tw-mr-1" />
                  Буцах
               </button>
            </div>

            <div className="">
               <table>
                  <thead>
                     <tr>
                        <th></th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                     </tr>
                  </thead>
                  <tbody>
                     {feedback.map(category =>
                        <Fragment>
                           <tr>
                              <th colSpan="6"></th>
                           </tr>
                           {category.questions.map(question =>
                              <tr className="">
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                                 <td></td>
                              </tr>
                           )}
                        </Fragment>
                     )}
                  </tbody>
               </table>
            </div>

            <div className="tw-flex tw-justify-center">
               <button className="focus:tw-outline-none tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-px-8 tw-py-2 tw-text-white tw-font-medium tw-mt-12 tw-mb-8" onClick={handleSubmit}>
                  Илгээх
               </button>
            </div>
         </div>
      </div>
   )
}

const initialState = []
