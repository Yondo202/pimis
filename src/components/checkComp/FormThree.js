import React, {useEffect} from 'react';
import styled from 'styled-components'
import FromFive from './FormFive'
import { Link, animateScroll as scroll } from "react-scroll";
import axios from'axios';

function FormThree(props) {
  const [childStyle, setChildStyle] = React.useState('0');
  const [resTextstyle, setResTextstyle] = React.useState('black');
  const [responseText, setResponseText] = React.useState("D");
  const [responseTextscale, setResponseTextscale] = React.useState("0");
  const [resTextstyle2, setResTextstyle2] = React.useState('black');
  const [responseText2, setResponseText2] = React.useState("D");
  const [responseTextscale2, setResponseTextscale2] = React.useState("0");

  const [dataFinal, setData] = React.useState({});
  const [dataDetal, setDataDetal] = React.useState([]);

  const [dataFinal2, setData2] = React.useState({});
  const [dataDetal2, setDataDetal2] = React.useState([]);

  useEffect(async () => {
    const result = await axios.get( 'http://192.168.88.78:3000/api/questions' );
 
    const Data1 = result.data.data.docs[2]
    const Data2 = result.data.data.docs[3]
    // console.log(Data1, "data 1");
    setData(Data1);
    setDataDetal(Data1.questiondetails);

    setData2(Data2);
    setDataDetal2(Data2.questiondetails);
  },[]);

  const clickHandle = (e) =>{
    // e.preventDefault();
                let rs = document.querySelectorAll(".inpTest2");
                let arr = Array.from(rs);
                let finalOne = {};
                arr.map(element=>{
                if(element.checked === true){
                    // console.log(element, "my checked element");
                    let field = element.name;
                    let value = element.value;
                    finalOne[field] = value
                }
            });
            // console.log(finalOne.four, "its my final2 2 2 ");
          if(finalOne.t3hree === undefined){
                setChildStyle("0");
                setResponseText("Та хариултаас сонголтоо хийнэ үү...")
                setResponseTextscale("1");
                setResTextstyle("red");
                scroll.scrollTo(1300);
            }else if(finalOne.f4our === undefined ){
                setChildStyle("0");
                setResponseText2("Та хариултаас сонголтоо хийнэ үү...")
                setResponseTextscale2("1");
                setResTextstyle2("red");
                scroll.scrollTo(1300);
            }
             else{
                setChildStyle("1");
                setResponseText("d");
                setResponseTextscale("0");
                setResTextstyle("black");
                setResponseText2("d");
                setResponseTextscale2("0");
                setResTextstyle2("black");
                scroll.scrollTo(2200);
            }
  }

    return (
        <Component3 style={{transform:`scale(${props.childStyle})`}} >
          <div className="formOneParent">
            <div className="headerPar"  style={{color:`${resTextstyle}`}}>3. {dataFinal.description}<span className="tseg">*</span></div>
            {dataDetal.map((el,i)=>{
              return(
                  <div className="radioPar">
                      <input className="getinput inpTest2" tabIndex={dataFinal.code} type="radio" name="t3hree" value={el.id}/>
                     <label >{el.description}</label>
                  </div>
              )
            })}
              <div className="errText" style={{transform:`scale(${responseTextscale})`, color:`red` }} >{responseText}</div>
          </div>
          <div className="formOneParent" >
            <div className="headerPar"  style={{color:`${resTextstyle2}`}} >4. {dataFinal2.description}<span className="tseg">*</span></div>

               {dataDetal2.map((el,i)=>{
                    return(
                        <div className="radioPar">
                            <input className="getinput inpTest2" tabIndex={dataFinal2.code} type="radio" name="f4our" value={el.id}/>
                          <label >{el.description}</label>
                        </div>
                    )
                  })}
              <div className="errText" style={{transform:`scale(${responseTextscale2})`, color:`red` }} >{responseText2}</div>
              <Link  activeClass="active" to="section1" spy={true} smooth={true}  offset={-70} duration={0} onClick={()=>clickHandle()}>
                 <button onClick={clickHandle} className="TestButton">NEXT</button>
              </Link>
          </div>
          <FromFive SoloStyle={childStyle} />
        </Component3>
    )
}

export default FormThree

const Component3 = styled.div`
    font-size: 16px;
    font-family: "Roboto", "Sans-serif";
    transition:all 0.5s ease;
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
        .tseg{
          color:red;
        }
        padding-bottom:6px;
        font-size:1.1rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
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