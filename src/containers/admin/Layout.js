import React, { useContext, useState } from 'react';
import Aside from '../../components/admin/left_menu/Aside';
import Main from '../../components/admin/left_menu/TopMain';
import UserContext from '../../context/UserContext'
import styled from 'styled-components'
import HomeAdmin from '../../components/admin/Home'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import UserHandle from 'components/admin/contents/users/UserHandle';
import ProjectHandle from 'components/admin/contents/ProjectHandle';
import UrgudulNavigator from 'pages/urgudul/page';
import { UrgudulStore } from 'components/utilities/urgudulContext';


function Layout({ setLocale }) {
    const ctx = useContext(UserContext);
    const [rtl, setRtl] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [image, setImage] = useState(false);
    const [toggled, setToggled] = useState(false);

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleRtlChange = (checked) => {
        setRtl(checked);
        setLocale(checked ? 'ar' : 'en');
    };
    const handleImageChange = (checked) => { setImage(checked); };

    const handleToggleSidebar = (value) => { setToggled(value); };

    return (
        <AdminApp className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
            <div className="MainParent">
                <Aside image={image} collapsed={collapsed} rtl={rtl} toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
            </div>

            <div className="container-fluid ContentPar">
                <Main image={image} toggled={toggled} collapsed={collapsed} rtl={rtl}
                    handleToggleSidebar={handleToggleSidebar}
                    handleCollapsedChange={handleCollapsedChange}
                    handleRtlChange={handleRtlChange}
                    handleImageChange={handleImageChange}
                />

                <div className="itemsPar">
                    <UrgudulStore>
                            <Route path="/" component={HomeAdmin} exact />
                            <Route path="/users" component={UserHandle} />
                            <Route path="/projects" component={ProjectHandle} />
                            <Route path="/urgudul/:page">
                                <UrgudulNavigator preloaded={true} />
                            </Route>
                    </UrgudulStore>
                </div>
            </div>

            <AlertStyle style={ctx.alert.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${ctx.alert.color}` } : { bottom: `50px`, opacity: `0` }} >
                {ctx.alert.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${ctx.alert.color}` }} className="true" /> : <CgDanger style={{ color: `${ctx.alert.color}` }} className="true" />}
                <span>{ctx.alert.text}</span>
            </AlertStyle>
        </AdminApp>
    );
}

export default Layout;

const AdminApp = styled.div`
    .MainParent{
        height:100vh;
        // display:flex;
        .leftMenuPar{
            box-shadow: 5px 0 8px -4px rgba(0,80,180,0.2);
        }
        
    }
    .ContentPar{
        height:100vh;
        background-color: #f2f2f2;
        .itemsPar{
            margin-right:-15px;
            padding-right:25px;
            padding-top:25px;
            padding-left:10px;
            overflow-y:scroll;
            height:90vh;
        }
        .topMenuPar{
            display:flex;
            align-items:center;
            justify-content:space-between;
            box-shadow: 0 1px 8px -2px rgba(0,80,180,0.2);
            background-color:white;
            padding:6px 30px;
            // margin-bottom:15px;
            .SwitchPar{
                display:flex;
                align-items:center;
            }
            .profilePar{
                display:flex;
                position:relative;
                .otherPar{
                    width:140px;
                    background-color:white;
                    position:absolute;
                    bottom:-45px;
                    right:-10px;
                    // padding:5px 10px;
                    border-radius:4px;
                    text-align:left;
                    .logout{
                        padding:5px 16px;
                        cursor:pointer;
                        color:#2c2945;
                        text-align:left;
                        display:flex;
                        font-size:14px;
                        align-items:center;
                        &:hover{
                            border-radius:4px;
                            background-color:rgba(0,0,0,0.1);
                        }
                        svg{
                            font-size:20px;
                            margin-right:10px;
                        }
                    }
                }
                
                .Profile{
                    cursor:pointer;
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
                        transition:all 0.3s ease;
                        margin-left:2px;
                        font-size:12px;
                        color:rgba(0,30,80,1);
                    }
                }
            }
            
           
        }
        @media (max-width:760px){
            .SwitchPar{
                display:none !important;
            }
        }
    }
`

const AlertStyle = styled.div`
    z-index:1010;  
    transition:all 0.5s ease;
    position:fixed;
    // height:80px;
    bottom:100px;
    left:2%;
    display:flex;
    align-items:center;
    border:1px solid rgba(0,0,0,0.2);
    // border-left:4px solid green;
    background-color:white;
    padding:10px 40px; 
    font-weight:400;
    color:black;
    border-radius:6px;
    font-size:17px;
    opacity:1;
    font-weight:600;
    .true{
        margin-right:14px;
        font-size:24px;
        // color:green;
    }
`
