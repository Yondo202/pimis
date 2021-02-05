import React, {useState} from 'react'
import styled from "styled-components";
import {BiLockOpen} from 'react-icons/bi'
import {IoEyeOutline} from 'react-icons/io5'
import {AiOutlineSend} from 'react-icons/ai'
import Ghost from '../Ghost'
import {Link,useParams } from "react-router-dom";
import axios from "../../axiosbase";
import {fontFamily} from '../theme'
import PasswordInducator from './PasswordIndicator'

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ ~@#$%^&*()_+\-=[\]{;':\\|,.<>\/?]/;

function ResetPassword() {
    const {id}  = useParams();
    const [scale, setScale] = useState("0");
    const [errText, setErrText] = useState("Мэдээлэл дутуу байна");
    const [color, setColor ] = useState("red");
    const [HomeBtn, setHomeBtn] = useState("0");
    const [SendBtn, setSendBtn] = useState("1");
    const [hidden, setHidden ] = useState(true);
    const [hidden2, setHidden2 ] = useState(true);

    const toggleShow=()=> { setHidden( !hidden );}
    const toggleShow2=()=> { setHidden2( !hidden2 ); }

    // const ["password" ToggleIcon ] = usePasswordToggle();
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

        const handleClick = async (e) =>{
          e.preventDefault();

          console.log(passwordValidity.minChar, "min chaR1");
          console.log(passwordValidity.number, "min chaR2");
          console.log(passwordValidity.specialChar, "min chaR3");

             let rs = document.querySelectorAll(".Password");
             let arr = Array.from(rs);
             let finalOne = {};
            arr.map(element=>{
                  let field = element.name;
                  let value = element.value;
                  finalOne[field] = value;
            });
            if(finalOne.password !== finalOne.passwordagain){
              setErrText("Нууц үг адил биш байна..");
              setScale("1");
              setColor("red");
              setHomeBtn("0");
            }else if(passwordValidity.minChar === false || passwordValidity.number === false || passwordValidity.specialChar === false){
              setErrText("Нууц үгийн нөхцөлөө шалгана уу..");
              setScale("1");
              setColor("red");
              setHomeBtn("0");
            }else{
                await axios.post('users/reset-password',  { password: finalOne.password,resetToken:id })
                .then((res)=>{
                console.log(res, "forget res");
                console.log(res.data.success, "forget res success");
                if(res.data.success === true){
                  setErrText(" ✓ Нууц үг амжилттай солигдлоо");
                  setScale("1");
                  setColor("green");
                  setHomeBtn("1");
                  setSendBtn("0");
                }
              }).catch((e)=>{
                console.log(e.response.data.error.message, "err Response");
                // setErrmsg(e.response.data.error.message);
                if(e.response.data.error.message){
                  setErrText(e.response.data.error.message);
                  setScale("1");
                  setColor("red");
                  setHomeBtn("0");
                }
              });
            }
      }

      // console.log(id, "params id");

    return (
        <Component className="container-fluid">
          <Ghost />
            <form onSubmit={handleClick}>
                <div className="formOneParent">
                <div className="headPar">
                  <span className="headText">Нууц үг сэргээх</span>
                  </div>
                    <div className="inputPar">
                        <div className="name">
                            <BiLockOpen />
                                <div className="form__group">
                                    <input onFocus={()=> setPasswordFocused(true)} onChange={e => onChangePassword(e.target.value)} type={hidden ? "password" : "text"} className="Password form__field" value={password} placeholder="Регистерийн дугаар" name="password" required />
                                    <label for="name" className="form__label">Шинэ нууц үг</label>
                                </div>
                                <div className="toggleSvg" onClick={toggleShow}><IoEyeOutline /></div>
                        </div>
                          {passwordFocused && <PasswordInducator validity={passwordValidity} />}
                        <div className="name">
                            <BiLockOpen />
                                <div className="form__group">
                                    <input type={hidden2 ? "password" : "text"}  className="Password form__field"  placeholder="Регистерийн дугаар" name="passwordagain" required />
                                    <label for="name" className="form__label">Нууц үгээ давтаж оруулна уу?</label>
                                </div>
                                <div className="toggleSvg" onClick={toggleShow2}><IoEyeOutline /></div>
                        </div>
                    </div>
                </div>

                <div className="SubmitButtonPar">
                  <span className="colorText" style={{transform:`scale(${scale})`, color:color}}>{errText} </span>
                  <span  className="homeLogin" style={{transform:`scale(${HomeBtn})`}} ><Link to="/">Нэвтрэх</Link></span>
                  <button className="SubmitButton" style={{transform:`scale(${SendBtn})`}} type="submit">Сэргээх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div>  </button>
                </div>
            </form>
        </Component>
    )
}

export default ResetPassword


