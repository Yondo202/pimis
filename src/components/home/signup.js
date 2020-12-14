import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import {Color,ColorRgb} from "../theme"
import Modal from 'react-awesome-modal';
import {CgProfile} from 'react-icons/cg'
import {GoMail} from 'react-icons/go'
import {BiLockOpen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import UserContext from '../../context/UserContext'
import PasswordInducator from './PasswordIndicator'

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ ~@#$%^&*()_+\-=[\]{;':\\|,.<>\/?]/;

function Signup() {
    const signUpCtx = useContext(UserContext);
    const [PassText, setPassText] = useState("");
    const [scale, setScale] = useState("1");
    const [visible, setVisible] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordValidity, setPasswordValidity  ] = useState({
      minCar: null,
      number: null,
      specialChar: null
    });

    const openModal=()=> { setVisible(true); }
    const closeModal=()=> { setVisible(false); }

    const onChangePassword =password =>{
      setPassword(password);

      setPasswordValidity({
        minChar: password.length >=8 ? true : false,
        number: isNumberRegx.test(password) ? true : false, 
        specialChar: specialCharacterRegx.test(password) ? true : false
      });
    }
    
    const handleClick = async (e) =>{
        // e.preventDefault();
             let rs = document.querySelectorAll(".userInp");
             let arr = Array.from(rs);
             let finalOne = {};
            arr.map(element=>{
                  let field = element.name;
                  let value = element.value;
                  finalOne[field] = value;
            });
            // console.log(finalOne, "my final");
            if(passwordValidity.minChar === false || passwordValidity.number === false || passwordValidity.specialChar === false){
              setPassText("Нууц үг хийх хэсэгээ шалгана уу..");
            }else if(finalOne.password !== finalOne.passwordagain) {
              setPassText("Нууц үг адил биш байна...");
            }else{
              setPassText("");
              signUpCtx.signUpUser(finalOne.name, finalOne.email, finalOne.password);
              setScale("1");
              setTimeout(()=>{
                const userId = localStorage.getItem("userId", []);
                if(userId){
                  window.location.reload(true);
                }else{
                  console.log('false');
                }
              },1000);
            }
      }
       

 
    return (
        <Component className="SignUp">
            <span >Та бүртгэл үүсгээгүй бол 
            {/* <Switch>
                <Link to="/signup"><a><span className="SignBtn"> Бүртгүүлэх </span></a></Link>
            </Switch> */}
            <a><span className="SignBtn" onClick={openModal} > Бүртгүүлэх </span></a>
            дарна уу.</span>
            {/* <form onSubmit={handleClick}> */}
                        <Modal
                            visible={visible}
                            width="700"
                            height="560"
                            effect="fadeInDown"
                            onClickAway={closeModal}
                        >
                            <div className="formOneParent">
                            <div className="headPar"><span className="headText">Нэвтрэх</span>
                            <a href="javascript:void(0);" onClick={closeModal}>X</a>
                            </div>
                                <div className="inputPar">
                                    <div className="inpChild">
                                        <div className="labels"><span>Нэр</span> </div>
                                        <div className="name">
                                            <CgProfile />
                                            <div className="form__group">
                                                <input type="input" className="userInp  form__field" placeholder="Аж ахуйн нэр" name="name" required />
                                                <label for="name" className="form__label">өөрийн нэрээ оруулах</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inpChild">
                                        <div className="labels"><span>Email</span> </div>
                                        <div className="name">
                                            <GoMail />
                                            <div className="form__group">
                                                <input type="email" className="userInp  form__field" placeholder="Аж ахуйн нэр" name="email" required />
                                                <label for="name" className="form__label">Цахим шуудан</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inpChild">
                                      <div className="labels">
                                          <span> Нууц үг </span>
                                          <span className="forget"> 8-с дээш оронтой байх</span>
                                        </div>
                                          <div className="name">
                                              <BiLockOpen />
                                              <div className="form__group">
                                                  <input onFocus={()=> setPasswordFocused(true)} onChange={e => onChangePassword(e.target.value)} value={password} type="password" className="userInp  form__field" placeholder="Регистерийн дугаар" name="password" required />
                                                  <label for="name" className="form__label">Нууц үг</label>
                                              </div>
                                          </div>
                                    </div>
                                    {passwordFocused && <PasswordInducator validity={passwordValidity} />}

                                    <div className="inpChild">
                                      <div className="labels"> <span> Нууц үг давтах </span> </div>
                                          <div className="name">
                                              <BiLockOpen />
                                              <div className="form__group">
                                                  <input  type="password" className="userInp  form__field" placeholder="Регистерийн дугаар" name="passwordagain" required />
                                                  <label for="name" className="form__label">Нууц үгээ дахин оруулах</label>
                                              </div>
                                          </div>
                                    </div>

                                    <div className="SubmitButtonPar">
                                          <button onClick={handleClick}  className="SubmitButton" type="button">Бүртгүүлэх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div>  </button>
                                          {signUpCtx.userInfo.userId ? <span className="colorTextgreen" style={{transform:`scale(${scale})`}}>Амжилттай нэвтэрлээ...</span> : PassText? (<span className="colorText" style={{transform:`scale(${scale})`}}>{PassText}</span>) :  (<span className="colorText" style={{transform:`scale(${scale})`}}>{signUpCtx.errMsgSignup}</span>)}  
                                    </div>
                                </div>
                            </div>
                </Modal>
                {/* </form> */}

        </Component>
    )
}

