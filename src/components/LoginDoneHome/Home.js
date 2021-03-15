import React, { useEffect, useState } from 'react'
import styled ,{keyframes} from 'styled-components'
import { ColorRgb } from '../theme'
import { useParams } from "react-router-dom";
import axios from '../../axiosbase';
import AccessToken from '../../context/accessToken'
import ActiveComp from './ActiveComp'
import InitialComp from './initialComp'




function Home() {
    const userId = useParams().userId;
    const [infData, setInfData] = useState(null);

    useEffect(async () => {
        if (userId) {
            await axios.get(`pps-infos/registered-companies?userId=${userId}`, { headers: { Authorization: AccessToken() } }).then((res) => {
                console.log(res, " ress"); if (res.data.data[0]) { setInfData(res.data.data[0]) }
            })
        }else {
            let userID = localStorage.getItem("userId");
            await axios.get(`pps-infos/registered-companies?userId=${userID}`, { headers: { Authorization: AccessToken() } }).then((res) => {
                console.log(res, " ress"); if (res.data.data[0]) { setInfData(res.data.data[0]) }
            })
        }
    }, []);

    console.log(userId, " 0--=-=- user Id");

    return (
        <HomeComponent style={userId?{maxWidth:"2000px"}:{maxWidth:"1160px"}} className={`container`}>
            <div className="headerPar">
                <div className="header row">
                    <div className="col-md-4"><div className="headItems"><span className="text">1.Түншлэлийн хөтөлбөрт бүрдүүлэх баримт</span> </div></div>
                    <div className="col-md-4"><div className="headItems"><span className="text">2. Үнэлгээ, шийдвэр гарах явц</span> </div></div>
                    <div className="col-md-4"><div className="headItems"><span className="text"> 3. Гэрээ байгуулах, гүйцэтгэл санхүүжилтийн..</span></div></div>
                </div>

                <div className="otherHead row">
                    <div className="col-md-4"><div className="headItems" > <span className="text">1-р шат</span> <span className="text">2-р шат</span> </div></div>
                    <div className="col-md-4"><div className="headItems"><span className="text">Бизнес хяналтын зөвлөх</span><span className="text">Үнэлгээ, шийдвэр</span> </div></div>
                </div>
            </div>
            {infData === null ? <InitialComp /> : <ActiveComp prew={userId} data={infData} />}
        </HomeComponent>
    )
}


export default Home



const animeate1 = keyframes`
    0% { transform:scale(1);opacity:1; }
    50% { transform:scale(1.1);opacity:0.5; }
    100% { transform:scale(1);opacity:1; }
`


const HomeComponent = styled.div`
    max-width:1160px;
    text-align:center;
    font-size:13px;
    a{
        text-decoration:none;
    }
    
    .itemsCol{
        // border-right:1px solid rgba(0,0,0,0.3);
        // border-right-style:dashed;
        &:before{
            content:"";
            right:0;
            top:4%;
            width:1px;
            height:96%;
            background-color:#C1C1C1;
            position:absolute;
        }
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
                    width:93%;
                    border-radius:4px;
                    padding:7px 10px;
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
                    padding:7px 10px;
                    // border:1px solid rgba(0,0,0,0.6);
                    color:rgba(0,0,0,1);
                    position:relative;
                    background-color:#89E673;
                    animation-name:${animeate1};
                    animation-duration:.7s;
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
                    height:6vh;
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
                height:100%;
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
                padding:7px 10px;
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
                    top:-9px;
                    right:5%;
                    border:1px solid #C1C1C1;
                    background-color:white;
                    color:#C1C1C1;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    bottom:-43px;
                    right:-21px;
                    height:42px;
                    width:90px;
                    border-right:1px solid #C1C1C1; 
                    border-bottom:1px solid #C1C1C1;
                    border-left:1px solid #C1C1C1;
                    border-radius: 0 0 90px 90px;
                }
            }
            .resultActive{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 10px;
                border:1px solid rgba(0,0,0,0.2);
                color:black;
                position:relative;
                background-color:#89E673;
                font-weight:500;
                background-color:#89E673;
                animation-name:${animeate1};
                animation-duration:.7s;
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
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    bottom:-43px;
                    right:-21px;
                    height:42px;
                    width:90px;
                    border-right:1px solid #C1C1C1; 
                    border-bottom:1px solid #C1C1C1;
                    border-left:1px solid #C1C1C1;
                    border-radius: 0 0 90px 90px;
                }
            }
            .resultWaiting{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 10px;
                border:1px solid rgba(0,0,0,0.2);
                color:black;
                position:relative;
                background-color:#F7FF48;
                &::before{
                    content:"...";
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
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    bottom:-43px;
                    right:-21px;
                    height:42px;
                    width:90px;
                    border-right:1px solid #C1C1C1; 
                    border-bottom:1px solid #C1C1C1;
                    border-left:1px solid #C1C1C1;
                    border-radius: 0 0 90px 90px;
                }
            }
            
            .arrHelp{
                position:relative;
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    top:-46px;
                    left:-22px;
                    height:45px;
                    width:95px;
                    border-right:1px solid #C1C1C1; 
                    border-top:1px solid #C1C1C1;
                    border-left:1px solid #C1C1C1;
                    border-radius: 90px 90px 0 0;
                }
                .helpArr{
                    z-index:333;
                    top:-12px;
                    left:66px;
                    position:absolute;
                    height:12px;
                    width:12px;
                    background-color:#C1C1C1;
                    clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0)
                }
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
                    width:45%;
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
    
`
