import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import {fontFamily, textColor,fontSize,Color,ColorRgb} from '../theme'
import {VscCalendar,VscGoToFile,VscNewFile} from 'react-icons/vsc'
import {GiSandsOfTime} from 'react-icons/gi'
import {GrNewWindow} from 'react-icons/gr'
import {FcNext} from 'react-icons/fc'
import {IoResizeOutline} from 'react-icons/io5'
import {  Link } from "react-router-dom";
import axios from '../../axiosbase'
import UserContext from '../../context/UserContext'
import AccessToken from '../../context/accessToken'

function RequestHome() {
    const UserCtx = useContext(UserContext);
    const [ allData, setAllData ] = useState([])

    useEffect(async ()=>{
        const localToken = localStorage.getItem("edp_loggedUser", []);
        let resData = await axios.get(`pps-request`, {headers: {Authorization: AccessToken()}});
        let data = []; data.push(resData.data.data)
        if(resData){ setAllData(data) };
        console.log(resData, " ** my data");
        
    },[]);

    return (
        <Reqhome className="container">
            <div className="cardParent">
                {allData[0]? <></> : (<div className="RequestPar"><VscNewFile /><div className="header"><Link to="comp-request/new"><a> Шинээр хүсэлт илгээх </a></Link></div></div>) }
            
                <div className="row">
                    {allData[0]? allData.map((el,i)=>{
                            return(
                                <div key={i} style={{marginBottom:`30px`}} className="col-md-4">
                                    <div className="infoPar">
                                        <div className="content">
                                            <VscGoToFile />
                                            <div className="conPar">
                                                <div className="title">Төслийн нэр :</div>
                                                <div className="desc"> {el.id}</div>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <IoResizeOutline />
                                            <div className="conPar">
                                                <div className="title">Нийт дэмжлэгийн хэмжээ :</div>
                                                <div className="desc">
                                                    Exaple ...
                                                </div>
                                            </div>
                                        </div>

                                        <div className="content">
                                            <VscCalendar />
                                            <div className="conPar">
                                                <div className="title">Төсөл эхлэх хугацаа :</div>
                                                <div className="desc">
                                                    2019 - 6 - 30
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <GiSandsOfTime />
                                            <div className="conPar">
                                                <div className="title">Төслийн дуусах хугацаа :</div>
                                                <div className="desc">
                                                    2021 - 6 - 25
                                                </div>
                                            </div>
                                        </div>
                                            <div className="oldReq">
                                                    <Link to="comp-request/old">
                                                        {/* <a onClick={()=>(UserCtx.idPass(el.id))}> */}
                                                            Үргэлжлүүлэх
                                                        {/* </a> */}
                                                    </Link>
                                                <FcNext />
                                            </div>
                                    </div>
                                </div>
                            )
                    }) : <div className="col-md-12 col-sm-12 col-12">Илгээсэн хүсэлт байхгүй байна...</div>}
                </div>
            </div>
        </Reqhome>
    )
}

export default RequestHome

const Reqhome = styled.div`
    margin-top:50px;
    font-family:${fontFamily};
    color:rgb(${textColor});
    font-size:${fontSize};
    .cardParent{
        position:relative;
        width:100%;
        .infoPar{
            border-top:5px solid ${Color};
            padding:30px 30px;
            border-radius:8px;
            // border:1px solid black;
            background-color:white;
            width 100%;
            box-shadow:1px 1px 13px -5px ${Color};
            transition:all 0.3s ease;
            &:hover{
                box-shadow:1px 1px 20px -5px ${Color};
            }
            .oldReq{
                border:1px solid rgba(0,0,0,0.2);
                padding:5px 15px;
                border-radius:6px;
                display:flex;
                justify-content:space-between;
                align-items:center;
                a{
                    cursor:pointer;
                    text-decoration: none;
                }
                &:hover{

                }
            }
            .content{
                display:flex;
                align-items:center;
                // justify-content:center;
                margin-bottom: 20px;
                svg{
                    font-size:28px;
                    margin-right:15px;
                }
                .conPar{

                    display:flex;
                    flex-direction:column;
                    .title{
                        font-weight:500;
                    }
                    .desc{
                        color:rgba(${textColor},0.8);
                    }
                }

            }
            .desc{

            }
        }

    }
    .RequestPar{
        border-bottom:1px solid rgba(${ColorRgb},0.6);
        margin-bottom:30px;
        padding-bottom:20px;
        display:flex;
        flex-direction:row;
        align-items:center;
        
        svg{
            font-size:26px;
            margin-right:15px;
        }
        .header{
            cursor:pointer;
            font-weight:500;
            font-size:18px;
            &:hover{
                color:green;
            }
            a{
                text-decoration:none;
            }
        }
    }
    @media (max-width:768px){
        .cardParent{
            .infoPar{
                margin-bottom:30px;
            }
        }
    }
`
