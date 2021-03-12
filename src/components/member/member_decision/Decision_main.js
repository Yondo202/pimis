import React,{ useState } from 'react'
import styled from 'styled-components'
import {fontSize, textColor,InputStyle,NextBtn,ColorRgb } from '../../theme'
import {AiOutlineSend} from 'react-icons/ai'
import { animateScroll as scroll } from "react-scroll";
import Signature from './Signature'

const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

function Decision_main({NotifyData}) {
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [opacity2, setOpacity2] = useState("0");
    const [otherOne, setOtherOne] = useState({Cname: "getInputt", checked:null, self:""  });
    const [ imgData, setImgData ] = useState(null);

    const onChange1 = (e) =>{
        if(e.target.value.length > 1){ setOtherOne({ Cname:"", checked:false, self:"getInputt" })
        }else{setOtherOne({ Cname:"getInputt", checked:null, self:"" })}
    }

    const ClickHandle = () =>{
        let inp = document.querySelectorAll(".getInputt"); let arr = Array.from(inp); let final = {}; let dd = {}; let cond = 0
        arr.map(el=>{
            if(el.type === "radio"){
                if(el.checked === true){
                    let obj = {};
                    if(el.value ==="false"){
                        let next = document.querySelectorAll(`.${el.name}${el.id}_why`); let otherArr = Array.from(next);
                        otherArr.map(elem=>{ if(elem.value!==""){ if(elem.id){ obj[elem.name] = elem.value; }else{ obj[elem.name] = elem.value; } }else{ obj["reason"] = null; cond = 1; };});
                    }else{ obj["reason"] = null }
                    final[el.name] = obj;
                    obj["checked"] = el.value;
                }
            }else{
                if(el.name === "reject_reason"){ dd["checked"] = el.value; final[el.name] = dd;
                }else{ if(!el.value){  el.classList += " RedPar"; }else{ final[el.name] = el.value; el.classList =- " RedPar"; el.classList += " getInputt" }
                }
            }
        });
        if(imgData!==null){final["signature"] = imgData;}; let keys = Object.keys(final); 

        final["projectId"] = NotifyData.projectId; final["evaluationMeetingId"] = NotifyData.evaluationMeetingId;

        if(keys.length < 9){
            setFinalErrorText("Та гүйцэд бөгөлнө үү...");
            setOpacity2("1");
            scroll.scrollTo(0);
        }else if(cond !== 0){
            setFinalErrorText("Хэрэв татгалзсан бол шалтгааныг бичнэ үү...");
            scroll.scrollTo(200);
            setOpacity2("1");
        }else{
            setOpacity2("0");
            console.log("done");
        }
        console.log(final, "^final");
    }

    

    return (
        <FeedBackCont className="container">
            <div className="contentPar">
                <div className="TitlePar">
                    <div className="title">Үнэлгээний хорооны гишүүдийн саналын хуудас</div>
                </div>
                <div className="compName">
                    <div className="title">Байгууллагын нэр:</div>
                    <InputStyle  className="nameText"><input className="getInputt" name="compname" placeholder="Байгууллагын нэр..."  type="text" />  <div className="line"></div></InputStyle>
                </div>
                <div className="compName">
                    <div className="title">Төслийн нэр:</div>
                    <InputStyle  className="nameText"><input className="getInputt" name="project_name" placeholder="Төслийн нэр..."  type="text" />  <div className="line"></div></InputStyle>
                </div>
                <div className="compName">
                    <div className="title">Өргөдлийн дугаар:</div>
                    <InputStyle  className="nameText"><input className="getInputt" name="statement_num" placeholder="Өргөдлийн дугаар..."  type="number" />  <div className="line"></div></InputStyle>
                </div>
                <div className="compName">
                    <div className="title">Хурлын огноо:</div>
                    <InputStyle  className="nameText"><input className="getInputt" name="date" placeholder="Хурлын огноо..." max={Currentdate} type="date" />  <div className="line"></div></InputStyle>
                </div>
                <div style={{marginBottom:35}} className="compName">
                    <div className="title">Үнэлгээний хорооны гишүүний овог, нэр:</div>
                    <InputStyle  className="nameText"><input className="getInputt" name="member_name" placeholder="овог, нэр..."  type="text" />  <div className="line"></div></InputStyle>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Төсөл хэрэгжүүлэгчийн чадавхийг үнэлсэн үнэлгээ </div>
                        <div className="chekcPar">
                            <span className="title">Аль нэгийг тэмдэглэнэ үү. [√] : </span>
                            <div className="checkItem">
                                <div className="item"><input className="radio getInputt" type="radio" name="assess_one" value="true" /> <span>Зөвшөөрсөн</span></div>  
                                <div className="item"><input className="radio getInputt" type="radio" name="assess_one" value="false" /> <span>Татгалзсан</span></div>
                            </div>
                        </div>
                        <div className="Title3">
                            <div className="text">Хэрэв татгалзсан бол шалтгааныг бичнэ үү:</div> 
                            <InputStyle className="nameText"><textarea className="assess_one_why" name="reason" placeholder="шалтгаанаа бичнэ үү..."  type="text" />  <div className="line"></div></InputStyle>
                        </div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Экспортын төсөлд өгсөн үнэлгээ</div>
                        <div className="chekcPar">
                            <span className="title">Аль нэгийг тэмдэглэнэ үү. [√] : </span>
                            <div className="checkItem">
                                <div className="item"><input className="radio getInputt" type="radio" name="assess_two" value="true" /> <span>Зөвшөөрсөн</span></div>  
                                <div className="item"><input className="radio getInputt" type="radio" name="assess_two" value="false" /> <span>Татгалзсан</span></div>
                            </div>
                        </div>
                        <div className="Title3">
                            <div className="text">Хэрэв татгалзсан бол шалтгааныг бичнэ үү:</div> 
                            <InputStyle className="nameText"><textarea className="assess_two_why" name="reason" placeholder="шалтгаанаа бичнэ үү..."  type="text" />  <div className="line"></div></InputStyle>
                        </div>
                </div>
                <Signature setImgData={setImgData} />

                <div className="infoWhere">
                        <div className="Title"><span className="circle">⬤</span>Өргөдөл гаргагч нь Экспортыг дэмжих төслөөс цахим хаягаар бичгээр хариуг авах бөгөөд хэрэв татгалзсан шийдвэрийн хариуг өгч буй бол шалтгааныг заавал бичнэ. Жишээ шалтгаанууд: :</div>
                        <div className="inpPar">
                            {infoWhere2.map((el,i)=>{
                                    return(
                                        <div className="items">
                                            <input className={`radio ${otherOne.Cname}`} value={el.title} checked={otherOne.checked} name="reject_reason" type="radio" /><div className="title">{el.title}</div>
                                        </div>
                                    )
                            })}
                             <div className="items">
                                <div className="title">Бусад :</div><InputStyle className="nameText"><input className={otherOne.self} onChange={onChange1} name="reject_reason" placeholder="..." type="text" /> <div className="line"></div></InputStyle>
                            </div>
                        </div>
                </div>
                <div className="buttonPar">
                    <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                    <NextBtn onClick={ClickHandle} className="SubmitButton" type="button">Илгээх <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>
                </div>
            </div>
        </FeedBackCont>
    )
}

