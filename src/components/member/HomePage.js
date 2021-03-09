import { Item } from 'devextreme-react/accordion'
import React from 'react'
import styled from 'styled-components'
import {ColorRgb,textColor} from '../theme'

function HomePage() {
    return (
        <Memberhome className="container">
            <div className="header">
                <div className="items">
                   <span className="text">Байгууллагуудын жагсаалт</span>
                   <div className="line"></div>
                </div>
                <div className="items A1">
                    <span className="text">Ашиг сонирхлын зөрчилгүйг мэдэгдэх хуудас</span>
                    <div className="linee"></div>
                </div>
                <div className="items A1">
                    <span className="text">Үнэлгээний хорооны гишүүний саналын хуудас </span>
                    <div className="linee"></div>
                </div>
            </div>

            <div className="CardParent">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="cardItems">
                            <div className="titleBig">Эм Си Эс ХХК</div>
                            <div className="contents">
                                <div className="contItem">
                                        <span className="title">Регистр :</span>
                                        <span className="desc">989265646</span>
                                </div>
                                <div className="contItem">
                                        <span className="title">ӨМ - дугаар :</span>
                                        <span className="desc">83</span>
                                </div>
                                <div className="contItem">
                                        <span className="title">Санхүүжилтийн хэмжээ :</span>
                                        <span className="desc">99,000.00</span>
                                </div>

                            </div>
                        </div> 
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="cardItems">
                            <div className="titleBig">Эм Си Эс ХХК</div>
                            <div className="contents">
                                <div className="contItem">
                                        <span className="title">Регистр :</span>
                                        <span className="desc">989265646</span>
                                </div>
                                <div className="contItem">
                                        <span className="title">ӨМ - дугаар :</span>
                                        <span className="desc">83</span>
                                </div>
                                <div className="contItem">
                                        <span className="title">Санхүүжилтийн хэмжээ :</span>
                                        <span className="desc">99,000.00</span>
                                </div>

                            </div>
                        </div> 
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="cardItems">
                            <div className="titleBig">Эм Си Эс ХХК</div>
                            <div className="contents">
                                <div className="contItem">
                                        <span className="title">Регистр :</span>
                                        <span className="desc">989265646</span>
                                </div>
                                <div className="contItem">
                                        <span className="title">ӨМ - дугаар :</span>
                                        <span className="desc">83</span>
                                </div>
                                <div className="contItem">
                                        <span className="title">Санхүүжилтийн хэмжээ :</span>
                                        <span className="desc">99,000.00</span>
                                </div>

                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            


            {/* <h1>lalala</h1> */}
        </Memberhome>
    )
}

export default HomePage

const Memberhome = styled.div`
    font-family:roboto;
    color:rgba(${textColor});
    margin-top:15px;
    font-size:13px;
    
    .CardParent{
        margin-top:20px;
        .cardItems{
            background-color:white;
            border:1px solid #d8dbe0;
            border-radius: 3px;
            // border-top: 2px solid rgba(${ColorRgb});
            border-top: 2px solid #39f;
            .titleBig{
                padding: .7rem 1.25rem !important;
                padding:10px 0px;
                font-size:14px;
                border-bottom:1px solid #d8dbe0;
            }
            .contents{
                padding: 0.5rem 1.25rem;
                .contItem{
                    display:flex;
                    align-items:center;
                    justify-content:start;
                    padding:5px 0px;
                    .title{
                        width:65%;
                    }
                }
            }
        }
    }
    .header{
        display:flex;
        font-size:14px;
        align-items:center;
        // justify-content:space-between;
        font-weight:500;
        border-bottom:1px solid rgba(0,0,0,0.1);
        .items{
            cursor:pointer;
            display:flex;
            flex-direction:column;
            &:hover{
                background-color:rgba(${ColorRgb},0.087);
            }
            .text{
                padding:2px 8px;
                padding-left:0px;
                margin-bottom:5px;
            }
            .line{
                height:2px;
                width:100%;
                background-color:rgba(${ColorRgb});
            }
        }
        .A1{
            .text{
                padding:2px 8px;
                margin-left:30px;
                font-weight:400;
            }
          
        }
    }
`
