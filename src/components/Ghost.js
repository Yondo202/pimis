import React from 'react'
import styled from 'styled-components'

function Ghost() {
    return (
        <GhostComponent style={{backgroundImage:`url(/head.jpg)`}}>
            <div className="childGost">
            </div>
        </GhostComponent>
    )
}

export default Ghost
const GhostComponent = styled.div`
    height:210px;
    width:100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position:fixed;
    top:0;
    left:0;
    z-index:-1;
    .childGost{
        width:100%;
        height:210px;
        background-color:rgba(0,0,0,0.6);
    }
`