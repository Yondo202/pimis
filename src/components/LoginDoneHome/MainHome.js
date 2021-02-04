import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {textColor,fontFamily,ColorRgb,fontSize} from '../theme'

function MainHome() {
    return (
        <Container className="container">
            <div className="header row">
                <div className="headItems2 col-md-12 col-sm-12 col-12"><span className="text2">PIMIS код буруу байна</span></div>
                <div className="col-md-4"><div className="headItems"><span className="text">1. Хүсэлт гаргах</span> </div></div>
                <div className="col-md-6"><div className="headItems"><span className="text">2. Үнэлгээ хийх</span> </div></div>
                <div className="col-md-2"><div className="headItems"><span className="text"> 3. Гэрээ байгуулах</span></div></div>
            </div>
           <div className="MainItems row">
                <div style={{borderRight:`1px solid rgba(${ColorRgb},0.7)`,borderLeft:`1px solid rgba(${ColorRgb},0.2)`}} className="col-md-4">
                    <div className="row">
                        <div style={{borderRight:`1px solid rgba(${ColorRgb},0.2)`}} className="paddingCol col-md-6">
                            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                                <div className="iconPar"><img src="one1.svg" alt="EDP-img" /></div>
                            </motion.div>

                            <div className="ItemPar"> <div className="checkIconGreen"></div><div className="texts">Сонирхол илэрхийлэх хүсэлт</div></div>
                            <div className="ItemPar"> <div className="checkIconGreen"></div><div className="texts">Байгал орчны үнэлгээний асуулга</div></div>
                            <div className="ItemPar"> <div className="checkIconRed"></div><div className="texts">Аж ахуй нэгжийн гэрчилгээ</div></div>
                            <div className="ItemPar"> <div className="checkIconRed"></div><div className="texts">Санхүүгийн дэмжлэг хүссэн өргөдөл</div></div>
                            
                            <div className="ItemPar"> <div className="checkIconGreen"></div> <div className="texts">Сүүлийн 2 жилийн санхүүгийн тайлан</div></div>
                            <div className="ItemPar"> <div className="checkIconGreen"></div> <div className="texts">Тухайн жилийн жилийн санхүүгийн тайлан</div></div>
                        </div>

                        <div className="col-md-6">
                            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                                <div className="iconPar"><img src="one2.svg" alt="EDP-img" /></div>
                            </motion.div>
                                <div className="ItemPar">  <div className="checkIconGreen"></div> <div className="texts">Экспортын хөгжлийн төлөвлөгөө</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div style={{borderRight:`1px solid rgba(${ColorRgb},0.7)`}} className="col-md-6">
                <div className="row">
                        <div style={{borderRight:`1px solid rgba(${ColorRgb},0.2)`}} className="col-md-4">
                            <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                                 <div className="iconPar"><img src="one4.svg" alt="EDP-img" /></div>
                            </motion.div>
                            <div className="ItemPar">
                                    <div className="checkIconGreen"></div>
                                <div className="texts">Үнэлгээний зөвлөлийн хурлын шийдвэр</div>
                            </div>
                        </div>

                        <div style={{borderRight:`1px solid rgba(${ColorRgb},0.2)`}} className="col-md-4">
                                <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                                <div className="iconPar"><img src="one5.svg" alt="EDP-img" /></div>
                                </motion.div>
                                <div className="ItemPar">
                                    <div className="checkIconGreen"></div>
                                <div className="texts">Үнэлгээний зөвлөлийн хурлын мэдэгдэл</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{borderRight:`1px solid rgba(${ColorRgb},0.2)`}} className="col-md-2">
                    <div className="row">
                    <div className="col-md-12">
                                <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
                                    <div className="iconPar"><img src="one6.svg" alt="EDP-img" /></div>
                                </motion.div>
                                <div className="ItemPar">
                                    <div className="checkIconYellow"></div>
                                <div className="texts">Танай байгууллагад санхүүгийн дэмжлэг олгох гэрээ баталгаажуулахаар хүлээгдэж байна...</div>
                        </div>
                    </div>
                    </div>
                </div>
           </div>
           <div className="DocumentPar row">
                <div className="col-md-4 col-sm-4">
                    <div className="ItemPar"><div className="checkIconGreen"></div>  <div className="texts">Биелсэн</div></div>
                </div>
                <div className="col-md-4 col-sm-4">
                    <div className="ItemPar"> <div className="checkIconYellow"></div><div className="texts">Хүлээгдэж байна...</div></div>
                </div>
                <div className="col-md-4 col-sm-4">
                    <div className="ItemPar">  <div className="checkIconRed"></div>  <div className="texts">Татгалзсан</div></div>
                </div>
           </div>

        </Container>
    )
}

export default MainHome

let easing = [0, 0, 0.56, 0.95];
const textVariants2 = {exit: { y: -50, opacity: 0, transition: { duration: 0.9, ease: easing } },
    enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 1.5, ease: easing }}};


const Container = styled.div`
    color:rgba(${textColor},0.9);
    transition: all 0.5s ease-out;
    font-family: ${fontFamily};
    // font-size: ${fontSize};
    font-size: 14px;

    .DocumentPar{
        border-top:1px solid rgba(${ColorRgb},0.2);
        padding:60px 0px;
        .ItemPar{
            margin-bottom:18px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            .checkIconGreen{
                border-radius:50%;
                height:30px;
                width:30px;
                background-image: linear-gradient(to bottom, #76ff76, #00c400,green);
            }
            .checkIconYellow{
                border-radius:50%;
                height:30px;
                width:30px;
                background-image: linear-gradient(to bottom,#ffff76, #ebeb00, #b1b100);
            }
            .checkIconRed{
                border-radius:50%;
                height:30px;
                width:30px;
                background-image: linear-gradient(to bottom,#ff8989, #c40000,#ff0000);
            }
            .texts{
                font-size:16px;
                font-weight:500;
                width:85%;
            }
        }
    }
        .MainItems{
            .iconPar{
                padding:45px 45px;
                img{
                    width:100%;
                }
            }
            .ItemPar{
                margin-bottom:18px;
                display:flex;
                align-items:center;
                justify-content:space-between;
                .checkIconGreen{
                    border-radius:50%;
                    height:25px;
                    width:25px;
                    background-image: linear-gradient(to bottom, #76ff76, #00c400,green);
                }
                .checkIconYellow{
                    border-radius:50%;
                    height:25px;
                    width:25px;
                    background-image: linear-gradient(to bottom,#ffff76, #ebeb00, #b1b100);
                }
                .checkIconRed{
                    border-radius:50%;
                    height:25px;
                    width:25px;
                    background-image: linear-gradient(to bottom,#ff8989, #c40000, #ff0000);
                }
                .texts{
                    width:80%;
                }
            }
        }

        .header{
            margin-top:20px;
            background-color: rgba(${ColorRgb},0.9);
            // background-color: rgb(255,255,255);
            .headItems{
                display:flex;
                align-items:center;
                justify-content:center;
                // height:70px;
                padding-bottom:15px;
                padding-top: 8px;
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
      
   @media (max-width:786px){
    .MainItems{
        border-bottom:1px solid rgba(0,0,0,0.5);
        .iconPar{
            padding:10px 10px;
            text-align:center;
            img{
                width:80px;
            }
        }
     }
   }
`