export default Signup


const Component = styled.div`
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

        .formOneParent{
            border-top:4px solid ${Color};
            background-color:white;
            border-radius:5px;
            margin-bottom:16px;
            padding-bottom:20px 0px;
            padding:10px 60px;
            .headPar{
            padding:16px 0;
            font-size:1.3rem;
            border-bottom:1px solid rgba(63, 81, 181,0.3);
            color:black;
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            .headText{
                font-size:20px;
            }
          }
        .inputPar{
           display:flex;
           flex-direction:column;
           align-items:flex;
           justify-content:center;
           .passIndPar{
             text-align:start;
           }
           .inpChild{
               margin:12px 0px;
               display:flex;
               flex-direction:column;
               .labels{
                   display:flex;
                   flex-direction:row;
                   justify-content:space-between;
                   font-size:14px;
                   span{
                       color:rgba(0,0,0,0.7);
                       font-weight:500;
                   }
                   .forget{
                    color:rgba(${ColorRgb},0.9);
                    font-weight:600;
                       cursor:pointer;
                       &:hover{
                            color:rgba(${ColorRgb},0.7);
                       }
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
                        border-bottom: 1px solid rgba(${ColorRgb},0.5);
                        border-right: 1px solid rgba(${ColorRgb},0.5);
                        border-left: 1px solid rgba(${ColorRgb},0.5);
                        border-top: 1px solid rgba(${ColorRgb},0.5);
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
                        padding-left:10px;
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
                      /* reset input */
                      .form__field{
                        &:required,&:invalid { box-shadow:none; }
                      }
                }
                
              }
           }
          
         
        }
        .SubmitButtonPar{
            margin-top:12px;
            margin-bottom:20px;
            text-align:end;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            .red{
              font-size:19px;
              font-weight:400;
              color:rgba(255,0,0,0.7);
              margin-bottom:10px;
            }
            .colorText{
              margin:10px 0px;
              transition:all 0.3s ease;
              font-size:16px;
              color:red;
            }
            .colorTextgreen{
              margin:10px 0px;
              transition:all 0.3s ease;
              font-size:16px;
              color:green;
            }
         
              .SubmitButton{
                border-style:none;
                border-radius:6px;
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
        }
     
      @media only screen and (max-width:768px){
            .formOneParent{
                padding:10px 18px;
                .headPar{
                    font-size:1em;
                    .headText{
                        font-size:14px;
                    }
                }
            }
      }
      
`