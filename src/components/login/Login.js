import React,{useEffect, useState,useContext} from 'react'
import styled from "styled-components";
import {CgProfile} from 'react-icons/cg'
import {HiOutlineMail} from 'react-icons/hi'
import {BiLockOpen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import axios from '../../axiosbase';
import UserContext from "../../context/UserContext";

function Login() {
    const userCtx = useContext(UserContext);

    
    const [errMessage, setErrMessage] = useState("Loading...");

    useEffect(() => {
        const parsedCount = localStorage.getItem("UserProfile");
        const finalUser = parsedCount ? JSON.parse(parsedCount) : [];
        //setUserProfile(finalUser);
        // console.log(finalUser , "this get Login");
      }, []);

    const handleClick = async (e) =>{
        e.preventDefault();
        let Username = document.querySelectorAll(".LoginInpName");
        let User = Array.from(Username);
        const finalOneUser = {}

        User.map(element=>{
            let field = element.name;
            let value = element.value;
            finalOneUser[field] = value;
        });
        //setUserName(finalOneUser);

        userCtx.loginUser(finalOneUser.name,finalOneUser.password);

       
    }

    return (
        <Component className="container">
            <form onSubmit={handleClick}>
                <div className="formOneParent">
                <div className="headPar"><span className="headText">Нэвтрэх</span></div>
                    <div className="inputPar">
                        <div className="name">
                            <CgProfile />
                                <div className="form__group">
                                    <input type="input" className="LoginInpName form__field" placeholder="Аж ахуйн нэр" name="name" required />
                                    <label for="name" className="form__label">Нэр эсвэл Нууц үгээр нэвтрэх</label>
                                </div>
                        </div>
                        <div className="name">
                            <BiLockOpen />
                                <div className="form__group">
                                    <input type="password" className="LoginInpName form__field" placeholder="Регистерийн дугаар" name="password" required />
                                    <label for="name" className="form__label">Нууц үг</label>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="SubmitButtonPar">
                 <div>{errMessage}</div>
                <button   className="SubmitButton" type="submit">Нэвтрэх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div>  </button>
                </div>
            </form>
        </Component>
    )
}

export default Login


const Component = styled.div`
    font-family:"Roboto","Sans-serif";
    position:relative;
    z-index:1;
    margin-top:80px;
    height:83.5vh;
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
              width:50%;
              svg{
                color:#036;
                font-size:30px;
                margin-right:20px;
                margin-bottom:2px;
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
                        font-size: 1rem;
                        cursor: text;
                        top: 20px;
                      }
                  }
                 
                  .form__label {
                      position: absolute;
                      top: 0;
                      display: block;
                      transition: 0.2s;
                      font-size: 1rem;
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
                            font-size: 1rem;
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
          color:red;
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

      @media only screen and (max-width:768px){
          height:76vh;
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