import React,{useEffect} from 'react';
import styled from 'styled-components'
import FormThree from './FormThree';
import { Link, animateScroll as scroll } from "react-scroll";
import axios from'axios';




function FormTwo(props) {
  
    const [opacity, setOpacity] = React.useState("0");
    const [childStyle, setChildStyle] = React.useState('0');
    const [procent, setProcent] = React.useState('0');

    const [dataFinal, setData] = React.useState({});
    const [dataDetail, setDataDetal] = React.useState([]);
    
    useEffect(async () => {
      const result = await axios.get( 'http://192.168.88.78:3000/api/questions?page=1&pageSize=3' );
   
      const Data1 = result.data.data.docs[1]
      setData(Data1);
      setDataDetal(Data1.questiondetails)
    },[]);

  const clickHandles = (e) =>{
    // e.preventDefault();
                let rs = document.querySelectorAll(".inpTest3");
                // console.log(rs, "dada"); 
                let arr = Array.from(rs);
                let finalOne = {};
                arr.map((element,i)=>{
                  if(element.checked === true){
                    let field = element.tabIndex;
                    let value = element.value;
                    finalOne[field] = value
                  }
            });
            let keys = Object.keys(finalOne);
            const Procent = keys.length * 100 / 13;
            const FinalProcent = Math.round(Procent);

            if(keys.length < 13){
              setOpacity("1");
              setChildStyle("0");
              setProcent(FinalProcent);
              scroll.scrollTo(560);
            } else{
              setOpacity("0");
              setChildStyle("1");
              scroll.scrollTo(1300);
            }
      
  }

    return (
        <Component2 style={{transform:`scale(${props.SoloStyle})`}}>
        {/* <Components > */}
            <div className="rowHeader">2. {dataFinal.description}<span className="tseg">*</span></div>
            <div className="formTwoParent ">
              <div className="headerPar">
                <div className="row" >
                  <div className="col-md-8 col-sm-8 col-6"> Шалгуур </div>
                  <div className="col-md-2 col-sm-2 col-3"> Тийм </div>
                  <div className="col-md-2 col-sm-2 col-3">Үгүй </div>
                </div>
              </div>
              {dataDetail.map((el, i)=>{
                return(
                  <div className="headerParchild" key={i}>
                    <div className="row" >
                      <div className="col-md-1 col-sm-1 col-1">{`${i + 1}`}</div>
                      <div className="col-md-7 col-sm-7 col-5">{el.description}</div>
                      <div className="col-md-2 col-sm-2 col-3"><input className={`d${i} getinput22 inpTest3`} tabIndex={`${i + 1}`} type="radio" name={el.id} value="1"/></div>
                      <div className="col-md-2 col-sm-2 col-3"><input className={`d${i} getinput22 inpTest3`} tabIndex={`${i + 1}`} type="radio" name={el.id} value="0"/></div>
                    </div>
                </div>
                )
              })}
              <div className="buttonPar">
              <div style={{opacity:`${opacity}`}} className="errtext">Таны асуулга {procent}% байна..</div>
               <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div>
               <Link  activeClass="active" to="section1" spy={true} smooth={true}  offset={-70} duration={0} onClick={()=>clickHandles()}>
                 <span onClick={clickHandles} className="TestButton">NEXT</span>
              </Link>
              </div>
            </div>
            <FormThree childStyle={childStyle} />

        </Component2>
    )
}

export default FormTwo




const Component2 = styled.div`
    transition: all 0.5s ease-out;
      border-radius:8px;
      font-family: "Roboto", "Sans-serif";
      .rowHeader{
        background-color:white;
        padding: 24px 26px;
        font-size:1.2rem;
        // border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
        .tseg{
          color:red;
        }
      }
   
    .formTwoParent{
      background-color:white;
        margin-bottom:16px;
        font-size:16px;
        border:1px solid rgba(63, 81, 181,0.8);
        border-bottom:1px solid rgba(63, 81, 181,1);
        .buttonPar{
          margin:10px 10px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
            .errtext{
              font-weght:500;
              font-size:20px;
              transition:all 0.4s ease;
              color:rgba(255,0,0.6);
            }
            a{
              text-decoration: none !important;
              all: none;
              border-style:none;
              border:1px solid rgba(63, 81, 181,0.5);
              width:30%;
              padding:5px 0px;
              border-radius:6px;
              color:rgba(63, 81, 181);
              background-color:rgba(63, 81, 181,0.1);
              cursor:pointer;
              font-size:18px;
              text-align:center;
              &:hover{
                box-shadow:1px 1px 8px -2px;
              }
              // .TestButton{
              //   border-style:none;
              //   border:1px solid rgba(63, 81, 181,0.5);
              //   width:30%;
              //   padding:5px 0px;
              //   border-radius:6px;
              //   color:rgba(63, 81, 181);
              //   background-color:rgba(63, 81, 181,0.1);
              //   cursor:pointer;
              //   font-size:18px;
              //   &:hover{
              //     box-shadow:1px 1px 8px -2px;
              //   }
              // }
            }
        
        }
        
        .headerPar{
          background-color: rgba(63, 81, 181,0.8);
          color:white;
          text-align:center;
          border-bottom:1px solid rgba(0,0,0,0.4);
          font-size:18px;
         
          .col-md-8,.col-md-6{
            padding-top: 10px;
            padding-bottom: 16px;
          }
          .col-md-2,.col-md-3{
            padding-top: 10px;
            padding-bottom: 18px;
            border-left:1px solid rgba(0,0,0,0.4);
          }
        }

        .headerParchild{
          background-color: rgba(63, 81, 181,0.1);
          text-align:center;
          border-bottom:1px solid rgba(0,0,0,0.4);
          font-size:16px;
          .col-md-1{
            font-weight:500;
            text-align:center;
            border-right:1px solid rgba(0,0,0,0.4);
            padding-top: 10px;
            padding-bottom: 10px;
          }
          .col-md-7, .col-md-6{
            text-align:start;
            padding-top: 8px;
            padding-bottom: 8px;
          }
          .col-md-2, .col-md-3{
            display:flex;
            align-items:center;
            justify-content:center;
            // padding-top: 10px;
            // padding-bottom: 10px;
            border-left:1px solid rgba(0,0,0,0.4);
            input{
              cursor:pointer;
              height:24px;
              width:24px;
            }
          }
        }

    }

  @media only screen and (max-width:768px){
    .formTwoParent{
      .headerPar{
        font-size:14px;
      }
      .headerParchild{
        font-size:13px;
      }
    }
  }
    

   
        
`

