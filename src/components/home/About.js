import React from 'react'
import styled from 'styled-components'

function About() {
    return (
        <Component className="AboutContPar">
            <div className="aboutConts">
                    <div className="logo"></div>
                    <div className="text">Экспортын шинэ төрлийн санхүүгийн бүтээгдэхүүн хөгжүүлэх</div>
            </div>
            <div className="aboutConts">
                    <div className="logo2" ></div>
                    <div className="text">Экспортын өрсөлдөх чадвар, зах зээлд нэвтрэх боломжийг нэмэгдүүлэх</div>
            </div>
            <div className="aboutConts">
                    <div className="logo3" ></div>
                    <div className="text">Баталгаажуулалтын үйлчилгээ, чанарын удирдлагыг сайжруулах</div>
            </div>
        </Component>
    )
}

export default About

const Component = styled.div`
    color:white;
    display:flex;
    flex-direction:row;
        .aboutConts{
            display:flex;
            flex-direction:column;
            border:1px solid white;
            align-items:center;
            border-radius:8px;
            margin:0px 20px;
            padding:25px 20px;
            .logo{
                fill: white;
                width:50px;
                height:50px;
                background-color: white;
                -webkit-mask: url(/p1.svg) no-repeat center;
                mask: url(/p1.svg) no-repeat center;
                }
                .text{
                    font-size:19px;
                    margin-top:20px;
                }
            }
            .logo2{
                fill: white;
                width:50px;
                height:50px;
                background-color: white;
                -webkit-mask: url(/p1.svg) no-repeat center;
                mask: url(/p1.svg) no-repeat center;
                }
                .text{
                    font-size:19px;
                    margin-top:15px;
                }
            }
            .logo3{
                fill: white;
                width:50px;
                height:50px;
                background-color: white;
                -webkit-mask: url(/p3.svg) no-repeat center;
                mask: url(/p3.svg) no-repeat center;
                }
                .text{
                    font-size:19px;
                    margin-top:15px;
                }
            }
            @media only screen and (max-width:768px){
                    flex-direction:column;
                    .aboutConts{
                        flex-direction:row;
                        text-align: space-evenly;
                        justify-content:center;
                        margin:0px 0px;
                        padding:25px 20px;
                        margin-bottom:15px;
                            .logo{
                                margin-right:10px;
                                fill: white;
                                width:35px;
                                height:35px;
                                background-color: white;
                                -webkit-mask: url(/p1.svg) no-repeat center;
                                mask: url(/p1.svg) no-repeat center;
                                }
                                .text{
                                    font-size:14px;
                                    margin-top:0px;
                                }
                            }
                            .logo2{
                                margin-right:10px;
                                fill: white;
                                width:35px;
                                height:35px;
                                background-color: white;
                                -webkit-mask: url(/p1.svg) no-repeat center;
                                mask: url(/p1.svg) no-repeat center;
                                }
                                .text{
                                    font-size:14px;
                                    margin-top:0px;
                                }
                            }
                            .logo3{
                                margin-right:10px;
                                fill: white;
                                width:35px;
                                height:35px;
                                background-color: white;
                                -webkit-mask: url(/p3.svg) no-repeat center;
                                mask: url(/p3.svg) no-repeat center;
                                }
                                .text{
                                    font-size:14px;
                                    margin-top:0px;
                                }
                            }
                    }
            }
           
        
`
