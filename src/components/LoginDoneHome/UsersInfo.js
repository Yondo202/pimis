import React, { useState, useContext, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import { NextBtn, InputStyle, AlertStyle } from 'components/theme';
import Signature from 'components/member/member_decision/Signature';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axiosbase';
import AccessToken from 'context/accessToken';
import UserContext from 'context/UserContext'
import SEctor from 'containers/users/Sector'

function UsersInfo() {
    const ref = useRef(null);
    const ctx = useContext(UserContext);
    const [ userData, setUserData ] = useState(null);
    const [ imgData, setImgData ] = useState(null);
    const [ spnBtn, setSpnBtn ] = useState(false);
    const [ opacity2, setOpacity2] = useState("0");
    const [ emailShow, setEmailShow ] = useState( { email: false, companyname: false} );
    const [ sectorData, setSectorData ] = useState([]);
    const [ showSectors, setShowSectors ] = useState(false);
    const [ selectSectors, setSelectSectors ] = useState("- Сонго -");
    const [ sectorId, setSectorId ] = useState(null);
    
    useEffect(async()=>{
       await axios.get(`users/${ctx.userInfo.userId}`).then(res=>{
            if(Object.keys(res.data.data).length > 0){
                setUserData(res.data.data);
                if (res.data.data.signature) {
                    setImgData(res.data.data.signature);
                }
                if (res.data.data.business_sector?.bdescription_mon) {
                    setSelectSectors(res.data.data.business_sector?.bdescription_mon); setSectorId(res.data.data.business_sector?.id);
                }
            }
        })
        axios.get(`business-sector`).then(res => setSectorData(res.data.data))
    }, [])

    const clickHandles = () => {
        if (!imgData) {
            setOpacity2("1");
        } else {
            setSpnBtn(true)
            axios.put(`users/${ctx.userInfo.userId}`, { ...userData, signature: imgData, business_sectorId: sectorId }, { headers: { Authorization: AccessToken() } }).then(res => {
                setSpnBtn(false); ctx.alertText("green", "Амжилттай хадаглагдлаа", true); localStorage.setItem("signature", imgData);
            }).catch(err => { setSpnBtn(false); ctx.alertText("orange", "Алдаа гарлаа", true); console.log(`err.response.data`, err) });
        }
    }

    const changeHandle = (e) => {
        let obj = {};
        obj[e.target.name] = e.target.value;
        setUserData({ ...userData, ...obj });
    }
    const clickHandleEdit = (e) => {
        if (ref.current === e.target) {
            setEmailShow({ email: false, companyname: false });
        } else {
            if (e === "email") {
                setEmailShow({ email: true, companyname: false });
            } else if (e === "companyname") {
                setEmailShow({ email: false, companyname: true });
            }
        }
    }
    return (
        <SignaturStyle className="container">
            {showSectors && <GhostPar><div onClick={() => setShowSectors(false)} className="Ghost"></div> <div className="Sectorpar"><SEctor data={sectorData} setSectorId={setSectorId} setSelectSectors={setSelectSectors} setShowSectors={setShowSectors} /></div></GhostPar>}
            {emailShow.email || emailShow.companyname ? <div ref={ref} onClick={clickHandleEdit} className="ghost"></div> : null}
            <div className="ContPar">
                <div className="TitleBig">Хэрэглэгчийн мэдээлэл</div>
                {/* <div className="userInfoCont">
                   <div className="smTitle">Овог нэр</div>
                   <div className="value">{`${userData?.firstname} ${userData?.lastname}`}</div>
                </div> */}

                {/* <InputStyle className="smTitle"> <input  placeholder="Овог..." /> <div className="line"/> </InputStyle> */}


                <div onClick={() => clickHandleEdit("email")} className={emailShow.email ? `userInfoCont A1` : `userInfoCont`}>
                    <div className="smTitle">Цахим хаяг</div>
                    {emailShow.email ? <InputStyle className="value customInp"> <input onChange={changeHandle} value={userData?.email} name="email" placeholder="example@gmail.com" /> <div className="line" /> </InputStyle>
                        : <div className="value">{userData?.email}</div>}
                    <img src="/edit.svg" alt="edit" />
                </div>

                <div className="userInfoCont">
                    <div className="smTitle">Үүрэг</div>
                    <div className="value">{userData?.role}</div>
                </div>

                {userData?.role === "user" && <div className="user">
                    {/* <div className="userInfoCont">
                        <div className="smTitle">Компаны нэр</div>
                        <div className="value">{userData?.companyname}</div>
                        <img src="/edit.svg" alt="edit" />
                    </div> */}

                    <div onClick={() => clickHandleEdit("companyname")} className={emailShow.companyname ? `userInfoCont A1` : `userInfoCont`}>
                        <div className="smTitle">Компаны нэр</div>
                        {emailShow.companyname ? <InputStyle className="value customInp"> <input onChange={changeHandle} value={userData?.companyname} name="companyname" placeholder="example@gmail.com" /> <div className="line" /> </InputStyle>
                            : <div className="value">{userData?.companyname}</div>}
                        <img src="/edit.svg" alt="edit" />
                    </div>
                    <div onClick={() => setShowSectors(prev => !prev)} className="userInfoCont">
                        <div className="smTitle">Салбар</div>
                        <div className="value">{selectSectors}</div>
                        <img src="/edit.svg" alt="edit" />
                    </div>
                    <div className="userInfoCont">
                        <div className="smTitle">Регистр</div>
                        <div className="value">{userData?.companyregister}</div>
                    </div>
                </div>}

                <Signature url={imgData} setImgData={setImgData} />

                <div className="buttonPar">
                    <div style={{ opacity: `${opacity2}` }} className="errtext">Гарын үсэгээ зурна уу!</div>
                    <NextBtn onClick={() => clickHandles()} style={spnBtn === false ? { width: "30%" } : { width: "10%" }} className="SubmitButton" type="button">{spnBtn === false ? (<>Хадгалах <div className="flexchild"><AiOutlineSend /><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></>) : <img src="/gif1.gif" alt="spin" />}</NextBtn>
                </div>
            </div>

            <AlertStyle style={ctx.alert.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${ctx.alert.color}` } : { bottom: `50px`, opacity: `0` }} >
                {ctx.alert.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${ctx.alert.color}` }} className="true" /> : <CgDanger style={{ color: `${ctx.alert.color}` }} className="true" />}
                <span>{ctx.alert.text}</span>
            </AlertStyle>
        </SignaturStyle>
    )
}

