import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {ColorRgb,textColor} from '../theme'
import {useSpring, animated} from 'react-spring';

function HomePage() {
    const [ showModal, setShowModal ] = useState(false);
    const [ parent, setParent ] = useState({});

    const ClickHandle = e =>{ setParent(e); setShowModal(true);}

    return (
        <Memberhome className="container">
            <div className="header">
                <div className="items">
                   <span className="text">Байгууллагуудын жагсаалт</span>
                   <div className="line"></div>
                </div>
            </div>

            <div className="CardParent">
                  {showModal&&<Modal showModal={showModal} setShowModal={setShowModal} parent={parent} />} 
                    {CardData.map((el,i)=>{
                        return(
                            <div onClick={()=>ClickHandle(el)} className="Ghost">
                                <div className="cardItems">
                                    <div className="titleBig">{el.comname}</div>
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
                                        <div className="mains">
                                                <div className="buttons Active">
                                                <Link to="/memberdecision">Mэдэгдэх хуудас</Link> 
                                                </div>
                                                <div className="buttons">
                                                <Link to="/notify-page/1">Саналын хуудас</Link> 
                                                    
                                                </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        )
                    })}
            </div>
            


        </Memberhome>
    )
}

export default HomePage

const Modal = ({ setShowModal, parent }) =>{
    const ref = useRef();
    const closeModal = e =>{ console.log(ref.current); if(ref.current === e.target){ setShowModal(false);}}
    return(
        <div onClick={closeModal} ref={ref} className="Ghost Fix">
                <div className="cardItems">
                    <div className="titleBig">{parent.comname}</div>
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
                        <div className="mains">
                                <div className="buttons Active">
                                <Link to="/memberdecision">Mэдэгдэх хуудас</Link> 
                                </div>
                                <div className="buttons">
                                <Link to="/notify-page/1">Саналын хуудас</Link> 
                                </div>
                        </div>
                    </div>
                </div> 
        </div>
    )
}


const CardData = [
    { comname: "Эм Си Эс ХХК", register: "15165687", omdugaar: "85", financeSize: "99,000.00 "},
    { comname: "Гацуурт ХХК", register: "4545445", omdugaar: "15", financeSize: "45,000.00 "},
    { comname: "Натурал ХХК", register: "55555444", omdugaar: "55", financeSize: "33,000.00 "},
    { comname: "Ганга өвс ХХК", register: "544554", omdugaar: "45", financeSize: "1,000.00 "},
]

const Memberhome = styled.div`
    font-family:roboto;
    color:rgba(${textColor});
    padding-top:15px;
    font-size:13px;
    position:relative;
    
    .CardParent{
        margin-top:20px;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        .Ghost{
            transition:all 0.2s ease;
            width:31.5%;
            .cardItems{
                margin-top:25px;
                transition:all 0.2s ease;
                cursor:pointer;
                box-shadow:0px 2px 10px -7px;
                background-color:white;
                border:1px solid #d8dbe0;
                border-radius: 6px;
                border-top: 2px solid rgba(${ColorRgb});
                // border-top: 2px solid #39f;
                &:hover{
                    box-shadow:0px 1px 10px -4px;
                }
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
                            color:rgba(${textColor},1);
                            font-weight:500;
                            width:65%;
                        }
                    }
                    .mains{
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        padding:8px 0px;
                        position:relative;
                        
                        .buttons{
                            color: rgba(0,0,0,0.5);
                            border-radius:3px;
                            padding:2px 10px;
                            border:1px solid rgba(0,0,0,0.4);
                            a{
                                text-decoration:none;
                                color: rgba(0,0,0,0.5);
                            }
                        }
                        .Active{
                            color: white;
                            border-radius:3px;
                            padding:2px 10px;
                            border:1px solid rgba(255,255,255,0.4);
                            background-color:#00A300;
                            // background-color:#18A558;
                            a{
                                text-decoration:none;
                                color:white;
                            }
                        }
                    }
                }
            }
        }
        .Fix{
            transition:all 0.3s ease;
            z-index:1000;
            width: 100%;
            height: 100vh;
            position:fixed;
            display:flex;
            top:0;
            right:0;
            background: rgba(0,0,0,0.6);
            justify-content:center;
            align-items:start;
            bottom:0;
            .cardItems{
                cursor: unset;
                margin-top:15vh;
                width:35vw !important;
                border-top: 3px solid rgba(${ColorRgb});
                .titleBig{
                    font-weight:500;
                    padding: 0.9rem 1.25rem !important;
                    font-size:15px;
                }
                .contents{
                    .contItem{
                        padding:9px 0px;
                    }
                    .mains{
                        padding:20px 0px;
                       
                        .buttons{
                            cursor:pointer;
                            background-color:rgba(${ColorRgb},1);
                            color: white;
                            border-radius:3px;
                            padding:6px 20px;
                            border:1px solid rgba(0,0,0,0.4);
                            transition:all 0.2s ease;
                            a{
                                text-decoration:none;
                                color:white;
                            }
                            &:hover{
                                background-color:rgba(${ColorRgb},0.9);
                                padding:6px 19px;
                            }
                        }
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

    @media only screen and (max-width:768px){
        .CardParent{
            flex-direction:column;
            .Ghost{
                width:100%;
            }
            .Fix{
                height: 100vh;
                .cardItems{
                    width:95% !important;
                    
                }
            }
        }
    }
`
