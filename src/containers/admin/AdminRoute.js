import React from 'react'
import LeftMenu from './LeftMenu'
import HomeAdmin from '../../components/admin/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components'
import { SearchOutlined,CaretDownOutlined} from '@ant-design/icons';

function AdminRoute() {
    return (
        <AdminApp >
            <div className="MainParent">
                <div className="leftMenuPar">
                     <LeftMenu />

                </div>
                <div className="container-fluid ContentPar">
                    <div className="row topMenuPar"> 
                     <div className="svgPar"> <SearchOutlined /></div>
                        <a className="Profile">
                            <img src='profile.jpg' alt="profile" />
                            <CaretDownOutlined />
                        </a>
                    </div>

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
            box-shadow: 5px 0 8px -4px rgba(0,80,180,0.2);
        }
        .ContentPar{
            overflow-y:scroll;
            background-color: #f2f2f2;
            .topMenuPar{
                display:flex;
                align-items:center;
                justify-content:space-between;
                box-shadow: 0 1px 8px -2px rgba(0,80,180,0.2);
                background-color:white;
                padding:6px 30px;
                margin-bottom:15px;
                .svgPar{
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background-color:rgba(0,0,0,0.057);
                    padding:5px 5px;
                    font-size:18px;
                    border-radius:50%;
                    svg{
                        cursor:pointer;
                        color:rgba(0,30,80,1);
                    }
                }
                .Profile{
                    display:flex;
                    align-items:center;
                    img{
                        border-radius:50%;
                        width:28px;
                        height:28px;
                        object-fit:cover;
                        border:1px solid rgba(0,30,80,0.1);
                    }
                    svg{
                        margin-left:2px;
                        font-size:12px;
                        color:rgba(0,30,80,1);
                    }
                }
               
            }
        }
    }
`
