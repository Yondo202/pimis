import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../../axiosbase'
import {IoMdCheckmarkCircle  } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import TableOne from '../../components/requests/newRequest/tableOne'
import { motion } from 'framer-motion'
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
import TableTwo from '../../components/requests/newRequest/tableTwo';
import styled from 'styled-components'
import TableThree from '../../components/requests/newRequest/tableThree';
import UserContext from '../../context/HelperContext'
import TableFour from '../../components/requests/newRequest/tableFour'
import TableFive from '../../components/requests/newRequest/tableFive'
import TableSix from '../../components/requests/newRequest/tableSix'
import {ColorRgb, textColor} from '../../components/theme'
import AccessToken from '../../context/accessToken'

const options = { timeout: 10000, position: positions.BOTTOM_CENTER, offset: '120px', width:'500px' };

function MainRequest() {
    const history = useHistory();
    useEffect(async()=>{
        try{
         let resData = await axios.get(`pps-request`, {headers: {Authorization:AccessToken()}});
         if(resData.data.data.id){ history.push('/comp-request/old') }
        }catch{console.log("Алдаа гарсан"); }
    },[]);
    


    const StyleContext = useContext(UserContext);const One = StyleContext.GlobalStyle.tableOne; const Two = StyleContext.GlobalStyle.tableTwo; const Three = StyleContext.GlobalStyle.tableThree; const Four = StyleContext.GlobalStyle.tableFour;
    return (
            <>
                <PreviewBtn >
                    <div className={`modalBtn`}>
                        <div className="countPar container">
                            <div className="itemsPar">
                                <div className={`${One==="0%"? `borderPar2`: `borderPar`}`}  ><span className="items">1</span></div><div className={`${One==="0%" || Two==="0%"? `line2`: `line`}`}></div>
                                <div className={`${Two==="0%"? `borderPar2`: `borderPar`}`} ><span className="items">2</span></div><div className={`${Three==="0%"? `line2`: `line`}`}></div>
                                <div className={`${Three==="0%"? `borderPar2`: `borderPar`}`} ><span className="items">3</span></div><div className={`${Four==="0%"? `line2`: `line`}`}></div>
                                <div className={`${Four==="0%"? `borderPar2`: `borderPar`}`} ><span className="items">4</span></div> 
                            </div>
                        </div>
                    </div>
                </PreviewBtn>

                {/* <ParentComp style={{height:`${StyleContext.GlobalStyle.tableheight}vh`}} className="container"> */}
                <ParentComp style={{height:`${StyleContext.GlobalStyle.tableheight}vh`}} className="container">
                    <div style={{left:`${StyleContext.GlobalStyle.tableOne}`, opacity:`${StyleContext.GlobalStyle.tableOne === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                        <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                            <TableOne  />
                        </motion.div>
                    </div>
                    <div style={{left:`${StyleContext.GlobalStyle.tableTwo}`, opacity:`${StyleContext.GlobalStyle.tableTwo === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                        <Provider template={AlertMUITemplate} {...options}>
                            <TableTwo />
                        </Provider>
                    </div>
                    <div style={{left:`${StyleContext.GlobalStyle.tableThree}`, opacity:`${StyleContext.GlobalStyle.tableThree === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                        <TableThree />
                    </div>
                    <div style={{left:`${StyleContext.GlobalStyle.tableFour}`, opacity:`${StyleContext.GlobalStyle.tableFour === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                        <TableFour />
                    </div>

                    <div style={{left:`${StyleContext.GlobalStyle.tableFive}`, opacity:`${StyleContext.GlobalStyle.tableFive === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                        <TableFive />
                    </div>

                    <div style={{left:`${StyleContext.GlobalStyle.tableSix}`, opacity:`${StyleContext.GlobalStyle.tableSix === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                        <TableSix />
                    </div>
                </ParentComp>

                <AlertStyle style={StyleContext.alert.cond === true ? {bottom:`100px`, opacity:`1`, borderLeft:`4px solid ${StyleContext.alert.color}`} : {bottom:`50px`, opacity:`0`}} >
                    {StyleContext.alert.color=== "green"?<IoMdCheckmarkCircle style={{color:`${StyleContext.alert.color}`}} className="true" /> : <CgDanger style={{color:`${StyleContext.alert.color}`}} className="true" /> }
                    <span>{StyleContext.alert.text}</span>
                </AlertStyle>
            </>
    )
}
export default MainRequest


let easing = [0, 0, 0.56, 0.95];
const textVariants2 = {exit: { y: -100, opacity: 0, transition: { duration: 0.9, ease: easing } },
    enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 0.6, ease: easing }}};

const ParentComp = styled.div`
    width:100%;
    // overflow:hidden;
    position:relative;
    // transition:all 0.6s ease;
    margin-top:30px;
    .handleSlidePAr1{
        width:100%;
        position:absolute;
        transition:left 0.8s ease, opacity 1s ease-in;

    }
    @media only screen and (max-width:768px){
        height:1000vh !important;
    }
`
const AlertStyle = styled.div`
    z-index:1010;  
    transition:all 0.5s ease;
    position:fixed;
    // height:80px;
    bottom:100px;
    left:5%;
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
const PreviewBtn = styled.div`
    .modalBtn{
        // background-color:rgba(0,0,0,0.1);
        border-bottom:1px solid rgba(0,0,0,0.1);
        display:flex;
        align-items:center;
        justify-content:center;
        width:100%;
        position:relative;
        height:50px;
        transition:all 0.4s ease;
        .countPar{
            display:flex;
            align-items:center;
            justify-content:center;
            .itemsPar{
                width:80%;
                display:flex;
                flex-direction:row;
                align-items:center;
                justify-content:space-between;
                .line{
                    height:1px;
                    width:26%;
                    background-color:rgba(0,0,0,0.2);
                }
                .line2{
                    height:1px;
                    width:26%;
                    background-color:rgba(0,0,0,0.9);
                }
                .borderPar{
                    cursor:pointer;
                    width:30px;
                    height:30px;
                    border-radius:50%;
                    border:1px solid rgba(0,0,0,0.5);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    .items{
                       
                    }
                }
                .borderPar2{
                    cursor:pointer;
                    width:30px;
                    height:30px;
                    border-radius:50%;
                    border:1px solid rgba(0,0,0,0.3);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background-color: rgba(${ColorRgb});
                    color:white;
                    font-weight:500;
                    .items{
                       
                    }
                }
            }
        }
        button{
            cursor:pointer;
            border-style:none;
            border:solid 1px green;
            top:10px;
            left:15px;
            position:absolute;
            width:120px;
            // border-style:none;
            border-radius:6px;
            display:flex;
            align-items:center;
            justify-content:center;
            color:rgb(${textColor});
            transition:all 0.3s ease;
            background-color:white;
            svg{
                margin-right:10px;
                font-size:20px;
            }
            &:hover{
                background-color:rgba(0,0,0,0.1)
            }
        }    
    }
    .modalBtn2{
        height:40px;
        transition:all 0.4s ease;
        position:fixed;
        top:0;
        z-index:2;
        border-bottom:1px solid black;
        background-color: rgba(${ColorRgb});
        color:white;
        button{
            top:5px;
        }    
        .countPar{
            .itemsPar{
                .line{
                    height:1px;
                    width:26%;
                    background-color:rgba(255,255,255,0.2);
                }
                .line2{
                    height:1px;
                    width:26%;
                    background-color:rgba(255,255,255,0.9);
                }
                .borderPar{
                    border:1px solid rgba(255,255,255,0.5);
                }
                .borderPar2{
                    background-color:white;
                    border:1px solid rgba(0,0,0,0.3);
                    color:black;
                }
            }
        }
    }
`