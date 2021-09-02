import React, { useEffect, useState, useContext } from 'react';
import UserCtx from "context/UserContext"
import { useHistory, useParams } from 'react-router-dom';
import { FeedBackCont } from "components/admin/contents/main_decision/Main_decision";
import { InputStyle} from 'components/theme';
import Signature from "components/member/member_decision/Signature";
import { IoIosShareAlt } from 'react-icons/io';
import axios from 'axiosbase';
import Token from 'context/accessToken';
import { NumberComma } from "components/admin/contents/insurance/NumberComma"
  
const Decision_main2 = () => {
    const { alertText } = useContext(UserCtx);
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
    const [ cond, setCond ] = useState(true);

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async () =>{
       let ress =  await axios.get(`evaluation-meetings/scheduled-projects?projectId=${slug}`, { headers: { Authorization: Token() } });
       if(ress.data.data.length!==0){
            setData(ress.data.data[0]);
            if(ress.data.data[0].sanalinnHuudas.approve!==null){
                const sanal = ress.data.data[0].sanalinnHuudas;
                setDate(sanal?.last_date);
                setReject(sanal?.reject_reason);
                setImgData(sanal?.signature);
                setAssess_one(sanal?.assess_one.toString());
                setAssess_two(sanal?.assess_two.toString());
            }
       }
    }

    useEffect(()=>{
        if(assess_two==='false' || assess_one==='false'){
            setCond(false);
        }else{
            setCond(true);
        }
    },[assess_two, assess_one]);

    const SubmitHandle = (e) =>{
        e.preventDefault();
        const Final = {
            assess_one:assess_one==="true",
            assess_two:assess_two==="true",
            reject_reason:reject,
            date:date,
            approve:cond,
            signature:imgData,
            projectId: Data?.projectId,
            evaluationMeetingId: Data?.evaluationMeetingId
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
                .catch((err) => { setSpin(false); alertText("orange", "Алдаа гарлааа", true); console.log(`err`, err) });
        }
    }

    return (
        <FeedBackCont className="container">
            <div className="contentPar">
            <form onSubmit={SubmitHandle}>
             <div className="RejectParent">
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
                                <td>Хурлын огноо:</td>
                                <td className="center">
                                    {Data?.meetingDate}
                                    {/* <InputStyle className="inpp"><input type="text" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} name="reason" className={`getInpp`} /> <div className="line" /></InputStyle> */}
                                </td>
                            </tr>
                            <tr className="getTable1">
                                <td>Сонгон шалгаруулалтын багийн гишүүний нэр:</td>
                                <td className="center">
                                    {`${Data?.memberInfo?.firstname} ${Data?.memberInfo?.lastname}`}
                                    {/* <InputStyle className="inpp"><input type="text" name="reason" className={`getInpp`} placeholder="Нэр бичнэ үү..." /> <div className="line" /></InputStyle> */}
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
                                <td className="right" >
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
                                    <th>Санал</th>
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
                            САНХҮҮГИЙН ДЭМЖЛЭГ ҮЗҮҮЛЭХ ЭСЭХ: {cond?` ТИЙМ`:` ҮГҮЙ`}
                        </div>
                    </div>

                    {!cond?<div className="reasonPar Par2">
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

                    <div className="LastParent">
                        <Signature cond="sanal" app={Data?.approve} url={imgData} setImgData={setImgData}  />
                        <div className="itemss">
                            <div className="label">Огноо:</div>
                            <InputStyle className="inpp"><input value={date} onChange={e=>setDate(e.target.value)} required type="text" placeholder="2021-05-15" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} className={`getInpp` } /> <div className="line" /></InputStyle>
                        </div>
                    </div>

                    {Data?.sanalinnHuudas?.approve===null?<div className="buttonPar">
                        <div style={{ opacity: opacity2 }} className="errtext">{FinalErrorText}</div>
                        <button type="submit" style={!spin ? { width: `40%`, opacity: 1 } : { width: `10%`, opacity: 0.6 }} className="btn btn-primary">{!spin ? `Илгээх` : <img src="/gif1.gif" alt-="edp-img" alt="" />} </button>
                    </div>:null}
                </div>   
              </form>     
            </div>
        </FeedBackCont>
    )
}

export default Decision_main2