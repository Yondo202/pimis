import React, { useContext } from 'react'
import TableOne from './tableOne'
import { motion } from 'framer-motion'
import TableTwo from './tableTwo';
import styled from 'styled-components'
import TableThree from './tableThree';
import UserContext from '../../context/UserContext'
import TableFour from './tableFour'



function MainRequest() {
    const StyleContext = useContext(UserContext);
    console.log(StyleContext.GlobalStyle , "my global style");
    return (
        <ParentComp style={{height:`${StyleContext.GlobalStyle.tableheight}vh`}} className="container">
            <div style={{left:`${StyleContext.GlobalStyle.tableOne}`}} className="handleSlidePAr1">
                <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                    <TableOne  />
                </motion.div>
            </div>

            <div style={{left:`${StyleContext.GlobalStyle.tableTwo}`}} className="handleSlidePAr2">
                <TableTwo />
            </div>
            
            <div style={{left:`${StyleContext.GlobalStyle.tableThree}`}} className="handleSlidePAr3">
                <TableThree />
            </div>
            <div style={{left:`${StyleContext.GlobalStyle.tableFour}`}} className="handleSlidePAr4">
                <TableFour />
            </div>
        </ParentComp>
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
    transition:all 1s ease;
    margin-top:60px;
    .handleSlidePAr1{
        width:100%;
        transition:all 1s ease;
        position:absolute;
    }
    .handleSlidePAr2{
        width:100%;
        transition:all 1s ease;
        position:absolute;
    }
    .handleSlidePAr3{
        transition:all 1s ease;
        position:absolute;
        width:100%;
    }
    .handleSlidePAr4{
        transition:all 1s ease;
        position:absolute;
        width:100%;
    }
    @media only screen and (max-width:768px){
        height:500vh !important;
    }
`
