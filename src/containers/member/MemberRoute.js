import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom';
import Menu from 'containers/menu/menu';
import MemberDecision from 'components/member/member_decision/Decision_main';
import MembersHome from 'components/member/HomePage';
import Notify from 'components/member/notify/PageOne';
import MiddleRoute from "containers/middle/middleRoute"

function MemberRoute() {
    const [NotifyData, setNotify] = useState({});

    return (
        <>
            <Menu />
            <Switch>
                <Route path="/" exact >
                    <MembersHome setNotify={setNotify} />
                </Route>
                <Route path="/memberdecision/:slug" >
                    <MemberDecision NotifyData={NotifyData} />
                </Route>
                <Route path="/notify/:slug">
                    <Notify NotifyData={NotifyData} />
                </Route>
                <MiddleRoute />
            </Switch>
        </>
    )
}

export default MemberRoute
