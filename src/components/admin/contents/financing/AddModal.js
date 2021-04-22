import React,{ useRef } from 'react'
import styled, { keyframes } from "styled-components"
import { InputStyle } from "components/theme"
import { default as NumberFormat } from 'react-number-format';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  
//   formatter.format(1000) // "$1,000.00"

const AddModal = ({ setShowModal }) => {
    const ref = useRef(null);
    const CloseHandle = e =>{ 
        if(ref.current === e.target){setShowModal(false)}
        else if(e===123){ setShowModal(false) }
    }

    return (
        <Background onClick={CloseHandle} ref={ref}>
            <div className="ContentPar">
                <div className="titlePar">
                  <span className="title">Санхүүжилт олгох</span>
                  <div onClick={()=>CloseHandle(123)} className="Close">x</div>
                </div>

                <div className="MainCont">

                    <div className="ValiutPar">
                        <div className="Content">
                            <div className="title">Олгох хэмжээ $</div>
                            <InputStyle>
                                    <NumberFormat defaultValue={formatter.format(0)} style={{textAlign:"right"}} thousandSeparator={true}  />
                                    <div className="line" />
                            </InputStyle>
                        </div>
                        <div className="Content">
                            <div className="title">Олгох хэмжээ ₮</div>
                            <InputStyle>
                                    <NumberFormat defaultValue={formatter.format(0)} style={{textAlign:"right"}} thousandSeparator={true}  />
                                    <div className="line" />
                            </InputStyle>
                        </div>
                    </div>
                </div>

            </div>
        </Background>
    )
}

export default AddModal

const animate = keyframes`
    0%{ transform:translateY(-100px); opacity:0; }
    100%{ transform:translateY(0px); opacity:1; }
`

const Background = styled.div`
    overflow-y:scroll;
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    top:0;
    left:0;
    z-index:9999;
    height:100vh;
    width:100vw;
    background-color:rgba(0,0,0,.6);
    .ContentPar{
        padding:10px 25px;
        animation:${animate} 0.6s ease;
        background-color:white;
        width:60%;
        height:80%;
        .MainCont{


            .ValiutPar{
                display:flex;
                justify-content:space-between;
                margin:18px 0px;
                .Content{
                    width:48%;
                }
            }
        }
        .titlePar{
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:10px 0px;
            border-bottom:1px solid rgba(0,0,0,0.2);

            .title{
                font-size:16px;
                font-weight:500;
                color:${(props)=>props.theme.textColorHex};
            }
            .Close{
                transition:all 0.3s ease;
                width:30px;
                height:30px;
                background-color:#f1f5fd;
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:50%;
                cursor: pointer;
                &:hover{
                    box-shadow:1px 1px 8px -4px;
                }
            }
        }
    }
`