import React, { useContext, useState, useEffect } from 'react'
import { Link, animateScroll as scroll } from "react-scroll";
import {VscOpenPreview} from 'react-icons/vsc'
import TableOne from '../../components/requests/oldRequest/tableOne';
import TableTwo from '../../components/requests/oldRequest/tableTwo';
import TableThree from "../../components/requests/oldRequest/tableThree";
import TableFour from '../../components/requests/oldRequest/tableFour';
import TableFive from "../../components/requests/oldRequest/tableFive";
import TableSix from '../../components/requests/oldRequest/tableSix';
import { motion } from 'framer-motion'
import styled from 'styled-components'
import UserContext from '../../context/UserContext'
import { HelpStore } from '../../context/HelperContext'
import {Modal} from '../../components/requests/MainModal/Modal'
import axios from '../../axiosbase'
import {ColorRgb, textColor} from '../../components/theme'


function MainRequest(props) {
    const [ showModal, setShowModal ] = useState(false);
    const ModalOpen = () => {  setShowModal(prev => !prev); }
    const StyleContext = useContext(UserContext);
    const [Loading, setLoading] = useState(true);
    const [ initialData, setInitialData ] = useState([]);
    const [ ScrollClass, setScrollClass ] = useState("");
    const [ tokens, setTokens ] = useState("");


    useEffect( async()=>{
        let storageToken = localStorage.getItem("edp_loggedUser", []);
        setTokens(storageToken);
        window.addEventListener("scroll", handleScroll);
        let resData = await axios.get(`pps-request/${StyleContext.reqID}`, {headers: {Authorization:`bearer ${storageToken}`}});
        if(resData.data.data){ setInitialData(resData.data.data); setLoading(false); }
      },[]);
      const handleScroll = () => {
          if(window.pageYOffset > 50){
            setScrollClass("modalBtn2");
          }else{
            setScrollClass("");
          }
      }
    console.log(" ^^^^^^^^^^ initial",initialData );
    const func = StyleContext.StyleComp
    const One = StyleContext.GlobalStyle.tableOne
    const Two = StyleContext.GlobalStyle.tableTwo
    const Three = StyleContext.GlobalStyle.tableThree
    const Four = StyleContext.GlobalStyle.tableFour
    const Five = StyleContext.GlobalStyle.tableFive
    const Six = StyleContext.GlobalStyle.tableSix
     
    return (
            <>
                <PreviewBtn >
                    <div className={`modalBtn ${ScrollClass}`}>
                        <button onClick={ModalOpen} ><VscOpenPreview /> Preview</button>
                        <div className="countPar container">
                            <div className="itemsPar">
                                <div className={`${One==="0%"? `borderPar2`: `borderPar`}`} onClick={()=>(func("0%", "100%", "200%","300%"),scroll.scrollTo(0))} ><span className="items">1</span></div><div className={`${One==="0%" || Two==="0%"? `line2`: `line`}`}></div>
                                <div className={`${Two==="0%"? `borderPar2`: `borderPar`}`} onClick={()=> (func("-100%", "0%", "100%","200%"),scroll.scrollTo(0))}><span className="items">2</span></div><div className={`${Three==="0%"? `line2`: `line`}`}></div>
                                <div className={`${Three==="0%"? `borderPar2`: `borderPar`}`} onClick={()=>(func("-200%", "-100%", "0%","100%"),scroll.scrollTo(0))}><span className="items">3</span></div><div className={`${Four==="0%"? `line2`: `line`}`}></div>
                                <div className={`${Four==="0%"? `borderPar2`: `borderPar`}`} onClick={()=>(func("-300%", "-200%", "-100%","0%"),scroll.scrollTo(0))}><span className="items">4</span></div> 
                            </div>
                        </div>
                    </div>
                </PreviewBtn>
                {Loading === true? <GifPar className="Gif"> <img src="https://media.giphy.com/media/52qtwCtj9OLTi/giphy.gif" alt="edp-gif" /></GifPar> : (
                    <>
                    <Modal initialData={initialData} showModal={showModal} setShowModal={setShowModal}  />
                    <ParentComp style={{height:`${StyleContext.GlobalStyle.tableheight}vh`}} className="container">
                        <div style={{left:`${One}`, opacity:`${One === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                                <TableOne  initialData={initialData.ppsRequest1Details} initialName={initialData.name1} initialDate={initialData.date1} id={StyleContext.reqID} token={tokens} />
                            </motion.div>
                        </div>
                        <div style={{left:`${Two}`, opacity:`${Two === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableTwo initialData={initialData.ppsRequest2Details}  initialName={initialData.name2}  initialDate={initialData.date2} id={StyleContext.reqID} token={tokens} />
                        </div>
                        <div style={{left:`${Three}`, opacity:`${Three === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableThree initialData={initialData.ppsRequest3Details}  initialName={initialData.name3}  initialDate={initialData.date3} id={StyleContext.reqID} token={tokens} />
                        </div>
                        
                        <div style={{left:`${Four}`, opacity:`${Four === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableFour initialData={initialData.ppsRequest4Details}  initialName={initialData.name4}  initialDate={initialData.date4} id={StyleContext.reqID} token={tokens} />
                        </div>

                        <div style={{left:`${Five}`, opacity:`${Five === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableFive initialData={initialData.ppsRequest5Detail}  initialName={initialData.name5}  initialDate={initialData.date5} id={StyleContext.reqID} token={tokens}  />
                        </div>
                        <div style={{left:`${Six}`, opacity:`${Six === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                            <TableSix initialData={initialData.ppsRequest6Detail}  initialName={initialData.name6}  initialDate={initialData.date6} id={StyleContext.reqID} token={tokens} />
                        </div> 
                    </ParentComp>
                    </>
                ) }
            </>
    )
}

export default MainRequest

let easing = [0, 0, 0.56, 0.95];
const textVariants2 = {exit: { y: -100, opacity: 0, transition: { duration: 0.9, ease: easing } },
    enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 0.6, ease: easing }}};


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
