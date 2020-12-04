import React,{useEffect} from 'react';
import styled from 'styled-components'
import FormTwo from './FormTwo';
import { Link, animateScroll as scroll } from "react-scroll";
import axios from'axios';
import { Alert } from 'react-st-modal';

function FormOne() {
  const [childStyle, setChildStyle] = React.useState('0');
  const [resTextstyle, setResTextstyle] = React.useState('black');
  const [responseText, setResponseText] = React.useState("D");
  const [responseTextscale, setResponseTextscale] = React.useState("0");
  const [dataFinal, setData] = React.useState({});
  const [dataDetal, setDataDetal] = React.useState([]);
  
  useEffect(async () => {
    const result = await axios.get( 'http://192.168.88.78:3000/api/questions?page=1&pageSize=3' );
 
    const Data1 = result.data.data.docs[0]
    // console.log(Data1, "data 1");
    setData(Data1);
    setDataDetal(Data1.questiondetails)
  },[]);

  const clickHandle = (element) =>{
    // e.preventDefault();
            let rs = document.querySelectorAll(".inpTest");
            let arr = Array.from(rs);
            let finalOne = {};
          arr.map(element=>{
              if(element.checked === true){
                let field = element.name;
                let value = element.value;
                finalOne[field] = value
              }
          });
          // console.log(finalOne.o1ne, "its my final2 2 2 ");
          if(finalOne.o1ne === "91"){
            Alert('ААН, Кластер аль алинд тэнцэхгүй байна.', ' ✓✓✓');
            setResponseText("Түншлэлийн хөтөлбөрт хамрагдах боломжгүй байна...");
            setResponseTextscale("1");
            setResTextstyle("red");
            setChildStyle("0");
            scroll.scrollTo(0);
          }else if(finalOne.o1ne === undefined){
            setResponseText("Та хариултаас сонголтоо хийнэ үү...");
            setResponseTextscale("1");
            setResTextstyle("red");
            setChildStyle("0");
            scroll.scrollTo(0);
          } else{
            setChildStyle("1");
            setResponseText("d");
            setResponseTextscale("0");
            setResTextstyle("black");
            scroll.scrollTo(560);
          }
  }

    return (
        <Component >
          <div className="formOneParent">
            <div className="headerPar" style={{color:`${resTextstyle}`}} >1. {dataFinal.description}<span className="tseg">*</span></div>
              {dataDetal.map((el,i)=>{
                return( 
                   <div className="radioPar" key={i}>
                    <input className="getinput inpTest" type="radio" tabIndex={dataFinal.code}  name="o1ne" value={el.id}/>
                    <label >{el.description}</label>
                 </div> 
                 )})}
              <div className="errText" style={{transform:`scale(${responseTextscale})`, color:`red` }} >{responseText}</div>
              <Link  activeClass="active" to="section1" spy={true} smooth={true}  offset={-70} duration={0} onClick={()=>clickHandle()}>
                <button onClick={clickHandle} className="TestButton">Шалгах</button>
              </Link>
          </div>
            <FormTwo SoloStyle={childStyle} />
        </Component>
    )
}

export default FormOne

const Component = styled.div`
    font-size: 18px;
    font-family: "Roboto", "Sans-serif";
    .formOneParent{
      background-color:white;
      border-radius:8px;
      margin-bottom:16px;
      padding:24px 26px;
      .TestButton{
        border-style:none;
        border:1px solid rgba(63, 81, 181,0.5);
        width:50%;
        padding:5px 0px;
        border-radius:6px;
        color:rgba(63, 81, 181);
        background-color:rgba(63, 81, 181,0.1);
        cursor:pointer;
        font-size:18px;
        &:hover{
          box-shadow:1px 1px 8px -2px;
        }
      }

      .MuiFormLabel-root{
        padding-bottom:6px;
        font-size:1.2rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
      }
      .headerPar{
        padding-bottom:6px;
        font-size:1.2rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
        .tseg{
          color:red;
        }
      }
      .errText{
        transition: all 0.4s ease; 
      }
      .radioPar{
        display:flex;
        flex-direction:row;
        align-items:center;
        padding:10px 0px;
        label{
          margin-left:15px;
          color:rgba(0,0,0,0.8);
          margin-bottom:0px
        }
        input{
          cursor:pointer;
          width:16px;
          height:16px;
        }
      }


    }
   
`