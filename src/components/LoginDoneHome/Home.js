import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import {ColorRgb} from '../theme'
import { BrowserRouter as Router, Switch, Route, Link,useHistory, useLocation } from "react-router-dom";
import axios from '../../axiosbase';

function Home() {
   let history = useHistory();
   const [ cond, setCond ] = useState(false);
   useEffect(async()=>{
       try{
        let storageToken = localStorage.getItem("edp_loggedUser", []);
        let resData = await axios.get(`pps-request`, {headers: {Authorization:`bearer ${storageToken}`}});
        if(resData.data.data[0]){ setCond(true); }else{ setCond(false); }
       }catch{console.log("Алдаа гарсан"); }
   },[cond]);

   console.log(cond,"lalala");

   const clickHandle = (event)=>{
       console.log(event);
    //    history.push('intro/3');
   }

    return (
        <HomeComponent className="container">
            <div className="headerPar">
                <div className="header row">
                    {/* <div className="headItems2 col-md-12 col-sm-12 col-12"><span className="text2">PIMIS код буруу байна</span></div> */}
                    <div className="col-md-4"><div className="headItems"><span className="text">1. Баримт бүрдүүлэлт</span> </div></div>
                    <div className="col-md-6"><div className="headItems"><span className="text">2. Үнэлгээ хийх</span> </div></div>
                    <div className="col-md-2"><div className="headItems"><span className="text"> 3. Гэрээ байгуулах</span></div></div>
                </div>
            </div>
            
            <div className="row">
                    <div className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <Link to="/comp-test"  className="itemsActive">1. Шалгуур хангалтыг тулгах хуудас </Link>
                                <div className="line line2" ></div>
                                <Link to={cond===false?`/comp-request/new`:`/comp-request`} className="itemsActive">2. Байгаль орчны үнэлгээний асуумж </Link>
                                <div className="line line2" ></div>
                                <Link to="/letter-of-interest" className="itemsActive">3. Сонирхол илэрхийлэх албан тоот</Link>
                                <div className="line line2" ></div>
                                <Link to="/urgudul/1" className="itemsActive">4. Өргөдлийн маягт </Link>
                            </div>
                            <div className="lineFull lineFull2" ></div>
                            <div className="resultActive">Баримт бүрдүүлэлт бүрэн</div>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <a href="https://edp-plan.vercel.app/" target="_blank" style={{backgroundColor:`#F7FF48`}} className="itemsActive">1.Экспорт хөгжлийн төлөвлөгөө</a>
                                <div className="line line2" ></div>
                                <Link to="#" style={{backgroundColor:`#F7FF48`}} className="items itemsActive">2.Нотлох бичиг баримтууд </Link>
                               
                            </div>
                            <div className="lineFull" ></div>
                            <div className="resultWaiting">Баримт бүрдүүлэлт <br /> 2-р шат бүрэн</div>
                        </div>
                    </div>



                    <div className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <div className="items">Анхан шатны үнэлгээний хуудас </div>
                            </div>
                            <div className="lineFull" ></div>
                            <div className="resultDesable">Экспортын бүтээгдэхүүн үйлчилгээгээ бүрэн тодорхойлсон </div>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <div className="items">1.Баримтжуулах бүрдүүлбэрийн шалгах хуудас </div>
                                <div className="line " ></div>
                                <div className="items">2.Бизнес шинжээчийн шинжилгээний тайлан </div>
                                <div className="line " ></div>
                                <div className="items">3. Ашиг сонирхлын зөрчилгүйг мэдэгдэх хуудас  </div>
                                <div className="line " ></div>
                                <div className="items">4. Үнэлгээний хорооны Шийдвэрийн хуудас </div>
                            </div>
                            <div className="lineFull" ></div>
                            <div className="resultDesable">Шийдвэр гаргалт бүрэн гүйцэд</div>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <div className="items">Гүйцэтгэлийн үнэлгээ </div>
                            </div>
                            <div className="lineFull" ></div>
                            <div className="resultDesable">Гүйцэтгэлийн үнэлгээ бүрэн</div>
                        </div>
                    </div>

                    <div style={{borderRight:`none`}} className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <div className="items">Хүлээгдэж байна...</div>
                            </div>
                            <div className="lineFull" ></div>
                            <div className="resultDesable">Хүлээгдэж байна...</div>
                        </div>
                    </div>
                </div>
        </HomeComponent>
    )
}