const Component = styled.div`
    width:50% !important;
    font-family:${fontFamily};
    position:relative;
    z-index:1;
    margin-top:80px;
    height:92vh;
    .formOneParent{
        border-top:5px solid #036;
        background-color:white;
        border-radius:8px;
        margin-bottom:16px;
        padding:24px 26px;
        .headPar{
            padding:10px 0;
          font-size:1.5rem;
          border-bottom:1px solid rgba(63, 81, 181,0.5);
          color:black;
          display:flex;
          flex-direction:row;
          justify-content: space-between;
          .homeLogin{
            cursor:pointer;
            font-size:16px;
            border:1px solid rgba(63, 81, 181,0.5);
            border-radius:6px;
            padding:3px 20px;
            align-self:center;
            box-shadow:1px 1px 13px -6px;
            transition:all 0.3s ease;
            a{
              text-decoration: none;
              color:black;
            }
            &:hover{
                background-color:rgba(0, 51, 102,0.8);
                color:white;
                a{
                  text-decoration: none;
                  color:none;
                  color:white;
                }
            }
          }
        }
        .inputPar{
           display:flex;
           flex-direction:column;
           align-items:flex;
           justify-content:center;
          .name{
              display:flex;
              flex-direction:row;
              align-items:flex-end;
              justify-content:flex-end;
              margin-bottom:20px;
              width:50%;

              svg{
                color:#036;
                font-size:30px;
                margin-right:20px;
                margin-bottom:2px;
              }
              .toggleSvg{
                border-bottom:2px solid gray;
                svg{
                  margin-bottom:0px;
                  cursor:pointer;
                  color:#888888;
                  font-size:24px;
                  margin-right:0px;
                }
              }
              .form__group{
               position:relative;
               padding: 15px 0 0;
               margin-top: 10px;
               width: 100%;
                  .form__field{
                      font-family: inherit;
                      width: 100%;
                      border: 0;
                      border-bottom: 2px solid gray;
                      outline: 0;
                      font-size: 1rem;
                      color: black;
                      padding: 7px 0;
                      background: transparent;
                      transition: border-color 0.2s;
                      position: relative;
                      z-index: 1;
                      &::placeholder {
                        color: transparent;
                      }
                      &:placeholder-shown ~ .form__label {
                        font-size:0.9rem;
                        cursor: text;
                        top: 24px;
                      }
                  }
                 
                  .form__label {
                      position: absolute;
                      top: 0;
                      display: block;
                      transition: 0.2s;
                      font-size: 0rem;
                      color: gray;
                      z-index: 0;
                    }
                    
                    .form__field{
                        &:focus {
                          ~ .form__label {
                            position: absolute;
                            top: 0;
                            display: block;
                            transition: 0.2s;
                            font-size: 0.8rem;
                            color: #11998e;
                            font-weight:500;    
                          }
                          padding-bottom: 7px;
                          font-weight: 500;
                          border-width: 2px;
                          border-image: linear-gradient(to right, #11998e, #38ef7d);
                          border-image-slice: 1;
                        }
                    }
                    /* reset input */
                    .form__field{
                      &:required,&:invalid { box-shadow:none; }
                    }
              }
              
            }
         
        }
      }
      .SubmitButtonPar{
        margin-top:20px;
        text-align:end;
        display:flex;
        justify-content:space-between;
        flex-direction:row;
        .colorText{
          transition:all 0.3s ease;
          font-size:18px;
          margin-bottom:10px;
        }
        .homeLogin{
          cursor:pointer;
          font-size:16px;
          border:1px solid rgba(63, 81, 181,0.5);
          border-radius:6px;
          padding:3px 20px;
          align-self:center;
          box-shadow:1px 1px 13px -6px;
          transition:all 0.3s ease;
          margin-top:20px;
          a{
            text-decoration: none;
            color:black;
          }
          &:hover{
              background-color:rgba(0, 51, 102,0.8);
              color:white;
              a{
                text-decoration: none;
                color:none;
                color:white;
              }
          }
        }
     
          .SubmitButton{
            border-style:none;
            border-radius:6px;
            cursor:pointer;
            padding:5px 0px;
            color:white;
            background-color:#036;
            font-size:18px;
            text-align:center;
            transition:all 0.3s ease;
            display:flex;
            align-items:center;
            justify-content:space-around;
            border:1px solid rgba(63, 81, 181,0.5);
            width:28%;
            border-radius:6px;
            .hide{
              transition:all 0.3s ease;
              transform:scale(0);
              font-size:22px;
            }
            .hide1{
              transition:all 0.7s ease;
              transform:scale(0);
              font-size:26px;
            }
            &:hover{
              box-shadow:1px 1px 15px -2px black;
              .hide{
                transition:all 0.3s ease;
                transform:scale(1);
              }
              .hide1{
                transition:all 0.7s ease;
                transform:scale(1);
              }
            }
            .flexchild{
              display:flex;
              align-items:center;
              justify-content:space-around;
            }
        }
      
      }

      @media only screen and (max-width:1168px){width:90% !important;}
      @media only screen and (max-width:1268px){width:80% !important;}
      @media only screen and (max-width:1368px){width:70% !important;}
      @media only screen and (max-width:768px){
        width:100% !important;
          height:88vh;
          .SubmitButtonPar{
            flex-direction:column;
            .colorText{
              text-align:center;
              transition:all 0.3s ease;
              font-size:18px;
              margin-bottom:10px;
            }
            .SubmitButton{
                width:100%;
            }
          }
          .formOneParent{
            .headPar{
                font-size:1.2em;
            }
            .inputPar{
                .name{
                    width:100%;
                }
            }
          }
      }
       
`