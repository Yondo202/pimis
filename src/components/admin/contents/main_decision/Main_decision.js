import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import {fontSize, textColor,InputStyle,ColorRgb,NextBtn } from '../../../theme'
import {AiOutlineSend} from 'react-icons/ai'
import {IoIosShareAlt} from 'react-icons/io'
import axios from 'axiosbase'
import Token from 'context/accessToken'

function Main_decision() {
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [opacity2, setOpacity2] = useState("0");
    const [ mainData, setMainData ] = useState(null);
    const [ members, setMembers ] = useState([]);

    useEffect(async()=>{
        try{
            const data = await axios.get(`evaluation-results/hurliin-negtgel?projectId=1&evaluationMeetingId=4`, { headers: { Authorization:Token() } })
            console.log(data.data.data, " my data"); setMainData(data.data.data); setMembers(data.data.data.memberEvaluations);
        }catch{
            console.log("aldaa garsaaaa");
        }
      
    },[]);

    console.log(mainData, " my dataaaaaaaaaaaaaa");

    return (
        <FeedBackCont className="container">
            <div className="contentPar">
                <div className="TitlePar">
                    <div className="title">ҮНЭЛГЭЭНИЙ ХОРООНЫ ШИЙДВЭРИЙН ХУУДАС</div>
                    <div className="desc">Төсөл бүрт өгсөн нэгтгэсэн санал </div>
                </div>
                <div className="infoWhere">
                    <table id="customers">
                        <tr>
                            <th style={{borderRight:`1px solid rgba(255,255,255,0.5)`}}>Талбар</th>
                            <th>Утга</th>
                        </tr>
                            <tr className="getTable1">
                                <td>Байгууллагын нэр:</td>
                                <td> <div className="input">{mainData&&mainData.company_name}</div></td>
                            </tr>
                            <tr className="getTable1">
                                <td>Төслийн нэр:</td>
                                <td><div className="input">{mainData&&mainData.project_name}</div> </td>
                            </tr>
                            <tr className="getTable1">
                                <td>Өргөдлийн дугаар:</td>
                                <td><div className="input">{mainData&&mainData.project_number}</div></td>
                            </tr>
                            <tr className="getTable1">
                                <td>Хурлын огноо:</td>
                                <td><div className="input">{mainData&&mainData.meetingDate}</div></td>
                            </tr>
                    </table>
                </div>

                <div className="infoWhere">
                    <table id="customers">
                        <tr><th style={{borderRight:`1px solid rgba(255,255,255,0.5)`}}>Үнэлгээний хорооны гишүүдийн овог нэр</th><th>Санал</th></tr>
                            {members.map((el,i)=>{
                                return(
                                    <tr className="getTable1">
                                        <td>{el.user.firstname} {el.user.lastname}</td>
                                        {/* <td><InputStyle><input className={`input tableItem${i+1}`} placeholder="..." type="input" /> <div className="line" /></InputStyle></td> */}
                                        <td><div className="input">{el.approve===true? `Зөвшөөрсөн`:`Татгалзсан`}</div></td>
                                    </tr>
                                )
                            })}
                            <tr className="getTable1 B2">
                                        <td>Дэмжсэн саналын тоо</td>
                                        {/* <td><InputStyle><input className={`input tableItem${i+1}`} placeholder="..." type="input" /> <div className="line" /></InputStyle></td> */}
                                        <td><div className="input">{mainData&&mainData.aprrovedCount}</div></td>
                            </tr>
                            <tr className="getTable1 B2">
                                        <td>Татгалзсан саналын тоо</td>
                                        {/* <td><InputStyle><input className={`input tableItem${i+1}`} placeholder="..." type="input" /> <div className="line" /></InputStyle></td> */}
                                        <td><div className="input">{mainData&&mainData.rejectedCount}</div></td>
                            </tr>
                            <tr className="getTable1 B2">
                                        <td>ЭЦСИЙН ДҮН</td>
                                        {/* <td><InputStyle><input className={`input tableItem${i+1}`} placeholder="..." type="input" /> <div className="line" /></InputStyle></td> */}
                                        <td><div className="input">{mainData&&mainData.approve===true? `Зөвшөөрсөн`:`Татгалзсан`}</div></td>
                            </tr>
                    </table>
                </div>

                <div className="reasonPar">
                            <div className="title">Хэрэв төслийг дэмжихээс татгалзсан бол татгалзсан шалтгаан:</div>
                            <div className="inpPar">
                                 <div className="svg"><IoIosShareAlt /></div>
                                <InputStyle className="inpp"><textarea className={`inputtt`} placeholder="Шалтгааныг энд бичнэ үү..." /> <div className="line" /></InputStyle>
                            </div>
                </div>



                <div className="buttonPar">
                    <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                    <NextBtn className="SubmitButton" type="button">Хадгалах <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>
                </div>
            </div>
        </FeedBackCont>
    )
}

export default Main_decision

const FeedBackCont = styled.div`
        color: rgba(${textColor});
        padding-bottom:50px;
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
                // width:100%;
                margin-bottom:40px;
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
        }
        @media only screen and (max-width:786px){
            .contentPar{
                padding: 20px 10px
            }
        }

`





const tableData = [
    {  title: "Байгууллагын нэр", name: "tablerow1" },
    {   title: "Төслийн нэр", name: "tablerow2" },
    {   title: "Өргөдлийн дугаар", name: "tablerow3" },
    {   title: "Хурлын огноо:", name: "tablerow4" },
]
const tableData2 = [
    {  title: "1-р гишүүн", name: "tablerow1" },
    {   title: "2-р гишүүн", name: "tablerow2" },
    {   title: "3-р гишүүн", name: "tablerow3" },
    {   title: "4-р гишүүн", name: "tablerow4" },
]