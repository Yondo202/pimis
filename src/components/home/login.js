import React,{useContext, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import {CgProfile} from 'react-icons/cg'
import {BiLockOpen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import UserContext from "../../context/UserContext";
import {fontFamily, Color,ColorRgb} from "../theme"
import Signup from './signup'
import ForgetPassword from './ForgetPassword'
import { useHistory } from 'react-router-dom'

function Login() {
  const history = useHistory();
  const userCtx = useContext(UserContext);

    // const keyPress = useCallback(e=>{
    //   if(e.key === 'Enter'){
    //     let Username = document.querySelectorAll(".LoginInpName");
    //     let User = Array.from(Username);
    //     const finalOneUser = {}
    //     User.map(element=>{
    //         let field = element.name;
    //         let value = element.value;
    //         finalOneUser[field] = value;
    //     });
    //     userCtx.loginUser(finalOneUser.name,finalOneUser.password);

    //     const UserRole = localStorage.getItem("role", []);
    //     if(UserRole==="admin"){ history.push('/')}else{ history.push('/') }
    //   }
    // },[userCtx.userInfo.id]);

    // useEffect( async ()=>{
      // const UserRole = localStorage.getItem("role", []);
        // if(UserRole==="admin"){ history.push('/admin')}else{ history.push('/') }
        // document.addEventListener('keydown', keyPress);
        // return () => document.removeEventListener('keydown', keyPress);
    // },[keyPress]);

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
            {/* <form onSubmit={handleClick}> */}
                <div className="imgPar">
                    <img src="/head.jpg" alt="edp_logo" />
                    <div className="text">Экспортыг дэмжих төсөл</div>
                </div>
                <div className="formOneParent">
                {/* <div className="headPar"><span className="headText">Нэвтрэх</span></div> */}
                    <div className="inputPar">
                        <div className="inpChild">
                            <div className="labels"><span>Нэвтрэх нэр</span> </div>
                            <div className="name">
                                <CgProfile />
                                <div className="form__group">
                                    <input type="input" className="LoginInpName form__field" placeholder="Аж ахуйн нэр" name="name" required />
                                    <label for="name" className="form__label">Еmail хаягаараа нэвтэрнэ үү</label>
                                </div>
                            </div>
                        </div>
                        <div className="inpChild">
                         <div className="labels">
                             <span> Нууц үг </span>
                             <ForgetPassword />
                         </div>
                            <div className="name">
                                <BiLockOpen />
                                <div className="form__group">
                                    <input type="password" className="LoginInpName form__field" placeholder="Регистерийн дугаар" name="password" required />
                                    <label for="password" className="form__label">Нууц үг</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="SubmitButtonPar">
                {/* <div className="red">{userCtx.errMsg}</div> */}
                  {userCtx.userInfo.userId ? <div className="green">Амжтлттай нэвтэрлээ...</div> : <div className="red">{userCtx.errMsg}</div>}
                 <button onClick={handleClick} className="SubmitButton" type="button">Нэвтрэх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></button>
                </div>
            {/* </form> */}
                <Signup />
        </Component>
    )
}

export default Login

const Component = styled.div`
    font-family:${fontFamily};
    height:75vh;
    padding-top:10px;
    font-size:13px;
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
            display:flex;
            flex-direction:row;
            align-items:flex-end;
            justify-content:flex-end;
            width:100%;
            svg{
              color:rgba(${ColorRgb},0.7);
              font-size:28px;
              margin-right:15px;
              margin-bottom:5px;
            }
            .form__group{
             position:relative;
             padding: 15px 0 0;
             margin-top: 0px;
             width: 100%;
                .form__field{
                    font-family: inherit;
                    width: 100%;
                    border: 0;
                    border-radius:6px;
                    border-bottom: 1px solid rgba(${ColorRgb},0.4);
                    border-right: 1px solid rgba(${ColorRgb},0.4);
                    border-left: 1px solid rgba(${ColorRgb},0.4);
                    border-top: 1px solid rgba(${ColorRgb},0.4);
                    outline: 0;
                    font-size: 1rem;
                    color: black;
                    padding: 7px 0;
                    padding-left: 10px;
                    background: transparent;
                    transition: border-color 0.2s;
                    transition:all 0.3s ease;
                    position: relative;
                    z-index: 1;
                    &::placeholder {
                      color: transparent;
                    }
                    &:placeholder-shown ~ .form__label {
                      font-size: 0.9rem;
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
                    padding:0px 10px;
                    // background-color:black;
                  }
                  
                  .form__field{
                      &:focus {
                        ~ .form__label {
                          position: absolute;
                          top: 0;
                          display: block;
                          transition: 0.3s;
                          font-size: 0.8rem;
                          color: #11998e;
                          font-weight:400;    
                        }
                        // border-bottom: 1px solid gray;
                        border-right:none;
                        border-left:none;
                        border-top:none;
                        padding-bottom: 7px;
                        font-weight: 400;
                        border-width: 1px;
                        border-image: linear-gradient(to right, #11998e, #38ef7d);
                        border-image-slice: 1;
                      }
                  }
                  .form__field{
                    &:required,&:invalid { box-shadow:none; }
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
        border-style:none;
        border-radius:4px;
        cursor:pointer;
        padding:5px 0px;
        color:white;
        background-color:${Color};
        font-size:18px;
        text-align:center;
        transition:all 0.3s ease;
        display:flex;
        align-items:center;
        justify-content:space-around;
        border:1px solid rgba(63, 81, 181,0.5);
        width:100%;
        border-radius:4px;
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
    height:80vh;
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
