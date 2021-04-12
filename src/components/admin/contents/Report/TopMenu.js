import React, { useState,useEffect } from 'react'
import { Link,Switch, Route, useHistory } from 'react-router-dom'
import styled, { keyframes } from "styled-components"
import { RiArrowRightSFill } from "react-icons/ri"
import { BiMenuAltRight } from "react-icons/bi"
import { MdKeyboardArrowRight } from "react-icons/md"
import { DetailHome, HideMenu } from "./DetailHome"
import SectorsOne from "./DetailCompOne/SectorsOne"
import TotalApproach from "./DetailCompOne/TotalApproach"

export const TopMenu = ({childData,cond}) => {
    const history = useHistory();
    const [ rightMenu, setRightMenu ] = useState(false);
    const [ homeShow, setHomeShow ] = useState(false);
    const [ classShow, setClassShow ] = useState(false);
    const [ titleHead, setTitleHead ] = useState("");

    useEffect(()=>{
        setRightMenu(false); setClassShow(false); setHomeShow(false); setTitleHead("");
    },[cond])

    const clickHandle = (el, title) =>{
         if(el){
            setClassShow(true); setTitleHead(title);
            setTimeout(()=>{ setHomeShow(true); history.push(`report/${el}`) },300)
         }
    }
    const menuHandle = () =>{ setRightMenu(true); }
     
    return (
        <Container>
            <div className="TitlePar">
            <div className="title">{childData?.title} <MdKeyboardArrowRight /> {titleHead}</div>  
               {homeShow&&<div onClick={menuHandle} className="SmMenu"><BiMenuAltRight /></div>}   
            </div>

            {!homeShow&&<div className={classShow?`buttonsPar Animate`:`buttonsPar`}>
                {childData?.items.map(el=>{
                    return(  <Link onClick={()=>clickHandle(el.comp,el.titles)} className={el.comp?`menuBtn`:`menuBtn desable`}>{el.titles}<RiArrowRightSFill /></Link>  )
                })}
            </div>}

           <Switch>
                <Route path="/report" exact>
                     {homeShow&&<DetailHome />}
                </Route>
                <Route path="/report/sectors" exact>
                     <SectorsOne />
                </Route>
                <Route path="/report/hedenbaiguullaga" exact>
                     <TotalApproach />
                </Route>
            </Switch>

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
            display:flex;
            align-items:center;
            font-size:15px;
            color:rgb(${(props)=> props.theme.textColor});
            font-weight:600;
            text-transform: uppercase;
            font-style:italic;
            svg{
                margin:0px 8px;
                font-size:22px;
            }
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
                text-decoration:none;
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
        .desable{
            /* background-image: linear-gradient(to right, #5895da, #5895da, #B0C3DA, #2664AD); */
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