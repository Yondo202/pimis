import React from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import Login from './login'
import { fontFamily } from "../theme"
import DocumentTitle from 'containers/document/DocumentTitle';
import TrainingsList from 'pages/training/training_user/trainingsList'
import { RiArrowRightSLine } from "react-icons/ri";

function HomeLogin() {
    DocumentTitle("EDP - Нэвтрэх болон Бүртгүүлэх");
    return (
        <ComponentHome >
            <div className="ghost" style={{ backgroundImage: `url(/background1.jpg)` }}>
                <div className="ghostChild"></div>
            </div>
            <div className="training">
                <div className="trainingCont">
                    <TrainingsList />
                    <div className="bottomMenu">
                        <Link to="/trainings/request" className="items">Захиалгат сургалтын хүсэлт <RiArrowRightSLine className="one" /> <RiArrowRightSLine /></Link>
                        <Link to="/trainings/feedback" className="items">Сургалтын үнэлгээ <RiArrowRightSLine className="one" /> <RiArrowRightSLine /></Link>
                    </div>
                </div>
            </div>

            <div className="mainFormPar">
                <Login />
            </div>
        </ComponentHome>
    )
}

export default HomeLogin

const ComponentHome = styled.div`
        font-family: ${fontFamily};
        // height:100vh;
        // background-color:rgba(0,0,0,0.5);
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-between;
        .training{
            width:70%;
            display:flex;
            padding:5rem 10rem 8rem 10rem;
            height:80vh;
            align-items:center;
            justify-content:center;
            .trainingCont{
                position:relative;
                margin-top:-5rem;
                overflow:hidden;
                overflow-y:scroll;
                height:100%;
                padding:1rem 1rem;
                width:40rem;
                border-radius:8px;
                background-color:#fff;
                .bottomMenu{
                    background-color:rgba(230,230,230);
                    position:absolute;
                    width:100%;
                    bottom:0;
                    left:0;
                    display:flex;
                    align-items:center;
                    justify-content:space-evenly;
                    padding:10px 0px;
                    .items{
                        text-decoration:none;
                        transition:all 0.3s ease;
                        color:rgb(${props => props.theme.textColor});
                        display:flex;
                        align-items:center;
                        font-size:14px;
                        cursor:pointer;
                        font-weight:500;
                        line-height:100%;
                        svg{
                            transition:all 0.3s ease;
                            font-size:19px;
                            margin-left:1px;
                        }
                        .one{
                            // display:none;
                            transform:scale(0);
                        }
                        &:hoveR{
                            color:rgba(${props => props.theme.textColor},0.8);
                            .one{
                                transform:scale(1);
                                // display:block;
                            }
                        }
                    }
                }
            }
        }
        .mainFormPar{
            // margin-top:10vh;
            // border-radius:10px;
            padding-top:10vh;
            background-color: white;
            padding:12vh 45px;
            width:30%;
            height:100vh;
            align-items:center;
        }
        .ghost{
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            position:absolute;
            height: 100%;
            width:100%;
            top:0;
            left:0;
            z-index:-99;
            filter:blur(2px);
            .ghostChild{
                z-index:-98;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background-color:rgba(0,0,0,0.6);
                position:absolute;
            }
        }
        @media only screen and (max-width:1500px){
            .mainFormPar{
                width:40%;
            }
            .training{
                width:70%;
                padding:5rem 7rem 8rem 7rem;
            }
        }
        @media only screen and (max-width:1308px){
            .mainFormPar{
                width:50%;
            }
        }
        @media only screen and (max-width:968px){
            flex-direction:column-reverse;
            .mainContentPar{
                width:100%;
            }
            .mainFormPar{
                width:100%;
            }
        }
        @media only screen and (max-width:768px){
            flex-direction:column-reverse;
            .mainContentPar{
                width:100%;
            }
            .training{
                width:100%;
                display:flex;
                padding:1rem 0rem 1rem 0rem;
                .trainingCont{
                    position:relative;
                    margin-top:0rem;
                    .one{
                        display:none;
                    }
                }
            }
            .mainFormPar{
                padding:0px 30px;
                width:100%;
            }
        }
`
