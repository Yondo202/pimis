import MiddleRoute from 'containers/middle/middleRoute'
import TrainingRequestsList from 'pages/training/training_admin/requestsList'
import TrainingNavigatorAdmin from 'pages/training/training_admin/TrainingNavigator'
import TrainingsReport from 'pages/training/training_admin/trainingReport'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

export default function TrainerRoute() {
   return (
      <Switch>
         <Route path="/trainings" component={TrainingNavigatorAdmin} />
         <Route path="/training-requests" component={TrainingRequestsList} />
         <Route path="/training-report" component={TrainingsReport} />
         <MiddleRoute />
         <Redirect to="/trainings" />
      </Switch>
   )
}
