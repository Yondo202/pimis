import React, { useState, useContext, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { NextBtn, InputStyle } from 'components/theme';
import Signature from 'components/member/member_decision/Signature';
import {AiOutlineSend} from 'react-icons/ai';
import axios from 'axiosbase';
import AccessToken from 'context/accessToken';
import UserContext from 'context/UserContext'


function UsersInfo() {
    const ctx = useContext(UserContext);
    const [ userData, setUserData ] = useState(null);
    const [ imgData, setImgData ] = useState(null);
    const [ spnBtn, setSpnBtn ] = useState(false);
    const [ opacity2, setOpacity2] = useState("0");

    useEffect(()=>{
        axios.get(`users/${ctx.userInfo.userId}`).then(res=>{
            console.log(`res`,Object.keys(res.data.data).length )
            if(res.data.data.signature){
                setUserData(res.data.data);
            }
        })
    },[spnBtn])

    const clickHandles = () =>{
        if(!imgData){ setOpacity2("1"); return }
        setSpnBtn(true)
        axios.put(`users/${ctx.userInfo.userId}`, { signature:imgData }, { headers: { Authorization: AccessToken() } } ).then(res=>{
            console.log(`res`, res);setSpnBtn(false);
        }).catch(err=> {setSpnBtn(false); console.log(`err.response.data`, err)});
    }
    return (
        <SignaturStyle className="container">
            <div className="ContPar">
                <div className="TitleBig">Хэрэглэгчийн мэдээлэл</div>
                <div className="userInfoCont">
                   <div className="smTitle">Овог нэр</div>
                   <div className="value">{`${userData?.firstname} ${userData?.lastname}`}</div>
                   {/* <InputStyle className="smTitle"> <input placeholder="Овог..." /> <div className="line"/> </InputStyle> */}
                </div>
                <div className="userInfoCont">
                   <div className="smTitle">Цахим хаяг</div>
                   <div className="value">{userData?.email}</div>
                   {/* <InputStyle className="value"> <input placeholder="example@gmail.com" /> <div className="line"/> </InputStyle> */}
                   <img src="/edit.svg" />
                </div>
                <div className="userInfoCont">
                   <div className="smTitle">Үүрэг</div>
                   <div className="value">{userData?.role}</div>
                </div>

                {userData?.role==="user"&&<div className="user">
                    <div className="userInfoCont">
                        <div className="smTitle">Компаны нэр</div>
                        <div className="value">{userData?.companyname}</div>
                        <img src="/edit.svg" />
                    </div>
                    <div className="userInfoCont">
                        <div className="smTitle">Салбар</div>
                        <div className="value">{userData?.business_sector?.bdescription_mon}</div>
                        <img src="/edit.svg" />
                    </div>
                    <div className="userInfoCont">
                        <div className="smTitle">Регистр</div>
                        <div className="value">{userData?.companyregister}</div>
                        <img src="/edit.svg" />
                    </div>
                </div>} 

                <Signature url={userData?.signature} setImgData={setImgData} />

                <div className="buttonPar">
                    <div style={{opacity:`${opacity2}`}} className="errtext">Гарын үсэгээ зурна уу!</div>
                    <NextBtn onClick={()=>clickHandles()} style={spnBtn===false? { width:"30%" }:{ width:"10%" }}  className="SubmitButton" type="button">{spnBtn===false?(<>Хадгалах <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></> ): <img src="/gif1.gif" alt="spin" />  }</NextBtn>
                </div>
            </div>
        </SignaturStyle>
    )
}

export default UsersInfo

const anime = keyframes`
    0% { transform:scale(0.8);opacity:0;  }
    30% { transform:scale(1.05);opacity:0.8;  }
    100% { transform:scale(1);opacity:1;  }
`

const SignaturStyle = styled.div`
    color:rgba(${props=>props.theme.textColor},1);
    margin-top:30px;
    display:flex;
    align-items:start;
    justify-content:center;
    .ContPar{
        animation: ${anime} 0.4s ease;
        animation-duration:0.7s;
        border-top:3px solid ${props=>props.theme.Color};
        padding:30px 50px;
        border-radius:6px;
        box-shadow:1px 1px 20px -13px;
        width:100%;
        background-color:white;
        .userInfoCont{
            cursor:pointer;
            display:flex;
            font-size:15px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding:20px 15px;
            .smTitle{
                font-weight:500;
                width:30%;
            }
            .value{
                margin-right:10px;
                color:rgba(${props=>props.theme.textColor},0.8);
                width:70%;
            }
            img{
                width:16px;
                transform: scale(1);
                transition:all 0.3s ease;
            }
            &:hover{
                background-color:rgba(182,182,182,0.2);
                img{
                    transform: scale(1.3);
                }
            }
        }
        .TitleBig{
            border-bottom:1px solid rgba(0,0,0,0.3);
            display:flex;
            align-items:center;
            font-size:20px;
            color:rgba(${props=>props.theme.textColor},1);
            padding-bottom:20px;
            // border-bottom:1px solid rgba(0,0,0,0.1);
            font-weight:500;
            svg{
                margin-left:10px;
                color:green;
                font-size:20px;
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
    @media only screen and (max-width:768px){
        .ContPar{
            padding:30px 20px;
        }
    }
`

