import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Token from 'context/accessToken';
import axios from "axiosbase"
import styled, { keyframes } from 'styled-components';
import { fontSize, textColor } from 'components/theme';
import { FeedBackCont } from "components/admin/contents/main_decision/Main_decision"

const Member_interest = () => {
    const [ mainData, setMainData ] = useState({})
    const param = useParams().id;
    const history = useHistory();

    useEffect(()=>{
        GoFetch()
    },[])

    const GoFetch = () =>{
        axios.get(`evaluation-results/hurliin-negtgel?projectId=${param}`, { headers: { Authorization: Token() } }).then((res) => {
            if (res.data.data) {
                setMainData(res.data.data); 
            }
        })
    }

    return (
        <FeedBackCont>
            <div className="contentPar">
                <div className="TitlePar">
                    <div className="title"> Ашиг сонирхлын зөрчилгүй гэдгээ илэрхийлэх, Зөрчил үүссэн тухай мэдэгдэл</div>
                </div>
                <div className="list_parent">
                    <div className="my_row">
                        <div className="field">Өргөдлийн дугаар:</div>
                        <div className="value">{mainData?.project_number}</div>
                    </div>
                    <div className="my_row">
                        <div className="field">Аж ахуйн нэгжийн нэр:</div>
                        <div className="value">{mainData?.company?.company_name}</div>
                    </div>
                </div>

                <div className="infoWhere">
                            <table id="customers">
                                <tr>
                                    <th >№</th>
                                    <th >Сонгон шалгаруулалтын багийн гишүүдийн овог нэр</th>
                                    <th  className="center">Сонирхлын зөрчилтэй эсэх</th>
                                    <th  className="center">Сонирхлын зөрчил</th>
                                    {/* <th  className="center">Гарын үсэг</th> */}
                                </tr>
                                {mainData?.memberEvaluations?.length?mainData?.memberEvaluations.map((el, i) => {
                                    return (
                                        <tr key={i} className="getTable1">
                                            <td className="center">{i+1}</td>
                                            <td className="">{el.firstname} {el.lastname}</td>
                                            <td className="center">
                                                <div className="input">
                                                    {
                                                    el.approved === "waiting" ? `Хүлээгдсэн...` 
                                                    :el.approved=== "violation"
                                                    ? `АС зөрчилтэй`:`Үгүй`
                                                    }
                                                    {/* {el.approved === "violation" ? `АС зөрчилтэй` : ``} */}
                                                    {/* {el.approved === "approved" ? `Тийм` : ``}
                                                    {el.approved === "rejected" ? `Үгүй` : ``} */}
                                                </div>
                                            </td>
                                            <td  className="center">{el.approved=== "violation"?el.conflict?JSON.parse(el.conflict)[0]?.description:``:``}</td>
                                        </tr>
                                    )
                                }):null}
                              
                            </table>
                        </div>

            </div>
            
            <div className="NullPar">
                <div className="nullTitle">
                    <div onClick={() => history.goBack()} className="BackPar"><div className="SvgPar"><MdKeyboardArrowLeft /></div>  <span>Буцах</span> </div>
                    {/* <h2 className="title">Мэдээлэл ороогүй байна</h2> */}
                    <div className="desc"></div>
                </div>
            </div>
        </FeedBackCont>
    )
}

export default Member_interest

const homeAnimeSvg = keyframes`
    0% { left:20px; opacity: 0.4; transform:scale(1) }
    100% { left:0px; opacity: 1; transform:scale(1.2) }
`

const TitlePar = styled.div`
    padding:10px 0px;
    margin-bottom:15px;
    .title{
        display:flex;
        justify-content:center;
        color:${textColor};
        padding-bottom:10px;
        font-size:16px;
        text-align:center;
        font-weight:500;
        .customRadio{
            display:flex;
            gap:25px;
            justify-content:center;
            .item{
                display:flex;
                flex-direction:column;
                align-items:center;
                text-align:center;
                .label{
                    margin-bottom:5px;
                }
            }
        }
        .customRadio{
            margin-left:20px;
        }
    }
    .desc{
        font-size:14px;
        text-align:center;
        font-style: italic;
    }
`

//  <Container className="container">
            {/* <NullParent className="NullPar">
                <div className="nullTitle">
                    <div onClick={() => history.goBack()} className="BackPar"><div className="SvgPar"><MdKeyboardArrowLeft /></div>  <span>Буцах</span> </div>
                    <h2 className="title">Мэдээлэл ороогүй байна</h2>
                    <div className="desc"></div>
                </div>
            </NullParent> */}

            {/* <TitlePar className="TitlePar">
                <div className="title">
                    Ашиг сонирхлын зөрчилгүйг мэдэгдэх хуудас
                </div>
                <div className="desc">
                </div>
            </TitlePar> */}


        // {/* </Container> */}

const NullParent = styled.div`
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
`
