import React from "react";
import styled from "styled-components";
import FromOne from "../checkComp/FormOne";
import {AiOutlineSend} from 'react-icons/ai'
import {RiMailSendLine} from 'react-icons/ri'
import { animateScroll as scroll } from "react-scroll";
import Axios from '../../axiosbase'
import Ghost from '../Ghost'
import { motion } from 'framer-motion'
import {fontFamily} from '../theme'
import {Link} from 'react-router-dom'

let easing = [0, 0, 0.56, 0.95];
const textVariants2 = {exit: { y: -100, opacity: 0, transition: { duration: 0.9, ease: easing } },
    enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 0.6, ease: easing }}};

function MainForm() {
    const [scale, setScale] = React.useState("0");
    const [resScale, setresScale] = React.useState("0");
    const [resText, setResText] = React.useState("");

          const handleClick = async (e) =>{
            e.preventDefault();
            let rs = document.querySelectorAll(".getinput");
            let arr = Array.from(rs);
            let finalOne = {};

            let rs2 = document.querySelectorAll(".inpTest3");
            let arr2 = Array.from(rs2);
            let finalOne2 = [];

            let rs3 = document.querySelectorAll(".getinput3");
            let arr3 = Array.from(rs3);
            let finalOne3 = [];

            let rs4 = document.querySelectorAll(".userInp");
            let arr4 = Array.from(rs4);
            let userInp = {};

            arr4.map(element=>{
                let field = element.name;
                let value = element.value;
                userInp[field] = value;
            });

            arr.map(element=>{
              if(element.checked === true){
                let field = element.tabIndex;
                let value = element.value;
                finalOne[field] = [value];
              }
          });
          arr2.map(element=>{
            if(element.checked === true){
              let soloObject2 = {}
              let field = element.name;
              let value = element.value;
              soloObject2[field] = value;
              finalOne2.push(soloObject2);
            }
        });
        arr3.map(element=>{
          if(element.checked === true){
            let soloObject2 = {}
            let field = element.name;
            let value = element.value;
            soloObject2[field] = value;
            finalOne3.push(soloObject2);
          }
      });

        finalOne[2] = finalOne2
        finalOne[5] = finalOne3
        finalOne["compname"] = userInp.compname
        finalOne["registernum"] = userInp.registernum

        console.log(finalOne2 , "this my first fynal");
        console.log(finalOne, "this finalLL");

          let keys = Object.keys(finalOne);
          console.log(keys.length, "myLength");
          if(keys.length < 8){
            setScale("1");
            scroll.scrollTo(2500);
          }else{
            setScale("0");
            await Axios.post( 'question-check', finalOne ).then((result)=>{
              console.log(result.data.data, "result");
              const appComp = result.data.data.approvedCompany
              const appCluster = result.data.data.approvedCluster
              if(appComp === true && appCluster === true){
                setresScale("1");
                setResText("ААН, Кластер аль алинд тэнцэх боложтой байна. Та шалгуурууд болон бүрдүүлэх материалаа бүрдүүлэн өөрийн сонголтоор аль нэгэнд нь хандана уу.");
              }else if(appCluster === true && appComp === false){
                setresScale("1");
                setResText("Кластерын шалгуур, бүрдүүлэх материалыг бэлтгэн Кластераар хандаж болно.");
                setTimeout(()=>{ window.history.go(-1); },14000);
              }else{ setresScale("1"); }
            });
          }
        }
 
  return (
    <Component className="container"  >
      {/* <Ghost /> */}
      <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
        <div className="headPar">
          <span className="headText">Түншлэлийн хөтөлбөрт хамрагдах боломжтой эсэхээ энэ асуулгаар шалгаж үзнэ үү </span>
        </div>
        <form onSubmit={handleClick}>
        <FromOne />
          <div className="SubmitButtonPar">
            <span className="colorText" style={{transform:`scale(${scale})`}}> Тэдээлэл дутуу байна... </span>
            {/* <Link  activeClass="active" to="section1" spy={true} smooth={true}  offset={-70} duration={0} onClick={()=>handleClick()}> */}
              <button   className="SubmitButton" type="submit">Илгээх <div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div>  </button>
            {/* </Link> */}
          </div>
        </form>
      </motion.div>
      <div className="homeButtonPar" style={{transform:`scale(${resScale})`}}>
        <Link to="/"><span className="homeBtn" >Буцах</span></Link>
        <div className="resPar" >
          <RiMailSendLine />
            <h5 className="finalText">{resText}</h5>
        </div>
      </div>
    
    </Component>
  );
}

export default MainForm;

const Component = styled.div`
  font-family: ${fontFamily};
  position:relative;
  margin-top:60px;
  padding-bottom:100px;
  z-index:1;
  .homeButtonPar{
    display:flex;
    flex-direction:row;
    width:100%;
    align-items:center !important;
    justify-content:space-between;
    transition:all 0.4s ease;
    a{
      color:black;
      text-decoration:none;
    }
    .homeBtn{
      font-size:18px;
      border:1px solid rgba(0, 51, 102,0.5);
      padding:5px 35px;
      border-radius:6px;
      cursor:pointer;
      transition:all 0.3s ease;
      box-shadow:1px 1px 16px -5px;
      &:hover{
        color:white;
        background-color:rgba(0, 51, 102,0.9);
      }
    }
    .resPar{
      text-align:center;
      padding:20px 20px;
      border-radius:8px;
      background:white;
      margin-top:20px;
      margin-bottom:20px;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:start;
      color:#036;
      transition:all 0.4s ease;
      // background-color:#EBEB00;
      background-color:wheat;
      box-shadow:1px 1px 16px -5px;
      width:83%;
      svg{
        width:10%;
        font-size:24px !important;
      }
      .finalText{
        transition:all 0.4s ease;
        margin-bottom:0px;
      }
    }
  }
  
  .headPar {
    text-align: center;
    background-color: white;
    font-size: 24px;
    padding:10px 20%;
    margin-bottom:16px;
    border-radius:8px;
    border-top:5px solid #036;
    // border-bottom:5px solid #3f51b5;
    .headText{
    }
  }
  .SubmitButtonPar{
    margin-top:20px;
    width:100;
    text-align:end;
    display:flex;
    align-items:center;
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
        width:100%;
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
  @media only screen and (max-width:786px){
    .resPar{
      h5{
        font-size:14px;

      }
    }
    .headPar{
      padding:10px 3%;
      font-size: 19px;
    }
      .SubmitButtonPar{
        flex-direction:column;
          .SubmitButton{
            width:100%;
          }
      }
  }
`;
