import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { fontSize, textColor, InputStyle } from '../../theme';
import { animateScroll as scroll } from "react-scroll";
import Signature from './Signature';
import axios from '../../../axiosbase';
import Token from 'context/accessToken';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { AiOutlineAlert } from 'react-icons/ai';
import { CgDanger } from 'react-icons/cg';

// const today = new Date(); const month = (today.getMonth() + 1); const day = today.getDate();
// const Currentdate = today.getFullYear() + '-' + (month.toString().length === 1 ? '0' + month : month) + '-' + (day.toString().length === 1 ? '0' + day : day);

function Decision_main() {
    const { slug } = useParams();
    const history = useHistory();
    const [Data, setData] = useState(null);
    const [spin, setSpin] = useState(false);
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [ReasonData, setReasonData] = useState(infoWhere2);
    const [sanalData, setSanalData] = useState(false);
    const [type, setType] = useState(false);
    const [alert, setAlert] = useState({ color: 'yellow', text: 'null', cond: false });
    const [opacity2, setOpacity2] = useState("0");
    const [otherOne, setOtherOne] = useState({ Cname: "getInputt", checked: null, self: "" });
    const [imgData, setImgData] = useState(null);
    const [other, setOther] = useState(null);

    useEffect(() => {
        axios.get(`evaluation-meetings/scheduled-projects?parentId=${slug}`, { headers: { Authorization: Token() } }).then(res => {
            setData(res.data.data[0]);
            if (res.data.data[0].sanalinnHuudas.approve !== null) {
                setSanalData(true);
                if (res.data.data[0].sanalinnHuudas.reject_reason.code === "other") {
                    setOther(res.data.data[0].sanalinnHuudas.reject_reason.reason);
                } else {
                    setReasonData(infoWhere2.filter(el => el.code === res.data.data[0].sanalinnHuudas.reject_reason.code));
                }
            }
        }).catch((err) => console.log(err.response, "+++++++++"))
    }, []);

    const checkedHandle = () => {
        let arr = document.querySelectorAll('.checkCond'); let arr2 = Array.from(arr); let arr3 = [];
        arr2.forEach((el, i) => {
            if (el.checked == true) { if (el.value === "false") { arr3.push(el); } }
        });
        if (arr3.length > 0) { setType(true); } else { setType(false); }
    }

    const alertHandle = (color, text, cond) => { setAlert({ color: color, text: text, cond: cond }); setTimeout(() => { setAlert({ color: color, text: text, cond: false }); }, 3000); }

    const onChange1 = (e) => {
        if (e.target.value.length > 1) {
            setOtherOne({ Cname: "", checked: false, self: "getInputt" })
        } else { setOtherOne({ Cname: "getInputt", checked: null, self: "" }) }
    }

    const ClickHandle = () => {
        let inp = document.querySelectorAll(".getInputt"); let arr = Array.from(inp); let final = {}; let dd = {}; let cond = 0
        arr.forEach(el => {
            if (el.type === "radio") {
                if (el.checked === true) {
                    let obj = {};
                    if (el.name === "reject_reason") {
                        let ob = {}; ob["reason"] = el.value; ob["code"] = el.id; final[el.name] = ob;
                    } else {
                        if (el.value === "false") {
                            let next = document.querySelectorAll(`.${el.name}${el.id}_why`); let otherArr = Array.from(next);
                            otherArr.forEach(elem => { if (elem.value !== "") { if (elem.id) { obj[elem.name] = elem.value; } else { obj[elem.name] = elem.value; } } else { obj["reason"] = null; cond = 1; }; });
                        } else { obj["reason"] = null }
                        final[el.name] = obj;
                        obj["checked"] = el.value;
                    }
                }
            } else {
                if (el.name === "reject_reason") {
                    dd["code"] = el.id; dd["reason"] = el.value; final[el.name] = dd;
                } else {
                    if (!el.value) { el.classList += " RedPar"; } else { final[el.name] = el.value; el.classList = - " RedPar"; el.classList += " getInputt" }
                }
            }
        });
        
        final["projectId"] = Data.projectId;
        final["evaluationMeetingId"] = Data.evaluationMeetingId;
        if (imgData !== null) { final["signature"] = imgData; }; let keys = Object.keys(final);

        if (type ? keys.length < 6 : keys.length < 5) {
            setFinalErrorText("Та гүйцэд бөгөлнө үү..."); setOpacity2("1"); scroll.scrollTo(0);
        } else if (cond !== 0) {
            setFinalErrorText("Хэрэв татгалзсан бол шалтгааныг бичнэ үү..."); scroll.scrollTo(200); setOpacity2("1");
        } else {
            setSpin(true);
            setOpacity2("0");
            axios.post(`evaluation-results/member-vote`, final, { headers: { Authorization: Token() } }).then((res) => { alertHandle("green", "Амжилттай илгээлээ", true); setTimeout(() => { history.push("/"); setSpin(false); }, 2000); })
                .catch((err) => { setSpin(false);
                    alertHandle("orange", "Алдаа гарлааа", true);
                    console.log(`err`, err)
                });
        }
    }

    return (
        <>
            <FeedBackCont className="container">
                <div className="contentPar">
                    <div className="TitlePar">
                        <div className="title">Үнэлгээний хорооны гишүүдийн саналын хуудас</div>
                    </div>
                    <div className="compName">
                        <div className="title">Байгууллагын нэр:</div>
                        {Data ? <span className="val">{Data.company_name}</span> : <span className="val"></span>}
                        {/* <InputStyle  className="nameText"><input className="getInputt" name="compname" placeholder="Байгууллагын нэр..."  type="text" />  <div className="line"></div></InputStyle> */}
                    </div>
                    <div className="compName">
                        <div className="title">Төслийн нэр:</div>
                        {Data ? <span className="val">{Data.project_name}</span> : <span className="val"></span>}
                    </div>
                    <div className="compName">
                        <div className="title">Өргөдлийн дугаар:</div>
                        {Data ? <span className="val">{Data.project_number}</span> : <span className="val"></span>}
                    </div>
                    <div className="compName">
                        <div className="title">Хурлын огноо:</div>
                        {Data ? <span className="val">{Data.meetingDate}</span> : <span className="val"></span>}
                    </div>
                    <div style={{ marginBottom: 35 }} className="compName">
                        <div className="title">Үнэлгээний хорооны гишүүний овог, нэр:</div>
                        {Data ? <span className="val">{Data.memberInfo.fullName}</span> : <span className="val"></span>}
                    </div>

                    <div className="infoWhere">
                        <div className="Title Title4 TitleBig"><span className="circle"><AiOutlineAlert /></span>Доорх хүснэгтэд заасан 2 шалгуурт үнэлгээ өгөх бөгөөд хэрэв аль нэг нь “Үгүй” гэсэн санал авсан бол эцсийн шийдвэр нь санхүүгийн дэмжлэг үзүүлэхгүй гэж гарна. </div>
                    </div>

                    <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгч төсөл хэрэгжүүлэх чадавхтай эсэх </div>
                        <div className="chekcPar">
                            <span className="title">Аль нэгийг тэмдэглэнэ үү. [√] : </span>
                            {sanalData && Data.sanalinnHuudas.assess_one.checked !== null ?
                                <div className="checkItem">
                                    <div className="item"><input className="radio getInputt" type="radio" name="assess_one" checked={Data.sanalinnHuudas.assess_one.checked ? true : false} value="true" /> <span>Зөвшөөрсөн</span></div>
                                    <div className="item"><input className="radio getInputt" type="radio" name="assess_one" checked={Data.sanalinnHuudas.assess_one.checked ? false : true} value="false" /> <span>Татгалзсан</span></div>
                                </div>
                                :
                                <div className="checkItem">
                                    <div className="item"><input className="radio getInputt checkCond" type="radio" onChange={checkedHandle} name="assess_one" value="true" /> <span>Зөвшөөрсөн</span></div>
                                    <div className="item"><input className="radio getInputt checkCond" type="radio" onChange={checkedHandle} name="assess_one" value="false" /> <span>Татгалзсан</span></div>
                                </div>}
                        </div>
                        {sanalData && Data.sanalinnHuudas.assess_one.checked !== null ?
                            Data.sanalinnHuudas.assess_one.checked === false ?
                                <div className="Title3">
                                    <div className="text">Хэрэв татгалзсан бол шалтгааныг бичнэ үү:</div>
                                    <InputStyle className="nameText"><textarea className="assess_one_why" name="reason" value={Data.sanalinnHuudas.assess_one.reason} placeholder="шалтгаанаа бичнэ үү..." type="text" />  <div className="line"></div></InputStyle>
                                </div> : null
                            :
                            <div className="Title3">
                                <div className="text">Хэрэв татгалзсан бол шалтгааныг бичнэ үү:</div>
                                <InputStyle className="nameText"><textarea className="assess_one_why" name="reason" placeholder="шалтгаанаа бичнэ үү..." type="text" />  <div className="line"></div></InputStyle>
                            </div>}

                    </div>

                    <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгчийн төсөл экспортыг нэмэгдүүлэх боломжтой эсэх </div>
                        <div className="chekcPar">
                            <span className="title">Аль нэгийг тэмдэглэнэ үү. [√] : </span>

                            {sanalData && Data.sanalinnHuudas.assess_two.checked !== null ?
                                <div className="checkItem">
                                    <div className="item"><input className="radio getInputt" type="radio" name="assess_two" checked={Data.sanalinnHuudas.assess_two.checked ? true : false} value="true" /> <span>Зөвшөөрсөн</span></div>
                                    <div className="item"><input className="radio getInputt" type="radio" name="assess_two" checked={Data.sanalinnHuudas.assess_two.checked ? false : true} value="false" /> <span>Татгалзсан</span></div>
                                </div>
                                :
                                <div className="checkItem">
                                    <div className="item"><input className="radio getInputt checkCond" type="radio" onChange={checkedHandle} name="assess_two" value="true" /> <span>Зөвшөөрсөн</span></div>
                                    <div className="item"><input className="radio getInputt checkCond" type="radio" onChange={checkedHandle} name="assess_two" value="false" /> <span>Татгалзсан</span></div>
                                </div>
                            }


                        </div>

                        {sanalData && Data.sanalinnHuudas.assess_two.checked !== null ?
                            Data.sanalinnHuudas.assess_two.checked === false ?
                                <div className="Title3">
                                    <div className="text">Хэрэв татгалзсан бол шалтгааныг бичнэ үү:</div>
                                    <InputStyle className="nameText"><textarea className="assess_two_why" name="reason" value={Data.sanalinnHuudas.assess_two.reason} placeholder="шалтгаанаа бичнэ үү..." type="text" />  <div className="line"></div></InputStyle>
                                </div> : null
                            :
                            <div className="Title3">
                                <div className="text">Хэрэв татгалзсан бол шалтгааныг бичнэ үү:</div>
                                <InputStyle className="nameText"><textarea className="assess_two_why" name="reason" placeholder="шалтгаанаа бичнэ үү..." type="text" />  <div className="line"></div></InputStyle>
                            </div>}
                    </div>

                    <Signature url={sanalData ? Data.sanalinnHuudas.signature : null} setImgData={setImgData} />

                    {sanalData ? Data.sanalinnHuudas.approve === false ?
                        <div className="infoWhere">
                            <div className="Title"><span className="circle">⬤</span>Татгалзсан шийдвэрийн хариу :</div>
                            <div className="inpPar">
                                <div className="items">
                                    <div className="title">Шалтгаан :</div><span>{other ? other : Data.sanalinnHuudas.reject_reason.reason}</span>
                                </div>
                            </div>
                        </div>
                        : null : !type ? null :
                        <div className="infoWhere Anime">
                            <div className="Title"><span className="circle">⬤</span>Өргөдөл гаргагч нь Экспортыг дэмжих төслөөс цахим хаягаар бичгээр хариуг авах бөгөөд хэрэв татгалзсан шийдвэрийн хариуг өгч буй бол шалтгааныг заавал бичнэ. Жишээ шалтгаанууд: :</div>
                            <div className="inpPar">
                                {ReasonData.map((el, i) => {
                                    return (
                                        <div className="items">
                                            <input className={`radio ${otherOne.Cname}`} value={el.title} checked={otherOne.checked} id={el.code} name="reject_reason" type="radio" /><div className="title">{el.title}</div>
                                        </div>
                                    )
                                })}
                                <div className="items">
                                    <div className="title">Бусад :</div><InputStyle className="nameText"><input className={otherOne.self} id="other" onChange={onChange1} name="reject_reason" placeholder="..." type="text" /> <div className="line"></div></InputStyle>
                                </div>
                            </div>
                        </div>}

                    {sanalData ? null :
                        <div className="buttonPar">
                            <div style={{ opacity: opacity2 }} className="errtext">{FinalErrorText}</div>
                            <div onClick={ClickHandle} style={!spin ? { width: `40%`, opacity: 1 } : { width: `10%`, opacity: 0.6 }} className="btn btn-primary">{!spin ? `Илгээх` : <img src="/gif1.gif" alt-="edp-img" alt="" />} </div>
                        </div>
                    }

                </div>


            </FeedBackCont>
            <AlertStyle style={alert.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${alert.color}` } : { bottom: `50px`, opacity: `0` }} >
                {alert.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${alert.color}` }} className="true" /> : <CgDanger style={{ color: `${alert.color}` }} className="true" />}
                <span>{alert.text}</span>
            </AlertStyle>
        </>
    )
}

