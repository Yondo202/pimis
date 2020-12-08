import React from 'react'
import styled from 'styled-components'


function About() {
    return (
        <Component className="AboutContPar">
            <div className="aboutConts">
                    <div className="logo" style={{backgroundImage:`url(/p1.jpg)`}}></div>
                    <div className="text">ЭКСПОРТЫН ШИНЭ ТӨРЛИЙН САНХҮҮГИЙН БҮТЭЭГДЭХҮҮН ХӨГЖҮҮЛЭХ</div>
            </div>
            <div className="aboutConts">
                    <div className="logo2" style={{backgroundImage:`url(/p1.jpg)`}}></div>
                    <div className="text">ЭКСПОРТЫН ӨРСӨЛДӨХ ЧАДВАР, ЗАХ ЗЭЭЛД НЭВТРЭХ БОЛОМЖИЙГ НЭМЭГДҮҮЛЭХ</div>
            </div>
            <div className="aboutConts">
                    <div className="logo3" style={{backgroundImage:`url(/p1.jpg)`}}></div>
                    <div className="text">БАТАЛГААЖУУЛАЛТЫН ҮЙЛЧИЛГЭЭ, ЧАНАРЫН УДИРДЛАГЫГ САЙЖРУУЛАХ</div>
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
                    font-size:16px;
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
                    font-size:16px;
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
                    font-size:16px;
                    margin-top:15px;
                }
            }
        
`
