import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import TrainingRegisteredUsersList from './registeredUsersList'
import TrainingEdit from './trainingEdit'
import TrainingsList from './trainingsList'

export default function TrainingNavigatorAdmin() {
   const location = useLocation()

   const transitionsPages = useTransition(location, location => location.pathname, {
      from: { opacity: 0, transform: location.pathname === '/trainings' ? 'translateX(-200px)' : 'translateX(200px)' },
      enter: { opacity: 1, transform: 'translateX(0)' },
      leave: { opacity: 0, transform: location.pathname === '/trainings' ? 'translateX(200px)' : 'translateX(-200px)' },
      initial: { opacity: 1 },
      config: { tension: 300 },
   })

   return transitionsPages.map(({ item, props, key }) =>
      <animated.div className="tw-relative" key={key} style={props}>
         <Switch location={item}>
            <Route exact path="/trainings">
               <TrainingsList />
            </Route>
            <Route exact path="/trainings/id/">
               <TrainingEdit />
            </Route>
            <Route path="/trainings/id/:id">
               <TrainingEdit />
            </Route>
            <Route path="/trainings/registered-users">
               <TrainingRegisteredUsersList />
            </Route>
         </Switch>
      </animated.div>
   )
}