export default Decision_main

const animate = keyframes`
    0% { transform:scale(0.8); opacity:0;}
    50% { transform:scale(1.1); opacity:0.5;}
    100% { transform:scale(1); opacity:1;}
`

const AlertStyle = styled.div`
    z-index:1010;  
    transition:all 0.5s ease;
    position:fixed;
    // height:80px;
    bottom:100px;
    left:5%;
    display:flex;
    align-items:center;
    border:1px solid rgba(0,255,0,0.8);
    // border-left:4px solid green;
    background-color:white;
    padding:10px 40px; 
    font-weight:400;
    color:black;
    border-radius:6px;
    font-size:17px;
    opacity:1;
    font-weight:600;
    .true{
        margin-right:14px;
        font-size:24px;
    }
`

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
                margin-right:15px;
            }
            .val{
                font-size:14px;
            }
            .nameText{
                // margin-left:15px;
                width:50%;
            }
        }
        
        .infoWhere{
            animation-name: ${animate};
            animation-duration:0.5s;
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
                margin-bottom:15px;
            }
            .TitleBig{
                font-weight:400;
                font-size:14px;
                svg{
                    color:#b37b15;
                    font-size:20px;
                }
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
          .btn{
            display:flex;
            justify-content:center;
            transition:all 0.3s ease;
            margin:10px 0px;
            max-width:700px;
            width:40%;
            img{
              width:26px;
            }
        }
      }

    @media only screen and (max-width:786px){
        .buttonPar{
            flex-direction:column;
            .errtext{
              width:100%;
            }
            .btn{
              width:100% !important;
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
    { title: "Өргөдөл гаргагч нь шалгуур хангалтыг хангаагүй", code: "shalguur_hangaagui" },
    { title: "Өргөдөл нь дутуу материалтай", code: "orgodol_dutuu" },
    { title: "Үндсэн мэдүүлэг нь урьдчилсан мэдүүлэгтэй зөрүүтэй", code: "meduuleg_zorvvtei" },
    { title: "Төсөл нь экспортын чиглэлд хамааралгүй", code: "hamaaralgui_tosol" },
    { title: "Экспортын төлөвлөгөө нь чанарын шаардлага хангахуйц тодорхой бус", code: "todorhoi_bus" },
    { title: "Өргөдөл гаргагч нь төслийг санхүүжүүлэх чадвартайг нотлоогүй эсвэл чадваргүй", code: "chadvargui" },
    { title: "Өгөгдсөн хугацаанаас өмнө шаардлагатай материал илгээгээгүй", code: "hugatsaanda_amjaagui" },
]