export default Home

const HomeComponent = styled.div`
    max-width:1160px;
    text-align:center;
    font-size:13px;
    a{
        text-decoration:none;
    }
    .itemsCol{
        border-right:1px solid rgba(0,0,0,0.3);
        border-right-style:dashed;
        .itemsPar{
            height:70vh;
            width:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            margin-top:30px;
            .mains{
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                .items{
                    width:93%;
                    border-radius:4px;
                    padding:7px 10px;
                    border:1px solid rgba(0,0,0,0.2);
                    color:rgba(0,0,0,0.5);
                    position:relative;
                    &::before{
                        content:"-";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        bottom:-7px;
                        right:-1%;
                        border:1px solid #C1C1C1;
                        background-color:white;
                        color:#C1C1C1;
                        width:18px;
                        height:18px;
                        border-radius:50%;
                    }
                }
                .itemsActive{
                    font-weight:500;
                    width:93%;
                    border-radius:4px;
                    padding:7px 10px;
                    // border:1px solid rgba(0,0,0,0.6);
                    color:rgba(0,0,0,1);
                    position:relative;
                    background-color:#89E673;
                    &::before{
                        content:"✔";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        bottom:-7px;
                        right:-1%;
                        border:1px solid green;
                        background-color:white;
                        color:green;
                        width:18px;
                        height:18px;
                        border-radius:50%;
                    }
                }

                .line{
                    position:relative;
                    height:6vh;
                    width:1.2px;
                    background-color:#C1C1C1;
                    &::after{
                        content:"";
                        bottom:-2px;
                        left:-480%;
                        position:absolute;
                        height:12px;
                        width:12px;
                        background-color:#C1C1C1;
                        clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0);
                    }
                }
                .line2{
                    background-color:#535352;
                    &::after{
                        background-color:#535352;
                    }
                }
            }
            .lineFull{
                position:relative;
                height:100%;
                width:1.2px;
                background-color:#C1C1C1;
                &::after{
                    content:"";
                    bottom:-2px;
                    left:-480%;
                    position:absolute;
                    height:12px;
                    width:12px;
                    background-color:#C1C1C1;
                    clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0);
                }
            }
            .lineFull2{
                background-color:#535352;
                &::after{
                    background-color:#535352;
                }
            }
            .resultDesable{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 10px;
                border:1px solid rgba(0,0,0,0.2);
                color:rgba(0,0,0,0.5);
                position:relative;
                &::before{
                    content:"-";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid #C1C1C1;
                    background-color:white;
                    color:#C1C1C1;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .resultActive{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 10px;
                border:1px solid rgba(0,0,0,0.2);
                color:black;
                position:relative;
                background-color:#89E673;
                font-weight:500;
                &::before{
                    content:"✔";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid green;
                    background-color:white;
                    color:green;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .resultWaiting{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 10px;
                border:1px solid rgba(0,0,0,0.2);
                color:black;
                position:relative;
                background-color:#F7FF48;
                &::before{
                    content:"...";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid #F8FF5D;
                    background-color:white;
                    color:black;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
        }
    }
    .headerPar{
        background-color: rgba(${ColorRgb},0.9);
        margin-top:20px;
        .header{
            .headItems{
                display:flex;
                align-items:center;
                justify-content:center;
                // height:70px;
                padding-bottom:15px;
                padding-top: 15px;
                padding-right:15px;
                padding-left:15px;
                .text{
                    border-radius:6px;
                    font-weight:500;
                    text-align:center;
                    width:100%;
                    background-color:rgba(255,255,102,0.9);
                    padding:4px 8px;
                }
            }
            .headItems2{
                display:flex;
                align-items:center;
                justify-content:center;
                padding:15px 0px;
                .text2{
                    border-radius:6px;
                    font-weight:500;
                    text-align:center;
                    width:70%;
                    background-color:rgba(255,255,102,0.9);
                    padding:4px 8px;
                }
            }
        }
    }
    
    
`
