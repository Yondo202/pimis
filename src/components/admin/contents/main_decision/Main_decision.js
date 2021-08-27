import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import { fontSize, textColor, InputStyle, ColorRgb, NextBtn, AlertStyle } from '../../../theme'
import { AiOutlineSend } from 'react-icons/ai';
import { IoIosShareAlt } from 'react-icons/io';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import axios from 'axiosbase';
import Token from 'context/accessToken';
import UserContext from 'context/UserContext';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import AssistApprove from '../notifyPage/assistApprove/AssistApprove'
import NotAssist from '../notifyPage/notAssist/NotAssist';

function Main_decision() {
    const ctx = useContext(UserContext);
    const history = useHistory();
    const param = useParams().id;
    const [cond, setCond] = useState(false);
    const [notifyShow, setNotifyShow] = useState(0);
    const [notifyShow2, setNotifyShow2] = useState(0);
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [opacity2, setOpacity2] = useState("0");
    const [mainData, setMainData] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        axios.get(`evaluation-results/hurliin-negtgel?projectId=${param}`, { headers: { Authorization: Token() } }).then((res) => {
            console.log(`res`, res);
            if (res.data.data) {
                setMainData(res.data.data); setMembers(res.data.data.memberEvaluations);
                if (res.data.data.approved === true) { setNotifyShow2(1); } else if (res.data.data.approved === false) { setNotifyShow2(2); } else { setNotifyShow2(0); }
            }
        }).catch((err) => console.log(err.response.data.error, "aldaa garsaaaa"));
    }, []);

    const backHandle = (el) => { if (el === "projects") { history.push(`/${el}`); } else { history.goBack(); } }

    const clickHandle = () => {
        let inp = document.querySelector(".getInpp");
        if (notifyShow2 !== 1) {
            if (inp.value === "") {
                setOpacity2('1');
                setFinalErrorText('Та шалтгааныг оруулна уу?')
                inp.classList += " red";
            } else {
                setOpacity2('0');
                inp.classList = - " red";
                inp.classList += " getInpp";
                mainData[inp.name] = inp.value;
                axios.post(`evaluation-results/hurliin-negtgel`, mainData, { headers: { Authorization: Token() } }).then((res) => {
                    ctx.alertText('green', "Амжилттай хадаглалаа", true); setCond(true); setOpacity2('0');
                }).catch((err) => { console.log(err.response.data.error, "aldaa garsaaaa"); ctx.alertText('orange', "Алдаа гарлаа", true); });
            }
        } else {
            mainData[inp.name] = inp.value;
            axios.post(`evaluation-results/hurliin-negtgel`, mainData, { headers: { Authorization: Token() } }).then((res) => {
                ctx.alertText('green', "Амжилттай хадаглалаа", true); setCond(true); setOpacity2('0');
            }).catch((err) => { console.log(err.response.data.error, "aldaa garsaaaa"); ctx.alertText('orange', "Алдаа гарлаа", true); });
        }
    }

    const clickHandle2 = () => {
        if (cond) {
            if (notifyShow2 === 1) {
                setNotifyShow(1);
            } else if (notifyShow2 === 2) {
                let inp = document.querySelector(".getInpp");
                if (inp.value === "") {
                    setOpacity2('1');
                    setFinalErrorText('Та шалтгааныг оруулна уу?')
                    inp.classList += " red";
                } else {
                    setOpacity2('0');
                    inp.classList = - " red";
                    inp.classList += " getInpp";
                    setNotifyShow(2);
                }
            } else {
                setNotifyShow(0);
            }
        } else {
            setOpacity2('1');
            setFinalErrorText('Та шийдвэрийн хуудсыг хадаглана уу?')
        }
    }

    const changeHandleReason = (el) => {
        mainData["reason"] = el.target.value;
        setMainData({ ...mainData });
    }

    return (
        <>
            {notifyShow === 0 ? <FeedBackCont className="container">
                {mainData ? mainData.rejectedCount === 0 && mainData.approvedCount === 0 ?
                    <div className="NullPar">
                        <div className="nullTitle">
                            <div onClick={() => backHandle(mainData.userId)} className="BackPar"><div className="SvgPar"><MdKeyboardArrowLeft /></div>  <span>Буцах</span> </div>
                            <h2 className="title">Санал хураалт хийгдээгүй байна</h2>
                            <div className="desc"></div>
                        </div>
                    </div>
                    : <div className="contentPar">
                        <div className="TitlePar">
                            <div className="title">
                                {/* ҮНЭЛГЭЭНИЙ ХОРООНЫ ШИЙДВЭРИЙН ХУУДАС */}
                                ЭКСПОРТЫГ ДЭМЖИХ ТӨСЛИЙН .... ОНЫ .... ДУГААР ЦОНХНЫ
                                СОНГОН ШАЛГАРУУЛАЛТЫН БАГИЙН ХУРЛЫН ШИЙДВЭР
                            </div>
                            <div className="desc">
                                {/* Төсөл бүрт өгсөн нэгтгэсэн санал */}
                               Дугаар: {mainData?.project_number}
                            </div>
                        </div>
                        <div className="infoWhere">
                            <table id="customers">
                                <tr>
                                    <th style={{ borderRight: `1px solid rgba(255,255,255,0.5)` }}>Талбар</th>
                                    <th>Утга</th>
                                </tr>

                                <tr className="getTable1">
                                    <td>Хурлын огноо:</td>
                                    <td><div className="input">{mainData?.meetingDate}</div></td>
                                </tr>
                                <tr className="getTable1">
                                    <td>Аж ахуйн нэгж эсхүл кластерын нэр:</td>
                                    <td> <div className="input">{mainData?.company?.company_name}</div></td>
                                </tr>

                                <tr className="getTable1">
                                    <td>Төслийн нэр:</td>
                                    <td><div className="input">{mainData?.project_name}</div> </td>
                                </tr>

                                {/* <tr className="getTable1">
                                    <td>Өргөдлийн дугаар:</td>
                                    <td><div className="input">{mainData?.project_number}</div></td>
                                </tr> */}

                                {/* <tr className="getTable1">
                                    <td>Дэмжих санхүүжилтийн дүн:</td>
                                    <td><div className="input">{mainData?.project_number}</div></td>
                                </tr> */}
                               
                            </table>
                        </div>

                        <div className="infoWhere">
                            <table id="customers">
                                <tr><th style={{ borderRight: `1px solid rgba(255,255,255,0.5)` }}>Үнэлгээний хорооны гишүүдийн овог нэр</th><th>Санал</th></tr>
                                {members.map((el, i) => {
                                    return (
                                        <tr className="getTable1">
                                            <td>{el.user.firstname} {el.user.lastname}</td>
                                            {/* <td><InputStyle><input className={`input tableItem${i+1}`} placeholder="..." type="input" /> <div className="line" /></InputStyle></td> */}
                                            <td><div className="input">{el.approve === true ? `Зөвшөөрсөн` : `Татгалзсан`}</div></td>
                                        </tr>
                                    )
                                })}
                                <tr className="getTable1 B2">
                                    <td>Дэмжсэн саналын тоо</td>
                                    <td><div className="input">{mainData?.approvedCount}</div></td>
                                </tr>
                                <tr className="getTable1 B2">
                                    <td>Татгалзсан саналын тоо</td>
                                    <td><div className="input">{mainData?.rejectedCount}</div></td>
                                </tr>
                                <tr className="getTable1 B2">
                                    <td>ЭЦСИЙН ДҮН</td>
                                    <td><div className="input">{mainData ? mainData.approved === true ? `Зөвшөөрсөн` : mainData.approved === false ? `Татгалзсан` : null : null}</div></td>
                                </tr>
                            </table>
                        </div>
                        {notifyShow2 !== 1 ? <div className="reasonPar">
                            <div className="title">Хэрэв төслийг дэмжихээс татгалзсан бол татгалзсан шалтгаан:</div>
                            <div className="inpPar">
                                <div className="svg"><IoIosShareAlt /></div>
                                <InputStyle className="inpp"><textarea name="reason" value={mainData?.reason} onChange={changeHandleReason} className={`getInpp`} placeholder="Шалтгааныг энд бичнэ үү..." /> <div className="line" /></InputStyle>
                            </div>
                        </div> : <div className="reasonPar">
                            <div className="title">Нэмэлт тайлбар бичих :</div>
                            <div className="inpPar">
                                <div className="svg"><IoIosShareAlt /></div>
                                <InputStyle className="inpp"><textarea name="reason" value={mainData?.reason} onChange={changeHandleReason} className={`getInpp`} placeholder="Нэмэлт тайлбарыг энд бичнэ үү..." /> <div className="line" /></InputStyle>
                            </div>
                        </div>}
                        <div className="buttonPar">
                            <div style={{ opacity: `${opacity2}` }} className="errtext">{FinalErrorText}</div>
                        </div>
                        <div className="buttonPar">
                            {/* <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div> */}
                            <NextBtn className="SubmitButton" onClick={clickHandle2} type="button">Мэдэгдэл илгээх<div className="flexchild"><AiOutlineSend /><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>
                            {!cond && <NextBtn className="SubmitButton" onClick={clickHandle} type="button">Хадгалах<div className="flexchild"><AiOutlineSend /><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>}
                        </div>
                    </div>
                    : <div className="NullPar">
                        <div className="nullTitle">
                            <div onClick={() => backHandle('projects')} className="BackPar"><div className="SvgPar"><MdKeyboardArrowLeft /></div>  <span>Буцах</span> </div>
                            <h2 className="title">Мэдээлэл ороогүй байна</h2>
                            <div className="desc"></div>
                        </div>
                    </div>}
            </FeedBackCont> : notifyShow === 1
                ? <NotifyComp className="container"> <AssistApprove setNotifyShow={setNotifyShow} projectId={param} approve={mainData} /> </NotifyComp>
                : <NotifyComp className="container"> <NotAssist setNotifyShow={setNotifyShow} projectId={param} approve={mainData} /></NotifyComp>}

            <AlertStyle style={ctx.alert.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${ctx.alert.color}` } : { bottom: `50px`, opacity: `0` }} >
                {ctx.alert.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${ctx.alert.color}` }} className="true" /> : <CgDanger style={{ color: `${ctx.alert.color}` }} className="true" />}
                <span>{ctx.alert.text}</span>
            </AlertStyle>
        </>
    )
}

