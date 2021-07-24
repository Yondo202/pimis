import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { ColorRgb } from '../theme'
import axios from '../../axiosbase';
import AccessToken from '../../context/accessToken'
import ActiveComp from './ActiveComp'
// import InitialComp from './initialComp'
import useQuery from 'components/utilities/useQueryLocation'
import Start from "components/LoginDoneHome/Start"

function Home() {
    const userId = useQuery().get('userId')
    const projectId = useQuery().get('projectId')
    const [ infData, setInfData] = useState(null);
    const [ infCond, setInfCond ] = useState(false);
    const [ homeC, setHomeC ] = useState(true);

    useEffect(() => {
        if (userId) {
            Go();
        } else {
            GoUser();
        }
    }, []);

    const Go = async () =>{
       await axios.get(`pps-infos/registered-companies`, {
            headers: { Authorization: AccessToken() },
            params: projectId ? { userId: userId, projectId: projectId } : { userId: userId },
        }).then((res) => {
            if (res.data.data[0]) { setInfData(res.data.data[0]) }
        })
    }
    
    const GoUser = async () =>{
            let userID = localStorage.getItem("userId");
           await axios.get(`pps-infos/registered-companies?userId=${userID}`, {
                headers: { Authorization: AccessToken() }
            }).then((res) => {
                if (res.data.data[0]) { 
                    setInfData(res.data.data[0])
                    if(!res.data.data[0]?.criteria){
                        setTimeout(() => {
                            setHomeC(false);
                        }, 2900)
                        setTimeout(() => {
                            setInfCond(true);
                        }, 3000)
                    }
                }else{
                    setTimeout(() => {
                        setHomeC(false);
                    }, 2900)
                    setTimeout(() => {
                        setInfCond(true);
                    }, 3000)
                }
            }).catch(err=>{
                console.log(`err`, err.response);
            })
    }

    return (
        <HomeComponent style={userId ? { maxWidth: "2000px" } : { maxWidth: "1160px" }} className={`container`}>
            {!infCond ? infData?.criteria === 1
                ? <h3 style={{ marginTop: 50 }}>
                    Таны асуулгаас харахад байгууллага Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрт аж ахуйн нэгжийн шаардлагыг хангахгүй байна. Гэвч танай компани кластерын бүрэлдэхүүний гишүүний шаардлагыг хангавал манайд хандаж болно.
                </h3>
                : <div className={homeC?"":`Hiding`}>
                    <div className="headerPar">
                        {userId ? <div className="header row">
                            <div className="col-md-4"><div className="headItems"><span className="text"><span className="titlee">Байгууллагын нэр:</span>{infData?.companyname}</span> </div></div>
                            <div className="col-md-4"><div className="headItems"><span className="text"><span className="titlee">Төслийн нэр:</span>{infData?.project?.project_name}</span>  </div></div>
                            <div className="col-md-4"><div className="headItems"><span className="text"><span className="titlee">Байгууллагын регистр:</span>{infData?.companyregister}</span> </div></div>
                        </div>
                            : (<div className="header row">
                                <div className="col-md-4"><div className="headItems"><span className="text">1. Бүрдүүлэх материал</span> </div></div>
                                <div className="col-md-4"><div className="headItems"><span className="text">2. Үнэлгээ, шийдвэр гаргах явц</span> </div></div>
                                <div className="col-md-4"><div className="headItems"><span className="text">3. Гэрээ, гүйцэтгэл, санхүүжилт</span></div></div>
                            </div>)}
                        {!userId && <div className="otherHead row">
                            <div className="col-md-4"><div className="headItems" > <span className="text">1-р шат</span> <span className="text">2-р шат</span> </div></div>
                            <div className="col-md-4"><div className="headItems"><span className="text">Бизнес шинжээчийн үнэлгээ</span><span className="text">Үнэлгээний хорооны шийдвэр</span></div></div>
                        </div>}
                    </div>
                    {/* {infData === null ? <InitialComp prew={userId} /> : <ActiveComp prew={userId} data={infData} />} */}
                    <ActiveComp prew={userId} data={infData} />
                </div>:<Start userId={userId} />}
        </HomeComponent>
    )
}

export default Home

