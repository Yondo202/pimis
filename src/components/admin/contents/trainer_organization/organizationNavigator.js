import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { useTransition, animated } from 'react-spring'
import TrainerOrganizationEdit from './organizationEdit'
import TrainerOrganizationsList from './organizationsList'

export default function TrainerOrganizationNavigator() {
   const location = useLocation()

   const transitionsPages = useTransition(location, location => location.pathname, {
      from: { opacity: 0, transform: location.pathname === '/trainer-organizations' ? 'translateX(-320px)' : 'translateX(320px)' },
      enter: { opacity: 1, transform: 'translateX(0)' },
      leave: { opacity: 0, transform: location.pathname === '/trainer-organizations' ? 'translateX(320px)' : 'translateX(-320px)' },
      initial: { opacity: 1 },
      config: { tension: 300, clamp: true },
   })

   return transitionsPages.map(({ item, props, key }) =>
      <animated.div className="tw-relative" key={key} style={props}>
         <Switch location={item}>
            <Route exact path="/trainer-organizations">
               <TrainerOrganizationsList />
            </Route>
            <Route exact path="/trainer-organizations/id/">
               <TrainerOrganizationEdit />
            </Route>
            <Route path="/trainer-organizations/id/:id">
               <TrainerOrganizationEdit />
            </Route>
         </Switch>
      </animated.div>
   )
}
