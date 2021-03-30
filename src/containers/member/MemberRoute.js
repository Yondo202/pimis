import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom';
import Menu from 'containers/menu/menu';
import MemberDecision from 'components/member/member_decision/Decision_main';
import MembersHome from 'components/member/HomePage';
import Notify from 'components/member/notify/PageOne';
import {ChangePassword} from 'components/LoginDoneHome/ChangePassword'
import SignatureDraw from 'components/LoginDoneHome/SignatureDraw'


function MemberRoute() {
    const [NotifyData, setNotify] = useState({});
    return (
        <> <Menu />
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
                <Route path="/changepass" component={ChangePassword} />
                <Route path="/signature" component={SignatureDraw} />
            </Switch>
        </>
    )
}

export default MemberRoute
