import HelpPopup from 'components/help_popup/helpPopup'
import React, { useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { animated, useTransition, config } from 'react-spring'
import TrainingFeedback from './trainingFeedback'
import TrainingRequest from './trainingRequest'
import TrainingList from './trainingsList'
import TrainingUserRegistration from './userRegistration'

export default function TrainingNavigatorUser() {
   const location = useLocation()

   const transitionsPages = useTransition(location, location => location.pathname, {
      from: { opacity: 0, transform: location.pathname === '/trainings' ? 'translateX(-200px)' : 'translateX(200px)' },
      enter: { opacity: 1, transform: 'translateX(0)' },
      leave: { opacity: 0, transform: location.pathname === '/trainings' ? 'translateX(200px)' : 'translateX(-200px)' },
      initial: { opacity: 1 },
      config: config.stiff,
   })

   const [code, setCode] = useState('')

   const history = useHistory()

   const handleNavRequest = () => history.push('/trainings/request')

   const handleNavFeedback = () => history.push(`/trainings/${1}/feedback`)

   return transitionsPages.map(({ item, props, key }) =>
      <animated.div className="tw-relative" key={key} style={props}>
         <Switch location={item}>
            <Route exact path="/trainings">
               <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-w-full tw-px-4 tw-pt-8 tw-pb-20">
                  <TrainingList />

                  <div className="tw-rounded tw-shadow-md tw-bg-white tw-mt-20 tw-max-w-3xl">
                     <div className="tw-flex tw-items-center">
                        <span className="tw-text-base tw-font-medium tw-p-2 tw-pl-4">
                           Захиалгат сургалтын хүсэлт илгээх
                        </span>
                        <HelpPopup classAppend="tw-mx-2" popupClass="tw-w-96" main="Та захиалгат сургалтын хүсэлтээр дамжуулан сургалт зохион байгуулагч талуудад өөрт хэрэгтэй байгаа сургалтын чиглэл, хөтөлбөрийн талаарх мэдээллийг хүргүүлэх боломжтой." position="bottom" />
                     </div>
                     <div className="tw-flex tw-justify-end">
                        <button className="focus:tw-outline-none tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-px-8 tw-py-1.5 tw-text-white tw-font-medium tw-my-4 tw-mr-4" onClick={handleNavRequest}>
                           Хүсээлт илгээх
                        </button>
                     </div>
                  </div>

                  <div className="tw-rounded tw-shadow-md tw-bg-white tw-mt-20 tw-max-w-3xl">
                     <div className="tw-flex tw-items-center">
                        <span className="tw-text-base tw-font-medium tw-p-2 tw-pl-4">
                           Сургалтад үнэлгээ өгөх
                        </span>
                        <HelpPopup classAppend="tw-mx-2" popupClass="tw-w-96" main="Та өөрийн хамрагдсан сургалтанд үнэлгээ өгөх, сургалтын талаарх санал хүсэлтээ ирүүлэх хүсэлтэй бол үүгээр хандана уу." list={['Сургалтанд бүртгүүлэх үед имэйл хаягаар ирсэн кодыг оруулна уу.']} position="bottom" />
                     </div>
                     <div className="tw-flex tw-items-center tw-justify-end">
                        <input className="tw-px-2 tw-py-1.5 tw-w-20 tw-rounded focus:tw-ring tw-ring-blue-400 focus:tw-outline-none tw-border-2 tw-border-indigo-500 tw-transition-colors" type="text" value={code}
                           onChange={e => setCode(e.target.value)} />
                        <button className="focus:tw-outline-none tw-rounded hover:tw-shadow-md tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-px-8 tw-py-1.5 tw-text-white tw-font-medium tw-ml-3 tw-my-4 tw-mr-4" onClick={handleNavFeedback}>
                           Үнэлгий өгөх
                        </button>
                     </div>
                  </div>
               </div>
            </Route>
            <Route path="/trainings/:trainingId/registration">
               <TrainingUserRegistration />
            </Route>
            <Route path="/trainings/request">
               <TrainingRequest />
            </Route>
            <Route path="/trainings/:trainingId/feedback">
               <TrainingFeedback />
            </Route>
         </Switch>
      </animated.div>
   )
}
