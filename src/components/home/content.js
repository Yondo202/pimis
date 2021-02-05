import React from 'react'
import styled from 'styled-components'

// let easing = [0, 0, 0.56, 0.95];
// const textVariants = {exit: { y: -80, opacity: 0, transition: { duration: 0.9, ease: easing } },
//     enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 1, ease: easing }}};
// const textVariants2 = {exit: { y: 80, opacity: 0, transition: { duration: 0.9, ease: easing } },
//     enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 1, ease: easing }}};

function Content() {
    return (
        <Component>
            <div className="ghost" style={{backgroundImage:`url(/background1.jpg)`}}>
                <div className="ghostChild"></div>
            </div>
        </Component>
    )
}

export default Content
const Component = styled.div`
    width:100%;
    height:100vh;
    z-index:1;
    position:relative;
    .contentPar{
        height:100%;
        padding:0px 80px;
        display:flex;
        flex-direction:column;
        justify-content: space-around;
        align-items:center;
        .checkCompPar{
          
            color:white;
            text-align:center;
            padding-top:40px;
            display:flex;
            flex-direction:column;
            align-items:center;
            .title{ 
                font-size:30px;
            }
            a{
                width:30%;
                .checkBtn{
                    cursor:pointer;
                    color:white;
                    border-radius:5px;
                    margin-top:20px;
                    width:100%;
                    border-style:none;
                    background:none;
                    border:1px solid white;
                    transition:all 0.4s ease;
                    padding:4px 0px;
                    &:hover{
                        color:black;
                        background:white;
                    }
                }
            }
            
        }
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
        .contentPar{
            padding:0px 30px;
            .checkCompPar{
                .title{ 
                    font-size:22px;
                }
                .checkBtn{
                    width:80%;
                }
            }
        }
    }
    @media only screen and (max-width:768px){
        .contentPar{
            padding:0px 30px;
            .checkCompPar{
                .title{ 
                    font-size:22px;
                }
                .checkBtn{
                    width:80%;
                }
            }
        }
    }
  
 
`