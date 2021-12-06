import React from 'react'
import { useReactToPrint } from "react-to-print";
import styled from 'styled-components';
import { AiOutlinePrinter } from "react-icons/ai"
import ProgressReport from './ProgressReport';

const PrintSector = () => {
    const componentRef = React.useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Container>
            <div className="header">
                <h4 className="title">Явцын үнэлгээний тайлан</h4>
                <div className="addBtn" onClick={handlePrint}><AiOutlinePrinter /> <span> Хэвлэх болон татах</span></div>
            </div>

            <div className="print_body" ref={componentRef}>
                <ProgressReport />
            </div>

        </Container>
    )
}

export default PrintSector


const Container = styled.div`
    .header{
        padding:10px 10px;
        margin-bottom:20px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        // background-color:#fff;
        // position:sticky;
        // top:0;
        // left:0;
        .addBtn{
            cursor:pointer;
            padding:5px 30px;
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
    }
    font-size:12px;
    color:#000;

    .print_body{
        width:100%;
        display:flex;
        justify-content:center;
        .first_body{
            .page_break{
                page-break-inside: avoid !important;
            }
        }
    }
`