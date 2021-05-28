import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { animated, config, useTransition } from 'react-spring'
import LetterOfInterest from './letter'
import LetterUpload from './letterUpload'

export default function LetterNavigator() {
   const location = useLocation()

   const transitionsPages = useTransition(location, location => location.pathname, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { display: 'none' },
      config: { tension: 300, clamp: true },
   })

   return transitionsPages.map(({ item, props, key }) =>
      <animated.div className="tw-relative" key={key} style={props}>
         <Switch location={item}>
            <Route exact path="/letter-of-interest">
               <LetterUpload />
            </Route>
            <Route path="/letter-of-interest/web">
               <LetterOfInterest />
            </Route>
         </Switch>
      </animated.div>
   )
}
