import React from 'react'
import styled from 'styled-components'
import EmailAuth from './EmailAuth'
import {fontFamily} from "../theme"

function Email() {
    return (
        <ComponentHome >
            <div className="ghost" style={{backgroundImage:`url(/background1.jpg)`}}>
                <div className="ghostChild"></div>
            </div>
            <div className="mainFormPar">
                <EmailAuth />
            </div>
        </ComponentHome>
    )
}

export default Email

const ComponentHome = styled.div`
        font-family: ${fontFamily};
        height:100vh;
        // background-color:rgba(0,0,0,0.5);
        display:flex;
        flex-direction:row;
        align-items:start;
        justify-content:center;
        .mainFormPar{
            margin-top:10vh;
            border-radius:10px;
            background-color: white;
            padding:0px 45px;
            width:40%;
            align-items:center;
        }
        .ghost{
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            position:absolute;
            height: 100%;
            width:100%;
            top:0;
            left:0;
            z-index:-99;
            filter:blur(2px);
            .ghostChild{
                z-index:-98;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background-color:rgba(0,0,0,0.6);
                position:absolute;
            }
        }
        @media only screen and (max-width:968px){
            flex-direction:column-reverse;
            .mainContentPar{
                width:100%;
            }
            .mainFormPar{
                width:100%;
            }
        }
        @media only screen and (max-width:768px){
            flex-direction:column-reverse;
            .mainContentPar{
                width:100%;
            }
            .mainFormPar{
                padding:0px 30px;
                width:100%;
            }
        }
`
