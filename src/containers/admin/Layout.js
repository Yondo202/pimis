import React, { useState } from 'react';
import Aside from '../../components/admin/left_menu/Aside';
import Main from '../../components/admin/left_menu/TopMain';
import styled from 'styled-components'
import HomeAdmin from '../../components/admin/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserHandle from 'components/admin/contents/UserHandle';


function Layout({ setLocale }) {
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
            <Aside  image={image}  collapsed={collapsed} rtl={rtl}  toggled={toggled}    handleToggleSidebar={handleToggleSidebar}  />
        </div>
        
        <div className="container-fluid ContentPar">
            <Main  image={image}  toggled={toggled} collapsed={collapsed}  rtl={rtl} 
                        handleToggleSidebar={handleToggleSidebar}
                        handleCollapsedChange={handleCollapsedChange}
                        handleRtlChange={handleRtlChange}
                        handleImageChange={handleImageChange}
            />
      
            <div className="itemsPar">
                <Switch>
                    <Route path="/admin" component={HomeAdmin} exact />
                    <Route path="/admin/users" component={UserHandle} />
                </Switch>
            </div>

           
        </div>

   
     
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
                .svgPar{
                    margin-right:30px;
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
        @media (max-width:760px){
            .SwitchPar{
                display:none !important;
            }
        }
    }
`

