import React, {useState, useContext} from 'react'
import styled, { keyframes } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { textColor,InputStyle,Color,NextBtn } from 'components/theme'
import {AiFillUnlock,AiFillLock} from 'react-icons/ai'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa'
import PasswordInducator from 'components/home/PasswordIndicator'
import { AiOutlineSend } from 'react-icons/ai'
import axios from 'axiosbase';
import Tokenn from 'context/accessToken';
import UserContext from 'context/UserContext';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ ~@#$%^&*()_+\-=[\]{;':\\|,.<>\/?]/;
 
export const ChangePassword = () =>{
    const history = useHistory();
    const ctx = useContext(UserContext);
    const [Show, setShow] = useState(false);
    const [Show2, setShow2] = useState(false);
    const [Show3, setShow3] = useState(false);
    const [ spnBtn, setSpnBtn] = useState(false);
    const [ errText, setErrText ] = useState('');
    const [opacity2, setOpacity2] = useState("0");
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordValidity, setPasswordValidity  ] = useState({
      minCar: null,
      number: null,
      specialChar: null
    });

    const onChangePassword =password =>{
        setPassword(password);
        setPasswordValidity({
          minChar: password.length >=8 ? true : false,
          number: isNumberRegx.test(password) ? true : false, 
          specialChar: specialCharacterRegx.test(password) ? true : false
        });
    }
    const clickHandles = () =>{
        let inp = document.querySelectorAll('.getInpp'); let arr = Array.from(inp); let final = {};
        arr.map(el=>{ if(el.value!==""){ final[el.name] = el.value; } });
        let key = Object.keys(final);

        if(key.length < 3) {
            setOpacity2('1'); setErrText('Гүйцэд бөгөлнө үү');
        }else if(passwordValidity.minChar === false || passwordValidity.number === false || passwordValidity.specialChar === false){
            setOpacity2('1'); setErrText('Нууц үг хийх хэсэгээ шалгана уу..');
        }else if(final.newPassword !== final.passwordAgain) {
            setOpacity2('1'); setErrText("Нууц үг адил биш байна...");
        }else{
            setOpacity2('0'); setSpnBtn(true);
            axios.post(`users/change-password`, final, {headers: { Authorization: Tokenn() }} ).then(res=>{
                localStorage.setItem("accessToken", res.data.token); localStorage.setItem("refreshToken", res.data.refreshToken);
                console.log(res, " ress"); ctx.alertText('green', 'Амжилттай солигдлоо', true);  setSpnBtn(false); setTimeout(()=>{history.push('/');},3000);
            }).catch(err=>{  setOpacity2('1'); setErrText(err.response.data.error.message); setSpnBtn(false); })
        }
        console.log(final, " my final");
    }

      
    return(
        <>
        <ChangePass className="container">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 col-sm-12 col-12 parent">

                <div className="ContentPar">
                    <div className="TitleBig">Нууц үг солих</div>
                    <div className="mainPar">

                        <div className="old">
                            <span className="title">Хуучин нууц үг</span> 
                            <div className="InpPar">
                                <div className="svg"><AiFillUnlock /></div>
                                 <InputStyle className="inpp" ><input className="getInpp" name="oldPassword" type={Show3?'text':'password'} placeholder="Хуучин нууц үгээ оруулна уу..." /> 
                                     {Show3?<FaRegEye onClick={()=>setShow3(false)} />:<FaRegEyeSlash onClick={()=>setShow3(true)} />} 
                                 <div className="line" /> </InputStyle>
                            </div>
                        </div>

                        <div style={{marginTop:20}} className="old">
                            <span className="title">Шинэ нууц үг</span> 
                            <div className="InpPar">
                                <div className="svg"><AiFillLock /></div>
                                 <InputStyle className="inpp" ><input name="newPassword" className="getInpp" onFocus={()=> setPasswordFocused(true)} onBlur={()=> setPasswordFocused(false)} value={password} onChange={e => onChangePassword(e.target.value)} type={Show?'text':'password'} placeholder="Шинэ нууц үгээ оруулна уу" />
                                     {Show?<FaRegEye onClick={()=>setShow(false)} />:<FaRegEyeSlash onClick={()=>setShow(true)} />}  
                                  <div className="line" /> </InputStyle>
                            </div>
                            {passwordFocused && <PasswordInducator validity={passwordValidity} />}
                        </div>
                        
                        <div className="old">
                            <span className="title">Шинэ нууц үгээ давтан оруулах</span> 
                            <div className="InpPar">
                                <div className="svg"><AiFillLock /></div>
                                 <InputStyle className="inpp" ><input name="passwordAgain" className="getInpp" type={Show2?'text':'password'} placeholder="Давтан оруулна уу" /> 
                                 {Show2?<FaRegEye onClick={()=>setShow2(false)} />:<FaRegEyeSlash onClick={()=>setShow2(true)} />} 
                                 <div className="line" /> </InputStyle>
                            </div>
                        </div>
                    </div>

                    <div className="buttonPar">
                            <div style={{opacity:`${opacity2}`}} className="errtext">{errText}</div>
                            <NextBtn onClick={clickHandles} style={spnBtn===false? { width:"40%" }:{ width:"10%" }} className="SubmitButton" type="button">{spnBtn===false?(<> Солих <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></> ): <img src="/gif1.gif" alt="spin" />  }</NextBtn>
                    </div>

                </div>


                </div>
                <div className="col-md-2"></div>
            </div>
        </ChangePass>

        <AlertStyle style={ctx.alert.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${ctx.alert.color}` } : { bottom: `50px`, opacity: `0` }} >
            {ctx.alert.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${ctx.alert.color}` }} className="true" /> : <CgDanger style={{ color: `${ctx.alert.color}` }} className="true" />}
            <span>{ctx.alert.text}</span>
        </AlertStyle>
        </>
    )
}

