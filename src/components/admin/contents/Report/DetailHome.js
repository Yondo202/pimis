import React,{ useEffect, useRef, useState } from 'react'
import styled, { keyframes } from "styled-components"
import { RiArrowLeftSFill } from "react-icons/ri"
import { BiMenuAltLeft } from "react-icons/bi"
import { Link, useParams, Switch, Route } from "react-router-dom"
import SectorsOne from "./DetailCompOne/SectorsOne"

export const DetailHome = () => {
 
    return (
        <Container>
            <h1>Eto Home</h1>
        </Container>
    )
}

const animateHome = keyframes`
    0% { transform:translateY(100px); opacity:0;  }
    100% { transform:translateY(0px); opacity:1;  }
`
const Container = styled.div`
    animation:${animateHome} 0.5s ease;
    
`
export const HideMenu = ({childData, setRightMenu}) => {
    const modalRef = useRef(null);
    const clickHandle = () =>{ setRightMenu(false);}
    const closeModal = e =>{ if(modalRef.current === e.target){ setRightMenu(false);}}
    return (
        <Ghost ref={modalRef} onClick={closeModal}>
            <div className="ContPar ">
                <div onClick={clickHandle}  className="title"><BiMenuAltLeft /> {childData?.title}</div>  
                <div className="LeftMenu ">
                    {childData?.items.map(el=>{
                        return(
                            <Link to={`/report/${el?.comp}`} onClick={()=>setRightMenu(false)} className="menuBtn"><RiArrowLeftSFill /> {el.titles}</Link>
                        )
                    })}
                </div>
            </div>
        </Ghost>
    )
}

const animate = keyframes`
    0% { transform:translateX(100px); opacity:0;  }
    100% { transform:translateX(0px); opacity:1;  }
`

const Ghost = styled.div`
    position:absolute;
    width:100%;
    height:90vh;
    background-color:rgba(0,0,0,0.5);
    left:0;
    top:0;
    display:flex;
    justify-content:flex-end;
    .ContPar{
       padding:15px 15px;
       width:30%;
       height:100%;
       overflow-y:scroll;
       background-color:white;
       animation:${animate} 0.3s ease;
        .title{
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-bottom:10px;
            padding-bottom:10px;
            font-size:14px;
            color:rgb(${(props)=> props.theme.textColor});
            font-weight:500;
            border-bottom:1px solid rgba(0,0,0,0.2);
            svg{
                margin-right:8px;
                cursor: pointer;
                font-size:24px;
                color:rgba(100,120,120, 1);
            }
        }
        .LeftMenu{
            transition:all 0.5s ease;
            display:flex;
            flex-direction:column;
            /* flex-wrap:wrap; */
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
                    margin-right:5px;
                    font-size:17px;
                }
            }
        }   
        
    }

    @media only screen and (max-width:1500px){
        .ContPar{
            width:50%;
        }
    }
`