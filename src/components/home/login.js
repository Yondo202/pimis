import React, { useContext, useState, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { CgProfile } from 'react-icons/cg'
import { BiLockOpen } from 'react-icons/bi'
import { AiOutlineSend } from 'react-icons/ai'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import UserContext from "../../context/UserContext";
import { fontFamily, Color, ColorRgb, InputStyle, NextBtn } from "../theme"
import Signup from './signup'
import ForgetPassword from './ForgetPassword'
import { useHistory } from 'react-router-dom'

function Login() {
  const refFocus = useRef(null);
  const history = useHistory();
  const userCtx = useContext(UserContext);
  const [Show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    let Username = document.querySelectorAll(".LoginInpName");
    let User = Array.from(Username);
    const finalOneUser = {}
    User.forEach(el => {
      if (!el.value) {
        el.classList += " red"
      }else {
        el.classList = - " red"
        el.classList += " LoginInpName"
        finalOneUser[el.name] = el.value;
      }
    });

    userCtx.loginUser(finalOneUser.name, finalOneUser.password);
    const UserRole = localStorage.getItem("role", []);
    if (UserRole === "admin") { history.push('/') } else { history.push('/') }
  }

  return (
    <Component>
      <div className="imgPar">
        <img src="/head.jpg" alt="edp_logo" />
        <div className="text">Экспортыг дэмжих төсөл</div>
      </div>
      <form onSubmit={handleClick}>
        <div className="formOneParent">
          <div className="inputPar">
            <div className="inpChild">
              <div className="labels"><span>Нэвтрэх</span> </div>
              <div className="name">
                <CgProfile />
                <InputStyle className="newInp">
                  <input ref={refFocus} type="email" className="LoginInpName" placeholder="Еmail хаягаараа нэвтэрнэ үү" name="name" required />
                  <div className="line"></div>
                </InputStyle>
              </div>
            </div>
            <div className="inpChild">
              <div className="labels">
                <span> Нууц үг </span>
                <span className="forget" onClick={()=>setVisible(true)} > Нууц үг мартсан</span>
              </div>
              <div className="name">
                <BiLockOpen />
                <InputStyle className="newInp pass">
                  <input type={Show ? 'text' : 'password'} required className="LoginInpName form__field" placeholder="Нууц үгээ оруулна уу..." name="password" /> {Show ? <FaRegEye onClick={() => setShow(false)} /> : <FaRegEyeSlash onClick={() => setShow(true)} />}
                  <div className="line"></div>
                </InputStyle>
              </div>
            </div>
          </div>
        </div>
        <div className="SubmitButtonPar">
          {userCtx.userInfo.userId ? <div className="green">Амжтлттай нэвтэрлээ...</div> : <div className="red">{userCtx.errMsg}</div>}
          <button className="SubmitButton" type="submit">Нэвтрэх<div className="flexchild"><AiOutlineSend /> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></button>
        </div>
      </form>

      <ForgetPassword visible={visible} setVisible={setVisible} />
      <Signup />
    </Component>
  )
}

export default Login

const imageAnimate = keyframes`
    0% { transform:translateY(-40px);opacity:0;  }
    100% { transform:translateY(0px);opacity:1;  }
`

const inputAnimate = keyframes`
    0% { transform:translateX(40px);opacity:0;  }
    100% { transform:translateX(0px);opacity:1;  }
`
const inputAnimate2 = keyframes`
    0% { transform:translateX(-40px);opacity:0;  }
    100% { transform:translateX(0px);opacity:1;  }
`



const Component = styled.div`
    font-family:${fontFamily};
    padding-top:10px;
    font-size:13px;
    margin-bottom:50px;
    .imgPar{
        text-align:center;
        padding:15px 0px;
        img{
          animation: ${imageAnimate} 1s ease;
          width:100%;
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
               animation: ${inputAnimate2} 1s ease;
               display:flex;
               flex-direction:row;
               justify-content:space-between;
               font-size:13px;
               span{
                   color:rgba(0,0,0,0.7);
                   font-weight:500;
               }
               .forget{
                  font-size:14px;
                  color:#036 !important;
                  font-weight:500;
                  cursor:pointer;
                  &:hover{
                          color:rgba(${ColorRgb},0.7);
                  }
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
              animation: ${inputAnimate2} 1s ease;
              color:rgba(${ColorRgb},0.7);
              font-size:28px;
              margin-right:15px;
              margin-bottom:5px;
            }
            .newInp{
              animation: ${inputAnimate} 1s ease;
              font-size:15px;
              width:100%;
            }
            .pass{
                svg{
                  position:absolute;
                  right:0;
                  bottom:2px;
                  font-size:18px;
                  color:rgba(0,0,0,0.9);
                  cursor:pointer;
                }
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
        position:relative;
        font-family: inherit;       
        margin-bottom:10px;
        border-style:none;
        border-radius:6px;
        cursor:pointer;
        padding:5px 0px;
        color:white;
        background-color:${Color};
        font-size:14px;
        text-align:center;
        transition:all 0.3s ease;
        display:flex;
        align-items:center;
        justify-content:space-around;
        border:1px solid rgba(63, 81, 181,0.5);
        width:100%;
        border-radius:6px;
        overflow:hidden;
          &:active:after{
            opacity: 1;
            transition: 0s;
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        img{
            width:30px;
            height:30px;
        }
        .hide{
            transition:all 0.3s ease;
            transform:scale(0);
            font-size:22px;
        }
        .hide1{
            transition:all 0.7s ease;
            transform:scale(0);
            font-size:23px;
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
