import React,{ useContext } from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg'
import {BiLockOpen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import UserContext from "../../context/UserContext";
import {fontFamily, Color,ColorRgb,InputStyle, NextBtn} from "../theme"
import Signup from './signup'
import ForgetPassword from './ForgetPassword'
import { useHistory } from 'react-router-dom'

function Login() {
  const history = useHistory();
  const userCtx = useContext(UserContext);

    const handleClick = (e) =>{
        e.preventDefault();
        let Username = document.querySelectorAll(".LoginInpName");
        let User = Array.from(Username);
        const finalOneUser = {}
        User.map(element=>{
            let field = element.name;
            let value = element.value;
            finalOneUser[field] = value;
        });
        console.log(finalOneUser,"lalalal");
        userCtx.loginUser(finalOneUser.name,finalOneUser.password);

        const UserRole = localStorage.getItem("role", []);
        if(UserRole==="admin"){ history.push('/')}else{ history.push('/') }
    }
    
    return (
        <Component>
                <div className="imgPar">
                    <img src="/head.jpg" alt="edp_logo" />
                    <div className="text">Экспортыг дэмжих төсөл</div>
                </div>
                <div className="formOneParent">
                    <div className="inputPar">
                        <div className="inpChild">
                            <div className="labels"><span>Нэвтрэх</span> </div>
                            <div className="name">
                                <CgProfile />
                                <InputStyle className="newInp">
                                    <input type="input" className="LoginInpName" placeholder="Еmail хаягаараа нэвтэрнэ үү" name="name" required />
                                    <div className="line"></div>
                                </InputStyle>
                            </div>
                        </div>
                        <div className="inpChild">
                         <div className="labels">
                             <span> Нууц үг </span>
                             <ForgetPassword />
                         </div>
                            <div className="name">
                                <BiLockOpen />
                                <InputStyle className="newInp">
                                    <input type="password" className="LoginInpName form__field" placeholder="Нууц үгээ оруулна уу..." name="password" required /><div className="line"></div>
                                </InputStyle>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="SubmitButtonPar">
                    {userCtx.userInfo.userId ? <div className="green">Амжтлттай нэвтэрлээ...</div> : <div className="red">{userCtx.errMsg}</div>}
                     <NextBtn onClick={handleClick} className="SubmitButton" type="button">Нэвтрэх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>
                </div>
                <Signup />
        </Component>
    )
}

export default Login

const Component = styled.div`
    font-family:${fontFamily};
    // height:70vh;
    padding-top:10px;
    font-size:13px;
    margin-bottom:50px;
    .imgPar{
        text-align:center;
        padding:15px 0px;
        img{
          // width:100%;
            // width:128px;
            // height:50px;
            margin-bottom:10px;
        }

        .text{
          font-size:14px;
            font-weight:400;
            color:#888888;
        }
    }
    .formOneParent{
        border-top:3px solid ${Color};
        background-color:white;
        border-radius:5px;
        margin-bottom:16px;
        padding-bottom:20px 0px;
        .headPar{
        padding:16px 0;
        font-size:1rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
      }
    .inputPar{
       display:flex;
       flex-direction:column;
       align-items:flex;
       justify-content:center;
       padding-top:15px;
       .inpChild{
           margin:12px 0px;
           display:flex;
           flex-direction:column;
           .labels{
               display:flex;
               flex-direction:row;
               justify-content:space-between;
               font-size:13px;
               span{
                   color:rgba(0,0,0,0.7);
                   font-weight:500;
               }
              
           }
        .name{
            padding:15px 0px;
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:start;
            width:100%;
            svg{
              color:rgba(${ColorRgb},0.7);
              font-size:28px;
              margin-right:15px;
              margin-bottom:5px;
            }
            .newInp{
              font-size:15px;
              width:100%;
            }
          }
       }
      
     
    }
  }
  .SubmitButtonPar{
    margin-top:10px;
    text-align:end;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-weight:400 !important;
    .red{
      background-color:#e63757;
      box-shadow:1px 1px 10px -2px black;
      border-radius:5px;
      font-size:15px;
      font-weight:400;
      color:white;
      margin-bottom:16px;
      padding:0px 20px;
      line-height:24px;
    }
    .green{
      background-color:green;
      box-shadow:1px 1px 10px -2px black;
      border-radius:5px;
      font-size:15px;
      font-weight:400;
      color:white;
      margin-bottom:16px;
      padding:0px 20px;
      line-height:24px;
    }
    .colorText{
      transition:all 0.3s ease;
      font-size:18px;
      color:red;
    }
      .SubmitButton{
        border-style:none;
        border-radius:4px;
        cursor:pointer;
        padding:5px 0px;
        color:white;
        background-color:${Color};
        font-size:15px;
        text-align:center;
        transition:all 0.3s ease;
        display:flex;
        align-items:center;
        justify-content:space-around;
        border:1px solid rgba(63, 81, 181,0.5);
        width:100%;
        border-radius:4px;
    }
  
  }
  .SignUp{
      margin-top:15px;
      text-align:center;
      span{
          color:rgba(0,0,0,0.8);
          font-size:15px;
      }
      a{
        text-decoration: none;
        .SignBtn{
          cursor:pointer;
          color:${Color};
      }
      }
      
  }

  @media only screen and (max-width:1308px){
    padding-top:0px;
    // height:80vh;
    .SubmitButtonPar{
        .SubmitButton{
            width:100%;
        }
      }
      .formOneParent{
        .headPar{
            font-size:1em;
        }
        .inputPar{
            .name{
                width:100%;
            }
        }
      }
  }
  @media only screen and (max-width:768px){
    padding-top:50px;
    height:100vh;
    .SubmitButtonPar{
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
