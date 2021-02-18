import React, {useRef } from 'react'
import styled from 'styled-components'
import { useReactToPrint } from "react-to-print";
import {VscFilePdf} from 'react-icons/vsc';
import Content from './Content'

function Approved() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

      return (
            <MainContainter>
                <div className="parent" ref={componentRef}>
                     <Content  />
                </div>

                
                <button className="print"  onClick={handlePrint}><VscFilePdf />  Хэвлэх болон Pdf - ээр татах</button>
            </MainContainter>
        )
  }
  export default Approved


const MainContainter = styled.div`
    position:relative;
    .btn{
        transition:all 0.4s ease;
        margin:10px 0px;
        max-width:700px;
        width:100%;
    }
    .print{
        max-width:700px;
        width:100%;
        font-weight:500;
        color:black;
        display:flex;
        align-items:center;
        justify-content:center;
        border:1px #008CBA;
        border-style: dashed;
        transition:all 0.4s ease;
        font-size:14px;
        padding:3px 0px;
        &:hover{
          background-color:#009CBA;
        }
        svg{
          margin-right:18px;
          font-size:18px;
        }
      }
}
`