const anime = keyframes`
    0% { transform:scale(0.8);opacity:0;  }
    30% { transform:scale(1.05);opacity:0.8;  }
    100% { transform:scale(1);opacity:1;  }
`

const ChangePass = styled.div`
    font-size:14px;
    .parent{
        height:65vh;
        display:flex;
        align-items:center;
        justify-content:center;
        .ContentPar{
            animation-name:${anime};
            animation-duration:0.7s;
            border-top:3px solid ${Color};
            padding:30px 40px;
            border-radius:6px;
            box-shadow:1px 1px 20px -13px;
            width:100%;
            background-color:white;
            .TitleBig{
                font-size:17px;
                color:rgba(${textColor},1);
                padding-bottom:15px;
                // border-bottom:1px solid rgba(0,0,0,0.1);
                font-weight:500;
            }
            .mainPar{
                padding-top:10px;
                .old{
                    padding:10px 0px;
                    .title{
                        color:rgba(${textColor},0.8);
                        font-weight:500;
                    }
                    .InpPar{
                        padding:10px 0px;
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
                            font-size:15px;
                            flex-grow:11;
                            svg{
                                position:absolute;
                                right:0;
                                bottom:5px;
                                font-size:15px;
                                color:rgba(0,0,0,0.9);
                                cursor:pointer;
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
        }
    }
    @media only screen and (max-width:786px){
        .parent{
            height:80vh;
            .ContentPar{
                padding:30px 10px;
                .buttonPar{
                    flex-direction:column;
                    .errtext{
                        width:100%;
                    }
                    .SubmitButton{
                        width:100% !important;
                    }
                }
            }
        }
    }
`

const AlertStyle = styled.div`
    z-index:1010;  
    transition:all 0.5s ease;
    position:fixed;
    // height:80px;
    bottom:100px;
    left:2%;
    display:flex;
    align-items:center;
    border:1px solid rgba(0,0,0,0.2);
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
        // color:green;
    }
`

