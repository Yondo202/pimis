import React,{useRef, useState, useContext }  from 'react'
import styled from 'styled-components'
import {textColor, ButtonStyle} from '../../../theme'
import {useSpring, animated} from 'react-spring';
import axios from '../../../../axiosbase'
import UserContext from '../../../../context/UserContext'

export const DeleteModal = ({ showModal,setShowModal,setUpdate, parent }) => {
    const modalRef = useRef();
    const ctx = useContext(UserContext);
    const [ btnSpin, setBtnSpin  ] = useState(false);

    const animation = useSpring({
        config:{duration:330  },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(10%)` : `translateY(30%)`  
    });
    const closeModal = e =>{ if(modalRef.current === e.target){ setShowModal(false); } }

    const clickHandle = () =>{
            axios.delete(`users/${parent.id}`).then(res=>{ setUpdate(prev=>!prev); ctx.alertText("green", "Амжилттай", true ); setShowModal(prev=>!prev); 
            }).catch(error=>{ ctx.alertText("orange", "Алдаа гарлаа", true )});
    }


    return(
        <>
                     {/* ref={modalRef} onClick={closeModal} */}
            {showModal ? <Background ref={modalRef} onClick={closeModal} >
                <animated.div  style={animation} >
                    <div className="modalPar container">
                        <div className="closeParent">
                            <div className="title">Хэрэглэгч устгах</div>
                            <button className="esc" onClick={()=> setShowModal(prev => !prev)} > X </button>
                        </div>
                            <div className="InputPar">
                                <div className="rowss">
                                    <div className="inputItem">
                                            <span className="title">Овог:</span>
                                            <input disabled value={parent.firstname} name="firstname" className="getMainInp22 form-control" type="text" />
                                    </div>
                                    <div className="inputItem">
                                            <span className="title">Нэр :</span>
                                            <input disabled value={parent.lastname} name="lastname" className="getMainInp22 form-control" type="text" />
                                    </div>
                                </div>
                            </div>

                            <div className="BtnPar">
                                <span className="errTxt"></span>
                                <ButtonStyle onClick={clickHandle} style={!btnSpin? {}: {padding:`0px 15px`}} className="finalBtn"> {!btnSpin? 'Устгах' : <img src="/gif1.gif" alt="gif" />} </ButtonStyle>
                            </div>
                    </div>
                </animated.div>
            </Background>: null}
        </>
    )
}

const Background = styled.div`
    font-size:13px;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,0.5);
    position:fixed;
    display:flex;
    justify-content:center;
    align-items:start;
    z-index:2000;
    color:rgba(${textColor});
    textarea{
        min-height: calc(3.5em + 2.75rem + 2px);
    }
    .modalPar{
        background-color:white;
        width:650px;
        padding:20px 35px;
        .edpUsers{
            padding:10px 15px;
            border:1px solid rgba(0,0,0,0.15);
            margin-bottom:10px;
            .trainer{
                padding:4px 20px;
                border:1px solid rgba(0,0,0,0.3);
                border-radius:4px;
            }
            .items{
                display:flex;
                align-items:center;
                padding:5px 0px;
                input{
                    transition:all 0.1s ease;
                    cursor:pointer;
                    height:15px;
                    width:15px;
                    &:checked{
                        -webkit-transform: scale(1.2);
                        transform: scale(1.2);
                    }
                }
                span{
                    margin-left:10px;
                }
            }
           
        }
        .HeadCheck{
            font-size:14px;
            display:flex;
            justify-content:space-between;
            width:100%;
            margin-bottom:15px;
            .title{
                display:flex;
                align-items:center;
                input{
                    cursor:pointer;
                    width:17px;
                    height:17px;
                    transition:all 0.1s ease;
                    &:checked{
                        opacity: 1;
                        -webkit-transform: scale(1.2);
                        transform: scale(1.2);
                        border-radius:50% !important;
                    }
                }
                span{
                    margin-left:5px;
                }
            }
        }
        .BtnPar{
                display:flex;
                justify-content:space-between;
                align-items:center;
                .errTxt{
                    transition:all 0.4s ease;
                    text-align:center;
                    background-color: #f6c343;
                    border-radius:5px;
                    font-size:14px !important;
                    font-weight:400;
                    color:black !important;
                    line-height:34px;
                    padding:0px 20px;
                }
        }
        .InputPar{
            opacity:0.7;
            margin-bottom:30px;
            margin-top:5px;
            .rowss{
                display:flex;
                align-items:center;
                justify-content:space-between;
                margin-bottom: 12px;
                .inputItem{
                    width:44%;
                    .title{
                        font-size:12.5px;
                        opacity:0.9;
                        font-weight:500;
                    }
                    .form-control{
                        font-size:13.3px;
                        background-color:rgba(0,0,0,0.05);
                        margin-top:6px;
                    }
                }
            }
        }
        .closeParent{
            display:flex;
            align-items:center;
            justify-content:space-between;
            border-bottom:1px solid rgba(0,0,0,0.2);
            padding-bottom:5px;
            .title{
                font-size:14px;
                font-weight:500;
            }
            .esc{
                font-size:17px;
                padding:1px 12px;
                border-style:none;
                cursor:pointer;
            }
        }
    }
    @media (max-width:860px){
        modalPar{
            width:90vw;
        }
    }
`