export default Decision_main

// #1890ff;
const FeedBackCont = styled.div`
    color: rgba(${textColor});
    padding-bottom:80px;
    margin-top:25px;
    .form-control{
       &:hover{
           border:1px solid #1890ff;
       }
    }
    .contentPar{
        background-color:white;
        padding:20px 100px;
        font-size:${fontSize};
        margin-top:0px;
        border:1px solid rgba(0,0,0,.2);
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
                margin-bottom:35px;
                .infItemPar{
                    display:flex;
                    align-items:start;
                    flex-direction:column;
                    .drowPar{
                        display:flex;
                        align-items:start;
                        // margin-top:10px;
                        .SignBtn{
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
        .TitlePar{
            padding:10px 0px;
            .title{
                color:${textColor};
                padding-bottom:10px;
                font-size:16px;
                text-align:center;
                font-weight:500;
            }
            .desc{
                font-style: italic;
            }
        }
        .compName{
            width:100%;
            padding:3px 0px;
            display:flex;
            margin-bottom:5px;
            align-items:center;
            justify-content:start;
            .title{
                // width:60%;
                font-weight:500;
            }
            .nameText{
                margin-left:15px;
                width:50%;
            }
        }
        
        .infoWhere{
            width:100%;
            margin-bottom:40px;
            
            .Title{
                font-weight:500;
                display:flex;
                align-items:center;
                .circle{
                    margin-right:10px;
                    font-size:7px;
                }
            }
            .Title2{
               display:flex;
               align-items:center;
               .nameText{
                   width:35%;
                   font-size:13px;
                    margin-left:15px;
               }
            }
            .Title3{
                padding-top:10px;
                padding-left:40px;
                display:flex;
                .text{
                    width:40%;
                }
                .nameText{
                    width:60%;
                }
            }
            .Title4{
                margin-bottom:8px;
            }
            .helperTitle{
                color: rgba(${textColor},0.8);
                margin-bottom:6px;
            }
            .chekcPar{
                padding-left:40px;
                display:flex;
                flex-direction:row;
                .title{

                }
                .checkItem{
                    display:flex;
                    .item{
                        display:flex;
                        align-items:center;
                        margin-left:25px;
                        .radio{
                            cursor:pointer;
                            width:15px;
                            height:15px;
                            transition:all 0.3s ease;
                            margin-right:5px;
                            &:checked{
                                -webkit-transform: scale(1.2);
                                transform: scale(1.2);
                                border-radius:50% !important;
                            }
                        }
                    }
                }
            }
            .inpPar{
                padding-left:40px;
                color: rgba(${textColor},0.95);
                .items{
                    padding:7px 0px;
                    width:100%;
                    display:flex;
                    justify-content:start;
                    align-items:center;
                    .radio{
                        cursor:pointer;
                        width:15px;
                        height:15px;
                        transition:all 0.3s ease;
                        margin-right:15px;
                        &:checked{
                            -webkit-transform: scale(1.2);
                            transform: scale(1.2);
                            border-radius:50% !important;
                        }
                    }
                    .title{
                        margin-right:8px;
                        // width:60%;
                    }
                    .nameText{
                        font-size:13px;
                        width:40%;
                    }
                }
            }
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
            font-size:15px !important;
            font-weight:400;
            color:black !important;
            line-height:34px;
            padding:0px 20px;
          }
      }

    @media only screen and (max-width:786px){
        .buttonPar{
            flex-direction: column;
            .SubmitButton{
                width:100%;
            }
        }
        .contentPar{
            padding: 20px 10px;
            .addInfoPar{
                .userInfPar{
                    .infItemPar{
                        .drowPar{
                            flex-direction: column;
                        }
                    }
                }
            }
            .infoWhere{
                // padding-left:20px;
                .chekcPar{
                    flex-direction: column;
                    .checkItem{
                        margin-top:5px;
                    }
                }
            }

            // .chekcPar{
            //         flex-direction: column;
            // }
        }
    }
`


const infoWhere2 = [
    {  title: "Өргөдөл гаргагч нь шалгуур хангалтыг хангаагүй", place: null },
    {  title: "Өргөдөл нь дутуу материалтай", place: null},
    {  title: "Үндсэн мэдүүлэг нь урьдчилсан мэдүүлэгтэй зөрүүтэй", place: null },
    {  title: "Төсөл нь экспортын чиглэлд хамааралгүй", place: null },
    {  title: "Экспортын төлөвлөгөө нь чанарын шаардлага хангахуйц тодорхой бус", place: null},
    {  title: "Өргөдөл гаргагч нь төслийг санхүүжүүлэх чадвартайг нотлоогүй эсвэл чадваргүй", place: null },
    {  title: "Өгөгдсөн хугацаанаас өмнө шаардлагатай материал илгээгээгүй", place: null},
    // {  title: "Бусад:", place: "..." },
]


