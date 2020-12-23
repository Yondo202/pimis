import React, { useContext, useState } from 'react'
import TableOne from './tableOne'
import { motion } from 'framer-motion'
import TableTwo from './tableTwo';
import styled from 'styled-components'
import TableThree from './tableThree';
import UserContext from '../../context/UserContext'
import TableFour from './tableFour'
import TableFive from './tableFive'
import TableSix from './tableSix'
import { Modal } from './MainModal/Modal';
import { HelpStore } from '../../context/HelperContext'

function MainRequest() {
    const [ showModal, setShowModal ] = useState(false);
    const ModalOpen = () => {
        console.log("dada");
        setShowModal(prev => !prev);
      }
    const StyleContext = useContext(UserContext);
    // console.log(StyleContext.GlobalStyle , "my global style");
    return (
        <HelpStore>
            <div><button onClick={ModalOpen} >Modal</button></div>
            <Modal showModal={showModal} setShowModal={setShowModal}  />
            <ParentComp style={{height:`${StyleContext.GlobalStyle.tableheight}vh`}} className="container">
                
                <div style={{left:`${StyleContext.GlobalStyle.tableOne}`, opacity:`${StyleContext.GlobalStyle.tableOne === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                    <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                        <TableOne  />
                    </motion.div>
                </div>
                <div style={{left:`${StyleContext.GlobalStyle.tableTwo}`, opacity:`${StyleContext.GlobalStyle.tableTwo === "0%" ? `1` : `0`}`}} className="handleSlidePAr1">
                    <TableTwo />
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
        </HelpStore>
    )
}
export default MainRequest


let easing = [0, 0, 0.56, 0.95];
const textVariants2 = {exit: { y: -100, opacity: 0, transition: { duration: 0.9, ease: easing } },
    enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 0.6, ease: easing }}};


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
