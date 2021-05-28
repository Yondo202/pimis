import React, { useEffect, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import EvaluatorsMeetingEdit from './meetingEdit'
import EvaluatorsMeetingsList from './meetingsList'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import './style.css'

export default function EvaluatorsMeetingNavigator() {
    const location = useLocation()

    const transitionsPages = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: location.pathname === '/meetings' ? 'translateX(-320px)' : 'translateX(320px)' },
        enter: { opacity: 1, transform: 'translateX(0)' },
        leave: { opacity: 0, transform: location.pathname === '/meetings' ? 'translateX(320px)' : 'translateX(-320px)' },
        initial: { opacity: 1 },
        config: { tension: 300, clamp: true },
    })

    const [projects, setProjects] = useState([])
    const [evaluators, setEvaluators] = useState([])

    useEffect(() => {
        axios.get('pps-infos/registered-companies', {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res.data)
            setProjects(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })

        axios.get('users', {
            headers: { Authorization: getLoggedUserToken() },
            params: { role: 'member' }
        }).then(res => {
            console.log(res.data)
            setEvaluators(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })
    }, [])

    return transitionsPages.map(({ item, props, key }) =>
        <animated.div className="tw-relative" key={key} style={props}>
            <Switch location={item}>
                <Route exact path="/meetings">
                    <EvaluatorsMeetingsList evaluators={evaluators} projects={projects} />
                </Route>
                <Route path="/meetings/id">
                    <EvaluatorsMeetingEdit evaluators={evaluators} />
                </Route>
            </Switch>
        </animated.div>
    )
}