export default UsersInfo

const anime = keyframes`
    0% { transform:translateY(30px);opacity:0;  }
    100% { transform:translateY(0px);opacity:1;  }
`
const InpAnime = keyframes`
    0% { opacity:0; margin:0px 0px;  }
    100% { opacity:1; margin:10px 0px; }
`

const SignaturStyle = styled.div`
    color:rgba(${props => props.theme.textColor},1);
    margin-top:30px;
    display:flex;
    align-items:start;
    justify-content:center;
    .ghost{
        position:fixed;
        top:0;
        height:100vh;
        width:100vw;
        background-color:rgba(0,0,0,0.2);
        z-index:2;
    }
    .ContPar{
        animation: ${anime} 0.7s ease;
        border-top:3px solid ${props => props.theme.Color};
        padding:30px 50px;
        border-radius:6px;
        box-shadow:1px 1px 20px -13px;
        width:100%;
        background-color:white;
        .userInfoCont{
            position:relative;
            background-color:white;
            cursor:pointer;
            display:flex;
            font-size:15px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            padding:20px 15px;
            transition:all 0.3s ease;
            z-index:1;
            .smTitle{
                font-weight:500;
                width:30%;
            }
            .value{
                margin-right:10px;
                color:rgba(${props => props.theme.textColor},0.8);
                width:70%;
            }
            .customInp{
                animation: ${InpAnime} 0.5s ease;
                margin:10px 0px;
            }
            img{
                width:16px;
                transform: scale(1);
                transition:all 0.3s ease;
            }
            &:hover{
                background-color:rgba(220,220,220,1);
                img{
                    transform: scale(1.3);
                }
            }
        }
        .A1{
            z-index:3;
            .customInp{
                font-size:15px;
            }
            &:hover{
                background-color:white;
                img{
                    margin-left:10px;
                    transform: scale(1.3);
                }
            }
        }
        .TitleBig{
            border-bottom:1px solid rgba(0,0,0,0.3);
            display:flex;
            align-items:center;
            font-size:20px;
            color:rgba(${props => props.theme.textColor},1);
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

const sectorAnimate = keyframes`
  0%{ transform:translateY(120px); opacity:0; }
  80%{ transform:translateY(-20px); opacity:0.8; }
  100%{ transform:translateY(0); opacity:1; }
`
const GhostPar = styled.div`
  position:fixed;
  top:0;
  left:0;
  height:100vh;
  width:100vw;
  z-index:10010;
  .Ghost{
    background-color:rgba(250,250,250,0.3);
    backdrop-filter: blur(4px);
    position:fixed;
    height:100%;
    width:100%;
  }
  .Sectorpar{
    box-shadow:1px 1px 17px -6px rgba(0,51,102,1);
    animation: ${sectorAnimate} 0.6s ease;
    transition:all 0.3s ease;
    transform:scale(1);
    top:10%;
    left:25%;
    position:absolute;
    z-index:10;
  }
  @media only screen and (max-width:768px){
    .Sectorpar{
      top:10%;
      left:5%;
    }
  }
`