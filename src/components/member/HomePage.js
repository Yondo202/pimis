import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ColorRgb, textColor, fontFamily } from '../theme';
import axios from 'axiosbase';
import Token from 'context/accessToken';
import DocumentTitle from 'containers/document/DocumentTitle'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import DecisionPage from 'pages/decision_making/5c/Page'
// import DecisionMakingPreviewModal from 'pages/decision_making/5a/previewModal'
// import AnalystReportPreview from 'pages/decision_making/5a/preview'

function HomePage({}) {
    DocumentTitle("EDP - Үнэлгээний хорооны гишүүн");
    const [cardData, setCardData] = useState([]);
    const [open, setOpen] = useState(false)
    const [ projId, setProjId ] = useState(null);
    // const [showModal, setShowModal] = useState(false);
    // const [parent, setParent] = useState({});
    // const ClickHandle = e => { setParent(e); setShowModal(true); }

    useEffect(() => {
        GetData();
    }, []);

    const GetData = () =>{
        axios.get(`evaluation-meetings/scheduled-projects`, { headers: { Authorization: Token() } }).then((res) => {
            if (res.data.data.length!==0) { setCardData(res.data.data); };
        }).catch((err) => console.log(err?.response))
    }

    const showHandle = (el) =>{
        setProjId(el)
        setOpen(prev=>!prev)
    }

    return (
        <Memberhome style={{ maxWidth: 1160 }} className="container">
            <div className="header">
                <div className="items">
                    <span className="text">Байгууллагуудын жагсаалт</span>
                    <div className="line"></div>
                </div>
            </div>
            <div className="CardParent">
                {/* {showModal && <Modal showModal={showModal} setNotify={setNotify} setShowModal={setShowModal} parent={parent} />} */}
                {cardData.length!==0 ? cardData.map((el, i) => {
                    return (
                        <div key={i}
                        //  onClick={() => ClickHandle(el)}
                         className="Ghost">
                            {open?<DecisionPage seeMember={projId} setOpen={setOpen} />:null}
                            <div className="cardItems">
                                <div className="titleBig">{el.company_name}</div>
                                <div className="contents">
                                    <div className="contItem">
                                        <span className="title">Регистр :</span>
                                        <span className="desc">{el.register_number}</span>
                                    </div>
                                    <div className="contItem">
                                        <span className="title">Өргөдөлийн маягт :</span>
                                        <span className="desc">{el.project_name}</span>
                                    </div>
                                    <div className="contItem">
                                        <span className="title">Санхүүжилтийн хэмжээ :</span>
                                        <span className="desc">{el.budgetCost} $</span>
                                    </div>

                                    <div className="contItem">
                                        {/* <span className="title">Санхүүжилтийн хэмжээ :</span> */}
                                        {/* <span className="desc">{el.budgetCost} $</span> */}
                                        <div onClick={()=>showHandle(el.projectId)} className="link">Шинжилгээний тайлан - харах</div>
                                    </div>

                                    <div className="mains">
                                        <div className="buttons Active">
                                            <Link
                                            //  onClick={() => setNotify(el)}
                                             to={`/notify/${el.projectId}`} >Mэдэгдэх хуудас
                                            </Link>
                                            {el.medegdehHuudas ? el.medegdehHuudas.is_violation !== null ? <IoMdCheckmarkCircle /> : null : null}
                                        </div>
                                        <div className="buttons Active">
                                            <Link
                                               //  onClick={() => setNotify(el)}
                                              to={el.medegdehHuudas === null ? el.medegdehHuudas?.is_violation === false ? `/memberdecision/${el.projectId}` : `#` : `/memberdecision/${el.projectId}`}
                                              >
                                                Саналын хуудас
                                              </Link>
                                            {el.sanalinnHuudas ? el.sanalinnHuudas.approve === null ? null : <IoMdCheckmarkCircle /> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : <h2>Мэдээлэл байхгүй байна...</h2>}
            </div>
        </Memberhome>
    )
}

export default HomePage

const firstAnitamte = keyframes`
    0% { transform:scale(1);opacity:1; }
    50% { transform:scale(1.8);opacity:0.8; }
    100% { transform:scale(1);opacity:1; }
`
const cardAnimate = keyframes`
    0% { transform:scale(1);opacity:0;  }
    30% { transform:scale(1.037);opacity:0.7;  }
    100% { transform:scale(1);opacity:1;  }
`

// #03a9f4

const Memberhome = styled.div`
    font-family:${fontFamily};
    color:rgba(${textColor});
    padding-top:15px;
    font-size:13px;
    position:relative;
    .CardParent{
        margin-top:20px;
        display:flex;
        flex-wrap:wrap;
        gap:30px;
        // justify-content:space-between;
        .Ghost{
            transition:all 0.2s ease;
            width:31.5%;
            .cardItems{
                background-color:white;
                margin-top:25px;
                transition:all 0.2s ease;
                // cursor:pointer;
                box-shadow:0px 2px 10px -6px rgba(${ColorRgb});
                border:1px solid #d8dbe0;
                border-radius: 6px;
                border-top: 4px solid rgba(${ColorRgb});
                // border-top: 4px solid #232f3e;
                &:hover{
                    box-shadow:0px 1px 10px -4px rgba(${ColorRgb});
                    .titleBig{
                        font-weight:500;
                        color:rgba(0,0,0,0.8);
                    }
                }
                .titleBig{
                    font-weight:500;
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
                        .link{
                            cursor:pointer;
                            color: #03a9f4;
                            font-weight:500;
                            &:hover{
                                text-decoration:underline;
                            }
                        }
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
                            cursor:pointer;
                            // color: rgba(0,0,0,0.5);
                            border-radius:3px;
                            padding:6px 10px;
                            margin-top:14px;
                            // border:1px solid rgba(0,0,0,0.4);
                            background-color:#0d77b7;
                            border:1px solid rgba(255,255,255,0.4);
                            &:hover{
                                opacity:0.8;
                            }
                            a{
                                text-decoration:none;
                                color: #fff;
                            }
                        }

                        .Active{
                            cursor:pointer;
                            position:relative;
                            color: white;
                            border-radius:3px;
                            border:1px solid rgba(255,255,255,0.4);
                            background-color:#0d77b7;
                            a{
                                text-decoration:none;
                                color:white;
                            }
                            svg{
                                background-color:white;
                                border-radius:50%;
                                position:absolute;
                                font-size:18px;
                                color:#00b300;
                                top:-11px;
                                right:-5px;
                                animation-name: ${firstAnitamte};
                                animation-duration: .5s;
                                // animation-iteration-count: infinite;
                            }
                        }
                    }
                }
            }
        }
        .Fix{
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
            &:hover{
                box-shadow:0px 1px 10px -4px rgba(${ColorRgb});
                .titleBig{
                    color:black !important;
                }
            }
            .cardItems{
                animation-name: ${cardAnimate};
                animation-duration: 0.5s;
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
                            font-size:14px;
                            padding:7px 25px;
                            border:1px solid rgba(0,0,0,0.4);
                            transition:all 0.2s ease;
                            a{
                                text-decoration:none;
                                color:white;
                            }
                            &:hover{
                                background-color:rgba(${ColorRgb},0.9);
                                padding:7px 28px;
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

const Modal = ({ setShowModal, parent, setNotify }) => {
    const ref = useRef();
    const closeModal = e => { if (ref.current === e.target) { setShowModal(false); } }
    return (
        <div onClick={closeModal} ref={ref} className="Ghost Fix">
            <div className="cardItems">
                <div className="titleBig">{parent.company_name}</div>
                <div className="contents">
                    <div className="contItem">
                        <span className="title">Регистр :</span>
                        <span className="desc">{parent.register_number}</span>
                    </div>
                    <div className="contItem">
                        <span className="title">ӨМ - дугаар :</span>
                        <span className="desc">{parent.project_name}</span>
                    </div>
                    <div className="contItem">
                        <span className="title">Санхүүжилтийн хэмжээ :</span>
                        <span className="desc">{parent.budgetCost}</span>
                    </div>
                    <div className="mains">
                        <div className="buttons Active">
                            <Link onClick={() => setNotify(parent)} to={parent.medegdehHuudas ? parent.medegdehHuudas.is_violation === false ? `/notify/${parent.projectId}` : `#` : `/notify/${parent.projectId}`}>Mэдэгдэх хуудас</Link>

                        </div>
                        <div className="buttons">
                            <Link onClick={() => setNotify(parent)} to={parent.medegdehHuudas ? parent.medegdehHuudas.is_violation === false ? `/memberdecision/${parent.projectId}` : `#` : `/memberdecision/${parent.projectId}`}>Саналын хуудас</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CardData = [
    { company_name: "Эм Си Эс ХХК", registration_number: "15165687", project_name: "85", budgetCost: "99,000.00 " },
    { company_name: "Гацуурт ХХК", registration_number: "4545445", project_name: "15", budgetCost: "45,000.00 " },
    { company_name: "Натурал ХХК", registration_number: "55555444", project_name: "55", budgetCost: "33,000.00 " },
    { company_name: "Ганга өвс ХХК", registration_number: "544554", project_name: "45", budgetCost: "1,000.00 " },
]
