import React from 'react'
import styled from 'styled-components'
import {fontFamily, textColor,fontSize,Color,ColorRgb} from '../theme'
import {VscCalendar,VscGoToFile,VscRepoPush} from 'react-icons/vsc'
import {GiSandsOfTime} from 'react-icons/gi'
import {IoResizeOutline,IoEyeOutline} from 'react-icons/io5'
import {  Link } from "react-router-dom";


function RequestHome() {
    return (
        <Reqhome className="container">
            <div className="cardParent">
                <div className="row">
                    <div className="col-md-4">
                        <div className="infoPar">
                        <div className="content">
                            <VscGoToFile />
                            <div className="conPar">
                                <div className="title">Төслийн нэр :</div>
                                <div className="desc">
                                    Exaple ...
                                </div>
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
                    </div>
                </div>
                <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <div className="infoPar">
                        <div className="content">
                            <VscGoToFile />
                            <div className="conPar">
                                <div className="title">Төслийн нэр :</div>
                                <div className="desc">
                                    Exaple ...
                                </div>
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
                    </div>
                </div>
            </div>
            </div>
            <div className="RequestPar">
                <VscRepoPush />
                <div className="header">
                    <Link to="comp-request-new">
                         Шинээр хүсэлт илгээх
                    </Link>
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
            padding:30px 50px;
            border-radius:8px;
            // border:1px solid black;
            background-color:white;
            width 100%;
            box-shadow:1px 1px 13px -5px ${Color};
            cursor:pointer;
            transition:all 0.3s ease;
            &:hover{
                box-shadow:1px 1px 20px -5px ${Color};
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
        border-top:1px solid rgba(${ColorRgb},0.6);
        margin-top:30px;
        padding-top:20px;
        display:flex;
        flex-direction:row;
        align-items:center;
        svg{
            font-size:40px;
            margin-right:15px;
        }
        .header{
            cursor:pointer;
            font-weight:500;
            font-size:20px;
            &:hover{
                color:green;
            }
            a{
                text-decoration:none;
            }
        }
    }
`