export default Main_decision

const NotifyAnime = keyframes`
    0% { margin-bottom:-30px; opacity: 0.4 }
    100% { margin-bottom:0px; opacity: 1 }
`

const NotifyComp = styled.div`
    animation: ${NotifyAnime} ease 0.5s;
    display:flex;
    align-items:center;
    justify-content:center;
`

const homeAnime = keyframes`
    0% { margin-top:-20px; opacity: 0.4 }
    100% { margin-top:0px; opacity: 1 }
`
const homeAnimeSvg = keyframes`
    0% { left:20px; opacity: 0.4; transform:scale(1) }
    100% { left:0px; opacity: 1; transform:scale(1.2) }
`

const FeedBackCont = styled.div`
        color: rgba(${textColor});
        padding-bottom:50px;
        .NullPar{
            .nullTitle{
                background-color:white;
                padding:30px 100px;
                font-size:${fontSize};
                margin-top:30px;
                border:1px solid rgba(0,0,0,.2);
                display:flex;
                justify-content:space-between;
                align-items:center;
                .BackPar{
                    padding:5px 15px; 
                    cursor:pointer;
                    display:flex;
                    align-items:center;
                    .SvgPar{
                        height:30px;
                        width:30px;
                        position:relative;
                        overflow:hidden;
                        margin-right:5px;
                        svg{
                            position:absolute;
                            top:10%;
                            font-size:30px;
                            animation: ${homeAnimeSvg} ease 1s infinite;
                        }
                    }
                    span{
                        font-size:16px;
                    }
                    &:hover{
                        background-color:rgba(0,0,0,0.2);
                    }
                }
                .title{
                    font-size:24px;
                    font-weight:500;
                }
            }
        }
        .contentPar{
            .reasonPar{
                .title{
                    font-size:14px;
                    font-weight:500;
                    margin-bottom:18px;
                }
                .inpPar{
                    display:flex;
                    align-items:center;
                    .svg{
                        margin-right:15px;
                        border-radius:50%;
                        padding:4px 4px;
                        color:rgba(${textColor},0.7);
                        background-color:rgba(0,0,0,0.1);
                        svg{
                            font-size:20px;
                        }
                    }
                    .inpp{
                        width:100%;
                        flex-grow:10px;
                        textarea{
                            height:60px;
                        }
                    }
                }
            }

            background-color:white;
            padding:30px 100px;
            font-size:${fontSize};
            margin-top:30px;
            border:1px solid rgba(0,0,0,.2);
            .TitlePar{
                padding:10px 0px;
                margin-bottom:15px;
                .title{
                    color:${textColor};
                    padding-bottom:10px;
                    font-size:16px;
                    text-align:center;
                    font-weight:500;
                }
                .desc{
                    font-size:14px;
                    text-align:center;
                    font-style: italic;
                }
            }
            .infoWhere{
                margin-bottom:40px;
                animation: ${homeAnime} ease 0.5s ; 
                #customers {
                    border-collapse: collapse;
                    width: 100%;
                    td, th{
                        border: 1px solid rgba(0,0,0,0.2);
                        padding: 10px;
                    }
                    .B2{
                        td{
                            font-weight:500;
                        }
                    }
                    th{
                        color:white;
                        background-color:rgba(${ColorRgb},.9);
                        .question{
                            opacity:0;
                            transform:scale(0);
                        }
                    }
                    td{
                        .input{
                            font-weight:500;
                            width:100%;
                        }
                        .nameText{
                            width:100%;
                            .line{
                                height:2px;
                                background-color:#1890ff;
                            }
                        }
                    }
                
                }
                .Title{
                    font-weight:500;
                    display:flex;
                    align-items:center;
                    .circle{
                        margin-right:10px;
                        font-size:7px;
                    }
                }
                .Title4{
                    margin-bottom:15px;
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
            .SubmitButton{
                font-size:13px;
                width:30%;
            }
        }
        @media only screen and (max-width:786px){
            .contentPar{
                padding: 20px 10px
            }
        }

`

const tableData = [
    { title: "Байгууллагын нэр", name: "tablerow1" },
    { title: "Төслийн нэр", name: "tablerow2" },
    { title: "Өргөдлийн дугаар", name: "tablerow3" },
    { title: "Хурлын огноо:", name: "tablerow4" },
]
const tableData2 = [
    { title: "1-р гишүүн", name: "tablerow1" },
    { title: "2-р гишүүн", name: "tablerow2" },
    { title: "3-р гишүүн", name: "tablerow3" },
    { title: "4-р гишүүн", name: "tablerow4" },
]
