import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useReactToPrint } from "react-to-print";
import { VscFilePdf } from 'react-icons/vsc';
import Content from './Content';
import axios from '../../../axiosbase';
import AccessToken from '../../../context/accessToken';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';

function PageOne({ NotifyData }) {
  const history = useHistory();
  const { slug } = useParams();
  const [Data, setData] = useState(null);
  const [propData, setPropData] = useState(null);
  const [spin, setSpin] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [opacity, setOpacity] = useState("0");
  const [alert, setAlert] = useState({ color: 'yellow', text: 'null', cond: false });
  const [userName, setUserName] = useState(null);

  const alertHandle = (color, text, cond) => { setAlert({ color: color, text: text, cond: cond }); setTimeout(() => { setAlert({ color: color, text: text, cond: false }); }, 3000); }

  useEffect(() => {
    axios.get(`evaluation-meetings/scheduled-projects?projectId=${slug}`, { headers: { Authorization: AccessToken() } }).then(res => {
      setData(res.data.data[0]); setUserName(res.data.data[0].memberInfo.fullName);
      if (res.data.data[0].medegdehHuudas !== null) { setPropData(res.data.data[0].medegdehHuudas) };
    })
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const clickHandle = () => {
    let inp = document.querySelectorAll('.getInputt'); let arr = Array.from(inp); let final = {};
    arr.forEach((el, i) => {
      if (el.name === "is_violation") {
        if (el.checked === true) {
          if (el.value === "true") {
            final[el.name] = true; let reason = document.getElementById('reason');
            if (reason.value !== "") { final[reason.name] = reason.value; }
          } else { final["uussen_zorchil"] = null; final[el.name] = false; }
        }
      } else {
        if (!el.value) { el.classList += " red"; } else {
          final[el.name] = el.value;
          el.classList = - " red";
          el.classList += " getInputt";
        }
      }
    });
    // final["fullName"] = userName;
    final["projectId"] = Data.projectId;
    final["evaluationMeetingId"] = Data.evaluationMeetingId;

    let keys = Object.keys(final);

    if (keys.length < 6) {
      setErrMsg("Та гүйцэд бөгөлнө үү..."); setOpacity("1");
    } else if (!imgData) {
      setErrMsg("Гарын үсэгээ зурж баталгаажуулна уу..."); setOpacity("1");
    } else {
      setSpin(true); final["signature_data"] = imgData; setOpacity("0");
      axios.post(`evaluation-results/member-interest`, final, { headers: { Authorization: AccessToken() } }).then((res) => {
        console.log(res, " res");
        alertHandle("green", "Амжилттай илгээлээ", true); setTimeout(() => { history.push('/'); setSpin(false); }, 2000);
      }).catch((err) => { console.log(err); alertHandle("orange", "Алдаа гарлааа", true); setSpin(false); });
    }
    console.log(final, "final");
  }


  return (
    <>
      <MainContainter className="container">
        <div className="parent" ref={componentRef}>
          <Content propData={propData} userName={userName} setImgData={setImgData} />
        </div>

        {!propData && <div className="buttonPar">
          <div style={{ opacity: opacity }} className="errtext">{errMsg}</div>
          <div onClick={clickHandle} style={!spin ? { width: `40%`, opacity: 1 } : { width: `10%`, opacity: 0.6 }} className="btn btn-primary">{!spin ? `Илгээх` : <img src="/gif1.gif" alt="edp-img" />} </div>
        </div>}
        {/* <button className="print"  onClick={handlePrint}><VscFilePdf />  Хэвлэх болон Pdf - ээр татах</button> */}
        {/* <button className="print"  onClick={()=>window.print()}><VscFilePdf />  Хэвлэх болон Pdf - ээр татах</button> */}
      </MainContainter>

      <AlertStyle style={alert.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${alert.color}` } : { bottom: `50px`, opacity: `0` }} >
        {alert.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${alert.color}` }} className="true" /> : <CgDanger style={{ color: `${alert.color}` }} className="true" />}
        <span>{alert.text}</span>
      </AlertStyle>
    </>
  )
}

export default PageOne

// ()=>window.print()

const MainContainter = styled.div`
    position:relative;
    padding-bottom:60px;
    .parent{
    //   .footer{
    //     display:none;
    //     font-size: 9px;
    //     color: #f00;
    //     text-align: center;
    //   }
      @page {
        size: A4;
        margin: 17mm 17mm 17mm 17mm;
      }
    //   @media print {
    //     .footer{
    //       // display:block;
    //       position: fixed;
    //       bottom: 0;
    //     }
    //     // .content-block, p {
    //     //   page-break-inside: avoid;
    //     // }

    //     html, body {
    //       width: 210mm;
    //       height: 297mm;
    //     }
    //   }
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
        .btn{
          display:flex;
          justify-content:center;
          transition:all 0.3s ease;
          margin:10px 0px;
          max-width:700px;
          width:40%;
          img{
            width:26px;
          }
      }
    }
    .print{
        max-width:700px;
        width:100%;
        font-weight:500;
        color:black;
        display:flex;
        align-items:center;
        justify-content:center;
        border:1px #008CBA;
        border-style: dashed;
        transition:all 0.4s ease;
        font-size:14px;
        padding:3px 0px;
        &:hover{
          background-color:#009CBA;
        }
        svg{
          margin-right:18px;
          font-size:18px;
        }
      }
  }

  @media (max-width:768px){
    .buttonPar{
      flex-direction:column;
      .errtext{
        width:100%;
      }
      .btn{
        width:100% !important;
      }
    }
  }

  @media print {
    .btn-primary{
      display:none;
    }
  }
`

const AlertStyle = styled.div`
    z-index:1010;  
    transition:all 0.5s ease;
    position:fixed;
    // height:80px;
    bottom:100px;
    left:5%;
    display:flex;
    align-items:center;
    border:1px solid rgba(0,255,0,0.8);
    // border-left:4px solid green;
    background-color:white;
    padding:10px 40px; 
    font-weight:400;
    color:black;
    border-radius:6px;
    font-size:17px;
    opacity:1;
    font-weight:600;
    .true{
        margin-right:14px;
        font-size:24px;
    }
`