import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory } from "react-router-dom"
import { useSpring, animated } from 'react-spring';
import { VscFilePdf } from 'react-icons/vsc';
import styled from 'styled-components'
import ModalFour from '../modals/modalFour';
import ModalOne from '../modals/modalOne'
import ModalThree from '../modals/modalThree';
import ModalTwo from '../modals/modalTwo';
import { ColorRgb, textColor } from '../../theme'
import { useReactToPrint } from "react-to-print";

export const Modal = ({ showModal, setShowModal, initialData, param, na3 }) => {
    const history = useHistory();
    const modalRef = useRef();
    const animation = useSpring({
        config: { duration: 250 },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateX(0%)` : `translateX(-100%)`
    });
    const closeModal = e => { if (modalRef.current === e.target) { setShowModal(false); } }

    const keyPress = useCallback(e => {
        if (e.key === 'Escape' && showModal) { setShowModal(false); } else if (e.key === 'F4') { setShowModal(true); }
    }, [setShowModal, showModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const backHanlde = () => { history.goBack(); };

    return (
        <>
            {showModal ?
                (<Background style={param !== "user" ? { left: "270px", paddingRight: "160px", justifyContent: "center" } : { left: "0" }} ref={modalRef} onClick={param !== "user" ? backHanlde : closeModal}>
                    <animated.div style={animation} >
                        <div className="modalPar container">
                            <div className="closeParent">
                                {param !== "user" ? <button className="esc" onClick={backHanlde} > Буцах </button> : <button className="esc" onClick={() => setShowModal(prev => !prev)} > X </button>}
                                <button className="print" onClick={handlePrint}><VscFilePdf />  Хэвлэх болон Pdf - ээр татах</button>
                            </div>
                            {initialData ? (
                                <div ref={componentRef}>
                                    {initialData.name1 && <ModalOne DataOne={initialData.ppsRequest1Details} />}
                                    {initialData.name2 && <ModalTwo Data2={initialData.ppsRequest2Details} />}
                                    {initialData.name3 && <ModalThree Data2={initialData.ppsRequest3Details} na3={na3} />}
                                    {initialData.name4 && <ModalFour Data2={initialData.ppsRequest4Details} />}
                                </div>
                            ) : <h2>Мэдээлэл ороогүй байна</h2>}
                        </div>
                    </animated.div>
                </Background>)
                : null}
        </>
    )
}

const Background = styled.div`
    font-size:13px;
    width: 100%;
    height: 100%;
    top:0;
    left:-100%;
    background: rgba(0,0,0,0.5);
    position:fixed;
    display:flex;
    justify-content:start;
    align-items:center;
    z-index:1000;
    .modalPar{
        overflow-y:scroll;
        background-color:white;
        width:854px;
        // width:1000px;
        height:100vh;
        padding:20px 20px;
        h2{
          text-align:center;
          margin-top:40px;
        }
        .PdfParent{
          padding-top:50px;
        }
        .closeParent{
            width:100%;
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:space-between;
            padding: 0px 100px 0px 64px;
            button{
                padding:5px 10px;
                border-style:none;
                cursor:pointer;
                box-shadow:1px 1px 6px -2px rgb(${ColorRgb});
            }
            .esc{
            }
            .print{
              font-weight:500;
              color:black;
              // background-color:rgb(${ColorRgb});
              // background-color:#008CBA;
              width:80%;
              display:flex;
              align-items:center;
              justify-content:center;
              border:1px #008CBA;
              border-style: dashed;
              transition:all 0.4s ease;
              &:hover{
                background-color:#009CBA;
              }
              svg{
                margin-right:18px;
                font-size:22px;
              }
            }
        }
    }
    .MarginBtn{
        width:100%;
        display:flex;
        justify-content:space-between;
        svg{
            padding:2px 2px;
            cursor:pointer;
            border-radius:50%;
            background-color:rgba(60,60,60,0.3);
            color:rgb(${textColor});
            font-size:24px;
            &:hover{
                background-color:rgba(60,60,60,0.4);
            }
                
        }
    }
    // @page {
    //     size: A4;
    //     margin: 17mm 17mm 17mm 17mm;
    // }
    
`