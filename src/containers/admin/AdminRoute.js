import React from 'react'
import LeftMenu from './LeftMenu'
import HomeAdmin from '../../components/admin/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components'

function AdminRoute() {
    return (
        <AdminApp >
            <div className="MainParent">
                <div className="leftMenuPar">
                     <LeftMenu />

                </div>
                <div className="container-fluid ContentPar">
                    <Switch>
                        <Route path="/admin" component={HomeAdmin} exact />

                    </Switch>
                </div>
            </div>

            
        </AdminApp>
    )
}

export default AdminRoute

const AdminApp = styled.div`
    .MainParent{
        height:100vh;
        display:flex;
        .leftMenuPar{
        }
        .ContentPar{
            overflow-y:scroll;
        }
    }
`
