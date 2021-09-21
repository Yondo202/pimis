import React, { useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useReactToPrint } from "react-to-print";
import { AiOutlinePrinter } from "react-icons/ai"
import ReportComp from './ReportComp';

const PrintComp = ({setShowModal, dataChild}) => {
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
                <div className="header">
                    {/* {admin===true&&<div className="addBtn" onClick={()=>window.history.back()}><AiOutlineArrowLeft /> <span>Буцах</span></div>} */}
                    <div className="addBtn" onClick={handlePrint}><AiOutlinePrinter /> <span> Хэвлэх болон pdf - татах</span></div>
                    <div onClick={CloseHandle2} className="close">✖</div>
                </div>
                <div ref={componentRef}>
                    {dataChild.map((el,ind)=>{
                        return(
                            <ReportComp key={ind} title={el.title} />
                        )
                    })}
                    {/* {ttl?.firstpage&&<FirstPage modal={true} />}
                    {ttl?.projectinfo&&<InfoProject modal={true} />} */}
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
    .A1{
        transition:all 0.3s ease;
        opacity:0;
        transform:translateY(200px);
    }
    .Content{
        box-shadow:none !important;
        width:${props=>props.admin?`1000px`:`854px`};
        overflow-y:scroll;
        transition:all 0.4s ease;
        animation: ${animation} 0.3s ease;
        // width:40%;
        height:100vh;
        background-color:#fff;
        padding: ${props=>props.admin?`0px 93px`:`0px 20px`};
        .header{
            position:sticky;
            top:0;
            z-index:3;
            background-color:#fff;
            margin-bottom:10px;
            padding:15px 0px 15px 0px;
            display:flex;
            text-align:center;
            justify-content:space-between;
            border-bottom:1px solid rgba(0,0,0,0.1);
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
                    font-size:14px;
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
                transition:all 0.15s ease;
                border-radius:3px;
                width:30px;
                height:30px;
                display:flex;
                align-items:center;
                justify-content:center;
                background-color: rgba(0,0,0,.0);
                cursor:pointer;
                padding:8px;
                &:hover{
                    background-color: rgba(0,0,0,.055);
                }
            }
        }
    }
    @page {
        size: A4;
        margin: 17mm 17mm 17mm 17mm;
        // img{
        //     max-width:100px;
        //     height:auto;
        //     object-fit:contain;
        // }
    }
`