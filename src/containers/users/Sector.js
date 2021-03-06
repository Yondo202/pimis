import React, { useState } from 'react';
import SectorDetail from './Sectordetail';
import styled from 'styled-components'
import { IntlProvider } from 'react-intl';
import "./css/sector.scss"
import messages from './message';



function Layout({data, setSelectSectors,setShowSectors, setSectorId}) {
    const [locale, setLocale] = useState('en');
    const [rtl, setRtl] = useState(false);
    const [toggled, setToggled] = useState(false);
    const handleToggleSidebar = (value) => { setToggled(value); };

    return (
        <IntlProvider locale={locale} messages={messages[locale]} >
            <AdminApp className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
                <div className="MainSectorParent">
                    <SectorDetail setSectorId={setSectorId} setShowSectors={setShowSectors} setSelectSectors={setSelectSectors} data={data} handleToggleSidebar={handleToggleSidebar} />
                </div>
            </AdminApp>
        </IntlProvider>

    );
}

export default Layout;

const AdminApp = styled.div`
    .MainSectorParent{
        height:60vh;
        .leftMenuPar{
            box-shadow: 5px 0 8px -4px rgba(0,80,180,0.2);
        }
    }
    .ContentPar{
        position:relative;
        height:100vh;
        background-color: #f2f2f2;
        .itemsPar2{
            position:relative;
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
            // background-color:white;
            background-color:#32373d;
            
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
                    cursor:pointer;
                    width:140px;
                    background-color:white;
                    position:absolute;
                    bottom:-45px;
                    right:-10px;
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
                        font-size:14px;
                        // color:rgba(0,30,80,1);
                        color:rgba(255,255,255,.8);
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

