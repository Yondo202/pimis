import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import TrainingFeedback from './trainingFeedback'
import TrainingRequest from './trainingRequest'
import TrainingList from './trainingsList'
import TrainingUserRegistration from './userRegistration'

export default function TrainingNavigatorUser() {
   const location = useLocation()

   const transitionsPages = useTransition(location, location => location.pathname, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { display: 'none' },
      initial: { opacity: 1 },
   })

   return transitionsPages.map(({ item, props, key }) =>
      <animated.div className="tw-relative" key={key} style={props}>
         <Switch location={item}>
            <Route exact path="/trainings">
               <TrainingList />
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
