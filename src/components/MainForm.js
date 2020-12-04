import React from "react";
import styled from "styled-components";
import FromOne from "../components/FormOne";
import {AiOutlineSend} from 'react-icons/ai'
import { Alert } from 'react-st-modal';
import { Link, animateScroll as scroll } from "react-scroll";
import axios from'axios';

function MainForm() {

    const [scale, setScale] = React.useState("0");
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
      // console.log(userInp, "my user inps");
        finalOne[2] = finalOne2
        finalOne[5] = finalOne3
        finalOne["compname"] = userInp.compname
        finalOne["registernum"] = userInp.registernum

        console.log(finalOne, "this next final");
          let keys = Object.keys(finalOne);
          console.log(keys.length, "myLength");
          if(keys.length < 8){
            setScale("1");
            scroll.scrollTo(2000);
          }else{
            setScale("0");
            await axios.post( 'http://192.168.88.78:3000/api/question-check', finalOne ).then((result)=>{
              console.log(result, "result");
              const appComp = result.data.data.approvedCompany
              const appCluster = result.data.data.approvedCluster

              if(appComp === true && appCluster === true){
                Alert('Та шалгуурууд болон бүрдүүлэх материалаа бүрдүүлэн өөрийн сонголтоор аль нэгэнд нь хандана уу', ' Амжилттай тэнцлээ ✓✓✓');
                scroll.scrollToTop();

              }else if(appCluster === true && appComp === false){
                Alert('Кластерын шалгуур, бүрдүүлэх материалыг бэлтгэн Кластераар хандаж болно ', ' ✓✓✓');
                scroll.scrollToTop();

              }else{
                Alert('ААН, Кластер аль алинд тэнцэхгүй байна.', ' ✓✓✓');
                scroll.scrollToTop();

              }
            });

            // alert("Амжилттай илгээгдлээ");
            // Alert('Амжилттай илгээгдлэээ ✓✓✓', ' ✓✓✓');
          }
        }
 
  return (
    <Component className="container"  >
      <div className="headPar">
        <span className="headText">
          Түншлэлийн хөтөлбөрт хамрагдах боломжтой эсэхээ энэ асуулгаар шалгаж үзнэ үү
        </span>
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
    </Component>
  );
}

export default MainForm;

const Component = styled.div`
  font-family: "Roboto", "Sans-serif";
  // text-align:center;
  position:relative;
  margin-top:80px;
  padding-bottom:100px;
  z-index:1;
  .headPar {
    text-align: center;
    background-color: white;
    font-size: 24px;
    padding:10px 20%;
    margin-bottom:16px;
    border-radius:8px;
    border-top:5px solid #3f51b5;
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
        background-color:rgba(63, 81, 181);
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
    .headPar{
      padding:10px 3%;
      font-size: 19px;
    }
   
      .SubmitButtonPar{
        flex-direction:column;
        a{
          width:100%;
          .SubmitButton{
            width:100%;
          }
        }
        
      }
  }
`;
