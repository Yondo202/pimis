import React, { useState,useEffect } from 'react'
import styled, { keyframes } from "styled-components"
import { RiArrowRightSFill } from "react-icons/ri"
import { BiMenuAltRight } from "react-icons/bi"
import { DetailHome, HideMenu } from "./DetailHome"

export const TopMenu = ({childData}) => {
    const [ rightMenu, setRightMenu ] = useState(false);
    const [ homeShow, setHomeShow ] = useState(false);
    const [ classShow, setClassShow ] = useState(false);

    useEffect(()=>{
        setRightMenu(false); setClassShow(false); setHomeShow(false);
    },[childData])

    const clickHandle = () =>{
         setClassShow(true); 
         setTimeout(()=>{ setHomeShow(true); },300)
    }
    const menuHandle = () =>{ setRightMenu(true); }
     
    return (
        <Container>
            <div className="TitlePar">
               <div className="title">{childData?.title}</div>  
               {homeShow&&<div onClick={menuHandle} className="SmMenu"><BiMenuAltRight /></div>}   
            </div>

            {!homeShow&&<div className={classShow?`buttonsPar Animate`:`buttonsPar`}>
                {childData?.items.map(el=>{
                    return( <div onClick={clickHandle} className="menuBtn">{el.titles}<RiArrowRightSFill /></div>  )
                })}
            </div>}

           {homeShow&&<DetailHome />} 
           {rightMenu&&<HideMenu setRightMenu={setRightMenu} childData={childData} />} 
        </Container>
    )
}

const animate = keyframes`
    0% { transform:translateX(-100px); opacity:0;  }
    100% { transform:translateX(0px); opacity:1;  }
`

const MenuBtnAnimate = keyframes`
   0% {  transform:scale(1); right:0px; top: 70px; }
   100% {  transform:scale(0); right:-800px; top: 50px; }
`

const rightAnimate = keyframes`
   0% {  transform:scale(0.5); opacity:0; background-color: rgba(0, 255, 0, 0.7);}
   40% {  transform:scale(1.6); opacity:0.8; background-color: rgba(0, 255, 0, 0.9);}
   100% {  transform:scale(1); opacity:1; background-color: rgba(0, 200, 255, 0.2); }
`

const Container = styled.div`  
    position:relative;
    padding:10px 15px;
    .TitlePar{
        display:flex;
        align-items:center;
        justify-content:space-between;
        border-bottom:1px solid rgba(0,0,0,0.2);
        margin-bottom:10px;
        padding-bottom:10px;
        .title{
            font-size:19px;
            color:rgb(${(props)=> props.theme.textColor});
            font-weight:500;
        }
        .SmMenu{
            animation: ${rightAnimate} 0.8s ease;
            cursor: pointer;
            background-color: rgba(220, 220, 220, 0.7);
            border-radius:50%;
            color: rgba(0, 18, 41, 1);
            padding:5px 5px;
            svg{
                font-size:24px;
            }
        }
    }
   
    .buttonsPar{
        transition:all 0.8s ease;
        position: absolute;
        top: 70px;
        right:0px;
        transform:scale(1);
        display:flex;
        flex-wrap:wrap;
        width:100%;
        .menuBtn {
                animation:${animate} 0.6s ease;
                overflow:hidden;
                margin:10px 10px;
                cursor:pointer;
                display:flex;
                align-items:center;
                /* border:1px solid rgba(60,255,160,1); */
                padding:10px 10px;
                border-radius:20px;
                font-weight:500;
                background-color:white;
                background-size: 300% 300%;
                color:white;
                box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
                background-image: linear-gradient(to right, #2664AD, #2664AD, #B0C3DA, #2664AD);
                transition: 0.5s;
                &:hover {
                    background-position: right center;
                }
                svg{
                margin-left:5px;
                font-size:17px;
            }
        }
    }   
    .Animate{
        /* animation: ${MenuBtnAnimate} 0.5s ease; */
        top: -32px;
        right: -600px;
        transform:scale(0);
        .menuBtn{
            /* transform:scale(0); */
        }
    }
`