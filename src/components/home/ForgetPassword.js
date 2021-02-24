import React, {useState}from 'react'
import styled from 'styled-components'
import {ColorRgb,InputStyle} from "../theme"
import {GoMail} from 'react-icons/go'
import {AiOutlineSend} from 'react-icons/ai'
import Modal from 'react-awesome-modal';
import axios from "../../axiosbase";

function ForgetPassword() {
    const [scale, setScale] = useState("0");
    const [visible, setVisible] = useState(false);
    const [Errmsg, setErrmsg] = useState("0");
    const [color, setColor] = useState("red");
    const openModal=()=> { setVisible(true); }
    const closeModal=()=> { setVisible(false); }

    const handleClick = async (e) =>{
             let rs = document.querySelectorAll(".Email");
             let arr = Array.from(rs);
             let finalOne = {};
            arr.map(element=>{
                  let field = element.name;
                  let value = element.value;
                  finalOne[field] = value;
            });
            await axios.post('users/forgot-password',  { email: finalOne.email })
                    .then((res)=>{
                    console.log(res, "forget res");
                    console.log(res.data.success, "forget res success");
                    if(res.data.success){
                        setErrmsg("✓ Та email хаягаа шалгана уу...");
                        setColor("green");
                    }
                  }).catch((e)=>{
                    console.log(e.response.data.error.message, "err Response");
                    setErrmsg(e.response.data.error.message);
                    setColor("red");
                  });
            setScale("1");
      }
    return (
        <Component>
            <span className="forget" onClick={openModal}> Нууц үг мартсан</span>
                        <Modal visible={visible} width="500" height="460" effect="fadeInDown" onClickAway={closeModal}>
                            <div className="formOneParent">
                            <div className="headPar">
                                <span className="headText">Нууц үг сэргээх</span>
                                {/* <a className="Close" href="javascript:void(0);" onClick={closeModal}>X</a> */}
                            </div>
                                <div className="inputPar">
                                    <div className="inpChild">
                                        <div className="labels"><span>Email</span> </div>
                                        <div className="name">
                                            <GoMail />
                                            <InputStyle className="newInp">
                                                <input type="text" className="Email  form__field" placeholder="Цахим шуудангаа оруулна уу" name="email" required /><div className="line"></div>
                                            </InputStyle>
                                        </div>
                                    </div>
                                    <div className="SubmitButtonPar">
                                     <span className="colorText" style={{transform:`scale(${scale})`, color:color}}>{Errmsg}</span>
                                          {/* {signUpCtx.userInfo.userId ? <span className="colorText" style={{transform:`scale(${scale})`}}>Амжилттай нэвтэрлээ...</span> : ()}   */}
                                          <span onClick={handleClick}  className="SubmitButton">Илгээх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div>  </span>
                                    </div>
                                </div>
                            </div>
                </Modal>
        </Component>
    )
}

export default ForgetPassword

const Component = styled.div`
    .forget{
        font-size:14px;
        color:#036 !important;
        font-weight:500;
        cursor:pointer;
        &:hover{
                color:rgba(${ColorRgb},0.7);
        }
    }
    .formOneParent{
        padding:10px 60px;
        .headPar{
            display:flex;
            flex-direction:row;
            justify-content:space-beween !important;
            align-items:space-beween !important;
            
        }
        .colorText{
            width:100%;
              text-align:center;
              background-color: #f6c343;
              border-radius:5px;
              font-size:14px !important;
              font-weight:400;
              color:black !important;
              line-height:34px;
              margin-bottom:12px !important;
        }
        
        .SubmitButton{
            font-weight:400 !important;
            font-weight: !important;
            color:white !important;
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