const animate2 = keyframes`
    0% { margin-top:-15px; opacity:0; }
    100% { margin-top:0px; opacity:1;  }
`
const animate3 = keyframes`
    0% { transform:scale(0); opacity:0; }
    60% { transform:scale(0.56); opacity:0; }
    100% { transform:scale(1); opacity:1;  }
`
const animate4 = keyframes`
    0% { height:0%; }
    100% { height:100%; }
`
const animate5 = keyframes`
    0% { height:0vh; }
    100% { height:6vh; }
`
const HomeComponent = styled.div`
    max-width:1160px;
    text-align:center;
    font-size:13px;
    a{
        text-decoration:none;
    }
    .itemsCol{
        border-right:1px solid rgba(0,0,0,0.3);
        border-right-style:dashed;
        .itemsPar{
            height:70vh;
            width:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            margin-top:30px;
            
            .mains{
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                .items{
                    animation: ${animate2} 1.2s ease;
                    width:93%;
                    border-radius:4px;
                    padding:7px 7px;
                    border:1px solid rgba(0,0,0,0.2);
                    color:rgba(0,0,0,0.5);
                    position:relative;
                    &::before{
                        content:"-";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        bottom:-7px;
                        right:-1%;
                        border:1px solid #C1C1C1;
                        background-color:white;
                        color:#C1C1C1;
                        width:18px;
                        height:18px;
                        border-radius:50%;
                    }
                }
                .itemsActive{
                    // margin-top:-10px;
                    font-weight:500;
                    width:93%;
                    border-radius:4px;
                    padding:7px 7px;
                    // border:1px solid rgba(0,0,0,0.6);
                    color:rgba(0,0,0,1);
                    position:relative;
                    background-color:#89E673;
                    animation: ${animate2} 1.2s ease;
                    &::before{
                        content:"✔";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        bottom:-7px;
                        right:-1%;
                        border:1px solid green;
                        background-color:white;
                        color:green;
                        width:18px;
                        height:18px;
                        border-radius:50%;
                    }
                }
                .itemsNotApproved{
                    border:1px solid rgba(255,0,0,0.6);
                    &::before{
                        border:1px solid rgba(255,0,0,0.6);
                    }
                }

                .itemsNotWait{
                    border:1px solid rgba(0,255,0,0.6);
                        &::before{
                            border:1px solid rgba(0,255,0,0.6);
                        }
                }
                .line{
                    position:relative;
                    animation: ${animate5} 1s ease;
                    height:4em;
                    width:1.2px;
                    background-color:#C1C1C1;
                    &::after{
                        content:"";
                        bottom:-2px;
                        left:-480%;
                        position:absolute;
                        height:12px;
                        width:12px;
                        background-color:#C1C1C1;
                        clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0);
                    }
                }
                .line2{
                    background-color:#535352;
                    &::after{
                        background-color:#535352;
                    }
                }
            }
            .lineFull{
                position:relative;
                animation: ${animate4} 1s ease;
                height:80%;
                width:1.2px;
                background-color:#C1C1C1;
                &::after{
                    content:"";
                    bottom:-2px;
                    left:-480%;
                    position:absolute;
                    height:12px;
                    width:12px;
                    background-color:#C1C1C1;
                    clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0);
                }
            }
            .lineFull2{
                background-color:#535352;
                &::after{
                    background-color:#535352;
                }
            }
            .resultDesable{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 7px;
                border:1px solid rgba(0,0,0,0.2);
                color:rgba(0,0,0,0.5);
                position:relative;
                animation: ${animate3} 1.2s ease;
                &::before{
                    content:"-";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid #C1C1C1;
                    background-color:white;
                    color:#C1C1C1;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .resultActive{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 7px;
                border:1px solid rgba(0,0,0,0.2);
                color:black;
                position:relative;
                background-color:#89E673;
                font-weight:500;
                background-color:#89E673;
                animation: ${animate3} 1.2s ease;
                &::before{
                    content:"✔";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid green;
                    background-color:white;
                    color:green;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .resultWaiting{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 7px;
                border:1px solid rgba(255,0,0,1);
                color:black;
                position:relative;
                background-color:#F7FF48;
                &::before{
                    content:"X";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid #F8FF5D;
                    background-color:white;
                    color:black;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .arrHelp{
                position:relative;
            }
            .arrHelpActive{
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    top:-46px;
                    left:-22px;
                    height:45px;
                    width:96px;
                    border-right:1px solid #535352; 
                    border-top:1px solid #535352;
                    border-left:1px solid #535352;
                    border-radius: 90px 90px 0 0;
                }
                .helpArr{
                    z-index:333;
                    top:-12px;
                    left:67px;
                    position:absolute;
                    height:12px;
                    width:12px;
                    background-color:#535352;
                    clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0)
                }
            }
        }
    }
    .ActiveCol{
        &:before{
            content:"";
            right:0;
            top:4%;
            width:1px;
            height:96%;
            background-color:#535352;
            position:absolute;
            
        }
    }
    .itemsColA{
        &::before{
            display:none;
        }
        .resultDesable{
            &::after{
                display:none;
            }
        }
    }
    .headerPar{
        margin-top:1px;
        .header{
            background-color: rgba(${ColorRgb},1);
            .headItems{
                display:flex;
                align-items:center;
                justify-content:center;
                // height:70px;
                padding-bottom:10px;
                padding-top: 10px;
                padding-right:15px;
                padding-left:15px;
                .text{
                    border-radius:6px;
                    font-weight:500;
                    text-align:center;
                    width:100%;
                    background-color:rgba(255,255,102,0.9);
                    padding:4px 8px;
                    .titlee{
                        font-weight:400;
                        margin-right:15px;
                    }
                }
            }
            .headItems2{
                display:flex;
                align-items:center;
                justify-content:center;
                padding:15px 0px;
                .text2{
                    border-radius:6px;
                    font-weight:500;
                    text-align:center;
                    width:70%;
                    background-color:rgba(255,255,102,0.9);
                    padding:4px 8px;
                }
            }
        }
        .otherHead{
            padding:3px 0px;
            font-size:12px;
            border-bottom:1px solid rgba(0,0,0,.2);
            border-style:dashed;
            display:flex;
            align-items:center;
            .headItems{
               margin-right:-15px;
               display:flex;
               align-items:center;
               justify-content:space-between;
                span{
                    height:100%;
                    padding-right:15px;
                    border-right:1px solid rgba(0,0,0,0.1);
                    width:48%;
                    font-weight:500;
                    font-size:14px;
                }
            }
        }
    }
    
    @media only screen and (max-width:786px){
        .itemsCol{
            .itemsPar{
                .resultDesable{
                    &::after{
                        display:none;
                    }
                }
                .arrHelp{
                    &::after{
                        display:none;
                    }
                }
            } 
        } 
    }

    .Hiding{
        transition:all 0.4s ease;
        transform:scale(0.8);
        opacity:0;
    }
    
`
