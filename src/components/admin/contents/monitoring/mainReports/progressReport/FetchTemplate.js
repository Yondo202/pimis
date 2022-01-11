import React from 'react'
import styled from 'styled-components'
import { Parser } from "html-to-react";
const parser = new Parser();


const FetchTemplate = ({reportData, title}) => {
    return (
        <Container>
            <div className="comp_title">{title}</div>
            {parser.parse(reportData)}
        </Container>
    )
}

export default FetchTemplate


const Container = styled.div`
    margin-bottom:180px;
    font-size:12px;
    color:#000000;
    // .page_break{
    //     page-break-inside: avoid !important;
    // }
    .comp_title{
        font-weight:600;
        font-size:13px;
        color:#c00000 !important;
        border-bottom:1px solid rgba(0,0,0,0.8);
        padding-bottom:4px;
        margin-bottom:30px;
    }
`