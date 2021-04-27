import React, { useContext, useState, useEffect } from 'react'
import { useParams,useHistory } from 'react-router-dom';
import { animateScroll as scroll } from "react-scroll";
import {IoMdCheckmarkCircle  } from 'react-icons/io';
import {RiArrowGoBackFill  } from 'react-icons/ri';
import { CgDanger } from 'react-icons/cg';
import {VscOpenPreview} from 'react-icons/vsc'
import TableOne from '../../components/requests/oldRequest/tableOne';
import TableTwo from '../../components/requests/oldRequest/tableTwo';
import TableThree from "../../components/requests/oldRequest/tableThree";
import TableFour from '../../components/requests/oldRequest/tableFour';
import TableFive from "../../components/requests/oldRequest/tableFive";
import TableSix from '../../components/requests/oldRequest/tableSix';
import { motion } from 'framer-motion'
import styled from 'styled-components'
import HelpContext from '../../context/HelperContext'
import {Modal} from '../../components/requests/MainModal/Modal'
import axios from '../../axiosbase'
import {ColorRgb, textColor} from '../../components/theme'
import AccessToken from '../../context/accessToken'
import DocumentTitle from 'containers/document/DocumentTitle'

function MainRequest() {
    DocumentTitle("Байгаль орчны үнэлгээний асуумж");
    const history = useHistory();
    const param = useParams().url;
    const [ showModal, setShowModal ] = useState(false);
    const ModalOpen = () => {  setShowModal(prev => !prev); }
    const helpCtx = useContext(HelpContext);
    const [ initialData, setInitialData ] = useState(null);
    const [ ScrollClass, setScrollClass ] = useState("");
    const [ tokens, setTokens ] = useState("");
    const [ userID, setUserId ] = useState();
    const [ na3, setNa3 ] = useState(0);

    useEffect( async()=>{
        if(param==="user"){ 
            // helpCtx.StyleComp("0%", "100%", "200%", "300%", "400%","500%"); scroll.scrollTo(0);
            let storageToken = AccessToken(); setTokens(storageToken); 
            let LocalId = localStorage.getItem("userId");
            window.addEventListener("scroll", handleScroll);
            let resData = await axios.get(`pps-request?userId=${LocalId}`, {headers: {Authorization:AccessToken()}});
            if(resData.data.data.id){ setUserId(resData.data.data.id); setInitialData(resData.data.data);
                helpCtx.TableIdControl(resData.data.data.id);
                setNa3(resData.data.data.na3);
            }
        }else{
            let storageToken = AccessToken(); setTokens(storageToken);
            window.addEventListener("scroll", handleScroll);
            let resData = await axios.get(`pps-request?userId=${param}`, {headers: {Authorization:AccessToken()}});
            if(resData.data.data.id){ setNa3(resData.data.data.na3); setInitialData(resData.data.data); ModalOpen(true); }
        }
    },[param === "user"?helpCtx.reqMount:0]);

    const handleScroll = () => {  if(window.pageYOffset > 50){setScrollClass("modalBtn2");  }else{  setScrollClass(""); } }
    const backHanlde = () =>{ history.goBack(); }

    const func = param === "user"&&helpCtx.StyleComp;
    const One = param === "user"&&helpCtx.GlobalStyle.tableOne;
    const Two = param === "user"&&helpCtx.GlobalStyle.tableTwo;
    const Three = param === "user"&&helpCtx.GlobalStyle.tableThree;
    const Four = param === "user"&&helpCtx.GlobalStyle.tableFour;
    const Five = param === "user"&&helpCtx.GlobalStyle.tableFive;
    const Six = param === "user"&&helpCtx.GlobalStyle.tableSix;
    const errMsg = () =>{ console.log("+*+*+* err Msg");};

    return (
        <>
            {param !== "user"? (initialData?<Modal initialData={initialData} showModal={showModal} setShowModal={setShowModal} param={param} />:<NullParent className="BtnPar"><button onClick={backHanlde} ><RiArrowGoBackFill /> Буцах</button> <h2 style={{textAlign:"center"}}>Мэдээлэл оруулаагүй байна</h2> </NullParent> )
            :( <>
                    <>
                    <PreviewBtn >
                            <div className={`modalBtn ${ScrollClass}`}>
                                <button className="preview" onClick={ModalOpen} ><VscOpenPreview />Бүгдийг харах</button>
                                <div className="countPar container">
                                    <div className="itemsPar">
                                        <div className={`${initialData&&initialData.name1!==null? One==="0%"? `borderPar2 borderGreen`: `borderPar borderGreen` : One==="0%"? `borderPar2`: `borderPar` }`} onClick={initialData&&initialData.name1!==null?(()=>(func("0%", "100%", "200%","300%","400%","500%"),scroll.scrollTo(0) )): (()=>errMsg())} ><span className="items">1</span></div><div className={`${One==="0%" || Two==="0%"? `line2`: `line`}`}></div>
                                        <div className={`${initialData&&initialData.name2!==null? Two==="0%"? `borderPar2 borderGreen`: `borderPar borderGreen` : Two==="0%"? `borderPar2`: `borderPar` }`} onClick={initialData&&initialData.name2!==null?(()=>(func("-100%", "0%", "100%","200%","300%","400%"),scroll.scrollTo(0),helpCtx.reqMountFunc(1) )): (()=>errMsg())}><span className="items">2</span></div><div className={`${Three==="0%"? `line2`: `line`}`}></div>
                                        <div className={`${initialData&&initialData.name3!==null? Three==="0%"? `borderPar2 borderGreen`: `borderPar borderGreen` : Three==="0%"? `borderPar2`: `borderPar` }`} onClick={initialData&&initialData.name3!==null?(()=>(func("-200%", "-100%", "0%","100%","200%","300%"),scroll.scrollTo(0),helpCtx.reqMountFunc(1) )): (()=>errMsg())}><span className="items">3</span></div><div className={`${Four==="0%"? `line2`: `line`}`}></div>
                                        <div className={`${initialData&&initialData.name4!==null? Four==="0%"? `borderPar2 borderGreen`: `borderPar borderGreen` : Four==="0%"? `borderPar2`: `borderPar` }`}  onClick={initialData&&initialData.name4!==null?(()=>(func("-300%", "-200%", "-100%","0%","100%","200%"),scroll.scrollTo(0) )): (()=>errMsg())}><span className="items">4</span></div> 
                                    </div>
                                </div>
                            </div>
                    </PreviewBtn>

                    <Modal initialData={initialData&&initialData} showModal={showModal} setShowModal={setShowModal} param={param} na3={na3} />
                    <ParentComp style={{height:`${helpCtx.GlobalStyle.tableheight}vh`}} className="container">
                        <div style={{left:`${One}`, opacity:`${One === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                                <TableOne  initialData={initialData&&initialData.ppsRequest1Details} initialName={initialData&&initialData.name1} initialDate={initialData&&initialData.date1} id={userID} token={tokens} />
                            </motion.div>
                        </div>
                        <div style={{left:`${Two}`, opacity:`${Two === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableTwo initialData={initialData&&initialData.ppsRequest2Details}  initialName={initialData&&initialData.name2}  initialDate={initialData&&initialData.date2} id={userID} token={tokens} />
                        </div>
                        <div style={{left:`${Three}`, opacity:`${Three === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableThree  initialData={initialData&&initialData.ppsRequest3Details}  initialName={initialData&&initialData.name3}  initialDate={initialData&&initialData.date3} id={userID} token={tokens} na3={na3} />
                        </div>
                        <div style={{left:`${Four}`, opacity:`${Four === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableFour initialData={initialData&&initialData.ppsRequest4Details}  initialName={initialData&&initialData.name4}  initialDate={initialData&&initialData.date4} id={userID} token={tokens} />
                        </div>
                        <div style={{left:`${Five}`, opacity:`${Five === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableFive initialData={initialData&&initialData.ppsRequest5Detail}  initialName={initialData&&initialData.name5}  initialDate={initialData&&initialData.date5} id={userID} token={tokens}  />
                        </div>
                        <div style={{left:`${Six}`, opacity:`${Six === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableSix initialData={initialData&&initialData.ppsRequest6Detail}  initialName={initialData&&initialData.name6}  initialDate={initialData&&initialData.date6} id={userID} token={tokens} />
                        </div> 
                    </ParentComp>
                    </>

                <AlertStyle style={helpCtx.alert.cond === true ? {bottom:`100px`, opacity:`1`, borderLeft:`4px solid ${helpCtx.alert.color}`} : {bottom:`50px`, opacity:`0`}} >
                    {helpCtx.alert.color=== "green"?<IoMdCheckmarkCircle style={{color:`${helpCtx.alert.color}`}} className="true" /> : <CgDanger style={{color:`${helpCtx.alert.color}`}} className="true" /> }
                    <span>{helpCtx.alert.text}</span>
                </AlertStyle>
            </>
            )}
        </>
    )
}

export default MainRequest

let easing = [0, 0, 0.56, 0.95];
const textVariants2 = {exit: { y: -100, opacity: 0, transition: { duration: 0.9, ease: easing } },
    enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 0.6, ease: easing }}};


const NotApprovedComp = styled.div`
    background-color:white;
    dispaly:flex;
    flex-direction:row;
    align-items:center;
    margin-top:30px;
    button{
        padding:5px 10px;
        border:1px solid rgba(0,0,0,0.2);
        border-radius:3px;
        display:flex;
        svg{
            margin-right:6px;
        }
    }
`


const NullParent = styled.div`
    dispaly:flex;
    flex-direction:row;
    align-items:center;
    button{
        padding:5px 10px;
        border:1px solid rgba(0,0,0,0.2);
        border-radius:3px;
        display:flex;
        svg{
            margin-right:6px;
        }
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
            z-index:1;
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
                    
                }
                .borderGreen{
                    border:1px solid rgba(5,180,8,0.9);
                }
            }
        }
        button{
            z-index:1;
            cursor:pointer;
            border-style:none;
            border:solid 1px green;
            top:10px;
            left:15px;
            position:absolute;
            width:140px;
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
        .preview{
            padding:4px 10px;
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
                .borderGreen{
                    border:1px solid rgba(5,180,8,0.9);
                }
            }
        }
    }
    @media only screen and (max-width:768px){
        .modalBtn{
            .preview{
                display:none;
            }
            .countPar{
                .itemsPar{
                    width:100%;
                }
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

const GifPar = styled.div`
    height:90vh;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:white;
  
    img{
        // border-radius:50%;
    }
`

const ParentComp = styled.div`
    width:100%;
    overflow:hidden;
    position:relative;
    // transition:all 0.6s ease;
    margin-top:60px;
    .handleSlidePAr1{
        width:100%;
        position:absolute;
        transition:left 0.8s ease, opacity 1s ease-in;

    }
    @media only screen and (max-width:768px){
        height:1000vh !important;
    }
`
