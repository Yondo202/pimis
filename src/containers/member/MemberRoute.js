import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Menu from 'containers/menu/menu';
import MemberDecision from 'components/member/member_decision/Decision_main';
import MembersHome from 'components/member/HomePage';
import Notify from 'components/member/notify/PageOne';

function MemberRoute() {
    return (
        <> <Menu />
            <Switch>
                <Route path="/" component={MembersHome} exact /> 
                <Route path="/memberdecision" component={MemberDecision} />
                <Route path="/notify" component={Notify} />
            </Switch>
        </>
    )
}

export default MemberRoute
