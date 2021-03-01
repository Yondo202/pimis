import React, { useState } from 'react'
import styled from 'styled-components'
import {fontSize, textColor,InputStyle,ColorRgb, NextBtn } from '../theme'
import {MdAddCircle} from 'react-icons/md';
import ModalOne from './one/ModalOne'
import ModalTwo from './one/ModalTwo'
import ModalThree from './one/ModalThree'
import {AiOutlineSend} from 'react-icons/ai'

import OneModalOne from './two/ModalOne'
import TwoModalTwo from './two/ModalTwo'
import ThreeModalThree from './two/ModalThree'


function MainWorkPerformance() {
    const initialList = [{ids: 1}];
    const initialList2 = [{ids: 1}];
    const [opacity2, setOpacity2] = useState("0");
    const [ spnBtn, setSpnBtn ] = useState(false);
    const [ initialData, setInitialData ] = useState(initialList);
    const [ initialData2, setInitialData2 ] = useState(initialList2);
    const [ success, setSuccess ] = useState();

    const AddHandle = ()=>{  const list = initialData.concat( {ids: 1}); setInitialData(list); }
    const AddHandle2 = ()=>{  const list = initialData2.concat( {ids: 1}); setInitialData2(list); }




    const clickHandle = () =>{
        let inf = document.querySelectorAll(".getInp"); let arr = Array.from(inf); let final = {};
        arr.map((el,i)=>{
            if(!el.value){
                el.classList += " RedPar"
            }else{
                final[el.name] = el.value;
                el.classList =- " RedPar"
                el.classList += " getInp"
            }
        });

        let tb1 = document.querySelectorAll(".approve"); let tbarr2 = Array.from(tb1); let table1 = []; 
        tbarr2.map((el,i)=>{
            let item = document.querySelectorAll(".appItems"); let itmarr = Array.from(item);
            itmarr.map((el,i)=>{
                if(el.value){
                    let obj = {};
                    obj[el.name] = el.value;
                    table1.push(obj);
                }
            });
        });
        if(table1[0]){
            final["todo_works"] = table1
        };
        console.log(final,"final");
    }

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
                                  <InputStyle className="themeStyle" ><input className="getInp" name="contact_num" placeholder="гэрээний дугаар..." type="number" /><div className="line" /></InputStyle>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Түншлэлийн дэмжлэг хүртэгчийн нэр : </div> </div>
                            <div className="col-md-9 col-9"><div className="RightHead"><InputStyle className="themeStyle" ><input className="getInp" name="name" placeholder="нэр..." type="text" /><div className="line" /></InputStyle></div></div>
                        </div>
                    </div>
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Утасны дугаар, e- mail: </div> </div>
                            <div className="col-md-9 col-9"><div className="RightHead"><InputStyle className="themeStyle" ><input className="getInp" name="phone_email" placeholder="example@example.com..." type="text" /><div className="line" /></InputStyle></div></div>
                        </div>
                    </div>
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-12 col-12"><div className="betweenItems">Энэхүү маягтад гарын үсэг зурагдсанаар дараах гүйцэтгэх ажлуудыг батлагдсанд тооцно. </div> </div>
                        </div>
                    </div>

                    <div className="rowItems approve">
                        {initialData.map((el,i)=>{
                            return(
                                <div className="row rowA" key={i}>
                                    <div className="col-md-3 col-3"><div className="LeftHead">Гүйцэтгэх ажил {i + 1}:  {i===0?`Гүйцэтгэх ажлыг бичнэ үү :`: ""}  </div> </div>
                                    <div className="col-md-9 col-9"><div className="RightHead RightHeadA"><InputStyle className="themeStyle" ><textarea className="appItems" name={`work`} placeholder="Ажил гүйцэтгэсэн түвшин, чанар..." /><div className="line" /></InputStyle></div></div>
                                </div>
                            )
                        })}
                        <div onClick={AddHandle} className="addBtn"><MdAddCircle /></div>
                    </div>

                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Баталсан: </div> </div>
                            <div className="col-md-9 col-9"><div className="RightHead RightHeadB">Дээр дурдсан ажлуудыг хангалттай хэмжээнд гүйцэтгэсэн хэмээн ТХН, Түншлэлийн Хөтөлбөр зөвшөөрөв.</div></div>
                        </div>
                    </div>

                    <ModalOne setSuccess={setSuccess} />
                    <ModalTwo />
                    <ModalThree />

                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Хангалтгүй тохиолдолд: </div> </div>
                            <div className="col-md-9 col-9"><div className="RightHead RightHeadB">Доор дурдсан ажлын гүйцэтгэлийг хангалтгүй эсвэл хийгээгүй гэж ТХН, ТХ үзэж байна.</div></div>
                        </div>
                    </div>

                   
                    <div className="rowItems">
                        {initialData2.map((el,i)=>{
                            return(
                                <div className="row rowA" key={i}>
                                    <div className="col-md-3 col-3"><div className="LeftHead">Гүйцэтгэх ажил {i + 1}:  {i===0?`Ажлыг бичих:`: ""}  </div> </div>
                                    {/* <div className="col-md-9 col-9"><div className="RightHead"><ReactQuill placeholder={`Ажил гүйцэтгэсэн түвшин, чанар...`} theme="bubble" value={text} onChange={handleChange} /> </div></div> */}
                                    <div className="col-md-9 col-9"><div className="RightHead RightHeadA"><InputStyle className="themeStyle" ><textarea placeholder="Гүйцэтгэсэн ажлын чанарыг бичнэ үү..." /><div className="line" /></InputStyle></div></div>
                                </div>
                            )
                        })}
                        <div onClick={AddHandle2} className="addBtn"><MdAddCircle /></div>
                    </div>

                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Баталсан : </div> </div>
                            <div className="col-md-9 col-9"><div style={{backgroundColor:"white"}} className="RightHead RightHeadB">ТХН болон Түншлэлийн хөтөлбөр дээр дурдсан ажлуудыг хангалттай хэмжээнд гүйцэтгэсэн хэмээн зөвшөөрч байна.</div></div>
                        </div>
                    </div>

                    <OneModalOne />
                    <TwoModalTwo />
                    <ThreeModalThree />

                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-12 col-12">
                                <div className="LastPar">
                                    <div className="title">Үүрэг, хариуцлага болон батлуулах журам: </div>
                                    <ul>
                                        <li>Түншлэлийн дэмжлэг хүртэгч нь Ажлын гүйцэтгэл хүлээн авах маягт бөглөнө; </li>
                                        <li>БХШ баг нь гүйцэтгэх ажлын чанар, хэмжээг хянана;</li>
                                        <li>Төслийн зохицуулагч Түншлэлийн хөтөлбөрөөс баталсан Ажил гүйцэтгэл хүлээн авах маягтад гарыг үсэг зурж баталгаажуулж төлбөрийн үйл явц эхэлнэ.</li>
                                        <li>ТХН-н ХШҮМ-д Түншлэлийн хөтөлбөрийн хэрэгжилтийн тухай зөвхөн тайлагнах бөгөөд гүйцэтгэх ажлын чанар, хэмжээний тухайд аливаа хариуцлага хүлээхгүй. ХШҮМ-ний гарын үсэг төлбөрийн үйл явцын баталгаажуулалт болохгүй.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>


               <div className="buttonPar">
                    <div style={{opacity:`${opacity2}`}} className="errtext">Гүйцэд бөглөнө үү...</div>
                    <NextBtn onClick={clickHandle} style={spnBtn===false? { width:"40%" }:{ width:"10%" }} className="SubmitButton" type="button">{spnBtn===false?(<> Дараагийн хуудас <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></> ): <img src="/gif1.gif" alt="spin" />  }</NextBtn>
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
                position:relative;
                border-bottom:1px solid rgba(0,0,0,.2);
                .LastPar{
                    font-style: italic;
                    font-size:13px;
                    padding:15px;
                    .title{
                        margin-bottom:15px;
                    }
                    ul{
                        font-size:12.5px;
                        padding-left:30px;
                        list-style-type: disc;
                    }
                }
                .addBtn{
                    z-index:2;
                    cursor:pointer;
                    background-color:white;
                    border-radius:50%;
                    color:#228B22;
                    font-size:22px;
                    position:absolute;
                    left:-10px;
                    bottom:-10px;
                    transition:transform 0.3s ease;
                    &:hover{
                        transform:scale(1.15);
                    }
                }
               
                .LeftHead{
                    display:flex;
                    align-items:center;
                    height:100%;
                    background-color: rgba(63,81,181,0.1);
                    padding:8px 12px;
                    padding-right:0px;
                    border-right:1px solid rgba(0,0,0,.2);
                }
                .RightHead{
                    padding:8px 8px;
                    padding-left:0px;
                    .remark{
                        padding:15px 0px;
                        color: rgba(${textColor},0.9);
                        font-size:12.3px;
                        .title{
                            font-weight:500;
                            margin-right:10px;
                        }
                        font-style:italic;
                    }
                    
                    input{
                        width:100%;
                    }
                    .addInfoPar{
                        position:relative;
                        .addBtn{
                            width:22px;
                            height:22px;
                            cursor:pointer;
                            background-color:white;
                            border-radius:50%;
                            color:#228B22;
                            font-size:22px;
                            position:absolute;
                            left: 99.5%;
                            bottom:-8px;
                            transition:transform 0.3s ease;
                            &:hover{
                                transform:scale(1.15);
                            }
                        }
                        .userInfPar{
                            padding: 10px 0px;
                            margin-left:-30px;
                            padding-left:30px;
                            margin-right:-8px;
                            padding-right: 8px;
                            border-bottom:1px solid rgba(0,0,0,0.2);
                            .name{
                                margin-bottom:5px;
                            }
                            .infItemPar{
                                padding:10px 0px;
                                display:flex;
                                align-items:start;
                                flex-direction:column;
                                .drowPar{
                                    display:flex;
                                    align-items:start;
                                    margin-top:10px;
                                    .SignBtn{
                                        margin-left:30px;
                                        margin-right:30px;
                                        padding:3px 15px;
                                        cursor:pointer;
                                        display:flex;
                                        align-items:center;
                                        border:1px solid rgba(0,0,0,0.4);
                                        svg{
                                            margin-right:10px;
                                        }
                                        span{
                                           font-weight:500;
                                        }
                                        &:hover{
                                            background-color:rgba(0,0,0,.2);
                                        }
                                    }
                                    
                                    .SingatureImg{
                                        border:1px solid rgba(${ColorRgb},0.3);
                                        width:200px;
                                        // height:100px;
                                   }
    
                                .modalPar{
                                    text-align:center;
                                   .Canvass{
                                       border:1px solid rgba(${ColorRgb},0.5);
                                   }
                                    .BtnPar{
                                       padding:0px 10px;
                                       margin:20px 0px;
                                       display:flex;
                                       flex-direction:row;
                                       align-items:center;
                                       justify-content:space-between;
                                       button{
                                           font-weight:500;
                                           color:rgba(${textColor},0.9);
                                           cursor:pointer;
                                           border-style:none;
                                           border-radius:4px;
                                           padding:6px 14px;
                                           background-color:white;
                                           box-shadow:1px 1px 8px -2px;
                                       }
                                    }
                                }
                                }
                                
    
                                .DatePar{
                                    padding:5px 0px;
                                    display:flex;
                                    align-items:center;
                                    input{ margin-left:10px; }
                                    span{
                                        margin-right:10px;
                                    }
                                }
                            }
                        }
                    }
                    

                    .quill{
                        .ql-bubble{
                            border-bottom-left-radius: 0;
                            border-bottom-right-radius: 0;
                        }
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
                .betweenItems{
                    background-color: rgba(63,81,181,0.1);
                    padding:4px 15px;
                }

                .rowA{
                    // border-bottom:1px solid rgba(0,0,0,.2);
                    .LeftHead{border-bottom:1px solid rgba(0,0,0,.2);}
                    .RightHead{border-bottom:1px solid rgba(0,0,0,.2);}
                }
                .RightHeadA{
                    margin-left:-30px;
                    padding-left:30px;
                }
                .RightHeadB{
                    margin-left:-30px;
                    padding-left:30px;
                    background-color: rgba(63,81,181,0.1);
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

        .buttonPar{
            margin:10px 0px;
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:space-between;
              .errtext{
                transition:all 0.4s ease;
                text-align:center;
                background-color: #f6c343;
                border-radius:5px;
                font-size:14px !important;
                font-weight:400;
                color:black !important;
                line-height:34px;
                padding:0px 20px;
              }
          }
    }


    @media only screen and (max-width:786px){
        .contentPar{
            padding: 20px 10px
        }
    }
`


