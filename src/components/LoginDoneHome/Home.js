import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import {ColorRgb} from '../theme'
import { BrowserRouter as Router, Switch, Route, Link,useHistory, useLocation } from "react-router-dom";
import axios from '../../axiosbase';
import AccessToken from '../../context/accessToken'

function Home() {
   let history = useHistory();
   const [ cond, setCond ] = useState(false);
//    useEffect(async()=>{
//        try{
//         let storageToken = localStorage.getItem("edp_loggedUser", []);
//         let resData = await axios.get(`pps-request`, {headers: {Authorization: AccessToken()}});
//         console.log(resData, " ____")
//         if(resData.data.data.id){ setCond(true); }else{ setCond(false); }
//        }catch{console.log("Алдаа гарсан..."); }

//    },[cond]);

   const clickHandle = (event)=>{
       console.log(event);
    //    history.push('intro/3');
   }

    return (
        <HomeComponent className="container">
            <div className="headerPar">
                <div className="header row">
                    <div className="col-md-4"><div className="headItems"><span className="text">1.Түншлэлийн хөтөлбөрт бүрдүүлэх баримт</span> </div></div>
                    <div className="col-md-4"><div className="headItems"><span className="text">2. Үнэлгээ, шийдвэр гарах явц</span> </div></div>
                    <div className="col-md-4"><div className="headItems"><span className="text"> 3. Гэрээ байгуулах, гүйцэтгэл санхүүжилтийн..</span></div></div>
                </div>

                <div className="otherHead row">
                    <div className="col-md-4"><div className="headItems" > <span className="text">1-р шат</span> <span className="text">2-р шат</span> </div></div>
                    {/* <div className="col-md-4"><div className="headItems"><span className="text">Бизнес хяналтын зөвлөх</span><span className="text">Үнэлгээний хорооны үнэлгээ, шийдвэр</span> </div></div> */}
                    <div className="col-md-4"><div className="headItems"><span className="text">Бизнес хяналтын зөвлөх</span><span className="text">Үнэлгээ, шийдвэр</span> </div></div>
                </div>
            </div>
            
            <div style={{marginTop:25}} className="row">
                    <div className="col-md-2 col-sm-2 itemsCol ActiveCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <Link to="/comp-test"  className="itemsActive ">1. Шалгуур хангалтыг тулгах хуудас </Link>
                                <div className="line line2" ></div>
                                <Link to={`/comp-request`} className="itemsActive">2. Байгаль орчны үнэлгээний асуумж </Link>
                                <div className="line line2" ></div>
                                <Link to="/letter-of-interest" className="itemsActive">3. Сонирхол илэрхийлэх албан тоот</Link>
                                {/* <div className="line line2" ></div>
                                <Link to="/urgudul/1" className="itemsActive">4. Өргөдлийн маягт </Link> */}
                            </div>
                            <div className="lineFull lineFull2" ></div>
                            <Link to="/urgudul/1" className="resultActive">4. Өргөдлийн маягт </Link>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <a href="https://edp-plan.vercel.app/" target="_blank" style={{backgroundColor:`#F7FF48`}} className="itemsActive arrHelp arrHelpActive"><div className="helpArr"></div> 1.Экспорт хөгжлийн төлөвлөгөө</a>
                                <div className="line line2" ></div>
                                <Link to="/attachments" style={{backgroundColor:`#F7FF48`}} className="items itemsActive">2.Нотлох бичиг баримтууд </Link>
                            </div>
                            <div className="lineFull" ></div>
                            <div className="resultWaiting">Баримт бүрдүүлэлт <br/> 2-р шат бүрэн</div>
                        </div>
                    </div>



                    <div className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <div className="items arrHelp"><div className="helpArr"></div>1. Анхан шатны үнэлгээ</div>
                                <div className="line" ></div>
                                <Link to="/5b" className="items "><div className="helpArr"></div> 2. Баримтжуулах бүрдүүлбэрийн шалгах хуудас </Link>
                            </div>
                            <div className="lineFull" ></div>
                            <Link to="/5c" className="items resultDesable">3. Бизнес шинжээчийн шинжилгээний тайлан </Link>
                        </div>
                    </div>

                    <div className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <Link to="#" className="items  arrHelp"><div className="helpArr"></div> 1. Ашиг сонирхлын зөрчилгүйг мэдэгдэх хуудас</Link>
                            </div>
                            <div className="lineFull" ></div>
                            <div className="resultDesable">2.Үнэлгээний хорооны шийдвэрийн хуудас</div>
                        </div>
                    </div>



                    <div className="col-md-2 col-sm-2 itemsCol">
                        <div className="itemsPar">
                            <div className="mains">
                                <div className="items arrHelp"><div className="helpArr"></div>1. Түншлэлийн гэрээ байгуулах </div>
                                <div className="line" ></div>
                                <Link to="#" className="items "><div className="helpArr"></div> 2. Гүйцэтгэлийг нотлох баримт(бусад байгууллагатай байгуулах гэрээ, гэрээний дүгнэлт, хийгдсэн ажлуудын тайлан) </Link>
                    

                            </div>
                            <div className="lineFull" ></div>
                            <div className="resultDesable">3. Түншлэлийн гэрээний гүйцэтгэлийн тайлан</div>
                            
                        </div>
                    </div>

                    <div style={{borderRight:`none`}} className="col-md-2 col-sm-2 itemsCol itemsColA">
                        <div className="itemsPar">
                            <div className="mains">
                                <div className="items arrHelp"><div className="helpArr"></div>4. Санхүүгийн баримтууд</div>
                                <div className="line" ></div>
                            <div className="resultDesable">5. Анхны гүйцэтгэлийг хүлээн авах /асууна/</div>
                            </div>
                            <div className="lineFull" ></div>
                            <div className="resultDesable">6. Гүйцэтгэлийн үнэлгээ бүрэн бөгөөд буцаан (санхүүжилтийн) олголтын хүсэлт</div>
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
        // border-right:1px solid rgba(0,0,0,0.3);
        // border-right-style:dashed;
        &:before{
            content:"";
            right:0;
            top:4%;
            width:1px;
            height:96%;
            background-color:#C1C1C1;
            position:absolute;
        }
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
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    bottom:-43px;
                    right:-21px;
                    height:42px;
                    width:90px;
                    border-right:1px solid #C1C1C1; 
                    border-bottom:1px solid #C1C1C1;
                    border-left:1px solid #C1C1C1;
                    border-radius: 0 0 90px 90px;
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
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    bottom:-43px;
                    right:-21px;
                    height:42px;
                    width:90px;
                    border-right:1px solid #535352; 
                    border-bottom:1px solid #535352;
                    border-left:1px solid #535352;
                    border-radius: 0 0 90px 90px;
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
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    bottom:-43px;
                    right:-21px;
                    height:42px;
                    width:90px;
                    border-right:1px solid #C1C1C1; 
                    border-bottom:1px solid #C1C1C1;
                    border-left:1px solid #C1C1C1;
                    border-radius: 0 0 90px 90px;
                }
            }
            
            .arrHelp{
                position:relative;
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    top:-46px;
                    left:-22px;
                    height:45px;
                    width:95px;
                    border-right:1px solid #C1C1C1; 
                    border-top:1px solid #C1C1C1;
                    border-left:1px solid #C1C1C1;
                    border-radius: 90px 90px 0 0;
                }
                .helpArr{
                    z-index:333;
                    top:-12px;
                    left:66px;
                    position:absolute;
                    height:12px;
                    width:12px;
                    background-color:#C1C1C1;
                    clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0)
                }
            }

            .arrHelpActive{
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    top:-46px;
                    left:-22px;
                    height:45px;
                    width:96px;
                    border-right:1px solid #535352; 
                    border-top:1px solid #535352;
                    border-left:1px solid #535352;
                    border-radius: 90px 90px 0 0;
                }
                
                .helpArr{
                    z-index:333;
                    top:-12px;
                    left:67px;
                    position:absolute;
                    height:12px;
                    width:12px;
                    background-color:#535352;
                    clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0)
                }
            }
            
        }
    }
    .ActiveCol{
        &:before{
            content:"";
            right:0;
            top:4%;
            width:1px;
            height:96%;
            background-color:#535352;
            position:absolute;
            
        }
    }
    .itemsColA{
        &::before{
            display:none;
        }
        .resultDesable{
            &::after{
                display:none;
            }
        }
    }
    .headerPar{
        margin-top:1px;
        .header{
            background-color: rgba(${ColorRgb},1);
            .headItems{
                display:flex;
                align-items:center;
                justify-content:center;
                // height:70px;
                padding-bottom:10px;
                padding-top: 10px;
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
        .otherHead{
            padding:3px 0px;
            font-size:12px;
            border-bottom:1px solid rgba(0,0,0,.2);
            border-style:dashed;
            display:flex;
            align-items:center;
            .headItems{
               margin-right:-15px;
               display:flex;
               align-items:center;
               justify-content:space-between;
                span{
                    height:100%;
                    padding-right:15px;
                    border-right:1px solid rgba(0,0,0,0.1);
                    width:45%;
                }
            }
        }
    }
    
    
`
