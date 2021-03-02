import React,{useState} from 'react'
import styled from 'styled-components'
import {fontSize, textColor,InputStyle,ColorRgb,NextBtn } from '../../../theme'
import {AiOutlineSend} from 'react-icons/ai'

function Main_decision() {
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [opacity2, setOpacity2] = useState("0");

    return (
        <FeedBackCont className="container">
            <div className="contentPar">
                <div className="TitlePar">
                    <div className="title">ҮНЭЛГЭЭНИЙ ХОРООНЫ ШИЙДВЭРИЙН ХУУДАС</div>
                    <div className="desc">Төсөл бүрт өгсөн нэгтгэсэн санал </div>
                </div>
                <div className="infoWhere">
                    {/* <div className="Title Title4"><span className="circle">⬤</span>Төсөл бүрт өгсөн нэгтгэсэн санал </div> */}
                    <table id="customers">
                        <tr>
                            <th>Талбар</th><th>Утга</th>
                        </tr>
                            {tableData.map((el,i)=>{
                                return(
                                    <tr className="getTable1">
                                        <td>{el.title}</td>
                                        <td> <InputStyle>  <input className={`input tableItem${i+1}`} placeholder="..." type="input" /> <div className="line" />  </InputStyle> </td>
                                    </tr>
                                )
                            })}
                    </table>
                </div>

                <div className="infoWhere">
                    <table id="customers">
                        <tr><th>Үнэлгээний хорооны гишүүдийн овог нэр</th><th>Санал</th></tr>
                            {tableData2.map((el,i)=>{
                                return(
                                    <tr className="getTable1">
                                        <td>{el.title}</td>
                                        <td><InputStyle><input className={`input tableItem${i+1}`} placeholder="..." type="input" /> <div className="line" /></InputStyle></td>
                                    </tr>
                                )
                            })}
                    </table>
                </div>

                <div className="buttonPar">
                    <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                    <NextBtn className="SubmitButton" type="button">Илгээх <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>
                </div>
            </div>
        </FeedBackCont>
    )
}

export default Main_decision

const FeedBackCont = styled.div`
        color: rgba(${textColor});
        padding-bottom:80px;
        .contentPar{
            background-color:white;
            padding:20px 100px;
            font-size:${fontSize};
            margin-top:30px;
            border:1px solid rgba(0,0,0,.2);
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
                        padding: 8px;
                    }
                    th{
                        color:white;
                        background-color:rgba(${ColorRgb});

                        .question{
                            opacity:0;
                            transform:scale(0);
                        }
                    }
                    td{
                        .input{
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