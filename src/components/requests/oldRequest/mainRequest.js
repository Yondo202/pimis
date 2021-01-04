import React, { useContext, useState, useEffect } from 'react'
import TableOne from './tableOne'
import TableTwo from './tableTwo';
import TableThree from "./tableThree"
import { motion } from 'framer-motion'

import styled from 'styled-components'
import UserContext from '../../../context/UserContext'
import { HelpStore } from '../../../context/HelperContext'
import {Modal} from '../MainModal/Modal'
import axios from '../../../axiosbase'


function MainRequest(props) {
    const [ showModal, setShowModal ] = useState(false);
    const ModalOpen = () => {
        console.log("dada");
        setShowModal(prev => !prev);
      }
    const StyleContext = useContext(UserContext);

    const [Loading, setLoading] = useState(true);
    const [ initialData, setInitialData ] = useState([]);

    useEffect( async()=>{
        const resData = await axios.get(`http://192.168.88.78:3000/api/pps-request/60`);
        if(resData.data.data){
            setInitialData(resData.data.data);
            setLoading(false);
        }
      },[]);
      console.log(initialData, "global initial");
     
    // console.log(StyleContext.GlobalStyle , "my global style");
    return (
        <HelpStore>
            <div><button onClick={ModalOpen} >Modal</button></div>
            <Modal showModal={showModal} setShowModal={setShowModal}  />
            {Loading === true? <GifPar className="Gif"> <img src="https://media.giphy.com/media/52qtwCtj9OLTi/giphy.gif" alt="edp-gif" /></GifPar> : (
                <ParentComp style={{height:`${StyleContext.GlobalStyle.tableheight}vh`}} className="container">
                <div style={{left:`${StyleContext.GlobalStyle.tableOne}`, opacity:`${StyleContext.GlobalStyle.tableOne === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                    <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                        <TableOne initialData={initialData.ppsRequest1Details} initialName={initialData.name1} initialDate={initialData.date1} />
                    </motion.div>
                </div>
                <div style={{left:`${StyleContext.GlobalStyle.tableTwo}`, opacity:`${StyleContext.GlobalStyle.tableTwo === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                    <TableTwo initialData={initialData.ppsRequest2Details}  initialName={initialData.name2}  initialDate={initialData.date2} />
                </div>
                
                <div style={{left:`${StyleContext.GlobalStyle.tableThree}`, opacity:`${StyleContext.GlobalStyle.tableThree === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                    <TableThree initialData={initialData.ppsRequest3Details}  initialName={initialData.name3}  initialDate={initialData.date3} />
                </div>
                
                {/* <div style={{left:`${StyleContext.GlobalStyle.tableFour}`, opacity:`${StyleContext.GlobalStyle.tableFour === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                    <TableFour />
                </div>

                <div style={{left:`${StyleContext.GlobalStyle.tableFive}`, opacity:`${StyleContext.GlobalStyle.tableFive === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                    <TableFive />
                </div>

                <div style={{left:`${StyleContext.GlobalStyle.tableSix}`, opacity:`${StyleContext.GlobalStyle.tableSix === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                    <TableSix />
                </div> */}
            </ParentComp>
            ) }
            
        </HelpStore>
    )
}
export default MainRequest


let easing = [0, 0, 0.56, 0.95];
const textVariants2 = {exit: { y: -100, opacity: 0, transition: { duration: 0.9, ease: easing } },
    enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 0.6, ease: easing }}};

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
