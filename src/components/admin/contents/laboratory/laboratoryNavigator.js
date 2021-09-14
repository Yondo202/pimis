import React from 'react'
import { Switch, useLocation, Route } from 'react-router'
import { useTransition, animated } from 'react-spring'
import LaboratoriesList from './laboratoriesList'
import LaboratoryEdit from './laboratoryEdit'

export default function LaboratoryNavigator() {
   const location = useLocation()

   const transitionsPages = useTransition(location, location => location.pathname, {
      from: { opacity: 0, transform: location.pathname === '/laboratories' ? 'translateX(-320px)' : 'translateX(320px)' },
      enter: { opacity: 1, transform: 'translateX(0)' },
      leave: { opacity: 0, transform: location.pathname === '/laboratories' ? 'translateX(320px)' : 'translateX(-320px)' },
      initial: { opacity: 1 },
      config: { tension: 300, clamp: true },
   })

   return transitionsPages.map(({ item, props, key }) =>
      <animated.div className="tw-relative" key={key} style={props}>
         <Switch location={item}>
            <Route exact path="/laboratories">
               <LaboratoriesList />
            </Route>
            <Route exact path="/laboratories/id/">
               <LaboratoryEdit />
            </Route>
            <Route path="/laboratories/id/:id">
               <LaboratoryEdit />
            </Route>
         </Switch>
      </animated.div>
   )
}
