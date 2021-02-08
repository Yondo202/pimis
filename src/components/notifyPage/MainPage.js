import React,{useRef} from 'react'
import styled from 'styled-components'
import { Color,ColorRgb } from '../theme'
import PageOne from './PageOne'
import {VscFilePdf} from 'react-icons/vsc';
import { useReactToPrint } from "react-to-print";




function MainPage() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    return (
        <>
        <PrintBtn className="print"  onClick={handlePrint}><VscFilePdf />  Хэвлэх болон Pdf - ээр татах</PrintBtn>
        
        <PrintParent >
           <PageOne ref={componentRef} />
           <PageOne ref={componentRef} />
           <PageOne ref={componentRef} />
           <PageOne ref={componentRef} />
        </PrintParent>
        </>
    )
}

export default MainPage


const PrintBtn = styled.div`
        font-weight:500;
        color:black;
        // background-color:rgb(${ColorRgb});
        // background-color:#008CBA;
        // width:80%;
        width:595px;
        display:flex;
        align-items:center;
        justify-content:center;
        border:1px #008CBA;
        border-style: dashed;
        transition:all 0.4s ease;
        margin-bottom:25px;
        &:hover{
        background-color:#009CBA;
        }
        svg{
        margin-right:18px;
        font-size:24px;
        }
`
const PrintParent = styled.div`
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
`
