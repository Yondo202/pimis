import React, { useEffect, useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition, config } from 'react-spring'
import EvaluatorsMeetingEdit from './meetingEdit'
import EvaluatorsMeetingsList from './meetingsList'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import './style.css'


export default function EvaluatorsMeetingsNavigator() {
    const location = useLocation()
    console.log(location)

    const transitionsPages = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: location.pathname === '/meetings' ? 'translateX(-200px)' : 'translateX(200px)' },
        enter: { opacity: 1, transform: 'translateX(0)' },
        leave: { opacity: 0, transform: location.pathname === '/meetings' ? 'translateX(200px)' : 'translateX(-200px)' },
        initial: { opacity: 1 },
        config: config.stiff,
    })

    const [projects, setProjects] = useState([])
    const [evaluators, setEvaluators] = useState([])

    useEffect(() => {
        axios.get('pps-infos/registered-companies', {
            headers: { Authorization: getLoggedUserToken() },
            params: { condition: 'approved' },
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
        <animated.div key={key} style={props}>
            <Switch location={item}>
                <Route exact path="/meetings">
                    <EvaluatorsMeetingsList evaluators={evaluators} projects={projects} />
                </Route>
                <Route path="/meetings/id">
                    <EvaluatorsMeetingEdit evaluators={evaluators} projects={projects} />
                </Route>
            </Switch>
        </animated.div>
    )
}