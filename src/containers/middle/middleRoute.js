import React from 'react'
import { Route } from "react-router-dom"
import { ChangePassword } from 'components/LoginDoneHome/ChangePassword';
import SignatureDraw from 'components/LoginDoneHome/UsersInfo';

function MiddleRoute() {
    return (
        <>
            <Route path="/changepass" component={ChangePassword} />
            <Route path="/signature" component={SignatureDraw} />
        </>
    )
}

export default MiddleRoute
