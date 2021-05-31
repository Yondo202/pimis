import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { InputStyle, textColor, NextBtn } from 'components/theme';
import { FiArrowRight } from 'react-icons/fi';
import { TiDeleteOutline } from 'react-icons/ti';
import { ImLocation2 } from 'react-icons/im';
import { GrMail } from 'react-icons/gr';
import { FaRegistered, FaRegWindowRestore, FaFax, FaPhoneAlt, } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axiosbase';
import AccessToken from 'context/accessToken';
import UserContext from 'context/UserContext'


function EdpInformation() {
    const ctx = useContext(UserContext);
    const [Data, setData] = useState(null);
    const [deleteInf, setDeleteInf] = useState(false);
    const [spnBtn, setSpnBtn] = useState(false);
    const [opacity2, setOpacity2] = useState("0");
    const [FinalErrorText, setFinalErrorText] = useState("");

    useEffect(() => {
        axios.get(`edp-info`, { headers: { Authorization: AccessToken() } }).then(res => {
            if (res.data.data) { setData(res.data.data); }
        })
    }, [spnBtn])

    const clickHandles = () => {
        let inp = document.querySelectorAll('.getInput'); let arr = Array.from(inp); let final = {};
        arr.forEach(el => {
            if (el.value) {
                final[el.name] = el.value;
                el.classList = - " red";
                el.classList += " getInput";
            } else {
                el.classList += " red";
            }
        });
        if (Object.keys(final).length < 7) {
            setOpacity2("1"); setFinalErrorText("Мэдээллийг гүйцэд оруулна уу...");
        } else {
            setSpnBtn(true);
            // if(!Data){ final["manager_signature"] = imgData }else{ final["manager_signature"] = Data.manager_signature }
            setOpacity2("0"); setFinalErrorText("");
            axios.post(`edp-info`, final, { headers: { Authorization: AccessToken() } }).then(res => {
                console.log(res, " res"); ctx.alertText('green', "Амжилттай хадаглагдлаа", true); setSpnBtn(false);
            }).catch(err => { setSpnBtn(false); ctx.alertText('orange', "Алдаа гарлаа", true); console.log(err.response.data) });
        }
    }

    const onChangeHandle = (el) => {
        let change = Data[el.target.name] = el.target.value; let final = { change, ...Data }; setData(final);
    }
    const deletHandle = () => { setDeleteInf(true); setTimeout(() => { setDeleteInf(false) }, 5000) }
    const deleteHandleData = (el) => {
        axios.delete(`edp-info/delete/${el}`, { headers: { Authorization: AccessToken() } }).then((res) => {
            ctx.alertText('green', "Устгагдсан", true); setSpnBtn(true); setSpnBtn(false);
        }).catch((err) => { ctx.alertText('orange', "Алдаа гарлаа", true); })
    }

    return (
        <EdpInfComp>
            <div className="contentPar">
                <div className="TitlePar">
                    <div className="title">Төслийн мэдээлэл</div>
                    {Data && <div onClick={deletHandle} className="DeleteBtn"><TiDeleteOutline /> Устгах</div>}
                    {deleteInf && <div className="verification"><div onClick={() => deleteHandleData(Data?.id)} className="yeas">Устгах</div><div onClick={() => setDeleteInf(false)} className="no">Үгүй</div> </div>}
                </div>

                {Data ? (<div className="content">
                    <div className="inpPar">
                        <div className="inputs">
                            {/* <span className="inpTitle">Төслийн нэгжийн албан ёсны нэр</span> */}
                            <div className="inpp"><div className="svgPar"><FaRegWindowRestore /></div><InputStyle className="inpChild"><input value={Data.comp_name} onChange={onChangeHandle} className="getInput" name="comp_name" type="text" placeholder="Төслийн нэгжийн албан ёсны нэр" /> <div className="line" /> </InputStyle> </div>
                        </div>
                        <div className="inputs">
                            <div className="inpp"><div className="svgPar"><FiArrowRight /></div><InputStyle className="inpChild"><input value={Data.manager_name} onChange={onChangeHandle} className="getInput" name="manager_name" type="text" placeholder="Төслийн зохицуулагчийн нэр" /> <div className="line" /> </InputStyle> </div>
                        </div>
                    </div>

                    <div className="inpPar">
                        <div className="inputs">
                            <div className="inpp"><div className="svgPar"><FaRegistered /></div><InputStyle className="inpChild"><input value={Data.register} onChange={onChangeHandle} className="getInput" type="text" name="register" placeholder="Регистр ээ оруулна уу..." /> <div className="line" /> </InputStyle> </div>
                        </div>
                        <div className="inputs">
                            <div className="inpp"><div className="svgPar"><FaFax /></div><InputStyle className="inpChild"><input value={Data.fax} onChange={onChangeHandle} className="getInput" type="text" name="fax" placeholder="Fax - аа оруулна уу..." /> <div className="line" /> </InputStyle> </div>
                        </div>
                    </div>

                    <div className="inpPar">
                        <div className="inputs">
                            <div className="inpp"><div className="svgPar"><FaPhoneAlt /></div><InputStyle className="inpChild"><input value={Data.phone} onChange={onChangeHandle} className="getInput" type="text" name="phone" placeholder="Утасны дугаар..." /> <div className="line" /> </InputStyle> </div>
                        </div>
                        <div className="inputs">
                            <div className="inpp"><div className="svgPar"><GrMail /></div><InputStyle className="inpChild"><input value={Data.email} onChange={onChangeHandle} className="getInput" type="text" name="email" placeholder="Email - ээ оруулна уу..." /> <div className="line" /> </InputStyle> </div>
                        </div>
                    </div>

                    <div className="inpPar">
                        <div className="inputs">
                            <div className="inpp"><div className="svgPar"><ImLocation2 /></div><InputStyle className="inpChild"><input value={Data.address} onChange={onChangeHandle} className="getInput" name="address" type="text" placeholder="Хаяг..." /> <div className="line" /> </InputStyle> </div>
                        </div>
                        <div className="inputs">
                            {/* <div className="inpp"><div className="svgPar"><GrMail /></div><InputStyle className="inpChild"><input type="text" placeholder="Email - ээ оруулна уу..." /> <div className="line" /> </InputStyle> </div>  */}
                        </div>
                    </div>
                    {/* <Signature url={Data.manager_signature} setImgData={setImgData} />  */}
                </div>)
                    : (<div className="content">
                        <div className="inpPar">
                            <div className="inputs">
                                {/* <span className="inpTitle">Төслийн нэгжийн албан ёсны нэр</span> */}
                                <div className="inpp"><div className="svgPar"><FaRegWindowRestore /></div><InputStyle className="inpChild"><input className="getInput" name="comp_name" type="text" placeholder="Төслийн нэгжийн албан ёсны нэр" /> <div className="line" /> </InputStyle> </div>
                            </div>
                            <div className="inputs">
                                <div className="inpp"><div className="svgPar"><FiArrowRight /></div><InputStyle className="inpChild"><input className="getInput" name="manager_name" type="text" placeholder="Төслийн зохицуулагчийн нэр" /> <div className="line" /> </InputStyle> </div>
                            </div>
                        </div>

                        <div className="inpPar">
                            <div className="inputs">
                                <div className="inpp"><div className="svgPar"><FaRegistered /></div><InputStyle className="inpChild"><input className="getInput" type="text" name="register" placeholder="Регистр ээ оруулна уу..." /> <div className="line" /> </InputStyle> </div>
                            </div>
                            <div className="inputs">
                                <div className="inpp"><div className="svgPar"><FaFax /></div><InputStyle className="inpChild"><input className="getInput" type="text" name="fax" placeholder="Fax - аа оруулна уу..." /> <div className="line" /> </InputStyle> </div>
                            </div>
                        </div>

                        <div className="inpPar">
                            <div className="inputs">
                                <div className="inpp"><div className="svgPar"><FaPhoneAlt /></div><InputStyle className="inpChild"><input className="getInput" type="text" name="phone" placeholder="Утасны дугаар..." /> <div className="line" /> </InputStyle> </div>
                            </div>
                            <div className="inputs">
                                <div className="inpp"><div className="svgPar"><GrMail /></div><InputStyle className="inpChild"><input className="getInput" type="text" name="email" placeholder="Email - ээ оруулна уу..." /> <div className="line" /> </InputStyle> </div>
                            </div>
                        </div>

                        <div className="inpPar">
                            <div className="inputs">
                                <div className="inpp"><div className="svgPar"><ImLocation2 /></div><InputStyle className="inpChild"><input className="getInput" name="address" type="text" placeholder="Хаяг..." /> <div className="line" /> </InputStyle> </div>
                            </div>
                            <div className="inputs">
                                {/* <div className="inpp"><div className="svgPar"><GrMail /></div><InputStyle className="inpChild"><input type="text" placeholder="Email - ээ оруулна уу..." /> <div className="line" /> </InputStyle> </div>  */}
                            </div>
                        </div>
                        {/* <Signature url={null} setImgData={setImgData} />  */}
                    </div>)}

                <div className="buttonPar">
                    <div style={{ opacity: `${opacity2}` }} className="errtext">{FinalErrorText}</div>
                    <NextBtn onClick={() => clickHandles()} style={spnBtn === false ? { width: "30%" } : { width: "10%" }} className="SubmitButton" type="button">{spnBtn === false ? (<>Хадгалах <div className="flexchild"><AiOutlineSend /><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></>) : <img src="/gif1.gif" alt="spin" />}</NextBtn>
                </div>
            </div>


        </EdpInfComp>
    )
}

