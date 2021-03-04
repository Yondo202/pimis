import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {AiOutlineSend} from 'react-icons/ai'
import {ImUserCheck} from 'react-icons/im'
import {fontFamily, Color, NextBtn} from "../theme"
import { useHistory } from 'react-router-dom'
import axios from './../../axiosbase'

function EmailAuth() {
  const history = useHistory();
  const param = useParams().id;
  const [Load, setLoad] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ ErrMsg, setErrMsg ] = useState();

  useEffect(async ()=>{
       await axios.post(`users/confirm`, { idToken: param } ).then((res)=>{
            if(res.data.success===true){
                if(res.data.confirmed===0){
                    //ямар нэг алдаа гарсан
                    setSuccess(false); setLoad(true); setErrMsg("ямар нэг алдаа гарсан"); 
                }else if(res.data.confirmed===1){
                    //амжилттай...
                    setLoad(true); setSuccess(true); setErrMsg("Баталгаажуулалт амжилттай");
                }else if(res.data.confirmed===2){
                    setLoad(true); setSuccess(true); setErrMsg("Аль хэдийн баталгаажсан байна");
                    //Аль хэдийн баталгаажсан байна...
                }
            }
        }).catch((err)=>{ setSuccess(false); setLoad(true); setErrMsg("ямар нэг алдаа гарсан");  })
  },[]);

    const handleClick = () =>{
        history.push("/");
    }

    return (
        <Component>
                <div className="imgPar">
                    <img src="/head.jpg" alt="edp_logo" />
                    <div className="text">Экспортыг дэмжих төсөл</div>
                </div>
                <div style={Load?success?{borderTop:`3px solid green`}: {borderTop:`3px solid orange`}:{borderTop:`3px solid ${Color}`}}  className="formOneParent">
                    {Load?success?<div className="Success"><ImUserCheck /> <h4>{ErrMsg}</h4> </div> :<div className="notSuccess"><ImUserCheck /> <h4>{ErrMsg}</h4> </div>: <div className="imga"><img  src="/gifff.gif" alt="gif" /></div> }
                </div>
                <div className="SubmitButtonPar">
                {Load&&success?<NextBtn onClick={handleClick} className="SubmitButton" type="button">Нэвтрэх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>:null}
                </div>
        </Component>
    )
}

export default EmailAuth

const Component = styled.div`
    font-family:${fontFamily};
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
        // border-top:3px solid green;
        background-color:white;
        border-radius:5px;
        // margin-bottom:16px;
        // padding-bottom:20px 0px;
        .imga{
            display:flex;
            justify-content:center;
            margin:15px 0px;
            img{
                width:70px;
            }
        }
        .Success{
            padding:40px 0px;
            padding-bottom:30px;
            display:flex;
            align-items:center;
            svg{
                margin-right:20px;
                font-size:30px;
                color:green;
            }
            h4{
                font-size:22px;
            }
        }
        .notSuccess{
            padding:40px 0px;
            padding-bottom:30px;
            display:flex;
            align-items:center;
            svg{
                margin-right:20px;
                font-size:30px;
                color:orange;
            }
            h4{
                font-size:22px;
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

