import React from 'react'
import styled from 'styled-components'
import Login from './login'
import {fontFamily} from "../theme"
import { motion } from "framer-motion";
import Content from './content'

function HomeLogin() {
    return (
        <ComponentHome >
            <div className="mainContentPar">
                <Content />
            </div>
            <div className="mainFormPar">
                <Login />
            </div>
        </ComponentHome>
    )
}

export default HomeLogin

const ComponentHome = styled.div`
        font-family: ${fontFamily};
        // height:100vh;
        // background-color:rgba(0,0,0,0.5);
        display:flex;
        flex-direction:row;
       
        .mainContentPar{
            position:relative;
            width:65%;
            // background-color:rgba(0,0,0,0.5);
        }
        .mainFormPar{
            background-color: white;
            padding:0px 80px;
            width:35%;
            align-items:center;
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