export default EdpInformation;

const animate = keyframes`
    0% { transform:translateY(50px);opacity:0; }
    100% { transform:translateY(0px);opacity:1; }
`
const EdpInfComp = styled.div`
    color: rgb(${textColor});
    display:flex;
    align-items:center;
    justify-content:center;
    padding-top:30px;
    .contentPar{
        animation: ${animate} 0.6s ease;
        border-radius:0px 50px 0px 50px;
        box-shadow:1px 1px 23px -10px rgba(${textColor},0.8); 
        padding:30px 5px;
        width:100%;
        max-width:1000px;
        background-color:white;
        .buttonPar{
            margin:10px 30px;
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
        .TitlePar{
            position:relative;
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:0px 30px;
            .title{
                font-weight:500;
                color: rgba(${textColor},1);
                font-size:20px;
                margin-bottom:10px;
            }
            .DeleteBtn{
                cursor:pointer;
                border:1px solid rgba(0,0,0,0.2);
                padding:2px 15px;
                border-radius:3px;
                display:flex;
                align-items:center;
                font-size:14px;
                transition:background-color 0.4s ease;
                svg{
                    font-size:20px;
                    margin-right:5px;
                }
                &:hover{
                    color:white;
                    background-color:#85929E;
                }
            }
            .verification{
                position:absolute;
                right:30px;
                display:flex;
                top:0px;
                background-color:#85929E;
                // padding:8px 30px;
                border-radius:4px;
                font-weight:500;
                transition:all 0.3s ease;
                .yeas{
                    padding:8px 30px;
                    cursor:pointer;
                    margin-right:20px;
                    transition:all 0.3s ease;
                    &:hover{
                        border-radius:4px;
                        background-color:#CAE9F5;
                        box-shadow:1px 1px 10px -4px;
                    }
                }
                .no{
                    padding:8px 30px;
                    cursor:pointer;
                    transition:all 0.3s ease;
                    &:hover{
                        border-radius:4px;
                        background-color:#CAE9F5;
                        box-shadow:1px 1px 10px -4px;
                    }
                }
            }
        }
        .content{
            .rowItems{
                margin-top:30px;
                margin-left:30px;
                .LeftHead{
                    font-weight:500;
                }
            }
            .inpPar{
                display:flex;
                align-items:center;
                justify-content:space-between;
                .inputs{
                    // margin:15px 25px;
                    margin:15px 30px;
                    flex-grow:1;
                    .inpp{
                        display:flex;
                        align-items:center;
                        width:100%;
                        margin-top:8px;
                        .svgPar{
                            margin-right:4px;
                            border-radius:50%;
                            padding:9px 9px;
                            background-color:rgb(225,235,235);
                            svg{
                                font-size:16px;
                                color:rgba(${textColor},0.6);
                            }
                        }
                        .inpChild{
                            width:100%;
                            input{
                                font-size:14px;
                            }
                            .line{
                                height:2px;
                            }
                        }
                     
                    }
                    .inpTitle{
                        font-size:12.5px;
                        font-weight:500;
                        color: rgba(${textColor},0.7);
                    }
                }
                .A1{
                    // flex-grow:2;
                }
            }
        }
    }
`


