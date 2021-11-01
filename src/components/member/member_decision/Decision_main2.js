import React, { useEffect, useState, useContext } from 'react';
import UserCtx from "context/UserContext"
import { useHistory, useParams } from 'react-router-dom';
import { FeedBackCont } from "components/admin/contents/main_decision/Main_decision";
import { InputStyle} from 'components/theme';
import styled from "styled-components"
import Signature from "components/member/member_decision/Signature";
import { IoIosShareAlt } from 'react-icons/io';
import axios from 'axiosbase';
import Token from 'context/accessToken';
import { NumberComma } from "components/admin/contents/insurance/NumberComma"
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
  
const Decision_main2 = () => {
    const { alertText, alert } = useContext(UserCtx);
    const { slug } = useParams();
    const history = useHistory();
    const [Data, setData] = useState(null);
    const [spin, setSpin] = useState(false);
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [opacity2, setOpacity2] = useState("0");

    const [imgData, setImgData] = useState(null);
    const [ assess_one, setAssess_one ] = useState(null);
    const [ assess_two, setAssess_two ] = useState(null);
    const [ date, setDate ] = useState('')
    const [ reject, setReject ] = useState('')
    const [ cond, setCond ] = useState(null);

    const [ shiidver, setShiidver ] = useState(null);


    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async () =>{
       let ress =  await axios.get(`evaluation-meetings/scheduled-projects?projectId=${slug}`, { headers: { Authorization: Token() } });
       if(ress.data.data.length!==0){
            setData(ress.data.data[0]);
            if(ress.data.data[0]?.sanalinnHuudas?.approve!==null){
                const sanal = ress.data.data[0].sanalinnHuudas;
                setShiidver(sanal?.shiidver.toString());
                setCond(sanal.approve.toString());
                setDate(sanal?.last_date);
                setReject(sanal?.reject_reason);
                setImgData(sanal?.signature);
                setAssess_one(sanal?.assess_one?.toString());
                setAssess_two(sanal?.assess_two?.toString());
            }
       }
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let Final = {};
        if(shiidver==='true'){
            Final = {
                assess_one:null,
                assess_two:null,
                shiidver:shiidver==="true",
                reject_reason:reject,
                date:date,
                approve:true,
                signature:imgData,
                projectId: Data?.projectId,
                evaluationMeetingId: Data?.evaluationMeetingId
            }
        }else{
            Final = {
                assess_one:assess_one==="true",
                assess_two:assess_two==="true",
                shiidver:shiidver==="true",
                reject_reason:reject,
                date:date,
                approve:cond==="true",
                signature:imgData,
                projectId: Data?.projectId,
                evaluationMeetingId: Data?.evaluationMeetingId
            }
        }
       

        if(imgData===null){
            setFinalErrorText("Гарын үсэгээ баталгаажуулна уу..."); setOpacity2("1");
            setTimeout(() => {
                setOpacity2("0");
            }, 5000)
        }else{
            setSpin(true);
            axios.post(`evaluation-results/member-vote`, Final, { headers: { Authorization: Token() } }).then((res) => {
                 alertText("green", "Амжилттай илгээлээ", true); setTimeout(() => { history.push("/"); setSpin(false); }, 3000) })
                .catch((err) => { 
                    setSpin(false); 
                    alertText("orange", err.response?.data?.error?.message, true); console.log(`err -->`, err.response?.data?.error?.message)
                });
        }
    }

    return (
        <FeedBackCont className="container">
            <div className="contentPar">
            <form onSubmit={SubmitHandle}>
                <div className="RejectParent">
                    <div className="TitlePar">
                        <div className="title">СОНГОН ШАЛГАРУУЛАЛТЫН БАГИЙН ГИШҮҮНИЙ САНАЛЫН ХУУДАС</div>
                    </div>

                    <div className="infoWhere">
                        <table id="customers">
                            {/* <tr>
                                <th style={{width:`36%`}}>Талбар</th>
                                <th className="center">Утга</th>
                            </tr> */}
                            <tr className="getTable1">
                                <td>Хурлын огноо:</td>
                                <td className="center">
                                    {Data?.meetingDate}
                                </td>
                            </tr>
                            <tr className="getTable1">
                                <td>Аж ахуйн нэгж эсхүл кластерын толгой аж ахуйн нэгжийн нэр:</td>
                                <td className="center">
                                    {Data?.company_name}
                                </td>
                            </tr>
                            <tr className="getTable1">
                                <td>Дэмжих санхүүжилтийн дүн:</td>
                                <td className="right bold" >
                                    {NumberComma(Data?.budgetCost)} ₮
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className="infoWhere">
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th className="bold">Сонгон шалгаруулалтын багийн гишүүний овог нэр</th>
                                    <th className="center bold">Ирц (1/-)</th>
                                    <th className="center">Санал (Тийм/Үгүй)</th>
                                </tr>

                                <tr className="getTable1">
                                    <td className="bold">{`${Data?.memberInfo?.firstname} ${Data?.memberInfo?.lastname}`}</td>
                                    <td><div className="center input">1</div></td>
                                    <td>
                                        <div className="customRadio">
                                            <div className="item">
                                                <div className="label">Тийм</div>
                                                <InputStyle className="inpp"><input value={true} checked={shiidver==='true'?true:false} onChange={e=>setShiidver(e.target.value)} name="shiidver" type="radio" required /></InputStyle>
                                            </div>
                                            <div className="item">
                                                <div className="label">Үгүй</div>
                                                <InputStyle className="inpp"><input value={false} checked={shiidver==='false'?true:false} onChange={e=>setShiidver(e.target.value)} name="shiidver" type="radio" required /></InputStyle>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {shiidver==="true"?<div className="LastParent">
                        <Signature cond="sanal" app={Data?.approve} url={imgData} setImgData={setImgData}  />
                        <div className="itemss">
                            <div className="label">Огноо:</div>
                            <InputStyle className="inpp"><input value={date} onChange={e=>setDate(e.target.value)} required type="text" placeholder="2021-05-15" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} className={`getInpp` } /> <div className="line" /></InputStyle>
                        </div>
                    </div>:null}
                    
                </div>
                
                {shiidver==='false'?<div className="RejectParent">
                        <div className="TitlePar">
                            <div className="title">
                                {/* ҮНЭЛГЭЭНИЙ ХОРООНЫ ШИЙДВЭРИЙН ХУУДАС */}
                                Сонгон шалгаруулалтын багийн гишүүний саналын хуудас<br />
                                /Татгалзсан тохиолдолд бөглөнө/
                            </div>
                        </div>

                        <div className="infoWhere">
                            <table id="customers">
                                <tr>
                                    <th style={{width:`36%`}}>Талбар</th>
                                    <th className="center">Утга</th>
                                </tr>
                                <tr className="getTable1">
                                    <td>Сонгон шалгаруулалтын багийн гишүүний нэр:</td>
                                    <td className="center">
                                        {`${Data?.memberInfo?.firstname} ${Data?.memberInfo?.lastname}`}
                                        {/* <InputStyle className="inpp"><input type="text" name="reason" className={`getInpp`} placeholder="Нэр бичнэ үү..." /> <div className="line" /></InputStyle> */}
                                    </td>
                                </tr>
                                <tr className="getTable1">
                                    <td>Хурлын огноо:</td>
                                    <td className="center">
                                        {Data?.meetingDate}
                                        {/* <InputStyle className="inpp"><input type="text" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} name="reason" className={`getInpp`} /> <div className="line" /></InputStyle> */}
                                    </td>
                                </tr>
                                <tr className="getTable1">
                                    <td>Аж ахуйн нэгж эсхүл кластерын толгой аж ахуйн нэгжийн нэр:</td>
                                    <td className="center">
                                        {Data?.company_name}
                                        {/* <InputStyle className="inpp"><input type="text" name="reason" className={`getInpp`} placeholder="Нэр бичнэ үү..." /> <div className="line" /></InputStyle> */}
                                    </td>
                                </tr>
                                <tr className="getTable1">
                                    <td>Дэмжих санхүүжилтийн дүн:</td>
                                    <td className="right bold" >
                                        {NumberComma(Data?.budgetCost)} ₮
                                        {/* <InputStyle className="inpp">
                                            <NumberFormat placeholder={`0 ₮`} 
                                            style={{textAlign:`right`, paddingRight:`7px`}} thousandSeparator={true} suffix={' ₮'} name="rate" className="getInpp" required />
                                            <div className="line" />
                                        </InputStyle> */}
                                    </td>
                                </tr>

                            </table>
                        </div>

                        <div className="TitlePar">
                            <div className="desc">
                                Доорх хүснэгтэд заасан 2 шалгуурт үнэлгээ өгөх бөгөөд хэрэв аль нэг нь “Үгүй” гэсэн санал авсан бол эцсийн шийдвэр нь санхүүгийн дэмжлэг үзүүлэхгүй гэж гарна. 
                            </div>
                        </div>

                        <div className="infoWhere">
                            <table id="customers">
                                <tbody>
                                    <tr>
                                        <th className="center">№</th>
                                        <th className="center">Шалгуур</th>
                                        <th className="center">Санал</th>
                                    </tr>
                                    <tr className="getTable1">
                                        <td className="center">1</td>
                                        <td><div className="input">Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгч төсөл хэрэгжүүлэх чадавхтай эсэх</div></td>
                                        <td>
                                            <div className="customRadio">
                                                <div className="item">
                                                    <div className="label">Тийм</div>
                                                    <InputStyle className="inpp"><input name="assess_one" value={true} checked={assess_one==='true'?true:false} onChange={e=>setAssess_one(e.target.value)} type="radio" required /></InputStyle>
                                                </div>
                                                <div className="item">
                                                    <div className="label">Үгүй</div>
                                                    <InputStyle className="inpp"><input name="assess_one" value={false} checked={assess_one==='false'?true:false} onChange={e=>setAssess_one(e.target.value)} type="radio" required /></InputStyle>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr className="getTable1">
                                        <td>2</td>
                                        <td> <div className="input">Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгчийн төсөл экспортыг нэмэгдүүлэх боломжтой эсэх</div></td>
                                        <td>
                                            <div className="customRadio">
                                                <div className="item">
                                                    <div className="label">Тийм</div>
                                                    <InputStyle className="inpp"><input value={true} checked={assess_two==='true'?true:false} onChange={e=>setAssess_two(e.target.value)} name="assess_two" type="radio" required /></InputStyle>
                                                </div>
                                                <div className="item">
                                                    <div className="label">Үгүй</div>
                                                    <InputStyle className="inpp"><input value={false} checked={assess_two==='false'?true:false} onChange={e=>setAssess_two(e.target.value)} name="assess_two" type="radio" required /></InputStyle>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="TitlePar">
                            <div className="title">
                                САНХҮҮГИЙН ДЭМЖЛЭГ ҮЗҮҮЛЭХ ЭСЭХ: 
                                {/* {cond?` ТИЙМ`:` ҮГҮЙ`} */}
                                <div className="customRadio customRadio2">
                                    <div className="item">
                                        <div className="label">Тийм</div>
                                        <InputStyle className="inpp"><input value={true} checked={cond==='true'?true:false} onChange={e=>setCond(e.target.value)} name="final" type="radio" required /></InputStyle>
                                    </div>
                                    <div className="item">
                                        <div className="label">Үгүй</div>
                                        <InputStyle className="inpp"><input value={false} checked={cond==='false'?true:false} onChange={e=>setCond(e.target.value)} name="final" type="radio" required /></InputStyle>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {cond==="false"?<div className="reasonPar Par2">
                            <div className="title">Хэрэв “Үгүй” бол шалтгаанаа бичнэ үү:</div>
                            <div className="inpPar">
                                <div className="svg"><IoIosShareAlt /></div>
                                <InputStyle className="inpp"><textarea
                                    name="reason" 
                                    value={reject}
                                    onChange={e=>setReject(e.target.value)}
                                    className={`getInpp`}
                                    placeholder="Шалтгааныг энд бичнэ үү..."
                                    required
                                    /> <div className="line" />
                                </InputStyle>
                            </div>
                        </div>:null}

                        {shiidver==="false"?<div className="LastParent">
                            <Signature cond="sanal" app={Data?.approve} url={imgData} setImgData={setImgData}  />
                            <div className="itemss">
                                <div className="label">Огноо:</div>
                                <InputStyle className="inpp"><input value={date} onChange={e=>setDate(e.target.value)} required type="text" placeholder="2021-05-15" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} className={`getInpp` } /> <div className="line" /></InputStyle>
                            </div>
                        </div>:null}

                        
                    </div>:null} 

                    {Data?.sanalinnHuudas?.approve===null?<div className="buttonPar">
                        <div style={{ opacity: opacity2 }} className="errtext">{FinalErrorText}</div>
                        <button type="submit" style={!spin ? { width: `40%`, opacity: 1 } : { width: `10%`, opacity: 0.6 }} className="btn btn-primary">{!spin ? `Илгээх` : <img src="/gif1.gif" alt-="edp-img" alt="" />} </button>
                    </div>:null}
              </form>     
            </div>

            <AlertStyle style={alert.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${alert.color}` } : { bottom: `50px`, opacity: `0` }} >
                {alert.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${alert.color}` }} className="true" /> : <CgDanger style={{ color: `${alert.color}` }} className="true" />}
                <span>{alert.text}</span>
            </AlertStyle>
        </FeedBackCont>
    )
}

export default Decision_main2


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