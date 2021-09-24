import React, { useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useReactToPrint } from "react-to-print";
import { AiOutlinePrinter } from "react-icons/ai"
import ReportComp from './ReportComp';

const PrintComp = ({setShowModal, dataParent}) => {
    const [ cssName, setCssName ] = useState('');
    const modalRef = useRef(null);
    const componentRef = useRef();

    const CloseHandle = e =>{
        if(modalRef.current === e.target){
            setCssName('A1');
            setTimeout(() => {
                setShowModal(false);
            }, 300);
        }
    }

    const CloseHandle2 =_=>{
        setCssName('A1');
        setTimeout(() => {
            setShowModal(false);
        }, 300);
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <ModalStyle ref={modalRef} onClick={CloseHandle}>
            <div className={`Content ${cssName}`}>
                <div className="head">
                    {/* {admin===true&&<div className="addBtn" onClick={()=>window.history.back()}><AiOutlineArrowLeft /> <span>Буцах</span></div>} */}
                    <div className="addBtn" onClick={handlePrint}><AiOutlinePrinter /> <span> Хэвлэх болон татах</span></div>
                    <div onClick={CloseHandle2} className="close">✖</div>
                </div>
                <div className="MainBody" ref={componentRef}>
                    {dataParent?.childs.map((el,ind)=>{
                        return(
                            <ReportComp modal={true} key={ind} detail={el} dataParent={dataParent}  title={el.title} />
                        )
                    })}
                </div>
            </div>
        </ModalStyle>
    )
}

export default PrintComp

const animation = keyframes`
    0% { transform:translateY(200px); }
    100% { transform:translateY(0px); }
`

const ModalStyle = styled.div`
    position:fixed;
    background-color:rgba(0,0,0,.5);
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:1000;
    display:flex;
    justify-content: center;
   
    .Content{
        box-shadow:none !important;
        width:854px;
        overflow-y: auto;
        transition:all 0.4s ease;
        animation: ${animation} 0.3s ease;
        margin-top:1.5rem;
        height:95vh;
        background-color:#fff;
        .MainBody{
            width:100%;
            padding:30px 93px;
        }
        .head{
            position:sticky;
            top:0;
            left:0;
            color:#000;
            padding:7px 20px;
            margin-bottom:10px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            font-size:17px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            max-width:100%;
            background-color:#fff;
            .addBtn{
                cursor:pointer;
                padding:5px 40px;
                background-color: #fff;
                border-color: #ddd;
                color: #333;
                border-radius: 4px;
                border-width: 1px;
                border-style: solid;
                display:flex;
                align-items:center;
                span{
                    font-weight:500;
                    font-size:13px;
                }
                svg{
                    margin-right:15px;
                    font-size:18px;
                }
                &:hover{
                    background-color:#ddd;
                }
            }
            .close{
                top:7px;
                right:20px;
                position:absolute;
                transition:all 0.15s ease;
                width:30px;
                height:30px;
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:50%;
                cursor:pointer;
                padding:10px;
                font-size:16px;
                background: #fff;
                opacity:1;
                z-index:10010;
                &:hover{
                    background-color:#666;
                    color:#fff;
                }
            }
        }
    }
    .A1{
        transition:all 0.3s ease;
        opacity:0;
        transform:translateY(200px);
    }
    @page {
        size: A4;
        margin: 17mm 17mm 17mm 17mm;
    }
`