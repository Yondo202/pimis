import React from 'react'
import styled from 'styled-components'
import {fontSize, textColor,InputStyle,ColorRgb,NextBtn,Color } from '../theme'

function MainWorkPerformance() {
    return (
        <WorkPerformance className="container">
            <div className="contentPar">
                <div className="TitlePar">
                    <div className="title">АЖЛЫН ГҮЙЦЭТГЭЛ ХҮЛЭЭН АВАХ МАЯГТ</div>
                    <div className="desc">ЭКСПОРТЫГ ДЭМЖИХ ТӨСӨЛ (Кредит ........) Ажлын гүйцэтгэл хүлээн авах маягт</div>
                </div>

               <div className="tablePar">
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Түншлэлийн гэрээний дугаар: </div> </div>
                            <div className="col-md-9 col-9">
                                <div className="RightHead SingleSide">
                                  <InputStyle className="themeStyle" ><input placeholder="гэрээний дугаар..." type="number" /><div className="line" /></InputStyle>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Түншлэлийн дэмжлэг хүртэгчийн нэр : </div> </div>
                            <div className="col-md-9 col-9"><div className="RightHead"> AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAA</div></div>
                        </div>
                    </div>
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Утасны дугаар, e- mail: </div> </div>
                            <div className="col-md-9 col-9"><div className="RightHead"> AAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAA</div></div>
                        </div>
                    </div>
                   

               </div>
                
                
            </div>
           
        </WorkPerformance>
    )
}

export default MainWorkPerformance

const WorkPerformance = styled.div`
    color: rgba(${textColor});
    padding-bottom:80px;
    .contentPar{
        background-color:white;
        padding:20px 80px;
        font-size:${fontSize};
        margin-top:30px;
        border:1px solid rgba(0,0,0,.2);
        .tablePar{
            border:1px solid rgba(0,0,0,.2);
            .rowItems{
                border-bottom:1px solid rgba(0,0,0,.2);
                .LeftHead{
                    background-color: rgba(63,81,181,0.1);
                    padding:8px 8px;
                    padding-right:0px;
                    border-right:1px solid rgba(0,0,0,.2);
                }
                .RightHead{
                    padding:8px 8px;
                    padding-left:0px;
                    input{
                        width:100%;
                    }
                }
                .SingleSide{
                    height:100%;
                    display:flex;
                    align-items:center;
                    .themeStyle{
                        width:100%;
                    }
                }
            }
        }
        .TitlePar{
            padding:10px 0px;
            margin-bottom:15px;
            .title{
                color:${textColor};
                padding-bottom:10px;
                font-size:14px;
                text-align:center;
                font-weight:500;
            }
            .desc{
                font-style: italic;
            }
        }
    }


    @media only screen and (max-width:786px){
        .contentPar{
            padding: 20px 10px
        }
    }
`