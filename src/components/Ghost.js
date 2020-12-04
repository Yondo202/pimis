import React from 'react'
import styled from 'styled-components'

function Ghost() {
    return (
        <GhostComponent style={{backgroundImage:`url(/back3.jpg)`}}>
            <div className="childGost">

            </div>
        </GhostComponent>
    )
}

export default Ghost
const GhostComponent = styled.div`
    height:220px;
    width:100%;
    // background-repeat: no-repeat;
    background-size: end;
    background-position: center;
    position:fixed;
    top:0;
    left:0;
    z-index:0;
    .childGost{
        width:100%;
        height:220px;
        background-color:rgba(0,0,0,0.5);
    }
`