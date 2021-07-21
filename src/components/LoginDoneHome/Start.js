import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const Start = ({userId}) => {
    const [cond, setCond] = useState(false);

    useEffect(()=>{
        setCond(true);
    },[])

    return (
        <Container>
            <div style={{ paddingTop: 105 }} className="row">
                {/* {cond&&<div className="col-md-2 col-sm-2" />} */}
                <div className={`${cond?`col-md-12 col-sm-12 Big`:`col-md-2 col-sm-2`} itemsColA`}>
                    <div className="itemsParA">
                        <div className="mains">
                            <Link to={!userId? `/check/user` : `/check/${userId}`} className={`itemsA A22`}>1. Шалгуур хангалтыг тулгах хуудас</Link>
                            <div className="line A2" />
                            <Link to="#" className={`itemsA hide`} >2. Байгаль орчны үнэлгээний асуумж</Link>
                            <div className="line" />
                            <Link to="#" className={`itemsA hide`} >3. Сонирхол илэрхийлэх албан тоот</Link>
                            <div className="line" />
                        </div>
                    </div>
                </div>
                {/* {cond&&<div className="col-md-2 col-sm-2" />} */}
            </div>
        </Container>
    )
}

export default Start

const Container = styled.div`
    .itemsColA{
        transition:all 1s ease;
        border-right:1px solid rgba(0,0,0,0);
        .itemsParA{
            height:70vh;
            width:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            margin-top:30px;
            .mains{
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                .itemsA{
                    width:93%;
                    border-radius:4px;
                    padding:7px 7px;
                    border:1px solid rgba(0,0,0,0.2);
                    color:rgba(0,0,0,0.5);
                    position:relative;
                    &::before{
                        content:"-";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        bottom:-7px;
                        right:-1%;
                        border:1px solid #C1C1C1;
                        background-color:white;
                        color:#C1C1C1;
                        width:18px;
                        height:18px;
                        border-radius:50%;
                    }
                }
                
                .line{
                    position:relative;
                    height:4em;
                    width:1.2px;
                    background-color:#C1C1C1;
                    &::after{
                        content:"";
                        bottom:-2px;
                        left:-480%;
                        position:absolute;
                        height:12px;
                        width:12px;
                        background-color:#C1C1C1;
                        clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0);
                    }
                }
                
            }
        }
    }
    .Big{
        font-size:30px;
        .itemsParA{
            .mains{
                width:57%;
                .itemsA{
                    transition:all 0.3s ease;
                    color:rgb(${props=>props.theme.textColor}) !important;
                    width:93%;
                    border-radius:8px;
                    padding:30px 10px;
                    color:rgba(0,0,0,0.5);
                    position:relative;
                    &::before{

                    }
                    &:hover{
                        transform:scale(1.054);
                        box-shadow:1px 1px 20px -12px;
                    }
                }
                .A22{
                    border:1px solid rgba(0,0,0,0.7);
                }
                .A2{
                    background-color:rgba(0,0,0,0.7);
                    &::after{
                        background-color:rgba(0,0,0,0.7);
                    }
                }
                .hide{
                    color:rgba(${props=>props.theme.textColor}, 0.2) !important;
                    &:hover{
                        transform:scale(1);
                        box-shadow:1px 1px 0px -12px;
                    }
                }
            }
        }
    }
`
